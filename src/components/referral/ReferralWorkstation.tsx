"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { getAuthSession, authHeaders, type AuthUser } from "@/lib/auth-client";

type ToolId =
  | "link"
  | "whatsapp"
  | "caption"
  | "poster"
  | "video"
  | "storyboard"
  | "campaign"
  | "leads"
  | "calculator"
  | "analytics";

type Lead = {
  id: string;
  name: string;
  contact: string;
  status: "new" | "contacted" | "interested" | "paid";
};

type Campaign = {
  id: string;
  name: string;
  audience: string;
  channel: string;
};

type ReferralStats = {
  clicks: number;
  leads: number;
  paidReferrals: number;
  commission: number;
};

const RATE = 15;
const PRICE = 100000;
const SITE = "https://www.fintigen.com";
const COURSE_PATH = "/courses/mabrig-full-stack-founder-pro";

const tools: Array<{ id: ToolId; icon: string; title: string; description: string }> = [
  { id: "link", icon: "🔗", title: "Smart Link Studio", description: "Build campaign-tagged personal referral links." },
  { id: "whatsapp", icon: "💬", title: "WhatsApp Builder", description: "Generate conversion-focused WhatsApp messages." },
  { id: "caption", icon: "✍️", title: "Social Caption Studio", description: "Create platform-ready referral captions." },
  { id: "poster", icon: "🖼️", title: "Poster Studio", description: "Create and download personalized referral posters." },
  { id: "video", icon: "🎬", title: "Video Script Studio", description: "Generate 8s, 15s and 30s promo scripts." },
  { id: "storyboard", icon: "🎞️", title: "Video Blueprint", description: "Export Remotion, PixVerse, fal and InVideo shot plans." },
  { id: "campaign", icon: "🚀", title: "Campaign Planner", description: "Save audiences, channels and campaign angles." },
  { id: "leads", icon: "🧲", title: "Lead CRM Lite", description: "Track prospects from first contact to payment." },
  { id: "calculator", icon: "🧮", title: "Earnings Calculator", description: "Model 15% commission and referral targets." },
  { id: "analytics", icon: "📈", title: "Performance Center", description: "View clicks, leads, sales and conversion signals." },
];

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

function safeText(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;",
    };
    return map[character] || character;
  });
}

