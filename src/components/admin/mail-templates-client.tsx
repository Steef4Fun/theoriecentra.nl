"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
}

export function MailTemplatesClient({ templates }: { templates: Template[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {templates.map((template) => (
        <Card key={template.id}>
          <CardHeader>
            <CardTitle>{template.name}</CardTitle>
            <CardDescription>{template.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" disabled>
              <Eye className="mr-2 h-4 w-4" /> Voorbeeld (binnenkort)
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}