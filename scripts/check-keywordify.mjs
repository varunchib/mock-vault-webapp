// Parity guard for question URLs.
//
// keywordify() exists twice: here in TypeScript (builds the canonical <link>)
// and in Go (builds the sitemap URL). If the two ever disagree, the sitemap
// advertises a URL the page disowns, which Search Console reports as "Page with
// redirect". These fixtures are duplicated verbatim in
// mock-vault-webservice/internal/httpapi/score_test.go (TestKeywordify), so a
// change to either implementation fails on its own side.
//
// Run: node --experimental-strip-types scripts/check-keywordify.mjs

import { keywordify, questionPath } from '../src/lib/questionUrl.ts'

// input -> expected slug
const CASES = [
  // English is untouched by the Devanagari change.
  ['He deals ______ stationery.', 'he-deals-stationery'],
  ['REGRET:', 'regret'],
  ['Choose the correct synonym of ‘audacity’:', 'choose-the-correct-synonym-of-audacity'],
  // Hindi now yields real keywords instead of an empty slug.
  ['‘कठोर’ के लिए समानार्थक शब्द है:', 'कठोर-के-लिए-समानार्थक-शब्द-है'],
  ['कम्प्यूटर का दिमाग किसे कहते हैं?', 'कम्प्यूटर-का-दिमाग-किसे-कहते-हैं'],
  ['हिमाचल प्रदेश उच्च न्यायालय की स्थापना कब हुई?', 'हिमाचल-प्रदेश-उच्च-न्यायालय-की-स्थापना-कब-हुई'],
  // Mixed script. The 12-word cap lands on ब्याज, so "compound interest" is cut.
  ['1000 रूपये पर 10% वार्षिक दर से 2 साल का चक्रवृद्धि ब्याज (Compound Interest) है:',
    '1000-रूपये-पर-10-वार्षिक-दर-से-2-साल-का-चक्रवृद्धि-ब्याज'],
  // Structural rules.
  ['a & b', 'a-and-b'],
  ['$x^2 + y$ only', 'only'],
  ['', ''],
  ['२०१९ में', '२०१९-में'],
]

let failed = 0
for (const [input, want] of CASES) {
  const got = keywordify(input)
  if (got !== want) {
    failed++
    console.error(`FAIL  input=${JSON.stringify(input)}\n      want=${JSON.stringify(want)}\n      got =${JSON.stringify(got)}`)
  }
}

// The word cap must count words, and the length cap must count code points.
const long = 'क '.repeat(40).trim()
if (keywordify(long).split('-').length > 12) {
  failed++
  console.error('FAIL  word cap exceeded 12')
}
if (Array.from(keywordify('क'.repeat(200))).length > 80) {
  failed++
  console.error('FAIL  length cap exceeded 80 code points')
}
if (questionPath('abc123', '') !== '/question/abc123') {
  failed++
  console.error('FAIL  empty keywords must fall back to the bare id path')
}

// Regression: the Worker compares the request's URL.pathname against
// questionPath(). URL.pathname is percent-encoded, so a Devanagari canonical is
// never string-equal to the incoming path unless the Worker decodes first. When
// it did not, every Hindi question page 301-redirected to itself forever.
// This asserts the round-trip the Worker now relies on.
for (const [input] of CASES) {
  const canonical = questionPath('5fc551ed62', input)
  const asPathname = new URL(`https://x.test${canonical}`).pathname // percent-encodes
  if (decodeURIComponent(asPathname) !== canonical) {
    failed++
    console.error(`FAIL  encode/decode round-trip broken for ${JSON.stringify(canonical)}\n      pathname=${asPathname}\n      decoded =${decodeURIComponent(asPathname)}`)
  }
}

if (failed) {
  console.error(`\n${failed} keywordify parity check(s) failed`)
  process.exit(1)
}
console.log(`keywordify parity: ${CASES.length} cases + 3 invariants OK`)
