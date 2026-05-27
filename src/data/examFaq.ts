export type FaqItem = { q: string; a: string }

export const examFaqs: Record<string, FaqItem[]> = {
  jkssb: [
    {
      q: 'What is JKSSB?',
      a: 'JKSSB (Jammu & Kashmir Services Selection Board) is the statutory body that recruits candidates for Class IV and non-gazetted posts across departments of the Union Territory of Jammu & Kashmir.',
    },
    {
      q: 'What is the exam pattern for JKSSB Patwari?',
      a: 'JKSSB Patwari consists of 120 multiple-choice questions (1 mark each) with negative marking of 0.25 marks per wrong answer. Topics include General Knowledge, Arithmetic, Reasoning, and Revenue Laws.',
    },
    {
      q: 'Are JKSSB previous year papers free to practice?',
      a: 'Yes. All JKSSB previous year papers on Ministry of Papers are completely free. Every question includes the official answer key and a detailed explanation.',
    },
    {
      q: 'What subjects are covered in JKSSB exams?',
      a: 'JKSSB exams cover General Knowledge & Current Affairs, Quantitative Aptitude, Reasoning, English Language, and post-specific topics such as Revenue Laws (Patwari), Accounts (Finance), and Wildlife Science (Wildlife Guard).',
    },
    {
      q: 'Where can I check the official JKSSB answer key?',
      a: 'JKSSB releases provisional answer keys on jkssb.nic.in. On Ministry of Papers all papers are updated with the official answer key and subject-wise explanations for every question.',
    },
  ],
}
