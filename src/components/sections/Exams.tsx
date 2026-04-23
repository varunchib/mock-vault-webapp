import { exams } from '../../data/landing'
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
        {exams.map((exam) => (
          <button
            className="exam-card"
            type="button"
            key={exam.name}
            onClick={() => window.alert(`${exam.name} papers loading...`)}
          >
            <div className="ec-icon">{exam.icon}</div>
            <h3 className="ec-name">{exam.name}</h3>
            <div className="ec-sub">{exam.questions}</div>
            <div className="ec-badge">{exam.badge}</div>
          </button>
        ))}
      </div>
    </Reveal>
  )
}
