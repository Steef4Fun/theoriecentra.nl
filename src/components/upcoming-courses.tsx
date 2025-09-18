"use client";

import { useEffect, useState } from "react";
import { Course } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Loader2, MapPin, Calendar, ArrowRight, Users } from "lucide-react";
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
      <div className="flex justify-center items-center h-48">
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
        <Link href={`/inschrijven/${course.id}`} key={course.id} className="block group">
          <Card className="bg-white/10 border-white/20 text-white p-4 transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/40 group-hover:scale-[1.02]">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr,1fr,auto] items-center gap-4 text-left">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-white/70 flex-shrink-0" />
                <div>
                  <p className="font-semibold">{course.location?.name}</p>
                  <p className="text-xs text-white/70">{course.category?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-white/70 flex-shrink-0" />
                <div>
                  <p className="font-semibold">{format(new Date(course.courseDate), "eeee d MMMM", { locale: nl })}</p>
                  <p className="text-xs text-white/70 flex items-center"><Users className="h-3 w-3 mr-1.5" />{course.spotsAvailable} plekken vrij</p>
                </div>
              </div>
              <div className="flex items-center justify-start sm:justify-end gap-4">
                <div className="text-left sm:text-right">
                  <p className="text-lg font-bold">€{course.basePrice.toFixed(2)}</p>
                  <p className="text-xs text-white/70 -mt-1">+ €{course.examFee.toFixed(2)} examenkosten</p>
                </div>
                <ArrowRight className="h-6 w-6 text-white/70 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}