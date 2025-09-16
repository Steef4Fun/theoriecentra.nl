import { AnimatedSection } from "@/components/animated-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, BookOpenCheck } from "lucide-react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Alex de Vries",
    role: "Hoofdinstructeur",
    avatar: "https://api.dicebear.com/8.x/adventurer/svg?seed=Alex",
  },
  {
    name: "Samira El Amrani",
    role: "Cursus Coördinator",
    avatar: "https://api.dicebear.com/8.x/adventurer/svg?seed=Samira",
  },
  {
    name: "Joris Willems",
    role: "Theorie-expert",
    avatar: "https://api.dicebear.com/8.x/adventurer/svg?seed=Joris",
  },
];

export default function AboutUsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gray-900 py-32 text-white">
        <Image
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
          alt="Team in overleg"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-30"
        />
        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl text-shadow">
              Onze Missie: Jouw Snelste Route naar Geslaagd
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-white/80 md:text-xl text-shadow-sm">
              Leer ons kennen. Ontdek waarom duizenden leerlingen voor onze unieke dagcursus kiezen om in één keer hun theorie-examen te halen.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container py-20 md:py-32 space-y-24">
        {/* Our Story Section */}
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Gedreven door Passie voor Slagen</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Theoriecentra.nl is ontstaan uit een simpele frustratie: het leren van theorie duurde te lang, was saai en vaak niet effectief. Wij vonden dat het anders moest. Sneller, leuker en met een laserfocus op wat écht belangrijk is om te slagen voor het CBR-examen.
                <br /><br />
                Onze missie is om elke leerling het zelfvertrouwen en de kennis te geven om in één keer te slagen. Geen wekenlange studie, maar één intensieve, resultaatgerichte dag die het verschil maakt.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-soft">
                <Image 
                    src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop"
                    alt="Samenwerkend team"
                    width={800}
                    height={600}
                    className="object-cover"
                />
            </div>
          </div>
        </AnimatedSection>

        {/* Our Method Section */}
        <AnimatedSection>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">De Theoriecentra Methode</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Onze aanpak is gebaseerd op drie pijlers die garant staan voor succes.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="text-center">
                    <CardHeader>
                        <Target className="h-10 w-10 mx-auto text-primary mb-4" />
                        <CardTitle>Focus op het Examen</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">We filteren de ruis en concentreren ons 100% op de stof die het CBR toetst, inclusief de meest recente wijzigingen en strikvragen.</p>
                    </CardContent>
                </Card>
                 <Card className="text-center">
                    <CardHeader>
                        <BookOpenCheck className="h-10 w-10 mx-auto text-primary mb-4" />
                        <CardTitle>Bewezen Lesmethode</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Met interactieve lessen, visuele hulpmiddelen en slimme ezelsbruggetjes zorgen we dat de stof blijft hangen, ook onder examendruk.</p>
                    </CardContent>
                </Card>
                 <Card className="text-center">
                    <CardHeader>
                        <Users className="h-10 w-10 mx-auto text-primary mb-4" />
                        <CardTitle>Ervaren Instructeurs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Ons team bestaat uit experts die precies weten hoe ze complexe onderwerpen simpel en begrijpelijk kunnen maken.</p>
                    </CardContent>
                </Card>
            </div>
        </AnimatedSection>

        {/* Team Section */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Ontmoet (een deel van) ons Team</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              De experts die elke dag klaarstaan om jou te helpen slagen.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-primary">{member.role}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </>
  );
}