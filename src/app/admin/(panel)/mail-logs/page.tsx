import { MailLogsTable } from "@/components/admin/mail-logs-table";
import prisma from "@/lib/prisma";

export default async function MailLogsPage() {
  const logs = await prisma.mailLog.findMany({
    orderBy: {
      sentAt: "desc",
    },
    take: 100, // Limiteer tot de laatste 100 voor performance
  });

  return (
    <div>
      <MailLogsTable logs={logs} />
    </div>
  );
}