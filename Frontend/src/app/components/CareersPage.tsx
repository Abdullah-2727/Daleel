import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Clock, Briefcase, Users, Code, Brain, Palette } from 'lucide-react';

interface CareersPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
}

export function CareersPage({ currentLang, onPageChange }: CareersPageProps) {
  const translations = {
    en: {
      title: "Join Egypt's AI Revolution",
      subtitle: "Help us build the future of artificial intelligence in Egypt",
      whyJoinTitle: "Why Join Masr Agent?",
      whyJoin1: "Pioneer AI Innovation",
      whyJoin1Desc: "Be at the forefront of AI development tailored for Egyptian culture",
      whyJoin2: "Make Real Impact",
      whyJoin2Desc: "Your work will directly improve millions of Egyptian lives",
      whyJoin3: "Growing Team",
      whyJoin3Desc: "Join a passionate, diverse team building the future",
      jobListingsTitle: "Open Positions",
      aiEngineerTitle: "AI Engineer",
      aiEngineerDesc: "Develop and improve our Egyptian Arabic NLP models",
      dataScientistTitle: "Data Scientist",
      dataScientistDesc: "Analyze user behavior and improve AI recommendations",
      frontendDevTitle: "Frontend Developer",
      frontendDevDesc: "Build beautiful, responsive interfaces for web and mobile",
      internshipsTitle: "Internship Opportunities",
      internshipDesc: "Gain hands-on experience in AI development, data science, and product design",
      applyNow: "Apply Now",
      remote: "Remote",
      fullTime: "Full-time",
      internship: "Internship",
      location: "Cairo, Egypt",
      experience: "Experience",
      type: "Type"
    },
    ar: {
      title: "انضم لثورة الذكاء الاصطناعي في مصر",
      subtitle: "ساعدنا في بناء مستقبل الذكاء الاصطناعي في مصر",
      whyJoinTitle: "لماذا تنضم لمساعد مصر؟",
      whyJoin1: "كن رائداً في الابتكار",
      whyJoin1Desc: "كن في مقدمة تطوير الذكاء الاصطناعي المخصص للثقافة المصرية",
      whyJoin2: "أحدث تأثيراً حقيقياً",
      whyJoin2Desc: "عملك سيحسن حياة ملايين المصريين مباشرة",
      whyJoin3: "فريق متنامي",
      whyJoin3Desc: "انضم لفريق متحمس ومتنوع يبني المستقبل",
      jobListingsTitle: "الوظائف المتاحة",
      aiEngineerTitle: "مهندس ذكاء اصطناعي",
      aiEngineerDesc: "تطوير وتحسين نماذ�� معالجة اللغة العربية المصرية",
      dataScientistTitle: "عالم بيانات",
      dataScientistDesc: "تحليل سلوك المستخدمين وتحسين توصيات الذكاء الاصطناعي",
      frontendDevTitle: "مطور واجهات أمامية",
      frontendDevDesc: "بناء واجهات جميلة ومتجاوبة للويب والهاتف المحمول",
      internshipsTitle: "فرص التدريب",
      internshipDesc: "احصل على خبرة عملية في تطوير الذكاء الاصطناعي وعلوم البيانات وتصميم المنتجات",
      applyNow: "تقدم الآن",
      remote: "عن بُعد",
      fullTime: "دوام كامل",
      internship: "تدريب",
      location: "القاهرة، مصر",
      experience: "الخبرة",
      type: "النوع"
    }
  };

  const t = translations[currentLang];

  const jobs = [
    {
      title: t.aiEngineerTitle,
      description: t.aiEngineerDesc,
      type: t.fullTime,
      experience: currentLang === 'en' ? '3-5 years' : '3-5 سنوات',
      location: t.location,
      icon: Brain,
      requirements: currentLang === 'en' 
        ? ['PhD/Master in AI/ML', 'Arabic NLP experience', 'Python, TensorFlow', 'Research publications']
        : ['دكتوراه/ماجستير في الذكاء الاصطناعي', 'خبرة في معالجة العربية', 'Python, TensorFlow', 'منشورات بحثية']
    },
    {
      title: t.dataScientistTitle,
      description: t.dataScientistDesc,
      type: t.fullTime,
      experience: currentLang === 'en' ? '2-4 years' : '2-4 سنوات',
      location: t.location,
      icon: Briefcase,
      requirements: currentLang === 'en'
        ? ['Statistics/Math degree', 'Python, R, SQL', 'ML algorithms', 'Data visualization']
        : ['درجة في الإحصاء/الرياضيات', 'Python, R, SQL', 'خوارزميات التعلم الآلي', 'تمثيل البيانات بصرياً']
    },
    {
      title: t.frontendDevTitle,
      description: t.frontendDevDesc,
      type: t.fullTime,
      experience: currentLang === 'en' ? '2-3 years' : '2-3 سنوات',
      location: t.location,
      icon: Code,
      requirements: currentLang === 'en'
        ? ['React, TypeScript', 'Mobile development', 'UI/UX design', 'Arabic text handling']
        : ['React, TypeScript', 'تطوير الهاتف المحمول', 'تصميم UI/UX', 'التعامل مع النصوص العربية']
    }
  ];

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

      {/* Why Join Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-primary mb-4">
              {t.whyJoinTitle}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-2 hover:border-primary/20 transition-colors shadow-lg rounded-2xl">
              <CardHeader>
                <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">{t.whyJoin1}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{t.whyJoin1Desc}</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center border-2 hover:border-primary/20 transition-colors shadow-lg rounded-2xl">
              <CardHeader>
                <Users className="h-16 w-16 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">{t.whyJoin2}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{t.whyJoin2Desc}</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center border-2 hover:border-primary/20 transition-colors shadow-lg rounded-2xl">
              <CardHeader>
                <Palette className="h-16 w-16 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">{t.whyJoin3}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{t.whyJoin3Desc}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-primary mb-4">
              {t.jobListingsTitle}
            </h2>
          </div>
          <div className="space-y-8">
            {jobs.map((job, index) => (
              <Card key={index} className="border-2 hover:border-primary/20 transition-colors shadow-lg rounded-2xl">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <job.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-primary">{job.title}</CardTitle>
                        <CardDescription className="text-base mt-2">{job.description}</CardDescription>
                      </div>
                    </div>
                    <Button onClick={() => onPageChange('contact')} className="bg-primary hover:bg-primary/90">
                      {t.applyNow}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-gray-500" />
                        <span className="text-gray-600">{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span className="text-gray-600">{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Briefcase className="h-5 w-5 text-gray-500" />
                        <span className="text-gray-600">{t.experience}: {job.experience}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-primary mb-3">
                        {currentLang === 'en' ? 'Requirements' : 'المتطلبات'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Internships */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl text-primary mb-6">
            {t.internshipsTitle}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {t.internshipDesc}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <Brain className="h-12 w-12 text-secondary mx-auto mb-4" />
                <CardTitle className="text-lg">
                  {currentLang === 'en' ? 'AI Research Intern' : 'متدرب بحث ذكاء اصطناعي'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className="mb-4">{t.internship}</Badge>
                <p className="text-sm text-gray-600">
                  {currentLang === 'en'
                    ? 'Work on Egyptian Arabic NLP research projects'
                    : 'العمل على مشاريع بحث معالجة العربية المصرية'
                  }
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <Briefcase className="h-12 w-12 text-secondary mx-auto mb-4" />
                <CardTitle className="text-lg">
                  {currentLang === 'en' ? 'Data Science Intern' : 'متدرب علوم بيانات'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className="mb-4">{t.internship}</Badge>
                <p className="text-sm text-gray-600">
                  {currentLang === 'en'
                    ? 'Analyze user data and build predictive models'
                    : 'تحليل بيانات المستخدمين وبناء النماذج التنبؤية'
                  }
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <Palette className="h-12 w-12 text-secondary mx-auto mb-4" />
                <CardTitle className="text-lg">
                  {currentLang === 'en' ? 'Product Design Intern' : 'متدرب تصميم منتجات'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className="mb-4">{t.internship}</Badge>
                <p className="text-sm text-gray-600">
                  {currentLang === 'en'
                    ? 'Design user experiences for Egyptian users'
                    : 'تصميم تجارب المستخدم للمستخدمين المصريين'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12">
            <Button 
              size="lg" 
              onClick={() => onPageChange('contact')}
              className="bg-primary hover:bg-primary/90 px-8 py-3"
            >
              {t.applyNow}
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary/80">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl mb-6">
            {currentLang === 'en' ? "Ready to Build the Future?" : "جاهز لبناء المستقبل؟"}
          </h2>
          <p className="text-xl mb-8 text-white/90">
            {currentLang === 'en'
              ? "Join our mission to democratize AI for every Egyptian."
              : "انضم لمهمتنا في جعل الذكاء الاصطناعي متاحاً لكل مصري."
            }
          </p>
          <Button 
            size="lg" 
            onClick={() => onPageChange('contact')}
            className="bg-secondary text-primary hover:bg-secondary/90"
          >
            {currentLang === 'en' ? "Get in Touch" : "تواصل معنا"}
          </Button>
        </div>
      </section>
    </div>
  );
}