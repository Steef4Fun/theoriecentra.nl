"use client";

import { useState } from "react";
import { MailTemplate } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Eye } from "lucide-react";
import { updateMailTemplate } from "@/app/actions/mail-template-actions";
import { TiptapEditor } from "./tiptap-editor";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "../ui/card";

export function MailTemplateForm({ template }: { template: MailTemplate }) {
  const [subject, setSubject] = useState(template.subject);
  const [htmlBody, setHtmlBody] = useState(template.htmlBody);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    const result = await updateMailTemplate({
      id: template.id,
      subject,
      htmlBody,
    });
    if (result.error) {
      toast.error("Opslaan mislukt", { description: result.error });
    } else {
      toast.success("Template succesvol opgeslagen!");
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium">Onderwerp</label>
          <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Inhoud</label>
          <TiptapEditor content={htmlBody} onChange={setHtmlBody} />
           <p className="text-xs text-muted-foreground">
            {'Gebruik placeholders zoals `{{name}}` voor dynamische data.'}
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline"><Eye className="mr-2 h-4 w-4" /> Voorbeeld</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>E-mail Voorbeeld</DialogTitle>
              </DialogHeader>
              <div className="p-4 border rounded-md bg-gray-100">
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: htmlBody }}
                />
              </div>
            </DialogContent>
          </Dialog>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Opslaan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}