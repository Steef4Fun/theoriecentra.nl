"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Theoriecentra.nl Logo"
            width={180}
            height={40}
            priority
            className="h-auto"
          />
        </Link>
        
        <div className="flex items-center gap-x-6">
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <Link
              href="/#booking-wizard"
              className={cn(
                "transition-colors",
                scrolled ? "text-foreground/60 hover:text-foreground" : "text-white/80 hover:text-white"
              )}
            >
              Cursussen
            </Link>
            <Link
              href="/over-ons"
              className={cn(
                "transition-colors",
                scrolled ? "text-foreground/60 hover:text-foreground" : "text-white/80 hover:text-white"
              )}
            >
              Over Ons
            </Link>
            <Link
              href="/contact"
              className={cn(
                "transition-colors",
                scrolled ? "text-foreground/60 hover:text-foreground" : "text-white/80 hover:text-white"
              )}
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