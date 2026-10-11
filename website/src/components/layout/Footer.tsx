import { Link } from "wouter";
import { Linkedin } from "lucide-react";
import { business } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 mt-12 md:mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="inline-block bg-white rounded-lg p-2 mb-4">
              <img src="/images/logo.png" alt="J.L. Post Groenadvies" className="h-16 w-auto" />
            </div>
            <p className="text-background/80 max-w-xs text-sm leading-relaxed mb-4">
              Klimaatadaptieve en natuurinclusieve groenprojecten met oog voor mens en natuur.
            </p>
            {business.linkedin && (
              <div className="flex gap-4">
                <a href={business.linkedin} target="_blank" rel="noreferrer" className="text-background/80 hover:text-white transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            )}
          </div>

          <div>
            <h2 className="font-sans font-bold mb-4 tracking-wide uppercase text-xs text-background/60">Navigatie</h2>
            <ul className="space-y-1">
              <li><Link href="/" className="inline-block py-1 text-background/80 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link href="/diensten" className="inline-block py-1 text-background/80 hover:text-white transition-colors text-sm">Diensten</Link></li>
              <li><Link href="/projecten" className="inline-block py-1 text-background/80 hover:text-white transition-colors text-sm">Projecten</Link></li>
              <li><Link href="/over-mij" className="inline-block py-1 text-background/80 hover:text-white transition-colors text-sm">Over mij</Link></li>
              <li><Link href="/kennisbank" className="inline-block py-1 text-background/80 hover:text-white transition-colors text-sm">Kennisbank</Link></li>
              <li><Link href="/contact" className="inline-block py-1 text-background/80 hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-sans font-bold mb-4 tracking-wide uppercase text-xs text-background/60">Contact</h2>
            <ul className="space-y-2 text-sm text-background/80">
              <li>Herenweg 3a, 3602 AM Maarssen</li>
              <li><a href="tel:+31629826760" className="inline-block py-1 hover:text-white">06 2982 6760</a></li>
              <li><a href="mailto:info@jlpostgroenadvies.nl" className="inline-block py-1 hover:text-white break-all">info@jlpostgroenadvies.nl</a></li>
              <li>KvK 99775255</li>
              <li className="pt-2 text-xs italic text-background/60">Werkzaam in heel Nederland</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/20 text-center text-sm text-background/60">
          <p>&copy; {new Date().getFullYear()} J.L. Post Groenadvies. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}
