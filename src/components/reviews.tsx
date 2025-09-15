"use client";

import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
];

export function Reviews() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {reviews.map((review) => (
        <Card key={review.name} className="flex flex-col relative overflow-hidden h-full">
          <CardContent className="p-8 flex-grow flex flex-col">
            <Quote className="absolute top-4 left-4 h-12 w-12 text-primary/10" />
            <div className="flex items-center gap-1 text-primary mb-4">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <p className="text-muted-foreground mb-6 flex-grow">"{review.text}"</p>
            <div className="flex items-center gap-4 mt-auto pt-6 border-t">
              <Avatar>
                <AvatarFallback>{review.avatar}</AvatarFallback>
              </Avatar>
              <p className="font-semibold">{review.name}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}