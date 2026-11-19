const SITE_ORIGIN = 'https://ministryofpapers.com'

export const VOCAB_BLOG_PUBLISHED = '2026-11-19'
export const VOCAB_BLOG_MODIFIED = '2026-11-19'

export type WordEntry = {
  word: string
  pos: string
  meaning: string
  primaryAnswer: string
  alsoPair: string
  hook: string
  pyqHref?: string
}

export type IdiomEntry = {
  idiom: string
  meaning: string
  example: string
  pyqHref?: string
}

export type OneWordEntry = {
  phrase: string
  substitute: string
  rootNote: string
  pyqHref?: string
}

export type VocabArticleConfig = {
  id: 'jkssb' | 'ssc-cgl'
  path: string
  title: string
  headline: string
  description: string
  keywords: string
  breadcrumbLabel: string
  kicker: string
  badge: string
  deck: string
  quickAnswer: string
  examHubHref: string
  examHubLabel: string
  guideHref: string
  guideLabel: string
  antonymsHeading: string
  synonymsHeading: string
  trapsHeading: string
  antonyms: WordEntry[]
  synonyms: WordEntry[]
  idioms: IdiomEntry[]
  oneWords: OneWordEntry[]
  confusionPairs: Array<[string, string]>
  directPyqs: Array<{ href: string; label: string; tag: string }>
  faqs: Array<[string, string]>
  jsonLd: Record<string, unknown>
}

