"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { SettingsCrudRow } from "./settings-crud-row";
import { useState } from "react";
import { createSetting } from "@/app/actions/settings-actions";

interface Item {
  id: string;
  name: string;
  icon?: string | null;
}

interface SettingsCrudProps {
  title: string;
  description: string;
  tableName: "location" | "category";
  items: Item[];
}

export function SettingsCrud({ title, description, tableName, items }: SettingsCrudProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onAddNew = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const icon = formData.get("icon") as string | null;

    if (!name || !name.trim()) {
      toast.error("Naam mag niet leeg zijn.");
      setIsSubmitting(false);
      return;
    }

    const result = await createSetting(tableName, name, icon);
    
    if (result.error) {
      toast.error("Toevoegen mislukt", { description: result.error });
    } else {
      toast.success(`${title.slice(0, -1)} succesvol toegevoegd.`);
      form.reset();
      router.refresh();
    }
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onAddNew} className="flex flex-col sm:flex-row gap-2 mb-4">
          <Input name="name" placeholder={`Nieuwe ${title.toLowerCase().slice(0, -1)}...`} required />
          {tableName === 'category' && (
            <Input name="icon" placeholder="Icoon (bv. Car)" />
          )}
          <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Toevoegen"}
          </Button>
        </form>
        <div className="space-y-2">
          {items.map((item) => (
            <SettingsCrudRow
              key={item.id}
              item={item}
              tableName={tableName}
              title={title}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}