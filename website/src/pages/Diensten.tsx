import { PageLayout } from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { categories } from "@/lib/diensten";

export default function Diensten() {
  return (
    <PageLayout>
      <div className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-5xl font-bold mb-6"
          >
            Diensten
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Gespecialiseerde groenkennis voor elke fase van uw project. Van strategisch advies tot gedetailleerde realisatieplannen en langdurig beheer.
          </motion.p>
        </div>
      </div>

      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="flex flex-col gap-20">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                id={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                    {category.title}
                  </h2>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.services.map((service, svcIdx) => (
                    <motion.div
                      key={svcIdx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: svcIdx * 0.08, duration: 0.4 }}
                      className="bg-primary/10 border border-primary/20 rounded-xl p-6 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-serif text-lg font-bold text-foreground mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {service.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
