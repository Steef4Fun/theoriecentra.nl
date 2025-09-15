import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-dark-background text-dark-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Column 1: Navigation & Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">Navigatie</h3>
            <ul className="space-y-3">
              <li><Link href="/#booking-wizard" className="text-muted-foreground hover:text-primary transition-colors">Cursus Boeken</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/#faq" className="text-muted-foreground hover:text-primary transition-colors">Veelgestelde Vragen</Link></li>
            </ul>
            <div className="pt-4 text-xs text-gray-500 space-y-1">
                <p><Link href="/privacybeleid" className="hover:text-primary transition-colors">Privacybeleid</Link></p>
                <p>Copyright © {new Date().getFullYear()} Theoriecentra.nl</p>
            </div>
          </div>

          {/* Column 2: Prominent CTA */}
          <div className="bg-white/5 p-8 rounded-lg flex flex-col items-center justify-center text-center border border-white/10">
            <h3 className="font-semibold text-xl text-white mb-4">Klaar om te slagen?</h3>
            <p className="text-muted-foreground mb-6">Vind een cursus die bij jou past en reserveer direct je plek.</p>
            <Button asChild>
                <Link href="/#booking-wizard">Vind je Cursus</Link>
            </Button>
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