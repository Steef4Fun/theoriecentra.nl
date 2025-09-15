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
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/logo.png" alt="Theoriecentra.nl Logo" width={180} height={40} className={cn(!scrolled && "brightness-0 invert")}/>
          </Link>
        </div>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link
            href="/#booking-wizard"
            className={cn("transition-colors hover:text-primary", scrolled ? "text-foreground/60 hover:text-foreground/80" : "text-white/80 hover:text-white")}
          >
            Cursussen
          </Link>
          <Link
            href="/contact"
            className={cn("transition-colors hover:text-primary", scrolled ? "text-foreground/60 hover:text-foreground/80" : "text-white/80 hover:text-white")}
          >
            Contact
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild>
            <Link href="/#booking-wizard">Direct Inschrijven</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}