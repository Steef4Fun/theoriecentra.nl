'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const updateTemplateSchema = z.object({
  id: z.string(),
  subject: z.string().min(1, "Onderwerp is verplicht."),
  htmlBody: z.string().min(1, "Inhoud is verplicht."),
});

export async function updateMailTemplate(values: z.infer<typeof updateTemplateSchema>) {
  try {
    const validatedData = updateTemplateSchema.parse(values);
    await prisma.mailTemplate.update({
      where: { id: validatedData.id },
      data: {
        subject: validatedData.subject,
        htmlBody: validatedData.htmlBody,
      },
    });
    revalidatePath('/admin/mail-templates');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Kon de template niet bijwerken." };
  }
}