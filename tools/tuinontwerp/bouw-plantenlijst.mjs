// Zet de plantenlijst (Excel in OneDrive › 09 bibliotheek) om naar plantenlijst.json voor de tuinontwerptool.
// Gebruik:  node bouw-plantenlijst.mjs ["pad\naar\Plantenlijst_kenmerken.xlsx"]
// De Excel blijft de enige bron: wijzig daar en draai dit script opnieuw.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ExcelJS from 'exceljs';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const BRON = process.argv[2] || path.join(process.env.OneDrive || '', 'J.L. Post Groenadvies', '09 bibliotheek', 'Plantenlijst_kenmerken.xlsx');
const UIT = path.join(HIER, 'plantenlijst.json');

// ---------- hulp ----------
const tekst = v => v && v.richText ? v.richText.map(x => x.text).join('') : v && v.result !== undefined ? v.result : v;
const leeg = v => v === undefined || v === null || String(v).trim() === '' || String(v).trim() === '–';
const getal = v => { if (leeg(v)) return null; const d = String(v).replace(/,/g, '.').match(/[\d.]+/g); if (!d) return null; const n = d.slice(0, 2).map(Number); return n.reduce((a, b) => a + b, 0) / n.length; };
const MAAND = { jan: 1, feb: 2, mrt: 3, maa: 3, apr: 4, mei: 5, jun: 6, jul: 7, aug: 8, sep: 9, okt: 10, nov: 11, dec: 12 };
function maanden(v) { // "jun–aug", "apr", "mei (+ sep)" → [van, tot]
  if (leeg(v)) return null;
  const m = String(v).toLowerCase().match(/[a-z]{3}/g)?.map(x => MAAND[x]).filter(Boolean);
  if (!m?.length) return null;
  const deel = String(v).split('(')[0].match(/[a-z]{3}/gi)?.map(x => MAAND[x.toLowerCase()]).filter(Boolean) || m;
  return [deel[0], deel[deel.length - 1]];
}
// kleurwoorden → kleur (langste woorden eerst, zodat "zwavelgeel" vóór "geel" komt)
const KLEUREN = Object.entries({
  scharlakenrood: '#d1322b', karmijnroze: '#d84b78', robijnrood: '#a3173a', wijnrood: '#7d1f35', donkerrood: '#8e1d24', bloedrood: '#8a1414', vuurrood: '#d8321f', koperrood: '#b8532c', oranjerood: '#dd5a2a', roodbruin: '#8f3f26', bronsrood: '#94452c', purperrood: '#86264a', roodpurper: '#7d2550', bruinrood: '#8a3a2a',
  zwavelgeel: '#eee38a', citroengeel: '#f1e04a', goudgeel: '#e8b830', lichtgeel: '#f3e58f', geeloranje: '#eba23a', oranjegeel: '#eba23a', geelgroen: '#b5c84a', geelbruin: '#a8823c', goudbruin: '#9e7232', oranjebruin: '#a8642e', oranjegoud: '#e09a2e', geelrood: '#e0702c',
  zachtroze: '#f3bfd2', lichtroze: '#f5c6d6', helderroze: '#ee6fa6', zalmroze: '#f3a68f', oudroze: '#c98a96', purperroze: '#b34d84', paarsroze: '#b25a9a', lilaroze: '#d39ac6', witroze: '#f7dce6',
  lavendelblauw: '#9b9ad8', violetblauw: '#5d55b8', indigoblauw: '#3b3f8f', hemelsblauw: '#7fb6e8', lichtblauw: '#9ec3ec', donkerblauw: '#2e3f8f', kobaltblauw: '#2c4bb0', staalblauw: '#5a7896', blauwpaars: '#5c4da8',
  donkerpaars: '#4b2a6b', donkerpurper: '#4a2232', zwartpurper: '#2e1a24', purperzwart: '#2e1a24', purperbruin: '#5a3236', bronspurper: '#5a3a3a', blauwpurper: '#4b3a7a',
  lichtlila: '#d8c4e8', lavendel: '#b6a5d8', magenta: '#c42a8a', crèmewit: '#f2ead2', zilverwit: '#e4e6e0', roomwit: '#f2ead2', zilvergrijs: '#b9c2b4', zilver: '#c4cbc2',
  donkergroen: '#2f5a22', lichtgroen: '#9cc36a', frisgroen: '#7fb24a', grijsgroen: '#8fa58a', blauwgroen: '#5f8a80', blauwgrijs: '#8a9ea6', bronsgroen: '#6a6a32', chartreuse: '#c2d23a', witbont: '#c8d8b8',
  karamel: '#c07a3a', limoen: '#c8d84a', goudgroen: '#a8b83a', koperbruin: '#8a4f2a', bronsbruin: '#7a5532', roestbruin: '#8f4a24', brons: '#9a6a3a', stro: '#d6c38a', beige: '#d8c8a8', crème: '#efe6c8',
  rood: '#c8352f', roze: '#ef9fc0', oranje: '#e88a2c', geel: '#f2d23c', wit: '#f6f4ee', lila: '#c4a2d8', paars: '#7d4ea8', violet: '#7b5cc4', purper: '#6e2f5f', blauw: '#5b7fd6', groen: '#5f8f3a', bruin: '#8a5a32', grijs: '#9a9d98', zwart: '#2a2a2a', bordeaux: '#5f1a2a',
}).sort((a, b) => b[0].length - a[0].length);
function kleur(v, laatste = false) { // eerste kleurwoord; bij blad het deel na "→" (zomerkleur)
  if (leeg(v)) return null;
  let s = String(v).toLowerCase();
  if (s.includes('→')) s = laatste ? s.split('→').pop() : s.split('→')[0];
  let beste = null, positie = Infinity;
  for (const [w, k] of KLEUREN) { const i = s.indexOf(w); if (i >= 0 && i < positie) { positie = i; beste = k; } }
  return beste;
}
// zomerkleur van het blad: uitloopkleur in het voorjaar telt niet mee ("bronsrood uitlopend → groen" = groen)
function zomerBlad(v) {
  if (leeg(v)) return null;
  let s = String(v).toLowerCase().split('→').pop();
  const delen = s.split(/[,/]/).map(x => x.trim()).filter(Boolean), zomer = delen.filter(x => !/uitlopend/.test(x));
  if (zomer.length) return kleur(zomer.join(', '));
  return /geel|goud/.test(s) ? '#b5c84a' : '#5f8f3a'; // alleen een uitloopkleur genoemd: zomer groen (bij goud/geel: geelgroen)
}
const slug = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
const JAREN = { boom: { snel: 20, matig: 30, langzaam: 45 }, heester: { snel: 4, matig: 6, langzaam: 10 } };

