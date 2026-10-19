---
name: 3d-ontwerp
description: Maak of wijzig een 3D-ontwerp in de tuinontwerptool vanuit de projectstukken (DXF, ingekleurde PDF/afbeelding, schets, materialenlijst, beplantingsplan, productbladen) en lever project + klantversie in OneDrive. Gebruik bij "maak een 3D-ontwerp van …", "3D van <project>", "pas het 3D-ontwerp aan", "zet … in het 3D-ontwerp".
---

# 3D-ontwerp (tuinontwerptool)

Lees eerst `tools/tuinontwerp/LEESMIJ.md`. De tool draait via de lokale server (`node start-server.js` in `tools/tuinontwerp`, achtergrond); controleer met `curl http://127.0.0.1:8766/tuinontwerp.html`.

## Stap 1 – Stukken verzamelen
- Projectmap: `OneDrive › J.L. Post Groenadvies › 01 Projecten › <project>`. Bestaat die niet: aanmaken.
- Bijlagen uit de mail kan Claude niet zelf als bestand opslaan (Microsoft 365-koppeling geeft alleen tekst). Vraag Joris ze te downloaden naar de projectmap; de tekst van PDF-bijlagen (materialenlijst, beplantingsplan) kan Claude wel direct uit de mail lezen.
- Bekijk alles: plattegrond(en), maatlijnen, schaal, legenda, materialen, soorten met aantallen, sfeerfoto's.

## Stap 2 – Ondergrond omzetten (kies de beste bron)
1. **DXF** (voorkeur, exact): in de tool "Tekening laden" → lagen controleren → Importeren. Of via adres `?dxf=/output/<map>/<bestand>.dxf&dxfauto=1` (bestand eerst in `output/<project>/` zetten).
2. **Vector-PDF op schaal in legendakleuren**: `node lees-tekening.mjs` (zie LEESMIJ) met een aanvulling in `bronnen/<project>/`.
3. **Ingekleurde afbeelding/PDF met maatlijnen**: schaal bepalen uit een maatlijn (px per m), vlakken en objecten in pixels opmeten en met een script omzetten naar `output/<project>/<project>.tuin.json` (voorbeeldaanpak: de Noltheniusstraat). Controleer met het totale oppervlak op de tekening. Zet de tekening als ondergrond (dekking ca. 0,45).
4. **Pentekening/schets zonder kleurvlakken**: niet automatisch; als ondergrond inladen en overtrekken, of de vlakken opmeten zoals bij 3.

## Stap 3 – Inrichten volgens de stukken
- Materialen via `legenda` (naam zoals in de materialenlijst, `kleur3d`, `tegel` [l, b] in m, `verband`). Stapstenen e.d. boven beplanting: `laag: 9` op het vlak.
- Soorten alleen uit `plantenlijst.json` (bron: Excel in `09 bibliotheek`). Ontbreekt een soort: NIET verzinnen; noemen als "ontbreekt in plantenlijst" en Joris vragen hem in de Excel te zetten (daarna `node bouw-plantenlijst.mjs`).
- Bestaande bomen: eigen projectsoort met gemeten kroon, `jaren: 1` (groeit niet mee), hoogte als aanname.
- Objecten: pergola, loungebank, tuinset, buitenkeuken (zitelement-vlak, hoogte 0,9) enz.; voorgeschreven producten via tabblad Bijlagen (productfoto in 3D) of nabouwen op maat uit het productblad.
- Woning/bebouwing als `bebouwing` met hoogte (aanname tenzij bekend).

## Stap 4 – Controleren
Testbeelden met Edge headless (zie LEESMIJ › Testen): vogelvlucht, ooghoogte, en de schetsstijl (`&kwaliteit=schets`). Let op: planten op stenen, vlakken die wegvallen, camera midden, schaal.

## Stap 5 – Opleveren
- `output/<project>/<project>.tuin.json` en kopie in de OneDrive-projectmap.
- Klantversie: `node tools/tuinontwerp/maak-klantversie.js <project.tuin.json> "<OneDrive-projectmap>/<Project> – 3D-ontwerp.html"`; testen vanuit OneDrive.
- Open het project in Edge voor Joris (`cmd //c start "" msedge "http://localhost:8766/tuinontwerp.html?project=/output/<map>/<bestand>.tuin.json"`; `&` in cmd escapen als `^&`).
- Meld kort: wat erin zit, de aannames om na te kijken, en de ontbrekende soorten.

## Aanpassingen later
Joris vraagt een wijziging in gewone taal ("terras 1 m breder", "andere boom"): project inlezen, aanpassen (script of in de tool), testbeeld, opslaan in output + OneDrive, klantversie opnieuw maken als die al bestond.

## Grenzen
- Geen klantgegevens in `context/`, `geheugen/` of deze skill. Projectbestanden blijven in `output/`, `bronnen/` en OneDrive.
- Maten, soorteigenschappen en productmaten nooit verzinnen; aannames altijd benoemen.
