import assert from 'node:assert/strict'
import { questionTopic } from '../src/lib/questionTopic.ts'

assert.equal(
  questionTopic({
    examName: 'SSC CGL',
    year: '2024',
    subject: 'English Comprehension',
    tags: ['SSC CGL', '2024', 'English', 'Voice'],
  }),
  'Voice',
)
assert.equal(
  questionTopic({
    examName: 'JKCCE',
    year: '2025',
    subject: 'Environment & Ecology',
    tags: ['Blue Flag Certification', 'Environment'],
  }),
  'Blue Flag Certification',
)
assert.equal(
  questionTopic({
    examName: 'SSC CGL',
    year: '2024',
    subject: 'English',
    tags: ['SSC CGL', '2024', 'English'],
  }),
  '',
)

console.log('question topic selection: 3 cases OK')
