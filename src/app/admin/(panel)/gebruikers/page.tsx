import { UsersTable } from "@/components/admin/users-table";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export default async function GebruikersPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      email: "asc",
    },
  });

  // Map to a simpler structure for the table
  const profiles = users.map((user: User) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }));

  return (
    <div>
      <UsersTable profiles={profiles as any || []} />
    </div>
  );
}