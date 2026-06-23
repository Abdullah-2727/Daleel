import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Shield, FileText, Car, MapPin, Clock, Star, Users, AlertCircle, CheckCircle, ExternalLink, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ServiceButtonActions } from './ServiceButtonActions';
import { ServiceDetailCard } from './ServiceDetailCard';
import { useState } from 'react';

interface MinistryOfInteriorPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string, serviceData?: any) => void;
}

export function MinistryOfInteriorPage({ currentLang, onPageChange }: MinistryOfInteriorPageProps) {
  const [selectedService, setSelectedService] = useState<any>(null);

  const translations = {
    en: {
      title: 'Ministry of Interior Services',
      subtitle: 'Complete access to all internal security and civil affairs services',
      backToServices: 'Back to Government Services',
      servicesTab: 'Services',
      requirementsTab: 'Requirements',
      locationsTab: 'Service Centers',
      aboutTab: 'About Ministry',
      
      // Services
      nationalId: 'National ID Services',
      nationalIdDesc: 'Issue, renew, and replace national identification cards',
      passport: 'Passport Services',
      passportDesc: 'Apply for new passports and renewals',
      criminalRecord: 'Criminal Record Certificate',
      criminalRecordDesc: 'Request official criminal background checks',
      residencyPermit: 'Residency Permits',
      residencyPermitDesc: 'Services for foreign residents in Egypt',
      drivingLicense: 'Driving License',
      drivingLicenseDesc: 'Apply for new licenses and renewals',
      vehicleRegistration: 'Vehicle Registration',
      vehicleRegistrationDesc: 'Register and transfer vehicle ownership',
      
      // Status indicators
      digital: 'Digital Available',
      inPerson: 'In-Person Only',
      both: 'Digital & In-Person',
      
      // Actions
      applyNow: 'Apply Now',
      learnMore: 'Learn More',
      visitCenter: 'Visit Service Center',
      automation: 'Auto-Apply',
      
      // Requirements
      requirementsTitle: 'Required Documents',
      generalReq: 'General Requirements',
      generalReqList: [
        'Valid National ID or Birth Certificate',
        'Recent passport-sized photos (2-4 photos)',
        'Proof of address (utility bill or rental contract)',
        'Payment of applicable fees'
      ],
      specificReq: 'Service-Specific Requirements',
      
      // Service Centers
      centersTitle: 'Service Centers & Locations',
      centersCairo: 'Cairo Centers',
      centersAlex: 'Alexandria Centers',
      centersGiza: 'Giza Centers',
      hoursTitle: 'Working Hours',
      hours: 'Sunday - Thursday: 8:00 AM - 2:00 PM',
      
      // About
      aboutTitle: 'About Ministry of Interior',
      aboutDesc: 'The Ministry of Interior is responsible for maintaining internal security, civil affairs, and providing essential government services to Egyptian citizens and residents.',
      mission: 'Our Mission',
      missionText: 'To provide secure, efficient, and accessible government services while maintaining public safety and order.',
      
      // Stats
      stats: {
        totalServices: '12 Services',
        digitalServices: '8 Digital',
        averageTime: '3-7 Days',
        satisfaction: '89% Satisfaction'
      }
    },
    ar: {
      title: 'خدمات وزارة الداخلية',
      subtitle: 'وصول شامل لجميع خدمات الأمن الداخلي والشؤون المدنية',
      backToServices: 'العودة للخدمات الحكومية',
      servicesTab: 'الخدمات',
      requirementsTab: 'المتطلبات',
      locationsTab: 'مراكز الخدمة',
      aboutTab: 'عن الوزارة',
      
      // Services
      nationalId: 'خدمات البطاقة الشخصية',
      nationalIdDesc: 'إصدار وتجديد واستبدال بطاقة الرقم القومي',
      passport: 'خدمات جواز السفر',
      passportDesc: 'طلب جوازات سفر جديدة والتجديد',
      criminalRecord: 'شهادة الصحيفة الجنائية',
      criminalRecordDesc: 'طلب فحص السجل الجنائي الرسمي',
      residencyPermit: 'تصاريح الإقامة',
      residencyPermitDesc: 'خدمات للمقيمين الأجانب في مصر',
      drivingLicense: 'رخصة القيادة',
      drivingLicenseDesc: 'طلب رخص قيادة جديدة والتجديد',
      vehicleRegistration: 'تسجيل المركبات',
      vehicleRegistrationDesc: 'تسجيل ونقل ملكية المركبات',
      
      // Status indicators
      digital: 'متاح رقمياً',
      inPerson: 'حضور شخصي فقط',
      both: 'رقمي وحضور شخصي',
      
      // Actions
      applyNow: 'تقدم الآن',
      learnMore: 'اعرف أكثر',
      visitCenter: 'زيارة مركز الخدمة',
      automation: 'تقديم تلقائي',
      
      // Requirements
      requirementsTitle: 'الوثائق المطلوبة',
      generalReq: 'المتطلبات العامة',
      generalReqList: [
        'بطاقة الرقم القومي سارية أو شهادة الميلاد',
        'صور شخصية حديثة (2-4 صور)',
        'إثبات ��نوان (فاتورة مرافق أو عقد إيجار)',
        'دفع الرسوم المقررة'
      ],
      specificReq: 'متطلبات خاصة بالخدمة',
      
      // Service Centers
      centersTitle: 'مراكز ومواقع الخدمة',
      centersCairo: 'مراكز القاهرة',
      centersAlex: 'مراكز الإسكندرية',
      centersGiza: 'مراكز الجيزة',
      hoursTitle: 'أوقات العمل',
      hours: 'الأحد - الخميس: 8:00 ص - 2:00 م',
      
      // About
      aboutTitle: 'عن وزارة الداخلية',
      aboutDesc: 'وزارة الداخلية مسؤولة عن حفظ الأمن الداخلي والشؤون المدنية وتقديم الخدمات الحكومية الأساسية للمواطنين والمقيمين المصريين.',
      mission: 'مهمتنا',
      missionText: 'تقديم خدمات حكومية آمنة وفعالة ومتاحة مع الحفاظ على السلامة العامة والنظام.',
      
      // Stats
      stats: {
        totalServices: '12 خدمة',
        digitalServices: '8 خدمات رقمية',
        averageTime: '3-7 أيام',
        satisfaction: '89% رضا'
      }
    }
  };

  const t = translations[currentLang];

  const serviceDetails = [
    {
      id: 'national-id-renewal',
      name: 'National ID Renewal',
      nameAr: 'تجديد البطاقة الشخصية',
      description: 'Renew your National ID card online. Our AI assistant will guide you through the process step by step.',
      descriptionAr: 'جدد بطاقتك الشخصية أونلاين. سيرشدك المساعد الذكي خلال العملية خطوة بخطوة.',
      icon: FileText,
      estimatedMinutes: 15,
      estimatedDays: 7,
      fee: 50,
      availability: 'available' as const,
      requiredDocuments: [
        'Valid National ID Card',
        'Recent passport-sized photo (white background)',
        'Proof of address (utility bill or rental agreement)',
        'Previous ID card (for renewal cases)',
      ],
      requiredDocumentsAr: [
        'بطاقة الرقم القومي السارية',
        'صورة شخصية حديثة (خلفية بيضاء)',
        'إثبات عنوان (فاتورة مرافق أو عقد إيجار)',
        'البطاقة القديمة (في حالات التجديد)',
      ],
      processingTime: '7-10',
      processingTimeAr: '7-10 أيام',
    },
    {
      id: 'passport-renewal',
      name: 'Passport Services',
      nameAr: 'خدمات جواز السفر',
      description: 'Apply for new passports and renewals with full digital processing.',
      descriptionAr: 'تقدم بطلب جوازات سفر جديدة والتجديد مع معالجة رقمية كاملة.',
      icon: Shield,
      estimatedMinutes: 20,
      estimatedDays: 14,
      fee: 365,
      availability: 'available' as const,
      requiredDocuments: [
        'Valid National ID Card',
        'Recent passport-sized photos (2 photos, white background)',
        'Previous passport (for renewal)',
        'Birth certificate (for first-time applicants)',
      ],
      requiredDocumentsAr: [
        'بطاقة الرقم القومي السارية',
        'صور شخصية حديثة (2 صورة، خلفية بيضاء)',
        'جواز السفر السابق (للتجديد)',
        'شهادة الميلاد (للمتقدمين لأول مرة)',
      ],
      processingTime: '10-14',
      processingTimeAr: '10-14 يوم',
    },
    {
      id: 'criminal-record',
      name: 'Criminal Record Certificate',
      nameAr: 'شهادة الصحيفة الجنائية',
      description: 'Request official criminal background checks for employment or travel.',
      descriptionAr: 'اطلب فحص السجل الجنائي الرسمي للتوظيف أو السفر.',
      icon: FileText,
      estimatedMinutes: 10,
      estimatedDays: 3,
      fee: 20,
      availability: 'available' as const,
      requiredDocuments: [
        'Valid National ID Card',
        'Recent passport-sized photo',
        'Purpose statement (employment/travel)',
      ],
      requiredDocumentsAr: [
        'بطاقة الرقم القومي السارية',
        'صورة شخصية حديثة',
        'بيان الغرض (توظيف/سفر)',
      ],
      processingTime: '2-3',
      processingTimeAr: '2-3 أيام',
    },
    {
      id: 'driving-license',
      name: 'Driving License',
      nameAr: 'رخصة القيادة',
      description: 'Apply for new driving licenses and renewals.',
      descriptionAr: 'تقدم بطلب رخص قيادة جديدة والتجديد.',
      icon: Car,
      estimatedMinutes: 20,
      estimatedDays: 7,
      fee: 120,
      availability: 'limited' as const,
      requiredDocuments: [
        'Valid National ID Card',
        'Medical examination certificate',
        'Recent passport-sized photos (4 photos)',
        'Previous license (for renewal)',
      ],
      requiredDocumentsAr: [
        'بطاقة الرقم القومي السارية',
        'شهادة فحص طبي',
        'صور شخصية حديثة (4 صور)',
        'الرخصة السابقة (للتجديد)',
      ],
      processingTime: '5-7',
      processingTimeAr: '5-7 أيام',
    },
  ];

  const services = [
    {
      icon: FileText,
      title: t.nationalId,
      description: t.nationalIdDesc,
      status: 'both',
      popular: true,
      processingTime: currentLang === 'en' ? '3-5 days' : '3-5 أيام',
      fee: currentLang === 'en' ? '50 EGP' : '50 جنيه'
    },
    {
      icon: Shield,
      title: t.passport,
      description: t.passportDesc,
      status: 'both',
      popular: true,
      processingTime: currentLang === 'en' ? '5-7 days' : '5-7 أيام',
      fee: currentLang === 'en' ? '365 EGP' : '365 جنيه'
    },
    {
      icon: FileText,
      title: t.criminalRecord,
      description: t.criminalRecordDesc,
      status: 'digital',
      popular: false,
      processingTime: currentLang === 'en' ? '1-2 days' : '1-2 يوم',
      fee: currentLang === 'en' ? '20 EGP' : '20 جنيه'
    },
    {
      icon: Users,
      title: t.residencyPermit,
      description: t.residencyPermitDesc,
      status: 'inPerson',
      popular: false,
      processingTime: currentLang === 'en' ? '7-14 days' : '7-14 يوم',
      fee: currentLang === 'en' ? '200 EGP' : '200 جنيه'
    },
    {
      icon: Car,
      title: t.drivingLicense,
      description: t.drivingLicenseDesc,
      status: 'both',
      popular: true,
      processingTime: currentLang === 'en' ? '3-5 days' : '3-5 أيام',
      fee: currentLang === 'en' ? '120 EGP' : '120 جنيه'
    },
    {
      icon: Car,
      title: t.vehicleRegistration,
      description: t.vehicleRegistrationDesc,
      status: 'both',
      popular: false,
      processingTime: currentLang === 'en' ? '2-3 days' : '2-3 أيام',
      fee: currentLang === 'en' ? '100 EGP' : '100 جنيه'
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
    { name: currentLang === 'en' ? 'Tahrir Square Center' : 'مركز ميدان التحرير', address: currentLang === 'en' ? 'Tahrir Square, Cairo' : 'ميدان التحرير، القاهرة', phone: '02-27953000' },
    { name: currentLang === 'en' ? 'Nasr City Center' : 'مركز مدينة نصر', address: currentLang === 'en' ? 'Nasr City, Cairo' : 'مدينة نصر، القاهرة', phone: '02-22620000' },
    { name: currentLang === 'en' ? 'Alexandria Center' : 'مركز الإسكندرية', address: currentLang === 'en' ? 'Sidi Gaber, Alexandria' : 'سيدي جابر، الإسكندرية', phone: '03-5821000' },
    { name: currentLang === 'en' ? 'Giza Center' : 'مركز الجيزة', address: currentLang === 'en' ? 'Dokki, Giza' : 'الدقي، الجيزة', phone: '02-33350000' }
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
        <>
          {/* Header */}
          <div className="bg-white border-b border-gray-200 py-8 px-4">
            <div className="max-w-7xl mx-auto">
              <Button
                variant="ghost"
                onClick={() => onPageChange('government')}
                className="mb-4"
              >
                <ArrowLeft className={`h-4 w-4 ${currentLang === 'ar' ? 'ml-2 rotate-180' : 'mr-2'}`} />
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
                          ? 'Each service may have additional specific requirements. Please check the individual service pages for detailed information.'
                          : 'قد تحتوي كل خدمة على متطلبات إضافية محددة. يرجى مراجعة صفحات الخدمات الفردية للحصول على معلومات تفصيلية.'
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
                      src="https://images.unsplash.com/photo-1697582718102-bd0e67cdf7ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMGdvdmVybm1lbnQlMjBidWlsZGluZyUyMGNhaXJvfGVufDF8fHx8MTc1NjM4MDA1NHww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Ministry of Interior Building"
                      className="rounded-2xl shadow-lg w-full max-w-2xl mx-auto"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
}