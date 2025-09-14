"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import type { Course } from "@/lib/types";
import Link from "next/link";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const total_price = course.base_price + course.exam_fee;
  const courseDate = new Date(course.course_date);

  // Adjust for timezone offset before formatting
  const userTimezoneOffset = courseDate.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(courseDate.getTime() + userTimezoneOffset);

  const formattedDate = adjustedDate.toLocaleDateString("nl-NL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const startTime = course.start_time.substring(0, 5);
  const endTime = course.end_time.substring(0, 5);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">
          {course.category?.name} Theoriecursus
        </CardTitle>
        <div className="flex items-center pt-2 text-muted-foreground">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{course.location?.name}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-primary" />
          <span className="font-medium">{formattedDate}</span>
        </div>
        <div className="flex items-center">
          <Clock className="mr-2 h-5 w-5 text-primary" />
          <span className="font-medium">
            {startTime} - {endTime}
          </span>
        </div>
        <div className="flex items-center">
          <Users className="mr-2 h-5 w-5 text-primary" />
          <span className="font-medium">
            {course.spots_available} plekken beschikbaar
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 rounded-b-lg bg-muted/50 p-4">
        <div>
          <p className="text-2xl font-bold">€{total_price.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">
            (€{course.base_price.toFixed(2)} cursus + €{course.exam_fee.toFixed(2)} examen)
          </p>
        </div>
        <Button className="w-full" asChild>
          <Link href={`/inschrijven/${course.id}`}>Direct Inschrijven</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}