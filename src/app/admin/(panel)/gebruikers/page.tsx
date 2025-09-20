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
    title: user.title,
    bio: user.bio,
    passRate: user.passRate,
    imageUrl: user.imageUrl,
    user: {
      email: user.email,
      name: user.name,
    }
  }));

  return (
    <div>
      <UsersTable profiles={profiles as any || []} />
    </div>
  );
}