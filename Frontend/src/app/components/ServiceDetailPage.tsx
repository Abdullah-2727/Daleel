// ============================================================
// ServiceDetailPage.tsx — متصل بـ GET /api/Services/{id}
// ============================================================
import { useState, useEffect } from "react";
import { servicesApi } from "@/services/api";
import type { ServiceDTO } from "@/types/api.types";
import {
  Clock, CheckCircle2, FileText, AlertCircle,
  Sparkles, MessageCircle, ChevronRight, ExternalLink
} from "lucide-react";

interface ServiceDetailPageProps {
  serviceId: string;
  currentLang: "ar";
  onPageChange: (page: string) => void;
  onOpenChatbot?: () => void;
}

export function ServiceDetailPage({
  serviceId,
  onPageChange,
  onOpenChatbot,
}: ServiceDetailPageProps) {
  const [service, setService] = useState<ServiceDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = Number(serviceId);
    if (isNaN(id)) {
      setError("معرف الخدمة غير صحيح");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    servicesApi
      .getById(id)
      .then(setService)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "فشل تحميل الخدمة")
      )
      .finally(() => setLoading(false));
  }, [serviceId]);

  // ── Loading ───────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-48 bg-muted animate-pulse" />
        <div className="max-w-5xl mx-auto px-4 py-20 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────
  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="text-destructive mb-4">{error ?? "الخدمة غير موجودة"}</p>
          <button
            onClick={() => onPageChange("government")}
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition"
          >
            العودة للخدمات
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">

      {/* ── Header ── */}
      <section className="bg-gradient-to-br from-[#B01E28] via-[#8B1721] to-[#B01E28] py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/80 mb-4 text-sm">
            <button
              onClick={() => onPageChange("government")}
              className="hover:text-white transition-colors"
            >
              الخدمات الحكومية
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{service.name}</span>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-5xl">📋</div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{service.name}</h1>
              {service.ministry && (
                <p className="text-white/80 text-lg mb-2">🏛️ {service.ministry}</p>
              )}
              {service.description && (
                <p className="text-white/70">{service.description}</p>
              )}
            </div>
            {/* الرسوم */}
            <div className="bg-white/20 rounded-xl px-4 py-3 text-center shrink-0">
              <p className="text-white/70 text-xs mb-1">الرسوم</p>
              <p className="text-white font-bold text-lg">
                {service.fee === 0 ? "مجاني" : `${service.fee} جنيه`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-4 py-20 space-y-6">

        {/* وقت المعالجة */}
        {service.EstimatedTime && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200">
            <Clock className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900">المدة المتوقعة للمعالجة</p>
              <p className="text-blue-700">{service.EstimatedTime}</p>
            </div>
          </div>
        )}

        {/* من يستطيع التقديم */}
        {service.whoCanApply && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              من يستطيع التقديم؟
            </h2>
            <p className="text-muted-foreground">{service.whoCanApply}</p>
          </div>
        )}

        {/* المستندات المطلوبة */}
        {service.requiredDocuments && service.requiredDocuments.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              المستندات المطلوبة
            </h2>
            <ul className="space-y-2">
              {service.requiredDocuments.map((doc, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-foreground">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* الشروط والأحكام */}
        {service.termsAndConditions && service.termsAndConditions.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              الشروط والأحكام
            </h2>
            <ul className="space-y-2">
              {service.termsAndConditions.map((term, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-primary font-bold shrink-0">{i + 1}.</span>
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* خدمات مشابهة */}
        {service.similarServices && service.similarServices.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">خدمات مشابهة</h2>
            <div className="flex flex-wrap gap-2">
              {service.similarServices.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* تقديم الطلب بالمساعد */}
          <div className="bg-gradient-to-br from-[#B01E28] to-[#8B1721] rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-xl">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">قدّم طلبك تلقائياً</h3>
                <p className="text-white/80 text-sm">المساعد الذكي سيملأ النموذج نيابةً عنك</p>
              </div>
            </div>
            <button
              onClick={() => onPageChange("chatbot")}
              className="w-full py-2.5 rounded-lg bg-white text-[#B01E28] font-semibold hover:bg-gray-100 transition"
            >
              <Sparkles className="w-4 h-4 inline ml-1" />
              ابدأ التقديم
            </button>
          </div>

          {/* اسأل المساعد */}
          <div className="bg-gradient-to-br from-[#E5B80B] to-[#C9A009] rounded-xl p-6 text-[#06141B]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/30 rounded-xl">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">اسأل المساعد الذكي</h3>
                <p className="text-[#06141B]/70 text-sm">احصل على إجابات فورية لأسئلتك</p>
              </div>
            </div>
            <button
              onClick={onOpenChatbot}
              className="w-full py-2.5 rounded-lg bg-white text-[#E5B80B] font-semibold hover:bg-gray-100 transition"
            >
              <MessageCircle className="w-4 h-4 inline ml-1" />
              ابدأ المحادثة
            </button>
          </div>
        </div>

        {/* زيارة الموقع الرسمي */}
        <div className="flex items-start gap-4 p-5 rounded-xl bg-blue-50 border border-blue-200">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">معلومات إضافية</h4>
            <p className="text-blue-800 text-sm mb-3">
              للمزيد من المعلومات يمكنك التواصل مع المساعد الذكي أو زيارة الموقع الرسمي للوزارة.
            </p>
            <button
              onClick={() => onPageChange("ministries")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              صفحة الوزارة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
