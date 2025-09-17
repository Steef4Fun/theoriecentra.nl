import prisma from "@/lib/prisma";
import { MailTemplatesTable } from "@/components/admin/mail-templates-table";

export default async function MailTemplatesPage() {
  const templates = await prisma.mailTemplate.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mail Templates</h1>
          <p className="text-muted-foreground">Beheer hier de inhoud van de automatische e-mails.</p>
        </div>
      </div>
      <MailTemplatesTable templates={templates} />
    </div>
  );
}