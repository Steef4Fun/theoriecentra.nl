import { UsersTable } from "@/components/admin/users-table";
import prisma from "@/lib/prisma";

export default async function GebruikersPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // Map to match the expected Profile type structure for the table
  const profiles = users.map(user => ({
    id: user.id,
    role: user.role,
    instructor_number: user.instructorNumber,
    user: {
      email: user.email,
      created_at: user.createdAt.toISOString(),
    }
  }));

  return (
    <div>
      <UsersTable profiles={profiles as any || []} />
    </div>
  );
}