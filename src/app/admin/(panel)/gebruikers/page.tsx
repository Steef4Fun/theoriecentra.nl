import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { UsersTable } from "@/components/admin/users-table";

export default async function GebruikersPage() {
  const supabase = createSupabaseServerClient();
  
  const { data: profiles } = await supabase
    .from("profiles")
    .select(`
      id,
      role,
      instructor_number,
      user:users (
        email,
        created_at
      )
    `)
    .order("user(created_at)", { ascending: false });

  return (
    <div>
      <UsersTable profiles={profiles || []} />
    </div>
  );
}