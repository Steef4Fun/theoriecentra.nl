import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createMollieClient } from "https://esm.sh/@mollie/api-client@3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { course, registrationDetails } = await req.json();

    if (!course || !registrationDetails) {
      throw new Error("Course and registration details are required.");
    }

    // Initialize Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Initialize Mollie client
    const mollieClient = createMollieClient({
      apiKey: Deno.env.get("MOLLIE_API_KEY") ?? "",
    });

    // 1. Calculate the amount to be paid
    const totalPrice = course.base_price + course.exam_fee;
    const depositPrice = course.exam_fee + 20;
    const amountToPay = registrationDetails.paymentOption === "full" ? totalPrice : depositPrice;

    // 2. Create a preliminary registration record in Supabase
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

    // 3. Create a payment with Mollie
    const payment = await mollieClient.payments.create({
      amount: {
        currency: "EUR",
        value: amountToPay.toFixed(2),
      },
      description: `Inschrijving ${course.category.name} Cursus op ${course.course_date}`,
      redirectUrl: `http://localhost:3000/inschrijving-status?registration_id=${registration.id}`,
      webhookUrl: `https://mmuhtwhyldvvgcclobuz.supabase.co/functions/v1/payment-webhook`,
      metadata: {
        registration_id: registration.id,
      },
    });

    // 4. Update the registration with the Mollie Payment ID
    const { error: updateError } = await supabaseAdmin
      .from("registrations")
      .update({ mollie_payment_id: payment.id })
      .eq("id", registration.id);

    if (updateError) throw updateError;

    // 5. Return the checkout URL to the client
    return new Response(JSON.stringify({ checkoutUrl: payment.getCheckoutUrl() }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error creating payment:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});