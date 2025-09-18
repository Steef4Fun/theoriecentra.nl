import Link from "next/link";
import { Button } from "./ui/button";
import { AnimatedSection } from "./animated-section";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const featuredReview = {
  name: "Sarah Vermeer",
  avatarSeed: "Sarah",
  text: "Geweldige cursus! De stof werd super duidelijk uitgelegd met handige ezelsbruggetjes. Binnen een paar uur was ik klaargestoomd en ben ik in één keer geslaagd. Echt een aanrader!",
};

export function FinalCta() {
  return (
    <AnimatedSection className="w-full bg-primary text-primary-foreground rounded-lg overflow-hidden">
      <div className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold">Word ons Volgende Succesverhaal</h2>
            <p className="mt-4 max-w-2xl mx-auto md:mx-0 text-primary-foreground/80">
              Wacht niet langer. Vind de perfecte cursusdatum, reserveer je plek en zet vandaag nog de eerste stap naar je rijbewijs.
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-8 rounded-full px-8">
              <Link href="/cursussen">Vind je Cursus</Link>
            </Button>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${featuredReview.avatarSeed}`} alt={featuredReview.name} />
                <AvatarFallback>{featuredReview.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{featuredReview.name}</p>
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <blockquote className="border-l-2 border-secondary pl-4 italic text-primary-foreground/80">
              "{featuredReview.text}"
            </blockquote>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}