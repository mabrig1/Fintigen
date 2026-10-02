"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { getAuthSession, type AuthUser } from "@/lib/auth-client";

type ReferralSummary = {
  clicks: number;
  leads: number;
  paidReferrals: number;
  pendingCommission: number;
  availableCommission: number;
};

type Lead = {
  id: string;
  name: string;
  contact: string;
  status: "new" | "contacted" | "interested" | "paid";
  note: string;
};

const DEFAULT_SUMMARY: ReferralSummary = {
  clicks: 0,
  leads: 0,
  paidReferrals: 0,
  pendingCommission: 0,
  availableCommission: 0,
};

const COURSE_PATH = "/checkout/mabrig-full-stack-founder-pro";
const COURSE_NAME = "Mabrig Full-Stack Founder Pro";
const COURSE_PRICE = 100000;
const COMMISSION_RATE = 15;
const BASE_URL = "https://www.fintigen.com";

function cleanCode(value: string) {
  return value.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "").slice(0, 64);
}

function money(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

function buildLink(code: string, campaign = "") {
  const url = new URL(COURSE_PATH, BASE_URL);
  if (code) url.searchParams.set("ref", code);
  if (campaign) {
    url.searchParams.set("utm_source", "referral");
    url.searchParams.set("utm_medium", "promoter");
    url.searchParams.set("utm_campaign", campaign.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50));
  }
  return url.toString();
}

function buildVideoBrief(code: string, hook: string, audience: string, provider: string) {
  const link = buildLink(code, "video");
  const providerInstruction =
    provider === "Remotion"
      ? "Build a 9:16 React/Remotion composition with kinetic captions, animated progress bars, logo-safe spacing, and a final CTA card."
      : provider === "PixVerse"
        ? "Generate dynamic vertical B-roll with energetic camera motion; add exact captions and CTA in the editor rather than trusting generated text."
        : provider === "fal"
          ? "Use a high-quality vertical text-to-video or image-to-video model for B-roll; preserve clean lower-third space for exact overlay text."
          : "Create a polished vertical social ad using stock/AI visuals, readable captions, upbeat pacing, and a strong final CTA.";

  return `FINTIGEN REFERRAL VIDEO — 20–30 seconds
Platform: ${provider}
Audience: ${audience || "students, young professionals and aspiring digital creators"}
Hook: ${hook || "Your next opportunity may begin with one practical digital skill."}

SCENE 1 — HOOK (0–4s)
Visual: Fast, aspirational shots of a learner opening a laptop, coding, AI interfaces and digital work.
Voice: “${hook || "Your next opportunity may begin with one practical digital skill."}”

SCENE 2 — VALUE (4–14s)
Visual: Coding, AI, data, project building and deployment moments.
Voice: “Fintigen helps you learn practical digital skills, AI, coding and data through action-focused training.”

SCENE 3 — OFFER (14–22s)
Visual: Clean course highlights and progress moments.
Voice: “Start learning, build real projects and move from watching tutorials to creating useful work.”

SCENE 4 — CTA (22–30s)
Visual: Branded FINTIGEN end card with space for the promoter’s link.
Voice: “Use my Fintigen link and start your next skill journey today.”
CTA text: START LEARNING • FINTIGEN.COM
Referral URL: ${link}

Production direction: ${providerInstruction}
Format: 1080x1920 vertical, bold captions, high contrast, no invented testimonials, no fake learner counts, no unverified income claims.`;
}

