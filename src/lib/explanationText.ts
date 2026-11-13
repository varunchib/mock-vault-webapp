const REDUNDANT_ANSWER_LEAD =
  /^\s*(?:#{1,3}\s*)?(?:the\s+)?(?:correct\s+(?:answer|option)|answer)\s*(?:is|:)\s*(?:\*\*)?[^*\r\n]+(?:\*\*)?[.!]?[ \t]*(?:\r?\n+|$)/i

export function removeRedundantAnswerLead(text: string | undefined | null): string {
  return String(text ?? '')
    .replace(REDUNDANT_ANSWER_LEAD, '')
    .replace(/^(?:[ \t]*\r?\n)+/, '')
    .trimStart()
}
