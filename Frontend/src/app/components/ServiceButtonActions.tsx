import { Button } from './ui/button';
import { Zap } from 'lucide-react';
import { ServiceDetailsDialog } from './ServiceDetailsDialog';

interface ServiceButtonActionsProps {
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
  onPageChange: (page: string, serviceData?: any) => void;
}

export function ServiceButtonActions({ service, currentLang, onPageChange }: ServiceButtonActionsProps) {
  const translations = {
    en: {
      automation: 'Auto-Apply',
      learnMore: 'Learn More'
    },
    ar: {
      automation: 'تقديم تلقائي',
      learnMore: 'اعرف أكثر'
    }
  };

  const t = translations[currentLang];

  return (
    <div className="flex gap-2">
      <Button 
        size="sm" 
        className="flex-1"
        onClick={() => onPageChange('automation', service)}
      >
        <Zap className="h-4 w-4 mr-2" />
        {t.automation}
      </Button>
      <ServiceDetailsDialog
        service={service}
        currentLang={currentLang}
        onAutomationClick={() => onPageChange('automation', service)}
      >
        <Button size="sm" variant="outline">
          {t.learnMore}
        </Button>
      </ServiceDetailsDialog>
    </div>
  );
}