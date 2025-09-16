import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { registrationId } = await req.json();
    if (!registrationId) {
      throw new Error("Registration ID is required.");
    }

    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
      select: { paymentStatus: true },
    });

    if (!registration) {
      return NextResponse.json(
        { error: "Registration not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ payment_status: registration.paymentStatus });
  } catch (error) {
    console.error("Error fetching payment status:", error);
    const message =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}