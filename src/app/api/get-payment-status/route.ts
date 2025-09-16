import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { registrationId } = await req.json();
    if (!registrationId) {
      throw new Error("Registration ID is required.");
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabaseAdmin
      .from("registrations")
      .select("payment_status")
      .eq("id", registrationId)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return NextResponse.json(
        { error: "Registration not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ payment_status: data.payment_status });
  } catch (error) {
    console.error("Error fetching payment status:", error);
    const message =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}