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
import { Review } from "@prisma/client";
import { createReview, updateReview } from "@/app/actions/review-actions";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface ReviewFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  review: Review | null;
}

const reviewSchema = z.object({
  name: z.string().min(1, "Naam is verplicht."),
  text: z.string().min(1, "Reviewtekst is verplicht."),
  rating: z.coerce.number().int().min(1).max(5),
  source: z.string().min(1, "Bron is verplicht."),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
  order: z.coerce.number().int(),
});

export function ReviewForm({ isOpen, setIsOpen, review }: ReviewFormProps) {
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
  });

  useEffect(() => {
    if (review) {
      form.reset(review);
    } else {
      form.reset({
        name: "",
        text: "",
        rating: 5,
        source: "Google Review",
        isActive: true,
        isFeatured: false,
        order: 0,
      });
    }
  }, [review, form, isOpen]);

  const onSubmit = async (values: z.infer<typeof reviewSchema>) => {
    const result = review
      ? await updateReview(review.id, values)
      : await createReview(values);

    if (result.error) {
      toast.error("Opslaan mislukt", { description: result.error });
    } else {
      toast.success("Review succesvol opgeslagen.");
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{review ? "Review Bewerken" : "Nieuwe Review"}</DialogTitle>
          <DialogDescription>Vul de gegevens van de review in.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Naam</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="text" render={({ field }) => (<FormItem><FormLabel>Tekst</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="rating" render={({ field }) => (<FormItem><FormLabel>Rating (1-5)</FormLabel><FormControl><Input type="number" min="1" max="5" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="source" render={({ field }) => (<FormItem><FormLabel>Bron</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="Google Review">Google Review</SelectItem><SelectItem value="Facebook Review">Facebook Review</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
            </div>
            <div className="flex justify-between items-end">
              <FormField control={form.control} name="order" render={({ field }) => (<FormItem><FormLabel>Volgorde</FormLabel><FormControl><Input type="number" className="w-24" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <div className="flex gap-4">
                <FormField control={form.control} name="isFeatured" render={({ field }) => (<FormItem className="flex flex-col items-center"><FormLabel>Uitgelicht</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="isActive" render={({ field }) => (<FormItem className="flex flex-col items-center"><FormLabel>Actief</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormMessage /></FormItem>)} />
              </div>
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