// Zet een ontwerptekening (PDF, vectorbestand op schaal) om naar een project voor de tuinontwerptool.
// Gebruik:  node lees-tekening.mjs <tekening.pdf> <project.tuin.json> [--schaal 100] [--aanvulling aanvulling.json] [--naam "Project"]
// Vlakken worden herkend aan de legendakleuren van J.L. Post Groenadvies (zie KLEUREN hieronder).
// De aanvulling (optioneel, JSON) bevat in PDF-punten (pt) op de tekening: extra vlakken, objecten, te verwijderen vlakken (punt erin)
// en hernoemingen van vlaktypen. Voorbeeld staat lokaal in bronnen/ bij het eerste testproject.
import fs from 'fs';
import path from 'path';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import { contours } from 'd3-contour';
import simplify from 'simplify-js';

const arg = process.argv.slice(2);
const optie = (naam, standaard) => { const i = arg.indexOf('--' + naam); return i >= 0 ? arg[i + 1] : standaard; };
const [pdfPad, uitPad] = arg.filter((a, i) => !a.startsWith('--') && !(i > 0 && arg[i - 1].startsWith('--')));
if (!pdfPad || !uitPad) { console.log('Gebruik: node lees-tekening.mjs <tekening.pdf> <project.tuin.json> [--schaal 100] [--aanvulling a.json] [--naam "Project"]'); process.exit(1); }
const SCHAAL = Number(optie('schaal', 100));
const S = 2;                                   // pixels per pt bij het uitlezen
const M_PER_PT = SCHAAL * 0.0254 / 72;          // meters in het echt per pt op papier

// Legendakleuren → vlaktype. Volgorde = stapelvolgorde (onderaan eerst).
const KLEUREN = [
  { type: 'bestaand_groen', kleuren: ['#5cb800'] },
  { type: 'gras',           kleuren: ['#bfff7f'] },
  { type: 'moestuin',       kleuren: ['#cd6928'] },
  { type: 'halfverharding', kleuren: ['#f7f281'] },
  { type: 'bloemenmengsel', kleuren: ['#d7ebd2', '#93278f'] },
];
const BEBOUWING = '#636466';
const TOLERANTIE = 28;

// ---------- PDF renderen ----------
class CanvasFabriek { create(w, h) { const c = createCanvas(w, h); return { canvas: c, context: c.getContext('2d') }; } reset(o, w, h) { o.canvas.width = w; o.canvas.height = h; } destroy() {} }
const doc = await pdfjs.getDocument({ data: new Uint8Array(fs.readFileSync(pdfPad)), canvasFactory: new CanvasFabriek(), verbosity: 0 }).promise;
const pagina = await doc.getPage(1);
async function render(schaal) {
  const vp = pagina.getViewport({ scale: schaal });
  const cv = createCanvas(Math.ceil(vp.width), Math.ceil(vp.height));
  const ctx = cv.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height);
  await pagina.render({ canvasContext: ctx, viewport: vp }).promise;
  return cv;
}
const cv = await render(S);
const W = cv.width, H = cv.height;
const px = cv.getContext('2d').getImageData(0, 0, W, H).data;

// ---------- pixels indelen ----------
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const klassen = [...KLEUREN.map(k => k.type), 'sierbeplanting', 'bebouwing', 'zwart', 'wit'];
const ID = Object.fromEntries(klassen.map((k, i) => [k, i + 1]));
const palet = [...KLEUREN.flatMap(k => k.kleuren.map(c => [ID[k.type], hex(c)])), [ID.bebouwing, hex(BEBOUWING)]];
const label = new Uint8Array(W * H);
for (let i = 0; i < W * H; i++) {
  const r = px[i * 4], g = px[i * 4 + 1], b = px[i * 4 + 2];
  let best = 0, bestD = TOLERANTIE * TOLERANTIE;
  for (const [id, [pr, pg, pb]] of palet) { const d = (r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2; if (d < bestD) { bestD = d; best = id; } }
  if (!best) {
    if (r < 70 && g < 70 && b < 70) best = ID.zwart;
    else if (r > 235 && g > 235 && b > 235) best = ID.wit;
    else if (g > r + 25 && b >= 25 && b <= 115 && r < 135) best = ID.sierbeplanting; // verloop van de sierbeplanting
  }
  label[i] = best;
}

// ---------- maskerbewerkingen ----------
const masker = (...ids) => { const m = new Uint8Array(W * H); for (let i = 0; i < m.length; i++) if (ids.includes(label[i])) m[i] = 1; return m; };
function boxMax(m, r, max) { // dilatie (max) of erosie (min) met een vierkant van (2r+1)
  const t = new Uint8Array(W * H), o = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) { let s = 0; const row = y * W;
    for (let x = -r; x < W; x++) { if (x + r < W) s += m[row + x + r]; if (x - r - 1 >= 0) s -= m[row + x - r - 1]; if (x >= 0) { const n = Math.min(x + r, W - 1) - Math.max(x - r, 0) + 1; t[row + x] = max ? (s > 0 ? 1 : 0) : (s === n ? 1 : 0); } } }
  for (let x = 0; x < W; x++) { let s = 0;
    for (let y = -r; y < H; y++) { if (y + r < H) s += t[(y + r) * W + x]; if (y - r - 1 >= 0) s -= t[(y - r - 1) * W + x]; if (y >= 0) { const n = Math.min(y + r, H - 1) - Math.max(y - r, 0) + 1; o[y * W + x] = max ? (s > 0 ? 1 : 0) : (s === n ? 1 : 0); } } }
  return o;
}
const sluiten = (m, r) => boxMax(boxMax(m, r, true), r, false);
const openen = (m, r) => boxMax(boxMax(m, r, false), r, true);
const en = (a, b) => a.map((v, i) => v & b[i]);
function componenten(m) { // labelt samenhangende delen (4-buren)
  const comp = new Int32Array(W * H), info = []; let n = 0; const stapel = [];
  for (let i = 0; i < m.length; i++) {
    if (!m[i] || comp[i]) continue;
    n++; let opp = 0, x0 = W, y0 = H, x1 = 0, y1 = 0; comp[i] = n; stapel.push(i);
    while (stapel.length) { const j = stapel.pop(); opp++; const x = j % W, y = (j - x) / W;
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
      for (const k of [j - 1, j + 1, j - W, j + W]) { if (k < 0 || k >= m.length || (k === j - 1 && x === 0) || (k === j + 1 && x === W - 1)) continue; if (m[k] && !comp[k]) { comp[k] = n; stapel.push(k); } } }
    info[n] = { opp, x0, y0, x1, y1 };
  }
  return { comp, info, n };
}

