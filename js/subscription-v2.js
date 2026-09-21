/* Genova mApp - pannello Abbonamento, pronto per Supabase + Stripe. */
(function(){
  'use strict';
  if(window.__GENOVA_SUBSCRIPTION_V2__)return;
  window.__GENOVA_SUBSCRIPTION_V2__=true;

  var C={
    it:{
      close:'Chiudi',guestState:'Visitatore',freeState:'Account gratuito',premiumState:'Premium',currentPlan:'Piano attuale',
      menuGuest:'Visitatore',menuLogin:'Accedi o registrati',menuPlans:'Scopri Premium',menuManage:'Il tuo abbonamento',menuAccount:'Info account',
      title:'Genova mApp Premium',heroTitle:'Scopri tutto il potenziale di Genova mApp',heroIntro:'Esplora gratuitamente la città, crea un account per conservare i tuoi contenuti e passa a Premium per usare tutti gli strumenti senza i limiti della versione gratuita.',
      guestTitle:'Visitatore',freeTitle:'Account gratuito',premiumTitle:'Premium',included:'Il tuo livello',
      guestFeatures:['2 ricerche Eventi ogni 24 ore','GPS disponibile, senza Raggio/Vicino a me','Note conservate solo su questo dispositivo','Anteprima MiniDoc di 10 secondi','Nessun punto Preferito e nessun Percorso personalizzato'],
      freeFeatures:['5 ricerche Eventi ogni 24 ore','GPS + Raggio/Vicino a me','Note e impostazioni sincronizzate','Fino a 10 punti Preferiti sulla mappa','1 Percorso personalizzato','Anteprima MiniDoc di 10 secondi'],
      premiumFeatures:['30 ricerche Eventi ogni 24 ore','GPS + Raggio/Vicino a me','Note e impostazioni sincronizzate','Punti Preferiti illimitati','Percorsi personalizzati illimitati','MiniDoc completi'],
      activateTitle:'Attiva il tuo abbonamento',activateGuest:'Accedi o crea gratuitamente il tuo account prima di aprire il checkout sicuro di Stripe.',activateFree:'Il tuo account è pronto. Scegli la durata dell’abbonamento e continua con Stripe.',
      monthly:'Mensile',monthlyPrice:'0,69 € / mese',flexible:'Flessibile',yearly:'Annuale',yearlyPrice:'4,99 € / anno',recommended:'Consigliato',saving:'Risparmi circa il 40%',
      invoice:'Richiedo la fattura',invoiceHint:'I dati fiscali saranno richiesti nel checkout quando necessario.',loginCta:'Accedi o registrati',checkoutCta:'Continua con Stripe',activeCta:'Gestisci su Stripe',
      secure:'Pagamento sicuro gestito da Stripe.',renewalTerms:'Rinnovo automatico. Puoi disdire in qualsiasi momento e mantenere Premium fino alla fine del periodo già pagato.',
      seller:'Servizio venduto da Associazione Indie Club.',support:'Assistenza',terms:'Termini del servizio',privacy:'Privacy',legalPreparing:'Documento in preparazione',
      checkoutPending:'Il collegamento con Stripe sarà attivato nel prossimo passaggio. Nessun addebito è stato effettuato.',working:'Apertura del checkout…',error:'Non è stato possibile aprire il checkout. Riprova tra poco.',
      activeTitle:'Il tuo abbonamento Premium è attivo',user:'Utente',plan:'Piano',renewal:'Prossimo rinnovo',accessUntil:'Accesso fino al',managePending:'Il portale Stripe sarà disponibile dopo la configurazione dei pagamenti.',unknown:'—'
    },
    en:{
      close:'Close',guestState:'Visitor',freeState:'Free account',premiumState:'Premium',currentPlan:'Current plan',
      menuGuest:'Visitor',menuLogin:'Log in or sign up',menuPlans:'Discover Premium',menuManage:'Your subscription',menuAccount:'Account info',
      title:'Genova mApp Premium',heroTitle:'Unlock the full potential of Genova mApp',heroIntro:'Explore the city for free, create an account to keep your content, and upgrade to Premium to use every tool without the free plan limits.',
      guestTitle:'Visitor',freeTitle:'Free account',premiumTitle:'Premium',included:'Your level',
      guestFeatures:['2 Event searches every 24 hours','GPS available, without Radius/Near me','Notes stored only on this device','10-second MiniDoc preview','No Favourite points or custom Routes'],
      freeFeatures:['5 Event searches every 24 hours','GPS + Radius/Near me','Synced notes and settings','Up to 10 Favourite map points','1 custom Route','10-second MiniDoc preview'],
      premiumFeatures:['30 Event searches every 24 hours','GPS + Radius/Near me','Synced notes and settings','Unlimited Favourite points','Unlimited custom Routes','Full MiniDocs'],
      activateTitle:'Activate your subscription',activateGuest:'Log in or create your free account before opening the secure Stripe checkout.',activateFree:'Your account is ready. Choose your billing period and continue with Stripe.',
      monthly:'Monthly',monthlyPrice:'€0.69 / month',flexible:'Flexible',yearly:'Yearly',yearlyPrice:'€4.99 / year',recommended:'Recommended',saving:'Save about 40%',
      invoice:'I need an invoice',invoiceHint:'Billing details will be requested at checkout when needed.',loginCta:'Log in or sign up',checkoutCta:'Continue with Stripe',activeCta:'Manage on Stripe',
      secure:'Secure payment powered by Stripe.',renewalTerms:'Renews automatically. Cancel at any time and keep Premium until the end of the paid period.',
      seller:'Service sold by Associazione Indie Club.',support:'Support',terms:'Terms of service',privacy:'Privacy',legalPreparing:'Document in preparation',
      checkoutPending:'Stripe will be connected in the next step. No charge has been made.',working:'Opening checkout…',error:'Checkout could not be opened. Please try again shortly.',
      activeTitle:'Your Premium subscription is active',user:'User',plan:'Plan',renewal:'Next renewal',accessUntil:'Access until',managePending:'The Stripe portal will be available after payment setup.',unknown:'—'
    },
    es:{
      close:'Cerrar',guestState:'Visitante',freeState:'Cuenta gratuita',premiumState:'Premium',currentPlan:'Plan actual',
      menuGuest:'Visitante',menuLogin:'Acceder o registrarse',menuPlans:'Descubre Premium',menuManage:'Tu suscripción',menuAccount:'Datos de la cuenta',
      title:'Genova mApp Premium',heroTitle:'Descubre todo el potencial de Genova mApp',heroIntro:'Explora la ciudad gratis, crea una cuenta para conservar tus contenidos y pásate a Premium para utilizar todas las herramientas sin los límites del plan gratuito.',
      guestTitle:'Visitante',freeTitle:'Cuenta gratuita',premiumTitle:'Premium',included:'Tu nivel',
      guestFeatures:['2 búsquedas de Eventos cada 24 horas','GPS disponible, sin Radio/Cerca de mí','Notas guardadas solo en este dispositivo','Vista previa MiniDoc de 10 segundos','Sin puntos Favoritos ni Rutas personalizadas'],
      freeFeatures:['5 búsquedas de Eventos cada 24 horas','GPS + Radio/Cerca de mí','Notas y ajustes sincronizados','Hasta 10 puntos Favoritos en el mapa','1 Ruta personalizada','Vista previa MiniDoc de 10 segundos'],
      premiumFeatures:['30 búsquedas de Eventos cada 24 horas','GPS + Radio/Cerca de mí','Notas y ajustes sincronizados','Puntos Favoritos ilimitados','Rutas personalizadas ilimitadas','MiniDoc completos'],
      activateTitle:'Activa tu suscripción',activateGuest:'Accede o crea gratis tu cuenta antes de abrir el pago seguro de Stripe.',activateFree:'Tu cuenta está lista. Elige la duración y continúa con Stripe.',
      monthly:'Mensual',monthlyPrice:'0,69 € / mes',flexible:'Flexible',yearly:'Anual',yearlyPrice:'4,99 € / año',recommended:'Recomendado',saving:'Ahorra aproximadamente un 40 %',
      invoice:'Necesito factura',invoiceHint:'Los datos fiscales se solicitarán durante el pago cuando sean necesarios.',loginCta:'Acceder o registrarse',checkoutCta:'Continuar con Stripe',activeCta:'Gestionar en Stripe',
      secure:'Pago seguro gestionado por Stripe.',renewalTerms:'Renovación automática. Puedes cancelar en cualquier momento y conservar Premium hasta el final del periodo pagado.',
      seller:'Servicio vendido por Associazione Indie Club.',support:'Asistencia',terms:'Términos del servicio',privacy:'Privacidad',legalPreparing:'Documento en preparación',
      checkoutPending:'Stripe se conectará en el siguiente paso. No se ha realizado ningún cargo.',working:'Abriendo el pago…',error:'No se pudo abrir el pago. Vuelve a intentarlo en breve.',
      activeTitle:'Tu suscripción Premium está activa',user:'Usuario',plan:'Plan',renewal:'Próxima renovación',accessUntil:'Acceso hasta',managePending:'El portal de Stripe estará disponible después de configurar los pagos.',unknown:'—'
    },
    fr:{
      close:'Fermer',guestState:'Visiteur',freeState:'Compte gratuit',premiumState:'Premium',currentPlan:'Formule actuelle',
      menuGuest:'Visiteur',menuLogin:'Se connecter ou s’inscrire',menuPlans:'Découvrir Premium',menuManage:'Votre abonnement',menuAccount:'Infos du compte',
      title:'Genova mApp Premium',heroTitle:'Découvrez tout le potentiel de Genova mApp',heroIntro:'Explorez gratuitement la ville, créez un compte pour conserver vos contenus et passez à Premium pour utiliser tous les outils sans les limites de la formule gratuite.',
      guestTitle:'Visiteur',freeTitle:'Compte gratuit',premiumTitle:'Premium',included:'Votre niveau',
      guestFeatures:['2 recherches Événements toutes les 24 heures','GPS disponible, sans Rayon/À proximité','Notes conservées uniquement sur cet appareil','Aperçu MiniDoc de 10 secondes','Aucun point Favori ni Parcours personnalisé'],
      freeFeatures:['5 recherches Événements toutes les 24 heures','GPS + Rayon/À proximité','Notes et réglages synchronisés','Jusqu’à 10 points Favoris sur la carte','1 Parcours personnalisé','Aperçu MiniDoc de 10 secondes'],
      premiumFeatures:['30 recherches Événements toutes les 24 heures','GPS + Rayon/À proximité','Notes et réglages synchronisés','Points Favoris illimités','Parcours personnalisés illimités','MiniDoc complets'],
      activateTitle:'Activez votre abonnement',activateGuest:'Connectez-vous ou créez gratuitement votre compte avant d’ouvrir le paiement sécurisé Stripe.',activateFree:'Votre compte est prêt. Choisissez la durée et continuez avec Stripe.',
      monthly:'Mensuel',monthlyPrice:'0,69 € / mois',flexible:'Flexible',yearly:'Annuel',yearlyPrice:'4,99 € / an',recommended:'Recommandé',saving:'Économisez environ 40 %',
      invoice:'Je souhaite une facture',invoiceHint:'Les données de facturation seront demandées lors du paiement si nécessaire.',loginCta:'Se connecter ou s’inscrire',checkoutCta:'Continuer avec Stripe',activeCta:'Gérer sur Stripe',
      secure:'Paiement sécurisé géré par Stripe.',renewalTerms:'Renouvellement automatique. Résiliez à tout moment et conservez Premium jusqu’à la fin de la période payée.',
      seller:'Service vendu par Associazione Indie Club.',support:'Assistance',terms:'Conditions d’utilisation',privacy:'Confidentialité',legalPreparing:'Document en préparation',
      checkoutPending:'Stripe sera connecté à l’étape suivante. Aucun débit n’a été effectué.',working:'Ouverture du paiement…',error:'Impossible d’ouvrir le paiement. Réessayez dans quelques instants.',
      activeTitle:'Votre abonnement Premium est actif',user:'Utilisateur',plan:'Formule',renewal:'Prochain renouvellement',accessUntil:'Accès jusqu’au',managePending:'Le portail Stripe sera disponible après la configuration des paiements.',unknown:'—'
    },
    ar:{
      close:'إغلاق',guestState:'زائر',freeState:'حساب مجاني',premiumState:'Premium',currentPlan:'الخطة الحالية',
      menuGuest:'زائر',menuLogin:'تسجيل الدخول أو إنشاء حساب',menuPlans:'اكتشف Premium',menuManage:'اشتراكك',menuAccount:'معلومات الحساب',
      title:'Genova mApp Premium',heroTitle:'اكتشف كل إمكانات Genova mApp',heroIntro:'استكشف المدينة مجانًا، وأنشئ حسابًا للاحتفاظ بمحتواك، وانتقل إلى Premium لاستخدام جميع الأدوات دون قيود الخطة المجانية.',
      guestTitle:'زائر',freeTitle:'حساب مجاني',premiumTitle:'Premium',included:'مستواك',
      guestFeatures:['بحثان عن الفعاليات كل 24 ساعة','GPS متاح من دون النطاق/بالقرب مني','الملاحظات محفوظة على هذا الجهاز فقط','معاينة MiniDoc لمدة 10 ثوانٍ','لا نقاط مفضلة ولا مسارات مخصصة'],
      freeFeatures:['5 عمليات بحث عن الفعاليات كل 24 ساعة','GPS + النطاق/بالقرب مني','مزامنة الملاحظات والإعدادات','حتى 10 نقاط مفضلة على الخريطة','مسار مخصص واحد','معاينة MiniDoc لمدة 10 ثوانٍ'],
      premiumFeatures:['30 عملية بحث عن الفعاليات كل 24 ساعة','GPS + النطاق/بالقرب مني','مزامنة الملاحظات والإعدادات','نقاط مفضلة غير محدودة','مسارات مخصصة غير محدودة','MiniDoc كاملة'],
      activateTitle:'فعّل اشتراكك',activateGuest:'سجّل الدخول أو أنشئ حسابك المجاني قبل فتح صفحة الدفع الآمنة من Stripe.',activateFree:'حسابك جاهز. اختر مدة الاشتراك وتابع مع Stripe.',
      monthly:'شهري',monthlyPrice:'0.69 € / شهر',flexible:'مرن',yearly:'سنوي',yearlyPrice:'4.99 € / سنة',recommended:'موصى به',saving:'وفّر نحو 40٪',
      invoice:'أحتاج إلى فاتورة',invoiceHint:'ستُطلب بيانات الفوترة أثناء الدفع عند الحاجة.',loginCta:'تسجيل الدخول أو إنشاء حساب',checkoutCta:'المتابعة مع Stripe',activeCta:'الإدارة على Stripe',
      secure:'دفع آمن تديره Stripe.',renewalTerms:'يتجدد تلقائيًا. يمكنك الإلغاء في أي وقت والاحتفاظ بـ Premium حتى نهاية الفترة المدفوعة.',
      seller:'الخدمة مقدمة من Associazione Indie Club.',support:'الدعم',terms:'شروط الخدمة',privacy:'الخصوصية',legalPreparing:'المستند قيد الإعداد',
      checkoutPending:'سيتم ربط Stripe في الخطوة التالية. لم يتم إجراء أي خصم.',working:'جارٍ فتح صفحة الدفع…',error:'تعذر فتح صفحة الدفع. حاول مرة أخرى بعد قليل.',
      activeTitle:'اشتراك Premium الخاص بك نشط',user:'المستخدم',plan:'الخطة',renewal:'التجديد التالي',accessUntil:'الوصول حتى',managePending:'ستتوفر بوابة Stripe بعد إعداد المدفوعات.',unknown:'—'
    },
    ru:{
      close:'Закрыть',guestState:'Гость',freeState:'Бесплатный аккаунт',premiumState:'Premium',currentPlan:'Текущий план',
      menuGuest:'Гость',menuLogin:'Войти или зарегистрироваться',menuPlans:'Узнать о Premium',menuManage:'Ваша подписка',menuAccount:'Данные аккаунта',
      title:'Genova mApp Premium',heroTitle:'Откройте все возможности Genova mApp',heroIntro:'Исследуйте город бесплатно, создайте аккаунт для сохранения материалов и перейдите на Premium, чтобы пользоваться всеми инструментами без ограничений бесплатного плана.',
      guestTitle:'Гость',freeTitle:'Бесплатный аккаунт',premiumTitle:'Premium',included:'Ваш уровень',
      guestFeatures:['2 поиска событий за 24 часа','GPS доступен без Радиуса/Рядом со мной','Заметки хранятся только на этом устройстве','10-секундный просмотр MiniDoc','Без Избранных точек и своих Маршрутов'],
      freeFeatures:['5 поисков событий за 24 часа','GPS + Радиус/Рядом со мной','Синхронизация заметок и настроек','До 10 Избранных точек на карте','1 собственный Маршрут','10-секундный просмотр MiniDoc'],
      premiumFeatures:['30 поисков событий за 24 часа','GPS + Радиус/Рядом со мной','Синхронизация заметок и настроек','Неограниченное число Избранных точек','Неограниченное число своих Маршрутов','Полные MiniDoc'],
      activateTitle:'Подключите подписку',activateGuest:'Войдите или бесплатно создайте аккаунт перед переходом к защищённой оплате Stripe.',activateFree:'Ваш аккаунт готов. Выберите период подписки и продолжите в Stripe.',
      monthly:'Ежемесячно',monthlyPrice:'0,69 € / месяц',flexible:'Гибко',yearly:'Ежегодно',yearlyPrice:'4,99 € / год',recommended:'Рекомендуем',saving:'Экономия около 40%',
      invoice:'Мне нужен счёт',invoiceHint:'Платёжные реквизиты будут запрошены при оплате, если это необходимо.',loginCta:'Войти или зарегистрироваться',checkoutCta:'Продолжить в Stripe',activeCta:'Управлять в Stripe',
      secure:'Безопасная оплата через Stripe.',renewalTerms:'Автоматическое продление. Отменить можно в любой момент; Premium действует до конца оплаченного периода.',
      seller:'Услугу предоставляет Associazione Indie Club.',support:'Поддержка',terms:'Условия использования',privacy:'Конфиденциальность',legalPreparing:'Документ готовится',
      checkoutPending:'Stripe будет подключён на следующем этапе. Списание не производилось.',working:'Открываем оплату…',error:'Не удалось открыть оплату. Повторите попытку позже.',
      activeTitle:'Ваша подписка Premium активна',user:'Пользователь',plan:'План',renewal:'Следующее продление',accessUntil:'Доступ до',managePending:'Портал Stripe станет доступен после настройки платежей.',unknown:'—'
    },
    zh:{
      close:'关闭',guestState:'访客',freeState:'免费账户',premiumState:'Premium',currentPlan:'当前方案',
      menuGuest:'访客',menuLogin:'登录或注册',menuPlans:'了解 Premium',menuManage:'你的订阅',menuAccount:'账户信息',
      title:'Genova mApp Premium',heroTitle:'解锁 Genova mApp 的全部功能',heroIntro:'免费探索城市，创建账户以保存你的内容，升级 Premium 后即可使用所有工具，不受免费方案限制。',
      guestTitle:'访客',freeTitle:'免费账户',premiumTitle:'Premium',included:'你的等级',
      guestFeatures:['每 24 小时可搜索 2 次活动','可使用 GPS，但不能使用半径/附近功能','笔记仅保存在当前设备','MiniDoc 可预览 10 秒','不能收藏地图点或创建自定义路线'],
      freeFeatures:['每 24 小时可搜索 5 次活动','GPS + 半径/附近功能','同步笔记和设置','最多收藏 10 个地图点','可创建 1 条自定义路线','MiniDoc 可预览 10 秒'],
      premiumFeatures:['每 24 小时可搜索 30 次活动','GPS + 半径/附近功能','同步笔记和设置','不限量收藏地图点','不限量创建自定义路线','完整观看 MiniDoc'],
      activateTitle:'开通订阅',activateGuest:'请先登录或免费创建账户，再进入 Stripe 安全结账页面。',activateFree:'你的账户已准备就绪。请选择订阅周期并继续前往 Stripe。',
      monthly:'月度',monthlyPrice:'0.69 € / 月',flexible:'灵活',yearly:'年度',yearlyPrice:'4.99 € / 年',recommended:'推荐',saving:'约节省 40%',
      invoice:'我需要发票',invoiceHint:'如有需要，结账时将要求填写开票信息。',loginCta:'登录或注册',checkoutCta:'继续前往 Stripe',activeCta:'在 Stripe 管理',
      secure:'由 Stripe 提供安全支付服务。',renewalTerms:'自动续订。可随时取消，Premium 权益保留至已付款周期结束。',
      seller:'服务由 Associazione Indie Club 销售。',support:'帮助',terms:'服务条款',privacy:'隐私',legalPreparing:'文件准备中',
      checkoutPending:'将在下一步连接 Stripe，目前未产生任何扣款。',working:'正在打开结账页面…',error:'无法打开结账页面，请稍后重试。',
      activeTitle:'你的 Premium 订阅已生效',user:'用户',plan:'方案',renewal:'下次续订',accessUntil:'可使用至',managePending:'完成支付配置后即可使用 Stripe 管理门户。',unknown:'—'
    },
    lij:{
      close:'Særa',guestState:'Foresto',freeState:'Account gratis',premiumState:'Premium',currentPlan:'Pian de òua',
      menuGuest:'Foresto',menuLogin:'Intra ò registrite',menuPlans:'Descòvri Premium',menuManage:'O teu abonamento',menuAccount:'Informaçioin account',
      title:'Genova mApp Premium',heroTitle:'Descòvri tutto o potensiâ de Genova mApp',heroIntro:'Descòvri a çittæ gratis, crea un account pe tegnî i teu contegnui e passa a Premium pe deuviâ tutti i strumenti sensa i limiti do pian gratis.',
      guestTitle:'Foresto',freeTitle:'Account gratis',premiumTitle:'Premium',included:'O teu livello',
      guestFeatures:['2 riçerche Eventi ògni 24 oe','GPS disponibile, sensa Raggio/Vixin a mi','Nòtte sarvæ solo in sciô dispoxitivo','Anteprimma MiniDoc de 10 secondi','Nisciun ponto Preferio e nisciun Percorso personalizzou'],
      freeFeatures:['5 riçerche Eventi ògni 24 oe','GPS + Raggio/Vixin a mi','Nòtte e impostaçioin sincronizzæ','Fìnn-a 10 ponti Preferii in sciâ mappa','1 Percorso personalizzou','Anteprimma MiniDoc de 10 secondi'],
      premiumFeatures:['30 riçerche Eventi ògni 24 oe','GPS + Raggio/Vixin a mi','Nòtte e impostaçioin sincronizzæ','Ponti Preferii sensa limite','Percorsi personalizzæ sensa limite','MiniDoc completi'],
      activateTitle:'Ativa o teu abonamento',activateGuest:'Intra ò crea gratis o teu account primma d’arvî o checkout seguo de Stripe.',activateFree:'O teu account o l’é pronto. Çèrni a duâ do abonamento e continoa con Stripe.',
      monthly:'Menscile',monthlyPrice:'0,69 € / meize',flexible:'Flessibile',yearly:'Annuâ',yearlyPrice:'4,99 € / anno',recommended:'Consegiou',saving:'Ti sparagni circa o 40%',
      invoice:'Domando a fatura',invoiceHint:'I dæti fiscali saiàn domandæ into checkout quande servan.',loginCta:'Intra ò registrite',checkoutCta:'Continoa con Stripe',activeCta:'Gestisci in sce Stripe',
      secure:'Pagamento seguo gestio da Stripe.',renewalTerms:'Renovo automatico. Ti peu disdî quande ti veu e tegnî Premium finn-a-a fin do periodo pagou.',
      seller:'Serviçio venduo da Associazione Indie Club.',support:'Assistenza',terms:'Termini do serviçio',privacy:'Privacy',legalPreparing:'Documento in preparaçion',
      checkoutPending:'O collegamento con Stripe o saiâ ativou into pròscimo passo. Nisciun addebito o l’é stæto fæto.',working:'Arvo o checkout…',error:'No semmo riescîi a arvî o checkout. Preuva torna tra un pö.',
      activeTitle:'O teu abonamento Premium o l’é ativo',user:'Utente',plan:'Pian',renewal:'Pròscimo renovo',accessUntil:'Accesso finn-a-o',managePending:'O portâ Stripe o saiâ disponibile dòppo a configuraçion di pagamenti.',unknown:'—'
    }
  };

  var btn,modal,title,body,closeButton,busy=false,lastFocused=null,selectedPlan='yearly';
  function lang(){try{return String(localStorage.getItem('lang')||document.documentElement.lang||'it').toLowerCase().split(/[-_]/)[0];}catch(_e){return'it';}}
  function t(){return C[lang()]||C.it;}
  function account(){return window.GenovaAccount?window.GenovaAccount.getState():{user:null,subscription:null,active:false};}
  function tier(){if(window.GenovaEntitlements)return window.GenovaEntitlements.currentTier();var s=account();return s.active?'premium':(s.user?'free':'guest');}
  function displayName(user){var m=(user&&user.user_metadata)||{};return String(m.full_name||m.name||(user&&user.email||'').split('@')[0]||t().user);}
  function date(value){if(!value)return t().unknown;try{return new Date(value).toLocaleDateString(lang()==='lij'?'it-IT':lang(),{year:'numeric',month:'long',day:'numeric'});}catch(_e){return new Date(value).toLocaleDateString();}}
  function node(tag,className,text){var el=document.createElement(tag);if(className)el.className=className;if(text!=null)el.textContent=text;return el;}
  function buttonNode(className,text){var el=node('button',className,text);el.type='button';return el;}
  function clearBody(){while(body.firstChild)body.removeChild(body.firstChild);}
  function openModal(){lastFocused=document.activeElement;modal.classList.remove('hidden');document.documentElement.classList.add('sub-v2-open');closeButton.focus();}
  function closeModal(){modal.classList.add('hidden');document.documentElement.classList.remove('sub-v2-open');if(lastFocused&&lastFocused.focus)lastFocused.focus();}
  function tierLabel(code){return code==='premium'?t().premiumState:(code==='free'?t().freeState:t().guestState);}
  function accessRefresh(){var s=account();window.isSubscribed=!!s.active;document.dispatchEvent(new CustomEvent('genova:premium-ui',{detail:{active:!!s.active,tier:tier()}}));}

  function render(){
    if(!btn)return;
    var code=tier();
    btn.dataset.state=code==='premium'?'gold':(code==='free'?'silver':'bronze');
    var img=btn.querySelector('img');if(img)img.src=code==='premium'?'Abbonamento/coin-gold.svg':'Abbonamento/coin-silver.svg';
    var sr=btn.querySelector('.sr-only');if(sr)sr.textContent=tierLabel(code);
    var buttonLabel=(code==='premium'?t().menuManage:t().menuPlans)+' · '+tierLabel(code);
    btn.setAttribute('aria-label',buttonLabel);btn.setAttribute('title',buttonLabel);
    accessRefresh();
  }

  function hero(code){
    var section=node('section','sub-v2-hero');
    var copy=node('div','sub-v2-hero-copy');
    var status=node('span','sub-v2-status');status.appendChild(node('small','',t().currentPlan));status.appendChild(document.createTextNode(' '+tierLabel(code)));
    copy.appendChild(status);copy.appendChild(node('h3','',t().heroTitle));copy.appendChild(node('p','',t().heroIntro));section.appendChild(copy);
    return section;
  }

  function tierCard(code,label,features){
    var card=node('article','sub-v2-tier sub-v2-tier-'+code+(tier()===code?' is-current':''));
    var head=node('div','sub-v2-tier-head');head.appendChild(node('span','sub-v2-tier-pill',label));
    if(tier()===code)head.appendChild(node('span','sub-v2-current-badge',t().included));
    card.appendChild(head);card.appendChild(node('h3','',label));
    var list=node('ul','sub-v2-feature-list');features.forEach(function(feature,index){var unavailable=code==='guest'&&index===features.length-1;var li=node('li',unavailable?'is-unavailable':'');li.appendChild(node('span','sub-v2-check'+(unavailable?' is-unavailable':''),unavailable?'×':'✓'));li.appendChild(node('span','',feature));list.appendChild(li);});card.appendChild(list);
    return card;
  }

  function comparison(){
    var grid=node('section','sub-v2-tier-grid');
    grid.appendChild(tierCard('guest',t().guestTitle,t().guestFeatures));
    grid.appendChild(tierCard('free',t().freeTitle,t().freeFeatures));
    grid.appendChild(tierCard('premium',t().premiumTitle,t().premiumFeatures));
    return grid;
  }

  function setPlan(plan,root){
    selectedPlan=plan==='monthly'?'monthly':'yearly';
    root.querySelectorAll('.sub-v2-plan-choice').forEach(function(choice){var selected=choice.dataset.plan===selectedPlan;choice.classList.toggle('is-selected',selected);choice.setAttribute('aria-pressed',selected?'true':'false');});
    var cta=root.querySelector('.sub-v2-checkout');if(cta&&account().user)cta.textContent=t().checkoutCta+' · '+(selectedPlan==='yearly'?t().yearlyPrice:t().monthlyPrice);
  }

  function planChoice(plan,name,price,badge,detail){
    var choice=buttonNode('sub-v2-plan-choice','');choice.dataset.plan=plan;choice.setAttribute('aria-pressed','false');
    var top=node('span','sub-v2-plan-choice-top');top.appendChild(node('strong','',name));top.appendChild(node('span','sub-v2-plan-badge',badge));
    choice.appendChild(top);choice.appendChild(node('span','sub-v2-plan-price',price));if(detail)choice.appendChild(node('small','',detail));
    return choice;
  }

  function notice(root,message,isError){
    var old=root.querySelector('.sub-v2-action-notice');if(old)old.remove();
    var el=node('p','sub-v2-action-notice'+(isError?' is-error':''),message);el.setAttribute('role','status');
    var actions=root.querySelector('.sub-v2-action-row');actions.parentNode.insertBefore(el,actions.nextSibling);
  }

  async function beginCheckout(root,cta){
    var s=account();
    if(!s.user){closeModal();if(window.GenovaAuth)window.GenovaAuth.open('login');return;}
    if(busy)return;busy=true;cta.disabled=true;var original=cta.textContent;cta.textContent=t().working;
    var invoice=!!(root.querySelector('#sub-v2-invoice')&&root.querySelector('#sub-v2-invoice').checked);
    try{
      if(window.GenovaBilling&&typeof window.GenovaBilling.createCheckoutSession==='function'){
        var result=await window.GenovaBilling.createCheckoutSession({plan:selectedPlan,invoiceRequested:invoice});
        if(result&&result.url){window.location.assign(result.url);return;}
        throw new Error('missing_checkout_url');
      }
      notice(root,t().checkoutPending,false);
      document.dispatchEvent(new CustomEvent('genova:checkout-ready',{detail:{plan:selectedPlan,invoiceRequested:invoice,connected:false}}));
    }catch(_e){notice(root,t().error,true);}
    finally{busy=false;cta.disabled=false;cta.textContent=original;}
  }

  async function openPortal(root,cta){
    if(busy)return;busy=true;cta.disabled=true;
    try{
      if(window.GenovaBilling&&typeof window.GenovaBilling.createPortalSession==='function'){
        var result=await window.GenovaBilling.createPortalSession();if(result&&result.url){window.location.assign(result.url);return;}
      }
      notice(root,t().managePending,false);
    }catch(_e){notice(root,t().error,true);}
    finally{busy=false;cta.disabled=false;}
  }

  function legalFooter(){
    var footer=node('footer','sub-v2-legal');footer.appendChild(node('p','',t().seller));
    var links=node('div','sub-v2-legal-links');
    var support=document.createElement('a');support.href='mailto:comunicazione.sdac@gmail.it';support.textContent=t().support+': comunicazione.sdac@gmail.it';links.appendChild(support);
    [t().terms,t().privacy].forEach(function(label){links.appendChild(node('span','sub-v2-legal-pending',label+' · '+t().legalPreparing));});
    footer.appendChild(links);return footer;
  }

  function activation(){
    var s=account(),section=node('section','sub-v2-activation');section.appendChild(node('h3','',s.active?t().activeTitle:t().activateTitle));
    if(s.active){
      var sub=s.subscription||{},details=node('dl','sub-v2-details');
      [[t().user,displayName(s.user)],[t().plan,sub.plan==='monthly'?t().monthly:t().yearly],[sub.cancelAtPeriodEnd?t().accessUntil:t().renewal,date(sub.currentPeriodEnd||sub.renewsAt)]].forEach(function(pair){details.appendChild(node('dt','',pair[0]));details.appendChild(node('dd','',pair[1]));});section.appendChild(details);
      var manage=buttonNode('sub-v2-checkout',t().activeCta);manage.addEventListener('click',function(){openPortal(section,manage);});
      var activeRow=node('div','sub-v2-action-row');activeRow.appendChild(manage);section.appendChild(activeRow);section.appendChild(node('p','sub-v2-secure',t().secure));return section;
    }
    section.appendChild(node('p','sub-v2-activation-intro',s.user?t().activateFree:t().activateGuest));
    var choices=node('div','sub-v2-plan-choices');var monthly=planChoice('monthly',t().monthly,t().monthlyPrice,t().flexible,'');var yearly=planChoice('yearly',t().yearly,t().yearlyPrice,t().recommended,t().saving);choices.appendChild(yearly);choices.appendChild(monthly);section.appendChild(choices);
    monthly.addEventListener('click',function(){setPlan('monthly',section);});yearly.addEventListener('click',function(){setPlan('yearly',section);});
    var invoice=node('label','sub-v2-invoice');var checkbox=document.createElement('input');checkbox.type='checkbox';checkbox.id='sub-v2-invoice';invoice.appendChild(checkbox);var invoiceCopy=node('span','');invoiceCopy.appendChild(node('strong','',t().invoice));invoiceCopy.appendChild(node('small','',t().invoiceHint));invoice.appendChild(invoiceCopy);section.appendChild(invoice);
    var actionRow=node('div','sub-v2-action-row');var cta=buttonNode('sub-v2-checkout',s.user?t().checkoutCta:t().loginCta);cta.addEventListener('click',function(){beginCheckout(section,cta);});actionRow.appendChild(cta);section.appendChild(actionRow);
    section.appendChild(node('p','sub-v2-secure',t().secure+' '+t().renewalTerms));setPlan(selectedPlan,section);return section;
  }

  function showPanel(){
    var code=tier();title.textContent=t().title;closeButton.setAttribute('aria-label',t().close);modal.setAttribute('dir',lang()==='ar'?'rtl':'ltr');clearBody();body.appendChild(hero(code));body.appendChild(comparison());body.appendChild(activation());body.appendChild(legalFooter());openModal();
  }

  function boot(){
    btn=document.getElementById('btn-sub');modal=document.getElementById('sub-modal');if(!btn||!modal)return;
    title=document.getElementById('sub-modal-title');body=document.getElementById('sub-modal-body');closeButton=modal.querySelector('.sub-modal-close');closeButton.type='button';
    btn.addEventListener('click',function(event){event.preventDefault();showPanel();});
    closeButton.addEventListener('click',closeModal);modal.addEventListener('click',function(event){if(event.target===modal)closeModal();});
    document.addEventListener('keydown',function(event){if(event.key==='Escape'&&!modal.classList.contains('hidden'))closeModal();});
    document.addEventListener('genova:subscription-changed',function(){render();if(!modal.classList.contains('hidden'))showPanel();});
    document.addEventListener('genova:auth-changed',function(){render();if(!modal.classList.contains('hidden'))showPanel();});
    document.addEventListener('app:set-lang',function(){render();if(!modal.classList.contains('hidden'))showPanel();});render();
    window.GenovaSubscription={open:showPanel,close:closeModal,selectedPlan:function(){return selectedPlan;}};
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
