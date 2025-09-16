'use server';

import { z } from 'zod';
import { userSchema } from '@/lib/validators';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function createUser(values: z.infer<typeof userSchema>) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: values.email },
    });

    if (existingUser) {
      return { error: "Een gebruiker met dit e-mailadres bestaat al." };
    }

    if (!values.password) {
        return { error: "Wachtwoord is verplicht bij het aanmaken van een gebruiker." };
    }

    const hashedPassword = await bcrypt.hash(values.password, 10);

    await prisma.user.create({
      data: {
        email: values.email,
        password: hashedPassword,
        role: values.role,
        instructorNumber: values.role === 'instructor' ? values.instructorNumber : null,
      },
    });

    return { error: null };
  } catch (error) {
    return { error: "Er is een fout opgetreden bij het aanmaken van de gebruiker." };
  }
}

export async function updateUser(userId: string, values: z.infer<typeof userSchema>) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        role: values.role,
        instructorNumber: values.role === 'instructor' ? values.instructorNumber : null,
      },
    });
    return { error: null };
  } catch (error) {
    return { error: "Er is een fout opgetreden bij het bijwerken van de gebruiker." };
  }
}

export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    return { error: null };
  } catch (error) {
    return { error: "Er is een fout opgetreden bij het verwijderen van de gebruiker." };
  }
}