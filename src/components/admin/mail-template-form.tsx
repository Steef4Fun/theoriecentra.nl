"use client";

import { useState } from "react";
import { MailTemplate } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Eye, Code, Copy } from "lucide-react";
import { updateMailTemplate } from "@/app/actions/mail-template-actions";
import { TiptapEditor } from "./tiptap-editor";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";

const placeholderMap: Record<string, string[]> = {
  'registration-confirmation': ['{{name}}', '{{courseName}}', '{{courseDate}}', '{{courseTime}}', '{{location}}', '{{paymentDetails}}'],
  'authorization-request': ['{{name}}', '{{instructorNumber}}'],
  'new-registration-notification': ['{{studentName}}', '{{courseName}}', '{{courseDate}}', '{{registrationId}}'],
  'cancellation-confirmation': ['{{name}}', '{{courseName}}', '{{courseDate}}'],
  'reschedule-confirmation': ['{{name}}', '{{courseName}}', '{{oldCourseDate}}', '{{newCourseDate}}', '{{newCourseTime}}', '{{location}}'],
};

export function MailTemplateForm({ template }: { template: MailTemplate }) {
  const [subject, setSubject] = useState(template.subject);
  const [htmlBody, setHtmlBody] = useState(template.htmlBody);
  const [isLoading, setIsLoading] = useState(false);
  const [isHtmlMode, setIsHtmlMode] = useState(false);

  const availablePlaceholders = placeholderMap[template.name] || [];

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

  const copyPlaceholder = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`'${text}' gekopieerd naar klembord!`);
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium">Onderwerp</label>
          <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Inhoud</label>
            <Button variant="outline" size="sm" onClick={() => setIsHtmlMode(!isHtmlMode)}>
              <Code className="mr-2 h-4 w-4" />
              {isHtmlMode ? "Visuele Editor" : "HTML Editor"}
            </Button>
          </div>
          {isHtmlMode ? (
            <Textarea value={htmlBody} onChange={(e) => setHtmlBody(e.target.value)} className="min-h-[400px] font-mono text-xs" />
          ) : (
            <TiptapEditor content={htmlBody} onChange={setHtmlBody} />
          )}
        </div>
        
        {availablePlaceholders.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Beschikbare Placeholders</label>
            <div className="flex flex-wrap gap-2">
              {availablePlaceholders.map(placeholder => (
                <Badge key={placeholder} variant="secondary" className="cursor-pointer" onClick={() => copyPlaceholder(placeholder)}>
                  {placeholder} <Copy className="ml-2 h-3 w-3" />
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 border-t pt-6">
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
                  className="prose max-w-none"
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