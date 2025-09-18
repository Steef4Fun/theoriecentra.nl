import Link from "next/link";
import { cn } from "@/lib/utils";

export function TextLogo({ className, isScrolled }: { className?: string, isScrolled?: boolean }) {
  return (
    <Link href="/" className="flex items-center">
      <span className={cn(
        "text-2xl font-extrabold tracking-tight",
        isScrolled ? "text-foreground" : "text-white",
        className
      )}>
        Theorie
        <span className="text-success">centra</span>
      </span>
    </Link>
  );
}