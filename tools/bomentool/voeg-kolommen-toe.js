// Eenmalig: voegt aan de bomenlijst lege kolommen toe voor boomkroon (m²), groeiplaatsverbetering (m³) en de bron.
// Bestaande inhoud blijft staan. Gebruik: node voeg-kolommen-toe.js <pad naar xlsx>
const ExcelJS = require('exceljs');
const XLSX = process.argv[2];

const kopFont = { bold: true, color: { argb: 'FFFFFFFF' } };
const kopFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4A8F22' } };
const invulFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF6DC' } };

(async () => {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(XLSX);
  const ws = wb.getWorksheet('Bomenlijst');
  if (ws.getCell('J1').value) throw new Error('Kolom J is al in gebruik: ' + ws.getCell('J1').value);

  [['J', 'Boomkroon volwassen (m²)', 24], ['K', 'Groeiplaatsverbetering (m³)', 26], ['L', 'Bron kroon en groeiplaats', 34]].forEach(([k, kop, breed]) => {
    const c = ws.getCell(k + '1'); c.value = kop; c.font = kopFont; c.fill = kopFill;
    ws.getColumn(k).width = breed;
  });
  for (let r = 2; r <= ws.rowCount; r++) if (ws.getCell(r, 1).value) [10, 11, 12].forEach(k => ws.getCell(r, k).fill = invulFill);
  ws.autoFilter = { from: 'A1', to: 'L1' };

  const wt = wb.getWorksheet('Toelichting');
  [
    ['Boomkroon', 'Kroonprojectie van de volwassen boom in m² (bovenaanzicht), per soort/cultivar. De ontwerptool tekent hiermee de kroon en telt de boomkroonbedekking op.'],
    ['Groeiplaats', 'Benodigde groeiplaatsverbetering (doorwortelbare ruimte) in m³ per boom, per soort/cultivar. De ontwerptool toetst de getekende groeiplaats hieraan.'],
    ['Bron', 'Bron van beide waarden, bijv. kwekerijcatalogus of Boommonitor/Handboek Bomen (licentievoorwaarden nagaan voordat getallen gedeeld worden).'],
  ].forEach(r => { const row = wt.addRow(r); row.getCell(1).font = { bold: true }; row.getCell(2).alignment = { wrapText: true, vertical: 'top' }; });

  await wb.xlsx.writeFile(XLSX);
  console.log('Kolommen J, K en L toegevoegd aan', XLSX);
})();
