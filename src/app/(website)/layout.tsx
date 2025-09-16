import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="-mt-20">{children}</main>
      <Footer />
    </>
  );
}