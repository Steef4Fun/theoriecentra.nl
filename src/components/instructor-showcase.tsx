import { Award } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";

const instructors = [
  {
    name: "Alex de Vries",
    title: "Hoofdinstructeur & CBR-expert",
    passRate: "94%",
    bio: "Alex ontrafelt de meest complexe verkeersregels en maakt ze simpel. Met zijn befaamde ezelsbruggetjes wordt de theorie een logisch verhaal dat je nooit meer vergeet.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Samira El Amrani",
    title: "Specialist Gevaarherkenning",
    passRate: "91%",
    bio: "Samira is de koningin van het onderdeel 'Gevaarherkenning'. Ze leert je niet alleen de regels, maar ook de mindset om situaties correct in te schatten onder de tijdsdruk van het CBR-examen.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Joris Willems",
    title: "Strikvraag-ontmantelaar",
    passRate: "92%",
    bio: "De beruchte strikvragen van het CBR hebben geen geheimen voor Joris. Hij leert je de patronen herkennen en de valkuilen te vermijden, zodat je met 100% vertrouwen je examen maakt.",
    imageUrl: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=800&auto=format&fit=crop",
  },
];

export function InstructorShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {instructors.map((instructor) => (
        <Card key={instructor.name} className="overflow-hidden text-center">
          <div className="relative h-64 w-full">
            <Image
              src={instructor.imageUrl}
              alt={instructor.name}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold">{instructor.name}</h3>
            <p className="text-primary font-medium">{instructor.title}</p>
            <p className="text-muted-foreground mt-3 text-sm">{instructor.bio}</p>
            <div className="mt-4 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
              <Award className="mr-2 h-4 w-4" />
              {instructor.passRate} slagingskans
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}