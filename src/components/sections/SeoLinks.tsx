import { Link } from 'react-router-dom'
import { questionCatalog } from '../../data/catalog'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

export function SeoLinks() {
  return (
    <Reveal as="section" className="seo-section">
      <SectionHeader
        eyebrow="Browse papers"
        title="Trending right now"
        subtitle="Every link below is a fully solved, Google-indexed page. This is what gets us to rank #1."
      />
      <div className="seo-grid">
        {questionCatalog.map((question) => (
          <Link className="seo-card" to={`/question/${question.slug}`} key={question.slug}>
            <span className="seo-text">📄 {question.examName} {question.year} {question.subject} Q{question.questionNo}</span>
            <span className="seo-count">Solved</span>
          </Link>
        ))}
      </div>
    </Reveal>
  )
}
