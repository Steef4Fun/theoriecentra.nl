import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { TextLogo } from "../text-logo";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: About */}
          <div className="space-y-4">
            <TextLogo className="text-white" />
            <p className="text-sm text-gray-400">
              De snelste en makkelijkste manier om je theorie-examen te halen.
              In één dag.
            </p>
          </div>

          {/* Col 2: Navigatie */}
          <div>
            <h3 className="font-semibold text-white tracking-wider uppercase">
              Navigatie
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/#boeken"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cursussen
                </Link>
              </li>
              <li>
                <Link
                  href="/over-ons"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Over Ons
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Veelgestelde Vragen
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h3 className="font-semibold text-white tracking-wider uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-gray-400">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                <span>Jan Romeinstraat 4, 5624JJ Eindhoven</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3" />
                <a
                  href="mailto:info@theoriecentra.nl"
                  className="hover:text-white transition-colors"
                >
                  info@theoriecentra.nl
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Wettelijk */}
          <div>
            <h3 className="font-semibold text-white tracking-wider uppercase">
              Wettelijk
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/privacybeleid"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacybeleid
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Theoriecentra.nl. Alle rechten
            voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}