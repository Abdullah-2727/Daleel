// ============================================================
// authService.ts — إدارة الـ JWT tokens في localStorage
// ============================================================

const TOKEN_KEY = "daleel_access_token";
const REFRESH_TOKEN_KEY = "daleel_refresh_token";
const USER_KEY = "daleel_user";

export const authService = {
  // ── Save ──────────────────────────────────────────────────
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  setRefreshToken(refreshToken: string) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  setUser(user: object) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  // ── Read ──────────────────────────────────────────────────
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  getUser<T = object>(): T | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  // ── State ─────────────────────────────────────────────────
  isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // ── Clear ─────────────────────────────────────────────────
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
