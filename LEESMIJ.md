# Jouw Mainframe – handleiding

## Hoe gebruik je het
Open VSCode → het Mainframe staat open → klik op het oranje sterretje (Claude Code) en typ gewoon wat je wilt, bijvoorbeeld:
- "Maak een offerte voor een werkplan bomen voor gemeente X, de uitvraag staat in bronnen/X"
- "Verrijk de plantlijst in bronnen/Gouda met strooizouttolerantie"
- "Maak een kostenraming op basis van de hoeveelheden in bronnen/Y"
- "Onthoud dat ik offertes altijd 60 dagen geldig maak"
- "Maak een nieuwe skill voor het beantwoorden van uitvragen"
- "Sla op" → alles wordt naar je privé GitHub gestuurd

## Wat staat waar
| Map/bestand | Wat | Naar GitHub? |
|---|---|---|
| CLAUDE.md | De hoofdinstructies voor Claude | ja |
| context/ | Bedrijfsprofiel, stijl, normen, prijzen, huisstijl | ja |
| geheugen/ | Besluiten, lessen, lopende projecten | ja |
| .claude/skills/ | Vaste werkwijzen | ja |
| bronnen/ | Jouw klantdocumenten en voorbeelden | NEE, blijft lokaal |
| output/ | Wat het Mainframe maakt | NEE, blijft lokaal |
| .env | API-sleutels (ChatGPT) | NEE, nooit |

## Zelf trainen
Je maakt het Mainframe slimmer op drie manieren:
1. **Context aanvullen**: vul de [AANVULLEN]/[INVULLEN]-plekken in `context/` in (vooral `prijzen.md` en `bedrijfsprofiel.md`).
2. **Feedback geven**: zeg wat er beter moet en vraag "leg dit vast" – dan komt het in het geheugen of in de skill.
3. **Nieuwe skills**: zeg "maak een nieuwe skill voor …".

## Skills
offerte · kostenraming · werkplan-bomen · plantselectietabel · beplantingsplan · geheugen-bijwerken · nieuwe-skill

## Fasen
- [x] Fase 1 – Basis, bedrijfsprofiel, eerste skills
- [ ] Fase 2 – Bestaande documenten en huisstijl inlezen, skills aanscherpen
- [ ] Fase 3 – Outlook, agenda en OneDrive-werkmap (Copilot)
- [ ] Fase 4 – ChatGPT-koppeling
- [ ] Fase 5 – Dashboard, marketing en kwekerij-skills