// ---------- inlezen ----------
const wb = new ExcelJS.Workbook();
await wb.xlsx.readFile(BRON);
const lijst = {}, telling = {};
function blad(naam, categorie, maak) {
  const ws = wb.getWorksheet(naam); if (!ws) { console.warn('Tabblad ontbreekt:', naam); return; }
  const kop = ws.getRow(1).values.slice(1).map(tekst);
  for (let r = 2; r <= ws.rowCount; r++) {
    const w = ws.getRow(r).values.slice(1).map(tekst); if (leeg(w[0])) continue;
    const rij = Object.fromEntries(kop.map((k, i) => [k, w[i]]));
    const s = maak(rij);
    let id = slug(rij['Wetenschappelijke naam']); while (lijst[id]) id += '_2';
    lijst[id] = { naam: `${rij['Wetenschappelijke naam']} (${rij['Nederlandse naam']})`, wetenschappelijk: rij['Wetenschappelijke naam'], nl: rij['Nederlandse naam'], categorie, ...s,
      info: Object.fromEntries(Object.entries(rij).filter(([k, v]) => !leeg(v) && !['Wetenschappelijke naam', 'Nederlandse naam'].includes(k)).map(([k, v]) => [k, String(v)])),
      bron: 'Eigen plantenlijst (09 bibliotheek): indicatieve waarden, niet per regel geverifieerd.' };
    telling[categorie] = (telling[categorie] || 0) + 1;
  }
}
function seizoen(rij, bladKleur) { // herfst, kaal en kleuren
  const wg = String(rij['Wintergroen'] || 'nee').toLowerCase();
  const groenblijvend = wg.startsWith('ja') || wg.startsWith('half');
  const hk = kleur(rij['Herfstkleur']);
  return { herfst: !groenblijvend && hk ? [10, 11] : null, herfstkleur: hk || bladKleur, kaal: groenblijvend ? null : [12, 3], wintergroen: wg };
}

