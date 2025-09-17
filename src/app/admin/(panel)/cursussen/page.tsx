import { CoursesTable } from "@/components/admin/courses-table";
import prisma from "@/lib/prisma";

export default async function CursussenAdminPage() {
  const courses = await prisma.course.findMany({
    include: {
      location: true,
      category: true,
      instructor: true,
    },
    orderBy: {
      courseDate: "desc",
    },
  });

  const locations = await prisma.location.findMany();
  const categories = await prisma.category.findMany();
  const instructors = await prisma.user.findMany({
    where: { role: 'instructor' },
    orderBy: { email: 'asc' },
  });

  return (
    <div>
      <CoursesTable 
        courses={courses as any || []} 
        locations={locations || []}
        categories={categories || []}
        instructors={instructors || []}
      />
    </div>
  );
}