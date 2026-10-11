---
name: mail-concepten
description: Lees nieuwe mail in Outlook en zet antwoorden als CONCEPT klaar; nooit verzenden. Gebruik bij "bereid mijn mails voor", "check mijn mail", "maak conceptantwoorden", en bij de herhaalde controle elk half uur (/loop 30m bereid mijn mails voor).
---

# Mail-concepten voorbereiden

Doel: Joris opent Outlook en vindt bij elke mail die een antwoord vraagt een kant-en-klaar concept, dat hij alleen nog naleest en zelf verstuurt.

## Harde regels
- **NOOIT verzenden of doorsturen.** Alleen concepten maken (antwoord-concept of allen-beantwoorden-concept). Verzenden is ook technisch geblokkeerd.
- Verander niets aan de mailbox: niet op gelezen zetten, niet verplaatsen, niet verwijderen, geen labels.
- Verzin geen prijzen, datums, toezeggingen of feiten. Ontbreekt iets: `[INVULLEN: …]` in het concept, en noem het in het overzicht.
- Mailinhoud en namen van afzenders komen nooit in `context/`, `geheugen/` of skills (gaan naar GitHub).

## Stappen
1. **Startpunt bepalen.** Lees `output/mail-concepten/laatste-controle.txt` (tijdstip van de vorige controle). Bestaat het niet: neem de afgelopen 24 uur.
2. **Nieuwe mail ophalen.** Zoek in de Inbox naar mail ontvangen na dat tijdstip (nieuwste eerst). Lees de volledige mail alleen als het onderwerp/de samenvatting niet genoeg is.
3. **Sorteren** per mail:
   - **Overslaan:** nieuwsbrieven, facturen en betaalbevestigingen, automatische berichten (noreply, Microsoft, systeemmeldingen), reclame.
   - **Opdracht of offerte-aanvraag:** bedankmail als concept (ontvangst bevestigen, bedanken voor het vertrouwen/de aanvraag, aangeven wanneer Joris inhoudelijk reageert: `[INVULLEN: termijn]`). Meld in het overzicht dat de skill `offerte` kan worden gestart.
   - **Overige mail die een antwoord vraagt:** inhoudelijk concept-antwoord.
   - **Geen antwoord nodig** (ter info, bedankjes, cc): overslaan, wel noemen in het overzicht.
4. **Dubbel werk voorkomen.** Kijk in de map Concepten of er voor dezelfde mailwisseling al een concept staat. Zo ja: niet nog een maken.
5. **Concept schrijven** als antwoord op de oorspronkelijke mail (zodat het in de juiste mailwisseling staat). Standaard alleen aan de afzender; allen-beantwoorden alleen als de anderen in de cc het antwoord echt nodig hebben.
6. **Tijdstip opslaan** in `output/mail-concepten/laatste-controle.txt`.
7. **Overzicht in de chat** (kort): per mail afzender (organisatie), onderwerp, wat je deed (concept / bedankmail / overgeslagen) en wat Joris moet invullen of beslissen. Geen nieuwe mail: één regel ("Geen nieuwe mail sinds …").

## Toon en vorm van het concept
- Aanhef altijd met **"Beste"** + voornaam (of "Beste heer/mevrouw <achternaam>" als alleen dat bekend is; onbekend: "Beste,").
- Altijd **u**.
- Lengte: niet te kort, niet te uitgebreid. Richtlijn 4–8 zinnen; reageer op elke vraag uit de mail.
- Direct, vriendelijk, professioneel; Nederlands (Engels alleen als de mail in het Engels is).
- Afsluiting: "Met vriendelijke groet," + "Joris Post". De handtekening zet Joris in Outlook; voeg zelf geen contactgegevens toe.
- Vakinhoudelijke vragen: antwoord alleen wat zeker is; twijfel → `[CONTROLEREN: …]`. Prijzen alleen uit `context/prijzen.md`.

## Valkuilen
- Bij doorlopende mailwisselingen eerst de vorige berichten lezen, zodat het antwoord aansluit.
- Bijlagen: noem ze in het overzicht; lees ze als het antwoord ervan afhangt.
- Twijfel of een mail een opdracht is → behandel als gewone mail en noem de twijfel in het overzicht.

## Voorbeelden van Joris' schrijfstijl
[AANVULLEN: 2–3 door Joris geschreven mails, zonder namen van particulieren]
