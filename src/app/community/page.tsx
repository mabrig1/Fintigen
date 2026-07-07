import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join the FINTIGEN Academy community — student groups, discussion forums, networking events, and mentorship sessions.",
};

const pillars = [
  {
    icon: "👥",
    title: "Student Groups",
    text: "Track-based groups where classmates collaborate on projects, share resources, and keep each other accountable.",
  },
  {
    icon: "💬",
    title: "Discussion Forums",
    text: "Ask questions, share wins, and get help from instructors and peers — every course has its own forum.",
  },
  {
    icon: "🌐",
    title: "Networking Events",
    text: "Monthly virtual meetups, demo days, and city-based mixers connecting students with industry professionals.",
  },
  {
    icon: "🧑‍🏫",
    title: "Mentorship Sessions",
    text: "One-on-one and group mentorship with experienced professionals to guide your learning and career.",
  },
];

const upcomingEvents = [
  {
    date: "Jul 18",
    title: "Demo Day: Web Development Cohort 12",
    format: "Virtual · 4:00 PM WAT",
  },
  {
    date: "Jul 25",
    title: "Career AMA: Breaking into Remote Work",
    format: "Virtual · 6:00 PM WAT",
  },
  {
    date: "Aug 02",
    title: "Lagos Student Meetup & Networking Night",
    format: "In person · Yaba, Lagos",
  },
];

export default function CommunityPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Community"
        title="You Never Learn Alone"
        description="8,000+ students, mentors, and alumni supporting each other across Africa and beyond."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-slate-200 p-8 dark:border-slate-800"
            >
              <div className="text-3xl">{pillar.icon}</div>
              <h2 className="mt-3 text-lg font-semibold">{pillar.title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold">📅 Upcoming Events</h2>
          <div className="mt-6 space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.title}
                className="flex items-center gap-6 rounded-2xl border border-slate-200 p-5 dark:border-slate-800"
              >
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-600 text-white">
                  <span className="text-xs font-semibold uppercase">
                    {event.date.split(" ")[0]}
                  </span>
                  <span className="text-xl font-bold">
                    {event.date.split(" ")[1]}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-slate-500">{event.format}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-slate-50 p-8 text-center dark:bg-slate-900/50">
          <h2 className="text-2xl font-bold">Ready to Join the Community?</h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-600 dark:text-slate-400">
            Create a free account to access student groups, forums, events, and
            mentorship.
          </p>
          <Link
            href="/register"
            className="mt-5 inline-block rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
          >
            Join Free
          </Link>
        </div>
      </section>
    </div>
  );
}
