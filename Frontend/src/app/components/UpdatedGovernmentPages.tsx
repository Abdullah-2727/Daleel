// مكون مساعد لتحديث جميع صفحات المصالح الحكومية
import { ServiceButtonActions } from './ServiceButtonActions';

// دالة لتحديث أزرار الخدمات في جميع الصفحات
export const renderServiceButtons = (service: any, currentLang: 'en' | 'ar', onPageChange: (page: string, serviceData?: any) => void) => {
  return (
    <ServiceButtonActions
      service={service}
      currentLang={currentLang}
      onPageChange={onPageChange}
    />
  );
};

// تصدير المكون للاستخدام في جميع الصفحات
export { ServiceButtonActions };