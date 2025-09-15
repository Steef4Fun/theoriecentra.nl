import { BookingWizard } from "@/components/booking-wizard";

export default function CursussenPage() {
  return (
    <div className="container py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Boek je Cursus
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Volg de stappen om de perfecte cursusdatum voor jou te vinden en
          reserveer direct je plek.
        </p>
      </div>
      <BookingWizard />
    </div>
  );
}