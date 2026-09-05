/**
 * SINGLE SOURCE OF TRUTH FOR EVERY PRODUCT.
 *
 * Nothing about a product should be hardcoded in JSX. Add a product here and it
 * appears on the homepage, the products directory, the sitemap, the JSON-LD and
 * (if it has enough content) its own detail page.
 *
 * ── RULES ──────────────────────────────────────────────────────────────────
 * 1. NEVER invent data. Downloads, ratings, review counts, revenue and user
 *    numbers are forbidden unless they come from a real, citable source.
 * 2. Use `null` for anything unknown. The UI is built to hide null fields
 *    rather than render placeholders.
 * 3. `playStoreUrl` must point at a REAL, individual listing. Every URL in this
 *    file was verified to return HTTP 200 on 2026-09-05. Never link an
 *    unpublished app to the generic developer page to make it look live —
 *    leave the URL null and the CTA renders disabled.
 * 4. A product only gets an indexable detail page when `hasDetailPage` is true,
 *    which requires a real `longDescription` and `features`. Thin pages hurt
 *    SEO more than they help.
 *
 * ── HOW TO ADD A PRODUCT ───────────────────────────────────────────────────
 * - Add an entry below with at minimum: name, slug, shortDescription,
 *   category, platform, status.
 * - Drop a 192x192 icon at `public/assets/products/<slug>.png`.
 * - If you have a longDescription + features, set `hasDetailPage: true` and it
 *   is automatically added to the router, the sitemap and the prerender list.
 */

/** @typedef {'live'|'in-development'|'coming-soon'|'archived'} ProductStatus */

export const STATUS = {
  live: { label: 'Live', tone: 'live', description: 'Publicly available today' },
  'in-development': {
    label: 'In Development',
    tone: 'building',
    description: 'Being built — not publicly available yet',
  },
  'coming-soon': { label: 'Coming Soon', tone: 'building', description: 'Launching soon' },
  archived: {
    label: 'Archived',
    tone: 'archived',
    description: 'No longer available for download',
  },
};

export const CATEGORIES = {
  utilities: 'Everyday Utilities',
  productivity: 'Productivity',
  learning: 'Learning & Developer Tools',
  games: 'Games',
  sports: 'Sports',
  lifestyle: 'Lifestyle',
};

export const PLATFORMS = {
  web: 'Web',
  android: 'Android',
};

/**
 * How a product makes money, if it does.
 *
 * This exists so the site is ready for monetisation without another redesign:
 * a product can start `free`, become `ads`, then `freemium`, and the UI follows
 * from the data. It is NOT a place to signal ambition — set a value only when
 * it describes what is live in the published product today, and leave it `null`
 * otherwise. The detail page hides the row entirely when it is null, which is
 * always better than an aspirational label.
 */
export const MONETIZATION = {
  free: { label: 'Free', description: 'Free, with no ads or purchases' },
  ads: { label: 'Free, ad-supported', description: 'Free to use, funded by ads' },
  freemium: { label: 'Freemium', description: 'Free tier with paid upgrades' },
  premium: { label: 'Paid', description: 'One-off purchase' },
  subscription: { label: 'Subscription', description: 'Recurring subscription' },
  affiliate: { label: 'Affiliate-supported', description: 'Free, funded by affiliate links' },
  none: { label: 'Not monetised', description: 'No monetisation' },
};

const PLAY = 'https://play.google.com/store/apps/details?id=';

// Canonical numeric developer URL. The older `developer?id=<name>` form
// depends on the display name staying byte-identical; this one does not.
export const PLAY_DEVELOPER_URL = 'https://play.google.com/store/apps/dev?id=7088499213183081717';

