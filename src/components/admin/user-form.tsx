"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
      });
    } else {
      form.reset({
        email: "",
        password: "",
        role: "instructor",
      });
    }
  }, [profile, form, isOpen]);

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{profile ? "Gebruiker Bewerken" : "Nieuwe Gebruiker"}</DialogTitle>
          <DialogDescription>
            {profile ? "Werk de gegevens van de gebruiker bij." : "Maak een nieuw account aan."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>E-mailadres</FormLabel><FormControl><Input type="email" {...field} disabled={!!profile} /></FormControl><FormMessage /></FormItem>)} />
            {!profile && (
              <FormField control={form.control} name="password" render={({ field }) => (<FormItem><FormLabel>Wachtwoord</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>)} />
            )}
            <FormField control={form.control} name="role" render={({ field }) => (<FormItem><FormLabel>Rol</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecteer een rol" /></SelectTrigger></FormControl><SelectContent><SelectItem value="admin">Admin</SelectItem><SelectItem value="instructor">Cursusleider</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
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