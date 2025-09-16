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
  courseDate: z.date({ required_error: "Datum is verplicht." }),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Ongeldig formaat (HH:MM)." }),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Ongeldig formaat (HH:MM)." }),
  locationId: z.string().uuid({ message: "Selecteer een locatie." }),
  categoryId: z.string().uuid({ message: "Selecteer een categorie." }),
  basePrice: z.coerce.number().min(0, { message: "Prijs moet positief zijn." }),
  examFee: z.coerce.number().min(0, { message: "Examengeld moet positief zijn." }),
  instructorNumber: z.string().min(1, { message: "Opleidernummer is verplicht." }),
  spotsAvailable: z.coerce.number().int().min(0, { message: "Aantal plekken moet positief zijn." }),
});

export const userSchema = z.object({
  email: z.string().email({ message: "Ongeldig e-mailadres." }),
  password: z.string().min(8, { message: "Wachtwoord moet minimaal 8 karakters lang zijn." }).optional().or(z.literal('')),
  role: z.enum(["admin", "instructor"], { required_error: "Rol is verplicht." }),
  instructorNumber: z.string().optional(),
}).refine(data => data.role !== 'instructor' || (data.instructorNumber && data.instructorNumber.length > 0), {
  message: "Opleidernummer is verplicht voor een cursusleider.",
  path: ["instructorNumber"],
});

export const settingSchema = z.object({
  name: z.string().min(2, { message: "Naam is verplicht." }),
});