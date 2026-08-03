// Lightweight exam-hub → guide / blog cross-link lookups. Kept as plain string
// maps (NOT derived from the heavy postGuides / blogPosts data) so the eager
// ExamPage bundle stays small. Keep in sync with the keys of
// src/data/postGuides.ts and src/data/blogPosts.ts.

const GUIDE_SLUGS = new Set<string>([
  'jkpsi', 'jkpsi-telecom', 'upsc-cse', 'ssc-cgl', 'bpsc-cce', 'ibps-po', 'jkcce', 'rssb-patwari', 'neet-ug',
  'jkssb-patwari', 'jkssb-junior-assistant', 'jkssb-faa', 'jkssb-wildlife-guard', 'jkssb-veterinary-pharmacist',
  'jkssb-constable', 'jkssb-constable-telecom',
])

// exam-hub slug → blog slug (the broad-info article for that exam)
const EXAM_BLOG: Record<string, string> = {
  'ibps-po': 'ibps-po-exam',
  'ssc-cgl': 'ssc-cgl-exam',
  'upsc-cse': 'upsc-cse-exam',
  'neet-ug': 'neet-ug-exam',
  'bpsc-cce': 'bpsc-exam',
  'jkcce': 'jkpsc-jkcce-exam',
  'rssb-patwari': 'rssb-patwari-exam',
  'jkpsi': 'jkssb-sub-inspector-exam',
  // jkssb-patwari and jkssb-junior-assistant deliberately absent: those blogs
  // were retired and now 301, so linking them would point users and crawlers
  // at a redirect.
}

/** /guide/:slug for an exam hub, or null when no guide exists. */
export function guidePathForExam(examSlug: string): string | null {
  return GUIDE_SLUGS.has(examSlug) ? `/guide/${examSlug}` : null
}

/** /blog/:slug for an exam hub, or null when no blog exists. */
export function blogPathForExam(examSlug: string): string | null {
  const b = EXAM_BLOG[examSlug]
  return b ? `/blog/${b}` : null
}
