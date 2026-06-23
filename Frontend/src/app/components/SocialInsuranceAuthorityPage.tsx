import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Shield, Users, FileText, DollarSign, Heart, Calculator, Clock, Star, CheckCircle, AlertCircle, ExternalLink, Zap, Building } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SocialInsuranceAuthorityPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
}

export function SocialInsuranceAuthorityPage({ currentLang, onPageChange }: SocialInsuranceAuthorityPageProps) {
  const translations = {
    en: {
      title: 'National Organization for Social Insurance',
      subtitle: 'Comprehensive social insurance and pension services',
      backToServices: 'Back to Government Services',
      servicesTab: 'Services',
      requirementsTab: 'Requirements',
      locationsTab: 'Insurance Offices',
      aboutTab: 'About Organization',
      
      // Services
      pensionInquiry: 'Pension Inquiry',
      pensionInquiryDesc: 'Check pension status and payment history',
      insuranceRegistration: 'Insurance Registration',
      insuranceRegistrationDesc: 'Register for social insurance coverage',
      benefitApplication: 'Benefit Application',
      benefitApplicationDesc: 'Apply for social security benefits',
      insurancePayment: 'Insurance Payment',
      insurancePaymentDesc: 'Pay insurance contributions and premiums',
      insuranceCertificate: 'Insurance Certificate',
      insuranceCertificateDesc: 'Issue insurance coverage certificates',
      disabilityBenefits: 'Disability Benefits',
      disabilityBenefitsDesc: 'Apply for disability insurance benefits',
      
      // Status indicators
      digital: 'Digital Available',
      inPerson: 'In-Person Only',
      both: 'Digital & In-Person',
      
      // Actions
      applyNow: 'Apply Now',
      learnMore: 'Learn More',
      visitOffice: 'Visit Insurance Office',
      automation: 'Auto-Apply',
      
      // Requirements
      requirementsTitle: 'Required Documents',
      generalReq: 'General Requirements',
      generalReqList: [
        'Valid National ID or Passport',
        'Employment contract or proof of work',
        'Recent salary statements (3 months)',
        'Medical examination report (if applicable)',
        'Bank account information for payments'
      ],
      specificReq: 'Service-Specific Requirements',
      
      // Insurance Offices
      officesTitle: 'Social Insurance Offices',
      officesCairo: 'Cairo Insurance Office',
      officesAlex: 'Alexandria Insurance Office',
      officesGiza: 'Giza Insurance Office',
      hoursTitle: 'Working Hours',
      hours: 'Sunday - Thursday: 8:30 AM - 3:30 PM',
      
      // About
      aboutTitle: 'About Social Insurance Organization',
      aboutDesc: 'The National Organization for Social Insurance provides comprehensive social security coverage, manages pension funds, and ensures social protection for Egyptian workers and their families.',
      mission: 'Our Mission',
      missionText: 'To provide comprehensive social insurance coverage and ensure financial security for all Egyptian workers through efficient pension and benefit systems.',
      
      // Stats
      stats: {
        totalServices: '20 Services',
        digitalServices: '14 Digital',
        averageTime: '3-14 Days',
        satisfaction: '88% Satisfaction'
      }
    },
    ar: {
      title: 'الهيئة القومية للتأمين الاجتماعي',
      subtitle: 'خدمات التأمين الاجتماعي والمعاشات الشاملة',
      backToServices: 'العودة للخدمات الحكومية',
      servicesTab: 'الخدمات',
      requirementsTab: 'المتطلبات',
      locationsTab: 'مكاتب التأمين',
      aboutTab: 'عن الهيئة',
      
      // Services
      pensionInquiry: 'استعلام المعاش',
      pensionInquiryDesc: 'التحقق من حالة المعاش وسجل المدفوعات',
      insuranceRegistration: 'تسجيل التأمين',
      insuranceRegistrationDesc: 'التسجيل في التغطية التأمينية الاجتماعية',
      benefitApplication: 'طلب الإعانة',
      benefitApplicationDesc: 'التقدم للحصول على إعانات الضمان الاجتماعي',
      insurancePayment: 'دفع التأمين',
      insurancePaymentDesc: 'دفع اشتراكات وأقساط التأمين',
      insuranceCertificate: 'شهادة التأمين',
      insuranceCertificateDesc: 'إصدار شهادات التغطية التأمينية',
      disabilityBenefits: 'إعانة الإعاقة',
      disabilityBenefitsDesc: 'التقدم للحصول على إعانات تأمين الإعاقة',
      
      // Status indicators
      digital: 'متاح رقمياً',
      inPerson: 'حضور شخصي فقط',
      both: 'رقمي وحضور شخصي',
      
      // Actions
      applyNow: 'تقدم الآن',
      learnMore: 'اعرف أكثر',
      visitOffice: 'زيارة مكتب التأمين',
      automation: 'تقديم تلقائي',
      
      // Requirements
      requirementsTitle: 'الوثائق المطلوبة',
      generalReq: 'المتطلبات العامة',
      generalReqList: [
        'بطاقة الرقم القومي سارية أو جواز سفر',
        'عقد العمل أو إثبات العمل',
        'كشوف المرتبات الحديثة (3 أشهر)',
        'تقرير الفحص الطبي (إذا كان مطلوب)',
        'معلومات الحساب البنكي للمدفوعات'
      ],
      specificReq: 'متطلبات خاصة بالخدمة',
      
      // Insurance Offices
      officesTitle: 'مكاتب التأمين الاجتماعي',
      officesCairo: 'مكتب تأمين القاهرة',
      officesAlex: 'مكتب تأمين الإسكندرية',
      officesGiza: 'مكتب تأمين الجيزة',
      hoursTitle: 'أوقات العمل',
      hours: 'الأحد - الخميس: 8:30 ص - 3:30 م',
      
      // About
      aboutTitle: 'عن هيئة التأمين الاجتماعي',
      aboutDesc: 'توفر الهيئة القومية للتأمين الاجتماعي تغطية الضمان الاجتماعي الشاملة وتدير صناديق المعاشات وتضمن الحماية الاجتماعية للعمال المصريين وأسرهم.',
      mission: 'مهمتنا',
      missionText: 'توفير تغطية تأمينية اجتماعية شاملة وضمان الأمان المالي لجميع العمال المصريين من خلال أنظمة المعاشات والإعانات الفعالة.',
      
      // Stats
      stats: {
        totalServices: '20 خدمة',
        digitalServices: '14 خدمة رقمية',
        averageTime: '3-14 يوم',
        satisfaction: '88% رضا'
      }
    }
  };

  const t = translations[currentLang];

  const services = [
    {
      icon: Calculator,
      title: t.pensionInquiry,
      description: t.pensionInquiryDesc,
      status: 'digital',
      popular: true,
      processingTime: currentLang === 'en' ? 'Immediate' : 'فوري',
      fee: currentLang === 'en' ? 'Free' : 'مجاناً'
    },
    {
      icon: Shield,
      title: t.insuranceRegistration,
      description: t.insuranceRegistrationDesc,
      status: 'both',
      popular: true,
      processingTime: currentLang === 'en' ? '7-10 days' : '7-10 أيام',
      fee: currentLang === 'en' ? 'Free' : 'مجاناً'
    },
    {
      icon: Heart,
      title: t.benefitApplication,
      description: t.benefitApplicationDesc,
      status: 'both',
      popular: false,
      processingTime: currentLang === 'en' ? '14-21 days' : '14-21 يوم',
      fee: currentLang === 'en' ? 'Free' : 'مجاناً'
    },
    {
      icon: DollarSign,
      title: t.insurancePayment,
      description: t.insurancePaymentDesc,
      status: 'digital',
      popular: true,
      processingTime: currentLang === 'en' ? 'Immediate' : 'فوري',
      fee: currentLang === 'en' ? '2 EGP processing fee' : '2 جنيه رسوم معالجة'
    },
    {
      icon: FileText,
      title: t.insuranceCertificate,
      description: t.insuranceCertificateDesc,
      status: 'both',
      popular: false,
      processingTime: currentLang === 'en' ? '3-5 days' : '3-5 أيام',
      fee: currentLang === 'en' ? '25 EGP' : '25 جنيه'
    },
    {
      icon: Users,
      title: t.disabilityBenefits,
      description: t.disabilityBenefitsDesc,
      status: 'inPerson',
      popular: false,
      processingTime: currentLang === 'en' ? '21-30 days' : '21-30 يوم',
      fee: currentLang === 'en' ? 'Free' : 'مجاناً'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'digital':
        return <Badge className="bg-green-100 text-green-800">{t.digital}</Badge>;
      case 'inPerson':
        return <Badge className="bg-yellow-100 text-yellow-800">{t.inPerson}</Badge>;
      case 'both':
        return <Badge className="bg-blue-100 text-blue-800">{t.both}</Badge>;
      default:
        return null;
    }
  };

  const insuranceOffices = [
    { name: currentLang === 'en' ? 'Cairo Social Insurance Office' : 'مكتب التأمين الاجتماعي بالقاهرة', address: currentLang === 'en' ? 'Nasr City, Cairo' : 'مدينة نصر، القاهرة', phone: '02-22620700' },
    { name: currentLang === 'en' ? 'Alexandria Social Insurance Office' : 'مكتب التأمين الاجتماعي بالإسكندرية', address: currentLang === 'en' ? 'Sidi Gaber, Alexandria' : 'سيدي جابر، الإسكندرية', phone: '03-5821200' },
    { name: currentLang === 'en' ? 'Giza Social Insurance Office' : 'مكتب التأمين الاجتماعي بالجيزة', address: currentLang === 'en' ? 'Mohandessin, Giza' : 'المهندسين، الجيزة', phone: '02-33351500' },
    { name: currentLang === 'en' ? 'NOSI Headquarters' : 'المقر الرئيسي للهيئة', address: currentLang === 'en' ? 'Lazoughly, Cairo' : 'اللازوغلي، القاهرة', phone: '02-27953500' }
  ];

  return (
    <div className={`min-h-screen bg-gray-50 ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => onPageChange('government')}
            className="mb-4 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.backToServices}
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl mb-2">{t.title}</h1>
              <p className="text-lg opacity-90">{t.subtitle}</p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{t.stats.totalServices}</div>
                <div className="text-sm opacity-80">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{t.stats.digitalServices}</div>
                <div className="text-sm opacity-80">Digital</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{t.stats.averageTime}</div>
                <div className="text-sm opacity-80">Processing</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{t.stats.satisfaction}</div>
                <div className="text-sm opacity-80">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="services" className="w-full">
          <TabsList className="grid w-full lg:w-auto grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="services">{t.servicesTab}</TabsTrigger>
            <TabsTrigger value="requirements">{t.requirementsTab}</TabsTrigger>
            <TabsTrigger value="locations">{t.locationsTab}</TabsTrigger>
            <TabsTrigger value="about">{t.aboutTab}</TabsTrigger>
          </TabsList>

          {/* Services Tab */}
          <TabsContent value="services" className="mt-6">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="relative hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
                  {service.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-secondary text-secondary-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        {currentLang === 'en' ? 'Popular' : 'شائع'}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <service.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
                        {getStatusBadge(service.status)}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">{service.description}</CardDescription>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {currentLang === 'en' ? 'Processing Time:' : 'وقت المعالجة:'}
                        </span>
                        <span className="font-medium">{service.processingTime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {currentLang === 'en' ? 'Fee:' : 'الرسوم:'}
                        </span>
                        <span className="font-medium">{service.fee}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => onPageChange('automation')}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        {t.automation}
                      </Button>
                      <Button size="sm" variant="outline">
                        {t.learnMore}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Requirements Tab */}
          <TabsContent value="requirements" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    {t.generalReq}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {t.generalReqList.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    {t.specificReq}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {currentLang === 'en' 
                      ? 'Social insurance services may require employment verification, medical examinations for disability benefits, or contribution payment history records.'
                      : 'قد تتطلب خدمات التأمين الاجتماعي التحقق من العمالة أو الفحوصات الطبية لإعانات الإعاقة أو سجلات دفع الاشتراكات.'
                    }
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Locations Tab */}
          <TabsContent value="locations" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    {t.hoursTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium">{t.hours}</p>
                </CardContent>
              </Card>
              
              <div className="grid md:grid-cols-2 gap-6">
                {insuranceOffices.map((office, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-primary" />
                        {office.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-gray-600">{office.address}</p>
                      <p className="font-medium">{office.phone}</p>
                      <Button size="sm" variant="outline" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {t.visitOffice}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="mt-6">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>{t.aboutTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">{t.aboutDesc}</p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{t.mission}</h3>
                      <p className="text-gray-600">{t.missionText}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="text-center">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBpbnN1cmFuY2UlMjBvZmZpY2V8ZW58MXx8fHwxNzU2Mzg0ODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Social Insurance Building"
                  className="rounded-2xl shadow-lg w-full max-w-2xl mx-auto"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}