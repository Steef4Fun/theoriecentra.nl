import { Award, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const stats = [
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    value: "92%",
    title: "Eerste Keer Slagingskans",
    description: "Ons unieke, op het CBR-examen gerichte lesmethode heeft een bewezen slagingskans van 92%.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    value: "10.000+",
    title: "Tevreden Leerlingen",
    description: "Sluit je aan bij de duizenden leerlingen die met onze hulp in één keer hun theorie hebben gehaald.",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    value: "Nr. 1",
    title: "Dagcursus van Nederland",
    description: "Door onze focus op resultaat en duidelijke lesmethode zijn we de best beoordeelde dagcursus.",
  },
];

export function WhyUs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat) => (
        <Card key={stat.title} className="text-center p-6">
          <CardHeader className="p-0 items-center">
            {stat.icon}
            <p className="text-6xl font-extrabold text-primary tracking-tighter my-4">{stat.value}</p>
            <CardTitle>{stat.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <p className="text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}