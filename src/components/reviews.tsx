import { Star, ArrowRight } from "lucide-react";
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
import { Button } from "./ui/button";
import Link from "next/link";
import prisma from "@/lib/prisma";

export async function Reviews() {
  const reviews = await prisma.review.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        Geen reviews beschikbaar om te tonen.
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {reviews.map((review, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <Card className="flex flex-col h-full bg-card text-left shadow-lg">
                  <CardContent className="p-8 flex-grow flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${review.name}`} alt={review.name} />
                          <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{review.name}</p>
                          <p className="text-xs text-muted-foreground">{review.source}</p>
                        </div>
                      </div>
                      <Image src={review.source.includes('Google') ? '/google-logo.svg' : '/facebook-logo.svg'} alt={review.source} width={24} height={24} />
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400 mb-4">
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
        <CarouselPrevious className="hidden md:inline-flex h-10 w-10 bg-primary/80 hover:bg-primary text-primary-foreground" />
        <CarouselNext className="hidden md:inline-flex h-10 w-10 bg-primary/80 hover:bg-primary text-primary-foreground" />
      </Carousel>
      <div className="mt-8 text-center">
        <Button asChild variant="outline">
          <Link href="#" target="_blank" rel="noopener noreferrer">
            Lees al onze 1200+ Google Reviews <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}