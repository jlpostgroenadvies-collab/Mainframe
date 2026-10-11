import { PageLayout } from "@/components/layout/PageLayout";
import { MapPin, Phone, Mail, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business } from "@/lib/site";

export default function Contact() {
  return (
    <PageLayout>
      <div className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">Contact</h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8">
              Heeft u een vraag of wilt u een groenproject bespreken? Neem contact op voor een vrijblijvende kennismaking.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="text-base h-12 px-8">
                <a href="tel:+31629826760"><Phone /> Bel 06 2982 6760</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base h-12 px-8">
                <a href="mailto:info@jlpostgroenadvies.nl"><Mail /> Stuur een e-mail</a>
              </Button>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl font-bold mb-8">Contactgegevens</h2>
            <div className="space-y-6 text-muted-foreground">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-foreground">Telefoon</h3>
                  <a href="tel:+31629826760" className="hover:text-primary">06 2982 6760</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-foreground">E-mail</h3>
                  <a href="mailto:info@jlpostgroenadvies.nl" className="hover:text-primary break-all">info@jlpostgroenadvies.nl</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-foreground">Adres en werkgebied</h3>
                  <p>Herenweg 3a, 3602 AM Maarssen</p>
                  <p>Werkzaam in heel Nederland</p>
                  <p className="text-sm mt-1">KvK 99775255</p>
                </div>
              </div>

              {business.linkedin && (
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-foreground">LinkedIn</h3>
                    <a
                      href={business.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline"
                    >
                      Bekijk mijn LinkedIn-profiel
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
