import { Game, Package, GiftCard, Subscription, GamingAccount, StoreSettings } from '../types/store';

export const defaultSettings: StoreSettings = {
  storePhone: '0770-99-16-99',
  storeEmail: 'contact@dzairpay.com',
  whatsappNumber: '+213770991699',
  baridiMobRip: '007999990023456789 45',
  baridiMobAccountName: 'DZAIRPAY DIGITAL STORE',
  ccpNumber: '0023456789 Clé 45',
  payseraEmail: 'pay@dzairpay.com',
  eurToDzdRate: 240, // 1 EUR = 240 DZD
  announcementText: '🔥 تخفيضات كبرى على شحن eFootball و PUBG بمناسبة نهاية الأسبوع! تسليم فوري في أقل من دقيقة ⚡',
  showAnnouncement: true,
};

export const defaultGames: Game[] = [
  {
    id: 'efootball',
    name: 'eFootball 2025',
    subtitle: 'كوينز فوري بالمعرف',
    icon: '⚽',
    color: 'from-blue-600 to-indigo-900',
    tag: 'الأكثر طلباً 🔥',
    idLabel: 'معرف المستخدم (eFootball ID / Konami ID)',
    idPlaceholder: 'مثال: 987-654-321 أو البريد المسجل',
  },
  {
    id: 'pubg',
    name: 'PUBG Mobile',
    subtitle: 'شحن شدات UC',
    icon: '🎯',
    color: 'from-amber-500 to-orange-800',
    tag: 'عرض خاص ⚡',
    idLabel: 'آيدي اللاعب (Player ID)',
    idPlaceholder: 'مثال: 5123456789',
  },
  {
    id: 'freefire',
    name: 'Free Fire',
    subtitle: 'جواهر وباقات عضوية',
    icon: '🔥',
    color: 'from-red-600 to-rose-900',
    tag: 'شحن سريع 💎',
    idLabel: 'معرف اللاعب (Player ID)',
    idPlaceholder: 'مثال: 182736452',
  },
  {
    id: 'roblox',
    name: 'Roblox',
    subtitle: 'روبوكس Robux فوري',
    icon: '🧱',
    color: 'from-slate-600 to-slate-900',
    tag: 'آمن ومضمون 🛡️',
    idLabel: 'اسم المستخدم في روبلوكس (Username)',
    idPlaceholder: 'اسم حسابك في اللعبة',
  },
  {
    id: 'fcmobile',
    name: 'EA SPORTS FC Mobile',
    subtitle: 'نقاط FC Points وتذاكر',
    icon: '🏆',
    color: 'from-emerald-600 to-teal-900',
    tag: 'جديد ومتاح ⭐',
    idLabel: 'معرف الحساب (UID)',
    idPlaceholder: 'مثال: 104928374',
  },
  {
    id: 'brawlstars',
    name: 'Brawl Stars',
    subtitle: 'شحن الجواهر والبراول باس',
    icon: '⭐',
    color: 'from-purple-600 to-pink-900',
    tag: 'سوبر سيل 🌟',
    idLabel: 'رمز اللاعب (#Player Tag)',
    idPlaceholder: 'مثال: #9V8PQL20',
  },
];

