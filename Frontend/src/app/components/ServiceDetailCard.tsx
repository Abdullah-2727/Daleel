import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import {
  CheckCircle2,
  Clock,
  FileText,
  Upload,
  Eye,
  Send,
  AlertCircle,
  Info,
  Download,
  Sparkles,
  Calendar,
  DollarSign,
  Timer,
} from "lucide-react";

interface ServiceDetailCardProps {
  currentLang: "en" | "ar";
  service: {
    id: string;
    name: string;
    nameAr: string;
    description?: string;
    descriptionAr?: string;
    icon: any;
    estimatedMinutes?: number;
    estimatedDays?: number;
    fee?: number;
    availability: "available" | "coming-soon" | "limited";
    requiredDocuments: string[];
    requiredDocumentsAr: string[];
    optionalDocuments?: string[];
    optionalDocumentsAr?: string[];
    processingTime?: string;
    processingTimeAr?: string;
    guidelines?: string[];
    guidelinesAr?: string[];
  };
  onStartApplication: () => void;
  onSaveForLater?: () => void;
  onContactSupport?: () => void;
  showFullDetails?: boolean;
}

export function ServiceDetailCard({
  currentLang,
  service,
  onStartApplication,
  onSaveForLater,
  onContactSupport,
  showFullDetails = true,
}: ServiceDetailCardProps) {
  const isRTL = currentLang === "ar";
  const ServiceIcon = service.icon;

  const content = {
    en: {
      availableNow: "Available Now",
      comingSoon: "Coming Soon",
      limitedAvailability: "Limited Availability",
      est: "Est.",
      minutes: "minutes",
      days: "days",
      applicationProcess: "Application Process",
      requiredDocuments: "Required Documents",
      optionalDocuments: "Optional Documents",
      documentGuidelines: "Document Guidelines",
      serviceFee: "Service Fee",
      processingTime: "Processing Time",
      free: "Free",
      egp: "EGP",
      startApplication: "Start Application",
      saveForLater: "Save for Later",
      needHelp: "Need help?",
      contactSupport: "Contact Support",
      or: "or",
      viewFAQ: "View FAQ",
      steps: {
        fillApplication: "Fill Application",
        fillApplicationDesc: "Complete the form with AI assistance",
        uploadDocuments: "Upload Documents",
        uploadDocumentsDesc: "Submit required documents",
        reviewSubmit: "Review & Submit",
        reviewSubmitDesc: "Verify all information",
        trackRequest: "Track Request",
        trackRequestDesc: "Monitor your application status",
      },
      guidelines: {
        clearReadable: "All documents must be clear and readable",
        acceptedFormats: "Accepted formats: PDF, JPG, PNG (max 5MB each)",
        recentPhotos: "Photos should be recent (taken within 6 months)",
      },
      notification: "You'll receive SMS and email updates on your request status.",
    },
    ar: {
      availableNow: "متاح الآن",
      comingSoon: "قريباً",
      limitedAvailability: "توفر محدود",
      est: "تقريباً",
      minutes: "دقيقة",
      days: "يوم",
      applicationProcess: "خطوات التقديم",
      requiredDocuments: "المستندات المطلوبة",
      optionalDocuments: "المستندات الاختيارية",
      documentGuidelines: "إرشادات المستندات",
      serviceFee: "رسوم الخدمة",
      processingTime: "وقت المعالجة",
      free: "مجاني",
      egp: "جنيه",
      startApplication: "ابدأ التقديم",
      saveForLater: "احفظ للمراجعة",
      needHelp: "تحتاج مساعدة؟",
      contactSupport: "اتصل بالدعم",
      or: "أو",
      viewFAQ: "عرض الأسئلة الشائعة",
      steps: {
        fillApplication: "ملء الطلب",
        fillApplicationDesc: "أكمل النموذج بمساعدة الذكاء الاصطناعي",
        uploadDocuments: "رفع المستندات",
        uploadDocumentsDesc: "قدم المستندات المطلوبة",
        reviewSubmit: "المراجعة والإرسال",
        reviewSubmitDesc: "تحقق من جميع المعلومات",
        trackRequest: "تتبع الطلب",
        trackRequestDesc: "راقب حالة طلبك",
      },
      guidelines: {
        clearReadable: "يجب أن تكون جميع المستندات واضحة وقابلة للقراءة",
        acceptedFormats: "الصيغ المقبولة: PDF، JPG، PNG (حتى 5 ميجابايت لكل ملف)",
        recentPhotos: "يجب أن تكون الصور حديثة (خلال 6 أشهر)",
      },
      notification: "ستتلقى تحديثات عبر الرسائل النصية والبريد الإلكتروني عن حالة طلبك.",
    },
  };

  const t = content[currentLang];

  const getAvailabilityBadge = () => {
    switch (service.availability) {
      case "available":
        return (
          <Badge className="bg-green-500 text-white hover:bg-green-600 border-0">
            {t.availableNow}
          </Badge>
        );
      case "coming-soon":
        return (
          <Badge className="bg-orange-500 text-white hover:bg-orange-600 border-0">
            {t.comingSoon}
          </Badge>
        );
      case "limited":
        return (
          <Badge className="bg-yellow-500 text-white hover:bg-yellow-600 border-0">
            {t.limitedAvailability}
          </Badge>
        );
    }
  };

  const processingSteps = [
    {
      number: 1,
      title: t.steps.fillApplication,
      description: t.steps.fillApplicationDesc,
      icon: FileText,
    },
    {
      number: 2,
      title: t.steps.uploadDocuments,
      description: t.steps.uploadDocumentsDesc,
      icon: Upload,
    },
    {
      number: 3,
      title: t.steps.reviewSubmit,
      description: t.steps.reviewSubmitDesc,
      icon: Eye,
    },
    {
      number: 4,
      title: t.steps.trackRequest,
      description: t.steps.trackRequestDesc,
      icon: Send,
    },
  ];

  const defaultGuidelines = service.guidelines || [
    t.guidelines.clearReadable,
    t.guidelines.acceptedFormats,
    t.guidelines.recentPhotos,
  ];

  const guidelines = currentLang === "ar" 
    ? (service.guidelinesAr || defaultGuidelines)
    : defaultGuidelines;

  return (
    <Card className="bg-white border-2 border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-primary/5">
            <ServiceIcon className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="mb-0">
                {currentLang === "ar" ? service.nameAr : service.name}
              </h3>
              {getAvailabilityBadge()}
            </div>
            {service.estimatedMinutes && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>
                  {t.est} {service.estimatedMinutes} {t.minutes}
                </span>
              </div>
            )}
            {service.description && (
              <p className="text-sm text-muted-foreground mt-3">
                {currentLang === "ar" ? service.descriptionAr : service.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {showFullDetails && (
        <>
          {/* Important Note */}
          <div className="px-6 pb-4">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900">
                  {currentLang === "ar"
                    ? "تأكد من صلاحية مستنداتك قبل البدء. وقت المعالجة عادة يكون 7-10 أيام عمل."
                    : "Make sure your current ID is not expired for more than 6 months. Processing time is typically 7-10 business days."}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Application Process */}
          <div className="p-6">
            <h4 className="mb-4">{t.applicationProcess}</h4>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200" 
                style={{ 
                  left: isRTL ? 'auto' : '3rem',
                  right: isRTL ? '3rem' : 'auto',
                  width: 'calc(100% - 6rem)'
                }} 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {processingSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  return (
                    <div key={index} className="relative">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mb-3 shadow-soft relative z-10">
                          <span className="text-sm">{step.number}</span>
                        </div>
                        <h4 className="text-sm mb-1">{step.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <Separator />

          {/* Required Documents */}
          <div className="p-6">
            <h4 className="mb-4">{t.requiredDocuments}</h4>
            <div className="space-y-3">
              {(currentLang === "ar" 
                ? service.requiredDocumentsAr 
                : service.requiredDocuments
              ).map((doc, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50/50"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{doc}</span>
                </div>
              ))}
            </div>

            {/* Document Guidelines */}
            <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
              <div className="flex items-start gap-3 mb-3">
                <Download className="w-5 h-5 text-gray-600 flex-shrink-0" />
                <h4 className="text-sm mb-0">{t.documentGuidelines}</h4>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {guidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span>{guideline}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator />

          {/* Service Details */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Service Fee */}
              <div className="p-4 rounded-xl bg-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-gray-600" />
                  <h4 className="text-sm mb-0">{t.serviceFee}</h4>
                </div>
                <p className="text-2xl mb-1">
                  {service.fee ? (
                    <>
                      {service.fee} <span className="text-base text-muted-foreground">{t.egp}</span>
                    </>
                  ) : (
                    t.free
                  )}
                </p>
                {service.fee && (
                  <p className="text-xs text-muted-foreground">
                    {currentLang === "ar"
                      ? "الدفع عند الموافقة. طرق دفع متعددة متاحة."
                      : "Payment upon approval. Multiple payment methods accepted."}
                  </p>
                )}
              </div>

              {/* Processing Time */}
              <div className="p-4 rounded-xl bg-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  <Timer className="w-5 h-5 text-gray-600" />
                  <h4 className="text-sm mb-0">{t.processingTime}</h4>
                </div>
                <p className="text-2xl mb-1">
                  {service.processingTime || `7-10`}{" "}
                  <span className="text-base text-muted-foreground">
                    {currentLang === "ar" 
                      ? (service.processingTimeAr || "أيام")
                      : "days"}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {t.notification}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <Separator />

      {/* Actions */}
      <div className="p-6 bg-gray-50/30">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onStartApplication}
            disabled={service.availability !== "available"}
            className="flex-1 gradient-primary text-white border-0 h-12"
          >
            <Sparkles className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            {t.startApplication}
          </Button>
          
          {onSaveForLater && (
            <Button
              variant="outline"
              onClick={onSaveForLater}
              className="border-2 h-12"
            >
              <Calendar className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t.saveForLater}
            </Button>
          )}
        </div>

        {onContactSupport && (
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              {t.needHelp}{" "}
              <button
                onClick={onContactSupport}
                className="text-primary hover:underline"
              >
                {t.contactSupport}
              </button>{" "}
              {t.or}{" "}
              <button className="text-primary hover:underline">
                {t.viewFAQ}
              </button>
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
