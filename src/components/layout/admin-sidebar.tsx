import Link from "next/link";
import {
  Home,
  Users,
  BookCopy,
  Mail,
  FileClock,
  History,
} from "lucide-react";
import Image from "next/image";

export function AdminSidebar() {
  // TODO: Add active link styling
  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image src="/logo-light.png" alt="Logo" width={150} height={30} />
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/aanmeldingen"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-4 w-4" />
              Aanmeldingen
            </Link>
            <Link
              href="/admin/cursussen"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <BookCopy className="h-4 w-4" />
              Cursussen
            </Link>
            <Link
              href="/admin/mail-templates"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              Mail Templates
            </Link>
            <Link
              href="/admin/mail-logs"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <FileClock className="h-4 w-4" />
              Mail Logs
            </Link>
            <Link
              href="/admin/audit-logs"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <History className="h-4 w-4" />
              Audit Logs
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}