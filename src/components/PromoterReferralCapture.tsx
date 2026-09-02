"use client";

import { useEffect } from "react";

const TRACKING_ENDPOINT = "https://academic.mabrigkorie.org/api/referrals/click";

function cleanCode(value: string | null) {
  return String(value || "").trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "").slice(0, 64);
}

function sessionId() {
  const key = "mabrig-promoter-session";
  let value = localStorage.getItem(key);
  if (!value) {
    value = typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `fintigen-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(key, value);
  }
  return value;
}

export default function PromoterReferralCapture() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const incoming = cleanCode(params.get("ref"));
      const stored = cleanCode(localStorage.getItem("mabrig-referral-code"));
      const referralCode = incoming || stored;
      if (!referralCode) return;

      if (incoming) {
        localStorage.setItem("mabrig-referral-code", incoming);
        localStorage.setItem("mabrig-referral-product", "FINTIGEN");
      }

      void fetch(TRACKING_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referralCode,
          product: "FINTIGEN",
          sessionId: sessionId(),
          page: `${window.location.pathname}${window.location.search}`.slice(0, 300),
        }),
      }).catch(() => undefined);
    } catch {
      // Referral attribution must never block the learning experience.
    }
  }, []);

  return null;
}
