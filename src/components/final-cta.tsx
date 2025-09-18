import Link from "next/link";
import { Button } from "./ui/button";
import { AnimatedSection } from "./animated-section";

export function FinalCta() {
  return (
    <AnimatedSection className="w-full bg-success text-success-foreground rounded-lg">
      <div className="container text-center py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold">Klaar om de weg op te gaan?</h2>
        <p className="mt-4 max-w-2xl mx-auto text-success-foreground/80">
          Wacht niet langer. Vind de perfecte cursusdatum, reserveer je plek en zet vandaag nog de eerste stap naar je rijbewijs.
        </p>
        <Button asChild size="lg" variant="secondary" className="mt-8 rounded-full px-8">
          <Link href="#booking-wizard">Vind je Cursus</Link>
        </Button>
      </div>
    </AnimatedSection>
  );
}