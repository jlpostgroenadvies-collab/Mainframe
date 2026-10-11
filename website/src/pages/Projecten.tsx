import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, TreeDeciduous, Sprout, Calculator } from "lucide-react";
import { projects, type ProjectCategory } from "@/lib/projecten";

const categories: ("Alle" | ProjectCategory)[] = ["Alle", "Bomen", "Beplanting", "Hoeveelheden en ramingen"];

const categoryIcon = {
  "Bomen": TreeDeciduous,
  "Beplanting": Sprout,
  "Hoeveelheden en ramingen": Calculator,
};

export default function Projecten() {
  const [filter, setFilter] = useState<"Alle" | ProjectCategory>("Alle");

  const filteredProjects = projects.filter(p => filter === "Alle" || p.category === filter);

  return (
    <PageLayout>
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">Projecten</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Een selectie van opdrachten voor gemeenten: van werkplannen bomen tot beplantingslijsten en hoeveelheden.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                className={`rounded-full ${filter === cat ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-background"}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-background min-h-[50vh]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => {
                const Icon = categoryIcon[project.category];
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-card border border-card-border rounded-xl overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-primary/10 flex items-center justify-center">
                      <Icon className="w-16 h-16 text-primary/40" />
                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-background/90 text-foreground hover:bg-background backdrop-blur border-none shadow-sm">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-serif text-xl font-bold mb-2">{project.title}</h3>
                      <div className="flex items-center text-muted-foreground text-sm mb-4">
                        <MapPin className="w-4 h-4 mr-1" />
                        {project.client}
                      </div>
                      <p className="text-sm text-muted-foreground flex-1">{project.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}
