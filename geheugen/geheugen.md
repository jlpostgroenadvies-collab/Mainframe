# Geheugen

Hier legt Claude vast wat we samen besluiten en leren. Nieuwste bovenaan. Geen klant- of persoonsgegevens.

## Besluiten over het Mainframe
- 2026-10-14: Bomentool NHV (boomselectie + ontwerptool). Bron van de gegevens is de Excel in OneDrive `01 Projecten/bomentool/`; daar ook de gebouwde tool (`tool/`) en de zip. Broncode in `tools/bomentool/`. Kaart via PDOK, niet Google Maps (claude.ai-pagina's mogen geen kaarten laden; de tool draait als lokaal bestand). Groeiplaats als vakken met materiaal (bomengrond/bomenzand/bomengranulaat); overlap telt één keer (voorrang onverhard > rijbaan/parkeren > voet-/fietspad). Export GeoJSON in ETRS89 en in RD (omrekening getoetst op PDOK-adrespunten, < 1 cm). NHV-bijdrage: kroonbedekking 2030/2040/volwassen met overlap één keer.
- 2026-10-14: Handboek Bomen en Boommonitor (Norminstituut Bomen) niet standaard in de tool zetten (licentie; ook voor doorverkoop navragen), maar wel aansluiten op hun termen: gemeenten hechten er veel waarde aan. Later: gemeente kan eigen normen invoeren. Account bij Norminstituut geeft zonder licentie alleen examens.
- 2026-10-14: Bomentool wordt een product voor gemeenten, niet openbaar. Volgorde: afgeschermde demo (bijv. Cloudflare Access) → pilot met 1-2 gemeenten → echt product met accounts. Geen directe koppeling met Boomkwekerij L.H. Post (onafhankelijkheid).
- 2026-10-12: Positionering: focus op (1) plantselectie en kleine beplantingsplannen en (2) natuurherstelverordening art. 8: vergroeningskansen in kaart brengen tot en met plantlijst ("Vergroeningsscan NHV"). Niet zelf meten/monitoren (dat doet o.a. Cobra Groeninzicht), wel de stap erna. Concept-productbeschrijving in `output/vergroeningsscan-nhv/`; doorlooptijd en prijs nog door Joris in te vullen.
- 2026-10-11: Website verder bouwen buiten Replit, in `website/` (React + Vite). Open actiepunten staan in `website/LEESMIJ.md`; Claude noemt ze bij elke sessie over de site. Verzonnen projecten en citaten uit Replit zijn vervangen door echte referenties.
- 2026-10-10: Mailhandtekening in J.L. Post-stijl ingesteld in Outlook (logo + contactgegevens).
- 2026-10-09: Skill `mail-concepten`: nieuwe mail → antwoord als concept in Outlook, elk half uur zolang VSCode open staat. Verzenden/doorsturen is technisch geblokkeerd.
- 2026-10-09: ChatGPT werkt via de Codex-extensie in VSCode (ChatGPT-abonnement, geen API-sleutel). Codex leest `AGENTS.md`. Samenwerken via gedeelde bestanden; beelden uit ChatGPT gaan naar `output/<project>/beelden/`.
- 2026-10-09: Mail info@jlpostgroenadvies.nl loopt via Microsoft 365. DNS staat bij TransIP (MX, SPF, autodiscover naar Microsoft). Nog open: DKIM aanzetten en oude TransIP-regels (domainkey, x-transip-mail-auth) opruimen.
- 2026-10-09: Microsoft 365-koppeling actief (mail, agenda, OneDrive, Teams). OneDrive staat ook lokaal gesynchroniseerd.
- 2026-10-09: Mainframe opgezet in C:\Mainframe, VSCode + Claude Code als hub.
- 2026-10-09: Versiebeheer en backup via privé GitHub-repository. `.env`, `bronnen/` en `output/` blijven lokaal.
- 2026-10-09: Microsoft 365 Copilot koppelen via gedeelde OneDrive-werkmap (fase 3).

## Lessen en voorkeuren
- 2026-10-09: Uurtarief hangt af van de opdrachtgever (zie `context/prijzen.md`). Prijzen die Claude zelf vindt eerst als voorstel aan Joris, met bron en datum.
- 2026-10-09: AI-gegenereerde beelden in rapporten altijd met bijschrift "Sfeerimpressie (AI-gegenereerd), geen exacte weergave van het ontwerp".
- 2026-10-09: Mails: aanhef "Beste", altijd u, niet te kort en niet te uitgebreid. Nieuwsbrieven en facturen overslaan; bij opdrachten een bedankmail als concept.
- 2026-10-09: "Groenmast" is een eigen productlijn (groene masten en plantenbakken), geen verschrijving.