export default function ReferralWorkstation() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const [user, setUser] = useState<AuthUser | null>(null);
  const [active, setActive] = useState<ToolId>("link");
  const [referralCode, setReferralCode] = useState("");
  const [campaign, setCampaign] = useState("campus-growth");
  const [channel, setChannel] = useState("whatsapp");
  const [audience, setAudience] = useState("students and young professionals");
  const [headline, setHeadline] = useState("Learn Digital Skills. Build Your Future.");
  const [captionChannel, setCaptionChannel] = useState("Instagram / Facebook");
  const [videoDuration, setVideoDuration] = useState("15");
  const [leadName, setLeadName] = useState("");
  const [leadContact, setLeadContact] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [campaignName, setCampaignName] = useState("");
  const [campaignAudience, setCampaignAudience] = useState("");
  const [campaignChannel, setCampaignChannel] = useState("WhatsApp");
  const [salesGoal, setSalesGoal] = useState(10);
  const [stats, setStats] = useState<ReferralStats>({ clicks: 0, leads: 0, paidReferrals: 0, commission: 0 });
  const [sync, setSync] = useState<"local" | "connected">("local");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const session = getAuthSession();
    if (!session?.user) return;
    setUser(session.user);

    const storedCode = cleanCode(localStorage.getItem("fintigen-promoter-code:" + currentUser.id) || "");
    setReferralCode(storedCode);

    try {
      setLeads(JSON.parse(localStorage.getItem("fintigen-referral-leads:" + currentUser.id) || "[]"));
      setCampaigns(JSON.parse(localStorage.getItem("fintigen-referral-campaigns:" + currentUser.id) || "[]"));
      setStats(JSON.parse(localStorage.getItem("fintigen-referral-stats:" + currentUser.id) || '{"clicks":0,"leads":0,"paidReferrals":0,"commission":0}'));
    } catch {
      // A damaged local cache should never block the promoter workspace.
    }

    if (!apiBase) return;
    void fetch(apiBase + "/referrals/me", { headers: authHeaders() })
      .then(async (response) => {
        if (!response.ok) return;
        const payload = await response.json().catch(() => ({}));
        const data = payload.data || payload;
        const serverCode = cleanCode(data.referralCode || data.code || "");
        if (serverCode) {
          setReferralCode(serverCode);
          localStorage.setItem("fintigen-promoter-code:" + currentUser.id, serverCode);
        }
        setStats({
          clicks: Number(data.clicks || data.stats?.clicks || 0),
          leads: Number(data.leads || data.stats?.leads || 0),
          paidReferrals: Number(data.paidReferrals || data.stats?.paidReferrals || 0),
          commission: Number(data.commission || data.stats?.commission || 0),
        });
        setSync("connected");
      })
      .catch(() => undefined);
  }, [apiBase]);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem("fintigen-referral-leads:" + user.id, JSON.stringify(leads));
  }, [leads, user]);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem("fintigen-referral-campaigns:" + user.id, JSON.stringify(campaigns));
  }, [campaigns, user]);

  useEffect(() => {
    if (!user || sync !== "local") return;
    localStorage.setItem("fintigen-referral-stats:" + user.id, JSON.stringify(stats));
  }, [stats, sync, user]);

  const referralLink = useMemo(() => {
    if (!referralCode) return SITE + "/referral";
    const params = new URLSearchParams({
      ref: referralCode,
      utm_source: "referral",
      utm_medium: channel,
      utm_campaign: campaign || "referral",
    });
    return SITE + COURSE_PATH + "?" + params.toString();
  }, [referralCode, channel, campaign]);

  const whatsappMessage = useMemo(
    () =>
      "I found a practical FINTIGEN program for " +
      audience +
      ". You can learn full-stack development, AI-powered workflows, deployment and monetization in one structured pathway. Check it out here: " +
      referralLink,
    [audience, referralLink],
  );

  const socialCaption = useMemo(() => {
    const opener =
      captionChannel === "LinkedIn"
        ? "Your next career advantage may be one practical skill away."
        : captionChannel === "TikTok / Reels"
          ? "Stop scrolling if you want a digital skill you can actually use."
          : "Ready to move from consuming technology to building with it?";
    return (
      opener +
      "\n\nFINTIGEN helps learners build practical skills in software, AI, data and digital business. The flagship Full-Stack Founder Pro program is designed around real projects, deployment and monetization.\n\nStart here: " +
      referralLink +
      "\n\n#FINTIGEN #DigitalSkills #LearnTech #FutureSkills"
    );
  }, [captionChannel, referralLink]);

  const videoScript = useMemo(() => {
    if (videoDuration === "8") {
      return "Hook: Want a digital skill that can change what you earn? FINTIGEN teaches practical AI, coding and full-stack skills. Tap my link and start building.";
    }
    if (videoDuration === "30") {
      return "Hook: The biggest mistake is learning tech without building anything real. FINTIGEN gives you a practical pathway from coding and AI to deployment and monetization. You work through real projects, build proof of skill and learn how digital products are created. If you are ready to stop watching tutorials and start building, use my referral link and explore the Full-Stack Founder Pro program today.";
    }
    return "Hook: You do not need another random tutorial. You need a practical path. FINTIGEN teaches coding, AI, deployment and monetization through real projects. Use my referral link and start building your future today.";
  }, [videoDuration]);

  const storyboard = useMemo(() => {
    const seconds = Number(videoDuration);
    const close = Math.max(2, Math.round(seconds * 0.2));
    return [
      "0-" + Math.max(2, Math.round(seconds * 0.25)) + "s — HOOK: fast kinetic text: “Stop watching. Start building.”",
      Math.max(2, Math.round(seconds * 0.25)) + "-" + Math.max(4, Math.round(seconds * 0.55)) + "s — PROOF: laptop + code + AI workflow + deployed website.",
      Math.max(4, Math.round(seconds * 0.55)) + "-" + (seconds - close) + "s — OFFER: FINTIGEN Full-Stack Founder Pro; practical projects, AI, deployment, monetization.",
      (seconds - close) + "-" + seconds + "s — CTA: “Use my link. Start today.” + referral code " + referralCode,
      "",
      "Remotion: 9:16, 1080x1920, kinetic typography, hard cuts, progress bar, captions.",
      "PixVerse/fal: modern Nigerian young-adult tech environment, authentic laptop workflows, energetic camera motion, no fake certificates or income claims.",
      "InVideo: vertical social ad, upbeat technology B-roll, bold readable captions, clear end card.",
    ].join("\n");
  }, [videoDuration, referralCode]);

  const posterSvg = useMemo(() => {
    const title = safeText(headline);
    const code = safeText(referralCode || "YOUR-CODE");
    return '<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#07111f"/><stop offset="0.55" stop-color="#162f46"/><stop offset="1" stop-color="#126c57"/></linearGradient></defs>' +
      '<rect width="1080" height="1350" rx="0" fill="url(#g)"/>' +
      '<circle cx="900" cy="190" r="260" fill="#22c55e" opacity=".13"/><circle cx="160" cy="1170" r="280" fill="#f59e0b" opacity=".12"/>' +
      '<text x="80" y="125" fill="#6ee7b7" font-family="Arial" font-size="34" font-weight="800" letter-spacing="5">FINTIGEN</text>' +
      '<text x="80" y="290" fill="white" font-family="Arial" font-size="78" font-weight="900">' + title.slice(0, 30) + '</text>' +
      '<text x="80" y="380" fill="white" font-family="Arial" font-size="52" font-weight="800">' + title.slice(30, 58) + '</text>' +
      '<text x="80" y="520" fill="#cbd5e1" font-family="Arial" font-size="34">Coding • AI • Full-Stack • Data • Digital Business</text>' +
      '<rect x="80" y="650" width="920" height="250" rx="42" fill="white" opacity=".08" stroke="#ffffff" stroke-opacity=".18"/>' +
      '<text x="125" y="735" fill="#fbbf24" font-family="Arial" font-size="35" font-weight="800">FULL-STACK FOUNDER PRO</text>' +
      '<text x="125" y="800" fill="white" font-family="Arial" font-size="32">Practical projects. Deployment. Monetization.</text>' +
      '<text x="125" y="860" fill="#cbd5e1" font-family="Arial" font-size="28">Use referral code: ' + code + '</text>' +
      '<rect x="80" y="1010" width="640" height="110" rx="28" fill="#fbbf24"/>' +
      '<text x="125" y="1080" fill="#07111f" font-family="Arial" font-size="38" font-weight="900">START AT FINTIGEN.COM</text>' +
      '<text x="80" y="1240" fill="#94a3b8" font-family="Arial" font-size="25">Referral promotion • Commission applies only to eligible successful payments.</text>' +
      '</svg>';
  }, [headline, referralCode]);

  function updateLocalStat(key: keyof ReferralStats, amount = 1) {
    if (sync !== "local") return;
    setStats((current) => ({ ...current, [key]: current[key] + amount }));
  }

  async function copy(value: string, label: string) {
    await navigator.clipboard?.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(""), 1500);
  }

  async function shareLink() {
    if (!referralCode) {
      setCopied("need-code");
      window.setTimeout(() => setCopied(""), 1800);
      return;
    }
    if (navigator.share) {
      await navigator.share({ title: "FINTIGEN", text: "Build practical digital skills with FINTIGEN.", url: referralLink });
      return;
    }
    await copy(referralLink, "link");
  }

  function saveReferralCode() {
    const next = cleanCode(referralCode);
    setReferralCode(next);
    if (!user) return;
    if (next) localStorage.setItem("fintigen-promoter-code:" + user.id, next);
    else localStorage.removeItem("fintigen-promoter-code:" + user.id);
    setCopied(next ? "code-saved" : "code-cleared");
    window.setTimeout(() => setCopied(""), 1600);
  }

  function downloadPoster() {
    const blob = new Blob([posterSvg], { type: "image/svg+xml;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = "fintigen-referral-" + (referralCode || "poster") + ".svg";
    anchor.click();
    URL.revokeObjectURL(href);
  }

  function addLead(event: FormEvent) {
    event.preventDefault();
    if (!leadName.trim() || !leadContact.trim()) return;
    const lead: Lead = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      name: leadName.trim(),
      contact: leadContact.trim(),
      status: "new",
    };
    setLeads((current) => [lead, ...current]);
    setLeadName("");
    setLeadContact("");
    updateLocalStat("leads");
  }

  function setLeadStatus(id: string, status: Lead["status"]) {
    setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, status } : lead)));
  }

  function saveCampaign(event: FormEvent) {
    event.preventDefault();
    if (!campaignName.trim()) return;
    const next: Campaign = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      name: campaignName.trim(),
      audience: campaignAudience.trim() || "General learners",
      channel: campaignChannel,
    };
    setCampaigns((current) => [next, ...current]);
    setCampaign(cleanCode(campaignName).toLowerCase() || "referral");
    setChannel(campaignChannel.toLowerCase().replace(/\s+/g, "-"));
    setCampaignName("");
    setCampaignAudience("");
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="text-5xl">🚀</div>
          <h1 className="mt-4 text-3xl font-black">Your Referral Growth Workstation</h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-500">Sign in to access your personal referral link, poster studio, video scripts, campaign planner, lead tracker, earnings calculator and performance center.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/login?next=/referral/workstation" className="rounded-xl bg-slate-950 px-5 py-3 font-black text-white dark:bg-emerald-400 dark:text-slate-950">Log in</Link>
            <Link href="/register?next=/referral/workstation" className="rounded-xl border border-slate-300 px-5 py-3 font-bold dark:border-slate-700">Create account</Link>
          </div>
        </div>
      </div>
    );
  }

  const expectedCommission = salesGoal * PRICE * (RATE / 100);
  const leadCount = Math.max(stats.leads, leads.length);
  const clickToLead = stats.clicks ? Math.round((leadCount / stats.clicks) * 100) : 0;
  const leadToSale = leadCount ? Math.round((stats.paidReferrals / leadCount) * 100) : 0;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 p-7 text-white sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">FINTIGEN Referral Growth Workstation</p>
            <h1 className="mt-3 text-3xl font-black sm:text-5xl">Welcome, {user.name.split(" ")[0]}.</h1>
            <p className="mt-4 max-w-3xl text-slate-300">Everything you need to attract, follow up, convert and measure referrals from one dedicated promoter workspace.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-400">Your referral code</p>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input value={referralCode} onChange={(e) => setReferralCode(cleanCode(e.target.value))} placeholder="Enter assigned referral code" className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500" />
              <button type="button" onClick={saveReferralCode} className="rounded-xl bg-amber-400 px-4 py-2 text-sm font-black text-slate-950">{copied === "code-saved" ? "Saved" : "Save code"}</button>
            </div>
            <p className="mt-2 text-xs text-slate-400">{sync === "connected" ? "Live referral account connected" : referralCode ? "Referral tools ready • live statistics sync when the referral API is available" : "Add the referral code assigned to you before sharing tracked campaign links."}</p>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <Metric label="Commission rate" value="15%" />
        <Metric label="Tracked clicks" value={sync === "connected" ? String(stats.clicks) : "—"} />
        <Metric label="Leads" value={String(leadCount)} />
        <Metric label="Paid referrals" value={sync === "connected" ? String(stats.paidReferrals) : "—"} />
        <Metric label="Commission" value={sync === "connected" ? money(stats.commission) : "—"} />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[330px_1fr]">
        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
          <p className="px-3 pb-3 pt-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">10 Growth Tools</p>
          <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
            {tools.map((tool, index) => (
              <button key={tool.id} type="button" onClick={() => setActive(tool.id)} className={"rounded-2xl p-3 text-left transition " + (active === tool.id ? "bg-emerald-50 text-emerald-950 ring-1 ring-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-100 dark:ring-emerald-900" : "hover:bg-slate-50 dark:hover:bg-slate-900")}>
                <div className="flex gap-3">
                  <span className="text-xl">{tool.icon}</span>
                  <div><p className="text-sm font-black">{index + 1}. {tool.title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{tool.description}</p></div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
          {active === "link" && (
            <Tool title="Smart Referral Link Studio" note="Create a unique campaign-tagged link for every channel so you can compare performance.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Campaign name"><input value={campaign} onChange={(e) => setCampaign(e.target.value)} className={inputClass} /></Field>
                <Field label="Channel"><select value={channel} onChange={(e) => setChannel(e.target.value)} className={inputClass}><option value="whatsapp">WhatsApp</option><option value="facebook">Facebook</option><option value="instagram">Instagram</option><option value="tiktok">TikTok</option><option value="linkedin">LinkedIn</option><option value="email">Email</option></select></Field>
              </div>
              <Output value={referralLink} />
              <div className="mt-4 flex flex-wrap gap-2"><Action onClick={() => copy(referralLink, "link")}>{copied === "link" ? "Copied" : "Copy link"}</Action><Action onClick={shareLink}>Share link</Action><a href={referralLink} target="_blank" rel="noreferrer" className={secondaryButton}>Open link</a></div>
            </Tool>
          )}

          {active === "whatsapp" && (
            <Tool title="WhatsApp Conversion Builder" note="Personalize the audience, then copy or open the ready-to-send message.">
              <Field label="Audience"><input value={audience} onChange={(e) => setAudience(e.target.value)} className={inputClass} /></Field>
              <Output value={whatsappMessage} tall />
              <div className="mt-4 flex flex-wrap gap-2"><Action onClick={() => copy(whatsappMessage, "wa")}>{copied === "wa" ? "Copied" : "Copy message"}</Action><a href={"https://wa.me/?text=" + encodeURIComponent(whatsappMessage)} target="_blank" rel="noreferrer" className={secondaryButton}>Open WhatsApp</a></div>
            </Tool>
          )}

          {active === "caption" && (
            <Tool title="Social Caption Studio" note="Create accurate promotional copy without fake learner counts or income promises.">
              <Field label="Platform"><select value={captionChannel} onChange={(e) => setCaptionChannel(e.target.value)} className={inputClass}><option>Instagram / Facebook</option><option>TikTok / Reels</option><option>LinkedIn</option></select></Field>
              <Output value={socialCaption} tall />
              <div className="mt-4"><Action onClick={() => copy(socialCaption, "caption")}>{copied === "caption" ? "Copied" : "Copy caption"}</Action></div>
            </Tool>
          )}

          {active === "poster" && (
            <Tool title="Personalized Poster Studio" note="Create a branded 1080×1350 SVG poster carrying your referral code.">
              <Field label="Poster headline"><input value={headline} onChange={(e) => setHeadline(e.target.value)} className={inputClass} /></Field>
              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 dark:border-slate-800" dangerouslySetInnerHTML={{ __html: posterSvg }} />
              <div className="mt-4 flex flex-wrap gap-2"><Action onClick={downloadPoster}>Download SVG poster</Action><Action onClick={() => copy(referralLink, "poster-link")}>{copied === "poster-link" ? "Link copied" : "Copy matching link"}</Action></div>
            </Tool>
          )}

          {active === "video" && (
            <Tool title="Video Script Studio" note="Generate concise scripts for vertical referral ads and creator-style videos.">
              <Field label="Duration"><select value={videoDuration} onChange={(e) => setVideoDuration(e.target.value)} className={inputClass}><option value="8">8 seconds</option><option value="15">15 seconds</option><option value="30">30 seconds</option></select></Field>
              <Output value={videoScript} tall />
              <div className="mt-4"><Action onClick={() => copy(videoScript, "video")}>{copied === "video" ? "Copied" : "Copy video script"}</Action></div>
            </Tool>
          )}

          {active === "storyboard" && (
            <Tool title="Remotion + PixVerse + fal + InVideo Blueprint" note="One production blueprint can be handed to the rendering tool of your choice.">
              <Output value={storyboard} taller />
              <div className="mt-4"><Action onClick={() => copy(storyboard, "story")}>{copied === "story" ? "Copied" : "Copy production blueprint"}</Action></div>
            </Tool>
          )}

          {active === "campaign" && (
            <Tool title="Campaign Planner" note="Build reusable campaigns, then let the Smart Link Studio inherit the active campaign name and channel.">
              <form onSubmit={saveCampaign} className="grid gap-4 sm:grid-cols-2">
                <Field label="Campaign"><input required value={campaignName} onChange={(e) => setCampaignName(e.target.value)} className={inputClass} placeholder="UNN October Drive" /></Field>
                <Field label="Audience"><input value={campaignAudience} onChange={(e) => setCampaignAudience(e.target.value)} className={inputClass} placeholder="Postgraduate students" /></Field>
                <Field label="Primary channel"><select value={campaignChannel} onChange={(e) => setCampaignChannel(e.target.value)} className={inputClass}><option>WhatsApp</option><option>Facebook</option><option>Instagram</option><option>TikTok</option><option>LinkedIn</option><option>Email</option></select></Field>
                <div className="flex items-end"><button className={primaryButton}>Save campaign</button></div>
              </form>
              <div className="mt-6 space-y-2">{campaigns.map((item) => <button type="button" key={item.id} onClick={() => { setCampaign(cleanCode(item.name).toLowerCase()); setChannel(item.channel.toLowerCase()); setAudience(item.audience); setActive("link"); }} className="block w-full rounded-xl border border-slate-200 p-4 text-left hover:border-emerald-400 dark:border-slate-800"><strong>{item.name}</strong><p className="mt-1 text-xs text-slate-500">{item.audience} • {item.channel}</p></button>)}</div>
            </Tool>
          )}

          {active === "leads" && (
            <Tool title="Lead CRM Lite" note="Keep a simple prospect pipeline in your own browser. Live account CRM can replace this when the backend endpoint is enabled.">
              <form onSubmit={addLead} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                <input required value={leadName} onChange={(e) => setLeadName(e.target.value)} className={inputClass} placeholder="Prospect name" />
                <input required value={leadContact} onChange={(e) => setLeadContact(e.target.value)} className={inputClass} placeholder="Phone / email" />
                <button className={primaryButton}>Add lead</button>
              </form>
              <div className="mt-5 space-y-2">{leads.map((lead) => <div key={lead.id} className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800"><div><strong>{lead.name}</strong><p className="text-xs text-slate-500">{lead.contact}</p></div><select value={lead.status} onChange={(e) => setLeadStatus(lead.id, e.target.value as Lead["status"])} className={inputClass + " sm:w-40"}><option value="new">New</option><option value="contacted">Contacted</option><option value="interested">Interested</option><option value="paid">Paid</option></select></div>)}</div>
            </Tool>
          )}

          {active === "calculator" && (
            <Tool title="15% Earnings Calculator" note={"The flagship course is currently " + money(PRICE) + ". Commission applies only to eligible successful payments."}>
              <Field label="Target paid referrals"><input type="number" min="0" max="10000" value={salesGoal} onChange={(e) => setSalesGoal(Math.max(0, Number(e.target.value) || 0))} className={inputClass} /></Field>
              <div className="mt-5 grid gap-4 sm:grid-cols-3"><Metric label="Course price" value={money(PRICE)} /><Metric label="Commission per sale" value={money(PRICE * RATE / 100)} /><Metric label="Target commission" value={money(expectedCommission)} /></div>
            </Tool>
          )}

          {active === "analytics" && (
            <Tool title="Performance & Conversion Center" note={sync === "connected" ? "Showing live account referral signals from the referral backend." : "Showing local workstation activity until live referral stats are available."}>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Clicks" value={sync === "connected" ? String(stats.clicks) : "—"} /><Metric label="Leads" value={String(leadCount)} /><Metric label="Paid" value={sync === "connected" ? String(stats.paidReferrals) : "—"} /><Metric label="Commission" value={sync === "connected" ? money(stats.commission) : "—"} /></div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-900"><p className="text-xs font-bold uppercase text-slate-500">Click → lead</p><p className="mt-2 text-3xl font-black">{sync === "connected" ? clickToLead + "%" : "—"}</p></div><div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-900"><p className="text-xs font-bold uppercase text-slate-500">Lead → paid</p><p className="mt-2 text-3xl font-black">{sync === "connected" ? leadToSale + "%" : "—"}</p></div></div>
              <p className="mt-5 text-xs leading-5 text-slate-500">Do not treat local counts as financial records. Withdrawable commission is determined by verified eligible payments and the administrator referral ledger.</p>
            </Tool>
          )}
        </div>
      </section>
    </main>
  );
}

const inputClass = "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900";
const primaryButton = "rounded-xl bg-emerald-600 px-5 py-3 font-black text-white transition hover:bg-emerald-500";
const secondaryButton = "rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold transition hover:border-emerald-400 dark:border-slate-700";

function Tool({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return <section><p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">Promoter tool</p><h2 className="mt-2 text-2xl font-black">{title}</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{note}</p><div className="mt-6">{children}</div></section>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm font-bold">{label}{children}</label>;
}

function Output({ value, tall = false, taller = false }: { value: string; tall?: boolean; taller?: boolean }) {
  return <pre className={"mt-5 whitespace-pre-wrap break-words rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-slate-100 " + (taller ? "min-h-80" : tall ? "min-h-44" : "")}>{value}</pre>;
}

function Action({ onClick, children }: { onClick: () => void | Promise<void>; children: React.ReactNode }) {
  return <button type="button" onClick={onClick} className={primaryButton}>{children}</button>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p><p className="mt-2 text-2xl font-black">{value}</p></div>;
}
