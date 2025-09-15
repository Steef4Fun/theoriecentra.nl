"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-4 z-50 w-full">
      <div className="container">
        <div
          className={cn(
            "mx-auto flex h-16 max-w-fit items-center justify-between gap-x-4 rounded-full",
            "border border-white/10 bg-black/30 px-4 backdrop-blur-lg",
            "md:gap-x-8 md:px-6"
          )}
        >
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-dark.png"
              alt="Theoriecentra.nl Logo"
              width={150}
              height={33}
              priority
              className="h-auto"
            />
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <Link
              href="/#booking-wizard"
              className="text-white/80 transition-colors hover:text-white"
            >
              Cursussen
            </Link>
            <Link
              href="/contact"
              className="text-white/80 transition-colors hover:text-white"
            >
              Contact
            </Link>
          </nav>
          <Button asChild size="sm" className="rounded-full">
            <Link href="/#booking-wizard">Direct Inschrijven</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}