import { Zap, FileCheck2, Coffee, BookOpenCheck, Award, CalendarCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const inclusions = [
  { text: "Intensieve Dagcursus", icon: <Zap className="h-6 w-6 text-primary flex-shrink-0" /> },
  { text: "Officieel CBR Theorie-examen", icon: <FileCheck2 className="h-6 w-6 text-primary flex-shrink-0" /> },
  { text: "Lunch & Drankjes", icon: <Coffee className="h-6 w-6 text-primary flex-shrink-0" /> },
  { text: "Bewezen Lesmethode", icon: <BookOpenCheck className="h-6 w-6 text-primary flex-shrink-0" /> },
  { text: "92% Slagingskans", icon: <Award className="h-6 w-6 text-primary flex-shrink-0" /> },
  { text: "Direct een Examenplek", icon: <CalendarCheck className="h-6 w-6 text-primary flex-shrink-0" /> },
];

export function TheOffer() {
  return (
    <div className="p-1 bg-gradient-to-br from-primary/50 via-primary/20 to-muted rounded-xl">
      <Card className="bg-card">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Alles-in-1 Pakket: €147,75</CardTitle>
          <CardDescription className="text-lg">
            Inclusief dagcursus (€99) en officieel CBR examen (€48,75). Geen verrassingen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 max-w-3xl mx-auto">
            {inclusions.map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                {item.icon}
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}