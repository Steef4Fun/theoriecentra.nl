import { AuditLogsTable } from "@/components/admin/audit-logs-table";
import prisma from "@/lib/prisma";

export default async function AuditLogsPage() {
  const logs = await prisma.auditLog.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
    include: {
      actor: true,
    },
  });

  return (
    <div>
      <AuditLogsTable logs={logs as any} />
    </div>
  );
}