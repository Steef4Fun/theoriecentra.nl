import { AnimatedSection } from "@/components/animated-section";
import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Briefcase } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container max-w-4xl py-12">
      <AnimatedSection>
        <div className="space-y-4 text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Neem Contact Op
          </h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            Heb je een vraag of opmerking? We horen graag van je! Vul het formulier in of gebruik de onderstaande gegevens.
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <AnimatedSection>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Contactgegevens</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-primary mt-1" />
                <a href="mailto:info@theoriecentra.nl" className="hover:underline">
                  info@theoriecentra.nl
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-primary mt-1" />
                <span>Jan Romeinstraat 4, 5624JJ Eindhoven</span>
              </div>
              <div className="flex items-start">
                <Briefcase className="h-5 w-5 mr-3 text-primary mt-1" />
                <span>KVK: 59739584</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              We streven ernaar om e-mails binnen 24 uur te beantwoorden op werkdagen.
            </p>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <Card>
            <CardHeader>
              <CardTitle>Stuur ons een bericht</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
}