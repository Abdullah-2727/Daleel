import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Users, 
  Target, 
  Award, 
  Shield,
  Globe,
  Zap,
  Heart,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Quote
} from 'lucide-react';

interface AboutDaleelPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
}

export function AboutDaleelPage({ currentLang, onPageChange }: AboutDaleelPageProps) {
  const translations = {
    en: {
      // Hero Section
      heroTitle: "Journey Begins with",
      heroSubtitle: "Daleel",
      heroDescription: "Remember to start the mission success in all the details roats and learn more about your government services guide.",
      exploreServices: "View Our Services",
      
      // Our Story Section
      ourStory: "Our Story",
      storyTitle: "Embark on a Journey: Unveiling the Story of Daleel",
      storyText1: "Daleel was born from a vision to bridge the gap between Egyptian citizens and their government services. We believe that accessing essential services should be simple, transparent, and efficient for everyone.",
      storyText2: "Through cutting-edge AI technology and deep understanding of local needs, we've created a platform that speaks your language, understands your culture, and serves your community with dedication.",
      learnMore: "Learn More",
      
      // Mission & Vision
      missionTitle: "Our Mission",
      missionText: "To empower every Egyptian citizen with seamless access to government services through intelligent automation and personalized assistance.",
      visionTitle: "Our Vision",
      visionText: "A future where every citizen can navigate government services effortlessly, regardless of their digital literacy or location.",
      
      // Values
      valuesTitle: "Our Values",
      value1: "Accessibility for All",
      value1Desc: "Making government services available to every Egyptian, everywhere",
      value2: "Innovation",
      value2Desc: "Leveraging AI to solve real problems faced by citizens daily",
      value3: "Trust & Security",
      value3Desc: "Government-backed security ensuring your data is always protected",
      value4: "Cultural Awareness",
      value4Desc: "Understanding Egyptian dialect and cultural nuances in every interaction",
      
      // Stats
      stat1: "2,300+",
      stat1Label: "Government Services",
      stat2: "1.5M+",
      stat2Label: "Citizens Served",
      stat3: "24/7",
      stat3Label: "AI Support",
      stat4: "98%",
      stat4Label: "Satisfaction Rate",
      
      // Programs/Services
      ourPrograms: "Our Services",
      programsSubtitle: "Explore a variety of knowledge, discovery, and growth. Daleel delivers services to enhance and widen knowledge amongst our audience.",
      
      undergraduate: "Citizens Services",
      undergraduateDesc: "Comprehensive government services for all Egyptian citizens",
      
      graduate: "Business Services",
      graduateDesc: "Specialized services for businesses and entrepreneurs",
      
      professional: "Public Services",
      professionalDesc: "Community and public welfare services",
      
      research: "Healthcare Services",
      researchDesc: "Health insurance and medical services support",
      
      // CTA
      ctaTitle: "Ready to Experience Seamless Government Services?",
      ctaDescription: "Join thousands of Egyptians who trust Daleel for their daily government interactions",
      getStarted: "Get Started Now",
      
      // Footer Quote
      quoteText: "Digital transformation is not about technology, it's about people. Daleel puts Egyptian citizens at the heart of government services.",
      quoteAuthor: "Daleel Team",
    },
    ar: {
      // Hero Section
      heroTitle: "الرحلة تبدأ مع",
      heroSubtitle: "دليل",
      heroDescription: "تذكر أن تبدأ مهمة النجاح في جميع التفاصيل والطرق واعرف المزيد عن دليلك للخدمات الحكومية.",
      exploreServices: "استكشف خدماتنا",
      
      // Our Story Section
      ourStory: "قصتنا",
      storyTitle: "انطلق في رحلة: كشف قصة دليل",
      storyText1: "ولد دليل من رؤية لسد الفجوة بين المواطنين المصريين والخدمات الحكومية. نحن نؤمن بأن الوصول إلى الخدمات الأساسية يجب أن يكون بسيطاً وشفافاً وفعالاً للجميع.",
      storyText2: "من خلال تقنية الذكاء الاصطناعي المتطورة والفهم العميق للاحتياجات المحلية، أنشأنا منصة تتحدث لغتك، وتفهم ثقافتك، وتخدم مجتمعك بتفانٍ.",
      learnMore: "اعرف المزيد",
      
      // Mission & Vision
      missionTitle: "مهمتنا",
      missionText: "تمكين كل مواطن مصري من الوصول السلس إلى الخدمات الحكومية من خلال الأتمتة الذكية والمساعدة الشخصية.",
      visionTitle: "رؤيتنا",
      visionText: "مستقبل حيث يمكن لكل مواطن التنقل في الخدمات الحكومية بسهولة، بغض النظر عن مستوى معرفته الرقمية أو موقعه.",
      
      // Values
      valuesTitle: "قيمنا",
      value1: "إمكانية الوصول للجميع",
      value1Desc: "جعل الخدمات الحكومية متاحة لكل مصري، في كل مكان",
      value2: "الابتكار",
      value2Desc: "الاستفادة من الذكاء الاصطناعي لحل المشاكل الحقيقية التي يواجهها المواطنون يومياً",
      value3: "الثقة والأمان",
      value3Desc: "أمان مدعوم حكومياً يضمن حماية بياناتك دائماً",
      value4: "الوعي الثقافي",
      value4Desc: "فهم اللهجة المصرية والفروق الثقافية الدقيقة في كل تفاعل",
      
      // Stats
      stat1: "+2,300",
      stat1Label: "خدمة حكومية",
      stat2: "+1.5 مليون",
      stat2Label: "مواطن تم خدمته",
      stat3: "24/7",
      stat3Label: "دعم ذكي",
      stat4: "98%",
      stat4Label: "معدل الرضا",
      
      // Programs/Services
      ourPrograms: "خدماتنا",
      programsSubtitle: "استكشف مجموعة متنوعة من المعرفة والاكتشاف والنمو. يقدم دليل خدمات لتعزيز وتوسيع المعرفة بين جمهورنا.",
      
      undergraduate: "خدمات المواطنين",
      undergraduateDesc: "خدمات حكومية شاملة لجميع المواطنين المصريين",
      
      graduate: "خدمات الأعمال",
      graduateDesc: "خدمات متخصصة للشركات ورواد الأعمال",
      
      professional: "الخدمات العامة",
      professionalDesc: "خدمات المجتمع والرعاية العامة",
      
      research: "الخدمات الصحية",
      researchDesc: "التأمين الصحي ودعم الخدمات الطبية",
      
      // CTA
      ctaTitle: "جاهز لتجربة خدمات حكومية سلسة؟",
      ctaDescription: "انضم إلى آلاف المصريين الذين يثقون في دليل لتعاملاتهم الحكومية اليومية",
      getStarted: "ابدأ الآن",
      
      // Footer Quote
      quoteText: "التحول الرقمي ليس عن التكنولوجيا، بل عن الناس. دليل يضع المواطنين المصريين في قلب الخدمات الحكومية.",
      quoteAuthor: "فريق دليل",
    }
  };

  const t = translations[currentLang];

  const values = [
    { icon: Globe, title: t.value1, description: t.value1Desc },
    { icon: Zap, title: t.value2, description: t.value2Desc },
    { icon: Shield, title: t.value3, description: t.value3Desc },
    { icon: Heart, title: t.value4, description: t.value4Desc },
  ];

  const programs = [
    {
      title: t.undergraduate,
      description: t.undergraduateDesc,
      image: "https://images.unsplash.com/photo-1645564527494-e657dca25bc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMHN0cmVldCUyMGNhaXJvfGVufDF8fHx8MTc2MTQ5ODczOXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: t.graduate,
      description: t.graduateDesc,
      image: "https://images.unsplash.com/photo-1695716633315-115f8fe6ac33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdCUyMGJ1c2luZXNzJTIwbW9kZXJufGVufDF8fHx8MTc2MTQ5ODczOXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: t.professional,
      description: t.professionalDesc,
      image: "https://images.unsplash.com/photo-1646919931935-bd8def60e346?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdCUyMG1vc3F1ZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjE0OTg3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: t.research,
      description: t.researchDesc,
      image: "https://images.unsplash.com/photo-1606419598102-95ead4deaf4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdCUyMHBoYXJhb2glMjBhbmNpZW50fGVufDF8fHx8MTc2MTQ5ODcxN3ww&ixlib=rb-4.1.0&q=80&w=1080"
    },
  ];

  return (
    <div className={`min-h-screen bg-white pt-20 ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Hero Section - Similar to Unipix */}
      <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1692986172150-ec32dccfa5f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWlybyUyMGVneXB0JTIwcHlyYW1pZHM8ZW58MXx8fHwxNzYxNDk4NzE2fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Daleel Hero - Egyptian Pyramids"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0047AB]/85 via-[#0047AB]/80 to-[#0047AB]/90"></div>
        
        {/* Decorative Crest */}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-20">
          <div className="decorative-crest flex items-center justify-center">
            <Award className="h-10 w-10 text-[#E5B80B]" />
          </div>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl text-white mb-4 animate-fade-in-up">
              {t.heroTitle}
            </h1>
            <h2 className="text-6xl md:text-8xl text-[#E5B80B] mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {t.heroSubtitle}
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {t.heroDescription}
            </p>
            <Button 
              size="lg"
              onClick={() => onPageChange('government')}
              className="bg-[#E5B80B] hover:bg-[#C9A009] text-[#0047AB] animate-fade-in-up"
              style={{ animationDelay: '0.6s' }}
            >
              {t.exploreServices}
              <ArrowRight className={`h-5 w-5 ${currentLang === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
            </Button>
          </div>
        </div>
      </section>

      {/* Programs Grid Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-gray-900 mb-4">{t.ourPrograms}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.programsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <Card 
                key={index}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 border-gray-200 hover:border-[#E5B80B]"
                onClick={() => onPageChange('government')}
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </div>
                <CardContent className="p-8 -mt-16 relative z-10">
                  <div className="bg-white rounded-xl p-6 shadow-xl border-2 border-gray-100">
                    <h3 className="text-2xl text-[#0047AB] mb-2 group-hover:text-[#003C90] transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{program.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section - Split Layout */}
      <section className="py-20 bg-[#0047AB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-[#E5B80B]/20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1680356217112-dad9300ce49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWxlJTIwcml2ZXIlMjBlZ3lwdHxlbnwxfHx8fDE3NjE0OTg3MTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Daleel Story - Nile River Egypt"
                  className="w-full h-[450px] lg:h-[550px] object-cover object-center"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#E5B80B] rounded-full opacity-20 blur-3xl"></div>
            </div>

            {/* Right: Content */}
            <div className="text-white order-1 lg:order-2">
              <div className="inline-block px-5 py-2 bg-[#E5B80B] rounded-full mb-6">
                <span className="text-[#0047AB]">{t.ourStory}</span>
              </div>
              <h2 className="text-4xl md:text-5xl mb-6 leading-tight">
                {t.storyTitle}
              </h2>
              <div className="space-y-5 mb-8">
                <p className="text-lg text-white/90 leading-relaxed">
                  {t.storyText1}
                </p>
                <p className="text-lg text-white/90 leading-relaxed">
                  {t.storyText2}
                </p>
              </div>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-[#E5B80B] text-[#E5B80B] hover:bg-[#E5B80B] hover:text-[#0047AB] transition-all duration-300"
                onClick={() => onPageChange('features')}
              >
                {t.learnMore}
                <ArrowRight className={`h-5 w-5 ${currentLang === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <Card className="bg-gradient-to-br from-[#0047AB] to-[#003C90] p-12 hover:shadow-2xl transition-all duration-300 border-0 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5B80B]/10 rounded-full -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#E5B80B]/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-10 w-10 text-[#E5B80B]" />
                </div>
                <h3 className="text-3xl text-white mb-4">{t.missionTitle}</h3>
                <p className="text-lg text-white/90 leading-relaxed">{t.missionText}</p>
              </div>
            </Card>

            {/* Vision Card */}
            <Card className="bg-white p-12 hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-[#E5B80B] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0047AB]/5 rounded-full -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#0047AB]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-10 w-10 text-[#0047AB]" />
                </div>
                <h3 className="text-3xl text-[#0047AB] mb-4">{t.visionTitle}</h3>
                <p className="text-lg text-gray-700 leading-relaxed">{t.visionText}</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#0047AB] to-[#003C90] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#E5B80B] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E5B80B] rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: t.stat1, label: t.stat1Label, icon: Users },
              { value: t.stat2, label: t.stat2Label, icon: Heart },
              { value: t.stat3, label: t.stat3Label, icon: Zap },
              { value: t.stat4, label: t.stat4Label, icon: Award },
            ].map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-[#E5B80B]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <StatIcon className="h-6 w-6 text-[#E5B80B]" />
                    </div>
                  </div>
                  <div className="text-5xl md:text-6xl text-white mb-3 group-hover:scale-105 transition-transform duration-300">{stat.value}</div>
                  <div className="text-lg text-white/90">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-5 py-2 bg-[#E5B80B]/10 rounded-full mb-4">
              <span className="text-[#0047AB]">{t.valuesTitle}</span>
            </div>
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">{t.valuesTitle}</h2>
            <div className="w-24 h-1 bg-[#E5B80B] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-200 hover:border-[#E5B80B] group">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0047AB]/10 to-[#0047AB]/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-[#0047AB]" />
                  </div>
                  <h3 className="text-xl text-gray-900 mb-3 group-hover:text-[#0047AB] transition-colors">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-12 md:p-16 text-center border-2 border-gray-200 hover:border-[#E5B80B] transition-all duration-300 shadow-lg relative overflow-hidden">
            <div className="absolute top-8 left-8 opacity-10">
              <Quote className="h-24 w-24 text-[#E5B80B]" />
            </div>
            <div className="absolute bottom-8 right-8 opacity-10 rotate-180">
              <Quote className="h-24 w-24 text-[#E5B80B]" />
            </div>
            <div className="relative z-10">
              <blockquote className="text-2xl md:text-3xl text-gray-900 mb-8 leading-relaxed italic">
                "{t.quoteText}"
              </blockquote>
              <div className="w-16 h-1 bg-[#E5B80B] mx-auto mb-6 rounded-full"></div>
              <cite className="text-xl text-[#0047AB] not-italic">— {t.quoteAuthor}</cite>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#0047AB] via-[#003C90] to-[#0047AB] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E5B80B] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E5B80B] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <CheckCircle2 className="h-16 w-16 text-[#E5B80B]" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            {t.ctaTitle}
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t.ctaDescription}
          </p>
          <Button 
            size="lg"
            onClick={() => onPageChange('home')}
            className="bg-[#E5B80B] hover:bg-[#C9A009] text-[#0047AB] h-14 px-10 text-lg shadow-2xl hover:shadow-[#E5B80B]/50 transition-all duration-300 hover:scale-105"
          >
            {t.getStarted}
            <ArrowRight className={`h-6 w-6 ${currentLang === 'ar' ? 'mr-3 rotate-180' : 'ml-3'}`} />
          </Button>
        </div>
      </section>
    </div>
  );
}
