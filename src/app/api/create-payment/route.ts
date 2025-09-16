import { NextRequest, NextResponse } from "next/server";
import type { Course } from "@/lib/types";
import prisma from "@/lib/prisma";

const MOLLIE_API_URL = "https://api.mollie.com/v2/payments";

export async function POST(req: NextRequest) {
  try {
    const { course, registrationDetails } = (await req.json()) as {
      course: Course;
      registrationDetails: any;
    };

    if (!course || !registrationDetails) {
      throw new Error("Course and registration details are required.");
    }

    const mollieApiKey = process.env.MOLLIE_API_KEY;
    if (!mollieApiKey) {
      throw new Error("MOLLIE_API_KEY is not set in environment variables.");
    }

    // 1. Calculate amount
    const totalPrice = course.basePrice + course.examFee;
    const depositPrice = course.examFee + 20;
    const amountToPay =
      registrationDetails.paymentOption === "full"
        ? totalPrice
        : depositPrice;

    // 2. Create preliminary registration
    const registration = await prisma.registration.create({
      data: {
        courseId: course.id,
        firstName: registrationDetails.firstName,
        lastName: registrationDetails.lastName,
        email: registrationDetails.email,
        phoneNumber: registrationDetails.phoneNumber,
        dateOfBirth: registrationDetails.dateOfBirth,
        paymentOption: registrationDetails.paymentOption,
        paymentStatus: "pending",
      },
    });

    // 3. Create payment with Mollie
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
    const redirectUrl = `${appUrl}/inschrijving-status?registration_id=${registration.id}`;
    const webhookUrl = `${appUrl}/api/payment-webhook`;

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
        description: `Inschrijving ${course.category?.name} Cursus op ${format(new Date(course.courseDate), "dd-MM-yyyy")}`,
        redirectUrl: redirectUrl,
        webhookUrl: webhookUrl,
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
    await prisma.registration.update({
      where: { id: registration.id },
      data: { molliePaymentId: payment.id },
    });

    // 5. Return checkout URL
    const checkoutUrl = payment._links?.checkout?.href;
    if (!checkoutUrl) {
      throw new Error("Checkout URL not found in Mollie response.");
    }

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error("Error creating payment:", error);
    const message =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}