import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Download,
  Eye,
  MessageSquare,
  Calendar,
  MapPin,
  User,
  Building2,
  ArrowRight,
  Package,
  Truck,
  CheckCheck,
  XCircle,
} from "lucide-react";

interface ApplicationTrackingPageProps {
  currentLang: "en" | "ar";
  application: any;
  onBack: () => void;
  onOpenChatbot?: () => void;
}

export function ApplicationTrackingPage({
  currentLang,
  application,
  onBack,
  onOpenChatbot,
}: ApplicationTrackingPageProps) {
  const isRTL = currentLang === "ar";
  const [searchQuery, setSearchQuery] = useState("");

  const content = {
    en: {
      title: "Track Application",
      applicationId: "Application ID",
      status: "Status",
      submittedOn: "Submitted On",
      lastUpdate: "Last Update",
      estimatedCompletion: "Estimated Completion",
      progress: "Progress",
      timeline: "Timeline",
      documents: "Documents",
      support: "Support",
      backToDashboard: "Back to Dashboard",
      downloadReceipt: "Download Receipt",
      viewDetails: "View Details",
      contactSupport: "Contact Support",
      trackingNumber: "Tracking Number",
      serviceType: "Service Type",
      applicant: "Applicant",
      location: "Location",
      statusHistory: "Status History",
      uploadedDocuments: "Uploaded Documents",
      downloadDocument: "Download",
      viewDocument: "View",
      needHelp: "Need Help?",
      chatWithAI: "Chat with AI Assistant",
      steps: {
        submitted: "Submitted",
        underReview: "Under Review",
        processing: "Processing",
        approved: "Approved",
        completed: "Completed",
      },
      statusTypes: {
        pending: "Pending",
        "in-progress": "In Progress",
        completed: "Completed",
        rejected: "Rejected",
      },
    },
    ar: {
      title: "تتبع الطلب",
      applicationId: "رقم الطلب",
      status: "الحالة",
      submittedOn: "تاريخ التقديم",
      lastUpdate: "آخر تحديث",
      estimatedCompletion: "الإنجاز المتوقع",
      progress: "التقدم",
      timeline: "الخط الزمني",
      documents: "المستندات",
      support: "الدعم",
      backToDashboard: "العودة للوحة التحكم",
      downloadReceipt: "تحميل الإيصال",
      viewDetails: "عرض التفاصيل",
      contactSupport: "اتصل بالدعم",
      trackingNumber: "رقم التتبع",
      serviceType: "نوع الخدمة",
      applicant: "مقدم الطلب",
      location: "الموقع",
      statusHistory: "سجل الحالة",
      uploadedDocuments: "المستندات المحملة",
      downloadDocument: "تحميل",
      viewDocument: "عرض",
      needHelp: "تحتاج مساعدة؟",
      chatWithAI: "تحدث مع المساعد الذكي",
      steps: {
        submitted: "تم التقديم",
        underReview: "قيد المراجعة",
        processing: "قيد المعالجة",
        approved: "تمت الموافقة",
        completed: "مكتمل",
      },
      statusTypes: {
        pending: "قيد الانتظار",
        "in-progress": "قيد التنفيذ",
        completed: "مكتمل",
        rejected: "مرفوض",
      },
    },
  };

  const t = content[currentLang];

  // Mock timeline data
  const timelineSteps = [
    {
      status: "submitted",
      date: application.submissionDate,
      completed: true,
      icon: FileText,
    },
    {
      status: "underReview",
      date: application.submissionDate,
      completed: application.progress >= 25,
      icon: Search,
    },
    {
      status: "processing",
      date: application.progress >= 50 ? application.lastUpdate : null,
      completed: application.progress >= 50,
      icon: Package,
    },
    {
      status: "approved",
      date: application.progress >= 75 ? application.lastUpdate : null,
      completed: application.progress >= 75,
      icon: CheckCheck,
    },
    {
      status: "completed",
      date: application.status === "completed" ? application.lastUpdate : null,
      completed: application.status === "completed",
      icon: CheckCircle2,
    },
  ];

  // Mock documents
  const documents = [
    {
      id: 1,
      name: currentLang === "ar" ? "صورة البطاقة الشخصية" : "National ID Copy",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: application.submissionDate,
    },
    {
      id: 2,
      name: currentLang === "ar" ? "إثبات السكن" : "Proof of Residence",
      type: "PDF",
      size: "1.8 MB",
      uploadDate: application.submissionDate,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-gray-900 text-white";
      case "in-progress":
        return "bg-gray-700 text-white";
      case "pending":
        return "bg-gray-400 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-300 text-gray-900";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5" />;
      case "in-progress":
        return <Clock className="w-5 h-5 animate-spin" />;
      case "pending":
        return <Clock className="w-5 h-5" />;
      case "rejected":
        return <XCircle className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className={`min-h-screen bg-background pt-20 p-8 ${isRTL ? "rtl" : "ltr"}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowRight className={`w-4 h-4 ${isRTL ? "ml-2 rotate-180" : "mr-2"}`} />
            {t.backToDashboard}
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2">{t.title}</h1>
              <p className="text-muted-foreground">{application.service}</p>
            </div>
            <Badge className={`${getStatusColor(application.status)} gap-2 px-4 py-2`}>
              {getStatusIcon(application.status)}
              {t.statusTypes[application.status as keyof typeof t.statusTypes]}
            </Badge>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Info */}
            <Card className="bg-white border-2 border-gray-200 shadow-sm p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {t.applicationId}
                  </p>
                  <p className="font-mono">{application.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {t.submittedOn}
                  </p>
                  <p>{application.submissionDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {t.lastUpdate}
                  </p>
                  <p>{application.lastUpdate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {t.progress}
                  </p>
                  <p>{application.progress}%</p>
                </div>
              </div>
            </Card>

            {/* Progress */}
            <Card className="bg-white border-2 border-gray-200 shadow-sm p-8">
              <h3 className="mb-6">{t.progress}</h3>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">
                    {timelineSteps[Math.floor(application.progress / 25)].status}
                  </span>
                  <span className="text-sm">{application.progress}%</span>
                </div>
                <Progress value={application.progress} className="h-3" />
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                {timelineSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-xl ${
                          step.completed
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <StepIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={step.completed ? "" : "text-muted-foreground"}>
                            {t.steps[step.status as keyof typeof t.steps]}
                          </h4>
                          {step.completed && (
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        {step.date && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {step.date}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Documents */}
            <Card className="bg-white border-2 border-gray-200 shadow-sm p-8">
              <h3 className="mb-6">{t.uploadedDocuments}</h3>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white">
                        <FileText className="w-5 h-5 text-gray-700" />
                      </div>
                      <div>
                        <p className="text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.type} • {doc.size} • {doc.uploadDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Details */}
            <Card className="bg-white border-2 border-gray-200 shadow-sm p-6">
              <h4 className="mb-4">{t.viewDetails}</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.serviceType}
                    </p>
                    <p className="text-sm">{application.service}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.applicant}
                    </p>
                    <p className="text-sm">{application.applicant || "Ahmed Hassan"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.submittedOn}
                    </p>
                    <p className="text-sm">{application.submissionDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.location}
                    </p>
                    <p className="text-sm">
                      {application.location || (currentLang === "ar" ? "القاهرة، مصر" : "Cairo, Egypt")}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card className="bg-white border-2 border-gray-200 shadow-sm p-6">
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-2">
                  <Download className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {t.downloadReceipt}
                </Button>
                <Button variant="outline" className="w-full justify-start border-2">
                  <MessageSquare className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {t.contactSupport}
                </Button>
              </div>
            </Card>

            {/* AI Assistant */}
            <Card className="bg-white border-2 border-gray-200 shadow-sm p-6 gradient-primary text-white">
              <div className="mb-4">
                <h4 className="mb-2 text-white">{t.needHelp}</h4>
                <p className="text-sm text-white/80">
                  {currentLang === "ar"
                    ? "تحدث مع المساعد الذكي للحصول على المساعدة"
                    : "Chat with AI assistant for help"}
                </p>
              </div>
              <Button
                onClick={onOpenChatbot}
                className="w-full bg-white text-gray-900 hover:bg-gray-100 border-0"
              >
                <MessageSquare className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                {t.chatWithAI}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