// Ontwerpgebied = grootste samenhangende gekleurde ontwerpvlak (legenda en titel vallen zo buiten de boot).
const ontwerpIds = [...KLEUREN.map(k => ID[k.type]), ID.sierbeplanting];
const ontwerp = sluiten(masker(...ontwerpIds), 6);
const oc = componenten(ontwerp);
let grootste = 1; for (let c = 1; c <= oc.n; c++) if (oc.info[c].opp > oc.info[grootste].opp) grootste = c;
const g = oc.info[grootste], marge = 10 * S;
const gebied = new Uint8Array(W * H);
for (let y = Math.max(0, g.y0 - marge); y <= Math.min(H - 1, g.y1 + marge); y++) for (let x = Math.max(0, g.x0 - marge); x <= Math.min(W - 1, g.x1 + marge); x++) gebied[y * W + x] = 1;
const binnenOntwerp = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) binnenOntwerp[i] = oc.comp[i] === grootste ? 1 : 0;
// Ontwerp met gaten gevuld: alles wat je vanaf de rand van de tekening niet kunt bereiken zonder het ontwerp te kruisen.
const omsloten = new Uint8Array(W * H).fill(1);
{ const stapel = [];
  for (let x = 0; x < W; x++) stapel.push(x, (H - 1) * W + x);
  for (let y = 0; y < H; y++) stapel.push(y * W, y * W + W - 1);
  while (stapel.length) { const j = stapel.pop(); if (!omsloten[j] || binnenOntwerp[j]) continue; omsloten[j] = 0; const x = j % W;
    if (x > 0) stapel.push(j - 1); if (x < W - 1) stapel.push(j + 1); if (j >= W) stapel.push(j - W); if (j < W * (H - 1)) stapel.push(j + W); } }

// Oorsprong (0,0) in het midden van het ontwerpgebied; x naar rechts, y naar boven (noord boven op de tekening).
const cxPt = (g.x0 + g.x1) / 2 / S, cyPt = (g.y0 + g.y1) / 2 / S;
const naarM = ([xpt, ypt]) => [+((xpt - cxPt) * M_PER_PT).toFixed(3), +(-(ypt - cyPt) * M_PER_PT).toFixed(3)];

// ---------- contouren ----------
function vlakkenUit(m, minM2, tolPx = 1.2) {
  const res = contours().size([W, H]).thresholds([0.5])(m)[0];
  const uit = [];
  for (const poly of res.coordinates) {
    const ring = poly[0]; // alleen de buitenrand; vlakken erboven dekken de gaten af
    const vereenvoudigd = simplify(ring.map(([x, y]) => ({ x, y })), tolPx, true);
    const punten = vereenvoudigd.slice(0, -1).map(p => naarM([p.x / S, p.y / S]));
    let a = 0; for (let i = 0; i < punten.length; i++) { const [x1, y1] = punten[i], [x2, y2] = punten[(i + 1) % punten.length]; a += x1 * y2 - x2 * y1; }
    if (Math.abs(a / 2) >= minM2 && punten.length >= 3) uit.push(punten);
  }
  return uit;
}

const vlakken = [];
let nr = 0; const nieuwId = p => `${p}${++nr}`;
for (const { type } of KLEUREN) {
  const m = en(sluiten(masker(ID[type]), 3), gebied);
  for (const punten of vlakkenUit(m, 0.3)) vlakken.push({ id: nieuwId('v'), type, punten });
}
// sierbeplanting
for (const punten of vlakkenUit(en(sluiten(masker(ID.sierbeplanting), 3), en(gebied, boxMax(binnenOntwerp, 4, true))), 0.3))
  vlakken.push({ id: nieuwId('v'), type: 'sierbeplanting', punten, soorten: ['spiraea_1', 'spiraea_2', 'spiraea_3'] });
