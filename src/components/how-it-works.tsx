import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const steps = [
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

export function HowItWorks() {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-12 hidden h-1 w-2/3 -translate-x-1/2 border-t-2 border-dashed border-primary/50 md:block" aria-hidden="true"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {steps.map((step) => (
          <Card key={step.step} className="text-center bg-card z-10">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">
                {step.step}
              </div>
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}