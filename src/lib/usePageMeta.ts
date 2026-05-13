import { useEffect } from 'react'

const SITE_NAME = 'PYQVault'
const SITE_ORIGIN = 'https://pyqvault.in'

export type PageMeta = {
  title: string
  description: string
  canonicalPath?: string
  ogType?: 'website' | 'article'
  jsonLd?: Record<string, unknown>
}

function upsertMeta(selector: string, create: () => HTMLMetaElement, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = create()
    document.head.appendChild(element)
  }
  element.content = content
}

function setMeta(name: string, content: string) {
  upsertMeta(`meta[name="${name}"]`, () => {
    const m = document.createElement('meta')
    m.name = name
    return m
  }, content)
}

function setProperty(property: string, content: string) {
  upsertMeta(`meta[property="${property}"]`, () => {
    const m = document.createElement('meta')
    m.setAttribute('property', property)
    return m
  }, content)
}

export function usePageMeta({ title, description, canonicalPath, ogType = 'website', jsonLd }: PageMeta) {
  useEffect(() => {
    document.title = title

    setMeta('description', description)

    // Open Graph
    setProperty('og:title', title)
    setProperty('og:description', description)
    setProperty('og:type', ogType)
    setProperty('og:site_name', SITE_NAME)
    if (canonicalPath) {
      setProperty('og:url', `${SITE_ORIGIN}${canonicalPath}`)
    }

    // Twitter / X Cards
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setMeta('twitter:site', '@pyqvault')

    // Canonical
    if (canonicalPath) {
      let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = `${SITE_ORIGIN}${canonicalPath}`
    }

    // JSON-LD structured data
    const scriptId = 'page-json-ld'
    document.getElementById(scriptId)?.remove()
    if (jsonLd) {
      const script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }
  }, [title, description, canonicalPath, ogType, jsonLd])
}
