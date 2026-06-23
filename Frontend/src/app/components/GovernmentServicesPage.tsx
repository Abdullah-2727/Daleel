// ============================================================
// GovernmentServicesPage.tsx — مع Service Details Modal + زرار Automation
// GET /api/Services + GET /api/Services/{id} + GET /api/Ministries
// ============================================================
import { useState, useEffect, useCallback } from "react";
import { servicesApi, ministriesApi } from "@/services/api";
import type { ServiceDTO, MinistryDTO } from "@/types/api.types";
import {
  X, Search, Clock, FileText, CheckCircle2,
  AlertCircle, Sparkles, ChevronLeft
} from "lucide-react";

const PAGE_SIZE = 10;

interface GovernmentServicesPageProps {
  currentLang?: "ar" | "en";
  onPageChange?: (page: string, data?: any) => void;
  initialMinistryId?: number;
  initialMinistryName?: string;
}

export function GovernmentServicesPage({ onPageChange, initialMinistryId, initialMinistryName }: GovernmentServicesPageProps) {
  const [services, setServices] = useState<ServiceDTO[]>([]);
  const [ministries, setMinistries] = useState<MinistryDTO[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [ministryId, setMinistryId] = useState<number | undefined>(initialMinistryId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal
  const [selected, setSelected] = useState<ServiceDTO | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    ministriesApi.getAll({ PageSize: 100 }).then(r => setMinistries(r.data ?? [])).catch(() => {});
  }, []);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await servicesApi.getAll({
        Search: search || undefined,
        MinistryId: ministryId,
        PageIndex: page,
        PageSize: PAGE_SIZE,
      });
      setServices(result.data ?? []);
      setTotal(result.count);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "فشل تحميل الخدمات");
    } finally {
      setLoading(false);
    }
  }, [search, ministryId, page]);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  const openService = async (service: ServiceDTO) => {
    setSelected(service);
    setDetailLoading(true);
    try {
      const detail = await servicesApi.getById(service.id);
      setSelected(detail);
    } catch { /* يفضل اللي عنده */ }
    finally { setDetailLoading(false); }
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#B01E28] to-[#8B1721] pt-5 pb-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">الخدمات الحكومية</h1>
          <p className="text-white/70 mb-6">ابحث عن الخدمة وقدّم طلبك مباشرة</p>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="search"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="ابحث عن خدمة..."
                className="w-full pr-10 pl-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition"
              />
            </div>
            <select
              value={ministryId ?? ""}
              onChange={e => { setMinistryId(e.target.value ? Number(e.target.value) : undefined); setPage(1); }}
              className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:bg-white/20 transition"
            >
              <option value="" className="text-foreground bg-background">كل الوزارات</option>
              {ministries.map(m => (
                <option key={m.id} value={m.id} className="text-foreground bg-background">{m.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-destructive/10 text-destructive text-center">
            {error}
            <button onClick={fetchServices} className="mr-2 underline">إعادة المحاولة</button>
          </div>
        )}

        {!loading && !error && (
          <p className="text-sm text-muted-foreground mb-4">{total} خدمة متاحة</p>
        )}

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-24 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">لا توجد نتائج</div>
        ) : (
          <div className="space-y-3">
            {services.map(service => (
              <button
                key={service.id}
                onClick={() => openService(service)}
                className="w-full text-right p-5 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-[#B01E28]/40 hover:-translate-y-0.5 transition-all duration-200 group flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-[#B01E28]/10 group-hover:bg-[#B01E28]/20 transition shrink-0">
                  <FileText className="w-5 h-5 text-[#B01E28]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-[#B01E28] transition line-clamp-1">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{service.description}</p>
                  )}
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                    {service.ministry && <span>🏛️ {service.ministry}</span>}
                    {service.fee !== undefined && (
                      <span>💰 {service.fee === 0 ? "مجاني" : `${service.fee} جنيه`}</span>
                    )}
                    {service.processingEstimatedTime && (
                      <span>⏱️ {service.processingEstimatedTime}</span>
                    )}
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-[#B01E28] transition shrink-0 mt-1" />
              </button>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-input hover:bg-muted disabled:opacity-40 transition">السابق</button>
            <span className="px-4 py-2 text-foreground">{page} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="px-4 py-2 rounded-lg border border-input hover:bg-muted disabled:opacity-40 transition">التالي</button>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/* Service Detail Modal                                  */}
      {/* ══════════════════════════════════════════════════════ */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-card rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-br from-[#B01E28] to-[#8B1721] p-6 rounded-t-3xl relative">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 left-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="p-3 bg-white/20 rounded-xl w-fit mb-3">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">{selected.name}</h2>
              {selected.ministry && (
                <p className="text-white/70 text-sm mt-1">🏛️ {selected.ministry}</p>
              )}
              {/* الرسوم والوقت */}
              <div className="flex gap-3 mt-3">
                {selected.fee !== undefined && (
                  <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs">
                    💰 {selected.fee === 0 ? "مجاني" : `${selected.fee} جنيه`}
                  </span>
                )}
                {selected.processingEstimatedTime && (
                  <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {selected.processingEstimatedTime}
                  </span>
                )}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              {detailLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-8 rounded-lg bg-muted animate-pulse" />
                  ))}
                </div>
              ) : (
                <>
                  {selected.description && (
                    <p className="text-muted-foreground leading-relaxed">{selected.description}</p>
                  )}

                  {selected.whoCanApply && (
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                      <p className="text-xs font-medium text-blue-700 mb-1">من يستطيع التقديم؟</p>
                      <p className="text-blue-900 text-sm">{selected.whoCanApply}</p>
                    </div>
                  )}

                  {selected.requiredDocuments && selected.requiredDocuments.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-[#B01E28]" />
                        المستندات المطلوبة
                      </h4>
                      <ul className="space-y-2">
                        {selected.requiredDocuments.map((doc, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selected.termsAndConditions && selected.termsAndConditions.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 text-sm flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#B01E28]" />
                        الشروط والأحكام
                      </h4>
                      <ul className="space-y-1">
                        {selected.termsAndConditions.map((term, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex gap-2">
                            <span className="text-[#B01E28] font-bold shrink-0">{i + 1}.</span>
                            {term}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selected.similarServices && selected.similarServices.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">خدمات مشابهة</h4>
                      <div className="flex flex-wrap gap-2">
                        {selected.similarServices.map((s, i) => (
                          <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ══ زرار الأوتوميشن الرئيسي ══ */}
                  <div className="pt-2 space-y-3">
                    <button
                      onClick={() => {
                        setSelected(null);
                        onPageChange?.("chatbot");
                      }}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#B01E28] to-[#8B1721] text-white font-bold text-base hover:opacity-90 transition flex items-center justify-center gap-3 shadow-lg shadow-[#B01E28]/30"
                    >
                      <Sparkles className="w-5 h-5" />
                      تنفيذ الخدمة بالأوتوميشن
                    </button>
                    <p className="text-xs text-muted-foreground text-center">
                      المساعد الذكي سيجمع بياناتك ويقدّم الطلب نيابةً عنك تلقائياً
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
