export const flagshipCourse = {
  slug: "mabrig-full-stack-founder-pro",
  title: "Mabrig Full-Stack Founder Pro",
  subtitle: "Build, Deploy & Scale Real Apps",
  duration: "12 weeks",
  pace: "8–10 hours per week",
  level: "Beginner-friendly to production-ready",
  delivery: "Self-paced learning, practical labs, and guided capstone milestones",
  pricing: {
    nigeria: {
      market: "Nigeria",
      amount: "₦100,000",
      currency: "NGN",
      note: "Regional founder price",
    },
    international: {
      market: "International",
      amount: "$199",
      currency: "USD",
      note: "Global one-time price",
    },
  },
  outcomes: [
    "Turn a validated product idea into a maintainable full-stack application.",
    "Build accessible interfaces with React, Next.js, TypeScript, and Tailwind CSS.",
    "Design secure APIs, authentication, data models, uploads, and payment workflows.",
    "Deploy with GitHub and Vercel, then configure Cloudflare DNS, security, and R2 storage.",
    "Add responsible AI features with OpenRouter without losing control of cost or reliability.",
    "Test, observe, recover, maintain, and monetize a real production application.",
  ],
  modules: [
    {
      week: 1,
      title: "The Full-Stack Founder Operating System",
      summary:
        "Choose a valuable problem, define the smallest complete workflow, and turn constraints into a focused product brief.",
      project: "Product brief, user journey, risk map, and 12-week build plan.",
    },
    {
      week: 2,
      title: "GitHub, AI Coding, and the Engineering Control Loop",
      summary:
        "Use branches, pull requests, issues, repository instructions, and AI coding agents without surrendering technical judgment.",
      project: "Production-ready repository, acceptance criteria, and review checklist.",
    },
    {
      week: 3,
      title: "Frontend Engineering with Next.js",
      summary:
        "Build responsive interfaces with the App Router, React Server Components, TypeScript, Tailwind CSS, forms, and accessible navigation.",
      project: "Responsive product shell and one complete user workflow.",
    },
    {
      week: 4,
      title: "Backend APIs and Business Logic",
      summary:
        "Design reliable REST APIs with Node.js, Express, validation, error handling, rate limits, and clear service boundaries.",
      project: "Versioned API with validation, structured errors, and health checks.",
    },
    {
      week: 5,
      title: "MongoDB, Supabase, and Data Decisions",
      summary:
        "Model data deliberately, select SQL or document storage, create indexes, manage connections, and plan backup and recovery.",
      project: "Data model, migrations or seed data, indexes, and recovery note.",
    },
    {
      week: 6,
      title: "Authentication, Authorization, Payments, and Secrets",
      summary:
        "Protect accounts and premium features with secure sessions, permissions, environment separation, Paystack or Flutterwave, and webhook verification.",
      project: "Role-based access and a testable purchase-to-entitlement flow.",
    },
    {
      week: 7,
      title: "Files, Cloudflare R2, DNS, and Delivery",
      summary:
        "Validate uploads, use private object storage and signed access, configure DNS correctly, and reduce the blast radius of storage failures.",
      project: "Secure upload workflow and production domain checklist.",
    },
    {
      week: 8,
      title: "Vercel Deployment and the Serverless Boundary",
      summary:
        "Ship preview and production deployments, manage environment variables, design idempotent functions, and create rollback evidence.",
      project: "Verified preview deployment, production release record, and rollback target.",
    },
    {
      week: 9,
      title: "Agentic AI Features with Cost Control",
      summary:
        "Add useful AI workflows with OpenRouter, structured output, fallbacks, human approval, usage limits, and failure-safe user experiences.",
      project: "One bounded AI feature with evaluation cases and cost controls.",
    },
    {
      week: 10,
      title: "Testing, Security, and Production Readiness",
      summary:
        "Test the promise, not only the code, and harden inputs, permissions, dependencies, secrets, and high-risk workflows.",
      project: "Automated checks, threat review, and production-readiness scorecard.",
    },
    {
      week: 11,
      title: "Observability, Incidents, and Maintenance",
      summary:
        "Create useful logs, detect failures, run smoke checks, handle incidents, control cloud bills, and maintain several products without chaos.",
      project: "Health monitor, incident template, and monthly portfolio review.",
    },
    {
      week: 12,
      title: "Capstone Launch and Monetization",
      summary:
        "Finish a production application, define its offer, demonstrate evidence, launch to real users, and build a sustainable improvement loop.",
      project: "Live capstone, technical case study, launch page, and 30-day growth plan.",
    },
  ],
  included: [
    "The $50 Full-Stack Founder premium ebook",
    "Full-Stack Founder Control Centre workbook",
    "50 AI engineering prompts for planning, building, testing, and release",
    "13-app case-study collection",
    "Product brief, architecture decision, release, incident, and monthly review templates",
    "Portfolio health checker and GitHub Actions workflow",
    "Capstone assessment rubric and verifiable completion certificate",
  ],
  capstone: [
    "A real user can complete the core outcome end to end.",
    "Authentication, authorization, validation, and secrets are handled responsibly.",
    "The application is deployed to a production domain with rollback evidence.",
    "Logs, health checks, cost controls, and recovery procedures are documented.",
    "The founder can explain the offer, price, architecture, risks, and next growth milestone.",
  ],
} as const;

export type FlagshipModule = (typeof flagshipCourse.modules)[number];
