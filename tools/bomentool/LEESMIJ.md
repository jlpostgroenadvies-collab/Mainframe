# Bomentool NHV – broncode

Boomselectie (index.html) en ontwerptool (ontwerp.html) voor gemeenten, onderdeel van de Vergroeningsscan NHV.

## Waar staat wat
- **Bron van de gegevens:** `OneDrive - J.L. Post Groenadvies\J.L. Post Groenadvies\01 Projecten\bomentool\Bomenlijst bomentool NHV.xlsx` (enige bron; hier wijzigen).
- **Gebouwde tool:** dezelfde OneDrive-map, submap `tool\` (`index.html`, `ontwerp.html`) en `Bomentool NHV.zip`.
- **Deze map (GitHub):** sjablonen en scripts. Geen klant- of gemeentegegevens.

## Tool bijwerken na een wijziging in Excel
1. Excel sluiten.
2. In deze map: `node bouw-dashboard.js` (eenmalig vooraf `npm install`).
3. Zip opnieuw maken (Claude doet dit bij "werk de bomentool bij").

## Bestanden
- `dashboard-template.html` – boomselectie (ook als losse pagina op claude.ai).
- `ontwerp-template.html` – ontwerptool: PDOK-kaart, bomen en groeiplaatsvakken, kroon, NHV-bijdrage, bestaande bomen, uitdraai op schaal, GeoJSON/RD-export.
- `bouw-dashboard.js` – leest de Excel en bouwt beide pagina's.
- `voeg-*.js` – eenmalige scripts die kolommen aan de Excel toevoegden (historie).
- `start-server.js` – lokaal adres voor het VSCode-paneel (Simple Browser).

## Uitgangspunten
- Kaart via PDOK (geen Google Maps); coördinaten ETRS89, export ook in RD (EPSG:28992).
- Geen waarden uit Handboek Bomen of Boommonitor standaard in de tool (licentie); wel aansluiten op de termen. Gemeenten kunnen later eigen normen invoeren.
- Waarden in de bomenlijst alleen met bron; vuistregels in de tool staan als vuistregel gemarkeerd.
