import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Scale, FileText, Gavel, Users, Building2, AlertTriangle, Clock, Star, CheckCircle, AlertCircle, ExternalLink, Zap, MapPin, Phone } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface JusticeMinistryPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
}

export function JusticeMinistryPage({ currentLang, onPageChange }: JusticeMinistryPageProps) {
  const translations = {
    en: {
      title: 'Ministry of Justice',
      subtitle: 'Legal services, court procedures, and judicial documentation',
      backToServices: 'Back to Government Services',
      servicesTab: 'Services',
      requirementsTab: 'Requirements',
      locationsTab: 'Courts & Offices',
      aboutTab: 'About Ministry',
      
      // Services
      legalDocumentation: 'Legal Documentation',
      legalDocumentationDesc: 'Notarization and legal document authentication',
      courtFiling: 'Court Case Filing',
      courtFilingDesc: 'File new court cases and legal proceedings',
      powerOfAttorney: 'Power of Attorney',
      powerOfAttorneyDesc: 'Create and authenticate power of attorney documents',
      marriageContract: 'Marriage Contracts',
      marriageContractDesc: 'Official marriage contract registration and documentation',
      legalConsultation: 'Legal Consultation',
      legalConsultationDesc: 'Professional legal advice and consultation services',
      caseStatus: 'Case Status Inquiry',
      caseStatusDesc: 'Check the status of ongoing legal cases',
      
      // Status indicators
      digital: 'Digital Available',
      inPerson: 'In-Person Only',
      both: 'Digital & In-Person',
      
      // Actions
      applyNow: 'Apply Now',
      learnMore: 'Learn More',
      visitCourt: 'Visit Court',
      automation: 'Auto-Apply',
      bookConsultation: 'Book Consultation',
      
      // Requirements
      requirementsTitle: 'Required Documents',
      generalReq: 'General Requirements',
      generalReqList: [
        'Valid National ID or Passport',
        'Original documents for authentication',
        'Legal representation (if required)',
        'Payment of court fees and stamps',
        'Witness identification (if applicable)'
      ],
      specificReq: 'Service-Specific Requirements',
      
      // Courts & Offices
      courtsTitle: 'Courts and Justice Offices',
      courtsCairo: 'Cairo Court Complex',
      courtsAlex: 'Alexandria Courts',
      courtsGiza: 'Giza Judicial Complex',
      hoursTitle: 'Working Hours',
      hours: 'Sunday - Thursday: 9:00 AM - 2:00 PM',
      
      // About
      aboutTitle: 'About Ministry of Justice',
      aboutDesc: 'The Ministry of Justice oversees the judicial system, manages court operations, provides legal services, and ensures the rule of law and justice for all Egyptian citizens.',
      mission: 'Our Mission',
      missionText: 'To uphold justice, protect legal rights, and provide accessible legal services while maintaining the integrity and independence of the judicial system.',
      
      // Stats
      stats: {
        totalServices: '18 Services',
        digitalServices: '8 Digital',
        averageTime: '7-30 Days',
        satisfaction: '82% Satisfaction'
      }
    },
    ar: {
      title: 'وزارة العدل',
      subtitle: 'الخدمات القانونية وإجراءات المحاكم والتوثيق القضائي',
      backToServices: 'العودة للخدمات الحكومية',
      servicesTab: 'الخدمات',
      requirementsTab: 'المتطلبات',
      locationsTab: 'المحاكم والمكاتب',
      aboutTab: 'عن الوزارة',
      
      // Services
      legalDocumentation: 'التوثيق القانوني',
      legalDocumentationDesc: 'التوثيق وتصديق الوثائق القانونية',
      courtFiling: 'رفع الدعاوى القضائية',
      courtFilingDesc: 'رفع دعاوى قضائية جديدة وإجراءات قانونية',
      powerOfAttorney: 'التوكيلات',
      powerOfAttorneyDesc: 'إنشاء وتوثيق وثائق التوكيل',
      marriageContract: 'عقود الزواج',
      marriageContractDesc: 'تسجيل وتوثيق عقود الزواج الرسمية',
      legalConsultation: 'الاستشارة القانونية',
      legalConsultationDesc: 'خدمات المشورة والاستشارة القانونية المهنية',
      caseStatus: 'استعلام حالة القضية',
      caseStatusDesc: 'التحقق من حالة القضايا القانونية الجارية',
      
      // Status indicators
      digital: 'متاح رقمياً',
      inPerson: 'حضور شخصي فقط',
      both: 'رقمي وحضور شخصي',
      
      // Actions
      applyNow: 'تقدم الآن',
      learnMore: 'اعرف أكثر',
      visitCourt: 'زيارة المحكمة',
      automation: 'تقديم تلقائي',
      bookConsultation: 'حجز استشارة',
      
      // Requirements
      requirementsTitle: 'الوثائق المطلوبة',
      generalReq: 'المتطلبات العامة',
      generalReqList: [
        'بطاقة الرقم القومي سارية أو جواز سفر',
        'الوثائق الأصلية للتوثيق',
        'التمثيل القانوني (إذا كان مطلوب)',
        'دفع رسوم المحكمة والطوابع',
        'هوية الشهود (إذا كان مطلوب)'
      ],
      specificReq: 'متطلبات خاصة بالخدمة',
      
      // Courts & Offices
      courtsTitle: 'المحاكم ومكاتب العدل',
      courtsCairo: 'مجمع محاكم القاهرة',
      courtsAlex: 'محاكم الإسكندرية',
      courtsGiza: 'المجمع القضائي بالجيزة',
      hoursTitle: 'أوقات العمل',
      hours: 'الأحد - الخميس: 9:00 ص - 2:00 م',
      
      // About
      aboutTitle: 'عن وزارة العدل',
      aboutDesc: 'تشرف وزارة العدل على النظام القضائي وتدير عمليات المحاكم وتوفر الخدمات القانونية وتضمن سيادة القانون والعدالة لجميع المواطنين المصريين.',
      mission: 'مهمتنا',
      missionText: 'إقامة العدل وحماية الحقوق القانونية وتوفير خدمات قانونية متاحة مع الحفاظ على نزاهة واستقلالية النظام القضائي.',
      
      // Stats
      stats: {
        totalServices: '18 خدمة',
        digitalServices: '8 خدمات رقمية',
        averageTime: '7-30 يوم',
        satisfaction: '82% رضا'
      }
    }
  };

  const t = translations[currentLang];

  const services = [
    {
      icon: FileText,
      title: t.legalDocumentation,
      description: t.legalDocumentationDesc,
      status: 'inPerson',
      popular: true,
      processingTime: currentLang === 'en' ? '1-3 days' : '1-3 أيام',
      fee: currentLang === 'en' ? '50-200 EGP' : '50-200 جنيه'
    },
    {
      icon: Gavel,
      title: t.courtFiling,
      description: t.courtFilingDesc,
      status: 'both',
      popular: false,
      processingTime: currentLang === 'en' ? '7-14 days' : '7-14 يوم',
      fee: currentLang === 'en' ? '100-500 EGP' : '100-500 جنيه'
    },
    {
      icon: Users,
      title: t.powerOfAttorney,
      description: t.powerOfAttorneyDesc,
      status: 'inPerson',
      popular: true,
      processingTime: currentLang === 'en' ? '1-2 days' : '1-2 يوم',
      fee: currentLang === 'en' ? '100-300 EGP' : '100-300 جنيه'
    },
    {
      icon: Building2,
      title: t.marriageContract,
      description: t.marriageContractDesc,
      status: 'inPerson',
      popular: true,
      processingTime: currentLang === 'en' ? '1 day' : '1 يوم',
      fee: currentLang === 'en' ? '200-400 EGP' : '200-400 جنيه'
    },
    {
      icon: Scale,
      title: t.legalConsultation,
      description: t.legalConsultationDesc,
      status: 'both',
      popular: false,
      processingTime: currentLang === 'en' ? '1-7 days' : '1-7 أيام',
      fee: currentLang === 'en' ? '150-500 EGP/hour' : '150-500 جنيه/ساعة'
    },
    {
      icon: AlertTriangle,
      title: t.caseStatus,
      description: t.caseStatusDesc,
      status: 'digital',
      popular: false,
      processingTime: currentLang === 'en' ? 'Immediate' : 'فوري',
      fee: currentLang === 'en' ? '25 EGP' : '25 جنيه'
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

  const courts = [
    { 
      name: currentLang === 'en' ? 'Cairo Supreme Court' : 'محكمة القاهرة العليا', 
      address: currentLang === 'en' ? 'Downtown Cairo' : 'وسط القاهرة', 
      phone: '02-25740500',
      type: currentLang === 'en' ? 'Supreme Court' : 'محكمة عليا'
    },
    { 
      name: currentLang === 'en' ? 'New Cairo Family Court' : 'محكمة الأسرة بالقاهرة الجديدة', 
      address: currentLang === 'en' ? 'New Cairo' : 'القاهرة الجديدة', 
      phone: '02-25980500',
      type: currentLang === 'en' ? 'Family Court' : 'محكمة أسرة'
    },
    { 
      name: currentLang === 'en' ? 'Alexandria Court Complex' : 'مجمع محاكم الإسكندرية', 
      address: currentLang === 'en' ? 'Ramleh, Alexandria' : 'الرمل، الإسكندرية', 
      phone: '03-4865600',
      type: currentLang === 'en' ? 'District Court' : 'محكمة حي'
    },
    { 
      name: currentLang === 'en' ? 'Giza Administrative Court' : 'المحكمة الإدارية بالجيزة', 
      address: currentLang === 'en' ? 'Dokki, Giza' : 'الدقي، الجيزة', 
      phone: '02-33351300',
      type: currentLang === 'en' ? 'Administrative Court' : 'محكمة إدارية'
    }
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

      {/* Justice Notice */}
      <div className="bg-amber-600 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
          <Scale className="h-5 w-5" />
          <span className="font-medium">
            {currentLang === 'en' 
              ? 'Legal Aid Hotline: 16000 - Free legal consultation for citizens'
              : 'خط المساعدة القانونية: 16000 - استشارة قانونية مجانية للمواطنين'
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
                      {service.title === t.legalConsultation ? (
                        <Button 
                          size="sm" 
                          className="flex-1 bg-amber-600 hover:bg-amber-700"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          {t.bookConsultation}
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
                      ? 'Legal services may require specific documentation such as contracts, deeds, witness statements, expert testimonies, or legal precedents depending on the case type.'
                      : 'قد تتطلب الخدمات القانونية وثائق محددة مثل العقود أو السندات أو شهادات الشهود أو شهادات الخبراء أو السوابق القانونية حسب نوع القضية.'
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
                {courts.map((court, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        {court.name}
                      </CardTitle>
                      <Badge variant="outline" className="w-fit">
                        {court.type}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-gray-600">{court.address}</p>
                      <p className="font-medium">{court.phone}</p>
                      <Button size="sm" variant="outline" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {t.visitCourt}
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
                  src="https://images.unsplash.com/photo-1589578527966-fdac0f44566c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdXN0aWNlJTIwYnVpbGRpbmclMjBjb3VydGhvdXNlfGVufDF8fHx8MTc1NjM4NDg0OXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Justice Ministry Building"
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