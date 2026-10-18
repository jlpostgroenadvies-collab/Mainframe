@echo off
rem Start de tuinontwerptool: lokale server + Edge. Dit venster openlaten zolang je werkt; sluiten = tool stoppen.
cd /d "%~dp0"
start "" msedge "http://localhost:8766/tuinontwerp.html"
node start-server.js
