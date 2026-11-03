type QuestionTopicSource = {
  examName?: string
  year?: string | number
  subject?: string
  tags?: string[]
}

function normalizeLabel(value: string | number | undefined): string {
  return String(value ?? '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

export function questionTopic(question: QuestionTopicSource): string {
  const exam = normalizeLabel(question.examName)
  const year = normalizeLabel(question.year)
  const subject = normalizeLabel(question.subject)

  return (question.tags ?? [])
    .map(tag => tag.trim())
    .find(tag => {
      const normalizedTag = normalizeLabel(tag)
      return normalizedTag !== ''
        && normalizedTag !== exam
        && normalizedTag !== year
        && normalizedTag !== subject
        && !(subject && subject.startsWith(`${normalizedTag} `))
    }) ?? ''
}
