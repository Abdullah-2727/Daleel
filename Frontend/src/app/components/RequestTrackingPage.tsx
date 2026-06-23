// ============================================================
// RequestTrackingPage.tsx — مع فلتر الترتيب وزرار Track
// ============================================================
import { useState, useEffect, useCallback } from "react";
import { requestsApi } from "@/services/api";
import { authService } from "@/services/authService";
import { RequestStatus } from "@/types/api.types";
import type { RequestDTO } from "@/types/api.types";
import { RefreshCw } from "lucide-react";

interface RequestTrackingPageProps {
  currentLang?: "ar" | "en";
  onPageChange?: (page: string) => void;
}

const STATUS_LABEL: Record<number, string> = {
  [RequestStatus.Pending]: "قيد الانتظار",
  [RequestStatus.Processing]: "جاري المعالجة",
  [RequestStatus.Completed]: "مكتمل",
  [RequestStatus.Failed]: "فشل",
};

const STATUS_COLOR: Record<number, string> = {
  [RequestStatus.Pending]: "bg-yellow-100 text-yellow-800",
  [RequestStatus.Processing]: "bg-blue-100 text-blue-800",
  [RequestStatus.Completed]: "bg-green-100 text-green-800",
  [RequestStatus.Failed]: "bg-red-100 text-red-800",
};

