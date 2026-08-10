import { FileText, LayoutDashboard } from 'lucide-react'
import { Link } from 'react-router-dom'

import { guidePathForExam } from '../../lib/examLinks'

type Props = {
  examSlug: string
  examName: string   // kept for aria-label
  hasInfo: boolean
  active: 'papers' | 'overview'
}

export function ExamNavStrip({ examSlug, examName, hasInfo, active }: Props) {
  // /exam/:slug/overview is retired and the Worker 301s it away, so linking to
  // it would point an internal link at a redirect. Go straight to the guide,
  // and drop the tab entirely when the exam has none.
  const overviewPath = guidePathForExam(examSlug)
  return (
    <nav className="enb" aria-label={`${examName} sections`}>
      <Link
        to={`/exam/${examSlug}`}
        className={`enb-tab${active === 'papers' ? ' active' : ''}`}
      >
        <FileText size={14} />
        Prev. Papers
      </Link>
      {hasInfo && overviewPath && (
        <Link
          to={overviewPath}
          className={`enb-tab${active === 'overview' ? ' active' : ''}`}
        >
          <LayoutDashboard size={14} />
          Overview
        </Link>
      )}
    </nav>
  )
}
