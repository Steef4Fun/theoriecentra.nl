import { AnimatedSection } from "@/components/animated-section";
import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Briefcase } from "lucide-react";
import Image from "next/image";
import prisma from "@/lib/prisma";

async function getPageData() {
  const setting = await prisma.setting.findUnique({
    where: { key: 'imageUrlContactHero' }
  });
  return {
    heroUrl: setting?.value || "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop"
  };
}

export default async function ContactPage() {
  const { heroUrl } = await getPageData();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gray-900 py-24 md:py-32 text-white">
        <Image
          src={heroUrl}
          alt="Klantenservice medewerker"
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

      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimatedSection>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Contactgegevens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-primary mt-1" />
                    <a href="mailto:info@theoriecentra.nl" className="text-foreground hover:underline">
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
                <p className="text-sm text-muted-foreground mt-6">
                  We streven ernaar om e-mails binnen 24 uur te beantwoorden op werkdagen.
                </p>
              </CardContent>
            </Card>
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