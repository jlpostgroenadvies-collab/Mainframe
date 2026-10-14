# e-Boekhouden.nl – naslag voor de boekhouding

Bron: officiële webinarreeks "Cursus online boekhouden met e-Boekhouden.nl" (6 delen, YouTube, trainer Bart), transcripten doorgenomen op 2026-10-12, plus e-boekhouden.nl (cursus- en FAQ-pagina's). Let op: de webinars zijn enkele jaren oud. Menu-namen kunnen inmiddels iets anders heten, en bedragen uit de video's (zoals kilometervergoeding) zijn verouderd. Bedragen en regels altijd controleren bij de Belastingdienst.

De kennisbank, handleidingen en video's staan achter de knop **Support** in de ingelogde omgeving (niet openbaar). Helpdesk: Support > Contact, of chat (aan te zetten bij Functies aan/uitzetten).

## Basisbegrippen (webinar 1)
- **Balans** = momentopname: links activa (bezittingen), rechts passiva (eigen vermogen + schulden). Totalen altijd gelijk.
- **Winst- en verliesrekening** (= resultatenrekening) = over een periode: opbrengsten min kosten.
- **Debiteur** = klant die mij nog moet betalen. **Crediteur** = leverancier die ik nog moet betalen.
- **Grootboekrubrieken**: 0 = vaste activa/eigen vermogen/lange schulden, 1 = liquide middelen, debiteuren, crediteuren, btw, 2 = tussenrekeningen, 4 = kosten, 8 = omzet.
- Elke boeking krijgt automatisch een **mutatienummer**; boekstuknummer leeg laten.
- Balans, W&V en btw-aangifte rollen er automatisch uit als facturen en bank goed geboekt zijn.

## Eenmalig inrichten (webinar 1 en 2)
1. **Beheer > Instellingen > Functies aan/uitzetten**
   - Uitgebreide btw-codes: **uit** zolang er geen buitenlandse klanten of btw-verlegd zijn (korter keuzemenu, minder fouten). Kan later altijd aan.
   - **Correcties btw-aangifte: aan**: een vergeten bon uit een vorig kwartaal gaat dan automatisch mee in de volgende aangifte.
   - Memoriaalboekingen: aan (nodig voor correcties).
   - Voorraadadministratie: uit (niet nodig voor advieswerk).
2. **Beheer > Inrichting > Grootboekrekeningen**: standaardschema aanpassen. Bijvoorbeeld omzet splitsen in 80xx-rekeningen (advies / ontwerp / Groenmast) en die bundelen via **Rekeninggroepen**. Tweede bankrekening (spaar) = nieuwe rubriek-1-rekening, bijv. 1020.
3. **Bank**: automatische bankkoppeling (Beheer > Instellingen > Koppelingen; meestal kosten per bank, en toestemming geven vanuit de bank), of gratis een **MT940/CSV-bestand** downloaden bij de bank en uploaden via Boekhouden > Invoeren > Importeren, met "dubbele mutaties niet importeren" aangevinkt.
4. **Relaties**: toevoegen (kan via KvK-zoekfunctie of Excel-import). Handig om per leverancier een standaard grootboekrekening in te stellen, plus IBAN.
5. **Beginbalans** (Beheer > Inrichting > Beginbalans): alleen als er al eerder een boekhouding was. Openstaande debiteuren/crediteuren als losse open posten invoeren, dan matchen latere betalingen vanzelf.
6. **Accountant** koppelen: Beheer > Instellingen > Overige > Accountant (gebruikersnaam van de accountant).
7. **Gebruikers** met beperkte rollen mogelijk (bijv. alleen uren of alleen inzien).
8. **Let op**: "Opnieuw beginnen" (Instellingen > Overige) wist alle mutaties.

## Vaste werkwijze per maand/kwartaal (webinar 3)
1. **Alles naar het digitaal archief** (Boekhouden > Digitaal archief). Maak twee mappen: *Te verwerken* en *Verwerkt*. Vullen via uploaden, de **e-Boekhouden-app** (foto van bonnetje) of door facturen te mailen naar het eigen archief-mailadres (staat in de software; leveranciers kun je per relatie toestemming geven om daar direct naartoe te mailen, eventueel met automatisch herkennen).
2. **Factuur boeken**: rechtermuisknop > *Invoeren als mutatie*. Kies *Factuur ontvangen* of *Factuur verstuurd*, relatie, datum, **factuurnummer exact overnemen**, bedrag **inclusief btw**, btw-code, grootboekrekening. Meerdere btw-tarieven op één factuur = *regel toevoegen*. Daarna verplaatsen naar map *Verwerkt*.
3. **Bank importeren**, daarna bij Importeren: **"Alle regels opnieuw automatisch verwerken"**. Een betaling wordt automatisch aan de factuur gekoppeld als het **factuurnummer in de omschrijving** staat en het **bedrag hooguit 5 cent** afwijkt.
4. Wat overblijft: **Handmatig invoeren**, bijvoorbeeld *Geld ontvangen/uitgegeven* zonder factuur, of koppelen aan een open post via het vergrootglas.
5. **Automatische importregels** voor terugkerende posten (bankkosten, vaste opnames, abonnementen): voorwaarde op omschrijving + bedrag(bereik) → grootboekrekening + btw-code.
6. **Controle**: Boekhouden > Overzichten > *Open posten* (wie moet nog betalen, wat moet ik nog betalen), balans, W&V. Vanuit open posten kun je ook herinneringen/aanmaningen sturen.

## Privé en zakelijk (webinar 3 en 4)
- **Eigen geld inbrengen** → Geld ontvangen, geen btw, tegenrekening *Privé opnamen/stortingen* (of beginkapitaal).
- **Leefgeld naar privé** → Geld uitgegeven, geen btw, *Privé opnamen/stortingen*. Heeft geen invloed op de winst.
- **Privé-aankoop met zakelijke pas** → Geld uitgegeven, géén btw, *Privé opnamen/stortingen*, omschrijving met "privé". Geen invloed op W&V en btw.
- **Zakelijke aankoop privé betaald** → bon invoeren als *Factuur ontvangen* met de juiste btw en kostenrekening. Daarna bij Open posten > crediteuren het bedrag **wegboeken** met tegenrekening *Privé opnamen/stortingen*. De btw kun je dan gewoon terugvragen.

## Investeringen en afschrijving (webinar 4)
- Bedrijfsmiddel van **€ 450 of meer** (de grens van de Belastingdienst, controleren of die nog geldt) niet als kosten boeken maar op een **balansrekening** (bijv. Hardware, Inventaris, Vervoermiddelen).
- Daarna **Beheer > Vaste activa > Toevoegen**: groep, aanschafdatum, aanschafwaarde exclusief btw, restwaarde, afschrijving per maand of per jaar, activa- en afschrijvingsrekening. *Afschrijvingen boeken* maakt de memoriaalboekingen.
- De btw op de investering krijg je meteen terug in het kwartaal van de factuurdatum.
- Onder de grens boek je het direct als kosten (bijv. kantoorbenodigdheden).

## Btw-aangifte (webinar 3 en 4)
- Boekhouden > **Aangiftes** > btw-aangifte (per kwartaal): staat automatisch klaar. Het **factuurstelsel** geldt: de factuurdatum telt, niet de betaaldatum.
- Privégebruik kun je handmatig toevoegen.
- *Verwerken in de boekhouding* zet de btw-rekeningen via memoriaalboekingen over naar de rekening-courant btw.
- *Elektronisch versturen* kan als de koppeling met de Belastingdienst actief is. **Betalen doe je zelf.**
- ICP-opgave alleen bij leveringen aan EU-klanten met btw-verlegd.
- **Fouten**: verwijder nooit een mutatie. Corrigeer met een tegenboeking/memoriaalboeking.

## Facturatie, offertes en uren (webinar 5 en 6)
- De facturatiemodule kan facturen, creditfacturen, offertes (met deelfactuur/percentage), abonnementen, sjablonen (eigen briefpapier als pdf-achtergrond) en e-mailsjablonen maken. Facturen worden dan direct geboekt.
- Urenmodule: activiteiten (declarabel ja/nee, tarief, omzetrekening), projecten per relatie, uren per medewerker (ook via de app), **facturen maken uit uren**, overzicht voor het **urencriterium (1.225 uur)**.
- Kilometers: als activiteit "kilometers" bijhouden in de urenmodule. Grootboek: aparte kostenrekening km-vergoeding (privéauto, bedrag per km: actueel tarief bij de Belastingdienst checken; de video noemt nog het oude € 0,19) en eventueel een aparte omzetrekening voor doorberekende km.

## Afspraak voor J.L. Post Groenadvies
- Verkoopfacturen maakt het Mainframe met de skill `factuur` (eigen opmaak, xlsx + pdf). In e-Boekhouden: **pdf uploaden in het digitaal archief en boeken als *Factuur verstuurd* met hetzelfde factuurnummer**. Vraag klanten het factuurnummer in de betaalomschrijving te zetten, dan matcht de bank automatisch.
