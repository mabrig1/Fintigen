import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${brand.domain}, a subsidiary of ${brand.company}, for digital skills training, ICT services, and partnerships. WhatsApp ${brand.whatsappNumber} or connect on Facebook.`,
};

const channels = [
  { icon: "💬", label: "WhatsApp", value: brand.whatsappNumber, href: brand.whatsappUrl },
  { icon: "f", label: "Facebook", value: "Connect with us on Facebook", href: brand.facebookUrl },
  { icon: "📧", label: "Email", value: brand.email, href: `mailto:${brand.email}` },
];

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Contact Fintigen"
        title="Let’s Help You Take the Next Step"
        description="Questions about courses, ICT services, partnerships, or corporate training? Get in touch with our team."
      />
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">Contact Channels</h2>
          <div className="mt-6 space-y-4">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("https:") ? "_blank" : undefined}
                rel={channel.href.startsWith("https:") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-brand-400 dark:border-slate-800"
              >
                <span aria-hidden="true" className="text-2xl">{channel.icon}</span>
                <div>
                  <p className="text-sm text-slate-500">{channel.label}</p>
                  <p className="break-words font-semibold">{channel.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-slate-950 p-7 text-white sm:p-9">
          <p className="text-sm font-semibold text-brand-300">{brand.domain}</p>
          <h2 className="mt-3 text-2xl font-bold">{brand.ownership}</h2>
          <p className="mt-4 leading-7 text-slate-300">{brand.credit}.</p>
          <p className="mt-4 leading-7 text-slate-300">Tell us what you need help with. For an existing ICT service request, include your case reference so our team can find it.</p>
          <a href={brand.whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700">
            Chat on WhatsApp
          </a>
          <p className="mt-3 text-sm text-slate-400">Opens WhatsApp to start your conversation.</p>
        </div>
      </section>
    </div>
  );
}
