import { UsersTable } from "@/components/admin/users-table";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export default async function GebruikersPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // Map to match the expected Profile type structure for the table
  const profiles = users.map((user: User) => ({
    id: user.id,
    role: user.role,
    instructorNumber: user.instructorNumber,
    user: {
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    }
  }));

  return (
    <div>
      <UsersTable profiles={profiles as any || []} />
    </div>
  );
}