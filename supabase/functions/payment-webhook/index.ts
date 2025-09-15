// @ts-nocheck
/// <reference types="https://deno.land/x/deno/runtime/deno.d.ts" />

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const MOLLIE_API_URL = "https://api.mollie.com/v2/payments";

serve(async (req: Request) => {
  // The request from Mollie is a POST request.
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const formData = await req.formData();
    const paymentId = formData.get("id") as string;

    // If no paymentId is provided, it's a test request from Mollie.
    // Acknowledge it with a 200 OK.
    if (!paymentId) {
      console.log("Webhook test request received and acknowledged.");
      return new Response("OK", { status: 200 });
    }

    const mollieApiKey = Deno.env.get("MOLLIE_API_KEY");
    if (!mollieApiKey) {
      throw new Error("MOLLIE_API_KEY is not set.");
    }

    // Verify the payment with Mollie to get the latest status
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
    const newStatus = payment.status;

    if (!registrationId) {
      throw new Error("Registration ID not found in payment metadata.");
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { error: rpcError } = await supabaseAdmin.rpc('handle_payment_update', {
        registration_id_param: registrationId,
        new_status: newStatus
    });

    if (rpcError) {
      throw new Error(`Failed to process payment update via RPC: ${rpcError.message}`);
    }

    return new Response("OK", { status: 200 });

  } catch (error) {
    console.error("Webhook error:", error instanceof Error ? error.message : "An unknown error occurred.");
    return new Response("Internal Server Error", { status: 500 });
  }
});