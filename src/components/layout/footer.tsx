import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <Image src="/logo.png" alt="Theoriecentra.nl Logo" width={40} height={40} />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Theoriecentra.nl
            </p>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/cursussen" className="text-muted-foreground hover:text-primary transition-colors">
              Cursussen
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/privacybeleid" className="text-muted-foreground hover:text-primary transition-colors">
              Privacybeleid
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}