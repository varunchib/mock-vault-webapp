import { FileText, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'

type Props = {
  examSlug: string
  examName: string   // kept for aria-label
  hasInfo: boolean
  active: 'papers' | 'overview'
}

export function ExamNavStrip({ examSlug, examName, hasInfo, active }: Props) {
  return (
    <nav className="enb" aria-label={`${examName} sections`}>
      <Link
        href={`/exam/${examSlug}`}
        className={`enb-tab${active === 'papers' ? ' active' : ''}`}
      >
        <FileText size={14} />
        Prev. Papers
      </Link>
      {hasInfo && (
        <Link
          href={`/exam/${examSlug}/overview`}
          className={`enb-tab${active === 'overview' ? ' active' : ''}`}
        >
          <LayoutDashboard size={14} />
          Overview
        </Link>
      )}
    </nav>
  )
}
