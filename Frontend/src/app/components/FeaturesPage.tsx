import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Zap, 
  Shield, 
  Globe,
  MessageCircle,
  Clock,
  Smartphone,
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Brain,
  Languages,
  Lock,
  BarChart3,
  FileCheck
} from 'lucide-react';

interface FeaturesPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
}

export function FeaturesPage({ currentLang, onPageChange }: FeaturesPageProps) {
  const translations = {
    en: {
      // Hero
      heroTitle: "Thinking Beyond Classics",
      heroSubtitle: "Innovative AI Solutions for Modern Egypt",
      heroDescription: "Daleel harnesses cutting-edge artificial intelligence to transform how Egyptians interact with government services. Experience the future of digital governance today.",
      exploreFeatures: "Explore Features",
      
      // Features
      featuresTitle: "Key Features",
      featuresSubtitle: "Powerful capabilities designed for Egyptian citizens",
      
      // AI Features
      aiConversation: "AI Conversation",
      aiConversationDesc: "Natural dialogue in Egyptian Arabic dialect with context-aware responses",
      
      smartAutomation: "Smart Automation",
      smartAutomationDesc: "Automated form filling and document processing powered by AI",
      
      multiLingual: "Multi-lingual Support",
      multiLingualDesc: "Seamless switching between Arabic and English with dialect recognition",
      
      secureByDesign: "Secure by Design",
      secureByDesignDesc: "Government-grade encryption and data protection protocols",
      
      realTimeTracking: "Real-time Tracking",
      realTimeTrackingDesc: "Monitor your applications and requests with live updates",
      
      smartRecommendations: "Smart Recommendations",
      smartRecommendationsDesc: "Personalized service suggestions based on your needs",
      
      // Technology Section
      technologyTitle: "Advanced Technology Stack",
      technologySubtitle: "Built with cutting-edge technologies to ensure reliability and performance",
      
      naturalLanguage: "Natural Language Processing",
      naturalLanguageDesc: "Understanding Egyptian dialect and cultural context in conversations",
      
      machineLearning: "Machine Learning",
      machineLearningDesc: "Continuous improvement through user interactions and feedback",
      
      dataAnalytics: "Data Analytics",
      dataAnalyticsDesc: "Insights and trends to improve service delivery",
      
      cloudInfrastructure: "Cloud Infrastructure",
      cloudInfrastructureDesc: "Scalable and reliable 24/7 availability",
      
      // Benefits Section
      benefitsTitle: "Benefits for Citizens",
      benefit1: "Save Time",
      benefit1Desc: "Complete services in minutes instead of hours or days",
      
      benefit2: "Reduce Errors",
      benefit2Desc: "AI validation ensures accuracy in all submissions",
      
      benefit3: "Increase Transparency",
      benefit3Desc: "Track every step of your application process",
      
      benefit4: "Access Anytime",
      benefit4Desc: "24/7 availability from any device, anywhere in Egypt",
      
      // Stats
      stat1: "99.9%",
      stat1Label: "Uptime Guarantee",
      stat2: "< 2 sec",
      stat2Label: "Response Time",
      stat3: "256-bit",
      stat3Label: "Encryption",
      stat4: "ISO 27001",
      stat4Label: "Certified",
      
      // Use Cases
      useCasesTitle: "Real-World Applications",
      useCase1: "Document Verification",
      useCase1Desc: "Instantly verify and process government documents using AI",
      
      useCase2: "Service Discovery",
      useCase2Desc: "Find the right service through conversational AI",
      
      useCase3: "Application Tracking",
      useCase3Desc: "Real-time updates on all your government applications",
      
      useCase4: "Payment Processing",
      useCase4Desc: "Secure and fast payment for government fees",
      
      // CTA
      ctaTitle: "Ready to Experience the Future?",
      ctaDescription: "Join thousands of Egyptians already using Daleel for seamless government services",
      getStarted: "Get Started",
      learnMore: "Learn More",
    },
    ar: {
      // Hero
      heroTitle: "التفكير خارج الصندوق",
      heroSubtitle: "حلول ذكاء اصطناعي مبتكرة لمصر الحديثة",
      heroDescription: "يستخدم دليل أحدث تقنيات الذكاء الاصطناعي لتحويل طريقة تفاعل المصريين مع الخدمات الحكومية. اختبر مستقبل الحكومة الرقمية اليوم.",
      exploreFeatures: "استكشف المميزات",
      
      // Features
      featuresTitle: "المميزات الرئيسية",
      featuresSubtitle: "قدرات قوية مصممة للمواطنين المصريين",
      
      // AI Features
      aiConversation: "محادثة ذكية",
      aiConversationDesc: "حوار طبيعي باللهجة المصرية مع استجابات واعية بالسياق",
      
      smartAutomation: "أتمتة ذكية",
      smartAutomationDesc: "ملء النماذج ومعالجة المستندات تلقائياً بالذكاء الاصطناعي",
      
      multiLingual: "دعم متعدد اللغات",
      multiLingualDesc: "التبديل السلس بين العربية والإنجليزية مع التعرف على اللهجات",
      
      secureByDesign: "آمن بالتصميم",
      secureByDesignDesc: "تشفير حكومي وبروتوكولات حماية البيانات",
      
      realTimeTracking: "تتبع فوري",
      realTimeTrackingDesc: "راقب طلباتك وتطبيقاتك مع تحديثات مباشرة",
      
      smartRecommendations: "توصيات ذكية",
      smartRecommendationsDesc: "اقتراحات خدمات شخصية بناءً على احتياجاتك",
      
      // Technology Section
      technologyTitle: "حزمة تقنية متقدمة",
      technologySubtitle: "مبني بأحدث التقنيات لضمان الموثوقية والأداء",
      
      naturalLanguage: "معالجة اللغة الطبيعية",
      naturalLanguageDesc: "فهم اللهجة المصرية والسياق الثقافي في المحادثات",
      
      machineLearning: "تعلم آلي",
      machineLearningDesc: "تحسين مستمر من خلال تفاعلات المستخدمين وملاحظاتهم",
      
      dataAnalytics: "تحليل البيانات",
      dataAnalyticsDesc: "رؤى واتجاهات لتحسين تقديم الخدمة",
      
      cloudInfrastructure: "بنية تحتية سحابية",
      cloudInfrastructureDesc: "توفر قابل للتوسع وموثوق 24/7",
      
      // Benefits Section
      benefitsTitle: "فوائد للمواطنين",
      benefit1: "وفر الوقت",
      benefit1Desc: "أكمل الخدمات في دقائق بدلاً من ساعات أو أيام",
      
      benefit2: "قلل الأخطاء",
      benefit2Desc: "التحقق بالذكاء الاصطناعي يضمن الدقة في جميع التقديمات",
      
      benefit3: "زد الشفافية",
      benefit3Desc: "تتبع كل خطوة من عملية طلبك",
      
      benefit4: "الوصول في أي وقت",
      benefit4Desc: "متاح 24/7 من أي جهاز، في أي مكان في مصر",
      
      // Stats
      stat1: "99.9%",
      stat1Label: "ضمان وقت التشغيل",
      stat2: "< 2 ثانية",
      stat2Label: "وقت الاستجابة",
      stat3: "256-بت",
      stat3Label: "التشفير",
      stat4: "ISO 27001",
      stat4Label: "معتمد",
      
      // Use Cases
      useCasesTitle: "تطبيقات عملية",
      useCase1: "التحقق من المستندات",
      useCase1Desc: "التحقق ومعالجة المستندات الحكومية فوراً باستخدام الذكاء الاصطناعي",
      
      useCase2: "اكتشاف الخدمات",
      useCase2Desc: "ابحث عن الخدمة المناسبة من خلال الذكاء الاصطناعي الحواري",
      
      useCase3: "تتبع الطلبات",
      useCase3Desc: "تحديثات فورية على جميع طلباتك الحكومية",
      
      useCase4: "معالجة المدفوعات",
      useCase4Desc: "دفع آمن وسريع للرسوم الحكومية",
      
      // CTA
      ctaTitle: "جاهز لتجربة المستقبل؟",
      ctaDescription: "انضم لآلاف المصريين الذين يستخدمون دليل بالفعل للخدمات الحكومية السلسة",
      getStarted: "ابدأ الآن",
      learnMore: "اعرف المزيد",
    }
  };

  const t = translations[currentLang];

  const features = [
    { icon: MessageCircle, title: t.aiConversation, description: t.aiConversationDesc },
    { icon: Zap, title: t.smartAutomation, description: t.smartAutomationDesc },
    { icon: Languages, title: t.multiLingual, description: t.multiLingualDesc },
    { icon: Shield, title: t.secureByDesign, description: t.secureByDesignDesc },
    { icon: Clock, title: t.realTimeTracking, description: t.realTimeTrackingDesc },
    { icon: Sparkles, title: t.smartRecommendations, description: t.smartRecommendationsDesc },
  ];

  const technologies = [
    { icon: Brain, title: t.naturalLanguage, description: t.naturalLanguageDesc },
    { icon: TrendingUp, title: t.machineLearning, description: t.machineLearningDesc },
    { icon: BarChart3, title: t.dataAnalytics, description: t.dataAnalyticsDesc },
    { icon: Globe, title: t.cloudInfrastructure, description: t.cloudInfrastructureDesc },
  ];

  const benefits = [
    { icon: Clock, title: t.benefit1, description: t.benefit1Desc },
    { icon: CheckCircle2, title: t.benefit2, description: t.benefit2Desc },
    { icon: FileCheck, title: t.benefit3, description: t.benefit3Desc },
    { icon: Smartphone, title: t.benefit4, description: t.benefit4Desc },
  ];

  const useCases = [
    { title: t.useCase1, description: t.useCase1Desc, image: "https://images.unsplash.com/photo-1569605296299-e9c6afbe33bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFZ3lwdCUyMGdvdmVybm1lbnQlMjBidWlsZGluZyUyMG1vZGVybnxlbnwxfHx8fDE3NjEyNDMyODd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { title: t.useCase2, description: t.useCase2Desc, image: "https://images.unsplash.com/photo-1740052784872-284e1d7548d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFZ3lwdCUyMHRlY2hub2xvZ3klMjBkaWdpdGFsJTIwc2VydmljZXN8ZW58MXx8fHwxNzYxMjQzMjg4fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { title: t.useCase3, description: t.useCase3Desc, image: "https://images.unsplash.com/photo-1710993012000-f109972e3b8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwYXBwJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2MTIwMDg4M3ww&ixlib=rb-4.1.0&q=80&w=1080" },
    { title: t.useCase4, description: t.useCase4Desc, image: "https://images.unsplash.com/photo-1634154955216-0a8455e2fb15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDYWlybyUyMHNreWxpbmUlMjBOaWxlJTIwcml2ZXJ8ZW58MXx8fHwxNzYxMjE4MDg2fDA&ixlib=rb-4.1.0&q=80&w=1080" },
  ];

  return (
    <div className={`min-h-screen bg-white pt-20 ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section className="relative bg-[#0047AB] py-24 overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5B80B] rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E5B80B] rounded-full opacity-10 blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-[#E5B80B] text-[#0047AB] px-6 py-2">
              <Sparkles className="h-4 w-4 inline mr-2" />
              {currentLang === 'ar' ? 'مميزات متقدمة' : 'Advanced Features'}
            </Badge>
            <h1 className="text-5xl md:text-7xl text-white mb-6">
              {t.heroTitle}
            </h1>
            <h2 className="text-3xl md:text-4xl text-[#E5B80B] mb-8">
              {t.heroSubtitle}
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
              {t.heroDescription}
            </p>
            <Button 
              size="lg"
              onClick={() => onPageChange('automation')}
              className="bg-[#E5B80B] hover:bg-[#C9A009] text-[#0047AB]"
            >
              {t.exploreFeatures}
              <ArrowRight className={`h-5 w-5 ${currentLang === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
            </Button>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-header-line"></div>
            <h2 className="text-4xl text-gray-900 mb-4">{t.featuresTitle}</h2>
            <p className="text-lg text-gray-600">{t.featuresSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className="p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-[#E5B80B] group"
                >
                  <div className="w-16 h-16 bg-[#0047AB]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0047AB] transition-colors">
                    <Icon className="h-8 w-8 text-[#0047AB] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 bg-[#0047AB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-white mb-4">{t.technologyTitle}</h2>
            <p className="text-lg text-white/90">{t.technologySubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-[#E5B80B] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-10 w-10 text-[#0047AB]" />
                  </div>
                  <h3 className="text-xl text-white mb-3">{tech.title}</h3>
                  <p className="text-white/80">{tech.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: t.stat1, label: t.stat1Label },
              { value: t.stat2, label: t.stat2Label },
              { value: t.stat3, label: t.stat3Label },
              { value: t.stat4, label: t.stat4Label },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-[#0047AB]/5 transition-colors">
                <div className="text-4xl md:text-5xl text-[#0047AB] mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-900 mb-4">{t.benefitsTitle}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-xl transition-all">
                  <div className="w-16 h-16 bg-[#E5B80B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-[#E5B80B]" />
                  </div>
                  <h3 className="text-lg text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-900 mb-4">{t.useCasesTitle}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card 
                key={index}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                onClick={() => onPageChange('automation')}
              >
                <div className="program-card-header">
                  <ImageWithFallback
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <CardContent className="p-6 -mt-16 relative z-10">
                  <div className="bg-white rounded-lg p-6 shadow-xl">
                    <h3 className="text-xl text-[#0047AB] mb-2 group-hover:text-[#003C90] transition-colors">
                      {useCase.title}
                    </h3>
                    <p className="text-gray-600">{useCase.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0047AB] relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            {t.ctaTitle}
          </h2>
          <p className="text-xl text-white/90 mb-10">
            {t.ctaDescription}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => onPageChange('automation')}
              className="bg-[#E5B80B] hover:bg-[#C9A009] text-[#0047AB]"
            >
              {t.getStarted}
              <ArrowRight className={`h-5 w-5 ${currentLang === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => onPageChange('about')}
              className="border-2 border-[#E5B80B] text-[#E5B80B] hover:bg-[#E5B80B] hover:text-[#0047AB]"
            >
              {t.learnMore}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}