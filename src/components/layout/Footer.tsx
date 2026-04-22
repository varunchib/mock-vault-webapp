const FOOTER_COLS = [
  {
    title: 'Exams',
    links: ['UPSC CSE', 'SSC CGL / CHSL', 'IBPS PO / Clerk', 'NEET UG', 'JEE Main', 'State PSCs'],
  },
  {
    title: 'Platform',
    links: ['Mock Tests', 'PYQ Search', 'Answer Keys', 'Study Planner', 'Leaderboard'],
  },
  {
    title: 'Company',
    links: ['About', 'Blog', 'For Institutes', 'Privacy Policy', 'Contact Us'],
  },
]

export function Footer() {
  return (
    <footer className="bg-paper border-t border-line px-[5%] pt-14 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-[32px] h-[32px] bg-ink rounded-lg flex items-center justify-center text-hl font-display font-bold text-[16px]">
              P
            </div>
            <span className="font-display font-bold text-xl text-ink">PYQVault</span>
          </div>
          <p className="mt-3 text-sm text-ink-3 font-light leading-[1.75] max-w-[230px]">
            India's most complete previous year questions platform. Every paper, solved and explained. No paywalls on answers.
          </p>
        </div>

        {/* Columns */}
        {FOOTER_COLS.map(({ title, links }) => (
          <div key={title}>
            <h4 className="font-display font-bold text-sm text-ink mb-4">{title}</h4>
            <ul className="flex flex-col gap-2 list-none">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-ink-3 font-light no-underline hover:text-ink transition-colors duration-150">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line pt-5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[13px] text-ink-4">© 2025 PYQVault · Made for India's aspirants</p>
        <p className="text-[13px] text-ink-4">UPSC · SSC · IBPS · State PSCs · NEET · JEE · RRB</p>
      </div>
    </footer>
  )
}
