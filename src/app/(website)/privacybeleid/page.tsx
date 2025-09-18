import { AnimatedSection } from "@/components/animated-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-muted/50 border-b">
        <div className="container py-12 text-center">
          <AnimatedSection>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Privacybeleid
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
              Jouw gegevens zijn veilig bij ons. Hieronder lees je hoe we met je
              privacy omgaan.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container max-w-3xl py-16 md:py-24">
        <AnimatedSection>
          <p className="text-muted-foreground mb-8">
            Laatst bijgewerkt:{" "}
            {new Date().toLocaleDateString("nl-NL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg text-left">
                Wie is verantwoordelijk voor de gegevensverwerking?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground space-y-4">
                <p>
                  <strong>Theoriecentra.nl</strong>, gevestigd aan Jan
                  Romeinstraat 4, 5624JJ Eindhoven, is verantwoordelijk voor de
                  verwerking van persoonsgegevens zoals weergegeven in deze
                  privacyverklaring.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg text-left">
                Welke persoonsgegevens verwerken wij?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground space-y-4">
                <p>
                  Wij verwerken uw persoonsgegevens doordat u gebruik maakt van
                  onze diensten en/of omdat u deze zelf aan ons verstrekt.
                  Hieronder vindt u een overzicht van de persoonsgegevens die
                  wij verwerken:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Voor- en achternaam</li>
                  <li>Geboortedatum</li>
                  <li>Telefoonnummer</li>
                  <li>E-mailadres</li>
                  <li>Gegevens over uw activiteiten op onze website</li>
                  <li>Internetbrowser en apparaat type</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg text-left">
                Met welk doel verwerken wij persoonsgegevens?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground space-y-4">
                <p>
                  <strong>Theoriecentra.nl</strong> verwerkt uw
                  persoonsgegevens voor de volgende doelen:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Het afhandelen van uw inschrijving en betaling.</li>
                  <li>
                    U te kunnen bellen of e-mailen indien dit nodig is om onze
                    dienstverlening uit te kunnen voeren.
                  </li>
                  <li>
                    U te informeren over wijzigingen van onze diensten en
                    producten.
                  </li>
                  <li>
                    Het analyseren van gedrag op de website om daarmee de
                    website te verbeteren.
                  </li>
                  <li>
                    Het voldoen aan wettelijke verplichtingen, zoals gegevens
                    voor de belastingaangifte.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg text-left">
                Hoe lang bewaren we persoonsgegevens?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground space-y-4">
                <p>
                  <strong>Theoriecentra.nl</strong> bewaart uw persoonsgegevens
                  niet langer dan strikt nodig is om de doelen te realiseren
                  waarvoor uw gegevens worden verzameld. Wij hanteren de
                  wettelijke bewaartermijnen.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg text-left">
                Delen we persoonsgegevens met derden?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground space-y-4">
                <p>
                  <strong>Theoriecentra.nl</strong> verkoopt uw gegevens niet
                  aan derden en verstrekt deze uitsluitend indien dit nodig is
                  voor de uitvoering van onze overeenkomst met u (zoals de
                  aanmelding bij het CBR) of om te voldoen aan een wettelijke
                  verplichting.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-lg text-left">
                Gebruiken we cookies?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground space-y-4">
                <p>
                  <strong>Theoriecentra.nl</strong> gebruikt functionele en
                  analytische cookies. Een cookie is een klein tekstbestand dat
                  bij het eerste bezoek aan deze website wordt opgeslagen in de
                  browser van uw computer, tablet of smartphone. Deze zorgen
                  ervoor dat de website naar behoren werkt.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-lg text-left">
                Hoe kan ik mijn gegevens inzien, aanpassen of verwijderen?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground space-y-4">
                <p>
                  U heeft het recht om uw persoonsgegevens in te zien, te
                  corrigeren of te verwijderen. U kunt een verzoek hiertoe
                  sturen naar info@theoriecentra.nl. We reageren zo snel
                  mogelijk op uw verzoek.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AnimatedSection>
      </div>
    </>
  );
}