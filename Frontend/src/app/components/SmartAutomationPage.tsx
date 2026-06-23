import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { toast } from "sonner";
import jsPDF from 'jspdf';
import { ServiceDetailsPage } from './ServiceDetailsPage';
import { 
  Zap,
  Search, 
  Bell, 
  BellRing,
  User,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  FileText,
  Eye,
  Download,
  Edit,
  Save,
  Building2,
  Car,
  GraduationCap,
  Heart,
  Banknote,
  Home,
  Scale,
  Shield,
  ChevronRight,
  Calendar,
  Star,
  TrendingUp,
  Lightbulb,
  Target,
  ArrowRight,
  PlayCircle,
  PauseCircle,
  Upload,
  Plus,
  Filter,
  Settings,
  FileCheck,
  Timer,
  Users,
  DollarSign,
  X
} from 'lucide-react';

interface SmartAutomationPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
  user?: any;
  preSelectedService?: any;
  userApplications?: any[];
  onAddApplication?: (application: any) => void;
  onUpdateApplication?: (applicationId: string, updates: any) => void;
}

export function SmartAutomationPage({ 
  currentLang, 
  onPageChange, 
  user, 
  preSelectedService,
  userApplications = [],
  onAddApplication,
  onUpdateApplication 
}: SmartAutomationPageProps) {
  const [activeTab, setActiveTab] = useState('services');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [automationStep, setAutomationStep] = useState(0);
  const [showFormPreview, setShowFormPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState('');
  const [showAppDetails, setShowAppDetails] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [selectedTrackingApplication, setSelectedTrackingApplication] = useState<any>(null);
  const [automationInterval, setAutomationInterval] = useState<NodeJS.Timeout | null>(null);
  const [showServiceDetails, setShowServiceDetails] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Application Status Update',
      titleAr: 'تحديث حالة الطلب',
      message: 'Your application status has been updated',
      messageAr: 'تم تحديث حالة طلبك',
      time: '2 hours ago',
      timeAr: 'منذ ساعتين',
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'New Service Available',
      titleAr: 'خدمة جديدة متاحة',
      message: 'Digital passport services are now available',
      messageAr: 'خدمات جواز السفر الرقمي متاحة الآن',
      time: '1 day ago',
      timeAr: 'منذ يوم واحد',
      read: false
    }
  ]);

  const translations = {
    en: {
      title: "Smart Government Services Automation",
      subtitle: "Apply for government services automatically using artificial intelligence",
      availableServices: "Available Services",
      trackingTab: "Track Applications",
      myApplications: "My Applications",
      searchServices: "Search for services...",
      filterByCategory: "Filter by category",
      allCategories: "All Categories",
      applyNow: "Apply Now",
      fee: "Fee",
      egp: "EGP",
      processingTime: "Processing Time",
      days: "days",
      requirements: "Requirements",
      notifications: "Notifications",
      automationEngine: "Automation Engine",
      smartSuggestions: "Smart Suggestions",
      applicationId: "Application ID",
      service: "Service",
      status: "Status",
      lastUpdate: "Last Update",
      nextAction: "Next Action",
      viewDetails: "View Details",
      downloadReceipt: "Download Receipt",
      // Status translations
      pending: "Pending",
      under_review: "Under Review",
      approved: "Approved",
      ready_pickup: "Ready for Pickup",
      completed: "Completed",
      rejected: "Rejected",
      processing: "Processing",
      // Additional translations
      requestAnalysis: "Request Analysis",
      addApplication: "Add Application",
      readyForTracking: "Ready for Tracking", 
      viewMyApplications: "View My Applications",
      completedSuccessfully: "Completed Successfully!",
      applicationAddedMessage: "Your application has been added to My Applications for tracking",
      noApplicationsYet: "No applications yet",
      browseServices: "Browse Services",
      submitted: "Submitted:",
      // Service categories
      civilServices: "Civil Services",
      financialServices: "Financial Services",
      educationalServices: "Educational Services",
      healthServices: "Health Services",
      transportServices: "Transport Services",
      utilitiesServices: "Utilities Services",
      professionalServices: "Professional Services",
      // Automation steps
      dataCollection: "Data Collection",
      documentVerification: "Document Verification", 
      formGeneration: "Form Generation",
      submission: "Submission",
      tracking: "Tracking",
      // Smart suggestions
      suggestionsTitle: "Based on your profile and recent activity:",
      applySuggestion: "Apply Now",
      suggestion1: "Renew your national ID before it expires in 30 days",
      suggestion2: "Complete property tax payment for 2024",
      suggestion3: "Update vehicle registration information",
      // Notifications
      markAllRead: "Mark All as Read",
      clearAll: "Clear All",
      noNotifications: "No new notifications",
      // Other
      startAutomation: "Start Smart Automation",
      exploreService: "Explore Service",
      quickPreview: "Quick Preview",
      nearestBranch: "Nearest Branch",
      bookAppointment: "Book Appointment",
      downloadForm: "Download Completed Form",
      submitOnline: "Submit Online",
      visitRequired: "Visit Required",
      onlineAvailable: "Available Online",
      workingHours: "Working Hours",
      contactInfo: "Contact Information",
      backToHome: "Back to Home",
      // Download and submission
      formGenerated: "Form Generated Successfully",
      submittingApplication: "Submitting Application...",
      applicationSubmitted: "Application Submitted Successfully",
      appointmentBooked: "Appointment Booked",
      bookAppointmentAction: "Book Appointment",
      viewOnMap: "View on Map",
      callBranch: "Call Branch",
      // Branch info
      branchInfo: "Branch Information",
      branchAddress: "Address",
      branchPhone: "Phone",
      branchHours: "Working Hours"
    },
    ar: {
      title: "أوتوميشن الخدمات الحكومية الذكي",
      subtitle: "تقدم على الخدمات الحكومية أوتوماتيكياً باستخدام الذكاء الاصطناعي",
      availableServices: "الخدمات المتاحة",
      trackingTab: "متابعة الطلبات", 
      myApplications: "طلباتي",
      searchServices: "البحث في الخدمات...",
      filterByCategory: "فلترة حسب الفئة",
      allCategories: "جميع الفئات",
      applyNow: "تقدم الآن",
      fee: "الرسوم",
      egp: "جنيه",
      processingTime: "مدة المعالجة",
      days: "يوم",
      requirements: "المتطلبات",
      notifications: "الإشعارات",
      automationEngine: "محرك الأوتوميشن",
      smartSuggestions: "التوصيات الذكية",
      applicationId: "رقم الطلب",
      service: "الخدمة",
      status: "الحالة",
      lastUpdate: "آخر تحديث",
      nextAction: "الإجراء التالي",
      viewDetails: "عرض التفاصيل",
      downloadReceipt: "تحميل الإيصال",
      // Status translations
      pending: "في الانتظار",
      under_review: "قيد المراجعة",
      approved: "تمت الموافقة",
      ready_pickup: "جاهز ��لاستلام",
      completed: "مكتمل",
      rejected: "مرفوض",
      processing: "قيد المعالجة",
      // Additional translations
      requestAnalysis: "تحليل الطلب",
      addApplication: "إضافة الطلب", 
      readyForTracking: "جاهز للمتابعة",
      viewMyApplications: "عرض طلباتي",
      completedSuccessfully: "تم بنجاح!",
      applicationAddedMessage: "تم إضافة طلبك إلى طلباتي ويمكنك متابعته من هناك",
      noApplicationsYet: "لا توجد طلبات بعد",
      browseServices: "تصفح الخدمات",
      submitted: "تاريخ التقديم:",
      // Service categories
      civilServices: "الخدمات المدنية",
      financialServices: "الخدمات المالية", 
      educationalServices: "الخدمات التعليمية",
      healthServices: "الخدمات الصحية",
      transportServices: "خدمات النقل",
      utilitiesServices: "خدمات المرافق",
      professionalServices: "الخدمات المهنية",
      // Automation steps
      dataCollection: "جمع البيانات",
      documentVerification: "التحقق من المستندات",
      formGeneration: "إنشاء النموذج",
      submission: "تقديم الطلب",
      tracking: "المتابعة",
      // Smart suggestions
      suggestionsTitle: "بناءً على ملفك الشخصي والنشاط الأخير:",
      applySuggestion: "تقدم الآن",
      suggestion1: "جدد بطاقتك الشخصية قبل انتهاء صلاحيتها خلال 30 يوماً",
      suggestion2: "أكمل دفع ضريبة العقار لعام 2024",
      suggestion3: "حدث بيانات تسجيل المركبة",
      // Notifications
      markAllRead: "تحديد الكل كمقروء",
      clearAll: "مسح الكل",
      noNotifications: "لا توجد إشعارات جديدة",
      // Other
      startAutomation: "بدء الأوتوميشن الذكي",
      exploreService: "استكشف الخدمة",
      quickPreview: "معاينة سريعة",
      nearestBranch: "أقرب فرع",
      bookAppointment: "حجز موعد",
      downloadForm: "تحميل النموذج المكتمل",
      submitOnline: "تقديم أونلاين",
      visitRequired: "زيارة مطلوبة",
      onlineAvailable: "متاح أونلاين",
      workingHours: "ساعات العمل",
      contactInfo: "معلومات الاتصال",
      backToHome: "العودة للرئيسية",
      // Download and submission
      formGenerated: "تم إنشاء النموذج بنجاح",
      submittingApplication: "جاري تقديم الطلب...",
      applicationSubmitted: "تم تقديم الطلب بنجاح",
      appointmentBooked: "تم حجز الموعد",
      bookAppointmentAction: "حجز موعد",
      viewOnMap: "عرض على الخريطة",
      callBranch: "الاتصال بالفرع",
      // Branch info
      branchInfo: "معلومات الفرع",
      branchAddress: "العنوان",
      branchPhone: "الهاتف",
      branchHours: "ساعات العمل"
    }
  };

  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  // Sample government services data
  const governmentServices = [
    // Civil Services
    {
      id: 'passport_renewal',
      icon: Shield,
      name: 'Passport Renewal',
      nameAr: 'تجديد جواز السفر',
      title: currentLang === 'ar' ? 'تجديد جواز السفر' : 'Passport Renewal',
      description: 'Renew your Egyptian passport with fast processing and AI assistance',
      descriptionAr: 'تجديد جواز السفر المصري مع معالجة سريعة ومساعدة الذكاء الاصطناعي',
      category: 'civilServices',
      fee: 350,
      processingTime: 7,
      estimatedDays: 7,
      status: 'online',
      popular: true,
      availability: 'available',
      successRate: '98.5%',
      requirements: ['National ID', 'Photos', 'Old Passport', 'Fee Receipt'],
      requiredDocuments: ['National ID', 'Photos (4x6 cm)', 'Old Passport', 'Fee Receipt'],
      requiredDocumentsAr: ['البطاقة الشخصية', 'صور شخصية (4×6)', 'جواز السفر القديم', 'إيصال دفع الرسوم'],
      workingHours: 'Sun - Thu: 9:00 AM - 3:00 PM',
      phone: '16328',
      ministry: 'Ministry of Interior - Passport Authority'
    },
    {
      id: 'national_id',
      icon: User,
      name: 'National ID',
      nameAr: 'البطاقة الشخصية',
      title: currentLang === 'ar' ? 'البطاقة الشخصية' : 'National ID',
      description: 'Issue and renew your national ID card with digital processing',
      descriptionAr: 'إصدار وتجديد البطاقة الشخصية مع المعالجة الرقمية',
      category: 'civilServices',
      fee: 50,
      processingTime: 5,
      estimatedDays: 5,
      estimatedMinutes: 12,
      status: 'both',
      popular: true,
      availability: 'available',
      successRate: '99.2%',
      requirements: ['Birth Certificate', 'Photos', 'Proof of Address'],
      requiredDocuments: ['Birth Certificate', 'Personal Photos (4x6)', 'Proof of Residence'],
      requiredDocumentsAr: ['شهادة الميلاد', 'صور شخصية (4×6)', 'إثبات محل إقامة'],
      workingHours: 'Sun - Thu: 8:00 AM - 3:00 PM',
      phone: '16328',
      ministry: 'Ministry of Interior - Civil Status'
    },
    {
      id: 'birth_certificate',
      icon: Heart,
      name: 'Birth Certificate',
      nameAr: 'شهادة الميلاد',
      title: currentLang === 'ar' ? 'شهادة الميلاد' : 'Birth Certificate',
      description: 'Issue a birth certificate for your newborn with fast processing',
      descriptionAr: 'استخراج شهادة ميلاد للمولود الجديد مع معالجة سريعة',
      category: 'civilServices',
      fee: 25,
      processingTime: 2,
      estimatedDays: 2,
      estimatedMinutes: 10,
      status: 'both',
      popular: false,
      availability: 'available',
      requirements: ['Birth Declaration', 'Parents ID', 'Witnesses'],
      requiredDocuments: ['Hospital Birth Declaration', 'Parents National IDs', 'Two Witnesses IDs'],
      requiredDocumentsAr: ['إقرار الولادة من المستشفى', 'بطاقات الوالدين', 'بطاقات الشاهدين'],
      workingHours: 'Sun - Thu: 8:00 AM - 3:00 PM',
      phone: '16328',
      ministry: 'Ministry of Interior - Civil Status'
    },
    {
      id: 'death_certificate',
      icon: FileText,
      title: currentLang === 'ar' ? 'شهادة الوفاة' : 'Death Certificate',
      description: currentLang === 'ar' ? 'استخراج شهادة وفاة' : 'Issue death certificate',
      category: 'civilServices',
      fee: 25,
      processingTime: 1,
      status: 'both',
      popular: false,
      requirements: currentLang === 'ar' ? 
        ['تقرير طبي', 'بطاقة المتوفى', 'بطاقة مقدم الطلب'] :
        ['Medical Report', 'Deceased ID', 'Applicant ID']
    },
    {
      id: 'marriage_certificate',
      icon: Users,
      title: currentLang === 'ar' ? 'عقد الزواج' : 'Marriage Certificate',
      description: currentLang === 'ar' ? 'توثيق عقد الزواج' : 'Marriage contract registration',
      category: 'civilServices',
      fee: 75,
      processingTime: 1,
      status: 'visit',
      popular: false,
      requirements: currentLang === 'ar' ? 
        ['بطاقة الزوجين', 'شاهدين', 'شهادة خلو موانع'] :
        ['Couple IDs', 'Witnesses', 'No Impediment Certificate']
    },
    {
      id: 'family_record',
      icon: Users,
      title: currentLang === 'ar' ? 'قيد ال��ائلة' : 'Family Record',
      description: currentLang === 'ar' ? 'استخراج قيد عائلة' : 'Issue family record',
      category: 'civilServices',
      fee: 30,
      processingTime: 3,
      status: 'both',
      popular: true,
      requirements: currentLang === 'ar' ? 
        ['البطاقة الشخصية', 'شهادات الميلاد', 'عقد الزواج'] :
        ['National ID', 'Birth Certificates', 'Marriage Contract']
    },

    // Transport Services
    {
      id: 'driving_license',
      icon: Car,
      name: 'Driving License',
      nameAr: 'رخصة القيادة',
      title: currentLang === 'ar' ? 'رخصة القيادة' : 'Driving License',
      description: 'Issue or renew your driving license with automated processing',
      descriptionAr: 'إصدار أو تجديد رخصة القيادة مع المعالجة الآلية',
      category: 'transportServices',
      fee: 120,
      processingTime: 3,
      estimatedDays: 3,
      estimatedMinutes: 18,
      status: 'both',
      popular: true,
      availability: 'available',
      successRate: '97.8%',
      requirements: ['Medical Certificate', 'National ID', 'Photos'],
      requiredDocuments: ['Valid Medical Certificate', 'National ID', 'Personal Photos (4x6)', 'Old License (for renewal)'],
      requiredDocumentsAr: ['الشهادة الطبية السارية', 'البطاقة الشخصية', 'صور شخصية (4×6)', 'الرخصة القديمة (للتجديد)'],
      workingHours: 'Sun - Thu: 9:00 AM - 3:00 PM',
      phone: '16700',
      ministry: 'Ministry of Interior - Traffic Department'
    },
    {
      id: 'vehicle_registration',
      icon: Car,
      title: currentLang === 'ar' ? 'تسجيل المركبة' : 'Vehicle Registration',
      description: currentLang === 'ar' ? 'تسجيل مركبة جديدة' : 'Register new vehicle',
      category: 'transportServices',
      fee: 200,
      processingTime: 5,
      status: 'visit',
      popular: false,
      requirements: currentLang === 'ar' ? 
        ['فاتورة البيع', 'شهادة الجمارك', 'البطاقة الشخصية', 'تأمين المركبة'] :
        ['Sales Invoice', 'Customs Certificate', 'National ID', 'Vehicle Insurance']
    },
    {
      id: 'vehicle_license',
      icon: FileCheck,
      title: currentLang === 'ar' ? 'رخصة السير' : 'Vehicle License',
      description: currentLang === 'ar' ? 'تجديد رخصة سير المركبة' : 'Renew vehicle circulation license',
      category: 'transportServices',
      fee: 80,
      processingTime: 1,
      status: 'both',
      popular: true,
      requirements: currentLang === 'ar' ? 
        ['رخصة السير القديمة', 'تأمين ساري', 'فحص دوري'] :
        ['Old License', 'Valid Insurance', 'Periodic Inspection']
    },

    // Financial Services
    {
      id: 'tax_declaration',
      icon: Banknote,
      title: currentLang === 'ar' ? 'الإقرار الضريبي' : 'Tax Declaration',
      description: currentLang === 'ar' ? 'تقديم الإقرار الضريبي السنوي' : 'Submit annual tax declaration',
      category: 'financialServices',
      fee: 100,
      processingTime: 10,
      status: 'online',
      popular: false,
      requirements: currentLang === 'ar' ? 
        ['بيان الدخل', 'البطاقة الضريبية', 'المستندات المؤيدة'] :
        ['Income Statement', 'Tax Card', 'Supporting Documents']
    },
    {
      id: 'property_registration',
      icon: Home,
      title: currentLang === 'ar' ? 'تسجيل العقار' : 'Property Registration',
      description: currentLang === 'ar' ? 'تسجيل وتوثيق العقارات' : 'Register and authenticate properties',
      category: 'financialServices',
      fee: 200,
      processingTime: 14,
      status: 'visit',
      popular: false,
      requirements: currentLang === 'ar' ? 
        ['سند الملكية', 'البطاقة الشخصية', 'المخططات الهندسية'] :
        ['Ownership Deed', 'National ID', 'Engineering Plans']
    },
    {
      id: 'tax_card',
      icon: CreditCard,
      title: currentLang === 'ar' ? 'البطاقة الضريبية' : 'Tax Card',
      description: currentLang === 'ar' ? 'إصدار بطاقة ضريبية جديدة' : 'Issue new tax card',
      category: 'financialServices',
      fee: 50,
      processingTime: 7,
      status: 'both',
      popular: false,
      requirements: currentLang === 'ar' ? 
        ['البطاقة الشخصية', 'شهادة التخرج', 'إثبات العمل'] :
        ['National ID', 'Degree Certificate', 'Employment Proof']
    },
    {
      id: 'commercial_register',
      icon: Building2,
      title: currentLang === 'ar' ? 'السجل التجاري' : 'Commercial Register',
      description: currentLang === 'ar' ? 'تسجيل نشاط تجاري' : 'Register commercial activity',
      category: 'financialServices',
      fee: 150,
      processingTime: 10,
      status: 'both',
      popular: false,
      requirements: currentLang === 'ar' ? 
        ['البطاقة الشخصية', 'عقد الإيجار', 'رخصة المحل'] :
        ['National ID', 'Lease Contract', 'Shop License']
    },

    // Educational Services
    {
      id: 'school_certificate',
      icon: GraduationCap,
      title: currentLang === 'ar' ? 'شهادة مدرسية' : 'School Certificate',
      description: currentLang === 'ar' ? 'استخراج شهادة دراسية' : 'Issue school certificate',
      category: 'educationalServices',
      fee: 30,
      processingTime: 5,
      status: 'both',
      popular: false,
      requirements: currentLang === 'ar' ? 
        ['البطاقة الشخصية', 'شهادة الميلاد', 'آخر مؤهل'] :
        ['National ID', 'Birth Certificate', 'Last Qualification']
    },
    {
      id: 'university_certificate',
      icon: GraduationCap,
      title: currentLang === 'ar' ? 'شهادة جامعية' : 'University Certificate',
      description: currentLang === 'ar' ? 'تصديق الشهادات الجامعية' : 'Authenticate university certificates',
      category: 'educationalServices',
      fee: 75,
      processingTime: 7,
      status: 'both',
      popular: false,
      requirements: currentLang === 'ar' ? 
        ['الشهادة الأصلية', 'البطاقة الشخصية', 'كشف الدرجات'] :
        ['Original Certificate', 'National ID', 'Transcript']
    },
    {
      id: 'student_enrollment',
      icon: GraduationCap,
      title: currentLang === 'ar' ? 'تسجيل طالب' : 'Student Enrollment',
      description: currentLang === 'ar' ? 'تسجيل طالب في مدرسة' : 'Enroll student in school',
      category: 'educationalServices',
      fee: 20,
      processingTime: 3,
      status: 'both',
      popular: true,
      requirements: currentLang === 'ar' ? 
        ['شهادة الميلاد', 'بطاقة ولي الأمر', '��هادة التطعيمات'] :
        ['Birth Certificate', 'Guardian ID', 'Vaccination Certificate']
    },

    // Health Services
    {
      id: 'health_insurance',
      icon: Heart,
      title: currentLang === 'ar' ? 'التأمين الصحي' : 'Health Insurance',
      description: currentLang === 'ar' ? 'الاشتراك في التأمين الصحي' : 'Subscribe to health insurance',
      category: 'healthServices',
      fee: 120,
      processingTime: 7,
      status: 'both',
      popular: true,
      requirements: currentLang === 'ar' ? 
        ['البطاقة الشخصية', 'إثبات الدخل', 'الكشف الطبي'] :
        ['National ID', 'Income Proof', 'Medical Examination']
    },
    {
      id: 'medical_report',
      icon: FileText,
      title: currentLang === 'ar' ? 'تقرير طبي' : 'Medical Report',
      description: currentLang === 'ar' ? 'استخراج تقرير طبي معتمد' : 'Issue certified medical report',
      category: 'healthServices',
      fee: 40,
      processingTime: 1,
      status: 'visit',
      popular: false,
      requirements: currentLang === 'ar' ? 
        ['البطاقة الشخصية', 'الفحوصات المطلوبة'] :
        ['National ID', 'Required Tests']
    },
    {
      id: 'vaccination_certificate',
      icon: Shield,
      title: currentLang === 'ar' ? 'شهادة التطعيم' : 'Vaccination Certificate',
      description: currentLang === 'ar' ? 'شهادة التطعيمات للسفر' : 'Vaccination certificate for travel',
      category: 'healthServices',
      fee: 50,
      processingTime: 2,
      status: 'both',
      popular: false,
      requirements: currentLang === 'ar' ? 
        ['البطاقة الشخصية', 'سجل التطعيمات', 'جواز السفر'] :
        ['National ID', 'Vaccination Record', 'Passport']
    },

    // Utilities Services
    {
      id: 'electricity_connection',
      icon: Zap,
      title: currentLang === 'ar' ? 'توصيل الكهرباء' : 'Electricity Connection',
      description: currentLang === 'ar' ? 'طلب توصيل كهرباء جديد' : 'Request new electricity connection',
      category: 'utilitiesServices',
      fee: 300,
      processingTime: 14,
      status: 'both',
      popular: false,
      requirements: currentLang === 'ar' ? 
        ['البطاقة الشخصية', 'عقد الملكية', 'رخصة البناء'] :
        ['National ID', 'Ownership Contract', 'Building Permit']
    },
    {
      id: 'water_connection',
      icon: Heart,
      title: currentLang === 'ar' ? 'توصيل المياه' : 'Water Connection',
      description: currentLang === 'ar' ? 'طلب توصيل مياه جديد' : 'Request new water connection',
      category: 'utilitiesServices',
      fee: 250,
      processingTime: 10,
      status: 'both',
      popular: false,
      requirements: currentLang === 'ar' ? 
        ['البطاقة الشخصية', 'عقد الملكية', 'رسم المكان'] :
        ['National ID', 'Ownership Contract', 'Location Map']
    },
    {
      id: 'gas_connection',
      icon: Home,
      title: currentLang === 'ar' ? 'توصيل الغاز' : 'Gas Connection',
      description: currentLang === 'ar' ? 'طلب توصيل غاز طبيعي' : 'Request natural gas connection',
      category: 'utilitiesServices',
      fee: 400,
      processingTime: 21,
      status: 'visit',
      popular: false,
      requirements: currentLang === 'ar' ? 
        ['البطاقة الشخصية', 'عقد الملكية', 'موافقة أمنية'] :
        ['National ID', 'Ownership Contract', 'Security Approval']
    },

    // Professional Services
    {
      id: 'business_license',
      icon: Building2,
      title: currentLang === 'ar' ? 'ترخيص مهنة' : 'Professional License',
      description: currentLang === 'ar' ? 'ترخيص مزاولة مهنة' : 'Professional practice license',
      category: 'professionalServices',
      fee: 180,
      processingTime: 14,
      status: 'both',
      popular: false,
      requirements: currentLang === 'ar' ? 
        ['البطاقة الشخصية', 'شهادة التخرج', 'شهادة خبرة'] :
        ['National ID', 'Graduation Certificate', 'Experience Certificate']
    },
    {
      id: 'work_permit',
      icon: FileCheck,
      title: currentLang === 'ar' ? 'تصريح عمل' : 'Work Permit',
      description: currentLang === 'ar' ? 'تصريح عمل للأجانب' : 'Work permit for foreigners',
      category: 'professionalServices',
      fee: 500,
      processingTime: 21,
      status: 'visit',
      popular: false,
      requirements: currentLang === 'ar' ? 
        ['جواز السفر', 'عقد العمل', 'شهادة خلو أمراض'] :
        ['Passport', 'Employment Contract', 'Health Certificate']
    }
  ];

  // Sample user applications (fallback if no applications provided)
  const fallbackApplications = [
    {
      id: 'APP-2025-001',
      service: currentLang === 'ar' ? 'تجديد جواز السفر' : 'Passport Renewal',
      status: 'under_review',
      lastUpdate: '2025-01-15',
      nextAction: currentLang === 'ar' ? 'انتظار الموافقة الأمنية' : 'Awaiting security approval',
      progress: 75,
      fee: 350,
      submissionDate: '2025-01-10'
    },
    {
      id: 'APP-2025-002', 
      service: currentLang === 'ar' ? 'رخصة القيادة' : 'Driving License',
      status: 'ready_pickup',
      lastUpdate: '2025-01-12',
      nextAction: currentLang === 'ar' ? 'جاهز للاستلام من الفرع' : 'Ready for pickup from branch',
      progress: 100,
      fee: 120,
      submissionDate: '2025-01-08'
    },
    {
      id: 'APP-2025-003',
      service: currentLang === 'ar' ? 'شهادة الميلاد' : 'Birth Certificate', 
      status: 'pending',
      lastUpdate: '2025-01-10',
      nextAction: currentLang === 'ar' ? 'رفع المستندات المطلوبة' : 'Upload required documents',
      progress: 25,
      fee: 25,
      submissionDate: '2025-01-10'
    },
    {
      id: 'APP-2025-004',
      service: currentLang === 'ar' ? 'التأمين الصحي' : 'Health Insurance',
      status: 'approved',
      lastUpdate: '2025-01-14',
      nextAction: currentLang === 'ar' ? 'تسديد الرسوم المتبقية' : 'Pay remaining fees',
      progress: 90,
      fee: 120,
      submissionDate: '2025-01-05'
    },
    {
      id: 'APP-2025-005',
      service: currentLang === 'ar' ? 'البطاقة الضريبية' : 'Tax Card',
      status: 'processing',
      lastUpdate: '2025-01-13',
      nextAction: currentLang === 'ar' ? 'قيد المراجعة النهائية' : 'Under final review',
      progress: 60,
      fee: 50,
      submissionDate: '2025-01-09'
    }
  ];

  // Use provided userApplications or fallback
  const displayApplications = userApplications.length > 0 ? userApplications : fallbackApplications;

  // Cleanup automation interval on component unmount or when automation stops
  useEffect(() => {
    return () => {
      if (automationInterval) {
        clearInterval(automationInterval);
      }
    };
  }, [automationInterval]);

  // Function to handle automation start
  const handleStartAutomation = (service: any) => {
    if (!user) {
      toast.error(currentLang === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Please login first');
      return;
    }
    
    // Clear any existing automation first
    if (automationInterval) {
      clearInterval(automationInterval);
      setAutomationInterval(null);
    }
    
    setAutomationStep(0);
    setSelectedService(service);
    
    // Show loading toast and store its ID for later dismissal
    const loadingToastId = toast.loading(currentLang === 'ar' ? 'بدء الأوتوميشن الذكي...' : 'Starting smart automation...');
    
    // Simulate automation steps
    const steps = [1, 2, 3, 4, 5];
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      setAutomationStep(currentStep);
      
      if (currentStep >= steps.length) {
        // Clear the interval immediately
        clearInterval(interval);
        setAutomationInterval(null);
        
        // Dismiss the loading toast
        toast.dismiss(loadingToastId);
        
        // Create and add application when automation completes
        if (onAddApplication) {
          const newApplication = {
            service: service.title,
            fee: service.fee,
            nextAction: currentLang === 'ar' ? 'مراجعة المستندات المطلوبة' : 'Review required documents'
          };
          onAddApplication(newApplication);
        }

        // Show completion message
        toast.success(
          currentLang === 'ar' 
            ? 'تم إكمال الأوتوميشن وإضافة الطلب إلى طلباتي!' 
            : 'Automation completed and application added to My Applications!'
        );

        // Reset automation immediately after completion
        setAutomationStep(0);
        setSelectedService(null);
      }
    }, 1000);

    // Store interval ID for cleanup
    setAutomationInterval(interval);

    // Set a maximum timeout as failsafe (10 seconds)
    setTimeout(() => {
      if (currentStep < steps.length) {
        clearInterval(interval);
        setAutomationInterval(null);
        toast.dismiss(loadingToastId);
        toast.error(
          currentLang === 'ar' 
            ? 'انتهت مهلة الأوتوميشن. يرجى المحاولة مرة أخرى.' 
            : 'Automation timeout. Please try again.'
        );
        setAutomationStep(0);
        setSelectedService(null);
      }
    }, 10000);
  };

  // Function to stop automation manually
  const handleStopAutomation = () => {
    if (automationInterval) {
      clearInterval(automationInterval);
      setAutomationInterval(null);
    }
    
    // Dismiss any loading toasts
    toast.dismiss();
    
    // Reset automation state
    setAutomationStep(0);
    setSelectedService(null);
    
    toast.info(
      currentLang === 'ar' ? 'تم إيقاف الأوتوميشن' : 'Automation stopped'
    );
  };

  // Function to handle tracking specific application
  const handleTrackApplication = (application: any) => {
    setSelectedTrackingApplication(application);
    setActiveTab('tracking');
    
    toast.success(
      currentLang === 'ar' 
        ? `عرض تفاصيل متابعة طلب ${application.service}` 
        : `Tracking details for ${application.service} application`
    );
  };





  // Smart suggestions
  const smartSuggestions = [
    {
      id: 1,
      title: t.suggestion1,
      service: 'national_id',
      priority: 'high',
      confidence: 95,
      icon: User
    },
    {
      id: 2,
      title: t.suggestion2,
      service: 'tax_declaration',
      priority: 'medium', 
      confidence: 88,
      icon: Banknote
    },
    {
      id: 3,
      title: t.suggestion3,
      service: 'driving_license',
      priority: 'low',
      confidence: 72,
      icon: Car
    }
  ];

  // Filter services based on search and category
  const filteredServices = governmentServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Service categories for filter
  const serviceCategories = [
    { id: 'all', name: t.allCategories, icon: Target },
    { id: 'civilServices', name: t.civilServices, icon: Users },
    { id: 'financialServices', name: t.financialServices, icon: DollarSign },
    { id: 'transportServices', name: t.transportServices, icon: Car },
    { id: 'educationalServices', name: t.educationalServices, icon: GraduationCap },
    { id: 'healthServices', name: t.healthServices, icon: Heart },
    { id: 'utilitiesServices', name: t.utilitiesServices, icon: Zap },
    { id: 'professionalServices', name: t.professionalServices, icon: Building2 }
  ];

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    setAutomationStep(1);
    toast.success(currentLang === 'ar' ? 'بدء عملية الأوتوميشن...' : 'Starting automation process...');
  };



  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'ready_pickup': return 'bg-emerald-100 text-emerald-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'under_review': return <RefreshCw className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'ready_pickup': return <FileCheck className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Function to generate and download form PDF
  const handleDownloadForm = (service: any, preview: boolean = false) => {
    if (!user) {
      toast.error(currentLang === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Please login first');
      return;
    }

    if (!preview) {
      toast.loading(currentLang === 'ar' ? 'جاري إنشاء النموذج...' : 'Generating PDF form...');
    }

    // Simulate form generation time
    setTimeout(() => {
      try {
        // Create PDF document
        const pdf = new jsPDF('p', 'mm', 'a4');
        const formContent = generateFormContentForPDF(service, user);
        
        if (preview) {
          // For preview, show content in modal
          setPreviewContent(formContent.text);
          setShowFormPreview(true);
          return;
        }

        // Configure PDF settings for better text rendering
        pdf.setFont('helvetica', 'normal');
        
        // Add header with logo area
        pdf.setFontSize(16);
        pdf.setTextColor(0, 77, 64); // Primary color
        
        if (currentLang === 'ar') {
          pdf.text('جمهورية مصر العربية', 105, 15, { align: 'center' });
          pdf.setFontSize(14);
          pdf.text('نموذج طلب خدمة حكومية', 105, 25, { align: 'center' });
        } else {
          pdf.text('ARAB REPUBLIC OF EGYPT', 105, 15, { align: 'center' });
          pdf.setFontSize(14);
          pdf.text('Government Service Application Form', 105, 25, { align: 'center' });
        }

        // Reset color
        pdf.setTextColor(0, 0, 0);
        
        // Add content with improved formatting
        const lines = formContent.text.split('\n');
        let y = 40;
        const lineHeight = 5;
        const maxWidth = 190;
        const margin = 15;

        lines.forEach((line: string) => {
          // Handle page breaks
          if (y > 270) {
            pdf.addPage();
            y = 20;
          }

          // Skip empty lines but maintain spacing
          if (line.trim() === '') {
            y += lineHeight / 2;
            return;
          }

          // Handle section headers (lines with ═ or ─)
          if (line.includes('═') || line.includes('─')) {
            pdf.setFontSize(1);
            pdf.text('_'.repeat(60), margin, y);
            y += lineHeight;
            return;
          }

          // Handle titles and important lines
          if (line.includes(':') && line.trim().length < 50) {
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'bold');
          } else {
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'normal');
          }

          // Clean the line for better display
          const cleanLine = line.replace(/[═─]/g, '').trim();
          
          if (cleanLine) {
            // Handle Arabic text direction
            if (currentLang === 'ar' && /[\u0600-\u06FF]/.test(cleanLine)) {
              // Split long Arabic lines
              const words = cleanLine.split(' ');
              let currentLine = '';
              
              for (let word of words) {
                const testLine = currentLine + word + ' ';
                const textWidth = pdf.getTextWidth(testLine);
                
                if (textWidth > (maxWidth - margin * 2) && currentLine !== '') {
                  pdf.text(currentLine.trim(), maxWidth - margin, y, { align: 'right' });
                  y += lineHeight;
                  currentLine = word + ' ';
                } else {
                  currentLine = testLine;
                }
              }
              
              if (currentLine.trim()) {
                pdf.text(currentLine.trim(), maxWidth - margin, y, { align: 'right' });
              }
            } else {
              // Handle English text with word wrapping
              const words = cleanLine.split(' ');
              let currentLine = '';
              
              for (let word of words) {
                const testLine = currentLine + word + ' ';
                const textWidth = pdf.getTextWidth(testLine);
                
                if (textWidth > (maxWidth - margin * 2) && currentLine !== '') {
                  pdf.text(currentLine.trim(), margin, y);
                  y += lineHeight;
                  currentLine = word + ' ';
                } else {
                  currentLine = testLine;
                }
              }
              
              if (currentLine.trim()) {
                pdf.text(currentLine.trim(), margin, y);
              }
            }
          }
          
          y += lineHeight;
        });

        // Add footer
        const totalPages = pdf.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(8);
          pdf.setTextColor(128, 128, 128);
          pdf.text(`${currentLang === 'ar' ? 'صفحة' : 'Page'} ${i} ${currentLang === 'ar' ? 'من' : 'of'} ${totalPages}`, 105, 290, { align: 'center' });
          pdf.text(`${currentLang === 'ar' ? 'مُنشأ بواسطة' : 'Generated by'} Masr AI Agent`, 105, 295, { align: 'center' });
        }

        // Generate filename
        const timestamp = new Date().toISOString().slice(0, 10);
        const serviceName = service.id.replace(/_/g, '-');
        const filename = `${serviceName}-form-${timestamp}.pdf`;

        // Download PDF
        pdf.save(filename);

        toast.success(
          currentLang === 'ar' 
            ? `تم تحميل نموذج ${service.title} بصيغة PDF بنجاح!` 
            : `${service.title} PDF form downloaded successfully!`
        );

        // Show additional instructions
        setTimeout(() => {
          toast.info(
            currentLang === 'ar' 
              ? 'تأكد من طباعة النموذج وإحضار جميع المستندات المطلوبة' 
              : 'Please print the form and bring all required documents',
            { duration: 4000 }
          );
        }, 1000);

      } catch (error) {
        console.error('PDF generation error:', error);
        toast.error(
          currentLang === 'ar' 
            ? 'حدث خطأ في إنشاء النموذج' 
            : 'Error generating form'
        );
      }
    }, preview ? 500 : 1500);
  };

  // Function to preview form
  const handlePreviewForm = (service: any) => {
    handleDownloadForm(service, true);
  };

  // Function to generate form content for PDF
  const generateFormContentForPDF = (service: any, userData: any) => {
    const currentDate = new Date().toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US');
    const currentTime = new Date().toLocaleTimeString(currentLang === 'ar' ? 'ar-EG' : 'en-US');
    const formId = `MSR-${service.id.toUpperCase().replace(/_/g, '')}-${Date.now().toString().slice(-6)}`;
    const branchInfo = getBranchInfo(service);
    
    if (currentLang === 'ar') {
      return {
        text: `

رقم النموذج: ${formId}
تاريخ الإنشاء: ${currentDate} - ${currentTime}
نظام الإنشاء: Masr AI Agent - الأوتوميشن الذكي
نوع الخدمة: ${service.title}

─────────────────────────────────────────
بيانات المتقدم
─────────────────────────────────────────

الاسم الكامل: ${userData.name || '___________________________'}

الرقم القومي: ${userData.nationalId || '___________________________'}

رقم الهاتف: ${userData.phone || '___________________________'}

البريد الإلكتروني: ${userData.email || '___________________________'}

العنوان: ${userData.location || '___________________________'}

تاريخ الميلاد: ___________________________

النوع: [ ] ذكر  [ ] أنثى

─────────────────────────────────────────
تفاصيل الطلب المحدد
─────────────────────────────────────────

وصف الخدمة: ${service.description}

الرسوم المطلوبة: ${service.fee} جنيه مصري

مدة المعالجة المتوقعة: ${service.processingTime} يوم عمل

الحالة: ${service.status === 'online' ? 'يمكن التقديم أونلاين' : 'يتطلب زيارة شخصية'}

─────────────────────────────────────────
المستندات المطلوبة
─────────────────────────────────────────

${service.requirements.map((req: string, index: number) => 
  `☐ ${index + 1}. ${req}`
).join('\n\n')}

☐ إضافي: صورة من إيصال دفع الرسوم
☐ إضافي: صورة شخصية حديثة (إن لزم الأمر)

─────────────────────────────────────────
معلومات الفرع المختص
─────────────────────────────────────────

اسم الفرع: ${branchInfo.nameAr}

العنوان: ${branchInfo.addressAr}

رقم الهاتف: ${branchInfo.phone}

ساعات العمل: ${branchInfo.hours}

──────────────────��──────────────────────
تعليمات هامة
─────────────────────────────────────────

• يجب إحضار جميع المستندات الأصلية + صور منها

• التأكد من صحة جميع البيانات المدخلة قبل التقديم

• الاحتفاظ برقم النموذج: ${formId} لمتابعة حالة الطلب

• مراجعة ساعات العمل قبل الزيارة

• الرسوم قابلة للدفع نقداً أو إلكترونياً

─────────────────────────────────────────
إقرار وتوقيع المتقدم
─────────────────────────────────────────

أتعهد بأن جميع البيانات والمعلومات المذكورة أعلاه صحيحة ودقيقة،
وأتحمل المسؤولية القانونية الكاملة عن صحة هذه البيانات.

اسم المتقدم: _________________________________

توقيع المتقدم: _________________________________

التاريخ: ${currentDate}

[ ] أوافق على شروط وأحكام الخدمة

─────────────────────────────────────────
للاستخدام الرسمي فقط
─────────────────────────────────────────

تاريخ الاستلام: ___________

رقم القيد: ___________

موظف الاستقبال: ___________

التوقيع: ___________

حالة الطلب: ___________

تاريخ الإن��از المتوقع: ___________

─────────────────────────────────────────

تم إنشاء هذا النموذج آلياً بواسطة نظام Masr AI Agent
نظام الأوتوميشن الذكي للخدمات الحكومية
جمهورية مصر العربية

`,
        metadata: { formId, date: currentDate, service: service.title }
      };
    } else {
      return {
        text: `

Form ID: ${formId}
Generated: ${currentDate} - ${currentTime}
System: Masr AI Agent - Smart Automation
Service Type: ${service.title}

─────────────────────────────────────────
APPLICANT INFORMATION
─────────────────────────────────────────

Full Name: ${userData.name || '___________________________'}

National ID: ${userData.nationalId || '___________________________'}

Phone Number: ${userData.phone || '___________________________'}

Email Address: ${userData.email || '___________________________'}

Address: ${userData.location || '___________________________'}

Date of Birth: ___________________________

Gender: [ ] Male  [ ] Female

─────────────────────────────────────────
APPLICATION DETAILS
─────────────────────────────────────────

Service Description: ${service.description}

Required Fee: ${service.fee} EGP

Expected Processing Time: ${service.processingTime} working days

Status: ${service.status === 'online' ? 'Online submission available' : 'Office visit required'}

─────────────────────────────────────────
REQUIRED DOCUMENTS CHECKLIST
─────────────────────────────────────────

${service.requirements.map((req: string, index: number) => 
  `☐ ${index + 1}. ${req}`
).join('\n\n')}

☐ Additional: Copy of fee payment receipt
☐ Additional: Recent photograph (if required)

─────────────────────────────────────────
RESPONSIBLE OFFICE INFORMATION
─────────────────────────────────────────

Office Name: ${branchInfo.name}

Address: ${branchInfo.address}

Phone Number: ${branchInfo.phone}

Working Hours: ${branchInfo.hours}

─────────────────────────────────────────
IMPORTANT INSTRUCTIONS
─────────────────────────────────────────

• Bring all original documents + photocopies

• Ensure all information is accurate before submission

• Keep form ID: ${formId} for application tracking

• Check working hours before visiting

• Fees can be paid in cash or electronically

─────────────────────────────────────────
APPLICANT DECLARATION & SIGNATURE
─────────────────────────────────────────

I hereby declare that all information and data mentioned above 
are true and accurate, and I bear full legal responsibility 
for the accuracy of this information.

Applicant Name: _________________________________

Applicant Signature: _________________________________

Date: ${currentDate}

[ ] I agree to the terms and conditions of service

─────────────────────────────────────────
FOR OFFICIAL USE ONLY
─────────────────────────────────────────

Received Date: ___________

Record Number: ___________

Receiving Officer: ___________

Signature: ___________

Application Status: ___________

Expected Completion Date: ___________

─────────────────────────────────────────

This form was automatically generated by Masr AI Agent
Smart Government Services Automation System
Arab Republic of Egypt

`,
        metadata: { formId, date: currentDate, service: service.title }
      };
    }
  };

  // Function to generate form content (legacy for text files)
  const generateFormContent = (service: any, userData: any) => {
    const currentDate = new Date().toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US');
    const currentTime = new Date().toLocaleTimeString(currentLang === 'ar' ? 'ar-EG' : 'en-US');
    const formId = `MSR-${service.id.toUpperCase().replace(/_/g, '')}-${Date.now().toString().slice(-6)}`;
    const branchInfo = getBranchInfo(service);
    
    if (currentLang === 'ar') {
      return `
██████████████████████████████████████████████████████████
           جمهورية مصر العربية
        نموذج طلب خدمة حكومية ذكي
           ${service.title}
██████████████████████████████████████████████████████████

🔸 رقم النموذج: ${formId}
🔸 تاريخ الإنشاء: ${currentDate} - ${currentTime}
🔸 نظام الإنشاء: Masr AI Agent - الأوتوميشن الذكي
🔸 الحالة: ${service.status === 'online' ? 'يمكن التقديم أونلاين' : 'يتطلب زيارة شخصية'}

══════════════════════════════════════════════════════════
                    🏛️ بيانات المتقدم
══════════════════════════════════════════════════════════

📝 الاسم الكامل: ${userData.name || '___________________________'}
🆔 الرقم القومي: ${userData.nationalId || '___________________________'}
📱 رقم الهاتف: ${userData.phone || '___________________________'}
📧 البريد الإلكتروني: ${userData.email || '___________________________'}
📍 العنوان: ${userData.location || '___________________________'}
📅 تاريخ الميلاد: ___________________________
🚹 النوع: [ ] ذكر  [ ] أنثى

══════════════════════════════════════════════════════════
                  📋 تفاصيل الطلب المحدد
══════════════════════════════════════════════════════════

🎯 نوع الخدمة: ${service.title}
📄 وصف الخدمة: ${service.description}
💰 الرسوم المطلوبة: ${service.fee} جنيه مصري
⏱️ مدة المعالجة المتوقعة: ${service.processingTime} يوم عمل
📊 فئة الخدمة: ${service.category === 'civilServices' ? 'خدمات مدنية' : 
                  service.category === 'transportServices' ? 'خدمات النقل' :
                  service.category === 'financialServices' ? 'خدمات مالية' :
                  service.category === 'educationalServices' ? 'خدمات تعليمية' :
                  service.category === 'healthServices' ? 'خدمات صحية' : 'خدمات أخرى'}

══════════════════════════════════════════════════════════
              📁 قائمة المستندات المطلوبة
══════════════════════════════════════════════════════════

${service.requirements.map((req: string, index: number) => 
  `☐ ${index + 1}. ${req}
     الحالة: [ ] موجود  [ ] غير موجود  [ ] بحاجة لتحديث`
).join('\n')}

☐ إضافية: صورة من إيصال دفع الرسوم
☐ إضافية: صورة شخصية حديثة (إن لزم الأمر)

══════════════════════════════════════════════════════════
                🏢 معلومات الفرع المختص
══════════════════════════════════════════════════════════

🏛️ اسم الفرع: ${branchInfo.nameAr}
📍 العنوان: ${branchInfo.addressAr}
📞 رقم الهاتف: ${branchInfo.phone}
🕐 ساعات العمل: ${branchInfo.hours}
📅 الموعد المقترح: ___________________________

══════════════════════════════════════════════════════════
                  ⚠️ تعليمات هامة
══════════════════════════════════════════════════════════

✅ يجب إحضار جميع المستندات الأصلية + صور منها
✅ التأكد من صحة جميع البيانات المدخلة قبل التقديم
✅ الاحتفاظ برقم النموذج: ${formId} لمتابعة حالة الطلب
✅ ${service.status === 'online' ? 'يمكن إتمام هذا الطلب أونلاين عبر الموقع الرسمي' : 'يتطلب زيارة شخصية للفرع المختص'}
✅ مراجعة ساعات العمل قبل الزيارة
✅ الرسوم قابلة للدفع نقداً أو إلكترونياً

══════════════════════════════════════════════════════════
                 ✍️ إقرار وتوقيع المتقدم
══════════════════════════════════════════════════════════

أتعهد بأن جميع البيانات والمعلومات المذكورة أعلاه صحيحة ودقيقة،
وأتحمل المسؤولية القانونية الكاملة عن صحة هذه البيانات.

👤 اسم المتقدم: _________________________________

✍️ توقيع المتقدم: _________________________________

📅 التاريخ: ${currentDate}

[ ] أوافق على شروط وأحكام الخدمة

══════════════════════════════════════════════════════════
           للاستخدام الرسمي فقط
══════════════════════════════════════════════════════════

📥 تاريخ الاستلام: ___________  📝 رقم القيد: ___________
👤 موظف الاستقبال: ___________  ✍️ التوقيع: ___________
📊 حالة الطلب: ___________     📅 تاريخ الإنجاز المتوقع: ___________

██████████████████████████████████████████████████████████
        تم إنشاء هذا النموذج آلياً بواسطة
           🤖 Masr AI Agent 
        نظام الأوتوميشن الذكي للخدمات الحكومية
           جمهورية مصر العربية
██████████████████████████████████████████████████████████
`;
    } else {
      return `
██████████████████████████████████████████████████████████
           ARAB REPUBLIC OF EGYPT
        SMART GOVERNMENT SERVICE FORM
           ${service.title}
██████████████████████████████████████████████████████████

🔸 Form ID: ${formId}
🔸 Generated: ${currentDate} - ${currentTime}
🔸 System: Masr AI Agent - Smart Automation
🔸 Status: ${service.status === 'online' ? 'Online Submission Available' : 'Office Visit Required'}

══════════════════════════════════════════════════════════
                    🏛️ APPLICANT INFORMATION
══════════════════════════════════════════════════════════

📝 Full Name: ${userData.name || '___________________________'}
🆔 National ID: ${userData.nationalId || '___________________________'}
📱 Phone Number: ${userData.phone || '___________________________'}
📧 Email Address: ${userData.email || '___________________________'}
📍 Address: ${userData.location || '___________________________'}
📅 Date of Birth: ___________________________
🚹 Gender: [ ] Male  [ ] Female

══════════════════════════════════════════════════════════
                  📋 APPLICATION DETAILS
══════════════════════════════════════════════════════════

🎯 Service Type: ${service.title}
📄 Service Description: ${service.description}
💰 Required Fee: ${service.fee} EGP
⏱️ Expected Processing Time: ${service.processingTime} working days
📊 Service Category: ${service.category === 'civilServices' ? 'Civil Services' : 
                      service.category === 'transportServices' ? 'Transport Services' :
                      service.category === 'financialServices' ? 'Financial Services' :
                      service.category === 'educationalServices' ? 'Educational Services' :
                      service.category === 'healthServices' ? 'Health Services' : 'Other Services'}

══════════════════════════════════════════════════════════
              📁 REQUIRED DOCUMENTS CHECKLIST
══════════════════════════════════════════════════════════

${service.requirements.map((req: string, index: number) => 
  `☐ ${index + 1}. ${req}
     Status: [ ] Available  [ ] Missing  [ ] Needs Update`
).join('\n')}

☐ Additional: Copy of fee payment receipt
☐ Additional: Recent photograph (if required)

══════════════════════════════════════════════════════════
                🏢 RESPONSIBLE OFFICE INFORMATION
════════════════════════════════��═════════════════════════

🏛️ Office Name: ${branchInfo.name}
📍 Address: ${branchInfo.address}
📞 Phone Number: ${branchInfo.phone}
🕐 Working Hours: ${branchInfo.hours}
📅 Suggested Appointment: ___________________________

══════════════════════════════════════════════════════════
                  ⚠️ IMPORTANT INSTRUCTIONS
══════════════════════════════════════════════════════════

✅ Bring all original documents + photocopies
✅ Ensure all information is accurate before submission
✅ Keep form ID: ${formId} for application tracking
✅ ${service.status === 'online' ? 'This application can be completed online through the official website' : 'Office visit required for completion'}
✅ Check working hours before visiting
✅ Fees can be paid in cash or electronically

════════════════════════════════════��═════════════════════
                 ✍️ APPLICANT DECLARATION & SIGNATURE
══════════════════════════════════════════════════════════

I hereby declare that all information and data mentioned above 
are true and accurate, and I bear full legal responsibility 
for the accuracy of this information.

👤 Applicant Name: _________________________________

✍️ Applicant Signature: _________________________________

📅 Date: ${currentDate}

[ ] I agree to the terms and conditions of service

══════════════════════════════════════════════════════════
           FOR OFFICIAL USE ONLY
══════════════════════════════════════════════════════════

📥 Received Date: ___________  📝 Record Number: ___________
👤 Receiving Officer: ___________  ✍️ Signature: ___________
📊 Application Status: ___________     📅 Expected Completion: ___________

██████████████████████████████████████████████████████████
        This form was automatically generated by
           🤖 Masr AI Agent 
      Smart Government Services Automation System
           Arab Republic of Egypt
██████████████████████████████████████████████████████████
`;
    }
  };

  // Function to handle online submission
  const handleSubmitOnline = (service: any) => {
    if (!user) {
      toast.error(currentLang === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Please login first');
      return;
    }

    // Simulate online submission
    toast.loading(currentLang === 'ar' ? 'جاري تقديم الطلب...' : 'Submitting application...');
    
    setTimeout(() => {
      const applicationId = `APP-${Date.now()}`;
      toast.success(
        currentLang === 'ar' 
          ? `تم تقديم الطلب بنجاح! رقم الطلب: ${applicationId}` 
          : `Application submitted successfully! ID: ${applicationId}`
      );
      
      // Add to user applications (simulate)
      const newApplication = {
        id: applicationId,
        service: service.title,
        status: 'pending',
        lastUpdate: new Date().toISOString().split('T')[0],
        nextAction: currentLang === 'ar' ? 'قيد المراجعة' : 'Under review',
        progress: 25
      };
      
      // Switch to tracking tab to show the new application
      setActiveTab('tracking');
    }, 2000);
  };

  // Function to find nearest branch
  const handleFindNearestBranch = (service: any) => {
    const branchInfo = getBranchInfo(service);
    
    // Create a more detailed branch info display
    const branchDetails = currentLang === 'ar' ? 
      `📍 ${branchInfo.nameAr}\n📮 ${branchInfo.addressAr}\n📞 ${branchInfo.phone}\n🕐 ${branchInfo.hours}` :
      `📍 ${branchInfo.name}\n📮 ${branchInfo.address}\n📞 ${branchInfo.phone}\n🕐 ${branchInfo.hours}`;
    
    toast.success(branchDetails, {
      duration: 8000,
      action: {
        label: currentLang === 'ar' ? 'حجز موعد' : 'Book Appointment',
        onClick: () => {
          handleBookAppointment(branchInfo);
        }
      }
    });
  };

  // Function to book appointment
  const handleBookAppointment = (branchInfo: any) => {
    const appointmentDate = new Date();
    appointmentDate.setDate(appointmentDate.getDate() + 2); // Next available slot in 2 days
    
    const dateStr = appointmentDate.toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US');
    const timeSlot = '10:00 AM';
    
    toast.success(
      currentLang === 'ar' 
        ? `تم حجز موعد في ${branchInfo.nameAr}\n📅 ${dateStr} في ${timeSlot}`
        : `Appointment booked at ${branchInfo.name}\n📅 ${dateStr} at ${timeSlot}`,
      {
        duration: 6000,
        action: {
          label: currentLang === 'ar' ? 'إضافة للتقويم' : 'Add to Calendar',
          onClick: () => {
            toast.success(currentLang === 'ar' ? 'تمت الإضافة للتقويم' : 'Added to calendar');
          }
        }
      }
    );
  };

  // Function to get branch information based on service
  const getBranchInfo = (service: any) => {
    const branches = {
      passport_renewal: {
        name: 'Passport Office - Nasr City',
        nameAr: 'مكتب الجوازات - مدينة نصر',
        address: '15 Abbas El Akkad St., Nasr City',
        addressAr: '15 شارع عباس العقاد، مدينة نصر',
        phone: '02-26700000',
        hours: '9:00 AM - 3:00 PM'
      },
      national_id: {
        name: 'Civil Status Office - Dokki',
        nameAr: 'مكتب الأحوال المدنية - الدقي',
        address: '23 El Tahrir St., Dokki',
        addressAr: '23 شارع التحرير، الدقي',
        phone: '02-33350000',
        hours: '8:00 AM - 2:00 PM'
      },
      driving_license: {
        name: 'Traffic Department - Heliopolis',
        nameAr: 'إدارة المرور - مصر ��لجديدة',
        address: '5 El Merghany St., Heliopolis',
        addressAr: '5 شارع المرغني، مصر الجديدة',
        phone: '02-24180000',
        hours: '8:00 AM - 2:00 PM'
      },
      default: {
        name: 'Government Service Center',
        nameAr: 'مركز الخدمات الحكومية',
        address: 'Tahrir Square, Downtown Cairo',
        addressAr: 'ميدان التحرير، وسط القاهرة',
        phone: '02-25000000',
        hours: '9:00 AM - 3:00 PM'
      }
    };

    return branches[service.id as keyof typeof branches] || branches.default;
  };

  // Function to generate and download receipt
  const handleDownloadReceipt = (application: any) => {
    toast.loading(currentLang === 'ar' ? 'جاري إنشاء الإيصال...' : 'Generating receipt...');
    
    setTimeout(() => {
      try {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const receiptContent = generateReceiptContent(application);
        
        // Configure PDF settings
        pdf.setFont('courier', 'normal');
        pdf.setFontSize(12);

        // Add header
        pdf.setFontSize(16);
        if (currentLang === 'ar') {
          pdf.text('إيصال استلام طلب خدمة حكومية', 105, 20, { align: 'center' });
          pdf.text('جمهورية مصر العربية', 105, 30, { align: 'center' });
        } else {
          pdf.text('Government Service Receipt', 105, 20, { align: 'center' });
          pdf.text('Arab Republic of Egypt', 105, 30, { align: 'center' });
        }

        // Add content
        pdf.setFontSize(10);
        const lines = receiptContent.split('\n');
        let y = 50;
        const lineHeight = 5;

        lines.forEach((line: string) => {
          if (y > 270) {
            pdf.addPage();
            y = 20;
          }
          
          if (currentLang === 'ar' && /[\u0600-\u06FF]/.test(line)) {
            pdf.text(line, 190, y, { align: 'right' });
          } else {
            pdf.text(line, 10, y);
          }
          
          y += lineHeight;
        });

        // Download receipt
        const filename = `receipt-${application.id}-${Date.now()}.pdf`;
        pdf.save(filename);

        toast.success(
          currentLang === 'ar' 
            ? 'تم تحميل الإيصال بنجاح!' 
            : 'Receipt downloaded successfully!'
        );

      } catch (error) {
        console.error('Receipt generation error:', error);
        toast.error(
          currentLang === 'ar' 
            ? 'حدث خطأ في إنشاء الإيصال' 
            : 'Error generating receipt'
        );
      }
    }, 1000);
  };

  // Function to generate receipt content
  const generateReceiptContent = (application: any) => {
    const currentDate = new Date().toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US');
    const currentTime = new Date().toLocaleTimeString(currentLang === 'ar' ? 'ar-EG' : 'en-US');
    
    if (currentLang === 'ar') {
      return `
────────────────────────────────────────────────────────────────
                      إيصال استلام طلب
────────────────────────────────────────────────────────────────

رقم الإيصال: RCP-${application.id}
رقم الطلب: ${application.id}
تاريخ الإصدار: ${currentDate} - ${currentTime}

────────────────────────────────────────────────────────────────
                        بيانات الطلب
────────────────────────────────────────────────────────────────

نوع الخدمة: ${application.service}
اسم المتقدم: ${user?.name || 'غير محدد'}
الرقم القومي: ${user?.nationalId || 'غير محدد'}
رقم الهاتف: ${user?.phone || 'غير محدد'}

────────────────────────────────────────────────────────────────
                       حالة الطلب
────────────────────────────────────────────────────────────────

الحالة الحالية: ${getStatusInArabic(application.status)}
تاريخ آخر تحديث: ${application.lastUpdate}
الإجراء المطلوب: ${application.nextAction}

────────────────────────────────────────────────────────────────
                      معلومات مهمة
────────────────────────────────────────────────────────────────

• احتفظ بهذا الإيصال كإثبات لتقديم الطلب
• يمكنك متابعة حالة طلبك باستخدام الرقم: ${application.id}
• للاستفسارات: اتصل بالرقم المجاني 16000
• الموقع الرسمي: gov.eg

────────────────────────────────────────────────────────────────
                        الختم الإلكتروني
────────────────────────────────────────────────────────────────

تم إنشاء هذا الإيصال إلكترونياً بواسطة نظام Masr AI Agent
تاريخ ووقت الإنشاء: ${currentDate} - ${currentTime}
هذا المستند معتمد ولا يحتاج لختم أو توقيع إضافي

────────────────────────────────────────────────────────────────
`;
    } else {
      return `
────────────────────────────────────────────────────────────────
                    APPLICATION RECEIPT
────────────────────────────────────────────────────────────────

Receipt Number: RCP-${application.id}
Application ID: ${application.id}
Issue Date: ${currentDate} - ${currentTime}

────────────────────────────────────────────────────────────────
                  APPLICATION DETAILS
────────────────────────────────────────────────────────────────

Service Type: ${application.service}
Applicant Name: ${user?.name || 'Not specified'}
National ID: ${user?.nationalId || 'Not specified'}
Phone Number: ${user?.phone || 'Not specified'}

────────────────────────────────────────────────────────────────
                   APPLICATION STATUS
────────────────────────────────────────────────────────────────

Current Status: ${application.status}
Last Update: ${application.lastUpdate}
Next Action: ${application.nextAction}

────────────────────────────────────────────────────────────────
                  IMPORTANT INFORMATION
────────────────────────────────────────────────────────────────

• Keep this receipt as proof of application submission
• Track your application using ID: ${application.id}
• For inquiries: Call toll-free 16000
• Official website: gov.eg

────────────────────────────────────────────────────────────────
                   DIGITAL SEAL
────────────────────────────────────────────────────────────────

This receipt was generated electronically by Masr AI Agent
Generated on: ${currentDate} - ${currentTime}
This document is certified and requires no additional seal

────────────────────────────────────────────────────────────────
`;
    }
  };

  // Helper function to get status in Arabic
  const getStatusInArabic = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'pending': 'قيد المراجعة',
      'under_review': 'قيد المراجعة',
      'in-progress': 'قيد المعالجة',
      'approved': 'تم الموافقة',
      'completed': 'مكتمل',
      'rejected': 'مرفوض',
      'ready_pickup': 'جاهز للاستلام',
      'processing': 'قيد المعالجة'
    };
    return statusMap[status] || status;
  };

  // Function to handle view application details
  const handleViewDetails = (application: any) => {
    setSelectedApplication(application);
    setShowAppDetails(true);
  };

  // Function to get detailed application timeline
  const getApplicationTimeline = (application: any) => {
    const baseTimeline = [
      {
        step: 1,
        title: currentLang === 'ar' ? 'تقديم الطلب' : 'Application Submitted',
        date: application.submissionDate,
        status: 'completed',
        description: currentLang === 'ar' ? 'تم تقديم الطلب بنجاح' : 'Application successfully submitted'
      }
    ];

    switch (application.status) {
      case 'pending':
        baseTimeline.push({
          step: 2,
          title: currentLang === 'ar' ? 'مراجعة أولية' : 'Initial Review',
          date: application.lastUpdate,
          status: 'current',
          description: currentLang === 'ar' ? 'جاري المراجعة الأولية للطل��' : 'Application under initial review'
        });
        break;
      
      case 'under_review':
        baseTimeline.push(
          {
            step: 2,
            title: currentLang === 'ar' ? 'مراجعة أولية' : 'Initial Review',
            date: application.submissionDate,
            status: 'completed',
            description: currentLang === 'ar' ? 'تمت المراجعة الأولية' : 'Initial review completed'
          },
          {
            step: 3,
            title: currentLang === 'ar' ? 'المراجعة التفصيلية' : 'Detailed Review',
            date: application.lastUpdate,
            status: 'current',
            description: currentLang === 'ar' ? 'جاري المراجعة التفصيلية' : 'Under detailed review'
          }
        );
        break;

      case 'processing':
        baseTimeline.push(
          {
            step: 2,
            title: currentLang === 'ar' ? 'المراجعة' : 'Review',
            date: application.submissionDate,
            status: 'completed',
            description: currentLang === 'ar' ? 'تمت المراجعة' : 'Review completed'
          },
          {
            step: 3,
            title: currentLang === 'ar' ? 'المعالجة' : 'Processing',
            date: application.lastUpdate,
            status: 'current',
            description: currentLang === 'ar' ? 'جاري معالجة الطلب' : 'Application being processed'
          }
        );
        break;

      case 'approved':
        baseTimeline.push(
          {
            step: 2,
            title: currentLang === 'ar' ? 'المراجعة' : 'Review',
            date: application.submissionDate,
            status: 'completed',
            description: currentLang === 'ar' ? 'تمت المراجعة' : 'Review completed'
          },
          {
            step: 3,
            title: currentLang === 'ar' ? 'الموافقة' : 'Approval',
            date: application.lastUpdate,
            status: 'completed',
            description: currentLang === 'ar' ? 'تمت الموافقة على الطلب' : 'Application approved'
          },
          {
            step: 4,
            title: currentLang === 'ar' ? 'التنفيذ' : 'Execution',
            date: '',
            status: 'current',
            description: currentLang === 'ar' ? 'جاري تنفيذ الطلب' : 'Application being executed'
          }
        );
        break;

      case 'ready_pickup':
        baseTimeline.push(
          {
            step: 2,
            title: currentLang === 'ar' ? 'المراجعة والموافقة' : 'Review & Approval',
            date: application.submissionDate,
            status: 'completed',
            description: currentLang === 'ar' ? 'تمت المراجعة والموافقة' : 'Review and approval completed'
          },
          {
            step: 3,
            title: currentLang === 'ar' ? 'التنفيذ' : 'Execution',
            date: application.lastUpdate,
            status: 'completed',
            description: currentLang === 'ar' ? 'تم تنفيذ الطلب' : 'Application executed'
          },
          {
            step: 4,
            title: currentLang === 'ar' ? 'جاهز للاستلام' : 'Ready for Pickup',
            date: application.lastUpdate,
            status: 'current',
            description: currentLang === 'ar' ? 'الطلب جاهز للاستلام' : 'Ready for pickup'
          }
        );
        break;
    }

    return baseTimeline;
  };

  // Show Service Details Page if selected
  if (showServiceDetails && selectedService) {
    return (
      <ServiceDetailsPage
        currentLang={currentLang}
        service={selectedService}
        onBack={() => {
          setShowServiceDetails(false);
          setSelectedService(null);
        }}
        onStartAutomation={(service) => {
          setShowServiceDetails(false);
          handleStartAutomation(service);
        }}
        onOpenChatbot={() => {
          setShowServiceDetails(false);
          // Navigate to chatbot or open chatbot dialog
          toast.info(currentLang === 'ar' ? 'فتح المساعد الذكي...' : 'Opening AI Assistant...');
        }}
        user={user}
      />
    );
  }

  return (
    <div className={`min-h-screen py-20 px-4 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl text-primary">{t.title}</h1>
            
            {/* Notifications Bell */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                    >
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <BellRing className="h-5 w-5" />
                    {t.notifications}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-3 rounded-lg border ${notification.read ? 'opacity-60' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-1 rounded-full ${
                          notification.type === 'success' ? 'bg-green-100' : 
                          notification.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                        }`}>
                          {notification.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                          {notification.type === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-600" />}
                          {notification.type === 'info' && <RefreshCw className="h-4 w-4 text-blue-600" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">
                            {currentLang === 'ar' ? notification.titleAr : notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {currentLang === 'ar' ? notification.messageAr : notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {currentLang === 'ar' ? notification.timeAr : notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <p className="text-center text-gray-500 py-8">{t.noNotifications}</p>
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="flex justify-between pt-4 border-t">
                    <Button variant="ghost" size="sm">{t.markAllRead}</Button>
                    <Button variant="ghost" size="sm">{t.clearAll}</Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="services">{t.availableServices}</TabsTrigger>
            <TabsTrigger value="tracking">{t.trackingTab}</TabsTrigger>
            <TabsTrigger value="applications">{t.myApplications}</TabsTrigger>
          </TabsList>

          {/* Available Services Tab */}
          <TabsContent value="services" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t.searchServices}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue placeholder={t.filterByCategory} />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          {category.name}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => {
                const IconComponent = service.icon;
                return (
                  <Card key={service.id} className="hover:shadow-lg transition-shadow relative">
                    {service.popular && (
                      <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{service.title}</CardTitle>
                          <Badge 
                            variant={
                              service.status === 'online' ? 'default' : 
                              service.status === 'both' ? 'secondary' : 'outline'
                            }
                            className="mt-1"
                          >
                            {service.status === 'online' ? t.onlineAvailable :
                             service.status === 'both' ? 'Both' : t.visitRequired}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        {service.description}
                      </CardDescription>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{t.fee}:</span>
                          <span className="font-medium">{service.fee} {t.egp}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{t.processingTime}:</span>
                          <span className="font-medium">{service.processingTime} {t.days}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">{t.requirements}:</h4>
                        <div className="space-y-1">
                          {service.requirements.slice(0, 2).map((req, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              {req}
                            </div>
                          ))}
                          {service.requirements.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{service.requirements.length - 2} more requirements
                            </div>
                          )}
                        </div>
                      </div>

                      <Button 
                        className="w-full"
                        variant="outline"
                        onClick={() => {
                          setSelectedService(service);
                          setShowServiceDetails(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {currentLang === 'ar' ? 'استكشف الخدمة' : 'Explore Service'}
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full mt-2" variant="ghost" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            {currentLang === 'ar' ? 'معاينة سريعة' : 'Quick Preview'}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <service.icon className="h-6 w-6 text-primary" />
                              {service.title}
                            </DialogTitle>
                            <DialogDescription>
                              {service.description}
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-6">
                            {/* Service Details */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium mb-2">{t.fee}</h4>
                                <p className="text-2xl font-semibold text-primary">
                                  {service.fee} {t.egp}
                                </p>
                              </div>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium mb-2">{t.processingTime}</h4>
                                <p className="text-2xl font-semibold text-primary">
                                  {service.processingTime} {t.days}
                                </p>
                              </div>
                            </div>

                            {/* Requirements Checklist */}
                            <div>
                              <h4 className="font-medium mb-3">{t.requirements}:</h4>
                              <div className="space-y-2 max-h-40 overflow-y-auto">
                                {service.requirements.map((req: string, idx: number) => (
                                  <div key={idx} className="flex items-center gap-3 p-2 border rounded">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span className="text-sm">{req}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* User Data Preview */}
                            {user && (
                              <div className="p-4 bg-primary/5 rounded-lg">
                                <h4 className="font-medium mb-3 flex items-center gap-2">
                                  <Settings className="h-4 w-4" />
                                  {currentLang === 'ar' ? 'البيانات المحفوظة' : 'Saved Data'}
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <span className="text-gray-600">{currentLang === 'ar' ? 'الاسم:' : 'Name:'}</span>
                                    <span className="ml-2 font-medium">{user.name}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">{currentLang === 'ar' ? 'الهاتف:' : 'Phone:'}</span>
                                    <span className="ml-2 font-medium">{user.phone}</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                              <Button 
                                className="flex-1"
                                variant="outline"
                                onClick={() => {
                                  setSelectedService(service);
                                  setShowServiceDetails(true);
                                  // Close dialog
                                  document.querySelector('[data-state="open"]')?.querySelector('button')?.click();
                                }}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                {currentLang === 'ar' ? 'استكشف الخدمة' : 'Explore Service'}
                              </Button>
                              <Button 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => handlePreviewForm(service)}
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                {currentLang === 'ar' ? 'معاينة النموذج' : 'Preview Form'}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Application Tracking Tab */}
          <TabsContent value="tracking" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">{t.trackingTab}</h2>
              {selectedTrackingApplication && (
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSelectedTrackingApplication(null);
                    toast.info(currentLang === 'ar' ? 'تم إلغاء متابعة الطلب' : 'Application tracking cleared');
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  {currentLang === 'ar' ? 'إلغاء المتابعة' : 'Clear Tracking'}
                </Button>
              )}
            </div>

            {selectedTrackingApplication ? (
              <div className="space-y-6">
                {/* Selected Application Detailed Tracking */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl text-primary">{selectedTrackingApplication.service}</CardTitle>
                        <p className="text-sm text-gray-600 font-mono mt-1">{selectedTrackingApplication.id}</p>
                      </div>
                      <Badge className={`${getStatusColor(selectedTrackingApplication.status)} text-base px-3 py-1`}>
                        {getStatusIcon(selectedTrackingApplication.status)}
                        <span className="ml-2">
                          {currentLang === 'ar' ? getStatusInArabic(selectedTrackingApplication.status) : t[selectedTrackingApplication.status as keyof typeof t]}
                        </span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Progress Section */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">{currentLang === 'ar' ? 'التقدم الحالي' : 'Current Progress'}</span>
                        <span className="font-bold text-primary">{selectedTrackingApplication.progress}%</span>
                      </div>
                      <Progress value={selectedTrackingApplication.progress} className="h-3" />
                    </div>

                    {/* Application Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg border">
                      <div>
                        <span className="text-sm font-medium text-gray-600">{currentLang === 'ar' ? 'تاريخ التقديم:' : 'Submitted:'}</span>
                        <p className="font-semibold">{selectedTrackingApplication.submissionDate}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">{currentLang === 'ar' ? 'آخر تحديث:' : 'Last Update:'}</span>
                        <p className="font-semibold">{selectedTrackingApplication.lastUpdate}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">{currentLang === 'ar' ? 'الرسوم:' : 'Fee:'}</span>
                        <p className="font-semibold">{selectedTrackingApplication.fee} {t.egp}</p>
                      </div>
                    </div>

                    {/* Next Action */}
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">
                        {currentLang === 'ar' ? 'الإجراء التالي المطلوب:' : 'Next Required Action:'}
                      </h4>
                      <p className="text-orange-700">{selectedTrackingApplication.nextAction}</p>
                    </div>

                    {/* Application Timeline */}
                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        {currentLang === 'ar' ? 'مراحل الطلب' : 'Application Timeline'}
                      </h4>
                      <div className="space-y-3">
                        {getApplicationTimeline(selectedTrackingApplication).map((step, index) => (
                          <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${step.status === 'completed' ? 'bg-green-50 border border-green-200' : step.status === 'current' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'}`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step.status === 'completed' ? 'bg-green-600' : step.status === 'current' ? 'bg-blue-600' : 'bg-gray-400'}`}>
                              {step.status === 'completed' ? <CheckCircle className="h-4 w-4 text-white" /> : <span className="text-white text-xs font-bold">{step.step}</span>}
                            </div>
                            <div className="flex-1">
                              <h5 className={`font-medium ${step.status === 'completed' ? 'text-green-800' : step.status === 'current' ? 'text-blue-800' : 'text-gray-600'}`}>
                                {step.title}
                              </h5>
                              {step.description && (
                                <p className={`text-sm ${step.status === 'completed' ? 'text-green-600' : step.status === 'current' ? 'text-blue-600' : 'text-gray-500'}`}>
                                  {step.description}
                                </p>
                              )}
                              {step.date && (
                                <p className={`text-xs ${step.status === 'completed' ? 'text-green-500' : step.status === 'current' ? 'text-blue-500' : 'text-gray-400'}`}>
                                  {step.date}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleViewDetails(selectedTrackingApplication)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {t.viewDetails}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleDownloadReceipt(selectedTrackingApplication)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {t.downloadReceipt}
                      </Button>
                      <Button 
                        variant="default" 
                        className="flex-1"
                        onClick={() => handleFindNearestBranch(selectedTrackingApplication)}
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        {t.nearestBranch}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    {currentLang === 'ar' ? 'لم يتم اختيار طلب للمتابعة' : 'No Application Selected for Tracking'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {currentLang === 'ar' 
                      ? 'اذهب إلى "طلباتي" واختر طلباً لمتابعة تقدمه' 
                      : 'Go to "My Applications" and select an application to track its progress'
                    }
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => setActiveTab('applications')}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {currentLang === 'ar' ? 'انتقل إلى طلباتي' : 'Go to My Applications'}
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* My Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{t.myApplications}</h2>
              <Badge variant="secondary">
                {displayApplications.length} {currentLang === 'ar' ? 'طلب' : 'Applications'}
              </Badge>
            </div>

            {displayApplications.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {displayApplications.map((application) => (
                  <Card key={application.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{application.service}</h3>
                          <p className="text-sm text-gray-600 font-mono">{application.id}</p>
                        </div>
                        <Badge className={getStatusColor(application.status)}>
                          {getStatusIcon(application.status)}
                          <span className="ml-2">
                            {currentLang === 'ar' ? getStatusInArabic(application.status) : t[application.status as keyof typeof t]}
                          </span>
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-600">{currentLang === 'ar' ? 'تاريخ التقديم:' : 'Submitted:'}</span>
                          <p className="font-medium">{application.submissionDate}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">{currentLang === 'ar' ? 'الرسوم:' : 'Fee:'}</span>
                          <p className="font-medium">{application.fee} {t.egp}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">{currentLang === 'ar' ? 'التقدم:' : 'Progress:'}</span>
                          <p className="font-medium">{application.progress}%</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{application.progress}%</span>
                          </div>
                          <Progress value={application.progress} />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <Button 
                            size="sm" 
                            variant="default" 
                            className="w-full"
                            onClick={() => handleTrackApplication(application)}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            {currentLang === 'ar' ? 'متابعة الطلب' : 'Track Application'}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full"
                            onClick={() => handleViewDetails(application)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            {t.viewDetails}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full"
                            onClick={() => handleDownloadReceipt(application)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            {t.downloadReceipt}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    {currentLang === 'ar' ? 'لا توجد طلبات بعد' : 'No applications yet'}
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => setActiveTab('services')}
                  >
                    {currentLang === 'ar' ? 'تصفح الخدمات' : 'Browse Services'}
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Automation Engine (Sidebar) */}
        {selectedService && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                {t.automationEngine}
              </CardTitle>
              <CardDescription>
                Processing: {selectedService.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Steps */}
              <div className="space-y-4">
                {[
                  { step: 1, title: t.dataCollection, icon: User },
                  { step: 2, title: t.documentVerification, icon: FileCheck },
                  { step: 3, title: currentLang === 'ar' ? 'تحليل الطلب' : 'Request Analysis', icon: Settings },
                  { step: 4, title: currentLang === 'ar' ? 'إضافة الطلب' : 'Add Application', icon: Upload },
                  { step: 5, title: currentLang === 'ar' ? 'جاهز للمتابعة' : 'Ready for Tracking', icon: Eye }
                ].map((item) => {
                  const IconComponent = item.icon;
                  const isActive = automationStep >= item.step;
                  const isCurrent = automationStep === item.step;
                  
                  return (
                    <div key={item.step} className={`flex items-center gap-3 p-3 rounded-lg ${
                      isActive ? 'bg-primary/10' : 'bg-gray-50'
                    }`}>
                      <div className={`p-2 rounded-full ${
                        isActive ? 'bg-primary text-primary-foreground' : 'bg-gray-300 text-gray-600'
                      }`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${isActive ? 'text-primary' : 'text-gray-600'}`}>
                          {item.title}
                        </h4>
                        {isCurrent && (
                          <p className="text-sm text-gray-600">Processing...</p>
                        )}
                      </div>
                      {isActive && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </div>
                  );
                })}
              </div>

              {/* Show stop button while automation is running */}
              {automationStep > 0 && automationStep < 5 && (
                <div className="space-y-3">
                  <Separator />
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                    <div className="animate-spin h-6 w-6 border-2 border-orange-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                    <h4 className="font-medium text-orange-800 mb-2">
                      {currentLang === 'ar' ? 'الأوتوميشن قيد التشغيل...' : 'Automation Running...'}
                    </h4>
                    <Button 
                      variant="destructive"
                      size="sm"
                      onClick={handleStopAutomation}
                    >
                      <X className="h-4 w-4 mr-2" />
                      {currentLang === 'ar' ? 'إيقاف الأوتوميشن' : 'Stop Automation'}
                    </Button>
                  </div>
                </div>
              )}

              {/* Show completion message */}
              {automationStep >= 5 && (
                <div className="space-y-3">
                  <Separator />
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-medium text-green-800 mb-1">
                      {currentLang === 'ar' ? 'تم بنجاح!' : 'Completed Successfully!'}
                    </h4>
                    <p className="text-sm text-green-700">
                      {currentLang === 'ar' 
                        ? 'تم إضافة طلبك إلى "طلباتي" ويمكنك متابعته من هناك'
                        : 'Your application has been added to "My Applications" for tracking'
                      }
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setActiveTab('tracking');
                        // Hide automation panel after switching to tracking
                        setTimeout(() => {
                          setSelectedService(null);
                          setAutomationStep(0);
                        }, 500);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {currentLang === 'ar' ? 'عرض طلباتي' : 'View My Applications'}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleFindNearestBranch(selectedService)}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      {t.nearestBranch}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Smart Suggestions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              {t.smartSuggestions}
            </CardTitle>
            <CardDescription>
              {t.suggestionsTitle}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {smartSuggestions.map((suggestion) => {
                const IconComponent = suggestion.icon;
                return (
                  <Card key={suggestion.id} className={`border-l-4 ${getPriorityColor(suggestion.priority)}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded">
                          <IconComponent className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-2">{suggestion.title}</h4>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {suggestion.confidence}% match
                            </Badge>
                            <Button size="sm" variant="outline">
                              {t.applySuggestion}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Button variant="outline" onClick={() => onPageChange('home')}>
            {t.backToHome}
          </Button>
        </div>
      </div>

      {/* Application Details Dialog */}
      <Dialog open={showAppDetails} onOpenChange={setShowAppDetails}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {currentLang === 'ar' ? 'تفاصيل الطلب' : 'Application Details'}
            </DialogTitle>
            <DialogDescription>
              {selectedApplication && (
                <span>
                  {currentLang === 'ar' ? 'رقم الطلب:' : 'Application ID:'} {selectedApplication.id}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <ScrollArea className="h-[60vh] w-full">
              <div className="space-y-6 pr-4">
                {/* Application Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">
                        {currentLang === 'ar' ? 'معلومات الطلب' : 'Application Info'}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            {currentLang === 'ar' ? 'نوع الخدمة:' : 'Service Type:'}
                          </span>
                          <span className="font-medium">{selectedApplication.service}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            {currentLang === 'ar' ? 'تاريخ التقديم:' : 'Submission Date:'}
                          </span>
                          <span className="font-medium">{selectedApplication.submissionDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            {currentLang === 'ar' ? 'الرسوم:' : 'Fee:'}
                          </span>
                          <span className="font-medium">{selectedApplication.fee} {t.egp}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            {currentLang === 'ar' ? 'الحالة:' : 'Status:'}
                          </span>
                          <Badge className={getStatusColor(selectedApplication.status)}>
                            {currentLang === 'ar' ? getStatusInArabic(selectedApplication.status) : t[selectedApplication.status as keyof typeof t]}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">
                        {currentLang === 'ar' ? 'التقدم' : 'Progress'}
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>{currentLang === 'ar' ? 'مكتمل:' : 'Completed:'}</span>
                          <span className="font-medium">{selectedApplication.progress}%</span>
                        </div>
                        <Progress value={selectedApplication.progress} />
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">
                            {currentLang === 'ar' ? 'الإجراء التالي:' : 'Next Action:'}
                          </span>
                          <br />
                          {selectedApplication.nextAction}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline */}
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-4">
                      {currentLang === 'ar' ? 'تتبع العمليات' : 'Process Timeline'}
                    </h4>
                    <div className="space-y-4">
                      {getApplicationTimeline(selectedApplication).map((timeline, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                            timeline.status === 'completed' ? 'bg-green-100 text-green-800' :
                            timeline.status === 'current' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {timeline.status === 'completed' ? '✓' : timeline.step}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium">{timeline.title}</h5>
                            <p className="text-sm text-gray-600">{timeline.description}</p>
                            {timeline.date && (
                              <p className="text-xs text-gray-500 mt-1">{timeline.date}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">
                      {currentLang === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownloadReceipt(selectedApplication)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {t.downloadReceipt}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        {currentLang === 'ar' ? 'اتصل بالدعم' : 'Contact Support'}
                      </Button>
                      <Button size="sm" variant="outline">
                        <MapPin className="h-4 w-4 mr-2" />
                        {currentLang === 'ar' ? 'موقع الفرع' : 'Branch Location'}
                      </Button>
                      {selectedApplication.status === 'ready_pickup' && (
                        <Button size="sm" variant="default">
                          <Calendar className="h-4 w-4 mr-2" />
                          {currentLang === 'ar' ? 'حجز موعد استلام' : 'Book Pickup Appointment'}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          )}

          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button variant="outline" onClick={() => setShowAppDetails(false)}>
              {currentLang === 'ar' ? 'إغلاق' : 'Close'}
            </Button>
            <Button onClick={() => {
              if (selectedApplication) {
                handleDownloadReceipt(selectedApplication);
              }
            }}>
              <Download className="h-4 w-4 mr-2" />
              {currentLang === 'ar' ? 'تحميل إيصال' : 'Download Receipt'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Form Preview Dialog */}
      <Dialog open={showFormPreview} onOpenChange={setShowFormPreview}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              {currentLang === 'ar' ? 'معاينة النموذج' : 'Form Preview'}
            </DialogTitle>
            <DialogDescription>
              {currentLang === 'ar' 
                ? 'معاينة النموذج قبل التحميل أو الطباعة' 
                : 'Preview the form before downloading or printing'
              }
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
            <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
              {previewContent}
            </pre>
          </ScrollArea>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setShowFormPreview(false)}>
              {currentLang === 'ar' ? 'إغلاق' : 'Close'}
            </Button>
            <Button onClick={() => {
              if (selectedService) {
                setShowFormPreview(false);
                // Small delay to close modal before generating PDF
                setTimeout(() => {
                  handleDownloadForm(selectedService, false);
                }, 100);
              }
            }}>
              <Download className="h-4 w-4 mr-2" />
              {currentLang === 'ar' ? 'تحميل PDF' : 'Download PDF'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}