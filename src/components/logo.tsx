import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, imageClassName }: { className?: string, imageClassName?: string }) {
  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <Image
        src="/logo-straight.png"
        alt="Theoriecentra.nl Logo"
        width={250}
        height={50}
        priority
        className={cn("h-10 w-auto", imageClassName)}
      />
    </Link>
  );
}