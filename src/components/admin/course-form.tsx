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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { courseSchema } from "@/lib/validators";
import { Category, Course, Location } from "@/lib/types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface CourseFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  course: Course | null;
  locations: Location[];
  categories: Category[];
}

export function CourseForm({ isOpen, setIsOpen, course, locations, categories }: CourseFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
  });

  useEffect(() => {
    if (course) {
      form.reset({
        ...course,
        course_date: new Date(course.course_date),
        start_time: course.start_time.substring(0, 5),
        end_time: course.end_time.substring(0, 5),
      });
    } else {
      form.reset({
        course_date: undefined,
        start_time: "08:00",
        end_time: "15:00",
        location_id: undefined,
        category_id: undefined,
        base_price: 99.00,
        exam_fee: 48.75,
        instructor_number: "",
        spots_available: 15,
      });
    }
  }, [course, form, isOpen]);

  const onSubmit = async (values: z.infer<typeof courseSchema>) => {
    const dataToSubmit = {
      ...values,
      course_date: format(values.course_date, "yyyy-MM-dd"),
    };

    if (course) {
      // Update
      const { error } = await supabase.from("courses").update(dataToSubmit).eq("id", course.id);
      if (error) {
        toast.error("Update mislukt", { description: error.message });
      } else {
        toast.success("Cursus succesvol bijgewerkt.");
      }
    } else {
      // Create
      const { error } = await supabase.from("courses").insert(dataToSubmit);
      if (error) {
        toast.error("Aanmaken mislukt", { description: error.message });
      } else {
        toast.success("Cursus succesvol aangemaakt.");
      }
    }
    router.refresh();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{course ? "Cursus Bewerken" : "Nieuwe Cursus Toevoegen"}</DialogTitle>
          <DialogDescription>
            {course ? "Werk de details van de cursus bij." : "Vul de details in om een nieuwe cursus aan te maken."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="course_date" render={({ field }) => (<FormItem className="flex flex-col"><FormLabel>Datum</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal",!field.value && "text-muted-foreground")}>{field.value ? (format(field.value, "PPP", { locale: nl })) : (<span>Kies een datum</span>)}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus locale={nl} /></PopoverContent></Popover><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="instructor_number" render={({ field }) => (<FormItem><FormLabel>Opleidernummer</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="start_time" render={({ field }) => (<FormItem><FormLabel>Starttijd</FormLabel><FormControl><Input type="time" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="end_time" render={({ field }) => (<FormItem><FormLabel>Eindtijd</FormLabel><FormControl><Input type="time" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="location_id" render={({ field }) => (<FormItem><FormLabel>Locatie</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecteer een locatie" /></SelectTrigger></FormControl><SelectContent>{locations.map(l => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="category_id" render={({ field }) => (<FormItem><FormLabel>Categorie</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecteer een categorie" /></SelectTrigger></FormControl><SelectContent>{categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="base_price" render={({ field }) => (<FormItem><FormLabel>Cursusprijs</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="exam_fee" render={({ field }) => (<FormItem><FormLabel>Examengeld</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="spots_available" render={({ field }) => (<FormItem><FormLabel>Plekken</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Annuleren</Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {course ? "Wijzigingen Opslaan" : "Cursus Aanmaken"}
                </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}