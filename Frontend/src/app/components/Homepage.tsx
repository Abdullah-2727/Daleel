import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  FileText, Building2, GraduationCap, Heart,
  Users, Landmark, ArrowRight, Zap, Shield, Clock,
  ChevronRight, Facebook, Twitter, Instagram, Youtube,
  Handshake, Accessibility, Briefcase, Plus, Mic, Sparkles, Search,
  Globe, Edit3
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface HomepageProps {
  onPageChange: (page: string) => void;
  user?: { id: string; name: string; email: string; } | null;
}

export function Homepage({ onPageChange, user }: HomepageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    { url: 'https://images.unsplash.com/photo-1525604529863-915380184a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFZ3lwdCUyMHB5cmFtaWRzJTIwR2l6YXxlbnwxfHx8fDE3NjEyMTgwODZ8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'أهرامات الجيزة' },
    { url: 'https://images.unsplash.com/photo-1668964413130-ac4e56238aa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDYWlybyUyMEVneXB0JTIwc3RyZWV0cyUyMGNpdHlzY2FwZXxlbnwxfHx8fDE3NjEyMTgwODZ8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'شوارع القاهرة' },
    { url: 'https://images.unsplash.com/photo-1674941713152-d561d24553b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDYWlybyUyMG1vc3F1ZSUyMElzbGFtaWMlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzYxMjE4MTcxfDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'التراث الإسلامي' },
    { url: 'https://images.unsplash.com/photo-1634154955216-0a8455e2fb15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDYWlybyUyMHNreWxpbmUlMjBOaWxlJTIwcml2ZXJ8ZW58MXx8fHwxNzYxMjE4MDg2fDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'النيل والمدينة' },
    { url: 'https://images.unsplash.com/photo-1697582718102-bd0e67cdf7ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFZ3lwdCUyMG1vZGVybiUyMGJ1aWxkaW5nc3xlbnwxfHx8fDE3NjEyMTgxNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'مصر الحديثة' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);



  return (
    <div className="min-h-screen bg-white rtl font-arabic" dir="rtl">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {backgroundImages.map((image, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-2000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}>
            <div className="animate-slow-zoom h-full w-full">
              <ImageWithFallback src={image.url} alt={image.caption} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-[#06141B] via-[#11212D] to-[#253745] z-10" style={{ opacity: 0.65 }}></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl animate-fade-in-up mx-auto">
            <h1 className="text-5xl md:text-7xl text-white mb-6 leading-tight drop-shadow-lg">
              دليل — بوابتك الحكومية المصرية
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-8 drop-shadow-md">الوصول لكل الخدمات الرسمية في مكان واحد</p>
            <p className="text-lg text-white/85 mb-10 max-w-2xl drop-shadow-md">
              من وثائق الهوية إلى الإقرارات الضريبية، الخدمات الصحية إلى تسجيل العقارات — كل ما تحتاجه، مبسط عبر الذكاء الاصطناعي.
            </p>

            {/* AI Chat Bar */}
            <div className="mb-6 max-w-4xl">
              <div className="relative">
                <div className="bg-white rounded-full shadow-2xl flex items-center p-3 hover:shadow-[0_0_40px_rgba(229,184,11,0.3)] transition-all duration-300 border border-white/20">
                  <button onClick={() => onPageChange('chatbot')} className="p-3 hover:bg-gray-100 rounded-full transition-colors mr-2">
                    <Plus className="h-5 w-5 text-gray-600" />
                  </button>
                  <input type="text" placeholder="اسأل أي شيء..." onClick={() => onPageChange('chatbot')} readOnly
                    className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-lg px-4 cursor-pointer" />
                  <div className="flex items-center gap-2 ml-2">
                    <button onClick={() => onPageChange('chatbot')} className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                      <Mic className="h-5 w-5 text-gray-600" />
                    </button>
                    <button onClick={() => onPageChange('chatbot')} className="bg-[#E5B80B] hover:bg-[#C9A009] p-3 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                      <Sparkles className="h-5 w-5 text-[#06141B]" />
                    </button>
                  </div>
                </div>

                {/* Suggestion Chips */}
                <div className="flex flex-wrap gap-3 mt-4 justify-center">
                  <button onClick={() => onPageChange('government')}
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-sm flex items-center gap-2 transition-all border border-white/20 hover:border-white/40 shadow-lg">
                    <Search className="h-4 w-4" /><span>استعلام عن خدمة</span>
                  </button>
                  <button onClick={() => onPageChange('knowledge')}
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-sm flex items-center gap-2 transition-all border border-white/20 hover:border-white/40 shadow-lg">
                    <Globe className="h-4 w-4" /><span>معلومات محلية</span>
                  </button>
                </div>
              </div>

              {/* {!user && (
                <div className="mt-6 text-center">
                  <button onClick={() => onPageChange('home')}
                    className="text-white/90 hover:text-white text-sm underline hover:no-underline transition-all">
                    لديك حساب؟ تسجيل الدخول
                  </button>
                </div>
              )} */}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center gap-3">
          <div className="bg-[#11212D] px-4 py-2 rounded-full border border-[#4A5C6A]">
            <p className="text-white text-sm">{backgroundImages[currentImageIndex].caption}</p>
          </div>
          <div className="flex gap-2">
            {backgroundImages.map((_, index) => (
              <button key={index} onClick={() => setCurrentImageIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'w-8 bg-[#E5B80B]' : 'w-2 bg-[#9BA8AB] hover:bg-white'}`} />
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-gradient-to-r from-[#B01E28] via-white to-[#06141B]" style={{ opacity: 0.5 }}></div>
      </section>

      {/* Quick Stats */}
      <section className="bg-[#11212D] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { val: '+2,300', label: 'إجمالي الخدمات' },
              { val: '+1,500', label: 'خدمات رقمية' },
              { val: '24/7', label: 'متاح دائماً' },
              { val: '100%', label: 'صنع في مصر' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-2 text-[#E5B80B]">{s.val}</div>
                <div className="text-[#9BA8AB]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-4xl text-[#11212D] mb-4">ابدأ من هنا</h2>
            <p className="text-lg text-[#4A5C6A] max-w-3xl">
              توفر الدولة المصرية ما يقرب من 2,300 خدمة منها 1,500 خدمة رقمية كاملة — استخدم المساعد الذكي للوصول لأي خدمة بسهولة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* الخدمات الحكومية */}
            <div
              onClick={() => onPageChange('government')}
              className="group cursor-pointer bg-white rounded-2xl border border-[#CCD0CF] hover:border-[#B01E28]/40 hover:shadow-xl p-8 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-[#B01E28]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#B01E28]/20 transition-colors">
                <FileText className="h-7 w-7 text-[#B01E28]" />
              </div>
              <h3 className="text-xl font-semibold text-[#11212D] mb-2 group-hover:text-[#B01E28] transition-colors">
                الخدمات الحكومية
              </h3>
              <p className="text-[#4A5C6A] text-sm leading-relaxed">
                تصفح أكثر من 2,300 خدمة حكومية من مختلف الوزارات والجهات
              </p>
              <div className="flex items-center gap-2 mt-5 text-[#B01E28] text-sm font-medium">
                <span>استعرض الخدمات</span>
                <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>

            {/* الوزارات */}
            <div
              onClick={() => onPageChange('ministries')}
              className="group cursor-pointer bg-white rounded-2xl border border-[#CCD0CF] hover:border-[#E5B80B]/60 hover:shadow-xl p-8 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-[#E5B80B]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#E5B80B]/20 transition-colors">
                <Landmark className="h-7 w-7 text-[#C9A009]" />
              </div>
              <h3 className="text-xl font-semibold text-[#11212D] mb-2 group-hover:text-[#C9A009] transition-colors">
                الوزارات
              </h3>
              <p className="text-[#4A5C6A] text-sm leading-relaxed">
                تعرف على جميع الوزارات المصرية وخدماتها ومواقعها الرسمية
              </p>
              <div className="flex items-center gap-2 mt-5 text-[#C9A009] text-sm font-medium">
                <span>استعرض الوزارات</span>
                <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>

            {/* المساعد الذكي */}
            <div
              onClick={() => onPageChange('chatbot')}
              className="group cursor-pointer bg-gradient-to-br from-[#11212D] to-[#253745] rounded-2xl hover:shadow-xl p-8 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-[#E5B80B] rounded-full blur-2xl"></div>
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#E5B80B]/20 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#E5B80B]/30 transition-colors">
                  <Sparkles className="h-7 w-7 text-[#E5B80B]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  المساعد الذكي
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  اطرح سؤالك وسيساعدك المساعد في إيجاد الخدمة المناسبة وتقديم طلبك
                </p>
                <div className="flex items-center gap-2 mt-5 text-[#E5B80B] text-sm font-medium">
                  <span>ابدأ المحادثة</span>
                  <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { val: '+2,300', label: 'خدمة حكومية', color: 'text-[#B01E28]' },
              { val: '+40', label: 'وزارة وجهة', color: 'text-[#C9A009]' },
              { val: '24/7', label: 'متاح دائماً', color: 'text-[#11212D]' },
            ].map((s, i) => (
              <div key={i} className="text-center p-4 bg-white rounded-xl border border-[#CCD0CF]">
                <div className={`text-2xl font-bold ${s.color} mb-1`}>{s.val}</div>
                <div className="text-xs text-[#4A5C6A]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For All Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-[#D4AF37] rounded-full"></div>
              <Badge className="bg-[#D4AF37] text-[#002855] px-6 py-2 text-lg shadow-lg">للجميع</Badge>
              <div className="h-1 w-12 bg-[#D4AF37] rounded-full"></div>
            </div>
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-6 leading-tight">الخدمات الشاملة للجميع</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { img: 'https://images.unsplash.com/photo-1619165915846-43d3b9445823?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', title: 'كبار السن', Icon: Heart },
              { img: 'https://images.unsplash.com/photo-1718810051760-42528b6d6bc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', title: 'العمال المهاجرون', Icon: Briefcase },
              { img: 'https://images.unsplash.com/photo-1643930493431-472102e838fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', title: 'الأشخاص ذوو الإعاقة', Icon: Accessibility },
              { img: 'https://images.unsplash.com/photo-1759852692971-a2abc6799cbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', title: 'الشباب', Icon: GraduationCap },
            ].map(({ img, title, Icon }, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-[#D4AF37] transform hover:-translate-y-2"
                onClick={() => onPageChange('government')}>
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002855] via-[#003d7a] to-transparent" style={{ opacity: 0.85 }}></div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg">
                    <Icon className="h-6 w-6 text-[#002855]" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl text-white mb-2">{title}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <Button className="w-full bg-[#002855] hover:bg-[#001A3D] text-white" onClick={e => { e.stopPropagation(); onPageChange('government'); }}>
                    استكشف الخدمات <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16">
            <div className="relative overflow-hidden bg-gradient-to-r from-[#002855] via-[#003D7A] to-[#002855] rounded-2xl shadow-2xl p-8 md:p-12">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <Handshake className="h-8 w-8 text-[#002855]" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl text-white mb-2">نعمل من أجل الجميع - لا أحد يُترك خلف الركب</h3>
                    <p className="text-white/90 text-lg">التزامنا بالتنمية المستدامة الشاملة لجميع فئات المجتمع</p>
                  </div>
                </div>
                <Button onClick={() => onPageChange('government')} size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#002855] whitespace-nowrap shadow-xl">
                  اكتشف الخدمات <ArrowRight className="h-5 w-5 mr-2 rotate-180" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { Icon: Zap, title: 'ذكي وفعال', desc: 'اكتشاف وإنجاز الخدمات بالذكاء الاصطناعي' },
              { Icon: Shield, title: 'آمن وموثوق', desc: 'أمان وحماية بيانات مدعومة حكومياً' },
              { Icon: Clock, title: 'متاح دائماً', desc: 'الوصول للخدمات في أي وقت ومكان، على مدار الساعة' },
            ].map(({ Icon, title, desc }, i) => (
              <div key={i} className="text-center p-8 group hover:bg-gray-50 rounded-lg transition-colors">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#002855]/10 rounded-full mb-4 group-hover:bg-[#002855]/20 transition-colors">
                  <Icon className="h-8 w-8 text-[#002855]" />
                </div>
                <h3 className="text-xl text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                {[
                  { label: 'حسابي', page: 'account' },
                  { label: 'الخدمات', page: 'government' },
                  { label: 'الوزارات', page: 'ministries' },
                  { label: 'مراكز الخدمة', page: 'services-center' },
                  { label: 'طلباتي', page: 'requests' },
                ].map(({ label, page }) => (
                  <li key={page}>
                    <button onClick={() => onPageChange(page)} className="text-gray-400 hover:text-[#D4AF37] transition-colors">{label}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg mb-4">الإعلام</h3>
              <ul className="space-y-2">
                {['الأخبار', 'الفعاليات', 'المواضيع', 'المقالات', 'السياسات والاستراتيجيات', 'القوانين والإجراءات'].map(l => (
                  <li key={l}><button onClick={() => onPageChange('knowledge')} className="text-gray-400 hover:text-[#D4AF37] transition-colors">{l}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg mb-4">الدعم</h3>
              <ul className="space-y-2">
                {['اتصل بنا', 'تقديم تذكرة دعم', 'الأسئلة الشائعة', 'شروط الاستخدام', 'سياسة الخصوصية', 'خريطة الموقع'].map(l => (
                  <li key={l}><button onClick={() => onPageChange('contact')} className="text-gray-400 hover:text-[#D4AF37] transition-colors">{l}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg mb-4">عن دليل</h3>
              <p className="text-gray-400 text-sm mb-4">مساعدك الرقمي الوطني للتنقل في الخدمات الحكومية المصرية.</p>
              <div className="space-y-3">
                <button className="w-full bg-white text-black px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-[#002855] transition-colors">
                  <div className="text-left"><div className="text-xs">حمّله من</div><div className="text-sm">جوجل بلاي</div></div>
                </button>
                <button className="w-full bg-white text-black px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-[#002855] transition-colors">
                  <div className="text-left"><div className="text-xs">حمّله من</div><div className="text-sm">آب ستور</div></div>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">© 2025 حكومة جمهورية مصر العربية</p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#002855] transition-colors">
                    <Icon className="h-5 w-5" />
                  </button>
                ))}
              </div>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-10 h-10 bg-[#D4AF37] text-[#002855] rounded-full flex items-center justify-center hover:bg-[#B8941F] transition-colors">
                <ChevronRight className="h-5 w-5 -rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
