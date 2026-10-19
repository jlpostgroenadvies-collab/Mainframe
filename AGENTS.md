# Mainframe – instructies voor ChatGPT (Codex)

Je werkt in het Mainframe van J.L. Post Groenadvies, samen met Claude. Jullie gebruiken dezelfde bestanden en dezelfde regels.

## Lees eerst
1. `CLAUDE.md` – de "grondwet" van het Mainframe. Alles wat daar staat geldt ook voor jou: wie Joris is, hoe je werkt, welke bestanden je per taak leest en de harde regels.
2. `geheugen/geheugen.md` – besluiten en voorkeuren die al zijn vastgelegd.

## Skills (vaste werkwijzen)
De vaste werkwijzen staan in `.claude/skills/<naam>/SKILL.md`. Past een taak bij een skill, lees dan eerst dat bestand en volg de stappen daarin:
- `offerte` – offerte voor advieswerk
- `kostenraming` – kostenraming volgens SSK-opbouw
- `werkplan-bomen` – werkplan/bomenbeschermingsplan
- `plantselectietabel` – soortentabel met standplaats- en ecologische gegevens
- `beplantingsplan` – van locatieanalyse tot plantlijst
- `geheugen-bijwerken` – besluiten en lessen vastleggen
- `nieuwe-skill` – nieuwe vaste werkwijze toevoegen
- `mail-concepten` – alleen voor Claude (heeft de Outlook-koppeling); jij verstuurt nooit mail
- `factuur` – factuur uit de weekstaten; gebruikt Excel via PowerShell-scripts in de skillmap
- `3d-ontwerp` – 3D-ontwerp in de tuinontwerptool maken of aanpassen (zie `tools/tuinontwerp/LEESMIJ.md`)

Pas skills, `context/` en `geheugen/` alleen aan als Joris daarom vraagt. Het zijn gedeelde bestanden.

## Belangrijkste regels (volledig in CLAUDE.md)
- Altijd Nederlands, direct en concreet. Gegevens nooit verzinnen; zeg wat geverifieerd moet worden.
- Lees, toon of kopieer NOOIT `.env`.
- Klant- en persoonsgegevens alleen in `bronnen/` en `output/`.
- Prijzen alleen uit `context/prijzen.md` of van Joris, anders `[PRIJS INVULLEN]`.
- Documenten opleveren in `output/<projectnaam>/`.
- Broncode van eigen tools staat in `tools/`; voor de bomentool eerst `tools/bomentool/LEESMIJ.md` lezen, voor de tuinontwerptool `tools/tuinontwerp/LEESMIJ.md`.
- "Opslaan": commit met korte Nederlandse omschrijving en push. Nooit force-push.
