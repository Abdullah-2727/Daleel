import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { X, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

interface QuickTourTooltipsProps {
  currentLang: 'en' | 'ar';
  onComplete: () => void;
}

interface TourStep {
  target: string;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

export function QuickTourTooltips({ currentLang, onComplete }: QuickTourTooltipsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const translations = {
    en: {
      next: 'Next',
      previous: 'Back',
      finish: 'Finish Tour',
      skip: 'Skip',
      step: 'Step',
      of: 'of',
      
      // Tour Steps
      step1Title: 'AI Chatbot',
      step1Desc: 'Click here to chat with our AI assistant in Egyptian Arabic.',
      
      step2Title: 'Government Services',
      step2Desc: 'Access all government services from this menu.',
      
      step3Title: 'Bill Payments',
      step3Desc: 'Pay your bills quickly and securely.',
      
      step4Title: 'Smart Automation',
      step4Desc: 'Track all your applications and requests in one place.',
      
      step5Title: 'Your Account',
      step5Desc: 'Manage your profile, documents, and settings here.',
    },
    ar: {
      next: 'التالي',
      previous: 'السابق',
      finish: 'إنهاء الجولة',
      skip: 'تخطي',
      step: 'خطوة',
      of: 'من',
      
      // Tour Steps
      step1Title: 'المساعد الذكي',
      step1Desc: 'اضغط هنا للتحدث مع المساعد الذكي بالعامية المصرية.',
      
      step2Title: 'الخدمات الحكومية',
      step2Desc: 'الوصول لجميع الخدمات الحكومية من هذه القائمة.',
      
      step3Title: 'دفع الفواتير',
      step3Desc: 'ادفع فواتيرك بسرعة وأمان.',
      
      step4Title: 'الأتمتة الذكية',
      step4Desc: 'تتبع جميع طلباتك ومعاملاتك في مكان واحد.',
      
      step5Title: 'حسابك',
      step5Desc: 'إدارة ملفك الشخصي ومستنداتك وإعداداتك من هنا.',
    }
  };

  const t = translations[currentLang];

  const tourSteps: TourStep[] = [
    {
      target: 'chatbot-button',
      title: t.step1Title,
      description: t.step1Desc,
      position: 'left'
    },
    {
      target: 'government-menu',
      title: t.step2Title,
      description: t.step2Desc,
      position: 'bottom'
    },
    {
      target: 'integrations-menu',
      title: t.step3Title,
      description: t.step3Desc,
      position: 'bottom'
    },
    {
      target: 'automation-menu',
      title: t.step4Title,
      description: t.step4Desc,
      position: 'bottom'
    },
    {
      target: 'account-menu',
      title: t.step5Title,
      description: t.step5Desc,
      position: 'bottom'
    }
  ];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    onComplete();
  };

  if (!isVisible) return null;

  const step = tourSteps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-gray-900 z-[9998] pointer-events-none" style={{ opacity: 0.7 }} />
      
      {/* Tooltip Card */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] max-w-md w-full mx-4">
        <Card className="bg-white border-2 border-blue-200 shadow-lg rounded-3xl animate-slide-up">
          <CardContent className="p-6 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-sm text-muted-foreground mb-2">
                  {t.step} {currentStep + 1} {t.of} {tourSteps.length}
                </div>
                <h3 className="text-xl text-primary mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleComplete}
                className="rounded-full flex-shrink-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="flex gap-1">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    index <= currentStep ? 'bg-primary' : 'bg-border'
                  }`}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2">
              <div>
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="rounded-2xl"
                  >
                    {currentLang === 'ar' ? (
                      <ArrowRight className="h-4 w-4 mr-2" />
                    ) : (
                      <ArrowLeft className="h-4 w-4 mr-2" />
                    )}
                    {t.previous}
                  </Button>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={handleComplete}
                  className="text-muted-foreground"
                >
                  {t.skip}
                </Button>
                
                <Button
                  onClick={handleNext}
                  className="gradient-primary text-white hover:opacity-90 rounded-2xl"
                >
                  {currentStep === tourSteps.length - 1 ? (
                    <>
                      {t.finish}
                      <CheckCircle className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    <>
                      {t.next}
                      {currentLang === 'ar' ? (
                        <ArrowLeft className="h-4 w-4 ml-2" />
                      ) : (
                        <ArrowRight className="h-4 w-4 ml-2" />
                      )}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}