import type { Question, QuestionOption } from './api'

export type QuestionLanguage = 'en' | 'hi'

export function hasHindi(question: Question) {
  return Boolean(question.translations?.hi?.question)
}

export function getLocalizedQuestion(question: Question, language: QuestionLanguage) {
  const translation = question.translations?.[language] ?? question.translations?.en
  const optionTexts = translation?.options ?? []
  const options: QuestionOption[] = optionTexts.length
    ? question.options.map((option, index) => ({
        ...option,
        text: optionTexts[index] ?? option.text,
      }))
    : question.options

  return {
    passage: translation?.passage ?? '',
    question: translation?.question ?? question.question,
    options,
  }
}
