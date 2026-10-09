---
name: plantselectietabel
description: Maak of verrijk een plantselectietabel (bomen, heesters, vaste planten) met standplaats-, tolerantie- en ecologische gegevens, met bronvermelding per kolom. Gebruik bij "plantlijst", "soortentabel", "plantselectie", "verrijk de lijst met …".
---

# Plantselectietabel

## Vaste kolommen (in deze volgorde)
Wetenschappelijke naam | Nederlandse naam | Type (boom/heester/vaste plant) | Inheems (ja/nee/ingeburgerd) | Hoogte (m) | Breedte (m) | Licht | Bodem | Vocht | Strooizouttolerantie | Windtolerantie | Bloeitijd (maanden) | Bloeikleur | Nectarwaarde | Pollenwaarde | Waarde vogels | Waarde insecten | Opmerkingen | Bronnen

## Werkwijze
1. Bestaande tabel in `bronnen/` als basis gebruiken; structuur en opmaak van Joris aanhouden als die afwijkt.
2. Waarden alleen uit erkende bronnen (zie `context/normen-en-bronnen.md`). Per waarde de bron vastleggen (kolom Bronnen of opmerking per cel).
3. Onbekend = "onbekend". Nooit invullen op gevoel. Bronnen die elkaar tegenspreken: beide noemen.
4. Wetenschappelijke namen controleren op actuele schrijfwijze; cultivars tussen enkele aanhalingstekens.
5. Alfabetisch sorteren op wetenschappelijke naam, consistente opmaak over alle tabbladen.
6. Optioneel tabblad "Bloeiboog": per soort de bloeimaanden als balk (jan–dec).
7. Opleveren als .xlsx in `output/<project>/`, met kopregel vastgezet en filters aan.
8. Sluit af met: aantal soorten, hoeveel cellen "onbekend", gebruikte bronnen.
