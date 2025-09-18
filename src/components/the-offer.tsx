import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const inclusions = [
  "Intensieve Dagcursus",
  "Officieel CBR Theorie-examen",
  "Lunch & Drankjes",
  "Bewezen Lesmethode",
  "92% Slagingskans",
  "Direct een Examenplek",
];

export function TheOffer() {
  return (
    <Card className="bg-muted/50">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Slaag voor €99,-</CardTitle>
        <CardDescription className="text-lg">
          + €48,75 voor het officiële CBR examen. Geen verrassingen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 max-w-3xl mx-auto">
          {inclusions.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0" />
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}