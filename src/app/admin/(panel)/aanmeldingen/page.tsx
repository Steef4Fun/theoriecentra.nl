import { RegistrationsTable } from "@/components/admin/registrations-table";
import prisma from "@/lib/prisma";

export default async function AanmeldingenPage() {
  const registrations = await prisma.registration.findMany({
    include: {
      course: {
        include: {
          category: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <RegistrationsTable registrations={registrations as any || []} />
    </div>
  );
}