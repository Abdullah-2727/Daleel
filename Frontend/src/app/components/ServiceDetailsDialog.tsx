import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Clock, DollarSign, FileText, Users, AlertCircle, CheckCircle, Zap } from 'lucide-react';

interface ServiceDetailsDialogProps {
  service: {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    status: string;
    processingTime: string;
    fee: string;
    popular?: boolean;
  };
  currentLang: 'en' | 'ar';
  onAutomationClick: () => void;
  children: React.ReactNode;
}

export function ServiceDetailsDialog({ service, currentLang, onAutomationClick, children }: ServiceDetailsDialogProps) {
  const translations = {
    en: {
      serviceDetails: 'Service Details',
      processingTime: 'Processing Time',
      serviceFee: 'Service Fee',
      requirements: 'Requirements',
      howItWorks: 'How It Works',
      nextSteps: 'Next Steps',
      applyNow: 'Apply Now with AI Automation',
      closeDialog: 'Close',
      step1: '1. Collect required documents',
      step2: '2. Fill application form',
      step3: '3. Pay service fee',
      step4: '4. Submit and track application',
      reqDoc1: 'Valid National ID',
      reqDoc2: 'Recent photographs',
      reqDoc3: 'Supporting documents',
      reqDoc4: 'Payment confirmation',
      autoApply: 'Use AI automation to apply for this service instantly without manual form filling.',
      popular: 'Popular Service',
      digital: 'Digital Available',
      inPerson: 'In-Person Only',
      both: 'Digital & In-Person'
    },
    ar: {
      serviceDetails: 'تفاصيل الخدمة',
      processingTime: 'وقت المعالجة',
      serviceFee: 'رسوم الخدمة',
      requirements: 'المتطلبات',
      howItWorks: 'كيف تعمل',
      nextSteps: 'الخطوات التالية',
      applyNow: 'تقدم الآن بالذكاء الاصطناعي',
      closeDialog: 'إغلاق',
      step1: '1. جمع الوثائق المطلوبة',
      step2: '2. تعبئة نموذج الطلب',
      step3: '3. دفع رسوم الخدمة',
      step4: '4. تقديم ومتابعة الطلب',
      reqDoc1: 'بطاقة الرقم القومي سارية',
      reqDoc2: 'صور شخصية حديثة',
      reqDoc3: 'الوثائق المؤيدة',
      reqDoc4: 'تأكيد الدفع',
      autoApply: 'استخدم الذكاء الاصطناعي للتقديم على هذه الخدمة فوراً بدون تعبئة نماذج يدوية.',
      popular: 'خدمة شائعة',
      digital: 'متاح رقمياً',
      inPerson: 'حضور شخصي فقط',
      both: 'رقمي وحضور شخصي'
    }
  };

  const t = translations[currentLang];
  const IconComponent = service.icon;

  const getStatusText = (status: string) => {
    switch (status) {
      case 'digital':
        return t.digital;
      case 'inPerson':
        return t.inPerson;
      case 'both':
        return t.both;
      default:
        return t.digital;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'digital':
        return 'bg-green-100 text-green-800';
      case 'inPerson':
        return 'bg-yellow-100 text-yellow-800';
      case 'both':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className={`max-w-2xl max-h-[80vh] overflow-y-auto ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <IconComponent className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl mb-2 flex items-center gap-2">
                {service.title}
                {service.popular && (
                  <Badge className="bg-secondary text-secondary-foreground">
                    {t.popular}
                  </Badge>
                )}
              </DialogTitle>
              <Badge className={getStatusColor(service.status)}>
                {getStatusText(service.status)}
              </Badge>
            </div>
          </div>
          <DialogDescription className="text-base">
            {service.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Service Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm text-gray-600">{t.processingTime}</div>
                <div className="font-medium">{service.processingTime}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm text-gray-600">{t.serviceFee}</div>
                <div className="font-medium">{service.fee}</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Requirements */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {t.requirements}
            </h3>
            <div className="grid md:grid-cols-2 gap-2">
              {[t.reqDoc1, t.reqDoc2, t.reqDoc3, t.reqDoc4].map((req, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{req}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* How It Works */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              {t.howItWorks}
            </h3>
            <div className="space-y-2">
              {[t.step1, t.step2, t.step3, t.step4].map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <span className="text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* AI Automation CTA */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">{t.nextSteps}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">{t.autoApply}</p>
            <Button 
              className="w-full" 
              onClick={() => {
                onAutomationClick();
              }}
            >
              <Zap className="h-4 w-4 mr-2" />
              {t.applyNow}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}