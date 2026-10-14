const ExcelJS = require('exceljs');
const out = process.argv[2];

// [wetenschappelijke naam, Nederlandse naam, inheems, grootte, gazon, plantvak, verharding, aandachtspunten]
const bomen = [
  ["Acer campestre", "Veldesdoorn", "ja", "2e", "ja", "ja", "ja", "Breed inzetbaar; voor verharding bij voorkeur smalle cultivar ('Elsrijk')."],
  ["Acer campestre 'Elsrijk'", "Veldesdoorn", "ja (cultivar)", "2e", "ja", "ja", "ja", "Compacte, regelmatige kroon; veel gebruikt als straatboom."],
  ["Acer platanoides", "Noorse esdoorn", "nee", "1e", "ja", "ja", "beperkt", "Oppervlakkige beworteling en honingdauw; in verharding alleen met ruime groeiplaats."],
  ["Acer pseudoplatanus", "Gewone esdoorn", "ingeburgerd", "1e", "ja", "beperkt", "beperkt", "Honingdauw en veel zaailingen; zaailingen lastig in plantvakken."],
  ["Alnus cordata", "Italiaanse els", "nee", "1e", "ja", "ja", "ja", "Verdraagt droogte en verdichting beter dan inheemse els."],
  ["Alnus glutinosa", "Zwarte els", "ja", "1e", "ja", "beperkt", "nee", "Voor vochtige, natte plekken (oevers, wadi's)."],
  ["Alnus × spaethii", "Els (hybride)", "nee", "2e", "ja", "ja", "ja", "Snelle groeier, vroege bloei (stuifmeel)."],
  ["Amelanchier arborea 'Robin Hill'", "Krentenboompje", "nee", "3e", "ja", "ja", "beperkt", "Als stamvorm in brede verharding mogelijk; meerstammig vooral in plantvak/gazon."],
  ["Betula pendula", "Ruwe berk", "ja", "1e", "ja", "ja", "beperkt", "Lichte kroon, goed boven onderbeplanting; gevoelig voor droogte in verharding; hooikoorts."],
  ["Carpinus betulus", "Haagbeuk", "ja", "1e", "ja", "ja", "ja", "Verdraagt schaduw en snoei; zuilvormen ('Fastigiata', 'Frans Fontaine') voor smalle straten."],
  ["Carpinus betulus 'Frans Fontaine'", "Haagbeuk", "ja (cultivar)", "2e", "ja", "ja", "ja", "Smal zuilvormig; geschikt bij weinig bovengrondse ruimte."],
  ["Celtis australis", "Zuidelijke netelboom", "nee", "1e", "ja", "ja", "ja", "Hitte- en droogtetolerant (klimaatboom); jonge bomen vorstgevoelig."],
  ["Cercis siliquastrum", "Judasboom", "nee", "3e", "ja", "ja", "beperkt", "Bloeit op oud hout; warme, beschutte plek."],
  ["Corylus colurna", "Boomhazelaar", "nee", "1e", "ja", "ja", "ja", "Regelmatige kegelvormige kroon; verdraagt droogte en verharding."],
  ["Crataegus monogyna", "Eenstijlige meidoorn", "ja", "3e", "ja", "ja", "beperkt", "Hoge ecologische waarde; doorns; gevoelig voor bacterievuur."],
  ["Crataegus × lavallei 'Carrierei'", "Meidoorn", "nee", "3e", "ja", "ja", "ja", "Weinig doorns; robuust in verharding; bacterievuur."],
  ["Fagus sylvatica", "Beuk", "ja", "1e", "ja", "nee", "nee", "Gevoelig voor verdichting, ophoging en zon op de stam; alleen ruim in gazon/park."],
  ["Fraxinus ornus", "Pluimes", "nee", "2e", "ja", "ja", "ja", "Droogtetolerant; opvallende bloei voor insecten; minder gevoelig voor essentaksterfte dan F. excelsior (controleren)."],
  ["Ginkgo biloba (mannelijke klonen)", "Japanse notenboom", "nee", "1e", "ja", "ja", "ja", "Zeer robuust; alleen mannelijke klonen (vruchten van vrouwelijke bomen stinken); trage start."],
  ["Gleditsia triacanthos f. inermis 'Skyline'", "Valse christusdoorn", "nee", "1e", "ja", "ja", "ja", "Lichte kroon (gras/onderbeplanting groeit door); doornloos; droogtetolerant."],
  ["Koelreuteria paniculata", "Gele zeepboom", "nee", "3e", "ja", "ja", "ja", "Zomerbloei voor insecten; hitte- en droogtetolerant."],
  ["Liquidambar styraciflua", "Amberboom", "nee", "1e", "ja", "ja", "beperkt", "Vruchtval (stekelige bollen) op verharding; chlorose op kalkrijke grond."],
  ["Liriodendron tulipifera", "Tulpenboom", "nee", "1e", "ja", "beperkt", "nee", "Heeft ruime, onverdichte groeiplaats nodig."],
  ["Malus sylvestris", "Wilde appel", "ja", "3e", "ja", "ja", "nee", "Hoge ecologische waarde; vruchtval op verharding."],
  ["Malus 'Evereste'", "Sierappel", "nee", "3e", "ja", "ja", "beperkt", "Kleine vruchten blijven lang hangen; schurftresistent (controleren)."],
  ["Metasequoia glyptostroboides", "Watercipres", "nee", "1e", "ja", "beperkt", "nee", "Ruimte en vocht nodig; parken en waterkanten."],
  ["Ostrya carpinifolia", "Hopbeuk", "nee", "2e", "ja", "ja", "ja", "Droogtetolerant alternatief voor haagbeuk."],
  ["Parrotia persica", "Perzisch ijzerhout", "nee", "3e", "ja", "ja", "beperkt", "Brede, vaak meerstammige groei; herfstkleur."],
  ["Platanus × hispanica", "Gewone plataan", "nee", "1e", "ja", "beperkt", "ja", "Zeer groot: alleen bij veel boven- en ondergrondse ruimte; massariaziekte."],
  ["Prunus avium", "Zoete kers", "ja", "1e", "ja", "ja", "nee", "Oppervlakkige wortels geven opdruk in verharding."],
  ["Prunus 'Umineko'", "Japanse sierkers", "nee", "3e", "ja", "ja", "beperkt", "Smalle opgaande kroon; vroege bloei."],
  ["Pyrus calleryana 'Chanticleer'", "Sierpeer", "nee", "2e", "ja", "ja", "ja", "Smal-piramidaal; zeer stadsbestendig; kans op takbreuk bij oudere bomen."],
  ["Quercus cerris", "Moseik", "nee", "1e", "ja", "beperkt", "ja", "Droogte- en hittetolerant; eikenprocessierups."],
  ["Quercus frainetto", "Hongaarse eik", "nee", "1e", "ja", "beperkt", "ja", "Klimaatbestendig; eikenprocessierups."],
  ["Quercus palustris", "Moeraseik", "nee", "1e", "ja", "beperkt", "beperkt", "Chlorose op kalkrijke grond; lage takken."],
  ["Quercus petraea", "Wintereik", "ja", "1e", "ja", "beperkt", "beperkt", "Hoge ecologische waarde; eikenprocessierups."],
  ["Quercus robur", "Zomereik", "ja", "1e", "ja", "beperkt", "beperkt", "Zeer hoge ecologische waarde; veel ruimte nodig; eikenprocessierups."],
  ["Quercus robur 'Fastigiata'", "Zuileik", "ja (cultivar)", "1e", "ja", "ja", "ja", "Smalle kroon, geschikt voor smalle profielen."],
  ["Robinia pseudoacacia", "Witte acacia", "ingeburgerd", "1e", "ja", "ja", "ja", "Droogtetolerant, drachtplant; verwildert, niet bij natuurgebieden; brosse takken."],
  ["Salix alba", "Schietwilg", "ja", "1e", "ja", "nee", "nee", "Natte plekken en waterkanten; snel groeiend, takbreuk."],
  ["Sorbus aria", "Meelbes", "nee", "2e", "ja", "ja", "ja", "Verdraagt wind en droogte."],
  ["Sorbus aucuparia", "Wilde lijsterbes", "ja", "2e", "ja", "ja", "beperkt", "Hoge waarde voor vogels; minder goed bestand tegen hitte en verdichting."],
  ["Sorbus intermedia", "Zweedse meelbes", "nee", "2e", "ja", "ja", "ja", "Verdraagt wind, zout en verharding goed."],
  ["Sorbus torminalis", "Elsbes", "ja", "2e", "ja", "ja", "beperkt", "Zeldzaam inheems; goede ecologische waarde."],
  ["Styphnolobium japonicum", "Honingboom", "nee", "1e", "ja", "ja", "ja", "Late zomerbloei, waardevol voor bijen; hittetolerant."],
  ["Taxodium distichum", "Moerascipres", "nee", "1e", "ja", "beperkt", "beperkt", "Verdraagt natte voeten (wadi's) én droogte."],
  ["Tetradium daniellii", "Bijenboom", "nee", "3e", "ja", "ja", "beperkt", "Zeer late bloei, belangrijke drachtplant."],
  ["Tilia cordata", "Winterlinde", "ja", "1e", "ja", "ja", "ja", "Breed inzetbaar; honingdauw; voor verharding cultivars ('Greenspire', 'Rancho')."],
  ["Tilia × europaea 'Pallida'", "Hollandse linde", "nee", "1e", "ja", "beperkt", "ja", "Klassieke laanboom; stamopslag."],
  ["Tilia platyphyllos", "Zomerlinde", "ja", "1e", "ja", "beperkt", "beperkt", "Veel ruimte nodig; honingdauw."],
  ["Tilia tomentosa 'Brabant'", "Zilverlinde", "nee", "1e", "ja", "ja", "ja", "Droogtetolerant, nauwelijks honingdauw."],
  ["Ulmus 'Columella'", "Iep", "nee", "1e", "ja", "ja", "ja", "Smalle zuilvorm; iepziekteresistent (resistentie per kloon controleren)."],
  ["Ulmus 'Lobel'", "Iep", "nee", "1e", "ja", "ja", "ja", "Smal opgaand; iepziekteresistent."],
  ["Ulmus laevis", "Fladderiep", "ja", "1e", "ja", "beperkt", "beperkt", "Weinig vatbaar voor iepziekte; verdraagt natte grond."],
  ["Zelkova serrata", "Japanse zelkova", "nee", "1e", "ja", "ja", "ja", "Vaasvormige kroon; stadsbestendig."],
  // Aanvulling 12-10-2026: cultivars en minder gangbare soorten
  ["Acer campestre 'Huibers Elegant'", "Veldesdoorn", "ja (cultivar)", "2e", "ja", "ja", "ja", "Smal opgaande kroon; geschikt voor smalle straatprofielen."],
  ["Acer monspessulanum", "Franse esdoorn", "nee", "3e", "ja", "ja", "ja", "Zeer droogte- en hittetolerant; klein blad, compacte kroon."],
  ["Carpinus betulus 'Lucas'", "Haagbeuk", "ja (cultivar)", "2e", "ja", "ja", "ja", "Smal zuilvormig, blijft smaller dan 'Fastigiata'."],
  ["Celtis occidentalis", "Netelboom", "nee", "1e", "ja", "ja", "ja", "Winterharder dan C. australis; robuust in verharding."],
  ["Cladrastis kentukea", "Geelhout", "nee", "2e", "ja", "ja", "beperkt", "Geurende witte bloei voor insecten; takken soms zwak aangehecht."],
  ["Cornus mas", "Gele kornoelje", "nee (ingeburgerd, controleren)", "3e", "ja", "ja", "beperkt", "Zeer vroege bloei (belangrijk voor vroege bijen); vruchten voor vogels; als stamvorm of meerstammig."],
  ["Crataegus prunifolia 'Splendens'", "Meidoorn", "nee", "3e", "ja", "ja", "ja", "Glanzend blad, herfstkleur; doorns; bacterievuur."],
  ["Eucommia ulmoides", "Chinese rubberboom", "nee", "2e", "ja", "ja", "ja", "Zeer robuust; weinig ziekten en plagen; onbekendere soort."],
  ["Fraxinus ornus 'Meczek'", "Pluimes", "nee", "3e", "ja", "ja", "ja", "Compacte bolvormige kroon; voor smalle plekken."],
  ["Ginkgo biloba 'Princeton Sentry'", "Japanse notenboom", "nee", "1e", "ja", "ja", "ja", "Mannelijke, smal opgaande cultivar."],
  ["Gymnocladus dioicus", "Doodsbeenderenboom", "nee", "1e", "ja", "ja", "ja", "Robuust en droogtetolerant; lichte kroon, laat in blad; vrouwelijke bomen geven peulen (mannelijke kiezen)."],
  ["Liquidambar styraciflua 'Slender Silhouette'", "Amberboom", "nee", "1e", "ja", "ja", "beperkt", "Zeer smalle zuilvorm; wel vruchtval; chlorose op kalkrijke grond."],
  ["Liquidambar styraciflua 'Worplesdon'", "Amberboom", "nee", "2e", "ja", "ja", "beperkt", "Goede herfstkleur; vruchtval; chlorose op kalkrijke grond."],
  ["Liriodendron tulipifera 'Fastigiatum'", "Tulpenboom", "nee", "1e", "ja", "ja", "beperkt", "Zuilvorm; ruime onverdichte groeiplaats nodig."],
  ["Magnolia kobus", "Magnolia", "nee", "3e", "ja", "ja", "nee", "Vroege bloei; vlezige wortels, gevoelig voor verdichting."],
  ["Malus trilobata", "Sierappel", "nee", "3e", "ja", "ja", "ja", "Smal piramidaal; esdoornachtig blad; weinig vruchtval."],
  ["Mespilus germanica", "Mispel", "ingeburgerd", "3e", "ja", "ja", "nee", "Brede lage kroon; bloei en vruchten voor insecten en vogels."],
  ["Nyssa sylvatica", "Tupeloboom", "nee", "2e", "ja", "ja", "beperkt", "Uitzonderlijke herfstkleur; voorkeur zure grond; lastig verplantbaar."],
  ["Parrotia persica 'Vanessa'", "Perzisch ijzerhout", "nee", "3e", "ja", "ja", "ja", "Smaller en opgaander dan de soort; als stamvorm in verharding."],
  ["Platanus × hispanica 'Tremonia'", "Plataan", "nee", "1e", "ja", "beperkt", "ja", "Smaller opgaand dan de soort, wel groot."],
  ["Prunus padus 'Albertii'", "Vogelkers", "ja (cultivar)", "2e", "ja", "ja", "ja", "Regelmatige kroon, rijke bloei; stadsbestendiger dan de soort; spinselmot."],
  ["Ptelea trifoliata", "Lederboom", "nee", "3e", "ja", "ja", "beperkt", "Geurende bloei voor insecten; kleine boom voor plantvakken."],
  ["Pterocarya fraxinifolia", "Kaukasische vleugelnoot", "nee", "1e", "ja", "nee", "nee", "Groot, voor natte plekken; vormt veel wortelopslag."],
  ["Pyrus communis 'Beech Hill'", "Sierpeer", "nee", "2e", "ja", "ja", "ja", "Smal opgaand; kleine vruchten; robuust."],
  ["Quercus palustris 'Green Pillar'", "Zuilmoeraseik", "nee", "1e", "ja", "ja", "ja", "Smalle zuil (ook als 'Pringreen' bekend, controleren); chlorose op kalkrijke grond."],
  ["Quercus robur 'Koster'", "Zuileik", "ja (cultivar)", "1e", "ja", "ja", "ja", "Smalle zuilvorm, minder meeldauw dan 'Fastigiata' (controleren)."],
  ["Sorbus aucuparia 'Sheerwater Seedling'", "Lijsterbes", "ja (cultivar)", "2e", "ja", "ja", "beperkt", "Smal opgaand; bessen voor vogels."],
  ["Sorbus × thuringiaca 'Fastigiata'", "Lijsterbes (hybride)", "nee", "2e", "ja", "ja", "ja", "Compact opgaand; stadsbestendig."],
  ["Styphnolobium japonicum 'Regent'", "Honingboom", "nee", "1e", "ja", "ja", "ja", "Regelmatiger kroon en eerder bloeiend dan de soort."],
  ["Tilia cordata 'Greenspire'", "Winterlinde", "ja (cultivar)", "1e", "ja", "ja", "ja", "Regelmatige kegelvormige kroon; veel gebruikte straatboom."],
  ["Tilia cordata 'Rancho'", "Winterlinde", "ja (cultivar)", "2e", "ja", "ja", "ja", "Compact, kleinbladig; voor smallere straten."],
  ["Ulmus 'New Horizon'", "Iep", "nee", "1e", "ja", "ja", "ja", "Iepziekteresistent; smal opgaande kroon."],
  ["Zelkova serrata 'Green Vase'", "Japanse zelkova", "nee", "1e", "ja", "ja", "ja", "Vaasvorm, opgaander dan de soort."],
];

