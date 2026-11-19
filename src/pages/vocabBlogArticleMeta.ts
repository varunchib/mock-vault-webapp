const ARTICLE_PATH = '/blog/jkssb-ssc-cgl-repeated-antonyms-synonyms-idioms'
const ARTICLE_TITLE = 'Most-Repeated Antonyms, Synonyms, Idioms & One-Word Substitutions (JKSSB & SSC CGL)'
const ARTICLE_HEADLINE = 'Most-repeated antonyms, synonyms, idioms and one-word substitutions for JKSSB & SSC CGL'
const ARTICLE_DESCRIPTION =
  'Evergreen PYQ vocabulary guide for JKSSB and SSC CGL aspirants: most-repeated antonyms, synonyms, idioms, one-word substitutions, memory hooks, common traps, and direct solved PYQs.'
const SITE_ORIGIN = 'https://ministryofpapers.com'
const ARTICLE_URL = `${SITE_ORIGIN}${ARTICLE_PATH}`

export const VOCAB_BLOG_PUBLISHED = '2026-11-19'
export const VOCAB_BLOG_MODIFIED = '2026-11-19'

export const VOCAB_FAQS: Array<[string, string]> = [
  [
    'How many antonyms, synonyms and idioms are asked in SSC CGL and JKSSB exams?',
    'In SSC CGL Tier-1 and Tier-2, vocabulary (synonyms, antonyms, idioms & phrases, one-word substitutions, and spelling) typically accounts for 8 to 12 questions out of 25 in Tier-1 and 12 to 18 questions in Tier-2. In JKSSB General English sections (FAA, Patwari, Junior Assistant, Constable, Supervisor), vocabulary and idioms usually contribute 4 to 7 direct marks.',
  ],
  [
    'Do SSC CGL and JKSSB repeat vocabulary from previous year question papers?',
    'Yes. Roughly 55% to 70% of vocabulary questions in SSC CGL, SSC CHSL, and JKSSB exams either repeat exact previous-year words or test close root-word relatives from the same word families (such as benign/benevolent, prodigal/extravagant, prudent/sagacious, and exiguous/meagre).',
  ],
  [
    'What is the fastest way to remember antonyms and synonyms without forgetting them?',
    'Learn words in root clusters and opposite pairs instead of isolated alphabetical lists. Group words by tone (positive, negative, neutral), attach a 1-line visual memory hook, and immediately solve 10–15 real PYQs so you see how distractors are framed.',
  ],
  [
    'What is the biggest trap in SSC and JKSSB antonym questions?',
    'The most common mistake is picking a synonym instead of an antonym under time pressure, or falling for a word with a negative prefix (like in-, un-, dis-) that actually means the same thing (for example, flammable and inflammable are synonyms, not antonyms).',
  ],
  [
    'Which idioms are most frequently repeated in JKSSB and SSC exams?',
    'Classic figurative idioms such as "break the ice", "move heaven and earth", "beard the lion in his den", "have two strings to one’s bow", "bite the bullet", "burn the midnight oil", and "at sixes and sevens" appear repeatedly across SSC and State-level General English papers.',
  ],
  [
    'How should I use this evergreen vocabulary guide with mock tests?',
    'Use the category filter to revise 15–20 high-frequency words a day, click the linked PYQ questions to verify your accuracy on official exam options, and bookmark this page before every SSC CGL, CHSL, MTS, RRB, or JKSSB exam.',
  ],
]

const PUBLISHER = {
  '@type': 'Organization',
  name: 'Ministry of Papers',
  url: SITE_ORIGIN,
  logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/favicon.svg` },
}

const ARTICLE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${ARTICLE_URL}#article`,
      headline: ARTICLE_TITLE,
      description: ARTICLE_DESCRIPTION,
      url: ARTICLE_URL,
      inLanguage: 'en-IN',
      articleSection: 'English Vocabulary',
      keywords:
        'JKSSB repeated antonyms synonyms, SSC CGL repeated vocabulary, most repeated idioms and phrases SSC CGL, one word substitutions JKSSB SSC, previous year English vocabulary PYQs',
      datePublished: `${VOCAB_BLOG_PUBLISHED}T00:00:00+05:30`,
      dateModified: `${VOCAB_BLOG_MODIFIED}T00:00:00+05:30`,
      author: { '@type': 'Organization', name: 'Ministry of Papers Editorial Team', url: `${SITE_ORIGIN}/about` },
      publisher: PUBLISHER,
      mainEntityOfPage: { '@type': 'WebPage', '@id': ARTICLE_URL },
      isPartOf: { '@type': 'WebSite', name: 'Ministry of Papers', url: SITE_ORIGIN },
      isAccessibleForFree: true,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_ORIGIN },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_ORIGIN}/blog` },
        { '@type': 'ListItem', position: 3, name: 'JKSSB & SSC CGL Vocabulary', item: ARTICLE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: VOCAB_FAQS.map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ],
}

export const VOCAB_BLOG_PATH = ARTICLE_PATH
export const VOCAB_BLOG_HEADLINE = ARTICLE_HEADLINE

export const VOCAB_BLOG_META = {
  title: ARTICLE_TITLE,
  headline: ARTICLE_HEADLINE,
  description: ARTICLE_DESCRIPTION,
  jsonLd: ARTICLE_SCHEMA,
}
