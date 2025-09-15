"use client";

import { useState } from "react";
import type { Course, Location } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import Link from "next/link";
import { Calendar, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface CourseBrowserProps {
  courses: Course[];
  locations: Location[];
}

export function CourseBrowser({ courses, locations }: CourseBrowserProps) {
  const [selectedLocation, setSelectedLocation] = useState<string>("all");

  const filteredCourses = courses.filter(
    (course) =>
      selectedLocation === "all" || course.location_id === selectedLocation
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
    return adjustedDate.toLocaleDateString("nl-NL", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardContent className="p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="location-select" className="text-sm font-medium">
              Kies je locatie
            </label>
            <Select onValueChange={setSelectedLocation} defaultValue="all">
              <SelectTrigger id="location-select" className="mt-1">
                <SelectValue placeholder="Selecteer een locatie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle locaties</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 max-h-96 overflow-y-auto pr-2 space-y-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg border p-4"
              >
                <div>
                  <p className="font-bold">
                    {course.location?.name} - {course.category?.name}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{formatDate(course.course_date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Users className="mr-2 h-4 w-4" />
                    <span>{course.spots_available} plekken vrij</span>
                  </div>
                </div>
                <Button asChild className="w-full sm:w-auto flex-shrink-0">
                  <Link href={`/inschrijven/${course.id}`}>Inschrijven</Link>
                </Button>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <p>Geen cursussen gevonden voor deze locatie.</p>
              <p className="text-sm">Kies een andere locatie of kom later terug.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}