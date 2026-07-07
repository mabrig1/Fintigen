import Link from "next/link";

const footerColumns = [
  {
    heading: "Learn",
    links: [
      { label: "Courses", href: "/courses" },
      { label: "Certificates", href: "/certificates" },
      { label: "Instructors", href: "/instructors" },
      { label: "Pricing", href: "/pricing" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    heading: "Grow",
    links: [
      { label: "Career Center", href: "/career-center" },
      { label: "Community", href: "/community" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Login / Register", href: "/login" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
              F
            </span>
            <span className="text-lg">
              FINTIGEN <span className="text-brand-600">Academy</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Building Africa&apos;s Digital Future. Learn. Innovate. Transform.
          </p>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            📧 hello@fintigen.com
            <br />
            💬 WhatsApp: +234 800 000 0000
          </p>
        </div>
        {footerColumns.map((column) => (
          <div key={column.heading}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-slate-100">
              {column.heading}
            </h3>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-sm text-slate-500 dark:border-slate-800">
        © {new Date().getFullYear()} FINTIGEN Academy. Empowering Tomorrow&apos;s
        Tech Leaders.
      </div>
    </footer>
  );
}
