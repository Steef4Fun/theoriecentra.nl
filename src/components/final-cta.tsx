import Link from "next/link";
import { Button } from "./ui/button";
import { AnimatedSection } from "./animated-section";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const featuredReviews = [
  {
    name: "Sarah Vermeer",
    avatarSeed: "Sarah",
    text: "Geweldige cursus! De stof werd super duidelijk uitgelegd. Binnen een paar uur was ik klaargestoomd en ben ik in één keer geslaagd.",
  },
  {
    name: "Mike de Leeuw",
    avatarSeed: "Mike",
    text: "Ik had al twee keer zelf geprobeerd te leren, zonder succes. Deze dagcursus was de perfecte oplossing. Duidelijk en to-the-point.",
  },
];

export function FinalCta() {
  return (
    <AnimatedSection className="w-full bg-primary text-primary-foreground rounded-lg overflow-hidden">
      <div className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold">Jouw Succesverhaal Tussen Onze Winnaars?</h2>
            <p className="mt-4 max-w-2xl mx-auto md:mx-0 text-primary-foreground/80">
              Wacht niet langer. Vind de perfecte cursusdatum, reserveer je plek en zet vandaag nog de eerste stap naar je rijbewijs.
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-8 rounded-full px-8">
              <Link href="/#boeken">Vind je Cursus</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {featuredReviews.map((review) => (
              <div key={review.name} className="bg-white/10 p-4 rounded-lg flex items-start gap-4">
                <Avatar className="h-11 w-11 border-2 border-white/20">
                  <AvatarImage src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${review.avatarSeed}`} alt={review.name} />
                  <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <div className="flex items-center gap-0.5 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-2 text-sm italic text-primary-foreground/80">
                    "{review.text}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}