blad('Bomen', 'boom', rij => {
  const h1 = getal(rij['Eindhoogte (m)']) ?? 10, b1 = getal(rij['Kroonbreedte (m)']) ?? h1 * 0.6, h0 = Math.min(getal(rij['Aanplanthoogte (m)']) ?? 4.5, h1);
  const bladKleur = zomerBlad(rij['Bladkleur']) || '#5f8f3a', bloei = kleur(rij['Bloeikleur']) && !/onopvallend/i.test(rij['Bloeikleur']) ? maanden(rij['Bloeiperiode']) : null;
  const sz = seizoen(rij, bladKleur), vorm = String(rij['Kroonvorm'] || '').toLowerCase(), bladvorm = String(rij['Bladvorm / textuur'] || '').toLowerCase();
  const naald = /naald|schub/.test(bladvorm);
  const preset = naald || (/kegel/.test(vorm) && sz.wintergroen.startsWith('ja')) ? 'Pine Medium' : /zuil|smal/.test(vorm) ? 'Aspen Medium' : /breed|gelaagd|knoestig|onregelmatig/.test(vorm) ? 'Oak Medium' : 'Ash Medium';
  return {
    hoogte: [+h0.toFixed(2), h1], breedte: [+(h0 * 0.35).toFixed(2), b1], stam: Math.min(2.2, h0 * 0.45),
    jaren: JAREN.boom[String(rij['Groeisnelheid'] || 'matig').toLowerCase()] || 30,
    blad: bladKleur, bloei, bloemkleur: bloei ? kleur(rij['Bloeikleur']) : null, ...sz,
    ez: { preset, blad: naald ? 'pine' : /handvorm|esdoorn|gelobd|eik/.test(bladvorm) ? 'oak' : /geveerd/.test(bladvorm) ? 'ash' : 'aspen', bloeiOpKaal: !!bloei && bloei[0] <= 4 && !sz.wintergroen.startsWith('ja') },
    afgeleid: 'Kroonbreedte bij aanplant en groeitijd zijn afgeleid (aanname).',
  };
});
blad('Heesters', 'heester', rij => {
  const h1 = (getal(rij['Eindhoogte (cm)']) ?? 100) / 100, b1 = (getal(rij['Eindbreedte (cm)']) ?? h1 * 100) / 100;
  const h0 = Math.min((getal(rij['Gangbare aanplantmaat (cm)']) ?? 30) / 100, h1);
  const bladKleur = zomerBlad(rij['Bladkleur']) || '#5f8f3a', bloei = kleur(rij['Bloeikleur']) && !/onopvallend/i.test(rij['Bloeikleur']) ? maanden(rij['Bloeiperiode']) : null;
  return {
    hoogte: [+h0.toFixed(2), h1], breedte: [+(h0 * 0.8).toFixed(2), b1], jaren: JAREN.heester[String(rij['Groeisnelheid'] || 'matig').toLowerCase()] || 6,
    blad: bladKleur, bloei, bloemkleur: bloei ? kleur(rij['Bloeikleur']) : null, ...seizoen(rij, bladKleur),
    perM2: getal(rij['Plantdichtheid (st/m²)']), ez: { blad: /naald|schub/.test(String(rij['Bladvorm / textuur'] || '').toLowerCase()) ? 'pine' : 'ash' },
    afgeleid: 'Breedte bij aanplant en groeitijd zijn afgeleid (aanname).',
  };
});
blad('Vaste planten', 'vaste', rij => {
  const h1 = (getal(rij['Hoogte (cm)']) ?? 50) / 100, b1 = (getal(rij['Breedte (cm)']) ?? 40) / 100;
  const bladKleur = zomerBlad(rij['Bladkleur']) || '#6f9e45', bloei = kleur(rij['Bloeikleur']) && !/onopvallend/i.test(rij['Bloeikleur']) ? maanden(rij['Bloeiperiode']) : null;
  return {
    hoogte: [+Math.min(0.15, h1 * 0.3).toFixed(2), h1], breedte: [+Math.min(0.15, b1).toFixed(2), b1], jaren: 3,
    blad: bladKleur, bloei, bloemkleur: bloei ? kleur(rij['Bloeikleur']) : null, ...seizoen(rij, bladKleur),
    perM2: getal(rij['Plantdichtheid (st/m²)']), ez: { blad: 'ash' },
    afgeleid: 'Maat bij aanplant en groeitijd zijn afgeleid (aanname).',
  };
});
blad('Siergrassen & varens', 'gras', rij => {
  const h1 = (getal(rij['Hoogte incl. pluim (cm)']) ?? 60) / 100, b1 = (getal(rij['Breedte (cm)']) ?? 50) / 100;
  const varen = /varen/i.test(rij['Type']);
  const bladKleur = zomerBlad(rij['Bladkleur']) || '#7a9a4a', pluim = kleur(rij['Pluim-/bloeikleur']);
  const bloei = pluim && !/onopvallend|zelden/i.test(rij['Pluim-/bloeikleur']) ? maanden(rij['Bloeiperiode']) : null;
  return {
    hoogte: [+Math.min(0.2, h1 * 0.3).toFixed(2), h1], breedte: [+Math.min(0.2, b1).toFixed(2), b1], jaren: 3,
    blad: bladKleur, bloei, bloemkleur: bloei ? pluim : null, ...seizoen(rij, bladKleur),
    perM2: getal(rij['Plantdichtheid (st/m²)']), ez: { blad: varen ? 'ash' : 'pine' },
    afgeleid: 'Maat bij aanplant en groeitijd zijn afgeleid (aanname).',
  };
});

fs.writeFileSync(UIT, JSON.stringify(lijst));
console.log(`Klaar: ${Object.keys(lijst).length} soorten →`, path.relative(HIER, UIT), telling);
console.log('Bron:', BRON);
