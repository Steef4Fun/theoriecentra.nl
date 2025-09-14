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