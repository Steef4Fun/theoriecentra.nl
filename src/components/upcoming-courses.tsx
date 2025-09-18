"use client";

import { Course } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

export function UpcomingCourses({ courses }: { courses: Course[] }) {
  const isMobile = useIsMobile();

  if (!courses || courses.length === 0) {
    return <p className="text-center text-white/80">Geen aankomende cursussen gevonden.</p>;
  }

  const coursesToShow = isMobile ? courses.slice(0, 3) : courses;

  return (
    <>
      <div className="space-y-3">
        {coursesToShow.map((course) => {
          const isLowSpots = course.spotsAvailable < 5;
          return (
            <Card key={course.id} className="bg-white/10 border-white/20 text-white p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-left">
                {/* Column 1: Location & Category */}
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-white/70 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">{course.location?.name}</p>
                    <p className="text-xs text-white/70">{course.category?.name}</p>
                  </div>
                </div>

                {/* Column 2: Date & Scarcity */}
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-white/70 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">{format(new Date(course.courseDate), "eeee d MMMM", { locale: nl })}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-base font-bold text-white flex items-center">
                        <Users className="h-4 w-4 mr-1.5" />
                        {course.spotsAvailable} plekken
                      </span>
                      {isLowSpots && (
                        <Badge className="bg-accent hover:bg-accent/90 text-accent-foreground px-2.5 py-1 text-xs border-0 animate-pulse-subtle">
                          Bijna vol!
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Column 3: Price & CTA */}
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
                  <div className="text-left sm:text-right">
                    <p className="text-xl font-bold">€{course.basePrice.toFixed(2)}</p>
                    <p className="text-xs text-white/70 -mt-1">+ €{course.examFee.toFixed(2)}</p>
                  </div>
                  <Button asChild size="sm" className="w-full sm:w-auto flex-shrink-0">
                    <Link href={`/inschrijven/${course.id}`}>Boek Nu</Link>
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      {isMobile && courses.length > 3 && (
        <div className="mt-6 text-center">
          <Button asChild variant="outline" className="bg-transparent text-white border-white/50 hover:bg-white/10 hover:text-white">
            <Link href="/#booking-wizard">
              Bekijk alle cursussen <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}