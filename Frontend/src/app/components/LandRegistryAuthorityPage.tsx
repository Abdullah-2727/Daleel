import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Home, FileText, MapPin, Building, DollarSign, Clock, Star, CheckCircle, AlertCircle, ExternalLink, Zap, Scale } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandRegistryAuthorityPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
}

export function LandRegistryAuthorityPage({ currentLang, onPageChange }: LandRegistryAuthorityPageProps) {
  const translations = {
    en: {
      title: 'Real Estate Registration Authority',
      subtitle: 'Complete real estate and property registration services',
      backToServices: 'Back to Government Services',
      servicesTab: 'Services',
      requirementsTab: 'Requirements',
      locationsTab: 'Registry Offices',
      aboutTab: 'About Authority',
      
      // Services
      propertyRegistration: 'Property Registration',
      propertyRegistrationDesc: 'Register new properties and real estate units',
      ownershipTransfer: 'Ownership Transfer',
      ownershipTransferDesc: 'Transfer property ownership between parties',
      mortgageRegistration: 'Mortgage Registration',
      mortgageRegistrationDesc: 'Register mortgages and liens on properties',
      propertySearch: 'Property Search',
      propertySearchDesc: 'Search property records and ownership history',
      ownershipCertificate: 'Ownership Certificate',
      ownershipCertificateDesc: 'Issue official property ownership certificates',
      propertyValuation: 'Property Valuation',
      propertyValuationDesc: 'Official property valuation for legal purposes',
      
      // Status indicators
      digital: 'Digital Available',
      inPerson: 'In-Person Only',
      both: 'Digital & In-Person',
      
      // Actions
      applyNow: 'Apply Now',
      learnMore: 'Learn More',
      visitOffice: 'Visit Registry Office',
      automation: 'Auto-Apply',
      
      // Requirements
      requirementsTitle: 'Required Documents',
      generalReq: 'General Requirements',
      generalReqList: [
        'Valid National ID or Passport',
        'Property deed or ownership documents',
        'Survey plans and building permits',
        'Payment of registration fees',
        'Power of attorney (if applicable)'
      ],
      specificReq: 'Service-Specific Requirements',
      
      // Registry Offices
      officesTitle: 'Real Estate Registry Offices',
      officesCairo: 'Cairo Registry',
      officesAlex: 'Alexandria Registry',
      officesGiza: 'Giza Registry',
      hoursTitle: 'Working Hours',
      hours: 'Sunday - Thursday: 9:00 AM - 2:00 PM',
      
      // About
      aboutTitle: 'About Real Estate Registration Authority',
      aboutDesc: 'The Real Estate Registration Authority manages all property registration, ownership transfers, and real estate documentation in Egypt, ensuring legal property rights and transparent real estate transactions.',
      mission: 'Our Mission',
      missionText: 'To provide secure, transparent, and efficient real estate registration services that protect property rights and facilitate legal real estate transactions.',
      
      // Stats
      stats: {
        totalServices: '15 Services',
        digitalServices: '9 Digital',
        averageTime: '7-21 Days',
        satisfaction: '91% Satisfaction'
      }
    },
    ar: {
      title: 'مصلحة الشهر العقاري',
      subtitle: 'خدمات تسجيل العقارات والممتلكات الشاملة',
      backToServices: 'العودة للخدمات الحكومية',
      servicesTab: 'الخدمات',
      requirementsTab: 'المتطلبات',
      locationsTab: 'مكاتب الشهر العقاري',
      aboutTab: 'عن المصلحة',
      
      // Services
      propertyRegistration: 'تسجيل العقارات',
      propertyRegistrationDesc: 'تسجيل العقارات الجديدة والوحدات العقارية',
      ownershipTransfer: 'نقل الملكية',
      ownershipTransferDesc: 'نقل ملكية العقارات بين الأطراف',
      mortgageRegistration: 'تسجيل الرهن العقاري',
      mortgageRegistrationDesc: 'تسجيل الرهون والامتيازات على العقارات',
      propertySearch: 'البحث العقاري',
      propertySearchDesc: 'البحث في سجلات العقارات وتاريخ الملكية',
      ownershipCertificate: 'شهادة الملكية',
      ownershipCertificateDesc: 'إصدار شهادات الملكية العقارية الرسمية',
      propertyValuation: 'تقييم العقارات',
      propertyValuationDesc: 'التقييم الرسمي للعقارات للأغراض القانونية',
      
      // Status indicators
      digital: 'متاح رقمياً',
      inPerson: 'حضور شخصي فقط',
      both: 'رقمي وحضور شخصي',
      
      // Actions
      applyNow: 'تقدم الآن',
      learnMore: 'اعرف أكثر',
      visitOffice: 'زيارة مكتب الشهر العقاري',
      automation: 'تقديم تلقائي',
      
      // Requirements
      requirementsTitle: 'الوثائق المطلوبة',
      generalReq: 'المتطلبات العامة',
      generalReqList: [
        'بطاقة الرقم القومي سارية أو جواز سفر',
        'سند الملكية أو وثائق التملك',
        'المخططات المساحية وتراخيص البناء',
        'دفع رسوم التسجيل',
        'توكيل (إذا كان مطلوباً)'
      ],
      specificReq: 'متطلبات خاصة بالخدمة',
      
      // Registry Offices
      officesTitle: 'مكاتب الشهر العقاري',
      officesCairo: 'شهر عقاري القاهرة',
      officesAlex: 'شهر عقاري الإسكندرية',
      officesGiza: 'شهر عقاري الجيزة',
      hoursTitle: 'أوقات العمل',
      hours: 'الأحد - الخميس: 9:00 ص - 2:00 م',
      
      // About
      aboutTitle: 'عن مصلحة الشهر العقاري',
      aboutDesc: 'تدير مصلحة الشهر العقاري جميع عمليات تسجيل العقارات ونقل الملكية وتوثيق المعاملات العقارية في مصر، مما يضمن الحقوق العقارية القانونية والمعاملات العقارية الشفافة.',
      mission: 'مهمتنا',
      missionText: 'تقديم خدمات تسجيل عقاري آمنة وشفافة وفعالة تحمي حقوق الملكية وتسهل المعاملات العقارية القانونية.',
      
      // Stats
      stats: {
        totalServices: '15 خدمة',
        digitalServices: '9 خدمات رقمية',
        averageTime: '7-21 يوم',
        satisfaction: '91% رضا'
      }
    }
  };

  const t = translations[currentLang];

  const services = [
    {
      icon: Home,
      title: t.propertyRegistration,
      description: t.propertyRegistrationDesc,
      status: 'both',
      popular: true,
      processingTime: currentLang === 'en' ? '14-21 days' : '14-21 يوم',
      fee: currentLang === 'en' ? '0.5% of property value' : '0.5% من قيمة العقار'
    },
    {
      icon: FileText,
      title: t.ownershipTransfer,
      description: t.ownershipTransferDesc,
      status: 'both',
      popular: true,
      processingTime: currentLang === 'en' ? '7-14 days' : '7-14 يوم',
      fee: currentLang === 'en' ? '1% of property value' : '1% من قيمة العقار'
    },
    {
      icon: Building,
      title: t.mortgageRegistration,
      description: t.mortgageRegistrationDesc,
      status: 'inPerson',
      popular: false,
      processingTime: currentLang === 'en' ? '10-15 days' : '10-15 يوم',
      fee: currentLang === 'en' ? '0.25% of mortgage value' : '0.25% من قيمة الرهن'
    },
    {
      icon: MapPin,
      title: t.propertySearch,
      description: t.propertySearchDesc,
      status: 'digital',
      popular: true,
      processingTime: currentLang === 'en' ? '1-2 days' : '1-2 يوم',
      fee: currentLang === 'en' ? '50 EGP' : '50 جنيه'
    },
    {
      icon: FileText,
      title: t.ownershipCertificate,
      description: t.ownershipCertificateDesc,
      status: 'both',
      popular: true,
      processingTime: currentLang === 'en' ? '3-5 days' : '3-5 أيام',
      fee: currentLang === 'en' ? '100 EGP' : '100 جنيه'
    },
    {
      icon: DollarSign,
      title: t.propertyValuation,
      description: t.propertyValuationDesc,
      status: 'inPerson',
      popular: false,
      processingTime: currentLang === 'en' ? '7-10 days' : '7-10 أيام',
      fee: currentLang === 'en' ? '200 EGP' : '200 جنيه'
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

  const registryOffices = [
    { name: currentLang === 'en' ? 'Cairo Central Registry' : 'الشهر العقاري المركزي بالقاهرة', address: currentLang === 'en' ? 'Downtown Cairo' : 'وسط القاهرة', phone: '02-25740000' },
    { name: currentLang === 'en' ? 'Nasr City Registry' : 'شهر عقاري مدينة نصر', address: currentLang === 'en' ? 'Nasr City, Cairo' : 'مدينة نصر، القاهرة', phone: '02-22620500' },
    { name: currentLang === 'en' ? 'Alexandria Registry' : 'الشهر العقاري بالإسكندرية', address: currentLang === 'en' ? 'Mansheya, Alexandria' : 'المنشية، الإسكندرية', phone: '03-4865500' },
    { name: currentLang === 'en' ? 'Giza Registry' : 'الشهر العقاري بالجيزة', address: currentLang === 'en' ? 'Dokki, Giza' : 'الدقي، الجيزة', phone: '02-33351000' }
  ];

  return (
    <div className={`min-h-screen bg-gray-50 pt-20 ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
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
                      ? 'Real estate services may require additional documents such as building permits, survey reports, tax clearance certificates, or legal ownership verification.'
                      : 'قد تتطلب الخدمات العقارية وثائق إضافية مثل تراخيص البناء أو التقارير المساحية أو شهادات براءة الذمة الضريبية أو التحقق من الملكية القانونية.'
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
                {registryOffices.map((office, index) => (
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
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwb2ZmaWNlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU2Mzg0ODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Real Estate Registry Building"
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