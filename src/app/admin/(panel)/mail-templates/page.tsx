import prisma from "@/lib/prisma";
import { MailTemplatesEditor } from "@/components/admin/mail-templates-editor";

export default async function MailTemplatesPage() {
  const templates = await prisma.mailTemplate.findMany();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Mail Templates</h1>
      <MailTemplatesEditor templates={templates} />
    </div>
  );
}