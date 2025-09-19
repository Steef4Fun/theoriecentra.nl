import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <Image
        src="/logo.png"
        alt="Theoriecentra.nl Logo"
        width={180}
        height={40}
        priority
        className="h-10 w-auto"
      />
    </Link>
  );
}