// Lightweight exam-hub → guide cross-link lookup. Kept as a plain string set
// (NOT derived from the heavy postGuides data) so the eager ExamPage bundle
// stays small. Keep in sync with the keys of src/data/postGuides.ts.

const GUIDE_SLUGS = new Set<string>([
  'jkpsi', 'jkpsi-telecom', 'upsc-cse', 'ssc-cgl', 'bpsc-cce', 'ibps-po', 'jkcce', 'rssb-patwari', 'neet-ug',
  'jkssb-patwari', 'jkssb-junior-assistant', 'jkssb-faa', 'jkssb-wildlife-guard', 'jkssb-veterinary-pharmacist',
  'jkssb-constable', 'jkssb-constable-telecom',
])

/** /guide/:slug for an exam hub, or null when no guide exists. */
export function guidePathForExam(examSlug: string): string | null {
  return GUIDE_SLUGS.has(examSlug) ? `/guide/${examSlug}` : null
}
