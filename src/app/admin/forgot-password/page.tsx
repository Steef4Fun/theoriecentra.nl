"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
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
import { generatePasswordResetToken } from "@/app/actions/auth-actions";
import Link from "next/link";

const forgotPasswordSchema = z.object({
  email: z.string().email("Voer een geldig e-mailadres in."),
});

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    setIsLoading(true);
    setMessage(null);
    const result = await generatePasswordResetToken(values.email);
    if (result.success) {
      setMessage(result.success);
    } else {
      setMessage(result.error || "Er is een onverwachte fout opgetreden.");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Wachtwoord Vergeten</CardTitle>
            <CardDescription>
              Voer je e-mailadres in. We sturen je een link om je wachtwoord te resetten.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {message ? (
              <Alert>
                <AlertTitle>Controleer je e-mail</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mailadres</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="admin@voorbeeld.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Verstuur Reset Link
                  </Button>
                </form>
              </Form>
            )}
            <div className="mt-4 text-center text-sm">
              <Link href="/admin/login" className="underline">
                Terug naar inloggen
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}