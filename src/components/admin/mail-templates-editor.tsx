"use client";

import { useState, useEffect } from "react";
import { MailTemplate } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { updateMailTemplate } from "@/app/actions/mail-template-actions";

export function MailTemplatesEditor({ templates }: { templates: MailTemplate[] }) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | undefined>(templates[0]?.id);
  const [currentTemplate, setCurrentTemplate] = useState<MailTemplate | undefined>(templates[0]);
  const [subject, setSubject] = useState("");
  const [htmlBody, setHtmlBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const template = templates.find(t => t.id === selectedTemplateId);
    setCurrentTemplate(template);
    if (template) {
      setSubject(template.subject);
      setHtmlBody(template.htmlBody);
    }
  }, [selectedTemplateId, templates]);

  const handleSave = async () => {
    if (!currentTemplate) return;
    setIsLoading(true);
    const result = await updateMailTemplate({
      id: currentTemplate.id,
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
      <CardHeader>
        <CardTitle>Mail Template Editor</CardTitle>
        <CardDescription>
          {'Selecteer een template om de inhoud aan te passen. Gebruik placeholders zoals `{{name}}` voor dynamische data.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select onValueChange={setSelectedTemplateId} value={selectedTemplateId}>
          <SelectTrigger>
            <SelectValue placeholder="Selecteer een template..." />
          </SelectTrigger>
          <SelectContent>
            {templates.map(t => (
              <SelectItem key={t.id} value={t.id}>
                {t.name} - ({t.description})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {currentTemplate && (
          <div className="space-y-4 pt-4 border-t">
            <div>
              <label htmlFor="subject" className="text-sm font-medium">Onderwerp</label>
              <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div>
              <label htmlFor="htmlBody" className="text-sm font-medium">HTML Inhoud</label>
              <Textarea id="htmlBody" value={htmlBody} onChange={(e) => setHtmlBody(e.target.value)} className="min-h-[400px] font-mono text-xs" />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Opslaan
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}