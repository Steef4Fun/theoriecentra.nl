"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Loader2, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { registrationSchema } from "@/lib/validators";
import type { Course } from "@/lib/types";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface RegistrationWizardProps {
  course: Course;
}

const steps = [
  { id: "Cursus", name: "Cursusdetails", fields: [] },
  { id: "Gegevens", name: "Persoonlijke Gegevens", fields: ["firstName", "lastName", "email", "phoneNumber", "dateOfBirth"] },
  { id: "Betaling", name: "Betaaloptie", fields: ["paymentOption"] },
  { id: "Overzicht", name: "Bevestiging", fields: [] },
];

export function RegistrationWizard({ course }: RegistrationWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
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

  const totalPrice = course.base_price + course.exam_fee;
  const depositPrice = course.exam_fee + 20;
  const remainingPrice = totalPrice - depositPrice;

  type FieldName = keyof z.infer<typeof registrationSchema>;

  const next = async () => {
    const fields = steps[currentStep].fields as FieldName[];
    const output = await form.trigger(fields, { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  async function onSubmit(values: z.infer<typeof registrationSchema>) {
    setIsLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/inschrijving-status`;
      const webhookUrl = `https://mmuhtwhyldvvgcclobuz.supabase.co/functions/v1/payment-webhook`;

      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: { course, registrationDetails: values, redirectUrl, webhookUrl },
      });

      if (error) throw new Error(error.message);
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error("Geen betaallink ontvangen.");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      toast.error("Betaling kon niet worden gestart", {
        description: "Controleer je gegevens en probeer het opnieuw.",
      });
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <nav className="flex items-center justify-center" aria-label="Progress">
          <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
            {steps.map((step, index) => (
              <li key={step.name} className="md:flex-1">
                {currentStep > index ? (
                  <div className="group flex w-full flex-col border-l-4 border-primary py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-primary transition-colors">{step.id}</span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                ) : currentStep === index ? (
                  <div className="flex w-full flex-col border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4" aria-current="step">
                    <span className="text-sm font-medium text-primary">{step.id}</span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                ) : (
                  <div className="group flex w-full flex-col border-l-4 border-border py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-muted-foreground transition-colors">{step.id}</span>
                    <span className="text-sm font-medium text-muted-foreground">{step.name}</span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {currentStep === 0 && (
              <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                <h2 className="text-xl font-semibold">Controleer je cursus</h2>
                <p className="text-muted-foreground">Dit is de cursus waarvoor je je inschrijft.</p>
                <div className="mt-4 space-y-2 rounded-lg border p-4">
                  <p><strong>Cursus:</strong> {course.category?.name} Theoriecursus</p>
                  <p><strong>Locatie:</strong> {course.location?.name}</p>
                  <p><strong>Datum:</strong> {format(new Date(course.course_date), "eeee d MMMM yyyy", { locale: nl })}</p>
                  <p><strong>Tijd:</strong> {course.start_time.substring(0, 5)} - {course.end_time.substring(0, 5)}</p>
                  <p className="font-bold text-lg mt-2">Totaalprijs: €{totalPrice.toFixed(2)}</p>
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>Voornaam</FormLabel><FormControl><Input placeholder="Jan" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Achternaam</FormLabel><FormControl><Input placeholder="Jansen" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>E-mailadres</FormLabel><FormControl><Input type="email" placeholder="voorbeeld@email.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="phoneNumber" render={({ field }) => (<FormItem><FormLabel>Telefoonnummer</FormLabel><FormControl><Input type="tel" placeholder="0612345678" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="dateOfBirth" render={({ field }) => (<FormItem className="flex flex-col"><FormLabel>Geboortedatum</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal",!field.value && "text-muted-foreground")}>{field.value ? (format(field.value, "PPP", { locale: nl })) : (<span>Kies een datum</span>)}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus locale={nl} /></PopoverContent></Popover><FormMessage /></FormItem>)} />
                 </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                <FormField control={form.control} name="paymentOption" render={({ field }) => (<FormItem className="space-y-3"><FormLabel className="text-base font-semibold">Kies je betaaloptie</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1"><FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 has-[:checked]:border-primary"><FormControl><RadioGroupItem value="full" /></FormControl><FormLabel className="font-normal w-full"><div className="flex justify-between items-center"><span>Volledige betaling</span><span className="font-bold">€{totalPrice.toFixed(2)}</span></div><p className="text-xs text-muted-foreground">Betaal het volledige bedrag direct online.</p></FormLabel></FormItem><FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 has-[:checked]:border-primary"><FormControl><RadioGroupItem value="deposit" /></FormControl><FormLabel className="font-normal w-full"><div className="flex justify-between items-center"><span>Aanbetaling</span><span className="font-bold">€{depositPrice.toFixed(2)}</span></div><p className="text-xs text-muted-foreground">Betaal €{depositPrice.toFixed(2)} nu, en het resterende bedrag van €{remainingPrice.toFixed(2)} contant op de cursusdag.</p></FormLabel></FormItem></RadioGroup></FormControl><FormMessage /></FormItem>)} />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                <h2 className="text-xl font-semibold">Overzicht en Bevestiging</h2>
                <p className="text-muted-foreground">Controleer je gegevens voordat je doorgaat naar betalen.</p>
                <div className="mt-4 space-y-2 rounded-lg border p-4">
                    <p><strong>Naam:</strong> {form.getValues("firstName")} {form.getValues("lastName")}</p>
                    <p><strong>Email:</strong> {form.getValues("email")}</p>
                    <p><strong>Telefoon:</strong> {form.getValues("phoneNumber")}</p>
                    <p><strong>Geboortedatum:</strong> {format(form.getValues("dateOfBirth"), "d MMMM yyyy", { locale: nl })}</p>
                    <p className="font-bold mt-2">Gekozen optie: {form.getValues("paymentOption") === 'full' ? `Volledige betaling (€${totalPrice.toFixed(2)})` : `Aanbetaling (€${depositPrice.toFixed(2)})`}</p>
                </div>
              </motion.div>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          <Button onClick={prev} type="button" variant="outline" disabled={currentStep === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Terug
          </Button>
          {currentStep === steps.length - 1 ? (
            <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
              {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Bezig...</>) : (<>Afronden & Betalen <Check className="ml-2 h-4 w-4" /></>)}
            </Button>
          ) : (
            <Button onClick={next} type="button">
              Volgende <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}