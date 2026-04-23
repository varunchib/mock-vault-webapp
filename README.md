# PYQVault Landing Page

Production-ready React + TypeScript landing page for a mock test / previous year question platform.

## Tech Stack

- React 19
- TypeScript
- Vite
- Framer Motion
- Lucide React
- ESLint

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

## Directory Structure

```text
src/
  App.tsx
  main.tsx
  index.css
  data/
    landing.ts
  components/
    layout/
      Navbar.tsx
      Footer.tsx
    sections/
      Hero.tsx
      Ticker.tsx
      StatsStrip.tsx
      ValueProps.tsx
      QuestionDemo.tsx
      Exams.tsx
      AccessModel.tsx
      HowItWorks.tsx
      Pricing.tsx
      SeoLinks.tsx
      Testimonials.tsx
      CTA.tsx
    ui/
      Logo.tsx
      Reveal.tsx
      SectionHeader.tsx
```

## Notes

- The page is a single-page Vite app.
- Styling is plain CSS in `src/index.css` to closely match the original HTML/CSS mock.
- Demo interactions are client-side placeholders: search alerts, exam-card alerts, answer selection, explanation toggle, and share fallback.
