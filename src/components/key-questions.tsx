import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const keyQuestions = [
  {
    question: "Hoe werkt de dag?",
    answer: "Op de cursusdag behandelen we 's ochtends de volledige theoriestof met handige ezelsbruggetjes. 's Middags ga je, perfect voorbereid, naar het CBR om examen te doen.",
  },
  {
    question: "Is het examen inbegrepen?",
    answer: "Ja, onze totaalprijs is altijd inclusief de cursusdag én de kosten voor het officiële CBR theorie-examen. Geen verrassingen achteraf.",
  },
  {
    question: "Wat als ik zak?",
    answer: "Mocht je het onverhoopt niet halen, dan bieden we een herkansing met korting aan. We laten je niet vallen en helpen je tot je geslaagd bent!",
  },
];

export function KeyQuestions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {keyQuestions.map((item) => (
        <Card key={item.question} className="bg-secondary/30">
          <CardHeader>
            <CardTitle>{item.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{item.answer}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}