import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  MapPin, 
  Building2, 
  Users, 
  Calendar, 
  Clock, 
  Star, 
  Heart, 
  Utensils, 
  Landmark, 
  Scale, 
  Car, 
  Plane,
  Home,
  GraduationCap,
  Briefcase,
  ShoppingBag,
  Phone,
  AlertCircle,
  Info,
  Lightbulb
} from 'lucide-react';

interface LocalizedKnowledgePageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
}

export function LocalizedKnowledgePage({ currentLang, onPageChange }: LocalizedKnowledgePageProps) {
  const [activeTab, setActiveTab] = useState('culture');

  const translations = {
    en: {
      title: "Localized Knowledge",
      subtitle: "Deep understanding of Egyptian culture, laws, and local information",
      culture: "Culture & Traditions",
      laws: "Laws & Regulations",
      geography: "Geography & Places",
      daily: "Daily Life",
      tourism: "Tourism & Travel",
      business: "Business & Work",
      
      // Culture Section
      cultureTitle: "Egyptian Culture & Traditions",
      cultureSubtitle: "Understanding the heart of Egyptian society",
      holidays: "National Holidays",
      customs: "Social Customs",
      language: "Language & Dialects",
      
      ramadan: "Ramadan",
      ramadanDesc: "Holy month of fasting, spiritual reflection, and community gathering",
      eid: "Eid Celebrations",
      eidDesc: "Major Islamic festivals celebrated with family gatherings and special meals",
      nationalDay: "National Day",
      nationalDayDesc: "July 23rd - Celebrating the Egyptian Revolution of 1952",
      
      greetings: "Greetings & Respect",
      greetingsDesc: "Always greet elders first, use formal titles, and show respect for family values",
      hospitality: "Egyptian Hospitality",
      hospitalityDesc: "Offering tea or coffee to guests is a fundamental part of Egyptian culture",
      family: "Family Values",
      familyDesc: "Family is the cornerstone of Egyptian society with strong intergenerational bonds",
      
      dialectInfo: "Egyptian Arabic",
      dialectDesc: "Most widely understood Arabic dialect across the Middle East and North Africa",
      formalArabic: "Modern Standard Arabic",
      formalDesc: "Used in official documents, news, and formal communications",
      
      // Laws Section
      lawsTitle: "Egyptian Laws & Regulations",
      lawsSubtitle: "Important legal information for residents and visitors",
      personalStatus: "Personal Status",
      traffic: "Traffic Laws",
      business: "Business Regulations",
      
      idCard: "National ID Card",
      idCardDesc: "Mandatory for all Egyptian citizens over 16, required for most official transactions",
      passport: "Passport Requirements",
      passportDesc: "Valid for 7 years, required for international travel and some domestic services",
      
      drivingLicense: "Driving License",
      drivingDesc: "Required for all drivers, valid for 10 years, renewable at traffic departments",
      speedLimits: "Speed Limits",
      speedDesc: "50 km/h in cities, 90 km/h on highways, 120 km/h on ring roads",
      
      businessLicense: "Business License",
      businessDesc: "Required for all commercial activities, obtained from GAFI or local authorities",
      taxSystem: "Tax System",
      taxDesc: "Income tax, VAT, and corporate tax regulations enforced by Egyptian Tax Authority",
      
      // Geography Section
      geoTitle: "Egyptian Geography & Places",
      geoSubtitle: "Key locations and geographical information",
      governorates: "Governorates",
      landmarks: "Famous Landmarks",
      transportation: "Transportation",
      
      cairo: "Cairo (القاهرة)",
      cairoDesc: "Capital and largest city, home to 20+ million people in Greater Cairo",
      alexandria: "Alexandria (الإسكندرية)",
      alexandriaDesc: "Major port city and summer capital, known for Mediterranean beaches",
      luxor: "Luxor (الأقصر)",
      luxorDesc: "Ancient Thebes, world's greatest open-air museum with pharaonic temples",
      
      pyramids: "Giza Pyramids",
      pyramidsDesc: "Last surviving wonder of the ancient world, located in Giza Governorate",
      sphinx: "Great Sphinx",
      sphinxDesc: "Iconic limestone statue with human head and lion body, guardian of pyramids",
      karnak: "Karnak Temple",
      karnakDesc: "Largest ancient religious site in the world, dedicated to Amun-Ra",
      
      metro: "Cairo Metro",
      metroDesc: "First subway system in Africa and Arab world, serves Greater Cairo efficiently",
      uber: "Ride-hailing",
      uberDesc: "Uber, Careem, and local apps widely available in major cities",
      microbus: "Microbus",
      microbusDesc: "Popular affordable public transport connecting neighborhoods and cities",
      
      // Daily Life Section
      dailyTitle: "Egyptian Daily Life",
      dailySubtitle: "Practical information for living in Egypt",
      food: "Food & Dining",
      shopping: "Shopping",
      utilities: "Utilities & Services",
      
      breakfast: "Egyptian Breakfast",
      breakfastDesc: "Ful medames, ta'meya (falafel), cheese, and fresh bread are staples",
      lunch: "Main Meal",
      lunchDesc: "Usually the largest meal, served 2-4 PM, often includes rice, meat, and vegetables",
      tea: "Tea Culture",
      teaDesc: "Tea (shai) is central to social life, served throughout the day in small glasses",
      
      souks: "Traditional Markets",
      souksDesc: "Khan el-Khalili and local souks offer authentic Egyptian goods and experiences",
      malls: "Shopping Malls",
      mallsDesc: "Modern malls like City Stars and Mall of Arabia provide international brands",
      bargaining: "Bargaining",
      bargainingDesc: "Expected in traditional markets, start at 30-50% of initial asking price",
      
      electricity: "Electricity",
      electricityDesc: "220V, frequent power cuts in summer, prepaid meters common in new areas",
      water: "Water Service",
      waterDesc: "Tap water not recommended for drinking, bottled water widely available",
      internet: "Internet & Mobile",
      internetDesc: "4G coverage excellent in cities, fiber internet available in most areas",
      
      // Tourism Section
      tourismTitle: "Tourism & Travel in Egypt",
      tourismSubtitle: "Essential information for visitors and travelers",
      attractions: "Top Attractions",
      accommodation: "Accommodation",
      tips: "Travel Tips",
      
      redSea: "Red Sea",
      redSeaDesc: "World-class diving and snorkeling destinations in Hurghada and Sharm El Sheikh",
      nile: "Nile Cruise",
      nileDesc: "Scenic journey between Luxor and Aswan, showcasing ancient Egyptian temples",
      siwa: "Siwa Oasis",
      siwaDesc: "Remote desert oasis with unique culture, salt lakes, and ancient ruins",
      
      hotels: "Hotels",
      hotelsDesc: "From luxury resorts to budget hostels, booking apps and direct booking available",
      nileView: "Nile View Rooms",
      nileViewDesc: "Premium accommodation option in Cairo and Luxor with river views",
      
      tipping: "Tipping (Baksheesh)",
      tippingDesc: "Expected for most services, 10-15% in restaurants, small amounts for helpers",
      photography: "Photography",
      photographyDesc: "Avoid photographing military installations, ask permission for people",
      ramadanTravel: "Ramadan Travel",
      ramadanDesc: "Reduced hours for attractions, respect fasting customs, unique cultural experience",
      
      // Business Section
      businessTitle: "Business & Work in Egypt",
      businessSubtitle: "Professional environment and business culture",
      workCulture: "Work Culture",
      networking: "Networking",
      regulations: "Regulations",
      
      meetings: "Business Meetings",
      meetingsDesc: "Relationship-building important, expect tea/coffee, punctuality appreciated",
      hierarchy: "Workplace Hierarchy",
      hierarchyDesc: "Respect for seniority and titles, formal address until invited to use first names",
      
      chambers: "Chambers of Commerce",
      chambersDesc: "Egyptian-British, American, and other chambers facilitate business connections",
      events: "Business Events",
      eventsDesc: "Cairo ICT, food exhibitions, and industry conferences throughout the year",
      
      labor: "Labor Law",
      laborDesc: "Employee rights protected, 8-hour workday, 21-day annual leave minimum",
      investment: "Investment Law",
      investmentDesc: "New Investment Law offers incentives for priority sectors and locations"
    },
    ar: {
      title: "المعرفة المحلية",
      subtitle: "فهم عميق للثقافة المصرية والقوانين والمعلومات المحلية",
      culture: "الثقافة والتقاليد",
      laws: "القوانين واللوائح",
      geography: "الجغرافيا والأماكن",
      daily: "الحياة اليومية",
      tourism: "السياحة والسفر",
      business: "الأعمال والعمل",
      
      // Culture Section
      cultureTitle: "الثقافة والتقاليد المصرية",
      cultureSubtitle: "فهم جوهر المجتمع المصري",
      holidays: "الأعياد الوطنية",
      customs: "العادات الاجتماعية",
      language: "اللغة واللهجات",
      
      ramadan: "شهر رمضان",
      ramadanDesc: "الشهر المقدس للصيام والتأمل الروحي والتجمع المجتمعي",
      eid: "أعياد العيد",
      eidDesc: "الأعياد الإسلامية الكبرى التي يحتفل بها مع التجمعات العائلية والوجبات الخاصة",
      nationalDay: "العيد القومي",
      nationalDayDesc: "23 يوليو - الاحتفال بثورة 1952 المصرية",
      
      greetings: "التحية والاحترام",
      greetingsDesc: "دائماً حي كبار السن أولاً، استخدم الألقاب الرسمية، وأظهر الاحترام للقيم العائلية",
      hospitality: "الضيافة المصرية",
      hospitalityDesc: "تقديم الشاي أو القهوة للضيوف جزء أساسي من الثقافة المصرية",
      family: "القيم العائلية",
      familyDesc: "الأسرة هي حجر الأساس في المجتمع المصري مع روابط قوية بين الأجيال",
      
      dialectInfo: "العربية المصرية",
      dialectDesc: "اللهجة العربية الأكثر فهماً عبر الشرق الأوسط وشمال أفريقيا",
      formalArabic: "العربية الفصحى الحديثة",
      formalDesc: "تستخدم في الوثائق الرسمية والأخبار والاتصالات الرسمية",
      
      // Laws Section
      lawsTitle: "القوانين واللوائح المصرية",
      lawsSubtitle: "معلومات قانونية مهمة للمقيمين والزوار",
      personalStatus: "الأحوال الشخصية",
      traffic: "قوانين المرور",
      business: "لوائح الأعمال",
      
      idCard: "البطاقة الشخصية",
      idCardDesc: "إجبارية لجميع المواطنين المصريين فوق 16 سنة، مطلوبة لمعظم المعاملات الرسمية",
      passport: "متطلبات جواز السفر",
      passportDesc: "صالح لمدة 7 سنوات، مطلوب للسفر الدولي وبعض الخدمات المحلية",
      
      drivingLicense: "رخصة القيادة",
      drivingDesc: "مطلوبة لجميع السائقين، صالحة لمدة 10 سنوات، قابلة للتجديد في إدارات المرور",
      speedLimits: "حدود السرعة",
      speedDesc: "50 كم/ساعة في المدن، 90 كم/ساعة على الطرق السريعة، 120 كم/ساعة على الطرق الدائرية",
      
      businessLicense: "ترخيص الأعمال",
      businessDesc: "مطلوب لجميع الأنشطة التجارية، يتم الحصول عليه من الهيئة العامة للاستثمار أو السلطات المحلية",
      taxSystem: "النظام الضريبي",
      taxDesc: "ضريبة الدخل، ضريبة القيمة المضافة، والضرائب على الشركات تطبقها مصلحة الضرائب المصرية",
      
      // Geography Section
      geoTitle: "الجغرافيا والأماكن المصرية",
      geoSubtitle: "المواقع الرئيسية والمعلومات الجغرافية",
      governorates: "المحافظات",
      landmarks: "المعالم الشهيرة",
      transportation: "وسائل النقل",
      
      cairo: "القاهرة",
      cairoDesc: "العاصمة وأكبر مدينة، موطن لأكثر من 20 مليون نسمة في القاهرة الكبرى",
      alexandria: "الإسكندرية",
      alexandriaDesc: "مدينة ميناء رئيسية والعاصمة الصيفية، معروفة بشواطئ البحر المتوسط",
      luxor: "الأقصر",
      luxorDesc: "طيبة القديمة، أعظم متحف مفتوح في العالم مع معابد فرعونية",
      
      pyramids: "أهرامات الجيزة",
      pyramidsDesc: "آخر عجائب الدنيا السبع الباقية، تقع في محافظة الجيزة",
      sphinx: "أبو الهول",
      sphinxDesc: "تمثال حجري جيري أيقوني برأس إنسان وجسم أسد، حارس الأهرامات",
      karnak: "معبد الكرنك",
      karnakDesc: "أكبر موقع ديني قديم في العالم، مخصص للإله آمون رع",
      
      metro: "مترو القاهرة",
      metroDesc: "أول نظام مترو في أفريقيا والعالم العربي، يخدم القاهرة الكبرى بكفاءة",
      uber: "تطبيقات النقل",
      uberDesc: "أوبر وكريم والتطبيقات المحلية متاحة على نطاق واسع في المدن الكبرى",
      microbus: "الميكروباص",
      microbusDesc: "وسائل نقل عام شعبية وبأسعار معقولة تربط الأحياء والمدن",
      
      // Daily Life Section
      dailyTitle: "الحياة اليومية المصرية",
      dailySubtitle: "معلومات عملية للعيش في مصر",
      food: "الطعام والمأكولات",
      shopping: "التسوق",
      utilities: "المرافق والخدمات",
      
      breakfast: "الفطار المصري",
      breakfastDesc: "الفول المدمس والطعمية والجبنة والعيش الطازج من الأساسيات",
      lunch: "الوجبة الرئيسية",
      lunchDesc: "عادة أكبر وجبة، تقدم من 2-4 مساءً، غالباً تشمل الأرز واللحم والخضار",
      tea: "ثقافة الشاي",
      teaDesc: "الشاي محور الحياة الاجتماعية، يقدم طوال اليوم في كؤوس صغيرة",
      
      souks: "الأسواق التقليدية",
      souksDesc: "خان الخليلي والأسواق المحلية تقدم البضائع المصرية الأصيلة والتجارب",
      malls: "مراكز التسوق",
      mallsDesc: "المولات الحديثة مثل سيتي ستارز ومول العرب توفر العلامات التجارية العالمية",
      bargaining: "المساومة",
      bargainingDesc: "متوقعة في الأسواق التقليدية، ابدأ بـ 30-50% من السعر المطلوب الأولي",
      
      electricity: "الكهرباء",
      electricityDesc: "220 فولت، انقطاعات متكررة في الصيف، العدادات المدفوعة مسبقاً شائعة في المناطق الجديدة",
      water: "خدمة المياه",
      waterDesc: "مياه الصنبور غير موصى بها للشرب، المياه المعبأة متاحة على نطاق واسع",
      internet: "الإنترنت والهاتف المحمول",
      internetDesc: "تغطية 4G ممتازة في المدن، إنترنت الألياف البصرية متاح في معظم المناطق",
      
      // Tourism Section
      tourismTitle: "السياحة والسفر في مصر",
      tourismSubtitle: "معلومات أساسية للزوار والمسافرين",
      attractions: "أهم المعالم",
      accommodation: "الإقامة",
      tips: "نصائح السفر",
      
      redSea: "البحر الأحمر",
      redSeaDesc: "وجهات غوص وسنوركلنج عالمية المستوى في الغردقة وشرم الشيخ",
      nile: "رحلة النيل",
      nileDesc: "رحلة خلابة بين الأقصر وأسوان، تعرض المعابد المصرية القديمة",
      siwa: "واحة سيوة",
      siwaDesc: "واحة صحراوية نائية بثقافة فريدة وبحيرات ملحية وآثار قديمة",
      
      hotels: "الفنادق",
      hotelsDesc: "من المنتجعات الفاخرة إلى النزل الاقتصادية، تطبيقات الحجز والحجز المباشر متاح",
      nileView: "غرف إطلالة النيل",
      nileViewDesc: "خيار إقامة مميز في القاهرة والأقصر مع إطلالات على النهر",
      
      tipping: "البقشيش",
      tippingDesc: "متوقع لمعظم الخدمات، 10-15% في المطاعم، مبالغ صغيرة للمساعدين",
      photography: "التصوير",
      photographyDesc: "تجنب تصوير المنشآت العسكرية، اطلب إذن لتصوير الأشخاص",
      ramadanTravel: "السفر في رمضان",
      ramadanDesc: "ساعات مقللة للمعالم، احترم عادات الصيام، تجربة ثقافية فريدة",
      
      // Business Section
      businessTitle: "الأعمال والعمل في مصر",
      businessSubtitle: "البيئة المهنية وثقافة الأعمال",
      workCulture: "ثقافة العمل",
      networking: "التواصل المهني",
      regulations: "اللوائح",
      
      meetings: "الاجتماعات التجارية",
      meetingsDesc: "بناء العلاقات مهم، توقع الشاي/القهوة، الالتزام بالوقت محل تقدير",
      hierarchy: "التسلسل الهرمي في العمل",
      hierarchyDesc: "احترام الأقدمية والألقاب، الخطاب الرسمي حتى تتم دعوتك لاستخدام الأسماء الأولى",
      
      chambers: "غرف التجارة",
      chambersDesc: "الغرف المصرية البريطانية والأمريكية وغيرها تسهل الاتصالات التجارية",
      events: "الفعاليات التجارية",
      eventsDesc: "القاهرة ICT ومعارض الطعام والمؤتمرات الصناعية على مدار السنة",
      
      labor: "قانون العمل",
      laborDesc: "حقوق الموظفين محمية، يوم عمل 8 ساعات، إجازة سنوية 21 يوم كحد أدنى",
      investment: "قانون الاستثمار",
      investmentDesc: "قانون الاستثمار الجديد يقدم حوافز للقطاعات والمواقع ذات الأولوية"
    }
  };

  const t = translations[currentLang];

  const tabs = [
    { id: 'culture', label: t.culture, icon: Heart },
    { id: 'laws', label: t.laws, icon: Scale },
    { id: 'geography', label: t.geography, icon: MapPin },
    { id: 'daily', label: t.daily, icon: Home },
    { id: 'tourism', label: t.tourism, icon: Plane },
    { id: 'business', label: t.business, icon: Briefcase }
  ];

  return (
    <div className={`min-h-screen bg-[#F8F9FA] pt-20 ${currentLang === 'ar' ? 'rtl font-arabic' : 'ltr'}`}>
      {/* Header */}
      <section className="bg-gradient-to-br from-[#B01E28] to-[#8B1721] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl text-white mb-6">
            {t.title}
          </h1>
          <p className="text-xl text-white">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Culture Tab */}
            <TabsContent value="culture" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl text-[#B01E28] mb-4">{t.cultureTitle}</h2>
                <p className="text-[#253745] text-lg">{t.cultureSubtitle}</p>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Holidays */}
                <div className="space-y-6">
                  <h3 className="text-xl text-[#B01E28] flex items-center">
                    <Calendar className="h-6 w-6 mr-2" />
                    {t.holidays}
                  </h3>
                  <div className="space-y-4">
                    <Card className="border-[#CCD0CF] hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle className="flex items-center text-[#253745]">
                          <Star className="h-5 w-5 mr-2 text-[#E5B80B]" />
                          {t.ramadan}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#4A5C6A] leading-relaxed">{t.ramadanDesc}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#CCD0CF] hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle className="flex items-center text-[#253745]">
                          <Heart className="h-5 w-5 mr-2 text-[#B01E28]" />
                          {t.eid}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#4A5C6A] leading-relaxed">{t.eidDesc}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#CCD0CF] hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle className="flex items-center text-[#253745]">
                          <Landmark className="h-5 w-5 mr-2 text-[#B01E28]" />
                          {t.nationalDay}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#4A5C6A] leading-relaxed">{t.nationalDayDesc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Social Customs */}
                <div className="space-y-6">
                  <h3 className="text-xl text-[#B01E28] flex items-center">
                    <Users className="h-6 w-6 mr-2" />
                    {t.customs}
                  </h3>
                  <div className="space-y-4">
                    <Card className="border-[#CCD0CF] hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle className="text-[#253745]">{t.greetings}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#4A5C6A] leading-relaxed">{t.greetingsDesc}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#CCD0CF] hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle className="text-[#253745]">{t.hospitality}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#4A5C6A] leading-relaxed">{t.hospitalityDesc}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#CCD0CF] hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle className="text-[#253745]">{t.family}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#4A5C6A] leading-relaxed">{t.familyDesc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Language */}
                <div className="space-y-6">
                  <h3 className="text-xl text-[#B01E28] flex items-center">
                    <GraduationCap className="h-6 w-6 mr-2" />
                    {t.language}
                  </h3>
                  <div className="space-y-4">
                    <Card className="border-[#CCD0CF] hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle className="text-[#253745]">{t.dialectInfo}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#4A5C6A] leading-relaxed">{t.dialectDesc}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#CCD0CF] hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle className="text-[#253745]">{t.formalArabic}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#4A5C6A] leading-relaxed">{t.formalDesc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Laws Tab */}
            <TabsContent value="laws" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl text-[#B01E28] mb-4">{t.lawsTitle}</h2>
                <p className="text-[#253745] text-lg">{t.lawsSubtitle}</p>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl text-[#B01E28] flex items-center">
                    <Users className="h-6 w-6 mr-2" />
                    {t.personalStatus}
                  </h3>
                  <div className="space-y-4">
                    <Card className="border-[#CCD0CF] hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle className="text-[#253745]">{t.idCard}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#4A5C6A] leading-relaxed">{t.idCardDesc}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#CCD0CF] hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle className="text-[#253745]">{t.passport}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#4A5C6A] leading-relaxed">{t.passportDesc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl text-[#B01E28] flex items-center">
                    <Car className="h-6 w-6 mr-2" />
                    {t.traffic}
                  </h3>
                  <div className="space-y-4">
                    <Card className="border-[#CCD0CF] hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle className="text-[#253745]">{t.drivingLicense}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#4A5C6A] leading-relaxed">{t.drivingDesc}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#CCD0CF] hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle className="text-[#253745]">{t.speedLimits}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#4A5C6A] leading-relaxed">{t.speedDesc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl text-[#B01E28] flex items-center">
                    <Briefcase className="h-6 w-6 mr-2" />
                    {t.business}
                  </h3>
                  <div className="space-y-4">
                    <Card className="border-[#CCD0CF] hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle className="text-[#253745]">{t.businessLicense}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#4A5C6A] leading-relaxed">{t.businessDesc}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-[#CCD0CF] hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle className="text-[#253745]">{t.taxSystem}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#4A5C6A] leading-relaxed">{t.taxDesc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Geography Tab */}
            <TabsContent value="geography" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl text-[#B01E28] mb-4">{t.geoTitle}</h2>
                <p className="text-[#253745] text-lg">{t.geoSubtitle}</p>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl text-primary flex items-center">
                    <Building2 className="h-6 w-6 mr-2" />
                    {t.governorates}
                  </h3>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.cairo}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.cairoDesc}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.alexandria}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.alexandriaDesc}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.luxor}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.luxorDesc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl text-primary flex items-center">
                    <Landmark className="h-6 w-6 mr-2" />
                    {t.landmarks}
                  </h3>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.pyramids}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.pyramidsDesc}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.sphinx}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.sphinxDesc}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.karnak}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.karnakDesc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl text-primary flex items-center">
                    <Car className="h-6 w-6 mr-2" />
                    {t.transportation}
                  </h3>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.metro}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.metroDesc}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.uber}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.uberDesc}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.microbus}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.microbusDesc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Daily Life Tab */}
            <TabsContent value="daily" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl text-[#B01E28] mb-4">{t.dailyTitle}</h2>
                <p className="text-[#253745] text-lg">{t.dailySubtitle}</p>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl text-primary flex items-center">
                    <Utensils className="h-6 w-6 mr-2" />
                    {t.food}
                  </h3>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.breakfast}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.breakfastDesc}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.lunch}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.lunchDesc}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.tea}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.teaDesc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl text-primary flex items-center">
                    <ShoppingBag className="h-6 w-6 mr-2" />
                    {t.shopping}
                  </h3>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.souks}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.souksDesc}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.malls}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.mallsDesc}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.bargaining}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.bargainingDesc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl text-primary flex items-center">
                    <Phone className="h-6 w-6 mr-2" />
                    {t.utilities}
                  </h3>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.electricity}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.electricityDesc}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.water}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.waterDesc}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.internet}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.internetDesc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tourism Tab */}
            <TabsContent value="tourism" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl text-[#B01E28] mb-4">{t.tourismTitle}</h2>
                <p className="text-[#253745] text-lg">{t.tourismSubtitle}</p>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl text-primary flex items-center">
                    <Star className="h-6 w-6 mr-2" />
                    {t.attractions}
                  </h3>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.redSea}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.redSeaDesc}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.nile}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.nileDesc}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.siwa}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.siwaDesc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl text-primary flex items-center">
                    <Home className="h-6 w-6 mr-2" />
                    {t.accommodation}
                  </h3>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.hotels}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.hotelsDesc}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.nileView}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.nileViewDesc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl text-primary flex items-center">
                    <Lightbulb className="h-6 w-6 mr-2" />
                    {t.tips}
                  </h3>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.tipping}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.tippingDesc}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.photography}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.photographyDesc}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.ramadanTravel}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.ramadanDesc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Business Tab */}
            <TabsContent value="business" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl text-[#B01E28] mb-4">{t.businessTitle}</h2>
                <p className="text-[#253745] text-lg">{t.businessSubtitle}</p>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl text-primary flex items-center">
                    <Users className="h-6 w-6 mr-2" />
                    {t.workCulture}
                  </h3>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.meetings}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.meetingsDesc}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.hierarchy}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.hierarchyDesc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl text-primary flex items-center">
                    <Building2 className="h-6 w-6 mr-2" />
                    {t.networking}
                  </h3>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.chambers}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.chambersDesc}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.events}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.eventsDesc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl text-primary flex items-center">
                    <Scale className="h-6 w-6 mr-2" />
                    {t.regulations}
                  </h3>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.labor}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.laborDesc}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-secondary">{t.investment}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{t.investmentDesc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section
      {<section className="py-20 px-4 bg-gradient-to-br from-primary to-primary/80">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Heart className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl mb-6">
            {currentLang === 'en' ? "Experience Egypt with Local Knowledge" : "اختبر مصر بالمعرفة المحلية"}
          </h2>
          <p className="text-xl mb-8 text-white/90">
            {currentLang === 'en' 
              ? "Let Masr Agent guide you through the rich culture and practical knowledge of Egypt."
              : "دع مساعد مصر يرشدك عبر الثقافة الغنية والمعرفة العملية لمصر."
            }
          </p>
          <Button 
            size="lg" 
            onClick={() => onPageChange('demo')}
            className="bg-secondary text-primary hover:bg-secondary/90"
          >
            {currentLang === 'en' ? "Try Masr Agent" : "جرب مساعد مصر"}
          </Button>
        </div>
      </section>} */}
    </div>
  );
}