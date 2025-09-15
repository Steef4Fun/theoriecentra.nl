import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-dark-background text-dark-foreground">
      <div className="container">
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Logo & Nav */}
          <div className="space-y-4">
            <Image src="/logo-dark.png" alt="Theoriecentra.nl Logo" width={180} height={40} />
            <p className="text-sm text-muted-foreground">
              De snelste weg naar je theoriecertificaat.
            </p>
            <div className="text-xs text-gray-500 space-y-1 pt-4">
                <p><Link href="/privacybeleid" className="hover:text-primary transition-colors">Privacybeleid</Link></p>
                <p>Copyright © {new Date().getFullYear()} Theoriecentra.nl</p>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">Navigatie</h3>
            <ul className="space-y-3">
              <li><Link href="/#booking-wizard" className="text-muted-foreground hover:text-primary transition-colors">Cursus Boeken</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/#faq" className="text-muted-foreground hover:text-primary transition-colors">Veelgestelde Vragen</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">Contact</h3>
            <div className="text-muted-foreground space-y-3">
                <p>
                    <a href="mailto:info@theoriecentra.nl" className="hover:text-primary transition-colors">info@theoriecentra.nl</a>
                </p>
                <p>
                    <a href="tel:+31612345678" className="hover:text-primary transition-colors">+31 6 12345678</a>
                </p>
                <p>KVK: 12345678</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}