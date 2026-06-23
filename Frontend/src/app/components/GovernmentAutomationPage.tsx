import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from "sonner";
import { 
  FileText, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Upload,
  Eye,
  Download,
  Building,
  User,
  Car,
  GraduationCap,
  Heart,
  Home,
  Banknote,
  ArrowLeft,
  Search,
  Filter,
  Plus,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  FileCheck,
  Bell,
  RefreshCw
} from 'lucide-react';
import { allGovernmentServices, serviceCategories } from './AllGovernmentServices';

interface GovernmentAutomationPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
  user?: any;
  preSelectedService?: {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    status: string;
    processingTime: string;
    fee: string;
    popular?: boolean;
  };
}

export function GovernmentAutomationPage({ currentLang, onPageChange, user, preSelectedService }: GovernmentAutomationPageProps) {
  const [activeTab, setActiveTab] = useState(preSelectedService ? 'application' : 'services');
  const [selectedService, setSelectedService] = useState<any>(preSelectedService || null);
  const [applicationStep, setApplicationStep] = useState(1);
  const [applicationData, setApplicationData] = useState<any>({});
  const [uploadedDocs, setUploadedDocs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const translations = {
    en: {
      title: "Government Service Automation",
      subtitle: "Apply for government services automatically using AI",
      servicesTab: "Available Services",
      applicationsTab: "My Applications", 
      trackingTab: "Application Tracking",
      searchServices: "Search services...",
      filterByCategory: "Filter by category",
      allCategories: "All Categories",
      interior: "Ministry of Interior",
      taxes: "Tax Authority", 
      education: "Ministry of Education",
      health: "Ministry of Health",
      land: "Land Registry",
      social: "Social Insurance",
      utilities: "Utilities Authority",
      transport: "Transport Authority",
      justice: "Justice Ministry",
      apply: "Apply Now",
      fee: "Fee",
      egp: "EGP",
      duration: "Processing Time",
      days: "days",
      requirements: "Requirements",
      description: "Description",
      steps: "Application Steps",
      dataCollection: "1. Data Collection",
      documentUpload: "2. Document Upload",
      payment: "3. Payment",
      submission: "4. Submission",
      tracking: "5. Tracking",
      applicationId: "Application ID",
      serviceType: "Service Type",
      status: "Status",
      lastUpdate: "Last Update",
      nextAction: "Next Action",
      received: "Received",
      underReview: "Under Review",
      pendingDoc: "Pending Document",
      approved: "Approved",
      rejected: "Rejected",
      completed: "Completed",
      readyForPickup: "Ready for Pickup",
      viewDetails: "View Details",
      downloadReceipt: "Download Receipt",
      personalInfo: "Personal Information",
      uploadDocuments: "Upload Documents",
      makePayment: "Make Payment",
      submitApplication: "Submit Application",
      fullName: "Full Name",
      nationalId: "National ID",
      phoneNumber: "Phone Number",
      email: "Email Address",
      address: "Address",
      uploadFile: "Upload File",
      dragDrop: "Drag and drop files here or click to browse",
      paymentMethod: "Payment Method",
      cardPayment: "Credit/Debit Card",
      fawry: "Fawry",
      wallet: "Mobile Wallet",
      confirmPayment: "Confirm Payment",
      applicationSubmitted: "Application Submitted Successfully!",
      yourApplicationId: "Your Application ID is:",
      backToServices: "Back to Services",
      refreshStatus: "Refresh Status",
      notifications: "Notifications",
      noApplications: "No applications found",
      popularServices: "Popular Services",
      recentlyAdded: "Recently Added",
      fastTrack: "Fast Track",
      autoFill: "Auto-fill from profile",
      saveToProfile: "Save to profile for future use"
    },
    ar: {
      title: "أوتوميشن الخدمات الحكومية",
      subtitle: "تقدم على الخدمات الحكومية أوتوماتيكياً باستخدام الذكاء الاصطناعي",
      servicesTab: "الخدمات المتاحة",
      applicationsTab: "طلباتي",
      trackingTab: "متابعة الطلبات",
      searchServices: "البحث في الخدمات...",
      filterByCategory: "فلترة حسب الفئة",
      allCategories: "جميع الفئات",
      interior: "وزارة الداخلية",
      taxes: "مصلحة الضرائب",
      education: "وزارة التعليم", 
      health: "وزارة الصحة",
      land: "الشهر العقاري",
      social: "التأمين الاجتماعي",
      utilities: "هيئة المرافق",
      transport: "هيئة النقل",
      justice: "وزارة العدل",
      apply: "تقدم الآن",
      fee: "الرسوم",
      egp: "جنيه",
      duration: "مدة المعالجة",
      days: "يوم",
      requirements: "المتطلبات",
      description: "الوصف",
      steps: "خطوات التقديم",
      dataCollection: "١. جمع البيانات",
      documentUpload: "٢. رفع المستندات",
      payment: "٣. الدفع",
      submission: "٤. تقديم الطلب",
      tracking: "٥. المتابعة",
      applicationId: "رقم الطلب",
      serviceType: "نوع الخدمة",
      status: "الحالة",
      lastUpdate: "آخر تحديث",
      nextAction: "الإجراء التالي",
      received: "تم الاستلام",
      underReview: "قيد المراجعة",
      pendingDoc: "في انتظار مستند",
      approved: "تمت الموافقة",
      rejected: "مرفوض",
      completed: "مكتمل",
      readyForPickup: "جاهز للاستلام",
      viewDetails: "عرض التفاصيل",
      downloadReceipt: "تحميل الإيصال",
      personalInfo: "البيانات الشخصية",
      uploadDocuments: "رفع المستندات",
      makePayment: "الدفع",
      submitApplication: "تقديم الطلب",
      fullName: "الاسم الرباعي",
      nationalId: "الرقم القومي",
      phoneNumber: "رقم الهاتف",
      email: "البريد الإلكتروني",
      address: "العنوان",
      uploadFile: "رفع ملف",
      dragDrop: "اسحب الملفات هنا أو اضغط للتصفح",
      paymentMethod: "طريقة الدفع",
      cardPayment: "بطاقة ائتمان/خصم",
      fawry: "فوري",
      wallet: "محفظة الهاتف",
      confirmPayment: "تأكيد الدفع",
      applicationSubmitted: "تم تقديم الطلب بنجاح!",
      yourApplicationId: "رقم طلبك هو:",
      backToServices: "العودة للخدمات",
      refreshStatus: "تحديث الحالة",
      notifications: "الإشعارات",
      noApplications: "لا توجد طلبات",
      popularServices: "الخدمات الشائعة",
      recentlyAdded: "المضافة حديثاً",
      fastTrack: "المسار السريع",
      autoFill: "تعبئة تلقائية من الملف الشخصي",
      saveToProfile: "حفظ في الملف الشخصي للاستخدام المستقبلي"
    }
  };

  const t = translations[currentLang];

  // تحويل الخدمات لصيغة مناسبة للاستخدام
  const governmentServices = allGovernmentServices.map(service => ({
    ...service,
    icon: <service.icon className="h-8 w-8" />,
    nameEn: service.nameEn,
    nameAr: service.nameAr,
    descriptionEn: service.descriptionEn,
    descriptionAr: service.descriptionAr
  }));

  // إضافة الخدمة المحددة مسبقاً إذا لم تكن موجودة
  if (preSelectedService && !governmentServices.find(s => s.nameEn === preSelectedService.title || s.nameAr === preSelectedService.title)) {
    const convertedService = {
      id: `pre-selected-${Date.now()}`,
      category: "general",
      nameEn: preSelectedService.title,
      nameAr: preSelectedService.title,
      descriptionEn: preSelectedService.description,
      descriptionAr: preSelectedService.description,
      fee: parseInt(preSelectedService.fee?.replace(/[^\d]/g, '') || '0'),
      duration: parseInt(preSelectedService.processingTime?.replace(/[^\d]/g, '') || '7'),
      icon: <preSelectedService.icon className="h-8 w-8" />,
      status: preSelectedService.status || 'both',
      popular: preSelectedService.popular || false,
      requirements: ["Required documents", "Valid identification", "Application fee"],
      documentsRequired: ["documents", "id", "fee"]
    };
    governmentServices.unshift(convertedService);
  }

  const userApplications = [
    {
      id: "2025-0012",
      serviceType: currentLang === 'en' ? "National ID Renewal" : "تجديد البطاقة الشخصية",
      status: "underReview",
      lastUpdate: "2025-01-15",
      nextAction: currentLang === 'en' ? "Wait for approval" : "انتظار الموافقة",
      fee: 50
    },
    {
      id: "2025-0013", 
      serviceType: currentLang === 'en' ? "Birth Certificate" : "شهادة ميلاد",
      status: "completed",
      lastUpdate: "2025-01-10", 
      nextAction: currentLang === 'en' ? "Ready for pickup" : "جاهز للاستلام",
      fee: 25
    },
    {
      id: "2025-0014",
      serviceType: currentLang === 'en' ? "Driving License Renewal" : "تجديد رخصة القيادة", 
      status: "pendingDoc",
      lastUpdate: "2025-01-12",
      nextAction: currentLang === 'en' ? "Upload medical report" : "رفع التقرير الطبي",
      fee: 100
    }
  ];

  const categories = serviceCategories.map(cat => ({
    ...cat,
    icon: <cat.icon />
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received': return 'bg-blue-100 text-blue-800';
      case 'underReview': return 'bg-yellow-100 text-yellow-800';
      case 'pendingDoc': return 'bg-orange-100 text-orange-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received': return <Clock className="h-4 w-4" />;
      case 'underReview': return <RefreshCw className="h-4 w-4" />;
      case 'pendingDoc': return <AlertCircle className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'completed': return <FileCheck className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredServices = governmentServices.filter(service => {
    const matchesSearch = currentLang === 'en' 
      ? service.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
      : service.nameAr.includes(searchQuery);
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleApplyService = (service: any) => {
    if (!user) {
      toast.error(currentLang === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Please login first');
      // User will need to use the auth modal from navigation
      return;
    }
    setSelectedService(service);
    setApplicationStep(1);
    setActiveTab('application');
  };

  const handleAutoFill = () => {
    if (user) {
      setApplicationData({
        fullName: user.name,
        nationalId: user.nationalId,
        phone: user.phone,
        email: user.email,
        address: user.location
      });
      toast.success(currentLang === 'ar' ? 'تم ملء البيانات تلقائياً' : 'Auto-filled successfully');
    }
  };

  const handleFileUpload = (event: any) => {
    const files = Array.from(event.target.files);
    const newDocs = files.map((file: any) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      file: file
    }));
    setUploadedDocs([...uploadedDocs, ...newDocs]);
  };

  const handlePayment = () => {
    // Simulate payment process
    setTimeout(() => {
      setApplicationStep(4);
      toast.success(currentLang === 'ar' ? 'تم الدفع بنجاح' : 'Payment successful');
    }, 2000);
  };

  const handleSubmitApplication = () => {
    const applicationId = `2025-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;
    setApplicationData({ ...applicationData, applicationId });
    setApplicationStep(5);
    toast.success(currentLang === 'ar' ? 'تم تقديم الطلب بنجاح' : 'Application submitted successfully');
  };

  const renderApplicationForm = () => {
    if (!selectedService) return null;

    switch (applicationStep) {
      case 1: // Data Collection
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg">{t.personalInfo}</h3>
              <Button variant="outline" onClick={handleAutoFill}>
                <Plus className="h-4 w-4 mr-2" />
                {t.autoFill}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">{t.fullName}</Label>
                <Input 
                  id="fullName"
                  value={applicationData.fullName || ''}
                  onChange={(e) => setApplicationData({...applicationData, fullName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="nationalId">{t.nationalId}</Label>
                <Input 
                  id="nationalId"
                  value={applicationData.nationalId || ''}
                  onChange={(e) => setApplicationData({...applicationData, nationalId: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">{t.phoneNumber}</Label>
                <Input 
                  id="phone"
                  value={applicationData.phone || ''}
                  onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">{t.email}</Label>
                <Input 
                  id="email"
                  type="email"
                  value={applicationData.email || ''}
                  onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="address">{t.address}</Label>
              <Textarea 
                id="address"
                value={applicationData.address || ''}
                onChange={(e) => setApplicationData({...applicationData, address: e.target.value})}
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab('services')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t.backToServices}
              </Button>
              <Button onClick={() => setApplicationStep(2)}>
                {t.uploadDocuments}
              </Button>
            </div>
          </div>
        );

      case 2: // Document Upload
        return (
          <div className="space-y-6">
            <h3 className="text-lg">{t.uploadDocuments}</h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">{t.dragDrop}</p>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button asChild variant="outline">
                <label htmlFor="file-upload" className="cursor-pointer">
                  {t.uploadFile}
                </label>
              </Button>
            </div>

            {uploadedDocs.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Uploaded Documents:</h4>
                {uploadedDocs.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      <span className="text-sm">{doc.name}</span>
                    </div>
                    <Badge variant="secondary">
                      {(doc.size / 1024 / 1024).toFixed(2)} MB
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setApplicationStep(1)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t.personalInfo}
              </Button>
              <Button onClick={() => setApplicationStep(3)}>
                {t.makePayment}
              </Button>
            </div>
          </div>
        );

      case 3: // Payment
        return (
          <div className="space-y-6">
            <h3 className="text-lg">{t.makePayment}</h3>
            
            <Card>
              <CardHeader>
                <CardTitle>{currentLang === 'en' ? selectedService.nameEn : selectedService.nameAr}</CardTitle>
                <CardDescription>
                  {t.fee}: {selectedService.fee} {t.egp}
                </CardDescription>
              </CardHeader>
            </Card>

            <div>
              <Label>{t.paymentMethod}</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <Card className="cursor-pointer hover:border-primary">
                  <CardContent className="p-4 text-center">
                    <CreditCard className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">{t.cardPayment}</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:border-primary">
                  <CardContent className="p-4 text-center">
                    <Building className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">{t.fawry}</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:border-primary">
                  <CardContent className="p-4 text-center">
                    <Phone className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">{t.wallet}</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setApplicationStep(2)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t.uploadDocuments}
              </Button>
              <Button onClick={handlePayment}>
                <CreditCard className="h-4 w-4 mr-2" />
                {t.confirmPayment}
              </Button>
            </div>
          </div>
        );

      case 4: // Processing
        return (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <RefreshCw className="h-16 w-16 text-primary animate-spin" />
            </div>
            <h3 className="text-lg">Processing Payment...</h3>
            <Progress value={75} className="w-full" />
            <p className="text-gray-600">Please wait while we process your payment and submit your application.</p>
          </div>
        );

      case 5: // Success
        return (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h3 className="text-lg text-green-600">{t.applicationSubmitted}</h3>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="font-medium">{t.yourApplicationId}</p>
              <p className="text-xl font-mono text-green-600">{applicationData.applicationId}</p>
            </div>
            <p className="text-gray-600">
              {currentLang === 'en' 
                ? `Your application will be processed within ${selectedService.duration} days.`
                : `سيتم معالجة طلبك خلال ${selectedService.duration} أيام.`
              }
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => {
                setActiveTab('services');
                setSelectedService(null);
                setApplicationStep(1);
              }}>
                {t.backToServices}
              </Button>
              <Button onClick={() => setActiveTab('tracking')}>
                <Eye className="h-4 w-4 mr-2" />
                {t.trackingTab}
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen py-20 px-4 ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl text-primary mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="services">{t.servicesTab}</TabsTrigger>
            <TabsTrigger value="tracking">{t.trackingTab}</TabsTrigger>
            <TabsTrigger value="application" disabled={!selectedService}>
              {applicationStep > 1 ? `${t.steps.split('.')[0]} ${applicationStep}` : t.applicationsTab}
            </TabsTrigger>
          </TabsList>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={t.searchServices}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder={t.filterByCategory} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center">
                        {category.icon}
                        <span className="ml-2">
                          {currentLang === 'en' ? category.nameEn : category.nameAr}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="text-primary">
                        {service.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {currentLang === 'en' ? service.nameEn : service.nameAr}
                        </CardTitle>
                        <CardDescription>
                          {currentLang === 'en' ? service.descriptionEn : service.descriptionAr}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t.fee}:</span>
                        <span className="font-medium">{service.fee} {t.egp}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t.duration}:</span>
                        <span className="font-medium">{service.duration} {t.days}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">{t.requirements}:</span>
                        <ul className="list-disc list-inside mt-1 text-xs text-gray-500">
                          {service.requirements.slice(0, 2).map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                          {service.requirements.length > 2 && (
                            <li>+{service.requirements.length - 2} more...</li>
                          )}
                        </ul>
                      </div>
                      <Button
                        className="w-full"
                        onClick={() => handleApplyService(service)}
                      >
                        {t.apply}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tracking Tab */}
          <TabsContent value="tracking" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl">{t.trackingTab}</h2>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                {t.refreshStatus}
              </Button>
            </div>

            {userApplications.length > 0 ? (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.applicationId}</TableHead>
                      <TableHead>{t.serviceType}</TableHead>
                      <TableHead>{t.status}</TableHead>
                      <TableHead>{t.lastUpdate}</TableHead>
                      <TableHead>{t.nextAction}</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-mono">{application.id}</TableCell>
                        <TableCell>{application.serviceType}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(application.status)}>
                            {getStatusIcon(application.status)}
                            <span className="ml-2">{t[application.status as keyof typeof t]}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>{application.lastUpdate}</TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {application.nextAction}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">{t.noApplications}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Application Tab */}
          <TabsContent value="application" className="space-y-6">
            {selectedService && (
              <>
                {/* Progress Steps */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">
                        {currentLang === 'en' ? selectedService.nameEn : selectedService.nameAr}
                      </h3>
                      <Badge variant="secondary">
                        Step {applicationStep} of 5
                      </Badge>
                    </div>
                    <Progress value={applicationStep * 20} className="mb-4" />
                    <div className="grid grid-cols-5 gap-2 text-xs">
                      <div className={`text-center ${applicationStep >= 1 ? 'text-primary' : 'text-gray-400'}`}>
                        {t.dataCollection}
                      </div>
                      <div className={`text-center ${applicationStep >= 2 ? 'text-primary' : 'text-gray-400'}`}>
                        {t.documentUpload}
                      </div>
                      <div className={`text-center ${applicationStep >= 3 ? 'text-primary' : 'text-gray-400'}`}>
                        {t.payment}
                      </div>
                      <div className={`text-center ${applicationStep >= 4 ? 'text-primary' : 'text-gray-400'}`}>
                        {t.submission}
                      </div>
                      <div className={`text-center ${applicationStep >= 5 ? 'text-primary' : 'text-gray-400'}`}>
                        {t.tracking}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Application Form */}
                <Card>
                  <CardContent className="p-6">
                    {renderApplicationForm()}
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}