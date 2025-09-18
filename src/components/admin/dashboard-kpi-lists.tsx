import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface CourseListItem {
  id: string;
  courseDate: Date;
  location: { name: string } | null;
  category: { name: string } | null;
}

interface PopularCourse extends CourseListItem {
  _count: { registrations: number };
}

interface NearlyFullCourse extends CourseListItem {
  spotsAvailable: number;
}

export function PopularCoursesList({ courses }: { courses: PopularCourse[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 5 Populaire Cursussen</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium leading-none">
                  {course.category?.name} in {course.location?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(course.courseDate, "d MMM yyyy", { locale: nl })}
                </p>
              </div>
              <Badge variant="secondary">{course._count.registrations} aanmeldingen</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function NearlyFullCoursesList({ courses }: { courses: NearlyFullCourse[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Bijna Volle Cursussen</CardTitle>
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/cursussen">
            Beheer <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium leading-none">
                  {course.category?.name} in {course.location?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(course.courseDate, "d MMM yyyy", { locale: nl })}
                </p>
              </div>
              <Badge variant="destructive">{course.spotsAvailable} plekken vrij</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}