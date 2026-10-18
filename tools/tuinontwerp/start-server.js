// Start de tuinontwerptool op http://localhost:8766 (stoppen: Ctrl+C).
// Toont de tool uit deze map en projecten uit C:\Mainframe\output (alleen lezen).
// Openen met project: http://localhost:8766/tuinontwerp.html?project=/output/<project>/<project>.tuin.json
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.resolve(HIER, '..', '..', 'output');
const POORT = 8766;
const TYPES = { '.html': 'text/html; charset=utf-8', '.json': 'application/json', '.js': 'text/javascript', '.mjs': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg' };

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/log') { // meldingen uit de browser (alleen bij ?log=1), voor het testen
    let tekst = ''; req.on('data', d => tekst += d); req.on('end', () => { console.log('[browser]', tekst.slice(0, 2000)); res.end(); }); return;
  }
  const naam = decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(/^\/+/, '') || 'tuinontwerp.html';
  const [basis, deel] = naam.startsWith('output/') ? [OUTPUT, naam.slice(7)] : [HIER, naam];
  const bestand = path.resolve(basis, deel);
  if (!bestand.startsWith(basis + path.sep) || bestand.includes(`${path.sep}node_modules${path.sep}`)) { res.writeHead(403); return res.end(); }
  fs.readFile(bestand, (fout, inhoud) => {
    if (fout) { res.writeHead(404); return res.end('Niet gevonden'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(bestand)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(inhoud);
  });
}).listen(POORT, '127.0.0.1', () => console.log(`Tuinontwerp: http://localhost:${POORT}/tuinontwerp.html`));
