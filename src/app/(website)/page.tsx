"use client";

import { BookingWizard } from "@/components/booking-wizard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reviews } from "@/components/reviews";
import { AnimatedSection } from "@/components/animated-section";
import { motion } from "framer-motion";
import { WhyUs } from "@/components/why-us";
import { HowItWorks } from "@/components/how-it-works";
import { FinalCta } from "@/components/final-cta";
import { TrustBar } from "@/components/trust-bar";
import { UpcomingCourses } from "@/components/upcoming-courses";
import { TheOffer } from "@/components/the-offer";
import { KeyQuestions } from "@/components/key-questions";
import { InstructorShowcase } from "@/components/instructor-showcase";
import { SuccessSpotlight } from "@/components/success-spotlight";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center py-24">
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
        <div className="container">
          {/* Conversion Cockpit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl mx-auto bg-black/40 backdrop-blur-lg rounded-xl p-6 md:p-8 text-white border border-white/20"
          >
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl text-shadow">
                Haal je theorie. In één dag.
              </h1>
              <p className="mt-4 text-lg text-white/80 md:text-xl text-shadow-sm max-w-2xl mx-auto">
                Vind hieronder direct de eerstvolgende cursusdata en reserveer je plek. Snel, simpel en met de hoogste slagingskans.
              </p>
            </div>
            <div className="my-8">
              <TrustBar />
            </div>
            <UpcomingCourses />
          </motion.div>
        </div>
      </section>

      <div className="space-y-16 md:space-y-24 py-16 md:py-24">
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
        
        {/* The Offer Section */}
        <section className="container">
          <AnimatedSection>
            <TheOffer />
          </AnimatedSection>
        </section>

        {/* Instructor Showcase Section */}
        <section className="container">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Leer van de Beste Experts
              </h2>
              <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                Ons team van doorgewinterde instructeurs staat klaar om jou te helpen slagen.
              </p>
            </div>
            <InstructorShowcase />
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
        <section id="reviews" className="w-full bg-muted py-16 md:py-24">
          <div className="container">
            <AnimatedSection>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
                Wat onze leerlingen zeggen
              </h2>
              <Reviews />
            </AnimatedSection>
          </div>
        </section>

        {/* Success Spotlight Section */}
        <section className="container">
          <AnimatedSection>
            <SuccessSpotlight />
          </AnimatedSection>
        </section>

        {/* Key Questions Section */}
        <section className="container">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Direct Antwoord op je Vragen
              </h2>
            </div>
            <KeyQuestions />
          </AnimatedSection>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full bg-muted py-16 md:py-24">
          <div className="container">
            <AnimatedSection>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
                Overige Vragen
              </h2>
              <Accordion
                type="single"
                collapsible
                className="w-full max-w-3xl mx-auto"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-medium [&_svg]:h-6 [&_svg]:w-6">
                    Hoe kan ik me inschrijven?
                  </AccordionTrigger>
                  <AccordionContent>
                    Volg de stappen op onze website: kies je locatie, categorie en
                    datum. Vul daarna je gegevens in, betaal veilig online en je
                    plek is gereserveerd!
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-medium [&_svg]:h-6 [&_svg]:w-6">
                    Wat moet ik meenemen naar de cursus?
                  </AccordionTrigger>
                  <AccordionContent>
                    Je hoeft alleen een geldig identiteitsbewijs mee te nemen. Wij zorgen voor al het lesmateriaal, en ook voor lunch en drankjes gedurende de dag.
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