// ============================================================
// ServicesCenterPage.tsx — مع Service Center Details Modal + Location
// GET /api/ServiceCenters + GET /api/ServiceCenters/{id} + GET /api/ServiceCenters/{id}/location
// ============================================================
import { useState, useEffect, useCallback } from "react";
import { serviceCentersApi, ministriesApi } from "@/services/api";
import type { ServiceCenterDTO, MinistryDTO, ServiceCenterLocationDTO } from "@/types/api.types";
import { X, Search, MapPin, Clock, Building2, Navigation } from "lucide-react";

const PAGE_SIZE = 10;

interface ServicesCenterPageProps {
  currentLang?: "ar" | "en";
  onPageChange?: (page: string) => void;
}

export function ServicesCenterPage({ onPageChange }: ServicesCenterPageProps) {
  const [centers, setCenters] = useState<ServiceCenterDTO[]>([]);
  const [ministries, setMinistries] = useState<MinistryDTO[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [ministryId, setMinistryId] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [selected, setSelected] = useState<ServiceCenterDTO | null>(null);
  const [location, setLocation] = useState<ServiceCenterLocationDTO | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    ministriesApi.getAll({ PageSize: 100 }).then(r => setMinistries(r.data ?? [])).catch(() => {});
  }, []);

  const fetchCenters = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceCentersApi.getAll({
        Search: search || undefined,
        City: city || undefined,
        MinistryId: ministryId,
        PageIndex: page,
        PageSize: PAGE_SIZE,
      });
      setCenters(result.data ?? []);
      setTotal(result.count);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "فشل تحميل مراكز الخدمة");
    } finally {
      setLoading(false);
    }
  }, [search, city, ministryId, page]);

  useEffect(() => { fetchCenters(); }, [fetchCenters]);

  const openCenter = async (center: ServiceCenterDTO) => {
    setSelected(center);
    setLocation(null);
    setDetailLoading(true);
    setLocationLoading(true);
    try {
      const detail = await serviceCentersApi.getById(center.id);
      setSelected(detail);
    } catch { /* يفضل اللي عنده */ }
    finally { setDetailLoading(false); }

    // جيب الموقع بشكل منفصل
    try {
      const loc = await serviceCentersApi.getLocation(center.id);
      setLocation(loc);
    } catch { /* مش كل المراكز عندها location */ }
    finally { setLocationLoading(false); }
  };

  const openInMaps = (loc: ServiceCenterLocationDTO, name: string) => {
    const url = `https://www.google.com/maps?q=${loc.latitude},${loc.longitude}&z=15&query=${encodeURIComponent(name)}`;
    window.open(url, "_blank");
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#B01E28] to-[#8B1721] pt-5 pb-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">مراكز الخدامات</h1>
          <p className="text-white/70 mb-6">ابحث عن أقرب مركز خدمة ليك</p>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="search"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="ابحث عن مركز..."
                className="w-full pr-10 pl-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition"
              />
            </div>
            <input
              type="text"
              value={city}
              onChange={e => { setCity(e.target.value); setPage(1); }}
              placeholder="المدينة..."
              className="w-40 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition"
            />
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
            <button onClick={fetchCenters} className="mr-2 underline">إعادة المحاولة</button>
          </div>
        )}

        {!loading && !error && (
          <p className="text-sm text-muted-foreground mb-4">{total} مركز</p>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-36 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : centers.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">لا توجد نتائج</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {centers.map(center => (
              <button
                key={center.id}
                onClick={() => openCenter(center)}
                className="text-right p-5 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-[#B01E28]/40 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#B01E28]/10 group-hover:bg-[#B01E28]/20 transition shrink-0">
                    <Building2 className="w-5 h-5 text-[#B01E28]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-[#B01E28] transition line-clamp-1">
                      {center.name}
                    </h3>
                    {center.ministry && (
                      <p className="text-xs text-[#B01E28]/80 mt-0.5">{center.ministry}</p>
                    )}
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                      {center.city && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />{center.city}
                        </span>
                      )}
                      {center.operatingHours && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />{center.operatingHours}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
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
      {/* Service Center Detail Modal                           */}
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
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">{selected.name}</h2>
              {selected.ministry && (
                <p className="text-white/70 text-sm mt-1">🏛️ {selected.ministry}</p>
              )}
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {detailLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-8 rounded-lg bg-muted animate-pulse" />
                  ))}
                </div>
              ) : (
                <>
                  {selected.description && (
                    <p className="text-muted-foreground">{selected.description}</p>
                  )}

                  {/* تفاصيل التواصل */}
                  <div className="space-y-3">
                    {selected.address && (
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                        <MapPin className="w-5 h-5 text-[#B01E28] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">العنوان</p>
                          <p className="text-foreground text-sm">{selected.address}</p>
                        </div>
                      </div>
                    )}
                    {selected.city && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                        <Navigation className="w-5 h-5 text-[#B01E28] shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">المدينة</p>
                          <p className="text-foreground text-sm">{selected.city}</p>
                        </div>
                      </div>
                    )}
                    {selected.operatingHours && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                        <Clock className="w-5 h-5 text-[#B01E28] shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">ساعات العمل</p>
                          <p className="text-foreground text-sm">{selected.operatingHours}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* الموقع على الخريطة */}
                  <div className="border border-border rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-border flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#B01E28]" />
                        <p className="font-medium text-foreground text-sm">الموقع على الخريطة</p>
                      </div>
                      {location && (
                        <span className="text-xs text-muted-foreground">
                          {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                        </span>
                      )}
                    </div>

                    {locationLoading ? (
                      <div className="h-32 bg-muted animate-pulse flex items-center justify-center">
                        <p className="text-muted-foreground text-sm">جاري تحميل الموقع...</p>
                      </div>
                    ) : location ? (
                      <>
                        {/* Static map preview */}
                        <div className="relative h-40 bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-10 h-10 bg-[#B01E28] rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                              <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                            </p>
                          </div>
                          {/* Grid lines decoration */}
                          <div className="absolute inset-0 opacity-10"
                            style={{
                              backgroundImage: "linear-gradient(#888 1px, transparent 1px), linear-gradient(90deg, #888 1px, transparent 1px)",
                              backgroundSize: "20px 20px"
                            }}
                          />
                        </div>
                        <button
                          onClick={() => openInMaps(location, selected.name)}
                          className="w-full py-3 bg-[#B01E28] text-white text-sm font-medium hover:bg-[#8B1721] transition flex items-center justify-center gap-2"
                        >
                          <Navigation className="w-4 h-4" />
                          فتح في Google Maps
                        </button>
                      </>
                    ) : (
                      <div className="h-24 flex items-center justify-center">
                        <p className="text-muted-foreground text-sm">الموقع غير متاح</p>
                      </div>
                    )}
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
