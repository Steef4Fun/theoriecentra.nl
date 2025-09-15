// @ts-nocheck
/// <reference types="https://deno.land/x/deno/runtime/deno.d.ts" />

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MOLLIE_API_URL = "https://api.mollie.com/v2/payments";

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { course, registrationDetails, redirectUrl, webhookUrl } = await req.json();
    if (!course || !registrationDetails || !redirectUrl || !webhookUrl) {
      throw new Error("Course, registration details, redirectUrl, and webhookUrl are required.");
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const mollieApiKey = Deno.env.get("MOLLIE_API_KEY");
    if (!mollieApiKey) {
      throw new Error("MOLLIE_API_KEY is not set in environment variables.");
    }

    // 1. Calculate amount
    const totalPrice = course.base_price + course.exam_fee;
    const depositPrice = course.exam_fee + 20;
    const amountToPay = registrationDetails.paymentOption === "full" ? totalPrice : depositPrice;

    // 2. Create preliminary registration
    const { data: registration, error: insertError } = await supabaseAdmin
      .from("registrations")
      .insert({
        course_id: course.id,
        first_name: registrationDetails.firstName,
        last_name: registrationDetails.lastName,
        email: registrationDetails.email,
        phone_number: registrationDetails.phoneNumber,
        date_of_birth: registrationDetails.dateOfBirth,
        payment_option: registrationDetails.paymentOption,
        payment_status: "pending",
      })
      .select()
      .single();

    if (insertError) throw insertError;

    // 3. Create payment with Mollie using fetch
    const paymentResponse = await fetch(MOLLIE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mollieApiKey}`,
      },
      body: JSON.stringify({
        amount: {
          currency: "EUR",
          value: amountToPay.toFixed(2),
        },
        description: `Inschrijving ${course.category.name} Cursus op ${course.course_date}`,
        redirectUrl: `${redirectUrl}?registration_id=${registration.id}`,
        webhookUrl: webhookUrl, // Use the URL provided by the client
        metadata: {
          registration_id: registration.id,
        },
      }),
    });

    if (!paymentResponse.ok) {
      const errorBody = await paymentResponse.json();
      console.error("Mollie API Error:", errorBody);
      throw new Error(`Mollie API request failed: ${errorBody.title}`);
    }

    const payment = await paymentResponse.json();

    // 4. Update registration with Mollie Payment ID
    const { error: updateError } = await supabaseAdmin
      .from("registrations")
      .update({ mollie_payment_id: payment.id })
      .eq("id", registration.id);

    if (updateError) throw updateError;

    // 5. Return checkout URL
    const checkoutUrl = payment._links?.checkout?.href;
    if (!checkoutUrl) {
      throw new Error("Checkout URL not found in Mollie response.");
    }

    return new Response(JSON.stringify({ checkoutUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error creating payment:", error);
    const message = error instanceof Error ? error.message : "An unknown error occurred.";
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});