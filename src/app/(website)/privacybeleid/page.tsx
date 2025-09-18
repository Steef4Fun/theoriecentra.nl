import { AnimatedSection } from "@/components/animated-section";

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
              Jouw gegevens zijn veilig bij ons. Hieronder lees je hoe we met je privacy omgaan.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container max-w-3xl py-16 md:py-24">
        <AnimatedSection>
          <div className="prose max-w-none dark:prose-invert prose-lg">
            <p className="text-muted-foreground">Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <p><strong>Theoriecentra.nl</strong>, gevestigd aan Jan Romeinstraat 4, 5624JJ Eindhoven, is verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven in deze privacyverklaring.</p>

            <h2>Persoonsgegevens die wij verwerken</h2>
            <p>Wij verwerken uw persoonsgegevens doordat u gebruik maakt van onze diensten en/of omdat u deze zelf aan ons verstrekt. Hieronder vindt u een overzicht van de persoonsgegevens die wij verwerken:</p>
            <ul>
              <li>Voor- en achternaam</li>
              <li>Geboortedatum</li>
              <li>Telefoonnummer</li>
              <li>E-mailadres</li>
              <li>Gegevens over uw activiteiten op onze website</li>
              <li>Internetbrowser en apparaat type</li>
            </ul>

            <h2>Met welk doel en op basis van welke grondslag wij persoonsgegevens verwerken</h2>
            <p><strong>Theoriecentra.nl</strong> verwerkt uw persoonsgegevens voor de volgende doelen:</p>
            <ul>
              <li>Het afhandelen van uw inschrijving en betaling.</li>
              <li>U te kunnen bellen of e-mailen indien dit nodig is om onze dienstverleing uit te kunnen voeren.</li>
              <li>U te informeren over wijzigingen van onze diensten en producten.</li>
              <li>Het analyseren van gedrag op de website om daarmee de website te verbeteren.</li>
              <li>Het voldoen aan wettelijke verplichtingen, zoals gegevens voor de belastingaangifte.</li>
            </ul>

            <h2>Hoe lang we persoonsgegevens bewaren</h2>
            <p><strong>Theoriecentra.nl</strong> bewaart uw persoonsgegevens niet langer dan strikt nodig is om de doelen te realiseren waarvoor uw gegevens worden verzameld. Wij hanteren de wettelijke bewaartermijnen.</p>

            <h2>Delen van persoonsgegevens met derden</h2>
            <p><strong>Theoriecentra.nl</strong> verkoopt uw gegevens niet aan derden en verstrekt deze uitsluitend indien dit nodig is voor de uitvoering van onze overeenkomst met u (zoals de aanmelding bij het CBR) of om te voldoen aan een wettelijke verplichting.</p>

            <h2>Cookies, of vergelijkbare technieken</h2>
            <p><strong>Theoriecentra.nl</strong> gebruikt functionele en analytische cookies. Een cookie is een klein tekstbestand dat bij het eerste bezoek aan deze website wordt opgeslagen in de browser van uw computer, tablet of smartphone. Deze zorgen ervoor dat de website naar behoren werkt.</p>

            <h2>Gegevens inzien, aanpassen of verwijderen</h2>
            <p>U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te verwijderen. U kunt een verzoek hiertoe sturen naar info@theoriecentra.nl. We reageren zo snel mogelijk op uw verzoek.</p>
          </div>
        </AnimatedSection>
      </div>
    </>
  );
}