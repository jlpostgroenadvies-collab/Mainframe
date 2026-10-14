import { PageLayout } from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Leaf, Map, MapPin, ClipboardList, TreeDeciduous, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects as allProjects } from "@/lib/projecten";
import { images } from "@/lib/site";

const services = [
  { icon: TreeDeciduous, title: "Bomenadvies", desc: "Bomenbeleid en beheerplannen, werkplannen bomen, toezicht en de belangen van bomen in ruimtelijke projecten." },
  { icon: Leaf, title: "Groenadvies", desc: "Onafhankelijk advies over plannen, klimaatadaptatie, kosten en inrichting." },
  { icon: Map, title: "Ontwerp", desc: "Van technisch ontwerp tot groenontwerp voor de openbare ruimte en beplantingsplannen." },
  { icon: MapPin, title: "Beplanting", desc: "Soortkeuze, plantselectietabellen en standplaatsadvies, met oog voor ecologische waarde." },
  { icon: Calculator, title: "Hoeveelheden en ramingen", desc: "Hoeveelheden, kostenramingen en werkomschrijvingen volgens de RAW-systematiek." },
  { icon: ClipboardList, title: "Beheerplannen", desc: "Eenmalige onderhoudsplanning, MJOP en beheeradvies voor opdrachtgevers." }
];

const projects = allProjects.slice(0, 3);

export default function Home() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-[70svh] md:min-h-[600px] flex items-center justify-center overflow-hidden py-12 md:py-20">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary to-secondary">
          {images.hero && (
            <img
              src={images.hero}
              alt=""
              fetchPriority="high"
              className="w-full h-full object-cover object-center"
            />
          )}
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto bg-background/90 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-secondary mb-3">
              J.L. Post Groenadvies · Maarssen
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight text-balance">
              Ruimte voor natuur in de bebouwde omgeving.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 mb-6 md:mb-8 font-light">
              Onafhankelijk groenadvies voor gemeenten: bomen, beplanting, ecologisch ontwerp en kostenramingen.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button asChild size="lg" className="text-base h-12 px-8">
                <Link href="/projecten">Bekijk projecten</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base h-12 px-8 bg-background">
                <Link href="/contact">Neem contact op</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">Geworteld in de praktijk</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              J.L. Post Groenadvies combineert de visionaire blik van een landschapsontwerper met de nuchtere vakkennis van een boomkweker. Ontwerpen die niet alleen op papier overtuigen, maar jarenlang floreren in de echte wereld.
            </p>
            <Button asChild variant="link" className="text-primary hover:text-primary/80">
              <Link href="/over-mij" className="flex items-center gap-2">
                Lees meer over Joris <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-14 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Diensten</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Van brede visie tot het gedetailleerde plantgat: complete ondersteuning voor elk groenproject.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-card border border-card-border p-8 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/diensten">Alle diensten bekijken</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Uitgelichte projecten</h2>
              <p className="text-muted-foreground">Een selectie van recente opdrachten voor gemeenten.</p>
            </div>
            <Button asChild variant="ghost" className="shrink-0 group">
              <Link href="/projecten" className="flex items-center gap-2">
                Alle projecten <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.5 }}
                className="group"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-primary/10 flex items-center justify-center">
                  <TreeDeciduous className="w-16 h-16 text-primary/40" />
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <h3 className="font-serif text-xl font-bold mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-sm font-medium text-primary mb-2">{project.client}</p>
                <p className="text-muted-foreground text-sm">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </PageLayout>
  );
}
