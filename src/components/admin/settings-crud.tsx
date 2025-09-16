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
import { Loader2 } from "lucide-react";
import { SettingsCrudRow } from "./settings-crud-row";

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