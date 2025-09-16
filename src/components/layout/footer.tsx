import Link from "next/link";
import { Button } from "../ui/button";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container">
        <div className="grid grid-cols-3 border-b border-gray-700 text-center text-xs uppercase tracking-widest">
          <div className="py-3 border-r border-gray-700">Snel</div>
          <div className="py-3 border-r border-gray-700 text-primary font-semibold">Makkelijk</div>
          <div className="py-3">Geslaagd</div>
        </div>
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">Navigatie</h3>
            <ul className="space-y-3">
              <li><Link href="/cursussen" className="text-muted-foreground hover:text-primary transition-colors">Cursussen</Link></li>
              <li><Link href="/over-ons" className="text-muted-foreground hover:text-primary transition-colors">Over Ons</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/#faq" className="text-muted-foreground hover:text-primary transition-colors">Veelgestelde Vragen</Link></li>
            </ul>
            <div className="pt-4 text-xs text-gray-500 space-y-1">
                <p><Link href="/privacybeleid" className="hover:text-primary transition-colors">Privacybeleid</Link></p>
                <p>Copyright © {new Date().getFullYear()}</p>
            </div>
          </div>

          {/* Column 2: CTA */}
          <div className="bg-gray-800 p-8 rounded-lg flex flex-col items-center justify-center text-center">
            <h3 className="font-semibold text-lg text-white mb-4">Klaar om te slagen?</h3>
            <p className="text-muted-foreground mb-6">Vind een cursus die bij jou past en reserveer direct je plek.</p>
            <Button
              asChild
              className="rounded-full border-2 border-primary bg-primary px-8 text-base font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90"
            >
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