const ARTICLE_PATH = '/blog/indian-rivers-and-tributaries'
const ARTICLE_TITLE = 'Indian Rivers and Their Tributaries'
const ARTICLE_HEADLINE = 'Indian rivers and their tributaries'
const ARTICLE_DESCRIPTION =
  'A detailed guide to 13 major Indian rivers, their sources, routes, tributaries and drainage basins, with clear explanations of Himalayan and Peninsular systems.'
const SITE_ORIGIN = 'https://ministryofpapers.com'
const ARTICLE_URL = `${SITE_ORIGIN}${ARTICLE_PATH}`

const ARTICLE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${ARTICLE_URL}#article`,
      headline: ARTICLE_HEADLINE,
      description: ARTICLE_DESCRIPTION,
      url: ARTICLE_URL,
      inLanguage: 'en-IN',
      articleSection: 'Indian geography',
      author: { '@type': 'Organization', name: 'Ministry of Papers', url: SITE_ORIGIN },
      publisher: { '@type': 'Organization', name: 'Ministry of Papers', url: SITE_ORIGIN },
      mainEntityOfPage: { '@type': 'WebPage', '@id': ARTICLE_URL },
      isPartOf: { '@type': 'WebSite', name: 'Ministry of Papers', url: SITE_ORIGIN },
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
  title: `${ARTICLE_TITLE} | Ministry of Papers`,
  headline: ARTICLE_HEADLINE,
  description: ARTICLE_DESCRIPTION,
  jsonLd: ARTICLE_SCHEMA,
}
