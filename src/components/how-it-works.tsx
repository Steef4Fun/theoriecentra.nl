import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

const steps = [
  {
    step: 1,
    title: "Kies je Cursus",
    description: "Selecteer een locatie en datum die jou het beste uitkomt via onze simpele planner.",
    imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop",
  },
  {
    step: 2,
    title: "Volg de Lesdag",
    description: "Onze topdocenten stomen je in één dag klaar met alle CBR-theorie en de beste ezelsbruggetjes.",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
  },
  {
    step: 3,
    title: "Slaag voor je Examen",
    description: "Direct na de cursus ga je naar het CBR om examen te doen. Perfect voorbereid en vol zelfvertrouwen.",
    imageUrl: "https://images.unsplash.com/photo-1600880292210-85938a039492?q=80&w=800&auto=format&fit=crop",
  },
];

export function HowItWorks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {steps.map((step) => (
        <Card key={step.step} className="text-center bg-card z-10 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
          <div className="relative h-48 w-full">
            <Image 
              src={step.imageUrl}
              alt={step.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <CardHeader>
            <div className="mx-auto -mt-12 mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-2xl border-4 border-background">
              {step.step}
            </div>
            <CardTitle>{step.title}</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <p className="text-muted-foreground">{step.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}