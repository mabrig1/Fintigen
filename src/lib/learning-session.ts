const STORAGE_KEY = "fintigen-learning-session";

function createSessionId() {
  const random = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID().replace(/-/g, "")
    : `${Date.now()}_${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
  return `fintigen_${random}`.slice(0, 96);
}

export function isValidLearningSessionId(value: string) {
  return /^[A-Za-z0-9_-]{16,100}$/.test(value);
}

export function getLearningSessionId() {
  if (typeof window === "undefined") return "";
  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (existing && isValidLearningSessionId(existing)) return existing;
  const sessionId = createSessionId();
  window.localStorage.setItem(STORAGE_KEY, sessionId);
  return sessionId;
}

export function setLearningSessionId(sessionId: string) {
  if (typeof window === "undefined" || !isValidLearningSessionId(sessionId)) return false;
  window.localStorage.setItem(STORAGE_KEY, sessionId);
  window.dispatchEvent(new CustomEvent("fintigen-learning-session-changed", { detail: sessionId }));
  return true;
}
