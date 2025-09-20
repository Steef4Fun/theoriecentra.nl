"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { InstructorProfile } from "@prisma/client";
import { createInstructorProfile, updateInstructorProfile } from "@/app/actions/instructor-profile-actions";
import { Switch } from "../ui/switch";
import { ImageUpload } from "./image-upload";

interface InstructorProfileFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  profile: InstructorProfile | null;
}

const instructorProfileSchema = z.object({
  name: z.string().min(1, "Naam is verplicht."),
  title: z.string().min(1, "Titel is verplicht."),
  bio: z.string().min(1, "Bio is verplicht."),
  passRate: z.string().min(1, "Slagingskans is verplicht."),
  imageUrl: z.string().min(1, "Afbeelding is verplicht."),
  isActive: z.boolean(),
  order: z.coerce.number().int(),
});

export function InstructorProfileForm({ isOpen, setIsOpen, profile }: InstructorProfileFormProps) {
  const form = useForm<z.infer<typeof instructorProfileSchema>>({
    resolver: zodResolver(instructorProfileSchema),
  });

  useEffect(() => {
    if (profile) {
      form.reset(profile);
    } else {
      form.reset({
        name: "",
        title: "",
        bio: "",
        passRate: "",
        imageUrl: "",
        isActive: true,
        order: 0,
      });
    }
  }, [profile, form, isOpen]);

  const onSubmit = async (values: z.infer<typeof instructorProfileSchema>) => {
    const result = profile
      ? await updateInstructorProfile(profile.id, values)
      : await createInstructorProfile(values);

    if (result.error) {
      toast.error("Opslaan mislukt", { description: result.error });
    } else {
      toast.success("Profiel succesvol opgeslagen.");
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{profile ? "Profiel Bewerken" : "Nieuw Instructeursprofiel"}</DialogTitle>
          <DialogDescription>Vul de gegevens in die op de website getoond moeten worden.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="imageUrl" render={({ field }) => (<FormItem><FormLabel>Profielfoto</FormLabel><FormControl><ImageUpload value={field.value} onChange={field.onChange} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Naam</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Titel</FormLabel><FormControl><Input placeholder="bv. Hoofdinstructeur" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="passRate" render={({ field }) => (<FormItem><FormLabel>Slagingskans</FormLabel><FormControl><Input placeholder="bv. 94%" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="bio" render={({ field }) => (<FormItem><FormLabel>Bio</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
            <div className="flex justify-between">
              <FormField control={form.control} name="order" render={({ field }) => (<FormItem><FormLabel>Volgorde</FormLabel><FormControl><Input type="number" className="w-24" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="isActive" render={({ field }) => (<FormItem className="flex flex-col items-center"><FormLabel>Actief</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Annuleren</Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Opslaan
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}