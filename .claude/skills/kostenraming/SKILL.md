---
name: kostenraming
description: Maak een kostenraming voor aanleg of renovatie van groen/bomen in de openbare ruimte, opgebouwd volgens SSK met RAW-achtige posten. Gebruik bij "raming", "kostenraming", "begroting", "hoeveelheden en prijzen".
---

# Kostenraming (SSK-opbouw)

## Benodigd
- Ontwerp/tekening of hoeveelhedenstaat (in `bronnen/<project>/`)
- Fase van de raming (schets / VO / DO / bestek) – bepaalt nauwkeurigheid en hoogte van "onvoorzien"
- Peildatum prijzen

## Werkwijze
1. Lees `context/prijzen.md` en `context/normen-en-bronnen.md`.
2. Hoeveelheden: neem ze over uit de bron of bereken ze, en vermeld per post de herkomst (tekening, opname, aanname). Uit PDF-tekeningen gemeten: noem schaal en methode.
3. Indeling in hoofdstukken, bijvoorbeeld: voorbereidende werkzaamheden / grondwerk / verhardingen / beplanting (bomen, heesters, vaste planten, gras) / boomvoorzieningen / onderhoud en aanslaggarantie.
4. Per post: code, omschrijving, hoeveelheid, eenheid, eenheidsprijs, totaal. Eenheidsprijs alleen uit `prijzen.md` of opgegeven door Joris, anders `[PRIJS INVULLEN]`.
5. Staart volgens SSK: directe bouwkosten → indirecte kosten (AK, W&R) → engineering/toezicht → onvoorzien → totaal excl. btw → btw 21% apart.
6. Opleveren als .xlsx met ECHTE formules (geen vaste getallen), tabblad "Raming", tabblad "Uitgangspunten", tabblad "Hoeveelheden-bron".
7. Controleer: optellingen kloppen, eenheden consistent (m², m¹, st), geen dubbele posten.
8. Sluit af met totaal, onzekerheden en ontbrekende prijzen.
