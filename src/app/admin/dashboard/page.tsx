import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { BookCopy, Users } from "lucide-react";

export default async function Dashboard() {
  const supabase = createSupabaseServerClient();

  const { count: registrationCount } = await supabase
    .from("registrations")
    .select("*", { count: "exact", head: true });

  const { count: courseCount } = await supabase
    .from("courses")
    .select("*", { count: "exact", head: true })
    .gte("course_date", new Date().toISOString());

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Totaal Aanmeldingen
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{registrationCount ?? 0}</div>
            <p className="text-xs text-muted-foreground">
              Totaal aantal inschrijvingen
            </p>
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
            <div className="text-2xl font-bold">{courseCount ?? 0}</div>
            <p className="text-xs text-muted-foreground">
              Aankomende cursussen
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}