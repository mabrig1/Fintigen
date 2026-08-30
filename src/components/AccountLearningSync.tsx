"use client";

import { useEffect } from "react";
import { getAuthToken } from "@/lib/auth-client";
import { getLearningSessionId, setLearningSessionId } from "@/lib/learning-session";

const SYNC_KEY = "fintigen-account-learning-sync";

export default function AccountLearningSync() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    if (!apiBase) return;

    let cancelled = false;

    async function sync() {
      const token = getAuthToken();
      if (!token) return;
      const currentSessionId = getLearningSessionId();
      const fingerprint = `${currentSessionId}:${token.slice(-12)}`;
      if (window.sessionStorage.getItem(SYNC_KEY) === fingerprint) return;

      try {
        const response = await fetch(`${apiBase}/learning/account/link`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ sessionId: currentSessionId }),
        });
        const data = (await response.json().catch(() => ({}))) as {
          canonicalSessionId?: string;
        };
        if (!response.ok || cancelled) return;
        if (data.canonicalSessionId) setLearningSessionId(data.canonicalSessionId);
        window.sessionStorage.setItem(SYNC_KEY, `${data.canonicalSessionId || currentSessionId}:${token.slice(-12)}`);
      } catch {
        // Learning continues anonymously when the backend is temporarily unavailable.
      }
    }

    void sync();
    const onAuthChanged = () => void sync();
    window.addEventListener("fintigen-auth-changed", onAuthChanged);
    return () => {
      cancelled = true;
      window.removeEventListener("fintigen-auth-changed", onAuthChanged);
    };
  }, [apiBase]);

  return null;
}
