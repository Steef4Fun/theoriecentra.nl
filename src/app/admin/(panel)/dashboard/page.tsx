import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { BookCopy, Users } from "lucide-react";
import { WeeklyRegistrationsChart } from "@/components/admin/weekly-registrations-chart";
import { PopularCoursesList, NearlyFullCoursesList } from "@/components/admin/dashboard-kpi-lists";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

// Helper function to get weekly registrations
async function getWeeklyRegistrations() {
  const result: { week: Date, count: bigint }[] = await prisma.$queryRaw`
    SELECT DATE_TRUNC('week', "createdAt") as week, COUNT(*) as count
    FROM "Registration"
    WHERE "createdAt" > NOW() - INTERVAL '12 weeks'
    GROUP BY week
    ORDER BY week;
  `;
  return result.map(r => ({
    week: format(new Date(r.week), "d MMM", { locale: nl }),
    count: Number(r.count),
  }));
}

// Helper function to get popular courses
async function getPopularCourses() {
  const popularCourseIds = await prisma.registration.groupBy({
    by: ['courseId'],
    _count: {
      courseId: true,
    },
    orderBy: {
      _count: {
        courseId: 'desc',
      },
    },
    take: 5,
  });

  if (popularCourseIds.length === 0) return [];

  const courses = await prisma.course.findMany({
    where: {
      id: {
        in: popularCourseIds.map(c => c.courseId!),
      },
    },
    include: {
      location: true,
      category: true,
      _count: {
        select: { registrations: true },
      },
    },
  });

  // Sort courses by popularity
  return courses.sort((a, b) => b._count.registrations - a._count.registrations);
}

export default async function Dashboard() {
  const registrationCount = await prisma.registration.count();
  const upcomingCourseCount = await prisma.course.count({
    where: { courseDate: { gte: new Date() } },
  });

  const weeklyData = await getWeeklyRegistrations();
  const popularCourses = await getPopularCourses();
  const nearlyFullCourses = await prisma.course.findMany({
    where: {
      courseDate: { gte: new Date() },
      spotsAvailable: { gt: 0, lte: 3 },
    },
    include: { location: true, category: true },
    orderBy: { spotsAvailable: 'asc' },
    take: 5,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Totaal Aanmeldingen
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{registrationCount ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Geplande Cursussen
            </CardTitle>
            <BookCopy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingCourseCount ?? 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <WeeklyRegistrationsChart data={weeklyData} />
        <div className="space-y-6">
          <PopularCoursesList courses={popularCourses as any} />
          <NearlyFullCoursesList courses={nearlyFullCourses} />
        </div>
      </div>
    </div>
  );
}