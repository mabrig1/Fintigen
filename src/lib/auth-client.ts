export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar_url?: string | null;
};

type StoredAuth = {
  token: string;
  user: AuthUser;
};

const STORAGE_KEY = "fintigen-auth";

export function saveAuthSession(token: string, user: AuthUser) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }));
  window.dispatchEvent(new Event("fintigen-auth-changed"));
}

export function getAuthSession(): StoredAuth | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredAuth;
    if (!parsed?.token || !parsed?.user?.id) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function getAuthToken() {
  return getAuthSession()?.token || "";
}

export function clearAuthSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("fintigen-auth-changed"));
}

export function authHeaders(extra: HeadersInit = {}) {
  const token = getAuthToken();
  return {
    ...extra,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
