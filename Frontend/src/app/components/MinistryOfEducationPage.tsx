import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, GraduationCap, FileText, BookOpen, Users, Award, School, Clock, Star, CheckCircle, AlertCircle, ExternalLink, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MinistryOfEducationPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
}

export function MinistryOfEducationPage({ currentLang, onPageChange }: MinistryOfEducationPageProps) {
  const translations = {
    en: {
      title: 'Ministry of Education Services',
      subtitle: 'Access all educational services and academic credentials',
      backToServices: 'Back to Government Services',
      servicesTab: 'Services',
      requirementsTab: 'Requirements',
      locationsTab: 'Educational Offices',
      aboutTab: 'About Ministry',
      
      // Services
      certificateEquivalency: 'Certificate Equivalency',
      certificateEquivalencyDesc: 'Validate foreign educational certificates',
      transcripts: 'Academic Transcripts',
      transcriptsDesc: 'Request official academic transcripts',
      studentRegistration: 'Student Registration',
      studentRegistrationDesc: 'Register students for public schools',
      teacherLicense: 'Teacher License',
      teacherLicenseDesc: 'Apply for teaching permits and renewals',
      scholarships: 'Scholarship Applications',
      scholarshipsDesc: 'Apply for government scholarships',
      schoolLicense: 'School Licensing',
      schoolLicenseDesc: 'License private educational institutions',
      
      // Status indicators
      digital: 'Digital Available',
      inPerson: 'In-Person Only',
      both: 'Digital & In-Person',
      
      // Actions
      applyNow: 'Apply Now',
      learnMore: 'Learn More',
      visitOffice: 'Visit Educational Office',
      automation: 'Auto-Apply',
      
      // Requirements
      requirementsTitle: 'Required Documents',
      generalReq: 'General Requirements',
      generalReqList: [
        'Valid National ID or Birth Certificate',
        'Original academic documents',
        'Passport-sized photos (4 photos)',
        'Payment of applicable fees',
        'Apostille or legalization (for foreign documents)'
      ],
      specificReq: 'Service-Specific Requirements',
      
      // Educational Offices
      officesTitle: 'Educational Offices & Directorates',
      officesCairo: 'Cairo Directorate',
      officesAlex: 'Alexandria Directorate',
      officesGiza: 'Giza Directorate',
      hoursTitle: 'Working Hours',
      hours: 'Sunday - Thursday: 8:00 AM - 2:00 PM',
      
      // About
      aboutTitle: 'About Ministry of Education',
      aboutDesc: 'The Ministry of Education oversees all educational policies, manages public schools, and provides academic services to students, teachers, and educational institutions.',
      mission: 'Our Mission',
      missionText: 'To provide quality education and academic services that support student success and educational excellence.',
      
      // Stats
      stats: {
        totalServices: '15 Services',
        digitalServices: '10 Digital',
        averageTime: '5-10 Days',
        satisfaction: '85% Satisfaction'
      }
    },
    ar: {
      title: 'خدمات وزارة التربية والتعليم',
      subtitle: 'الوصول لجميع الخدمات التعليمية والوثائق الأكاديمية',
      backToServices: 'العودة للخدمات الحكومية',
      servicesTab: 'الخدمات',
      requirementsTab: 'المتطلبات',
      locationsTab: 'المديريات التعليمية',
      aboutTab: 'عن الوزارة',
      
      // Services
      certificateEquivalency: 'معادلة الشهادات',
      certificateEquivalencyDesc: 'التحقق من صحة الشهادات التعليمية الأجنبية',
      transcripts: 'كشوف الدرجات الأكاديمية',
      transcriptsDesc: 'طلب كشوف الدرجات الرسمية',
      studentRegistration: 'تسجيل الطلاب',
      studentRegistrationDesc: 'تسجيل الطلاب في المدارس الحكومية',
      teacherLicense: 'رخصة التدريس',
      teacherLicenseDesc: 'طلب تصاريح التدريس والتجديد',
      scholarships: 'طلبات المنح الدراسية',
      scholarshipsDesc: 'التقدم للمنح الحكومية',
      schoolLicense: 'ترخيص المدارس',
      schoolLicenseDesc: 'ترخيص المؤسسات التعليمية الخاصة',
      
      // Status indicators
      digital: 'متاح رقمياً',
      inPerson: 'حضور شخصي فقط',
      both: 'رقمي وحضور شخصي',
      
      // Actions
      applyNow: 'تقدم الآن',
      learnMore: 'اعرف أكثر',
      visitOffice: 'زيارة المديرية التعليمية',
      automation: 'تقديم تلقائي',
      
      // Requirements
      requirementsTitle: 'الوثائق المطلوبة',
      generalReq: 'المتطلبات العامة',
      generalReqList: [
        'بطاقة الرقم القومي سارية أو شهادة الميلاد',
        'الوثائق الأكاديمية الأصلية',
        'صور شخصية (4 صور)',
        'دفع الرسوم المقررة',
        'الأبوستيل أو التصديق (للوثائق الأجنبية)'
      ],
      specificReq: 'متطلبات خاصة بالخدمة',
      
      // Educational Offices
      officesTitle: 'المكاتب والمديريات التعليمية',
      officesCairo: 'مديرية القاهرة',
      officesAlex: 'مديرية الإسكندرية',
      officesGiza: 'مديرية الجيزة',
      hoursTitle: 'أوقات العمل',
      hours: 'الأحد - الخميس: 8:00 ص - 2:00 م',
      
      // About
      aboutTitle: 'عن وزارة التربية والتعليم',
      aboutDesc: 'تشرف وزارة التربية والتعليم على جميع السياسات التعليمية وتدير المدارس الحكومية وتقدم الخدمات الأكاديمية للطلاب والمعلمين والمؤسسات التعليمية.',
      mission: 'مهمتنا',
      missionText: 'تقديم تعليم عالي الجودة وخدمات أكاديمية تدعم نجاح الطلاب والتميز التعليمي.',
      
      // Stats
      stats: {
        totalServices: '15 خدمة',
        digitalServices: '10 خدمات رقمية',
        averageTime: '5-10 أيام',
        satisfaction: '85% رضا'
      }
    }
  };

  const t = translations[currentLang];

  const services = [
    {
      icon: Award,
      title: t.certificateEquivalency,
      description: t.certificateEquivalencyDesc,
      status: 'both',
      popular: true,
      processingTime: currentLang === 'en' ? '7-14 days' : '7-14 يوم',
      fee: currentLang === 'en' ? '150 EGP' : '150 جنيه'
    },
    {
      icon: FileText,
      title: t.transcripts,
      description: t.transcriptsDesc,
      status: 'digital',
      popular: true,
      processingTime: currentLang === 'en' ? '3-5 days' : '3-5 أيام',
      fee: currentLang === 'en' ? '25 EGP' : '25 جنيه'
    },
    {
      icon: Users,
      title: t.studentRegistration,
      description: t.studentRegistrationDesc,
      status: 'both',
      popular: false,
      processingTime: currentLang === 'en' ? '5-7 days' : '5-7 أيام',
      fee: currentLang === 'en' ? 'Free' : 'مجاناً'
    },
    {
      icon: GraduationCap,
      title: t.teacherLicense,
      description: t.teacherLicenseDesc,
      status: 'both',
      popular: false,
      processingTime: currentLang === 'en' ? '10-15 days' : '10-15 يوم',
      fee: currentLang === 'en' ? '100 EGP' : '100 جنيه'
    },
    {
      icon: BookOpen,
      title: t.scholarships,
      description: t.scholarshipsDesc,
      status: 'digital',
      popular: true,
      processingTime: currentLang === 'en' ? '30-45 days' : '30-45 يوم',
      fee: currentLang === 'en' ? 'Free' : 'مجاناً'
    },
    {
      icon: School,
      title: t.schoolLicense,
      description: t.schoolLicenseDesc,
      status: 'inPerson',
      popular: false,
      processingTime: currentLang === 'en' ? '30-60 days' : '30-60 يوم',
      fee: currentLang === 'en' ? '1000 EGP' : '1000 جنيه'
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

  const educationalOffices = [
    { name: currentLang === 'en' ? 'Cairo Educational Directorate' : 'مديرية التربية والتعليم بالقاهرة', address: currentLang === 'en' ? 'Nasr City, Cairo' : 'مدينة نصر، القاهرة', phone: '02-22624000' },
    { name: currentLang === 'en' ? 'Alexandria Educational Directorate' : 'مديرية التربية والتعليم بالإسكندرية', address: currentLang === 'en' ? 'Azarita, Alexandria' : 'الأزاريطة، الإسكندرية', phone: '03-4840000' },
    { name: currentLang === 'en' ? 'Giza Educational Directorate' : 'مديرية التربية والتعليم بالجيزة', address: currentLang === 'en' ? 'Dokki, Giza' : 'الدقي، الجيزة', phone: '02-33370000' },
    { name: currentLang === 'en' ? 'Ministry Headquarters' : 'مقر الوزارة الرئيسي', address: currentLang === 'en' ? 'El-Falaki, Cairo' : 'الفلكي، القاهرة', phone: '02-25795000' }
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
                        className="flex-1 gradient-primary text-white border-0"
                        onClick={() => onPageChange('automation')}
                      >
                        {t.applyNow}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-2"
                        onClick={() => onPageChange('automation')}
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
                      ? 'Different educational services require specific documents such as previous transcripts, recommendation letters, or professional certifications.'
                      : 'تتطلب الخدمات التعليمية المختلفة وثائق محددة مثل كشوف الدرجات السابقة أو خطابات التوصية أو الشهادات المهنية.'
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
                {educationalOffices.map((office, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <School className="h-5 w-5 text-primary" />
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
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMGVkdWNhdGlvbiUyMGJ1aWxkaW5nfGVufDF8fHx8MTc1NjM4NDE0MXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Educational Building"
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