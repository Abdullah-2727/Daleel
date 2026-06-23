// ============================================================
// ForgotPasswordFlow.tsx — Modal بـ 3 خطوات
//   1. POST /api/Auth/forgot-password  (يبعت OTP للإيميل)
//   2. POST /api/Auth/verify-otp        (تأكيد الكود)
//   3. POST /api/Auth/reset-password    (كلمة مرور جديدة)
// ============================================================
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { authApi } from "@/services/api";
import { Eye, EyeOff, Mail, KeyRound, CheckCircle2 } from "lucide-react";

interface ForgotPasswordFlowProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
}

type Step = "email" | "otp" | "newPassword" | "done";

const RESEND_COOLDOWN = 60; // ثانية

export function ForgotPasswordFlow({ isOpen, onClose, initialEmail = "" }: ForgotPasswordFlowProps) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const otpRef = useRef<HTMLInputElement>(null);

  // Reset كل حاجة لما الـ modal يتفتح من جديد
  useEffect(() => {
    if (isOpen) {
      setStep("email");
      setEmail(initialEmail);
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setError(null);
      setCooldown(0);
    }
  }, [isOpen, initialEmail]);

  // Countdown لإعادة إرسال الكود
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // ── Step 1: طلب OTP عبر forgot-password ──────────────────
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email) { setError("من فضلك ادخل البريد الإلكتروني"); return; }

    setLoading(true);
    try {
      await authApi.forgotPassword({ email });
      setStep("otp");
      setCooldown(RESEND_COOLDOWN);
      setTimeout(() => otpRef.current?.focus(), 100);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "فشل إرسال الكود، تأكد من البريد الإلكتروني");
    } finally {
      setLoading(false);
    }
  };

  // ── إعادة إرسال الكود ──────────────────────────────────────
  const handleResend = async () => {
    if (cooldown > 0) return;
    setError(null);
    setLoading(true);
    try {
      await authApi.forgotPassword({ email });
      setCooldown(RESEND_COOLDOWN);
      setOtp("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "فشل إعادة إرسال الكود");
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: تأكيد الـ OTP ──────────────────────────────────
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!otp || otp.length < 4) { setError("ادخل الكود المكون من الأرقام"); return; }

    setLoading(true);
    try {
      await authApi.verifyOtp({ email, otpCode: otp, purpose: "reset-password" });
      setStep("newPassword");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "الكود غير صحيح أو منتهي الصلاحية");
    } finally {
      setLoading(false);
    }
  };

  // ── Step 3: تعيين كلمة مرور جديدة ──────────────────────────
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (newPassword.length < 6) { setError("كلمة المرور لازم تكون 6 أحرف على الأقل"); return; }
    if (newPassword !== confirmPassword) { setError("كلمة المرور مش متطابقة"); return; }

    setLoading(true);
    try {
      await authApi.resetPassword({ email, otpCode: otp, newPassword });
      setStep("done");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "فشل تغيير كلمة المرور، حاول من الأول");
    } finally {
      setLoading(false);
    }
  };

  const STEP_NUM: Record<Step, number> = { email: 1, otp: 2, newPassword: 3, done: 4 };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-center text-primary">
            {step === "done" ? "تم بنجاح" : "استعادة كلمة المرور"}
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            {step === "email" && "أدخل بريدك الإلكتروني لإرسال كود التحقق"}
            {step === "otp" && "أدخل الكود المرسل إلى بريدك الإلكتروني"}
            {step === "newPassword" && "أدخل كلمة المرور الجديدة"}
            {step === "done" && "يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة"}
          </DialogDescription>
        </DialogHeader>

        {/* Progress dots */}
        {step !== "done" && (
          <div className="flex items-center justify-center gap-2 mb-2">
            {[1, 2, 3].map(n => (
              <div key={n} className={`h-1.5 rounded-full transition-all ${
                n === STEP_NUM[step] ? "w-8 bg-primary" : n < STEP_NUM[step] ? "w-8 bg-primary/40" : "w-8 bg-muted"
              }`} />
            ))}
          </div>
        )}

        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">{error}</div>
        )}

        {/* ── Step 1: Email ── */}
        {step === "email" && (
          <form onSubmit={handleRequestOtp} className="space-y-4" noValidate>
            <div className="flex items-center justify-center mb-2">
              <div className="p-3 bg-primary/10 rounded-full">
                <Mail className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">البريد الإلكتروني</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="example@email.com" required dir="ltr"
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition disabled:opacity-60">
              {loading ? "جاري الإرسال..." : "إرسال كود التحقق"}
            </button>
          </form>
        )}

        {/* ── Step 2: OTP ── */}
        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-4" noValidate>
            <div className="flex items-center justify-center mb-2">
              <div className="p-3 bg-primary/10 rounded-full">
                <KeyRound className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              تم إرسال كود التحقق إلى <span className="font-medium text-foreground" dir="ltr">{email}</span>
            </p>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">كود التحقق</label>
              <input
                ref={otpRef}
                type="text" inputMode="numeric" value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="------" required dir="ltr"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button type="submit" disabled={loading || otp.length < 4}
              className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition disabled:opacity-60">
              {loading ? "جاري التأكيد..." : "تأكيد الكود"}
            </button>

            <div className="text-center text-sm">
              {cooldown > 0 ? (
                <span className="text-muted-foreground">إعادة إرسال الكود بعد {cooldown} ثانية</span>
              ) : (
                <button type="button" onClick={handleResend} disabled={loading}
                  className="text-primary hover:underline">
                  إعادة إرسال الكود
                </button>
              )}
            </div>

            <button type="button" onClick={() => setStep("email")}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition">
              ← تغيير البريد الإلكتروني
            </button>
          </form>
        )}

        {/* ── Step 3: New Password ── */}
        {step === "newPassword" && (
          <form onSubmit={handleResetPassword} className="space-y-4" noValidate>
            <div className="flex items-center justify-center mb-2">
              <div className="p-3 bg-primary/10 rounded-full">
                <KeyRound className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">كلمة المرور الجديدة</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"} value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="••••••••" required minLength={6} dir="ltr"
                  className="w-full px-4 py-2 pl-10 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">تأكيد كلمة المرور</label>
              <input
                type={showPw ? "text" : "password"} value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="••••••••" required dir="ltr"
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition disabled:opacity-60">
              {loading ? "جاري التغيير..." : "تغيير كلمة المرور"}
            </button>
          </form>
        )}

        {/* ── Step 4: Done ── */}
        {step === "done" && (
          <div className="text-center py-4">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-green-100 rounded-full">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <p className="text-foreground mb-6">تم تغيير كلمة المرور بنجاح!</p>
            <button onClick={onClose}
              className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition">
              تسجيل الدخول
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
