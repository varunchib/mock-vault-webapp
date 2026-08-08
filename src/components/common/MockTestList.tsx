import { ChevronLeft, ChevronRight, CircleHelp, Clock3, FileText } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { MockItem } from '../../lib/api'

/**
 * The exam's test series, inside the exam page's Mock Tests tab.
 *
 * Two levels of filtering, the way exam platforms organise a large series:
 *
 *   1. Category tabs — "Full Test" for whole-syllabus mocks, then one tab per
 *      subject that has a single-subject test. Horizontally scrollable, with
 *      counts, because a mature series has more categories than fit a row.
 *   2. Sub-filters — difficulty within the selected category, so picking
 *      "General Awareness" then narrows to the levels that exist inside it.
 *
 * Both levels are derived from the tests themselves and only render when they
 * would actually split the list: a filter that returns the same set, or an
 * empty one, is chrome. With a single test neither row appears at all.
 */

const ALL = 'All Tests'

/** A whole-syllabus mock is a "Full Test"; a single-subject one files under
 *  its subject. This is the only category signal the data carries. */
function categoryOf(mock: MockItem): string {
  return mock.subjects.length === 1 ? mock.subjects[0] : 'Full Test'
}

export function MockTestList({
  mocks,
  onStart,
}: {
  mocks: MockItem[]
  onStart: (mock: MockItem) => void
}) {
  const [category, setCategory] = useState(ALL)
  const [level, setLevel] = useState('All')
  const tabsRef = useRef<HTMLDivElement>(null)
  const [scroll, setScroll] = useState({ left: false, right: false })

  const playable = useMemo(() => mocks.filter((m) => m.questions > 0), [mocks])

  const categories = useMemo(() => {
    const counts = new Map<string, number>()
    for (const m of mocks) counts.set(categoryOf(m), (counts.get(categoryOf(m)) ?? 0) + 1)
    // Full Test leads; the rest alphabetical, as a syllabus would list them.
    const names = [...counts.keys()].sort((a, b) =>
      a === 'Full Test' ? -1 : b === 'Full Test' ? 1 : a.localeCompare(b))
    return [{ name: ALL, count: mocks.length }, ...names.map((n) => ({ name: n, count: counts.get(n)! }))]
  }, [mocks])

  const inCategory = useMemo(
    () => (category === ALL ? mocks : mocks.filter((m) => categoryOf(m) === category)),
    [mocks, category],
  )

  // Sub-filters describe only what is inside the chosen category.
  const levels = useMemo(() => {
    const present = inCategory.filter((m) => m.questions > 0).map((m) => m.difficulty).filter(Boolean)
    return ['All', ...Array.from(new Set(present))]
  }, [inCategory])

  // A level chosen in a previous category may not exist in this one; fall back
  // rather than showing an empty list. Derived, not stored, so there is no
  // state to keep in sync.
  const activeLevel = levels.includes(level) ? level : 'All'
  const visible = activeLevel === 'All' ? inCategory : inCategory.filter((m) => m.difficulty === activeLevel)

  const syncArrows = () => {
    const el = tabsRef.current
    if (!el) return
    setScroll({
      left: el.scrollLeft > 4,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    })
  }

  useEffect(() => {
    const el = tabsRef.current
    if (!el) return
    // ResizeObserver fires once on observe, which performs the first measure —
    // so nothing has to be set synchronously while the effect is running.
    const ro = new ResizeObserver(syncArrows)
    ro.observe(el)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.length])

  const nudge = (dir: -1 | 1) => {
    tabsRef.current?.scrollBy({ left: dir * 220, behavior: 'smooth' })
  }

  if (!mocks.length) {
    return <p className="ep-empty">No mock series set up for this exam yet.</p>
  }

  return (
    <div className="mt-wrap">
      {categories.length > 2 && (
        <div className="mt-cats">
          {scroll.left && (
            <button type="button" className="mt-cat-nav left" onClick={() => nudge(-1)} aria-label="Scroll categories left">
              <ChevronLeft size={17} />
            </button>
          )}
          <div className="mt-cat-scroll" ref={tabsRef} onScroll={syncArrows}>
            {categories.map((c) => (
              <button
                key={c.name}
                type="button"
                className={`mt-cat${category === c.name ? ' active' : ''}`}
                onClick={() => { setCategory(c.name); setLevel('All') }}
              >
                {c.name}<span>({c.count})</span>
              </button>
            ))}
          </div>
          {scroll.right && (
            <button type="button" className="mt-cat-nav right" onClick={() => nudge(1)} aria-label="Scroll categories right">
              <ChevronRight size={17} />
            </button>
          )}
        </div>
      )}

      {levels.length > 2 && (
        <div className="mt-levels">
          {levels.map((l) => (
            <button
              key={l}
              type="button"
              className={`mt-level${activeLevel === l ? ' active' : ''}`}
              onClick={() => setLevel(l)}
            >
              {l}
            </button>
          ))}
        </div>
      )}

      <div className="mt-list">
        {visible.map((mock) => {
          const locked = mock.questions === 0
          return (
            <article className={`mt-card${locked ? ' is-locked' : ''}`} key={mock.slug}>
              <div className="mt-card-body">
                <div className="mt-card-info">
                  {mock.isFree && <span className="mt-free">Free</span>}
                  <h3>{mock.title}</h3>
                  <div className="mt-meta">
                    <span><CircleHelp size={14} /> {mock.questions} Questions</span>
                    <span><FileText size={14} /> {mock.maxMarks ?? mock.questions} Marks</span>
                    <span><Clock3 size={14} /> {mock.durationMinutes} Mins</span>
                  </div>
                </div>
                <div className="mt-card-cta">
                  {locked ? (
                    <button type="button" className="mt-start" disabled>Not published</button>
                  ) : (
                    <button type="button" className="mt-start" onClick={() => onStart(mock)}>
                      Start Now
                    </button>
                  )}
                </div>
              </div>

              <footer className="mt-card-foot">
                <span className="mt-level-tag">{mock.difficulty}</span>
                {mock.subjects.length > 0 && (
                  <span className="mt-subjects">
                    {mock.subjects.slice(0, 3).join(', ')}
                    {mock.subjects.length > 3 && ` +${mock.subjects.length - 3}`}
                  </span>
                )}
                {mock.negativeMarking > 0 && (
                  <span className="mt-neg">−{mock.negativeMarking} negative</span>
                )}
              </footer>
            </article>
          )
        })}
      </div>

      {visible.length === 0 && (
        <p className="ep-empty">
          No {activeLevel === 'All' ? '' : `${activeLevel} `}tests in {category === ALL ? 'this series' : category}.
        </p>
      )}

      {playable.length === 0 && mocks.length > 0 && (
        <p className="ep-empty">None of these tests are published yet.</p>
      )}
    </div>
  )
}
