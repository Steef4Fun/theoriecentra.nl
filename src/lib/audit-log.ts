"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "./prisma";

type AuditLogData = {
  action: string;
  entityType: string;
  entityId: string;
  details?: object;
};

export async function createAuditLog(data: AuditLogData) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      console.error("Audit Log Error: User not found in session.");
      return;
    }

    await prisma.auditLog.create({
      data: {
        actorId: userId,
        ...data,
      },
    });
  } catch (error) {
    console.error("Failed to create audit log:", error);
  }
}