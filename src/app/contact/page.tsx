import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with FINTIGEN Academy — email, WhatsApp, social media, or send us a message.",
};

const channels = [
  {
    icon: "📧",
    label: "Email",
    value: "hello@fintigen.com",
    href: "mailto:hello@fintigen.com",
  },
  {
    icon: "💬",
    label: "WhatsApp",
    value: "+234 800 000 0000",
    href: "https://wa.me/2348000000000",
  },
  {
    icon: "🐦",
    label: "X (Twitter)",
    value: "@fintigen",
    href: "#",
  },
  {
    icon: "📸",
    label: "Instagram",
    value: "@fintigenacademy",
    href: "#",
  },
];

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Contact"
        title="We'd Love to Hear From You"
        description="Questions about courses, partnerships, scholarships, or corporate training? Reach out through any channel."
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">Contact Channels</h2>
          <div className="mt-6 space-y-4">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-brand-400 dark:border-slate-800"
              >
                <span className="text-2xl">{channel.icon}</span>
                <div>
                  <p className="text-sm text-slate-500">{channel.label}</p>
                  <p className="font-semibold">{channel.value}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-slate-50 p-6 dark:bg-slate-900/50">
            <h3 className="font-semibold">🏢 Office</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              We are a remote-first academy serving students across Africa. Our
              support team is available Monday–Saturday, 9:00 AM – 6:00 PM WAT.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Send Us a Message</h2>
          <form className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Full name"
                aria-label="Full name"
                className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
              />
              <input
                type="email"
                placeholder="Email address"
                aria-label="Email address"
                className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
              />
            </div>
            <select
              aria-label="Topic"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
              defaultValue=""
            >
              <option value="" disabled>
                What is this about?
              </option>
              <option>Course enquiry</option>
              <option>Corporate training</option>
              <option>Scholarship application</option>
              <option>Partnership / hiring</option>
              <option>Something else</option>
            </select>
            <textarea
              rows={6}
              placeholder="Your message…"
              aria-label="Your message"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
