import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { AlertTriangle, CheckCircle, Clock, Upload, FileText, User, Mail } from 'lucide-react';

interface UserNotificationsProps {
  currentLang: 'en' | 'ar';
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    joinDate: string;
    avatar: string;
    status: string;
    nationalId: string;
    isVerified?: boolean;
    documents?: any;
  } | null;
  onPageChange: (page: string) => void;
}

export function UserNotifications({ currentLang, user, onPageChange }: UserNotificationsProps) {
  if (!user) return null;

  const translations = {
    en: {
      welcomeTitle: 'Welcome to Masr AI Agent!',
      welcomeMessage: 'Complete your profile to unlock all features',
      verificationPending: 'Account Verification Pending',
      verificationMessage: 'Your documents are being reviewed. This usually takes 24-48 hours.',
      completeProfile: 'Complete Your Profile',
      profileMessage: 'Add more information to improve your experience',
      uploadDocuments: 'Upload Documents',
      documentsMessage: 'Upload your ID and proof of address for verification',
      completeNow: 'Complete Now',
      viewDetails: 'View Details',
      profileCompletion: 'Profile Completion',
      completed: 'Completed',
      pending: 'Pending'
    },
    ar: {
      welcomeTitle: 'مرحباً بك في مساعد مصر الذكي!',
      welcomeMessage: 'أكمل ملفك الشخصي لفتح جميع الميزات',
      verificationPending: 'التحقق من الحساب قيد الانتظار',
      verificationMessage: 'جاري مراجعة وثائقك. عادة ما يستغرق هذا من 24-48 ساعة.',
      completeProfile: 'أكمل ملفك الشخصي',
      profileMessage: 'أضف المزيد من المعلومات لتحسين تجربتك',
      uploadDocuments: 'ارفع الوثائق',
      documentsMessage: 'ارفع هويتك وإثبات العنوان للتحقق',
      completeNow: 'أكمل الآن',
      viewDetails: 'عرض التفاصيل',
      profileCompletion: 'إكمال الملف الشخصي',
      completed: 'مكتمل',
      pending: 'في الانتظار'
    }
  };

  const t = translations[currentLang];

  // Calculate profile completion
  const getProfileCompletion = () => {
    let completed = 0;
    const total = 5;

    if (user.name) completed++;
    if (user.email) completed++;
    if (user.phone) completed++;
    if (user.avatar && !user.avatar.includes('ui-avatars.com')) completed++;
    if (user.documents?.nationalId || user.documents?.proofOfAddress) completed++;

    return (completed / total) * 100;
  };

  const profileCompletion = getProfileCompletion();
  const isNewUser = !user.isVerified && user.status === 'pending_verification';
  const needsDocuments = !user.documents?.nationalId || !user.documents?.proofOfAddress;

  return (
    <div className={`space-y-4 mb-6 ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Welcome message for new users */}
      {isNewUser && (
        <Alert className="border-primary/20 bg-primary/5">
          <CheckCircle className="h-4 w-4 text-primary" />
          <AlertDescription>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h4 className="font-medium text-primary mb-1">{t.welcomeTitle}</h4>
                <p className="text-sm text-muted-foreground">{t.welcomeMessage}</p>
              </div>
              <Button onClick={() => onPageChange('profile')} size="sm" className="bg-primary hover:bg-primary/90">
                {t.completeNow}
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Verification pending */}
      {user.status === 'pending_verification' && user.documents?.nationalId && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <Clock className="h-4 w-4 text-yellow-600" />
          <AlertDescription>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h4 className="font-medium text-yellow-800 mb-1">{t.verificationPending}</h4>
                <p className="text-sm text-yellow-700">{t.verificationMessage}</p>
              </div>
              <Button onClick={() => onPageChange('profile')} variant="outline" size="sm">
                {t.viewDetails}
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Profile completion card */}
      {profileCompletion < 100 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">{t.profileCompletion}</h4>
              <span className="text-sm text-muted-foreground">{Math.round(profileCompletion)}%</span>
            </div>
            <Progress value={profileCompletion} className="mb-4" />
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{currentLang === 'ar' ? 'المعلومات الأساسية' : 'Basic Information'}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${user.name && user.email && user.phone ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {user.name && user.email && user.phone ? t.completed : t.pending}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>{currentLang === 'ar' ? 'الصورة الشخصية' : 'Profile Photo'}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${user.avatar && !user.avatar.includes('ui-avatars.com') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {user.avatar && !user.avatar.includes('ui-avatars.com') ? t.completed : t.pending}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>{currentLang === 'ar' ? 'الوثائق' : 'Documents'}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${user.documents?.nationalId || user.documents?.proofOfAddress ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {user.documents?.nationalId || user.documents?.proofOfAddress ? t.completed : t.pending}
                </span>
              </div>
            </div>

            <Button 
              onClick={() => onPageChange('profile')} 
              className="w-full mt-4 bg-primary hover:bg-primary/90"
              size="sm"
            >
              {t.completeProfile}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Documents needed */}
      {needsDocuments && !isNewUser && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h4 className="font-medium text-orange-800 mb-1">{t.uploadDocuments}</h4>
                <p className="text-sm text-orange-700">{t.documentsMessage}</p>
              </div>
              <Button onClick={() => onPageChange('profile')} variant="outline" size="sm">
                {t.completeNow}
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}