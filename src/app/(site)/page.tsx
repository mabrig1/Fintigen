import Link from "next/link";
import { courseCategories, stats, testimonials } from "@/lib/data";

const features = [
  {
    icon: "💳",
    title: "Flexible Payments",
    text: "Pay securely with Paystack or Flutterwave — cards, bank transfer, and mobile money.",
  },
  {
    icon: "🎓",
    title: "Verified Certificates",
    text: "Earn certificates employers can verify instantly through our verification portal.",
  },
  {
    icon: "🎥",
    title: "Live Classes",
    text: "Join live sessions with instructors and get your questions answered in real time.",
  },
  {
    icon: "🤝",
    title: "Mentorship & Community",
    text: "Learn alongside thousands of students with mentors guiding you at every step.",
  },
  {
    icon: "💼",
    title: "Career Outcomes",
    text: "Access internships, remote jobs, and freelance gigs through our Career Center.",
  },
  {
    icon: "🤖",
    title: "AI Learning Assistant",
    text: "Get instant help from our AI chatbot assistant, available 24/7 while you learn.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28">
          <div>
            <p className="inline-block rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-brand-200">
              FINTIGEN Academy — Learn. Innovate. Transform.
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Empowering Africa&apos;s Next Generation of{" "}
              <span className="text-brand-300">Digital Innovators</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-brand-100/90">
              Learn in-demand digital skills and build a successful career in
              technology. Learn from experts, earn certificates, and launch
              your tech career — from anywhere in the world.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="rounded-lg bg-accent-500 px-6 py-3 font-semibold text-slate-900 transition hover:bg-accent-400"
              >
                Enroll Now
              </Link>
              <Link
                href="/courses"
                className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Courses
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur"
              >
                <div className="text-3xl font-bold text-brand-300">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-brand-100/90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship premium program */}
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <Link
          href="/courses/mabrig-full-stack-founder-pro"
          className="group grid gap-7 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 p-7 text-white shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center"
        >
          <div>
            <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.14em]">
              <span className="rounded-full bg-amber-400 px-3 py-1.5 text-slate-950">New flagship course</span>
              <span className="rounded-full border border-white/15 px-3 py-1.5 text-emerald-200">12 weeks · production capstone</span>
            </div>
            <h2 className="mt-5 text-2xl font-black sm:text-4xl">Mabrig Full-Stack Founder Pro</h2>
            <p className="mt-2 text-lg font-semibold text-emerald-200">Build, Deploy &amp; Scale Real Apps</p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
              Master Next.js, Node.js, MongoDB, Vercel, Cloudflare, payments, security, and agentic AI through one real product launch.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 lg:min-w-64">
            <p className="text-sm text-slate-300">Nigeria</p>
            <p className="text-3xl font-black">₦100,000</p>
            <p className="mt-3 text-sm text-slate-300">International</p>
            <p className="text-3xl font-black">$199</p>
            <span className="mt-5 inline-block font-bold text-amber-300 group-hover:text-amber-200">View program →</span>
          </div>
        </Link>
      </section>

      {/* Featured interactive courses */}
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-wide text-brand-600 dark:text-brand-400">
          ⚡ New — Interactive Courses with Progress Tracking
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/learn/generative-ai",
              icon: "✨",
              title: "Generative AI, Prompt Engineering & Enterprise AI Literacy",
              blurb: "8 modules · LLMs, multimodal, fine-tuning & governance",
            },
            {
              href: "/learn/agentic-ai",
              icon: "🤖",
              title: "Agentic AI & Autonomous Agents",
              blurb: "8 modules · LangGraph, AutoGen & CrewAI",
            },
            {
              href: "/learn/ml-engineering",
              icon: "⚙️",
              title: "AI & Machine Learning Engineering",
              blurb: "9 modules · Deep learning, optimization & MLOps",
            },
            {
              href: "/learn/data-science-analytics-engineering",
              icon: "📊",
              title: "Data Science, Analytics & Engineering",
              blurb: "8 modules · SQL, Spark, Databricks & BI dashboards",
            },
          ].map((course) => (
            <Link
              key={course.href}
              href={course.href}
              className="flex items-center justify-between gap-4 rounded-2xl border border-brand-300 bg-brand-50 px-6 py-5 transition hover:shadow-lg dark:border-brand-700 dark:bg-brand-900/20"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{course.icon}</span>
                <div>
                  <p className="font-bold leading-snug">{course.title}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {course.blurb}
                  </p>
                </div>
              </div>
              <span className="shrink-0 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
                Start Free →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight">
          Where Technology Meets Opportunity
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          FINTIGEN Academy is an online technology and innovation academy on a
          mission to equip Africans with world-class digital and technology
          skills. From programming and artificial intelligence to design,
          data, and digital business, we combine expert-led courses, hands-on
          projects, and a vibrant community to turn learners into
          professionals.
        </p>
      </section>

      {/* Course categories preview */}
      <section className="bg-slate-50 py-16 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Explore Our Course Categories
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Six career-focused tracks, from beginner to advanced.
              </p>
            </div>
            <Link
              href="/courses"
              className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              View all courses →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courseCategories.map((category) => (
              <Link
                key={category.name}
                href="/courses"
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-brand-400 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="text-3xl">{category.icon}</div>
                <h3 className="mt-3 text-lg font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {category.courses
                    .slice(0, 3)
                    .map((course) => course.title)
                    .join(" · ")}{" "}
                  and more
                </p>
                <p className="mt-3 text-sm font-medium text-brand-600 dark:text-brand-400">
                  {category.courses.length} courses
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          Everything You Need to Succeed
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800"
            >
              <div className="text-3xl">{feature.icon}</div>
              <h3 className="mt-3 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-16 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            What Our Students Say
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <blockquote className="text-slate-700 dark:text-slate-300">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-4">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">
                    {testimonial.role}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-brand-700 to-brand-600 px-8 py-12 text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight">
            Skills for the Digital Age, Impact for a Lifetime.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">
            Join thousands of students building their future with FINTIGEN
            Academy. Your first course is free.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-brand-700 transition hover:bg-brand-50"
            >
              Create Free Account
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg border border-white/40 px-6 py-3 font-semibold transition hover:bg-white/10"
            >
              See Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
