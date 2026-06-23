import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, FileText, Calculator, Receipt, Building, DollarSign, Clock, Star, CheckCircle, AlertCircle, ExternalLink, Zap, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ServiceDetailCard } from './ServiceDetailCard';
import { useState } from 'react';

interface TaxAuthorityPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string, serviceData?: any) => void;
}

export function TaxAuthorityPage({ currentLang, onPageChange }: TaxAuthorityPageProps) {
  const [selectedService, setSelectedService] = useState<any>(null);

  const translations = {
    en: {
      title: 'Egyptian Tax Authority Services',
      subtitle: 'Comprehensive taxation services and tax compliance support',
      backToServices: 'Back to Government Services',
      servicesTab: 'Services',
      requirementsTab: 'Requirements',
      locationsTab: 'Tax Offices',
      aboutTab: 'About Authority',
      
      // Services
      taxReturn: 'Tax Return Filing',
      taxReturnDesc: 'Submit annual tax returns and declarations',
      taxPayment: 'Tax Payment',
      taxPaymentDesc: 'Pay taxes online and get receipts',
      taxCertificate: 'Tax Certificate',
      taxCertificateDesc: 'Request official tax compliance certificates',
      vatRegistration: 'VAT Registration',
      vatRegistrationDesc: 'Register for Value Added Tax system',
      taxClearance: 'Tax Clearance',
      taxClearanceDesc: 'Obtain tax clearance certificates',
      taxRefund: 'Tax Refund',
      taxRefundDesc: 'Apply for tax refunds and follow up status',
      
      // Status indicators
      digital: 'Digital Available',
      inPerson: 'In-Person Only',
      both: 'Digital & In-Person',
      
      // Actions
      applyNow: 'Apply Now',
      learnMore: 'Learn More',
      visitOffice: 'Visit Tax Office',
      automation: 'Auto-Apply',
      
      // Requirements
      requirementsTitle: 'Required Documents',
      generalReq: 'General Requirements',
      generalReqList: [
        'Valid National ID or Commercial Register',
        'Tax registration number',
        'Financial statements and records',
        'Bank statements',
        'Supporting invoices and receipts'
      ],
      specificReq: 'Service-Specific Requirements',
      
      // Tax Offices
      officesTitle: 'Tax Offices & Locations',
      officesCairo: 'Cairo Tax Offices',
      officesAlex: 'Alexandria Tax Offices',
      officesGiza: 'Giza Tax Offices',
      hoursTitle: 'Working Hours',
      hours: 'Sunday - Thursday: 8:00 AM - 6:00 PM',
      
      // About
      aboutTitle: 'About Egyptian Tax Authority',
      aboutDesc: 'The Egyptian Tax Authority is responsible for tax collection, tax law enforcement, and providing comprehensive tax services to individuals and businesses in Egypt.',
      mission: 'Our Mission',
      missionText: 'To modernize tax collection, ensure tax compliance, and provide efficient digital services to taxpayers.',
      
      // Stats
      stats: {
        totalServices: '20 Services',
        digitalServices: '16 Digital',
        averageTime: '1-7 Days',
        satisfaction: '87% Satisfaction'
      }
    },
    ar: {
      title: 'خدمات مصلحة الضرائب المصرية',
      subtitle: 'خدمات ضريبية شاملة ودعم الامتثال الضريبي',
      backToServices: 'العودة للخدمات الحكومية',
      servicesTab: 'الخدمات',
      requirementsTab: 'المتطلبات',
      locationsTab: 'مكاتب الضرائب',
      aboutTab: 'عن المصلحة',
      
      // Services
      taxReturn: 'تقديم الإقرار الضريبي',
      taxReturnDesc: 'تقديم الإقرارات الضريبية السنوية والтвержادات',
      taxPayment: 'دفع الضرائب',
      taxPaymentDesc: 'دفع الضرائب إلكترونياً والحصول على الإيصالات',
      taxCertificate: 'شهادة ضريبية',
      taxCertificateDesc: 'طلب شهادات الامتثال الضريبي الرسمية',
      vatRegistration: 'تسجيل ضريبة القيمة المضافة',
      vatRegistrationDesc: 'التسجيل في نظام ضريبة القيمة المضافة',
      taxClearance: 'براءة ذمة ضريبية',
      taxClearanceDesc: 'الحصول على شهادات براءة الذمة الضريبية',
      taxRefund: 'المبالغ المستردة',
      taxRefundDesc: 'طلب استرداد الضرائب ومتابعة الحالة',
      
      // Status indicators
      digital: 'متاح رقمياً',
      inPerson: 'حضور شخصي فقط',
      both: 'رقمي وحضور شخصي',
      
      // Actions
      applyNow: 'تقدم الآن',
      learnMore: 'اعرف أكثر',
      visitOffice: 'زيارة مكتب الضرائب',
      automation: 'تقديم تلقائي',
      
      // Requirements
      requirementsTitle: 'الوثائق المطلوبة',
      generalReq: 'المتطلبات العامة',
      generalReqList: [
        'بطاقة الرقم القومي سارية أو السجل التجاري',
        'رقم التسجيل الضريبي',
        'القوائم المالية والسجلات',
        'كشوف حساب بنكية',
        'الفواتير والإيصالات المؤيدة'
      ],
      specificReq: 'متطلبات خاصة بالخدمة',
      
      // Tax Offices
      officesTitle: 'مكاتب ومواقع الضرائب',
      officesCairo: 'مكاتب ضرائب القاهرة',
      officesAlex: 'مكاتب ضرائب الإسكندرية',
      officesGiza: 'مكاتب ضرائب الجيزة',
      hoursTitle: 'أوقات العمل',
      hours: 'الأحد - الخميس: 8:00 ص - 6:00 م',
      
      // About
      aboutTitle: 'عن مصلحة الضرائب المصرية',
      aboutDesc: 'مصلحة الضرائب المصرية مسؤولة عن تحصيل الضرائب وتطبيق قانون الضرائب وتقديم خدمات ضريبية شاملة للأفراد والشركات في مصر.',
      mission: 'مهمتنا',
      missionText: 'تحديث تحصيل الضرائب وضمان الامتثال الضريبي وتقديم خدمات رقمية فعالة لدافعي الضرائب.',
      
      // Stats
      stats: {
        totalServices: '20 خدمة',
        digitalServices: '16 خدمة رقمية',
        averageTime: '1-7 أيام',
        satisfaction: '87% رضا'
      }
    }
  };

  const t = translations[currentLang];

  const serviceDetails = [
    {
      id: 'tax-return',
      name: 'Tax Return Filing',
      nameAr: 'تقديم الإقرار الضريبي',
      description: 'Submit annual tax returns and declarations with full compliance support.',
      descriptionAr: 'تقديم الإقرارات الضريبية السنوية مع دعم الامتثال الكامل.',
      icon: FileText,
      estimatedMinutes: 20,
      estimatedDays: 7,
      fee: 0,
      availability: 'available' as const,
      requiredDocuments: [
        'Valid National ID or Commercial Register',
        'Tax registration number',
        'Annual financial statements',
        'Bank statements',
        'Supporting invoices and receipts'
      ],
      requiredDocumentsAr: [
        'بطاقة الرقم القومي سارية أو السجل التجاري',
        'رقم التسجيل الضريبي',
        'القوائم المالية السنوية',
        'كشوف حساب بنكية',
        'الفواتير والإيصالات المؤيدة'
      ],
      processingTime: '5-7',
      processingTimeAr: '5-7 أيام',
    },
    {
      id: 'tax-certificate',
      name: 'Tax Certificate',
      nameAr: 'شهادة ضريبية',
      description: 'Request official tax compliance certificates for legal and business purposes.',
      descriptionAr: 'طلب شهادات الامتثال الضريبي الرسمية للأغراض القانونية والتجارية.',
      icon: Receipt,
      estimatedMinutes: 15,
      estimatedDays: 5,
      fee: 50,
      availability: 'available' as const,
      requiredDocuments: [
        'Valid National ID or Commercial Register',
        'Tax registration number',
        'Previous tax returns',
        'Payment receipts'
      ],
      requiredDocumentsAr: [
        'بطاقة الرقم القومي سارية أو السجل التجاري',
        'رقم التسجيل الضريبي',
        'الإقرارات الضريبية السابقة',
        'إيصالات الدفع'
      ],
      processingTime: '3-5',
      processingTimeAr: '3-5 أيام',
    },
    {
      id: 'vat-registration',
      name: 'VAT Registration',
      nameAr: 'تسجيل ضريبة القيمة المضافة',
      description: 'Register for Value Added Tax system for your business operations.',
      descriptionAr: 'التسجيل في نظام ضريبة القيمة المضافة لعمليات عملك.',
      icon: Building,
      estimatedMinutes: 30,
      estimatedDays: 10,
      fee: 0,
      availability: 'available' as const,
      requiredDocuments: [
        'Commercial Register',
        'Tax Card',
        'Company establishment contract',
        'Proof of business address',
        'Bank account details'
      ],
      requiredDocumentsAr: [
        'السجل التجاري',
        'البطاقة الضريبية',
        'عقد تأسيس الشركة',
        'إثبات عنوان النشاط',
        'تفاصيل الحساب البنكي'
      ],
      processingTime: '7-10',
      processingTimeAr: '7-10 أيام',
    },
  ];

  const services = [
    {
      icon: FileText,
      title: t.taxReturn,
      description: t.taxReturnDesc,
      status: 'digital',
      popular: true,
      processingTime: currentLang === 'en' ? '5-7 days' : '5-7 أيام',
      fee: currentLang === 'en' ? 'Free' : 'مجاناً'
    },
    {
      icon: DollarSign,
      title: t.taxPayment,
      description: t.taxPaymentDesc,
      status: 'digital',
      popular: true,
      processingTime: currentLang === 'en' ? 'Immediate' : 'فوري',
      fee: currentLang === 'en' ? 'Transaction fees apply' : 'رسوم المعاملة تطبق'
    },
    {
      icon: Receipt,
      title: t.taxCertificate,
      description: t.taxCertificateDesc,
      status: 'both',
      popular: false,
      processingTime: currentLang === 'en' ? '3-5 days' : '3-5 أيام',
      fee: currentLang === 'en' ? '50 EGP' : '50 جنيه'
    },
    {
      icon: Building,
      title: t.vatRegistration,
      description: t.vatRegistrationDesc,
      status: 'both',
      popular: true,
      processingTime: currentLang === 'en' ? '7-10 days' : '7-10 أيام',
      fee: currentLang === 'en' ? 'Free' : 'مجاناً'
    },
    {
      icon: CheckCircle,
      title: t.taxClearance,
      description: t.taxClearanceDesc,
      status: 'both',
      popular: false,
      processingTime: currentLang === 'en' ? '5-7 days' : '5-7 أيام',
      fee: currentLang === 'en' ? '100 EGP' : '100 جنيه'
    },
    {
      icon: Calculator,
      title: t.taxRefund,
      description: t.taxRefundDesc,
      status: 'digital',
      popular: false,
      processingTime: currentLang === 'en' ? '14-30 days' : '14-30 يوم',
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

  const taxOffices = [
    { name: currentLang === 'en' ? 'Central Tax Office - Cairo' : 'مكتب الضرائب المركزي - القاهرة', address: currentLang === 'en' ? 'Nasr City, Cairo' : 'مدينة نصر، القاهرة', phone: '16501' },
    { name: currentLang === 'en' ? 'Giza Tax Office' : 'مكتب ضرائب الجيزة', address: currentLang === 'en' ? 'Dokki, Giza' : 'الدقي، الجيزة', phone: '02-33759000' },
    { name: currentLang === 'en' ? 'Alexandria Tax Office' : 'مكتب ضرائب الإسكندرية', address: currentLang === 'en' ? 'Sidi Gaber, Alexandria' : 'سيدي جابر، الإسكندرية', phone: '03-5832000' },
    { name: currentLang === 'en' ? 'Tax Appeal Committee' : 'لجنة الطعن الضريبي', address: currentLang === 'en' ? 'Downtown Cairo' : 'وسط القاهرة', phone: '02-27925000' }
  ];

  return (
    <div className={`min-h-screen bg-background ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
      {selectedService ? (
        <div className="min-h-screen bg-background p-8">
          <div className="max-w-5xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => setSelectedService(null)}
              className="mb-6"
            >
              <ArrowLeft className={`h-4 w-4 ${currentLang === 'ar' ? 'ml-2 rotate-180' : 'mr-2'}`} />
              {t.backToServices}
            </Button>
            <ServiceDetailCard
              currentLang={currentLang}
              service={selectedService}
              onStartApplication={() => {
                onPageChange('automation', selectedService);
              }}
              onSaveForLater={() => {
                console.log('Save for later');
              }}
              onContactSupport={() => {
                onPageChange('contact');
              }}
              showFullDetails={true}
            />
          </div>
        </div>
      ) : (
      <div>
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
                        className="flex-1 gradient-primary text-white border-0"
                        onClick={() => {
                          const detailService = serviceDetails.find(s => 
                            (currentLang === 'ar' ? s.nameAr : s.name) === service.title
                          );
                          if (detailService) {
                            setSelectedService(detailService);
                          }
                        }}
                      >
                        {t.applyNow}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-2"
                        onClick={() => {
                          const detailService = serviceDetails.find(s => 
                            (currentLang === 'ar' ? s.nameAr : s.name) === service.title
                          );
                          if (detailService) {
                            setSelectedService(detailService);
                          }
                        }}
                      >
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
                      ? 'Tax services require specific documentation depending on the type of tax, business category, and transaction value. Please consult with tax advisors for complex cases.'
                      : 'تتطلب الخدمات الضريبية وثائق محددة حسب نوع الضريبة وفئة النشاط وقيمة المعاملة. يرجى استشارة المستشارين الضريبيين للحالات المعقدة.'
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
                {taxOffices.map((office, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
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
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXglMjBvZmZpY2UlMjBidWlsZGluZyUyMGVneXB0fGVufDF8fHx8MTc1NjM4NTQ1Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Tax Authority Building"
                  className="rounded-2xl shadow-lg w-full max-w-2xl mx-auto"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      </div>
      )}
    </div>
  );
}