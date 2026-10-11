// Maakt na `vite build` van elke pagina een kant-en-klare HTML-versie, zodat zoekmachines en
// AI-agents de inhoud zien zonder JavaScript uit te voeren. Schrijft ook sitemap.xml, robots.txt,
// llms.txt en 404.html in dist/.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssr = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);
const { render, SITE_URL, business, pages, notFoundMeta, categories, projects } = ssr;

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const today = new Date().toISOString().slice(0, 10);

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const url = (p) => SITE_URL + p;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": url("/#organisatie"),
  name: business.name,
  description: business.summary,
  url: url("/"),
  logo: url("/images/logo.png"),
  image: url("/images/logo.png"),
  telephone: business.phoneIntl,
  email: business.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.street,
    postalCode: business.postalCode,
    addressLocality: business.city,
    addressCountry: "NL",
  },
  areaServed: { "@type": "Country", name: business.areaServed },
  founder: { "@type": "Person", name: business.owner },
  ...(business.linkedin ? { sameAs: [business.linkedin] } : {}),
  knowsAbout: categories.flatMap((c) => c.services.map((s) => s.title)),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Diensten",
    itemListElement: categories.map((c) => ({
      "@type": "OfferCatalog",
      name: c.title,
      itemListElement: c.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.description },
      })),
    })),
  },
};

function headFor(meta, { noindex = false } = {}) {
  const canonical = url(meta.path);
  return [
    `<link rel="canonical" href="${canonical}" />`,
    noindex ? `<meta name="robots" content="noindex" />` : `<meta name="robots" content="index, follow" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="nl_NL" />`,
    `<meta property="og:site_name" content="${esc(business.name)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${url("/images/logo.png")}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}

function page(meta, html, opts) {
  return template
    .replace(/<title>.*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${esc(meta.description)}" />`)
    .replace("<!--head-meta-->", headFor(meta, opts))
    .replace("<!--app-html-->", html);
}

for (const meta of pages) {
  const file = meta.path === "/" ? path.join(dist, "index.html") : path.join(dist, meta.path, "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page(meta, render(meta.path)));
  console.log("pagina:", meta.path);
}

fs.writeFileSync(path.join(dist, "404.html"), page(notFoundMeta, render("/404"), { noindex: true }));

fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${url(p.path)}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`,
);

fs.writeFileSync(
  path.join(dist, "robots.txt"),
  `# Zoekmachines en AI-agents zijn welkom.
User-agent: *
Allow: /

Sitemap: ${url("/sitemap.xml")}
`,
);

// llms.txt: samenvatting in Markdown voor AI-agents (zie llmstxt.org).
const llms = `# ${business.name}

> ${business.summary}

- Eigenaar: ${business.owner}
- Adres: ${business.street}, ${business.postalCode} ${business.city}
- Telefoon: ${business.phoneDisplay}
- E-mail: ${business.email}
- KvK: ${business.kvk}
- Werkgebied: ${business.areaServed}${business.linkedin ? `
- LinkedIn: ${business.linkedin}` : ""}

## Pagina's

${pages.map((p) => `- [${p.title}](${url(p.path)}): ${p.description}`).join("\n")}

## Diensten

${categories
  .map((c) => `### ${c.title}\n\n${c.services.map((s) => `- **${s.title}**: ${s.description}`).join("\n")}`)
  .join("\n\n")}

## Referentieprojecten

${projects.map((p) => `- **${p.title}** (${p.client}, ${p.category}): ${p.description}`).join("\n")}
`;
fs.writeFileSync(path.join(dist, "llms.txt"), llms);

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
console.log("klaar: sitemap.xml, robots.txt, llms.txt, 404.html");
