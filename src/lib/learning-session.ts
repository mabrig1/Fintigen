const STORAGE_KEY = "fintigen-learning-session";

function createSessionId() {
  const random = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID().replace(/-/g, "")
    : `${Date.now()}_${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
  return `fintigen_${random}`.slice(0, 96);
}

export function getLearningSessionId() {
  if (typeof window === "undefined") return "";
  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (existing && /^[A-Za-z0-9_-]{16,100}$/.test(existing)) return existing;
  const sessionId = createSessionId();
  window.localStorage.setItem(STORAGE_KEY, sessionId);
  return sessionId;
}
