"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      <Header />
      <main className={cn(isHomePage ? "-mt-20" : "pt-16 md:pt-20")}>{children}</main>
      <Footer />
      <CookieBanner />
    </>
  );
}