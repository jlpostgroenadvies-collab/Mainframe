// Maakt de klantversie (los html-bestand) van een project, zonder de browser. De lokale server moet draaien (Tuinontwerp starten).
// Gebruik: node maak-klantversie.cjs <project.tuin.json> <uitvoer.html>
// Doet hetzelfde als de knop "Klantversie (html)": texturen verkleind ingebed, logo, gebruikte soorten uit de plantenlijst; ondergrond en productbladen gaan niet mee.
const fs = require('fs'), path = require('path');
const { loadImage, createCanvas } = require('@napi-rs/canvas');
const HIER = __dirname;
const [projectPad, uitPad] = process.argv.slice(2);
if (!projectPad || !uitPad) { console.log('Gebruik: node maak-klantversie.cjs <project.tuin.json> <uitvoer.html>'); process.exit(1); }
(async () => {
  const bron = await (await fetch('http://localhost:8766/tuinontwerp.html')).text();
  const texturen = {};
  for (const n of ['gras', 'grind', 'zand', 'aarde', 'houtsnippers', 'beton', 'klinkers', 'baksteen', 'planken', 'schors']) for (const s of ['kleur', 'normaal']) {
    const img = await loadImage(fs.readFileSync(path.join(HIER, 'texturen', `${n}_${s}.jpg`))), c = createCanvas(512, 512);
    c.getContext('2d').drawImage(img, 0, 0, 512, 512); texturen[`${n}_${s}`] = 'data:image/jpeg;base64,' + (await c.encode('jpeg', 82)).toString('base64');
  }
  const p = JSON.parse(fs.readFileSync(projectPad, 'utf8')); delete p.ondergrond;
  const in3D = new Set(p.objecten.filter(o => o.type === 'model' || o.type === 'productfoto').map(o => o.bijlage));
  p.bijlagen = (p.bijlagen || []).filter(b => in3D.has(b.id));
  const PL = JSON.parse(fs.readFileSync(path.join(HIER, 'plantenlijst.json'), 'utf8'));
  const ids = new Set([...p.objecten.map(o => o.soort), ...p.vlakken.flatMap(v => v.soorten || [])].filter(Boolean));
  p.soorten = { ...Object.fromEntries([...ids].filter(i => PL[i]).map(i => [i, PL[i]])), ...p.soorten };
  const logo = 'data:image/png;base64,' + fs.readFileSync(path.join(HIER, 'logo-klein.png')).toString('base64');
  const data = JSON.stringify({ project: p, texturen, logo, gemaakt: new Date().toISOString().slice(0, 10) }).replace(/</g, '\u003c');
  const html = bron.replace('<script type="importmap">', '<script>window.__KLANT = ' + data + ';<\/script>\n<script type="importmap">').replace('<title>Tuinontwerp</title>', `<title>${p.naam} – 3D-ontwerp</title>`);
  fs.writeFileSync(uitPad, html);
  console.log('Klantversie:', uitPad, (html.length / 1e6).toFixed(1) + ' MB');
})().catch(e => { console.error('Mislukt:', e.message, '(draait de lokale server?)'); process.exit(1); });
