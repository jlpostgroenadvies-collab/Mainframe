import { PageLayout } from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { Lightbulb, ChevronDown } from "lucide-react";
import { artikelen, type ArtikelAfbeelding } from "@/lib/artikelen";

function Afbeelding({ src, alt, caption }: ArtikelAfbeelding) {
  return (
    <figure className="my-6">
      <img src={src} alt={alt} loading="lazy" className="w-full rounded-xl border border-border shadow-sm" />
      <figcaption className="mt-2 text-sm text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

const tips = [
  "Test altijd de waterdoorlatendheid van de bodem vóór u een beplantingsplan maakt. Een simpele infiltratieproef voorkomt jarenlange problemen met wateroverlast.",
  "Kies voor droogteresistente soorten in verhoogde plantenbakken. Deze drogen in de zomer extreem snel uit; bij een verkeerde plantkeuze kost dat veel gietwerk.",
  "Laat in de winter afgestorven plantendelen staan. Ze bieden schuilplaatsen voor insecten, beschermen de wortels tegen vorst en zorgen voor een prachtig winterbeeld."
];

export default function Kennisbank() {
  return (
    <PageLayout>
      <div className="bg-background py-16 md:py-24 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground"
          >
            Kennisbank
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Inzichten, artikelen en praktische tips over groenontwerp, beheer en ecologie.
          </motion.p>
        </div>
      </div>

      <div className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Articles List */}
            <div className="lg:col-span-2 space-y-10">
              <h2 className="font-serif text-3xl font-bold mb-8">Artikelen</h2>

              {artikelen.map((artikel) => (
                <article key={artikel.slug} id={artikel.slug} className="bg-card rounded-2xl border border-border p-8">
                  <h3 className="font-serif text-2xl font-bold mb-2 text-foreground">{artikel.title}</h3>
                  {artikel.subtitle && <p className="text-secondary font-medium mb-4">{artikel.subtitle}</p>}
                  {artikel.image && <Afbeelding {...artikel.image} />}
                  <p className="text-muted-foreground leading-relaxed mb-4">{artikel.summary}</p>
                  <details className="group">
                    <summary className="cursor-pointer list-none inline-flex items-center gap-2 font-medium text-primary">
                      <span className="group-open:hidden">Lees verder</span>
                      <span className="hidden group-open:inline">Inklappen</span>
                      <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="mt-6 space-y-6">
                      {artikel.sections.map((sectie, idx) => (
                        <section key={idx} className="space-y-4">
                          {sectie.heading && <h4 className="font-serif text-xl font-bold text-foreground">{sectie.heading}</h4>}
                          {sectie.paragraphs.map((tekst, i) => (
                            <p key={i} className="text-foreground/90 leading-relaxed">{tekst}</p>
                          ))}
                          {sectie.list && (
                            <ul className="space-y-2 pl-5 list-disc marker:text-secondary">
                              {sectie.list.map((item, i) => (
                                <li key={i} className="text-foreground/90 leading-relaxed">
                                  <strong className="text-foreground">{item.label}</strong> {item.text}
                                </li>
                              ))}
                            </ul>
                          )}
                          {sectie.after?.map((tekst, i) => (
                            <p key={i} className="text-foreground/90 leading-relaxed">{tekst}</p>
                          ))}
                          {sectie.image && <Afbeelding {...sectie.image} />}
                        </section>
                      ))}
                    </div>
                  </details>
                </article>
              ))}
            </div>

            {/* Sidebar / Tips */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-primary text-primary-foreground p-8 rounded-2xl shadow-xl">
                <h2 className="font-serif text-2xl font-bold mb-6 flex items-center gap-3">
                  <Lightbulb className="w-6 h-6 text-accent" />
                  Praktische tips
                </h2>

                <ul className="space-y-6">
                  {tips.map((tip, idx) => (
                    <li key={idx} className="pb-6 border-b border-primary-foreground/20 last:border-0 last:pb-0">
                      <p className="text-primary-foreground/90 text-sm leading-relaxed">
                        {tip}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PageLayout>
  );
}
