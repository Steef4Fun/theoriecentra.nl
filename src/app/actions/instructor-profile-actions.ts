'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { createAuditLog } from '@/lib/audit-log';

const instructorProfileSchema = z.object({
  name: z.string().min(1, "Naam is verplicht."),
  title: z.string().min(1, "Titel is verplicht."),
  bio: z.string().min(1, "Bio is verplicht."),
  passRate: z.string().min(1, "Slagingskans is verplicht."),
  imageUrl: z.string().url("Voer een geldige URL in."),
  isActive: z.boolean(),
  order: z.coerce.number().int(),
});

export async function createInstructorProfile(values: z.infer<typeof instructorProfileSchema>) {
  try {
    const profile = await prisma.instructorProfile.create({ data: values });
    await createAuditLog({
      action: 'CREATE_INSTRUCTOR_PROFILE',
      entityType: 'InstructorProfile',
      entityId: profile.id,
      details: { name: values.name },
    });
    revalidatePath('/admin/instellingen');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { error: "Kon profiel niet aanmaken." };
  }
}

export async function updateInstructorProfile(id: string, values: z.infer<typeof instructorProfileSchema>) {
  try {
    await prisma.instructorProfile.update({ where: { id }, data: values });
    await createAuditLog({
      action: 'UPDATE_INSTRUCTOR_PROFILE',
      entityType: 'InstructorProfile',
      entityId: id,
    });
    revalidatePath('/admin/instellingen');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { error: "Kon profiel niet bijwerken." };
  }
}

export async function deleteInstructorProfile(id: string) {
  try {
    await prisma.instructorProfile.delete({ where: { id } });
    await createAuditLog({
      action: 'DELETE_INSTRUCTOR_PROFILE',
      entityType: 'InstructorProfile',
      entityId: id,
    });
    revalidatePath('/admin/instellingen');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { error: "Kon profiel niet verwijderen." };
  }
}