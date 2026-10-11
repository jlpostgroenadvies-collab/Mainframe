---
name: factuur
description: Weekstaten en facturen van J.L. Post Groenadvies in OneDrive. Lege weekstaat klaarzetten, en factuur maken uit de weekstaten in de eigen opmaak (xlsx + pdf). Gebruik bij "maak de weekstaat", "nieuwe weekstaat", "maak de factuur", "factureer", "factuur voor <klant>", "wat moet ik nog factureren", "openstaande uren".
---

# Factuur maken uit weekstaten

Joris zegt bijvoorbeeld: "maak de factuur voor Ruimte voor Advies". Claude zoekt zelf uit welke uren nog niet gefactureerd zijn en maakt de factuur. Joris controleert, zet hem in e-Boekhouden en verstuurt zelf.

## Waar staat wat (OneDrive, lokaal gesynchroniseerd)
Basis: `%USERPROFILE%\OneDrive - J.L. Post Groenadvies\J.L. Post Groenadvies\`
- `02 Weekstaten\` – per week één bestand per opdrachtgever (`<jaar> weekstaat wk <nr> jp.xlsx`): rij 2 opdrachtgever, rij 3 weeknummer, per project een rij met uren per dag en kolom "Totaal uren".
- `03 Facturatie\` – facturen `Factuur <jaar>-<nnn>.xlsx` + `.pdf`. Regels in rij 18–31 (max. 14), per week één regel "week <nr>".

## Hulpprogramma's (in deze map)
- `overzicht-facturatie.ps1` – leest alle weekstaten en facturen (alleen lezen): uren per week/project en welke weken op welke factuur staan.
- `maak-weekstaat.ps1 -Week <nr> [-Jaar <jjjj>]` – maakt een lege weekstaat (kopie van de nieuwste, met juiste datums; uren en omschrijvingen leeg, projectregels blijven). Overschrijft nooit.
- `maak-factuur.ps1 -Invoer <json>` – kopieert een eerdere factuur als sjabloon, vult hem in en maakt een pdf. Overschrijft nooit. JSON-opbouw staat bovenin het script; paden met `/`.

Uitvoeren met: `powershell -NoProfile -ExecutionPolicy Bypass -File "<pad>\<script>.ps1"`. Zet het JSON-bestand in de scratchpad, niet in de Mainframe-map.

## Stappen
1. Draai `overzicht-facturatie.ps1`.
2. **Ongefactureerde weken bepalen** voor de opdrachtgever: weken uit de weekstaten die nog op geen enkele factuur van die klant staan. Weken met 0 uur weglaten. Mist er een weekstaat tussen twee weken, of staat er een week op een factuur met andere uren dan in de weekstaat: melden, niet zelf oplossen.
3. **Tarief** uit `context/prijzen.md` (tarief per opdrachtgever). Twijfel → vragen.
4. **Factuurnummer**: hoogste bestaande nummer van dit jaar + 1 (`2026-003` na `2026-002`). Nieuw jaar → `<jaar>-001`.
5. **Klantadres**: van de laatste factuur aan dezelfde klant. Nieuwe klant → naam en adres aan Joris vragen; nooit raden.
6. **Gegevens**: factuurdatum = vandaag (tenzij Joris iets anders zegt), betaaltermijn 30 dagen, omschrijving "Facturatie <maand(en)> <jaar>" op basis van de weken, project/offertenummer leeg tenzij bekend.
7. **Sjabloon**: de laatste factuur in `03 Facturatie`. Uitvoer: `03 Facturatie\Factuur <nummer>.xlsx` (pdf komt ernaast).
8. Draai `maak-factuur.ps1` en controleer: subtotaal = som(uren × tarief), btw 21%, totaal. Bekijk de pdf.
9. **Overzicht aan Joris**: nummer, klant, weken met uren, totaal excl./incl. btw, waar de bestanden staan, en eventuele meldingen uit stap 2. Daarna: "Controleer de pdf, zet hem in e-Boekhouden en verstuur hem zelf."

## Regels
- Nooit een bestaande factuur wijzigen of overschrijven. Fout gemaakt → nieuwe versie met zelfde nummer alleen na akkoord van Joris (oude eerst door hem laten verwijderen).
- Nooit versturen. Een begeleidende mail mag alleen als concept (skill `mail-concepten`).
- Meer dan 14 weken → in twee facturen splitsen of per maand bundelen; eerst vragen.
- Klantgegevens en bedragen niet in `context/`, `geheugen/` of skills zetten.

## Weekstaat klaarzetten
Joris zegt "maak de weekstaat" (eventueel met weeknummer). Alleen de opzet; Joris vult zelf de uren in.
1. Weeknummer: wat Joris noemt; anders de huidige ISO-week (bestaat die al: de volgende).
2. Draai `maak-weekstaat.ps1 -Week <nr> -Jaar <jjjj>`.
3. Meld waar het bestand staat en welke data de week beslaat. Vraag of er projectregels bij of af moeten (nieuw project / afgerond project) en pas die alleen aan na zijn antwoord.
