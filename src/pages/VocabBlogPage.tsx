import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'
import {
  VOCAB_BLOG_HEADLINE,
  VOCAB_BLOG_META,
  VOCAB_BLOG_MODIFIED,
  VOCAB_BLOG_PATH,
  VOCAB_BLOG_PUBLISHED,
  VOCAB_FAQS,
} from './vocabBlogArticleMeta'

type VocabTab = 'all' | 'antonyms' | 'synonyms' | 'idioms' | 'one-word'

type WordEntry = {
  word: string
  pos: string
  meaning: string
  primaryAnswer: string
  alsoPair: string
  hook: string
  pyqHref?: string
}

type IdiomEntry = {
  idiom: string
  meaning: string
  example: string
  pyqHref?: string
}

type OneWordEntry = {
  phrase: string
  substitute: string
  rootNote: string
  pyqHref?: string
}

const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00+05:30`).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata',
  })

const ANTONYMS: WordEntry[] = [
  {
    word: 'Encomium',
    pos: 'Noun',
    meaning: 'A speech or piece of writing that praises someone or something highly',
    primaryAnswer: 'Censure, Criticism, Condemnation, Obloquy',
    alsoPair: 'Synonyms: Eulogy, Panegyric, Tribute',
    hook: 'Think "EN-comium" = ENthusiastic praise; opposite is censure/condemnation.',
    pyqHref: '/question/select-the-most-appropriate-antonym-of-the-given-word-encomium--11a562ed7b',
  },
  {
    word: 'Prudent',
    pos: 'Adj.',
    meaning: 'Acting with or showing care and thought for the future; wise and sensible',
    primaryAnswer: 'Reckless, Imprudent, Rash, Indiscreet',
    alsoPair: 'Synonyms: Sagacious, Judicious, Shrewd',
    hook: 'Prudent plans ahead; reckless acts without thinking.',
    pyqHref: '/question/select-the-most-appropriate-antonym-of-the-given-word-prudent--1437363025',
  },
  {
    word: 'Benign',
    pos: 'Adj.',
    meaning: 'Gentle, kindly, or harmless (e.g., a benign tumour)',
    primaryAnswer: 'Malignant, Hostile, Malevolent, Harsh',
    alsoPair: 'Synonyms: Benevolent, Mild, Genial',
    hook: 'BENE- = good/kind (benign); MAL- = bad/harmful (malignant).',
    pyqHref: '/question/select-the-most-appropriate-antonym-of-the-given-word-benign--23b21e2066',
  },
  {
    word: 'Puissant',
    pos: 'Adj.',
    meaning: 'Having great power or influence; mighty',
    primaryAnswer: 'Weak, Feeble, Powerless, Impotent',
    alsoPair: 'Synonyms: Potent, Formidable, Mighty',
    hook: 'Sounds like "powerful"; opposite is feeble/powerless.',
    pyqHref: '/question/select-the-most-appropriate-antonym-of-the-given-word-puissant--1a8620f144',
  },
  {
    word: 'Lachrymose',
    pos: 'Adj.',
    meaning: 'Tearful or given to weeping; inducing tears',
    primaryAnswer: 'Cheerful, Jovial, Joyful, Buoyant',
    alsoPair: 'Synonyms: Tearful, Mournful, Weepy',
    hook: 'Latin "lacrima" = tear; opposite is cheerful/jovial.',
    pyqHref: '/question/select-the-most-appropriate-antonym-of-the-given-word-lachrymose--27f22816ef',
  },
  {
    word: 'Ephemeral',
    pos: 'Adj.',
    meaning: 'Lasting for a very short time; transitory',
    primaryAnswer: 'Permanent, Eternal, Perpetual, Enduring',
    alsoPair: 'Synonyms: Fleeting, Transient, Momentary',
    hook: 'Short-lived like a morning dew; opposite is eternal/permanent.',
  },
  {
    word: 'Obvious',
    pos: 'Adj.',
    meaning: 'Easily perceived or understood; clear and apparent',
    primaryAnswer: 'Obscure, Ambiguous, Hidden, Cryptic',
    alsoPair: 'Synonyms: Evident, Manifest, Palpable',
    hook: 'Plain in front of you vs. obscure/hidden in shadow.',
    pyqHref: '/question/give-the-antonyms-opposite-meaning-of-obvious--8c92d474ed',
  },
  {
    word: 'Parsimonious',
    pos: 'Adj.',
    meaning: 'Extremely unwilling to spend money or use resources; stingy',
    primaryAnswer: 'Generous, Extravagant, Lavish, Munificent',
    alsoPair: 'Synonyms: Miserly, Frugal, Stingy',
    hook: 'Guards every coin tightly; opposite is lavish/generous.',
  },
  {
    word: 'Gregarious',
    pos: 'Adj.',
    meaning: 'Fond of company; sociable and outgoing',
    primaryAnswer: 'Reclusive, Introverted, Antisocial, Aloof',
    alsoPair: 'Synonyms: Sociable, Affable, Convivial',
    hook: 'Root "greg-" = flock/herd; opposite prefers solitude (reclusive).',
  },
  {
    word: 'Mitigate',
    pos: 'Verb',
    meaning: 'To make less severe, serious, or painful',
    primaryAnswer: 'Aggravate, Intensify, Exacerbate, Worsen',
    alsoPair: 'Synonyms: Alleviate, Assuage, Lessen',
    hook: 'Mitigate = make mild; aggravate = make grave/worse.',
  },
  {
    word: 'Taciturn',
    pos: 'Adj.',
    meaning: 'Reserved or uncommunicative in speech; saying little',
    primaryAnswer: 'Garrulous, Loquacious, Talkative, Voluble',
    alsoPair: 'Synonyms: Reticent, Laconic, Quiet',
    hook: 'Tacit = silent; garrulous/loquacious = endlessly talkative.',
  },
  {
    word: 'Candid',
    pos: 'Adj.',
    meaning: 'Truthful and straightforward; frank',
    primaryAnswer: 'Deceptive, Evasive, Guarded, Insincere',
    alsoPair: 'Synonyms: Frank, Forthright, Blunt',
    hook: 'Unfiltered truth vs. evasive/deceptive.',
  },
  {
    word: 'Opaque',
    pos: 'Adj.',
    meaning: 'Not able to be seen through; hard to understand',
    primaryAnswer: 'Transparent, Lucid, Clear, Pellucid',
    alsoPair: 'Synonyms: Cloudy, Obscure, Murky',
    hook: 'Blocks light vs. lets light through (transparent/lucid).',
  },
  {
    word: 'Ascetic',
    pos: 'Adj./N',
    meaning: 'Characterized by severe self-discipline and abstention from indulgence',
    primaryAnswer: 'Hedonistic, Indulgent, Sybaritic, Voluptuous',
    alsoPair: 'Synonyms: Austere, Abstinent, Spartan',
    hook: 'Monk-like simplicity vs. pleasure-seeking (hedonistic).',
  },
  {
    word: 'Cacophony',
    pos: 'Noun',
    meaning: 'A harsh, discordant mixture of sounds',
    primaryAnswer: 'Harmony, Euphony, Melody, Concord',
    alsoPair: 'Synonyms: Din, Discord, Clamour',
    hook: 'CACO- = bad (cacophony); EU- = good (euphony).',
  },
]

const SYNONYMS: WordEntry[] = [
  {
    word: 'Prodigal',
    pos: 'Adj.',
    meaning: 'Spending money or resources freely and recklessly; wastefully extravagant',
    primaryAnswer: 'Extravagant, Spendthrift, Lavish, Wasteful',
    alsoPair: 'Antonyms: Frugal, Thrifty, Economical',
    hook: 'Often confused with "prodigy" (genius)—prodigal means wasteful spender!',
    pyqHref: '/question/select-the-most-appropriate-synonym-of-the-given-word-prodigal--046f2056b4',
  },
  {
    word: 'Fecund',
    pos: 'Adj.',
    meaning: 'Producing or capable of producing an abundance of offspring or new growth',
    primaryAnswer: 'Fertile, Fruitful, Prolific, Productive',
    alsoPair: 'Antonyms: Barren, Sterile, Infertile',
    hook: 'Think "FE-cund = FE-rtile" and productive.',
    pyqHref: '/question/select-the-most-appropriate-synonym-of-the-given-word-fecund--078b39bdd7',
  },
  {
    word: 'Exiguous',
    pos: 'Adj.',
    meaning: 'Very small in size or amount; scanty',
    primaryAnswer: 'Meagre, Scanty, Sparse, Paltry',
    alsoPair: 'Antonyms: Abundant, Plentiful, Copious',
    hook: 'EX-iguous = exited/left with barely anything (meagre).',
    pyqHref: '/question/select-the-most-appropriate-synonym-of-the-given-word-exiguous--123d6b56d4',
  },
  {
    word: 'Luminous',
    pos: 'Adj.',
    meaning: 'Full of or shedding light; bright or shining',
    primaryAnswer: 'Radiant, Bright, Resplendent, Glowing',
    alsoPair: 'Antonyms: Dim, Murky, Gloomy',
    hook: 'Root "lum-" = light (like lumen / illuminate).',
    pyqHref: '/question/select-the-most-appropriate-synonym-of-the-given-word-luminous--0e8af9345c',
  },
  {
    word: 'Persiflage',
    pos: 'Noun',
    meaning: 'Light and slightly contemptuous mockery or banter',
    primaryAnswer: 'Banter, Raillery, Badinage, Teasing',
    alsoPair: 'Antonyms: Gravity, Seriousness, Solemnity',
    hook: 'Playful teasing/banter rather than heavy criticism.',
    pyqHref: '/question/select-the-most-appropriate-synonym-of-the-given-word-persiflage--10ae10bdec',
  },
  {
    word: 'Chaste',
    pos: 'Adj.',
    meaning: 'Pure, modest, or free from excess and ornament',
    primaryAnswer: 'Pure, Virtuous, Modest, Unadulterated',
    alsoPair: 'Antonyms: Corrupt, Impure, Licentious',
    hook: 'Pure and simple in character or style.',
    pyqHref: '/question/select-the-most-appropriate-synonym-of-the-word-chaste--148b71efd9',
  },
  {
    word: 'Audacity',
    pos: 'Noun',
    meaning: 'Willingness to take bold risks, or rude/disrespectful boldness',
    primaryAnswer: 'Boldness, Temerity, Impudence, Daring',
    alsoPair: 'Antonyms: Timidity, Cowardice, Meekness',
    hook: 'Audacious = bold/daring (even to the point of nerve).',
    pyqHref: '/question/choose-the-correct-synonym-of-audacity--2a6b6f39b8',
  },
  {
    word: 'Soliloquy',
    pos: 'Noun',
    meaning: 'An act of speaking one’s thoughts aloud when by oneself (especially in a play)',
    primaryAnswer: 'Monologue, Self-address, Aside',
    alsoPair: 'Antonyms: Dialogue, Conversation',
    hook: 'SOL- (alone) + LOQU- (speak) = speaking alone.',
    pyqHref: '/question/select-the-synonym-of-the-word-soliloquy--0ddfc4633c',
  },
  {
    word: 'Bibliophile',
    pos: 'Noun',
    meaning: 'A person who collects or has a great love of books',
    primaryAnswer: 'Book-lover, Bookworm, Collector of books',
    alsoPair: 'Antonyms: Bibliophobe, Philistine',
    hook: 'BIBLIO- (book) + -PHILE (lover).',
    pyqHref: '/question/select-the-most-appropriate-synonym-of-the-given-word-bibliophile--232b0a023b',
  },
  {
    word: 'Ubiquitous',
    pos: 'Adj.',
    meaning: 'Present, appearing, or found everywhere',
    primaryAnswer: 'Omnipresent, Universal, Pervasive',
    alsoPair: 'Antonyms: Rare, Scarce, Localized',
    hook: 'Found everywhere at once (like smartphones today).',
  },
  {
    word: 'Clandestine',
    pos: 'Adj.',
    meaning: 'Kept secret or done secretively, especially because illicit',
    primaryAnswer: 'Secret, Covert, Furtive, Surreptitious',
    alsoPair: 'Antonyms: Open, Overt, Public',
    hook: 'Hidden underground operation = clandestine/covert.',
  },
  {
    word: 'Sycophant',
    pos: 'Noun',
    meaning: 'A person who acts obsequiously toward someone important in order to gain advantage',
    primaryAnswer: 'Flatterer, Toady, Bootlicker, Yes-man',
    alsoPair: 'Antonyms: Critic, Detractor',
    hook: 'Insincere flatterer chasing favours.',
  },
  {
    word: 'Fastidious',
    pos: 'Adj.',
    meaning: 'Very attentive to and concerned about accuracy and detail; hard to please',
    primaryAnswer: 'Meticulous, Fussy, Finicky, Punctilious',
    alsoPair: 'Antonyms: Careless, Sloppy, Negligent',
    hook: 'Not "fast" — means extremely picky/meticulous about details.',
  },
  {
    word: 'Alacrity',
    pos: 'Noun',
    meaning: 'Brisk and cheerful readiness',
    primaryAnswer: 'Eagerness, Readiness, Promptness, Zeal',
    alsoPair: 'Antonyms: Reluctance, Apathy, Lethargy',
    hook: 'Jumping into a task with cheerful eagerness.',
  },
  {
    word: 'Venerable',
    pos: 'Adj.',
    meaning: 'Accorded a great deal of respect, especially because of age, wisdom, or character',
    primaryAnswer: 'Respected, Revered, Esteemed, August',
    alsoPair: 'Antonyms: Despised, Disreputable',
    hook: 'Venerate = deeply respect/revere.',
  },
]

const IDIOMS: IdiomEntry[] = [
  {
    idiom: 'Break the ice',
    meaning: 'To initiate conversation or ease tension in an awkward/unfamiliar social situation',
    example: 'The instructor cracked a light joke to break the ice on the first day of class.',
    pyqHref: '/question/pick-out-the-correct-meaning-of-the-idiom-break-the-ice--065af1dcd6',
  },
  {
    idiom: 'Move heaven and earth',
    meaning: 'To make a supreme effort; to try every possible means to achieve something',
    example: 'She moved heaven and earth to clear the JKSSB exam on her first attempt.',
    pyqHref: '/question/choose-the-correct-meaning-of-idiom-move-heaven-and-earth--0976bc6871',
  },
  {
    idiom: 'Beard the lion in his den',
    meaning: 'To confront a powerful opponent or authority directly on their own territory',
    example: 'Walking straight into the director’s office to challenge the rule was bearding the lion in his den.',
    pyqHref: '/question/choose-the-correct-meaning-of-idiom-beard-the-lion-in-his-den--173c288fd6',
  },
  {
    idiom: 'Have two strings to one’s bow',
    meaning: 'To have more than one skill, plan, or alternative resource to fall back on',
    example: 'Preparing for both SSC CGL and State PSC gives you two strings to your bow.',
    pyqHref: '/question/choose-the-correct-meaning-of-idiom-has-two-strings-to-his--260c08459f',
  },
  {
    idiom: 'Bite the bullet',
    meaning: 'To face a difficult, unpleasant, or painful situation with courage and resolve',
    example: 'He decided to bite the bullet and revise his weakest subject first.',
  },
  {
    idiom: 'Burn the midnight oil',
    meaning: 'To work or study late into the night',
    example: 'Final-month aspirants often burn the midnight oil solving previous year papers.',
  },
  {
    idiom: 'At sixes and sevens',
    meaning: 'In a state of total confusion, disorder, or disarray',
    example: 'Without a revision timetable, his preparation was at sixes and sevens.',
  },
  {
    idiom: 'A blessing in disguise',
    meaning: 'Something that initially seems bad or unlucky but turns out to be beneficial',
    example: 'The exam postponement proved a blessing in disguise for completing the syllabus.',
  },
  {
    idiom: 'Cry over spilt milk',
    meaning: 'To complain or feel sorry about a past mistake that cannot be undone',
    example: 'Stop crying over spilt milk and focus on the upcoming Tier-2 shift.',
  },
  {
    idiom: 'Once in a blue moon',
    meaning: 'Very rarely; almost never',
    example: 'Such a straightforward arithmetic question appears only once in a blue moon.',
  },
  {
    idiom: 'Under the weather',
    meaning: 'Feeling slightly unwell, sick, or low in energy',
    example: 'She was feeling under the weather, yet she completed the mock test.',
  },
  {
    idiom: 'Throw in the towel',
    meaning: 'To admit defeat and give up',
    example: 'Even after two close misses, he refused to throw in the towel.',
  },
]

const ONE_WORDS: OneWordEntry[] = [
  {
    phrase: 'An official reprimand or strong expression of disapproval',
    substitute: 'Censure',
    rootNote: 'Formal/official rebuke (stronger than casual scolding).',
    pyqHref: '/question/choose-the-correct-one-word-substitute-for-an-official-reprimand-or-strong--0f3e3f5e66',
  },
  {
    phrase: 'A person who abstains completely from alcoholic drinks',
    substitute: 'Teetotaler',
    rootNote: 'Also compare Ascetic (abstains from all indulgence).',
    pyqHref: '/question/choose-the-correct-one-word-substitute-for-a-person-who-abstains-from--15bf7b0323',
  },
  {
    phrase: 'Extremely old-fashioned or belonging to an earlier period',
    substitute: 'Antiquated / Archaic',
    rootNote: 'Root "antiq-" = old/ancient.',
    pyqHref: '/question/choose-the-correct-one-word-substitute-for-extremely-old-fashioned-belonging-to--1d7573d7e8',
  },
  {
    phrase: 'A political system based on rule by a small group or wealthy elite',
    substitute: 'Oligarchy / Plutocracy',
    rootNote: 'Olig- = few; Plut- = wealth; -cracy/-archy = rule.',
    pyqHref: '/question/choose-the-correct-one-word-substitute-for-a-political-system-based-on--232650b629',
  },
  {
    phrase: 'A person who loves and collects books',
    substitute: 'Bibliophile',
    rootNote: 'Biblio- = book; -phile = lover.',
    pyqHref: '/question/select-the-most-appropriate-synonym-of-the-given-word-bibliophile--232b0a023b',
  },
  {
    phrase: 'Speaking one’s thoughts aloud while alone on stage',
    substitute: 'Soliloquy',
    rootNote: 'Soli- = alone; loqu- = speak.',
    pyqHref: '/question/select-the-synonym-of-the-word-soliloquy--0ddfc4633c',
  },
  {
    phrase: 'A person who knows and can speak many languages',
    substitute: 'Polyglot',
    rootNote: 'Poly- = many; glot- = tongue/language.',
  },
  {
    phrase: 'A remedy for all diseases or difficulties',
    substitute: 'Panacea',
    rootNote: 'Pan- = all; akos = cure.',
  },
  {
    phrase: 'One who looks on the bright side of things / dark side of things',
    substitute: 'Optimist / Pessimist',
    rootNote: 'Optim- = best; Pessim- = worst.',
  },
  {
    phrase: 'Incapable of making mistakes or being wrong',
    substitute: 'Infallible',
    rootNote: 'In- = not; fall- = fail/err.',
  },
  {
    phrase: 'Killing of one’s own brother / father / king',
    substitute: 'Fratricide / Patricide / Regicide',
    rootNote: '-cide = killing; frater (brother), pater (father), rex (king).',
  },
  {
    phrase: 'One who believes in the existence of God / does not believe / is unsure',
    substitute: 'Theist / Atheist / Agnostic',
    rootNote: 'The- = god; a- = without; gnosis = knowledge.',
  },
]

const CONFUSION_PAIRS: Array<[string, string]> = [
  ['Flammable vs. Inflammable', 'Both mean "easily set on fire" (synonyms, NOT antonyms!). The true antonym is non-flammable / incombustible.'],
  ['Prodigal vs. Prodigy', 'Prodigal = wastefully extravagant spender; Prodigy = an exceptionally talented young person.'],
  ['Elicit vs. Illicit', 'Elicit (verb) = draw out a response/information; Illicit (adj.) = illegal or forbidden.'],
  ['Compliment vs. Complement', 'Compliment = praise; Complement = something that completes or goes well with another.'],
  ['Disinterested vs. Uninterested', 'Disinterested = impartial, unbiased (no personal stake); Uninterested = bored, not interested.'],
]

const DIRECT_PYQ_PRACTICE: Array<{ href: string; label: string; tag: string }> = [
  { href: '/question/select-the-most-appropriate-antonym-of-the-given-word-encomium--11a562ed7b', label: 'Antonym of Encomium', tag: 'Antonym PYQ' },
  { href: '/question/select-the-most-appropriate-antonym-of-the-given-word-prudent--1437363025', label: 'Antonym of Prudent', tag: 'Antonym PYQ' },
  { href: '/question/select-the-most-appropriate-antonym-of-the-given-word-benign--23b21e2066', label: 'Antonym of Benign', tag: 'Antonym PYQ' },
  { href: '/question/select-the-most-appropriate-antonym-of-the-given-word-lachrymose--27f22816ef', label: 'Antonym of Lachrymose', tag: 'Antonym PYQ' },
  { href: '/question/select-the-most-appropriate-synonym-of-the-given-word-prodigal--046f2056b4', label: 'Synonym of Prodigal', tag: 'Synonym PYQ' },
  { href: '/question/select-the-most-appropriate-synonym-of-the-given-word-fecund--078b39bdd7', label: 'Synonym of Fecund', tag: 'Synonym PYQ' },
  { href: '/question/select-the-most-appropriate-synonym-of-the-given-word-exiguous--123d6b56d4', label: 'Synonym of Exiguous', tag: 'Synonym PYQ' },
  { href: '/question/pick-out-the-correct-meaning-of-the-idiom-break-the-ice--065af1dcd6', label: 'Idiom: Break the ice', tag: 'Idiom PYQ' },
  { href: '/question/choose-the-correct-meaning-of-idiom-move-heaven-and-earth--0976bc6871', label: 'Idiom: Move heaven and earth', tag: 'Idiom PYQ' },
  { href: '/question/choose-the-correct-one-word-substitute-for-an-official-reprimand-or-strong--0f3e3f5e66', label: 'One-word: An official reprimand', tag: 'One-Word PYQ' },
]

export function VocabBlogPage() {
  usePageMeta({
    title: VOCAB_BLOG_META.title,
    description: VOCAB_BLOG_META.description,
    canonicalPath: VOCAB_BLOG_PATH,
    ogType: 'article',
    jsonLd: VOCAB_BLOG_META.jsonLd,
  })

  const [activeTab, setActiveTab] = useState<VocabTab>('all')
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  const filteredAntonyms = useMemo(
    () =>
      ANTONYMS.filter(
        (w) =>
          !q ||
          w.word.toLowerCase().includes(q) ||
          w.meaning.toLowerCase().includes(q) ||
          w.primaryAnswer.toLowerCase().includes(q) ||
          w.alsoPair.toLowerCase().includes(q),
      ),
    [q],
  )

  const filteredSynonyms = useMemo(
    () =>
      SYNONYMS.filter(
        (w) =>
          !q ||
          w.word.toLowerCase().includes(q) ||
          w.meaning.toLowerCase().includes(q) ||
          w.primaryAnswer.toLowerCase().includes(q) ||
          w.alsoPair.toLowerCase().includes(q),
      ),
    [q],
  )

  const filteredIdioms = useMemo(
    () =>
      IDIOMS.filter(
        (i) =>
          !q ||
          i.idiom.toLowerCase().includes(q) ||
          i.meaning.toLowerCase().includes(q) ||
          i.example.toLowerCase().includes(q),
      ),
    [q],
  )

  const filteredOneWords = useMemo(
    () =>
      ONE_WORDS.filter(
        (o) =>
          !q ||
          o.phrase.toLowerCase().includes(q) ||
          o.substitute.toLowerCase().includes(q) ||
          o.rootNote.toLowerCase().includes(q),
      ),
    [q],
  )

  const showAntonyms = activeTab === 'all' || activeTab === 'antonyms'
  const showSynonyms = activeTab === 'all' || activeTab === 'synonyms'
  const showIdioms = activeTab === 'all' || activeTab === 'idioms'
  const showOneWords = activeTab === 'all' || activeTab === 'one-word'

  return (
    <section className="public-page river-article-page">
      <main className="public-shell river-article-shell">
        <nav className="rivers-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">›</span>
          <Link to="/blog">Blog</Link>
          <span aria-hidden="true">›</span>
          <span>JKSSB &amp; SSC CGL Vocabulary</span>
        </nav>

        <article className="river-guide-article">
          <header className="river-guide-header" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="public-kicker" style={{ margin: 0 }}>General English &amp; PYQ Vocabulary</span>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: 'var(--blue-bg)', color: 'var(--blue)', border: '1px solid var(--blue-border)' }}>
                Evergreen Guide · JKSSB &amp; SSC CGL · PYQ Linked
              </span>
            </div>

            <h1>{VOCAB_BLOG_HEADLINE}</h1>

            <p className="river-guide-deck" style={{ margin: '0 0 14px' }}>
              A permanent, exam-tested vocabulary bank built from real SSC CGL and JKSSB previous year questions—covering high-frequency antonyms, synonyms, idioms, one-word substitutions, root memory hooks, and common negative-marking traps.
            </p>

            <p className="river-guide-byline" style={{ margin: '0 0 18px' }}>
              By <Link to="/about" style={{ color: 'var(--brand)', textDecoration: 'none', fontWeight: 600 }}>Ministry of Papers Editorial Team</Link>{' '}
              <span aria-hidden="true">·</span> Published{' '}
              <time dateTime={VOCAB_BLOG_PUBLISHED}>{fmtDate(VOCAB_BLOG_PUBLISHED)}</time>{' '}
              <span aria-hidden="true">·</span> Updated{' '}
              <time dateTime={VOCAB_BLOG_MODIFIED}>{fmtDate(VOCAB_BLOG_MODIFIED)}</time>{' '}
              <span aria-hidden="true">·</span> 14 min read
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <div style={{ background: 'var(--card-bg)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>🔁</span>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)' }}>54+</div>
                  <div style={{ fontSize: '11px', color: 'var(--ink2)', fontWeight: 600 }}>High-Frequency Entries</div>
                </div>
              </div>

              <div style={{ background: 'var(--blue-bg)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--blue-border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>⚖️</span>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--blue)' }}>30</div>
                  <div style={{ fontSize: '11px', color: 'var(--blue)', fontWeight: 600 }}>Antonym &amp; Synonym Clusters</div>
                </div>
              </div>

              <div style={{ background: 'var(--green-bg)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--green-border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>💬</span>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--green)' }}>24</div>
                  <div style={{ fontSize: '11px', color: 'var(--green)', fontWeight: 600 }}>Idioms &amp; One-Word Sets</div>
                </div>
              </div>

              <div style={{ background: 'var(--hl-bg)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--hl-border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>🎯</span>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--hl-dark)' }}>100%</div>
                  <div style={{ fontSize: '11px', color: 'var(--hl-dark)', fontWeight: 600 }}>Direct PYQ Links</div>
                </div>
              </div>
            </div>
          </header>

          <section className="river-guide-answer" aria-labelledby="vocab-quick-answer">
            <h2 id="vocab-quick-answer">Quick revision strategy</h2>
            <p>
              Both <strong>SSC CGL</strong> and <strong>JKSSB</strong> recycle vocabulary from the same core word families—words like <em>encomium</em>, <em>prodigal</em>, <em>prudent</em>, <em>benign</em>, <em>fecund</em>, <em>exiguous</em>, and classic idioms like <em>break the ice</em> or <em>move heaven and earth</em>. Instead of memorising random alphabetical dictionaries, revise words in <strong>synonym–antonym pairs</strong> with root hooks and verify each one against real PYQs.
            </p>
          </section>

          <nav className="river-guide-toc" aria-label="Contents">
            <h2>In this guide</h2>
            <ol>
              <li><a href="#antonyms-section">Most-repeated antonyms (with opposite pairs &amp; hooks)</a></li>
              <li><a href="#synonyms-section">Most-repeated synonyms (with root clues)</a></li>
              <li><a href="#idioms-section">High-yield idioms &amp; phrases</a></li>
              <li><a href="#one-word-section">Important one-word substitutions</a></li>
              <li><a href="#confusion-pairs">5 common vocabulary traps in JKSSB &amp; SSC</a></li>
              <li><a href="#pyq-practice">Solve real vocabulary PYQs</a></li>
              <li><a href="#vocab-faqs">Frequently asked questions</a></li>
            </ol>
          </nav>

          {/* Interactive Filter & Search Controls */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px',
              borderRadius: '12px',
              background: 'var(--card-bg)',
              border: '1px solid var(--line)',
              marginBottom: '24px',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }} role="tablist" aria-label="Filter vocabulary sections">
              {(
                [
                  ['all', 'All (54)'],
                  ['antonyms', `Antonyms (${filteredAntonyms.length})`],
                  ['synonyms', `Synonyms (${filteredSynonyms.length})`],
                  ['idioms', `Idioms (${filteredIdioms.length})`],
                  ['one-word', `One-Word (${filteredOneWords.length})`],
                ] as Array<[VocabTab, string]>
              ).map(([tab, label]) => {
                const active = activeTab === tab
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '999px',
                      border: active ? '1px solid var(--brand)' : '1px solid var(--line)',
                      background: active ? 'var(--brand)' : 'transparent',
                      color: active ? '#fff' : 'var(--ink)',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search word, meaning, or idiom..."
              aria-label="Search vocabulary list"
              style={{
                minWidth: '220px',
                flex: '1 1 220px',
                maxWidth: '320px',
                padding: '7px 12px',
                borderRadius: '8px',
                border: '1px solid var(--line)',
                background: 'var(--bg)',
                color: 'var(--ink)',
                fontSize: '13px',
              }}
            />
          </div>

          {showAntonyms && (
            <section id="antonyms-section" style={{ marginBottom: '36px' }}>
              <h2>1. Most-Repeated Antonyms (JKSSB &amp; SSC CGL)</h2>
              <p>
                Every entry below includes the exact exam meaning, top antonym choices, matching synonyms, and a fast memory hook so one word prepares two questions.
              </p>
              <div className="river-table-wrap">
                <table className="river-table">
                  <thead>
                    <tr>
                      <th>Word</th>
                      <th>Meaning</th>
                      <th>Top Antonyms</th>
                      <th>Memory Hook &amp; Synonyms</th>
                      <th>PYQ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAntonyms.map((item) => (
                      <tr key={item.word}>
                        <td>
                          <strong>{item.word}</strong>
                          <div style={{ fontSize: '11px', color: 'var(--ink2)' }}>{item.pos}</div>
                        </td>
                        <td>{item.meaning}</td>
                        <td><strong>{item.primaryAnswer}</strong></td>
                        <td>
                          <div>{item.hook}</div>
                          <div style={{ fontSize: '12px', color: 'var(--ink2)', marginTop: '4px' }}>{item.alsoPair}</div>
                        </td>
                        <td>
                          {item.pyqHref ? (
                            <Link to={item.pyqHref} style={{ fontWeight: 600, color: 'var(--brand)', whiteSpace: 'nowrap' }}>
                              Solve PYQ →
                            </Link>
                          ) : (
                            <span style={{ color: 'var(--ink2)', fontSize: '12px' }}>Core PYQ</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {showSynonyms && (
            <section id="synonyms-section" style={{ marginBottom: '36px' }}>
              <h2>2. Most-Repeated Synonyms (JKSSB &amp; SSC CGL)</h2>
              <p>
                Focus on root clues (like <em>soli-</em>, <em>biblio-</em>, <em>loqu-</em>) and false friends like <em>prodigal</em> vs. <em>prodigy</em> or <em>fastidious</em> vs. <em>fast</em>.
              </p>
              <div className="river-table-wrap">
                <table className="river-table">
                  <thead>
                    <tr>
                      <th>Word</th>
                      <th>Meaning</th>
                      <th>Top Synonyms</th>
                      <th>Memory Hook &amp; Antonyms</th>
                      <th>PYQ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSynonyms.map((item) => (
                      <tr key={item.word}>
                        <td>
                          <strong>{item.word}</strong>
                          <div style={{ fontSize: '11px', color: 'var(--ink2)' }}>{item.pos}</div>
                        </td>
                        <td>{item.meaning}</td>
                        <td><strong>{item.primaryAnswer}</strong></td>
                        <td>
                          <div>{item.hook}</div>
                          <div style={{ fontSize: '12px', color: 'var(--ink2)', marginTop: '4px' }}>{item.alsoPair}</div>
                        </td>
                        <td>
                          {item.pyqHref ? (
                            <Link to={item.pyqHref} style={{ fontWeight: 600, color: 'var(--brand)', whiteSpace: 'nowrap' }}>
                              Solve PYQ →
                            </Link>
                          ) : (
                            <span style={{ color: 'var(--ink2)', fontSize: '12px' }}>Core PYQ</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {showIdioms && (
            <section id="idioms-section" style={{ marginBottom: '36px' }}>
              <h2>3. High-Yield Idioms &amp; Phrases</h2>
              <p>
                Exam setters almost always include one literal trap option in idiom questions. Learn the figurative meaning alongside a realistic sentence.
              </p>
              <div className="river-table-wrap">
                <table className="river-table">
                  <thead>
                    <tr>
                      <th>Idiom / Phrase</th>
                      <th>Exact Exam Meaning</th>
                      <th>Usage Example</th>
                      <th>PYQ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIdioms.map((item) => (
                      <tr key={item.idiom}>
                        <td><strong>{item.idiom}</strong></td>
                        <td>{item.meaning}</td>
                        <td>{item.example}</td>
                        <td>
                          {item.pyqHref ? (
                            <Link to={item.pyqHref} style={{ fontWeight: 600, color: 'var(--brand)', whiteSpace: 'nowrap' }}>
                              Solve PYQ →
                            </Link>
                          ) : (
                            <span style={{ color: 'var(--ink2)', fontSize: '12px' }}>Core PYQ</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {showOneWords && (
            <section id="one-word-section" style={{ marginBottom: '36px' }}>
              <h2>4. Important One-Word Substitutions</h2>
              <p>
                Latin and Greek roots (-cide, -cracy, -phile, -glot, -loquy) make one-word substitutions predictable even on unfamiliar options.
              </p>
              <div className="river-table-wrap">
                <table className="river-table">
                  <thead>
                    <tr>
                      <th>Definition / Phrase</th>
                      <th>One-Word Substitute</th>
                      <th>Root Clue</th>
                      <th>PYQ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOneWords.map((item) => (
                      <tr key={item.substitute}>
                        <td>{item.phrase}</td>
                        <td><strong>{item.substitute}</strong></td>
                        <td>{item.rootNote}</td>
                        <td>
                          {item.pyqHref ? (
                            <Link to={item.pyqHref} style={{ fontWeight: 600, color: 'var(--brand)', whiteSpace: 'nowrap' }}>
                              Solve PYQ →
                            </Link>
                          ) : (
                            <span style={{ color: 'var(--ink2)', fontSize: '12px' }}>Core PYQ</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <section id="confusion-pairs" style={{ marginBottom: '36px' }}>
            <h2>5. Five Common Vocabulary Traps in JKSSB &amp; SSC Exams</h2>
            <div className="river-guide-mistakes">
              {CONFUSION_PAIRS.map(([title, detail]) => (
                <div key={title} className="river-mistake-card">
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="pyq-practice" style={{ marginBottom: '36px' }}>
            <h2>6. Solve Real Vocabulary PYQs</h2>
            <p>
              Test these exact words in official exam format with full explanations, then browse our{' '}
              <Link to="/exam/ssc-cgl">SSC CGL</Link> and <Link to="/exam/jkssb">JKSSB</Link> previous year paper hubs.
            </p>
            <ul className="river-pyq-list">
              {DIRECT_PYQ_PRACTICE.map((qItem) => (
                <li key={qItem.href}>
                  <Link to={qItem.href}>{qItem.label}</Link>
                  <span className="river-pyq-exam">{qItem.tag}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="vocab-faqs" className="river-guide-faqs">
            <h2>7. Frequently Asked Questions</h2>
            <dl>
              {VOCAB_FAQS.map(([question, answer]) => (
                <div key={question} className="river-faq-item">
                  <dt>{question}</dt>
                  <dd>{answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>
      </main>
    </section>
  )
}
