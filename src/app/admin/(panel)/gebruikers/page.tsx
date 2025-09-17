import { UsersTable } from "@/components/admin/users-table";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export default async function GebruikersPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      email: "asc",
    },
  });

  // Map to match the expected Profile type structure for the table
  const profiles = users.map((user: User) => ({
    id: user.id,
    role: user.role,
    user: {
      email: user.email,
    }
  }));

  return (
    <div>
      <UsersTable profiles={profiles as any || []} />
    </div>
  );
}