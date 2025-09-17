import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { RegistrationWizard } from "@/components/registration-wizard";
import type { Course } from "@/lib/types";
import { notFound } from "next/navigation";
import { AnimatedSection } from "@/components/animated-section";
import prisma from "@/lib/prisma";

export default async function RegistrationPage({
  params,
}: {
  params: { courseId: string };
}) {
  const courseData = await prisma.course.findUnique({
    where: { id: params.courseId },
    include: {
      location: true,
      category: true,
    },
  });

  if (!courseData) {
    notFound();
  }
  
  // Convert Date object to string to avoid serialization issues
  const course: Course = {
    ...courseData,
    courseDate: courseData.courseDate.toISOString(),
  } as Course;

  if (course.spotsAvailable < 1) {
    return (
       <div className="container max-w-4xl py-12 flex items-center justify-center">
         <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Helaas, deze cursus is vol!</AlertTitle>
            <AlertDescription>
                Er zijn geen plekken meer beschikbaar voor deze datum. Kies een andere cursus.
            </AlertDescription>
        </Alert>
       </div>
    )
  }

  return (
    <div className="container max-w-4xl py-12 flex flex-col items-center justify-center space-y-8">
      <AnimatedSection>
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
              Inschrijven voor {course.category?.name} Theoriecursus
          </h1>
          <p className="text-muted-foreground mt-2">Voltooi de stappen om je plek te reserveren.</p>
        </div>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <RegistrationWizard course={course} />
      </AnimatedSection>
    </div>
  );
}