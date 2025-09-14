"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { registrationSchema } from "@/lib/validators";
import type { Course } from "@/lib/types";
import { toast } from "sonner";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface RegistrationFormProps {
  course: Course;
}

export function RegistrationForm({ course }: RegistrationFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      courseId: course.id,
    },
  });

  async function onSubmit(values: z.infer<typeof registrationSchema>) {
    setIsLoading(true);
    try {
      // Dynamically create the redirect and webhook URLs based on the current location
      const redirectUrl = `${window.location.origin}/inschrijving-status`;
      const webhookUrl = `${window.location.origin}/api/webhooks/mollie`;

      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: {
          course: course,
          registrationDetails: values,
          redirectUrl: redirectUrl,
          webhookUrl: webhookUrl, // Pass the new webhook URL
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error("Geen betaallink ontvangen.");
      }

    } catch (error) {
      console.error("Payment initiation failed:", error);
      toast.error("Betaling kon niet worden gestart", {
        description: "Controleer je gegevens en probeer het opnieuw. Als het probleem aanhoudt, neem dan contact op.",
      });
      setIsLoading(false);
    }
  }

  const totalPrice = course.base_price + course.exam_fee;
  const depositPrice = course.exam_fee + 20; // Exam fee + 20 euro
  const remainingPrice = totalPrice - depositPrice;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Voornaam</FormLabel>
                <FormControl>
                  <Input placeholder="Jan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Achternaam</FormLabel>
                <FormControl>
                  <Input placeholder="Jansen" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mailadres</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="voorbeeld@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefoonnummer</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="0612345678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Geboortedatum</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: nl })
                        ) : (
                          <span>Kies een datum</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      locale={nl}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="paymentOption"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-semibold">Kies je betaaloptie</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 has-[:checked]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="full" />
                    </FormControl>
                    <FormLabel className="font-normal w-full">
                      <div className="flex justify-between items-center">
                        <span>Volledige betaling</span>
                        <span className="font-bold">€{totalPrice.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Betaal het volledige bedrag direct online.</p>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 has-[:checked]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="deposit" />
                    </FormControl>
                    <FormLabel className="font-normal w-full">
                      <div className="flex justify-between items-center">
                        <span>Aanbetaling</span>
                        <span className="font-bold">€{depositPrice.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Betaal €{depositPrice.toFixed(2)} nu, en het resterende bedrag van €{remainingPrice.toFixed(2)} contant op de cursusdag.</p>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Bezig met verwerken...</span>
            </>
          ) : (
            "Inschrijving Afronden & Betalen"
          )}
        </Button>
      </form>
    </Form>
  );
}