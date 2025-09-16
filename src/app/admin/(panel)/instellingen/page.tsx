import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { SettingsCrud } from "@/components/admin/settings-crud";

export default async function InstellingenPage() {
  const supabase = createSupabaseServerClient();
  
  const { data: locations } = await supabase.from("locations").select("id, name").order("name");
  const { data: categories } = await supabase.from("categories").select("id, name").order("name");

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Instellingen</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SettingsCrud
          title="Locaties"
          description="Beheer hier de cursuslocaties."
          tableName="locations"
          items={locations || []}
        />
        <SettingsCrud
          title="Categorieën"
          description="Beheer hier de cursuscategorieën (bv. Auto, Motor)."
          tableName="categories"
          items={categories || []}
        />
      </div>
    </div>
  );
}