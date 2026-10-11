// Centrale bedrijfs- en paginagegevens. Gebruikt door de pagina's, de zoekmachinegegevens,
// sitemap.xml en llms.txt (zie scripts/prerender.mjs).

// Domein bevestigd door Joris (2026-10-11), geregistreerd bij TransIP.
export const SITE_URL = "https://www.jlpostgroenadvies.nl";

export const business: {
  name: string; owner: string; tagline: string; summary: string;
  street: string; postalCode: string; city: string;
  phoneDisplay: string; phoneIntl: string; email: string; kvk: string; areaServed: string;
  linkedin?: string;
} = {
  name: "J.L. Post Groenadvies",
  owner: "Joris Post",
  tagline: "Onafhankelijk groenadvies en landschapsontwerp voor de openbare ruimte",
  summary:
    "J.L. Post Groenadvies is een onafhankelijk groenadviesbureau uit Maarssen. Joris Post adviseert vooral gemeenten over bomen, beplanting, ecologisch ontwerp en vergroening van de openbare ruimte, en maakt hoeveelheden en kostenramingen. Met een achtergrond in de familiekwekerij Boomkwekerij L.H. Post.",
  street: "Herenweg 3a",
  postalCode: "3602 AM",
  city: "Maarssen",
  phoneDisplay: "06 2982 6760",
  phoneIntl: "+31629826760",
  email: "info@jlpostgroenadvies.nl",
  kvk: "99775255",
  areaServed: "Nederland",
  // LinkedIn-profiel: volledige link invullen, bijv. "https://www.linkedin.com/in/...".
  // Leeg = LinkedIn wordt niet getoond.
  linkedin: "https://www.linkedin.com/in/joris-post-4a885a1b5",
};

// Foto's: zet het bestand in public/images/ en vul het pad in, bijv. "/images/hero.jpg".
export const images: { hero?: string; portrait?: string } = {};

export type PageMeta = { path: string; title: string; description: string };

export const pages: PageMeta[] = [
  {
    path: "/",
    title: "J.L. Post Groenadvies | Groenadvies, bomen en beplanting voor gemeenten",
    description:
      "Onafhankelijk groenadvies uit Maarssen: werkplannen bomen, beplantingsplannen, plantselectie, ecologisch ontwerp en kostenramingen voor de openbare ruimte.",
  },
  {
    path: "/diensten",
    title: "Diensten | J.L. Post Groenadvies",
    description:
      "Bomenbeleid, bomenbeheerplannen, werkplannen bomen en toezicht; groenadvies, ontwerp, beplanting en plantselectie, kostenramingen (SSK/RAW) en beheerplannen.",
  },
  {
    path: "/projecten",
    title: "Projecten | J.L. Post Groenadvies",
    description:
      "Referentieprojecten voor gemeenten: werkplan bomen Koningsweg Utrecht, plantselectietabel heesters Gouda, beplantingslijsten en hoeveelheden.",
  },
  {
    path: "/over-mij",
    title: "Over Joris Post | J.L. Post Groenadvies",
    description:
      "Joris Post combineert landschapsontwerp met praktische plantenkennis uit de familiekwekerij Boomkwekerij L.H. Post in Maarssen.",
  },
  {
    path: "/kennisbank",
    title: "Kennisbank | J.L. Post Groenadvies",
    description: "Praktische tips en artikelen over bomen, beplanting en groen in de openbare ruimte.",
  },
  {
    path: "/contact",
    title: "Contact | J.L. Post Groenadvies",
    description: `Neem contact op met J.L. Post Groenadvies in Maarssen: ${business.phoneDisplay}, ${business.email}.`,
  },
];

export const notFoundMeta: PageMeta = {
  path: "/404",
  title: "Pagina niet gevonden | J.L. Post Groenadvies",
  description: "Deze pagina bestaat niet (meer).",
};

export function metaFor(path: string): PageMeta {
  return pages.find((p) => p.path === path) ?? notFoundMeta;
}
