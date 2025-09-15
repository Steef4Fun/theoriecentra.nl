import { supabase } from "@/integrations/supabase/client";
import { CourseCard } from "@/components/course-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import type { Course } from "@/lib/types";

export const revalidate = 60; // Revalidate data every 60 seconds

export default async function CursussenPage() {
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
      location:locations (name),
      category:categories (name)
    `
    )
    .gte("course_date", new Date().toISOString()) // Only show courses from today onwards
    .order("course_date", { ascending: true });

  if (error) {
    return (
      <div className="container py-12">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Fout bij ophalen van cursussen</AlertTitle>
          <AlertDescription>
            Er is iets misgegaan bij het laden van de cursusdata. Probeer het later opnieuw.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const courses = data as Course[];

  return (
    <div className="container py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Kies je Cursusdatum
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Bekijk hieronder alle beschikbare data en locaties. Schrijf je direct in en reserveer je plek!
        </p>
      </div>

      {courses.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Geen cursussen gevonden</AlertTitle>
          <AlertDescription>
            Er zijn momenteel geen cursussen gepland. Kom snel terug voor nieuwe data!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}