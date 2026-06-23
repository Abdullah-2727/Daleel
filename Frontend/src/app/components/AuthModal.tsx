// ============================================================
// AuthModal.tsx — متصل بـ:
//   POST /api/Auth/login
//   POST /api/Auth/register (multipart/form-data)
//   POST /api/Auth/id-card-scan
// Fields: Email, Password, FullName, Address, NationalId,
//         DateOfBirth, PhoneNumber, Occupation, Gender,
//         ReligiousStatus, MaritalStatus, IdCardImage
// ============================================================
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { authApi } from "@/services/api";
import { Gender, MaritalStatus, ReligiousStatus } from "@/types/api.types";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { ForgotPasswordFlow } from "./ForgotPasswordFlow";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: "en" | "ar";
  onLoginSuccess: (user: any) => void;
  onRegisterSuccess: (user: any) => void;
}

type RegStep = 1 | 2;

const MARITAL_OPTIONS = [
  { value: "", label: "اختر الحالة الاجتماعية" },
  { value: MaritalStatus.Single, label: "أعزب / عزباء" },
  { value: MaritalStatus.Married, label: "متزوج / متزوجة" },
  { value: MaritalStatus.Divorced, label: "مطلق / مطلقة" },
  { value: MaritalStatus.Widowed, label: "أرمل / أرملة" },
];

const RELIGIOUS_OPTIONS = [
  { value: "", label: "اختر الديانة" },
  { value: ReligiousStatus.Islam, label: "الإسلام" },
  { value: ReligiousStatus.Christianity, label: "المسيحية" },
];

