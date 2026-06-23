import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  FileText, Clock, CheckCircle2, AlertCircle, TrendingUp, Bell,
  Plus, ArrowRight, Activity, Package, Settings, BarChart3,
  Sparkles, XCircle,
} from "lucide-react";
import { requestsApi } from "@/services/api";
import { RequestStatus } from "@/types/api.types";
import type { RequestDTO } from "@/types/api.types";

interface UserDashboardPageProps {
  onPageChange: (page: string, serviceData?: any) => void;
  user: {
    id: string; name: string; email: string; phone: string;
    location: string; joinDate: string; avatar: string;
    status: string; nationalId: string; isVerified?: boolean;
  };
  userApplications: any[];
  onUpdateApplication: (applicationId: string, updates: any) => void;
  onOpenChatbot?: () => void;
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

const STATUS_ICON: Record<number, React.ReactNode> = {
  [RequestStatus.Pending]: <Clock className="w-3 h-3" />,
  [RequestStatus.Processing]: <Activity className="w-3 h-3 animate-pulse" />,
  [RequestStatus.Completed]: <CheckCircle2 className="w-3 h-3" />,
  [RequestStatus.Failed]: <XCircle className="w-3 h-3" />,
};

export function UserDashboardPage({ onPageChange, user }: UserDashboardPageProps) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [requests, setRequests] = useState<RequestDTO[]>([]);
  const [allRequests, setAllRequests] = useState<RequestDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جيب كل الطلبات للـ insights
    Promise.all([
      requestsApi.getAll({ PageSize: 5, IsDescending: true }),
      requestsApi.getAll({ PageSize: 100 }),
    ]).then(([recent, all]) => {
      setRequests(recent.data ?? []);
      setAllRequests(all.data ?? []);
    }).catch(() => {
      setRequests([]);
      setAllRequests([]);
    }).finally(() => setLoading(false));
  }, []);

  // Insights
  const total = allRequests.length;
  const pending = allRequests.filter(r => r.status === RequestStatus.Pending).length;
  const processing = allRequests.filter(r => r.status === RequestStatus.Processing).length;
  const completed = allRequests.filter(r => r.status === RequestStatus.Completed).length;
  const failed = allRequests.filter(r => r.status === RequestStatus.Failed).length;
  // const successRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  const successRate =
  total > 0
    ? Math.round(((processing + completed) / total) * 100)
    : 0;
  const uniqueServices = new Set(allRequests.map(r => r.serviceName)).size;

  const notifications = [
    { id: 1, title: "تحديث على طلبك", desc: "طلب قيد المراجعة", time: "منذ ساعتين", icon: CheckCircle2, type: "success" },
    { id: 2, title: "مطلوب مستندات", desc: "يرجى مراجعة طلبك", time: "منذ 5 ساعات", icon: AlertCircle, type: "warning" },
  ];

  return (
    <div className="min-h-screen bg-background rtl font-arabic" dir="rtl">
      {/* Header */}
      <div className="glass-card border-b border-border/50 pt-24">
        <div className="max-w-[1440px] mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-primary">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary text-white text-xl">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="flex items-center gap-2 text-2xl font-bold">
                  مرحباً، {user.name}
                  {user.isVerified && <CheckCircle2 className="w-5 h-5 text-primary" />}
                </h1>
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DropdownMenu open={notificationOpen} onOpenChange={setNotificationOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="relative border-2">
                    <Bell className="w-5 h-5" />
                    {/* <span className="absolute -top-1 -left-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span> */}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>الإشعارات</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <ScrollArea className="h-48">
                    {notifications.map(n => (
                      <DropdownMenuItem key={n.id} className="p-4">
                        {/* <div className="flex items-start gap-3 w-full">
                          <div className={`p-2 rounded-lg ${n.type === "success" ? "bg-green-100" : "bg-orange-100"}`}>
                            <n.icon className={`w-4 h-4 ${n.type === "success" ? "text-green-700" : "text-orange-600"}`} />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{n.title}</p>
                            <p className="text-xs text-muted-foreground">{n.desc}</p>
                            <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                          </div>
                        </div> */}
                      </DropdownMenuItem>
                    ))}
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" onClick={() => onPageChange("account")} className="border-2">
                <Settings className="w-4 h-4 ml-2" />إدارة الحساب
              </Button>
              <Button onClick={() => onPageChange("chatbot")} className="bg-[#B01E28] hover:bg-[#8B1721] text-white border-0">
                <Plus className="w-4 h-4 ml-2" />طلب جديد
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 py-8 space-y-8">

        {/* ── Insights Cards ── */}
        <div>
          <h3 className="text-lg font-semibold mb-4">ملخص طلباتك</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "إجمالي الطلبات", value: total, icon: BarChart3, color: "bg-gray-100 text-gray-700" },
              { label: "جاري المعالجة", value: pending + processing, icon: Clock, color: "bg-yellow-100 text-yellow-700" },
              { label: "مكتملة", value: completed, icon: CheckCircle2, color: "bg-green-100 text-green-700" },
              { label: "نسبة النجاح", value: `${successRate}%`, icon: TrendingUp, color: "bg-blue-100 text-blue-700" },
            ].map(({ label, value, icon: Icon, color }, i) => (
              <Card key={i} className="p-5 border-2 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{label}</p>
                    <p className="text-3xl font-bold text-foreground">
                      {loading ? "..." : value}
                    </p>
                  </div>
                  <div className={`p-2.5 rounded-xl ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── Status Breakdown ── */}
        {!loading && total > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">توزيع الطلبات حسب الحالة</h3>
            <Card className="p-6 border-2">
              <div className="space-y-4">
                {[
                  { label: "قيد الانتظار", count: pending, color: "bg-yellow-400", status: RequestStatus.Pending },
                  { label: "جاري المعالجة", count: processing, color: "bg-blue-400", status: RequestStatus.Processing },
                  { label: "مكتمل", count: completed, color: "bg-green-400", status: RequestStatus.Completed },
                  { label: "فشل", count: failed, color: "bg-red-400", status: RequestStatus.Failed },
                ].map(({ label, count, color }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">{label}</span>
                      <span className="text-sm font-medium">{count} / {total}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${color} rounded-full transition-all duration-700`}
                        style={{ width: total > 0 ? `${(count / total) * 100}%` : "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
                <span>خدمات مختلفة مستخدمة: <strong className="text-foreground">{uniqueServices}</strong></span>
                <button onClick={() => onPageChange("requests")} className="text-primary hover:underline">
                  عرض كل الطلبات ←
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* ── Recent Requests ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">آخر الطلبات</h3>
            {/* <Button variant="ghost" onClick={() => onPageChange("requests")} className="text-primary text-sm">
              عرض الكل <ArrowRight className="w-4 h-4 mr-1" />
            </Button> */}
            <Button variant="ghost" onClick={() => onPageChange("requests")} className="text-sm">
              عرض الكل <ArrowRight className="w-4 h-4 mr-1" />
            </Button>
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-20 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : requests.length === 0 ? (
            <Card className="p-12 text-center border-2">
              <Package className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">لا توجد طلبات بعد</p>
              <Button onClick={() => onPageChange("chatbot")} className="bg-[#B01E28] hover:bg-[#8B1721] text-white">
                <Sparkles className="w-4 h-4 ml-2" />ابدأ طلبك الأول
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              {requests.map(req => (
                <Card key={req.id} className="p-5 border-2 hover:shadow-md transition cursor-pointer group"
                  onClick={() => onPageChange("requests")}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-2.5 rounded-xl bg-muted shrink-0">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{req.serviceName}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          #{req.id} • {new Date(req.createdAt).toLocaleDateString("ar-EG")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge className={`${STATUS_COLOR[req.status]} flex items-center gap-1 text-xs`}>
                        {STATUS_ICON[req.status]}
                        {STATUS_LABEL[req.status]}
                      </Badge>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition" />
                    </div>
                  </div>
                  {/* {req.response?.content && (
                    <p className="text-xs text-green-600 mt-2 pr-11">✅ {req.response.content}</p>
                  )} */}
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* ── Quick Actions ── */}
        <div>
          <h3 className="text-lg font-semibold mb-4">إجراءات سريعة</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button onClick={() => onPageChange("chatbot")}
              className="p-5 rounded-2xl bg-gradient-to-br from-[#B01E28] to-[#8B1721] text-white text-right hover:opacity-90 transition hover:shadow-lg">
              <Sparkles className="w-6 h-6 mb-3" />
              <p className="font-semibold">طلب جديد</p>
              <p className="text-sm text-white/70 mt-1">بالمساعد الذكي</p>
            </button>
            <button onClick={() => onPageChange("requests")}
              className="p-5 rounded-2xl border-2 border-border bg-card text-right hover:border-primary hover:shadow-md transition">
              <FileText className="w-6 h-6 mb-3 text-primary" />
              <p className="font-semibold text-foreground">طلباتي</p>
              <p className="text-sm text-muted-foreground mt-1">تابع حالة الطلبات</p>
            </button>
            <button onClick={() => onPageChange("government")}
              className="p-5 rounded-2xl border-2 border-border bg-card text-right hover:border-primary hover:shadow-md transition">
              <Package className="w-6 h-6 mb-3 text-primary" />
              <p className="font-semibold text-foreground">الخدمات</p>
              <p className="text-sm text-muted-foreground mt-1">اكتشف الخدمات المتاحة</p>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
