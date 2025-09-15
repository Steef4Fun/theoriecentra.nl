"use client";

import { supabase } from "@/integrations/supabase/client";
import { CourseBrowser } from "@/components/course-browser";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Course, Location } from "@/lib/types";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    async function getCoursesAndLocations() {
      const today = new Date().toISOString();

      const coursesPromise = supabase
        .from("courses")
        .select(
          `
          id, course_date, start_time, end_time, base_price, exam_fee, spots_available,
          location_id, location:locations (name), category:categories (name)
        `
        )
        .gte("course_date", today)
        .order("course_date", { ascending: true });

      const locationsPromise = supabase.from("locations").select("id, name");

      const [
        { data: coursesData, error: coursesError },
        { data: locationsData, error: locationsError },
      ] = await Promise.all([coursesPromise, locationsPromise]);

      if (coursesError || locationsError) {
        console.error("Error fetching data:", coursesError || locationsError);
        return;
      }

      setCourses(coursesData as Course[]);
      setLocations(locationsData as Location[]);
    }

    getCoursesAndLocations();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_5%,transparent_100%)]"></div>
        <div className="container px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-2">
              Slaag voor je theorie in één dag
            </h1>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
              Onze dagcursus bereidt je perfect voor op het CBR-examen. Kies je
              locatie, vind je datum en reserveer direct je plek.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 flex justify-center"
          >
            <CourseBrowser courses={courses} locations={locations} />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Waarom kiezen voor Theoriecentra.nl?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Wij maken het halen van je theorie-examen eenvoudig, snel en
                betaalbaar. Geen verrassingen, alleen resultaat.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:grid-cols-3">
            <Card className="text-center border-white/10">
              <CardHeader>
                <CheckCircle className="h-8 w-8 mx-auto text-primary" />
                <CardTitle className="mt-2">Hoogste Slagingskans</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Onze bewezen lesmethode zorgt ervoor dat je de stof écht
                  begrijpt en met vertrouwen het examen ingaat.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-white/10">
              <CardHeader>
                <CheckCircle className="h-8 w-8 mx-auto text-primary" />
                <CardTitle className="mt-2">Duidelijke Prijzen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Eén vaste prijs voor de cursus en het examen. Geen verborgen
                  kosten of 'vanaf' prijzen.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-white/10">
              <CardHeader>
                <CheckCircle className="h-8 w-8 mx-auto text-primary" />
                <CardTitle className="mt-2">Direct Examenplek</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Wij reserveren direct een examenplek voor je bij het CBR,
                  aansluitend op de cursus.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Veelgestelde Vragen
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-3xl mx-auto"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Hoe werkt de 1-daagse theoriecursus?
              </AccordionTrigger>
              <AccordionContent>
                Op de cursusdag behandelen we 's ochtends de volledige
                theoriestof met handige ezelsbruggetjes. 's Middags ga je,
                perfect voorbereid, naar het CBR om examen te doen.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Is de prijs inclusief het CBR-examen?
              </AccordionTrigger>
              <AccordionContent>
                Ja, onze totaalprijs is altijd inclusief de cursusdag én de
                kosten voor het officiële CBR theorie-examen. Geen verrassingen
                achteraf.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Wat als ik zak voor het examen?</AccordionTrigger>
              <AccordionContent>
                Mocht je het onverhoopt niet halen, dan bieden we een
                herkansing met korting aan. We laten je niet vallen en helpen
                je tot je geslaagd bent!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Hoe kan ik me inschrijven?
              </AccordionTrigger>
              <AccordionContent>
                Kies hierboven je locatie, selecteer een geschikte datum en
                klik op 'Inschrijven'. Vul je gegevens in, betaal veilig online
                en je plek is gereserveerd!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}