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

export async function rescheduleRegistration(registrationId: string, newCourseId: string) {
  try {
    const registration = await prisma.registration.findUnique({ where: { id: registrationId } });
    if (!registration) throw new Error("Aanmelding niet gevonden.");
    if (!registration.courseId) throw new Error("Aanmelding is niet gekoppeld aan een cursus.");

    const oldCourseId = registration.courseId;

    if (oldCourseId === newCourseId) {
      return { error: "Kan niet verzetten naar dezelfde cursus." };
    }

    await prisma.$transaction(async (tx) => {
      // Update registration
      await tx.registration.update({
        where: { id: registrationId },
        data: { courseId: newCourseId },
      });

      // Decrement spots on new course
      await tx.course.update({
        where: { id: newCourseId },
        data: { spotsAvailable: { decrement: 1 } },
      });

      // Increment spots on old course
      await tx.course.update({
        where: { id: oldCourseId },
        data: { spotsAvailable: { increment: 1 } },
      });
    });

    revalidatePath(`/admin/aanmeldingen`);
    revalidatePath(`/admin/aanmeldingen/${registrationId}`);
    return { success: "Aanmelding succesvol verzet." };
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return { error: "Een van de cursussen is niet gevonden." };
      }
    }
    return { error: "Kon de aanmelding niet verzetten." };
  }
}