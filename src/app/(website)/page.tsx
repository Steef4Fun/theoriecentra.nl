import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reviews } from "@/components/reviews";
import { AnimatedSection } from "@/components/animated-section";
import { WhyUs } from "@/components/why-us";
import { HowItWorks } from "@/components/how-it-works";
import { FinalCta } from "@/components/final-cta";
import { TrustBar } from "@/components/trust-bar";
import { UpcomingCourses } from "@/components/upcoming-courses";
import { TheOffer } from "@/components/the-offer";
import { KeyQuestions } from "@/components/key-questions";
import { InstructorShowcase } from "@/components/instructor-showcase";
import prisma from "@/lib/prisma";
import { Course } from "@/lib/types";
import Image from "next/image";

async function getPageData() {
  const upcomingCoursesData = prisma.course.findMany({
    where: { courseDate: { gte: new Date() }, spotsAvailable: { gt: 0 } },
    include: { location: true, category: true, instructor: true },
    orderBy: { courseDate: 'asc' },
    take: 5,
  });

  const settingsData = prisma.setting.findMany({
    where: { key: { startsWith: 'imageUrl' } },
  });

  const [courses, settings] = await Promise.all([upcomingCoursesData, settingsData]);

  const upcomingCourses = courses.map(course => ({
    ...course,
    courseDate: course.courseDate instanceof Date ? course.courseDate.toISOString() : course.courseDate,
  })) as Course[];

  const imageSettings = settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as Record<string, string>);

  return { upcomingCourses, imageSettings };
}

export default async function Home() {
  const { upcomingCourses, imageSettings } = await getPageData();

  const heroImageUrl = imageSettings.imageUrlHero || "/hero-image.jpg";
  const howItWorksImageUrls = [
    imageSettings.imageUrlHowItWorks1 || "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop",
    imageSettings.imageUrlHowItWorks2 || "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
    imageSettings.imageUrlHowItWorks3 || "https://images.unsplash.com/photo-1579636597202-3317e7b3c5f4?q=80&w=800&auto=format&fit=crop",
  ];

  return (
    <>
      {/* Hero Section & Booking */}
      <section id="boeken" className="relative w-full min-h-screen flex items-center justify-center py-24">
        <div className="absolute inset-0 z-[-1] overflow-hidden">
          <Image
            src={heroImageUrl}
            alt="Blije persoon die net het rijbewijs heeft gehaald"
            layout="fill"
            objectFit="cover"
            priority
            className="hero-background-image"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="container">
          <AnimatedSection className="w-full max-w-4xl mx-auto bg-black/40 backdrop-blur-lg rounded-xl p-6 md:p-8 text-white border border-white/20">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl text-shadow">
                Haal je theorie. In één dag.
              </h1>
              <p className="mt-4 text-lg text-white/80 md:text-xl text-shadow-sm max-w-2xl mx-auto">
                Vind hieronder direct de eerstvolgende cursusdata en reserveer je plek. Snel, simpel en met de hoogste slagingskans.
              </p>
            </div>
            <div className="my-8">
              <TrustBar />
            </div>
            <UpcomingCourses courses={upcomingCourses} />
          </AnimatedSection>
        </div>
      </section>

      <div className="space-y-16 md:space-y-24 py-16 md:py-24">
        <section className="container">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                De Snelste Weg naar je Theoriecertificaat
              </h2>
              <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                Ontdek waarom duizenden leerlingen voor ons kiezen.
              </p>
            </div>
            <WhyUs />
          </AnimatedSection>
        </section>

        <section className="container">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Zo Simpel Werkt Het
              </h2>
              <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                In 3 eenvoudige stappen naar je theoriecertificaat.
              </p>
            </div>
            <HowItWorks imageUrls={howItWorksImageUrls} />
          </AnimatedSection>
        </section>
        
        <section className="container">
          <AnimatedSection>
            <TheOffer />
          </AnimatedSection>
        </section>

        <section className="container">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Leer van de Beste Experts
              </h2>
              <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                Ons team van doorgewinterde instructeurs staat klaar om jou te helpen slagen.
              </p>
            </div>
            <InstructorShowcase />
          </AnimatedSection>
        </section>

        <section id="reviews" className="w-full bg-muted py-16 md:py-24">
          <div className="container">
            <AnimatedSection>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
                Wat onze leerlingen zeggen
              </h2>
              <Reviews />
            </AnimatedSection>
          </div>
        </section>

        <section className="container">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Direct Antwoord op je Vragen
              </h2>
            </div>
            <KeyQuestions />
          </AnimatedSection>
        </section>

        <section id="faq" className="w-full bg-muted py-16 md:py-24">
          <div className="container">
            <AnimatedSection>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
                Overige Vragen
              </h2>
              <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                <AccordionItem value="item-1" className="rounded-md transition-colors hover:bg-background/50">
                  <AccordionTrigger className="text-lg font-medium text-left px-6 py-4 w-full">
                    Hoe kan ik me inschrijven?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    Volg de stappen op onze website: kies je locatie, categorie en
                    datum. Vul daarna je gegevens in, betaal veilig online en je
                    plek is gereserveerd!
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="rounded-md transition-colors hover:bg-background/50">
                  <AccordionTrigger className="text-lg font-medium text-left px-6 py-4 w-full">
                    Wat moet ik meenemen naar de cursus?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    Je hoeft alleen een geldig identiteitsbewijs mee te nemen. Wij zorgen voor al het lesmateriaal, en ook voor lunch en drankjes gedurende de dag.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AnimatedSection>
          </div>
        </section>

        <section className="container">
          <FinalCta />
        </section>
      </div>
    </>
  );
}