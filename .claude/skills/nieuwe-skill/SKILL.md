---
name: nieuwe-skill
description: Help Joris een nieuwe vaste werkwijze (skill) aan het Mainframe toe te voegen of een bestaande te verbeteren. Gebruik bij "maak een nieuwe skill", "leer het Mainframe …", "dit wil ik vaker zo doen".
---

# Nieuwe skill maken

1. Interview Joris kort (alles in één bericht):
   - Wat moet de skill doen, en wanneer gebruik je hem (welke woorden zeg je dan)?
   - Welke input is er meestal (documenten, mail, gegevens)?
   - Wat is het eindproduct (formaat, opbouw)?
   - Is er een goed voorbeeld in `bronnen/`?
   - Wat gaat er nu vaak mis of kost veel tijd?
2. Bestaat er al een skill die erop lijkt? Stel dan voor die uit te breiden.
3. Schrijf `.claude/skills/<korte-naam-met-streepjes>/SKILL.md` met:
   - frontmatter `name` en `description` (de description bepaalt wanneer de skill wordt gebruikt: noem de triggerwoorden)
   - benodigde input, stappen, vaste opbouw van het resultaat, regels/valkuilen, opleverformaat en -locatie
4. Voeg de skill toe aan het overzicht in `CLAUDE.md` en `LEESMIJ.md`.
5. Stel voor om hem direct te testen op een echt voorbeeld, en verbeter op basis van Joris' feedback.
6. Vraag of je moet opslaan naar GitHub.
