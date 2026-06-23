import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  HeadphonesIcon,
  Building2,
  CheckCircle2,
  Sparkles,
  Calendar,
  ExternalLink,
  Rocket
} from 'lucide-react';
import { toast } from "sonner";

interface ContactPageProps {
  currentLang: 'ar';
  onPageChange: (page: string) => void;
}

export function ContactPage({ onPageChange }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    category: '',
    priority: 'medium'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [showFloatingChat, setShowFloatingChat] = useState(true);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message || !formData.category) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      toast.success('✔️ تم إرسال رسالتك بنجاح');
      setIsSubmitting(false);

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        category: '',
        priority: 'medium'
      });
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'الهاتف',
      value: '+20 2 1234 5678',
      desc: 'اتصل بنا مباشرة',
      color: 'from-red-500 to-red-600',
      iconColor: 'text-white-600'
    },
    {
      icon: Building2,
      title: 'البريد التجاري',
      value: 'business@masragent.com',
      desc: 'للشراكات والمؤسسات',
      color: 'from-blue-500 to-blue-600',
      iconColor: 'text-white-600'
    },
    {
      icon: HeadphonesIcon,
      title: 'الدعم التقني',
      value: 'support@masragent.com',
      desc: 'المساعدة والدعم الفني',
      color: 'from-green-500 to-green-600',
      iconColor: 'text-white-600'
    },
    {
      icon: Mail,
      title: 'البريد العام',
      value: 'hello@masragent.com',
      desc: 'للاستفسارات العامة',
      color: 'from-purple-500 to-purple-600',
      iconColor: 'text-white-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 rtl font-arabic" dir="rtl">
      {/* Modern Header */}
      <section className="bg-gradient-to-br from-[#C62828] via-[#B71C1C] to-[#D32F2F] py-20 px-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm mb-6">
            <Sparkles className="h-4 w-4" />
            <span>دعم متميز على مدار الساعة</span>
          </div>

          <h1 className="text-5xl md:text-6xl text-white mb-6 leading-tight">
            تواصل معنا — نحن هنا لمساعدتك
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            فريقنا جاهز للإجابة على جميع استفساراتك وتقديم أفضل الحلول لاحتياجاتك
          </p>
        </div>
      </section>

      {/* Contact Methods Cards */}
      <section className="px-4 -mt-12 relative z-20 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white rounded-3xl overflow-hidden group"
              >
                <CardContent className="p-8 text-center">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${method.color} bg-opacity-10 inline-block mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className={`h-8 w-8 ${method.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{method.title}</h3>
                  <p className="text-[#C62828] font-medium mb-2 text-lg">{method.value}</p>
                  <p className="text-sm text-gray-500">{method.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-white p-8 border-b">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#C62828]/10 rounded-2xl">
                      <MessageCircle className="h-7 w-7 text-[#C62828]" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl text-gray-800">نموذج التواصل</CardTitle>
                      <CardDescription className="text-gray-600 mt-2 text-base">
                        املأ النموذج أدناه وسنعاود الاتصال بك في أقرب وقت ممكن
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-base font-medium">
                          الاسم الكامل <span className="text-[#C62828]">*</span>
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="أدخل اسمك الكامل"
                          className="h-12 rounded-2xl border-gray-200 focus:border-[#C62828] focus:ring-[#C62828]"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-base font-medium">
                          البريد الإلكتروني <span className="text-[#C62828]">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="example@domain.com"
                          className="h-12 rounded-2xl border-gray-200 focus:border-[#C62828] focus:ring-[#C62828]"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone & Company */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-base font-medium">رقم الهاتف</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+20 xxx xxx xxxx"
                          className="h-12 rounded-2xl border-gray-200 focus:border-[#C62828] focus:ring-[#C62828]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-base font-medium">اسم الشركة/المؤسسة</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          placeholder="اسم شركتك (اختياري)"
                          className="h-12 rounded-2xl border-gray-200 focus:border-[#C62828] focus:ring-[#C62828]"
                        />
                      </div>
                    </div>

                    {/* Category & Priority */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-base font-medium">
                          نوع الاستفسار <span className="text-[#C62828]">*</span>
                        </Label>
                        <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                          <SelectTrigger className="h-12 rounded-2xl border-gray-200">
                            <SelectValue placeholder="اختر نوع الاستفسار" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">استفسار عام</SelectItem>
                            <SelectItem value="support">دعم تقني</SelectItem>
                            <SelectItem value="business">شراكة تجارية</SelectItem>
                            <SelectItem value="feedback">تعليقات واقتراحات</SelectItem>
                            <SelectItem value="demo">طلب عرض تجريبي</SelectItem>
                            <SelectItem value="other">أخرى</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority" className="text-base font-medium">مستوى الأولوية</Label>
                        <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                          <SelectTrigger className="h-12 rounded-2xl border-gray-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">منخفض</SelectItem>
                            <SelectItem value="medium">متوسط</SelectItem>
                            <SelectItem value="high">عالي</SelectItem>
                            <SelectItem value="urgent">عاجل</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-base font-medium">الموضوع</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="موضوع الرسالة"
                        className="h-12 rounded-2xl border-gray-200 focus:border-[#C62828] focus:ring-[#C62828]"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-base font-medium">
                        رسالتك <span className="text-[#C62828]">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="اكتب رسالتك هنا..."
                        rows={6}
                        className="rounded-2xl border-gray-200 focus:border-[#C62828] focus:ring-[#C62828] resize-none"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#C62828] to-[#D32F2F] hover:from-[#B71C1C] hover:to-[#C62828] text-white text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          <span>جاري الإرسال...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Rocket className="h-5 w-5" />
                          <span>إرسال الرسالة</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Info */}
              <Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-br from-[#C62828] to-[#D32F2F] text-white p-6">
                  <CardTitle className="text-2xl text-white">معلومات الشركة</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#C62828]/10 rounded-xl flex-shrink-0">
                      <MapPin className="h-6 w-6 text-[#C62828]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-1">الموقع</p>
                      <p className="text-gray-600 text-sm leading-relaxed">القرية الذكية، الجيزة، مصر</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 text-[#C62828] hover:text-[#B71C1C] hover:bg-[#C62828]/10 p-0 h-auto"
                      >
                        <ExternalLink className="h-4 w-4 ml-1" />
                        عرض على الخريطة
                      </Button>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#C62828]/10 rounded-xl flex-shrink-0">
                      <Clock className="h-6 w-6 text-[#C62828]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-1">ساعات العمل</p>
                      <p className="text-gray-600 text-sm">الأحد – الخميس</p>
                      <p className="text-gray-600 text-sm">9:00 ص – 6:00 م</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-600 text-sm font-medium">مفتوح الآن</span>
                      </div>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#C62828]/10 rounded-xl flex-shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-[#C62828]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-1">وقت الاستجابة</p>
                      <p className="text-gray-600 text-sm">عادة خلال 2–4 ساعات</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
