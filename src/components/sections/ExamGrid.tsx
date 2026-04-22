import { FadeIn } from '../ui/FadeIn'
import { SectionHeader } from '../ui/SectionHeader'
import { EXAMS } from '../../data'

function ExamCard({ icon, name, count, tag }) {
  return (
    <div className="relative overflow-hidden bg-white border-[1.5px] border-line rounded-2xl p-5 cursor-pointer card-accent hover:border-ink-2 hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="text-2xl mb-2.5">{icon}</div>
      <div className="font-display text-sm font-bold text-ink mb-[3px]">{name}</div>
      <div className="text-xs text-ink-4 font-light">{count}</div>
      <span className="inline-block mt-2.5 text-[11px] font-semibold bg-line-2 text-ink-3 px-2 py-[2px] rounded-full">
        {tag}
      </span>
    </div>
  )
}

export function ExamGrid() {
  return (
    <section className="px-[5%] py-[88px]" id="exams">
      <FadeIn>
        <SectionHeader
          eyebrow="250+ Exams"
          title="Find your exam"
          sub="Central, state, banking, railway, teaching, medical — every competitive exam in India."
        />
      </FadeIn>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-11">
        {EXAMS.map((exam, i) => (
          <FadeIn key={exam.slug} delay={i * 0.04}>
            <ExamCard {...exam} />
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
