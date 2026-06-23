import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Target, Eye, Heart, Users, Rocket, CheckCircle, Clock, Star } from 'lucide-react';

interface AboutPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
}

export function AboutPage({ currentLang, onPageChange }: AboutPageProps) {
  const translations = {
    en: {
      title: "About Masr Artificial Agent",
      subtitle: "Empowering Egyptians with AI tailored for their culture and needs",
      mission: "Our Mission",
      missionText: "To make artificial intelligence accessible, useful, and culturally relevant for every Egyptian, bridging the gap between cutting-edge technology and local needs.",
      vision: "Our Vision", 
      visionText: "A future where every Egyptian has access to personalized AI assistance that understands their language, culture, and daily challenges.",
      values: "Our Values",
      value1: "Cultural Understanding",
      value1Desc: "Deep respect and integration of Egyptian culture and traditions",
      value2: "Accessibility",
      value2Desc: "Making AI technology available to all Egyptians regardless of technical background",
      value3: "Privacy",
      value3Desc: "Protecting user data and respecting privacy in all interactions",
      teamTitle: "Meet Our Team",
      teamSubtitle: "Passionate experts working to revolutionize AI for Egypt",
      roadmapTitle: "Our Journey & Roadmap",
      roadmapSubtitle: "Building the future of Egyptian AI step by step",
      phase1: "Foundation",
      phase1Desc: "Core AI development and Egyptian dialect training",
      phase2: "Integration",
      phase2Desc: "Government services integration and platform expansion", 
      phase3: "Innovation",
      phase3Desc: "Advanced features and nationwide accessibility",
      joinUs: "Join Our Mission",
      joinUsDesc: "Be part of the AI revolution in Egypt",
      getInTouch: "Get in Touch"
    },
    ar: {
      title: "عن مساعد مصر الذكي",
      subtitle: "تمكين المصريين بالذكاء الاصطناعي المخصص لثقافتهم واحتياجاتهم",
      mission: "مهمتنا",
      missionText: "جعل الذكاء الاصطناعي في متناول الجميع ومفيداً وذا صلة ثقافية لكل مصري، وسد الفجوة بين التكنولوجيا المتطورة والاحتياجات المحلية.",
      vision: "رؤيتنا",
      visionText: "مستقبل يتمتع فيه كل مصري بالوصول إلى مساعدة ذكية شخصية تفهم لغته وثقافته وتحدياته اليومية.",
      values: "قيمنا",
      value1: "الفهم الثقافي",
      value1Desc: "احترام عميق وتكامل للثقافة والتقاليد المصرية",
      value2: "إمكانية الوصول",
      value2Desc: "جعل تكنولوجيا الذكاء الاصطناعي متاحة لجميع المصريين بغض النظر عن الخلفية التقنية",
      value3: "الخصوصية",
      value3Desc: "حماية بيانات المستخدم واحترام الخصوصية في جميع التفاعلات",
      teamTitle: "تعرف على فريقنا",
      teamSubtitle: "خبراء متحمسون يعملون على ثورة الذكاء الاصطناعي في مصر",
      roadmapTitle: "رحلتنا وخارطة الطريق",
      roadmapSubtitle: "بناء مستقبل الذكاء الاصطناعي المصري خطوة بخطوة",
      phase1: "الأساس",
      phase1Desc: "تطوير الذكاء الاصطناعي الأساسي وتدريب اللهجة المصرية",
      phase2: "التكامل",
      phase2Desc: "تكامل الخدمات الحكومية وتوسيع المنصة",
      phase3: "الابتكار", 
      phase3Desc: "ميزات متقدمة وإمكانية الوصول على مستوى البلاد",
      joinUs: "انضم إلى مهمتنا",
      joinUsDesc: "كن جزءاً من ثورة الذكاء الاصطناعي في مصر",
      getInTouch: "تواصل معنا"
    }
  };

  const t = translations[currentLang];

  const team = [
    {
      name: currentLang === 'en' ? "Dr. Ahmed Mahmoud" : "د. أحمد محمود",
      role: currentLang === 'en' ? "CEO & Co-Founder" : "الرئيس التنفيذي والمؤسس المشارك",
      description: currentLang === 'en' 
        ? "AI researcher with 10+ years experience in NLP and Egyptian Arabic processing"
        : "باحث في الذكاء الاصطناعي مع أكثر من 10 سنوات خبرة في معالجة اللغة الطبيعية والعربية المصرية"
    },
    {
      name: currentLang === 'en' ? "Eng. Fatma Hassan" : "م. فاطمة حسن",
      role: currentLang === 'en' ? "CTO & Co-Founder" : "المدير التقني والمؤسس المشارك",
      description: currentLang === 'en'
        ? "Software engineering expert specializing in scalable AI systems and mobile applications"
        : "خبيرة هندسة البرمجيات متخصصة في أنظمة الذكاء الاصطناعي القابلة للتوسع والتطبيقات المحمولة"
    },
    {
      name: currentLang === 'en' ? "Mohamed Ali" : "محمد علي",
      role: currentLang === 'en' ? "Head of Product" : "رئيس المنتج",
      description: currentLang === 'en'
        ? "Product strategist with deep understanding of Egyptian user behavior and market needs"
        : "استراتيجي منتج بفهم عميق لسلوك المستخدم المصري واحتياجات السوق"
    },
    {
      name: currentLang === 'en' ? "Sarah Mostafa" : "سارة مصطفى",
      role: currentLang === 'en' ? "Lead Linguist" : "كبير اللغويين",
      description: currentLang === 'en'
        ? "Arabic linguistics expert focused on Egyptian dialects and cultural nuances"
        : "خبيرة لغويات عربية متخصصة في اللهجات المصرية والفروق الثقافية"
    }
  ];

  const roadmapPhases = [
    {
      title: t.phase1,
      description: t.phase1Desc,
      progress: 90,
      status: "completed",
      timeline: currentLang === 'en' ? "Q1-Q2 2024" : "الربع الأول-الثاني 2024",
      achievements: [
        currentLang === 'en' ? "Egyptian dialect AI model trained" : "تدريب نموذج الذكاء الاصطناعي للهجة المصرية",
        currentLang === 'en' ? "Core platform architecture built" : "بناء هيكل المنصة الأساسي",
        currentLang === 'en' ? "Initial beta testing completed" : "اكتمال الاختبار التجريبي الأولي"
      ]
    },
    {
      title: t.phase2,
      description: t.phase2Desc,
      progress: 60,
      status: "in-progress",
      timeline: currentLang === 'en' ? "Q3-Q4 2024" : "الربع الثالث-الرابع 2024",
      achievements: [
        currentLang === 'en' ? "Government services API integration" : "تكامل واجهات برمجة التطبيقات للخدمات الحكومية",
        currentLang === 'en' ? "Mobile app development" : "تطوير التطبيق المحمول",
        currentLang === 'en' ? "WhatsApp integration beta" : "النسخة التجريبية لتكامل الواتساب"
      ]
    },
    {
      title: t.phase3,
      description: t.phase3Desc,
      progress: 20,
      status: "planned",
      timeline: currentLang === 'en' ? "2025 & Beyond" : "2025 وما بعدها",
      achievements: [
        currentLang === 'en' ? "Advanced AI capabilities" : "قدرات الذكاء الاصطناعي المتقدمة",
        currentLang === 'en' ? "Nationwide deployment" : "النشر على مستوى البلاد",
        currentLang === 'en' ? "Smart city integrations" : "تكاملات المدن الذكية"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'planned': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'planned': return Star;
      default: return Clock;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 pt-20 ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl text-primary mb-6">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="border-2 border-blue-100">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl text-primary">{t.mission}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{t.missionText}</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <Eye className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl text-primary">{t.vision}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{t.visionText}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-primary mb-4">
              {t.values}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>{t.value1}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.value1Desc}</CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>{t.value2}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.value2Desc}</CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>{t.value3}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.value3Desc}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-primary mb-4">
              {t.teamTitle}
            </h2>
            <p className="text-gray-600">{t.teamSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-2 hover:border-primary/20 transition-colors">
                <CardHeader className="pb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge variant="secondary" className="mx-auto">{member.role}</Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {member.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-primary mb-4">
              {t.roadmapTitle}
            </h2>
            <p className="text-gray-600">{t.roadmapSubtitle}</p>
          </div>
          <div className="space-y-8">
            {roadmapPhases.map((phase, index) => {
              const StatusIcon = getStatusIcon(phase.status);
              return (
                <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${getStatusColor(phase.status)}`}>
                          <StatusIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-primary">{phase.title}</CardTitle>
                          <CardDescription className="text-base mt-1">{phase.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">{phase.timeline}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Progress</span>
                          <span className="text-sm text-primary">{phase.progress}%</span>
                        </div>
                        <Progress value={phase.progress} className="h-2" />
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        {phase.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className={`h-4 w-4 flex-shrink-0 ${
                              phase.status === 'completed' ? 'text-green-500' : 
                              phase.status === 'in-progress' ? 'text-blue-500' : 
                              'text-gray-400'
                            }`} />
                            <span className="text-sm text-gray-600">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary/80">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Rocket className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl mb-6">
            {t.joinUs}
          </h2>
          <p className="text-xl mb-8 text-white/90">
            {t.joinUsDesc}
          </p>
          <Button 
            size="lg" 
            onClick={() => onPageChange('contact')}
            className="bg-secondary text-primary hover:bg-gray-200"
          >
            {t.getInTouch}
          </Button>
        </div>
      </section>
    </div>
  );
}