// ============================================================
// RegisterPage.tsx — خطوتين:
//   الخطوة 1: إيميل + كلمة مرور + تأكيد
//   الخطوة 2: صورة البطاقة + البيانات الشخصية
// ============================================================
import { useState, useRef } from "react";
import { authApi } from "@/services/api";
import { Gender, MaritalStatus, ReligiousStatus } from "@/types/api.types";
import type { RegisterDTO } from "@/types/api.types";

type Step = 1 | 2 | 3;

const MARITAL_OPTIONS = [
  { value: "", label: "اختر الحالة الاجتماعية" },
  { value: MaritalStatus.Single, label: "أعزب / عزباء" },
  { value: MaritalStatus.Married, label: "متزوج / متزوجة" },
  { value: MaritalStatus.Divorced, label: "مطلق / مطلقة" },
  { value: MaritalStatus.Widowed, label: "أرمل / أرملة" },
];

export function RegisterPage() {
  const [step, setStep] = useState<Step>(1);

  // ── Step 1 fields ──
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step1Error, setStep1Error] = useState<string | null>(null);

  // ── Step 2 fields ──
  const [idCardImage, setIdCardImage] = useState<File | null>(null);
  const [idCardPreview, setIdCardPreview] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState<Gender>(Gender.Male);
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus | "">("");
  const [religiousStatus, setReligiousStatus] = useState<ReligiousStatus | "">("");
  const [occupation, setOccupation] = useState("");
  const [step2Error, setStep2Error] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);

  const idCardRef = useRef<HTMLInputElement>(null);

  // ── Step 1: التحقق والمتابعة ──────────────────────────────
  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep1Error(null);

    if (!email || !password || !confirmPassword) {
      setStep1Error("من فضلك املأ كل الخانات");
      return;
    }
    if (password.length < 6) {
      setStep1Error("كلمة المرور لازم تكون 6 أحرف على الأقل");
      return;
    }
    if (password !== confirmPassword) {
      setStep1Error("كلمة المرور مش متطابقة");
      return;
    }
    setStep(2);
  };

  // ── رفع صورة البطاقة ──────────────────────────────────────
  const handleIdCard = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIdCardImage(file);
    setIdCardPreview(URL.createObjectURL(file));
    setScanning(true);

    try {
      const extracted = await authApi.scanIdCard(file);
      if (extracted.fullName) setFullName(extracted.fullName);
      if (extracted.nationalId) setNationalId(extracted.nationalId);
      if (extracted.dateOfBirth) setDateOfBirth(extracted.dateOfBirth);
      if (extracted.address) setAddress(extracted.address);
      if (extracted.gender !== undefined) setGender(extracted.gender as Gender);
    } catch {
      // لو فشل الـ scan، المستخدم يكمل يدوياً
    } finally {
      setScanning(false);
    }
  };

  // ── Step 2: إرسال ─────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep2Error(null);

    if (!idCardImage) {
      setStep2Error("صورة البطاقة مطلوبة");
      return;
    }
    if (!fullName || !address || !nationalId || !dateOfBirth || !phoneNumber) {
      setStep2Error("من فضلك املأ كل الخانات");
      return;
    }
    if (maritalStatus === "") {
      setStep2Error("من فضلك اختر الحالة الاجتماعية");
      return;
    }

    setLoading(true);
    try {
      await authApi.register({
        Occupation: occupation || " ", // workaround: backend bug
        Email: email,
        Password: password,
        FullName: fullName,
        Address: address,
        NationalId: nationalId,
        DateOfBirth: dateOfBirth,
        PhoneNumber: phoneNumber,
        Gender: gender,
        MaritalStatus: maritalStatus as MaritalStatus,
        ReligiousStatus: religiousStatus as ReligiousStatus,
        IdCardImage: idCardImage,
      } as RegisterDTO);
      setStep(3);
    } catch (err: unknown) {
      setStep2Error(err instanceof Error ? err.message : "حدث خطأ، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  // ── Done ──────────────────────────────────────────────────
  if (step === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-card border border-border text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">تم إنشاء الحساب!</h1>
          <p className="text-muted-foreground mb-6">يمكنك الآن تسجيل الدخول</p>
          <a
            href="/login"
            className="inline-block px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
          >
            تسجيل الدخول
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-20">
      <div className="w-full max-w-lg p-8 rounded-2xl shadow-lg bg-card border border-border">

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-8">
          <StepDot active={step >= 1} done={step > 1} label="1" />
          <div className={`flex-1 h-0.5 transition-colors ${step > 1 ? "bg-primary" : "bg-border"}`} />
          <StepDot active={step >= 2} done={step > 2} label="2" />
        </div>

        {/* ══════════════════════════════════════ */}
        {/* STEP 1 — إيميل وكلمة مرور            */}
        {/* ══════════════════════════════════════ */}
        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold text-foreground mb-1">إنشاء حساب</h1>
            <p className="text-muted-foreground text-sm mb-6">أدخل بياناتك للبدء</p>

            {step1Error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {step1Error}
              </div>
            )}

            <form onSubmit={handleStep1} className="space-y-4" noValidate>
              <Field label="البريد الإلكتروني">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="example@email.com"
                  className={inputCls}
                  dir="ltr"
                />
              </Field>

              <Field label="كلمة المرور">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className={inputCls}
                  dir="ltr"
                />
              </Field>

              <Field label="تأكيد كلمة المرور">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className={inputCls}
                  dir="ltr"
                />
              </Field>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
              >
                متابعة ←
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              عندك حساب؟{" "}
              <a href="/login" className="text-primary hover:underline font-medium">
                سجّل دخولك
              </a>
            </p>
          </>
        )}

        {/* ══════════════════════════════════════ */}
        {/* STEP 2 — البيانات الشخصية             */}
        {/* ══════════════════════════════════════ */}
        {step === 2 && (
          <>
            <h1 className="text-2xl font-bold text-foreground mb-1">بياناتك الشخصية</h1>
            <p className="text-muted-foreground text-sm mb-6">
              ارفع صورة البطاقة وهنملأ البيانات تلقائياً
            </p>

            {step2Error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {step2Error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>

              {/* صورة البطاقة */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  صورة بطاقة الهوية *
                </label>
                <div
                  onClick={() => idCardRef.current?.click()}
                  className="border-2 border-dashed border-primary/40 rounded-xl p-5 cursor-pointer hover:bg-primary/5 transition text-center"
                >
                  {idCardPreview ? (
                    <img
                      src={idCardPreview}
                      alt="البطاقة"
                      className="mx-auto max-h-32 rounded-lg object-cover"
                    />
                  ) : (
                    <>
                      <div className="text-3xl mb-1">🪪</div>
                      <p className="text-sm text-muted-foreground">
                        {scanning ? "⏳ جاري استخراج البيانات..." : "اضغط لرفع صورة البطاقة"}
                      </p>
                    </>
                  )}
                </div>
                <input
                  ref={idCardRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleIdCard}
                />
                {scanning && (
                  <p className="text-xs text-primary mt-1 text-center animate-pulse">
                    جاري استخراج البيانات تلقائياً...
                  </p>
                )}
              </div>

              {/* الاسم */}
              <Field label="الاسم الكامل">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className={inputCls}
                />
              </Field>

              {/* العنوان */}
              <Field label="العنوان">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className={inputCls}
                />
              </Field>

              {/* الرقم القومي */}
              <Field label="الرقم القومي">
                <input
                  type="text"
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                  required
                  className={inputCls}
                  dir="ltr"
                />
              </Field>

              {/* تاريخ الميلاد */}
              <Field label="تاريخ الميلاد">
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                  className={inputCls}
                />
              </Field>

              {/* رقم الهاتف */}
              <Field label="رقم الهاتف">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className={inputCls}
                  dir="ltr"
                />
              </Field>

              <Field label="المهنة">
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  required
                  placeholder="مثال: مهندس، طبيب، طالب..."
                  className={inputCls}
                />
              </Field>

              {/* الجنس — Radio Buttons */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  الجنس
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={Gender.Male}
                      checked={gender === Gender.Male}
                      onChange={() => setGender(Gender.Male)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm text-foreground">ذكر</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={Gender.Female}
                      checked={gender === Gender.Female}
                      onChange={() => setGender(Gender.Female)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm text-foreground">أنثى</span>
                  </label>
                </div>
              </div>

              {/* الحالة الاجتماعية — Combobox */}
              <Field label="الحالة الاجتماعية">
                <select
                  value={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value as MaritalStatus | "")}
                  className={inputCls}
                >
                  {MARITAL_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value} disabled={o.value === ""}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>

              {/* الديانة — Combobox */}
              <Field label="الديانة">
                <select
                  value={religiousStatus}
                  onChange={(e) => setReligiousStatus(e.target.value as ReligiousStatus | "")}
                  className={inputCls}
                >
                  <option value="" disabled>اختر الديانة</option>
                  <option value={ReligiousStatus.Islam}>مسلم / مسلمة</option>
                  <option value={ReligiousStatus.Christianity}>مسيحي / مسيحية</option>
                </select>
              </Field>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-2.5 rounded-lg border border-input text-foreground hover:bg-muted transition"
                >
                  → رجوع
                </button>
                <button
                  type="submit"
                  disabled={loading || scanning}
                  className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition disabled:opacity-60"
                >
                  {loading ? "جاري الإنشاء..." : "إنشاء الحساب"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────
const inputCls =
  "w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
      {children}
    </div>
  );
}

function StepDot({ active, done, label }: { active: boolean; done: boolean; label: string }) {
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
        done
          ? "bg-primary text-primary-foreground"
          : active
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground"
      }`}
    >
      {done ? "✓" : label}
    </div>
  );
}
