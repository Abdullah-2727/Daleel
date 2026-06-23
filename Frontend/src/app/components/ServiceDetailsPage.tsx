import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  ArrowLeft, 
  FileText, 
  Clock,
  DollarSign,
  CheckCircle2,
  Info,
  Download,
  Sparkles,
  MessageCircle,
  Zap,
  Upload,
  Eye,
  Send,
  Calendar,
  AlertCircle,
  Phone,
  Mail,
  ChevronRight,
  BookmarkPlus,
  ExternalLink
} from "lucide-react";

interface ServiceDetailsPageProps {
  currentLang: "en" | "ar";
  service: any;
  onBack: () => void;
  onStartAutomation: (service: any) => void;
  onOpenChatbot?: () => void;
  user: any;
}

export function ServiceDetailsPage({
  currentLang,
  service,
  onBack,
  onStartAutomation,
  onOpenChatbot,
  user,
}: ServiceDetailsPageProps) {
  const isRTL = currentLang === "ar";
  const [isSaved, setIsSaved] = useState(false);

  const content = {
    en: {
      backToServices: "Back to Services",
      estimatedTime: "Est.",
      minutes: "minutes",
      availableNow: "Available Now",
      comingSoon: "Coming Soon",
      
      // Info Banner
      importantNote: "Important Note",
      noteText: "Make sure your current ID is not expired for more than 6 months. Processing time is typically 7-10 business days.",
      
      // Application Process
      applicationProcess: "Application Process",
      step1Title: "Fill Application",
      step1Desc: "Complete the form with AI assistance",
      step2Title: "Upload Documents",
      step2Desc: "Submit required documents",
      step3Title: "Review & Submit",
      step3Desc: "Verify all information",
      step4Title: "Track Request",
      step4Desc: "Monitor your application status",
      
      // Requirements
      requiredDocuments: "Required Documents",
      documentGuidelines: "Document Guidelines",
      guideline1: "All documents must be clear and readable",
      guideline2: "Accepted formats: PDF, JPG, PNG (max 5MB each)",
      guideline3: "Photos should be recent (taken within 6 months)",
      
      // Fee & Time
      serviceFee: "Service Fee",
      processingTime: "Processing Time",
      feeNote: "Payment upon approval. Multiple payment methods accepted.",
      timeNote: "You'll receive SMS and email updates on your request status.",
      egp: "EGP",
      days: "days",
      free: "Free",
      
      // Actions
      startSmartAutomation: "Start Smart Automation 🤖",
      getAIHelp: "AI Assistant 💬",
      saveForLater: "Save for Later",
      
      // Support
      needHelp: "Need help?",
      contactSupport: "Contact Support",
      or: "or",
      viewFAQ: "View FAQ",
    },
    ar: {
      backToServices: "العودة للخدمات",
      estimatedTime: "تقريباً",
      minutes: "دقيقة",
      availableNow: "متاح الآن",
      comingSoon: "قريباً",
      
      // Info Banner
      importantNote: "ملاحظة مهمة",
      noteText: "تأكد من صلاحية بطاقتك الحالية ولم تنتهِ صلاحيتها منذ أكثر من 6 أشهر. مدة المعالجة عادة بين 7-10 أيام عمل.",
      
      // Application Process
      applicationProcess: "خطوات التقديم",
      step1Title: "ملء الطلب",
      step1Desc: "أكمل النموذج بمساعدة الذكاء الاصطناعي",
      step2Title: "رفع المستندات",
      step2Desc: "قدم المستندات المطلوبة",
      step3Title: "المراجعة والإرسال",
      step3Desc: "تحقق من جميع المعلومات",
      step4Title: "تتبع الطلب",
      step4Desc: "راقب حالة طلبك",
      
      // Requirements
      requiredDocuments: "المستندات المطلوبة",
      documentGuidelines: "إرشادات المستندات",
      guideline1: "يجب أن تكون جميع المستندات واضحة وقابلة للقراءة",
      guideline2: "الصيغ المقبولة: PDF، JPG، PNG (حتى 5 ميجابايت لكل ملف)",
      guideline3: "يجب أن تكون الصور حديثة (خلال 6 أشهر)",
      
      // Fee & Time
      serviceFee: "رسوم الخدمة",
      processingTime: "وقت المعالجة",
      feeNote: "الدفع عند الموافقة. طرق دفع متعددة متاحة.",
      timeNote: "ستتلقى تحديثات عبر الرسائل النصية والبريد الإلكتروني عن حالة طلبك.",
      egp: "جنيه",
      days: "أيام",
      free: "مجاني",
      
      // Actions
      startSmartAutomation: "بدء الأوتوميشن الذكي 🤖",
      getAIHelp: "مساعدة الـAI 💬",
      saveForLater: "احفظ للمراجعة",
      
      // Support
      needHelp: "تحتاج مساعدة؟",
      contactSupport: "اتصل بالدعم",
      or: "أو",
      viewFAQ: "عرض الأسئلة الشائعة",
    },
  };

  const t = content[currentLang];
  const ServiceIcon = service.icon || FileText;

  // Get service data with fallbacks
  const serviceName = currentLang === "ar" 
    ? (service.nameAr || service.title)
    : (service.name || service.title);
  
  const serviceDesc = currentLang === "ar"
    ? (service.descriptionAr || service.description)
    : service.description;

  const estimatedMinutes = service.estimatedMinutes || 15;
  const processingDays = service.processingTime || service.estimatedDays || "7-10";
  const serviceFee = service.fee;

  // Required documents
  const requiredDocs = currentLang === "ar"
    ? (service.requiredDocumentsAr || service.requirements || [])
    : (service.requiredDocuments || service.requirements || []);

  // Process steps
  const processSteps = [
    { number: 1, title: t.step1Title, desc: t.step1Desc, icon: FileText },
    { number: 2, title: t.step2Title, desc: t.step2Desc, icon: Upload },
    { number: 3, title: t.step3Title, desc: t.step3Desc, icon: Eye },
    { number: 4, title: t.step4Title, desc: t.step4Desc, icon: Send },
  ];

  return (
    <div className={`min-h-screen bg-[#F9FAFB] pb-32 ${isRTL ? "rtl" : "ltr"}`}>
      {/* Sticky Header with Back Button */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="hover:bg-gray-100 -ml-2"
          >
            <ArrowLeft className={`w-4 h-4 ${isRTL ? "ml-2 rotate-180" : "mr-2"}`} />
            {t.backToServices}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-6 shadow-sm">
          <div className="flex items-start gap-6">
            {/* Service Icon */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0A4BA0] to-[#1e5bbf] flex items-center justify-center shadow-lg">
                <ServiceIcon className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Service Info */}
            <div className="flex-1">
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <Badge className="bg-[#E6EFFB] text-[#0A4BA0] hover:bg-[#E6EFFB] border-0 px-3 py-1">
                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                  {t.estimatedTime} {estimatedMinutes} {t.minutes}
                </Badge>
                <Badge className="bg-[#00B67A] text-white hover:bg-[#00B67A] border-0 px-3 py-1">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                  {service.availability === 'coming-soon' ? t.comingSoon : t.availableNow}
                </Badge>
              </div>

              {/* Service Name */}
              <h1 className="text-3xl mb-3 text-gray-900">
                {serviceName}
              </h1>

              {/* Service Description */}
              <p className="text-gray-600 leading-relaxed">
                {serviceDesc || (currentLang === "ar" 
                  ? "قم بتجديد بطاقتك الشخصية إلكترونيًا بمساعدة المساعد الذكي خطوة بخطوة."
                  : "Complete your application electronically with step-by-step AI assistance."
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-[#E6EFFB] border-2 border-[#0A4BA0]/20 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-[#0A4BA0]/10 flex items-center justify-center">
                <Info className="w-5 h-5 text-[#0A4BA0]" />
              </div>
            </div>
            <div>
              <h4 className="text-[#0A4BA0] mb-2">{t.importantNote}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {t.noteText}
              </p>
            </div>
          </div>
        </div>

        {/* Application Process Section */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-6 shadow-sm">
          <h2 className="text-2xl text-[#0A4BA0] mb-8">{t.applicationProcess}</h2>
          
          {/* Steps */}
          <div className="relative">
            {/* Connection Line */}
            <div 
              className="absolute top-8 h-0.5 bg-gray-200 hidden md:block"
              style={{
                left: isRTL ? 'auto' : '2.5rem',
                right: isRTL ? '2.5rem' : 'auto',
                width: 'calc(100% - 5rem)'
              }}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
              {processSteps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <div key={index} className="relative">
                    <div className="flex flex-col items-center text-center">
                      {/* Step Circle */}
                      <div className="w-16 h-16 rounded-full bg-[#0A4BA0] text-white flex items-center justify-center mb-4 shadow-lg relative z-10 text-xl">
                        {step.number}
                      </div>
                      
                      {/* Step Title */}
                      <h4 className="text-sm mb-2 text-gray-900">
                        {step.title}
                      </h4>
                      
                      {/* Step Description */}
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Required Documents Section */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-6 shadow-sm">
          <h2 className="text-2xl text-[#0A4BA0] mb-6">{t.requiredDocuments}</h2>
          
          {/* Documents List */}
          <div className="space-y-3 mb-8">
            {requiredDocs.map((doc: string, index: number) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-[#F9FAFB] border border-gray-200"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-6 h-6 rounded-full bg-[#00B67A] flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                </div>
                <span className="text-gray-700">{doc}</span>
              </div>
            ))}
          </div>

          {/* Document Guidelines Box */}
          <div className="bg-[#F9FAFB] border-2 border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Download className="w-5 h-5 text-[#0A4BA0]" />
              <h4 className="text-[#0A4BA0] mb-0">{t.documentGuidelines}</h4>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="text-[#0A4BA0] mt-1">•</span>
                <span>{t.guideline1}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="text-[#0A4BA0] mt-1">•</span>
                <span>{t.guideline2}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="text-[#0A4BA0] mt-1">•</span>
                <span>{t.guideline3}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Service Fee & Processing Time Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Service Fee Card */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#E6EFFB] flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#0A4BA0]" />
              </div>
              <h3 className="text-lg text-gray-900 mb-0">{t.serviceFee}</h3>
            </div>
            
            <p className="text-4xl text-[#0A4BA0] mb-3">
              {serviceFee ? (
                <>
                  {serviceFee} <span className="text-xl text-gray-500">{t.egp}</span>
                </>
              ) : (
                <span className="text-3xl">{t.free}</span>
              )}
            </p>
            
            <p className="text-sm text-gray-500 leading-relaxed">
              {t.feeNote}
            </p>
          </div>

          {/* Processing Time Card */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#E6EFFB] flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#0A4BA0]" />
              </div>
              <h3 className="text-lg text-gray-900 mb-0">{t.processingTime}</h3>
            </div>
            
            <p className="text-4xl text-[#0A4BA0] mb-3">
              {processingDays} <span className="text-xl text-gray-500">{t.days}</span>
            </p>
            
            <p className="text-sm text-gray-500 leading-relaxed">
              {t.timeNote}
            </p>
          </div>
        </div>

        {/* Footer Support Section */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600">
            {t.needHelp}{" "}
            <button className="text-[#0A4BA0] hover:underline font-medium">
              {t.contactSupport}
            </button>
            {" "}{t.or}{" "}
            <button className="text-[#0A4BA0] hover:underline font-medium">
              {t.viewFAQ}
            </button>
          </p>
        </div>
      </div>

      {/* Bottom Action Buttons (Fixed) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Primary Button */}
            <Button
              onClick={() => onStartAutomation(service)}
              disabled={service.availability === "coming-soon"}
              className="flex-1 h-14 text-base bg-[#0A4BA0] hover:bg-[#083a7a] text-white border-0 rounded-xl shadow-lg"
            >
              <Zap className={`w-5 h-5 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t.startSmartAutomation}
            </Button>

            {/* Secondary Button */}
            <Button
              onClick={onOpenChatbot}
              variant="outline"
              className="flex-1 h-14 text-base border-2 border-[#0A4BA0] text-[#0A4BA0] hover:bg-[#E6EFFB] rounded-xl"
            >
              <MessageCircle className={`w-5 h-5 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t.getAIHelp}
            </Button>

            {/* Save for Later Button */}
            <Button
              onClick={() => setIsSaved(!isSaved)}
              variant="outline"
              className={`h-14 px-6 rounded-xl border-2 ${
                isSaved 
                  ? 'bg-[#E6EFFB] border-[#0A4BA0] text-[#0A4BA0]' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BookmarkPlus className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
