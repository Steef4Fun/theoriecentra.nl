'use server';

import { z } from 'zod';
import { courseSchema } from '@/lib/validators';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createCourse(values: z.infer<typeof courseSchema>) {
  try {
    await prisma.course.create({
      data: values,
    });
    revalidatePath('/admin/cursussen');
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
    revalidatePath('/admin/cursussen');
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
    revalidatePath('/admin/cursussen');
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "Kon cursus niet verwijderen. Mogelijk zijn er nog aanmeldingen." };
  }
}