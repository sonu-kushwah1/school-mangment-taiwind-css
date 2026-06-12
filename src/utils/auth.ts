export const AUTH_COOKIE = "token";

export function setAuthToken(token: string) {
  if (typeof window === "undefined") return;

  localStorage.setItem("token", token);
  document.cookie = `${AUTH_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function clearAuth() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  if (!match) return null;

  return decodeURIComponent(match.split("=").slice(1).join("="));
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;

  const fromStorage = localStorage.getItem("token");
  const fromCookie = getCookie(AUTH_COOKIE);

  if (fromStorage && !fromCookie) {
    document.cookie = `${AUTH_COOKIE}=${encodeURIComponent(fromStorage)}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    return fromStorage;
  }

  return fromStorage || fromCookie;
}
