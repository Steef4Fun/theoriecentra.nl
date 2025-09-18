import { ShieldCheck, AlertTriangle, KeyRound, Camera } from "lucide-react";
import { Card } from "./ui/card";

const instructors = [
  {
    name: "Instructeur 1",
    title: "Hoofdinstructeur & CBR-expert",
    passRate: "94%",
    bio: "Alex ontrafelt de meest complexe verkeersregels en maakt ze simpel. Met zijn befaamde ezelsbruggetjes wordt de theorie een logisch verhaal dat je nooit meer vergeet.",
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
  },
  {
    name: "Instructeur 2",
    title: "Specialist Gevaarherkenning",
    passRate: "91%",
    bio: "Samira is de koningin van het onderdeel 'Gevaarherkenning'. Ze leert je niet alleen de regels, maar ook de mindset om situaties correct in te schatten onder de tijdsdruk van het CBR-examen.",
    icon: <AlertTriangle className="h-8 w-8 text-primary" />,
  },
  {
    name: "Instructeur 3",
    title: "Strikvraag-ontmantelaar",
    passRate: "92%",
    bio: "De beruchte strikvragen van het CBR hebben geen geheimen voor Joris. Hij leert je de patronen herkennen en de valkuilen te vermijden, zodat je met 100% vertrouwen je examen maakt.",
    icon: <KeyRound className="h-8 w-8 text-primary" />,
  },
];

export function InstructorShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {instructors.map((instructor) => (
        <Card key={instructor.name} className="overflow-hidden">
          <div className="relative aspect-square w-full bg-muted/50 flex flex-col items-center justify-center p-4 text-center">
            <Camera className="h-10 w-10 text-muted-foreground/50" />
            <p className="text-xs text-muted-foreground/70 mt-2 max-w-[150px]">
              Professionele foto verhoogt vertrouwen met 40%
            </p>
          </div>
          <div className="p-6 text-center">
            <div className="flex items-center justify-center gap-3">
              {instructor.icon}
              <div>
                <p className="text-4xl font-extrabold text-primary tracking-tighter">{instructor.passRate}</p>
                <p className="text-sm text-muted-foreground -mt-1.5">Slagingskans</p>
              </div>
            </div>
            <h3 className="text-xl font-bold mt-4">{instructor.name}</h3>
            <p className="text-muted-foreground font-medium">{instructor.title}</p>
            <p className="text-muted-foreground mt-4 text-sm">{instructor.bio}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}