export const defaultPackages: Package[] = [
  // eFootball
  { id: 101, gameId: 'efootball', name: '130 كوينز (Coins)', price: 1.49, coinsAmount: '130', popular: false, bonus: '+10 مجاناً' },
  { id: 102, gameId: 'efootball', name: '550 كوينز (Coins)', price: 5.99, coinsAmount: '550', popular: true, bonus: '+50 مجاناً' },
  { id: 103, gameId: 'efootball', name: '1040 كوينز (Coins)', price: 10.99, coinsAmount: '1040', popular: false, bonus: 'عرض مميز' },
  { id: 104, gameId: 'efootball', name: '2130 كوينز (Coins)', price: 20.99, coinsAmount: '2130', popular: true, bonus: 'أفضل قيمة' },
  { id: 105, gameId: 'efootball', name: '3250 كوينز (Coins)', price: 31.99, coinsAmount: '3250', popular: false },
  { id: 106, gameId: 'efootball', name: '5700 كوينز (Coins)', price: 53.99, coinsAmount: '5700', popular: false, bonus: 'باكج الحيتان' },

  // PUBG Mobile
  { id: 201, gameId: 'pubg', name: '60 شدات (UC)', price: 0.99, coinsAmount: '60 UC', popular: false },
  { id: 202, gameId: 'pubg', name: '325 شدات (UC)', price: 4.99, coinsAmount: '325 UC', popular: true, bonus: 'شحن فوري' },
  { id: 203, gameId: 'pubg', name: '660 شدات (UC)', price: 9.49, coinsAmount: '660 UC', popular: true, bonus: 'تفعيل الرويال باس' },
  { id: 204, gameId: 'pubg', name: '1800 شدات (UC)', price: 23.99, coinsAmount: '1800 UC', popular: false },
  { id: 205, gameId: 'pubg', name: '3850 شدات (UC)', price: 48.99, coinsAmount: '3850 UC', popular: false, bonus: '+350 شدة بونص' },
  { id: 206, gameId: 'pubg', name: 'Royale Pass Upgrade', price: 8.99, coinsAmount: 'RP Pass', popular: false, bonus: 'تفعيل فوري' },

  // Free Fire
  { id: 301, gameId: 'freefire', name: '100 جوهرة + بونص', price: 0.99, coinsAmount: '110 💎', popular: false, bonus: '+10 بونص' },
  { id: 302, gameId: 'freefire', name: '310 جواهر (Diamonds)', price: 2.99, coinsAmount: '310 💎', popular: false },
  { id: 303, gameId: 'freefire', name: '520 جواهر (Diamonds)', price: 4.99, coinsAmount: '520 💎', popular: true, bonus: 'الأكثر مبيعاً' },
  { id: 304, gameId: 'freefire', name: '1060 جواهر (Diamonds)', price: 9.99, coinsAmount: '1060 💎', popular: true, bonus: '+100 إضافية' },
  { id: 305, gameId: 'freefire', name: 'عضوية أسبوعية (Weekly)', price: 1.99, coinsAmount: 'عضوية أسبوعية', popular: false, bonus: '450 جوهرة أسبوعياً' },
  { id: 306, gameId: 'freefire', name: 'عضوية شهرية (Monthly)', price: 9.99, coinsAmount: 'عضوية شهرية', popular: false, bonus: '2600 جوهرة شهرياً' },

  // Roblox
  { id: 401, gameId: 'roblox', name: '400 روبوكس (Robux)', price: 4.99, coinsAmount: '400 R$', popular: false },
  { id: 402, gameId: 'roblox', name: '800 روبوكس (Robux)', price: 9.99, coinsAmount: '800 R$', popular: true, bonus: 'محبوب الجميع' },
  { id: 403, gameId: 'roblox', name: '1700 روبوكس (Robux)', price: 19.99, coinsAmount: '1700 R$', popular: false },
  { id: 404, gameId: 'roblox', name: '4500 روبوكس (Robux)', price: 49.99, coinsAmount: '4500 R$', popular: false, bonus: 'قيمة قصوى' },

  // FC Mobile
  { id: 501, gameId: 'fcmobile', name: '500 FC Points', price: 4.99, coinsAmount: '500 FP', popular: false },
  { id: 502, gameId: 'fcmobile', name: '1050 FC Points', price: 9.99, coinsAmount: '1050 FP', popular: true, bonus: 'تفتيح بكجات' },
  { id: 503, gameId: 'fcmobile', name: '2200 FC Points', price: 19.99, coinsAmount: '2200 FP', popular: false },
  { id: 504, gameId: 'fcmobile', name: 'Star Pass VIP', price: 9.49, coinsAmount: 'Star Pass', popular: true, bonus: 'تفعيل كامل' },

  // Brawl Stars
  { id: 601, gameId: 'brawlstars', name: '80 جوهرة (Gems)', price: 4.99, coinsAmount: '80 Gems', popular: false },
  { id: 602, gameId: 'brawlstars', name: '170 جوهرة (Brawl Pass)', price: 9.99, coinsAmount: '170 Gems', popular: true, bonus: 'تفعيل البراول باس' },
  { id: 603, gameId: 'brawlstars', name: '360 جوهرة (Gems)', price: 19.99, coinsAmount: '360 Gems', popular: false },
];

export const defaultGiftCards: GiftCard[] = [
  {
    id: 501,
    name: 'بطاقة Google Play $10',
    category: 'Google Play',
    price: 9.99,
    desc: 'شحن متجر جوجل بلاي الأمريكي لشراء التطبيقات والألعاب وشحن الحسابات',
    region: 'أمريكي (US)',
    instantDelivery: true,
  },
  {
    id: 502,
    name: 'بطاقة iTunes $15',
    category: 'Apple Store',
    price: 14.99,
    desc: 'شحن رصيد Apple ID لشراء التطبيقات والموسيقى وشحن ألعاب iOS',
    region: 'أمريكي (US)',
    instantDelivery: true,
  },
  {
    id: 503,
    name: 'بطاقة Steam $20',
    category: 'Steam',
    price: 19.99,
    desc: 'كود رقمي لشحن محفظة ستيم وشراء ألعاب الكمبيوتر وتفعيل الماركت',
    region: 'عالمي (Global)',
    instantDelivery: true,
  },
  {
    id: 504,
    name: 'بطاقة PlayStation $25',
    category: 'PlayStation',
    price: 24.99,
    desc: 'شحن رصيد ستور بلايستيشن PS4 و PS5 لشراء ألعاب وسكنات',
    region: 'أمريكي (US)',
    instantDelivery: true,
  },
  {
    id: 505,
    name: 'بطاقة Razer Gold $10',
    category: 'Razer Gold',
    price: 9.99,
    desc: 'شحن محفظة ريزر جولد لشحن مئات الألعاب مثل ببجي وموبايل ليجندز',
    region: 'عالمي (Global)',
    instantDelivery: true,
  },
  {
    id: 506,
    name: 'Xbox Game Pass Ultimate',
    category: 'Xbox',
    price: 12.99,
    desc: 'اشتراك شهر إكسبوكس ألتيميت مع مئات ألعاب الكونسول والـ PC واللعب السحابي',
    region: 'عالمي (Global)',
    instantDelivery: true,
  },
];