function posterSvg(code: string, headline: string, subline: string) {
  const safe = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const link = buildLink(code, "poster");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#020617"/>
      <stop offset=".55" stop-color="#064e3b"/>
      <stop offset="1" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="1350" fill="url(#g)"/>
  <circle cx="950" cy="170" r="260" fill="#fbbf24" opacity=".13"/>
  <circle cx="90" cy="1180" r="300" fill="#34d399" opacity=".10"/>
  <text x="80" y="120" fill="#6ee7b7" font-size="34" font-family="Arial, sans-serif" font-weight="700" letter-spacing="4">FINTIGEN</text>
  <text x="80" y="215" fill="#ffffff" font-size="64" font-family="Arial, sans-serif" font-weight="800">DIGITAL SKILLS • AI • CODING</text>
  <foreignObject x="80" y="300" width="920" height="380">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,sans-serif;color:#fff;font-size:82px;line-height:1.04;font-weight:900;">${safe(headline)}</div>
  </foreignObject>
  <foreignObject x="80" y="710" width="900" height="210">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,sans-serif;color:#cbd5e1;font-size:38px;line-height:1.35;font-weight:500;">${safe(subline)}</div>
  </foreignObject>
  <rect x="80" y="975" width="920" height="150" rx="28" fill="#fbbf24"/>
  <text x="120" y="1038" fill="#0f172a" font-size="30" font-family="Arial, sans-serif" font-weight="700">START WITH MY REFERRAL LINK</text>
  <foreignObject x="120" y="1062" width="830" height="48">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,sans-serif;color:#0f172a;font-size:24px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${safe(link)}</div>
  </foreignObject>
  <text x="80" y="1240" fill="#94a3b8" font-size="26" font-family="Arial, sans-serif">Practical learning. Real projects. Future-ready skills.</text>
  <text x="80" y="1290" fill="#6ee7b7" font-size="25" font-family="Arial, sans-serif" font-weight="700">www.fintigen.com</text>
</svg>`;
}

export default function ReferralGrowthWorkstation() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const [user, setUser] = useState<AuthUser | null>(null);
  const [code, setCode] = useState("");
  const [campaign, setCampaign] = useState("campus-october");
  const [summary, setSummary] = useState(DEFAULT_SUMMARY);
  const [liveStats, setLiveStats] = useState(false);
  const [status, setStatus] = useState("");
  const [posterHeadline, setPosterHeadline] = useState("Build Skills That Move You Forward.");
  const [posterSubline, setPosterSubline] = useState("Learn practical digital skills, AI, coding and data with Fintigen. Start today through my referral link.");
  const [videoHook, setVideoHook] = useState("Stop scrolling. Start building a skill that can change what you are able to create.");
  const [videoAudience, setVideoAudience] = useState("Nigerian students and young professionals");
  const [videoProvider, setVideoProvider] = useState("PixVerse");
  const [leadName, setLeadName] = useState("");
  const [leadContact, setLeadContact] = useState("");
  const [leadNote, setLeadNote] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [targetSales, setTargetSales] = useState(5);

  useEffect(() => {
    const session = getAuthSession();
    setUser(session?.user || null);
    if (!session) return;

    const savedCode = cleanCode(localStorage.getItem("fintigen-promoter-code") || "");
    setCode(savedCode);
    try {
      const savedLeads = JSON.parse(localStorage.getItem("fintigen-referral-leads") || "[]");
      if (Array.isArray(savedLeads)) setLeads(savedLeads.slice(0, 100));
    } catch {
      // Keep the local lead board optional and non-blocking.
    }

    if (!apiBase || !session.token) return;
    void (async () => {
      try {
        const response = await fetch(`${apiBase}/referrals/me`, {
          headers: { Authorization: `Bearer ${session.token}` },
        });
        if (!response.ok) return;
        const payload = await response.json().catch(() => ({}));
        const data = payload.data || payload;
        const referralCode = cleanCode(data.referralCode || data.code || data.promoter?.code || "");
        if (referralCode) {
          setCode(referralCode);
          localStorage.setItem("fintigen-promoter-code", referralCode);
        }
        const nextSummary = data.summary || data;
        setSummary({
          clicks: Number(nextSummary.clicks || 0),
          leads: Number(nextSummary.leads || 0),
          paidReferrals: Number(nextSummary.paidReferrals || nextSummary.sales || 0),
          pendingCommission: Number(nextSummary.pendingCommission || 0),
          availableCommission: Number(nextSummary.availableCommission || 0),
        });
        setLiveStats(true);
      } catch {
        // Creative tools remain available when the analytics API is unavailable.
      }
    })();
  }, [apiBase]);

  const link = useMemo(() => buildLink(code, campaign), [code, campaign]);
  const expectedCommission = COURSE_PRICE * COMMISSION_RATE / 100;
  const targetCommission = expectedCommission * targetSales;
  const videoBrief = useMemo(
    () => buildVideoBrief(code, videoHook, videoAudience, videoProvider),
    [code, videoHook, videoAudience, videoProvider],
  );

  function saveCode() {
    const next = cleanCode(code);
    setCode(next);
    localStorage.setItem("fintigen-promoter-code", next);
    setStatus(next ? "Referral code saved to this workstation." : "Referral code cleared.");
  }

  async function copy(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setStatus(`${label} copied.`);
    } catch {
      setStatus("Copy was blocked by your browser. Select the text manually.");
    }
  }

  function downloadPoster() {
    const svg = posterSvg(code, posterHeadline, posterSubline);
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = `fintigen-referral-poster-${code || "promoter"}.svg`;
    anchor.click();
    URL.revokeObjectURL(href);
    setStatus("Poster downloaded as editable SVG.");
  }

  function shareWhatsApp(message: string) {
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  function addLead(event: FormEvent) {
    event.preventDefault();
    if (!leadName.trim() || !leadContact.trim()) return;
    const next: Lead[] = [
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: leadName.trim(),
        contact: leadContact.trim(),
        status: "new",
        note: leadNote.trim(),
      },
      ...leads,
    ].slice(0, 100);
    setLeads(next);
    localStorage.setItem("fintigen-referral-leads", JSON.stringify(next));
    setLeadName("");
    setLeadContact("");
    setLeadNote("");
    setStatus("Lead added to your local follow-up board.");
  }

  function updateLead(id: string, nextStatus: Lead["status"]) {
    const next = leads.map((lead) => (lead.id === id ? { ...lead, status: nextStatus } : lead));
    setLeads(next);
    localStorage.setItem("fintigen-referral-leads", JSON.stringify(next));
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-12">
          <div className="text-5xl">🚀</div>
          <h1 className="mt-5 text-3xl font-black sm:text-4xl">Your Fintigen Referral Growth Workstation</h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
            Sign in to use your dedicated referral tools, campaign links, poster studio, video briefs, lead board and earning planner.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/login?next=/referral/workstation" className="rounded-xl bg-brand-600 px-6 py-3 font-black text-white">Log in</Link>
            <Link href="/register?next=/referral/workstation" className="rounded-xl border border-slate-300 px-6 py-3 font-black dark:border-slate-700">Create account</Link>
          </div>
        </div>
      </main>
    );
  }

  const whatsappPitch = `Hi! I thought this may help you. Fintigen offers practical training in digital skills, AI, coding and data. You can start here: ${link}`;
  const socialCaption = `Stop collecting tutorials. Start building practical digital skills. Fintigen helps learners move into AI, coding, data and project-based learning. Start here: ${link} #Fintigen #DigitalSkills #LearnAI #CodingSkills`;
  const objectionReply = `If you are worried about whether the training is practical, focus on the outcome: Fintigen is built around learning by doing, real projects and usable skills. Review the course details first, then decide if it fits your goal: ${link}`;
  const weekPlan = [
    ["Day 1", "Problem post", "Why watching tutorials without building projects slows progress."],
    ["Day 2", "Quick video", "Show 3 skills learners can begin developing on Fintigen."],
    ["Day 3", "WhatsApp status", "One clear benefit + your referral link."],
    ["Day 4", "Myth breaker", "You do not need to know everything before you start coding."],
    ["Day 5", "Course spotlight", "Explain who the flagship full-stack course is for."],
    ["Day 6", "Personal invitation", "Message 5 people who have already shown interest in digital skills."],
    ["Day 7", "Follow-up", "Revisit interested leads and answer one objection without pressure."],
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 p-7 text-white sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-emerald-300">Fintigen Referrer Workstation</p>
            <h1 className="mt-3 text-3xl font-black sm:text-5xl">Grow your referrals with a complete promotion toolkit.</h1>
            <p className="mt-4 max-w-3xl text-slate-300">
              Welcome, {user.name.split(" ")[0]}. Build tracked links, create posters and video briefs, write promotional copy, manage leads and plan campaigns from one place.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Your referral code</label>
            <div className="mt-2 flex gap-2">
              <input value={code} onChange={(e) => setCode(cleanCode(e.target.value))} placeholder="Enter assigned code" className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none" />
              <button type="button" onClick={saveCode} className="rounded-xl bg-amber-400 px-4 py-3 font-black text-slate-950">Save</button>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              {liveStats ? "Your code and statistics are synced from the referral system." : "If your account has not received a code yet, enter the code supplied by Fintigen support."}
            </p>
          </div>
        </div>
      </section>

      {status && <div aria-live="polite" className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300">{status}</div>}

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Metric label="Tracked clicks" value={liveStats ? String(summary.clicks) : "—"} />
        <Metric label="Leads" value={liveStats ? String(summary.leads) : String(leads.length)} />
        <Metric label="Paid referrals" value={liveStats ? String(summary.paidReferrals) : "—"} />
        <Metric label="Pending" value={liveStats ? money(summary.pendingCommission) : "—"} />
        <Metric label="Available" value={liveStats ? money(summary.availableCommission) : "—"} />
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-2">
        <Tool number="01" title="Referral Link Builder" description="Create your direct tracked enrollment link.">
          <label className="text-sm font-semibold">Campaign name<input value={campaign} onChange={(e) => setCampaign(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 dark:border-slate-700" /></label>
          <div className="mt-3 rounded-xl bg-slate-100 p-4 text-sm break-all dark:bg-slate-900">{link}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => copy(link, "Referral link")} className="action">Copy link</button>
            <button type="button" onClick={() => shareWhatsApp(whatsappPitch)} className="action-secondary">Share on WhatsApp</button>
          </div>
        </Tool>

        <Tool number="02" title="Campaign Link Lab" description="Generate channel-specific campaign URLs for cleaner attribution.">
          <div className="grid gap-2 sm:grid-cols-2">
            {["whatsapp-status", "facebook-post", "campus-outreach", "tiktok-bio"].map((name) => {
              const campaignLink = buildLink(code, name);
              return <button type="button" key={name} onClick={() => copy(campaignLink, name)} className="rounded-xl border border-slate-200 p-4 text-left text-sm font-bold hover:border-emerald-400 dark:border-slate-800"><span className="block text-xs uppercase text-slate-500">{name.replace(/-/g, " ")}</span><span className="mt-1 block truncate text-emerald-700 dark:text-emerald-400">{campaignLink}</span></button>;
            })}
          </div>
        </Tool>

        <Tool number="03" title="Poster Studio" description="Create an editable branded SVG poster with your referral link.">
          <input value={posterHeadline} onChange={(e) => setPosterHeadline(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 font-bold dark:border-slate-700" />
          <textarea value={posterSubline} onChange={(e) => setPosterSubline(e.target.value)} rows={3} className="mt-3 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 dark:border-slate-700" />
          <div className="mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 p-6 text-white">
            <p className="text-xs font-black tracking-[.18em] text-emerald-300">FINTIGEN</p>
            <p className="mt-4 text-2xl font-black">{posterHeadline}</p>
            <p className="mt-3 text-sm text-slate-300">{posterSubline}</p>
            <div className="mt-5 rounded-xl bg-amber-400 p-3 text-xs font-black text-slate-950 break-all">{link}</div>
          </div>
          <button type="button" onClick={downloadPoster} className="action mt-4">Download editable poster</button>
        </Tool>

        <Tool number="04" title="AI Video Studio" description="Generate a production-ready vertical ad brief for PixVerse, InVideo, fal or Remotion.">
          <div className="grid gap-3 sm:grid-cols-2">
            <select value={videoProvider} onChange={(e) => setVideoProvider(e.target.value)} className="rounded-xl border border-slate-300 bg-transparent px-4 py-3 dark:border-slate-700">
              {["PixVerse", "InVideo", "fal", "Remotion"].map((item) => <option key={item}>{item}</option>)}
            </select>
            <input value={videoAudience} onChange={(e) => setVideoAudience(e.target.value)} className="rounded-xl border border-slate-300 bg-transparent px-4 py-3 dark:border-slate-700" />
          </div>
          <textarea value={videoHook} onChange={(e) => setVideoHook(e.target.value)} rows={3} className="mt-3 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 dark:border-slate-700" />
          <pre className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap rounded-xl bg-slate-950 p-4 text-xs leading-6 text-slate-200">{videoBrief}</pre>
          <button type="button" onClick={() => copy(videoBrief, `${videoProvider} video brief`)} className="action mt-3">Copy {videoProvider} brief</button>
        </Tool>

        <Tool number="05" title="WhatsApp Conversion Builder" description="Use a concise message designed for personal outreach rather than spam.">
          <div className="rounded-xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-100">{whatsappPitch}</div>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => copy(whatsappPitch, "WhatsApp message")} className="action">Copy message</button>
            <button type="button" onClick={() => shareWhatsApp(whatsappPitch)} className="action-secondary">Open WhatsApp</button>
          </div>
        </Tool>

        <Tool number="06" title="Social Caption Studio" description="Ready-to-post promotional copy for Facebook, TikTok, Reels and status updates.">
          <div className="rounded-xl bg-slate-100 p-4 text-sm leading-6 dark:bg-slate-900">{socialCaption}</div>
          <button type="button" onClick={() => copy(socialCaption, "Social caption")} className="action mt-3">Copy caption</button>
        </Tool>

        <Tool number="07" title="Commission Planner" description="Plan targets using the published 15% eligible-payment commission rate.">
          <label className="text-sm font-semibold">Target paid referrals<input type="number" min={1} max={1000} value={targetSales} onChange={(e) => setTargetSales(Math.max(1, Math.min(1000, Number(e.target.value) || 1)))} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 dark:border-slate-700" /></label>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <MiniStat label="Commission / sale" value={money(expectedCommission)} />
            <MiniStat label="Target commission" value={money(targetCommission)} />
          </div>
          <p className="mt-3 text-xs text-slate-500">Planning estimate only. Withdrawable commission depends on eligible successful payments that remain valid.</p>
        </Tool>

        <Tool number="08" title="Lead Follow-up Board" description="Keep a private local list of people who asked for more information.">
          <form onSubmit={addLead} className="grid gap-2 sm:grid-cols-2">
            <input required value={leadName} onChange={(e) => setLeadName(e.target.value)} placeholder="Name" className="rounded-xl border border-slate-300 bg-transparent px-4 py-3 dark:border-slate-700" />
            <input required value={leadContact} onChange={(e) => setLeadContact(e.target.value)} placeholder="Phone / email" className="rounded-xl border border-slate-300 bg-transparent px-4 py-3 dark:border-slate-700" />
            <input value={leadNote} onChange={(e) => setLeadNote(e.target.value)} placeholder="Interest / note" className="rounded-xl border border-slate-300 bg-transparent px-4 py-3 sm:col-span-2 dark:border-slate-700" />
            <button className="action sm:col-span-2">Add lead</button>
          </form>
          <div className="mt-4 space-y-2">
            {leads.slice(0, 6).map((lead) => <div key={lead.id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800"><div className="flex flex-wrap items-center justify-between gap-2"><div><b>{lead.name}</b><p className="text-xs text-slate-500">{lead.contact}</p></div><select value={lead.status} onChange={(e) => updateLead(lead.id, e.target.value as Lead["status"])} className="rounded-lg border border-slate-300 bg-transparent px-2 py-1 text-xs dark:border-slate-700">{["new","contacted","interested","paid"].map((item) => <option key={item}>{item}</option>)}</select></div>{lead.note && <p className="mt-2 text-xs text-slate-500">{lead.note}</p>}</div>)}
            {!leads.length && <p className="text-sm text-slate-500">No leads saved yet.</p>}
          </div>
        </Tool>

        <Tool number="09" title="7-Day Content Planner" description="A simple weekly promotion rhythm that mixes education, invitation and follow-up.">
          <div className="space-y-2">{weekPlan.map(([day, format, idea]) => <div key={day} className="grid gap-1 rounded-xl border border-slate-200 p-3 sm:grid-cols-[70px_120px_1fr] dark:border-slate-800"><b className="text-sm">{day}</b><span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">{format}</span><span className="text-sm text-slate-600 dark:text-slate-400">{idea}</span></div>)}</div>
        </Tool>

        <Tool number="10" title="Pitch & Objection Coach" description="Answer common hesitation without pressure or exaggerated claims.">
          <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
            <p className="text-xs font-bold uppercase text-slate-500">Reply when someone asks: “Is it practical?”</p>
            <p className="mt-2 text-sm leading-6">{objectionReply}</p>
          </div>
          <button type="button" onClick={() => copy(objectionReply, "Objection reply")} className="action mt-3">Copy reply</button>
        </Tool>
      </section>

      <section className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/20">
        <h2 className="text-xl font-black">Promotion standard</h2>
        <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">Promote the real training offer, not invented statistics or guaranteed-income promises. Use accurate pricing and program terms, disclose that you may earn a referral commission where appropriate, and focus on who the course genuinely helps.</p>
      </section>
    </main>
  );
}

function Tool({ number, title, description, children }: { number: string; title: string; description: string; children: React.ReactNode }) {
  return <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-6"><div className="flex items-start gap-3"><span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-black text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">{number}</span><div><h2 className="text-xl font-black">{title}</h2><p className="mt-1 text-sm text-slate-500">{description}</p></div></div><div className="mt-5">{children}</div></article>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-2 text-2xl font-black">{value}</p></div>;
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-900"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 text-lg font-black">{value}</p></div>;
}
