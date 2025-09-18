'use server';

import { z } from 'zod';
import { contactSchema } from '@/lib/validators';
import { Resend } from 'resend';
import { ContactFormReceiptEmail } from '@/emails/contact-form-receipt';
import { NewContactMessageEmail } from '@/emails/new-contact-message';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = 'Theoriecentra.nl <info@theoriecentra.chargehosting.com>';
const adminEmail = process.env.ADMIN_EMAIL || 'info@theoriecentra.nl';

export async function sendContactMessage(values: z.infer<typeof contactSchema>) {
  try {
    const validatedData = contactSchema.parse(values);
    const { name, email, message } = validatedData;

    // Send notification to admin
    await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `Nieuw contactbericht van ${name}`,
      react: NewContactMessageEmail({ name, email, message }),
    });

    // Send confirmation to user
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'We hebben je bericht ontvangen!',
      react: ContactFormReceiptEmail({ name }),
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending contact message:", error);
    return { error: "Er is een fout opgetreden bij het verzenden van het bericht." };
  }
}