export const products = [
  // ───────────────────────── WEB PRODUCTS ─────────────────────────
  {
    name: 'SwapFormat',
    slug: 'swapformat',
    tagline: 'Image conversion that never uploads your files.',
    shortDescription:
      'Free browser-based image converters for HEIC, WebP, AVIF, SVG, PNG and JPG. Everything runs locally — files never leave your device.',
    longDescription:
      'SwapFormat is a set of free image converters that run entirely inside the browser. Most online converters work by uploading your image to a server, converting it there, and handing back a download link — which means a copy of your file now lives on someone else\'s machine. SwapFormat does the conversion locally instead, so the image never leaves your device. There is no sign-up, no watermark, and no upload step to wait on.',
    features: [
      'Converts HEIC, WebP, AVIF, SVG, PNG and JPG',
      'Runs entirely in the browser — files are never uploaded',
      'Batch conversion for multiple images at once',
      'No sign-up and no account required',
      'No watermark on output files',
    ],
    category: 'utilities',
    platform: 'web',
    status: 'live',
    icon: null,
    monogram: 'SF',
    accent: '#00c29e',
    screenshots: [],
    websiteUrl: 'https://swapformat.com/',
    playStoreUrl: null,
    githubUrl: null,
    privacyUrl: null,
    featured: true,
    monetizationType: null,
    launchYear: null,
    keywords: [
      'image converter',
      'HEIC to JPG',
      'WebP converter',
      'AVIF converter',
      'browser image conversion',
      'private image converter',
    ],
    related: ['pdf-toolkit', 'quickscan'],
    hasDetailPage: true,
    independentBrand: true,
    brandNote: 'An independent web product by Hemanth Kumar Guvvala',
  },
  {
    name: 'CodeDepth',
    slug: 'codedepth',
    tagline: 'Interview preparation with the depth the listicles skip.',
    shortDescription:
      'Java interview questions answered three ways: the 45-second answer, the real mechanism underneath, and the follow-ups an interviewer asks next.',
    longDescription:
      'Most Java interview resources give you a paragraph to memorise and stop there — which falls apart the moment an interviewer asks a follow-up. CodeDepth answers each question on three levels: the concise 45-second answer you would actually say out loud, the real mechanism underneath it, and the follow-up questions that typically come next. Every code example on the site is compiled and run as part of the build, so the snippets are verified rather than merely plausible.',
    features: [
      'Every question answered at three depths: answer, mechanism, follow-ups',
      'Code examples compiled and executed on every build',
      'Structured Java topics rather than a flat question dump',
      'Written for follow-up questions, not memorisation',
    ],
    category: 'learning',
    platform: 'web',
    status: 'live',
    icon: null,
    monogram: 'CD',
    accent: '#00d4ff',
    screenshots: [],
    websiteUrl: 'https://codedepth.pages.dev/',
    playStoreUrl: null,
    githubUrl: null,
    privacyUrl: null,
    featured: true,
    monetizationType: null,
    launchYear: null,
    keywords: [
      'Java interview questions',
      'Java interview preparation',
      'collections internals',
      'concurrency interview',
      'backend interview prep',
    ],
    related: ['quick-resume'],
    hasDetailPage: true,
    independentBrand: true,
    brandNote: 'An independent learning platform by Hemanth Kumar Guvvala',
  },

  // ───────────────────────── ANDROID · LIVE ─────────────────────────
  {
    name: 'QuickScan: QR Document Scanner',
    slug: 'quickscan',
    tagline: 'Scan QR codes, barcodes and documents — entirely offline.',
    shortDescription:
      'QR code scanner, barcode reader and document scanner with an encrypted vault. Works offline, no account.',
    longDescription:
      'QuickScan is a privacy-first Android scanner for QR codes, barcodes and paper documents, built with Jetpack Compose and Material 3. Everything happens on the device: there is no account, no sync and no analytics, and no image or scan payload leaves the phone. Scans that matter can be kept in an encrypted Secure Vault.',
    features: [
      'QR code and barcode scanning',
      'Paper document scanning',
      'Encrypted Secure Vault for sensitive scans',
      'Fully offline — scan data never leaves the device',
      'No account required',
    ],
    category: 'utilities',
    platform: 'android',
    status: 'live',
    icon: '/assets/products/quickscan.png',
    monogram: 'QS',
    accent: '#00c29e',
    screenshots: [],
    websiteUrl: null,
    playStoreUrl: `${PLAY}com.hemanthguvvala.quickscano`,
    packageId: 'com.hemanthguvvala.quickscano',
    githubUrl: null,
    privacyUrl: null,
    featured: true,
    monetizationType: 'ads',
    launchYear: null,
    keywords: ['QR code scanner', 'barcode reader', 'document scanner', 'offline scanner'],
    related: ['pdf-toolkit', 'ghost-notes', 'swapformat'],
    hasDetailPage: true,
  },
  {
    name: 'PDF Reader, Editor & Scanner',
    slug: 'pdf-toolkit',
    tagline: 'Read, edit, sign and convert PDFs without uploading them.',
    shortDescription:
      'Read, edit, sign, scan and convert PDFs. Free, offline, and no watermark on your output.',
    longDescription:
      'PDF Toolkit handles the everyday PDF jobs that normally send you to a website that wants your file and your email address: reading, editing, signing, scanning to PDF and converting between formats. It works offline and does not stamp a watermark on the documents it produces.',
    features: [
      'Read and annotate PDF documents',
      'Edit existing PDFs',
      'Sign documents on device',
      'Scan paper straight to PDF',
      'Convert between PDF and other formats',
      'Works offline, no watermark',
    ],
    category: 'productivity',
    platform: 'android',
    status: 'live',
    icon: '/assets/products/pdf-toolkit.png',
    monogram: 'PDF',
    accent: '#e5484d',
    screenshots: [],
    websiteUrl: null,
    playStoreUrl: `${PLAY}com.hemanthguvvala.pdftoolkit`,
    packageId: 'com.hemanthguvvala.pdftoolkit',
    githubUrl: null,
    privacyUrl: null,
    featured: true,
    monetizationType: 'ads',
    launchYear: null,
    keywords: ['PDF reader', 'PDF editor', 'PDF scanner', 'sign PDF', 'convert PDF'],
    related: ['quickscan', 'swapformat', 'ghost-notes'],
    hasDetailPage: true,
  },
  {
    name: 'Ghost Notes: Secure Notepad',
    slug: 'ghost-notes',
    tagline: 'Encrypted notes that never touch a server.',
    shortDescription:
      'Secure, offline notes with a cyberpunk aesthetic and biometric lock. No cloud, no analytics, no tracking.',
    longDescription:
      'Ghost Notes is a fully offline, encrypted note-taking app built with Jetpack Compose and Material Design 3. Notes are encrypted at rest using AES-256-GCM via the Android Keystore, and the app can be locked behind a fingerprint, face unlock or a PIN. There is no cloud, no analytics and no tracking — notes stay on the device.',
    features: [
      'AES-256-GCM encryption at rest via Android Keystore',
      'Biometric unlock (fingerprint / face) and PIN protection',
      'Per-note locking for individual sensitive notes',
      'Markdown formatting with auto-save',
      'Tags, categories and full-text search',
      'Trash with restore and 30-day auto-purge',
      'Fully offline — no cloud, no analytics',
    ],
    category: 'productivity',
    platform: 'android',
    status: 'live',
    icon: '/assets/products/ghost-notes.png',
    monogram: 'GN',
    accent: '#0df246',
    screenshots: [],
    websiteUrl: null,
    playStoreUrl: `${PLAY}com.hemanthguvvala.ghostnotes`,
    packageId: 'com.hemanthguvvala.ghostnotes',
    githubUrl: null,
    privacyUrl: null,
    featured: true,
    monetizationType: null,
    launchYear: null,
    keywords: ['encrypted notes', 'secure notepad', 'offline notes', 'private notes app'],
    related: ['quickscan', 'pdf-toolkit'],
    hasDetailPage: true,
  },
  {
    name: 'Daily Panchang: Hindu Calendar',
    slug: 'daily-panchang',
    tagline: 'The daily Hindu almanac, calculated on your device.',
    shortDescription:
      'Tithi, nakshatra, festivals, vrat, rahu kaal, choghadiya and sunrise times, every day.',
    longDescription:
      'Daily Panchang gives you the traditional Hindu almanac for any given day — tithi, nakshatra, festivals, vrat days, rahu kaal, choghadiya and sunrise timings. The astronomical calculations run entirely on the device with no backend, so the app works without a network connection.',
    features: [
      'Daily tithi and nakshatra',
      'Festival and vrat calendar',
      'Rahu kaal and choghadiya timings',
      'Sunrise and sunset times',
      'Home screen widget',
      'On-device calculation — works offline',
    ],
    category: 'lifestyle',
    platform: 'android',
    status: 'live',
    icon: '/assets/products/daily-panchang.png',
    monogram: 'DP',
    accent: '#eebb4d',
    screenshots: [],
    websiteUrl: null,
    playStoreUrl: `${PLAY}com.hemanthguvvala.dailypanchang`,
    packageId: 'com.hemanthguvvala.dailypanchang',
    githubUrl: null,
    privacyUrl: null,
    featured: false,
    monetizationType: null,
    launchYear: null,
    keywords: ['panchang', 'hindu calendar', 'tithi', 'nakshatra', 'rahu kaal', 'choghadiya'],
    related: ['zodiac-daily-cosmic-age'],
    hasDetailPage: true,
  },
  {
    name: 'Gully Cricket Scorer',
    slug: 'gully-cricket-scorer',
    tagline: 'Scoring built for the cricket most people actually play.',
    shortDescription:
      'Free cricket scoring for amateur, gully, club and league matches, with WhatsApp sharing.',
    longDescription:
      'Most cricket scoring apps are built around the professional format and get awkward the moment you are scoring a tape-ball match in a lane. Gully Cricket Scorer is built for amateur, gully, club and league cricket, and shares a readable scorecard straight to WhatsApp when the match is done.',
    features: [
      'Ball-by-ball scoring for amateur and club matches',
      'Built for gully, club and league formats',
      'Share scorecards directly to WhatsApp',
      'Free to use',
    ],
    category: 'sports',
    platform: 'android',
    status: 'live',
    icon: '/assets/products/gully-cricket-scorer.png',
    monogram: 'GC',
    accent: '#00c29e',
    screenshots: [],
    websiteUrl: null,
    playStoreUrl: `${PLAY}com.hemanthguvvala.gullycricketscorer`,
    packageId: 'com.hemanthguvvala.gullycricketscorer',
    githubUrl: null,
    privacyUrl: null,
    featured: false,
    monetizationType: null,
    launchYear: null,
    keywords: ['cricket scorer', 'gully cricket', 'cricket scoring app', 'club cricket'],
    related: ['cricket-highlights'],
    hasDetailPage: true,
  },
  {
    name: 'Stitch Infinite',
    slug: 'stitch-infinite',
    tagline: 'A 2048-style tile-merge puzzle with combo chains.',
    shortDescription:
      'Tile-merge puzzle game with five modes, themes and daily challenges. Swipe to combine tiles and chain combos.',
    longDescription:
      'Stitch Infinite is a tile-merge puzzle game for Android: swipe to combine same-value tiles, chain combos for score multipliers, complete daily challenges, and push past 2048. It ships with five game modes and a set of themes, and is built with Jetpack Compose.',
    features: [
      'Five distinct game modes',
      'Combo chaining with score multipliers',
      'Daily challenges',
      'Multiple visual themes',
      'Local high-score tracking',
    ],
    category: 'games',
    platform: 'android',
    status: 'live',
    icon: '/assets/products/stitch-infinite.png',
    monogram: 'SI',
    accent: '#a78bfa',
    screenshots: [],
    websiteUrl: null,
    playStoreUrl: `${PLAY}com.hemanthguvvala.stitchinfinite`,
    packageId: 'com.hemanthguvvala.stitchinfinite',
    githubUrl: null,
    privacyUrl: null,
    featured: false,
    monetizationType: null,
    launchYear: null,
    keywords: ['2048 game', 'tile merge puzzle', 'puzzle game', 'number puzzle'],
    related: ['brainbuzz', 'ashta-chamma'],
    hasDetailPage: true,
  },
  {
    name: 'BrainBuzz – IQ & Brain Games',
    slug: 'brainbuzz',
    tagline: 'Riddles, logic puzzles and daily brain challenges.',
    shortDescription:
      'Train your brain with riddles, IQ games, logic puzzles and daily challenges.',
    longDescription:
      'BrainBuzz is a collection of riddles, IQ games and logic puzzles with a daily challenge to keep a streak going. Puzzles are grouped by type and increase in difficulty as you work through them.',
    features: [
      'Riddles and logic puzzles',
      'IQ-style reasoning games',
      'Daily challenges',
      'Progressive difficulty',
    ],
    category: 'games',
    platform: 'android',
    status: 'live',
    icon: '/assets/products/brainbuzz.png',
    monogram: 'BB',
    accent: '#f59e0b',
    screenshots: [],
    websiteUrl: null,
    playStoreUrl: `${PLAY}com.hemanthkumar.riddlesforyou`,
    packageId: 'com.hemanthkumar.riddlesforyou',
    githubUrl: null,
    privacyUrl: null,
    featured: false,
    monetizationType: null,
    launchYear: null,
    keywords: ['riddles', 'brain games', 'IQ test', 'logic puzzles'],
    related: ['stitch-infinite', 'ashta-chamma'],
    hasDetailPage: true,
  },
  {
    name: 'Ashta Chamma',
    slug: 'ashta-chamma',
    tagline: 'The classic Indian board game, online or against AI.',
    shortDescription:
      'Play the classic Indian board game Ashta Chamma with friends online or against smart AI.',
    longDescription:
      'Ashta Chamma (also known as Chowka Bhara) is a traditional Indian board game played on a 5x5 grid with cowrie shells. This version lets you play against friends online or against an AI opponent, keeping the original rules intact.',
    features: [
      'Classic Ashta Chamma rules',
      'Online multiplayer with friends',
      'AI opponent for solo play',
    ],
    category: 'games',
    platform: 'android',
    status: 'live',
    icon: '/assets/products/ashta-chamma.png',
    monogram: 'AC',
    accent: '#f97316',
    screenshots: [],
    websiteUrl: null,
    playStoreUrl: `${PLAY}com.hkgroups.alluarjun`,
    packageId: 'com.hkgroups.alluarjun',
    githubUrl: null,
    privacyUrl: null,
    featured: false,
    monetizationType: null,
    launchYear: null,
    keywords: ['Ashta Chamma', 'Chowka Bhara', 'Indian board game', 'Ludo alternative'],
    related: ['brainbuzz', 'stitch-infinite'],
    hasDetailPage: true,
  },
  {
    name: 'Cricket Highlights',
    slug: 'cricket-highlights',
    tagline: 'Match highlights and viral cricket moments in one feed.',
    shortDescription:
      'Watch the latest cricket highlights, viral moments and match videos in HD.',
    longDescription:
      'Cricket Highlights collects recent match highlights, viral moments and match videos into a single feed so you are not hunting across half a dozen sites after a game finishes.',
    features: ['Latest match highlights', 'Viral cricket moments', 'HD video playback'],
    category: 'sports',
    platform: 'android',
    status: 'live',
    icon: '/assets/products/cricket-highlights.png',
    monogram: 'CH',
    accent: '#22c55e',
    screenshots: [],
    websiteUrl: null,
    playStoreUrl: `${PLAY}com.hkgroups.crickethighlights`,
    packageId: 'com.hkgroups.crickethighlights',
    githubUrl: null,
    privacyUrl: null,
    featured: false,
    monetizationType: null,
    launchYear: null,
    keywords: ['cricket highlights', 'cricket videos', 'match highlights'],
    related: ['gully-cricket-scorer'],
    hasDetailPage: true,
  },
  {
    name: 'Zodiac: Daily Cosmic Age',
    slug: 'zodiac-daily-cosmic-age',
    tagline: 'Horoscope, moon phases and compatibility — calmly cosmic.',
    shortDescription:
      'Daily horoscope, moon phases, mood tracking and compatibility in a calm, uncluttered interface.',
    longDescription:
      'Zodiac: Daily Cosmic Age brings together the daily horoscope, current moon phase, a simple mood log and sign compatibility. The design deliberately avoids the cluttered, notification-heavy style most astrology apps use.',
    features: [
      'Daily horoscope by sign',
      'Current moon phase',
      'Mood tracking',
      'Sign compatibility',
    ],
    category: 'lifestyle',
    platform: 'android',
    status: 'live',
    icon: '/assets/products/zodiac-daily-cosmic-age.png',
    monogram: 'Z',
    accent: '#c084fc',
    screenshots: [],
    websiteUrl: null,
    playStoreUrl: `${PLAY}com.hkgroups.agecalculator`,
    packageId: 'com.hkgroups.agecalculator',
    githubUrl: null,
    privacyUrl: null,
    featured: false,
    monetizationType: null,
    launchYear: null,
    keywords: ['horoscope app', 'zodiac', 'moon phase', 'astrology compatibility'],
    related: ['daily-panchang', 'zenlife-ai'],
    hasDetailPage: true,
  },
  {
    name: 'ZenLife AI',
    slug: 'zenlife-ai',
    tagline: 'Health tracking that keeps your data on your phone.',
    shortDescription:
      'An AI health companion that tracks steps, nutrition, workouts and weight, with everything stored encrypted on the device.',
    longDescription:
      'ZenLife AI brings step count, nutrition, workouts and weight into one place, and adapts its daily targets to your own history rather than a generic formula. It is built offline-first: the database is encrypted on the device, so the tracking data stays on your phone instead of syncing to a server.',
    features: [
      'Personalised daily goals that adapt to your own history',
      'Tracks steps, nutrition, workouts and weight together',
      'Encrypted on-device database — data stays on your phone',
      'Works offline',
      'Milestone and achievement tracking',
    ],
    category: 'lifestyle',
    platform: 'android',
    status: 'live',
    icon: '/assets/products/zenlife-ai.png',
    monogram: 'ZL',
    accent: '#2dd4bf',
    screenshots: [],
    websiteUrl: null,
    playStoreUrl: `${PLAY}com.hkgroups.zenfit.zengymtracker`,
    packageId: 'com.hkgroups.zenfit.zengymtracker',
    githubUrl: null,
    privacyUrl: null,
    featured: false,
    monetizationType: null,
    launchYear: null,
    keywords: ['health tracker', 'fitness app', 'step counter', 'nutrition tracker', 'offline health app'],
    related: ['zodiac-daily-cosmic-age', 'ghost-notes'],
    hasDetailPage: true,
  },

  // ─────────────── ANDROID · NOT CURRENTLY PUBLISHED ───────────────
  // Verified 2026-09-05: these package IDs return HTTP 404 on the Play Store.
  // CTAs render disabled. Do not link these to the developer page.
  {
    name: 'Quick Resume',
    slug: 'quick-resume',
    tagline: 'Build a resume on your phone.',
    shortDescription:
      'A resume builder for Android, currently in development and not yet published.',
    longDescription: null,
    features: [],
    category: 'productivity',
    platform: 'android',
    status: 'in-development',
    icon: null,
    monogram: 'QR',
    accent: '#38bdf8',
    screenshots: [],
    websiteUrl: null,
    playStoreUrl: null,
    packageId: 'com.hemanthguvvala.quickresume',
    githubUrl: null,
    privacyUrl: null,
    featured: false,
    monetizationType: null,
    launchYear: null,
    keywords: ['resume builder', 'CV maker'],
    related: ['codedepth'],
    hasDetailPage: false,
  },
  {
    name: 'FATE',
    slug: 'fate',
    tagline: null,
    shortDescription: 'An Android project in development, not yet published.',
    longDescription: null,
    features: [],
    category: 'games',
    platform: 'android',
    status: 'in-development',
    icon: '/assets/products/fate.png',
    monogram: 'F',
    accent: '#f472b6',
    screenshots: [],
    websiteUrl: null,
    playStoreUrl: null,
    packageId: 'com.hkggroups.fate',
    githubUrl: null,
    privacyUrl: null,
    featured: false,
    monetizationType: null,
    launchYear: null,
    keywords: [],
    related: [],
    hasDetailPage: false,
  },
  {
    name: 'Karuyu',
    slug: 'karuyu',
    // TODO: no verifiable source or listing was found for this product, so the
    // description is a placeholder rather than invented marketing copy.
    tagline: null,
    shortDescription: 'Details coming soon.',
    longDescription: null,
    features: [],
    category: 'utilities',
    platform: 'android',
    status: 'in-development',
    icon: null,
    monogram: 'K',
    accent: '#94a3b8',
    screenshots: [],
    websiteUrl: null,
    playStoreUrl: null,
    packageId: null,
    githubUrl: null,
    privacyUrl: null,
    featured: false,
    monetizationType: null,
    launchYear: null,
    keywords: [],
    related: [],
    hasDetailPage: false,
  },

  // ───────────────────────── ARCHIVED ─────────────────────────
  {
    name: 'Circuit Flow: Logic Puzzle',
    slug: 'circuit-flow',
    tagline: 'Connect the circuit, complete the flow.',
    shortDescription:
      'A logic puzzle game about connecting circuits. No longer available on the Play Store.',
    longDescription: null,
    features: [],
    category: 'games',
    platform: 'android',
    status: 'archived',
    icon: '/assets/products/circuit-flow.png',
    monogram: 'CF',
    accent: '#60a5fa',
    screenshots: [],
    websiteUrl: null,
    playStoreUrl: null,
    packageId: 'com.hkgroups.ramcharan',
    githubUrl: null,
    privacyUrl: null,
    featured: false,
    monetizationType: null,
    launchYear: null,
    keywords: [],
    related: ['brainbuzz'],
    hasDetailPage: false,
  },
  {
    name: 'The Dot and The Line',
    slug: 'the-dot-and-the-line',
    tagline: 'A minimalist arcade experiment.',
    shortDescription:
      'A minimalist arcade game. No longer available on the Play Store.',
    longDescription: null,
    features: [],
    category: 'games',
    platform: 'android',
    status: 'archived',
    icon: '/assets/products/the-dot-and-the-line.png',
    monogram: 'DL',
    accent: '#818cf8',
    screenshots: [],
    websiteUrl: null,
    playStoreUrl: null,
    packageId: 'com.hkgroups.pspk',
    githubUrl: null,
    privacyUrl: null,
    featured: false,
    monetizationType: null,
    launchYear: null,
    keywords: [],
    related: ['stitch-infinite'],
    hasDetailPage: false,
  },
];

