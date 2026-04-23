import { Link } from 'react-router-dom'
import { examCatalog } from '../../data/catalog'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

export function Exams() {
  return (
    <Reveal as="section" className="exams-section" id="exams">
      <SectionHeader
        eyebrow="250+ Exams"
        title="Find your exam"
        subtitle="Central, state, banking, railway, teaching, medical — every competitive exam in India."
      />
      <div className="exam-grid">
        {examCatalog.map((exam) => (
          <Link className="exam-card" to={`/exam/${exam.slug}`} key={exam.name}>
            <div className="ec-icon">{exam.icon}</div>
            <h3 className="ec-name">{exam.shortName}</h3>
            <div className="ec-sub">{exam.totalQuestions} questions</div>
            <div className="ec-badge">{exam.category}</div>
          </Link>
        ))}
      </div>
    </Reveal>
  )
}
