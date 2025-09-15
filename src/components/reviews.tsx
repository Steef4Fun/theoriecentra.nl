"use client";

import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const reviews = [
  {
    name: "Sarah V.",
    avatar: "SV",
    rating: 5,
    text: "Geweldige cursus! De stof werd super duidelijk uitgelegd met handige ezelsbruggetjes. Binnen een paar uur was ik klaargestoomd en ben ik in één keer geslaagd. Echt een aanrader!",
  },
  {
    name: "Mike L.",
    avatar: "ML",
    rating: 5,
    text: "Ik had al twee keer zelf geprobeerd te leren, zonder succes. Deze dagcursus was de perfecte oplossing. Duidelijk, to-the-point en de begeleiding was top. Had ik veel eerder moeten doen.",
  },
  {
    name: "Fatima E.",
    avatar: "FE",
    rating: 5,
    text: "Super blij mee! Ik was best zenuwachtig voor het examen, maar door de goede voorbereiding tijdens de cursus ging ik met veel zelfvertrouwen naar het CBR. En geslaagd!",
  },
  {
    name: "Jeroen D.",
    avatar: "JD",
    rating: 5,
    text: "Top service en een hele duidelijke uitleg. De sfeer was ontspannen en de docent nam echt de tijd voor vragen. Zeker het geld waard!",
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
              <Card className="flex flex-col relative overflow-hidden h-full">
                <CardContent className="p-8 flex-grow flex flex-col">
                  <Quote className="absolute top-4 left-4 h-12 w-12 text-primary/10" />
                  <div className="flex items-center gap-1 text-primary mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 flex-grow">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto pt-6 border-t">
                    <Avatar>
                      <AvatarFallback>{review.avatar}</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold">{review.name}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}