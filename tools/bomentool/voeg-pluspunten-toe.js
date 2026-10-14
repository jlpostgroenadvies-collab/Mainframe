// Eenmalig: lege kolommen O (Pluspunten) en P (Bron pluspunten) toevoegen. Bestaande inhoud blijft staan.
const ExcelJS = require('exceljs');
const XLSX = process.argv[2];
const kopFont = { bold: true, color: { argb: 'FFFFFFFF' } };
const kopFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4A8F22' } };
const invulFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF6DC' } };
(async () => {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(XLSX);
  const ws = wb.getWorksheet('Bomenlijst');
  if (ws.getCell('O1').value || ws.getCell('P1').value) throw new Error('Kolom O of P is al in gebruik');
  [['O', 'Pluspunten', 60], ['P', 'Bron pluspunten', 34]].forEach(([k, kop, breed]) => {
    const c = ws.getCell(k + '1'); c.value = kop; c.font = kopFont; c.fill = kopFill; ws.getColumn(k).width = breed;
  });
  for (let r = 2; r <= ws.rowCount; r++) if (ws.getCell(r, 1).value) {
    [15, 16].forEach(k => ws.getCell(r, k).fill = invulFill);
    ws.getCell(r, 15).alignment = { wrapText: true, vertical: 'top' };
  }
  ws.autoFilter = { from: 'A1', to: 'P1' };
  const row = wb.getWorksheet('Toelichting').addRow(['Pluspunten', 'Extra waarde van de boom naast kroon en groeiplaats, kort en met bron in kolom P. Bijvoorbeeld: hoge nectar- of pollenwaarde, waardplant voor vlinders, vruchten voor vogels, fijnstofafvang, CO₂-vastlegging, verkoeling/schaduw, waterberging, klimaatbestendig. Meerdere punten scheiden met een puntkomma.']);
  row.getCell(1).font = { bold: true }; row.getCell(2).alignment = { wrapText: true, vertical: 'top' };
  await wb.xlsx.writeFile(XLSX);
  console.log('Kolommen O en P toegevoegd');
})();
