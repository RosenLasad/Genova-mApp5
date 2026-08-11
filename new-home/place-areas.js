(function(){
  'use strict';

  window.GM_PLACE_AREAS = {
    'fav-list-forti': [
      {name:'Righi e Parco delle Mura', places:['Forte Castellaccio','Forte Puin','Forte Begato','Forte Sperone']},
      {name:'Trensasco e Due Fratelli', places:['Forte Fratello Minore','Forte Fratello Maggiore']},
      {name:'Albaro e San Giuliano', places:['Forte San Giuliano']},
      {name:'San Martino', places:['Forte San Martino']},
      {name:'Cornigliano ed Erzelli', places:['Forte Casale Erselli','Forte Monte Croce']},
      {name:'San Teodoro e Granarolo', places:['Forte Tenaglia']},
      {name:'Sampierdarena', places:['Forte Belvedere','Forte Crocetta']},
      {name:'Sestri Ponente e Monte Gazzo', places:['Forte Monte Guano']},
      {name:'Quezzi e Monte Ratti', places:['Forte Richelieu','Forte Monteratti','Forte Quezzi','Torre di Montelongone']},
      {name:'San Fruttuoso', places:['Forte Santa Tecla']},
      {name:'Oregina e Lagaccio', places:['Forte San Giorgio']},
      {name:'Sant’Olcese', places:['Forte Diamante']},
      {name:'Serra Riccò', places:['Castello di San Cipriano']}
    ],
    'fav-list-musei': [
      {name:'Centro storico', places:["Museo di Sant'Agostino",'Casa di Colombo','Palazzo Rosso','Palazzo Bianco','Palazzo Tursi','Palazzo Spinola','Museo del Risorgimento','Museo del Tesoro di San Lorenzo','Museo Diocesano',"Museo dell'Accademia Ligustica di Belle Arti",'Via del Campo 29/rosso','Museo della Storia del Genoa','Genoa Port Center']},
      {name:'Pré, Darsena e Balbi', places:['Galata Museo del Mare',"MEI Museo Nazionale dell'Emigrazione Italiana",'Palazzo Reale di Genova']},
      {name:'Principe e San Teodoro', places:['Villa del Principe']},
      {name:'Castelletto', places:["Castello D'Albertis Museo delle Culture del Mondo",'Museo Ebraico di Genova']},
      {name:'Portoria e Acquasola', places:["Museo d'Arte Orientale E. Chiossone",'Museo dei Beni Culturali Cappuccini',"Museo Biblioteca dell'Attore"]},
      {name:'Foce', places:['Museo di Storia Naturale Giacomo Doria']},
      {name:'San Benigno e Sampierdarena', places:['Complesso Monumentale della Lanterna']},
      {name:'Nervi', places:['Raccolte Frugone','Wolfsoniana',"GAM Galleria d'Arte Moderna",'Villa Giannettino Luxoro']},
      {name:'Pegli', places:['Museo di Archeologia Ligure','Museo Navale di Pegli – Villa Doria Centurione']},
      {name:'Certosa', places:['MUCE - Museo Certosa di Genova']},
      {name:'San Martino', places:['Museo di Chimica']},
      {name:'Carignano', places:["Museo d'Arte Contemporanea di Villa Croce"]},
      {name:'Sestri Ponente e Monte Gazzo', places:['Museo speleologico del Monte Gazzo']},
      {name:'Acquasanta e Mele', places:['Museo della carta di Mele']}
    ],
    'fav-list-chiese': [
      {name:'Pré e Balbi', places:['San Sisto','San Giovanni di Prè','San Vittore',"Sant'Antonio a Prè",'Santi Gerolamo e Francesco Saverio','Santissima Annunziata del Vastato','Santa Fede']},
      {name:'Maddalena, Carmine e Strada Nuova', places:['San Nicolosio','San Filippo Neri','San Marcellino','San Pancrazio','Basilica di San Siro','San Luca','San Matteo','Santa Maria delle Vigne','Santa Maria Maddalena e San Girolamo Emiliani']},
      {name:'Molo e Sarzano', places:['Cattedrale di San Lorenzo','Santa Maria di Castello','Santa Maria in Passione','San Salvatore',"Sant'Agostino",'SS. Madre di Dio','Santi Cosma e Damiano','San Pietro in Banchi','San Marco al Molo','San Giorgio','San Torpete','Chiesa delle Scuole Pie','Chiesa del Gesù, di Sant’Ambrogio e Sant’Andrea','San Donato']},
      {name:'San Teodoro e Granarolo', places:['San Teodoro',"San Vincenzo de' Paoli",'San Francesco da Paola','San Rocco','San Benedetto al Porto']},
      {name:'Oregina e Lagaccio', places:['San Tommaso Apostolo e San Leone Magno','Santuario di N.S. di Loreto']},
      {name:'Castelletto e Circonvallazione', places:['San Barnaba','Santuario della Madonnetta','Nostra Signora delle Grazie e San Gerolamo','Santa Maria della Sanità','San Bartolomeo degli Armeni','Basilica di Santa Maria Immacolata','Chiesa della Santissima Concezione']},
      {name:'San Vincenzo e Portoria', places:['Chiesa dello Spirito Santo','Santa Croce e San Camillo de Lellis','Santo Stefano','Nostra Signora della Consolazione','Santa Marta']},
      {name:'Carignano', places:['Basilica di Santa Maria Assunta','Santa Maria in Via Lata']},
      {name:'Foce', places:['Santa Maria dei Servi','Nostra Signora del Rimedio']},
      {name:'San Fruttuoso e Marassi', places:['Santa Sabina','Nostra Signora degli Angeli','Maria Santissima della Misericordia e Santa Fede']},
      {name:'San Martino', places:['Monastero di Santa Chiara']},
      {name:'Sampierdarena e Promontorio', places:['San Bartolomeo Apostolo al Promontorio','Santa Maria delle Grazie - la Nuova']}
    ],
    'fav-list-palazzi': [
      {name:'Maddalena e Strada Nuova', places:['Palazzo Ambrogio De Nigro','Palazzo Cipriano Pallavicini','Palazzo della Meridiana','Palazzo Tobia Pallavicino','Palazzo Nicolosio Lomellino','Palazzo Andrea Pitto','Palazzo Interiano Pallavicino']},
      {name:'Portoria, Fontane Marose e Santa Caterina', places:['Palazzo Doria Spinola','Palazzo Della Rovere','Palazzo Giorgio Spinola','Palazzo Agostino Ayrolo','Palazzo Tommaso Spinola']},
      {name:'Pré e Balbi', places:['Palazzo Balbi Senarega','Palazzo Francesco Maria Balbi Piovera',"Palazzo Marc'Aurelio Rebuffo"]},
      {name:'Molo e De Ferrari', places:['Palazzo San Giorgio','Palazzo della Borsa','Palazzo Ducale']}
    ],
    'fav-list-mostre': [
      {name:'Porto Antico e Molo', places:['Acquario di Genova','FantaCinema','La Città dei Bambini e dei Ragazzi']},
      {name:'Centro e De Ferrari', places:['Palazzo Ducale']}
    ],
    'fav-list-teatri': [
      {name:'Molo e Sarzano', places:['Teatro della Tosse','Lunaria Teatro']},
      {name:'Maddalena e Strada Nuova', places:['Stradanuova Teatro Centrale','TIQU – Teatro Internazionale di Quartiere']},
      {name:'De Ferrari e Portoria', places:['Opera Carlo Felice','Teatro Eleonora Duse','Politeama Genovese']},
      {name:'Foce', places:['Teatro Ivo Chiesa','Teatro della Gioventù','La Quinta Praticabile – Teatro Instabile']},
      {name:'Sampierdarena', places:['Teatro Gustavo Modena']},
      {name:'Sestri Ponente', places:['Teatro Verdi','Teatro Akropolis']},
      {name:'Bolzaneto', places:['Teatro Rina e Gilberto Govi']},
      {name:'San Fruttuoso', places:['Teatro Garage']},
      {name:'Marassi', places:["Teatro dell'Arca"]},
      {name:'Molassana e Alta Val Bisagno', places:['Teatro dell’Ortica']},
      {name:'Voltri', places:['Teatro del Ponente']}
    ],
    'fav-list-cinema': [
      {name:'Porto Antico e Molo', places:['The Space Cinema - Porto Antico']},
      {name:'Centro e De Ferrari', places:['Circuito City','Circuito Ariston']},
      {name:'San Vincenzo e Portoria', places:['Circuito America','Circuito Sivori','Nickelodeon']},
      {name:'Carignano', places:['Circuito Corallo']},
      {name:'Foce', places:['Circuito Odeon']},
      {name:'Castelletto', places:['Cineclub Fritz Lang']},
      {name:'Sampierdarena', places:['Club Amici del Cinema','UCI Luxe Fiumara']},
      {name:'Rivarolo', places:['Albatros']},
      {name:'Sestri Ponente', places:['Cinema Verdi']},
      {name:'Pra’ e Palmaro', places:['Nuovo Cinema Palmaro']},
      {name:'Quinto', places:['Circuito San Pietro']},
      {name:'Nervi', places:['San Siro Nervicinema']}
    ],
    'fav-list-parchi-piazze': [
      {name:'Carignano', places:['Giardini Baltimora','Giardini Villa Croce']},
      {name:'San Vincenzo, Portoria e Acquasola', places:['Giardini di Piazza Verdi','Spianata Acquasola','Villetta Di Negro']},
      {name:'Castelletto e Carmine', places:['Giardini Combattenti Alleati','Giardini Maestri del Lavoro','Giardini di Villa Piaggio','Giardini di Giuseppe Dossetti','Villa Gruber',"Parco del Castello D'Albertis","Orto Botanico dell'Università di Genova"]},
      {name:'Oregina e Lagaccio', places:['Giardini Eugenio Montale']},
      {name:'Pré e Balbi', places:['Giardini di Palazzo Reale']},
      {name:'Principe, Dinegro e San Teodoro', places:['Giardini di Villa del Principe','Parco di Villa Rosazza']},
      {name:'Albaro e Boccadasse', places:['Giardini Gilberto Govi','Parco Alberto Dalla Chiesa','Giardini Antonino Casu']},
      {name:'San Fruttuoso', places:['Giardini di Villa Imperiale','Bosco dei Frati Minori']},
      {name:'Quarto', places:['Il Pratone','Parco di Villa Quartara']},
      {name:'Quinto', places:['Giardini di Quinto']},
      {name:'Nervi e Capolungo', places:['Parchi di Nervi','Parco di Villa Luxoro']},
      {name:'Cornigliano', places:['Parco di Villa Durazzo Bombrini']},
      {name:'Sampierdarena', places:['Parco di Villa Imperiale Scassi']},
      {name:'Sestri Ponente e Monte Gazzo', places:['Parco di Villa Rossi Martini','Bosco del Monte Gazzo']},
      {name:'Pegli', places:['Parco di Villa Durazzo Pallavicini','Parco di Villa Centurione Doria','Giardino Botanico Clelia Durazzo Grimaldi','Giardini di Villa Banfi']},
      {name:'Pra’', places:['Parco comunale di Villa Sauli Pallavicino']},
      {name:'Voltri', places:['Parco di Villa Duchessa di Galliera','Giardini di Villa Bruzzone']},
      {name:'Pontedecimo', places:['Parco di Villa Gallino']},
      {name:'Righi e Parco delle Mura', places:['Parco delle Mura e del Peralto','Parco del Castellaccio']},
      {name:'Apparizione e Monte Fasce', places:['Bosco e Parco Naturale del Monte Fasce']}
    ],
    'fav-list-sport': [
      {name:'Marassi', places:['Stadio Luigi Ferraris']},
      {name:'Albaro e San Martino', places:['Arena Albaro Village','Cus Genova','Sporting Club Genova','Vita Genova']},
      {name:'Carignano', places:['ASD S.G. Andrea Doria']},
      {name:'Molassana e Val Bisagno', places:['Impianto Sportivo Sciorba']}
    ],
    'fav-list-locali': [
      {name:'Centro storico e Molo', places:['Bar 2 colpi']},
      {name:'Pré e Darsena', places:['Count Basie Jazz Club']},
      {name:'Portoria e Centro', places:['Tao Disco Club']},
      {name:'San Benigno e Sampierdarena', places:['Music for Peace']},
      {name:'Carmine', places:['Together Bar']}
    ],
    'fav-list-ristoranti': [
      {name:'Molo', places:['Trattoria delle Grazie']},
      {name:'Portoria e Centro', places:['Ristorante Trattoria da Maria']},
      {name:'Pré e Darsena', places:['Trattoria da Mario']}
    ],
    'fav-list-take-away': [
      {name:'Molo e Canneto', places:['Tapullo Street Genova',"Roast 'n Roll"]},
      {name:'San Lorenzo e Scurreria', places:['Tasche Piene']}
    ],
    'fav-list-alloggi': [
      {name:'Centro storico e Molo', places:['B&B La Piazzetta Rooms',"B&B Dell'Acquario"]},
      {name:'Principe', places:['Hotel Continental']}
    ]
  };
})();
