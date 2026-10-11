import { PageLayout } from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { images } from "@/lib/site";


export default function OverMij() {
  return (
    <PageLayout>
      {/* Intro Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-sm sm:max-w-md lg:max-w-none lg:w-5/12"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-primary/10">
                {images.portrait ? (
                  <img src={images.portrait} alt="Portret van Joris Post" className="w-full h-full object-cover" />
                ) : (
                  <img src="/favicon.png" alt="" className="w-full h-full object-contain p-16" />
                )}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-7/12"
            >
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Joris Post
              </h1>
              <h2 className="text-xl text-primary font-medium mb-8">
                Landschapsontwerper en groenexpert
              </h2>

              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Mijn fascinatie voor het landschap begon met de handen in de aarde. Opgegroeid tussen de rijen bomen van Boomkwekerij L.H. Post leerde ik al vroeg wat planten nodig hebben om te overleven en te floreren.
                </p>
                <p>
                  Tijdens mijn studie landschapsarchitectuur leerde ik groter kijken: naar systemen, ecologie, klimaatadaptatie en de menselijke beleving van ruimte. Ik ontdekte echter dat veel prachtige ontwerpen sneuvelden in de uitvoering door een gebrek aan praktische plantenkennis.
                </p>
                <p>
                  Met J.L. Post Groenadvies sla ik de brug tussen het tekentafelideaal en de weerbarstige werkelijkheid. Een ontwerp is pas succesvol als de bodem klopt, het water beheerd wordt en het onderhoud haalbaar is.
                </p>
              </div>

              <div className="mt-10 p-6 bg-muted/50 rounded-xl border border-border">
                <h3 className="font-bold text-foreground mb-4">De dubbele expertise</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span><strong>Ontwerper:</strong> ruimtelijk inzicht, esthetiek en ecologische visie op complexe locaties.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span><strong>Kweker:</strong> diepgaande soortenkennis, inzicht in groeivoorwaarden en korte lijnen voor levering.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </PageLayout>
  );
}
