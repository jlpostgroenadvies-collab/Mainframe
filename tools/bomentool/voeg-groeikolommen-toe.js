// Eenmalig: lege kolommen M en N voor de kroongroei (m² na 10 en 20 jaar) toevoegen. Bestaande inhoud blijft staan.
const ExcelJS = require('exceljs');
const XLSX = process.argv[2];
const kopFont = { bold: true, color: { argb: 'FFFFFFFF' } };
const kopFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4A8F22' } };
const invulFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF6DC' } };
(async () => {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(XLSX);
  const ws = wb.getWorksheet('Bomenlijst');
  if (ws.getCell('M1').value || ws.getCell('N1').value) throw new Error('Kolom M of N is al in gebruik');
  [['M', 'Kroon na 10 jaar (m²)'], ['N', 'Kroon na 20 jaar (m²)']].forEach(([k, kop]) => {
    const c = ws.getCell(k + '1'); c.value = kop; c.font = kopFont; c.fill = kopFill; ws.getColumn(k).width = 22;
  });
  for (let r = 2; r <= ws.rowCount; r++) if (ws.getCell(r, 1).value) [13, 14].forEach(k => ws.getCell(r, k).fill = invulFill);
  ws.autoFilter = { from: 'A1', to: 'N1' };
  ws.getCell('L1').value = 'Bron kroon, groei en groeiplaats';
  const row = wb.getWorksheet('Toelichting').addRow(['Kroongroei', 'Kroonprojectie in m² 10 en 20 jaar na aanplant (gangbare plantmaat), per soort/cultivar. De ontwerptool berekent hiermee de bijdrage aan de boomkroonbedekking (NHV) in 2030, 2040 en bij volwassen bomen. Bron in kolom L.']);
  row.getCell(1).font = { bold: true }; row.getCell(2).alignment = { wrapText: true, vertical: 'top' };
  await wb.xlsx.writeFile(XLSX);
  console.log('Kolommen M en N toegevoegd');
})();
