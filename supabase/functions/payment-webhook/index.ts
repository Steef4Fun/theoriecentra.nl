import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const MOLLIE_API_URL = "https://api.mollie.com/v2/payments";

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const formData = await req.formData();
    const paymentId = formData.get("id") as string;

    if (!paymentId) {
      throw new Error("Payment ID is missing from webhook data.");
    }

    const mollieApiKey = Deno.env.get("MOLLIE_API_KEY");
    if (!mollieApiKey) {
      throw new Error("MOLLIE_API_KEY is not set.");
    }

    // 1. Verify the payment with Mollie
    const paymentResponse = await fetch(`${MOLLIE_API_URL}/${paymentId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${mollieApiKey}`,
      },
    });

    if (!paymentResponse.ok) {
      throw new Error("Failed to fetch payment status from Mollie.");
    }

    const payment = await paymentResponse.json();
    const registrationId = payment.metadata?.registration_id;

    if (!registrationId) {
      throw new Error("Registration ID not found in payment metadata.");
    }

    // 2. Update database based on payment status
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const newStatus = payment.status; // e.g., 'paid', 'failed', 'expired'

    const { error: updateError } = await supabaseAdmin
      .from("registrations")
      .update({ payment_status: newStatus })
      .eq("id", registrationId);

    if (updateError) {
      throw new Error(`Failed to update registration status: ${updateError.message}`);
    }

    // 3. If paid, decrement course spots
    if (newStatus === "paid") {
      const { data: registrationData, error: fetchError } = await supabaseAdmin
        .from("registrations")
        .select("course_id")
        .eq("id", registrationId)
        .single();

      if (fetchError || !registrationData || !registrationData.course_id) {
        throw new Error("Could not find registration to get course ID.");
      }

      const { error: rpcError } = await supabaseAdmin.rpc('decrement_course_spots', {
        course_id_param: registrationData.course_id
      });

      if (rpcError) {
        throw new Error(`Failed to decrement course spots: ${rpcError.message}`);
      }
    }

    return new Response("OK", { status: 200 });

  } catch (error) {
    console.error("Webhook error:", error.message);
    return new Response("Internal Server Error", { status: 500 });
  }
});