"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const reviews = [
  {
    name: "Sarah Vermeer",
    avatarSeed: "Sarah",
    rating: 5,
    text: "Geweldige cursus! De stof werd super duidelijk uitgelegd met handige ezelsbruggetjes. Binnen een paar uur was ik klaargestoomd en ben ik in één keer geslaagd. Echt een aanrader!",
    source: "Google Review",
  },
  {
    name: "Mike de Leeuw",
    avatarSeed: "Mike",
    rating: 5,
    text: "Ik had al twee keer zelf geprobeerd te leren, zonder succes. Deze dagcursus was de perfecte oplossing. Duidelijk, to-the-point en de begeleiding was top. Had ik veel eerder moeten doen.",
    source: "Google Review",
  },
  {
    name: "Fatima El Idrissi",
    avatarSeed: "Fatima",
    rating: 5,
    text: "Super blij mee! Ik was best zenuwachtig voor het examen, maar door de goede voorbereiding tijdens de cursus ging ik met veel zelfvertrouwen naar het CBR. En geslaagd!",
    source: "Facebook Review",
  },
  {
    name: "Jeroen de Wit",
    avatarSeed: "Jeroen",
    rating: 5,
    text: "Top service en een hele duidelijke uitleg. De sfeer was ontspannen en de docent nam echt de tijd voor vragen. Zeker het geld waard!",
    source: "Google Review",
  },
];

export function Reviews() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-5xl mx-auto"
    >
      <CarouselContent>
        {reviews.map((review, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1 h-full">
              <Card className="flex flex-col h-full bg-secondary/50 text-left">
                <CardContent className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${review.avatarSeed}`} alt={review.name} />
                        <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.source}</p>
                      </div>
                    </div>
                    <Image src={review.source.includes('Google') ? '/google-logo.svg' : '/facebook-logo.svg'} alt={review.source} width={24} height={24} />
                  </div>
                  <div className="flex items-center gap-1 text-primary mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 flex-grow">
                    "{review.text}"
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}