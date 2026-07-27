/* Genova mApp - Taccuino di viaggio
   Interfaccia a tre segnalibri: Note, Percorsi, Preferiti.
   I dati restano nel localStorage del browser e non richiedono un server. */
(function(){
  'use strict';
  if(window.__GENOVA_TACCUINO_V2__) return;
  window.__GENOVA_TACCUINO_V2__ = true;

  var ROUTES_KEY = 'genova_taccuino_routes_v1';
  var DRAFT_KEY = 'genova_taccuino_draft_v1';
  var NOTES_KEY = 'genova_taccuino_notes_v1';
  var LAST_NOTE_KEY = 'genova_taccuino_last_note_v1';
  var FAVORITES_SORT_KEY = 'genova_taccuino_favorites_sort_v1';

  var state = {
    ready: false,
    view: 'notes',
    previousView: 'notes',
    selectedFavKey: '',
    route: null,
    favCache: [],
    favByKey: {},
    mapVisible: false,
    mapRouteId: null,
    expandedRouteId: '',
    noteId: '',
    pageTimer: null,
    favoritesSort: 'alphabetical'
  };

  var TXT = {
    it: {
      title: 'Taccuino', subtitle: 'Il tuo viaggio a Genova', close: 'Chiudi', back: 'Indietro',
      tabFavorites: 'Preferiti', tabRoutes: 'Percorsi', tabNotes: 'Note',
      favoritesTitle: 'I tuoi luoghi preferiti', favoritesHelp: 'Tocca un luogo per aprire la sua pagina.',
      sortBy: 'Ordina i preferiti', sortAlphabetical: 'Alfabetico', sortCategory: 'Per categoria',
      otherCategory: 'Altri luoghi',
      emptyFavs: 'Non hai ancora salvato luoghi. Aggiungili con la stellina ⭐ dal pannello Vai, vedi, fai.',
      favoriteRoute: 'Percorso', favoriteNote: 'Nota', notePh: 'Scrivi una nota per questa tappa...',
      add: 'Aggiungi', update: 'Aggiorna', gps: 'GPS', currentRoute: 'Percorso in modifica',
      alreadyInRoute: 'Già presente nel percorso in modifica', addedOk: 'Tappa aggiunta al percorso.',
      updatedOk: 'Tappa aggiornata.', noRoute: 'Nuovo percorso',
      routesTitle: 'Percorsi salvati', routesHelp: 'Tocca il nome per vedere le tappe; usa Apri per modificarlo.',
      expandRoute: 'Mostra le tappe del percorso', collapseRoute: 'Nascondi le tappe del percorso',
      emptySaved: 'Non hai ancora salvato percorsi.', newRoute: 'Nuovo percorso',
      open: 'Apri', show: 'Mostra', hide: 'Nascondi', duplicate: 'Duplica', del: 'Elimina',
      visibleOnMap: 'visibile sulla mappa', loadedBadge: 'in modifica', stops: 'tappe',
      routeDetailTitle: 'Percorso', routeName: 'Nome percorso', routeNamePh: 'Es. Mattina nel centro storico',
      date: 'Data', routeColor: 'Colore', save: 'Aggiorna percorso', saveNew: 'Salva percorso',
      saveAsNew: 'Salva come nuovo', showMap: 'Mostra sulla mappa', hideMap: 'Nascondi dalla mappa',
      copy: 'Copia elenco', addFromFavorites: 'Aggiungi dai Preferiti', routeStops: 'Tappe del percorso',
      emptyRoute: 'Il percorso non contiene ancora tappe.', time: 'Ora', note: 'Nota',
      up: 'Sposta su', down: 'Sposta giù', remove: 'Rimuovi', unnamed: 'Percorso senza nome',
      savedOk: 'Percorso salvato.', copied: 'Percorso copiato negli appunti.',
      confirmDelete: 'Eliminare questo percorso?', confirmDeleteNote: 'Eliminare questa pagina di note?',
      noCoords: 'Non ho trovato coordinate sufficienti per mostrare il percorso.',
      mapShown: 'Percorso mostrato sulla mappa.', mapHidden: 'Percorso nascosto dalla mappa.',
      notesTitle: 'Appunti di viaggio', notesHelp: 'Le note vengono salvate automaticamente su questo dispositivo.',
      noteTitle: 'Titolo facoltativo', noteTitlePh: 'Titolo della pagina', noteBodyPh: 'Scrivi qui i tuoi appunti...',
      newNote: 'Nuova pagina', previousNote: 'Pagina precedente', nextNote: 'Pagina successiva',
      deleteNote: 'Elimina pagina', page: 'Pagina', of: 'di', noteSaved: 'Nota salvata automaticamente.',
      created: 'Creata', modified: 'Modificata', copySuffix: 'copia'
    },
    en: {
      title: 'Notebook', subtitle: 'Your journey through Genoa', close: 'Close', back: 'Back',
      tabFavorites: 'Favourites', tabRoutes: 'Routes', tabNotes: 'Notes',
      favoritesTitle: 'Your favourite places', favoritesHelp: 'Tap a place to open its page.',
      sortBy: 'Sort favourites', sortAlphabetical: 'Alphabetical', sortCategory: 'By category',
      otherCategory: 'Other places',
      emptyFavs: 'You have not saved any places yet. Add them with the ⭐ star in the Places panel.',
      favoriteRoute: 'Route', favoriteNote: 'Note', notePh: 'Write a note for this stop...',
      add: 'Add', update: 'Update', gps: 'GPS', currentRoute: 'Route being edited',
      alreadyInRoute: 'Already in the route being edited', addedOk: 'Stop added to the route.',
      updatedOk: 'Stop updated.', noRoute: 'New route',
      routesTitle: 'Saved routes', routesHelp: 'Tap the name to see its stops; use Open to edit it.',
      expandRoute: 'Show route stops', collapseRoute: 'Hide route stops',
      emptySaved: 'You have not saved any routes yet.', newRoute: 'New route',
      open: 'Open', show: 'Show', hide: 'Hide', duplicate: 'Duplicate', del: 'Delete',
      visibleOnMap: 'visible on map', loadedBadge: 'being edited', stops: 'stops',
      routeDetailTitle: 'Route', routeName: 'Route name', routeNamePh: 'E.g. Morning in the old town',
      date: 'Date', routeColor: 'Colour', save: 'Update route', saveNew: 'Save route',
      saveAsNew: 'Save as new', showMap: 'Show on map', hideMap: 'Hide from map',
      copy: 'Copy list', addFromFavorites: 'Add from Favourites', routeStops: 'Route stops',
      emptyRoute: 'This route does not contain any stops yet.', time: 'Time', note: 'Note',
      up: 'Move up', down: 'Move down', remove: 'Remove', unnamed: 'Unnamed route',
      savedOk: 'Route saved.', copied: 'Route copied to clipboard.',
      confirmDelete: 'Delete this route?', confirmDeleteNote: 'Delete this notes page?',
      noCoords: 'Not enough coordinates were found to show the route.',
      mapShown: 'Route shown on the map.', mapHidden: 'Route hidden from the map.',
      notesTitle: 'Travel notes', notesHelp: 'Notes are saved automatically on this device.',
      noteTitle: 'Optional title', noteTitlePh: 'Page title', noteBodyPh: 'Write your notes here...',
      newNote: 'New page', previousNote: 'Previous page', nextNote: 'Next page',
      deleteNote: 'Delete page', page: 'Page', of: 'of', noteSaved: 'Note saved automatically.',
      created: 'Created', modified: 'Modified', copySuffix: 'copy'
    },
    es: {
      title: 'Cuaderno', subtitle: 'Tu viaje por Génova', close: 'Cerrar', back: 'Atrás',
      tabFavorites: 'Favoritos', tabRoutes: 'Rutas', tabNotes: 'Notas',
      favoritesTitle: 'Tus lugares favoritos', favoritesHelp: 'Toca un lugar para abrir su página.',
      sortBy: 'Ordenar favoritos', sortAlphabetical: 'Alfabético', sortCategory: 'Por categoría',
      otherCategory: 'Otros lugares',
      emptyFavs: 'Todavía no has guardado ningún lugar. Añádelo con la estrella ⭐ desde el panel Qué ver y hacer.',
      favoriteRoute: 'Ruta', favoriteNote: 'Nota', notePh: 'Escribe una nota para esta etapa...',
      add: 'Añadir', update: 'Actualizar', gps: 'GPS', currentRoute: 'Ruta en edición',
      alreadyInRoute: 'Ya está en la ruta que estás editando', addedOk: 'Etapa añadida a la ruta.',
      updatedOk: 'Etapa actualizada.', noRoute: 'Nueva ruta',
      routesTitle: 'Rutas guardadas', routesHelp: 'Toca el nombre para ver las etapas; usa Abrir para modificarla.',
      expandRoute: 'Mostrar las etapas de la ruta', collapseRoute: 'Ocultar las etapas de la ruta',
      emptySaved: 'Todavía no has guardado ninguna ruta.', newRoute: 'Nueva ruta',
      open: 'Abrir', show: 'Mostrar', hide: 'Ocultar', duplicate: 'Duplicar', del: 'Eliminar',
      visibleOnMap: 'visible en el mapa', loadedBadge: 'en edición', stops: 'etapas',
      routeDetailTitle: 'Ruta', routeName: 'Nombre de la ruta', routeNamePh: 'Ej. Mañana en el centro histórico',
      date: 'Fecha', routeColor: 'Color', save: 'Actualizar ruta', saveNew: 'Guardar ruta',
      saveAsNew: 'Guardar como nueva', showMap: 'Mostrar en el mapa', hideMap: 'Ocultar del mapa',
      copy: 'Copiar lista', addFromFavorites: 'Añadir desde Favoritos', routeStops: 'Etapas de la ruta',
      emptyRoute: 'La ruta todavía no contiene etapas.', time: 'Hora', note: 'Nota',
      up: 'Subir', down: 'Bajar', remove: 'Quitar', unnamed: 'Ruta sin nombre',
      savedOk: 'Ruta guardada.', copied: 'Ruta copiada al portapapeles.',
      confirmDelete: '¿Eliminar esta ruta?', confirmDeleteNote: '¿Eliminar esta página de notas?',
      noCoords: 'No se han encontrado coordenadas suficientes para mostrar la ruta.',
      mapShown: 'Ruta mostrada en el mapa.', mapHidden: 'Ruta ocultada del mapa.',
      notesTitle: 'Apuntes de viaje', notesHelp: 'Las notas se guardan automáticamente en este dispositivo.',
      noteTitle: 'Título opcional', noteTitlePh: 'Título de la página', noteBodyPh: 'Escribe aquí tus apuntes...',
      newNote: 'Nueva página', previousNote: 'Página anterior', nextNote: 'Página siguiente',
      deleteNote: 'Eliminar página', page: 'Página', of: 'de', noteSaved: 'Nota guardada automáticamente.',
      created: 'Creada', modified: 'Modificada', copySuffix: 'copia'
    },
    fr: {
      title: 'Carnet', subtitle: 'Votre voyage à Gênes', close: 'Fermer', back: 'Retour',
      tabFavorites: 'Favoris', tabRoutes: 'Parcours', tabNotes: 'Notes',
      favoritesTitle: 'Vos lieux favoris', favoritesHelp: 'Touchez un lieu pour ouvrir sa page.',
      sortBy: 'Trier les favoris', sortAlphabetical: 'Alphabétique', sortCategory: 'Par catégorie',
      otherCategory: 'Autres lieux',
      emptyFavs: 'Vous n’avez encore enregistré aucun lieu. Ajoutez-en avec l’étoile ⭐ depuis le panneau À voir et à faire.',
      favoriteRoute: 'Parcours', favoriteNote: 'Note', notePh: 'Écrivez une note pour cette étape...',
      add: 'Ajouter', update: 'Mettre à jour', gps: 'GPS', currentRoute: 'Parcours en cours de modification',
      alreadyInRoute: 'Déjà présent dans le parcours en cours de modification', addedOk: 'Étape ajoutée au parcours.',
      updatedOk: 'Étape mise à jour.', noRoute: 'Nouveau parcours',
      routesTitle: 'Parcours enregistrés', routesHelp: 'Touchez le nom pour voir les étapes ; utilisez Ouvrir pour le modifier.',
      expandRoute: 'Afficher les étapes du parcours', collapseRoute: 'Masquer les étapes du parcours',
      emptySaved: 'Vous n’avez encore enregistré aucun parcours.', newRoute: 'Nouveau parcours',
      open: 'Ouvrir', show: 'Afficher', hide: 'Masquer', duplicate: 'Dupliquer', del: 'Supprimer',
      visibleOnMap: 'visible sur la carte', loadedBadge: 'en cours de modification', stops: 'étapes',
      routeDetailTitle: 'Parcours', routeName: 'Nom du parcours', routeNamePh: 'Ex. Matinée dans le centre historique',
      date: 'Date', routeColor: 'Couleur', save: 'Mettre à jour le parcours', saveNew: 'Enregistrer le parcours',
      saveAsNew: 'Enregistrer comme nouveau', showMap: 'Afficher sur la carte', hideMap: 'Masquer de la carte',
      copy: 'Copier la liste', addFromFavorites: 'Ajouter depuis les Favoris', routeStops: 'Étapes du parcours',
      emptyRoute: 'Ce parcours ne contient encore aucune étape.', time: 'Heure', note: 'Note',
      up: 'Monter', down: 'Descendre', remove: 'Retirer', unnamed: 'Parcours sans nom',
      savedOk: 'Parcours enregistré.', copied: 'Parcours copié dans le presse-papiers.',
      confirmDelete: 'Supprimer ce parcours ?', confirmDeleteNote: 'Supprimer cette page de notes ?',
      noCoords: 'Les coordonnées sont insuffisantes pour afficher le parcours.',
      mapShown: 'Parcours affiché sur la carte.', mapHidden: 'Parcours masqué de la carte.',
      notesTitle: 'Notes de voyage', notesHelp: 'Les notes sont enregistrées automatiquement sur cet appareil.',
      noteTitle: 'Titre facultatif', noteTitlePh: 'Titre de la page', noteBodyPh: 'Écrivez vos notes ici...',
      newNote: 'Nouvelle page', previousNote: 'Page précédente', nextNote: 'Page suivante',
      deleteNote: 'Supprimer la page', page: 'Page', of: 'sur', noteSaved: 'Note enregistrée automatiquement.',
      created: 'Créée', modified: 'Modifiée', copySuffix: 'copie'
    },
    ar: {
      title: 'دفتر الرحلة', subtitle: 'رحلتك في جنوة', close: 'إغلاق', back: 'رجوع',
      tabFavorites: 'المفضلة', tabRoutes: 'المسارات', tabNotes: 'الملاحظات',
      favoritesTitle: 'أماكنك المفضلة', favoritesHelp: 'المس مكاناً لفتح صفحته.',
      sortBy: 'ترتيب المفضلة', sortAlphabetical: 'أبجدياً', sortCategory: 'حسب الفئة',
      otherCategory: 'أماكن أخرى',
      emptyFavs: 'لم تحفظ أي أماكن بعد. أضفها بواسطة النجمة ⭐ من لوحة الأماكن والأنشطة.',
      favoriteRoute: 'المسار', favoriteNote: 'ملاحظة', notePh: 'اكتب ملاحظة لهذه المحطة...',
      add: 'إضافة', update: 'تحديث', gps: 'GPS', currentRoute: 'المسار قيد التعديل',
      alreadyInRoute: 'موجود بالفعل في المسار قيد التعديل', addedOk: 'أُضيفت المحطة إلى المسار.',
      updatedOk: 'تم تحديث المحطة.', noRoute: 'مسار جديد',
      routesTitle: 'المسارات المحفوظة', routesHelp: 'المس الاسم لرؤية المحطات؛ استخدم فتح لتعديل المسار.',
      expandRoute: 'إظهار محطات المسار', collapseRoute: 'إخفاء محطات المسار',
      emptySaved: 'لم تحفظ أي مسارات بعد.', newRoute: 'مسار جديد',
      open: 'فتح', show: 'إظهار', hide: 'إخفاء', duplicate: 'تكرار', del: 'حذف',
      visibleOnMap: 'ظاهر على الخريطة', loadedBadge: 'قيد التعديل', stops: 'محطات',
      routeDetailTitle: 'المسار', routeName: 'اسم المسار', routeNamePh: 'مثال: صباح في المركز التاريخي',
      date: 'التاريخ', routeColor: 'اللون', save: 'تحديث المسار', saveNew: 'حفظ المسار',
      saveAsNew: 'حفظ كمسار جديد', showMap: 'إظهار على الخريطة', hideMap: 'إخفاء من الخريطة',
      copy: 'نسخ القائمة', addFromFavorites: 'إضافة من المفضلة', routeStops: 'محطات المسار',
      emptyRoute: 'لا يحتوي المسار على محطات بعد.', time: 'الوقت', note: 'ملاحظة',
      up: 'نقل إلى أعلى', down: 'نقل إلى أسفل', remove: 'إزالة', unnamed: 'مسار بلا اسم',
      savedOk: 'تم حفظ المسار.', copied: 'تم نسخ المسار إلى الحافظة.',
      confirmDelete: 'هل تريد حذف هذا المسار؟', confirmDeleteNote: 'هل تريد حذف صفحة الملاحظات هذه؟',
      noCoords: 'لم يتم العثور على إحداثيات كافية لإظهار المسار.',
      mapShown: 'تم إظهار المسار على الخريطة.', mapHidden: 'تم إخفاء المسار من الخريطة.',
      notesTitle: 'ملاحظات الرحلة', notesHelp: 'تُحفظ الملاحظات تلقائياً على هذا الجهاز.',
      noteTitle: 'عنوان اختياري', noteTitlePh: 'عنوان الصفحة', noteBodyPh: 'اكتب ملاحظاتك هنا...',
      newNote: 'صفحة جديدة', previousNote: 'الصفحة السابقة', nextNote: 'الصفحة التالية',
      deleteNote: 'حذف الصفحة', page: 'صفحة', of: 'من', noteSaved: 'تم حفظ الملاحظة تلقائياً.',
      created: 'أُنشئت', modified: 'عُدّلت', copySuffix: 'نسخة'
    },
    ru: {
      title: 'Блокнот', subtitle: 'Ваше путешествие по Генуе', close: 'Закрыть', back: 'Назад',
      tabFavorites: 'Избранное', tabRoutes: 'Маршруты', tabNotes: 'Заметки',
      favoritesTitle: 'Ваши любимые места', favoritesHelp: 'Нажмите на место, чтобы открыть его страницу.',
      sortBy: 'Сортировать избранное', sortAlphabetical: 'По алфавиту', sortCategory: 'По категориям',
      otherCategory: 'Другие места',
      emptyFavs: 'Вы ещё не сохранили ни одного места. Добавляйте их с помощью звезды ⭐ на панели мест и занятий.',
      favoriteRoute: 'Маршрут', favoriteNote: 'Заметка', notePh: 'Напишите заметку для этой остановки...',
      add: 'Добавить', update: 'Обновить', gps: 'GPS', currentRoute: 'Редактируемый маршрут',
      alreadyInRoute: 'Уже добавлено в редактируемый маршрут', addedOk: 'Остановка добавлена в маршрут.',
      updatedOk: 'Остановка обновлена.', noRoute: 'Новый маршрут',
      routesTitle: 'Сохранённые маршруты', routesHelp: 'Нажмите на название, чтобы увидеть остановки; используйте «Открыть» для редактирования.',
      expandRoute: 'Показать остановки маршрута', collapseRoute: 'Скрыть остановки маршрута',
      emptySaved: 'Вы ещё не сохранили маршруты.', newRoute: 'Новый маршрут',
      open: 'Открыть', show: 'Показать', hide: 'Скрыть', duplicate: 'Дублировать', del: 'Удалить',
      visibleOnMap: 'показан на карте', loadedBadge: 'редактируется', stops: 'остановок',
      routeDetailTitle: 'Маршрут', routeName: 'Название маршрута', routeNamePh: 'Напр. Утро в историческом центре',
      date: 'Дата', routeColor: 'Цвет', save: 'Обновить маршрут', saveNew: 'Сохранить маршрут',
      saveAsNew: 'Сохранить как новый', showMap: 'Показать на карте', hideMap: 'Скрыть с карты',
      copy: 'Копировать список', addFromFavorites: 'Добавить из Избранного', routeStops: 'Остановки маршрута',
      emptyRoute: 'В этом маршруте пока нет остановок.', time: 'Время', note: 'Заметка',
      up: 'Переместить вверх', down: 'Переместить вниз', remove: 'Убрать', unnamed: 'Маршрут без названия',
      savedOk: 'Маршрут сохранён.', copied: 'Маршрут скопирован в буфер обмена.',
      confirmDelete: 'Удалить этот маршрут?', confirmDeleteNote: 'Удалить эту страницу заметок?',
      noCoords: 'Недостаточно координат для отображения маршрута.',
      mapShown: 'Маршрут показан на карте.', mapHidden: 'Маршрут скрыт с карты.',
      notesTitle: 'Путевые заметки', notesHelp: 'Заметки автоматически сохраняются на этом устройстве.',
      noteTitle: 'Необязательный заголовок', noteTitlePh: 'Заголовок страницы', noteBodyPh: 'Пишите заметки здесь...',
      newNote: 'Новая страница', previousNote: 'Предыдущая страница', nextNote: 'Следующая страница',
      deleteNote: 'Удалить страницу', page: 'Страница', of: 'из', noteSaved: 'Заметка сохранена автоматически.',
      created: 'Создана', modified: 'Изменена', copySuffix: 'копия'
    },
    zh: {
      title: '旅行手册', subtitle: '您的热那亚之旅', close: '关闭', back: '返回',
      tabFavorites: '收藏', tabRoutes: '路线', tabNotes: '笔记',
      favoritesTitle: '您收藏的地点', favoritesHelp: '点击地点即可打开其页面。',
      sortBy: '收藏排序', sortAlphabetical: '按字母', sortCategory: '按类别',
      otherCategory: '其他地点',
      emptyFavs: '您尚未收藏任何地点。请在地点和活动面板中点击星标 ⭐ 添加。',
      favoriteRoute: '路线', favoriteNote: '备注', notePh: '为此站点写一条备注……',
      add: '添加', update: '更新', gps: 'GPS', currentRoute: '正在编辑的路线',
      alreadyInRoute: '已在当前编辑的路线中', addedOk: '站点已添加到路线。',
      updatedOk: '站点已更新。', noRoute: '新路线',
      routesTitle: '已保存的路线', routesHelp: '点击名称查看站点；使用“打开”进行编辑。',
      expandRoute: '显示路线站点', collapseRoute: '隐藏路线站点',
      emptySaved: '您尚未保存任何路线。', newRoute: '新路线',
      open: '打开', show: '显示', hide: '隐藏', duplicate: '复制', del: '删除',
      visibleOnMap: '已显示在地图上', loadedBadge: '正在编辑', stops: '个站点',
      routeDetailTitle: '路线', routeName: '路线名称', routeNamePh: '例如：历史中心的早晨',
      date: '日期', routeColor: '颜色', save: '更新路线', saveNew: '保存路线',
      saveAsNew: '另存为新路线', showMap: '在地图上显示', hideMap: '从地图隐藏',
      copy: '复制列表', addFromFavorites: '从收藏添加', routeStops: '路线站点',
      emptyRoute: '此路线尚无站点。', time: '时间', note: '备注',
      up: '上移', down: '下移', remove: '移除', unnamed: '未命名路线',
      savedOk: '路线已保存。', copied: '路线已复制到剪贴板。',
      confirmDelete: '要删除这条路线吗？', confirmDeleteNote: '要删除这一页笔记吗？',
      noCoords: '没有足够的坐标来显示路线。',
      mapShown: '路线已显示在地图上。', mapHidden: '路线已从地图隐藏。',
      notesTitle: '旅行笔记', notesHelp: '笔记会自动保存在此设备上。',
      noteTitle: '可选标题', noteTitlePh: '页面标题', noteBodyPh: '在此输入您的笔记……',
      newNote: '新建页面', previousNote: '上一页', nextNote: '下一页',
      deleteNote: '删除页面', page: '第', of: '页，共', noteSaved: '笔记已自动保存。',
      created: '创建于', modified: '修改于', copySuffix: '副本'
    },
    lij: {
      title: 'Taccuin', subtitle: 'O teu viaggio a Zêna', close: 'Særa', back: 'Inderê',
      tabFavorites: 'Preferii', tabRoutes: 'Percorsi', tabNotes: 'Nòtte',
      favoritesTitle: 'I teu pòsti preferii', favoritesHelp: 'Tocca un pòsto pe arvî a seu pagina.',
      sortBy: 'Ordina i preferii', sortAlphabetical: 'Arfabetico', sortCategory: 'Pe categoria',
      otherCategory: 'Âtri pòsti',
      emptyFavs: 'Ti no ti æ ancon sarvou nisciun pòsto. Azonzi con a stella ⭐ da-o pannello Vai, veddi, fæ.',
      favoriteRoute: 'Percorso', favoriteNote: 'Nòtta', notePh: 'Scrivi ’na nòtta pe sta tappa...',
      add: 'Azonzi', update: 'Agiorna', gps: 'GPS', currentRoute: 'Percorso in modifica',
      alreadyInRoute: 'Za presente into percorso in modifica', addedOk: 'Tappa azonta a-o percorso.',
      updatedOk: 'Tappa agiornâ.', noRoute: 'Neuvo percorso',
      routesTitle: 'Percorsi sarvæ', routesHelp: 'Tocca o nomme pe védde e tappe; deuvi Arvi pe modificâlo.',
      expandRoute: 'Fâ védde e tappe do percorso', collapseRoute: 'Asconde e tappe do percorso',
      emptySaved: 'Ti no ti æ ancon sarvou de percorsi.', newRoute: 'Neuvo percorso',
      open: 'Arvi', show: 'Fâ védde', hide: 'Ascondi', duplicate: 'Duplica', del: 'Scancella',
      visibleOnMap: 'visibile in sciâ mappa', loadedBadge: 'in modifica', stops: 'tappe',
      routeDetailTitle: 'Percorso', routeName: 'Nomme do percorso', routeNamePh: 'Ex. Mattin into çentro stöico',
      date: 'Dæta', routeColor: 'Cô', save: 'Agiorna o percorso', saveNew: 'Sarva o percorso',
      saveAsNew: 'Sarva comme neuvo', showMap: 'Fâ védde in sciâ mappa', hideMap: 'Ascondi da-a mappa',
      copy: 'Còpia a lista', addFromFavorites: 'Azonzi da-i Preferii', routeStops: 'Tappe do percorso',
      emptyRoute: 'O percorso o no gh’à ancon de tappe.', time: 'Ôa', note: 'Nòtta',
      up: 'Mescia in sciù', down: 'Mescia in zu', remove: 'Leva', unnamed: 'Percorso sensa nomme',
      savedOk: 'Percorso sarvou.', copied: 'Percorso copiou inti aponti.',
      confirmDelete: 'Scancellâ sto percorso?', confirmDeleteNote: 'Scancellâ sta pagina de nòtte?',
      noCoords: 'No son stæte trovæ abbastanza coordinæ pe fâ védde o percorso.',
      mapShown: 'Percorso mostròu in sciâ mappa.', mapHidden: 'Percorso ascoso da-a mappa.',
      notesTitle: 'Aponti de viaggio', notesHelp: 'E nòtte vegnan sarvæ automaticamente in sce sto dispositivo.',
      noteTitle: 'Titolo façortativo', noteTitlePh: 'Titolo da pagina', noteBodyPh: 'Scrivi chi i teu aponti...',
      newNote: 'Neuva pagina', previousNote: 'Pagina primma', nextNote: 'Pagina dòppo',
      deleteNote: 'Scancella pagina', page: 'Pagina', of: 'de', noteSaved: 'Nòtta sarvâ automaticamente.',
      created: 'Creâ', modified: 'Modificâ', copySuffix: 'còpia'
    }
  };

  var LIST_LABELS = {
    'fav-list-forti': 'Forte', 'fav-list-musei': 'Museo', 'fav-list-bus': 'Autobus',
    'fav-list-train': 'Stazione', 'fav-list-metro': 'Metro', 'fav-list-funi': 'Impianto',
    'fav-list-locali': 'Locale', 'fav-list-mare': 'Mare', 'fav-list-aereo': 'Aeroporto',
    'fav-list-chiese': 'Chiesa', 'fav-list-palazzi': 'Palazzo', 'fav-list-sport': 'Sport',
    'fav-list-cinema': 'Cinema', 'fav-list-teatri': 'Teatro', 'fav-list-mostre': 'Mostra'
  };

  var LOCALES = {
    it: 'it-IT', en: 'en-GB', es: 'es-ES', fr: 'fr-FR',
    ar: 'ar', ru: 'ru-RU', zh: 'zh-CN', lij: 'it-IT'
  };

  var CATEGORY_NAMES = {
    it: { Forte:'Forte', Museo:'Museo', Autobus:'Autobus', Stazione:'Stazione', Metro:'Metro', Impianto:'Impianto', Locale:'Locale', Mare:'Mare', Aeroporto:'Aeroporto', Chiesa:'Chiesa', Palazzo:'Palazzo', Sport:'Sport', Cinema:'Cinema', Teatro:'Teatro', Mostra:'Mostra', Parco:'Parco', Piazza:'Piazza' },
    en: { Forte:'Fort', Museo:'Museum', Autobus:'Bus', Stazione:'Station', Metro:'Metro', Impianto:'Transport facility', Locale:'Venue', Mare:'Seaside', Aeroporto:'Airport', Chiesa:'Church', Palazzo:'Palace', Sport:'Sport', Cinema:'Cinema', Teatro:'Theatre', Mostra:'Exhibition', Parco:'Park', Piazza:'Square' },
    es: { Forte:'Fuerte', Museo:'Museo', Autobus:'Autobús', Stazione:'Estación', Metro:'Metro', Impianto:'Transporte', Locale:'Local', Mare:'Mar', Aeroporto:'Aeropuerto', Chiesa:'Iglesia', Palazzo:'Palacio', Sport:'Deporte', Cinema:'Cine', Teatro:'Teatro', Mostra:'Exposición', Parco:'Parque', Piazza:'Plaza' },
    fr: { Forte:'Fort', Museo:'Musée', Autobus:'Bus', Stazione:'Gare', Metro:'Métro', Impianto:'Transport', Locale:'Établissement', Mare:'Mer', Aeroporto:'Aéroport', Chiesa:'Église', Palazzo:'Palais', Sport:'Sport', Cinema:'Cinéma', Teatro:'Théâtre', Mostra:'Exposition', Parco:'Parc', Piazza:'Place' },
    ar: { Forte:'حصن', Museo:'متحف', Autobus:'حافلة', Stazione:'محطة', Metro:'مترو', Impianto:'وسيلة نقل', Locale:'مكان ترفيهي', Mare:'البحر', Aeroporto:'مطار', Chiesa:'كنيسة', Palazzo:'قصر', Sport:'رياضة', Cinema:'سينما', Teatro:'مسرح', Mostra:'معرض', Parco:'حديقة', Piazza:'ساحة' },
    ru: { Forte:'Форт', Museo:'Музей', Autobus:'Автобус', Stazione:'Станция', Metro:'Метро', Impianto:'Транспорт', Locale:'Заведение', Mare:'Море', Aeroporto:'Аэропорт', Chiesa:'Церковь', Palazzo:'Дворец', Sport:'Спорт', Cinema:'Кинотеатр', Teatro:'Театр', Mostra:'Выставка', Parco:'Парк', Piazza:'Площадь' },
    zh: { Forte:'堡垒', Museo:'博物馆', Autobus:'公交车', Stazione:'车站', Metro:'地铁', Impianto:'交通设施', Locale:'休闲场所', Mare:'海滨', Aeroporto:'机场', Chiesa:'教堂', Palazzo:'宫殿', Sport:'体育', Cinema:'电影院', Teatro:'剧院', Mostra:'展览', Parco:'公园', Piazza:'广场' },
    lij: { Forte:'Fòrte', Museo:'Muxêo', Autobus:'Autobùs', Stazione:'Staçion', Metro:'Metropolitana', Impianto:'Impianto', Locale:'Locale', Mare:'Mâ', Aeroporto:'Aeroporto', Chiesa:'Gexa', Palazzo:'Palaçio', Sport:'Spòrt', Cinema:'Çinema', Teatro:'Teatro', Mostra:'Mostra', Parco:'Parco', Piazza:'Ciassa' }
  };

  var CATEGORY_COLORS = {
    'Forte': '#7f628f', 'Museo': '#b77728', 'Autobus': '#407d99', 'Stazione': '#476f9d',
    'Metro': '#725c9e', 'Impianto': '#4f8454', 'Locale': '#a35d68', 'Mare': '#37838c',
    'Aeroporto': '#6686a1', 'Chiesa': '#9e5b52', 'Palazzo': '#a18435', 'Sport': '#52835d',
    'Cinema': '#9b5c83', 'Teatro': '#a56b36', 'Mostra': '#718548', 'Parco': '#4d8067',
    'Piazza': '#9c7e31'
  };

  var ROUTE_COLORS = ['#315f7d', '#8b3f38', '#4d704d', '#a0612d', '#675080', '#31747d', '#8a455f', '#8d742d'];

  function lang(){
    var value = 'it';
    try{ value = localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it'; }catch(_e){}
    value = String(value || 'it').toLowerCase().split(/[-_]/)[0];
    return TXT[value] ? value : 'it';
  }

  function t(key){ return (TXT[lang()] && TXT[lang()][key]) || TXT.it[key] || key; }
  function locale(){ return LOCALES[lang()] || LOCALES.it; }
  function categoryName(canonical){
    var names = CATEGORY_NAMES[lang()] || CATEGORY_NAMES.it;
    return names[canonical] || canonical;
  }

  function norm(value){
    value = String(value == null ? '' : value).trim().toLowerCase();
    try{ value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }catch(_e){}
    return value;
  }

  function esc(value){
    return String(value == null ? '' : value).replace(/[&<>"']/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
    });
  }

  function uid(prefix){ return (prefix || 'id') + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8); }
  function today(){ try{ return new Date().toISOString().slice(0, 10); }catch(_e){ return ''; } }

  function dateLabel(timestamp){
    if(!timestamp) return '';
    try{ return new Date(timestamp).toLocaleDateString(locale()); }catch(_e){ return ''; }
  }

  function readJSON(key, fallback){
    try{
      var raw = localStorage.getItem(key);
      if(!raw) return fallback;
      var value = JSON.parse(raw);
      return value == null ? fallback : value;
    }catch(_e){ return fallback; }
  }

  function writeJSON(key, value){
    try{ localStorage.setItem(key, JSON.stringify(value)); }catch(_e){}
  }

  function readFavoritesSort(){
    try{
      return localStorage.getItem(FAVORITES_SORT_KEY) === 'category' ? 'category' : 'alphabetical';
    }catch(_e){ return 'alphabetical'; }
  }

  function saveFavoritesSort(value){
    state.favoritesSort = value === 'category' ? 'category' : 'alphabetical';
    try{ localStorage.setItem(FAVORITES_SORT_KEY, state.favoritesSort); }catch(_e){}
  }

  function cleanColor(value){
    value = String(value || '').trim();
    return /^#[0-9a-fA-F]{6}$/.test(value) ? value.toLowerCase() : ROUTE_COLORS[0];
  }

  function routes(){
    var list = readJSON(ROUTES_KEY, []);
    return Array.isArray(list) ? list : [];
  }

  function saveRoutes(list){ writeJSON(ROUTES_KEY, Array.isArray(list) ? list : []); }

  function notes(){
    var list = readJSON(NOTES_KEY, []);
    if(!Array.isArray(list)) list = [];
    return list.map(function(note){
      note = note && typeof note === 'object' ? note : {};
      return {
        id: note.id || uid('note'),
        title: String(note.title || ''),
        body: String(note.body || ''),
        createdAt: Number(note.createdAt || Date.now()),
        updatedAt: Number(note.updatedAt || note.createdAt || Date.now())
      };
    });
  }

  function saveNotes(list){ writeJSON(NOTES_KEY, Array.isArray(list) ? list : []); }

  function panel(){ return document.getElementById('fav-notes-panel'); }
  function button(){ return document.getElementById('fav-notes-btn'); }
  function pageBody(){ return document.getElementById('taccuino-page-body'); }

  function categoryColor(label){ return CATEGORY_COLORS[label] || '#7c7468'; }
  function keyFor(label, name){ return String(label || '') + '|' + norm(name); }

  function labelForLi(li){
    var list = li && li.closest ? li.closest('ul.fav-list') : null;
    if(!list) return '';
    if(list.id === 'fav-list-parchi-piazze') return li.getAttribute('data-src') === 'piazza' ? 'Piazza' : 'Parco';
    return LIST_LABELS[list.id] || '';
  }

  function displayLabelForLi(li, canonical){
    var section = li && li.closest ? li.closest('.fav-acc-section') : null;
    var title = section ? section.querySelector('.fav-acc-title') : null;
    var text = title ? title.textContent.trim() : '';
    if(canonical === 'Parco' || canonical === 'Piazza') return categoryName(canonical);
    return text || categoryName(canonical);
  }

  function categoryForLi(li){
    var section = li && li.closest ? li.closest('.fav-acc-section') : null;
    var title = section ? section.querySelector('.fav-acc-title') : null;
    return {
      key: section ? String(section.getAttribute('data-key') || '') : '',
      name: title && title.textContent.trim() ? title.textContent.trim() : t('otherCategory')
    };
  }

  function getLatLng(object){
    if(!object || typeof object !== 'object') return null;
    var lat = null;
    var lng = null;
    if(typeof object.lat === 'number') lat = object.lat;
    if(typeof object.lng === 'number') lng = object.lng;
    if(lat == null && typeof object.latitude === 'number') lat = object.latitude;
    if(lng == null && typeof object.longitude === 'number') lng = object.longitude;
    if(lng == null && typeof object.lon === 'number') lng = object.lon;
    return lat != null && lng != null && isFinite(lat) && isFinite(lng) ? [lat, lng] : null;
  }

  function addDataToIndex(index, label, data){
    if(!Array.isArray(data)) return;
    data.forEach(function(item){
      var name = item && (item.name || item.title || item.nome || item.label);
      var latLng = getLatLng(item);
      if(name && latLng) index[keyFor(label, name)] = latLng;
    });
  }

  function copyExposedIndex(index, label, source){
    if(!source || typeof source !== 'object') return;
    Object.keys(source).forEach(function(name){
      var latLng = source[name];
      if(Array.isArray(latLng) && latLng.length >= 2) index[keyFor(label, name)] = [latLng[0], latLng[1]];
    });
  }

  function buildLatLngIndex(){
    var index = {};
    addDataToIndex(index, 'Forte', window.FORTI_DATA);
    addDataToIndex(index, 'Museo', window.MUSEI_DATA || window.MUSEI);
    addDataToIndex(index, 'Autobus', window.BUS_STATIONS);
    addDataToIndex(index, 'Stazione', window.TRAIN_STATIONS);
    addDataToIndex(index, 'Metro', window.METRO_STATIONS);
    addDataToIndex(index, 'Impianto', window.FUNI_POINTS);
    addDataToIndex(index, 'Parco', window.PARKS_POINTS);
    addDataToIndex(index, 'Piazza', window.PIAZZE_POINTS);
    addDataToIndex(index, 'Locale', window.LOCALI_POINTS || window.LOCALI);
    addDataToIndex(index, 'Mare', window.MARE_POINTS);
    addDataToIndex(index, 'Aeroporto', window.AEREO_POINTS);
    addDataToIndex(index, 'Chiesa', window.CHIESE_POINTS || window.CHIESE_DATA || window.CHIESE);
    addDataToIndex(index, 'Palazzo', window.PALAZZI_POINTS || window.PALAZZI_DATA || window.PALAZZI);
    addDataToIndex(index, 'Sport', window.SPORT_POINTS || window.SPORT_DATA);
    addDataToIndex(index, 'Cinema', window.CINEMA_POINTS || window.CINEMA_DATA);
    addDataToIndex(index, 'Teatro', window.TEATRI_POINTS || window.TEATRI_DATA);
    addDataToIndex(index, 'Mostra', window.MOSTRE_POINTS || window.MOSTRE_DATA);
    copyExposedIndex(index, 'Forte', window.__FAV_INDEX_FORTI);
    copyExposedIndex(index, 'Museo', window.__FAV_INDEX_MUSEI);
    copyExposedIndex(index, 'Autobus', window.__FAV_INDEX_BUS);
    copyExposedIndex(index, 'Stazione', window.__FAV_INDEX_TRENI);
    copyExposedIndex(index, 'Metro', window.__FAV_INDEX_METRO);
    copyExposedIndex(index, 'Impianto', window.__FAV_INDEX_FUNI);
    copyExposedIndex(index, 'Parco', window.__FAV_INDEX_PARCHI);
    copyExposedIndex(index, 'Piazza', window.__FAV_INDEX_PIAZZE);
    copyExposedIndex(index, 'Locale', window.__FAV_INDEX_LOCALI);
    copyExposedIndex(index, 'Mare', window.__FAV_INDEX_MARE);
    copyExposedIndex(index, 'Aeroporto', window.__FAV_INDEX_AEREO);
    copyExposedIndex(index, 'Chiesa', window.__FAV_INDEX_CHIESE);
    copyExposedIndex(index, 'Palazzo', window.__FAV_INDEX_PALAZZI);
    copyExposedIndex(index, 'Sport', window.__FAV_INDEX_SPORT);
    copyExposedIndex(index, 'Cinema', window.__FAV_INDEX_CINEMA);
    copyExposedIndex(index, 'Teatro', window.__FAV_INDEX_TEATRI);
    copyExposedIndex(index, 'Mostra', window.__FAV_INDEX_MOSTRE);
    return index;
  }

  function collectFavourites(){
    try{ if(typeof window.__favEnhanceLists === 'function') window.__favEnhanceLists(); }catch(_e){}
    var index = buildLatLngIndex();
    var list = [];
    var byKey = {};
    var nodes = Array.prototype.slice.call(document.querySelectorAll('#fav-menu .fav-item.is-selected'));
    nodes.forEach(function(li){
      var nameElement = li.querySelector('.fav-name') || li;
      var name = String(nameElement.textContent || '').trim();
      var label = labelForLi(li);
      if(!name || !label) return;
      var key = keyFor(label, name);
      if(byKey[key]) return;
      var latLng = index[key] || null;
      var category = categoryForLi(li);
      var item = {
        key: key,
        label: label,
        displayLabel: displayLabelForLi(li, label),
        categoryKey: category.key,
        categoryName: category.name,
        name: name,
        lat: latLng ? latLng[0] : null,
        lng: latLng ? latLng[1] : null
      };
      list.push(item);
      byKey[key] = item;
    });
    list.sort(function(a, b){ return a.name.localeCompare(b.name, locale()); });
    state.favCache = list;
    state.favByKey = byKey;
    return list;
  }

  function compareLocalized(a, b){
    return String(a || '').localeCompare(String(b || ''), locale(), { sensitivity: 'base' });
  }

  function nextRouteColor(){ return ROUTE_COLORS[routes().length % ROUTE_COLORS.length]; }

  function blankRoute(){
    return { id: null, name: '', date: today(), color: nextRouteColor(), steps: [], updatedAt: Date.now() };
  }

  function mapRouteId(route){ return route && route.id ? String(route.id) : 'draft'; }

  function normalizeRoute(route){
    route = route && typeof route === 'object' ? route : blankRoute();
    route.id = route.id || null;
    route.name = String(route.name || '');
    route.date = String(route.date || today());
    route.color = cleanColor(route.color || nextRouteColor());
    route.updatedAt = Number(route.updatedAt || Date.now());
    route.steps = Array.isArray(route.steps) ? route.steps : [];
    route.steps = route.steps.map(function(step){
      step = step && typeof step === 'object' ? step : {};
      var name = String(step.name || '');
      var label = String(step.label || '');
      var key = step.key || keyFor(label, name);
      var fresh = state.favByKey[key];
      if(fresh){
        name = fresh.name;
        label = fresh.label;
        step.displayLabel = fresh.displayLabel;
        if(fresh.lat != null) step.lat = fresh.lat;
        if(fresh.lng != null) step.lng = fresh.lng;
      }
      return {
        key: key,
        name: name,
        label: label,
        displayLabel: step.displayLabel || label,
        lat: step.lat != null ? step.lat : null,
        lng: step.lng != null ? step.lng : null,
        time: String(step.time || ''),
        note: String(step.note || '')
      };
    });
    return route;
  }

  function saveDraft(){
    if(!state.route) return;
    state.route.updatedAt = Date.now();
    writeJSON(DRAFT_KEY, state.route);
  }

  function ensureRoute(){
    if(!state.route) state.route = normalizeRoute(readJSON(DRAFT_KEY, null) || blankRoute());
    return state.route;
  }

  function activeTab(){
    if(state.view === 'routes' || state.view === 'routeDetail') return 'routes';
    if(state.view === 'notes') return 'notes';
    return 'favorites';
  }

  function resetLegacyPanelStyles(root){
    if(!root) return;
    [
      'top', 'right', 'bottom', 'left', 'width', 'height',
      'min-width', 'max-width', 'min-height', 'max-height',
      'overflow', 'transform'
    ].forEach(function(propertyName){
      try{ root.style.removeProperty(propertyName); }catch(_e){}
    });
  }

  function setupPanel(){
    var root = panel();
    if(!root) return false;
    /* Il vecchio pannello Preferiti poteva lasciare coordinate inline. */
    resetLegacyPanelStyles(root);
    if(document.body && root.parentNode !== document.body){
      document.body.appendChild(root);
    }
    root.classList.add('taccuino-v3');
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-labelledby', 'fav-notes-title');
    root.innerHTML = '' +
      '<div class="taccuino-card">' +
        '<header class="taccuino-cover-head">' +
          '<div class="taccuino-brand"><span class="taccuino-brand-mark" aria-hidden="true">✦</span><div><h3 id="fav-notes-title"></h3><p id="taccuino-subtitle"></p></div></div>' +
          '<button id="fav-notes-close" class="taccuino-close" type="button" aria-label="'+esc(t('close'))+'">×</button>' +
        '</header>' +
        '<nav class="taccuino-tabs" aria-label="'+esc(t('title'))+'">' +
          '<button type="button" data-taccuino-action="switchTab" data-view="notes"><span aria-hidden="true">✎</span><b id="taccuino-tab-notes"></b></button>' +
          '<button type="button" data-taccuino-action="switchTab" data-view="routes"><span aria-hidden="true">⌁</span><b id="taccuino-tab-routes"></b></button>' +
          '<button type="button" data-taccuino-action="switchTab" data-view="favorites"><span aria-hidden="true">★</span><b id="taccuino-tab-favorites"></b></button>' +
        '</nav>' +
        '<main class="taccuino-paper">' +
          '<div class="taccuino-page-head">' +
            '<button id="taccuino-back" class="taccuino-back" type="button" data-taccuino-action="back" hidden>‹ <span>'+esc(t('back'))+'</span></button>' +
            '<div class="taccuino-page-heading"><h4 id="taccuino-page-title"></h4><p id="taccuino-page-help"></p></div>' +
            '<div id="taccuino-page-actions" class="taccuino-page-actions"></div>' +
          '</div>' +
          '<div id="taccuino-page-body" class="taccuino-page-body"></div>' +
        '</main>' +
        '<footer class="taccuino-footer"><div id="taccuino-status" aria-live="polite"></div><span class="taccuino-footer-sign">Genova mApp</span></footer>' +
      '</div>';
    bindPanelEvents(root);
    state.favoritesSort = readFavoritesSort();
    state.ready = true;
    applyTexts();
    return true;
  }

  function applyTexts(){
    var root = panel();
    if(root){
      root.setAttribute('lang', lang());
      root.setAttribute('dir', lang() === 'ar' ? 'rtl' : 'ltr');
    }
    var map = {
      'fav-notes-title': 'title', 'taccuino-subtitle': 'subtitle',
      'taccuino-tab-favorites': 'tabFavorites', 'taccuino-tab-routes': 'tabRoutes',
      'taccuino-tab-notes': 'tabNotes'
    };
    Object.keys(map).forEach(function(id){
      var element = document.getElementById(id);
      if(element) element.textContent = t(map[id]);
    });
    var close = document.getElementById('fav-notes-close');
    if(close) close.setAttribute('aria-label', t('close'));
    var back = document.querySelector('#taccuino-back span');
    if(back) back.textContent = t('back');
    var tabs = document.querySelector('#fav-notes-panel .taccuino-tabs');
    if(tabs) tabs.setAttribute('aria-label', t('title'));
    var openButton = button();
    if(openButton){
      openButton.setAttribute('title', t('title'));
      openButton.setAttribute('aria-label', t('open') + ' ' + t('title'));
      var screenReader = openButton.querySelector('.sr-only');
      if(screenReader) screenReader.textContent = t('open') + ' ' + t('title');
    }
  }

  function setStatus(message){
    var element = document.getElementById('taccuino-status');
    if(element) element.textContent = message || '';
  }

  function setPageHeader(title, help, actionsHtml, showBack){
    var titleElement = document.getElementById('taccuino-page-title');
    var helpElement = document.getElementById('taccuino-page-help');
    var actionsElement = document.getElementById('taccuino-page-actions');
    var backElement = document.getElementById('taccuino-back');
    if(titleElement) titleElement.textContent = title || '';
    if(helpElement){ helpElement.textContent = help || ''; helpElement.hidden = !help; }
    if(actionsElement) actionsElement.innerHTML = actionsHtml || '';
    if(backElement) backElement.hidden = !showBack;
  }

  function animatePage(){
    var paper = document.querySelector('#fav-notes-panel .taccuino-paper');
    if(!paper) return;
    paper.classList.remove('is-turning');
    void paper.offsetWidth;
    paper.classList.add('is-turning');
    if(state.pageTimer) window.clearTimeout(state.pageTimer);
    state.pageTimer = window.setTimeout(function(){ paper.classList.remove('is-turning'); }, 330);
  }

  function navigate(view, options){
    options = options || {};
    if(options.remember !== false) state.previousView = state.view;
    state.view = view;
    if(options.favoriteKey != null) state.selectedFavKey = options.favoriteKey;
    render();
    if(options.animate !== false) animatePage();
  }

  function renderTabs(){
    var tab = activeTab();
    document.querySelectorAll('#fav-notes-panel .taccuino-tabs [data-view]').forEach(function(buttonElement){
      var selected = buttonElement.getAttribute('data-view') === tab;
      buttonElement.classList.toggle('is-active', selected);
      buttonElement.setAttribute('aria-selected', selected ? 'true' : 'false');
    });
  }

  function render(){
    if(!state.ready && !setupPanel()) return;
    applyTexts();
    collectFavourites();
    ensureRoute();
    state.route = normalizeRoute(state.route);
    renderTabs();
    if(state.view === 'favoriteDetail') renderFavoriteDetail();
    else if(state.view === 'routes') renderRoutes();
    else if(state.view === 'routeDetail') renderRouteDetail();
    else if(state.view === 'notes') renderNotes();
    else renderFavorites();
  }

  function renderFavorites(){
    setPageHeader(t('favoritesTitle'), t('favoritesHelp'), '', false);
    var body = pageBody();
    if(!body) return;
    if(!state.favCache.length){
      body.innerHTML = '<div class="taccuino-empty"><span aria-hidden="true">☆</span><p>'+esc(t('emptyFavs'))+'</p></div>';
      return;
    }
    var alphabeticalSelected = state.favoritesSort !== 'category';
    var html = '' +
      '<div class="taccuino-sortbar" role="group" aria-label="'+esc(t('sortBy'))+'">' +
        '<span class="taccuino-sort-label">'+esc(t('sortBy'))+'</span>' +
        '<div class="taccuino-sort-options">' +
          '<button type="button" class="taccuino-sort-button'+(alphabeticalSelected ? ' is-active' : '')+'" data-taccuino-action="sortFavorites" data-sort="alphabetical" aria-pressed="'+(alphabeticalSelected ? 'true' : 'false')+'">'+esc(t('sortAlphabetical'))+'</button>' +
          '<button type="button" class="taccuino-sort-button'+(!alphabeticalSelected ? ' is-active' : '')+'" data-taccuino-action="sortFavorites" data-sort="category" aria-pressed="'+(!alphabeticalSelected ? 'true' : 'false')+'">'+esc(t('sortCategory'))+'</button>' +
        '</div>' +
      '</div>';

    function favoriteRow(favorite){
      return '' +
        '<button type="button" class="taccuino-favorite-row" data-taccuino-action="openFavorite" data-fav-key="'+esc(favorite.key)+'" style="--fav-color:'+esc(categoryColor(favorite.label))+'">' +
          '<span class="taccuino-favorite-pin" aria-hidden="true">★</span>' +
          '<span class="taccuino-favorite-copy"><strong>'+esc(favorite.name)+'</strong><small>'+esc(favorite.displayLabel || favorite.label)+'</small></span>' +
          '<span class="taccuino-row-arrow" aria-hidden="true">›</span>' +
        '</button>';
    }

    if(alphabeticalSelected){
      html += '<div class="taccuino-favorites-list">';
      state.favCache.forEach(function(favorite){ html += favoriteRow(favorite); });
      html += '</div>';
    }else{
      var groups = {};
      state.favCache.forEach(function(favorite){
        var groupKey = favorite.categoryKey || favorite.categoryName || 'other';
        if(!groups[groupKey]) groups[groupKey] = { name: favorite.categoryName || t('otherCategory'), favorites: [] };
        groups[groupKey].favorites.push(favorite);
      });
      Object.keys(groups).map(function(key){ return groups[key]; })
        .sort(function(a, b){ return compareLocalized(a.name, b.name); })
        .forEach(function(group){
          group.favorites.sort(function(a, b){ return compareLocalized(a.name, b.name); });
          html += '<section class="taccuino-favorite-group">' +
            '<h5><span>'+esc(group.name)+'</span><small>'+group.favorites.length+'</small></h5>' +
            '<div class="taccuino-favorites-list">';
          group.favorites.forEach(function(favorite){ html += favoriteRow(favorite); });
          html += '</div></section>';
        });
    }
    body.innerHTML = html;
  }

  function routeOptionLabel(route){
    var count = Array.isArray(route.steps) ? route.steps.length : 0;
    return (route.name || t('unnamed')) + ' · ' + count + ' ' + t('stops');
  }

  function routeTargetOptions(){
    ensureRoute();
    var currentName = state.route.name || t('noRoute');
    var html = '<option value="current">'+esc(t('currentRoute') + ' — ' + currentName)+'</option>';
    routes().sort(function(a, b){ return (b.updatedAt || 0) - (a.updatedAt || 0); }).forEach(function(route){
      if(!route || !route.id || (state.route.id && route.id === state.route.id)) return;
      html += '<option value="'+esc(route.id)+'">'+esc(routeOptionLabel(route))+'</option>';
    });
    return html;
  }

  function favoriteInCurrentRoute(key){
    return !!(state.route && state.route.steps && state.route.steps.some(function(step){ return step.key === key; }));
  }

  function renderFavoriteDetail(){
    var favorite = state.favByKey[state.selectedFavKey];
    if(!favorite){ navigate('favorites', { remember: false, animate: false }); return; }
    var inCurrent = favoriteInCurrentRoute(favorite.key);
    setPageHeader(favorite.name, favorite.displayLabel || favorite.label, '', true);
    var body = pageBody();
    if(!body) return;
    body.innerHTML = '' +
      '<article class="taccuino-favorite-page" style="--fav-color:'+esc(categoryColor(favorite.label))+'">' +
        '<div class="taccuino-place-stamp"><span aria-hidden="true">★</span><strong>'+esc(favorite.displayLabel || favorite.label)+'</strong></div>' +
        (inCurrent ? '<p class="taccuino-inline-notice">✓ '+esc(t('alreadyInRoute'))+'</p>' : '') +
        '<div class="taccuino-field">' +
          '<label for="taccuino-fav-route">'+esc(t('favoriteRoute'))+'</label>' +
          '<select id="taccuino-fav-route" data-fav-route-select>'+routeTargetOptions()+'</select>' +
        '</div>' +
        '<div class="taccuino-field">' +
          '<label for="taccuino-fav-note">'+esc(t('favoriteNote'))+'</label>' +
          '<textarea id="taccuino-fav-note" data-fav-note rows="5" placeholder="'+esc(t('notePh'))+'"></textarea>' +
        '</div>' +
        '<div class="taccuino-large-actions">' +
          '<button type="button" class="primary" data-taccuino-action="addSelectedFavorite">'+esc(t('add'))+'</button>' +
          '<button type="button" data-taccuino-action="favoriteGps" data-fav-key="'+esc(favorite.key)+'">⌖ '+esc(t('gps'))+'</button>' +
        '</div>' +
      '</article>';
  }

  function renderRoutes(){
    var newButton = '<button type="button" class="taccuino-head-action" data-taccuino-action="newRoute">＋ '+esc(t('newRoute'))+'</button>';
    setPageHeader(t('routesTitle'), t('routesHelp'), newButton, false);
    var body = pageBody();
    if(!body) return;
    var list = routes().sort(function(a, b){ return (b.updatedAt || 0) - (a.updatedAt || 0); });
    if(!list.length){
      body.innerHTML = '<div class="taccuino-empty"><span aria-hidden="true">⌁</span><p>'+esc(t('emptySaved'))+'</p><button type="button" class="primary" data-taccuino-action="newRoute">'+esc(t('newRoute'))+'</button></div>';
      return;
    }
    var html = '<div class="taccuino-routes-list">';
    list.forEach(function(route, routeIndex){
      route = normalizeRoute(route);
      var isVisible = state.mapVisible && state.mapRouteId === mapRouteId(route);
      var isEditing = !!(state.route && state.route.id && route.id === state.route.id);
      var isExpanded = state.expandedRouteId === String(route.id);
      var summaryId = 'taccuino-route-summary-' + routeIndex;
      var meta = [];
      if(route.date) meta.push(route.date);
      meta.push(route.steps.length + ' ' + t('stops'));
      if(isEditing) meta.push(t('loadedBadge'));
      if(isVisible) meta.push(t('visibleOnMap'));
      html += '' +
        '<article class="taccuino-route-card'+(isEditing ? ' is-editing' : '')+(isVisible ? ' is-visible' : '')+(isExpanded ? ' is-expanded' : '')+'" data-route-card="'+esc(route.id)+'" style="--route-color:'+esc(route.color)+'">' +
          '<button type="button" class="taccuino-route-main" data-taccuino-action="toggleRouteSummary" data-route-id="'+esc(route.id)+'" aria-expanded="'+(isExpanded ? 'true' : 'false')+'" aria-controls="'+summaryId+'" aria-label="'+esc((isExpanded ? t('collapseRoute') : t('expandRoute')) + ': ' + (route.name || t('unnamed')))+'">' +
            '<i aria-hidden="true"></i><span><strong>'+esc(route.name || t('unnamed'))+'</strong><small>'+esc(meta.join(' · '))+'</small></span><b class="taccuino-route-chevron" aria-hidden="true">⌄</b>' +
          '</button>' +
          '<div id="'+summaryId+'" class="taccuino-route-summary" data-route-summary="'+esc(route.id)+'" aria-hidden="'+(isExpanded ? 'false' : 'true')+'">' +
            '<div><div class="taccuino-route-summary-inner">';
      if(route.steps.length){
        html += '<ul>';
        route.steps.forEach(function(step){
          var stopColor = categoryColor(step.label);
          html += '<li style="--stop-color:'+esc(stopColor)+'">' +
            '<i aria-hidden="true"></i>' +
            '<span>'+esc(step.name || '')+'</span>' +
            '<small>'+esc(step.displayLabel || step.label || '')+'</small>' +
          '</li>';
        });
        html += '</ul>';
      }else{
        html += '<p class="taccuino-route-summary-empty">'+esc(t('emptyRoute'))+'</p>';
      }
      html += '' +
            '</div></div>' +
          '</div>' +
          '<div class="taccuino-route-actions">' +
            '<button type="button" data-taccuino-action="openRoute" data-route-id="'+esc(route.id)+'">'+esc(t('open'))+'</button>' +
            '<button type="button" data-taccuino-action="toggleMapRoute" data-route-id="'+esc(route.id)+'" class="'+(isVisible ? 'danger' : '')+'">'+esc(isVisible ? t('hide') : t('show'))+'</button>' +
            '<button type="button" data-taccuino-action="duplicateRoute" data-route-id="'+esc(route.id)+'">'+esc(t('duplicate'))+'</button>' +
            '<button type="button" data-taccuino-action="deleteRoute" data-route-id="'+esc(route.id)+'" class="danger">'+esc(t('del'))+'</button>' +
          '</div>' +
        '</article>';
    });
    html += '</div>';
    body.innerHTML = html;
  }

  function renderRouteDetail(){
    var route = ensureRoute();
    var isSaved = !!route.id;
    var saveLabel = isSaved ? t('save') : t('saveNew');
    setPageHeader(route.name || t('routeDetailTitle'), route.steps.length + ' ' + t('stops'), '', true);
    var body = pageBody();
    if(!body) return;
    var currentVisible = state.mapVisible && state.mapRouteId === mapRouteId(route);
    var html = '' +
      '<article class="taccuino-route-page" style="--route-color:'+esc(route.color)+'">' +
        '<div class="taccuino-route-form">' +
          '<div class="taccuino-field wide"><label for="taccuino-route-name">'+esc(t('routeName'))+'</label><input id="taccuino-route-name" data-route-name type="text" value="'+esc(route.name)+'" placeholder="'+esc(t('routeNamePh'))+'" autocomplete="off"></div>' +
          '<div class="taccuino-field"><label for="taccuino-route-date">'+esc(t('date'))+'</label><input id="taccuino-route-date" data-route-date type="date" value="'+esc(route.date)+'"></div>' +
          '<div class="taccuino-field color"><label for="taccuino-route-color">'+esc(t('routeColor'))+'</label><input id="taccuino-route-color" data-route-color type="color" value="'+esc(route.color)+'"></div>' +
        '</div>' +
        '<div class="taccuino-route-toolbar">' +
          '<button type="button" class="primary" data-taccuino-action="saveRoute">'+esc(saveLabel)+'</button>' +
          (isSaved ? '<button type="button" data-taccuino-action="saveRouteAsNew">'+esc(t('saveAsNew'))+'</button>' : '') +
          '<button type="button" data-taccuino-action="toggleCurrentMap" class="'+(currentVisible ? 'danger' : '')+'">'+esc(currentVisible ? t('hideMap') : t('showMap'))+'</button>' +
          '<button type="button" data-taccuino-action="copyRoute">'+esc(t('copy'))+'</button>' +
        '</div>' +
        '<div class="taccuino-section-rule"><h5>'+esc(t('routeStops'))+'</h5><button type="button" data-taccuino-action="goFavorites">＋ '+esc(t('addFromFavorites'))+'</button></div>';

    if(!route.steps.length){
      html += '<div class="taccuino-empty compact"><span aria-hidden="true">⌁</span><p>'+esc(t('emptyRoute'))+'</p></div>';
    } else {
      html += '<ol class="taccuino-steps">';
      route.steps.forEach(function(step, index){
        html += '' +
          '<li class="taccuino-step">' +
            '<div class="taccuino-step-number">'+(index + 1)+'</div>' +
            '<div class="taccuino-step-content">' +
              '<div class="taccuino-step-title"><strong>'+esc(step.name)+'</strong><small>'+esc(step.displayLabel || step.label)+'</small></div>' +
              '<div class="taccuino-step-fields">' +
                '<label><span>'+esc(t('time'))+'</span><input type="time" data-step-time="'+index+'" value="'+esc(step.time)+'"></label>' +
                '<label class="wide"><span>'+esc(t('note'))+'</span><input type="text" data-step-note="'+index+'" value="'+esc(step.note)+'" placeholder="'+esc(t('notePh'))+'"></label>' +
              '</div>' +
            '</div>' +
            '<div class="taccuino-step-actions">' +
              '<button type="button" data-taccuino-action="stepUp" data-index="'+index+'" aria-label="'+esc(t('up'))+'" '+(index === 0 ? 'disabled' : '')+'>↑</button>' +
              '<button type="button" data-taccuino-action="stepDown" data-index="'+index+'" aria-label="'+esc(t('down'))+'" '+(index === route.steps.length - 1 ? 'disabled' : '')+'>↓</button>' +
              '<button type="button" data-taccuino-action="stepGps" data-index="'+index+'" aria-label="'+esc(t('gps'))+'">⌖</button>' +
              '<button type="button" data-taccuino-action="removeStep" data-index="'+index+'" class="danger" aria-label="'+esc(t('remove'))+'">×</button>' +
            '</div>' +
          '</li>';
      });
      html += '</ol>';
    }
    html += '</article>';
    body.innerHTML = html;
  }

  function ensureNote(){
    var list = notes();
    if(!list.length){
      var blank = { id: uid('note'), title: '', body: '', createdAt: Date.now(), updatedAt: Date.now() };
      list.push(blank);
      saveNotes(list);
      state.noteId = blank.id;
      try{ localStorage.setItem(LAST_NOTE_KEY, blank.id); }catch(_e){}
      return { list: list, note: blank, index: 0 };
    }
    if(!state.noteId){
      try{ state.noteId = localStorage.getItem(LAST_NOTE_KEY) || ''; }catch(_e){}
    }
    var index = list.findIndex(function(note){ return note.id === state.noteId; });
    if(index < 0) index = list.length - 1;
    state.noteId = list[index].id;
    try{ localStorage.setItem(LAST_NOTE_KEY, state.noteId); }catch(_e){}
    return { list: list, note: list[index], index: index };
  }

  function renderNotes(){
    var data = ensureNote();
    var note = data.note;
    var previousDisabled = data.index <= 0;
    var nextDisabled = data.index >= data.list.length - 1;
    var actions = '<button type="button" class="taccuino-head-action" data-taccuino-action="newNote">＋ '+esc(t('newNote'))+'</button>';
    setPageHeader(t('notesTitle'), t('notesHelp'), actions, false);
    var body = pageBody();
    if(!body) return;
    body.innerHTML = '' +
      '<article class="taccuino-notes-page">' +
        '<div class="taccuino-note-nav">' +
          '<button type="button" data-taccuino-action="previousNote" '+(previousDisabled ? 'disabled' : '')+' aria-label="'+esc(t('previousNote'))+'">‹</button>' +
          '<span>'+esc(t('page'))+' '+(data.index + 1)+' '+esc(t('of'))+' '+data.list.length+'</span>' +
          '<button type="button" data-taccuino-action="nextNote" '+(nextDisabled ? 'disabled' : '')+' aria-label="'+esc(t('nextNote'))+'">›</button>' +
        '</div>' +
        '<input class="taccuino-note-title" data-note-title type="text" value="'+esc(note.title)+'" placeholder="'+esc(t('noteTitlePh'))+'" aria-label="'+esc(t('noteTitle'))+'">' +
        '<textarea class="taccuino-note-body" data-note-body placeholder="'+esc(t('noteBodyPh'))+'">'+esc(note.body)+'</textarea>' +
        '<div class="taccuino-note-meta"><span>'+esc(t('created'))+': '+esc(dateLabel(note.createdAt))+'</span><span>'+esc(t('modified'))+': '+esc(dateLabel(note.updatedAt))+'</span><button type="button" class="danger link" data-taccuino-action="deleteNote">'+esc(t('deleteNote'))+'</button></div>' +
      '</article>';
  }

  function bindPanelEvents(root){
    root.addEventListener('click', function(event){
      if(event.target === root){ closePanel(); return; }
      var actionElement = event.target.closest ? event.target.closest('[data-taccuino-action]') : null;
      if(!actionElement || !root.contains(actionElement)) return;
      event.preventDefault();
      event.stopPropagation();
      var action = actionElement.getAttribute('data-taccuino-action');
      var routeId = actionElement.getAttribute('data-route-id') || '';
      var index = parseInt(actionElement.getAttribute('data-index') || '-1', 10);

      if(action === 'switchTab') switchTab(actionElement.getAttribute('data-view') || 'favorites');
      else if(action === 'back') goBack();
      else if(action === 'toggleRouteSummary') toggleRouteSummary(routeId);
      else if(action === 'sortFavorites'){
        saveFavoritesSort(actionElement.getAttribute('data-sort') || 'alphabetical');
        renderFavorites();
      }
      else if(action === 'openFavorite') navigate('favoriteDetail', { favoriteKey: actionElement.getAttribute('data-fav-key') || '' });
      else if(action === 'favoriteGps') centerFavourite(actionElement.getAttribute('data-fav-key') || state.selectedFavKey);
      else if(action === 'addSelectedFavorite') addSelectedFavorite();
      else if(action === 'newRoute') newRoute();
      else if(action === 'openRoute') openRoute(routeId);
      else if(action === 'toggleMapRoute') toggleSavedRouteMap(routeId);
      else if(action === 'duplicateRoute') duplicateRoute(routeId);
      else if(action === 'deleteRoute') deleteRoute(routeId);
      else if(action === 'saveRoute') saveCurrentRoute(false);
      else if(action === 'saveRouteAsNew') saveCurrentRoute(true);
      else if(action === 'toggleCurrentMap') toggleCurrentRouteMap();
      else if(action === 'copyRoute') copyRoute();
      else if(action === 'goFavorites') switchTab('favorites');
      else if(action === 'stepUp') moveStep(index, -1);
      else if(action === 'stepDown') moveStep(index, 1);
      else if(action === 'stepGps') centerStep(index);
      else if(action === 'removeStep') removeStep(index);
      else if(action === 'newNote') newNote();
      else if(action === 'previousNote') moveNote(-1);
      else if(action === 'nextNote') moveNote(1);
      else if(action === 'deleteNote') deleteNote();
    });

    root.addEventListener('input', function(event){
      var target = event.target;
      if(!target) return;
      ensureRoute();
      if(target.hasAttribute('data-route-name')) state.route.name = target.value || '';
      else if(target.hasAttribute('data-route-date')) state.route.date = target.value || '';
      else if(target.hasAttribute('data-route-color')) state.route.color = cleanColor(target.value);
      else if(target.hasAttribute('data-step-time')){
        var timeIndex = parseInt(target.getAttribute('data-step-time'), 10);
        if(state.route.steps[timeIndex]) state.route.steps[timeIndex].time = target.value || '';
      } else if(target.hasAttribute('data-step-note')){
        var noteIndex = parseInt(target.getAttribute('data-step-note'), 10);
        if(state.route.steps[noteIndex]) state.route.steps[noteIndex].note = target.value || '';
      } else if(target.hasAttribute('data-note-title') || target.hasAttribute('data-note-body')){
        saveActiveNoteFromInputs();
        return;
      } else return;
      saveDraft();
    });

    var close = document.getElementById('fav-notes-close');
    if(close) close.addEventListener('click', closePanel);
  }

  function toggleRouteSummary(routeId){
    routeId = String(routeId || '');
    state.expandedRouteId = state.expandedRouteId === routeId ? '' : routeId;
    var root = panel();
    if(!root) return;
    root.querySelectorAll('[data-route-card]').forEach(function(card){
      var cardRouteId = String(card.getAttribute('data-route-card') || '');
      var expanded = !!state.expandedRouteId && cardRouteId === state.expandedRouteId;
      card.classList.toggle('is-expanded', expanded);
      var trigger = card.querySelector('[data-taccuino-action="toggleRouteSummary"]');
      var summary = card.querySelector('[data-route-summary]');
      if(trigger){
        trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        trigger.setAttribute('aria-label', (expanded ? t('collapseRoute') : t('expandRoute')) + ': ' + String((trigger.querySelector('strong') || {}).textContent || ''));
      }
      if(summary) summary.setAttribute('aria-hidden', expanded ? 'false' : 'true');
    });
  }

  function switchTab(view){
    if(view === 'routes') navigate('routes');
    else if(view === 'notes') navigate('notes');
    else navigate('favorites');
    setStatus('');
  }

  function goBack(){
    if(state.view === 'favoriteDetail') navigate('favorites', { remember: false });
    else if(state.view === 'routeDetail') navigate('routes', { remember: false });
    else navigate(activeTab(), { remember: false });
  }

  function addSelectedFavorite(){
    var favorite = state.favByKey[state.selectedFavKey];
    if(!favorite) return;
    var select = document.getElementById('taccuino-fav-route');
    var noteInput = document.getElementById('taccuino-fav-note');
    var target = select ? select.value : 'current';
    var note = noteInput ? String(noteInput.value || '').trim() : '';
    addFavouriteToTarget(favorite, target, note);
  }

  function addFavouriteToTarget(favorite, target, note){
    target = target || 'current';
    if(target === 'current'){
      ensureRoute();
      var existing = state.route.steps.find(function(step){ return step.key === favorite.key; });
      if(existing){
        if(note) existing.note = note;
      } else {
        state.route.steps.push(Object.assign({}, favorite, { time: '', note: note }));
      }
      saveDraft();
      setStatus(existing ? t('updatedOk') : t('addedOk'));
      renderFavoriteDetail();
      return;
    }

    var list = routes();
    var position = list.findIndex(function(route){ return route && route.id === target; });
    if(position < 0) return;
    var route = normalizeRoute(JSON.parse(JSON.stringify(list[position])));
    var found = route.steps.find(function(step){ return step.key === favorite.key; });
    if(found){
      if(note) found.note = note;
    } else {
      route.steps.push(Object.assign({}, favorite, { time: '', note: note }));
    }
    route.updatedAt = Date.now();
    list[position] = route;
    saveRoutes(list);
    if(state.route && state.route.id === route.id){ state.route = route; saveDraft(); }
    setStatus(found ? t('updatedOk') : t('addedOk'));
    renderFavoriteDetail();
  }

  function newRoute(){
    state.route = blankRoute();
    saveDraft();
    navigate('routeDetail');
    setStatus('');
  }

  function openRoute(id){
    var found = routes().find(function(route){ return route && route.id === id; });
    if(!found) return;
    state.route = normalizeRoute(JSON.parse(JSON.stringify(found)));
    saveDraft();
    navigate('routeDetail');
    setStatus('');
  }

  function duplicateRoute(id){
    var list = routes();
    var found = list.find(function(route){ return route && route.id === id; });
    if(!found) return;
    var copy = normalizeRoute(JSON.parse(JSON.stringify(found)));
    copy.id = uid('rt');
    copy.name = (copy.name || t('unnamed')) + ' - ' + t('copySuffix');
    copy.updatedAt = Date.now();
    list.push(copy);
    saveRoutes(list);
    renderRoutes();
    setStatus(t('savedOk'));
  }

  function deleteRoute(id){
    if(!id || !window.confirm(t('confirmDelete'))) return;
    if(state.mapVisible && state.mapRouteId === id) hideRouteFromMap(false);
    var list = routes().filter(function(route){ return route && route.id !== id; });
    saveRoutes(list);
    if(state.route && state.route.id === id){ state.route.id = null; saveDraft(); }
    renderRoutes();
  }

  function syncRouteInputs(){
    ensureRoute();
    var name = document.querySelector('[data-route-name]');
    var date = document.querySelector('[data-route-date]');
    var color = document.querySelector('[data-route-color]');
    if(name) state.route.name = String(name.value || '').trim();
    if(date) state.route.date = date.value || today();
    if(color) state.route.color = cleanColor(color.value);
  }

  function saveCurrentRoute(asNew){
    ensureRoute();
    syncRouteInputs();
    if(asNew) state.route.id = null;
    state.route.name = state.route.name || t('unnamed');
    if(!state.route.id) state.route.id = uid('rt');
    state.route.updatedAt = Date.now();
    var list = routes();
    var position = list.findIndex(function(route){ return route && route.id === state.route.id; });
    var copy = JSON.parse(JSON.stringify(state.route));
    if(position >= 0) list[position] = copy;
    else list.push(copy);
    saveRoutes(list);
    saveDraft();
    renderRouteDetail();
    setStatus(t('savedOk'));
  }

  function moveStep(index, direction){
    ensureRoute();
    var to = index + direction;
    if(index < 0 || to < 0 || index >= state.route.steps.length || to >= state.route.steps.length) return;
    var temporary = state.route.steps[index];
    state.route.steps[index] = state.route.steps[to];
    state.route.steps[to] = temporary;
    saveDraft();
    renderRouteDetail();
  }

  function removeStep(index){
    ensureRoute();
    if(index < 0 || index >= state.route.steps.length) return;
    state.route.steps.splice(index, 1);
    saveDraft();
    renderRouteDetail();
  }

  function findFavNameElement(step){
    var nodes = Array.prototype.slice.call(document.querySelectorAll('#fav-menu .fav-item'));
    for(var i = 0; i < nodes.length; i += 1){
      var li = nodes[i];
      var nameElement = li.querySelector('.fav-name') || li;
      var label = labelForLi(li);
      var name = String(nameElement.textContent || '').trim();
      if(keyFor(label, name) === step.key) return nameElement;
    }
    return null;
  }

  function centerFavourite(key){
    collectFavourites();
    var favorite = state.favByKey[key];
    if(!favorite) return;
    centerPlace(favorite);
  }

  function centerStep(index){
    ensureRoute();
    var step = state.route.steps[index];
    if(step) centerPlace(step);
  }

  function centerPlace(place){
    var nameElement = findFavNameElement(place);
    if(nameElement && typeof nameElement.click === 'function'){
      try{ nameElement.click(); closePanel(); return; }catch(_e){}
    }
    var map = window.map || window.__map;
    if(map && map.setView && place.lat != null && place.lng != null){
      try{ map.setView([place.lat, place.lng], Math.max(map.getZoom ? map.getZoom() : 17, 17), { animate: true }); closePanel(); }catch(_e){}
    }
  }

  function routeText(){
    ensureRoute();
    var lines = [(state.route.name || t('unnamed')) + (state.route.date ? ' - ' + state.route.date : ''), ''];
    state.route.steps.forEach(function(step, index){
      lines.push((index + 1) + '. ' + (step.time ? step.time + ' - ' : '') + step.name + (step.label ? ' [' + step.label + ']' : ''));
      if(step.note) lines.push('   ' + step.note);
    });
    return lines.join('\n');
  }

  function copyRoute(){
    var text = routeText();
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(function(){ setStatus(t('copied')); }, function(){ fallbackCopy(text); });
    } else fallbackCopy(text);
  }

  function fallbackCopy(text){
    try{
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setStatus(t('copied'));
    }catch(_e){}
  }

  function hideRouteFromMap(showMessage){
    var map = window.map || window.__map;
    try{ if(window.__TACCUINO_LAYER && map) map.removeLayer(window.__TACCUINO_LAYER); }catch(_e){}
    window.__TACCUINO_LAYER = null;
    state.mapVisible = false;
    state.mapRouteId = null;
    if(showMessage !== false) setStatus(t('mapHidden'));
    if(state.view === 'routes') renderRoutes();
    else if(state.view === 'routeDetail') renderRouteDetail();
  }

  function toggleCurrentRouteMap(){
    ensureRoute();
    var id = mapRouteId(state.route);
    if(state.mapVisible && state.mapRouteId === id) hideRouteFromMap(true);
    else showRouteOnMap(state.route, { closeAfter: true });
  }

  function toggleSavedRouteMap(id){
    var route = routes().find(function(item){ return item && item.id === id; });
    if(!route) return;
    if(state.mapVisible && state.mapRouteId === mapRouteId(route)) hideRouteFromMap(true);
    else showRouteOnMap(route, { closeAfter: true });
  }

  function showRouteOnMap(routeToShow, options){
    options = options || {};
    var map = window.map || window.__map;
    if(!map || typeof L === 'undefined') return;
    collectFavourites();
    var route = normalizeRoute(JSON.parse(JSON.stringify(routeToShow || ensureRoute())));
    try{ if(window.__TACCUINO_LAYER) map.removeLayer(window.__TACCUINO_LAYER); }catch(_e){}
    window.__TACCUINO_LAYER = null;
    state.mapVisible = false;
    state.mapRouteId = null;
    var coordinates = [];
    route.steps.forEach(function(step){
      if((step.lat == null || step.lng == null) && state.favByKey[step.key]){
        step.lat = state.favByKey[step.key].lat;
        step.lng = state.favByKey[step.key].lng;
      }
      if(step.lat != null && step.lng != null) coordinates.push([step.lat, step.lng, step]);
    });
    if(!coordinates.length){ setStatus(t('noCoords')); return; }
    var color = cleanColor(route.color);
    var group = L.layerGroup();
    if(coordinates.length > 1){
      L.polyline(coordinates.map(function(item){ return [item[0], item[1]]; }), { color: color, weight: 4, opacity: 0.82, dashArray: '7 9' }).addTo(group);
    }
    coordinates.forEach(function(item, index){
      var step = item[2];
      var icon = L.divIcon({
        className: 'taccuino-map-pin',
        html: '<span style="--route-color:'+esc(color)+'">'+(index + 1)+'</span>',
        iconSize: [26, 26], iconAnchor: [13, 13]
      });
      var marker = L.marker([item[0], item[1]], { icon: icon });
      marker.bindPopup('<strong>'+esc((index + 1) + '. ' + step.name)+'</strong>' + (step.time ? '<br>'+esc(step.time) : '') + (step.note ? '<br>'+esc(step.note) : ''));
      marker.addTo(group);
    });
    group.addTo(map);
    window.__TACCUINO_LAYER = group;
    state.mapVisible = true;
    state.mapRouteId = mapRouteId(route);
    try{
      if(coordinates.length > 1) map.fitBounds(coordinates.map(function(item){ return [item[0], item[1]]; }), { padding: [40, 40] });
      else map.setView([coordinates[0][0], coordinates[0][1]], Math.max(map.getZoom ? map.getZoom() : 17, 17), { animate: true });
    }catch(_e){}
    setStatus(t('mapShown'));
    if(options.closeAfter) closePanel();
  }

  function saveActiveNoteFromInputs(){
    var data = ensureNote();
    var titleInput = document.querySelector('[data-note-title]');
    var bodyInput = document.querySelector('[data-note-body]');
    data.note.title = titleInput ? titleInput.value : data.note.title;
    data.note.body = bodyInput ? bodyInput.value : data.note.body;
    data.note.updatedAt = Date.now();
    data.list[data.index] = data.note;
    saveNotes(data.list);
    try{ localStorage.setItem(LAST_NOTE_KEY, data.note.id); }catch(_e){}
    setStatus(t('noteSaved'));
  }

  function newNote(){
    var list = notes();
    var note = { id: uid('note'), title: '', body: '', createdAt: Date.now(), updatedAt: Date.now() };
    list.push(note);
    saveNotes(list);
    state.noteId = note.id;
    try{ localStorage.setItem(LAST_NOTE_KEY, note.id); }catch(_e){}
    renderNotes();
    animatePage();
    setStatus('');
    setTimeout(function(){ var input = document.querySelector('[data-note-title]'); try{ input && input.focus(); }catch(_e){} }, 30);
  }

  function moveNote(direction){
    var data = ensureNote();
    var index = data.index + direction;
    if(index < 0 || index >= data.list.length) return;
    state.noteId = data.list[index].id;
    try{ localStorage.setItem(LAST_NOTE_KEY, state.noteId); }catch(_e){}
    renderNotes();
    animatePage();
    setStatus('');
  }

  function deleteNote(){
    var data = ensureNote();
    if(!window.confirm(t('confirmDeleteNote'))) return;
    data.list.splice(data.index, 1);
    if(!data.list.length){
      var blank = { id: uid('note'), title: '', body: '', createdAt: Date.now(), updatedAt: Date.now() };
      data.list.push(blank);
    }
    var nextIndex = Math.min(data.index, data.list.length - 1);
    state.noteId = data.list[nextIndex].id;
    saveNotes(data.list);
    try{ localStorage.setItem(LAST_NOTE_KEY, state.noteId); }catch(_e){}
    renderNotes();
    animatePage();
    setStatus('');
  }

  function openPanel(){
    if(!state.ready) setupPanel();
    collectFavourites();
    ensureRoute();
    var root = panel();
    if(!root) return;
    resetLegacyPanelStyles(root);
    root.classList.add('open');
    root.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('taccuino-open');
    render();
    setTimeout(function(){
      var active = document.querySelector('#fav-notes-panel .taccuino-tabs .is-active');
      try{ active && active.focus({ preventScroll: true }); }catch(_e){}
    }, 30);
  }

  function closePanel(){
    var root = panel();
    if(!root) return;
    root.classList.remove('open');
    root.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('taccuino-open');
  }

  function togglePanel(event){
    if(event){
      try{ event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation(); }catch(_e){}
    }
    var root = panel();
    if(root && root.classList.contains('open')) closePanel();
    else openPanel();
  }

  function bindButton(){
    var openButton = button();
    if(!openButton || openButton.__taccuinoV2Bound) return;
    openButton.__taccuinoV2Bound = true;
    openButton.type = 'button';
    openButton.setAttribute('title', t('title'));
    openButton.setAttribute('aria-label', t('open') + ' ' + t('title'));
    var screenReader = openButton.querySelector('.sr-only');
    if(screenReader) screenReader.textContent = t('open') + ' ' + t('title');
    openButton.addEventListener('click', togglePanel, true);
  }

  function boot(){
    bindButton();
    setupPanel();
    collectFavourites();
    state.route = normalizeRoute(readJSON(DRAFT_KEY, null) || blankRoute());
    render();
    window.addEventListener('keydown', function(event){ if(event.key === 'Escape') closePanel(); }, true);
    window.addEventListener('i18n:changed', render);
    document.addEventListener('app:set-lang', render);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
