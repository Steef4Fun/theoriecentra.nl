import { BookingWizard } from "@/components/booking-wizard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Reviews } from "@/components/reviews";
import { WallOfFame } from "@/components/wall-of-fame";
import { AnimatedSection } from "@/components/animated-section";
import { Award, BadgePercent, CalendarCheck } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative isolate w-full h-[85vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-[-1]">
          <video
            src="/hero-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="container text-white">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-7xl text-shadow">
                Haal je theorie. In één dag.
              </h1>
              <p className="mt-6 text-lg text-white/80 md:text-xl text-shadow-sm max-w-2xl mx-auto">
                Met onze unieke dagcursus stomen we je klaar voor het CBR-examen. Duidelijk, snel en met de hoogste slagingskans.
              </p>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="#booking-wizard">Vind je Cursus</Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Booking Wizard Section */}
      <section id="booking-wizard" className="w-full py-16 md:py-24 scroll-mt-20">
        <div className="container">
          <AnimatedSection>
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Plan je Cursus
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Kies je locatie, categorie en een datum die jou uitkomt. Binnen enkele minuten is je plek gereserveerd.
              </p>
            </div>
            <BookingWizard />
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-24 bg-muted">
        <div className="container">
          <div className="grid gap-16">
            {/* Feature 1 */}
            <AnimatedSection>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                  <Award className="h-48 w-48 text-primary/20" strokeWidth={1} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-4">Hoogste Slagingskans</h3>
                  <p className="text-muted-foreground mb-4">
                    Onze unieke, op het CBR-examen gerichte lesmethode zit vol met handige ezelsbruggetjes en herhaling. We zorgen ervoor dat je de stof niet alleen kent, maar écht begrijpt. Zo ga je vol zelfvertrouwen het examen in.
                  </p>
                </div>
              </div>
            </AnimatedSection>
            {/* Feature 2 */}
            <AnimatedSection>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-last md:order-first flex justify-center">
                   <BadgePercent className="h-48 w-48 text-primary/20" strokeWidth={1} />
                </div>
                <div className="order-first md:order-last">
                  <h3 className="text-3xl font-bold mb-4">Duidelijke & Eerlijke Prijzen</h3>
                  <p className="text-muted-foreground mb-4">
                    Bij ons geen verrassingen. Je betaalt één vaste prijs voor de volledige cursusdag én de reservering van je CBR theorie-examen. Geen verborgen kosten, geen 'vanaf' prijzen. Wel zo eerlijk.
                  </p>
                </div>
              </div>
            </AnimatedSection>
             {/* Feature 3 */}
             <AnimatedSection>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                  <CalendarCheck className="h-48 w-48 text-primary/20" strokeWidth={1} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-4">Direct een Examenplek</h3>
                  <p className="text-muted-foreground mb-4">
                    Wij nemen het regelwerk uit handen. Zodra je je inschrijft, reserveren wij direct een examenplek voor je bij het CBR, perfect aansluitend op de cursusdag. Jij focust op de theorie, wij regelen de rest.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Social Proof: Reviews Section */}
      <section id="reviews" className="w-full py-16 md:py-24">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Wat onze leerlingen zeggen
            </h2>
            <Reviews />
          </AnimatedSection>
        </div>
      </section>

      {/* Social Proof: Wall of Fame Section */}
      <section id="wall-of-fame" className="w-full py-16 md:py-24 bg-muted">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Onze Toppers
            </h2>
            <WallOfFame />
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full py-16 md:py-24">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Veelgestelde Vragen
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full max-w-3xl mx-auto"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Hoe werkt de 1-daagse theoriecursus?
                </AccordionTrigger>
                <AccordionContent>
                  Op de cursusdag behandelen we 's ochtends de volledige
                  theoriestof met handige ezelsbruggetjes. 's Middags ga je,
                  perfect voorbereid, naar het CBR om examen te doen.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Is de prijs inclusief het CBR-examen?
                </AccordionTrigger>
                <AccordionContent>
                  Ja, onze totaalprijs is altijd inclusief de cursusdag én de
                  kosten voor het officiële CBR theorie-examen. Geen verrassingen
                  achteraf.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Wat als ik zak voor het examen?</AccordionTrigger>
                <AccordionContent>
                  Mocht je het onverhoopt niet halen, dan bieden we een
                  herkansing met korting aan. We laten je niet vallen en helpen
                  je tot je geslaagd bent!
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Hoe kan ik me inschrijven?
                </AccordionTrigger>
                <AccordionContent>
                  Volg de stappen op onze website: kies je locatie, categorie en
                  datum. Vul daarna je gegevens in, betaal veilig online en je
                  plek is gereserveerd!
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}