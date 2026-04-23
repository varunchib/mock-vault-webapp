export function examPreviousPapersPath(examSlug: string) {
  return `/${examSlug}-exam/previous-year-papers`
}

export function examSlugFromPreviousPapersPath(examPath: string | undefined) {
  if (!examPath) return undefined
  return examPath.endsWith('-exam') ? examPath.slice(0, -5) : examPath
}
