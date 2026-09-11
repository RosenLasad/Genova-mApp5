// questions.js
// Metti SOLO contenuti qui. Niente logica di gioco.
// Regole: category in {storia, geografia, musica, arte, spettacolo, scienza, sport}
// choices: 3 voci, answer: 0/1/2

window.QUIZ_QUESTIONS = [
  {
    category: "geografia",
    question: "Qual è il simbolo più riconoscibile del porto di Genova?",
    choices: ["Lanterna", "Castello", "Vulcano"],
    answer: 0,
    explain: "La Lanterna è il faro storico di Genova."
  },
  {
    category: "musica",
    question: "Quale tra questi cantautori è legato a Genova?",
    choices: ["Fabrizio De André", "Lucio Dalla", "Rino Gaetano"],
    answer: 0,
    explain: "De André è uno dei nomi più legati alla scena genovese."
  },
  {
    category: "arte",
    question: "Quale tra questi non è un Palazzo in Via Garibaldi?",
    choices: ["Palazzo Bianco", "Palazzo Azzurro", "Palazzo Rosso"],
    answer: 1,
    explain: "Via Garibaldi (Strada Nuova) ospita alcuni dei palazzi più celebri."
  },
  {
    category: "storia",
    question: "In quale anno Cristoforo Colombò compì il viaggio che gli fece scoprire le Americhe?",
    choices: ["1458", "1492", "1754"],
    answer: 1,
    image: "assets/q/anno_colombo.jpg",
    explain: "Colombo è una delle figure storiche più associate a Genova."
  },
  {
    category: "storia",
    question: "Quale palazzo è stato per secoli il centro della gestione dei commerci via mare?",
    choices: ["Palazzo Ducale", "Palazzo San Giorgio", "Porta Siberia"],
    answer: 1,
    explain: "Il porto è stato per secoli il cuore economico della città."
  },
  {
    category: "storia",
    question: "Dei 18 forti storici di Genova quanti sono ancora esistenti e visitabili?",
    choices: ["10", "15", "Tutti"],
    answer: 1,
    explain: "I forti sulle alture raccontano la storia militare e difensiva della città."
  },
  {
    category: "storia",
    question: "Quale personaggio storico è stato tenuto prigioniero a Palazzo San Giorgio?",
    choices: ["Dante Alighieri", "Cosimo de' Medici", "Marco Polo"],
    answer: 2,
    image: "assets/q/palazzo_sangiorgio.jpg",
    explain: "Palazzo San Giorgio è un simbolo storico dell’area portuale."
  },
  {
    category: "storia",
    question: "Quale isola nel Mediterraneo è stata per oltre 5 secoli sotto il dominio genovese?",
    choices: ["Corsica", "Chio", "Gorgona"],
    answer: 0,
    explain: "Genova è stata una grande potenza mercantile e marittima."
  },
  {
    category: "storia",
    question: "Quale termine indica i tipici vicoli del centro storico genovese?",
    choices: ["Calle", "Caruggi", "Ramble"],
    answer: 1,
    image: "assets/q/vicoli_centro.jpg",
    explain: "I caruggi sono un tratto distintivo del centro storico."
  },
  {
    category: "storia",
    question: "Quale di questi palazzi non si affaccia su Piazza de Ferrari?",
    choices: ["Palazzo della Borsa", "Palazzo Ducale", "Palazzo San Giorgio"],
    answer: 2,
    explain: "Piazza De Ferrari è una delle piazze più note e centrali."
  },
  {
    category: "storia",
    question: "Quale antico popolo fu alleato con Genova per molti secoli?",
    choices: ["Vichinghi", "Turchi", "Romani"],
    answer: 2,
    explain: "Un porto come Genova è sempre stato un centro di scambi e traffici."
  },
  {
    category: "storia",
    question: "A chi è intitolata la cattedrale di Genova?",
    choices: ["San Giovanni", "San Lorenzo", "San Giorgio"],
    answer: 1,
    explain: "La Cattedrale di San Lorenzo è il principale edificio religioso della città."
  },
  {
    category: "storia",
    question: "Quale zona genovese vide sorgere i primi insediamenti?",
    choices: ["Quartiere del Molo", "Quartiere Castelletto", "Quartiere Sarzano"],
    answer: 2,
    explain: "I primi insediamenti cominciarono nel V secolo a.C. sul colle di Sarzano."
  },
{
    category: "storia",
    question: "Quale figura storica è legata alla riforma politica di Genova nel Cinquecento?",
    choices: ["Andrea Doria", "Giuseppe Garibaldi", "Goffredo Mameli"],
    answer: 0,
    explain: "Andrea Doria è una figura chiave della Genova del XVI secolo."
  },
  {
    category: "storia",
    question: "Come si chiamò la Repubblica di Genova prima di passare sotto il Regno di Sardegna?",
    choices: ["Stato di Genova", "Repubblica Ligure", "Regno di Genova"],
    answer: 1,
    explain: "Genova fu a lungo una repubblica marittima."
  },
  {
    category: "storia",
    question: "Le statue in cima alla facciata del Palazzo Ducale chi rappresentano?",
    choices: ["Gli Eroi di Genova", "I Fondatori di Genova", "I Nemici di Genova"],
    answer: 2,
    image: "assets/q/statue_ducale.jpg",
    explain: "Palazzo Ducale è simbolo della storia politica della città."
  },
  {
    category: "storia",
    question: "Quale istituzione finanziaria storica è famosa per essere nata a Genova?",
    choices: ["Banco di San Giorgio", "Banca d'Italia", "Banco di Genova"],
    answer: 0,
    explain: "Il Banco di San Giorgio è uno dei nomi più noti della finanza storica genovese."
  },
  {
    category: "storia",
    question: "Quale soprannome ha associato a Genova Federico Petrarca?",
    choices: ["La Superba", "L'Eterna", "La Serenissima"],
    answer: 0,
    explain: "“La Superba” è un soprannome storico di Genova."
  },
  {
    category: "storia",
    question: "La cinta muraria del XVII secolo com'è soprannominata?",
    choices: ["Grandi Mura", "Mura del Doge", "Mura Nuove"],
    answer: 2,
    explain: "Raccontano la Genova delle grandi famiglie e del prestigio urbano."
  },
  {
    category: "storia",
    question: "Come si chiamava originalmente Via Garibaldi?",
    choices: ["Corso Lungo", "Via Reale", "Strada Nuova"],
    answer: 2,
    explain: "Via Garibaldi è la storica Strada Nuova."
  },
  {
    category: "storia",
    question: "Quale elemento difensivo è ancora visibile in varie parti della città?",
    choices: ["Le mura", "Il fossato del castello", "I cannoni nel porto"],
    answer: 0,
    explain: "Genova conserva tratti di mura e fortificazioni in più zone."
  },
  {
    category: "storia",
    question: "In quale anno fu costruita la Lanterna?",
    choices: ["1352", "1543", "1784"],
    answer: 1,
    explain: "La Lanterna nasce come faro e guida per le navi."
  },
  {
    category: "storia",
    question: "In che anno è stato ristrutturato e aperto al pubblico il Porto Antico?",
    choices: ["1899", "1975", "1992"],
    answer: 2,
    image: "assets/q/porto_antico.jpg",
    explain: "Il Porto Antico è stato riqualificato ed è oggi una zona centrale per eventi e turismo."
  },
  {
    category: "geografia",
    question: "Quale corso d’acqua attraversa la parte orientale di Genova e sfocia in mare?",
    choices: ["Bisagno", "Chiaravagna", "Polcevera"],
    answer: 0,
    explain: "Il Bisagno è uno dei torrenti più noti dell’area urbana genovese."
  },
  {
    category: "geografia",
    question: "Quale torrente è associato alla zona occidentale della città?",
    choices: ["Bisagno", "Polcevera", "Sturla"],
    answer: 1,
    explain: "La Val Polcevera è una delle principali aree della Genova occidentale."
  },
  {
    category: "geografia",
    question: "Quale quartiere si trova a levante ed è noto per parchi e passeggiata sul mare?",
    choices: ["Quezzi", "Coronata", "Nervi"],
    answer: 2,
    explain: "Nervi è un quartiere di Genova famoso per mare e verde."
  },
  {
    category: "geografia",
    question: "Quale stazione è più vicina al centro storico?",
    choices: ["Principe", "Brignole", "Sampierdarena"],
    answer: 0,
    explain: "La zona di Genova Piazza Principe è un nodo ferroviario importante."
  },
  {
    category: "geografia",
    question: "Quale zona è spesso associata alla Fiera e al waterfront orientale?",
    choices: ["Righi", "Foce", "Boccadasse"],
    answer: 1,
    explain: "La Foce è legata all’area della Fiera e al litorale orientale."
  },
  {
    category: "geografia",
    question: "Quale caratteristica strada moderna attraversa il litorale del golfo?",
    choices: ["Lungomare Canepa", "Corso Europa", "Sopraelevata"],
    answer: 2,
    explain: "La conformazione tra mare e rilievi allunga la città lungo la costa."
  },
  {
    category: "geografia",
    question: "Come si chiama l'area balneare a Sturla?",
    choices: ["Cava", "Vernazzola", "San Giuliano"],
    answer: 1,
    explain: "Boccadasse è una delle cartoline più classiche di Genova."
  },
  {
    category: "geografia",
    question: "Quale punto panoramico è noto per la vista sulla città e sul porto?",
    choices: ["Piazza Corvetto", "Piazza Banchi", "Piazza Castelletto"],
    answer: 2,
    explain: "Il Righi è un classico punto panoramico sulle alture."
  },
  {
    category: "geografia",
    question: "Quale luogo di Genova si affaccia su Piazza Corvetto e sul Parco dell'Acquasola?",
    choices: ["Castello d’Albertis", "Villetta Di Negro", "Piazza Caricamento"],
    answer: 1,
    explain: "Villetta Di Negro è un parco urbano molto noto in area centrale."
  },
  {
    category: "geografia",
    question: "Alle spalle di Genova, che cosa si estende?",
    choices: ["Un deserto", "La pianura", "I monti"],
    answer: 2,
    explain: "A Genova passi dal mare alle alture in pochissimo tempo."
  },
{
    category: "geografia",
    question: "Con quale regione tra queste NON confina la Liguria?",
    choices: ["Piemonte", "Toscana", "Lombardia"],
    answer: 2,
    explain: "L'Emilia Romagna separa la Liguria dalla Lombardia."
  },
  {
    category: "geografia",
    question: "Quale isola si trova di fronte a Genova?",
    choices: ["Sardegna", "Malta", "Corsica"],
    answer: 2,
    explain: "Genova si affaccia sul Mar Ligure."
  },
  {
    category: "geografia",
    question: "Quale quartiere sul mare è famoso per l’atmosfera da borgo di pescatori?",
    choices: ["Castelletto", "Boccadasse", "Quezzi"],
    answer: 1,
    explain: "Boccadasse è uno dei luoghi più iconici e fotografati."
  },
  {
    category: "geografia",
    question: "Che cosa caratterizza l'area vicino al mare del quartiere di Nervi?",
    choices: ["Il Luna Park", "I forti", "I parchi"],
    answer: 2,
    explain: "Nervi è nota per parchi e passeggiate sul mare."
  },
  {
    category: "geografia",
    question: "Qual è uno dei principali elementi caratteristici del Porto Antico?",
    choices: ["Il Bigo", "Torre Piacentini", "La Lanterna"],
    answer: 0,
    explain: "Il Porto Antico è una zona centrale sul mare."
  },
  {
    category: "geografia",
    question: "Come si chiama il golfo su cui si affaccia Genova?",
    choices: ["Golfo Stupendo", "Golfo Paradiso", "Golfo Azzurro"],
    answer: 1,
    explain: "Genova è tra mare e colline: si vede, si sente, si scala."
  },
  {
    category: "geografia",
    question: "A chi è intitolata la galleria in Piazza Dante?",
    choices: ["Giuseppe Garibaldi", "Andrea Doria", "Cristoforo Colombo"],
    answer: 2,
    explain: "Assieme a Roma, Genova è la città italiana con più gallerie in centro, avendone ben 3."
  },
  {
    category: "geografia",
    question: "La Lanterna di Genova è il faro più alto del Mediterraneo, ma sai quant'è alta?",
    choices: ["77 metri", "56 metri", "91 metri"],
    answer: 0,
    explain: "La Lanterna è visibile da molte zone e identifica il porto."
  },
  {
    category: "geografia",
    question: "Quale fu la prima stazione ferroviaria della città?",
    choices: ["Stazione Brignole", "Stazione P.Principe", "Stazione Nervi"],
    answer: 1,
    explain: "Piazza Principe è una delle stazioni principali di Genova."
  },
  {
    category: "geografia",
    question: "Quale monumentale cimitero è famoso per sculture e architetture?",
    choices: ["Verano", "Rossini", "Staglieno"],
    answer: 2,
    explain: "Staglieno è uno dei cimiteri monumentali più noti d’Europa."
  },
  {
    category: "musica",
    question: "Quale tra questi cantautori è uno dei simboli della scena genovese?",
    choices: ["Lucio Battisti", "Fabrizio De André", "Adriano Celentano"],
    answer: 1,
    explain: "De André è legatissimo a Genova e alla sua tradizione cantautorale."
  },
  {
    category: "musica",
    question: "Quale tra questi è un noto cantautore genovese?",
    choices: ["Gino Paoli", "Eros Ramazzotti", "Tiziano Ferro"],
    answer: 0,
    explain: "Gino Paoli è uno dei nomi storici legati a Genova."
  },
  {
    category: "musica",
    question: "Quale tra questi artisti è legato alla 'scuola genovese' dei cantautori?",
    choices: ["Raffaella Carrà", "Mina", "Luigi Tenco"],
    answer: 2,
    explain: "Tenco è tra i nomi più citati della scena genovese."
  },
  {
    category: "musica",
    question: "Quale autore ha composto la canzone 'Genova per noi'?",
    choices: ["Lucio Dalla", "Paolo Conte", "Vasco Rossi"],
    answer: 1,
    explain: "Genova per noi è di Paolo Conte."
  },
  {
    category: "musica",
    question: "Quale gruppo rock/prog è nato a Genova?",
    choices: ["New Trolls", "Nomadi", "Negrita"],
    answer: 0,
    explain: "I New Trolls sono un nome storico nato a Genova."
  },
  {
    category: "musica",
    question: "Quale parola indica spesso le canzoni d'autore legate alla tradizione genovese?",
    choices: ["Trap house", "Tarantella", "Cantautorato"],
    answer: 2,
    explain: "Genova è associata a una forte tradizione cantautorale."
  },
  {
    category: "musica",
    question: "Quale tra questi artisti è legato a Genova come cantautore?",
    choices: ["Zucchero", "Bruno Lauzi", "Mahmood"],
    answer: 1,
    explain: "Bruno Lauzi è uno dei nomi collegati alla scena genovese."
  },
  {
    category: "musica",
    question: "Quale strumento è spesso centrale nella canzone d'autore classica genovese?",
    choices: ["Chitarra", "Tamburello", "Armonica"],
    answer: 0,
    explain: "La chitarra è uno degli strumenti tipici del cantautorato."
  },
  {
    category: "musica",
    question: "Quale luogo sul waterfront genovese ospita spesso concerti ed eventi?",
    choices: ["Castelletto", "Piazza San Marco", "Porto Antico"],
    answer: 2,
    explain: "Il Porto Antico è spesso sede di eventi musicali."
  },
  {
    category: "musica",
    question: "Quale tra questi è un cantautore legato alla scena genovese anche come autore e interprete?",
    choices: ["Vasco Rossi", "Ivano Fossati", "Jovanotti"],
    answer: 1,
    explain: "Fossati è un nome importante con radici genovesi."
  },
  {
    category: "musica",
    question: "Quale cantautore genovese è noto per canzoni come 'Il cielo in una stanza'?",
    choices: ["Gino Paoli", "Franco Battiato", "Lucio Battisti"],
    answer: 0,
    explain: "Gino Paoli è uno dei cantautori più legati a Genova."
  },
  {
    category: "musica",
    question: "Quale tra questi è un cantautore genovese noto per stile colto e poetico?",
    choices: ["Pino Daniele", "Ennio Morricone", "Umberto Bindi"],
    answer: 2,
    explain: "Umberto Bindi è un nome importante della scena genovese."
  },
  {
    category: "musica",
    question: "Quale evento cittadino è spesso legato a grandi spettacoli musicali e culturali?",
    choices: ["Nastri d'argento", "Festival della Scienza", "Premio Strega"],
    answer: 1,
    explain: "A Genova il Festival della Scienza coinvolge spesso anche eventi culturali."
  },
  {
    category: "musica",
    question: "Quale fu il primo teatro costruito a Genova?",
    choices: ["Teatro Carlo Felice", "Teatro Duse", "Teatro Politeama"],
    answer: 0,
    explain: "Il Carlo Felice è il punto di riferimento per lirica e concerti."
  },
  {
    category: "musica",
    question: "Quale cultura musicale ha influenzato la musica genovese?",
    choices: ["Cultura celtica", "Cultura asiatica", "Cultura mediterranea"],
    answer: 2,
    explain: "La canzone d’autore è una chiave della tradizione genovese."
  },
  {
    category: "musica",
    question: "Quale tra questi è legato alla scena genovese anche come autore e interprete raffinato?",
    choices: ["Gigi D’Alessio", "Bruno Lauzi", "Fedez"],
    answer: 1,
    explain: "Bruno Lauzi è associato alla tradizione genovese dei cantautori."
  },
  {
    category: "musica",
    question: "Quale importante 'coppia' musicale è genovese?",
    choices: ["Cochi e Renato", "Battisti-Mogol", "Mameli-Novaro"],
    answer: 2,
    explain: "Mameli e Novaro erano genovesi."
  },
  {
    category: "musica",
    question: "Quale tra questi artisti ha suonato a Genova?",
    choices: ["I Beatles", "Jimi Hendrix", "Elvis Presley"],
    answer: 0,
    explain: "I New Trolls sono un nome storico legato a Genova."
  },
  {
    category: "musica",
    question: "Come viene soprannominato il violino di Paganini, oggi conservato a Palazzo Bianco?",
    choices: ["Il Cannone", "Il Fucile", "La Frusta"],
    answer: 0,
    explain: "Città di porto = incontri, storie, contaminazioni musicali."
  },
  {
    category: "musica",
    question: "Come si chiamano i gruppi tradizionali di cantanti di strada di Genova?",
    choices: ["Tarallini", "Trallallero", "Trullallà"],
    answer: 1,
    explain: "I trallallero è un modo di cantare in gruppo, per strada, mettendosi in cerchio, e eseguendo melodie solo con la voce."
  },
  {
    category: "arte",
    question: "Quali sono i due colori principali che rivestono la facciata a fasce della Cattderale di San Lorenzo?",
    choices: ["Giallo e Rosso", "Bianco e Nero", "Azzurro e Giallo"],
    answer: 1,
    explain: "San Lorenzo è la cattedrale più importante della città."
  },
  {
    category: "arte",
    question: "Quale museo genovese è noto per avere tra le sue opere il 'Santo Graal'?",
    choices: ["Museo del Mare", "Museo Chiossone", "Museo di San Lorenzo"],
    answer: 2,
    explain: "Il Museo di San Lorenzo ospita il Santo Graal."
  },
  {
    category: "arte",
    question: "Quale edificio è legato alla storia delle merci e al porto?",
    choices: ["Palazzo Ducale", "Castello de Albertis", "Palazzo San Giorgio"],
    answer: 2,
    explain: "Palazzo San Giorgio è uno dei simboli storici del porto."
  },
  {
    category: "arte",
    question: "Per quale elemento culturale e artistico è importante il cimitero di Staglieno?",
    choices: ["Per i dipinti e gli affreschi", "Per le statue e le sculture", "Per gli spettacoli teatrali"],
    answer: 1,
    explain: "Staglieno è celebre per scultura e architettura."
  },
  {
    category: "arte",
    question: "I bracci della gru chiamata Bigo, che si trova al Porto Antico, a cosa servivano in origine?",
    choices: ["Per scandagliare il fondale del porto", "Per caricare/scaricare le navi", "Per spegnere gli incendi nei silos"],
    answer: 1,
    explain: "L’Acquario è un’icona moderna del Porto Antico."
  },
  {
    category: "arte",
    question: "Di quale chiesa storica il convento è un importante museo cittadino e ne porta il nome?",
    choices: ["Chiesa di San Donato", "Chiesa del Gesù", "Chiesa di Sant'Agostino"],
    answer: 2,
    explain: "Via Balbi è una via monumentale legata anche all’Università."
  },
  {
    category: "arte",
    question: "In quale palazzo storico si trova la sede del Comune?",
    choices: ["Palazzo Ducale", "Palazzo Rosso", "Palazzo Tursi"],
    answer: 2,
    explain: "Palazzo Tursi è una sede importante nel sistema museale cittadino."
  },
  {
    category: "arte",
    question: "Qual è attualmente la chiesa più antica di Genova?",
    choices: ["Basilica delle Vigne", "Cattedrale di San Lorenzo", "Chiesa di Santo Stefano"],
    answer: 2,
    explain: "La chiesa di Santo Stefano risale al IX secolo."
  },
  {
    category: "arte",
    question: "Quale tra questi palazzo storici ospita spesso mostre temporanee e grandi eventi culturali?",
    choices: ["Palazzo San Giorgio", "Palazzo Ducale", "Palazzo della Regione"],
    answer: 1,
    explain: "Palazzo Ducale è un polo culturale e sede frequente di mostre."
  },
  {
    category: "arte",
    question: "Quale elemento si può trovare all'interno dei palazzi del centro storico genovese?",
    choices: ["Studio medico", "Miniere di sale", "Fontane a cascata"],
    answer: 2,
    explain: "In centro trovi molti edifici storici con decorazioni e facciate dipinte."
  },
  {
    category: "arte",
    question: "Quale via ospita il Palazzo Reale?",
    choices: ["Via Balbi", "Via del Campo", "Via Garibaldi"],
    answer: 1,
    explain: "Via Balbi ospita diversi palazzi nobiliari, tra cui Palazzo Reale."
  },
  {
    category: "arte",
    question: "Quale tessuto ha il nome legato a Genova?",
    choices: ["Raso", "Jeans", "Seta"],
    answer: 1,
    explain: "Il jeans è un materiale che prende il nome dal blu di Genova: blue jeans."
  },
  {
    category: "arte",
    question: "Quali 'personaggi' sono ritratti sulla facciata di Palazzo San Giorgio?",
    choices: ["I 'matti' di Genova", "I 'nemici' di Genova", "Gli 'eroi' di Genova"],
    answer: 2,
    explain: "Palazzo San Giorgio sfoggia sulla facciata il ritratto degli Eroi di Genova."
  },
  {
    category: "arte",
    question: "Quale architetto gestì il progetto del Palazzo della Borsa in Pz. de Ferrari?",
    choices: ["Gino Coppedè", "Carlo Barabino", "Renzo Piano"],
    answer: 0,
    explain: "Palazzo della Borsa è stato progetto da Gino Coppedè."
  },
  {
    category: "arte",
    question: "Quale architetto si occupò dell'allestimento dell'Esposizione Universale del 1914?",
    choices: ["Marcello Piacentini", "Gino Coppedè", "Renzo Piano"],
    answer: 1,
    explain: "L'Esposizione Universale del 1914 fu un importante evento curato da Gino Coppedè."
  },
  {
    category: "arte",
    question: "Quale architetto progettò l'Arco della Vittoria in Piazza della Vittoria?",
    choices: ["Gino Coppedè", "Renzo Piano", "Marcello Piacentini"],
    answer: 2,
    explain: "L'Arco della Vittoria fu progettato da Marcello Piacentini."
  },
  {
    category: "arte",
    question: "Quale museo genovese è dedicato all'arte orientale?",
    choices: ["Museo d’Arte Orientale E. Chiossone", "Museo Luxoro", "Museo di Sant'Agostino"],
    answer: 0,
    explain: "Il Chiossone è un museo unico in Italia per le sue collezioni."
  },
  {
    category: "arte",
    question: "Quale nome è stato dato al grattacielo più alto di Piazza Dante?",
    choices: ["Torre Genovese", "Torre Piacentini", "Torre dei cittadini"],
    answer: 1,
    explain: "Torre Piacentini prende il nome dal suo architetto Marcello Piacentini."
  },
  {
    category: "arte",
    question: "Quale è un simbolo architettonico moderno del Porto Antico?",
    choices: ["Lanterna", "Palazzo Ducale", "Bigo"],
    answer: 2,
    explain: "Il Bigo è una struttura panoramica iconica del waterfront."
  },
  {
    category: "arte",
    question: "Quale area della città nacque a fine Ottocento per allestire grandi eventi ed espozioni?",
    choices: ["Castelletto", "Piazza d'Armi (oggi Pz. della Vittoria)", "Piazza Campetto"],
    answer: 1,
    explain: "Piazza d'Armi nacque a fine Ottocento ed ospitò numerose esposizioni ed eventi fino agli Venti."
  },
  {
    category: "spettacolo",
    question: "Quale attore genovese è celebre per il personaggio di Fantozzi?",
    choices: ["Massimo Troisi", "Carlo Verdone", "Paolo Villaggio"],
    answer: 2,
    explain: "Paolo Villaggio è uno dei volti più noti dello spettacolo genovese."
  },
  {
    category: "spettacolo",
    question: "Quale luogo genovese è spesso sede di grandi mostre e rassegne culturali?",
    choices: ["Lanterna", "Palazzo Ducale", "Casa del Boia"],
    answer: 1,
    explain: "Palazzo Ducale ospita spesso rassegne e mostre."
  },
  {
    category: "spettacolo",
    question: "Quale area del waterfront è nota per eventi, fiere e intrattenimento?",
    choices: ["Castelletto", "Piazza San Matteo", "Porto Antico"],
    answer: 2,
    explain: "Il Porto Antico è spesso il centro di eventi cittadini."
  },
  {
    category: "spettacolo",
    question: "Qual è l'utilizzo originario degli edifici al Porto Antico, che oggi ospitano servizi culturali e d'intrattenimento?",
    choices: ["Armeria", "Depositi commerciali", "Prigione"],
    answer: 1,
    explain: "Silos del cotone."
  },
  {
    category: "spettacolo",
    question: "Quale attore italiano è il volto di diversi film 'poliziotteschi' girati a Genova?",
    choices: ["Gian Maria Volontè", "Mario Merola", "Franco Nero"],
    answer: 2,
    explain: "Franco Nero ha fatto diversi film 'poliziotteschi' girati a Genova."
  },
  {
    category: "spettacolo",
    question: "Quale attore genovese teatrale è stato un  riferimento per la commedia dialettale?",
    choices: ["Giorgio Gaber", "Gilberto Govi", "Eduardo de Filippo"],
    answer: 1,
    explain: "Gilberto Govi è stato un attore fondamentale per il teatro dialettale genovese."
  },
  {
    category: "spettacolo",
    question: "Quale luogo vicino al mare è stato dedicato all'attore teatrale Gilberto Govi?",
    choices: ["Giardini Gilberto Govi", "Stadio Gilberto Govi", "Lido Gilberto Govi"],
    answer: 0,
    explain: "I Giardini Gilberto Govi si trovano vicino alla Foce, su Corso Italia."
  },
  {
    category: "spettacolo",
    question: "Quale compagnia teatrale genovese porta avanti una tradizione goliardica e scenografica?",
    choices: ["Gli antipatici", "I Gatti di vicolo Miracoli", "La Baistrocchi"],
    answer: 2,
    explain: "La Baistrocchi."
  },
  {
    category: "spettacolo",
    question: "Quale genere di film è tradizionalmente nato a Genova?",
    choices: ["Horror di periferia", "Poliziottesco", "Poliziesco"],
    answer: 1,
    explain: "Il 'poliziottesco' è un genere d'azione italiano tipico degli anni Settanta."
  },
  {
    category: "spettacolo",
    question: "Quale tra questi è un importante artista e scenografo genovese?",
    choices: ["Dante Ferretti", "Francesco Altan", "Emanuele Luzzati"],
    answer: 2,
    explain: "Emanuele Luzzati è un importante artista e scenografo genovese."
  },
  {
    category: "spettacolo",
    question: "Quale comico e personaggio televisivo è storicamente legato a Genova?",
    choices: ["Beppe Grillo", "Roberto Benigni", "Renato Pozzetto"],
    answer: 0,
    explain: "Beppe Grillo è nato e cresciuto a Genova."
  },
  {
    category: "spettacolo",
    question: "Quale tra questi attori italiani è nato a Genova?",
    choices: ["Nino Manfredi", "Vittorio Gassman", "Ugo Tognazzi"],
    answer: 1,
    explain: "Paolo Villaggio è uno dei genovesi più noti dello spettacolo italiano."
  },
  {
    category: "spettacolo",
    question: "Quale film di e con Adriano Celentano è stato girato a Genova?",
    choices: ["Segni particolari: bellissimo", "Serafino", "Joan Lui"],
    answer: 2,
    explain: "Joan Lui fu girato a Genova."
  },
  {
    category: "spettacolo",
    question: "Chi è il regista del film 'Achtung banditi!' ?",
    choices: ["Carlo Lizzani", "Ettore Scola", "Dino Risi"],
    answer: 0,
    explain: "Achtung Banditi è di Carlo Lizzani."
  },
  {
    category: "spettacolo",
    question: "Quale di questi registi è genovese?",
    choices: ["Federico Fellini", "Pietro Germi", "Mario Monicelli"],
    answer: 1,
    explain: "Pietro Germi è genovese."
  },
  {
    category: "spettacolo",
    question: "Quale cinema di Genova è riconosciuto come la più antica sala cinematografica d'Italia ancora in attività?",
    choices: ["Cinema El Dorado", "Cinema Odeon", "Cinema Sivori"],
    answer: 2,
    explain: "Il cinema Sivori è riconosciuto come la più antica sala cinematografica d'Italia ancora in attività."
  },
  {
    category: "spettacolo",
    question: "In quale anno fu inaugurato il cinema Sivori, tutt'ora in attività?",
    choices: ["1896", "1901", "1924"],
    answer: 0,
    explain: "Il cinema Sivori fu inaugurato nel 1896."
  },
  {
    category: "spettacolo",
    question: "L'album Closer dei Joy Division ha in copertina una foto scattata a Genova, sai cosa ritrae?",
    choices: ["Le torri di Porta Soprana", "Una tomba al cimitero di Staglieno", "Un pescatore che sorride"],
    answer: 1,
    explain: "L'album Closer dei Joy Division ha in copertina una foto scattata al cimitero di Staglieno."
  },
  {
    category: "spettacolo",
    question: "Quale famoso regista girò a Genova alcune scene del suo primo film?",
    choices: ["Stanley Kubrick", "Alfred Hitchcock", "Martin Scorsese"],
    answer: 1,
    explain: "Alfred Hitchcock girò a Genova alcune scene de Il labirinto delle passioni, nel 1924."
  },
  {
    category: "spettacolo",
    question: "Per una famosa scena del film Vertigo, il regista Alfred Hitchcock inserì un elemento architettonico che lo ispirò durante il suo soggiorno a Genova. Quale?",
    choices: ["La Lanterna", "Una funicolare", "Uno scalone ellittico"],
    answer: 2,
    explain: "Lo scalone dell'Hotel Bristol ispirò Alfred Hitchcock per la famosa scena delle scale in Vertigo."
  },
  {
    category: "scienza",
    question: "Il matematico e fisico genovese Giovanni Battista Baliani condivise molti studi e incontri con quale importante personaggio storico?",
    choices: ["Galileo Galilei", "Sigmund Freud", "Cartesio"],
    answer: 0,
    explain: "Giovanni Battista Baliani scrisse e incontrò più volte Galileo Galilei."
  },
  {
    category: "scienza",
    question: "In quale zona si trova l'Acquario di Genova?",
    choices: ["Foce", "Porto Antico", "Vicino alla Lanterna"],
    answer: 1,
    explain: "L’Acquario unisce turismo e divulgazione scientifica."
  },
  {
    category: "scienza",
    question: "L'aspetto architettonico del 'Matitone' a quale edificio storico è ispirato?",
    choices: ["Campanile di Sant'Agostino", "Campanile di San Donato", "Torre degli Embriaci"],
    answer: 1,
    explain: "Il Matitone si ispira al campanile di San Donato."
  },
  {
    category: "scienza",
    question: "Quale edificio di Genova è stato uno dei primi grattacieli italiani a struttura interamente in acciaio?",
    choices: ["Corte Lambruschini", "Il Matitone", "Torre San Vincenzo"],
    answer: 2,
    explain: "Torre San Vincenzo è stata uno dei primi grattacieli italiani a struttura interamente in acciaio."
  },
  {
    category: "scienza",
    question: "Quale primato europe mantenne per 12 anni il grattacielo di Piazza Dante, Torre Piacentini?",
    choices: ["Il grattacielo più vicino al mare", "Il grattacielo più alto", "Il grattacielo più costoso da mantenere"],
    answer: 1,
    explain: "Torre Piacentini è statoil grattacielo più alto d'Europa dal 1940 al 1952, e in Italiano fino al 1954."
  },
  {
    category: "scienza",
    question: "Oltre al piroscafo 'Lombardo', come si chiamava l'altra imbarcazione a vapore che usò Garibaldi per partire con i Mille?",
    choices: ["Torino", "Piemonte", "Liguria"],
    answer: 1,
    explain: "Venti e condizioni marine influenzano spesso il clima costiero."
  },
  {
    category: "scienza",
    question: "In cosa fu pioniere Raffaele Rubattino, di cui c'è la statua in piazza Caricamento?",
    choices: ["Navigazione a vapore", "Servizi turistici", "Ghiacciaie navali moderne"],
    answer: 0,
    explain: "Raffaele Rubattino fu pioniere nella navigazione a vapore."
  },
  {
    category: "scienza",
    question: "Quale di queste navi non è stata prodotta a Genova?",
    choices: ["Michelangelo", "Raffaello", "Donatello"],
    answer: 2,
    explain: "La Michelangelo e la Raffello furono varate nel 1965."
  },
  {
    category: "scienza",
    question: "Quale elemento si aggiunge alla funicolare dell'Ascensore Montegalletto, facendolo un ibrido unico al mondo?",
    choices: ["Sistema idraulico ", "Magnetismo", "Calore del terreno"],
    answer: 0,
    explain: "Porto grande = logistica, trasporti, ottimizzazione dei flussi."
  },
  {
    category: "scienza",
    question: "Franco Malerba è il primo italiano a fare cosa?",
    choices: ["Raggiungere la fossa delle Marianne", "Andare nello spazio", "Vincere il Nobel"],
    answer: 1,
    explain: "Franco Malerba passato alla storia per essere stato il primo cittadino italiano a viaggiare nello spazio. ."
  },
  {
    category: "scienza",
    question: "Che cosa ha creato Clelia Durazzo nella sua Villa Durazzo Pallavicini?",
    choices: ["Un osservatorio astronomico", "Un ospedale", "Un erbario e giardino botanico"],
    answer: 2,
    explain: "Villa Durazzo Pallavicini è un importante giardino botanico."
  },
  {
    category: "scienza",
    question: "Quale evento culturale-scientifico è famoso a Genova e si svolge ogni anno?",
    choices: ["Festival dell'Astronomia", "Festival della Scienza", "Festival dell'Areonautica"],
    answer: 1,
    explain: "Il Festival della Scienza è una delle rassegne più note in Italia."
  },
  {
    category: "scienza",
    question: "Quale grande istituto di ricerca tecnologica ha sede a Genova?",
    choices: ["IIT", "CERN", "TUTT"],
    answer: 0,
    explain: "L’IIT è un polo di ricerca avanzata con sede a Genova."
  },
  {
    category: "scienza",
    question: "Che tipo di struttura era l'innovativa 'Telfer', allestita nel 1914 per l'Esposizione Universale?",
    choices: ["Ascensore a levitazione magnetica", "Pressa idraulica", "Monorotaia d'acciaio e cemento"],
    answer: 2,
    explain: "Il Telfer era un'avveniristica monorotaia costruita a Genova nel 1914 per l'Esposizione Internazionale di Marina e Igiene Marinara."
  },
  {
    category: "scienza",
    question: "Quale innovazione per Genova portarono alcuni palazzi di Via XX settembre?",
    choices: ["Erano i primi in acciaio", "Erano i primi in cemento armato", "Erano i primi in calcestruzzo"],
    answer: 1,
    explain: "I palazzi di Via Xx settembre furono i primi della città a essere costruiti in cemento armato."
  },
  {
    category: "scienza",
    question: "Il  primo tratto ferroviario a levante di Genova collegava la Stazione Brignole con quale città?",
    choices: ["Rapallo", "Chiavari", "Sestri Levante"],
    answer: 1,
    explain: "Genova - Chiavari fu il primo tratto ferroviario della stazione Brignole."
  },
  {
    category: "scienza",
    question: "Quale grande ospedale pediatrico è noto a Genova?",
    choices: ["San Raffaele", "Bambino Gesù", "Istituto Giannina Gaslini"],
    answer: 2,
    explain: "Il Gaslini è un riferimento pediatrico molto conosciuto."
  },
  {
    category: "scienza",
    question: "Nel 1930, Guglielmo Marconi fece un esperimento al porto di Genova, accendendo con un segnale radio 3000 lampade del municipio di quale città?",
    choices: ["New York (USA)", "Sidney (AUSTRALIA)", "Buenos Aires (BRASILE)"],
    answer: 1,
    explain: "Nel 1930, Guglielmo Marconi inviò un segnale radio da Genova per accendere 3000 lampade del municipio di Sidney in Australia."
  },
  {
    category: "scienza",
    question: "Nel 2024 è stato aperto a Genova il primo impianto al mondo per la produzione su scala industriale di quale materiale?",
    choices: [" Aerogel", "Nanotubi", "Grafene"],
    answer: 2,
    explain: "Nel 2024 è stato aperto a Genova il primo impianto al mondo per la produzione su scala industriale di grafene."
  },
  {
    category: "scienza",
    question: "Nel 1964 il fisico Giovanni Francia installò a Sant'Ilario il primo modello al mondo di cosa?",
    choices: ["Di centrale geotermica", "Di centrale solare termoelettrica", "Di centrale eliocentrica"],
    answer: 1,
    explain: "A Sant'Ilario, nel 1964 il fisico Giovanni Francia installò il primo modello al mondo di centrale solare termoelettrica."
  },
  {
    category: "sport",
    question: "In quale anno nacque la 'Sampdoria'?",
    choices: ["1906", "1926", "1946"],
    answer: 2,
    explain: "La Sampdoria nacque nel 1946."
  },
  {
    category: "sport",
    question: "Quale evento automobilistico si è tenuto per anni nei padiglioni espositivo alla Foce?",
    choices: ["Rally", "Formula 1", "Formula 3"],
    answer: 0,
    explain: "Alla Foce si teneva il Rally della Lanterna."
  },
  {
    category: "sport",
    question: "In quale anno la 'Sampdoria' vinse il suo primo scudetto?",
    choices: ["1975-1976", "1982-1983", "1990-1991"],
    answer: 2,
    explain: "La Sampdoria vinse lo scudetto nel 1990-1991."
  },
  {
    category: "sport",
    question: "Come si chiama il quartiere in cui si trova lo stadio 'Luigi Ferraris'?",
    choices: ["Bolzaneto", "Marassi", "Carignano"],
    answer: 1,
    explain: "Il Luigi Ferraris è lo stadio storico della città."
  },
  {
    category: "sport",
    question: "Quanti Mondiali di calcio ha ospitato Genova nella storia?",
    choices: ["Nessuno", "1", "2"],
    answer: 2,
    explain: "Genova ha ospitato i Mondiali di calcio nel 1934 e nel 1990."
  },
  {
    category: "sport",
    question: "In quale anno fu fondato il Genoa?",
    choices: ["1879", "1893", "1901"],
    answer: 1,
    explain: "Le regate sono eventi classici in città marittime."
  },
  {
    category: "sport",
    question: "Quale squadra è associato ai 'blucerchiati'?",
    choices: ["Sampdoria", "Genoa", "Juventus"],
    answer: 0,
    explain: "Il soprannome 'blucerchiati' è legato alla Sampdoria."
  },
  {
    category: "sport",
    question: "Quale primato detiene il 'Genoa CFC'?",
    choices: ["La prima squadra allenata da uno straniero", "La prima squadra italiana", "La prima squadra con stranieri in squadra"],
    answer: 1,
    explain: "Il Genoa detiene il primato di essere la prima squadra italiana."
  },
  {
    category: "sport",
    question: "In quale disciplina il genovese Emilio Lunghi conquistò per l'Italia la prima medaglia in un'Olimpiade?",
    choices: ["Mezzofondo", "Maratona", "Salto in alto"],
    answer: 0,
    explain: "Emilio Lunghi vinse la medaglia d'argento alle Olimpiadi di Londra nel 1908."
  },
  {
    category: "sport",
    question: "Per quale evento sportivo venne ristrutturato e ampliato lo stadio 'Luigi Ferraris'?",
    choices: ["Olimpiadi del 1960", "Mondiali di calcio del 1982", "Mondiali di calcio del 1990"],
    answer: 2,
    explain: "Lo stadio Ferraris..."
  },
  {
    category: "sport",
    question: "Come si chiama lo stadio principale di Genova?",
    choices: ["San Siro", "Luigi Ferraris", "Stadio Olimpico"],
    answer: 1,
    explain: "Il Luigi Ferraris è lo stadio storico della città."
  },
  {
    category: "sport",
    question: "In quale disciplina olimpionica il genovese Filippo Bottino vinse l'oro?",
    choices: ["Maratona", "Nuoto", "Sollevamento pesi"],
    answer: 2,
    explain: "Filippo Bottino vinse l'oro nel sollevamento pesi."
  },
  {
    category: "sport",
    question: "Cosa rappresenta il simbolo nel logo della 'Sampdoria'?",
    choices: ["Cristoforo Colombo", "Un marinaio", "Un doge storico di Genova"],
    answer: 1,
    explain: "La Sampdoria ha un marinaio come logo."
  },
  {
    category: "sport",
    question: "Come si chiama il derby tra le due squadre di Genova?",
    choices: ["Derby del Doge", "Derby del golfo", "Derby della Lanterna"],
    answer: 2,
    explain: "È chiamato così in riferimento alla Lanterna."
  },
  {
    category: "sport",
    question: "Quale animale è simbolo-mascotte del 'Genoa'?",
    choices: ["Delfino", "Grifone", "Cinghiale"],
    answer: 1,
    explain: "Il grifone è simbolo del Genoa."
  },
  {
    category: "sport",
    question: "Quale squadra storica di Genova si unì alla 'Andrea Doria' per fondare la 'Sampdoria'?",
    choices: ["Sampierdarenese", "Sampierdarenina", "Sampierdarena"],
    answer: 0,
    explain: "La Sampierdarenese si unì alla Andrea Doria per fondare la Sampdoria."
  },
  {
    category: "sport",
    question: "Quale colore è storicamente associato al 'Genoa CFC'?",
    choices: ["Bianco e verde", "Giallo e viola", "Rosso e blu"],
    answer: 2,
    explain: "Il Genoa è tradizionalmente rossoblù."
  },
  {
    category: "sport",
    question: "Quale tra questi nomi è utilizzato per indicare i tifosi della 'Sampdoria'?",
    choices: ["Bianconeri", "Rossoblu", "Blucerchiati"],
    answer: 2,
    explain: "La Sampdoria è famosa per la maglia blucerchiata."
  },
  {
    category: "sport",
    question: "Quale sport è stato scelto per rievocare la rivalità storica delle 'Repubbliche Marinare'?",
    choices: ["Una gara di nuoto", "Una regata", "Tiro al piattello"],
    answer: 1,
    explain: "Le regate sono comuni nelle città con tradizione nautica."
  },
  {
    category: "sport",
    question: "L'ex-calciatore genovese Roberto Pruzzo ha guadagnato per 3 volte un importante riconoscimento, quale?",
    choices: ["3 goal in nazionale", "3 campionati vinti", "3 volte Capocannoniere della Serie A"],
    answer: 2,
    explain: "Roberto Pruzzo è stato un importante giocatore e allenatore genovese (di Crocefieschi)."
  },
  {
    category: "cucina",
    question: "Sai dove si trova il vigneto 'storico' per la produzione della 'bianchetta', il vino storico genovese?",
    choices: ["Dietro la Lanterna", "Dietro l'Albergo dei Poveri", "Dietro la Stazione Brignole"],
    answer: 1,
    image: "assets/q/pesto.jpg",
    explain: "Il vigneto 'storico' per la produzione della 'bianchetta' si trova dietro l'Albergo dei Poveri."
  },
  {
    category: "cucina",
    question: "Quale tra questi è un tipico formaggio ligure?",
    choices: ["Gorgonzola", "Prescinsea", "Pecorino"],
    answer: 1,
    explain: "La prescinsea è un formaggio genovese."
  },
  {
    category: "cucina",
    question: "Quale tra questi ingredienti è indispensabile per il pesto?",
    choices: ["Peperone", "Cipolla", "Aglio"],
    answer: 2,
    image: "assets/q/pesto.jpg",
    explain: "L’aglio è uno degli ingredienti classici del pesto."
  },
  {
    category: "cucina",
    question: "Quale tipo di frutta secca è tradizionalmente usata nel pesto alla genovese?",
    choices: ["Noci", "Pinoli", "Mandorle"],
    answer: 1,
    explain: "I pinoli sono l’ingrediente tradizionale per il pesto genovese."
  },
  {
    category: "cucina",
    question: "Quale piatto genovese è una torta salata con bietole (o erbette) e formaggio?",
    choices: ["Torta pasqualina", "Caponata", "Piadina romagnola"],
    answer: 0,
    explain: "La torta pasqualina è un classico della tradizione ligure."
  },
  {
    category: "cucina",
    question: "Quanti strati di pastasfoglia bisogna mettere sulla torta pasqualina, secondo la tradizione?",
    choices: ["7", "20", "33"],
    answer: 2,
    explain: "33, come gli anni di Cristo."
  },
  {
    category: "cucina",
    question: "Quale farina è alla base della farinata?",
    choices: ["Farina di mais", "Farina di ceci", "Farina di castagne"],
    answer: 1,
    image: "assets/q/farinata.jpg",
    explain: "La farinata è fatta con farina di ceci."
  },
  {
    category: "cucina",
    question: "Come viene cotta tradizionalmente la farinata?",
    choices: ["Forno molto caldo", "Friggitrice", "Pentola a pressione"],
    answer: 0,
    image: "assets/q/farinata.jpg",
    explain: "Si cuoce in forno, spesso in teglie ampie."
  },
  {
    category: "cucina",
    question: "Quale ingrediente è tipico nella focaccia al formaggio?",
    choices: ["Ricotta", "Mozzarella", "Stracchino"],
    answer: 2,
    image: "assets/q/focaccia-formaggio.jpg",
    explain: "La focaccia di Recco è famosa per lo stracchino."
  },
  {
    category: "cucina",
    question: "Quale pasta corta è tipica ligure?",
    choices: ["Ravioli", "Trofie", "Taglierini"],
    answer: 1,
    explain: "Trofie al pesto è un abbinamento iconico."
  },
  {
    category: "cucina",
    question: "Quale pasta lunga è tipica ligure?",
    choices: ["Trofie", "Bucatini", "Taglierini"],
    answer: 2,
    explain: "Trofie al pesto è un grande classico."
  },
  {
    category: "cucina",
    question: "Nel piatto 'trofie al pesto' spesso si aggiungono anche…",
    choices: ["Salsiccia e funghi", "Piselli e prosciutto", "Patate e fagiolini"],
    answer: 2,
    explain: "Patate e fagiolini sono un abbinamento tradizionale."
  },
  {
    category: "cucina",
    question: "Quale ingrediente è fondamentale per una buona focaccia genovese oltre alla farina?",
    choices: ["Pepe", "Salamoia", "Vino"],
    answer: 1,
    image: "assets/q/focaccia.jpg",
    explain: "La salamoia fa la differenza."
  },
  {
    category: "cucina",
    question: "Quale salsa ligure è tipicamente usata per condire i pansoti?",
    choices: ["Salsa di noci", "Ragù", "Tonno e cipolla"],
    answer: 0,
    explain: "La salsa di noci è un classico ligure."
  },
  {
    category: "cucina",
    question: "I 'pansoti' (o pansôti) cosa sono?",
    choices: ["Pasticcini", "Frutta candita", "Pasta ripiena"],
    answer: 2,
    explain: "Sono una pasta ripiena tipica ligure."
  },
  {
    category: "cucina",
    question: "Quale di questi e è una zuppa di pesce tipica genovese?",
    choices: ["Ramen", "Buridda", "Cassola"],
    answer: 1,
    explain: "La Buridda è una zuppa di pesce, tipica dei marinai."
  },
  {
    category: "cucina",
    question: "Come viene chiamato il piatto tipico ligure a base di stoccafisso?",
    choices: ["Accomodato", "Accompagnato", "Accudito"],
    answer: 0,
    explain: "Basilico, maggiorana, timo e altre erbe sono molto usate."
  },
  {
    category: "cucina",
    question: "Quale dolce tradizionale genovese è tipico soprattutto nel periodo natalizio?",
    choices: ["Cannolo", "Panettone", "Pandolce"],
    answer: 2,
    explain: "Il pandolce genovese è un grande classico delle feste."
  },
  {
    category: "cucina",
    question: "Quale ingrediente è comune nel pandolce genovese?",
    choices: ["Peperoni", "Uvetta", "Pistacchio"],
    answer: 1,
    image: "assets/q/pandolce.jpg",
    explain: "Uvetta e canditi sono ingredienti tipici."
  },
  {
    category: "cucina",
    question: "Quale ingrediente fra questi fa parte della cucina ligure tradizionale?",
    choices: ["Olio", "Zafferano", "Zucchero"],
    answer: 0,
    explain: "Olio, erbe e ingredienti 'puliti' sono tratti comuni."
  },
  {
    category: "dialetto",
    question: "In genovese, come si chiamano spesso i vicoli tipici del centro storico?",
    choices: ["Caruggi", "Passetti", "Vialini"],
    answer: 1,
    explain: "I caruggi sono un simbolo del centro storico genovese."
  },
  {
    category: "dialetto",
    question: "Quale nome genovese è utilizzato per indicare lo 'zio'?",
    choices: ["Barba", "Baffo", "Naso"],
    answer: 0,
    explain: "“La Superba” è un soprannome molto noto di Genova."
  },
  {
    category: "dialetto",
    question: "Quale nome viene dato a Genova per indicare il denaro?",
    choices: ["Saline", "Fiorini", "Palanche"],
    answer: 2,
    explain: "Merenda è un termine comune, e la cultura del 'pezzo' è fortissima a Genova."
  },
  {
    category: "dialetto",
    question: "Il nome 'Boccadasse' viene da una parola genovese, quale?",
    choices: ["Bocca di Assisi", "Bocca d'Asino", "Bocca dell'Assistenza"],
    answer: 1,
    explain: "Boccadasse è un luogo molto iconico e fotografato."
  },
  {
    category: "dialetto",
    question: "Quale parola genovese è usata come soprannome per indicare l'operaio o il muratore?",
    choices: ["Massacàn", "Muratàn", "Lavoratànt"],
    answer: 0,
    explain: "Il soprannome massacàn era usato fin dal Medioevo."
  },
  {
    category: "dialetto",
    question: "Nella cultura genovese, come viene soprannominato un bambino piccolo?",
    choices: ["Popòl", "Papàn", "Pulìn"],
    answer: 2,
    explain: "Pulìn è un nomignolo spesso usato dai genovesi per chiamare il figlio piccolo."
  },
  {
    category: "dialetto",
    question: "Quale parola indica una strada molto stretta che risale la collina?",
    choices: ["Manta", "Crosa", "Lasco"],
    answer: 1,
    explain: "Nei caruggi, 'vicolo' è praticamente la parola base."
  },
  {
    category: "dialetto",
    question: "Qual è il santo patrono di Genova?",
    choices: ["San Giovanni", "San Lorenzo", "San Giorgio"],
    answer: 0,
    explain: "Genova è una delle capitali italiane del cantautorato."
  },
  {
    category: "dialetto",
    question: "Il nome 'Genova' quale significato ha?",
    choices: ["Valle deserta", "Pianura con fiume", "Promontorio a gomito"],
    answer: 2,
    explain: "Il nome Genova è celtico e indica un promontorio a gomito affacciato sul mare."
  },
  {
    category: "dialetto",
    question: "Quale caratteristico nome viene dato dai genovesi a chi viene da fuori città?",
    choices: ["Caciorro", "Foresto", "Marpino"],
    answer: 1,
    explain: "Genova è una città verticale: salite ovunque."
  },
  {
    category: "dialetto",
    question: "Come vengono chiamate le aree del centro storico?",
    choices: ["Sestieri", "Quartieri", "Piazzoni"],
    answer: 0,
    explain: "Molti parlano di rioni/quartieri per identificare le zone cittadine."
  },
  {
    category: "dialetto",
    question: "Quale particola pietra locale è spesso utilizzata nella costruzione dei palazzi e degli edifici?",
    choices: ["Pietra di Mare", "Pietra di Scoglio", "Pietra di Promontorio"],
    answer: 2,
    explain: "A Genova sono diffuse facciate decorate e dipinte."
  },
  {
    category: "dialetto",
    question: "Il soprannome 'gabibbo' che cosa indica?",
    choices: ["I malati", "Gli immigrati", "I vagabondi"],
    answer: 1,
    explain: "Lo stereotipo del genovese riservato è molto diffuso."
  },
  {
    category: "dialetto",
    question: "Come si chiamano tradizionalmente gli operai del porto di Genova?",
    choices: ["Cammolli", "Cammelli", "Camalli"],
    answer: 2,
    explain: "Porto = incontri, scambi, lingue e culture che si mescolano."
  },
  {
    category: "dialetto",
    question: "Il 'mandillo' è un nome genovese che indica un tipo di pasta, ma anche un oggetto di uso quotidiano, quale?",
    choices: ["Il cane", "Il nipote", "Il fazzoletto"],
    answer: 2,
    explain: "Il centro storico genovese è pieno di strati storici."
  },
  {
    category: "dialetto",
    question: "Quale soprannome viene dato a un giovane apprendista?",
    choices: ["Chiodo", "Boccia", "Ferro"],
    answer: 1,
    explain: "Nella cultura locale i nomignoli sono frequenti per luoghi e persone."
  },
  {
    category: "dialetto",
    question: "'Porta Siberia' è la storpiatura del nome originale, sai qual era?",
    choices: ["Porta Cibaria", "Porta Imperia", "Porta Intera"],
    answer: 0,
    explain: "Caruggi e piazzette creano atmosfera e storie."
  },
  {
    category: "dialetto",
    question: "Quale lingua ha influenzato e importato molte parole nel dialetto ligure?",
    choices: ["Inglese", "Cinese", "Arabo"],
    answer: 2,
    explain: "Genova è spesso descritta come città verticale."
  },
  {
    category: "dialetto",
    question: "Quale simbolo è spesso scolpito sopra i portoni delle case del centro storico?",
    choices: ["Sant'Ambrogio", "San Giorgio", "La Lanterna"],
    answer: 1,
    explain: "San Giorgio è simbolo cittadino e identitario."
  },
  {
    category: "dialetto",
    question: "Quale parola è di uso frequente tra i genovesi e descrive bene il 'tono' culturale della città?",
    choices: ["Pota", "Belin", "Ciumbia"],
    answer: 1,
    explain: "Il centro storico è denso, vissuto e ricco di storie."
  },


  // Suggerimento: metti almeno 10-20 domande per evitare ripetizioni.
  // Aggiungine almeno 3 per categoria se vuoi usare la modalità “Tutte le categorie”.
];
