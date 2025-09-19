"use client";

import { useState, useMemo } from "react";
import { Course, Location, Category } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Users, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CourseListProps {
  courses: Course[];
  locations: Location[];
  categories: Category[];
}

export function CourseList({ courses, locations, categories }: CourseListProps) {
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const locationMatch = locationFilter === "all" || course.locationId === locationFilter;
      const categoryMatch = categoryFilter === "all" || course.categoryId === categoryFilter;
      return locationMatch && categoryMatch;
    });
  }, [courses, locationFilter, categoryFilter]);

  return (
    <div>
      <Card className="p-4 mb-8 bg-muted/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <h3 className="text-lg font-semibold md:col-span-1">Filter Cursussen</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:col-span-2 gap-4">
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Kies een locatie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Locaties</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Kies een categorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Categorieën</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {filteredCourses.length > 0 ? (
        <div className="space-y-4">
          {filteredCourses.map(course => {
            const isLowSpots = course.spotsAvailable < 5;
            return (
              <Card key={course.id} className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 text-left">
                  <div className="md:col-span-3 flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div>
                      <p className="font-semibold">{course.location?.name}</p>
                    </div>
                  </div>
                  <div className="md:col-span-2 flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div>
                      <p className="font-semibold">{course.category?.name}</p>
                    </div>
                  </div>
                  <div className="md:col-span-3 flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div>
                      <p className="font-semibold">{format(new Date(course.courseDate), "eeee d MMMM yyyy", { locale: nl })}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-medium text-muted-foreground flex items-center">
                          <Users className="h-4 w-4 mr-1.5" />
                          {course.spotsAvailable} plekken
                        </span>
                        {isLowSpots && (
                          <Badge variant="destructive" className="px-2 py-0.5 text-xs">Bijna vol!</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
                    <div className="text-left sm:text-right">
                      <p className="text-xl font-bold">€{course.basePrice.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground -mt-1">+ €{course.examFee.toFixed(2)}</p>
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
      ) : (
        <Card className="text-center p-12">
          <p className="text-muted-foreground">Geen cursussen gevonden die aan je criteria voldoen. Probeer een ander filter.</p>
        </Card>
      )}
    </div>
  );
}