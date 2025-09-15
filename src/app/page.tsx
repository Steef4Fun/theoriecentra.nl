import { BookingWizard } from "@/components/booking-wizard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Slaag voor je theorie in één dag
            </h1>
            <p className="mt-4 text-muted-foreground md:text-xl">
              Onze dagcursus bereidt je perfect voor op het CBR-examen. Volg de
              stappen, vind je datum en reserveer direct je plek.
            </p>
          </div>
          <div className="mt-12">
            <BookingWizard />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Waarom kiezen voor Theoriecentra.nl?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Wij maken het halen van je theorie-examen eenvoudig, snel en
                betaalbaar. Geen verrassingen, alleen resultaat.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-8 w-8 mx-auto text-primary" />
                <CardTitle className="mt-2">Hoogste Slagingskans</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Onze bewezen lesmethode zorgt ervoor dat je de stof écht
                  begrijpt en met vertrouwen het examen ingaat.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-8 w-8 mx-auto text-primary" />
                <CardTitle className="mt-2">Duidelijke Prijzen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Eén vaste prijs voor de cursus en het examen. Geen verborgen
                  kosten of 'vanaf' prijzen.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-8 w-8 mx-auto text-primary" />
                <CardTitle className="mt-2">Direct Examenplek</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Wij reserveren direct een examenplek voor je bij het CBR,
                  aansluitend op de cursus.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof: Reviews Section (Placeholder) */}
      <section id="reviews" className="w-full py-12 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Wat onze leerlingen zeggen
          </h2>
          {/* Review component will be added here */}
        </div>
      </section>

      {/* Social Proof: Wall of Fame Section (Placeholder) */}
      <section id="wall-of-fame" className="w-full py-12 md:py-24 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Onze Toppers
          </h2>
          {/* Wall of Fame component will be added here */}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full py-12 md:py-24">
        <div className="container">
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
              </              AccordionContent>
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
        </div>
      </section>
    </>
  );
}