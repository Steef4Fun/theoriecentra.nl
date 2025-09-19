'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/lib/mail';
import bcrypt from 'bcrypt';

const emailSchema = z.string().email();
const passwordSchema = z.string().min(8, "Wachtwoord moet minimaal 8 karakters lang zijn.");

export async function generatePasswordResetToken(email: string) {
  try {
    emailSchema.parse(email);
    const user = await prisma.user.findUnique({ where: { email } });

    // Stuur altijd een succesbericht om e-mail enumeratie te voorkomen
    if (!user) {
      return { success: "Als dit e-mailadres in ons systeem bestaat, is er een herstellink verzonden." };
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const passwordResetExpires = new Date(Date.now() + 3600000); // 1 uur geldig

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordResetToken, passwordResetExpires },
    });

    await sendPasswordResetEmail(user, resetToken);

    return { success: "Als dit e-mailadres in ons systeem bestaat, is er een herstellink verzonden." };
  } catch (error) {
    console.error(error);
    return { error: "Er is een fout opgetreden." };
  }
}

export async function resetPassword(token: string, password: string) {
  try {
    passwordSchema.parse(password);
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await prisma.user.findUnique({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires: { gt: new Date() },
      },
    });

    if (!user) {
      return { error: "Token is ongeldig of verlopen." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    return { success: "Wachtwoord succesvol bijgewerkt." };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    console.error(error);
    return { error: "Kon wachtwoord niet resetten." };
  }
}