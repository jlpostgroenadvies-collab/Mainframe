# Website J.L. Post Groenadvies

Overgenomen uit Replit (project "Groen Advies", 2026-10-11) en losgemaakt van Replit.
Techniek: React + Vite + Tailwind. Geen database of server nodig: het is een statische site.

## Bekijken tijdens het werken
1. Node.js staat geïnstalleerd (sinds 2026-10-11). Eerste keer in een nieuwe map: `npm install`.
2. In de terminal: `cd C:\Mainframe\website` en `npm run dev`.
3. Open http://localhost:5173. Wijzigingen verschijnen direct. Stoppen: Ctrl+C.

## Waar staat wat
- Bedrijfsgegevens, paginatitels en -omschrijvingen (voor Google en AI): `src/lib/site.ts`
- Diensten: `src/lib/diensten.ts`
- Projecten: `src/lib/projecten.ts`
- Kennisbank-artikelen: `src/lib/artikelen.ts`
- Pagina-opmaak: `src/pages/`

## Vindbaarheid (zoekmachines en AI-agents)
`npm run build` maakt de map `dist/` met:
- Elke pagina als kant-en-klare HTML (`dist/diensten/index.html` enz.), zodat ook AI-agents die geen JavaScript uitvoeren de inhoud lezen.
- Per pagina een eigen titel, omschrijving, canonical-link en deelgegevens (Open Graph).
- Bedrijfsgegevens als schema.org-data (ProfessionalService): naam, adres, telefoon, diensten.
- `sitemap.xml`, `robots.txt` (alles toegestaan, ook AI-crawlers), `llms.txt` (samenvatting in Markdown voor AI) en `404.html`.
Dit alles wordt automatisch gemaakt uit de bestanden in `src/lib/`; daar dus aanpassen, niet in `dist/`.

## Online zetten
Upload de inhoud van `dist/` naar een statische host (bijv. Netlify, Cloudflare Pages of TransIP-webhosting). Daarna aanmelden bij Google Search Console en de sitemap opgeven.

## Foto's toevoegen
Zet ze in `public/images/` en vul het pad in. Zolang een foto ontbreekt, toont de site een groen vlak of het beeldmerk.
- Openingsfoto en portret: `src/lib/site.ts`, bij `images` (bijv. `hero: "/images/hero.jpg"`).
- Projectfoto's: `src/lib/projecten.ts`, bij het project `image: "/images/<naam>.jpg"`.
Liefst .jpg of .webp, maximaal ca. 1600 px breed, voor snelle laadtijd op telefoons.

## Nog te doen
- Toestemming van opdrachtgevers (en Ruimte voor Advies) om de projecten op de site te noemen. Joris weet op 22-10-2026 welke referenties mogen; dan de lijst in `src/lib/projecten.ts` bijwerken.
- Tekst Over mij controleren (opleiding, achtergrond): die komt uit Replit en is niet geverifieerd.
- Kennisbank: drie conceptartikelen staan in `src/lib/artikelen.ts` (2026-10-11). Joris leest na vóór publicatie; daarna eventueel eigen pagina per artikel (beter vindbaar).
- Foto's aanleveren: openingsfoto (hero), portret, eventueel projectfoto's.

## Afspraken over de inhoud
- ETM (European Tree Manager): de werkzaamheden staan onder Bomen, maar de opleiding/het certificaat wordt niet met naam genoemd (besluit Joris, 2026-10-11).
- Geen verzonnen projecten, citaten of cijfers; alleen echte referenties.
- Doelgroep: teksten zijn geschreven voor gemeenten (besluit Joris, 2026-10-12).
- Copijnlaan (Groenekan) komt niet op de site (besluit Joris, 2026-10-12).
