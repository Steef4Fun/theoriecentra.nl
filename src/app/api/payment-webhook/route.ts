import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const MOLLIE_API_URL = "https://api.mollie.com/v2/payments";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const paymentId = formData.get("id") as string;

    if (!paymentId) {
      console.log("Webhook test request received and acknowledged.");
      return new NextResponse("OK", { status: 200 });
    }

    const mollieApiKey = process.env.MOLLIE_API_KEY;
    if (!mollieApiKey) {
      throw new Error("MOLLIE_API_KEY is not set.");
    }

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
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error: rpcError } = await supabaseAdmin.rpc(
      "handle_payment_update",
      {
        registration_id_param: registrationId,
        new_status: newStatus,
      }
    );

    if (rpcError) {
      throw new Error(
        `Failed to process payment update via RPC: ${rpcError.message}`
      );
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "An unknown error occurred.";
    console.error("Webhook error:", message);
    return new NextResponse(`Webhook error: ${message}`, { status: 500 });
  }
}