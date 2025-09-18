'use server';

import { z } from 'zod';
import { courseSchema } from '@/lib/validators';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { createAuditLog } from '@/lib/audit-log';

export async function createCourse(values: z.infer<typeof courseSchema>) {
  try {
    const course = await prisma.course.create({
      data: values,
    });
    await createAuditLog({
      action: 'CREATE_COURSE',
      entityType: 'Course',
      entityId: course.id,
      details: { date: values.courseDate, locationId: values.locationId },
    });
    revalidatePath('/admin/cursussen');
    revalidatePath('/');
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "Kon cursus niet aanmaken." };
  }
}

export async function updateCourse(id: string, values: z.infer<typeof courseSchema>) {
  try {
    await prisma.course.update({
      where: { id },
      data: values,
    });
    await createAuditLog({
      action: 'UPDATE_COURSE',
      entityType: 'Course',
      entityId: id,
    });
    revalidatePath('/admin/cursussen');
    revalidatePath('/');
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "Kon cursus niet bijwerken." };
  }
}

export async function deleteCourse(id: string) {
  try {
    await prisma.course.delete({
      where: { id },
    });
    await createAuditLog({
      action: 'DELETE_COURSE',
      entityType: 'Course',
      entityId: id,
    });
    revalidatePath('/admin/cursussen');
    revalidatePath('/');
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "Kon cursus niet verwijderen. Mogelijk zijn er nog aanmeldingen." };
  }
}