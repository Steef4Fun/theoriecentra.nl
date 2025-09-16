import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const MOLLIE_API_URL = "https://api.mollie.com/v2/payments";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const paymentId = formData.get("id") as string;

    if (!paymentId) {
      return new NextResponse("OK", { status: 200 });
    }

    const mollieApiKey = process.env.MOLLIE_API_KEY;
    if (!mollieApiKey) throw new Error("MOLLIE_API_KEY is not set.");

    const paymentResponse = await fetch(`${MOLLIE_API_URL}/${paymentId}`, {
      headers: { Authorization: `Bearer ${mollieApiKey}` },
    });

    if (!paymentResponse.ok) throw new Error("Failed to fetch payment from Mollie.");

    const payment = await paymentResponse.json();
    const registrationId = payment.metadata?.registration_id;
    const newStatus = payment.status;

    if (!registrationId) throw new Error("Registration ID not found in metadata.");

    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
    });

    if (!registration) throw new Error(`Registration ${registrationId} not found.`);

    if (newStatus === 'paid' && registration.paymentStatus !== 'paid') {
      await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        await tx.registration.update({
          where: { id: registrationId },
          data: { paymentStatus: newStatus },
        });
        if (registration.courseId) {
          await tx.course.update({
            where: { id: registration.courseId },
            data: { spotsAvailable: { decrement: 1 } },
          });
        }
      });
      // TODO: Hier kan een e-mail worden verstuurd
    } else if (newStatus !== registration.paymentStatus) {
      await prisma.registration.update({
        where: { id: registrationId },
        data: { paymentStatus: newStatus },
      });
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error.";
    console.error("Webhook error:", message);
    return new NextResponse(`Webhook error: ${message}`, { status: 500 });
  }
}