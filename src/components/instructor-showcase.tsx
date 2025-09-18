import { ShieldCheck, AlertTriangle, KeyRound } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const instructors = [
  {
    name: "Alex de Vries",
    title: "Hoofdinstructeur & CBR-expert",
    passRate: "94%",
    bio: "Alex ontrafelt de meest complexe verkeersregels en maakt ze simpel. Met zijn befaamde ezelsbruggetjes wordt de theorie een logisch verhaal dat je nooit meer vergeet.",
    icon: <ShieldCheck className="h-12 w-12 text-primary" />,
  },
  {
    name: "Samira El Amrani",
    title: "Specialist Gevaarherkenning",
    passRate: "91%",
    bio: "Samira is de koningin van het onderdeel 'Gevaarherkenning'. Ze leert je niet alleen de regels, maar ook de mindset om situaties correct in te schatten onder de tijdsdruk van het CBR-examen.",
    icon: <AlertTriangle className="h-12 w-12 text-primary" />,
  },
  {
    name: "Joris Willems",
    title: "Strikvraag-ontmantelaar",
    passRate: "92%",
    bio: "De beruchte strikvragen van het CBR hebben geen geheimen voor Joris. Hij leert je de patronen herkennen en de valkuilen te vermijden, zodat je met 100% vertrouwen je examen maakt.",
    icon: <KeyRound className="h-12 w-12 text-primary" />,
  },
];

export function InstructorShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {instructors.map((instructor) => (
        <Card key={instructor.name} className="text-center p-8 flex flex-col items-center">
          {instructor.icon}
          <div className="my-4">
            <span className="text-7xl font-extrabold text-primary tracking-tighter">{instructor.passRate}</span>
            <p className="text-muted-foreground -mt-2">Slagingskans</p>
          </div>
          <h3 className="text-xl font-bold">{instructor.name}</h3>
          <p className="text-muted-foreground font-medium">{instructor.title}</p>
          <p className="text-muted-foreground mt-4 text-sm flex-grow">{instructor.bio}</p>
        </Card>
      ))}
    </div>
  );
}