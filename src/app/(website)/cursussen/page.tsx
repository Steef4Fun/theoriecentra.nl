import { AnimatedSection } from "@/components/animated-section";
import { CourseList } from "@/components/course-list";
import prisma from "@/lib/prisma";
import { Course } from "@/lib/types";

async function getData() {
  const coursesData = await prisma.course.findMany({
    where: {
      courseDate: { gte: new Date() },
      spotsAvailable: { gt: 0 },
    },
    include: {
      location: true,
      category: true,
    },
    orderBy: { courseDate: 'asc' },
  });

  const locations = await prisma.location.findMany({ orderBy: { name: 'asc' } });
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });

  // Serialize date objects
  const courses = coursesData.map(course => ({
    ...course,
    courseDate: course.courseDate.toISOString(),
  })) as Course[];

  return { courses, locations, categories };
}

export default async function CursussenPage() {
  const { courses, locations, categories } = await getData();

  return (
    <div className="container py-16 md:py-24">
      <AnimatedSection>
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Alle Cursussen
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            Vind de perfecte cursusdatum. Filter op locatie en categorie om snel jouw ideale dag te vinden.
          </p>
        </div>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <CourseList courses={courses} locations={locations} categories={categories} />
      </AnimatedSection>
    </div>
  );
}