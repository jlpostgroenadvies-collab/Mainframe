// Leest de bomenlijst uit Excel en bouwt daaruit het dashboard (dashboard.html).
// Gebruik: node bouw-dashboard.js   (in de map tools/bomentool)
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

// Hoofdbestand staat in OneDrive; de tool wordt daarnaast in de submap tool/ gezet
const ONEDRIVE = path.join(process.env.OneDrive || '', 'J.L. Post Groenadvies', '01 Projecten', 'bomentool');
const XLSX = process.argv[2] || path.join(ONEDRIVE, 'Bomenlijst bomentool NHV.xlsx');
const TEMPLATE = path.join(__dirname, 'dashboard-template.html');
const OUT = path.join(__dirname, '..', '..', 'output', 'boomselectietool-nhv', 'dashboard.html'); // losse pagina voor claude.ai (lokaal)

const getalOfNull = s => { const n = parseFloat(String(s).replace(',', '.')); return isNaN(n) || n <= 0 ? null : n; };
const tekst = v => (v == null ? '' : typeof v === 'object' && v.richText ? v.richText.map(t => t.text).join('') : String(v)).trim();

(async () => {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(XLSX);

  const bomen = [];
  wb.getWorksheet('Bomenlijst').eachRow((row, i) => {
    if (i === 1) return;
    const c = n => tekst(row.getCell(n).value);
    if (!c(1)) return;
    bomen.push({ wet: c(1), nl: c(2), inheems: c(3), grootte: c(4), gazon: c(5), plantvak: c(6), verharding: c(7), noot: c(8), status: c(9),
      kroonM2: getalOfNull(c(10)), m3: getalOfNull(c(11)), bron: c(12), kroon10: getalOfNull(c(13)), kroon20: getalOfNull(c(14)) });
    const b = bomen[bomen.length - 1];
    b.kroon = b.kroonM2 ? Math.round(2 * Math.sqrt(b.kroonM2 / Math.PI) * 10) / 10 : null; // diameter voor de tekening
  });

  // Benodigde doorwortelbare ruimte (m³); lege vakken worden null
  const groeiplaats = [];
  const wg = wb.getWorksheet('Groeiplaats');
  if (wg) wg.eachRow((row, i) => {
    if (i === 1) return;
    const c = n => tekst(row.getCell(n).value);
    const m3 = parseFloat(c(6).replace(',', '.'));
    groeiplaats.push({ grootte: c(1), groeiwijze: c(2), profiel: c(3), niveau: c(4), omloop: +c(5), m3: isNaN(m3) ? null : m3, bron: c(7) });
  });

  const uitgesloten = [];
  wb.getWorksheet('Niet aanbevolen').eachRow((row, i) => {
    if (i === 1) return;
    uitgesloten.push({ wet: tekst(row.getCell(1).value), nl: tekst(row.getCell(2).value), reden: tekst(row.getCell(3).value) });
  });

  const datum = new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  const data = JSON.stringify({ bomen, uitgesloten, groeiplaats, datum }).replace(/</g, '\\u003c');
  const beeldmerk = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'beeldmerk-klein.png')).toString('base64');
  const dashboard = fs.readFileSync(TEMPLATE, 'utf8').replace('/*DATA*/null', () => data).split('src="beeldmerk.png"').join(`src="${beeldmerk}"`);

  // 1. Losse pagina voor claude.ai (zonder menu)
  fs.writeFileSync(OUT, dashboard.replace('<!--NAV-->', ''));

  // 2. Lokale website in de map site/: boomselectie (index.html) + ontwerptool (ontwerp.html)
  const SITE = path.join(ONEDRIVE, 'tool');
  fs.mkdirSync(SITE, { recursive: true });
  const nav = `<nav class="sitenav" aria-label="Pagina's"><a href="index.html" aria-current="page">Boomselectie</a><a href="ontwerp.html">Ontwerp</a></nav>
  <style>.sitenav{display:flex;gap:4px;margin-bottom:18px}.sitenav a{text-decoration:none;color:var(--muted);padding:6px 12px;border-radius:999px;font-weight:600}.sitenav a[aria-current="page"]{background:var(--accent-soft);color:var(--accent)}.sitenav a:hover{color:var(--accent)}</style>`;
  fs.writeFileSync(path.join(SITE, 'index.html'),
    '<!doctype html>\n<html lang="nl">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n<body style="margin:0">\n' +
    dashboard.replace('<!--NAV-->', nav) + '\n</body>\n</html>\n');
  // Logo in de pagina verwerken, zodat de bestanden los te openen zijn (bijv. na downloaden op een andere computer)
  const logo = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, '..', '..', 'huisstijl', 'logo.png')).toString('base64');
  fs.rmSync(path.join(SITE, 'logo.png'), { force: true });
  fs.writeFileSync(path.join(SITE, 'ontwerp.html'),
    fs.readFileSync(path.join(__dirname, 'ontwerp-template.html'), 'utf8').replace('/*DATA*/null', () => data).replace('src="logo.png"', () => `src="${logo}"`).split('src="beeldmerk.png"').join(`src="${beeldmerk}"`));

  console.log(`Gebouwd: ${bomen.length} soorten, ${uitgesloten.length} niet aanbevolen, ${groeiplaats.length} groeiplaatsregels → dashboard.html en site/`);
})();
