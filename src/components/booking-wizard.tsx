"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Location, Category, Course } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { nl } from "date-fns/locale";
import { format, isSameDay } from "date-fns";
import {
  Loader2,
  MapPin,
  BookOpen,
  Calendar as CalendarIcon,
  ArrowRight,
  Users,
  Clock,
} from "lucide-react";
import Link from "next/link";

export function BookingWizard() {
  const [step, setStep] = useState(1);
  const [locations, setLocations] = useState<Location[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [locationsRes, categoriesRes] = await Promise.all([
        supabase.from("locations").select("*"),
        supabase.from("categories").select("*"),
      ]);
      setLocations(locationsRes.data || []);
      setCategories(categoriesRes.data || []);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (selectedLocation && selectedCategory) {
        setIsLoading(true);
        setSelectedDate(undefined);
        setSelectedCourse(null);
        const { data } = await supabase
          .from("courses")
          .select("*, location:locations(name), category:categories(name)")
          .eq("location_id", selectedLocation.id)
          .eq("category_id", selectedCategory.id)
          .gte("course_date", new Date().toISOString());
        setCourses((data as Course[]) || []);
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [selectedLocation, selectedCategory]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const courseOnDate = courses.find((c) =>
        isSameDay(new Date(c.course_date), date)
      );
      setSelectedCourse(courseOnDate || null);
    } else {
      setSelectedCourse(null);
    }
  };

  const availableDates = courses.map((c) => new Date(c.course_date));

  const reset = () => {
    setStep(1);
    setSelectedLocation(null);
    setSelectedCategory(null);
    setSelectedDate(undefined);
    setSelectedCourse(null);
    setCourses([]);
  };

  const renderStep = () => {
    if (isLoading && step < 3) {
      return <Loader2 className="h-8 w-8 animate-spin mx-auto" />;
    }

    switch (step) {
      case 1:
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {locations.map((location) => (
              <Card
                key={location.id}
                className="p-4 text-center cursor-pointer hover:bg-muted"
                onClick={() => {
                  setSelectedLocation(location);
                  setStep(2);
                }}
              >
                <MapPin className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="font-semibold">{location.name}</p>
              </Card>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="p-4 text-center cursor-pointer hover:bg-muted"
                onClick={() => {
                  setSelectedCategory(category);
                  setStep(3);
                }}
              >
                <BookOpen className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="font-semibold">{category.name}</p>
              </Card>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-center">
                Kies een beschikbare datum
              </h3>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <Card>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    locale={nl}
                    modifiers={{ available: availableDates }}
                    modifiersStyles={{
                      available: {
                        fontWeight: "bold",
                        color: "hsl(var(--primary))",
                      },
                    }}
                    disabled={(date) =>
                      date < new Date() ||
                      !availableDates.some((d) => isSameDay(d, date))
                    }
                    initialFocus
                  />
                </Card>
              )}
            </div>
            <AnimatePresence>
              {selectedCourse && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3 className="text-lg font-semibold mb-2">
                    Jouw Gekozen Cursus
                  </h3>
                  <Card className="p-4 space-y-3">
                    <p className="text-xl font-bold">
                      {selectedCourse.category?.name} Theoriecursus
                    </p>
                    <div className="text-muted-foreground space-y-2">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>
                          {format(new Date(selectedCourse.course_date), "eeee d MMMM yyyy", { locale: nl })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>
                          {selectedCourse.start_time.substring(0, 5)} - {selectedCourse.end_time.substring(0, 5)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        <span>
                          {selectedCourse.spots_available} plekken vrij
                        </span>
                      </div>
                    </div>
                    <div className="pt-2">
                      <p className="text-2xl font-bold">
                        €{(selectedCourse.base_price + selectedCourse.exam_fee).toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        inclusief cursus & examen
                      </p>
                    </div>
                    <Button asChild className="w-full mt-2">
                      <Link href={`/inschrijven/${selectedCourse.id}`}>
                        Direct Inschrijven <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">
              {step === 1 && "Kies je locatie"}
              {step === 2 && "Kies je categorie"}
              {step === 3 && "Kies je cursusdatum"}
            </h2>
            <p className="text-muted-foreground">
              {selectedLocation?.name}
              {selectedCategory && ` / ${selectedCategory.name}`}
            </p>
          </div>
          <Button variant="ghost" onClick={reset} disabled={step === 1}>
            Begin opnieuw
          </Button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}