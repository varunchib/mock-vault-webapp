import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type { FaqItem } from '../../data/examFaq'

/**
 * The site's FAQ treatment, shared by the exam/board pages and the mock hub.
 *
 * Both pages also emit FAQPage structured data, and Google requires the answer
 * to be present in the markup for that to be valid — so the answer is rendered
 * (collapsed) rather than omitted until opened.
 */
export function FaqAccordion({
  items,
  title = 'Frequently Asked Questions',
}: {
  items: FaqItem[]
  title?: string
}) {
  const [open, setOpen] = useState<number | null>(null)
  if (!items.length) return null
  return (
    <section className="ep-faq" aria-label={title}>
      <h2 className="ep-faq-title">{title}</h2>
      <dl className="ep-faq-list">
        {items.map((item, i) => (
          <div className={`ep-faq-item${open === i ? ' open' : ''}`} key={item.q}>
            <dt>
              <button
                type="button"
                className="ep-faq-q"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {item.q}
                <ChevronDown size={15} className="ep-faq-chevron" />
              </button>
            </dt>
            {open === i && <dd className="ep-faq-a">{item.a}</dd>}
          </div>
        ))}
      </dl>
    </section>
  )
}