export function AuthModal({ isOpen, onClose, currentLang, onLoginSuccess, onRegisterSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState("login");

  // ── Login ─────────────────────────────────────────────────
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  // ── Register Step ──────────────────────────────────────────
  const [regStep, setRegStep] = useState<RegStep>(1);

  // Step 1
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showRegPw, setShowRegPw] = useState(false);
  const [step1Error, setStep1Error] = useState<string | null>(null);

  // Step 2
  const [idCardImage, setIdCardImage] = useState<File | null>(null);
  const [idCardPreview, setIdCardPreview] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [gender, setGender] = useState<Gender>(Gender.Male);
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus | "">("");
  const [religiousStatus, setReligiousStatus] = useState<ReligiousStatus | "">("");
  const [scanning, setScanning] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [step2Error, setStep2Error] = useState<string | null>(null);

  const idCardRef = useRef<HTMLInputElement>(null);

  // Blur the background when modal is open
  useEffect(() => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.style.filter = isOpen ? "blur(4px)" : "";
      mainContent.style.transition = "filter 0.2s ease";
    }
    return () => {
      if (mainContent) mainContent.style.filter = "";
    };
  }, [isOpen]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setLoginError(null);
    setStep1Error(null);
    setStep2Error(null);
    setRegStep(1);
  };

  // ── Login ─────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    if (!loginEmail || !loginPassword) { setLoginError("من فضلك ادخل الإيميل وكلمة المرور"); return; }
    setLoginLoading(true);
    try {
      const data = await authApi.login({ email: loginEmail, password: loginPassword });
      onLoginSuccess({
        id: data.user?.id ?? "",
        name: data.user?.fullName ?? loginEmail,
        email: loginEmail,
        phone: data.user?.phoneNumber ?? "",
        location: data.user?.address ?? "",
        joinDate: data.user?.createdAt ?? "",
        avatar: data.user?.profilePictureUrl ?? "",
        status: "active",
        nationalId: data.user?.nationalId ?? "",
        isVerified: true,
      });
      onClose();
      toast.success("تم تسجيل الدخول بنجاح!");
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : "بيانات غلط، حاول تاني");
    } finally {
      setLoginLoading(false);
    }
  };

  // ── Register Step 1 ───────────────────────────────────────
  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep1Error(null);
    if (!email || !password || !confirmPassword) { setStep1Error("من فضلك املأ كل الخانات"); return; }
    if (password.length < 6) { setStep1Error("كلمة المرور لازم تكون 6 أحرف على الأقل"); return; }
    if (password !== confirmPassword) { setStep1Error("كلمة المرور مش متطابقة"); return; }
    setRegStep(2);
  };

  // ── ID Card Scan ──────────────────────────────────────────
  const handleIdCard = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIdCardImage(file);
    setIdCardPreview(URL.createObjectURL(file));
    setScanning(true);
    try {
      const extracted = await authApi.scanIdCard(file);
      if (extracted.isReliable) {
        if (extracted.fullName) setFullName(extracted.fullName);
        if (extracted.nationalId) setNationalId(extracted.nationalId);
        if (extracted.dateOfBirth) setDateOfBirth(extracted.dateOfBirth);
        if (extracted.address) setAddress(extracted.address);
      } else {
        if (extracted.fullName) setFullName(extracted.fullName);
        if (extracted.nationalId) setNationalId(extracted.nationalId);
        if (extracted.dateOfBirth) setDateOfBirth(extracted.dateOfBirth);
        if (extracted.address) setAddress(extracted.address);
        setStep2Error("تم استخراج البيانات لكن الصورة غير واضحة — تأكد من صحة البيانات");
      }
    } catch { /* يكمل يدوياً */ }
    finally { setScanning(false); }
  };

  // ── Register Step 2 Submit ────────────────────────────────
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep2Error(null);
    if (!idCardImage) { setStep2Error("صورة البطاقة مطلوبة"); return; }
    if (!fullName || !address || !nationalId || !dateOfBirth || !phoneNumber) {
      setStep2Error("من فضلك املأ كل الخانات"); return;
    }
    if (maritalStatus === "") { setStep2Error("من فضلك اختر الحالة الاجتماعية"); return; }
    if (religiousStatus === "") { setStep2Error("من فضلك اختر الديانة"); return; }

    setRegLoading(true);
    try {
      await authApi.register({
        Email: email,
        Password: password,
        FullName: fullName,
        Address: address,
        NationalId: nationalId,
        DateOfBirth: dateOfBirth,
        PhoneNumber: phoneNumber,
        Occupation: occupation || " ", // workaround: backend يطلبه بس مش عامل عمود في الـ DB
        Gender: gender,
        MaritalStatus: maritalStatus as MaritalStatus,
        ReligiousStatus: religiousStatus as ReligiousStatus,
        IdCardImage: idCardImage,
      });
      // بعد الـ register، عمل login تلقائي عشان نجيب الـ token والـ user data
      try {
        const loginData = await authApi.login({ email, password });
        onRegisterSuccess({
          id: loginData.user?.id ?? "",
          name: loginData.user?.fullName ?? fullName,
          email: loginData.user?.email ?? email,
          phone: loginData.user?.phoneNumber ?? "",
          location: loginData.user?.address ?? "",
          joinDate: loginData.user?.createdAt ?? "",
          avatar: loginData.user?.profilePictureUrl ?? "",
          status: "active",
          nationalId: loginData.user?.nationalId ?? "",
          isVerified: true,
        });
      } catch {
        // لو الـ auto-login فشل، رجّع البيانات الأساسية
        onRegisterSuccess({ id: "", name: fullName, email, phone: "", location: "", joinDate: "", avatar: "", status: "active", nationalId: "", isVerified: false });
      }
      onClose();
      toast.success("تم إنشاء الحساب بنجاح! مرحباً " + fullName);
    } catch (err: unknown) {
      setStep2Error(err instanceof Error ? err.message : "حدث خطأ، حاول مرة أخرى");
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-center text-primary">
            {activeTab === "login" ? "تسجيل الدخول" : "إنشاء حساب"}
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            {activeTab === "login" ? "أدخل بياناتك للوصول لحسابك" : "سجّل للاستفادة من الخدمات الحكومية"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">دخول</TabsTrigger>
            <TabsTrigger value="register">تسجيل</TabsTrigger>
          </TabsList>

          {/* ════════ LOGIN ════════ */}
          <TabsContent value="login" className="mt-4">
            {loginError && <ErrorBox msg={loginError} />}
            <form onSubmit={handleLogin} className="space-y-4" noValidate>
              <Field label="البريد الإلكتروني">
                <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                  placeholder="example@email.com" className={inputCls} dir="ltr" required />
              </Field>
              <Field label="كلمة المرور">
                <div className="relative">
                  <input type={showLoginPw ? "text" : "password"} value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)} placeholder="••••••••"
                    className={inputCls + " pl-10"} dir="ltr" required />
                  <button type="button" onClick={() => setShowLoginPw(!showLoginPw)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showLoginPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </Field>

              <div className="text-left -mt-1">
                <button
                  type="button"
                  onClick={() => setForgotPasswordOpen(true)}
                  className="text-sm text-primary hover:underline"
                >
                  نسيت كلمة المرور؟
                </button>
              </div>

              <button type="submit" disabled={loginLoading}
                className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition disabled:opacity-60">
                {loginLoading ? "جاري الدخول..." : "دخول"}
              </button>
            </form>
          </TabsContent>

          {/* ════════ REGISTER ════════ */}
          <TabsContent value="register" className="mt-4">
            {/* Progress */}
            <div className="flex items-center gap-2 mb-6">
              <StepDot active={regStep >= 1} done={regStep > 1} label="1" />
              <div className={`flex-1 h-0.5 transition-colors ${regStep > 1 ? "bg-primary" : "bg-border"}`} />
              <StepDot active={regStep >= 2} done={false} label="2" />
            </div>

            {/* Step 1 */}
            {regStep === 1 && (
              <>
                {step1Error && <ErrorBox msg={step1Error} />}
                <form onSubmit={handleStep1} className="space-y-4" noValidate>
                  <Field label="البريد الإلكتروني">
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="example@email.com" className={inputCls} dir="ltr" required />
                  </Field>
                  <Field label="كلمة المرور">
                    <div className="relative">
                      <input type={showRegPw ? "text" : "password"} value={password}
                        onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                        className={inputCls + " pl-10"} dir="ltr" required />
                      <button type="button" onClick={() => setShowRegPw(!showRegPw)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showRegPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </Field>
                  <Field label="تأكيد كلمة المرور">
                    <input type={showRegPw ? "text" : "password"} value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••"
                      className={inputCls} dir="ltr" required />
                  </Field>
                  <button type="submit"
                    className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition">
                    متابعة ←
                  </button>
                </form>
              </>
            )}

            {/* Step 2 */}
            {regStep === 2 && (
              <>
                {step2Error && <ErrorBox msg={step2Error} />}
                <form onSubmit={handleRegister} className="space-y-4" noValidate>

                  {/* صورة البطاقة */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">صورة بطاقة الهوية *</label>
                    <div onClick={() => idCardRef.current?.click()}
                      className="border-2 border-dashed border-primary/40 rounded-xl p-4 cursor-pointer hover:bg-primary/5 transition text-center">
                      {idCardPreview ? (
                        <img src={idCardPreview} alt="البطاقة" className="mx-auto max-h-24 rounded-lg object-cover" />
                      ) : (
                        <>
                          <div className="text-2xl mb-1">🪪</div>
                          <p className="text-sm text-muted-foreground">
                            {scanning ? "⏳ جاري استخراج البيانات..." : "اضغط لرفع صورة البطاقة"}
                          </p>
                        </>
                      )}
                    </div>
                    <input ref={idCardRef} type="file" accept="image/*" className="hidden" onChange={handleIdCard} />
                    {scanning && (
                      <p className="text-xs text-primary mt-1 text-center animate-pulse">جاري استخراج البيانات تلقائياً...</p>
                    )}
                  </div>

                  <Field label="الاسم الكامل">
                    <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required className={inputCls} />
                  </Field>

                  <Field label="العنوان">
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} required className={inputCls} />
                  </Field>

                  <Field label="الرقم القومي">
                    <input type="text" value={nationalId} onChange={e => setNationalId(e.target.value)} required className={inputCls} dir="ltr" />
                  </Field>

                  <Field label="تاريخ الميلاد">
                    <input type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} required className={inputCls} />
                  </Field>

                  <Field label="رقم الهاتف">
                    <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required className={inputCls} dir="ltr" />
                  </Field>

                  <Field label="المهنة">
                    <input type="text" value={occupation} onChange={e => setOccupation(e.target.value)}
                      required placeholder="مثال: مهندس، طبيب، طالب..." className={inputCls} />
                  </Field>

                  {/* الجنس */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">الجنس</label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="gender" checked={gender === Gender.Male}
                          onChange={() => setGender(Gender.Male)} className="w-4 h-4 accent-primary" />
                        <span className="text-sm text-foreground">ذكر</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="gender" checked={gender === Gender.Female}
                          onChange={() => setGender(Gender.Female)} className="w-4 h-4 accent-primary" />
                        <span className="text-sm text-foreground">أنثى</span>
                      </label>
                    </div>
                  </div>

                  {/* الحالة الاجتماعية */}
                  <Field label="الحالة الاجتماعية">
                    <select value={maritalStatus} onChange={e => setMaritalStatus(e.target.value as MaritalStatus | "")} className={inputCls}>
                      {MARITAL_OPTIONS.map(o => (
                        <option key={o.value} value={o.value} disabled={o.value === ""}>{o.label}</option>
                      ))}
                    </select>
                  </Field>

                  {/* الديانة */}
                  <Field label="الديانة">
                    <select value={religiousStatus} onChange={e => setReligiousStatus(e.target.value as ReligiousStatus | "")} className={inputCls}>
                      {RELIGIOUS_OPTIONS.map(o => (
                        <option key={o.value} value={o.value} disabled={o.value === ""}>{o.label}</option>
                      ))}
                    </select>
                  </Field>

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setRegStep(1)}
                      className="flex-1 py-2.5 rounded-lg border border-input text-foreground hover:bg-muted transition">
                      → رجوع
                    </button>
                    <button type="submit" disabled={regLoading || scanning}
                      className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition disabled:opacity-60">
                      {regLoading ? "جاري الإنشاء..." : "إنشاء الحساب"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>

      <ForgotPasswordFlow
        isOpen={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
        initialEmail={loginEmail}
      />
    </Dialog>
  );
}

// ── Helpers ───────────────────────────────────────────────────
const inputCls = "w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
      {children}
    </div>
  );
}

function ErrorBox({ msg }: { msg: string }) {
  return <div className="mb-3 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{msg}</div>;
}

function StepDot({ active, done, label }: { active: boolean; done: boolean; label: string }) {
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
      done ? "bg-primary text-primary-foreground" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
    }`}>
      {done ? "✓" : label}
    </div>
  );
}
