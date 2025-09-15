import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/logo.png" alt="Theoriecentra.nl Logo" width={180} height={40} />
          </Link>
        </div>
        <nav className="hidden items-center gap-6 text-sm md:flex">
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
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild>
            <Link href="/cursussen">Direct Inschrijven</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}