"use client";

import { useEffect, useState } from "react";
import { Course } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

export function UpcomingCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingCourses = async () => {
      try {
        const response = await fetch("/api/courses/upcoming");
        const data = await response.json();
        setCourses(data || []);
      } catch (error) {
        console.error("Failed to fetch upcoming courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUpcomingCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (courses.length === 0) {
    return <p className="text-center text-white/80">Geen aankomende cursussen gevonden.</p>;
  }

  return (
    <div className="space-y-3">
      {courses.map((course) => (
        <Card key={course.id} className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-white/70" />
              <span className="font-semibold">{course.location?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-white/70" />
              <span>{format(new Date(course.courseDate), "d MMMM yyyy", { locale: nl })}</span>
            </div>
            <div className="text-lg font-bold">
              €{(course.basePrice + course.examFee).toFixed(2)}
            </div>
            <Button asChild className="bg-success hover:bg-success/90 text-success-foreground w-full sm:w-auto justify-self-start sm:justify-self-end">
              <Link href={`/inschrijven/${course.id}`}>
                Boek Nu <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}