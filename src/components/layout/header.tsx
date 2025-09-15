import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Theoriecentra.nl
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/cursussen"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Cursussen
            </Link>
            <Link
              href="/contact"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild>
            <Link href="/cursussen">Direct Inschrijven</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}