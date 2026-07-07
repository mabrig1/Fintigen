import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on technology trends, AI, career advice, entrepreneurship, and digital opportunities from FINTIGEN Academy.",
};

export default function BlogPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Blog"
        title="Insights for the Digital Age"
        description="Technology trends, AI, career advice, entrepreneurship, and digital opportunities — written for Africa's rising tech talent."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col rounded-2xl border border-slate-200 p-6 transition hover:border-brand-400 hover:shadow-lg dark:border-slate-800"
            >
              <span className="self-start rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                {post.category}
              </span>
              <h2 className="mt-4 text-lg font-bold leading-snug">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span>{post.readTime}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-slate-50 p-8 text-center dark:bg-slate-900/50">
          <h2 className="text-xl font-bold">Never Miss an Article</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Get the latest on tech careers and digital opportunities in your
            inbox.
          </p>
          <form className="mx-auto mt-5 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="your@email.com"
              aria-label="Email address"
              className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
            />
            <button
              type="submit"
              className="rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