export function RequestTrackingPage({ onPageChange }: RequestTrackingPageProps) {
  const [requests, setRequests] = useState<RequestDTO[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "">("");
  const [search, setSearch] = useState("");
  const [isDescending, setIsDescending] = useState(true); // احدث أولاً
  const [selected, setSelected] = useState<RequestDTO | null>(null);
  const [tracking, setTracking] = useState(false); // زرار التتبع
  const [trackMessage, setTrackMessage] = useState<string | null>(null);
  const isLoggedIn = authService.isLoggedIn();
  const PAGE_SIZE = 10;

  const fetchRequests = useCallback(async () => {
    if (!isLoggedIn) return;
    setLoading(true);
    setError(null);
    try {
      const result = await requestsApi.getAll({
        Status: statusFilter !== "" ? (statusFilter as RequestStatus) : undefined,
        Search: search || undefined,
        IsDescending: isDescending,
        PageIndex: page,
        PageSize: PAGE_SIZE,
      });
      setRequests(result.data ?? []);
      setTotal(result.count);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "فشل تحميل الطلبات");
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn, statusFilter, search, isDescending, page]);

  useEffect(() => { fetchRequests(); }, [fetchRequests]);

  // زرار التتبع — يكلم GET /api/Requests/{id}/response
  const handleTrack = async (req: RequestDTO) => {
    setTracking(true);
    setTrackMessage(null);
    try {
      const response = await requestsApi.getResponse(req.id);
      if (response && response.content) {
        // في رد — حدّث الحالة لـ Completed وأضف الرد
        const updatedReq: RequestDTO = {
          ...req,
          status: RequestStatus.Completed,
          response,
        };
        setRequests(prev => prev.map(r => r.id === req.id ? updatedReq : r));
        setSelected(updatedReq);
      } else {
        setTrackMessage("لا يوجد رد بعد — جاري المعالجة");
      }
    } catch {
      // 404 = لسه مفيش رد
      setTrackMessage("لا يوجد رد بعد — جاري المعالجة");
    } finally {
      setTracking(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-20">
        <div className="text-center p-8">
          <div className="text-5xl mb-4">📋</div>
          <p className="text-muted-foreground mb-4">سجّل دخولك لمتابعة طلباتك</p>
          <button onClick={() => onPageChange?.("home")}
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition">
            تسجيل الدخول
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">طلباتي</h1>
          <button onClick={() => onPageChange?.("chatbot")}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition">
            + طلب جديد
          </button>
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input type="search" value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); setSelected(null); }}
            placeholder="ابحث في طلباتك..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />

          <select value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value as RequestStatus | ""); setPage(1); setSelected(null); }}
            className="px-4 py-2.5 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm">
            <option value="">كل الحالات</option>
            {Object.entries(STATUS_LABEL).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>

          {/* ── فلتر الترتيب — احدث / اقدم ── */}
          <div className="flex rounded-xl border border-input overflow-hidden text-sm">
            <button
              onClick={() => { setIsDescending(true); setPage(1); }}
              className={`px-4 py-2.5 transition ${isDescending ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-muted"}`}>
              الأحدث أولاً
            </button>
            <button
              onClick={() => { setIsDescending(false); setPage(1); }}
              className={`px-4 py-2.5 transition border-r border-input ${!isDescending ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-muted"}`}>
              الأقدم أولاً
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
            {error}
            <button onClick={fetchRequests} className="mr-2 underline">إعادة المحاولة</button>
          </div>
        )}

        <div className="flex gap-6">
          {/* ── List ── */}
          <div className="flex-1 space-y-3">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-20 rounded-xl bg-muted animate-pulse" />
              ))
            ) : requests.length === 0 ? (
              <div className="text-center text-muted-foreground py-20">
                <p className="mb-3">لا توجد طلبات</p>
                <button onClick={() => onPageChange?.("chatbot")} className="text-primary hover:underline text-sm">
                  ابدأ طلباً جديداً من المساعد الذكي
                </button>
              </div>
            ) : (
              requests.map(req => (
                <button key={req.id} onClick={() => { setSelected(req); setTrackMessage(null); }}
                  className={`w-full text-right p-4 rounded-xl border transition ${
                    selected?.id === req.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
                  }`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm">{req.serviceName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(req.createdAt).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${STATUS_COLOR[req.status]}`}>
                      {STATUS_LABEL[req.status]}
                    </span>
                  </div>
                  {req.note && <p className="text-xs text-muted-foreground mt-2 text-right line-clamp-1">{req.note}</p>}
                </button>
              ))
            )}

            {/* Pagination */}
            {Math.ceil(total / PAGE_SIZE) > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-input hover:bg-muted disabled:opacity-40 transition text-sm">السابق</button>
                <span className="px-4 py-2 text-foreground text-sm">{page} / {Math.ceil(total / PAGE_SIZE)}</span>
                <button onClick={() => setPage(p => Math.min(Math.ceil(total / PAGE_SIZE), p + 1))} disabled={page === Math.ceil(total / PAGE_SIZE)}
                  className="px-4 py-2 rounded-lg border border-input hover:bg-muted disabled:opacity-40 transition text-sm">التالي</button>
              </div>
            )}
          </div>

          {/* ── Detail Panel ── */}
          {selected && (
            <div className="w-72 shrink-0">
              <div className="bg-card border border-border rounded-xl p-5 sticky top-24 space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground">{selected.serviceName}</h3>
                  <span className={`mt-1 inline-block text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLOR[selected.status]}`}>
                    {STATUS_LABEL[selected.status]}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <InfoRow label="تاريخ التقديم" value={new Date(selected.createdAt).toLocaleDateString("ar-EG")} />
                  <InfoRow label="آخر تحديث" value={new Date(selected.updatedAt).toLocaleDateString("ar-EG")} />
                  {selected.note && <InfoRow label="ملاحظات" value={selected.note} />}
                </div>

                {/* بيانات الطلب */}
                {selected.requestData && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">بيانات الطلب</p>
                    <div className="bg-muted/50 rounded-lg p-2 text-xs text-foreground">
                      {(() => {
                        try {
                          const parsed = JSON.parse(selected.requestData);
                          return (
                            <ul className="space-y-1">
                              {Object.entries(parsed).map(([k, v]) => (
                                <li key={k}><span className="text-muted-foreground">{k}:</span> {String(v)}</li>
                              ))}
                            </ul>
                          );
                        } catch { return <p>{selected.requestData}</p>; }
                      })()}
                    </div>
                  </div>
                )}

                {/* رد الجهة */}
                {selected.response ? (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">رد الجهة</p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
                      {selected.response.content ?? "تم الاستلام"}
                      {selected.response.receivedAt && (
                        <p className="text-xs text-green-600 mt-1">
                          {new Date(selected.response.receivedAt).toLocaleDateString("ar-EG")}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground text-center">
                    لا يوجد رد بعد
                  </div>
                )}

                {/* ── زرار Track — يظهر بس لو جاري المعالجة ومفيش رد ── */}
                {selected.status === RequestStatus.Processing && !selected.response && (
                  <div className="space-y-2">
                    <button
                      onClick={() => handleTrack(selected)}
                      disabled={tracking}
                      className="w-full py-2.5 rounded-lg border border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100 transition text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      <RefreshCw className={`w-4 h-4 ${tracking ? "animate-spin" : ""}`} />
                      {tracking ? "جاري التحقق..." : "تحقق من حالة الطلب"}
                    </button>
                    {trackMessage && (
                      <p className="text-xs text-center text-muted-foreground">{trackMessage}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-muted-foreground shrink-0 text-xs">{label}</span>
      <span className="text-foreground text-right text-xs">{value}</span>
    </div>
  );
}
