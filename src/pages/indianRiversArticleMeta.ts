const ARTICLE_PATH = '/blog/indian-rivers-and-tributaries'
const ARTICLE_TITLE = 'Indian Rivers & Tributaries: List, Table & Exam Facts'
const ARTICLE_HEADLINE = 'Indian rivers and their tributaries'
const ARTICLE_DESCRIPTION =
  'Himalayan vs Peninsular rivers of India: source, route, left- and right-bank tributaries, length and drainage of 13 major rivers, with comparison tables and PYQ practice.'
const SITE_ORIGIN = 'https://ministryofpapers.com'
const ARTICLE_URL = `${SITE_ORIGIN}${ARTICLE_PATH}`

/** ISO dates shown on the page AND declared in JSON-LD, so they always agree. */
export const INDIAN_RIVERS_PUBLISHED = '2026-11-03'
export const INDIAN_RIVERS_MODIFIED = '2026-11-12'

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
      headline: ARTICLE_TITLE.replace(/ & /g, ' and '),
      description: ARTICLE_DESCRIPTION,
      url: ARTICLE_URL,
      inLanguage: 'en-IN',
      articleSection: 'Indian geography',
      keywords:
        'Indian rivers, tributaries of Ganga, Himalayan rivers, Peninsular rivers, left bank right bank tributaries, rivers of India for UPSC SSC JKSSB',
      datePublished: `${INDIAN_RIVERS_PUBLISHED}T00:00:00+05:30`,
      dateModified: `${INDIAN_RIVERS_MODIFIED}T00:00:00+05:30`,
      author: { '@type': 'Organization', name: 'Ministry of Papers Editorial Team', url: `${SITE_ORIGIN}/about` },
      publisher: PUBLISHER,
      mainEntityOfPage: { '@type': 'WebPage', '@id': ARTICLE_URL },
      isPartOf: { '@type': 'WebSite', name: 'Ministry of Papers', url: SITE_ORIGIN },
      isAccessibleForFree: true,
      citation: [
        'https://ncert.nic.in/textbook/pdf/kegy203.pdf',
        'https://indiawris.gov.in/wris/',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_ORIGIN },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_ORIGIN}/blog` },
        { '@type': 'ListItem', position: 3, name: ARTICLE_HEADLINE, item: ARTICLE_URL },
      ],
    },
  ],
}

export const INDIAN_RIVERS_ARTICLE_PATH = ARTICLE_PATH
export const INDIAN_RIVERS_ARTICLE_HEADLINE = ARTICLE_HEADLINE

export const INDIAN_RIVERS_ARTICLE_META = {
  // No brand suffix: Search appends the site name itself and the 21 chars are
  // better spent on keywords (same rule as question pages).
  title: ARTICLE_TITLE,
  headline: ARTICLE_HEADLINE,
  description: ARTICLE_DESCRIPTION,
  jsonLd: ARTICLE_SCHEMA,
}
