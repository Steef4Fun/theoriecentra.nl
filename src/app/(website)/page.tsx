"use client";

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
import Link from "next/link";
import { motion } from "framer-motion";
import { WhyUs } from "@/components/why-us";
import { HowItWorks } from "@/components/how-it-works";
import { FinalCta } from "@/components/final-cta";

export default function Home() {
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[700px] flex items-center text-center overflow-hidden">
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
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="container text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-shadow">
              Haal je theorie. In één dag.
            </h1>
            <p className="mt-6 text-lg text-white/80 md:text-xl text-shadow-sm max-w-2xl mx-auto">
              Met onze unieke dagcursus stomen we je klaar voor het CBR-examen. Duidelijk, snel en met de hoogste slagingskans.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                asChild
                className="rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90"
              >
                <Link href="#booking-wizard">Vind je Cursus</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="space-y-20 md:space-y-32 py-20 md:py-32">
        {/* Why Us Section */}
        <section className="container">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                De Snelste Weg naar je Theoriecertificaat
              </h2>
              <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                Ontdek waarom duizenden leerlingen voor ons kiezen.
              </p>
            </div>
            <WhyUs />
          </AnimatedSection>
        </section>

        {/* How It Works Section */}
        <section className="container">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Zo Simpel Werkt Het
              </h2>
              <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                In 3 eenvoudige stappen naar je theoriecertificaat.
              </p>
            </div>
            <HowItWorks />
          </AnimatedSection>
        </section>

        {/* Booking Wizard Section */}
        <section id="booking-wizard" className="w-full scroll-mt-20">
          <div className="container">
            <AnimatedSection>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Plan je Cursus
                </h2>
                <p className="max-w-2xl mx-auto text-muted-foreground">
                  Kies je locatie, categorie en een datum die jou uitkomt. Binnen enkele minuten is je plek gereserveerd.
                </p>
              </div>
              <BookingWizard />
            </AnimatedSection>
          </div>
        </section>

        {/* Social Proof: Reviews Section */}
        <section id="reviews" className="w-full bg-muted py-20 md:py-32">
          <div className="container">
            <AnimatedSection>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
                Wat onze leerlingen zeggen
              </h2>
              <Reviews />
            </AnimatedSection>
          </div>
        </section>

        {/* Social Proof: Wall of Fame Section */}
        <section id="wall-of-fame" className="w-full">
          <div className="container">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Zij zijn je voorgegaan
                </h2>
                <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                  Een greep uit de duizenden leerlingen die dankzij onze methode in één keer zijn geslaagd.
                </p>
              </div>
              <WallOfFame />
            </AnimatedSection>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full bg-muted py-20 md:py-32">
          <div className="container">
            <AnimatedSection>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
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

        {/* Final CTA Section */}
        <section className="container">
          <FinalCta />
        </section>
      </div>
    </>
  );
}