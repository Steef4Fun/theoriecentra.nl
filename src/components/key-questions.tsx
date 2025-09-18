import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ClipboardList, PackageCheck, ShieldCheck } from "lucide-react";

const keyQuestions = [
  {
    icon: <ClipboardList className="h-10 w-10 text-primary" />,
    question: "Hoe werkt de dag?",
    answer: "Op de cursusdag behandelen we 's ochtends de volledige theoriestof met handige ezelsbruggetjes. 's Middags ga je, perfect voorbereid, naar het CBR om examen te doen.",
  },
  {
    icon: <PackageCheck className="h-10 w-10 text-primary" />,
    question: "Is het examen inbegrepen?",
    answer: "Ja, onze totaalprijs is altijd inclusief de cursusdag én de kosten voor het officiële CBR theorie-examen. Geen verrassingen achteraf.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    question: "Wat als ik zak?",
    answer: "Mocht je het onverhoopt niet halen, dan bieden we een herkansing met korting aan. We laten je niet vallen en helpen je tot je geslaagd bent!",
  },
];

export function KeyQuestions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {keyQuestions.map((item) => (
        <Card key={item.question} className="bg-secondary/30 text-center">
          <CardHeader className="items-center">
            {item.icon}
            <CardTitle className="mt-4">{item.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{item.answer}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}