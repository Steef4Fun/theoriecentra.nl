import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MailTemplateForm } from "@/components/admin/mail-template-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function EditMailTemplatePage({ params }: { params: { templateId: string } }) {
  const template = await prisma.mailTemplate.findUnique({
    where: { id: params.templateId },
  });

  if (!template) {
    notFound();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button asChild variant="outline" size="sm" className="mb-2">
            <Link href="/admin/mail-templates">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Terug naar overzicht
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Template Bewerken</h1>
          <p className="text-muted-foreground">Pas hier de inhoud van de &quot;{template.name}&quot; template aan.</p>
        </div>
      </div>
      <MailTemplateForm template={template} />
    </div>
  );
}