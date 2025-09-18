import Link from "next/link";
import {
  Home,
  Users,
  BookCopy,
  Mail,
  FileClock,
  History,
  Settings,
  UserCog,
} from "lucide-react";
import { TextLogo } from "../text-logo";

export function AdminSidebar() {
  // TODO: Add active link styling
  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <TextLogo />
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
              href="/admin/gebruikers"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <UserCog className="h-4 w-4" />
              Gebruikers
            </Link>
            <Link
              href="/admin/instellingen"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Settings className="h-4 w-4" />
              Instellingen
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