import { SettingsCrud } from "@/components/admin/settings-crud";
import prisma from "@/lib/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageSettingsForm } from "@/components/admin/image-settings-form";
import { InstructorProfileCrud } from "@/components/admin/instructor-profile-crud";

export default async function InstellingenPage() {
  const locations = await prisma.location.findMany({ orderBy: { name: 'asc' } });
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
  const imageSettings = await prisma.setting.findMany({
    where: { key: { startsWith: 'imageUrl' } },
  });
  const instructorProfiles = await prisma.instructorProfile.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Instellingen</h1>
      <Tabs defaultValue="algemeen">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="algemeen">Algemeen</TabsTrigger>
          <TabsTrigger value="afbeeldingen">Afbeeldingen</TabsTrigger>
          <TabsTrigger value="instructeurs">Instructeurs</TabsTrigger>
        </TabsList>
        <TabsContent value="algemeen">
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
        </TabsContent>
        <TabsContent value="afbeeldingen">
          <ImageSettingsForm settings={imageSettings} />
        </TabsContent>
        <TabsContent value="instructeurs">
          <InstructorProfileCrud profiles={instructorProfiles} />
        </TabsContent>
      </Tabs>
    </div>
  );
}