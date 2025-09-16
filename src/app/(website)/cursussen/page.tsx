import { AnimatedSection } from "@/components/animated-section";
import { BookingWizard } from "@/components/booking-wizard";
import Image from "next/image";

export default function CursussenPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gray-900 py-32 text-white">
        <Image
          src="https://images.unsplash.com/photo-1516542579394-c0c037c0925a?q=80&w=2070&auto=format&fit=crop"
          alt="Cursus boeken"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-30"
        />
        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl text-shadow">
              Boek je Cursus
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-white/80 md:text-xl text-shadow-sm">
              Volg de stappen om de perfecte cursusdatum voor jou te vinden en
              reserveer direct je plek.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container">
          <AnimatedSection delay={0.2}>
            <BookingWizard />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}