import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Car, Bus, Truck, Plane, Ship, FileText, Clock, Star, CheckCircle, AlertCircle, ExternalLink, Zap, MapPin, CreditCard } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TransportAuthorityPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
}

export function TransportAuthorityPage({ currentLang, onPageChange }: TransportAuthorityPageProps) {
  const translations = {
    en: {
      title: 'Ministry of Transportation',
      subtitle: 'Comprehensive transportation services and vehicle licensing',
      backToServices: 'Back to Government Services',
      servicesTab: 'Services',
      requirementsTab: 'Requirements',
      locationsTab: 'Traffic Departments',
      aboutTab: 'About Ministry',
      
      // Services
      drivingLicense: 'Driving License',
      drivingLicenseDesc: 'Apply for new driving licenses and renewals',
      vehicleRegistration: 'Vehicle Registration',
      vehicleRegistrationDesc: 'Register new vehicles and transfer ownership',
      licenseRenewal: 'License Renewal',
      licenseRenewalDesc: 'Renew expired driving licenses',
      trafficFines: 'Traffic Violations & Fines',
      trafficFinesDesc: 'Check and pay traffic violation fines',
      vehicleInspection: 'Vehicle Inspection',
      vehicleInspectionDesc: 'Annual vehicle safety and emissions inspection',
      transportPermits: 'Transport Permits',
      transportPermitsDesc: 'Commercial transport and logistics permits',
      
      // Status indicators
      digital: 'Digital Available',
      inPerson: 'In-Person Only',
      both: 'Digital & In-Person',
      
      // Actions
      applyNow: 'Apply Now',
      learnMore: 'Learn More',
      visitDepartment: 'Visit Traffic Department',
      automation: 'Auto-Apply',
      payFines: 'Pay Fines',
      
      // Requirements
      requirementsTitle: 'Required Documents',
      generalReq: 'General Requirements',
      generalReqList: [
        'Valid National ID or Passport',
        'Recent passport-sized photos (4 photos)',
        'Medical fitness certificate',
        'Blood type certificate',
        'Payment of applicable fees'
      ],
      specificReq: 'Service-Specific Requirements',
      
      // Traffic Departments
      departmentsTitle: 'Traffic Departments & Offices',
      departmentsCairo: 'Cairo Traffic Department',
      departmentsAlex: 'Alexandria Traffic Department',
      departmentsGiza: 'Giza Traffic Department',
      hoursTitle: 'Working Hours',
      hours: 'Sunday - Thursday: 8:00 AM - 2:00 PM',
      
      // About
      aboutTitle: 'About Ministry of Transportation',
      aboutDesc: 'The Ministry of Transportation manages all aspects of transportation infrastructure, vehicle licensing, traffic safety, and public transportation systems across Egypt.',
      mission: 'Our Mission',
      missionText: 'To provide safe, efficient, and sustainable transportation services that support economic development and ensure public safety on Egyptian roads.',
      
      // Stats
      stats: {
        totalServices: '22 Services',
        digitalServices: '15 Digital',
        averageTime: '3-14 Days',
        satisfaction: '84% Satisfaction'
      }
    },
    ar: {
      title: 'وزارة النقل',
      subtitle: 'خدمات النقل الشاملة وترخيص المركبات',
      backToServices: 'العودة للخدمات الحكومية',
      servicesTab: 'الخدمات',
      requirementsTab: 'المتطلبات',
      locationsTab: 'إدارات المرور',
      aboutTab: 'عن الوزارة',
      
      // Services
      drivingLicense: 'رخصة القيادة',
      drivingLicenseDesc: 'طلب رخص القيادة الجديدة والتجديد',
      vehicleRegistration: 'تسجيل المركبات',
      vehicleRegistrationDesc: 'تسجيل المركبات الجديدة ونقل الملكية',
      licenseRenewal: 'تجديد الرخصة',
      licenseRenewalDesc: 'تجديد رخص القيادة المنتهية الصلاحية',
      trafficFines: 'المخالفات المرورية والغرامات',
      trafficFinesDesc: 'الاستعلام ودفع غرامات المخالفات المرورية',
      vehicleInspection: 'فحص المركبات',
      vehicleInspectionDesc: 'الفحص السنوي لسلامة المركبات والانبعاثات',
      transportPermits: 'تصاريح النقل',
      transportPermitsDesc: 'تصاريح النقل التجاري واللوجستيات',
      
      // Status indicators
      digital: 'متاح رقمياً',
      inPerson: 'حضور شخصي فقط',
      both: 'رقمي وحضور شخصي',
      
      // Actions
      applyNow: 'تقدم الآن',
      learnMore: 'اعرف أكثر',
      visitDepartment: 'زيارة إدارة المرور',
      automation: 'تقديم تلقائي',
      payFines: 'دفع الغرامات',
      
      // Requirements
      requirementsTitle: 'الوثائق المطلوبة',
      generalReq: 'المتطلبات العامة',
      generalReqList: [
        'بطاقة الرقم القومي سارية أو جواز سفر',
        'صور شخصية حديثة (4 صور)',
        'شهادة اللياقة الطبية',
        'شهادة فصيلة الدم',
        'دفع الرسوم المقررة'
      ],
      specificReq: 'متطلبات خاصة بالخدمة',
      
      // Traffic Departments
      departmentsTitle: 'إدارات ومكاتب المرور',
      departmentsCairo: 'إدارة مرور القاهرة',
      departmentsAlex: 'إدارة مرور الإسكندرية',
      departmentsGiza: 'إدارة مرور الجيزة',
      hoursTitle: 'أوقات العمل',
      hours: 'الأحد - الخميس: 8:00 ص - 2:00 م',
      
      // About
      aboutTitle: 'عن وزارة النقل',
      aboutDesc: 'تدير وزارة النقل جميع جوانب البنية التحتية للنقل وترخيص المركبات وسلامة المرور وأنظمة النقل العام في جميع أنحاء مصر.',
      mission: 'مهمتنا',
      missionText: 'توفير خدمات نقل آمنة وفعالة ومستدامة تدعم التنمية الاقتصادية وتضمن السلامة العامة على الطرق المصرية.',
      
      // Stats
      stats: {
        totalServices: '22 خدمة',
        digitalServices: '15 خدمة رقمية',
        averageTime: '3-14 يوم',
        satisfaction: '84% رضا'
      }
    }
  };

  const t = translations[currentLang];

  const services = [
    {
      icon: Car,
      title: t.drivingLicense,
      description: t.drivingLicenseDesc,
      status: 'both',
      popular: true,
      processingTime: currentLang === 'en' ? '7-14 days' : '7-14 يوم',
      fee: currentLang === 'en' ? '200-500 EGP' : '200-500 جنيه'
    },
    {
      icon: FileText,
      title: t.vehicleRegistration,
      description: t.vehicleRegistrationDesc,
      status: 'both',
      popular: true,
      processingTime: currentLang === 'en' ? '5-10 days' : '5-10 أيام',
      fee: currentLang === 'en' ? '300-800 EGP' : '300-800 جنيه'
    },
    {
      icon: Car,
      title: t.licenseRenewal,
      description: t.licenseRenewalDesc,
      status: 'both',
      popular: true,
      processingTime: currentLang === 'en' ? '3-7 days' : '3-7 أيام',
      fee: currentLang === 'en' ? '100-300 EGP' : '100-300 جنيه'
    },
    {
      icon: CreditCard,
      title: t.trafficFines,
      description: t.trafficFinesDesc,
      status: 'digital',
      popular: true,
      processingTime: currentLang === 'en' ? 'Immediate' : 'فوري',
      fee: currentLang === 'en' ? 'Variable by violation' : 'متغير حسب المخالفة'
    },
    {
      icon: CheckCircle,
      title: t.vehicleInspection,
      description: t.vehicleInspectionDesc,
      status: 'inPerson',
      popular: false,
      processingTime: currentLang === 'en' ? '1-2 days' : '1-2 يوم',
      fee: currentLang === 'en' ? '150-250 EGP' : '150-250 جنيه'
    },
    {
      icon: Truck,
      title: t.transportPermits,
      description: t.transportPermitsDesc,
      status: 'both',
      popular: false,
      processingTime: currentLang === 'en' ? '10-21 days' : '10-21 يوم',
      fee: currentLang === 'en' ? '500-2000 EGP' : '500-2000 جنيه'
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

  const trafficDepartments = [
    { name: currentLang === 'en' ? 'Cairo Traffic Department' : 'إدارة مرور القاهرة', address: currentLang === 'en' ? 'Abbassia, Cairo' : 'العباسية، القاهرة', phone: '02-24820000' },
    { name: currentLang === 'en' ? 'New Cairo Traffic Department' : 'إدارة مرور القاهرة الجديدة', address: currentLang === 'en' ? 'New Cairo' : 'القاهرة الجديدة', phone: '02-25980000' },
    { name: currentLang === 'en' ? 'Alexandria Traffic Department' : 'إدارة مرور الإسكندرية', address: currentLang === 'en' ? 'Sidi Gaber, Alexandria' : 'سيدي جابر، الإسكندرية', phone: '03-5821300' },
    { name: currentLang === 'en' ? 'Giza Traffic Department' : 'إدارة مرور الجيزة', address: currentLang === 'en' ? 'Dokki, Giza' : 'الدقي، الجيزة', phone: '02-33351200' }
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

      {/* Traffic Safety Notice */}
      <div className="bg-blue-600 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
          <Car className="h-5 w-5" />
          <span className="font-medium">
            {currentLang === 'en' 
              ? 'Traffic Violations Hotline: 122 - Report traffic violations and accidents'
              : 'خط الإبلاغ عن المخالفات المرورية: 122 - للإبلاغ عن المخالفات والحوادث'
            }
          </span>
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
                      {service.title === t.trafficFines ? (
                        <Button 
                          size="sm" 
                          className="flex-1 bg-red-600 hover:bg-red-700"
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          {t.payFines}
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
                      ? 'Transportation services may require driving tests, vehicle inspections, insurance certificates, or specific professional driving courses for commercial licenses.'
                      : 'قد تتطلب خدمات النقل اختبارات القيادة أو فحص المركبات أو شهادات التأمين أو دورات قيادة مهنية محددة للرخص التجارية.'
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
                {trafficDepartments.map((department, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        {department.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-gray-600">{department.address}</p>
                      <p className="font-medium">{department.phone}</p>
                      <Button size="sm" variant="outline" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {t.visitDepartment}
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
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFmZmljJTIwZGVwYXJ0bWVudCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc1NjM4NDg0OXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Transportation Ministry Building"
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