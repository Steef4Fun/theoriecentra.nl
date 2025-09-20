"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

const stepsContent = [
  {
    step: 1,
    title: "Kies je Cursus",
    description: "Selecteer een locatie en datum die jou het beste uitkomt via onze simpele planner.",
  },
  {
    step: 2,
    title: "Volg de Lesdag",
    description: "Onze topdocenten stomen je in één dag klaar met alle CBR-theorie en de beste ezelsbruggetjes.",
  },
  {
    step: 3,
    title: "Slaag voor je Examen",
    description: "Direct na de cursus ga je naar het CBR om examen te doen. Perfect voorbereid en vol zelfvertrouwen.",
  },
];

interface HowItWorksProps {
  imageUrls: string[];
}

export function HowItWorks({ imageUrls }: HowItWorksProps) {
  const steps = stepsContent.map((step, index) => ({
    ...step,
    imageUrl: imageUrls[index],
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {steps.map((step) => (
        <Card key={step.step} className="bg-card z-10 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col">
          <div className="relative">
            <div className="relative h-48 w-full">
              <Image 
                src={step.imageUrl}
                alt={step.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-2xl border-4 border-background">
              {step.step}
            </div>
          </div>
          <CardHeader className="pt-12 text-center">
            <CardTitle>{step.title}</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6 text-center flex-grow">
            <p className="text-muted-foreground">{step.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}