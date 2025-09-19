"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Logo } from "@/components/logo";
import { resetPassword } from "@/app/actions/auth-actions";
import { toast } from "sonner";

const setPasswordSchema = z.object({
  password: z.string().min(8, "Wachtwoord moet minimaal 8 karakters lang zijn."),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Wachtwoorden komen niet overeen.",
  path: ["confirmPassword"],
});

function SetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof setPasswordSchema>>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: z.infer<typeof setPasswordSchema>) => {
    if (!token) {
      setError("Geen token gevonden. De link is mogelijk ongeldig.");
      return;
    }
    setIsLoading(true);
    setError(null);
    
    const result = await resetPassword(token, values.password);

    if (result.error) {
      setError(result.error);
    } else {
      toast.success("Wachtwoord ingesteld!", {
        description: "Je kunt nu inloggen met je nieuwe wachtwoord.",
      });
      router.push("/admin/login");
    }
    setIsLoading(false);
  };

  if (!token) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Fout</AlertTitle>
        <AlertDescription>Deze link is ongeldig of verlopen. Vraag een nieuwe link aan.</AlertDescription>
      </Alert>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Fout</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <FormField control={form.control} name="password" render={({ field }) => (<FormItem><FormLabel>Nieuw Wachtwoord</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="confirmPassword" render={({ field }) => (<FormItem><FormLabel>Bevestig Wachtwoord</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>)} />
        <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Wachtwoord Instellen
        </Button>
      </form>
    </Form>
  );
}

export default function SetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Wachtwoord Instellen</CardTitle>
            <CardDescription>Kies een nieuw, veilig wachtwoord voor je account.</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Loader2 className="mx-auto h-8 w-8 animate-spin" />}>
              <SetPasswordForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}