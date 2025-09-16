'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';

export async function cancelRegistration(registrationId: string) {
  try {
    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
      select: { courseId: true, paymentStatus: true },
    });

    if (!registration) {
      return { error: "Aanmelding niet gevonden." };
    }

    // Alleen plekken vrijgeven als de status 'paid' was.
    const wasPaid = registration.paymentStatus === 'paid';

    await prisma.$transaction(async (tx) => {
      await tx.registration.update({
        where: { id: registrationId },
        data: { paymentStatus: 'canceled' },
      });

      if (wasPaid && registration.courseId) {
        await tx.course.update({
          where: { id: registration.courseId },
          data: { spotsAvailable: { increment: 1 } },
        });
      }
    });

    revalidatePath(`/admin/aanmeldingen`);
    revalidatePath(`/admin/aanmeldingen/${registrationId}`);
    return { success: "Aanmelding succesvol geannuleerd." };
  } catch (error) {
    console.error(error);
    return { error: "Kon de aanmelding niet annuleren." };
  }
}