import { AnimatedSection } from "@/components/animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Mail, MapPin, UserCheck } from "lucide-react";

export default function NextStepsPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-20">
      <AnimatedSection>
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Je bent er bijna!
          </h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
            Gefeliciteerd met je inschrijving! Hier is alles wat je moet weten om perfect voorbereid aan je cursusdag te beginnen.
          </p>
        </div>
      </AnimatedSection>

      <div className="space-y-8">
        <AnimatedSection delay={0.2}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><Mail className="h-6 w-6 text-primary" /> Stap 1: Controleer je E-mail</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Je hebt zojuist twee belangrijke e-mails van ons ontvangen:</p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li><strong>Bevestiging van je inschrijving:</strong> Hierin staan alle details van je cursus en betaling.</li>
                <li><strong>Verzoek tot machtiging:</strong> Dit is een cruciale stap! Volg de instructies in deze mail om ons te machtigen bij het CBR. Zonder dit kunnen we je examen niet reserveren.</li>
              </ul>
              <p className="text-sm pt-2">Geen mail ontvangen? Controleer je spam-folder of neem contact met ons op.</p>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><UserCheck className="h-6 w-6 text-primary" /> Stap 2: Wat neem je mee?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Het is heel simpel. Het enige wat je verplicht mee moet nemen is:</p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li><strong>Een geldig identiteitsbewijs.</strong> (ID-kaart, paspoort of rijbewijs). Zonder dit mag je geen examen doen bij het CBR.</li>
              </ul>
              <p className="text-sm pt-2">Wij zorgen voor al het lesmateriaal, pennen, en natuurlijk een lekkere lunch en drankjes.</p>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={0.6}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><MapPin className="h-6 w-6 text-primary" /> Stap 3: De Cursusdag</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Zorg dat je op tijd aanwezig bent op de cursuslocatie. De exacte adresgegevens en tijden staan in je bevestigingsmail.</p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Kom met een frisse en uitgeruste instelling.</li>
                <li>Stel gerust vragen! Onze docenten zijn er om jou te helpen.</li>
                <li>Na de cursus begeleiden we je naar het CBR voor het examen.</li>
              </ul>
              <p className="font-semibold pt-2">Wij hebben er zin in en wensen je alvast heel veel succes!</p>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
}