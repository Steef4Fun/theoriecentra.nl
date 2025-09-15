import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { RegistrationWizard } from "@/components/registration-wizard";
import type { Course } from "@/lib/types";
import { notFound } from "next/navigation";
import { AnimatedSection } from "@/components/animated-section";

async function getCourseById(courseId: string) {
  const { data, error } = await supabase
    .from("courses")
    .select(
      `
      id,
      course_date,
      start_time,
      end_time,
      base_price,
      exam_fee,
      spots_available,
      location_id,
      category_id,
      location:locations (name),
      category:categories (name)
    `
    )
    .eq("id", courseId)
    .single();

  if (error || !data) {
    return null;
  }

  // Supabase may return joined data as an array. Flatten it to match our type.
  const formattedData = {
    ...data,
    location: Array.isArray(data.location) ? data.location[0] || null : data.location,
    category: Array.isArray(data.category) ? data.category[0] || null : data.category,
  };

  return formattedData as Course;
}

export default async function RegistrationPage({
  params,
}: {
  params: { courseId: string };
}) {
  const course = await getCourseById(params.courseId);

  if (!course) {
    notFound();
  }
  
  if (course.spots_available < 1) {
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