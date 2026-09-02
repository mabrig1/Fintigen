"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function PaymentCallbackPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const [status, setStatus] = useState<"checking" | "success" | "failed">("checking");
  const [message, setMessage] = useState("Verifying your payment with Paystack...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference") || params.get("trxref");
    if (!apiBase || !reference) {
      setStatus("failed");
      setMessage("The payment reference is missing or the FINTIGEN API is not configured.");
      return;
    }
    void fetch(`${apiBase}/payments/verify/${encodeURIComponent(reference)}`, { cache: "no-store" })
      .then(async response => ({ response, data: await response.json().catch(() => ({})) }))
      .then(({ response, data }) => {
        if (response.ok && data.status === "success") {
          setStatus("success");
          setMessage("Payment confirmed. Your Mabrig Full-Stack Founder Pro enrollment payment has been recorded successfully.");
        } else {
          setStatus("failed");
          setMessage(data.error || data.message || "Payment could not be verified.");
        }
      })
      .catch(() => {
        setStatus("failed");
        setMessage("We could not reach the payment verification service. Your Paystack payment is not lost; contact admissions with your reference if needed.");
      });
  }, [apiBase]);

  return <main className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-12">
      <span className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl ${status === "success" ? "bg-emerald-100 text-emerald-700" : status === "failed" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}`}>{status === "success" ? "✓" : status === "failed" ? "!" : "…"}</span>
      <h1 className="mt-5 text-3xl font-black">{status === "checking" ? "Checking Payment" : status === "success" ? "Payment Confirmed" : "Payment Verification"}</h1>
      <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">{message}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/learn/mabrig-full-stack-founder-pro" className="rounded-xl bg-brand-600 px-5 py-3 font-bold text-white">Open Course Area</Link><Link href="/contact" className="rounded-xl border border-slate-300 px-5 py-3 font-bold dark:border-slate-700">Contact Admissions</Link></div>
    </div>
  </main>;
}
