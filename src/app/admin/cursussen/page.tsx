import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { CoursesTable } from "@/components/admin/courses-table";

export default async function CursussenAdminPage() {
  const supabase = createSupabaseServerClient();
  
  const { data: courses } = await supabase
    .from("courses")
    .select("*, location:locations(id, name), category:categories(id, name)")
    .order("course_date", { ascending: false });

  const { data: locations } = await supabase.from("locations").select("*");
  const { data: categories } = await supabase.from("categories").select("*");

  return (
    <div>
      <CoursesTable 
        courses={courses || []} 
        locations={locations || []}
        categories={categories || []}
      />
    </div>
  );
}