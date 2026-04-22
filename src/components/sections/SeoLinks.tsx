import { FadeIn } from '../ui/FadeIn'
import { SectionHeader } from '../ui/SectionHeader'
import { SEO_LINKS } from '../../data'

export function SeoLinks() {
  return (
    <section className="px-[5%] py-[72px]">
      <FadeIn>
        <SectionHeader
          eyebrow="Browse papers"
          title="Trending right now"
          sub="Every link below is a fully solved, Google-indexed page. This is what keeps us ranked #1."
        />
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mt-9">
        {SEO_LINKS.map(({ text, count }, i) => (
          <FadeIn key={text} delay={i * 0.03}>
            <div className="flex items-center justify-between bg-white border-[1.5px] border-line rounded-[10px] px-4 py-3 cursor-pointer hover:border-ink-2 hover:translate-x-1 transition-all duration-150 group">
              <span className="text-sm text-blue-700 font-medium underline underline-offset-2 group-hover:text-ink transition-colors">
                📄 {text}
              </span>
              <span className="text-xs text-ink-4 bg-line-2 px-2.5 py-[2px] rounded-full ml-3 shrink-0 font-medium">
                {count}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
