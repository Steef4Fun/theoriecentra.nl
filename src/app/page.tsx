import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Haal je autotheorie in slechts één dag!
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Met onze unieke dagcursus stomen we je klaar voor het CBR theorie-examen. Hoge slagingskans, duidelijke prijzen en direct een examendatum.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/cursussen">
                    Bekijk Cursusdata & Schrijf je in
                  </Link>
                </Button>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=2070&auto=format&fit=crop"
              alt="Theoriecursus"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Waarom kiezen voor Theoriecentra.nl?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Wij maken het halen van je theorie-examen eenvoudig, snel en betaalbaar. Geen verrassingen, alleen resultaat.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-12 py-12 sm:grid-cols-2 md:grid-cols-3">
            <div className="grid gap-1 text-center">
              <CheckCircle className="h-8 w-8 mx-auto text-primary" />
              <h3 className="text-lg font-bold">Hoogste Slagingskans</h3>
              <p className="text-sm text-muted-foreground">
                Onze bewezen lesmethode zorgt ervoor dat je de stof écht begrijpt en met vertrouwen het examen ingaat.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <CheckCircle className="h-8 w-8 mx-auto text-primary" />
              <h3 className="text-lg font-bold">Duidelijke Prijzen</h3>
              <p className="text-sm text-muted-foreground">
                Eén vaste prijs voor de cursus en het examen. Geen verborgen kosten of 'vanaf' prijzen.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <CheckCircle className="h-8 w-8 mx-auto text-primary" />
              <h3 className="text-lg font-bold">Direct Examenplek</h3>
              <p className="text-sm text-muted-foreground">
                Wij reserveren direct een examenplek voor je bij het CBR, aansluitend op de cursus.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}