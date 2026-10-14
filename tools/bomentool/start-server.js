// Toont de bomentool op http://localhost:8765 (voor het VSCode-paneel "Simple Browser"). Stoppen: Ctrl+C.
const http = require('http');
const fs = require('fs');
const path = require('path');

const MAP = path.join(process.env.OneDrive || '', 'J.L. Post Groenadvies', '01 Projecten', 'bomentool', 'tool');
const POORT = 8765;
const TYPES = { '.html': 'text/html; charset=utf-8', '.png': 'image/png', '.js': 'text/javascript', '.css': 'text/css' };

http.createServer((req, res) => {
  const naam = decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(/^\/+/, '') || 'index.html';
  const bestand = path.join(MAP, naam);
  if (!bestand.startsWith(MAP)) { res.writeHead(403); return res.end(); }
  fs.readFile(bestand, (fout, inhoud) => {
    if (fout) { res.writeHead(404); return res.end('Niet gevonden'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(bestand)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(inhoud);
  });
}).listen(POORT, '127.0.0.1', () => console.log(`Bomentool: http://localhost:${POORT}/ontwerp.html`));
