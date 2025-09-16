"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { settingSchema } from "@/lib/validators";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Trash2, Edit, X, Check } from "lucide-react";

interface Item {
  id: string;
  name: string;
}

interface SettingsCrudProps {
  title: string;
  description: string;
  tableName: "locations" | "categories";
  items: Item[];
}

export function SettingsCrud({ title, description, tableName, items }: SettingsCrudProps) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const form = useForm<z.infer<typeof settingSchema>>({
    resolver: zodResolver(settingSchema),
    defaultValues: { name: "" },
  });

  const onAddNew = async (values: z.infer<typeof settingSchema>) => {
    const { error } = await supabase.from(tableName).insert({ name: values.name });
    if (error) {
      toast.error("Toevoegen mislukt", { description: error.message });
    } else {
      toast.success(`${title.slice(0, -1)} succesvol toegevoegd.`);
      form.reset();
      router.refresh();
    }
  };

  const onUpdate = async (id: string) => {
    if (!editingName.trim()) {
        toast.error("Naam mag niet leeg zijn.");
        return;
    }
    const { error } = await supabase.from(tableName).update({ name: editingName }).eq("id", id);
    if (error) {
      toast.error("Bijwerken mislukt", { description: error.message });
    } else {
      toast.success(`${title.slice(0, -1)} succesvol bijgewerkt.`);
      setEditingId(null);
      router.refresh();
    }
  };

  const onDelete = async (id: string) => {
    const { error } = await supabase.from(tableName).delete().eq("id", id);
    if (error) {
      toast.error("Verwijderen mislukt", { description: error.message });
    } else {
      toast.success(`${title.slice(0, -1)} succesvol verwijderd.`);
      router.refresh();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onAddNew)} className="flex gap-2 mb-4">
            <FormField control={form.control} name="name" render={({ field }) => (<FormItem className="flex-grow"><FormControl><Input placeholder={`Nieuwe ${title.toLowerCase().slice(0, -1)}...`} {...field} /></FormControl><FormMessage /></FormItem>)} />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Toevoegen"}
            </Button>
          </form>
        </Form>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-2 rounded-md border">
              {editingId === item.id ? (
                <Input value={editingName} onChange={(e) => setEditingName(e.target.value)} className="h-8" />
              ) : (
                <span>{item.name}</span>
              )}
              <div className="flex gap-1">
                {editingId === item.id ? (
                    <>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onUpdate(item.id)}><Check className="h-4 w-4 text-green-500" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingId(null)}><X className="h-4 w-4" /></Button>
                    </>
                ) : (
                    <>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingId(item.id); setEditingName(item.name); }}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onDelete(item.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                    </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}