// ─────────────────────────── SELECTORS ───────────────────────────

export const getProduct = (slug) => products.find((p) => p.slug === slug) ?? null;

/** Products with a real detail page. Drives routing, sitemap and prerender. */
export const detailProducts = products.filter((p) => p.hasDetailPage);

export const liveProducts = products.filter((p) => p.status === 'live');

export const webProducts = products.filter((p) => p.platform === 'web');

export const androidProducts = products.filter((p) => p.platform === 'android');

/** Featured products for the homepage, live ones first. */
export const featuredProducts = products
  .filter((p) => p.featured)
  .sort((a, b) => Number(b.status === 'live') - Number(a.status === 'live'));

/**
 * What is currently being built. Drives the homepage "Now building" panel.
 *
 * Derived from `status`, so it updates itself when a product ships — there is
 * no separate list to remember to prune. It intentionally carries no progress
 * bars, percentages or dates: none of that would be verifiable, and a stale
 * "80% done" is worse than no number at all.
 */
export const inDevelopmentProducts = products.filter((p) => p.status === 'in-development');

/** Entries with no description yet — rendered compactly, never as a full card. */
export const isRenderableCard = (p) => Boolean(p.shortDescription);

export const getRelated = (product, limit = 3) =>
  (product.related ?? [])
    .map(getProduct)
    .filter(Boolean)
    .filter((p) => p.slug !== product.slug)
    .slice(0, limit);

/** Category counts across renderable products, used by the directory filters. */
export const categoryCounts = () =>
  products.reduce((acc, p) => {
    if (!isRenderableCard(p)) return acc;
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});
