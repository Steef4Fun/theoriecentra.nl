import { AnimatedSection } from "@/components/animated-section";

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-20">
      <AnimatedSection>
        <div className="prose max-w-none dark:prose-invert">
          <h1>Privacybeleid</h1>
          <p className="lead">Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <p>Theoriecentra.nl, gevestigd aan Jan Romeinstraat 4, 5624JJ Eindhoven, is verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven in deze privacyverklaring.</p>

          <h2>Persoonsgegevens die wij verwerken</h2>
          <p>Wij verwerken uw persoonsgegevens doordat u gebruik maakt van onze diensten en/of omdat u deze zelf aan ons verstrekt. Hieronder vindt u een overzicht van de persoonsgegevens die wij verwerken:</p>
          <ul>
            <li>Voor- en achternaam</li>
            <li>Geboortedatum</li>
            <li>Adresgegevens</li>
            <li>Telefoonnummer</li>
            <li>E-mailadres</li>
            <li>Overige persoonsgegevens die u actief verstrekt bijvoorbeeld door een profiel op deze website aan te maken, in correspondentie en telefonisch</li>
            <li>Gegevens over uw activiteiten op onze website</li>
            <li>Internetbrowser en apparaat type</li>
          </ul>

          <h2>Met welk doel en op basis van welke grondslag wij persoonsgegevens verwerken</h2>
          <p>Theoriecentra.nl verwerkt uw persoonsgegevens voor de volgende doelen:</p>
          <ul>
            <li>Het afhandelen van uw inschrijving en betaling.</li>
            <li>U te kunnen bellen of e-mailen indien dit nodig is om onze dienstverlening uit te kunnen voeren.</li>
            <li>U te informeren over wijzigingen van onze diensten en producten.</li>
            <li>Theoriecentra.nl analyseert uw gedrag op de website om daarmee de website te verbeteren en het aanbod van producten en diensten af te stemmen op uw voorkeuren.</li>
            <li>Theoriecentra.nl verwerkt ook persoonsgegevens als wij hier wettelijk toe verplicht zijn, zoals gegevens die wij nodig hebben voor onze belastingaangifte.</li>
          </ul>

          <h2>Hoe lang we persoonsgegevens bewaren</h2>
          <p>Theoriecentra.nl bewaart uw persoonsgegevens niet langer dan strikt nodig is om de doelen te realiseren waarvoor uw gegevens worden verzameld. Wij hanteren de wettelijke bewaartermijnen voor de verschillende categorieën van persoonsgegevens.</p>

          <h2>Delen van persoonsgegevens met derden</h2>
          <p>Theoriecentra.nl verkoopt uw gegevens niet aan derden en verstrekt deze uitsluitend indien dit nodig is voor de uitvoering van onze overeenkomst met u of om te voldoen aan een wettelijke verplichting. Met bedrijven die uw gegevens verwerken in onze opdracht, sluiten wij een verwerkersovereenkomst om te zorgen voor eenzelfde niveau van beveiliging en vertrouwelijkheid van uw gegevens.</p>

          <h2>Cookies, of vergelijkbare technieken, die wij gebruiken</h2>
          <p>Theoriecentra.nl gebruikt functionele, analytische en tracking cookies. Een cookie is een klein tekstbestand dat bij het eerste bezoek aan deze website wordt opgeslagen in de browser van uw computer, tablet of smartphone. Wij gebruiken cookies met een puur technische functionaliteit. Deze zorgen ervoor dat de website naar behoren werkt en dat bijvoorbeeld uw voorkeursinstellingen onthouden worden. Bij uw eerste bezoek aan onze website hebben wij u al geïnformeerd over deze cookies en toestemming gevraagd voor het plaatsen ervan.</p>

          <h2>Gegevens inzien, aanpassen of verwijderen</h2>
          <p>U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te verwijderen. Daarnaast heeft u het recht om uw eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van uw persoonsgegevens door Theoriecentra.nl en heeft u het recht op gegevensoverdraagbaarheid. U kunt een verzoek tot inzage, correctie, verwijdering, gegevensoverdraging van uw persoonsgegevens of verzoek tot intrekking van uw toestemming of bezwaar op de verwerking van uw persoonsgegevens sturen naar info@theoriecentra.nl.</p>
        </div>
      </AnimatedSection>
    </div>
  );
}