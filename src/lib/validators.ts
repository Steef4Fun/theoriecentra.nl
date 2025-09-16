import { z } from "zod";

export const registrationSchema = z.object({
  firstName: z.string().min(1, { message: "Voornaam is verplicht." }),
  lastName: z.string().min(1, { message: "Achternaam is verplicht." }),
  email: z.string().email({ message: "Voer een geldig e-mailadres in." }),
  phoneNumber: z.string().min(10, { message: "Voer een geldig telefoonnummer in." }),
  dateOfBirth: z.date({
    required_error: "Geboortedatum is verplicht.",
    invalid_type_error: "Selecteer een geldige datum.",
  }),
  paymentOption: z.enum(["full", "deposit"], {
    required_error: "Kies een betaaloptie.",
  }),
  courseId: z.string().uuid(),
});

export const contactSchema = z.object({
  name: z.string().min(2, { message: "Naam is verplicht." }),
  email: z.string().email({ message: "Voer een geldig e-mailadres in." }),
  message: z.string().min(10, { message: "Bericht moet minimaal 10 karakters bevatten." }),
});

export const courseSchema = z.object({
  course_date: z.date({ required_error: "Datum is verplicht." }),
  start_time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Ongeldig formaat (HH:MM)." }),
  end_time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Ongeldig formaat (HH:MM)." }),
  location_id: z.string().uuid({ message: "Selecteer een locatie." }),
  category_id: z.string().uuid({ message: "Selecteer een categorie." }),
  base_price: z.coerce.number().min(0, { message: "Prijs moet positief zijn." }),
  exam_fee: z.coerce.number().min(0, { message: "Examengeld moet positief zijn." }),
  instructor_number: z.string().min(1, { message: "Opleidernummer is verplicht." }),
  spots_available: z.coerce.number().int().min(0, { message: "Aantal plekken moet positief zijn." }),
});