const PUBLISHER = {
  '@type': 'Organization',
  name: 'Ministry of Papers',
  url: SITE_ORIGIN,
  logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/favicon.svg` },
}

function buildSchema(cfg: Omit<VocabArticleConfig, 'jsonLd'>): Record<string, unknown> {
  const url = `${SITE_ORIGIN}${cfg.path}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: cfg.title,
        description: cfg.description,
        url,
        inLanguage: 'en-IN',
        articleSection: 'English Vocabulary',
        keywords: cfg.keywords,
        datePublished: `${VOCAB_BLOG_PUBLISHED}T00:00:00+05:30`,
        dateModified: `${VOCAB_BLOG_MODIFIED}T00:00:00+05:30`,
        author: { '@type': 'Organization', name: 'Ministry of Papers Editorial Team', url: `${SITE_ORIGIN}/about` },
        publisher: PUBLISHER,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        isPartOf: { '@type': 'WebSite', name: 'Ministry of Papers', url: SITE_ORIGIN },
        isAccessibleForFree: true,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_ORIGIN },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_ORIGIN}/blog` },
          { '@type': 'ListItem', position: 3, name: cfg.breadcrumbLabel, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: cfg.faqs.map(([q, a]) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  }
}

const JKSSB_BASE: Omit<VocabArticleConfig, 'jsonLd'> = {
  id: 'jkssb',
  path: '/blog/jkssb-most-repeated-synonyms-antonyms',
  title: 'JKSSB Most Repeated Synonyms & Antonyms (PYQ List, Idioms & Solved Questions)',
  headline: 'JKSSB most repeated synonyms, antonyms, idioms and one-word substitutions',
  description:
    'Complete JKSSB General English vocabulary guide: most repeated synonyms, antonyms, idioms, and one-word substitutions asked in JKSSB FAA, Patwari, Junior Assistant, VLW, Supervisor & Constable PYQs.',
  keywords:
    'JKSSB most repeated synonyms, JKSSB most repeated antonyms, JKSSB General English vocabulary, JKSSB FAA English synonyms antonyms, JKSSB Patwari English vocabulary, JKSSB Junior Assistant synonyms antonyms, JKSSB idioms and phrases PYQ, JKSSB one word substitution',
  breadcrumbLabel: 'JKSSB Synonyms & Antonyms',
  kicker: 'JKSSB General English · PYQ Vocabulary',
  badge: 'JKSSB FAA · Patwari · Junior Assistant · VLW · Constable',
  deck:
    'Master the exact synonyms, antonyms, idioms, and one-word substitutions repeatedly tested in JKSSB General English sections—with memory hooks, negative-prefix traps, and direct solved PYQs.',
  quickAnswer:
    'In JKSSB General English (FAA, Patwari, Junior Assistant, VLW, Supervisor, and Police Constable), 4 to 7 marks come directly from vocabulary—especially high-frequency antonyms/synonyms like Obvious, Prudent, Benign, Spend, Prodigal, Luminous, and classic idioms like Break the ice. Revising words in opposite pairs prevents the classic negative-marking flip.',
  examHubHref: '/exam/jkssb',
  examHubLabel: 'JKSSB PYQ Hub',
  guideHref: '/guide/jkssb-patwari',
  guideLabel: 'JKSSB Patwari Guide',
  antonymsHeading: '1. JKSSB Most-Repeated Antonyms (With Opposite Pairs)',
  synonymsHeading: '2. JKSSB Most-Repeated Synonyms (With Root Clues)',
  trapsHeading: '5. Five JKSSB General English Vocabulary Traps',
  antonyms: [
    {
      word: 'Obvious',
      pos: 'Adj.',
      meaning: 'Easily perceived or understood; clear and apparent',
      primaryAnswer: 'Obscure, Ambiguous, Hidden, Cryptic',
      alsoPair: 'Synonyms: Evident, Manifest, Clear',
      hook: 'Plain in front of you vs. obscure/hidden in shadow.',
      pyqHref: '/question/give-the-antonyms-opposite-meaning-of-obvious--8c92d474ed',
    },
    {
      word: 'Spend',
      pos: 'Verb',
      meaning: 'To pay out money or consume resources',
      primaryAnswer: 'Save, Hoard, Conserve, Accumulate',
      alsoPair: 'Synonyms: Expend, Disburse, Squander',
      hook: 'Direct JKSSB-style everyday antonym: Spend vs. Save/Hoard.',
      pyqHref: '/question/give-the-antonyms-opposite-meaning-of-spend--09fb2537e7',
    },
    {
      word: 'Prudent',
      pos: 'Adj.',
      meaning: 'Wise, careful, and showing good judgment for the future',
      primaryAnswer: 'Reckless, Imprudent, Rash, Careless',
      alsoPair: 'Synonyms: Sagacious, Judicious, Shrewd',
      hook: 'Prudent plans ahead; reckless acts without thinking.',
      pyqHref: '/question/select-the-most-appropriate-antonym-of-the-given-word-prudent--1437363025',
    },
    {
      word: 'Benign',
      pos: 'Adj.',
      meaning: 'Gentle, kindly, or harmless',
      primaryAnswer: 'Malignant, Hostile, Malevolent, Cruel',
      alsoPair: 'Synonyms: Benevolent, Kind, Mild',
      hook: 'BENE- = good/kind (benign); MAL- = bad/harmful (malignant).',
      pyqHref: '/question/select-the-most-appropriate-antonym-of-the-given-word-benign--23b21e2066',
    },
    {
      word: 'Candid',
      pos: 'Adj.',
      meaning: 'Truthful, open, and straightforward',
      primaryAnswer: 'Deceptive, Evasive, Insincere, Guarded',
      alsoPair: 'Synonyms: Frank, Forthright, Honest',
      hook: 'Candid speaks openly vs. deceptive/evasive.',
    },
    {
      word: 'Mitigate',
      pos: 'Verb',
      meaning: 'To make less severe, serious, or painful',
      primaryAnswer: 'Aggravate, Intensify, Worsen, Exacerbate',
      alsoPair: 'Synonyms: Alleviate, Lessen, Soften',
      hook: 'Mitigate = make mild; aggravate = make grave/worse.',
    },
    {
      word: 'Opaque',
      pos: 'Adj.',
      meaning: 'Not able to be seen through; unclear',
      primaryAnswer: 'Transparent, Clear, Lucid',
      alsoPair: 'Synonyms: Cloudy, Obscure, Murky',
      hook: 'Blocks light vs. transparent/clear.',
    },
    {
      word: 'Ephemeral',
      pos: 'Adj.',
      meaning: 'Lasting for a very short time',
      primaryAnswer: 'Permanent, Eternal, Enduring, Lasting',
      alsoPair: 'Synonyms: Fleeting, Temporary, Transient',
      hook: 'Short-lived vs. permanent/eternal.',
    },
    {
      word: 'Frugal',
      pos: 'Adj.',
      meaning: 'Sparing or economical with money and food',
      primaryAnswer: 'Extravagant, Lavish, Wasteful, Prodigal',
      alsoPair: 'Synonyms: Thrifty, Economical, Prudent',
      hook: 'Saves carefully vs. extravagant/wasteful.',
    },
    {
      word: 'Harmony',
      pos: 'Noun',
      meaning: 'Agreement, peace, or pleasing arrangement',
      primaryAnswer: 'Discord, Conflict, Strife, Cacophony',
      alsoPair: 'Synonyms: Accord, Unity, Concord',
      hook: 'Smooth agreement vs. discord/strife.',
    },
    {
      word: 'Rigid',
      pos: 'Adj.',
      meaning: 'Unable to bend or be forced out of shape; strict',
      primaryAnswer: 'Flexible, Pliable, Lenient, Supple',
      alsoPair: 'Synonyms: Stiff, Inflexible, Strict',
      hook: 'Stiff rule vs. flexible/lenient.',
    },
    {
      word: 'Benevolent',
      pos: 'Adj.',
      meaning: 'Well-meaning, charitable, and kind',
      primaryAnswer: 'Malevolent, Cruel, Stingy, Hostile',
      alsoPair: 'Synonyms: Kind, Generous, Altruistic',
      hook: 'BENE- (good) vs. MALE- (evil/ill-willed).',
    },
  ],
  synonyms: [
    {
      word: 'Prodigal',
      pos: 'Adj.',
      meaning: 'Spending money or resources freely and recklessly; wasteful',
      primaryAnswer: 'Extravagant, Spendthrift, Wasteful, Lavish',
      alsoPair: 'Antonyms: Frugal, Thrifty, Economical',
      hook: 'Don’t confuse with "prodigy" (genius)—prodigal means wasteful spender!',
      pyqHref: '/question/select-the-most-appropriate-synonym-of-the-given-word-prodigal--046f2056b4',
    },
    {
      word: 'Luminous',
      pos: 'Adj.',
      meaning: 'Full of or shedding light; bright or shining',
      primaryAnswer: 'Radiant, Bright, Glowing, Shining',
      alsoPair: 'Antonyms: Dim, Dark, Gloomy',
      hook: 'Root "lum-" = light (lumen, illuminate).',
      pyqHref: '/question/select-the-most-appropriate-synonym-of-the-given-word-luminous--0e8af9345c',
    },
    {
      word: 'Audacity',
      pos: 'Noun',
      meaning: 'Willingness to take bold risks; rude boldness',
      primaryAnswer: 'Boldness, Daring, Courage, Impudence',
      alsoPair: 'Antonyms: Timidity, Cowardice, Fear',
      hook: 'Audacious = bold and daring.',
      pyqHref: '/question/choose-the-correct-synonym-of-audacity--2a6b6f39b8',
    },
    {
      word: 'Chaste',
      pos: 'Adj.',
      meaning: 'Pure, modest, and free from excess',
      primaryAnswer: 'Pure, Virtuous, Modest, Clean',
      alsoPair: 'Antonyms: Impure, Corrupt',
      hook: 'Pure and simple in character.',
      pyqHref: '/question/select-the-most-appropriate-synonym-of-the-word-chaste--148b71efd9',
    },
    {
      word: 'Bibliophile',
      pos: 'Noun',
      meaning: 'A person who collects or loves books',
      primaryAnswer: 'Book-lover, Bookworm',
      alsoPair: 'Antonyms: Bibliophobe',
      hook: 'BIBLIO- (book) + -PHILE (lover).',
      pyqHref: '/question/select-the-most-appropriate-synonym-of-the-given-word-bibliophile--232b0a023b',
    },
    {
      word: 'Abundant',
      pos: 'Adj.',
      meaning: 'Existing or available in large quantities',
      primaryAnswer: 'Plentiful, Ample, Copious',
      alsoPair: 'Antonyms: Scarce, Meagre, Scanty',
      hook: 'More than enough = plentiful/ample.',
    },
    {
      word: 'Diligent',
      pos: 'Adj.',
      meaning: 'Showing care and steady effort in work or studies',
      primaryAnswer: 'Hardworking, Industrious, Assiduous',
      alsoPair: 'Antonyms: Lazy, Negligent, Idle',
      hook: 'Daily consistent effort = diligent/industrious.',
    },
    {
      word: 'Stubborn',
      pos: 'Adj.',
      meaning: 'Refusing to change one’s mind or course of action',
      primaryAnswer: 'Obstinate, Adamant, Rigid, Headstrong',
      alsoPair: 'Antonyms: Compliant, Flexible, Docile',
      hook: 'Refuses to budge = obstinate/adamant.',
    },
    {
      word: 'Lethargic',
      pos: 'Adj.',
      meaning: 'Sluggish, lazy, and lacking energy',
      primaryAnswer: 'Sluggish, Inactive, Torpid, Listless',
      alsoPair: 'Antonyms: Energetic, Active, Vigorous',
      hook: 'Lethargy = zero energy / sluggishness.',
    },
    {
      word: 'Venerable',
      pos: 'Adj.',
      meaning: 'Respected deeply because of age, wisdom, or character',
      primaryAnswer: 'Respected, Revered, Esteemed',
      alsoPair: 'Antonyms: Despised, Dishonoured',
      hook: 'Venerate = deeply respect.',
    },
    {
      word: 'Brief',
      pos: 'Adj.',
      meaning: 'Of short duration; using few words',
      primaryAnswer: 'Concise, Succinct, Short, Terse',
      alsoPair: 'Antonyms: Lengthy, Verbose, Prolix',
      hook: 'Short and to the point = concise/succinct.',
    },
    {
      word: 'Authentic',
      pos: 'Adj.',
      meaning: 'Of undisputed origin; genuine and real',
      primaryAnswer: 'Genuine, Real, Bona fide, Original',
      alsoPair: 'Antonyms: Fake, Counterfeit, Spurious',
      hook: 'Real/original vs. fake/spurious.',
    },
  ],
  idioms: [
    {
      idiom: 'Break the ice',
      meaning: 'To start conversation or ease awkward silence in a group',
      example: 'The teacher told a short story to break the ice on the first day.',
      pyqHref: '/question/pick-out-the-correct-meaning-of-the-idiom-break-the-ice--065af1dcd6',
    },
    {
      idiom: 'Move heaven and earth',
      meaning: 'To make every possible effort to achieve something',
      example: 'She moved heaven and earth to clear the JKSSB FAA exam.',
      pyqHref: '/question/choose-the-correct-meaning-of-idiom-move-heaven-and-earth--0976bc6871',
    },
    {
      idiom: 'Bite the bullet',
      meaning: 'To face a tough or unpleasant situation bravely',
      example: 'He decided to bite the bullet and finish the toughest syllabus topics first.',
    },
    {
      idiom: 'Burn the midnight oil',
      meaning: 'To study or work late into the night',
      example: 'JKSSB aspirants often burn the midnight oil solving previous year papers.',
    },
    {
      idiom: 'At sixes and sevens',
      meaning: 'In total confusion or disorder',
      example: 'Without a revision schedule, his notes were at sixes and sevens.',
    },
    {
      idiom: 'A blessing in disguise',
      meaning: 'Something that seems bad at first but turns out helpful later',
      example: 'Extra preparation time proved a blessing in disguise.',
    },
    {
      idiom: 'Once in a blue moon',
      meaning: 'Very rarely; almost never',
      example: 'Such an easy arithmetic question appears once in a blue moon.',
    },
    {
      idiom: 'Under the weather',
      meaning: 'Feeling slightly sick or unwell',
      example: 'He was under the weather, yet he attempted the full mock test.',
    },
  ],
  oneWords: [
    {
      phrase: 'A person who abstains completely from alcoholic drinks',
      substitute: 'Teetotaler',
      rootNote: 'Very common in JKSSB & State PSC General English.',
      pyqHref: '/question/choose-the-correct-one-word-substitute-for-a-person-who-abstains-from--15bf7b0323',
    },
    {
      phrase: 'A person who loves and collects books',
      substitute: 'Bibliophile',
      rootNote: 'Biblio- = book; -phile = lover.',
      pyqHref: '/question/select-the-most-appropriate-synonym-of-the-given-word-bibliophile--232b0a023b',
    },
    {
      phrase: 'Extremely old-fashioned or belonging to an earlier period',
      substitute: 'Antiquated / Archaic',
      rootNote: 'Root "antiq-" = old/ancient.',
      pyqHref: '/question/choose-the-correct-one-word-substitute-for-extremely-old-fashioned-belonging-to--1d7573d7e8',
    },
    {
      phrase: 'A remedy for all diseases or difficulties',
      substitute: 'Panacea',
      rootNote: 'Pan- = all; akos = cure.',
    },
    {
      phrase: 'A person who knows and can speak many languages',
      substitute: 'Polyglot',
      rootNote: 'Poly- = many; glot- = language.',
    },
    {
      phrase: 'Incapable of making mistakes or being wrong',
      substitute: 'Infallible',
      rootNote: 'In- = not; fall- = err/fail.',
    },
    {
      phrase: 'One who looks on the bright side of things',
      substitute: 'Optimist',
      rootNote: 'Opposite: Pessimist (dark side).',
    },
    {
      phrase: 'An official reprimand or strong expression of disapproval',
      substitute: 'Censure',
      rootNote: 'Formal/official rebuke.',
      pyqHref: '/question/choose-the-correct-one-word-substitute-for-an-official-reprimand-or-strong--0f3e3f5e66',
    },
  ],
  confusionPairs: [
    ['Flammable vs. Inflammable', 'Both mean "easily catches fire" (synonyms, NOT antonyms!). Antonym is non-flammable / incombustible.'],
    ['Prodigal vs. Prodigy', 'Prodigal = wasteful spender; Prodigy = exceptionally talented young person.'],
    ['Elicit vs. Illicit', 'Elicit (verb) = draw out information; Illicit (adj.) = illegal or forbidden.'],
    ['Compliment vs. Complement', 'Compliment = praise; Complement = completes or pairs well with something.'],
    ['Stationary vs. Stationery', 'Stationary = not moving; Stationery = paper, pens, and office supplies.'],
  ],
  directPyqs: [
    { href: '/question/give-the-antonyms-opposite-meaning-of-obvious--8c92d474ed', label: 'Antonym of Obvious', tag: 'JKSSB / PYQ' },
    { href: '/question/give-the-antonyms-opposite-meaning-of-spend--09fb2537e7', label: 'Antonym of Spend', tag: 'JKSSB / PYQ' },
    { href: '/question/select-the-most-appropriate-antonym-of-the-given-word-prudent--1437363025', label: 'Antonym of Prudent', tag: 'Antonym PYQ' },
    { href: '/question/select-the-most-appropriate-antonym-of-the-given-word-benign--23b21e2066', label: 'Antonym of Benign', tag: 'Antonym PYQ' },
    { href: '/question/select-the-most-appropriate-synonym-of-the-given-word-prodigal--046f2056b4', label: 'Synonym of Prodigal', tag: 'Synonym PYQ' },
    { href: '/question/select-the-most-appropriate-synonym-of-the-given-word-luminous--0e8af9345c', label: 'Synonym of Luminous', tag: 'Synonym PYQ' },
    { href: '/question/pick-out-the-correct-meaning-of-the-idiom-break-the-ice--065af1dcd6', label: 'Idiom: Break the ice', tag: 'Idiom PYQ' },
    { href: '/question/choose-the-correct-meaning-of-idiom-move-heaven-and-earth--0976bc6871', label: 'Idiom: Move heaven and earth', tag: 'Idiom PYQ' },
  ],
  faqs: [
    [
      'How many synonym and antonym questions are asked in JKSSB exams?',
      'JKSSB General English sections (FAA, Patwari, Junior Assistant, VLW, Supervisor, Constable) usually carry 10 to 20 marks total, of which 3 to 6 questions come directly from synonyms, antonyms, idioms, spellings, and one-word substitutions.',
    ],
    [
      'Does JKSSB repeat vocabulary from previous year question papers?',
      'Yes. JKSSB regularly repeats core English vocabulary and idioms from its own earlier shifts (Junior Assistant, Patwari, FAA, Stock Assistant) as well as standard SSC-level word lists.',
    ],
    [
      'What is the easiest way to avoid negative marking in JKSSB antonym questions?',
      'Always re-read whether the question asks for "opposite in meaning" (antonym) or "closest in meaning" (synonym) before clicking, and watch out for negative-prefix traps like inflammable vs. flammable.',
    ],
    [
      'Which JKSSB posts have the highest General English weightage?',
      'Junior Assistant, Patwari, Supervisor, Finance Accounts Assistant (FAA), Sub-Inspector (SI), and VLW/Panchayat Secretary exams all feature dedicated General English sections where vocabulary gives fast, high-accuracy marks.',
    ],
  ],
}

const SSC_CGL_BASE: Omit<VocabArticleConfig, 'jsonLd'> = {
  id: 'ssc-cgl',
  path: '/blog/ssc-cgl-most-repeated-synonyms-antonyms',
  title: 'SSC CGL Most Repeated Synonyms & Antonyms (Tier 1 & Tier 2 PYQ Vocabulary)',
  headline: 'SSC CGL most repeated synonyms, antonyms, idioms and one-word substitutions',
  description:
    'Complete SSC CGL Tier-1 and Tier-2 PYQ vocabulary list: most repeated synonyms, antonyms, idioms, and one-word substitutions asked by SSC with memory hooks, root words, and solved PYQs.',
  keywords:
    'SSC CGL most repeated synonyms, SSC CGL most repeated antonyms, SSC CGL Tier 1 Tier 2 vocabulary PYQ, SSC CGL repeated idioms and phrases, SSC CGL one word substitution PYQ, SSC CGL English vocabulary list',
  breadcrumbLabel: 'SSC CGL Synonyms & Antonyms',
  kicker: 'SSC CGL Tier-1 & Tier-2 · PYQ Vocabulary',
  badge: 'SSC CGL · CHSL · CPO · MTS · Blackbook-Style PYQs',
  deck:
    'High-frequency synonyms, antonyms, idioms, and one-word substitutions repeated across SSC CGL Tier-1 and Tier-2 shifts—mapped with root clues, memory hooks, and direct solved SSC PYQs.',
  quickAnswer:
    'In SSC CGL Tier-1 (25 Qs) and Tier-2 (45 Qs), vocabulary—synonyms, antonyms, idioms, one-word substitutions, and spellings—accounts for 35% to 45% of the English section. Nearly 60%+ of SSC CGL words repeat directly or via root families (such as Encomium, Puissant, Lachrymose, Fecund, Exiguous, Persiflage, and Soliloquy).',
  examHubHref: '/exam/ssc-cgl',
  examHubLabel: 'SSC CGL PYQ Hub',
  guideHref: '/guide/ssc-cgl',
  guideLabel: 'SSC CGL Guide',
  antonymsHeading: '1. SSC CGL Most-Repeated Antonyms (Tier-1 & Tier-2)',
  synonymsHeading: '2. SSC CGL Most-Repeated Synonyms (High-Frequency PYQs)',
  trapsHeading: '5. Five Common SSC CGL Vocabulary Traps',
  antonyms: [
    {
      word: 'Encomium',
      pos: 'Noun',
      meaning: 'A speech or piece of writing that praises someone highly',
      primaryAnswer: 'Censure, Condemnation, Obloquy, Criticism',
      alsoPair: 'Synonyms: Eulogy, Panegyric, Tribute',
      hook: 'EN-comium = ENthusiastic praise; opposite is censure/obloquy.',
      pyqHref: '/question/select-the-most-appropriate-antonym-of-the-given-word-encomium--11a562ed7b',
    },
    {
      word: 'Puissant',
      pos: 'Adj.',
      meaning: 'Having great power or influence; mighty',
      primaryAnswer: 'Weak, Feeble, Powerless, Impotent',
      alsoPair: 'Synonyms: Potent, Formidable, Mighty',
      hook: 'Classic SSC CGL word: sounds like powerful; opposite is feeble.',
      pyqHref: '/question/select-the-most-appropriate-antonym-of-the-given-word-puissant--1a8620f144',
    },
    {
      word: 'Lachrymose',
      pos: 'Adj.',
      meaning: 'Tearful or given to weeping; inducing tears',
      primaryAnswer: 'Cheerful, Jovial, Joyful, Buoyant',
      alsoPair: 'Synonyms: Tearful, Mournful, Dolorous',
      hook: 'Latin "lacrima" = tear; opposite is jovial/cheerful.',
      pyqHref: '/question/select-the-most-appropriate-antonym-of-the-given-word-lachrymose--27f22816ef',
    },
    {
      word: 'Prudent',
      pos: 'Adj.',
      meaning: 'Acting with care and wisdom for the future',
      primaryAnswer: 'Reckless, Imprudent, Rash, Indiscreet',
      alsoPair: 'Synonyms: Sagacious, Judicious, Circumspect',
      hook: 'Prudent plans ahead; reckless/indiscreet acts blindly.',
      pyqHref: '/question/select-the-most-appropriate-antonym-of-the-given-word-prudent--1437363025',
    },
    {
      word: 'Benign',
      pos: 'Adj.',
      meaning: 'Gentle, kindly, or harmless',
      primaryAnswer: 'Malignant, Hostile, Malevolent',
      alsoPair: 'Synonyms: Benevolent, Genial, Gracious',
      hook: 'BENE- = good (benign); MAL- = bad/harmful (malignant).',
      pyqHref: '/question/select-the-most-appropriate-antonym-of-the-given-word-benign--23b21e2066',
    },
    {
      word: 'Parsimonious',
      pos: 'Adj.',
      meaning: 'Extremely unwilling to spend money; stingy',
      primaryAnswer: 'Extravagant, Lavish, Munificent, Generous',
      alsoPair: 'Synonyms: Miserly, Stingy, Penurious',
      hook: 'Guards every rupee vs. munificent/lavish.',
    },
    {
      word: 'Taciturn',
      pos: 'Adj.',
      meaning: 'Reserved or uncommunicative in speech; saying little',
      primaryAnswer: 'Garrulous, Loquacious, Talkative, Voluble',
      alsoPair: 'Synonyms: Reticent, Laconic',
      hook: 'Tacit = silent; garrulous/loquacious = endlessly talkative.',
    },
    {
      word: 'Gregarious',
      pos: 'Adj.',
      meaning: 'Fond of company; sociable',
      primaryAnswer: 'Reclusive, Introverted, Aloof, Antisocial',
      alsoPair: 'Synonyms: Sociable, Affable, Convivial',
      hook: 'Root "greg-" = flock/herd; opposite is reclusive.',
    },
    {
      word: 'Cacophony',
      pos: 'Noun',
      meaning: 'A harsh, discordant mixture of sounds',
      primaryAnswer: 'Euphony, Harmony, Melody, Concord',
      alsoPair: 'Synonyms: Din, Discord, Clamour',
      hook: 'CACO- = bad (cacophony); EU- = good (euphony).',
    },
    {
      word: 'Ascetic',
      pos: 'Adj./N',
      meaning: 'Severe self-discipline and abstention from pleasure',
      primaryAnswer: 'Hedonistic, Indulgent, Sybaritic, Voluptuous',
      alsoPair: 'Synonyms: Austere, Spartan, Abstinent',
      hook: 'Monk-like simplicity vs. pleasure-seeking (hedonistic).',
    },
    {
      word: 'Ephemeral',
      pos: 'Adj.',
      meaning: 'Lasting for a very short time; transitory',
      primaryAnswer: 'Perpetual, Eternal, Permanent, Enduring',
      alsoPair: 'Synonyms: Fleeting, Evanescent, Transient',
      hook: 'Short-lived vs. perpetual/eternal.',
    },
    {
      word: 'Mitigate',
      pos: 'Verb',
      meaning: 'To make less severe, serious, or painful',
      primaryAnswer: 'Aggravate, Exacerbate, Intensify',
      alsoPair: 'Synonyms: Alleviate, Assuage, Mollify',
      hook: 'Mitigate = soften; exacerbate/aggravate = worsen.',
    },
  ],
  synonyms: [
    {
      word: 'Fecund',
      pos: 'Adj.',
      meaning: 'Producing or capable of producing abundant offspring or ideas',
      primaryAnswer: 'Fertile, Prolific, Fruitful, Productive',
      alsoPair: 'Antonyms: Barren, Sterile, Unproductive',
      hook: 'Think "FE-cund = FE-rtile" and prolific.',
      pyqHref: '/question/select-the-most-appropriate-synonym-of-the-given-word-fecund--078b39bdd7',
    },
    {
      word: 'Exiguous',
      pos: 'Adj.',
      meaning: 'Very small in size or amount; scanty',
      primaryAnswer: 'Meagre, Scanty, Sparse, Paltry',
      alsoPair: 'Antonyms: Copious, Abundant, Plentiful',
      hook: 'EX-iguous = left with barely anything (meagre/paltry).',
      pyqHref: '/question/select-the-most-appropriate-synonym-of-the-given-word-exiguous--123d6b56d4',
    },
    {
      word: 'Persiflage',
      pos: 'Noun',
      meaning: 'Light and slightly contemptuous mockery or banter',
      primaryAnswer: 'Banter, Raillery, Badinage, Teasing',
      alsoPair: 'Antonyms: Gravity, Solemnity, Seriousness',
      hook: 'Playful teasing/banter rather than heavy criticism.',
      pyqHref: '/question/select-the-most-appropriate-synonym-of-the-given-word-persiflage--10ae10bdec',
    },
    {
      word: 'Prodigal',
      pos: 'Adj.',
      meaning: 'Spending money or resources recklessly; wastefully extravagant',
      primaryAnswer: 'Extravagant, Spendthrift, Lavish, Profligate',
      alsoPair: 'Antonyms: Frugal, Thrifty, Parsimonious',
      hook: 'Prodigal = wasteful spender (not prodigy/genius).',
      pyqHref: '/question/select-the-most-appropriate-synonym-of-the-given-word-prodigal--046f2056b4',
    },
    {
      word: 'Soliloquy',
      pos: 'Noun',
      meaning: 'Speaking one’s thoughts aloud when by oneself',
      primaryAnswer: 'Monologue, Self-address, Aside',
      alsoPair: 'Antonyms: Dialogue, Conversation',
      hook: 'SOL- (alone) + LOQU- (speak) = speaking alone.',
      pyqHref: '/question/select-the-synonym-of-the-word-soliloquy--0ddfc4633c',
    },
    {
      word: 'Luminous',
      pos: 'Adj.',
      meaning: 'Full of or shedding light; bright',
      primaryAnswer: 'Radiant, Resplendent, Bright, Effulgent',
      alsoPair: 'Antonyms: Murky, Dim, Gloomy',
      hook: 'Root "lum-" = light.',
      pyqHref: '/question/select-the-most-appropriate-synonym-of-the-given-word-luminous--0e8af9345c',
    },
    {
      word: 'Audacity',
      pos: 'Noun',
      meaning: 'Boldness or disrespectful nerve',
      primaryAnswer: 'Temerity, Boldness, Impudence, Effrontery',
      alsoPair: 'Antonyms: Timidity, Meekness, Diffidence',
      hook: 'Audacious = bold/temerity.',
      pyqHref: '/question/choose-the-correct-synonym-of-audacity--2a6b6f39b8',
    },
    {
      word: 'Ubiquitous',
      pos: 'Adj.',
      meaning: 'Present, appearing, or found everywhere',
      primaryAnswer: 'Omnipresent, Universal, Pervasive',
      alsoPair: 'Antonyms: Rare, Scarce, Sporadic',
      hook: 'Found everywhere at once (omnipresent).',
    },
    {
      word: 'Clandestine',
      pos: 'Adj.',
      meaning: 'Kept secret or done secretively, especially because illicit',
      primaryAnswer: 'Covert, Furtive, Surreptitious, Secret',
      alsoPair: 'Antonyms: Overt, Open, Aboveboard',
      hook: 'Secret/covert operation = clandestine.',
    },
    {
      word: 'Sycophant',
      pos: 'Noun',
      meaning: 'A person who flatters powerful people for advantage',
      primaryAnswer: 'Flatterer, Toady, Obsequious, Fawner',
      alsoPair: 'Antonyms: Critic, Detractor',
      hook: 'Insincere flatterer = sycophant/toady.',
    },
    {
      word: 'Fastidious',
      pos: 'Adj.',
      meaning: 'Very attentive to detail and hard to please',
      primaryAnswer: 'Meticulous, Punctilious, Finicky, Fussy',
      alsoPair: 'Antonyms: Careless, Sloppy, Negligent',
      hook: 'Extremely picky/meticulous about details.',
    },
    {
      word: 'Alacrity',
      pos: 'Noun',
      meaning: 'Brisk and cheerful readiness',
      primaryAnswer: 'Eagerness, Readiness, Zeal, Promptness',
      alsoPair: 'Antonyms: Apathy, Reluctance, Lethargy',
      hook: 'Jumping into work with cheerful eagerness.',
    },
  ],
  idioms: [
    {
      idiom: 'Beard the lion in his den',
      meaning: 'To confront a powerful opponent or authority directly on their own territory',
      example: 'Confronting the corrupt official in his own office was bearding the lion in his den.',
      pyqHref: '/question/choose-the-correct-meaning-of-idiom-beard-the-lion-in-his-den--173c288fd6',
    },
    {
      idiom: 'Has two strings to his bow',
      meaning: 'Having more than one skill, plan, or alternative resource to rely on',
      example: 'Learning data analysis alongside coding gives her two strings to her bow.',
      pyqHref: '/question/choose-the-correct-meaning-of-idiom-has-two-strings-to-his--260c08459f',
    },
    {
      idiom: 'Move heaven and earth',
      meaning: 'To make a supreme effort; to try every possible means',
      example: 'He moved heaven and earth to secure a top rank in SSC CGL Tier-2.',
      pyqHref: '/question/choose-the-correct-meaning-of-idiom-move-heaven-and-earth--0976bc6871',
    },
    {
      idiom: 'Break the ice',
      meaning: 'To initiate conversation or ease tension in an awkward situation',
      example: 'A warm greeting helped break the ice at the start of the interview.',
      pyqHref: '/question/pick-out-the-correct-meaning-of-the-idiom-break-the-ice--065af1dcd6',
    },
    {
      idiom: 'Bite the bullet',
      meaning: 'To face a difficult or painful situation with courage',
      example: 'She bit the bullet and tackled her weakest quant chapter first.',
    },
    {
      idiom: 'Burn the midnight oil',
      meaning: 'To work or study late into the night',
      example: 'Candidates burn the midnight oil in the final month before Tier-1.',
    },
    {
      idiom: 'At sixes and sevens',
      meaning: 'In a state of total confusion or disorder',
      example: 'Without a mock-test review log, his strategy was at sixes and sevens.',
    },
    {
      idiom: 'Throw in the towel',
      meaning: 'To admit defeat and give up',
      example: 'Never throw in the towel after one tough shift.',
    },
  ],
  oneWords: [
    {
      phrase: 'An official reprimand or strong expression of disapproval',
      substitute: 'Censure',
      rootNote: 'Also tested as antonym of Encomium in SSC CGL.',
      pyqHref: '/question/choose-the-correct-one-word-substitute-for-an-official-reprimand-or-strong--0f3e3f5e66',
    },
    {
      phrase: 'A political system based on rule by a small group or wealthy elite',
      substitute: 'Oligarchy / Plutocracy',
      rootNote: 'Olig- = few; Plut- = wealth; -archy/-cracy = rule.',
      pyqHref: '/question/choose-the-correct-one-word-substitute-for-a-political-system-based-on--232650b629',
    },
    {
      phrase: 'Extremely old-fashioned or belonging to an earlier period',
      substitute: 'Antiquated / Archaic',
      rootNote: 'Root "antiq-" = old/ancient.',
      pyqHref: '/question/choose-the-correct-one-word-substitute-for-extremely-old-fashioned-belonging-to--1d7573d7e8',
    },
    {
      phrase: 'A person who abstains completely from alcoholic drinks',
      substitute: 'Teetotaler',
      rootNote: 'Compare Ascetic (abstains from all worldly indulgence).',
      pyqHref: '/question/choose-the-correct-one-word-substitute-for-a-person-who-abstains-from--15bf7b0323',
    },
    {
      phrase: 'Speaking one’s thoughts aloud while alone on stage',
      substitute: 'Soliloquy',
      rootNote: 'Soli- = alone; loqu- = speak.',
      pyqHref: '/question/select-the-synonym-of-the-word-soliloquy--0ddfc4633c',
    },
    {
      phrase: 'A person who collects or loves books',
      substitute: 'Bibliophile',
      rootNote: 'Biblio- = book; -phile = lover.',
      pyqHref: '/question/select-the-most-appropriate-synonym-of-the-given-word-bibliophile--232b0a023b',
    },
    {
      phrase: 'Killing of one’s own brother / father / king',
      substitute: 'Fratricide / Patricide / Regicide',
      rootNote: '-cide = killing; frater, pater, rex.',
    },
    {
      phrase: 'One who believes / does not believe / is unsure about God',
      substitute: 'Theist / Atheist / Agnostic',
      rootNote: 'The- = god; a- = without; gnosis = knowledge.',
    },
  ],
  confusionPairs: [
    ['Flammable vs. Inflammable', 'Both mean "easily catches fire" (synonyms!). Antonym is non-flammable / incombustible.'],
    ['Disinterested vs. Uninterested', 'Disinterested = impartial, unbiased; Uninterested = bored, lacking interest.'],
    ['Prodigal vs. Prodigy', 'Prodigal = wastefully extravagant; Prodigy = exceptionally gifted young person.'],
    ['Elicit vs. Illicit', 'Elicit (verb) = draw out a response; Illicit (adj.) = illegal or forbidden.'],
    ['Compliment vs. Complement', 'Compliment = praise; Complement = completes or enhances another thing.'],
  ],
  directPyqs: [
    { href: '/question/select-the-most-appropriate-antonym-of-the-given-word-encomium--11a562ed7b', label: 'Antonym of Encomium', tag: 'SSC CGL PYQ' },
    { href: '/question/select-the-most-appropriate-antonym-of-the-given-word-puissant--1a8620f144', label: 'Antonym of Puissant', tag: 'SSC CGL PYQ' },
    { href: '/question/select-the-most-appropriate-antonym-of-the-given-word-lachrymose--27f22816ef', label: 'Antonym of Lachrymose', tag: 'SSC CGL PYQ' },
    { href: '/question/select-the-most-appropriate-synonym-of-the-given-word-fecund--078b39bdd7', label: 'Synonym of Fecund', tag: 'SSC CGL PYQ' },
    { href: '/question/select-the-most-appropriate-synonym-of-the-given-word-exiguous--123d6b56d4', label: 'Synonym of Exiguous', tag: 'SSC CGL PYQ' },
    { href: '/question/select-the-most-appropriate-synonym-of-the-given-word-persiflage--10ae10bdec', label: 'Synonym of Persiflage', tag: 'SSC CGL PYQ' },
    { href: '/question/choose-the-correct-meaning-of-idiom-beard-the-lion-in-his-den--173c288fd6', label: 'Idiom: Beard the lion in his den', tag: 'SSC CGL PYQ' },
    { href: '/question/choose-the-correct-one-word-substitute-for-a-political-system-based-on--232650b629', label: 'One-word: Rule by a small elite', tag: 'SSC CGL PYQ' },
  ],
  faqs: [
    [
      'How many vocabulary questions appear in SSC CGL Tier-1 and Tier-2?',
      'In SSC CGL Tier-1, vocabulary (synonyms, antonyms, idioms, one-word substitutions, and spelling) accounts for 8 to 12 out of 25 questions. In Tier-2 English (45 questions), vocabulary and comprehension-linked word meanings carry 12 to 18 questions.',
    ],
    [
      'Does SSC CGL repeat previous year synonyms and antonyms?',
      'Yes. Roughly 60% to 70% of SSC CGL vocabulary questions repeat exact words from previous SSC CGL, CHSL, and CPO shifts or test close root-word relatives.',
    ],
    [
      'How should I prepare SSC CGL vocabulary alongside sectional timing?',
      'Revise 20 root-clustered words daily (with opposite pairs), solve PYQs under real exam timing, and track confusing pairs like disinterested vs. uninterested or inflammable vs. flammable.',
    ],
    [
      'Which vocabulary topics give the fastest score boost in SSC CGL?',
      'One-word substitutions and idioms & phrases offer the highest accuracy per second spent, followed by high-frequency antonym/synonym clusters.',
    ],
  ],
}

export const JKSSB_VOCAB_CONFIG: VocabArticleConfig = {
  ...JKSSB_BASE,
  jsonLd: buildSchema(JKSSB_BASE),
}

export const SSC_CGL_VOCAB_CONFIG: VocabArticleConfig = {
  ...SSC_CGL_BASE,
  jsonLd: buildSchema(SSC_CGL_BASE),
}

export const JKSSB_VOCAB_PATH = JKSSB_VOCAB_CONFIG.path
export const SSC_CGL_VOCAB_PATH = SSC_CGL_VOCAB_CONFIG.path
export const RETIRED_COMBINED_VOCAB_PATH = '/blog/jkssb-ssc-cgl-repeated-antonyms-synonyms-idioms'
