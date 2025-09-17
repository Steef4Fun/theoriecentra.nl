import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { RegistrationActions } from "@/components/admin/registration-actions";
import Link from "next/link";
import { ArrowLeft, User, BookOpen, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientCourse } from "@/lib/types";

export default async function RegistrationDetailPage({ params }: { params: { registrationId: string } }) {
  const registration = await prisma.registration.findUnique({
    where: { id: params.registrationId },
    include: {
      course: {
        include: {
          location: true,
          category: true,
        },
      },
    },
  });

  if (!registration) {
    notFound();
  }

  const availableCoursesFromDb = registration.course ? await prisma.course.findMany({
    where: {
      id: { not: registration.course.id },
      categoryId: registration.course.categoryId,
      locationId: registration.course.locationId,
      courseDate: { gte: new Date() },
      spotsAvailable: { gt: 0 },
    },
    include: {
      location: true,
      category: true,
    },
    orderBy: { courseDate: 'asc' },
  }) : [];

  // Convert Date objects to strings for serialization
  const availableCourses: ClientCourse[] = availableCoursesFromDb.map((course: any) => ({
    ...course,
    courseDate: course.courseDate.toISOString(),
  }));

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'paid': return 'default';
      case 'pending': return 'secondary';
      case 'canceled':
      case 'failed':
      case 'expired':
        return 'destructive';
      default: return 'outline';
    }
  };

  const formatDate = (dateInput: Date) => {
    const date = new Date(dateInput);
    // Correct for timezone offset by formatting based on UTC values
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const correctedDate = new Date(date.getTime() + timezoneOffset);
    return format(correctedDate, "eeee d MMMM yyyy", { locale: nl });
  };
  
  const formatDateTime = (dateInput: Date) => {
    return format(new Date(dateInput), "d MMM yyyy HH:mm", { locale: nl });
  };

  return (
    <div>
      <Button asChild variant="outline" size="sm" className="mb-4">
        <Link href="/admin/aanmeldingen">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Terug naar overzicht
        </Link>
      </Button>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          {/* Leerling Gegevens */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Leerling Gegevens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Naam:</strong> {registration.firstName} {registration.lastName}</p>
              <p><strong>Email:</strong> <a href={`mailto:${registration.email}`} className="text-primary hover:underline">{registration.email}</a></p>
              <p><strong>Telefoon:</strong> <a href={`tel:${registration.phoneNumber}`} className="text-primary hover:underline">{registration.phoneNumber}</a></p>
              <p><strong>Geboortedatum:</strong> {format(new Date(registration.dateOfBirth), "d MMMM yyyy", { locale: nl })}</p>
              <p><strong>Aangemeld op:</strong> {formatDateTime(registration.createdAt)}</p>
            </CardContent>
          </Card>

          {/* Betaling Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" /> Betaling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Status:</strong> <Badge variant={getStatusVariant(registration.paymentStatus)} className="capitalize">{registration.paymentStatus}</Badge></p>
              <p><strong>Betaaloptie:</strong> <span className="capitalize">{registration.paymentOption}</span></p>
              <p><strong>Mollie ID:</strong> {registration.molliePaymentId || 'N/A'}</p>
            </CardContent>
          </Card>
        </div>

        {/* Cursus Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" /> Cursus Details</CardTitle>
            {registration.course ? (
              <CardDescription>
                {registration.course.category.name} op {formatDate(registration.course.courseDate)}
              </CardDescription>
            ) : null}
          </CardHeader>
          {registration.course ? (
            <CardContent className="space-y-2 text-sm">
              <p><strong>Categorie:</strong> {registration.course.category.name}</p>
              <p><strong>Locatie:</strong> {registration.course.location.name}</p>
              <p><strong>Datum:</strong> {formatDate(registration.course.courseDate)}</p>
              <p><strong>Tijd:</strong> {registration.course.startTime.substring(0,5)} - {registration.course.endTime.substring(0,5)}</p>
              <p><strong>Opleidernummer:</strong> {registration.course.instructorNumber}</p>
              <RegistrationActions 
                registrationId={registration.id} 
                isCancelled={registration.paymentStatus === 'canceled'}
                availableCourses={availableCourses}
              />
            </CardContent>
          ) : (
            <CardContent>
              <p className="text-muted-foreground">Geen cursusinformatie beschikbaar.</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}