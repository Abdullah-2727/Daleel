import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { 
  CheckCircle2, 
  Upload, 
  FileText, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Save,
  Send,
  Sparkles,
  Image as ImageIcon,
  File,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface ServiceRequestFlowProps {
  currentLang: "en" | "ar";
  service: any;
  user: any;
  onSubmit: (application: any) => void;
  onCancel: () => void;
}

export function ServiceRequestFlow({
  currentLang,
  service,
  user,
  onSubmit,
  onCancel,
}: ServiceRequestFlowProps) {
  const isRTL = currentLang === "ar";
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const content = {
    en: {
      title: "Service Request",
      steps: ["Service Info", "Fill Form", "Upload Docs", "Review & Submit"],
      serviceDetails: "Service Details",
      fillInformation: "Fill Information",
      uploadDocuments: "Upload Documents",
      reviewSubmit: "Review & Submit",
      next: "Next",
      previous: "Previous",
      submit: "Submit Application",
      save: "Save Draft",
      cancel: "Cancel",
      aiAssistance: "AI Assistance",
      aiSuggestionsTitle: "Smart Suggestions",
      requiredDocuments: "Required Documents",
      optionalDocuments: "Optional Documents",
      dragDrop: "Drag & drop files or click to browse",
      filesUploaded: "files uploaded",
      personalInfo: "Personal Information",
      contactInfo: "Contact Information",
      additionalNotes: "Additional Notes",
      reviewData: "Review Your Information",
      confirmSubmit: "Confirm and Submit",
      applicationSummary: "Application Summary",
      estimatedTime: "Estimated Processing Time",
      days: "days",
      serviceFee: "Service Fee",
      free: "Free",
      egp: "EGP",
    },
    ar: {
      title: "طلب خدمة",
      steps: ["معلومات الخدمة", "ملء النموذج", "رفع المستندات", "المراجعة والإرسال"],
      serviceDetails: "تفاصيل الخدمة",
      fillInformation: "ملء المعلومات",
      uploadDocuments: "رفع المستندات",
      reviewSubmit: "المراجعة والإرسال",
      next: "التالي",
      previous: "السابق",
      submit: "إرسال الطلب",
      save: "حفظ كمسودة",
      cancel: "إلغاء",
      aiAssistance: "المساعدة الذكية",
      aiSuggestionsTitle: "اقتراحات ذكية",
      requiredDocuments: "المستندات المطلوبة",
      optionalDocuments: "المستندات الاختيارية",
      dragDrop: "اسحب وأفلت الملفات أو انقر للتصفح",
      filesUploaded: "ملف محمل",
      personalInfo: "المعلومات الشخصية",
      contactInfo: "معلومات الاتصال",
      additionalNotes: "ملاحظات إضافية",
      reviewData: "راجع معلوماتك",
      confirmSubmit: "تأكيد وإرسال",
      applicationSummary: "ملخص الطلب",
      estimatedTime: "وقت المعالجة المتوقع",
      days: "يوم",
      serviceFee: "رسوم الخدمة",
      free: "مجاني",
      egp: "جنيه",
    },
  };

  const t = content[currentLang];

  // Mock AI suggestions based on service type
  const generateAISuggestions = () => {
    const suggestions = currentLang === "ar" ? [
      "تأكد من رفع صورة واضحة من البطاقة الشخصية",
      "يمكنك استخدام كاميرا الهاتف لمسح المستندات",
      "تحقق من صلاحية المستندات قبل الرفع",
    ] : [
      "Make sure to upload a clear photo of your ID card",
      "You can use your phone camera to scan documents",
      "Verify document validity before uploading",
    ];
    setAiSuggestions(suggestions);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        id: Date.now() + Math.random(),
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
      toast.success(
        currentLang === "ar"
          ? `تم رفع ${newFiles.length} ملف بنجاح`
          : `${newFiles.length} file(s) uploaded successfully`
      );
    }
  };

  const removeFile = (fileId: number) => {
    setUploadedFiles(uploadedFiles.filter((f) => f.id !== fileId));
  };

  const handleNext = () => {
    if (currentStep === 2 && aiSuggestions.length === 0) {
      generateAISuggestions();
    }
    setCurrentStep(Math.min(currentStep + 1, 4));
  };

  const handlePrevious = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  const handleSubmit = () => {
    const application = {
      service: service.name,
      category: service.category,
      formData,
      documents: uploadedFiles,
      estimatedDays: service.estimatedDays || 7,
      fee: service.fee || 0,
    };
    onSubmit(application);
  };

  const progress = (currentStep / 4) * 100;

  return (
    <div className={`min-h-screen bg-background p-8 ${isRTL ? "rtl" : "ltr"}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="mb-2">{t.title}</h1>
              <p className="text-muted-foreground">{service.name}</p>
            </div>
            <Button variant="outline" onClick={onCancel} className="border-2">
              <X className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t.cancel}
            </Button>
          </div>

          {/* Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">
                {t.steps[currentStep - 1]}
              </span>
              <span className="text-sm">{currentStep}/4</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Steps indicator */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {t.steps.map((step, index) => (
              <div
                key={index}
                className={`text-center p-3 rounded-xl transition-all ${
                  currentStep === index + 1
                    ? "bg-primary text-white shadow-soft"
                    : currentStep > index + 1
                    ? "bg-gray-200 text-gray-900"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {currentStep > index + 1 && (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span className="text-xs truncate">{step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {/* Step 1: Service Details */}
          {currentStep === 1 && (
            <Card className="glass-card shadow-soft p-8 border-2">
              <h3 className="mb-6">{t.serviceDetails}</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">
                      {currentLang === "ar" ? "الخدمة" : "Service"}
                    </Label>
                    <p>{service.name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">
                      {currentLang === "ar" ? "الفئة" : "Category"}
                    </Label>
                    <p>{service.category}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <Label className="text-muted-foreground">
                    {currentLang === "ar" ? "الوصف" : "Description"}
                  </Label>
                  <p className="text-sm mt-2">
                    {service.description || (currentLang === "ar" 
                      ? "خدمة حكومية إلكترونية متاحة من خلال المساعد الذكي"
                      : "Electronic government service available through the smart assistant")}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-4 rounded-xl bg-gray-50">
                    <Label className="text-muted-foreground text-sm">
                      {t.estimatedTime}
                    </Label>
                    <p className="mt-1">
                      {service.estimatedDays || 7} {t.days}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50">
                    <Label className="text-muted-foreground text-sm">
                      {t.serviceFee}
                    </Label>
                    <p className="mt-1">
                      {service.fee ? `${service.fee} ${t.egp}` : t.free}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Step 2: Fill Information */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="glass-card shadow-soft p-8 border-2">
                  <h3 className="mb-6">{t.fillInformation}</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="mb-4">{t.personalInfo}</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>
                            {currentLang === "ar" ? "الاسم الكامل" : "Full Name"}
                          </Label>
                          <Input
                            value={formData.fullName || user.name}
                            onChange={(e) =>
                              setFormData({ ...formData, fullName: e.target.value })
                            }
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label>
                            {currentLang === "ar" ? "الرقم القومي" : "National ID"}
                          </Label>
                          <Input
                            value={formData.nationalId || user.nationalId}
                            onChange={(e) =>
                              setFormData({ ...formData, nationalId: e.target.value })
                            }
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="mb-4">{t.contactInfo}</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>
                            {currentLang === "ar" ? "البريد الإلكتروني" : "Email"}
                          </Label>
                          <Input
                            type="email"
                            value={formData.email || user.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label>
                            {currentLang === "ar" ? "رقم الهاتف" : "Phone Number"}
                          </Label>
                          <Input
                            value={formData.phone || user.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label>{t.additionalNotes}</Label>
                      <Textarea
                        value={formData.notes || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        className="mt-2 min-h-[100px]"
                        placeholder={
                          currentLang === "ar"
                            ? "أضف أي ملاحظات إضافية..."
                            : "Add any additional notes..."
                        }
                      />
                    </div>
                  </div>
                </Card>
              </div>

              {/* AI Suggestions Sidebar */}
              <div>
                <Card className="glass-card shadow-soft p-6 border-2 gradient-primary text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5" />
                    <h4 className="mb-0 text-white">{t.aiSuggestionsTitle}</h4>
                  </div>
                  <div className="space-y-3">
                    {aiSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg bg-primary-foreground/10 text-sm text-white"
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Step 3: Upload Documents */}
          {currentStep === 3 && (
            <Card className="glass-card shadow-soft p-8 border-2">
              <h3 className="mb-6">{t.uploadDocuments}</h3>
              
              <div className="space-y-6">
                {/* Upload Area */}
                <div className="border-3 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="mb-2">{t.dragDrop}</p>
                    <p className="text-sm text-muted-foreground">
                      {currentLang === "ar" 
                        ? "PDF, PNG, JPG حتى 10MB"
                        : "PDF, PNG, JPG up to 10MB"}
                    </p>
                  </label>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div>
                    <Label className="mb-3">
                      {uploadedFiles.length} {t.filesUploaded}
                    </Label>
                    <div className="space-y-2">
                      {uploadedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {file.type.includes("image") ? (
                              <ImageIcon className="w-5 h-5 text-gray-600" />
                            ) : (
                              <File className="w-5 h-5 text-gray-600" />
                            )}
                            <div>
                              <p className="text-sm truncate max-w-[300px]">
                                {file.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024).toFixed(2)} KB
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(file.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Required Documents */}
                <div>
                  <h4 className="mb-3">{t.requiredDocuments}</h4>
                  <div className="space-y-2">
                    {[
                      currentLang === "ar" ? "صورة البطاقة الشخصية" : "ID Card Copy",
                      currentLang === "ar" ? "إثبات السكن" : "Proof of Residence",
                    ].map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
                      >
                        <FileText className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">{doc}</span>
                        {uploadedFiles.length > index && (
                          <CheckCircle2 className="w-4 h-4 text-green-600 ml-auto" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <Card className="glass-card shadow-soft p-8 border-2">
              <h3 className="mb-6">{t.reviewSubmit}</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="mb-4">{t.applicationSummary}</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-gray-50">
                      <div>
                        <Label className="text-muted-foreground text-sm">
                          {currentLang === "ar" ? "الاسم" : "Name"}
                        </Label>
                        <p className="mt-1">{formData.fullName || user.name}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-sm">
                          {currentLang === "ar" ? "الرقم القومي" : "National ID"}
                        </Label>
                        <p className="mt-1">{formData.nationalId || user.nationalId}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-sm">
                          {currentLang === "ar" ? "البريد الإلكتروني" : "Email"}
                        </Label>
                        <p className="mt-1">{formData.email || user.email}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-sm">
                          {currentLang === "ar" ? "الهاتف" : "Phone"}
                        </Label>
                        <p className="mt-1">{formData.phone || user.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="mb-3">
                    {currentLang === "ar" ? "المستندات المرفقة" : "Attached Documents"}
                  </Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    {uploadedFiles.length} {t.filesUploaded}
                  </p>
                </div>

                <Separator />

                <div className="p-6 rounded-xl bg-green-50 border-2 border-green-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="mb-2 text-green-900">
                        {currentLang === "ar" ? "جاهز للإرسال" : "Ready to Submit"}
                      </h4>
                      <p className="text-sm text-green-700">
                        {currentLang === "ar"
                          ? "راجع المعلومات أعلاه. بمجرد الإرسال، سيتم معالجة طلبك."
                          : "Review the information above. Once submitted, your application will be processed."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="border-2"
          >
            <ArrowLeft className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            {t.previous}
          </Button>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onCancel} className="border-2">
              <Save className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t.save}
            </Button>
            
            {currentStep < 4 ? (
              <Button onClick={handleNext} className="gradient-primary text-white border-0">
                {t.next}
                <ArrowRight className={`w-4 h-4 ${isRTL ? "mr-2" : "ml-2"}`} />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="gradient-primary text-white border-0">
                <Send className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                {t.submit}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
