import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Zap, Droplets, Flame, Wifi, Phone, Recycle, Clock, Star, CheckCircle, AlertCircle, ExternalLink, Building, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface UtilitiesAuthorityPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
}

export function UtilitiesAuthorityPage({ currentLang, onPageChange }: UtilitiesAuthorityPageProps) {
  const translations = {
    en: {
      title: 'Utilities and Public Services Authority',
      subtitle: 'Essential utility services for homes and businesses',
      backToServices: 'Back to Government Services',
      servicesTab: 'Services',
      requirementsTab: 'Requirements',
      locationsTab: 'Service Centers',
      aboutTab: 'About Authority',
      
      // Services
      electricityConnection: 'Electricity Connection',
      electricityConnectionDesc: 'New electricity connections and service transfers',
      waterConnection: 'Water Connection',
      waterConnectionDesc: 'Water and sewerage service connections',
      gasConnection: 'Natural Gas Connection',
      gasConnectionDesc: 'Natural gas service installation and connection',
      billPayment: 'Bill Payment',
      billPaymentDesc: 'Pay electricity, water, and gas bills online',
      meterReading: 'Meter Reading',
      meterReadingDesc: 'Submit meter readings and consumption reports',
      serviceComplaints: 'Service Complaints',
      serviceComplaintsDesc: 'Report service issues and file complaints',
      
      // Status indicators
      digital: 'Digital Available',
      inPerson: 'In-Person Only',
      both: 'Digital & In-Person',
      
      // Actions
      applyNow: 'Apply Now',
      learnMore: 'Learn More',
      visitCenter: 'Visit Service Center',
      automation: 'Auto-Apply',
      payBill: 'Pay Bill',
      
      // Requirements
      requirementsTitle: 'Required Documents',
      generalReq: 'General Requirements',
      generalReqList: [
        'Valid National ID or Passport',
        'Property ownership deed or rental contract',
        'Building permits and approvals',
        'Technical specifications and plans',
        'Payment of connection fees and deposits'
      ],
      specificReq: 'Service-Specific Requirements',
      
      // Service Centers
      centersTitle: 'Utility Service Centers',
      centersCairo: 'Cairo Service Center',
      centersAlex: 'Alexandria Service Center',
      centersGiza: 'Giza Service Center',
      hoursTitle: 'Working Hours',
      hours: 'Sunday - Thursday: 8:00 AM - 4:00 PM (Emergency: 24/7)',
      
      // About
      aboutTitle: 'About Utilities Authority',
      aboutDesc: 'The Utilities and Public Services Authority manages and maintains essential infrastructure services including electricity, water, natural gas, and telecommunications for Egyptian citizens and businesses.',
      mission: 'Our Mission',
      missionText: 'To provide reliable, efficient, and affordable utility services that support economic development and improve quality of life for all citizens.',
      
      // Stats
      stats: {
        totalServices: '25 Services',
        digitalServices: '18 Digital',
        averageTime: '1-14 Days',
        satisfaction: '86% Satisfaction'
      }
    },
    ar: {
      title: 'هيئة المرافق والخدمات العامة',
      subtitle: 'خدمات المرافق الأساسية للمنازل والشركات',
      backToServices: 'العودة للخدمات الحكومية',
      servicesTab: 'الخدمات',
      requirementsTab: 'المتطلبات',
      locationsTab: 'مراكز الخدمة',
      aboutTab: 'عن الهيئة',
      
      // Services
      electricityConnection: 'توصيل الكهرباء',
      electricityConnectionDesc: 'توصيلات الكهرباء الجديدة ونقل الخدمة',
      waterConnection: 'توصيل المياه',
      waterConnectionDesc: 'توصيل خدمات المياه والصرف الصحي',
      gasConnection: 'توصيل الغاز الطبيعي',
      gasConnectionDesc: 'تركيب وتوصيل خدمة الغاز الطبيعي',
      billPayment: 'دفع الفواتير',
      billPaymentDesc: 'دفع فواتير الكهرباء والمياه والغاز إلكترونياً',
      meterReading: 'قراءة العدادات',
      meterReadingDesc: 'تسجيل قراءات العدادات وتقارير الاستهلاك',
      serviceComplaints: 'شكاوى الخدمة',
      serviceComplaintsDesc: 'الإبلاغ عن مشاكل الخدمة وتقديم الشكاوى',
      
      // Status indicators
      digital: 'متاح رقمياً',
      inPerson: 'حضور شخصي فقط',
      both: 'رقمي وحضور شخصي',
      
      // Actions
      applyNow: 'تقدم الآن',
      learnMore: 'اعرف أكثر',
      visitCenter: 'زيارة مركز الخدمة',
      automation: 'تقديم تلقائي',
      payBill: 'دفع الفاتورة',
      
      // Requirements
      requirementsTitle: 'الوثائق المطلوبة',
      generalReq: 'المتطلبات العامة',
      generalReqList: [
        'بطاقة الرقم القومي سارية أو جواز سفر',
        'سند الملكية أو عقد الإيجار',
        'تراخيص البناء والموافقات',
        'المواصفات التقنية والمخططات',
        'دفع رسوم التوصيل والتأمينات'
      ],
      specificReq: 'متطلبات خاصة بالخدمة',
      
      // Service Centers
      centersTitle: 'مراكز خدمة المرافق',
      centersCairo: 'مركز خدمة القاهرة',
      centersAlex: 'مركز خدمة الإسكندرية',
      centersGiza: 'مركز خدمة الجيزة',
      hoursTitle: 'أوقات العمل',
      hours: 'الأحد - الخميس: 8:00 ص - 4:00 م (الطوارئ: 24/7)',
      
      // About
      aboutTitle: 'عن هيئة المرافق',
      aboutDesc: 'تدير هيئة المرافق والخدمات العامة وتحافظ على خدمات البنية التحتية الأساسية بما في ذلك الكهرباء والمياه والغاز الطبيعي والاتصالات للمواطنين المصريين والشركات.',
      mission: 'مهمتنا',
      missionText: 'توفير خدمات مرافق موثوقة وفعالة وبأسعار معقولة تدعم التنمية الاقتصادية وتحسن جودة الحياة لجميع المواطنين.',
      
      // Stats
      stats: {
        totalServices: '25 خدمة',
        digitalServices: '18 خدمة رقمية',
        averageTime: '1-14 يوم',
        satisfaction: '86% رضا'
      }
    }
  };

  const t = translations[currentLang];

  const services = [
    {
      icon: Zap,
      title: t.electricityConnection,
      description: t.electricityConnectionDesc,
      status: 'both',
      popular: true,
      processingTime: currentLang === 'en' ? '7-14 days' : '7-14 يوم',
      fee: currentLang === 'en' ? '500-2000 EGP' : '500-2000 جنيه'
    },
    {
      icon: Droplets,
      title: t.waterConnection,
      description: t.waterConnectionDesc,
      status: 'both',
      popular: true,
      processingTime: currentLang === 'en' ? '5-10 days' : '5-10 أيام',
      fee: currentLang === 'en' ? '300-1500 EGP' : '300-1500 جنيه'
    },
    {
      icon: Flame,
      title: t.gasConnection,
      description: t.gasConnectionDesc,
      status: 'inPerson',
      popular: false,
      processingTime: currentLang === 'en' ? '14-21 days' : '14-21 يوم',
      fee: currentLang === 'en' ? '800-3000 EGP' : '800-3000 جنيه'
    },
    {
      icon: Phone,
      title: t.billPayment,
      description: t.billPaymentDesc,
      status: 'digital',
      popular: true,
      processingTime: currentLang === 'en' ? 'Immediate' : 'فوري',
      fee: currentLang === 'en' ? '2 EGP service fee' : '2 جنيه رسوم خدمة'
    },
    {
      icon: Building,
      title: t.meterReading,
      description: t.meterReadingDesc,
      status: 'digital',
      popular: false,
      processingTime: currentLang === 'en' ? '1-2 days' : '1-2 يوم',
      fee: currentLang === 'en' ? 'Free' : 'مجاناً'
    },
    {
      icon: AlertCircle,
      title: t.serviceComplaints,
      description: t.serviceComplaintsDesc,
      status: 'both',
      popular: false,
      processingTime: currentLang === 'en' ? '3-7 days' : '3-7 أيام',
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

  const serviceCenters = [
    { 
      name: currentLang === 'en' ? 'Cairo Utilities Center' : 'مركز مرافق القاهرة', 
      address: currentLang === 'en' ? 'Abbassia, Cairo' : 'العباسية، القاهرة', 
      phone: '121', 
      services: ['Electricity', 'Water', 'Gas']
    },
    { 
      name: currentLang === 'en' ? 'Alexandria Utilities Center' : 'مركز مرافق الإسكندرية', 
      address: currentLang === 'en' ? 'Smouha, Alexandria' : 'سموحة، الإسكندرية', 
      phone: '121', 
      services: ['Electricity', 'Water']
    },
    { 
      name: currentLang === 'en' ? 'Giza Utilities Center' : 'مركز مرافق الجيزة', 
      address: currentLang === 'en' ? '6th of October, Giza' : '6 أكتوبر، الجيزة', 
      phone: '121', 
      services: ['Electricity', 'Water', 'Gas']
    },
    { 
      name: currentLang === 'en' ? 'Emergency Utilities Hotline' : 'خط الطوارئ للمرافق', 
      address: currentLang === 'en' ? '24/7 Emergency Service' : 'خدمة طوارئ 24/7', 
      phone: '121', 
      services: ['Emergency Repairs']
    }
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

      {/* Emergency Notice */}
      <div className="bg-orange-600 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
          <AlertCircle className="h-5 w-5" />
          <span className="font-medium">
            {currentLang === 'en' 
              ? 'Utilities Emergency Hotline: 121 - Available 24/7'
              : 'خط طوارئ المرافق: 121 - متاح على مدار 24/7'
            }
          </span>
          <Button size="sm" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
            {currentLang === 'en' ? 'Call 121' : 'اتصل بـ 121'}
          </Button>
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
                      {service.title === t.billPayment ? (
                        <Button 
                          size="sm" 
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          {t.payBill}
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => onPageChange('automation')}
                        >
                          <Zap className="h-4 w-4 mr-2" />
                          {t.automation}
                        </Button>
                      )}
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
                      ? 'Utility connections may require safety inspections, load calculations for electricity, pressure tests for gas connections, or environmental impact assessments.'
                      : 'قد تتطلب توصيلات المرافق فحوصات السلامة أو حسابات الأحمال للكهرباء أو اختبارات الضغط لتوصيلات الغاز أو تقييمات الأثر البيئي.'
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
                {serviceCenters.map((center, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        {center.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-gray-600">{center.address}</p>
                      <p className="font-medium">{center.phone}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {center.services.map((service, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {t.visitCenter}
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
                  src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1dGlsaXRpZXMlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTYzODQ4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Utilities Building"
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