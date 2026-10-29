// Dati modificabili del percorso: aggiungi/rimuovi righe qui, senza cambiare il motore.
// level: P=principale, F=facoltativa, S=sosta.
// lat/lng: coordinate del marker originale.
// progress e distance sono indicativi e non servono al disegno.
(function(){
 'use strict';
 window.GMRoutePoints=window.GMRoutePoints||{};
 window.GMRoutePoints['cs-giornata-marinaio']={
   name:'Giornata del marinaio',
   points:[
    {
        "name": "Casa di Colombo",
        "level": "F",
        "category": "Musei",
        "lat": 44.405546310448685,
        "lng": 8.935051386743934,
        "distance": 36,
        "progress": 0
    },
    {
        "name": "Piazza Dante",
        "level": "P",
        "category": "QR",
        "branch": false,
        "qrGroup": "piazza_dante",
        "qrPoint": "piazza_dante",
        "qrType": "parent",
        "lat": 44.405401869668395,
        "lng": 8.935780907388263,
        "distance": 95,
        "progress": 3
    },
    {
        "name": "Porta Soprana",
        "level": "P",
        "category": "Mura (barbarossa)",
        "lat": 44.405544671546004,
        "lng": 8.93456399360579,
        "distance": 3,
        "progress": 6
    },
    {
        "name": "Piazza de Ferrari",
        "level": "P",
        "category": "QR",
        "branch": false,
        "qrGroup": "piazza_de_ferrari",
        "qrPoint": "piazza_de_ferrari",
        "qrType": "child",
        "lat": 44.407406861533175,
        "lng": 8.93377961521803,
        "distance": 211,
        "progress": 16
    },
    {
        "name": "Piazza Matteotti",
        "level": "P",
        "category": "QR",
        "branch": false,
        "qrGroup": "piazza_de_ferrari",
        "qrPoint": "piazza_matteotti",
        "qrType": "child",
        "lat": 44.40697661301905,
        "lng": 8.932735558901697,
        "distance": 207,
        "progress": 21
    },
    {
        "name": "Giardini Baltimora",
        "level": "P",
        "category": "Parchi/Piazze",
        "lat": 44.40384738359577,
        "lng": 8.934371365786234,
        "distance": 133,
        "progress": 118
    },
    {
        "name": "Sant'Agostino",
        "level": "F",
        "category": "Chiese",
        "lat": 44.404782515199315,
        "lng": 8.931928255372414,
        "distance": 56,
        "progress": 241
    },
    {
        "name": "Museo di Sant'Agostino",
        "level": "P",
        "category": "Musei",
        "lat": 44.40445007718676,
        "lng": 8.93200021513432,
        "distance": 22,
        "progress": 254
    },
    {
        "name": "Torre di Sarzano",
        "level": "P",
        "category": "Mura (barbarossa)",
        "lat": 44.40368980736345,
        "lng": 8.932818255208634,
        "distance": 37,
        "progress": 303
    },
    {
        "name": "SS. Madre di Dio",
        "level": "P",
        "category": "Chiese",
        "lat": 44.403170791628014,
        "lng": 8.932761834548469,
        "distance": 87,
        "progress": 303
    },
    {
        "name": "Basilica di Santa Maria Assunta",
        "level": "F",
        "category": "Chiese",
        "lat": 44.402089811688356,
        "lng": 8.934811694258869,
        "distance": 275,
        "progress": 303
    },
    {
        "name": "Portello di Sarzano",
        "level": "P",
        "category": "Mura (barbarossa)",
        "lat": 44.40395055601178,
        "lng": 8.93185850154224,
        "distance": 0,
        "progress": 363
    },
    {
        "name": "Sarzano/Sant'Agostino",
        "level": "P",
        "category": "Trasporti",
        "lat": 44.40417,
        "lng": 8.93167,
        "distance": 23,
        "progress": 371
    },
    {
        "name": "Piazzetta",
        "level": "P",
        "category": "QR",
        "branch": false,
        "qrGroup": "castello",
        "qrPoint": "piazzetta",
        "qrType": "child",
        "lat": 44.40287052449395,
        "lng": 8.932006353117693,
        "distance": 105,
        "progress": 404
    },
    {
        "name": "Scoglio Campana",
        "level": "P",
        "category": "QR",
        "branch": false,
        "qrGroup": "castello",
        "qrPoint": "campana",
        "qrType": "parent",
        "lat": 44.40338522320385,
        "lng": 8.931322940778454,
        "distance": 53,
        "progress": 431
    },
    {
        "name": "Porta al Castrum",
        "level": "P",
        "category": "Mura (romane)",
        "lat": 44.40407814,
        "lng": 8.93053293,
        "distance": 23,
        "progress": 499
    },
    {
        "name": "Rocca di Sarzano - Castello",
        "level": "P",
        "category": "Mura (barbarossa)",
        "lat": 44.40422716213137,
        "lng": 8.930863684152776,
        "distance": 28,
        "progress": 499
    },
    {
        "name": "Mura delle Grazie",
        "level": "P",
        "category": "QR",
        "branch": false,
        "qrGroup": "castello",
        "qrPoint": "mura_grazie",
        "qrType": "parent",
        "lat": 44.40382060888646,
        "lng": 8.930566983445246,
        "distance": 2,
        "progress": 539
    },
    {
        "name": "Porta del Castrum",
        "level": "P",
        "category": "Mura (carolinge)",
        "lat": 44.40415263668324,
        "lng": 8.930322729452136,
        "distance": 29,
        "progress": 570
    },
    {
        "name": "San Donato",
        "level": "F",
        "category": "Chiese",
        "lat": 44.40576838841076,
        "lng": 8.931474725040777,
        "distance": 147,
        "progress": 847
    },
    {
        "name": "Santa Maria in Passione",
        "level": "P",
        "category": "Chiese",
        "lat": 44.40526350011784,
        "lng": 8.929903474104535,
        "distance": 10,
        "progress": 854
    },
    {
        "name": "Porta del Ferro",
        "level": "F",
        "category": "Mura (romane)",
        "lat": 44.4061439066575,
        "lng": 8.931597018032045,
        "distance": 175,
        "progress": 864
    },
    {
        "name": "Santa Maria di Castello",
        "level": "P",
        "category": "Chiese",
        "lat": 44.40564363061682,
        "lng": 8.92910520013833,
        "distance": 22,
        "progress": 921
    },
    {
        "name": "Santi Cosma e Damiano",
        "level": "P",
        "category": "Chiese",
        "lat": 44.40656932748366,
        "lng": 8.928704285130175,
        "distance": 5,
        "progress": 1047
    },
    {
        "name": "Trattoria delle Grazie",
        "level": "S",
        "category": "Locali",
        "lat": 44.40666653397306,
        "lng": 8.928458760031193,
        "distance": 14,
        "progress": 1079
    },
    {
        "name": "San Torpete",
        "level": "F",
        "category": "Chiese",
        "lat": 44.40716312249104,
        "lng": 8.928968973426853,
        "distance": 8,
        "progress": 1133
    },
    {
        "name": "San Giorgio",
        "level": "P",
        "category": "Chiese",
        "lat": 44.40722420511697,
        "lng": 8.929143936201479,
        "distance": 13,
        "progress": 1149
    },
    {
        "name": "Porta di San Pietro",
        "level": "F",
        "category": "Mura (carolinge)",
        "lat": 44.40870802388585,
        "lng": 8.930046141864452,
        "distance": 178,
        "progress": 1149
    },
    {
        "name": "San Pietro in Banchi",
        "level": "F",
        "category": "Chiese",
        "lat": 44.40896052911481,
        "lng": 8.929869194364812,
        "distance": 198,
        "progress": 1180
    },
    {
        "name": "San Giorgio",
        "level": "S",
        "category": "Trasporti",
        "lat": 44.40861,
        "lng": 8.92861,
        "distance": 127,
        "progress": 1195
    },
    {
        "name": "Palazzo San Giorgio",
        "level": "F",
        "category": "Palazzi",
        "lat": 44.409098611143605,
        "lng": 8.928831489647433,
        "distance": 183,
        "progress": 1195
    },
    {
        "name": "Piazza Cavour",
        "level": "P",
        "category": "QR",
        "branch": false,
        "qrGroup": "molo",
        "qrPoint": "cavour",
        "qrType": "parent",
        "lat": 44.40643883494313,
        "lng": 8.927690363115637,
        "distance": 38,
        "progress": 1301
    },
    {
        "name": "San Marco al Molo",
        "level": "P",
        "category": "Chiese",
        "lat": 44.407254175103326,
        "lng": 8.92644779560332,
        "distance": 13,
        "progress": 1421
    },
    {
        "name": "Porta San Marco",
        "level": "P",
        "category": "Mura (porto)",
        "lat": 44.40758286782437,
        "lng": 8.926245915414432,
        "distance": 0,
        "progress": 1459
    },
    {
        "name": "Mandraccio",
        "level": "P",
        "category": "Acquedotti",
        "lat": 44.409356,
        "lng": 8.92743,
        "distance": 217,
        "progress": 1465
    },
    {
        "name": "San Marco al Molo",
        "level": "P",
        "category": "QR",
        "branch": false,
        "qrGroup": "molo",
        "qrPoint": "san_marco",
        "qrType": "parent",
        "lat": 44.407861182464906,
        "lng": 8.925929425416395,
        "distance": 34,
        "progress": 1466
    },
    {
        "name": "Porta Siberia",
        "level": "P",
        "category": "Mura (rinascimento)",
        "lat": 44.40799579836992,
        "lng": 8.925017026473009,
        "distance": 0,
        "progress": 1603
    },
    {
        "name": "Torre dei Greci",
        "level": "P",
        "category": "Mura (porto)",
        "lat": 44.408085409752616,
        "lng": 8.924392109439044,
        "distance": 24,
        "progress": 1674
    },
    {
        "name": "Porta Siberia",
        "level": "P",
        "category": "QR",
        "branch": false,
        "qrGroup": "molo",
        "qrPoint": "siberia",
        "qrType": "parent",
        "lat": 44.408279620719604,
        "lng": 8.923917198032887,
        "distance": 4,
        "progress": 1719
    }
]
 };
})();
