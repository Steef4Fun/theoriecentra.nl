import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const featuredReview = {
  name: "Sarah Vermeer",
  avatarSeed: "Sarah",
  text: "Geweldige cursus! De stof werd super duidelijk uitgelegd met handige ezelsbruggetjes. Binnen een paar uur was ik klaargestoomd en ben ik in één keer geslaagd. Echt een aanrader!",
};

export function SuccessSpotlight() {
  return (
    <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
      <div className="grid md:grid-cols-2 items-center">
        <div className="p-8 md:p-12">
          <h3 className="text-2xl font-bold tracking-tight">Jouw Succesverhaal Hier?</h3>
          <p className="mt-2 text-muted-foreground">
            Duizenden leerlingen gingen je voor. Help anderen de juiste keuze te maken door een review achter te laten.
          </p>
          <Button asChild className="mt-6">
            <Link href="https://www.google.com/search?q=theoriecentra.nl#reviews" target="_blank" rel="noopener noreferrer">
              Schrijf een Review
            </Link>
          </Button>
        </div>
        <div className="p-8 h-full md:border-l">
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
          <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground">
            "{featuredReview.text}"
          </blockquote>
        </div>
      </div>
    </Card>
  );
}