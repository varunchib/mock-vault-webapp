import { FadeIn } from '../ui/FadeIn'

export function CTA() {
  return (
    <section className="bg-ink relative overflow-hidden px-[5%] py-[100px] text-center">
      {/* Glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-hl/10 rounded-full blur-3xl" />

      <FadeIn>
        <h2 className="relative font-display text-[clamp(30px,5vw,56px)] font-bold text-white leading-[1.1] mb-4">
          Start preparing.{' '}
          <span className="highlight-inv">No signup needed.</span>
        </h2>
        <p className="relative text-[17px] text-zinc-400 font-light mb-10">
          12 lakh questions. 240 exams. Free, forever.
        </p>
        <div className="relative flex flex-wrap gap-3 justify-center">
          <button className="bg-hl text-ink font-bold text-base px-9 py-[15px] rounded-[10px] hover:bg-yellow-300 hover:-translate-y-0.5 transition-all duration-150 font-body">
            🚀 Search Your Exam — It's Free
          </button>
          <button className="bg-transparent text-zinc-400 border-[1.5px] border-zinc-600 text-base px-8 py-[15px] rounded-[10px] hover:text-white hover:border-zinc-400 transition-all duration-150 font-body">
            Browse all 240+ exams →
          </button>
        </div>
      </FadeIn>
    </section>
  )
}
