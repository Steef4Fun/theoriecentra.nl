'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';
import { sendCancellationEmail, sendRescheduleEmail } from '@/lib/mail';
import { createAuditLog } from '@/lib/audit-log';

export async function cancelRegistration(registrationId: string) {
  try {
    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
      include: {
        course: {
          include: {
            category: true,
            location: true,
            instructor: true,
          },
        },
      },
    });

    if (!registration) {
      return { error: "Aanmelding niet gevonden." };
    }

    const wasPaid = registration.paymentStatus === 'paid';

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
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

    await sendCancellationEmail(registration);
    await createAuditLog({
      action: 'CANCEL_REGISTRATION',
      entityType: 'Registration',
      entityId: registrationId,
      details: { student: `${registration.firstName} ${registration.lastName}` },
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
    const registration = await prisma.registration.findUnique({ 
        where: { id: registrationId },
        include: { course: true }
    });
    if (!registration) throw new Error("Aanmelding niet gevonden.");
    if (!registration.courseId) throw new Error("Aanmelding is niet gekoppeld aan een cursus.");

    const oldCourseId = registration.courseId;
    const oldCourseDate = registration.course!.courseDate;

    if (oldCourseId === newCourseId) {
      return { error: "Kan niet verzetten naar dezelfde cursus." };
    }

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.registration.update({
        where: { id: registrationId },
        data: { courseId: newCourseId },
      });
      await tx.course.update({
        where: { id: newCourseId },
        data: { spotsAvailable: { decrement: 1 } },
      });
      await tx.course.update({
        where: { id: oldCourseId },
        data: { spotsAvailable: { increment: 1 } },
      });
    });

    const updatedRegistration = await prisma.registration.findUnique({
        where: { id: registrationId },
        include: { course: { include: { category: true, location: true, instructor: true } } },
    });

    if (updatedRegistration) {
        await sendRescheduleEmail(updatedRegistration, oldCourseDate);
    }

    await createAuditLog({
        action: 'RESCHEDULE_REGISTRATION',
        entityType: 'Registration',
        entityId: registrationId,
        details: { fromCourseId: oldCourseId, toCourseId: newCourseId },
    });

    revalidatePath(`/admin/aanmeldingen`);
    revalidatePath(`/admin/aanmeldingen/${registrationId}`);
    return { success: "Aanmelding succesvol verzet." };
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return { error: "Een van de cursussen is niet gevonden." };
    }
    return { error: "Kon de aanmelding niet verzetten." };
  }
}