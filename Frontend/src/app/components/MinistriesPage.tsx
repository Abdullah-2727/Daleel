// ============================================================
// MinistriesPage.tsx — مع Ministry Details Modal
// GET /api/Ministries + GET /api/Ministries/{id}
// ============================================================
import { useState, useEffect, useCallback } from "react";
import { ministriesApi } from "@/services/api";
import type { MinistryDTO } from "@/types/api.types";
import { X, Globe, Search, ChevronRight } from "lucide-react";

const PAGE_SIZE = 12;

interface MinistriesPageProps {
  currentLang?: "ar" | "en";
  onPageChange?: (page: string, data?: any) => void;
}

export function MinistriesPage({ onPageChange }: MinistriesPageProps) {
  const [ministries, setMinistries] = useState<MinistryDTO[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<MinistryDTO | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await ministriesApi.getAll({
        Search: search || undefined,
        PageIndex: page,
        PageSize: PAGE_SIZE,
      });
      setMinistries(result.data ?? []);
      setTotal(result.count);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "فشل تحميل البيانات");
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const openMinistry = async (ministry: MinistryDTO) => {
    setSelected(ministry);
    // جيب التفاصيل الكاملة
    setDetailLoading(true);
    try {
      const detail = await ministriesApi.getById(ministry.id);
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
          <h1 className="text-3xl font-bold text-white mb-2">الوزارات</h1>
          <p className="text-white/70 mb-6">اكتشف جميع الوزارات وخدماتها الحكومية</p>
          {/* Search */}
          <div className="relative max-w">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="search"
              value={search}
              onChange={handleSearch}
              placeholder="ابحث عن وزارة..."
              className="w-full pr-10 pl-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-destructive/10 text-destructive text-center">
            {error}
            <button onClick={fetchData} className="mr-2 underline">إعادة المحاولة</button>
          </div>
        )}

        {!loading && !error && (
          <p className="text-sm text-muted-foreground mb-4">{total} وزارة</p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-40 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : ministries.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">
            لا توجد نتائج{search ? ` لـ "${search}"` : ""}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ministries.map((ministry) => (
              <button
                key={ministry.id}
                onClick={() => openMinistry(ministry)}
                className="text-right p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-[#B01E28]/40 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="text-3xl mb-3">🏛️</div>
                <h2 className="text-lg font-semibold text-foreground group-hover:text-[#B01E28] transition line-clamp-2 mb-2">
                  {ministry.name}
                </h2>
                {ministry.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {ministry.description}
                  </p>
                )}
                <div className="flex items-center justify-between mt-4">
                  {ministry.websiteUrl ? (
                    <span className="text-xs text-[#B01E28]">موقع رسمي ↗</span>
                  ) : <span />}
                  <span className="text-xs text-muted-foreground group-hover:text-[#B01E28] transition flex items-center gap-1">
                    التفاصيل <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-input hover:bg-muted disabled:opacity-40 transition"
            >السابق</button>
            <span className="px-4 py-2 text-foreground">{page} / {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg border border-input hover:bg-muted disabled:opacity-40 transition"
            >التالي</button>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/* Ministry Detail Modal                                  */}
      {/* ══════════════════════════════════════════════════════ */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-card rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
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
              <div className="text-4xl mb-3">🏛️</div>
              <h2 className="text-2xl font-bold text-white">{selected.name}</h2>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              {detailLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-8 rounded-lg bg-muted animate-pulse" />
                  ))}
                </div>
              ) : (
                <>
                  {selected.description && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">عن الوزارة</h3>
                      <p className="text-foreground leading-relaxed">{selected.description}</p>
                    </div>
                  )}

                  {/* الموقع الرسمي */}
                  {selected.websiteUrl && (
                    <div className="border border-border rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Globe className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">الموقع الرسمي</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                            {selected.websiteUrl}
                          </p>
                        </div>
                      </div>
                      <a
                        href={selected.websiteUrl.startsWith("http") ? selected.websiteUrl : `https://${selected.websiteUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition flex items-center gap-1"
                      >
                        زيارة ↗
                      </a>
                    </div>
                  )}

                  {/* زرار خدمات الوزارة — بيبعت الـ ministryId للفلتر */}
                  <button
                    onClick={() => {
                      setSelected(null);
                      onPageChange?.("government", { ministryId: selected.id, ministryName: selected.name });
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#B01E28] text-white text-sm font-medium hover:bg-[#8B1721] transition"
                  >
                    عرض خدمات الوزارة
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
