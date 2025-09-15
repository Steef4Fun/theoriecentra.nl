import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col space-y-4 sm:col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Theoriecentra.nl Logo" width={180} height={40} className="brightness-0 invert" />
          </Link>
          <p className="text-sm text-gray-400">
            Slaag voor je theorie in één dag met onze bewezen dagcursussen.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Navigatie</h3>
          <ul className="space-y-2">
            <li><Link href="/cursussen" className="text-sm hover:text-primary transition-colors">Cursussen</Link></li>
            <li><Link href="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link></li>
            <li><Link href="/#faq" className="text-sm hover:text-primary transition-colors">Veelgestelde Vragen</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Bedrijf</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/algemene-voorwaarden" className="hover:text-primary transition-colors">Algemene Voorwaarden</Link></li>
            <li><Link href="/privacybeleid" className="hover:text-primary transition-colors">Privacybeleid</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>info@theoriecentra.nl</li>
            <li>+31 6 12345678</li>
            <li className="pt-1">KVK: 12345678</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container py-4 flex items-center justify-center">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Theoriecentra.nl. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}