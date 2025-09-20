'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { createAuditLog } from '@/lib/audit-log';
import { reviewSchema } from '@/lib/validators';

export async function createReview(values: z.infer<typeof reviewSchema>) {
  try {
    const review = await prisma.review.create({ data: values });
    await createAuditLog({
      action: 'CREATE_REVIEW',
      entityType: 'Review',
      entityId: review.id,
      details: { name: values.name },
    });
    revalidatePath('/admin/instellingen');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { error: "Kon review niet aanmaken." };
  }
}

export async function updateReview(id: string, values: z.infer<typeof reviewSchema>) {
  try {
    await prisma.review.update({ where: { id }, data: values });
    await createAuditLog({
      action: 'UPDATE_REVIEW',
      entityType: 'Review',
      entityId: id,
    });
    revalidatePath('/admin/instellingen');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { error: "Kon review niet bijwerken." };
  }
}

export async function deleteReview(id: string) {
  try {
    await prisma.review.delete({ where: { id } });
    await createAuditLog({
      action: 'DELETE_REVIEW',
      entityType: 'Review',
      entityId: id,
    });
    revalidatePath('/admin/instellingen');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { error: "Kon review niet verwijderen." };
  }
}