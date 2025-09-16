import { SettingsCrud } from "@/components/admin/settings-crud";
import prisma from "@/lib/prisma";

export default async function InstellingenPage() {
  const locations = await prisma.location.findMany({ orderBy: { name: 'asc' } });
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Instellingen</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SettingsCrud
          title="Locaties"
          description="Beheer hier de cursuslocaties."
          tableName="location"
          items={locations || []}
        />
        <SettingsCrud
          title="Categorieën"
          description="Beheer hier de cursuscategorieën (bv. Auto, Motor)."
          tableName="category"
          items={categories || []}
        />
      </div>
    </div>
  );
}