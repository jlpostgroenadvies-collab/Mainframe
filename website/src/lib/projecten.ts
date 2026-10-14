// Referentieprojecten (bron: context/bedrijfsprofiel.md).
// Foto toevoegen: zet het bestand in public/images/ en vul `image` in, bijv. "/images/koningsweg.jpg".
export type ProjectCategory = "Bomen" | "Beplanting" | "Hoeveelheden en ramingen";

export type Project = {
  id: number;
  title: string;
  client: string;
  category: ProjectCategory;
  description: string;
  image?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Koningsweg",
    client: "Gemeente Utrecht",
    category: "Bomen",
    description: "Werkplan bomen voor werkzaamheden nabij bestaande bomen: maatregelen om de bomen tijdens de uitvoering te beschermen.",
  },
  {
    id: 2,
    title: "Plantselectietabel heesters",
    client: "Gemeente Gouda",
    category: "Beplanting",
    description: "Plantselectietabel van circa 174 heestersoorten, ecologisch verrijkt en gekoppeld aan de doelsoorten per wijk.",
  },
  {
    id: 3,
    title: "Welgelegen en Den Hommel",
    client: "Gemeente Utrecht",
    category: "Beplanting",
    description: "Beplantingslijsten met per soort de tolerantie voor strooizout en wind.",
  },
  {
    id: 4,
    title: "Gagelhof en Gangesdreef",
    client: "Utrecht",
    category: "Hoeveelheden en ramingen",
    description: "Hoeveelheden groen bepaald uit de ontwerptekeningen.",
  },
  {
    id: 5,
    title: "Buurtpuzzel",
    client: "Utrecht",
    category: "Hoeveelheden en ramingen",
    description: "Veldopname van het bestaande groen.",
  },
];
