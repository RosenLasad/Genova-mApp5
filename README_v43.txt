Genova mApp - v43

Modifica mirata alla New Home:
- aggiunta scorciatoia mappa nell'intestazione delle pagine delle categorie principali che hanno un comando corrispondente nella toolbar laterale;
- aggiunta scorciatoia mappa nell'intestazione delle sotto-categorie che hanno un proprio comando marker/layer;
- le scorciatoie riutilizzano i comandi reali della mappa: non duplicano la logica dei marker;
- il pulsante della categoria principale apre il relativo gruppo della toolbar dopo aver chiuso la New Home;
- il pulsante della sotto-categoria assicura che il relativo layer sia attivo e poi mostra la mappa;
- icone, stato attivo, focus tastiera e layout RTL/mobile supportati;
- mantenuta la compattazione verticale introdotta con v42;
- migliorata la ricerca del comando mappa con fallback globale, utile anche per comandi non ospitati dentro #quick-toggles.

File da sovrascrivere:
- index.html
- new-home/new-home.css
- new-home/new-home.js
