// Artikelen voor de Kennisbank. CONCEPT: door Claude geschreven (2026-10-11), Joris leest na vóór publicatie.
// Geen verzonnen cijfers, projecten of citaten; normen alleen noemen als ze geverifieerd zijn.
export type ArtikelAfbeelding = { src: string; alt: string; caption: string };
export type ArtikelSectie = {
  heading?: string;
  paragraphs: string[];
  list?: { label: string; text: string }[];
  after?: string[];
  image?: ArtikelAfbeelding;
};
export type Artikel = { slug: string; title: string; subtitle?: string; summary: string; image?: ArtikelAfbeelding; sections: ArtikelSectie[] };

export const artikelen: Artikel[] = [
  {
    slug: "van-boomplek-naar-boomkroon",
    title: "Van boomplek naar boomkroon",
    subtitle: "Slim bomen kiezen voor de Europese natuurherstelverordening",
    summary:
      "Gemeenten moeten de komende jaren laten zien dat hun groen niet achteruitgaat. Bomen helpen daar het meest bij. Maar een boom die u vandaag plant, is in 2030 nog klein. Daarom is het belangrijk om nu de juiste boom op de juiste plek te zetten.",
    image: {
      src: "/images/kennisbank/bomentool-selectie.jpg",
      alt: "Boomselectietool: bomen filteren op standplaats gazon, plantvak of verharding",
      caption: "De boomselectietool: kies de plek en zie direct welke bomen daar passen.",
    },
    sections: [
      {
        heading: "Wat vraagt Europa?",
        paragraphs: [
          "De Europese natuurherstelverordening is een nieuwe wet voor het herstel van natuur. Een deel van die wet gaat over groen in steden en dorpen. De regel is simpel: tot en met 2030 mag er niet minder groen en niet minder boomkroon zijn dan in 2024. Daarna moet het groen groeien.",
          "Europa meet dat met satellietbeelden. Op die beelden telt de boomkroon: het bladerdak zoals u het van bovenaf ziet.",
          "Het Planbureau voor de Leefomgeving heeft gemeten hoe Nederlandse gemeenten ervoor staan. De eerste uitkomsten laten zien dat ruim de helft van de stedelijke gemeenten te weinig boomkroon heeft. En veel gemeenten die wel genoeg hebben, zitten er maar net boven.",
        ],
      },
      {
        heading: "Waarom is bomen kiezen nu lastiger?",
        paragraphs: [
          "Vroeger was de vraag vooral: welke boom past hier? Nu komt er een vraag bij: hoeveel kroon levert deze boom op, en wanneer? Dat hangt af van drie dingen:",
        ],
        list: [
          { label: "De plek.", text: "Een boom in gras heeft het makkelijker dan een boom in de bestrating. In de bestrating is de grond hard, warm en droog, en komt er vaak strooizout bij." },
          { label: "De ruimte onder de grond.", text: "Een boom wordt maar zo groot als zijn wortels toelaten. Met te weinig goede grond blijft de kroon klein, ook als de soort goed gekozen is." },
          { label: "De groeisnelheid.", text: "Een snelle groeier geeft in 2030 al schaduw. Een langzame groeier pas later, maar die wordt vaak ook ouder. Een goede mix houdt rekening met allebei." },
        ],
      },
      {
        heading: "De boomselectietool",
        paragraphs: [
          "Om die keuzes makkelijker te maken, ontwikkelt J.L. Post Groenadvies een boomselectietool. Die bestaat uit twee delen.",
          "Het eerste deel helpt bij het kiezen van de boom. U geeft aan waar de boom komt: in gras, in een plantvak of in de bestrating. De tool laat dan zien welke bomen daar goed groeien, welke alleen onder voorwaarden, en welke niet. U kunt ook zoeken op grootte, of bijvoorbeeld alleen inheemse bomen tonen. Per boom ziet u hoeveel ruimte de wortels nodig hebben.",
        ],
        image: {
          src: "/images/kennisbank/bomentool-detail.jpg",
          alt: "Detailkaart van de veldesdoorn in de boomselectietool, met geschiktheid per standplaats",
          caption: "Per boom: grootte, herkomst en geschiktheid voor gras, plantvak en bestrating.",
        },
      },
      {
        paragraphs: [
          "Het tweede deel is een ontwerptool op de kaart. U zet bomen op een luchtfoto en ziet direct waar al bomen van de gemeente staan. Per boom kiest u de soort en de groeiplaats: de grond waarin de boom komt te staan. De tool controleert of er genoeg ruimte is voor de wortels.",
          "Ook rekent de tool uit hoeveel boomkroon het plan oplevert: in 2030, in 2040 en als de bomen volgroeid zijn. Zo weet u vooraf of een plan helpt om de Europese doelen te halen. U hoeft niet te wachten tot de satellietbeelden het laten zien. Het ontwerp kunt u afdrukken als tekening op schaal, met de hoeveelheden die u moet bestellen.",
        ],
        image: {
          src: "/images/kennisbank/bomentool-ontwerp.jpg",
          alt: "Ontwerptool: vijf bomen op een luchtfoto langs een fietspad, met rechts de groeiplaats van de geselecteerde boom",
          caption: "De ontwerptool: bomen plaatsen op de luchtfoto en per boom de groeiplaats uitwerken.",
        },
      },
      {
        heading: "Meer dan vierkante meters",
        paragraphs: [
          "De wet telt vierkante meters. Maar een gemeente wil meer van haar bomen. Twee bomen met dezelfde kroon kunnen heel verschillend bijdragen aan de stad. Daarom laat de tool per boom ook zijn pluspunten zien, bijvoorbeeld:",
        ],
        list: [
          { label: "Voor bijen en vlinders:", text: "een hoge nectar- of pollenwaarde, of een boom waar de rupsen van vlinders van leven." },
          { label: "Voor vogels:", text: "vruchten en zaden als voedsel, en een kroon om in te nestelen." },
          { label: "Voor de lucht:", text: "het vastleggen van CO₂ en het afvangen van fijnstof." },
          { label: "Voor het klimaat:", text: "verkoeling en schaduw op hete dagen, en hulp bij het opvangen van regenwater." },
        ],
        after: [
          "Zo kiest u niet alleen een boom die past en genoeg kroon geeft, maar ook een boom die iets extra's doet voor de wijk. Bij elk pluspunt staat waar de informatie vandaan komt. Zo kunt u de keuze ook uitleggen aan bewoners en bestuurders.",
          "Daarnaast kijkt de tool naar de plek, de ruimte onder de grond en de herkomst van de boom. Zo staan er over vijftig jaar nog gezonde bomen.",
        ],
      },
      {
        heading: "Onderdeel van de Vergroeningsscan",
        paragraphs: [
          "De boomselectietool hoort bij de Vergroeningsscan. Daarmee helpt J.L. Post Groenadvies gemeenten om te bepalen waar ze kunnen vergroenen en wat ze daar het beste kunnen planten.",
          "Wilt u weten wat dit voor uw gemeente betekent? Neem contact op met Joris Post: 06 2982 6760 of info@jlpostgroenadvies.nl.",
          "Bronnen: Verordening (EU) 2024/1991, artikel 8; Planbureau voor de Leefomgeving (2026), nulmeting stedelijk groen.",
        ],
      },
    ],
  },
  {
    slug: "werkplan-bomen-bij-werkzaamheden",
    title: "Werken bij bomen: waarom een werkplan bomen loont",
    summary:
      "Bij de herinrichting van een straat raken bomen vaak pas laat in beeld. Een werkplan bomen legt vooraf vast hoe ze worden beschermd, zodat de schade van vandaag geen kap van over vijf jaar wordt.",
    sections: [
      {
        paragraphs: [
          "Schade aan bomen bij werkzaamheden is zelden direct zichtbaar. Een afgegraven wortelpakket, een bouwkeet op de groeiplaats of een kraan die tegen de stam stoot: de boom staat er na afloop nog, maar gaat in de jaren daarna achteruit. Als de oorzaak dan duidelijk wordt, is het project allang afgerond en zijn herstelmaatregelen niet meer mogelijk.",
        ],
      },
      {
        heading: "Wat staat er in een werkplan bomen?",
        paragraphs: [
          "Een werkplan bomen vertaalt de bevindingen uit de boominventarisatie, de bomeneffectanalyse (BEA) en de ecologische quickscan naar concrete afspraken voor de uitvoering. Per boom of boomgroep staat beschreven welke zone beschermd moet worden, welke werkzaamheden daarbinnen wel en niet mogen, en welke maatregelen de aannemer neemt: bijvoorbeeld een vaste boomafscherming, rijplaten om verdichting te voorkomen, handmatig of zuigend graven bij kabels en leidingen, of wortelbegeleiding bij een nieuwe verharding.",
          "Daarnaast legt het werkplan vast wie waarvoor verantwoordelijk is, wanneer de boomspecialist wordt ingeschakeld (bijvoorbeeld als er onverwacht dikke wortels worden aangetroffen) en hoe afwijkingen worden gemeld en vastgelegd.",
        ],
      },
      {
        heading: "Afspraken op papier zijn niet genoeg",
        paragraphs: [
          "Het beste werkplan werkt alleen als het op de bouwplaats bekend is. Daarom hoort er een startoverleg bij met de uitvoerder, en toezicht op de momenten die er voor de bomen toe doen: het plaatsen van de afscherming, graafwerk binnen de beschermingszone en het opleveren. Leg die momenten vooraf vast in het bestek of de opdracht, dan zijn ze ook in planning en begroting meegenomen.",
        ],
      },
      {
        heading: "Begin vroeg",
        paragraphs: [
          "Hoe eerder de bomen in het ontwerp worden meegenomen, hoe goedkoper de bescherming. Een kabeltracé dat een paar meter verschuift kost in de ontwerpfase weinig; dezelfde wijziging tijdens de uitvoering kost tijd, geld en vaak alsnog een boom. Een werkplan bomen is daarom het sluitstuk van een traject dat bij het eerste schetsontwerp begint.",
        ],
      },
    ],
  },
  {
    slug: "plantkeuze-strooizout-en-wind",
    title: "De juiste plant op de juiste plek: verder kijken dan het plantvak",
    summary:
      "Een beplanting die het eerste jaar mooi staat, is nog geen geslaagde beplanting. Strooizout, wind, droogte en beheer bepalen of het plan over tien jaar nog overeind staat.",
    sections: [
      {
        paragraphs: [
          "Bij het kiezen van beplanting voor de openbare ruimte ligt de nadruk vaak op beeld: bloei, bladkleur, hoogte. Dat is belangrijk, maar de standplaats beslist uiteindelijk of een soort het redt. Een plantvak langs een doorgaande weg krijgt elke winter strooizout over zich heen, een open plein of dijkrand vangt veel wind, en een verhoogde plantenbak droogt in de zomer snel uit.",
        ],
      },
      {
        heading: "Een plantselectietabel als hulpmiddel",
        paragraphs: [
          "Een plantselectietabel zet per soort de eigenschappen naast elkaar die voor de locatie tellen: bodem en vocht, licht, tolerantie voor strooizout en wind, uiteindelijke maat, beheer en ecologische waarde. Zo wordt de keuze controleerbaar en kunnen ontwerper, beheerder en kweker vanuit dezelfde gegevens werken.",
          "Belangrijk is dat elke kolom een herkenbare bron heeft. Gegevens over zouttolerantie of ecologische waarde lopen tussen bronnen soms uiteen; het is beter dat zichtbaar te maken dan één getal als zekerheid te presenteren.",
        ],
      },
      {
        heading: "Ecologie meewegen",
        paragraphs: [
          "Steeds meer gemeenten willen dat beplanting ook bijdraagt aan biodiversiteit: nectar en stuifmeel voor bestuivers, bessen voor vogels, waardplanten voor vlinders. Door de ecologische waarde per soort op te nemen en te koppelen aan de doelsoorten van een wijk of gebied, wordt vergroening meer dan het vullen van plantvakken.",
        ],
      },
      {
        heading: "Denk aan het beheer",
        paragraphs: [
          "Een soort die alleen gedijt met intensief onderhoud past niet in een beheerbestek dat daar niet op is ingericht. Stem de plantkeuze daarom af op het beheerniveau dat er werkelijk is, en leg in het plan vast wat er de eerste jaren na aanplant nodig is om de beplanting goed te laten aanslaan.",
        ],
      },
    ],
  },
  {
    slug: "groeiplaats-stadsboom",
    title: "Een stadsboom begint onder de grond",
    summary:
      "Of een boom in de stad oud wordt, hangt vooral af van wat u niet ziet: de ruimte voor wortels, water en lucht. Wie dat in het ontwerp regelt, hoeft later minder te repareren.",
    sections: [
      {
        paragraphs: [
          "In de stad delen bomen hun ondergrond met kabels, leidingen, funderingen en verharding. Vaak blijft er voor de wortels weinig over: een plantgat in verdichte grond, omringd door asfalt en klinkers. De boom slaat aan, groeit een aantal jaren en blijft dan steken. Opdrukkende verharding en een kwijnende kroon zijn het gevolg.",
        ],
      },
      {
        heading: "Ruimte, water en lucht",
        paragraphs: [
          "Een boom heeft voldoende doorwortelbare grond nodig die niet verdicht is, water vasthoudt en tegelijk lucht doorlaat. Onder verharding kan dat met constructies die de last van verkeer dragen en de grond eronder vrijhouden, zoals bomengranulaat of ondergrondse kratsystemen. Welke oplossing past, hangt af van de beschikbare ruimte, de belasting en het budget.",
          "Steeds vaker wordt de groeiplaats gecombineerd met waterberging: regenwater van de verharding wordt naar de boom geleid in plaats van naar het riool. Dat helpt de boom in droge perioden en ontlast het rioolstelsel bij hevige buien.",
        ],
      },
      {
        heading: "De juiste boom voor de ruimte",
        paragraphs: [
          "Niet elke boom past op elke plek. Kies een soort waarvan de uiteindelijke kroon en het wortelstelsel passen bij de beschikbare ruimte, en die bestand is tegen de omstandigheden ter plaatse, zoals strooizout, hitte en droogte. Een boom die passend is gekozen hoeft later niet steeds teruggesnoeid of vervangen te worden.",
        ],
      },
      {
        heading: "Vroeg aan tafel",
        paragraphs: [
          "Ondergrondse ruimte wordt in een project vroeg verdeeld, meestal bij het kabels-en-leidingenontwerp. Zit de boomspecialist daar niet aan tafel, dan blijft er voor de boom vaak alleen over wat niemand anders nodig had. Neem de groeiplaats daarom vanaf het schetsontwerp mee als volwaardig onderdeel van de inrichting.",
        ],
      },
    ],
  },
];
