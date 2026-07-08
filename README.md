# FINTIGEN Academy

**Building Africa's Digital Future — Learn. Innovate. Transform.**

FINTIGEN Academy is an online technology and innovation academy on a mission to
equip Africans with world-class digital and technology skills. This repository
contains the academy website, built with [Next.js](https://nextjs.org) (App
Router) and [Tailwind CSS](https://tailwindcss.com).

## Pages

| Route | Page |
| --- | --- |
| `/` | Homepage — hero, stats, course categories, features, testimonials |
| `/about` | About Us — story, mission, vision, core values |
| `/courses` | Courses — six categories, 26 courses |
| `/instructors` | Instructor profiles |
| `/pricing` | Free / Premium / Corporate plans, referral, affiliate & scholarship programs |
| `/blog` | Blog — technology trends, AI, career advice, entrepreneurship |
| `/community` | Student groups, forums, events, mentorship |
| `/career-center` | Internships, remote jobs, freelance opportunities, job board |
| `/certificates` | Sample certificate, verification process, employer portal |
| `/dashboard` | Learning dashboard preview (lessons, progress, assignments, forums) |
| `/contact` | Contact channels and form |
| `/login`, `/register` | Authentication pages |
| `/learn/generative-ai` | **Interactive course** — Generative AI, Prompt Engineering & Enterprise AI Literacy (8 modules) |
| `/learn/agentic-ai` | **Interactive course** — Agentic AI & Autonomous Agents (8 modules) |
| `/learn/ml-engineering` | **Interactive course** — AI & Machine Learning Engineering: Production-Scale Architectures & MLOps (9 modules) |
| `/learn/data-science-analytics-engineering` | **Interactive course** — Data Science, Analytics & Engineering: Big Data Pipelines & Corporate Visualization (8 modules) |
| `/learn/green-tech-edge-computing` | **Interactive course** — Sustainable/Green Technology & Edge Computing: Carbon-Aware Systems & Edge AI (8 modules) |

All courses use the same reusable `CoursePlayer` component (lessons, labs, quizzes, a persistent progress bar, and a completion certificate). Adding another course is just a new data file in `src/lib/courses/` plus a small page under `src/app/learn/`.

Site-wide features: responsive layout, dark mode with persistence, sticky
navigation with mobile menu, SEO metadata per page.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

## Editing Content

Course catalog, instructors, pricing plans, blog posts, job listings,
testimonials, and site statistics all live in [`src/lib/data.ts`](src/lib/data.ts)
— update that file to change site content without touching page code.

## Roadmap

Planned features from the product spec, to be wired to a backend:

- [ ] Real authentication and student accounts
- [ ] Video lessons, quizzes, and progress tracking
- [ ] Online payments (Paystack & Flutterwave)
- [ ] Certificate issuance and employer verification API
- [ ] Email notifications
- [ ] Referral and affiliate programs
- [ ] Live classes integration
- [ ] AI chatbot assistant
- [ ] Downloadable resources
