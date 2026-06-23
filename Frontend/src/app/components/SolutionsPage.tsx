import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Users, 
  Building, 
  GraduationCap, 
  MapPin, 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  FileText, 
  Star, 
  DollarSign, 
  Calendar,
  Shield,
  Search,
  Award,
  UserCheck,
  Briefcase,
  Heart,
  Plane,
  BookOpen,
  Home,
  CreditCard,
  Phone,
  Mail,
  TrendingUp,
  Target,
  Zap,
  Globe,
  Timer,
  ThumbsUp,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  AlertTriangle,
  Car
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logoImage from '@/imports/Screenshot_2026-06-08_021823-removebg-preview.png';

interface SolutionsPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
  onOpenChatbot?: () => void;
}

export function SolutionsPage({ currentLang, onPageChange, onOpenChatbot }: SolutionsPageProps) {
  const [activeCategory, setActiveCategory] = useState('citizens');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState<any[]>([]);

  const translations = {
    en: {
      // Hero Section
      heroTitle: "Know exactly what you need for any government service",
      heroSubtitle: "Without running around or wasting a whole day",
      searchPlaceholder: "Search for a service...",
      tryDaleel: "Try Daleel Now",
      
      // Main Sections
      solutionsByCategory: "Solutions by Category",
      ourClients: "Our Success Stories",
      clientTestimonials: "Client Testimonials",
      industryImpact: "Industry Impact",
      
      // Categories
      forCitizens: "For Citizens",
      forStudents: "For Students",
      forBusinesses: "For Businesses",
      forTourists: "For Tourists & Visitors",
      
      // Category Descriptions
      citizensDesc: "Know exactly what's required for any government service without running around or wasting a whole day.",
      studentsDesc: "From university applications to getting official certificates – Daleel provides clear and easy steps.",
      businessDesc: "Complete your company procedures faster than ever – licenses, taxes, commercial registry, everything in one place.",
      touristsDesc: "Need to know how to get permits, renew visa, or visit government offices in Egypt? Daleel makes it easy.",
      
      // Client Success Stories
      clientStories: {
        citizens: {
          title: "Empowering 100,000+ Egyptian Citizens",
          subtitle: "Real stories from people who transformed their government service experience",
          cases: [
            {
              name: "Ahmed Hassan",
              age: 34,
              location: "Cairo",
              profession: "Engineer",
              challenge: "Spent 3 days trying to renew his national ID and passport for urgent travel",
              solution: "Used our AI assistant to get step-by-step guidance and pre-fill all required forms",
              outcome: "Completed both services in 2 hours with 100% accuracy",
              timeSaved: "22 hours",
              satisfactionScore: 4.9,
              quote: "I couldn't believe how simple it became. The AI knew exactly what I needed and guided me through everything.",
              services: ["National ID Renewal", "Passport Application", "Travel Documents"]
            },
            {
              name: "Fatma Al-Masry",
              age: 28,
              location: "Alexandria",
              profession: "Teacher",
              challenge: "Needed birth certificate for her newborn and marriage certificate authentication",
              solution: "AI assistant provided personalized document checklist and appointment scheduling",
              outcome: "All documents obtained in single visit with no missing paperwork",
              timeSaved: "16 hours",
              satisfactionScore: 4.8,
              quote: "The AI assistant was like having a personal guide who knew all the shortcuts and requirements.",
              services: ["Birth Certificate", "Marriage Certificate", "Document Authentication"]
            },
            {
              name: "Mohamed Abdel Rahman",
              age: 45,
              location: "Giza",
              profession: "Retired Military",
              challenge: "Complex pension documentation and military service record verification",
              solution: "Specialized AI guidance for military-related procedures and document preparation",
              outcome: "Successfully processed pension application with accelerated approval",
              timeSaved: "35 hours",
              satisfactionScore: 5.0,
              quote: "Finally, a system that understands the complexity of military procedures. Excellent service!",
              services: ["Pension Application", "Military Records", "Service Verification"]
            }
          ],
          stats: {
            totalUsers: "127,500+",
            avgTimeSaved: "18.5 hours",
            successRate: "96.8%",
            satisfactionScore: "4.7/5"
          }
        },
        students: {
          title: "Supporting 50,000+ Students & Academics",
          subtitle: "Helping students navigate educational procedures and study abroad opportunities",
          cases: [
            {
              name: "Sara Mahmoud",
              age: 20,
              location: "Cairo University",
              profession: "Medical Student",
              challenge: "University transfer application and credit equivalency documentation",
              solution: "AI-powered university requirements analysis and document preparation",
              outcome: "Successful transfer with 85% credit acceptance",
              timeSaved: "25 hours",
              satisfactionScore: 4.9,
              quote: "The AI helped me understand exactly which credits would transfer and how to present my case.",
              services: ["University Transfer", "Credit Evaluation", "Academic Records"]
            },
            {
              name: "Omar Khaled",
              age: 22,
              location: "American University in Cairo",
              profession: "Computer Science Graduate",
              challenge: "Study abroad application for Master's degree in Germany",
              solution: "Comprehensive guidance for international study requirements and visa procedures",
              outcome: "Admitted to 3 German universities with scholarship offers",
              timeSaved: "40 hours",
              satisfactionScore: 5.0,
              quote: "Without this AI assistant, I would have missed important requirements and deadlines.",
              services: ["Study Abroad", "Visa Application", "Scholarship Applications"]
            },
            {
              name: "Nour El-Din",
              age: 19,
              location: "Al-Azhar University",
              profession: "Engineering Student",
              challenge: "Certificate authentication for international exchange program",
              solution: "Step-by-step authentication process and embassy procedures guidance",
              outcome: "All certificates authenticated and accepted by partner university",
              timeSaved: "12 hours",
              satisfactionScore: 4.7,
              quote: "The process seemed impossible at first, but the AI made it manageable and clear.",
              services: ["Certificate Authentication", "Exchange Programs", "Embassy Procedures"]
            }
          ],
          stats: {
            totalUsers: "52,300+",
            avgTimeSaved: "22.3 hours",
            successRate: "94.2%",
            satisfactionScore: "4.6/5"
          }
        },
        businesses: {
          title: "Accelerating 15,000+ Businesses",
          subtitle: "From startups to enterprises, powering business growth through automated government procedures",
          cases: [
            {
              name: "TechStart Solutions",
              industry: "Technology Startup",
              location: "New Administrative Capital",
              size: "15 employees",
              challenge: "Complete company registration, licensing, and tax setup for tech startup",
              solution: "Integrated business automation platform with AI-guided procedures",
              outcome: "Full legal setup completed in 5 days instead of typical 6 weeks",
              timeSaved: "200+ hours",
              costSaved: "EGP 25,000",
              satisfactionScore: 4.9,
              quote: "This platform transformed our business setup experience. We launched 4 weeks earlier than planned.",
              services: ["Company Registration", "Commercial License", "Tax Registration", "Work Permits"]
            },
            {
              name: "Green Valley Trading",
              industry: "Import/Export",
              location: "Port Said",
              size: "150 employees",
              challenge: "Complex import licensing and customs documentation for multiple product lines",
              solution: "Specialized trade procedures automation with real-time compliance monitoring",
              outcome: "30% faster customs clearance and 100% compliance rate",
              timeSaved: "500+ hours annually",
              costSaved: "EGP 180,000",
              satisfactionScore: 4.8,
              quote: "Our import procedures are now seamless. The AI handles compliance while we focus on growth.",
              services: ["Import Licenses", "Customs Documentation", "Trade Compliance", "Product Registration"]
            },
            {
              name: "Pharma Excellence Ltd",
              industry: "Pharmaceutical Manufacturing",
              location: "6th of October City",
              size: "300 employees",
              challenge: "Pharmaceutical licensing, health authority approvals, and quality certifications",
              solution: "Healthcare-specific regulatory automation with compliance tracking",
              outcome: "Achieved all regulatory approvals 40% faster with zero compliance issues",
              timeSaved: "800+ hours",
              costSaved: "EGP 350,000",
              satisfactionScore: 5.0,
              quote: "In pharmaceuticals, compliance is everything. This AI ensures we never miss a requirement.",
              services: ["Pharmaceutical Licenses", "Health Approvals", "Quality Certificates", "Regulatory Compliance"]
            }
          ],
          stats: {
            totalClients: "15,750+",
            avgTimeSaved: "380 hours",
            avgCostSaved: "EGP 95,000",
            successRate: "98.5%",
            satisfactionScore: "4.8/5"
          }
        },
        tourists: {
          title: "Welcoming 25,000+ International Visitors",
          subtitle: "Making Egypt accessible for tourists and international visitors",
          cases: [
            {
              name: "Marco & Elena Rossi",
              nationality: "Italian",
              visitType: "Tourism",
              duration: "2 weeks",
              challenge: "Tourist visa extension and travel permit for restricted archaeological sites",
              solution: "Tourism-focused AI guidance with embassy coordination support",
              outcome: "Visa extended and special permits obtained for unique cultural experiences",
              timeSaved: "8 hours",
              satisfactionScore: 4.8,
              quote: "We almost missed visiting Abu Simbel, but the AI helped us get the permits quickly.",
              services: ["Visa Extension", "Travel Permits", "Archaeological Site Access"]
            },
            {
              name: "James Anderson",
              nationality: "American",
              visitType: "Business & Investment",
              duration: "6 months",
              challenge: "Business visa, investment permits, and property purchase documentation",
              solution: "Investment-focused procedures with legal compliance guidance",
              outcome: "Successful property investment and business establishment in Egypt",
              timeSaved: "45 hours",
              satisfactionScore: 4.9,
              quote: "Investing in Egypt seemed complex, but the AI made the legal process straightforward.",
              services: ["Business Visa", "Investment Permits", "Property Documentation", "Legal Compliance"]
            },
            {
              name: "Dr. Liu Wei",
              nationality: "Chinese",
              visitType: "Medical Tourism",
              duration: "1 month",
              challenge: "Medical visa, hospital documentation, and insurance verification",
              solution: "Healthcare tourism support with medical facility coordination",
              outcome: "Seamless medical treatment experience with all documentation handled",
              timeSaved: "15 hours",
              satisfactionScore: 5.0,
              quote: "The medical tourism support was exceptional. Everything was prepared before I arrived.",
              services: ["Medical Visa", "Hospital Documentation", "Insurance Verification", "Medical Tourism Support"]
            }
          ],
          stats: {
            totalVisitors: "28,400+",
            avgTimeSaved: "12.5 hours",
            successRate: "97.3%",
            satisfactionScore: "4.7/5"
          }
        }
      },
      
      // Common Labels
      challenge: "Challenge",
      solution: "Solution",
      outcome: "Outcome", 
      timeSaved: "Time Saved",
      costSaved: "Cost Saved",
      satisfaction: "Satisfaction",
      services: "Services Used",
      totalUsers: "Total Users",
      successRate: "Success Rate",
      avgTimeSaved: "Avg Time Saved",
      
      // CTA Section
      ctaTitle: "Search now and save your time and effort",
      ctaButton: "Try Daleel Now",
      
      // Stats
      overallStats: {
        timesSaved: "Hours Saved",
        usersSatisfied: "Satisfied Users", 
        servicesOffered: "Services Available",
        successRate: "Success Rate"
      }
    },
    ar: {
      // Hero Section
      heroTitle: "اعرف المطلوب بالضبط لأي خدمة حكومية",
      heroSubtitle: "من غير لفة أو تضييع يوم كامل",
      searchPlaceholder: "ابحث عن خدمة...",
      tryDaleel: "جرّب دليل الآن",
      
      // Main Sections
      solutionsByCategory: "الحلول حسب الفئة",
      ourClients: "قصص نجاحنا",
      clientTestimonials: "شهادات العملاء",
      industryImpact: "تأثيرنا على القطاعات",
      
      // Categories
      forCitizens: "للمواطنين",
      forStudents: "للطلاب",
      forBusinesses: "لأصحاب الأعمال",
      forTourists: "للسياح والزائرين",
      
      // Category Descriptions
      citizensDesc: "اعرف المطلوب بالضبط لأي خدمة حكومية من غير لفة أو تضييع يوم كامل.",
      studentsDesc: "من أول التقديم على الجامعات لحد استخراج الشهادات الرسمية – دليل يوفّرلك خطوات واضحة وسهلة.",
      businessDesc: "خلص إجراءات شركتك أسرع من أي وقت – التراخيص، الضرائب، السجل الت��اري، كل حاجة متجمعة في مكان واحد.",
      touristsDesc: "محتاج تعرف إزاي تطلع تصريح، أو تجدد فيزا، أو تزور مصلحة حكومية في مصر؟ دليل بيسهّللك الطريق.",
      
      // Client Success Stories  
      clientStories: {
        citizens: {
          title: "تمكين أكثر من 100,000 مواطن مصري",
          subtitle: "قصص حقيقية من أشخاص حولوا تجربة الخدمات الحكومية",
          cases: [
            {
              name: "أحمد حسن",
              age: 34,
              location: "القاهرة",
              profession: "مهندس",
              challenge: "قضى 3 أيام محاولاً تجديد البطاقة الشخصية وجواز السفر للسفر العاجل",
              solution: "استخدم مساعدنا الذكي للحصول على إرشاد خطوة بخطوة وملء جميع النماذج المطلوبة مسبقاً",
              outcome: "أكمل كلا الخدمتين في ساعتين بدقة 100%",
              timeSaved: "22 ساعة",
              satisfactionScore: 4.9,
              quote: "لم أصدق كيف أصبح الأمر بسيطاً. الذكي الاصطناعي عرف بالضبط ما أحتاجه وأرشدني خلال كل شيء.",
              services: ["تجديد البطاقة الشخصية", "طلب جواز السفر", "وثائق السفر"]
            },
            {
              name: "فاطمة المصري",
              age: 28,
              location: "الإسكندرية", 
              profession: "مدرسة",
              challenge: "احتاجت شهادة ميلاد لمولودها الجديد وتوثيق شهادة الزواج",
              solution: "وفر المساعد الذكي قائمة مراجعة شخصية للوثائق وجدولة المواعيد",
              outcome: "حصلت على جميع الوثائق في زيارة واحدة دون نقص أي أوراق",
              timeSaved: "16 ساعة",
              satisfactionScore: 4.8,
              quote: "المساعد الذكي كان مثل وجود دليل شخصي يعرف كل الاختصارات والمتطلبات.",
              services: ["شهادة ميلاد", "شهادة زواج", "توثيق الوثائق"]
            },
            {
              name: "محمد عبد الرحمن",
              age: 45,
              location: "الجيزة",
              profession: "عسكري متقاعد",
              challenge: "وثائق معاش معقدة والتحقق من سجل الخدمة العسكرية",
              solution: "إرشاد ذكي متخصص للإجراءات المتعلقة بالعسكريين وإعداد الوثائق",
              outcome: "معالجة ناجحة لطلب المعاش مع الموافقة المعجلة",
              timeSaved: "35 ساعة",
              satisfactionScore: 5.0,
              quote: "أخيراً، نظام يفهم تعقيد الإجراءات العسكرية. خدمة ممتازة!",
              services: ["طلب المعاش", "السجلات العسكرية", "التحقق من الخدمة"]
            }
          ],
          stats: {
            totalUsers: "127,500+",
            avgTimeSaved: "18.5 ساعة",
            successRate: "96.8%",
            satisfactionScore: "4.7/5"
          }
        },
        students: {
          title: "دعم أكثر من 50,000 طالب وأكاديمي",
          subtitle: "مساعدة الطلاب على التنقل عبر الإجراءات التعليمية وفرص الدراسة با��خارج",
          cases: [
            {
              name: "سارة محمود",
              age: 20,
              location: "جامعة القاهرة",
              profession: "طالبة طب",
              challenge: "طلب تحويل جامعي ووثائق معادلة الساعات المعتمدة",
              solution: "تحليل متطلبات الجامعة بالذكاء الاصطناعي وإعداد الوثائق",
              outcome: "تحويل ناجح مع قبول 85% من الساعات المعتمدة",
              timeSaved: "25 ساعة",
              satisfactionScore: 4.9,
              quote: "ساعدني الذكي الاصطناعي على فهم أي الساعات ستُحول بالضبط وكيفية تقديم حالتي.",
              services: ["التحويل الجامعي", "تقييم الساعات المعتمدة", "السجلات الأكاديمية"]
            },
            {
              name: "عمر خالد",
              age: 22,
              location: "الجامعة الأمريكية بالقاهرة",
              profession: "خريج علوم حاسوب",
              challenge: "طلب الدراسة بالخارج للماجستير في ألمانيا",
              solution: "إرشاد شامل لمتطلبات الدراسة الدولية وإجراءات التأشيرة",
              outcome: "قُبل في 3 جامعات ألمانية مع عروض منح دراسية",
              timeSaved: "40 ساعة",
              satisfactionScore: 5.0,
              quote: "بدون هذا المساعد الذكي، كنت سأفوت متطلبات ومواعيد نهائية مهمة.",
              services: ["الدراسة بالخارج", "طلب التأشيرة", "طلبات المنح الدراسية"]
            },
            {
              name: "نور الدين",
              age: 19,
              location: "جامعة الأزهر",
              profession: "طالب هندسة",
              challenge: "توثيق الشهادات لبرنامج التبادل الدولي",
              solution: "إرشاد خطوة بخطوة لعملية التوثيق وإجراءات السفارة",
              outcome: "توثيق جميع الشهادات وقبولها من الجامعة الشريكة",
              timeSaved: "12 ساعة",
              satisfactionScore: 4.7,
              quote: "بدت العملية مستحيلة في البداية، لكن الذكي الاصطناعي جعلها قابلة للإدارة وواضحة.",
              services: ["توثيق الشهادات", "برامج التبادل", "إجراءات السفارة"]
            }
          ],
          stats: {
            totalUsers: "52,300+",
            avgTimeSaved: "22.3 ساعة",
            successRate: "94.2%",
            satisfactionScore: "4.6/5"
          }
        },
        businesses: {
          title: "تسريع أكثر من 15,000 شركة",
          subtitle: "من الشركات الناشئة إلى المؤسسات، تمكين نمو الأعمال من خلال الإجراءات الحكومية المؤتمتة",
          cases: [
            {
              name: "تك ستارت سوليوشنز",
              industry: "شركة تقنية ناشئة",
              location: "العاصمة الإدارية الجديدة",
              size: "15 موظف",
              challenge: "تسجيل الشركة الكامل والترخيص وإعداد الضرائب للشركة التقنية الناشئة",
              solution: "منصة أتمتة أعمال متكاملة مع إجراءات موجهة بالذكاء الاصطناعي",
              outcome: "اكتمل الإعد��د القانوني الكامل في 5 أيام بدلاً من 6 أسابيع المعتادة",
              timeSaved: "200+ ساعة",
              costSaved: "25,000 جنيه مصري",
              satisfactionScore: 4.9,
              quote: "هذه المنصة حولت تجربة إعداد أعمالنا. أطلقنا الشركة قبل 4 أسابيع من المخطط.",
              services: ["تسجيل الشركة", "الترخيص التجاري", "التسجيل الضريبي", "تصاريح العمل"]
            },
            {
              name: "جرين فالي للتجارة",
              industry: "استيراد/تصدير",
              location: "بورسعيد",
              size: "150 موظف",
              challenge: "ترخيص استيراد معقد ووثائق جمركية لخطوط منتجات متعددة",
              solution: "أتمتة إجراءات التجارة المتخصصة مع مراقبة الامتثال في الوقت الفعلي",
              outcome: "تخليص جمركي أسرع بـ30% ومعدل امتثال 100%",
              timeSaved: "500+ ساعة سنوياً",
              costSaved: "180,000 جنيه مصري",
              satisfactionScore: 4.8,
              quote: "إجراءات الاستيراد أصبحت سلسة الآن. الذكي الاصطناعي يتولى الامتثال بينما نركز على النمو.",
              services: ["تراخيص الاستيراد", "الوثائق الجمركية", "امتثال التجارة", "تسجيل المنتجات"]
            },
            {
              name: "فارما إكسلنس المحدودة",
              industry: "تصنيع الأدوية",
              location: "مدينة 6 أكتوبر",
              size: "300 موظف",
              challenge: "ترخيص الأدوية وموافقات هيئة الصحة وشهادات الجودة",
              solution: "أتمتة تنظيمية خاصة بالرعاية الصحية مع تتبع الامتثال",
              outcome: "حقق جميع الموافقات التنظيمية أسرع بـ40% دون مشاكل امتثال",
              timeSaved: "800+ ساعة",
              costSaved: "350,000 جنيه مصري",
              satisfactionScore: 5.0,
              quote: "في الأدوية، الامتثال هو كل شيء. هذا الذكي الاصطناعي يضمن ألا نفوت أي متطلب.",
              services: ["تراخيص الأدوية", "موافقات الصحة", "شهادات الجودة", "الامتثال التنظيمي"]
            }
          ],
          stats: {
            totalClients: "15,750+",
            avgTimeSaved: "380 ساعة",
            avgCostSaved: "95,000 جنيه مصري",
            successRate: "98.5%",
            satisfactionScore: "4.8/5"
          }
        },
        tourists: {
          title: "ترحيب بأكثر من 25,000 زائر دولي",
          subtitle: "جعل مصر في متناول السياح والزوار الدوليين",
          cases: [
            {
              name: "ماركو وإيلينا روسي",
              nationality: "إيطالي",
              visitType: "سياحة",
              duration: "أسبوعان",
              challenge: "تمديد التأشيرة السياحية وتصريح سفر للمواقع الأثرية المحدودة",
              solution: "إرشاد ذكي يركز على السياحة مع دعم تنسيق السفارة",
              outcome: "تم تمديد التأشيرة والحصول على تصاريح خاصة لتجارب ثقافية فريدة",
              timeSaved: "8 ساعات",
              satisfactionScore: 4.8,
              quote: "كدنا نفوت زيارة أبو سمبل، لكن الذكي الاصطناعي ساعدنا في الحصول على التصاريح بسرعة.",
              services: ["تمديد التأشيرة", "تصاريح السفر", "الوصول للمواقع الأثرية"]
            },
            {
              name: "جيمس أندرسون",
              nationality: "أمريكي",
              visitType: "أعمال واستثمار",
              duration: "6 أشهر",
              challenge: "تأشيرة أعمال وتصاريح استثمار ووثائق شراء عقار",
              solution: "إجراءات تركز على الاستثمار مع إرشاد الامتثال القانوني",
              outcome: "استثمار عقاري ناجح وتأسيس أعمال في مصر",
              timeSaved: "45 ساعة",
              satisfactionScore: 4.9,
              quote: "الاستثمار في مصر بدا معقداً، لكن الذكي الاصطناعي جعل العملية القانونية مباشرة.",
              services: ["تأشيرة أعمال", "تصاريح استثمار", "وثائق عقارية", "الامتثال القانوني"]
            },
            {
              name: "د. ليو وي",
              nationality: "صيني",
              visitType: "سياحة علاجية",
              duration: "شهر واحد",
              challenge: "تأشيرة طبية ووثائق المستشفى والتحقق من التأمين",
              solution: "دعم السياحة الصحية مع تنسيق المرافق الطبية",
              outcome: "تجربة علاج طبي سلسة مع التعامل مع جميع الوثائق",
              timeSaved: "15 ساعة",
              satisfactionScore: 5.0,
              quote: "دعم السياحة الطبية كان استثنائياً. كل شيء كان محضراً قبل وصولي.",
              services: ["تأشيرة طبية", "وثائق المستشفى", "التحقق من التأمين", "دعم السياحة الطبية"]
            }
          ],
          stats: {
            totalVisitors: "28,400+",
            avgTimeSaved: "12.5 ساعة",
            successRate: "97.3%",
            satisfactionScore: "4.7/5"
          }
        }
      },
      
      // Common Labels
      challenge: "التحدي",
      solution: "الحل",
      outcome: "النتيجة",
      timeSaved: "الوقت المُوفر",
      costSaved: "التكلفة المُوفرة", 
      satisfaction: "الرضا",
      services: "الخدمات المستخدمة",
      totalUsers: "إجمالي المستخدمين",
      successRate: "معدل النجاح",
      avgTimeSaved: "متوسط الوقت المُوفر",
      
      // CTA Section
      ctaTitle: "ابحث دلوقتي ووفّر وقتك ومجهودك",
      ctaButton: "جرّب دليل الآن",
      
      // Stats
      overallStats: {
        timesSaved: "ساعات تم توفيرها",
        usersSatisfied: "مستخدم راضي",
        servicesOffered: "خدمة متاحة",
        successRate: "معدل النجاح"
      }
    }
  };

  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  const categories = [
    {
      id: 'citizens',
      title: t.forCitizens,
      description: t.citizensDesc,
      icon: Users,
      iconColor: 'text-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      stats: t.clientStories.citizens.stats,
      illustration: '🏛️'
    },
    {
      id: 'students', 
      title: t.forStudents,
      description: t.studentsDesc,
      icon: GraduationCap,
      iconColor: 'text-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-200',
      stats: t.clientStories.students.stats,
      illustration: '🎓'
    },
    {
      id: 'businesses',
      title: t.forBusinesses,
      description: t.businessDesc,
      icon: Building,
      iconColor: 'text-green-600',
      bgColor: 'from-green-50 to-green-100',
      borderColor: 'border-green-200',
      stats: t.clientStories.businesses.stats,
      illustration: '💼'
    },
    {
      id: 'tourists',
      title: t.forTourists,
      description: t.touristsDesc,
      icon: MapPin,
      iconColor: 'text-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
      borderColor: 'border-orange-200',
      stats: t.clientStories.tourists.stats,
      illustration: '🌍'
    }
  ];

  const getCurrentStoryData = () => {
    return t.clientStories[activeCategory as keyof typeof t.clientStories];
  };

  const getServicesForCategory = (categoryId: string) => {
    const services = {
      citizens: [
        {
          title: currentLang === 'ar' ? 'تجديد البطاقة الشخصية' : 'National ID Renewal',
          description: currentLang === 'ar' ? 'تجديد البطاقة الشخصية المصرية بسهولة وسرعة' : 'Renew your Egyptian national ID card easily and quickly',
          icon: UserCheck,
          iconColor: 'text-blue-600',
          bgColor: 'bg-blue-100',
          duration: currentLang === 'ar' ? '3-5 أيام' : '3-5 days',
          cost: currentLang === 'ar' ? '50 جنيه' : '50 EGP',
          rating: '4.8/5',
          requirements: [
            currentLang === 'ar' ? 'البطاقة المنتهية الصلاحية' : 'Expired ID card',
            currentLang === 'ar' ? 'صورة شخصية حديثة' : 'Recent personal photo',
            currentLang === 'ar' ? 'إيصال سكن' : 'Proof of residence',
            currentLang === 'ar' ? 'شهادة ميلاد' : 'Birth certificate'
          ],
          benefits: [
            currentLang === 'ar' ? 'لا توجد طوابير' : 'No queues',
            currentLang === 'ar' ? 'تتبع الحالة' : 'Status tracking',
            currentLang === 'ar' ? 'توصيل مجاني' : 'Free delivery'
          ]
        },
        {
          title: currentLang === 'ar' ? 'استخراج جواز سفر' : 'Passport Application',
          description: currentLang === 'ar' ? 'استخراج جواز سفر جديد أو تجديد الحالي' : 'Apply for a new passport or renew existing one',
          icon: Plane,
          iconColor: 'text-green-600',
          bgColor: 'bg-green-100',
          duration: currentLang === 'ar' ? '7-10 أيام' : '7-10 days',
          cost: currentLang === 'ar' ? '365 جنيه' : '365 EGP',
          rating: '4.7/5',
          requirements: [
            currentLang === 'ar' ? 'البطاقة الشخصية' : 'National ID',
            currentLang === 'ar' ? 'صورة شخصية حديثة' : 'Recent personal photo',
            currentLang === 'ar' ? 'شهادة ميلاد' : 'Birth certificate',
            currentLang === 'ar' ? 'موافقة أمنية' : 'Security clearance'
          ],
          benefits: [
            currentLang === 'ar' ? 'معاينة فورية' : 'Instant preview',
            currentLang === 'ar' ? 'دفع إلكتروني' : 'Online payment',
            currentLang === 'ar' ? 'إشعارات SMS' : 'SMS notifications'
          ]
        },
        {
          title: currentLang === 'ar' ? 'شهادة ميلاد' : 'Birth Certificate',
          description: currentLang === 'ar' ? 'استخراج شهادة ميلاد أصلية أو بدل فاقد' : 'Obtain original birth certificate or replacement',
          icon: FileText,
          iconColor: 'text-purple-600',
          bgColor: 'bg-purple-100',
          duration: currentLang === 'ar' ? '2-3 أيام' : '2-3 days',
          cost: currentLang === 'ar' ? '25 جنيه' : '25 EGP',
          rating: '4.9/5',
          requirements: [
            currentLang === 'ar' ? 'البطاقة الشخصية للأب/الأم' : 'Parent\'s national ID',
            currentLang === 'ar' ? 'شهادة زواج الوالدين' : 'Parents\' marriage certificate',
            currentLang === 'ar' ? 'إقرار بالولادة من المستشفى' : 'Hospital birth declaration'
          ],
          benefits: [
            currentLang === 'ar' ? 'معالجة سريعة' : 'Fast processing',
            currentLang === 'ar' ? 'تحقق تلقائي' : 'Auto verification',
            currentLang === 'ar' ? 'أرشيف رقمي' : 'Digital archive'
          ]
        },
        {
          title: currentLang === 'ar' ? 'شهادة زواج' : 'Marriage Certificate',
          description: currentLang === 'ar' ? 'توثيق عقد الزواج واستخراج الشهادات' : 'Document marriage contract and obtain certificates',
          icon: Heart,
          iconColor: 'text-pink-600',
          bgColor: 'bg-pink-100',
          duration: currentLang === 'ar' ? '1-2 يوم' : '1-2 days',
          cost: currentLang === 'ar' ? '75 جنيه' : '75 EGP',
          rating: '4.8/5',
          requirements: [
            currentLang === 'ar' ? 'البطاقات الشخصية للطرفين' : 'Both parties\' national IDs',
            currentLang === 'ar' ? 'شهادات الميلاد' : 'Birth certificates',
            currentLang === 'ar' ? 'شهود الزواج' : 'Marriage witnesses',
            currentLang === 'ar' ? 'الفحص الطبي' : 'Medical examination'
          ],
          benefits: [
            currentLang === 'ar' ? 'حجز موعد مسبق' : 'Advance booking',
            currentLang === 'ar' ? 'إرشاد قانوني' : 'Legal guidance',
            currentLang === 'ar' ? 'توثيق فوري' : 'Instant documentation'
          ]
        },
        {
          title: currentLang === 'ar' ? 'رخصة القيادة' : 'Driving License',
          description: currentLang === 'ar' ? 'استخراج أو تجديد رخصة القيادة' : 'Obtain or renew your driving license',
          icon: Car,
          iconColor: 'text-orange-600',
          bgColor: 'bg-orange-100',
          duration: currentLang === 'ar' ? '5-7 أيام' : '5-7 days',
          cost: currentLang === 'ar' ? '200 جنيه' : '200 EGP',
          rating: '4.6/5',
          requirements: [
            currentLang === 'ar' ? 'البطاقة الشخصية' : 'National ID',
            currentLang === 'ar' ? 'كشف طبي' : 'Medical report',
            currentLang === 'ar' ? 'اختبار القيادة' : 'Driving test',
            currentLang === 'ar' ? 'دورة تعليم قيادة' : 'Driving course certificate'
          ],
          benefits: [
            currentLang === 'ar' ? 'حجز اختبار القيادة' : 'Driving test booking',
            currentLang === 'ar' ? 'تدريب تفاعلي' : 'Interactive training',
            currentLang === 'ar' ? 'متابعة النتائج' : 'Results tracking'
          ]
        },
        {
          title: currentLang === 'ar' ? 'سجل جنائي' : 'Criminal Record',
          description: currentLang === 'ar' ? 'استخراج فيش وتشبيه للسفر والعمل' : 'Obtain criminal record certificate for travel and work',
          icon: Shield,
          iconColor: 'text-red-600',
          bgColor: 'bg-red-100',
          duration: currentLang === 'ar' ? '3-5 أيام' : '3-5 days',
          cost: currentLang === 'ar' ? '35 جنيه' : '35 EGP',
          rating: '4.7/5',
          requirements: [
            currentLang === 'ar' ? 'البطاقة الشخصية' : 'National ID',
            currentLang === 'ar' ? 'صورة شخصية' : 'Personal photo',
            currentLang === 'ar' ? 'طلب موثق' : 'Documented application'
          ],
          benefits: [
            currentLang === 'ar' ? 'معتمد دولياً' : 'Internationally recognized',
            currentLang === 'ar' ? 'ترجمة رسمية' : 'Official translation',
            currentLang === 'ar' ? 'تصديق إلكتروني' : 'Electronic attestation'
          ]
        }
      ],
      students: [
        {
          title: currentLang === 'ar' ? 'التقديم للجامعات' : 'University Application',
          description: currentLang === 'ar' ? 'التقديم لجامعات مصر والخارج' : 'Apply to Egyptian and international universities',
          icon: GraduationCap,
          iconColor: 'text-blue-600',
          bgColor: 'bg-blue-100',
          duration: currentLang === 'ar' ? '2-4 أسابيع' : '2-4 weeks',
          cost: currentLang === 'ar' ? 'حسب الجامعة' : 'Varies by university',
          rating: '4.8/5',
          requirements: [
            currentLang === 'ar' ? 'شهادة الثانوية العامة' : 'High school certificate',
            currentLang === 'ar' ? 'كشف درجات معتمد' : 'Certified transcript',
            currentLang === 'ar' ? 'شهادة ميلاد' : 'Birth certificate',
            currentLang === 'ar' ? 'صور شخصية' : 'Personal photos'
          ],
          benefits: [
            currentLang === 'ar' ? 'مقارنة الجامعات' : 'University comparison',
            currentLang === 'ar' ? 'حساب المعدل' : 'GPA calculator',
            currentLang === 'ar' ? 'متابعة القبول' : 'Admission tracking'
          ]
        },
        {
          title: currentLang === 'ar' ? 'توثيق الشهادات' : 'Certificate Authentication',
          description: currentLang === 'ar' ? 'توثيق الشهادات للسفر والعمل' : 'Authenticate certificates for travel and work',
          icon: Award,
          iconColor: 'text-green-600',
          bgColor: 'bg-green-100',
          duration: currentLang === 'ar' ? '5-7 أيام' : '5-7 days',
          cost: currentLang === 'ar' ? '100-300 جنيه' : '100-300 EGP',
          rating: '4.7/5',
          requirements: [
            currentLang === 'ar' ? 'الشهادات الأصلية' : 'Original certificates',
            currentLang === 'ar' ? 'البطاقة الشخصية' : 'National ID',
            currentLang === 'ar' ? 'صور الشهادات' : 'Certificate copies',
            currentLang === 'ar' ? 'طلب التوثيق' : 'Authentication request'
          ],
          benefits: [
            currentLang === 'ar' ? 'توثيق معتمد دولياً' : 'Internationally recognized',
            currentLang === 'ar' ? 'ترجمة معتمدة' : 'Certified translation',
            currentLang === 'ar' ? 'تصديق إلكتروني' : 'Electronic attestation'
          ]
        },
        {
          title: currentLang === 'ar' ? 'فيزا طلابية' : 'Student Visa',
          description: currentLang === 'ar' ? 'استخراج تأشيرة الدراسة بالخارج' : 'Obtain student visa for studying abroad',
          icon: Plane,
          iconColor: 'text-purple-600',
          bgColor: 'bg-purple-100',
          duration: currentLang === 'ar' ? '2-6 أسابيع' : '2-6 weeks',
          cost: currentLang === 'ar' ? 'حسب البلد' : 'Varies by country',
          rating: '4.6/5',
          requirements: [
            currentLang === 'ar' ? 'قبول جامعي' : 'University acceptance',
            currentLang === 'ar' ? 'كشف حساب بنكي' : 'Bank statement',
            currentLang === 'ar' ? 'تأمين صحي' : 'Health insurance',
            currentLang === 'ar' ? 'شهادة لغة' : 'Language certificate'
          ],
          benefits: [
            currentLang === 'ar' ? 'إرشاد متخصص' : 'Expert guidance',
            currentLang === 'ar' ? 'مراجعة الطلب' : 'Application review',
            currentLang === 'ar' ? 'متابعة السفارة' : 'Embassy follow-up'
          ]
        },
        {
          title: currentLang === 'ar' ? 'معادلة الشهادات' : 'Degree Equivalency',
          description: currentLang === 'ar' ? 'معادلة الشهادات الأجنبية في مصر' : 'Equivalency of foreign degrees in Egypt',
          icon: BookOpen,
          iconColor: 'text-orange-600',
          bgColor: 'bg-orange-100',
          duration: currentLang === 'ar' ? '4-8 أسابيع' : '4-8 weeks',
          cost: currentLang === 'ar' ? '500-1000 جنيه' : '500-1000 EGP',
          rating: '4.5/5',
          requirements: [
            currentLang === 'ar' ? 'الشهادات الأصلية مترجمة' : 'Original certificates translated',
            currentLang === 'ar' ? 'كشف درجات مفصل' : 'Detailed transcript',
            currentLang === 'ar' ? 'توثيق من البلد الأصلي' : 'Authentication from origin country',
            currentLang === 'ar' ? 'تصديق سفارة' : 'Embassy attestation'
          ],
          benefits: [
            currentLang === 'ar' ? 'تقييم مهني' : 'Professional evaluation',
            currentLang === 'ar' ? 'إرشاد أكاديمي' : 'Academic guidance',
            currentLang === 'ar' ? 'متابعة اللجان' : 'Committee follow-up'
          ]
        },
        {
          title: currentLang === 'ar' ? 'منح دراسية' : 'Scholarships',
          description: currentLang === 'ar' ? 'البحث والتقديم للمنح الدراسية' : 'Search and apply for scholarships',
          icon: Star,
          iconColor: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          duration: currentLang === 'ar' ? '1-3 أشهر' : '1-3 months',
          cost: currentLang === 'ar' ? 'مجاناً' : 'Free',
          rating: '4.9/5',
          requirements: [
            currentLang === 'ar' ? 'كشف درجات ممتاز' : 'Excellent transcript',
            currentLang === 'ar' ? 'خطاب دوافع' : 'Motivation letter',
            currentLang === 'ar' ? 'رسائل توصية' : 'Recommendation letters',
            currentLang === 'ar' ? 'اختبار كفاءة لغة' : 'Language proficiency test'
          ],
          benefits: [
            currentLang === 'ar' ? 'قاعدة منح شاملة' : 'Comprehensive scholarship database',
            currentLang === 'ar' ? 'مساعدة في الكتابة' : 'Writing assistance',
            currentLang === 'ar' ? 'تنبيهات المواعيد' : 'Deadline alerts'
          ]
        },
        {
          title: currentLang === 'ar' ? 'بطاقة الطالب الذكية' : 'Smart Student Card',
          description: currentLang === 'ar' ? 'استخراج بطاقة الطالب الذكية' : 'Obtain smart student ID card',
          icon: CreditCard,
          iconColor: 'text-indigo-600',
          bgColor: 'bg-indigo-100',
          duration: currentLang === 'ar' ? '3-5 أيام' : '3-5 days',
          cost: currentLang === 'ar' ? '30 جنيه' : '30 EGP',
          rating: '4.8/5',
          requirements: [
            currentLang === 'ar' ? 'إثبات قيد بالجامعة' : 'University enrollment proof',
            currentLang === 'ar' ? 'البطاقة الشخصية' : 'National ID',
            currentLang === 'ar' ? 'صورة شخصية' : 'Personal photo'
          ],
          benefits: [
            currentLang === 'ar' ? 'خصومات الطلاب' : 'Student discounts',
            currentLang === 'ar' ? 'دفع إلكتروني' : 'Electronic payment',
            currentLang === 'ar' ? 'دخول المكتبات' : 'Library access'
          ]
        }
      ],
      businesses: [
        {
          title: currentLang === 'ar' ? 'تأسيس شركة' : 'Company Registration',
          description: currentLang === 'ar' ? 'تسجيل شركة جديدة في السجل التجاري' : 'Register a new company in commercial registry',
          icon: Building,
          iconColor: 'text-blue-600',
          bgColor: 'bg-blue-100',
          duration: currentLang === 'ar' ? '7-14 يوم' : '7-14 days',
          cost: currentLang === 'ar' ? '500-2000 جنيه' : '500-2000 EGP',
          rating: '4.8/5',
          requirements: [
            currentLang === 'ar' ? 'عقد التأسيس' : 'Articles of incorporation',
            currentLang === 'ar' ? 'عنوان الشركة' : 'Company address',
            currentLang === 'ar' ? 'رأس المال المدفوع' : 'Paid-up capital',
            currentLang === 'ar' ? 'هوية المؤسسين' : 'Founders\' IDs'
          ],
          benefits: [
            currentLang === 'ar' ? 'إجراءات مؤتمتة' : 'Automated procedures',
            currentLang === 'ar' ? 'استشارة قانونية' : 'Legal consultation',
            currentLang === 'ar' ? 'متابعة شاملة' : 'Comprehensive follow-up'
          ]
        },
        {
          title: currentLang === 'ar' ? 'ترخيص تجاري' : 'Commercial License',
          description: currentLang === 'ar' ? 'استخراج التراخيص التجارية للأنشطة' : 'Obtain commercial licenses for business activities',
          icon: Award,
          iconColor: 'text-green-600',
          bgColor: 'bg-green-100',
          duration: currentLang === 'ar' ? '10-21 يوم' : '10-21 days',
          cost: currentLang === 'ar' ? '200-1000 جنيه' : '200-1000 EGP',
          rating: '4.7/5',
          requirements: [
            currentLang === 'ar' ? 'السجل التجاري' : 'Commercial registry',
            currentLang === 'ar' ? 'عقد إيجار المحل' : 'Shop rental contract',
            currentLang === 'ar' ? 'موافقة الحي' : 'District approval',
            currentLang === 'ar' ? 'شهادة صحية' : 'Health certificate'
          ],
          benefits: [
            currentLang === 'ar' ? 'تصنيف الأنشطة' : 'Activity classification',
            currentLang === 'ar' ? 'حساب الرسوم' : 'Fee calculation',
            currentLang === 'ar' ? 'تجديد تلقائي' : 'Auto renewal'
          ]
        },
        {
          title: currentLang === 'ar' ? 'التسجيل الضريبي' : 'Tax Registration',
          description: currentLang === 'ar' ? 'تسجيل الشركة في مصلحة الضرائب' : 'Register company with tax authority',
          icon: FileText,
          iconColor: 'text-purple-600',
          bgColor: 'bg-purple-100',
          duration: currentLang === 'ar' ? '3-7 أيام' : '3-7 days',
          cost: currentLang === 'ar' ? 'مجاناً' : 'Free',
          rating: '4.9/5',
          requirements: [
            currentLang === 'ar' ? 'السجل التجاري' : 'Commercial registry',
            currentLang === 'ar' ? 'البطاقة الضريبية للمالك' : 'Owner\'s tax card',
            currentLang === 'ar' ? 'عقد تأسيس الشركة' : 'Company incorporation deed',
            currentLang === 'ar' ? 'عقد إيجار المقر' : 'Premises rental contract'
          ],
          benefits: [
            currentLang === 'ar' ? 'رقم ضريبي فوري' : 'Instant tax number',
            currentLang === 'ar' ? 'ربط إلكتروني' : 'Electronic linking',
            currentLang === 'ar' ? 'خدمات ضريبية' : 'Tax services'
          ]
        },
        {
          title: currentLang === 'ar' ? 'تصاريح الاستيراد' : 'Import Permits',
          description: currentLang === 'ar' ? 'استخراج تصاريح استيراد البضائع' : 'Obtain permits for importing goods',
          icon: Globe,
          iconColor: 'text-orange-600',
          bgColor: 'bg-orange-100',
          duration: currentLang === 'ar' ? '5-15 يوم' : '5-15 days',
          cost: currentLang === 'ar' ? '300-1500 جنيه' : '300-1500 EGP',
          rating: '4.6/5',
          requirements: [
            currentLang === 'ar' ? 'السجل في غرفة التجارة' : 'Chamber of Commerce registration',
            currentLang === 'ar' ? 'البطاقة الاستيرادية' : 'Import card',
            currentLang === 'ar' ? 'فاتورة أولية' : 'Pro forma invoice',
            currentLang === 'ar' ? 'شهادة منشأ' : 'Certificate of origin'
          ],
          benefits: [
            currentLang === 'ar' ? 'تصنيف الهارمونيك' : 'Harmonic classification',
            currentLang === 'ar' ? 'حساب الجمارك' : 'Customs calculation',
            currentLang === 'ar' ? 'تتبع الشحنات' : 'Shipment tracking'
          ]
        },
        {
          title: currentLang === 'ar' ? 'تصاريح العمل' : 'Work Permits',
          description: currentLang === 'ar' ? 'استخراج تصاريح عمل للموظفين الأجانب' : 'Obtain work permits for foreign employees',
          icon: Users,
          iconColor: 'text-red-600',
          bgColor: 'bg-red-100',
          duration: currentLang === 'ar' ? '14-30 يوم' : '14-30 days',
          cost: currentLang === 'ar' ? '1000-3000 جنيه' : '1000-3000 EGP',
          rating: '4.5/5',
          requirements: [
            currentLang === 'ar' ? 'عقد العمل' : 'Employment contract',
            currentLang === 'ar' ? 'جواز سفر الموظف' : 'Employee passport',
            currentLang === 'ar' ? 'المؤهلات العلمية' : 'Educational qualifications',
            currentLang === 'ar' ? 'كشف طبي' : 'Medical certificate'
          ],
          benefits: [
            currentLang === 'ar' ? 'إجراءات مبسطة' : 'Simplified procedures',
            currentLang === 'ar' ? 'متابعة قانونية' : 'Legal follow-up',
            currentLang === 'ar' ? 'تجديد سنوي' : 'Annual renewal'
          ]
        },
        {
          title: currentLang === 'ar' ? 'شهادات الجودة' : 'Quality Certificates',
          description: currentLang === 'ar' ? 'الحصول على شهادات الجودة والمطابقة' : 'Obtain quality and compliance certificates',
          icon: Shield,
          iconColor: 'text-teal-600',
          bgColor: 'bg-teal-100',
          duration: currentLang === 'ar' ? '15-45 يوم' : '15-45 days',
          cost: currentLang === 'ar' ? '2000-10000 جنيه' : '2000-10000 EGP',
          rating: '4.7/5',
          requirements: [
            currentLang === 'ar' ? 'دليل الجودة' : 'Quality manual',
            currentLang === 'ar' ? 'إجراءات موثقة' : 'Documented procedures',
            currentLang === 'ar' ? 'تدريب الموظفين' : 'Staff training',
            currentLang === 'ar' ? 'مراجعة داخلية' : 'Internal audit'
          ],
          benefits: [
            currentLang === 'ar' ? 'معتمدة دولياً' : 'Internationally recognized',
            currentLang === 'ar' ? 'تحسين الكفاءة' : 'Efficiency improvement',
            currentLang === 'ar' ? 'ميزة تنافسية' : 'Competitive advantage'
          ]
        }
      ],
      tourists: [
        {
          title: currentLang === 'ar' ? 'فيزا سياحية' : 'Tourist Visa',
          description: currentLang === 'ar' ? 'استخراج تأشيرة الدخول السياحية لمصر' : 'Obtain tourist entry visa for Egypt',
          icon: Plane,
          iconColor: 'text-blue-600',
          bgColor: 'bg-blue-100',
          duration: currentLang === 'ar' ? '3-7 أيام' : '3-7 days',
          cost: currentLang === 'ar' ? '$25-60' : '$25-60',
          rating: '4.8/5',
          requirements: [
            currentLang === 'ar' ? 'جواز سفر ساري' : 'Valid passport',
            currentLang === 'ar' ? 'صورة شخصية' : 'Personal photo',
            currentLang === 'ar' ? 'حجز طيران' : 'Flight booking',
            currentLang === 'ar' ? 'حجز فندق' : 'Hotel reservation'
          ],
          benefits: [
            currentLang === 'ar' ? 'فيزا إلكترونية' : 'E-visa available',
            currentLang === 'ar' ? 'معالجة سريعة' : 'Fast processing',
            currentLang === 'ar' ? 'دعم متعدد اللغات' : 'Multi-language support'
          ]
        },
        {
          title: currentLang === 'ar' ? 'تمديد الإقامة' : 'Residence Extension',
          description: currentLang === 'ar' ? 'تمديد فترة الإقامة السياحية في مصر' : 'Extend tourist residence period in Egypt',
          icon: Clock,
          iconColor: 'text-green-600',
          bgColor: 'bg-green-100',
          duration: currentLang === 'ar' ? '2-5 أيام' : '2-5 days',
          cost: currentLang === 'ar' ? '$20-40' : '$20-40',
          rating: '4.7/5',
          requirements: [
            currentLang === 'ar' ? 'جواز السفر الأصلي' : 'Original passport',
            currentLang === 'ar' ? 'فيزا الدخول' : 'Entry visa',
            currentLang === 'ar' ? 'إثبات إقامة' : 'Proof of accommodation',
            currentLang === 'ar' ? 'كشف حساب بنكي' : 'Bank statement'
          ],
          benefits: [
            currentLang === 'ar' ? 'تمديد متعدد' : 'Multiple extensions',
            currentLang === 'ar' ? 'إجراءات مبسطة' : 'Simplified procedures',
            currentLang === 'ar' ? 'خدمة عبر الإنترنت' : 'Online service'
          ]
        },
        {
          title: currentLang === 'ar' ? 'تصاريح المواقع الأثرية' : 'Archaeological Site Permits',
          description: currentLang === 'ar' ? 'تصاريح خاصة لزيارة المواقع الأثرية المحدودة' : 'Special permits for restricted archaeological sites',
          icon: MapPin,
          iconColor: 'text-purple-600',
          bgColor: 'bg-purple-100',
          duration: currentLang === 'ar' ? '1-3 أيام' : '1-3 days',
          cost: currentLang === 'ar' ? '$10-50' : '$10-50',
          rating: '4.9/5',
          requirements: [
            currentLang === 'ar' ? 'فيزا سياحية سارية' : 'Valid tourist visa',
            currentLang === 'ar' ? 'هوية شخصية' : 'Personal ID',
            currentLang === 'ar' ? 'حجز مرشد سياحي' : 'Tour guide booking',
            currentLang === 'ar' ? 'تأمين سياحي' : 'Travel insurance'
          ],
          benefits: [
            currentLang === 'ar' ? 'وصول حصري' : 'Exclusive access',
            currentLang === 'ar' ? 'مرشدين متخصصين' : 'Specialized guides',
            currentLang === 'ar' ? 'تجربة ثقافية فريدة' : 'Unique cultural experience'
          ]
        },
        {
          title: currentLang === 'ar' ? 'تأمين سياحي' : 'Travel Insurance',
          description: currentLang === 'ar' ? 'تأمين شامل للرحلات السياحية' : 'Comprehensive travel insurance coverage',
          icon: Shield,
          iconColor: 'text-orange-600',
          bgColor: 'bg-orange-100',
          duration: currentLang === 'ar' ? 'فوري' : 'Instant',
          cost: currentLang === 'ar' ? '$15-100' : '$15-100',
          rating: '4.8/5',
          requirements: [
            currentLang === 'ar' ? 'تفاصيل الرحلة' : 'Trip details',
            currentLang === 'ar' ? 'معلومات شخصية' : 'Personal information',
            currentLang === 'ar' ? 'حالة صحية' : 'Health status'
          ],
          benefits: [
            currentLang === 'ar' ? 'تغطية طبية' : 'Medical coverage',
            currentLang === 'ar' ? 'إلغاء الرحلة' : 'Trip cancellation',
            currentLang === 'ar' ? 'فقدان الأمتعة' : 'Baggage loss'
          ]
        },
        {
          title: currentLang === 'ar' ? 'خدمات الطوارئ' : 'Emergency Services',
          description: currentLang === 'ar' ? 'مساعدة الطوارئ للسياح على مدار الساعة' : '24/7 emergency assistance for tourists',
          icon: Phone,
          iconColor: 'text-red-600',
          bgColor: 'bg-red-100',
          duration: currentLang === 'ar' ? 'فوري' : 'Immediate',
          cost: currentLang === 'ar' ? 'مجاناً' : 'Free',
          rating: '4.9/5',
          requirements: [
            currentLang === 'ar' ? 'جواز السفر' : 'Passport',
            currentLang === 'ar' ? 'معلومات الطوارئ' : 'Emergency details'
          ],
          benefits: [
            currentLang === 'ar' ? 'خط ساخن 24/7' : '24/7 hotline',
            currentLang === 'ar' ? 'ترجمة ف��رية' : 'Instant translation',
            currentLang === 'ar' ? 'تنسيق مع السفارات' : 'Embassy coordination'
          ]
        },
        {
          title: currentLang === 'ar' ? 'استرداد الضريبة' : 'Tax Refund',
          description: currentLang === 'ar' ? 'استرداد ضريبة القيمة المضافة للمشتريات' : 'VAT refund on purchases for tourists',
          icon: DollarSign,
          iconColor: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          duration: currentLang === 'ar' ? '7-14 يوم' : '7-14 days',
          cost: currentLang === 'ar' ? 'عمولة 3%' : '3% commission',
          rating: '4.6/5',
          requirements: [
            currentLang === 'ar' ? 'فواتير المشتريات' : 'Purchase receipts',
            currentLang === 'ar' ? 'جواز السفر' : 'Passport',
            currentLang === 'ar' ? 'تذكرة الطيران' : 'Flight ticket',
            currentLang === 'ar' ? 'نماذج الاسترداد' : 'Refund forms'
          ],
          benefits: [
            currentLang === 'ar' ? 'استرداد حتى 14%' : 'Up to 14% refund',
            currentLang === 'ar' ? 'معالجة إلكترونية' : 'Electronic processing',
            currentLang === 'ar' ? 'تحويل بنكي' : 'Bank transfer'
          ]
        }
      ]
    };

    return services[categoryId as keyof typeof services] || [];
  };

  const stats = [
    { label: t.overallStats.timesSaved, value: '50,000+', icon: Clock },
    { label: t.overallStats.usersSatisfied, value: '25,000+', icon: UserCheck },
    { label: t.overallStats.servicesOffered, value: '200+', icon: FileText },
    { label: t.overallStats.successRate, value: '98%', icon: Award }
  ];

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`}>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-secondary/10 to-primary/5 py-16 lg:py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Text Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl text-primary leading-tight">
                  {t.heroTitle}
                </h1>
                <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl">
                  {t.heroSubtitle}
                </p>
              </div>
              
              {/* Search Bar */}
              <div className="bg-white rounded-lg shadow-lg p-2 max-w-md">
                <div className="flex items-center space-x-3">
                  <Search className="h-5 w-5 text-muted-foreground ml-3" />
                  <input 
                    type="text" 
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 py-3 px-2 bg-transparent border-none outline-none"
                  />
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => {
                      if (searchQuery.trim()) {
                        // Filter services based on search
                        const allServices = [
                          ...getServicesForCategory('citizens'),
                          ...getServicesForCategory('students'),
                          ...getServicesForCategory('businesses'),
                          ...getServicesForCategory('tourists')
                        ];
                        const filtered = allServices.filter(service => 
                          service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                        setFilteredServices(filtered);
                      }
                    }}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={() => onOpenChatbot && onOpenChatbot()}
              >
                {t.tryDaleel}
                <ArrowRight className={`h-5 w-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
            </div>
            
            {/* Illustration */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Central Image */}
                <div className="relative bg-gradient-to-br from-primary/5 via-secondary/10 to-primary/5 rounded-xl shadow-lg p-12 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <img 
                      src={logoImage} 
                      alt={currentLang === 'ar' ? 'شعار مساعد مصر الذكي' : 'Masr AI Agent Logo'}
                      className="h-32 w-auto mx-auto object-contain drop-shadow-lg"
                    />
                    <div className="text-primary text-lg">
                      {currentLang === 'ar' ? 'مساعد مصر الذكي' : 'Masr AI Agent'}
                    </div>
                    <div className="text-secondary text-sm">
                      {currentLang === 'ar' ? 'مساعدك الذكي للخدمات الحكومية' : 'Your Smart Government Services Assistant'}
                    </div>
                  </div>
                </div>
                
                {/* Floating Icons */}
                <div className="absolute -top-4 -left-4 bg-blue-100 p-3 rounded-full shadow-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="absolute -top-4 -right-4 bg-purple-100 p-3 rounded-full shadow-lg">
                  <GraduationCap className="h-6 w-6 text-purple-600" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-green-100 p-3 rounded-full shadow-lg">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-orange-100 p-3 rounded-full shadow-lg">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {searchQuery && filteredServices.length > 0 && (
        <section className="py-8 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h3 className="text-xl text-primary mb-2">
                {currentLang === 'ar' ? `نتائج البحث عن "${searchQuery}"` : `Search results for "${searchQuery}"`}
              </h3>
              <p className="text-muted-foreground">
                {currentLang === 'ar' ? `تم العثور على ${filteredServices.length} خدمة` : `Found ${filteredServices.length} services`}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.slice(0, 6).map((service, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${service.bgColor}`}>
                        <service.icon className={`h-5 w-5 ${service.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {service.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => onOpenChatbot && onOpenChatbot()}
                    >
                      {currentLang === 'ar' ? 'ابدأ الآن' : 'Start Now'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredServices.length > 6 && (
              <div className="text-center mt-6">
                <Button 
                  variant="outline"
                  onClick={() => {
                    // Clear search to show all services
                    setSearchQuery('');
                    setFilteredServices([]);
                  }}
                >
                  {currentLang === 'ar' ? 'عرض جميع الخدمات' : 'View All Services'}
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-12 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl lg:text-3xl text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions by Category */}
      <section className="py-16 lg:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">
              {t.solutionsByCategory}
            </h2>
          </div>
          
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex flex-col items-center space-y-2 p-4 h-auto data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <category.icon className="h-6 w-6" />
                  <span className="text-sm">{category.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-8">
                {/* Category Overview */}
                <Card className={`border-2 ${category.borderColor} bg-gradient-to-r ${category.bgColor}`}>
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <category.icon className={`h-12 w-12 ${category.iconColor}`} />
                      </div>
                      <div className="flex-1 space-y-4">
                        <h3 className="text-2xl text-primary">{category.title}</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {category.description}
                        </p>
                        
                        {/* Category Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                          <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                            <div className="text-lg text-primary">{category.stats.totalUsers || category.stats.totalClients || category.stats.totalVisitors}</div>
                            <div className="text-sm text-muted-foreground">{t.totalUsers}</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                            <div className="text-lg text-primary">{category.stats.avgTimeSaved}</div>
                            <div className="text-sm text-muted-foreground">{t.avgTimeSaved}</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                            <div className="text-lg text-primary">{category.stats.successRate}</div>
                            <div className="text-sm text-muted-foreground">{t.successRate}</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                            <div className="text-lg text-primary">{category.stats.satisfactionScore}</div>
                            <div className="text-sm text-muted-foreground">{t.satisfaction}</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-4xl">{category.illustration}</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Available Services Section - NOW COMES FIRST */}
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl text-primary mb-2">
                      {currentLang === 'ar' ? 'الخدمات المتاحة' : 'Available Services'}
                    </h3>
                    <p className="text-muted-foreground">
                      {currentLang === 'ar' 
                        ? 'اكتشف جميع الخدمات التي نقدمها لهذه الفئة' 
                        : 'Discover all the services we offer for this category'
                      }
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getServicesForCategory(category.id).map((service, index) => (
                      <Card key={index} className="border-2 hover:shadow-lg transition-all duration-300 group hover:border-primary/50">
                        <CardHeader className="pb-3">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${service.bgColor}`}>
                              <service.icon className={`h-5 w-5 ${service.iconColor}`} />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg">{service.title}</CardTitle>
                              <CardDescription className="text-sm">
                                {service.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          {/* Service Details */}
                          <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="bg-muted/50 rounded-lg p-2">
                              <Clock className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                              <div className="text-xs text-muted-foreground">
                                {currentLang === 'ar' ? 'المدة' : 'Duration'}
                              </div>
                              <div className="text-sm">{service.duration}</div>
                            </div>
                            <div className="bg-muted/50 rounded-lg p-2">
                              <DollarSign className="h-4 w-4 mx-auto mb-1 text-green-600" />
                              <div className="text-xs text-muted-foreground">
                                {currentLang === 'ar' ? 'التكلفة' : 'Cost'}
                              </div>
                              <div className="text-sm">{service.cost}</div>
                            </div>
                            <div className="bg-muted/50 rounded-lg p-2">
                              <Star className="h-4 w-4 mx-auto mb-1 text-yellow-600" />
                              <div className="text-xs text-muted-foreground">
                                {currentLang === 'ar' ? 'التقييم' : 'Rating'}
                              </div>
                              <div className="text-sm">{service.rating}</div>
                            </div>
                          </div>
                          
                          {/* Requirements */}
                          <div>
                            <h5 className="text-sm text-primary mb-2 flex items-center">
                              <FileText className="h-4 w-4 mr-1" />
                              {currentLang === 'ar' ? 'المتطلبات' : 'Requirements'}
                            </h5>
                            <div className="space-y-1">
                              {service.requirements.slice(0, 2).map((req, idx) => (
                                <div key={idx} className="flex items-center text-xs text-muted-foreground">
                                  <CheckCircle className="h-3 w-3 mr-2 text-green-500 flex-shrink-0" />
                                  {req}
                                </div>
                              ))}
                              {service.requirements.length > 2 && (
                                <div className="text-xs text-primary">
                                  +{service.requirements.length - 2} {currentLang === 'ar' ? 'متطلب إضافي' : 'more requirements'}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Benefits */}
                          <div>
                            <h5 className="text-sm text-primary mb-2 flex items-center">
                              <Zap className="h-4 w-4 mr-1" />
                              {currentLang === 'ar' ? 'المميزات' : 'Benefits'}
                            </h5>
                            <div className="flex flex-wrap gap-1">
                              {service.benefits.map((benefit, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {benefit}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          {/* Action Button */}
                          <Button 
                            className="w-full bg-primary hover:bg-primary/90 group-hover:shadow-md transition-all"
                            onClick={() => onOpenChatbot && onOpenChatbot()}
                          >
                            {currentLang === 'ar' ? 'ابدأ الآن' : 'Start Now'}
                            <ArrowRight className={`h-4 w-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Why Choose Daleel Section */}
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl lg:text-3xl text-primary mb-2">
                      {currentLang === 'ar' ? 'لماذا تختار دليل؟' : 'Why Choose Daleel?'}
                    </h3>
                    <p className="text-muted-foreground">
                      {currentLang === 'ar' 
                        ? 'نوفر لك تجربة استثنائية في التعامل مع الخدمات الحكومية' 
                        : 'We provide you with an exceptional government services experience'
                      }
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Feature 1: AI-Powered Guidance */}
                    <Card className="border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group">
                      <CardContent className="p-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Zap className="h-7 w-7 text-white" />
                        </div>
                        <h4 className="text-lg mb-2 text-primary">
                          {currentLang === 'ar' ? 'مساعد ذكي متطور' : 'Advanced AI Assistant'}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {currentLang === 'ar' 
                            ? 'يفهم اللهجة المصرية ويقدم إرشادات دقيقة خطوة بخطوة لكل خدمة حكومية'
                            : 'Understands Egyptian dialect and provides precise step-by-step guidance for every government service'
                          }
                        </p>
                      </CardContent>
                    </Card>

                    {/* Feature 2: Time Savings */}
                    <Card className="border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group">
                      <CardContent className="p-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Timer className="h-7 w-7 text-white" />
                        </div>
                        <h4 className="text-lg mb-2 text-primary">
                          {currentLang === 'ar' ? 'وفّر وقتك ومجهودك' : 'Save Time & Effort'}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {currentLang === 'ar' 
                            ? 'متوسط توفير 18+ ساعة لكل خدمة - لا مزيد من الدوران في المصالح'
                            : 'Average savings of 18+ hours per service - no more running around offices'
                          }
                        </p>
                      </CardContent>
                    </Card>

                    {/* Feature 3: 100% Accuracy */}
                    <Card className="border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group">
                      <CardContent className="p-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Target className="h-7 w-7 text-white" />
                        </div>
                        <h4 className="text-lg mb-2 text-primary">
                          {currentLang === 'ar' ? 'دقة 100%' : '100% Accuracy'}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {currentLang === 'ar' 
                            ? 'معلومات محدثة وموثقة لجميع المتطلبات - لا مزيد من الأوراق الناقصة'
                            : 'Updated and verified information for all requirements - no more missing documents'
                          }
                        </p>
                      </CardContent>
                    </Card>

                    {/* Feature 4: 24/7 Support */}
                    <Card className="border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group">
                      <CardContent className="p-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Clock className="h-7 w-7 text-white" />
                        </div>
                        <h4 className="text-lg mb-2 text-primary">
                          {currentLang === 'ar' ? 'دعم على مدار الساعة' : '24/7 Support'}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {currentLang === 'ar' 
                            ? 'مساعد ذكي متاح دائماً للإجابة على أسئلتك في أي وقت'
                            : 'AI assistant always available to answer your questions anytime'
                          }
                        </p>
                      </CardContent>
                    </Card>

                    {/* Feature 5: Cost Effective */}
                    <Card className="border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group">
                      <CardContent className="p-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <DollarSign className="h-7 w-7 text-white" />
                        </div>
                        <h4 className="text-lg mb-2 text-primary">
                          {currentLang === 'ar' ? 'وفّر التكاليف' : 'Cost Effective'}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {currentLang === 'ar' 
                            ? 'قلل تكاليف النقل والوسطاء - خدمة مجانية بالكامل'
                            : 'Reduce transportation and intermediary costs - completely free service'
                          }
                        </p>
                      </CardContent>
                    </Card>

                    {/* Feature 6: High Success Rate */}
                    <Card className="border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group">
                      <CardContent className="p-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <ThumbsUp className="h-7 w-7 text-white" />
                        </div>
                        <h4 className="text-lg mb-2 text-primary">
                          {currentLang === 'ar' ? 'معدل نجاح عالي' : 'High Success Rate'}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {currentLang === 'ar' 
                            ? 'أكثر من 96% معدل نجاح في إتمام الخدمات من أول مرة'
                            : 'Over 96% success rate in completing services on the first attempt'
                          }
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Impact Stats */}
                  <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 mt-8">
                    <CardContent className="p-8">
                      <h4 className="text-center text-xl mb-6 text-primary">
                        {currentLang === 'ar' ? 'تأثيرنا الحقيقي' : 'Our Real Impact'}
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                          <div className="text-3xl lg:text-4xl text-primary mb-2">
                            {category.stats.totalUsers || category.stats.totalClients || category.stats.totalVisitors}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {currentLang === 'ar' ? 'مستخدم راضي' : 'Satisfied Users'}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl lg:text-4xl text-green-600 mb-2">
                            {category.stats.avgTimeSaved}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {currentLang === 'ar' ? 'وقت موفر بالمتوسط' : 'Avg Time Saved'}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl lg:text-4xl text-blue-600 mb-2">
                            {category.stats.successRate}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {currentLang === 'ar' ? 'معدل النجاح' : 'Success Rate'}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl lg:text-4xl text-yellow-600 mb-2">
                            {category.stats.satisfactionScore}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {currentLang === 'ar' ? 'تقييم الرضا' : 'Satisfaction Score'}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-20 px-4 bg-gradient-to-br from-primary to-primary/80">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl lg:text-4xl mb-6">
            {t.ctaTitle}
          </h2>
          <Button 
            size="lg" 
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg hover:shadow-xl transition-all"
            onClick={() => onOpenChatbot && onOpenChatbot()}
          >
            {t.ctaButton}
            <Search className={`h-5 w-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
          </Button>
        </div>
      </section>
    </div>
  );
}