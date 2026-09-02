import type { Metadata } from "next";
import Link from "next/link";
import IctServiceRequestForm from "@/components/ict/IctServiceRequestForm";
import { knowledgeBaseReviewedOn, officialSources } from "@/lib/ict-knowledge-base";

export const metadata: Metadata = {
  title: "Nigeria ICT & Registration Assistance | Fintigen",
  description: "Request professional ICT assistance for NYSC, NIN/NIMC, CAC business registration, Remita/RRR payments and related digital services in Nigeria.",
};

const services = [
  {
    icon: "🎓",
    title: "NYSC Assistance",
    text: "Registration readiness, scanning, photo/document preparation, official portal guidance and printing. Biometric capture remains personal to the applicant.",
  },
  {
    icon: "🪪",
    title: "NIN / NIMC Support",
    text: "Enrolment guidance, modification/re-issue support, Remita payment guidance and document preparation. NIN enrolment itself is free.",
  },
  {
    icon: "🏢",
    title: "CAC Business Registration",
    text: "Business-name and company registration assistance through the official CAC Company Registration Portal, including document and query support.",
  },
  {
    icon: "💳",
    title: "Remita / RRR Support",
    text: "Help selecting the correct MDA/biller and service purpose, generating an RRR, completing payment and retrieving payment evidence.",
  },
  {
    icon: "📄",
    title: "Documents & Online Portals",
    text: "Scanning, PDF conversion, uploads, application support, printing and other legitimate digital-registration services.",
  },
  {
    icon: "🌐",
    title: "Business ICT Setup",
    text: "Business email, domains, websites, online presence and digital setup for newly registered businesses and entrepreneurs.",
  },
];

export default function IctServicesPage() {
  return (
    <div className="bg-slate-50 text-slate-950">
      <section className="overflow-hidden bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div>
            <p className="inline-flex rounded-full bg-emerald-500/15 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">Fintigen ICT Business Services · MABRIG Technologies</p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">Nigeria registration & ICT assistance from one accountable service desk.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">NYSC, NIN/NIMC, CAC, Remita/RRR, document services and business ICT support — with a Fintigen case number to keep your request organized from intake to completion.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#request" className="rounded-xl bg-emerald-500 px-6 py-3.5 font-black text-slate-950">Request a Service</a>
              <a href="https://wa.me/2347065342818" target="_blank" rel="noreferrer" className="rounded-xl border border-slate-700 px-6 py-3.5 font-bold hover:bg-slate-900">WhatsApp 07065342818</a>
            </div>
            <p className="mt-6 max-w-2xl text-xs leading-5 text-slate-500">Fintigen is an independent ICT assistance provider and is not NIMC, NYSC, CAC, Remita or another government agency. Official approvals and authority-controlled processes remain with the relevant organization.</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7 shadow-2xl">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-400">How your case works</p>
            <div className="mt-5 space-y-4">
              {[
                ["01", "Submit request", "Choose a service and give us only the basic information needed to contact you."],
                ["02", "Requirements & quote", "We confirm current official requirements and separate our service charge from government/statutory fees."],
                ["03", "Processing support", "We prepare documents, guide official portal steps and record the application/RRR/reference where needed."],
                ["04", "Delivery & closure", "You receive the relevant acknowledgement, receipt, certificate/slip or completed ICT output."],
              ].map(([number, title, text]) => (
                <div key={number} className="flex gap-4 rounded-2xl bg-slate-950 p-4">
                  <span className="text-lg font-black text-emerald-400">{number}</span>
                  <div><h2 className="font-black">{title}</h2><p className="mt-1 text-sm leading-6 text-slate-400">{text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Services</p>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">What the Fintigen ICT desk can assist with</h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-3xl">{service.icon}</div>
              <h3 className="mt-4 text-xl font-black">{service.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-amber-200 bg-amber-50">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black text-amber-950">Transparent fees</h2>
            <p className="mt-3 text-sm leading-7 text-amber-900">Your Fintigen service/ICT fee is separate from any government, statutory or biller payment. We confirm current official fees before a paid authority transaction and record the two amounts separately.</p>
          </div>
          <div>
            <h2 className="text-2xl font-black text-amber-950">Protect your credentials</h2>
            <p className="mt-3 text-sm leading-7 text-amber-900">Never send us an OTP, card PIN, full card details or banking password. Where an official portal requires a personal password or biometric verification, the customer completes that confidential step personally.</p>
          </div>
        </div>
      </section>

      <section id="request" className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Start here</p>
          <h2 className="mt-2 text-4xl font-black">Create a Fintigen ICT service case</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">Your request goes directly into the Fintigen admin operations queue. You receive an `FTG-ICT` case reference that our team can use to track the job.</p>
          <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-white">
            <p className="font-black">Need immediate assistance?</p>
            <p className="mt-2 text-sm text-slate-400">WhatsApp the Fintigen ICT desk and mention your case number if you already submitted a request.</p>
            <a href="https://wa.me/2347065342818" target="_blank" rel="noreferrer" className="mt-4 inline-block font-black text-emerald-400">07065342818 →</a>
          </div>
        </div>
        <IctServiceRequestForm />
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Official sources</p>
              <h2 className="mt-2 text-3xl font-black">Verify before you act</h2>
              <p className="mt-2 text-sm text-slate-500">Knowledge references reviewed {knowledgeBaseReviewedOn}. Authority rules and fees can change.</p>
            </div>
            <Link href="/contact" className="text-sm font-black text-emerald-700">Contact Fintigen →</Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {officialSources.map((source) => (
              <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-200 p-4 transition hover:border-emerald-500 hover:shadow-sm">
                <p className="font-black">{source.label}</p>
                <p className="mt-1 text-xs text-slate-500">{source.owner} ↗</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
