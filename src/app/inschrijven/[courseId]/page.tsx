import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Calendar,
  Clock,
  MapPin,
  Terminal,
  Users,
  Euro,
} from "lucide-react";
import { RegistrationForm } from "@/components/registration-form";
import type { Course } from "@/lib/types";
import { notFound } from "next/navigation";

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
      location:locations (name),
      category:categories (name)
    `
    )
    .eq("id", courseId)
    .single();

  if (error || !data) {
    return null;
  }
  return data as Course;
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

  const courseDate = new Date(course.course_date);
  const userTimezoneOffset = courseDate.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(courseDate.getTime() + userTimezoneOffset);
  const formattedDate = adjustedDate.toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const startTime = course.start_time.substring(0, 5);
  const endTime = course.end_time.substring(0, 5);
  const totalPrice = course.base_price + course.exam_fee;

  return (
    <div className="container max-w-4xl py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Inschrijven voor {course.category?.name} Theoriecursus
          </h1>
          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Cursusdetails</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-primary" />
                <span>{course.location?.name}</span>
              </li>
              <li className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-primary" />
                <span>{formattedDate}</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-primary" />
                <span>
                  {startTime} - {endTime}
                </span>
              </li>
              <li className="flex items-center">
                <Users className="h-5 w-5 mr-3 text-primary" />
                <span>{course.spots_available} plekken beschikbaar</span>
              </li>
              <li className="flex items-center font-bold text-foreground">
                <Euro className="h-5 w-5 mr-3 text-primary" />
                <span>Totaalprijs: €{totalPrice.toFixed(2)}</span>
              </li>
            </ul>
          </div>
          {course.spots_available < 5 && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Let op: Weinig plekken beschikbaar!</AlertTitle>
              <AlertDescription>
                Er zijn nog maar {course.spots_available} plekken vrij voor deze cursus. Wacht niet te lang met inschrijven.
              </AlertDescription>
            </Alert>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Jouw Gegevens</h2>
          <RegistrationForm course={course} />
        </div>
      </div>
    </div>
  );
}