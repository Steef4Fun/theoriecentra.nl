'use server';

import { z } from 'zod';
import { userSchema } from '@/lib/validators';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { createAuditLog } from '@/lib/audit-log';
import { revalidatePath } from 'next/cache';
import { sendPasswordSetupEmail } from '@/lib/mail';

export async function createUser(values: z.infer<typeof userSchema>) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: values.email },
    });

    if (existingUser) {
      return { error: "Een gebruiker met dit e-mailadres bestaat al." };
    }

    const userData = {
      email: values.email,
      role: values.role,
      name: values.name,
      title: values.title,
      bio: values.bio,
      passRate: values.passRate,
      imageUrl: values.imageUrl,
    };

    if (values.password) {
      const hashedPassword = await bcrypt.hash(values.password, 10);
      const user = await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });
      await createAuditLog({
        action: 'CREATE_USER_WITH_PASSWORD',
        entityType: 'User',
        entityId: user.id,
        details: { email: values.email, role: values.role },
      });
    } else {
      const setupToken = crypto.randomBytes(32).toString('hex');
      const passwordResetToken = crypto.createHash('sha256').update(setupToken).digest('hex');
      const passwordResetExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 dagen geldig

      const user = await prisma.user.create({
        data: {
          ...userData,
          passwordResetToken,
          passwordResetExpires,
        },
      });

      await sendPasswordSetupEmail(user, setupToken);

      await createAuditLog({
        action: 'CREATE_USER_INVITATION',
        entityType: 'User',
        entityId: user.id,
        details: { email: values.email, role: values.role },
      });
    }
    
    revalidatePath('/admin/gebruikers');
    revalidatePath('/');
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "Er is een fout opgetreden bij het aanmaken van de gebruiker." };
  }
}

export async function updateUser(userId: string, values: z.infer<typeof userSchema>) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        role: values.role,
        name: values.name,
        title: values.title,
        bio: values.bio,
        passRate: values.passRate,
        imageUrl: values.imageUrl,
      },
    });
    await createAuditLog({
        action: 'UPDATE_USER',
        entityType: 'User',
        entityId: userId,
        details: { role: values.role },
    });
    revalidatePath('/admin/gebruikers');
    revalidatePath('/');
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
    await createAuditLog({
        action: 'DELETE_USER',
        entityType: 'User',
        entityId: userId,
    });
    revalidatePath('/admin/gebruikers');
    revalidatePath('/');
    return { error: null };
  } catch (error) {
    return { error: "Er is een fout opgetreden bij het verwijderen van de gebruiker." };
  }
}