import { ContactForm } from "@/components/contact-form";
import { Mail, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Neem Contact Op
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Heb je een vraag of opmerking? We horen graag van je! Vul het formulier in of gebruik de onderstaande gegevens.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Contactgegevens</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-3 text-primary" />
              <a href="mailto:info@theoriecentra.nl" className="hover:underline">
                info@theoriecentra.nl
              </a>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-3 text-primary" />
              <span>+31 6 12345678 (Ma-Vr, 09:00-17:00)</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            We streven ernaar om e-mails binnen 24 uur te beantwoorden op werkdagen.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Stuur ons een bericht</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}