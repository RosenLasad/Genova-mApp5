(function(){
  'use strict';

  var CATEGORY = {
    it:'Acquedotto Romano', en:'Roman Aqueduct', es:'Acueducto romano', fr:'Aqueduc romain',
    ar:'القناة الرومانية', ru:'Римский акведук', zh:'罗马引水道', lij:'Ægoæto Roman'
  };
  var UI = {
    status:{it:'Stato',en:'Status',es:'Estado',fr:'État',ar:'الحالة',ru:'Состояние',zh:'状态',lij:'Stato'},
    pending:{it:'Immagine provvisoria',en:'Temporary image',es:'Imagen provisional',fr:'Image provisoire',ar:'صورة مؤقتة',ru:'Временное изображение',zh:'临时图片',lij:'Immàgine provvisöia'}
  };

  var POINTS = [
    {
      id:'fullo-presa', coords:[44.452233,8.992835], imageFuture:'presa del fullo.jpg',
      name:'La presa del Fullo',
      subtitle:{
        it:'Dove iniziava l’acquedotto',en:'Where the aqueduct began',es:'Donde comenzaba el acueducto',fr:'Là où commençait l’aqueduc',
        ar:'حيث كانت تبدأ القناة',ru:'Где начинался акведук',zh:'引水道的起点',lij:'Donde o comensava l’ægoæto'
      },
      status:{
        it:'Scomparso – localizzazione approssimativa',en:'Lost – approximate location',es:'Desaparecido – ubicación aproximada',fr:'Disparu – localisation approximative',
        ar:'مندثر – موقع تقريبي',ru:'Не сохранился — примерное местоположение',zh:'已消失—位置约略',lij:'Scìto – localizaçion aproximativa'
      },
      desc:{
        it:'Nell’area dell’attuale Giro del Fullo si collocava la presa dell’acquedotto romano, il punto da cui l’acqua del Bisagno iniziava il viaggio verso Genova. Le fonti storiche ricordano qui una chiusa o pescaia, favorita dalla presenza del rio Coverciaro e, poco più a monte, del bacino noto come Lacus Draconarius. La struttura della presa, documentata ancora in fotografie dei primi del Novecento, non è più conservata. Per questo il punto va inteso come localizzazione dell’area di origine dell’acquedotto, non come posizione millimetrica del manufatto antico. È comunque un luogo fondamentale del percorso: permette di raccontare da dove partiva il sistema idrico romano e come la conformazione naturale della Val Bisagno fosse sfruttata per alimentare la città per gravità.',
        en:'The intake of the Roman aqueduct stood in the area of today’s Giro del Fullo, where water from the Bisagno began its journey towards Genoa. Historical sources mention a weir or dam here, aided by the Coverciaro stream and, slightly upstream, the basin known as Lacus Draconarius. The intake structure, still documented in early twentieth-century photographs, no longer survives. The marker therefore identifies the aqueduct’s general area of origin rather than the exact position of the ancient structure. It remains a key stop: it explains where the Roman water system began and how the natural shape of the Bisagno Valley was used to carry water to the city by gravity.',
        es:'En la zona del actual Giro del Fullo se encontraba la toma del acueducto romano, desde donde el agua del Bisagno iniciaba su recorrido hacia Génova. Las fuentes históricas recuerdan aquí una presa, favorecida por la presencia del arroyo Coverciaro y, algo más arriba, por la cuenca conocida como Lacus Draconarius. La estructura, todavía documentada en fotografías de comienzos del siglo XX, ya no se conserva. Por ello, el punto indica el área de origen del acueducto y no la posición exacta del antiguo elemento. Es una etapa fundamental para comprender dónde comenzaba el sistema hídrico romano y cómo se aprovechaba la forma natural del valle del Bisagno para llevar el agua por gravedad hasta la ciudad.',
        fr:'La prise d’eau de l’aqueduc romain se trouvait dans le secteur de l’actuel Giro del Fullo, d’où l’eau du Bisagno commençait son trajet vers Gênes. Les sources historiques mentionnent ici un barrage, favorisé par la présence du rio Coverciaro et, un peu plus en amont, du bassin appelé Lacus Draconarius. La structure, encore visible sur des photographies du début du XXe siècle, n’est plus conservée. Le point indique donc la zone d’origine de l’aqueduc et non l’emplacement exact de l’ouvrage antique. Cette étape reste essentielle pour comprendre où naissait le réseau hydraulique romain et comment la forme naturelle du val Bisagno permettait d’alimenter la ville par gravité.',
        ar:'في منطقة جيرو دل فولو الحالية كانت تقع مأخذ مياه القناة الرومانية، حيث كانت مياه نهر بيسانيو تبدأ رحلتها نحو جنوة. وتشير المصادر التاريخية إلى وجود حاجز مائي هنا، ساعده مجرى كوفيرتشيارو والحوض المعروف باسم لاكوس دراكوناريوس في أعلى الوادي. لم يبقَ من منشأة المأخذ، التي توثقها صور من أوائل القرن العشرين، أي أثر اليوم. لذلك يشير هذا الموضع إلى المنطقة التقريبية لبداية القناة لا إلى مكان المنشأة القديمة بدقة. وهو محطة أساسية لفهم من أين انطلق النظام المائي الروماني وكيف استُغلت طبيعة وادي بيسانيو لنقل المياه إلى المدينة بالجاذبية.',
        ru:'В районе современного Джиро-дель-Фулло находился водозабор римского акведука, откуда вода Бисаньо начинала путь к Генуе. Источники упоминают здесь плотину или запруду, связанную с ручьём Коверчаро и расположенным выше бассейном, известным как Lacus Draconarius. Сооружение, ещё зафиксированное на фотографиях начала XX века, не сохранилось. Поэтому отметка показывает общую зону начала акведука, а не точное положение древней конструкции. Это важнейшая точка маршрута: она объясняет, откуда начиналась римская система водоснабжения и как естественный рельеф долины Бисаньо позволял подавать воду в город самотёком.',
        zh:'罗马引水道的取水口曾位于今天的富洛环道一带，来自比萨尼奥河的水由此开始流向热那亚。史料记载这里曾有一道堰坝，附近的科韦尔恰罗溪以及更上游被称为“龙湖”的水域为其提供了有利条件。取水设施在20世纪初的照片中仍可见，如今已不复存在。因此，这个标记表示引水道起点的大致区域，而非古代构筑物的精确位置。这里仍是路线中的关键地点，可帮助人们理解罗马供水系统从何处开始，以及比萨尼奥河谷的天然地形如何被利用，让水依靠重力流入城市。',
        lij:'Inta zöna de l’attuale Giro do Fullo gh’ea a preiza de l’ægoæto roman, donde l’ægua do Bezagno a comensava o seu viaggio verso Zêna. E fonti stòriche arrecordan chì unna ciösa, favorita da-o rio Coverciaro e, ciù in sciù, da-o Lacus Draconarius. A strutûa, documentâ ancora in fotografie do primmo Noveçento, a no l’existe ciù. O ponto o l’indica donca l’ærea d’origine e no a poziçion precisa do manufatto antico. O l’é comunque fondamentale pe capî donde o partiva o sistema idrico roman e comme a forma naturale da Val Bezagno a permetteva de portâ l’ægua in çittæ pe gravitæ.'
      }
    },
    {
      id:'rocca-molassana', coords:[44.449017,8.972068], imageFuture:'acquedotto romano rocca molassana.jpg',
      name:'Rocca di Molassana',
      subtitle:{it:'Il tratto ritrovato',en:'The rediscovered section',es:'El tramo redescubierto',fr:'Le tronçon retrouvé',ar:'المقطع المعاد اكتشافه',ru:'Заново найденный участок',zh:'重新发现的河段',lij:'O tratto retrouvou'},
      status:{it:'Visibile',en:'Visible',es:'Visible',fr:'Visible',ar:'ظاهر',ru:'Доступен для осмотра',zh:'可见',lij:'Visibile'},
      desc:{
        it:'Alla Rocca di Molassana è stato riconosciuto un tratto del canale romano che le fonti storiche segnalavano, ma che si riteneva ormai perduto. Il segmento è stato individuato e studiato nel 2019 da Henry De Santis e Giulio Montinari, contribuendo a chiarire il percorso dell’acquedotto nella media Val Bisagno. Da questa zona il condotto romano proseguiva verso Genova a una quota sensibilmente inferiore rispetto all’acquedotto medievale e moderno, che oggi domina molti tratti della valle. È quindi un punto particolarmente utile per spiegare che i due sistemi non coincidevano: quello romano seguiva un tracciato più basso e più vicino al fondovalle. Il tratto è reale, ma la sua individuazione sul terreno può non essere immediata e non va confusa con le grandi strutture dell’Acquedotto Storico successive.',
        en:'At Rocca di Molassana, a section of the Roman channel mentioned in historical sources but believed to have been lost was identified. Henry De Santis and Giulio Montinari located and studied it in 2019, helping to clarify the aqueduct’s route through the middle Bisagno Valley. From here the Roman conduit continued towards Genoa at a considerably lower elevation than the medieval and modern aqueduct that dominates many parts of the valley today. This point therefore shows that the two systems did not follow the same course: the Roman line ran lower and closer to the valley floor. The remains are genuine, although they may be difficult to recognise and should not be confused with the much larger structures of the later Historic Aqueduct.',
        es:'En Rocca di Molassana se identificó un tramo del canal romano mencionado por las fuentes históricas, pero que se creía perdido. Henry De Santis y Giulio Montinari lo localizaron y estudiaron en 2019, ayudando a aclarar el recorrido del acueducto por el valle medio del Bisagno. Desde aquí, el conducto continuaba hacia Génova a una cota mucho más baja que el acueducto medieval y moderno, hoy dominante en muchos sectores del valle. Este lugar permite comprender que ambos sistemas no coincidían: el romano seguía un trazado inferior y más próximo al fondo del valle. El resto es auténtico, aunque no siempre resulta fácil reconocerlo y no debe confundirse con las grandes estructuras posteriores del Acueducto Histórico.',
        fr:'À la Rocca di Molassana, un tronçon du canal romain signalé par les sources mais considéré comme perdu a été reconnu. Henry De Santis et Giulio Montinari l’ont repéré et étudié en 2019, contribuant à préciser le parcours de l’aqueduc dans la moyenne vallée du Bisagno. De là, le conduit poursuivait vers Gênes à une altitude nettement inférieure à celle de l’aqueduc médiéval et moderne, aujourd’hui très visible dans la vallée. Ce point montre donc que les deux systèmes ne se superposaient pas : le tracé romain restait plus bas et plus proche du fond de vallée. Le vestige est authentique, mais il peut être difficile à identifier et ne doit pas être confondu avec les grandes structures ultérieures de l’Aqueduc historique.',
        ar:'في روكا دي مولاسانا تم التعرف على جزء من القناة الرومانية ورد ذكره في المصادر التاريخية وكان يُعتقد أنه فُقد. وقد حدده ودرسه هنري دي سانتيس وجوليو مونتيناري عام 2019، مما ساعد على توضيح مسار القناة في الجزء الأوسط من وادي بيسانيو. من هنا كان المجرى يتجه نحو جنوة على ارتفاع أدنى بكثير من القناة التاريخية التي تعود إلى العصور الوسطى والحديثة وتبرز اليوم في أجزاء كثيرة من الوادي. يوضح هذا المكان أن النظامين لم يتطابقا؛ فالمسار الروماني كان أخفض وأقرب إلى قاع الوادي. الأثر حقيقي، لكنه قد يصعب تمييزه على الأرض ولا ينبغي الخلط بينه وبين المنشآت الكبيرة اللاحقة.',
        ru:'У Рокка-ди-Молассана был обнаружен участок римского канала, упомянутый в исторических источниках, но считавшийся утраченным. В 2019 году его нашли и исследовали Генри Де Сантис и Джулио Монтинари, уточнив трассу акведука в средней части долины Бисаньо. Отсюда римский водовод шёл к Генуе значительно ниже средневекового и нового акведука, крупные сооружения которого сегодня заметны во многих местах долины. Точка помогает понять, что две системы не совпадали: римская линия проходила ниже и ближе ко дну долины. Остатки подлинные, однако на местности их трудно распознать и не следует путать с более поздними монументальными сооружениями Исторического акведука.',
        zh:'在莫拉萨纳岩地，人们确认了一段史料曾经提及、但一度被认为已经消失的罗马水渠。2019年，亨利·德桑蒂斯与朱利奥·蒙蒂纳里发现并研究了这段遗迹，进一步厘清了引水道在比萨尼奥河谷中段的走向。罗马渠道从这里向热那亚延伸，其高度明显低于今天在河谷多处可见的中世纪及近代引水道。这个地点因此能说明两套系统并不重合：罗马线路更低，也更靠近谷底。遗迹确实存在，但在现场并不容易辨认，不应与后世历史引水道的大型建筑混淆。',
        lij:'A-a Rocca de Moasann-a l’é stæto reconosciuo un tratto do canâ roman che e fonti stòriche indicavan, ma che o se credeiva perso. Henry De Santis e Giulio Montinari l’an trovou e studiou into 2019, ciarindo o percorso inta mænn-a Val Bezagno. Da chì o condotto o proseguiva verso Zêna a unna quota ciù bassa de l’ægoæto medievale e moderno. O ponto o fa capî che i doî sistemi no coincideivan: quello roman o passava ciù in basso e ciù apreuvo a-o fondo da vallâ. O tratto o l’é reale, ma o peu no ëse façile da reconosce e o no va confondûo co-e grande strutûe do Ægoæto Stòrico.'
      }
    },
    {
      id:'geirato-passaggio', coords:[44.456558,8.979019], imageFuture:'acquedotto romano geirato.jpg',
      name:'Il passaggio del Geirato',
      subtitle:{it:'Due acquedotti, due epoche',en:'Two aqueducts, two eras',es:'Dos acueductos, dos épocas',fr:'Deux aqueducs, deux époques',ar:'قناتان وعصران',ru:'Два акведука, две эпохи',zh:'两条引水道，两个时代',lij:'Doî ægoæti, doe epoche'},
      status:{it:'Localizzazione ricostruita',en:'Reconstructed location',es:'Ubicación reconstruida',fr:'Localisation reconstituée',ar:'موقع مُعاد بناؤه',ru:'Реконструированное местоположение',zh:'推定位置',lij:'Localizaçion ricostruïa'},
      desc:{
        it:'In questa zona il tracciato ricostruito dell’acquedotto romano doveva attraversare la valle del Geirato, all’incirca in corrispondenza dell’attuale ponte Martin che conduce verso via Sertoli. Non è noto un ponte romano conservato in questo punto: il marker serve quindi a visualizzare un passaggio ricostruito sulla base dell’andamento del canale e della topografia. Il luogo è però molto interessante perché permette di confrontare direttamente due epoche dell’approvvigionamento idrico genovese. Il condotto romano correva più in basso, mentre l’Acquedotto Storico successivo affrontò il Geirato con opere molto più alte e, in età moderna, con il celebre sistema del ponte-sifone. In pochi metri di mappa si possono così leggere quasi duemila anni di soluzioni diverse allo stesso problema: far superare all’acqua una valle senza perdere la pendenza necessaria.',
        en:'In this area, the reconstructed route of the Roman aqueduct probably crossed the Geirato valley near today’s Ponte Martin, which leads towards Via Sertoli. No surviving Roman bridge is known here, so the marker visualises a passage reconstructed from the channel’s course and the local topography. The site is especially interesting because it allows a direct comparison between two periods of Genoa’s water supply. The Roman conduit ran lower down, while the later Historic Aqueduct crossed the Geirato with much taller works and, in the modern era, the celebrated siphon bridge system. Within a small area, the map thus reveals almost two thousand years of different solutions to the same problem: carrying water across a valley without losing the gradient it required.',
        es:'En esta zona, el trazado reconstruido del acueducto romano debía cruzar el valle del Geirato cerca del actual puente Martin, que conduce hacia via Sertoli. No se conoce aquí ningún puente romano conservado, por lo que el marcador representa un paso reconstruido a partir del recorrido del canal y de la topografía. El lugar es especialmente interesante porque permite comparar dos épocas del abastecimiento de agua genovés. El conducto romano discurría más abajo, mientras que el Acueducto Histórico posterior superó el Geirato mediante obras mucho más altas y, en época moderna, con el célebre sistema del puente-sifón. En pocos metros se leen así casi dos mil años de soluciones distintas al mismo problema: atravesar un valle sin perder la pendiente necesaria.',
        fr:'Dans ce secteur, le tracé reconstitué de l’aqueduc romain devait franchir la vallée du Geirato près de l’actuel pont Martin, qui mène vers via Sertoli. Aucun pont romain conservé n’est connu ici : le marqueur représente donc un passage reconstitué d’après le parcours du canal et la topographie. Le lieu est particulièrement intéressant car il permet de comparer deux époques de l’alimentation en eau de Gênes. Le conduit romain passait plus bas, tandis que l’Aqueduc historique ultérieur franchit le Geirato grâce à des ouvrages beaucoup plus élevés puis, à l’époque moderne, au célèbre pont-siphon. Sur une petite portion de carte apparaissent ainsi près de deux mille ans de solutions différentes au même problème : traverser une vallée sans perdre la pente nécessaire.',
        ar:'كان المسار المُعاد تصوره للقناة الرومانية يعبر وادي جيراتو في هذه المنطقة، قرب جسر مارتن الحالي المؤدي إلى فيا سيرتولي. ولا يُعرف وجود جسر روماني باقٍ هنا، لذلك يوضح العلامة ممراً افتراضياً أعيد تحديده اعتماداً على اتجاه القناة وطبيعة الأرض. وتكمن أهمية الموقع في أنه يتيح مقارنة مرحلتين من تاريخ إمداد جنوة بالمياه. كانت القناة الرومانية تسير في مستوى أخفض، بينما اجتازت القناة التاريخية اللاحقة وادي جيراتو بمنشآت أعلى بكثير، ثم بنظام الجسر السيفوني الشهير في العصر الحديث. وهكذا تكشف مساحة صغيرة من الخريطة نحو ألفي عام من الحلول المختلفة لمشكلة واحدة: عبور الماء للوادي من دون فقدان الانحدار اللازم.',
        ru:'В этом районе реконструированная трасса римского акведука, вероятно, пересекала долину Джейрато примерно у современного моста Мартин, ведущего к виа Сертоли. Сохранившийся римский мост здесь неизвестен, поэтому отметка показывает предполагаемый переход, восстановленный по направлению канала и рельефу. Место особенно интересно возможностью сравнить два периода водоснабжения Генуи. Римский водовод проходил ниже, а более поздний Исторический акведук пересёк Джейрато значительно более высокими сооружениями и в Новое время знаменитым мостом-сифоном. На небольшом участке карты можно увидеть почти две тысячи лет разных решений одной задачи: провести воду через долину, не потеряв необходимый уклон.',
        zh:'根据水渠走向与地形复原，罗马引水道应在这一带穿越杰拉托河谷，大致位于今天通往塞尔托利街的马丁桥附近。这里没有已知保存下来的罗马桥梁，因此标记展示的是推定的过谷位置。这个地点尤其有趣，因为它可以直接比较热那亚供水史上的两个时代。罗马渠道位于较低处，后来的历史引水道则以高得多的工程跨越杰拉托，并在近代采用著名的虹吸桥系统。地图上短短的一段距离，由此呈现近两千年来为解决同一难题而采用的不同办法：让水越过河谷，同时保持所需的坡度。',
        lij:'In sta zöna o percorso ricostruïo de l’ægoæto roman o doveiva attraversâ a vallâ do Geirato, apreuvo a l’attuale ponte Martin verso via Sertoli. No se conosce un ponte roman conservou chì: o marker o mostra donca un passaggio ricostruïo in sciâ base do canâ e da topografia. O l’é interessante perché o permette de confrontâ doe epoche de l’agoæmento de Zêna. O condotto roman o passava ciù in basso, mentre l’Ægoæto Stòrico o superò o Geirato con òpere ciù erte e co-o çelebre ponte-sifon. In pöchi metri se vedde squæxi doî mil’anni de soluçioin diverse pe fâ passâ l’ægua sensa perde a pendenza necessäia.'
      }
    },
    {
      id:'staglieno-campo36', coords:[44.430600,8.947400], imageFuture:'acquedotto romano staglieno.jpg',
      name:'Staglieno',
      subtitle:{it:'Il canale romano del Campo 36',en:'The Roman channel at Field 36',es:'El canal romano del Campo 36',fr:'Le canal romain du Champ 36',ar:'القناة الرومانية في الحقل 36',ru:'Римский канал у поля 36',zh:'36区的罗马水渠',lij:'O canâ roman do Campo 36'},
      status:{it:'Visibile',en:'Visible',es:'Visible',fr:'Visible',ar:'ظاهر',ru:'Доступен для осмотра',zh:'可见',lij:'Visibile'},
      desc:{
        it:'All’interno del Cimitero Monumentale di Staglieno, presso il Campo 36, è documentato un breve tratto superstite del canale attribuito all’acquedotto romano. È uno dei rari punti del percorso in cui il visitatore può ancora confrontarsi con una testimonianza materiale dell’antico sistema idrico, sopravvissuta nonostante le profonde trasformazioni urbanistiche della Val Bisagno. Il tratto è inoltre compreso tra le aree sottoposte a tutela archeologica dal Ministero della Cultura. La sua presenza è particolarmente suggestiva: una struttura nata per portare acqua alla Genova romana è oggi inglobata nel grande paesaggio ottocentesco di Staglieno. Il punto consente anche di capire quanto il tracciato romano fosse basso rispetto all’acquedotto medievale e moderno. La posizione indicata è riferita all’area del Campo 36; per una visita sul posto può essere utile consultare anche la mappa interna del cimitero.',
        en:'Inside the Monumental Cemetery of Staglieno, near Field 36, a short surviving section of the channel attributed to the Roman aqueduct is documented. It is one of the few points where visitors can still encounter physical evidence of the ancient water system, despite the profound urban changes in the Bisagno Valley. The section also lies within an area under archaeological protection by Italy’s Ministry of Culture. Its presence is especially evocative: a structure built to supply Roman Genoa is now absorbed into Staglieno’s great nineteenth-century landscape. It also shows how low the Roman route ran compared with the medieval and modern aqueduct. The marker refers to the Field 36 area; the cemetery’s internal map may be useful when visiting.',
        es:'Dentro del Cementerio Monumental de Staglieno, cerca del Campo 36, se documenta un breve tramo conservado del canal atribuido al acueducto romano. Es uno de los pocos lugares donde todavía puede observarse un testimonio material del antiguo sistema hídrico, pese a las profundas transformaciones urbanas del valle del Bisagno. El tramo se encuentra además en una zona protegida arqueológicamente por el Ministerio de Cultura italiano. Su presencia resulta especialmente evocadora: una estructura construida para abastecer a la Génova romana está hoy integrada en el gran paisaje decimonónico de Staglieno. También permite comprender lo bajo que discurría el trazado romano respecto al acueducto medieval y moderno. El marcador corresponde al área del Campo 36; para visitarla puede ser útil consultar el plano interno del cementerio.',
        fr:'Dans le Cimetière monumental de Staglieno, près du Champ 36, un court tronçon conservé du canal attribué à l’aqueduc romain est documenté. C’est l’un des rares endroits où l’on peut encore voir un témoignage matériel de l’ancien réseau hydraulique, malgré les profondes transformations urbaines du val Bisagno. Le tronçon appartient aussi à une zone placée sous protection archéologique par le ministère italien de la Culture. Sa présence est particulièrement évocatrice : un ouvrage destiné à alimenter la Gênes romaine est aujourd’hui intégré au grand paysage du XIXe siècle de Staglieno. Il montre également combien le tracé romain passait bas par rapport à l’aqueduc médiéval et moderne. Le marqueur correspond au secteur du Champ 36 ; le plan intérieur du cimetière peut être utile lors d’une visite.',
        ar:'داخل مقبرة ستاليينو الأثرية، قرب الحقل 36، يوجد جزء قصير باقٍ من القناة المنسوبة إلى القناة الرومانية. وهو من المواقع القليلة التي يستطيع الزائر فيها مشاهدة دليل مادي على نظام المياه القديم، رغم التحولات العمرانية العميقة في وادي بيسانيو. ويقع الجزء أيضاً ضمن منطقة خاضعة للحماية الأثرية من وزارة الثقافة الإيطالية. وجوده لافت: فمنشأة بُنيت لنقل الماء إلى جنوة الرومانية أصبحت اليوم جزءاً من المشهد الكبير للمقبرة التي تعود إلى القرن التاسع عشر. كما يوضح الموقع مدى انخفاض المسار الروماني مقارنة بالقناة التاريخية اللاحقة. تشير العلامة إلى منطقة الحقل 36، وقد تفيد خريطة المقبرة الداخلية عند الزيارة.',
        ru:'В Монументальном кладбище Стальено, у поля 36, документирован короткий сохранившийся участок канала римского акведука. Это одно из немногих мест маршрута, где можно увидеть материальное свидетельство древней системы водоснабжения, уцелевшее несмотря на глубокие изменения долины Бисаньо. Участок входит в археологически охраняемую Министерством культуры Италии зону. Его присутствие особенно выразительно: сооружение, созданное для подачи воды в римскую Геную, сегодня включено в грандиозный пейзаж Стальено XIX века. Здесь также видно, насколько ниже проходила римская трасса по сравнению со средневековым и новым акведуком. Отметка относится к району поля 36; при посещении полезна внутренняя карта кладбища.',
        zh:'在斯塔列诺纪念公墓内、靠近36区的位置，保存着一小段被认定属于罗马引水道的渠道。这是整条路线中少数仍能直接接触古代供水系统实体遗迹的地点之一，尽管比萨尼奥河谷经历了深刻的城市改造。该段遗迹还位于意大利文化部保护的考古区域内。它的存在十分耐人寻味：一座原本为罗马时代热那亚供水的设施，如今融入了斯塔列诺宏大的19世纪景观。这里也能看出罗马线路比中世纪及近代引水道低得多。标记指向36区一带，实地参观时可同时查阅公墓内部地图。',
        lij:'Dentro a-o Çimitëio Monumentâ de Stagén, apreuvo a-o Campo 36, gh’é un breve tratto do canâ attribuïo a l’ægoæto roman. O l’é un di pöchi ponti donde se peu ancora vedde unna testimoniança materiale do sistema idrico antico, scampâ a-e grande transformaçioin da Val Bezagno. O tratto o l’é anche protetto comme ærea archeologica. A seu prezença a l’é suggestiva: unna strutûa fæta pe portâ ægua a-a Zêna romana a l’é òua inglobâ into grande paesaggio ottocentesco de Stagén. O ponto o mostra ascì quanto o percorso roman o fïse ciù basso de quello medievale e moderno. A poziçion a se riferisce a-o Campo 36; pe unna visita a peu servî a mappa interna do çimitëio.'
      }
    },
    {
      id:'via-ginestre', coords:[44.426333,8.944524], imageFuture:'acquedotto romano ginestre.jpg',
      name:'Via delle Ginestre',
      subtitle:{it:'Il ponte-canale romano',en:'The Roman channel bridge',es:'El puente-canal romano',fr:'Le pont-canal romain',ar:'جسر القناة الروماني',ru:'Римский мост-канал',zh:'罗马水渠桥',lij:'O ponte-canâ roman'},
      status:{it:'Visibile',en:'Visible',es:'Visible',fr:'Visible',ar:'ظاهر',ru:'Доступен для осмотра',zh:'可见',lij:'Visibile'},
      desc:{
        it:'In via delle Ginestre sopravvive uno dei resti più importanti dell’acquedotto romano di Genova: una consistente porzione di ponte-canale realizzata per superare una piccola incisione valliva, identificata nelle fonti come rio San Pantaleo, Bascione o Fossato Anselmi a Caderiva. Il manufatto è stato studiato, consolidato e sottoposto a tutela archeologica, ed è una delle testimonianze più concrete del modo in cui il condotto romano manteneva la propria quota attraversando i rii laterali della Val Bisagno. A differenza dei grandi ponti dell’Acquedotto Storico medievale e moderno, qui la scala è più ridotta e il manufatto è inserito nel tessuto urbano contemporaneo. Proprio questa sovrapposizione lo rende interessante: tra case, strade e muri moderni resiste una parte di un’infrastruttura costruita quasi duemila anni fa, facilmente ignorabile senza sapere dove guardare.',
        en:'Via delle Ginestre preserves one of the most important remains of Genoa’s Roman aqueduct: a substantial portion of a channel bridge built to cross a small valley incision, identified in sources as the San Pantaleo stream, Bascione or Fossato Anselmi at Caderiva. The structure has been studied, consolidated and placed under archaeological protection. It provides tangible evidence of how the Roman conduit maintained its elevation while crossing the side streams of the Bisagno Valley. Unlike the great bridges of the medieval and modern Historic Aqueduct, this work is smaller and embedded in today’s urban fabric. That very overlap makes it fascinating: among houses, roads and modern walls, part of an infrastructure built almost two thousand years ago survives, easily overlooked unless one knows where to look.',
        es:'En via delle Ginestre se conserva uno de los restos más importantes del acueducto romano de Génova: una parte considerable de un puente-canal construido para superar una pequeña incisión del valle, llamada en las fuentes rio San Pantaleo, Bascione o Fossato Anselmi en Caderiva. La estructura ha sido estudiada, consolidada y protegida arqueológicamente, y demuestra de forma concreta cómo el conducto romano mantenía su cota al cruzar los arroyos laterales del valle del Bisagno. A diferencia de los grandes puentes del Acueducto Histórico medieval y moderno, esta obra es menor y está integrada en el tejido urbano actual. Esa superposición la hace fascinante: entre casas, calles y muros modernos sobrevive parte de una infraestructura construida hace casi dos mil años, fácil de ignorar si no se sabe dónde mirar.',
        fr:'Via delle Ginestre conserve l’un des vestiges les plus importants de l’aqueduc romain de Gênes : une portion notable d’un pont-canal construit pour franchir une petite dépression, appelée dans les sources rio San Pantaleo, Bascione ou Fossato Anselmi à Caderiva. L’ouvrage a été étudié, consolidé et placé sous protection archéologique. Il montre concrètement comment le conduit romain maintenait son altitude en traversant les ruisseaux latéraux du val Bisagno. Contrairement aux grands ponts de l’Aqueduc historique médiéval et moderne, celui-ci est plus modeste et intégré au tissu urbain actuel. Cette superposition fait tout son intérêt : parmi les maisons, rues et murs modernes survit une partie d’une infrastructure vieille de près de deux mille ans, facile à manquer si l’on ne sait pas où regarder.',
        ar:'في فيا ديلي جينيستري بقي أحد أهم آثار القناة الرومانية في جنوة: جزء كبير من جسر قناة شُيد لعبور منخفض صغير في الوادي، تذكره المصادر بأسماء مجرى سان بانتاليو أو باشوني أو فوساتو أنسلمي في كاديريفا. دُرست المنشأة ودُعمت ووُضعت تحت الحماية الأثرية، وهي دليل واضح على الطريقة التي حافظ بها المجرى الروماني على ارتفاعه أثناء عبور روافد وادي بيسانيو. وبخلاف الجسور الكبرى للقناة التاريخية في العصور الوسطى والحديثة، فإن حجم هذا الأثر أصغر وقد اندمج في النسيج العمراني المعاصر. وهذا التداخل هو ما يجعله مهماً: فبين البيوت والطرق والجدران الحديثة يبقى جزء من بنية تحتية شُيدت قبل نحو ألفي عام، وقد يمر المرء بجانبها من دون أن يلاحظها.',
        ru:'На виа-делле-Джинестре сохранился один из важнейших остатков римского акведука Генуи — значительная часть моста-канала, построенного через небольшую ложбину, называемую в источниках ручьём Сан-Панталео, Башоне или Фоссато-Ансельми в Кадериве. Сооружение изучено, укреплено и находится под археологической охраной. Оно наглядно показывает, как римский водовод сохранял высоту при пересечении боковых ручьёв долины Бисаньо. В отличие от огромных мостов средневекового и нового Исторического акведука, это сооружение меньше и включено в современную городскую застройку. Именно это наложение эпох делает его интересным: среди домов, дорог и новых стен уцелела часть инфраструктуры почти двухтысячелетнего возраста, которую легко не заметить, не зная, куда смотреть.',
        zh:'金雀花街保存着热那亚罗马引水道最重要的遗迹之一：一段规模可观的水渠桥，原用于跨越一处小型谷地。史料将这里的水沟称为圣潘塔莱奥溪、巴肖内或卡德里瓦的安塞尔米沟。该构筑物已经过研究、加固，并受到考古保护，是了解罗马渠道如何在跨越比萨尼奥河谷侧沟时保持高度的直接证据。与中世纪和近代历史引水道的大型桥梁不同，这座遗迹规模较小，已经嵌入当代城市肌理。正是这种叠加使它格外有趣：在住宅、道路和现代墙体之间，近两千年前基础设施的一部分仍然存在，若不知道观察位置，很容易被忽略。',
        lij:'In via de Ginestre o l’é conservou un di resti ciù importanti de l’ægoæto roman de Zêna: unna grande parte de ponte-canâ fæto pe superâ unna picin-a vallâ, ciammâ inte fonti rio San Pantaleo, Bascione ò Fossato Anselmi a Caderiva. O manufatto o l’é stæto studiou, consolidou e protetto, e o mostra comme o condotto roman o mantegniva a seu quota attraversando i rii laterali da Val Bezagno. A differensa di grande ponti de l’Ægoæto Stòrico, chì a scâa a l’é ciù picin-a e o manufatto o l’é mesciou co-a çittæ moderna. Proprio sta sovrappoziçion a-o rende interessante: fra cæ, stradde e miage moderne o resiste un tòcco d’infrastrutûa fæta squæxi doî mil’anni fa.'
      }
    },
    {
      id:'rio-molinaro', coords:[44.422219,8.945696], imageFuture:'acquedotto romano rio molinaro.jpg',
      name:'Rio Molinaro',
      subtitle:{it:'L’acquedotto nascosto sotto la città',en:'The aqueduct hidden beneath the city',es:'El acueducto oculto bajo la ciudad',fr:'L’aqueduc caché sous la ville',ar:'القناة المخفية تحت المدينة',ru:'Акведук, скрытый под городом',zh:'隐藏在城市之下的引水道',lij:'L’ægoæto ascoso sotto a çittæ'},
      status:{it:'Visibile',en:'Visible',es:'Visible',fr:'Visible',ar:'ظاهر',ru:'Доступен для осмотра',zh:'可见',lij:'Visibile'},
      desc:{
        it:'Tra via Menini e via Montaldo, in corrispondenza del rio Molinaro, sopravvive un piccolo ponte-canale attribuito all’acquedotto romano. È uno dei casi più curiosi dell’intero percorso perché l’antica struttura non appare isolata come un rudere archeologico: l’arco è stato quasi completamente assorbito dall’urbanizzazione e oggi parte del manufatto è inglobata nelle opere che sostengono la strada soprastante. Fotografie dei primi decenni del Novecento mostrano molto più chiaramente la forma dell’archetto prima delle trasformazioni moderne. Il sito è sottoposto a tutela archeologica e rappresenta bene il destino dell’acquedotto romano genovese: non una grande rovina monumentale, ma piccoli frammenti sopravvissuti dentro la città contemporanea. Per l’utente della mApp è un perfetto “luogo nascosto”: si passa nelle vicinanze senza immaginare che sotto la strada resista una struttura di età romana.',
        en:'Between Via Menini and Via Montaldo, at the Rio Molinaro, a small channel bridge attributed to the Roman aqueduct survives. It is one of the route’s most curious sites because the ancient structure does not stand apart as an archaeological ruin: urban development has almost completely absorbed the arch, and part of it is now incorporated into the works supporting the road above. Early twentieth-century photographs show its form much more clearly before the modern changes. The protected archaeological site perfectly illustrates the fate of Genoa’s Roman aqueduct: not a grand monumental ruin, but small fragments surviving within the contemporary city. For mApp users it is an ideal “hidden place”: people pass nearby without imagining that a Roman structure still lies beneath the road.',
        es:'Entre via Menini y via Montaldo, junto al rio Molinaro, sobrevive un pequeño puente-canal atribuido al acueducto romano. Es uno de los lugares más curiosos del recorrido porque la estructura antigua no aparece aislada como una ruina arqueológica: el arco ha sido casi completamente absorbido por la urbanización y hoy una parte está incorporada a las obras que sostienen la carretera superior. Fotografías de principios del siglo XX muestran su forma mucho más claramente antes de las transformaciones modernas. El yacimiento, protegido arqueológicamente, representa bien el destino del acueducto romano genovés: no una gran ruina monumental, sino pequeños fragmentos conservados dentro de la ciudad actual. Para quien usa la mApp es un perfecto “lugar oculto”: se pasa cerca sin imaginar que bajo la calle resiste una estructura romana.',
        fr:'Entre via Menini et via Montaldo, au niveau du rio Molinaro, subsiste un petit pont-canal attribué à l’aqueduc romain. C’est l’un des sites les plus curieux du parcours car la structure antique n’apparaît pas isolée comme une ruine archéologique : l’urbanisation a presque entièrement absorbé l’arc et une partie est aujourd’hui intégrée aux ouvrages qui soutiennent la route supérieure. Des photographies du début du XXe siècle montrent bien mieux sa forme avant les transformations modernes. Ce site protégé illustre parfaitement le destin de l’aqueduc romain de Gênes : non pas une grande ruine monumentale, mais de petits fragments survivant dans la ville actuelle. Pour l’utilisateur de la mApp, c’est un véritable « lieu caché » : on passe tout près sans imaginer qu’une structure romaine demeure sous la rue.',
        ar:'بين فيا مينيني وفيا مونتالدو، عند مجرى مولينارو، بقي جسر قناة صغير يُنسب إلى القناة الرومانية. وهو من أكثر مواقع المسار إثارة للاهتمام لأن المنشأة القديمة لا تظهر كأثر منعزل؛ فقد امتص التوسع العمراني القوس تقريباً بالكامل، وأصبح جزء منه مدمجاً في المنشآت التي تحمل الطريق العلوي. وتُظهر صور أوائل القرن العشرين شكله بوضوح أكبر قبل التحولات الحديثة. يخضع الموقع للحماية الأثرية ويجسد مصير قناة جنوة الرومانية: ليست أطلالاً ضخمة، بل شظايا صغيرة بقيت داخل المدينة المعاصرة. إنه بالنسبة لمستخدم mApp “مكان خفي” مثالي، إذ يمكن المرور بالقرب منه من دون تخيل أن منشأة رومانية لا تزال قائمة تحت الطريق.',
        ru:'Между виа Менини и виа Монтальдо, у ручья Молинаро, сохранился небольшой мост-канал римского акведука. Это одно из самых необычных мест маршрута: древняя конструкция не выглядит отдельной археологической руиной. Городская застройка почти полностью поглотила арку, и теперь часть сооружения встроена в опоры проходящей сверху дороги. Фотографии начала XX века гораздо яснее показывают её вид до современных перестроек. Охраняемый археологический объект хорошо отражает судьбу римского акведука Генуи: не величественная руина, а небольшие фрагменты внутри современного города. Для пользователя mApp это настоящее «скрытое место»: рядом проходят, не подозревая, что под дорогой сохранилась конструкция римской эпохи.',
        zh:'在梅尼尼街与蒙塔尔多街之间、莫利纳罗溪附近，保存着一座被认定属于罗马引水道的小型水渠桥。它是整条路线中最特别的地点之一，因为古代结构并非以独立考古遗址的形式出现：桥拱几乎完全被城市建设吸收，其中一部分如今嵌入支撑上方道路的工程。20世纪初的照片更清楚地显示了现代改造前的小拱形态。该地点受到考古保护，也典型体现了热那亚罗马引水道的命运：它不是宏伟废墟，而是存续在当代城市中的细小片段。对mApp用户来说，这是一个真正的“隐藏地点”：人们从附近经过，却想不到道路下方仍留有罗马时代的构筑物。',
        lij:'Tra via Menini e via Montaldo, a-o rio Molinaro, o resiste un picin ponte-canâ attribuïo a l’ægoæto roman. O l’é un di caxi ciù curiosi perché a strutûa antiga a no l’é isolâ comme unna rovinn-a: l’arco o l’é squæxi tutto assorbïo da l’urbanizaçion e unna parte a l’é inglobâ inte òpere che sostegnan a stradda. E fotografie do primmo Noveçento mostran megio a forma primma de transformaçioin moderne. O scito protetto o rappresenta ben o destino de l’ægoæto roman de Zêna: no unna grande rovinn-a, ma picin frammenti drento a çittæ d’ancheu. Pe chi o deuviâ a mApp o l’é un perfetto “leugo ascoso”: se passa apreuvo sensa savei che sotto a stradda gh’é ancora unna strutûa romana.'
      }
    },
    {
      id:'mandraccio-terminale', coords:[44.409356,8.927430], imageFuture:'acquedotto romano mandraccio.jpg',
      name:'Mandraccio',
      subtitle:{it:'L’acqua arriva al porto',en:'Water reaches the harbour',es:'El agua llega al puerto',fr:'L’eau arrive au port',ar:'الماء يصل إلى الميناء',ru:'Вода достигает порта',zh:'水抵达港口',lij:'L’ægua a l’arriva a-o porto'},
      status:{it:'Localizzazione ricostruita',en:'Reconstructed location',es:'Ubicación reconstruida',fr:'Localisation reconstituée',ar:'موقع مُعاد بناؤه',ru:'Реконструированное местоположение',zh:'推定位置',lij:'Localizaçion ricostruïa'},
      desc:{
        it:'Le ricostruzioni più accreditate fanno proseguire l’acquedotto romano dalla città antica verso il porto, con un probabile punto terminale nell’area dell’attuale Mandraccio. Non sono conservati qui resti del condotto che permettano di fissarne con certezza l’arrivo, quindi il marker rappresenta un’ipotesi ricostruttiva e non un manufatto archeologico visibile. La destinazione portuale è però storicamente plausibile: l’acqua era indispensabile non soltanto agli abitanti, ma anche alle attività del porto e al rifornimento delle navi. Inserire questo punto permette soprattutto di chiudere narrativamente il percorso iniziato al Giro del Fullo: dalle acque del Bisagno fino al mare, attraversando la città romana. È anche un ottimo luogo per mostrare quanto il rapporto fra Genova e l’acqua fosse già legato, fin dall’antichità, alla sua funzione marittima e commerciale.',
        en:'The most widely accepted reconstructions extend the Roman aqueduct from the ancient city towards the harbour, with a likely terminal point in the area of today’s Mandraccio. No remains of the conduit survive here to establish its arrival with certainty, so the marker represents a reconstruction rather than a visible archaeological structure. A harbour destination is historically plausible: water was essential not only to residents, but also to port activities and to supplying ships. This point brings the route that began at Giro del Fullo to a narrative conclusion—from the waters of the Bisagno to the sea, through the Roman city. It also shows how Genoa’s relationship with water was already linked in antiquity to its maritime and commercial role.',
        es:'Las reconstrucciones más aceptadas prolongan el acueducto romano desde la ciudad antigua hacia el puerto, con un probable punto terminal en la zona del actual Mandraccio. Aquí no se conservan restos del conducto que permitan confirmar su llegada, por lo que el marcador representa una hipótesis y no una estructura arqueológica visible. Sin embargo, un destino portuario es históricamente plausible: el agua era indispensable para los habitantes, las actividades del puerto y el abastecimiento de los barcos. Este punto permite cerrar el relato iniciado en Giro del Fullo: desde las aguas del Bisagno hasta el mar, atravesando la ciudad romana. También muestra que la relación de Génova con el agua estuvo vinculada desde la Antigüedad a su función marítima y comercial.',
        fr:'Les reconstitutions les plus reconnues prolongent l’aqueduc romain depuis la ville antique vers le port, avec un probable point terminal dans le secteur de l’actuel Mandraccio. Aucun vestige du conduit ne permet ici d’en établir l’arrivée avec certitude : le marqueur représente donc une hypothèse et non un ouvrage archéologique visible. Une destination portuaire reste historiquement plausible, car l’eau était indispensable aux habitants, aux activités du port et à l’approvisionnement des navires. Ce point achève le récit commencé au Giro del Fullo : des eaux du Bisagno jusqu’à la mer, à travers la ville romaine. Il montre aussi combien le rapport entre Gênes et l’eau était déjà lié, dès l’Antiquité, à sa fonction maritime et commerciale.',
        ar:'تُمدد أكثر الدراسات قبولاً مسار القناة الرومانية من المدينة القديمة نحو الميناء، مع نقطة نهاية محتملة في منطقة ماندراتشو الحالية. لا توجد هنا بقايا محفوظة تسمح بتأكيد وصول المجرى، لذلك تمثل العلامة فرضية معاد بناؤها لا أثراً ظاهراً. ومع ذلك فإن الوصول إلى الميناء احتمال منطقي تاريخياً، إذ كانت المياه ضرورية للسكان ولأنشطة المرفأ ولتزويد السفن. يختتم هذا الموقع سرد المسار الذي يبدأ في جيرو دل فولو: من مياه بيسانيو إلى البحر عبر المدينة الرومانية. كما يوضح أن علاقة جنوة بالماء ارتبطت منذ العصور القديمة بوظيفتها البحرية والتجارية.',
        ru:'Наиболее признанные реконструкции продолжают римский акведук от древнего города к порту, предполагая его конечную точку в районе современного Мандраччо. Остатков канала, позволяющих точно подтвердить его прибытие сюда, не сохранилось, поэтому отметка представляет гипотезу, а не видимый археологический объект. Портовое назначение исторически правдоподобно: вода была необходима жителям, портовым работам и снабжению судов. Эта точка завершает рассказ о пути, начавшемся у Джиро-дель-Фулло: от вод Бисаньо к морю через римский город. Она также показывает, что связь Генуи с водой уже в древности определялась её морской и торговой ролью.',
        zh:'较为公认的复原方案认为，罗马引水道从古城继续通往港口，终点可能位于今天的曼德拉乔一带。这里没有保存下来的渠道遗迹可确证其终点，因此标记表示的是推定位置，并非可见的考古构筑物。不过，通向港口在历史上十分合理：水不仅是居民生活所需，也是港口作业和船舶补给的必需资源。这个点为始于富洛环道的路线画上叙事上的句号——从比萨尼奥河水出发，穿过罗马城市，最终抵达大海。它也说明热那亚与水的关系自古便同其海洋与商业职能紧密相连。',
        lij:'E ricostruçioin ciù acreditæ fan continuâ l’ægoæto roman da-a çittæ antiga verso o porto, con un probabile ponto finale int’ærea do Mandraccio. Chì no gh’é resti conservæ che permettan de stabilî con çertezza l’arrivo, donca o marker o rappresenta unna ipòtexi e no un manufatto visibile. A destinaçion portuale a l’é però plausibile: l’ægua a serviva a-i abitanti, a-e ativitæ do porto e a-e nave. Sto ponto o serra o raconto comensou a-o Giro do Fullo: da-e ægue do Bezagno fin a-o mâ, attraversando a çittæ romana. O mostra ascì comme o rapporto tra Zêna e l’ægua o fïse za ligou da l’antighitæ a-a seu funçion marittima e commerciale.'
      }
    }
  ];

  function lang(){
    var value='it';
    try{ value=localStorage.getItem('lang') || document.documentElement.lang || 'it'; }catch(_){ value=document.documentElement.lang || 'it'; }
    value=String(value).toLowerCase().split('-')[0];
    return Object.prototype.hasOwnProperty.call(CATEGORY,value) ? value : 'it';
  }
  function tx(value,lc){ return value && (value[lc] || value.it || value.en) || ''; }
  function esc(value){
    return String(value == null ? '' : value).replace(/[&<>"']/g,function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
    });
  }
  function mediaHTML(point){
    var file=String(point.imageFuture || '').trim();
    if(!file){
      return '<div class="gm-place-media"><div class="gm-place-media-fallback" aria-hidden="true">'+
        '<span class="gm-place-media-symbol">∩∩</span></div></div>';
    }
    var source='acquedotti/immagini/'+file;
    return '<div class="gm-place-media"><img src="'+esc(source)+'" alt="'+esc(point.name)+'" loading="lazy" decoding="async"></div>';
  }
  function popupHTML(point){
    var lc=lang(), direction=lc==='ar'?'rtl':'ltr';
    return '<article class="gm-place-popup gm-aqueduct-popup" data-aqueduct-poi="'+esc(point.id)+'" dir="'+direction+'" style="--gm-place-color:#6750a4">'+
      '<header class="gm-place-header">'+
        '<div class="gm-place-category"><span class="gm-place-category-mark" aria-hidden="true">≈</span>'+esc(tx(CATEGORY,lc))+'</div>'+
        '<h3 class="gm-place-title">'+esc(point.name)+'</h3>'+
        '<p class="gm-place-subtitle">'+esc(tx(point.subtitle,lc))+'</p>'+
      '</header>'+
      mediaHTML(point)+
      '<div class="gm-place-body">'+
        '<div class="gm-aqueduct-status"><span class="sr-only">'+esc(tx(UI.status,lc))+': </span>'+esc(tx(point.status,lc))+'</div>'+
        '<p class="gm-place-description">'+esc(tx(point.desc,lc))+'</p>'+
      '</div>'+
    '</article>';
  }
  function enabled(){
    var control=document.getElementById('chk-acq-romano');
    if(control) return !!control.checked;
    try{
      var state=JSON.parse(localStorage.getItem('acq_visibility') || '{}');
      return !!state['acq-romano'];
    }catch(_){ return false; }
  }

  var mapRef=null, layer=null, markerById={};
  function refresh(){
    if(!mapRef || !layer) return;
    if(enabled()){
      if(!mapRef.hasLayer(layer)) layer.addTo(mapRef);
    }else if(mapRef.hasLayer(layer)) mapRef.removeLayer(layer);
  }
  function updateOpenPopup(){
    if(!mapRef || !mapRef._popup) return;
    var marker=mapRef._popup._source;
    var point=marker && marker.__gmAqueductPoint;
    if(!point) return;
    mapRef._popup.setContent(popupHTML(point));
    if(mapRef._popup.update) mapRef._popup.update();
  }
  function openPoint(id,options){
    var marker=markerById[id];
    if(!marker || !mapRef) return false;
    var control=document.getElementById('chk-acq-romano');
    if(control && !control.checked) control.click();
    refresh();
    options=options || {};
    mapRef.setView(marker.getLatLng(),Math.max(mapRef.getZoom(),options.zoom || 16),{animate:options.animate!==false});
    window.setTimeout(function(){ marker.openPopup(); },options.animate===false?0:280);
    return true;
  }
  function boot(){
    mapRef=window.map || window.__LEAFLET_MAP__ || window.__map || window.MAP;
    if(!mapRef || typeof mapRef.addLayer!=='function' || !window.L) return false;
    if(window.__gmRomanAqueductPoiBooted) return true;
    window.__gmRomanAqueductPoiBooted=true;
    layer=L.layerGroup();
    POINTS.forEach(function(point){
      var marker=L.circleMarker(point.coords,{
        radius:7,weight:2,color:'#fff',fillColor:'#6750a4',fillOpacity:.96,opacity:1,className:'gm-aqueduct-marker',pane:'markerPane'
      });
      marker.__gmAqueductPoint=point;
      marker.bindTooltip(point.name,{direction:'top',offset:[0,-7]});
      marker.bindPopup(function(){ return popupHTML(point); },{
        className:'gm-place-popup-wrap gm-aqueduct-popup-wrap',maxWidth:340,minWidth:260,autoPan:true,
        autoPanPaddingTopLeft:[42,112],autoPanPaddingBottomRight:[42,116],keepInView:false
      });
      marker.addTo(layer);
      markerById[point.id]=marker;
    });
    var control=document.getElementById('chk-acq-romano');
    if(control) control.addEventListener('change',function(){ window.setTimeout(refresh,0); });
    document.addEventListener('click',function(event){
      if(event.target && event.target.closest && event.target.closest('[data-aqueduct="romano"], #chk-acq-romano')) window.setTimeout(refresh,30);
    },true);
    document.addEventListener('app:set-lang',function(){ window.setTimeout(updateOpenPopup,20); });
    window.addEventListener('storage',function(event){ if(event.key==='acq_visibility') refresh(); });
    refresh();
    window.GenovaAqueductPOI={points:POINTS,layer:layer,open:openPoint,refresh:refresh};
    return true;
  }

  window.ACQUEDOTTO_ROMANO_POIS=POINTS;
  var attempts=0, timer=window.setInterval(function(){
    if(boot() || ++attempts>160) window.clearInterval(timer);
  },100);
})();
