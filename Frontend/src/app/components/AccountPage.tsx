// ============================================================
// AccountPage.tsx — متصل بـ:
//   GET  /api/Account/profile
//   POST /api/Account/change-password
//   DELETE /api/Account
// ============================================================
import { useState, useEffect } from "react";
import { accountApi } from "@/services/api";
import { authService } from "@/services/authService";
import type { UserProfile, ChangePasswordDTO } from "@/types/api.types";
import { Gender, MaritalStatus, ReligiousStatus } from "@/types/api.types";

type Tab = "profile" | "password" | "danger";

const GENDER_LABEL: Record<number, string> = {
  [Gender.Male]: "ذكر",
  [Gender.Female]: "أنثى",
};

const MARITAL_LABEL: Record<number, string> = {
  [MaritalStatus.Single]: "أعزب / عزباء",
  [MaritalStatus.Married]: "متزوج / متزوجة",
  [MaritalStatus.Divorced]: "مطلق / مطلقة",
  [MaritalStatus.Widowed]: "أرمل / أرملة",
};

const RELIGIOUS_LABEL: Record<number, string> = {
  [ReligiousStatus.Islam]: "مسلم / مسلمة",
  [ReligiousStatus.Christianity]: "مسيحي / مسيحية",
};

export function AccountPage() {
  const [tab, setTab] = useState<Tab>("profile");

  // ── Profile ────────────────────────────────────────────────
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  // ── Change Password ────────────────────────────────────────
  const [pwForm, setPwForm] = useState<ChangePasswordDTO>({
    currentPassword: "",
    newPassword: "",
  });
  const [pwConfirm, setPwConfirm] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSuccess, setPwSuccess] = useState(false);

  // ── Delete Account ─────────────────────────────────────────
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // جلب بيانات الملف الشخصي عند فتح الصفحة
  useEffect(() => {
    accountApi
      .getProfile()
      .then(setProfile)
      .catch((err: unknown) =>
        setProfileError(err instanceof Error ? err.message : "فشل تحميل البيانات")
      )
      .finally(() => setProfileLoading(false));
  }, []);

  // ── Handlers ───────────────────────────────────────────────
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwConfirm) {
      setPwError("كلمة المرور الجديدة مش متطابقة");
      return;
    }
    if (pwForm.newPassword.length < 6) {
      setPwError("كلمة المرور لازم تكون 6 أحرف على الأقل");
      return;
    }
    setPwLoading(true);
    setPwError(null);
    setPwSuccess(false);
    try {
      await accountApi.changePassword(pwForm);
      setPwSuccess(true);
      setPwForm({ currentPassword: "", newPassword: "" });
      setPwConfirm("");
    } catch (err: unknown) {
      setPwError(err instanceof Error ? err.message : "فشل تغيير كلمة المرور");
    } finally {
      setPwLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "احذف حسابي") {
      setDeleteError('اكتب "احذف حسابي" للتأكيد');
      return;
    }
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      await accountApi.deleteAccount();
      authService.logout();
      window.location.href = "/";
    } catch (err: unknown) {
      setDeleteError(err instanceof Error ? err.message : "فشل حذف الحساب");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    window.location.href = "/login";
  };

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-20">
        <h1 className="text-2xl font-bold text-foreground mb-6">حسابي</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          {(["profile", "password", "danger"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 px-4 text-sm font-medium transition border-b-2 -mb-px ${
                tab === t
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "profile" ? "بياناتي" : t === "password" ? "كلمة المرور" : "خطر"}
            </button>
          ))}
        </div>

        {/* ── Profile Tab ──────────────────────────────────── */}
        {tab === "profile" && (
          <div>
            {profileLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-12 rounded-lg bg-muted animate-pulse" />
                ))}
              </div>
            ) : profileError ? (
              <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-center">
                {profileError}
              </div>
            ) : profile ? (
              <div className="space-y-3">
                <ProfileField label="الاسم الكامل" value={profile.fullName} />
                <ProfileField label="البريد الإلكتروني" value={profile.email} />
                <ProfileField label="رقم الهاتف" value={profile.phoneNumber} />
                <ProfileField label="الرقم القومي" value={profile.nationalId} />
                <ProfileField label="العنوان" value={profile.address} />
                <ProfileField
                  label="تاريخ الميلاد"
                  value={profile.dateOfBirth?.split("T")[0]}
                />
                <ProfileField
                  label="الجنس"
                  value={profile.gender !== undefined ? GENDER_LABEL[profile.gender] : undefined}
                />
                <ProfileField
                  label="الحالة الاجتماعية"
                  value={profile.maritalStatus !== undefined ? MARITAL_LABEL[profile.maritalStatus] : undefined}
                />
                <ProfileField
                  label="الديانة"
                  value={profile.religiousStatus !== undefined ? RELIGIOUS_LABEL[profile.religiousStatus] : undefined}
                />
              </div>
            ) : null}

            <button
              onClick={handleLogout}
              className="mt-8 w-full py-2.5 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 transition font-medium"
            >
              تسجيل الخروج
            </button>
          </div>
        )}

        {/* ── Password Tab ─────────────────────────────────── */}
        {tab === "password" && (
          <form onSubmit={handlePasswordChange} className="space-y-4" noValidate>
            {pwError && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {pwError}
              </div>
            )}
            {pwSuccess && (
              <div className="p-3 rounded-lg bg-green-500/10 text-green-600 text-sm">
                ✅ تم تغيير كلمة المرور بنجاح
              </div>
            )}

            <Field label="كلمة المرور الحالية">
              <input
                type="password"
                value={pwForm.currentPassword}
                onChange={(e) =>
                  setPwForm((p) => ({ ...p, currentPassword: e.target.value }))
                }
                required
                className={inputCls}
                dir="ltr"
              />
            </Field>

            <Field label="كلمة المرور الجديدة">
              <input
                type="password"
                value={pwForm.newPassword}
                onChange={(e) =>
                  setPwForm((p) => ({ ...p, newPassword: e.target.value }))
                }
                required
                minLength={6}
                className={inputCls}
                dir="ltr"
              />
            </Field>

            <Field label="تأكيد كلمة المرور الجديدة">
              <input
                type="password"
                value={pwConfirm}
                onChange={(e) => setPwConfirm(e.target.value)}
                required
                className={inputCls}
                dir="ltr"
              />
            </Field>

            <button
              type="submit"
              disabled={pwLoading}
              className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition disabled:opacity-60"
            >
              {pwLoading ? "جاري الحفظ..." : "تغيير كلمة المرور"}
            </button>
          </form>
        )}

        {/* ── Danger Tab ───────────────────────────────────── */}
        {tab === "danger" && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <h3 className="font-semibold text-destructive mb-1">حذف الحساب نهائياً</h3>
              <p className="text-sm text-muted-foreground">
                لو حذفت حسابك مش هتقدر ترجعه. كل بياناتك هتتمسح.
              </p>
            </div>

            {deleteError && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {deleteError}
              </div>
            )}

            <Field label='اكتب "احذف حسابي" للتأكيد'>
              <input
                type="text"
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                className={inputCls}
                placeholder="احذف حسابي"
              />
            </Field>

            <button
              onClick={handleDeleteAccount}
              disabled={deleteLoading}
              className="w-full py-2.5 rounded-lg bg-destructive text-white font-semibold hover:bg-destructive/90 transition disabled:opacity-60"
            >
              {deleteLoading ? "جاري الحذف..." : "حذف الحساب نهائياً"}
            </button>
          </div>
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

function ProfileField({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value ?? "—"}</span>
    </div>
  );
}
