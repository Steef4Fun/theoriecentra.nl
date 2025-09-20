import { AnimatedSection } from "@/components/animated-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, BookOpenCheck } from "lucide-react";
import Image from "next/image";
import prisma from "@/lib/prisma";

async function getPageData() {
  const settings = await prisma.setting.findMany({
    where: {
      key: {
        in: ['imageUrlAboutHero', 'imageUrlAboutStory1', 'imageUrlAboutStory2']
      }
    }
  });
  return settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as Record<string, string>);
}

export default async function AboutUsPage() {
  const imageSettings = await getPageData();
  const heroUrl = imageSettings.imageUrlAboutHero || "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop";
  const story1Url = imageSettings.imageUrlAboutStory1 || "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop";
  const story2Url = imageSettings.imageUrlAboutStory2 || "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2070&auto=format&fit=crop";

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gray-900 py-24 md:py-32 text-white">
        <Image
          src={heroUrl}
          alt="Team in overleg"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-30"
        />
        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl text-shadow">
              Onze Missie: Jouw Snelste Route naar Geslaagd
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-white/80 md:text-xl text-shadow-sm">
              Leer ons kennen. Ontdek waarom meer dan 10.000 leerlingen voor onze unieke dagcursus kiezen om in één keer hun theorie-examen te halen.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container py-16 md:py-24 space-y-16 md:space-y-24">
        {/* Our Story Section 1 */}
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Gedreven door Passie voor Slagen</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Theoriecentra.nl is ontstaan uit een simpele frustratie: het leren van theorie duurde te lang, was saai en vaak niet effectief. Wij vonden dat het anders moest. Sneller, leuker en met een laserfocus op wat écht belangrijk is om te slagen voor het CBR-examen.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
                <Image 
                    src={story1Url}
                    alt="Samenwerkend team"
                    width={800}
                    height={600}
                    className="object-cover"
                />
            </div>
          </div>
        </AnimatedSection>

        {/* Our Story Section 2 (Zig-Zag) */}
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden shadow-lg md:order-2">
                <Image 
                    src={story2Url}
                    alt="Instructeur geeft les"
                    width={800}
                    height={600}
                    className="object-cover"
                />
            </div>
            <div className="md:order-1">
              <h2 className="text-3xl font-bold mb-4">Jouw Succes is Onze Missie</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Onze missie is om elke leerling het zelfvertrouwen en de kennis te geven om in één keer te slagen. Geen wekenlange studie, maar één intensieve, resultaatgerichte dag die het verschil maakt.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Our Method Section */}
        <AnimatedSection>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">De Theoriecentra Methode</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Onze aanpak is gebaseerd op drie pijlers die garant staan voor succes.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="text-center">
                    <CardHeader>
                        <Target className="h-10 w-10 mx-auto text-primary mb-4" />
                        <CardTitle>Focus op het Examen</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">We filteren de ruis en concentreren ons 100% op de stof die het CBR toetst, inclusief de meest recente wijzigingen en strikvragen.</p>
                    </CardContent>
                </Card>
                 <Card className="text-center">
                    <CardHeader>
                        <BookOpenCheck className="h-10 w-10 mx-auto text-primary mb-4" />
                        <CardTitle>Bewezen Lesmethode</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Met interactieve lessen, visuele hulpmiddelen en slimme ezelsbruggetjes zorgen we dat de stof blijft hangen, ook onder examendruk.</p>
                    </CardContent>
                </Card>
                 <Card className="text-center">
                    <CardHeader>
                        <Users className="h-10 w-10 mx-auto text-primary mb-4" />
                        <CardTitle>Ervaren Instructeurs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Ons team bestaat uit experts die precies weten hoe ze complexe onderwerpen simpel en begrijpelijk kunnen maken.</p>
                    </CardContent>
                </Card>
            </div>
        </AnimatedSection>
      </div>
    </>
  );
}