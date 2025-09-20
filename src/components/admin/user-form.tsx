"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { userSchema } from "@/lib/validators";
import { Profile } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createUser, updateUser } from "@/app/actions/user-actions";
import { Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";

interface UserFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  profile: Profile | null;
}

export function UserForm({ isOpen, setIsOpen, profile }: UserFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        email: profile.user?.email,
        role: profile.role as "admin" | "instructor",
        name: profile.user?.name || "",
        title: profile.title || "",
        bio: profile.bio || "",
        passRate: profile.passRate || "",
        imageUrl: profile.imageUrl || "",
      });
    } else {
      form.reset({
        email: "",
        password: "",
        role: "instructor",
        name: "",
        title: "",
        bio: "",
        passRate: "",
        imageUrl: "",
      });
    }
  }, [profile, form, isOpen]);

  const isInstructor = form.watch("role") === "instructor";

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    let result;
    if (profile) {
      result = await updateUser(profile.id, values);
    } else {
      result = await createUser(values);
    }

    if (result.error) {
      toast.error(profile ? "Update mislukt" : "Aanmaken mislukt", { description: result.error });
    } else {
      toast.success(profile ? "Gebruiker succesvol bijgewerkt." : "Gebruiker succesvol aangemaakt.");
      router.refresh();
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{profile ? "Gebruiker Bewerken" : "Nieuwe Gebruiker"}</DialogTitle>
          <DialogDescription>
            {profile ? "Werk de gegevens van de gebruiker bij." : "Maak een nieuw account aan."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>E-mailadres</FormLabel><FormControl><Input type="email" {...field} disabled={!!profile} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Naam</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            {!profile && (
              <FormField control={form.control} name="password" render={({ field }) => (<FormItem><FormLabel>Wachtwoord</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormDescription>Laat leeg om een uitnodigingsmail te sturen.</FormDescription><FormMessage /></FormItem>)} />
            )}
            <FormField control={form.control} name="role" render={({ field }) => (<FormItem><FormLabel>Rol</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecteer een rol" /></SelectTrigger></FormControl><SelectContent><SelectItem value="admin">Admin</SelectItem><SelectItem value="instructor">Cursusleider</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
            
            {isInstructor && (
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">Instructeursprofiel</h3>
                <p className="text-sm text-muted-foreground">Deze informatie wordt getoond op de website.</p>
                <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Titel</FormLabel><FormControl><Input placeholder="bv. Hoofdinstructeur & CBR-expert" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="passRate" render={({ field }) => (<FormItem><FormLabel>Slagingskans</FormLabel><FormControl><Input placeholder="bv. 94%" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="bio" render={({ field }) => (<FormItem><FormLabel>Bio</FormLabel><FormControl><Textarea placeholder="Korte biografie..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="imageUrl" render={({ field }) => (<FormItem><FormLabel>Afbeelding URL</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl><FormDescription>Plak een link naar een profielfoto.</FormDescription><FormMessage /></FormItem>)} />
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Annuleren</Button>
                <Button type="submit" variant="primary" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {profile ? "Wijzigingen Opslaan" : "Gebruiker Aanmaken"}
                </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}