const uitgesloten = [
  ["Ailanthus altissima", "Hemelboom", "Invasieve exoot op de Unielijst (EU-verordening 1143/2014): niet aanplanten."],
  ["Fraxinus excelsior", "Gewone es", "Essentaksterfte; voorlopig niet aanplanten (eventueel tolerante selecties volgen)."],
  ["Aesculus hippocastanum", "Witte paardenkastanje", "Kastanjebloedingsziekte."],
  ["Acer saccharinum", "Zilveresdoorn", "Brosse takken, takbreuk."],
  ["Populus × canadensis (cultivars)", "Canadapopulier", "Takbreuk en wortelopdruk; korte levensduur in de stad."],
];

(async () => {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'J.L. Post Groenadvies';
  const kop = { font: { bold: true, color: { argb: 'FFFFFFFF' } }, fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4A8F22' } } };
  const licht = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEEF7E8' } };
  const kleur = { ja: 'FFC6EFCE', beperkt: 'FFFFEB9C', nee: 'FFF4C7C3' };

  const ws = wb.addWorksheet('Bomenlijst', { views: [{ state: 'frozen', ySplit: 1, xSplit: 1 }] });
  ws.columns = [
    { header: 'Wetenschappelijke naam', width: 38 },
    { header: 'Nederlandse naam', width: 24 },
    { header: 'Inheems', width: 14 },
    { header: 'Grootte', width: 9 },
    { header: 'Gazon', width: 10 },
    { header: 'Plantvak', width: 10 },
    { header: 'Verharding', width: 11 },
    { header: 'Aandachtspunten', width: 70 },
    { header: 'Status', width: 26 },
  ];
  bomen.sort((a, b) => a[0].localeCompare(b[0]));
  bomen.forEach((r, i) => {
    const row = ws.addRow([...r, 'Concept – toetsen door Joris']);
    row.getCell(1).font = { italic: true };
    row.getCell(8).alignment = { wrapText: true, vertical: 'top' };
    if (i % 2) [1, 2, 3, 4, 8, 9].forEach(c => row.getCell(c).fill = licht);
    [5, 6, 7].forEach(c => {
      row.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: kleur[row.getCell(c).value] } };
      row.getCell(c).alignment = { horizontal: 'center' };
    });
  });
  ws.getRow(1).eachCell(c => { c.font = kop.font; c.fill = kop.fill; });
  ws.autoFilter = { from: 'A1', to: 'I1' };
  [5, 6, 7].forEach(c => {
    ws.dataValidations.add(`${String.fromCharCode(64 + c)}2:${String.fromCharCode(64 + c)}500`,
      { type: 'list', allowBlank: true, formulae: ['"ja,beperkt,nee"'] });
  });

  const wu = wb.addWorksheet('Niet aanbevolen', { views: [{ state: 'frozen', ySplit: 1 }] });
  wu.columns = [{ header: 'Wetenschappelijke naam', width: 34 }, { header: 'Nederlandse naam', width: 24 }, { header: 'Reden', width: 80 }];
  uitgesloten.forEach(r => wu.addRow(r).getCell(1).font = { italic: true });
  wu.getRow(1).eachCell(c => { c.font = kop.font; c.fill = kop.fill; });

  const wt = wb.addWorksheet('Toelichting');
  wt.getColumn(1).width = 22; wt.getColumn(2).width = 100;
  [
    ['Boomselectietool NHV – bomenlijst (CONCEPT)', ''],
    ['', ''],
    ['Doel', 'Basislijst van bomen voor bebouwd gebied in de openbare ruimte, als eerste bouwsteen van de boomselectietool (Vergroeningsscan NHV, stap 3).'],
    ['Gazon', 'Boom in onverharde, open ruimte met gras eronder. Doorwortelbare ruimte meestal ruim; maaibeheer tot aan de stam.'],
    ['Plantvak', 'Boom in een vak met heesters of vaste planten. Boom moet concurrentie van onderbeplanting verdragen; een lichte kroon helpt de onderbeplanting.'],
    ['Verharding', 'Boom in bestrating (boomspiegel/boomrooster). Moet verdichting, beperkte groeiplaats, hitte, droogte en vaak strooizout verdragen, weinig wortelopdruk geven en opkroonbaar zijn. Altijd met goede groeiplaatsinrichting (bijv. bomengranulaat of bomenzand onder verharding).'],
    ['ja / beperkt / nee', 'ja = geschikt; beperkt = alleen onder voorwaarden (zie aandachtspunten); nee = niet geschikt. Een boom kan voor meerdere plekken geschikt zijn.'],
    ['Grootte', '1e grootte > 15 m, 2e grootte 10–15 m, 3e grootte < 10 m (indeling controleren).'],
    ['Status', 'Eerste voorstel op basis van algemene vakkennis, NIET per waarde aan een bron gekoppeld. Elke beoordeling moet door Joris getoetst worden en daarna met bron worden vastgelegd (bijv. kwekerijcatalogi, Bomenbank, eigen ervaring kwekerij).'],
  ].forEach(r => { const row = wt.addRow(r); row.getCell(2).alignment = { wrapText: true, vertical: 'top' }; row.getCell(1).font = { bold: true }; });
  wt.getCell('A1').font = { bold: true, size: 14, color: { argb: 'FF1F5D04' } };

  await wb.xlsx.writeFile(out);
  console.log('soorten:', bomen.length, 'gazon ja:', bomen.filter(b => b[4] === 'ja').length,
    'plantvak ja:', bomen.filter(b => b[5] === 'ja').length, 'verharding ja:', bomen.filter(b => b[6] === 'ja').length);
})();
