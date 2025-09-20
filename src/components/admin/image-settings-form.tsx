"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { updateWebsiteSettings } from "@/app/actions/settings-actions";
import { Setting } from "@prisma/client";
import { ImageUpload } from "./image-upload";

const imageKeys = [
  { key: 'imageUrlHero', label: 'Hero Afbeelding', description: 'De grote afbeelding op de homepage.' },
  { key: 'imageUrlHowItWorks1', label: 'Hoe het werkt - Stap 1', description: 'Afbeelding voor de eerste stap.' },
  { key: 'imageUrlHowItWorks2', label: 'Hoe het werkt - Stap 2', description: 'Afbeelding voor de tweede stap.' },
  { key: 'imageUrlHowItWorks3', label: 'Hoe het werkt - Stap 3', description: 'Afbeelding voor de derde stap.' },
  { key: 'imageUrlAboutHero', label: 'Over Ons - Hero', description: 'De hero-afbeelding op de "Over Ons" pagina.' },
  { key: 'imageUrlAboutStory1', label: 'Over Ons - Verhaal 1', description: 'Eerste afbeelding in het verhaal.' },
  { key: 'imageUrlAboutStory2', label: 'Over Ons - Verhaal 2', description: 'Tweede afbeelding in het verhaal.' },
  { key: 'imageUrlContactHero', label: 'Contact - Hero', description: 'De hero-afbeelding op de contactpagina.' },
];

interface ImageSettingsFormProps {
  settings: Setting[];
}

export function ImageSettingsForm({ settings }: ImageSettingsFormProps) {
  const defaultValues = imageKeys.reduce((acc, item) => {
    acc[item.key] = settings.find(s => s.key === item.key)?.value || '';
    return acc;
  }, {} as Record<string, string>);

  const form = useForm({ defaultValues });

  const onSubmit = async (values: Record<string, string>) => {
    const settingsToUpdate = Object.entries(values).map(([key, value]) => ({ key, value }));
    const result = await updateWebsiteSettings(settingsToUpdate);
    if (result.error) {
      toast.error("Opslaan mislukt", { description: result.error });
    } else {
      toast.success("Afbeeldingen succesvol opgeslagen!");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Afbeeldingen</CardTitle>
        <CardDescription>
          Beheer hier de belangrijkste afbeeldingen van de website.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {imageKeys.map(item => (
                <FormField
                  key={item.key}
                  control={form.control}
                  name={item.key}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.label}</FormLabel>
                      <FormControl>
                        <ImageUpload value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormDescription>{item.description}</FormDescription>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Opslaan
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}