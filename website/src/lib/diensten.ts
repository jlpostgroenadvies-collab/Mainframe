// Diensten per categorie. Gebruikt door de pagina Diensten en door llms.txt.
export type Dienst = { title: string; description: string };
export type DienstCategorie = { id: string; title: string; services: Dienst[] };

export const categories: DienstCategorie[] = [
  {
    id: "bomen",
    title: "Bomen",
    services: [
      {
        title: "Bomenbeleid en beheer",
        description:
          "Bomenbeleid en beheerplannen opstellen en helpen uitvoeren, en het bomenbestand (inclusief bosopstanden) coördineren: overzicht in wat er staat, wat er nodig is en welke keuzes op lange termijn. Met aandacht voor biodiversiteit, verkoeling en waterberging.",
      },
      {
        title: "Bomen in ruimtelijke projecten",
        description:
          "De belangen van bomen bewaken bij plannen en besluiten, vanaf het eerste ontwerp: advies over behoud van bestaande bomen, soortkeuze en groeiplaats, zodat bomen ook op lange termijn een goede plek hebben.",
      },
      {
        title: "Werkplan bomen en toezicht",
        description:
          "Bij werkzaamheden in de buurt van bomen leg ik vast hoe de bomen worden beschermd: welke maatregelen, waar, en waar de aannemer op moet letten. Op basis van de boominventarisatie, BEA en ecologische quickscan. Tijdens de uitvoering houd ik toezicht dat de afspraken worden nageleefd.",
      },
      {
        title: "Communicatie over bomen",
        description:
          "Uitleg en overleg met bewoners, bestuurders en andere betrokkenen over kap, aanplant en beheer van bomen: helder, onderbouwd en begrijpelijk.",
      },
    ],
  },
  {
    id: "groenadvies",
    title: "Groenadvies",
    services: [
      {
        title: "Controle van (groen)plannen",
        description:
          "Laat een offerte, beplantingsplan of ontwerp van uw hovenier of aannemer onafhankelijk controleren voordat u tekent. Ik beoordeel op vakinhoudelijke juistheid, prijs-kwaliteitverhouding en haalbaarheid, en geef u een helder advies — zonder dat ik zelf belang heb bij de uitvoering. Mijn laagdrempeligste dienst: snel en zonder dat een locatiebezoek nodig is.",
      },
      {
        title: "Advies over klimaatadaptatie en ontharding",
        description:
          "Hittestress, wateroverlast en verdroging vragen om een groene aanpak. Ik adviseer over ontharding, waterberging en klimaatbestendige inrichting van tuin of terrein — praktisch en afgestemd op uw situatie, niet als abstract beleidsstuk.",
      },
      {
        title: "Algemeen groenadvies",
        description:
          "Voor vragen die niet meteen in een vast traject passen: van boomkeuze tot inrichting, van bodemkwaliteit tot regelgeving. Eén gesprek, gericht advies.",
      },
      {
        title: "Kostenramingen groen",
        description:
          "Voorafgaand aan een project inzicht in de kosten? Ik stel hoeveelheden en een onderbouwde kostenraming op voor aanleg, onderhoud of beheer, volgens de SSK-opbouw en met RAW-posten, zodat u niet voor verrassingen komt te staan bij het aanvragen van offertes.",
      },
    ],
  },
  {
    id: "ontwerp",
    title: "Ontwerp",
    services: [
      {
        title: "Technisch ontwerp",
        description:
          "Een uitvoeringsgericht ontwerp met concrete maatvoering, materialisatie en detaillering — de vertaalslag van idee naar realiseerbaar plan, direct bruikbaar voor de hovenier of aannemer die het gaat uitvoeren.",
      },
      {
        title: "Groenontwerp voor openbare ruimte en projectontwikkeling",
        description:
          "Voor ontwikkelaars en opdrachtgevers die groen als volwaardig onderdeel van hun project willen: van eerste schetsontwerp tot een uitgewerkt plan dat aansluit op klimaatadaptatie-eisen en gemeentelijke randvoorwaarden.",
      },
      {
        title: "Beplantingsplan",
        description:
          "Het beplantingsplan vertaalt het ontwerp naar concrete soortkeuze, aantallen en plantafstanden — de basis voor een geslaagde aanplant en een groene ruimte die op de lange termijn standhoudt.",
      },
    ],
  },
  {
    id: "beplanting",
    title: "Beplanting",
    services: [
      {
        title: "Soortkeuze en standplaatsadvies",
        description:
          "De juiste plant op de juiste plek: ik adviseer over soortkeuze op basis van bodem, standplaats, klimaat en gebruiksdoel, zodat beplanting aanslaat en zich goed ontwikkelt. Desgewenst uitgewerkt in een plantselectietabel met per soort de tolerantie voor strooizout en wind en de ecologische waarde.",
      },
      {
        title: "Aanplantbegeleiding en uitzetten van beplanting",
        description:
          "Begeleiding tijdens de uitvoering: van het uitzetten van de beplanting op locatie tot toezicht op correcte aanplant, zodat het plan ook daadwerkelijk wordt uitgevoerd zoals bedoeld.",
      },
      {
        title: "Beplanting bij klimaatadaptatie (verkoeling, wateropvang)",
        description:
          "Gerichte beplantingskeuzes voor verkoeling, schaduw en wateropvang — functioneel groen dat bijdraagt aan een klimaatbestendige omgeving en niet alleen mooi is.",
      },
    ],
  },
  {
    id: "beheerplannen",
    title: "Beheerplannen",
    services: [
      {
        title: "Onderhoudsplanning (eenmalig)",
        description:
          "Een heldere eenmalige onderhoudsplanning voor uw groen: welke werkzaamheden, wanneer en waarom — als basis voor eigen beheer of voor de opdracht aan een hovenier.",
      },
      {
        title: "Meerjarenonderhoudsplan (MJOP)",
        description:
          "Voor wie op lange termijn grip wil houden op kosten en kwaliteit van groen: een MJOP met een overzicht van werkzaamheden en verwachte kosten over meerdere jaren, inzetbaar voor VvE's, opdrachtgevers en beheerders.",
      },
      {
        title: "Beheeradvies voor opdrachtgevers",
        description:
          "Specialistisch advies ter ondersteuning van opdrachtgevers bij complexe beheervraagstukken — als aanvulling op de eigen expertise, niet als vervanging.",
      },
    ],
  },
];

