import { useEffect } from "react";
import { useLocation } from "wouter";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { metaFor, SITE_URL } from "@/lib/site";

// Houdt titel, omschrijving en canonical (alleen in de gebouwde site aanwezig) bij als de bezoeker binnen de site doorklikt.
function useHeadMeta() {
  const [location] = useLocation();
  useEffect(() => {
    const meta = metaFor(location);
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", SITE_URL + (location === "/" ? "/" : location));
  }, [location]);
}

export function PageLayout({ children }: { children: React.ReactNode }) {
  useHeadMeta();
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <a
        href="#inhoud"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-background focus:px-4 focus:py-2 focus:rounded-md focus:shadow"
      >
        Direct naar inhoud
      </a>
      <Navbar />
      <main id="inhoud" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
