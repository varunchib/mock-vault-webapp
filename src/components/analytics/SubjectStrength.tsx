import { useMemo } from 'react'
import { AlertTriangle } from 'lucide-react'
import type { CombinedResult } from '../../lib/mockActivity'

type SubjectAgg = {
  subject: string
  total: number
  correct: number
  wrong: number
  skipped: number
  accuracy: number // correct / attempted (answered) questions
  attempted: number
}

function band(acc: number): 'good' | 'mid' | 'bad' {
  return acc >= 70 ? 'good' : acc >= 50 ? 'mid' : 'bad'
}

/** Aggregate per-subject performance across a set of attempts. */
function aggregateSubjects(results: CombinedResult[]): SubjectAgg[] {
  const map = new Map<string, SubjectAgg>()
  for (const r of results) {
    for (const s of r.subjects ?? []) {
      const key = s.subject || 'General'
      const agg = map.get(key) ?? { subject: key, total: 0, correct: 0, wrong: 0, skipped: 0, accuracy: 0, attempted: 0 }
      agg.total += s.total
      agg.correct += s.correct
      agg.wrong += s.wrong
      agg.skipped += s.skipped
      map.set(key, agg)
    }
  }
  const list = [...map.values()]
  for (const a of list) {
    a.attempted = a.correct + a.wrong
    a.accuracy = a.attempted > 0 ? Math.round((a.correct / a.attempted) * 100) : 0
  }
  // Strongest first — the weak tail reads naturally at the bottom
  return list.sort((a, b) => b.accuracy - a.accuracy)
}

/**
 * Horizontal accuracy bars per subject + a "focus areas" callout naming the
 * weakest subjects that have a meaningful sample. Used by the overview
 * Performance Report and each exam's analytics page.
 */
export function SubjectStrength({ results }: { results: CombinedResult[] }) {
  const subjects = useMemo(() => aggregateSubjects(results), [results])

  const focus = useMemo(
    () => subjects.filter(s => s.accuracy < 60 && s.attempted >= 5).slice(-3).reverse(),
    [subjects],
  )

  if (subjects.length === 0) return null

  return (
    <div className="an2-panel">
      <div className="an2-panel-head">
        <div>
          <h2>Subject strength</h2>
          <p>Accuracy on attempted questions, all selected attempts combined</p>
        </div>
      </div>

      <div className="an2-subj-list">
        {subjects.map(s => (
          <div key={s.subject} className="an2-subj-row">
            <span className="an2-subj-name" title={s.subject}>{s.subject}</span>
            <div
              className="an2-subj-track"
              role="img"
              aria-label={`${s.subject}: ${s.accuracy}% accuracy, ${s.correct} correct of ${s.attempted} attempted`}
              title={`${s.correct}/${s.attempted} attempted correct · ${s.skipped} skipped`}
            >
              <div className={`an2-subj-fill ${band(s.accuracy)}`} style={{ width: `${s.accuracy}%` }} />
            </div>
            <span className={`an2-subj-pct ${band(s.accuracy)}`}>{s.accuracy}%</span>
            <span className="an2-subj-n">{s.correct}/{s.attempted}</span>
          </div>
        ))}
      </div>

      {focus.length > 0 && (
        <div className="an2-focus">
          <AlertTriangle size={14} />
          <p>
            <strong>Focus areas:</strong>{' '}
            {focus.map((s, i) => (
              <span key={s.subject}>
                {i > 0 && ', '}
                {s.subject} ({s.accuracy}%)
              </span>
            ))}
            {' '}— lowest accuracy with 5+ attempted questions.
          </p>
        </div>
      )}
    </div>
  )
}
