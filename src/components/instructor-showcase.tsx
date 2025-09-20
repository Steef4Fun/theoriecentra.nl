import { ShieldCheck } from "lucide-react";
import { Card } from "./ui/card";
import prisma from "@/lib/prisma";
import Image from "next/image";

export async function InstructorShowcase() {
  const instructors = await prisma.user.findMany({
    where: {
      role: 'instructor',
      // Filter to only show instructors with a complete profile
      NOT: [
        { name: null },
        { title: null },
        { bio: null },
        { passRate: null },
        { imageUrl: null },
      ]
    },
    take: 3, // Show a maximum of 3 instructors
  });

  if (!instructors || instructors.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        Geen instructeurs beschikbaar om te tonen. Voeg ze toe in het beheerpaneel.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {instructors.map((instructor) => (
        <Card key={instructor.id} className="overflow-hidden">
          <div className="relative aspect-square w-full bg-muted/50 flex flex-col items-center justify-center p-4 text-center">
            {instructor.imageUrl ? (
              <Image
                src={instructor.imageUrl}
                alt={instructor.name || 'Instructeur'}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <ShieldCheck className="h-12 w-12 text-muted-foreground/50" />
            )}
          </div>
          <div className="p-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <ShieldCheck className="h-8 w-8 text-primary" />
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