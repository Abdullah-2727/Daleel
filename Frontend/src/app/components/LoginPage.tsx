// ============================================================
// LoginPage.tsx — متصل بـ POST /api/Auth/login
// ============================================================
import { useState } from "react";
import { authApi } from "@/services/api";
import type { LoginDTO } from "@/types/api.types";

// ─── نفس الـ UI بتاع المشروع الأصلي، فقط الـ logic اتغير ───

export function LoginPage() {
  const [form, setForm] = useState<LoginDTO>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await authApi.login(form);
      // بعد نجاح الـ login، الـ token اتحفظ تلقائياً في authService
      // روّح للصفحة الرئيسية أو الـ dashboard
      window.location.href = "/";
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "حدث خطأ، حاول مرة أخرى"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-card border border-border">
        <h1 className="text-2xl font-bold text-center mb-6 text-foreground">
          تسجيل الدخول
        </h1>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="example@email.com"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              كلمة المرور
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
              dir="ltr"
            />
          </div>

          <div className="text-left">
            <a
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              نسيت كلمة المرور؟
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          مش عندك حساب؟{" "}
          <a href="/register" className="text-primary hover:underline font-medium">
            سجّل دلوقتي
          </a>
        </p>
      </div>
    </div>
  );
}
