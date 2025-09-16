import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { RegistrationsTable } from "@/components/admin/registrations-table";

export default async function AanmeldingenPage() {
  const supabase = createSupabaseServerClient();
  
  const { data: registrations } = await supabase
    .from("registrations")
    .select(`
      id,
      created_at,
      first_name,
      last_name,
      email,
      payment_status,
      course:courses (
        course_date,
        category:categories (name)
      )
    `)
    .order("created_at", { ascending: false });

  return (
    <div>
      <RegistrationsTable registrations={registrations as any || []} />
    </div>
  );
}