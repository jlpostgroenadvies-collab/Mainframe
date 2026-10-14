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
        title: "Onafhankelijke toets van plannen",
        description:
          "Een onafhankelijke toets van een ontwerp, beplantingsplan, bestek of inschrijving van de aannemer, voordat de gemeente gunt of goedkeurt. Ik beoordeel op vakinhoudelijke juistheid, prijs-kwaliteitverhouding en haalbaarheid. Omdat ik zelf geen belang heb bij de uitvoering, krijgt u een onafhankelijk oordeel. Vaak is een beoordeling op basis van de stukken voldoende, zonder locatiebezoek.",
      },
      {
        title: "Klimaatadaptatie en ontharding",
        description:
          "Advies over ontharding, waterberging en een klimaatbestendige inrichting van straten, pleinen en wijken: praktisch toepasbaar in het project, niet als abstract beleidsstuk. Ook voor groenvragen die niet in een vast traject passen, van bodem en groeiplaats tot regelgeving.",
      },
      {
        title: "Hoeveelheden en kostenramingen",
        description:
          "Hoeveelheden en een onderbouwde kostenraming voor aanleg, onderhoud of beheer, opgebouwd volgens de SSK en met RAW-posten. Zo heeft de gemeente vooraf een betrouwbaar beeld van de kosten, als basis voor budget, bestek en aanbesteding.",
      },
    ],
  },
  {
    id: "ontwerp",
    title: "Ontwerp",
    services: [
      {
        title: "Groenontwerp openbare ruimte",
        description:
          "Van schetsontwerp tot uitgewerkt plan voor straten, pleinen, parken en nieuwe wijken, passend binnen de eisen voor klimaatadaptatie en de gemeentelijke randvoorwaarden. Ook voor ontwikkelaars die groen als volwaardig onderdeel van hun project willen.",
      },
      {
        title: "Technisch ontwerp en beplantingsplan",
        description:
          "Uitwerking tot een uitvoeringsgereed plan: maatvoering, materialisatie en detaillering, en een beplantingsplan met soortkeuze, aantallen en plantafstanden. Direct bruikbaar als basis voor het bestek en de uitvoering.",
      },
    ],
  },
  {
    id: "beplanting",
    title: "Beplanting",
    services: [
      {
        title: "Soortkeuze en plantselectie",
        description:
          "De juiste plant op de juiste plek, op basis van bodem, standplaats, klimaat en gebruik, met gerichte keuzes voor verkoeling, schaduw en wateropvang. Desgewenst uitgewerkt in een plantselectietabel met per soort de tolerantie voor strooizout en wind en de ecologische waarde.",
      },
      {
        title: "Aanplantbegeleiding",
        description:
          "Begeleiding tijdens de uitvoering: het uitzetten van de beplanting op locatie en toezicht op een correcte aanplant door de aannemer, zodat het plan wordt uitgevoerd zoals bedoeld.",
      },
    ],
  },
  {
    id: "beheerplannen",
    title: "Beheerplannen",
    services: [
      {
        title: "Onderhoudsplanning en MJOP",
        description:
          "Een eenmalige onderhoudsplanning of een meerjarenonderhoudsplan (MJOP) voor het groen: welke werkzaamheden, wanneer en tegen welke verwachte kosten. Als basis voor de begroting en voor het bestek van de beheeraannemer.",
      },
      {
        title: "Beheeradvies",
        description:
          "Specialistisch advies bij complexe beheervraagstukken, als aanvulling op de kennis van de eigen beheerorganisatie.",
      },
    ],
  },
];
