import { Hammer } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * Mock tests are under development and gated everywhere — the exam page tab,
 * the mock detail page, and the attempt page all render this instead of mock
 * content until they launch.
 */
export function MocksComingSoon({ showBrowseLink = false }: { showBrowseLink?: boolean }) {
  return (
    <div className="mocks-soon">
      <span className="mocks-soon-icon"><Hammer size={22} /></span>
      <strong>Mock tests are coming soon</strong>
      <p>
        We&apos;re building full-length, exam-pattern mock tests with timed sections and
        detailed solutions. Until then, every PYQ paper can be attempted online in the
        same exam-like interface.
      </p>
      {showBrowseLink && <Link to="/exams" className="mocks-soon-btn">Browse PYQ Papers</Link>}
    </div>
  )
}
