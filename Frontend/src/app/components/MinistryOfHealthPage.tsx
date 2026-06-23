import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Heart, Activity, Pill, FileText, Calendar, Stethoscope, ArrowLeft, User, Plus, Star, CheckCircle, AlertCircle, Clock, MapPin, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ServiceDetailCard } from './ServiceDetailCard';
import { useState } from 'react';

interface MinistryOfHealthPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string, serviceData?: any) => void;
}

export function MinistryOfHealthPage({ currentLang, onPageChange }: MinistryOfHealthPageProps) {
  const [selectedService, setSelectedService] = useState<any>(null);

  const translations = {
    en: {
      title: 'Ministry of Health Services',
      subtitle: 'Comprehensive healthcare and medical services for all citizens',
      backToServices: 'Back to Government Services',
      servicesTab: 'Services',
      requirementsTab: 'Requirements',
      locationsTab: 'Healthcare Centers',
      aboutTab: 'About Ministry',
      
      // Services
      healthInsurance: 'Health Insurance Registration',
      healthInsuranceDesc: 'Register for comprehensive health insurance coverage',
      medicalRecords: 'Medical Records Request',
      medicalRecordsDesc: 'Access and request official medical records',
      vaccination: 'Vaccination Certificates',
      vaccinationDesc: 'Get official vaccination records and certificates',
      medicalFitness: 'Medical Fitness Certificate',
      medicalFitnessDesc: 'Obtain medical fitness certificates for work/travel',
      emergencyServices: 'Emergency Medical Services',
      emergencyServicesDesc: 'Access 24/7 emergency medical assistance',
      healthClearance: 'Health Clearance Certificate',
      healthClearanceDesc: 'Health clearance for food handlers and workers',
      
      // Status indicators
      digital: 'Digital Available',
      inPerson: 'In-Person Only',
      both: 'Digital & In-Person',
      emergency: '24/7 Emergency',
      
      // Actions
      applyNow: 'Apply Now',
      learnMore: 'Learn More',
      visitCenter: 'Visit Health Center',
      automation: 'Auto-Apply',
      emergency: 'Emergency Call',
      
      // Requirements
      requirementsTitle: 'Required Documents',
      generalReq: 'General Requirements',
      generalReqList: [
        'Valid National ID or Birth Certificate',
        'Recent passport-sized photos (2 photos)',
        'Medical examination (if required)',
        'Payment of applicable fees',
        'Previous medical records (if available)'
      ],
      specificReq: 'Service-Specific Requirements',
      
      // Healthcare Centers
      centersTitle: 'Healthcare Centers & Hospitals',
      centersCairo: 'Cairo Health Centers',
      centersAlex: 'Alexandria Health Centers',
      centersGiza: 'Giza Health Centers',
      hoursTitle: 'Working Hours',
      hours: 'Sunday - Thursday: 8:00 AM - 2:00 PM (Emergency: 24/7)',
      
      // About
      aboutTitle: 'About Ministry of Health',
      aboutDesc: 'The Ministry of Health ensures the provision of quality healthcare services, maintains public health standards, and provides medical assistance to all Egyptian citizens.',
      mission: 'Our Mission',
      missionText: 'To provide accessible, quality healthcare services and ensure the health and well-being of all Egyptian citizens.',
      
      // Stats
      stats: {
        totalServices: '18 Services',
        digitalServices: '12 Digital',
        averageTime: '1-5 Days',
        satisfaction: '92% Satisfaction'
      }
    },
    ar: {
      title: 'خدمات وزارة الصحة والسكان',
      subtitle: 'خدمات رعاية صحية وطبية شاملة لجميع المواطنين',
      backToServices: 'العودة للخدمات الحكومية',
      servicesTab: 'الخدمات',
      requirementsTab: 'المتطلبات',
      locationsTab: 'المراكز الصحية',
      aboutTab: 'عن الوزارة',
      
      // Services
      healthInsurance: 'تسجيل التأمين الصحي',
      healthInsuranceDesc: 'التسجيل في التأمين الصحي الشامل',
      medicalRecords: 'طلب السجلات الطبية',
      medicalRecordsDesc: 'الوصول وطلب السجلات الطبية الرسمية',
      vaccination: 'شهادات التطعيم',
      vaccinationDesc: 'الحصول على سجلات وشهادات التطعيم الرسمية',
      medicalFitness: 'شهادة اللياقة الطبية',
      medicalFitnessDesc: 'الحصول على شهادات اللياقة الطبية للعمل/السفر',
      emergencyServices: 'خدمات الطوارئ الطبية',
      emergencyServicesDesc: 'الوصول للمساعدة الطبية الطارئة على مدار 24/7',
      healthClearance: 'شهادة التخليص الصحي',
      healthClearanceDesc: 'التخليص الصحي لمتداولي الأغذية والعمال',
      
      // Status indicators
      digital: 'متاح رقمياً',
      inPerson: 'حضور شخصي فقط',
      both: 'رقمي وحضور شخصي',
      emergency: 'طوارئ 24/7',
      
      // Actions
      applyNow: 'تقدم الآن',
      learnMore: 'اعرف أكثر',
      visitCenter: 'زيارة المركز الصحي',
      automation: 'تقديم تلقائي',
      emergency: 'اتصال طوارئ',
      
      // Requirements
      requirementsTitle: 'الوثائق المطلوبة',
      generalReq: 'المتطلبات العامة',
      generalReqList: [
        'بطاقة الرقم القومي سارية أو شهادة الميلاد',
        'صور شخصية حديثة (2 صورة)',
        'فحص طبي (إذا كان مطلوب)',
        'دفع الرسوم المقررة',
        'السجلات الطبية السابقة (إذا كانت متاحة)'
      ],
      specificReq: 'متطلبات خاصة بالخدمة',
      
      // Healthcare Centers
      centersTitle: 'المراكز الصحية والمستشفيات',
      centersCairo: 'المراكز الصحية بالقاهرة',
      centersAlex: 'المراكز الصحية بالإسكندرية',
      centersGiza: 'المراكز الصحية بالجيزة',
      hoursTitle: 'أوقات العمل',
      hours: 'الأحد - الخميس: 8:00 ص - 2:00 م (الطوارئ: 24/7)',
      
      // About
      aboutTitle: 'عن وزارة الصحة والسكان',
      aboutDesc: 'تضمن وزارة الصحة والسكان تقديم خدمات رعاية صحية عالية الجودة والحفاظ على معايير الصحة العامة وتقديم المساعدة الطبية لجميع المواطنين المصريين.',
      mission: 'مهمتنا',
      missionText: 'تقديم خدمات رعاي صحية متاحة وعالية الجودة وضمان صحة ورفاهية جميع المواطنين المصريين.',
      
      // Stats
      stats: {
        totalServices: '18 خدمة',
        digitalServices: '12 خدمة رقمية',
        averageTime: '1-5 أيام',
        satisfaction: '92% رضا'
      }
    }
  };

  const t = translations[currentLang];

  const serviceDetails = [
    {
      id: 'health-insurance',
      name: 'Health Insurance Registration',
      nameAr: 'تسجيل التأمين الصحي',
      description: 'Register for comprehensive health insurance coverage with full medical services access.',
      descriptionAr: 'سجل في التأمين الصحي الشامل مع إمكانية الوصول الكامل للخدمات الطبية.',
      icon: Heart,
      estimatedMinutes: 10,
      estimatedDays: 5,
      fee: 0,
      availability: 'available' as const,
      requiredDocuments: [
        'Valid National ID Card',
        'Recent passport-sized photos (2 photos)',
        'Proof of address',
        'Birth certificate (for dependents)',
      ],
      requiredDocumentsAr: [
        'بطاقة الرقم القومي السارية',
        'صور شخصية حديثة (2 صورة)',
        'إثبات عنوان',
        'شهادة الميلاد (للمعالين)',
      ],
      processingTime: '3-5',
      processingTimeAr: '3-5 أيام',
    },
    {
      id: 'medical-fitness',
      name: 'Medical Fitness Certificate',
      nameAr: 'شهادة اللياقة الطبية',
      description: 'Obtain medical fitness certificates for work, travel, or educational purposes.',
      descriptionAr: 'احصل على شهادات اللياقة الطبية للعمل أو السفر أو الأغراض التعليمية.',
      icon: Stethoscope,
      estimatedMinutes: 30,
      estimatedDays: 2,
      fee: 50,
      availability: 'available' as const,
      requiredDocuments: [
        'Valid National ID Card',
        'Recent passport-sized photo',
        'Medical examination results',
        'Purpose statement',
      ],
      requiredDocumentsAr: [
        'بطاقة الرقم القومي السارية',
        'صورة شخصية حديثة',
        'نتائج الفحص الطبي',
        'بيان الغرض',
      ],
      processingTime: '1-2',
      processingTimeAr: '1-2 يوم',
    },
    {
      id: 'vaccination-certificate',
      name: 'Vaccination Certificate',
      nameAr: 'شهادة التطعيم',
      description: 'Get official vaccination records and international vaccination certificates.',
      descriptionAr: 'احصل على سجلات التطعيم الرسمية وشهادات التطعيم الدولية.',
      icon: Pill,
      estimatedMinutes: 15,
      estimatedDays: 3,
      fee: 10,
      availability: 'available' as const,
      requiredDocuments: [
        'Valid National ID Card',
        'Previous vaccination records',
        'Passport (for international certificates)',
      ],
      requiredDocumentsAr: [
        'بطاقة الرقم القومي السارية',
        'سجلات التطعيم السابقة',
        'جواز السفر (للشهادات الدولية)',
      ],
      processingTime: '1-3',
      processingTimeAr: '1-3 أيام',
    },
  ];

  const services = [
    {
      icon: Heart,
      title: t.healthInsurance,
      description: t.healthInsuranceDesc,
      status: 'both',
      popular: true,
      processingTime: currentLang === 'en' ? '3-5 days' : '3-5 أيام',
      fee: currentLang === 'en' ? 'Free' : 'مجاناً'
    },
    {
      icon: FileText,
      title: t.medicalRecords,
      description: t.medicalRecordsDesc,
      status: 'digital',
      popular: true,
      processingTime: currentLang === 'en' ? '1-2 days' : '1-2 يوم',
      fee: currentLang === 'en' ? '15 EGP' : '15 جنيه'
    },
    {
      icon: Pill,
      title: t.vaccination,
      description: t.vaccinationDesc,
      status: 'both',
      popular: false,
      processingTime: currentLang === 'en' ? '1-3 days' : '1-3 أيام',
      fee: currentLang === 'en' ? '10 EGP' : '10 جنيه'
    },
    {
      icon: Stethoscope,
      title: t.medicalFitness,
      description: t.medicalFitnessDesc,
      status: 'inPerson',
      popular: true,
      processingTime: currentLang === 'en' ? '1-2 days' : '1-2 يوم',
      fee: currentLang === 'en' ? '50 EGP' : '50 جنيه'
    },
    {
      icon: Heart,
      title: t.emergencyServices,
      description: t.emergencyServicesDesc,
      status: 'emergency',
      popular: false,
      processingTime: currentLang === 'en' ? 'Immediate' : 'فوري',
      fee: currentLang === 'en' ? 'Free' : 'مجاناً'
    },
    {
      icon: FileText,
      title: t.healthClearance,
      description: t.healthClearanceDesc,
      status: 'both',
      popular: false,
      processingTime: currentLang === 'en' ? '2-3 days' : '2-3 أيام',
      fee: currentLang === 'en' ? '30 EGP' : '30 جنيه'
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
      case 'emergency':
        return <Badge className="bg-red-100 text-red-800">{t.emergency}</Badge>;
      default:
        return null;
    }
  };

  const healthCenters = [
    { name: currentLang === 'en' ? 'Qasr Al-Aini Hospital' : 'مستشفى قصر العيني', address: currentLang === 'en' ? 'Qasr Al-Aini, Cairo' : 'قصر العيني، القاهرة', phone: '02-23654000', type: 'Hospital' },
    { name: currentLang === 'en' ? 'Alexandria University Hospital' : 'مستشفى جامعة الإسكندرية', address: currentLang === 'en' ? 'El-Khartoum Square, Alexandria' : 'الخرطوم، الإسكندرية', phone: '03-4865000', type: 'Hospital' },
    { name: currentLang === 'en' ? 'Cairo Health Insurance Office' : 'مكتب التأمين الصحي بالقاهرة', address: currentLang === 'en' ? 'Nasr City, Cairo' : 'مدينة نصر، القاهرة', phone: '02-22624500', type: 'Insurance Office' },
    { name: currentLang === 'en' ? 'Emergency Medical Services' : 'خدمات الطوارئ الطبية', address: currentLang === 'en' ? 'Nationwide Coverage' : 'تغطية شاملة', phone: '123', type: 'Emergency' }
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

          {/* Emergency Alert */}
          <div className="bg-red-600 text-white py-3 px-4">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
              <Heart className="h-5 w-5" />
              <span className="font-medium">
                {currentLang === 'en' 
                  ? 'Emergency Medical Services: Call 123 for immediate assistance'
                  : 'خدمات الطوارئ الطبية: اتصل بـ 123 للمساعدة الفورية'
                }
              </span>
              <Button size="sm" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
                {t.emergency}
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
                          {service.status === 'emergency' ? (
                            <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
                              <Heart className="h-4 w-4 mr-2" />
                              {t.emergency}
                            </Button>
                          ) : (
                            <>
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
                            </>
                          )}
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
                          ? 'Medical services may require specific health examinations, blood tests, or specialist consultations depending on the service type.'
                          : 'قد تتطلب الخدمات الطبية فحوصات صحية محددة أو تحاليل دم أو استشارات متخصصة حسب نوع الخدمة.'
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
                    {healthCenters.map((center, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            {center.name}
                          </CardTitle>
                          <Badge variant="outline">{center.type}</Badge>
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
                      src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaG9zcGl0YWwlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTYzODQ4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Medical Hospital Building"
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