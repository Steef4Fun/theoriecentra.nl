import { Award, BookOpenCheck, CalendarCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const features = [
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "92% Slagingskans",
    description: "Onze unieke, op het CBR-examen gerichte lesmethode heeft een bewezen eerste-keer-slagingskans van 92%.",
    footnote: "*Gebaseerd op interne data Q1-Q2 2024.",
  },
  {
    icon: <BookOpenCheck className="h-8 w-8 text-primary" />,
    title: "Beste Lesmethode",
    description: "We zorgen ervoor dat je de stof niet alleen kent, maar écht begrijpt. Zo ga je vol zelfvertrouwen het examen in.",
  },
  {
    icon: <CalendarCheck className="h-8 w-8 text-primary" />,
    title: "Direct een Examenplek",
    description: "Wij reserveren direct een examenplek voor je bij het CBR, perfect aansluitend op de cursusdag.",
  },
];

export function WhyUs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature) => (
        <Card key={feature.title} className="flex flex-col h-full text-left border-2 border-transparent hover:border-primary hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center gap-4">
            {feature.icon}
            <CardTitle>{feature.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <p className="text-muted-foreground flex-grow">{feature.description}</p>
            {feature.footnote && (
              <p className="text-xs text-muted-foreground mt-4">{feature.footnote}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}