// dikke zwarte lijnen binnen het ontwerp (zandbakranden, opsluitbanden e.d.)
for (const punten of vlakkenUit(en(openen(masker(ID.zwart), 2), en(boxMax(binnenOntwerp, 2, true), gebied)), 0.03, 0.8))
  vlakken.push({ id: nieuwId('v'), type: 'zandbakrand', punten });
// niet-gekleurde vlakken die helemaal door het ontwerp worden omsloten (bijv. ondergrond speeltoestel): als 'onbekend' markeren
{
  // dunne lijnen (bijv. boomkronen) die het vlak doorsnijden tellen mee en worden daarna weggefilterd
  const gekleurd = masker(...ontwerpIds, ID.bebouwing);
  const wit = openen(en(gekleurd.map(v => 1 - v), en(omsloten, gebied)), 2); const wc = componenten(wit);
  for (let c = 1; c <= wc.n; c++) { const f = wc.info[c];
    const m2 = f.opp / S / S * M_PER_PT * M_PER_PT;
    if (m2 < 1) continue;
    const m = new Uint8Array(W * H); let erbuiten = false;
    for (let i = 0; i < W * H; i++) if (wc.comp[i] === c) { m[i] = 1; if (!omsloten[i]) { erbuiten = true; break; } }
    if (erbuiten) continue;
    for (const punten of vlakkenUit(sluiten(m, 3), 0.5)) vlakken.push({ id: nieuwId('v'), type: 'onbekend', punten });
  }
}
// bebouwing (hele tekening, tekstvakjes in gebouwen vallen weg doordat alleen de buitenrand telt)
const bebouwing = vlakkenUit(sluiten(masker(ID.bebouwing), 4), 5, 3).map(punten => ({ id: nieuwId('b'), punten, hoogte: null }));

// ---------- ondergrond (beeld van de tekening) ----------
const ondergrondCv = await render(1.5);
const ondergrond = {
  src: 'data:image/jpeg;base64,' + (await ondergrondCv.encode('jpeg', 82)).toString('base64'),
  x: naarM([0, 0])[0], y: naarM([0, 0])[1],
  breedte: +(pagina.view[2] * M_PER_PT).toFixed(3), hoogte: +(pagina.view[3] * M_PER_PT).toFixed(3),
  zichtbaar: true, dekking: 0.5,
};

// ---------- aanvulling ----------
const project = {
  versie: 1,
  naam: optie('naam', path.basename(pdfPad).replace(/\.pdf$/i, '')),
  soort: 'openbaar',
  bron: { bestand: path.basename(pdfPad), schaal: `1:${SCHAAL}`, uitgelezen: new Date().toISOString().slice(0, 10) },
  ondergrond, vlakken, objecten: [], bebouwing, soorten: {}, instellingen: {},
};
const aanvPad = optie('aanvulling');
if (aanvPad) {
  const a = JSON.parse(fs.readFileSync(aanvPad, 'utf8'));
  // verwijder: automatisch herkende vlakken die een van deze punten (pt) bevatten
  const binnen = ([x, y], p) => { let in_ = false; for (let i = 0, j = p.length - 1; i < p.length; j = i++) { const [xi, yi] = p[i], [xj, yj] = p[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) in_ = !in_; } return in_; };
  for (const pt of a.verwijder || []) project.vlakken = project.vlakken.filter(v => !binnen(naarM(pt), v.punten));
  for (const v of a.vlakken || []) project.vlakken.push({ ...v, id: v.id || nieuwId('v'), punten: v.punten_pt.map(naarM), punten_pt: undefined });
  for (const o of a.objecten || []) { const [x, y] = naarM(o.pt); project.objecten.push({ ...o, id: o.id || nieuwId('o'), x, y, pt: undefined }); }
  for (const [type, nieuw] of Object.entries(a.hernoem || {})) project.vlakken.forEach(v => { if (v.type === type) v.type = nieuw; });
  Object.assign(project.soorten, a.soorten || {});
  Object.assign(project.instellingen, a.instellingen || {});
  if (a.soort) project.soort = a.soort;
}

fs.mkdirSync(path.dirname(path.resolve(uitPad)), { recursive: true });
fs.writeFileSync(uitPad, JSON.stringify(project));
const telling = {}; project.vlakken.forEach(v => telling[v.type] = (telling[v.type] || 0) + 1);
console.log(`Klaar: ${uitPad}`);
console.log(`Schaal 1:${SCHAAL}; 1 pt = ${(M_PER_PT * 100).toFixed(2)} cm. Ontwerpgebied ca. ${((g.x1 - g.x0) / S * M_PER_PT).toFixed(1)} x ${((g.y1 - g.y0) / S * M_PER_PT).toFixed(1)} m.`);
console.log('Vlakken:', telling, `| bebouwing: ${bebouwing.length} | objecten: ${project.objecten.length}`);
