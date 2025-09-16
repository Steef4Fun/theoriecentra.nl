import { AnimatedSection } from "@/components/animated-section";
import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gray-900 py-32 text-white">
        <Image
          src="https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?q=80&w=2070&auto=format&fit=crop"
          alt="Contact opnemen"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-30"
        />
        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl text-shadow">
              Neem Contact Op
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-white/80 md:text-xl text-shadow-sm">
              Heb je een vraag of opmerking? We horen graag van je! Vul het formulier in of gebruik de onderstaande gegevens.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container max-w-4xl py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimatedSection>
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
    </>
  );
}