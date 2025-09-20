import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Check } from "lucide-react";

const inclusions = [
  { text: "Intensieve Dagcursus" },
  { text: "Officieel CBR Theorie-examen" },
  { text: "Lunch & Drankjes" },
  { text: "Bewezen Lesmethode" },
  { text: "92% Slagingskans" },
  { text: "Direct een Examenplek" },
];

export function TheOffer() {
  return (
    <div className="p-1 bg-gradient-to-br from-primary/50 via-primary/20 to-muted rounded-xl">
      <Card className="bg-card">
        <CardHeader className="text-center">
          <h3 className="text-4xl font-bold">Alles-in-1 Pakket</h3>
          <p className="text-5xl font-extrabold text-primary tracking-tighter mt-2">€147,75</p>
          <CardDescription className="text-lg">
            Inclusief dagcursus (€99) en officieel CBR examen (€48,75). Geen verrassingen. Je kunt ook kiezen voor een aanbetaling.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 max-w-3xl mx-auto">
            {inclusions.map((item) => (
              <div key={item.text} className="flex items-center justify-center md:justify-start gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="font-medium text-center md:text-left">{item.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}