export const defaultSubscriptions: Subscription[] = [
  {
    id: 601,
    name: 'اشتراك Netflix Premium 4K',
    category: 'Streaming',
    price: 3.99,
    period: 'شهر واحد',
    desc: 'ملف خاص مقفل برمز PIN بدقة فائقة 4K UHD مع ضمان طوال الشهر',
    features: ['ملف شخصي خاص', 'دقة 4K UHD فائقة', 'ضمان كامل طوال المدة', 'يعمل على كافة الأجهزة'],
    instantDelivery: true,
  },
  {
    id: 602,
    name: 'اشتراك Shahid VIP شامل الرياضة',
    category: 'Streaming',
    price: 2.99,
    period: 'شهر واحد',
    desc: 'مشاهدة مسلسلات شاهد الحصرية ومباريات الدوري السعودي ودوري أبطال آسيا',
    features: ['باقة VIP الكاملة', 'القنوات الرياضية SSC HD', 'بدون إعلانات مزعجة', 'ضمان المدة كاملة'],
    instantDelivery: true,
  },
  {
    id: 603,
    name: 'اشتراك IPTV Smarters Pro 4K',
    category: 'IPTV',
    price: 8.99,
    period: '3 أشهر',
    desc: 'أكثر من 15,000 قناة رياضية وعالمية + مكتبة أفلام ومسلسلات محدثة يومياً وبجودة عالية',
    features: ['قنوات beIN Sports كاملة 4K', 'قنوات SSC و Abu Dhabi', 'مكتبة أفلام ومسلسلات ضخمة', 'سيرفر ثابت بدون تقطيع'],
    instantDelivery: true,
  },
  {
    id: 604,
    name: 'اشتراك Spotify Premium',
    category: 'Music',
    price: 1.99,
    period: 'شهر واحد',
    desc: 'استماع لكافة الأغاني والبودكاست بدون إعلانات مع إمكانية التحميل للموبايل',
    features: ['بدون إعلانات إطلاقاً', 'تحميل للاستماع أوفلاين', 'صوت فائق النقاوة Extreme', 'حساب رسمي'],
    instantDelivery: true,
  },
];

export const defaultAccounts: GamingAccount[] = [
  {
    id: 701,
    name: 'حساب eFootball أسطوري (God Tier)',
    gameId: 'efootball',
    price: 45.00,
    desc: 'تشكيلة خارقة تضمن الفوز في الديفيجن 1! تضم نخبة بطاقات الإيبك والشو تايم النادرة.',
    level: 'ديفيجن 1 - قوة الفريق 3150+',
    specs: [
      'كاسياس إيبك GK 100 الأسطوري',
      'سواريز شو تايم CF 99 مدمر الحراس',
      'ميسي بكج الأرجنتين 102 الذهبي',
      'رومينيغي ومالديني وبيكنباور دفاع حديدي',
      'حساب مربوط بكونامي آيدي نظيف قابل للتغيير فوراً'
    ],
    status: 'available',
  },
  {
    id: 702,
    name: 'حساب PUBG قديم ميثيك مشحون',
    gameId: 'pubg',
    price: 79.99,
    desc: 'حساب من السيزون السادس مليء بالبدلات الميثيك والأسلحة المطورة مع تأثير القتل كيل مسج.',
    level: 'المستوى 74 - لقب مصير أسطوري',
    specs: [
      'سلاح M416 الجوكر كيل مسج لفل 4',
      'بدلة الغراب الميثيك النادرة',
      'مشحون رويال باس من السيزون 6 حتى الآن ماكس',
      'سيارة داسيا ذهبية ومظلات نادرة',
      'ربط نظيف مع تسليم كامل بيانات الجيميل'
    ],
    status: 'available',
  },
  {
    id: 703,
    name: 'حساب Free Fire نادر - فاير باس قديم',
    gameId: 'freefire',
    price: 35.00,
    desc: 'حساب فاخر للاعبي فري فاير يحتوي على سكن الساكورا النادر وأقوى أسلحة الإيفو ماكس.',
    level: 'المستوى 68 - رانك هيرويك',
    specs: [
      'سكن الساكورا القديم جداً',
      'سلاح MP40 الكوبرا لفل ماكس مع التأثيرات',
      'سلاح AK47 التنين الأزرق المتطور',
      'أكثر من 35 رقصة نادرة ومميزة',
      'تسليم فوري ومضمون مع الدعم'
    ],
    status: 'available',
  },
];
