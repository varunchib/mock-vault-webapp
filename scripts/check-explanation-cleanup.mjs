import assert from 'node:assert/strict'
import { removeRedundantAnswerLead } from '../src/lib/explanationText.ts'

assert.equal(
  removeRedundantAnswerLead('The correct answer is **B**.\n\n## Key Points\n- Reason.'),
  '## Key Points\n- Reason.',
)
assert.equal(
  removeRedundantAnswerLead('Correct answer is **i, ii and iv**.\r\n\r\nBecause the other statement is false.'),
  'Because the other statement is false.',
)
assert.equal(
  removeRedundantAnswerLead('The correct answer is **B** because it follows from the passage.'),
  'The correct answer is **B** because it follows from the passage.',
)
assert.equal(
  removeRedundantAnswerLead('## Key Points\n- The answer is supported by the passage.'),
  '## Key Points\n- The answer is supported by the passage.',
)

console.log('explanation cleanup: 4 cases OK')
