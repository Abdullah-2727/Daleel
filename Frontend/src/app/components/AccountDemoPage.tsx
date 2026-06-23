import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Settings,
  Bell,
  Lock,
  FileText,
  ChevronRight,
  UserCheck,
  LogIn
} from 'lucide-react';

interface AccountDemoPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
}

export function AccountDemoPage({ currentLang, onPageChange }: AccountDemoPageProps) {
  const translations = {
    en: {
      title: 'User Account Management',
      subtitle: 'Experience comprehensive account management with Masr AI Agent',
      demoUser: 'Demo User Account',
      features: 'Account Features',
      feature1: 'Personal Profile Management',
      feature1Desc: 'Edit personal information, upload documents, and manage your profile photo',
      feature2: 'Privacy & Security Settings',
      feature2Desc: 'Control your privacy settings, enable two-factor authentication, and manage device access',
      feature3: 'Notification Preferences',
      feature3Desc: 'Customize how you receive notifications via email, SMS, and push notifications',
      feature4: 'Document Management',
      feature4Desc: 'Upload and manage your official documents with secure storage',
      loginToAccess: 'Login to Access Your Account',
      loginDesc: 'Create an account or login to experience the full account management features',
      createAccount: 'Create Account',
      login: 'Login',
      demoAccountInfo: 'Demo Account Information',
      sampleUser: 'Ahmed Mohamed Ali',
      sampleEmail: 'ahmed@example.com',
      samplePhone: '+20 1234567890',
      sampleLocation: 'Cairo, Egypt',
      memberSince: 'Member since',
      verified: 'Verified Account',
      documentsUploaded: 'Documents Uploaded',
      nationalId: 'National ID',
      securityLevel: 'Security Level: High',
      tryAccountFeatures: 'Try Account Features',
      viewProfile: 'View Profile',
      manageSettings: 'Manage Settings',
      securityOptions: 'Security Options',
      uploadDocuments: 'Upload Documents'
    },
    ar: {
      title: 'إدارة حساب المستخدم',
      subtitle: 'اختبر إدارة الحساب الشاملة مع مساعد مصر الذكي',
      demoUser: 'حساب المستخدم التجريبي',
      features: 'مميزات الحساب',
      feature1: 'إدارة الملف الشخصي',
      feature1Desc: 'تعديل المعلومات الشخصية، رفع الوثائق، وإدارة صورة الملف الشخصي',
      feature2: 'إعدادات الخصوصية والأمان',
      feature2Desc: 'التحكم في إعدادات الخصوصية، تفعيل المصادقة الثنائية، وإدارة الوصول للأجهزة',
      feature3: 'تفضيلات الإشعارات',
      feature3Desc: 'تخصيص طريقة استلام الإشعارات عبر البريد الإلكتروني والرسائل النصية والإشعارات الفورية',
      feature4: 'إدارة الوثائق',
      feature4Desc: 'رفع وإدارة الوثائق الرسمية مع التخزين الآمن',
      loginToAccess: 'سجل دخولك للوصول لحسابك',
      loginDesc: 'أنشئ حساباً أو سجل دخولك لتجربة مميزات إدارة الحساب كاملة',
      createAccount: 'إنشاء حساب',
      login: 'تسجيل الدخول',
      demoAccountInfo: 'معلومات الحساب التجريبي',
      sampleUser: 'أحمد محمد علي',
      sampleEmail: 'ahmed@example.com',
      samplePhone: '+20 1234567890',
      sampleLocation: 'القاهرة، مصر',
      memberSince: 'عضو منذ',
      verified: 'حساب موثق',
      documentsUploaded: 'وثائق مرفوعة',
      nationalId: 'الرقم ال��ومي',
      securityLevel: 'مستوى الأمان: عالي',
      tryAccountFeatures: 'جرب مميزات الحساب',
      viewProfile: 'عرض الملف الشخصي',
      manageSettings: 'إدارة الإعدادات',
      securityOptions: 'خيارات الأمان',
      uploadDocuments: 'رفع الوثائق'
    }
  };

  const t = translations[currentLang];

  const demoUser = {
    name: currentLang === 'ar' ? 'أحمد محمد علي' : 'Ahmed Mohamed Ali',
    email: 'ahmed@example.com',
    phone: '+20 1234567890',
    location: currentLang === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt',
    joinDate: currentLang === 'ar' ? 'يناير 2024' : 'January 2024',
    avatar: 'https://images.unsplash.com/photo-1752486268300-1bb7d6d9867d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBlZ3lwdGlhbiUyMG1hbiUyMGF2YXRhcnxlbnwxfHx8fDE3NTY0NjAyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isVerified: true
  };

  return (
    <div className={`min-h-screen bg-gray-50 pt-20 py-8 ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl text-primary mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Demo User Account Preview */}
        <div className="mb-12">
          <h2 className="text-2xl text-primary mb-6 text-center">{t.demoAccountInfo}</h2>
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <Avatar className="h-24 w-24 ring-4 ring-white shadow-lg">
                      <AvatarImage src={demoUser.avatar} alt={demoUser.name} />
                      <AvatarFallback className="bg-blue-100 text-primary text-xl">
                        {demoUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="text-center md:text-start flex-1">
                      <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                        <h3 className="text-2xl text-gray-900">{demoUser.name}</h3>
                        <Badge variant="default" className="text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          {t.verified}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-700">{demoUser.email}</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-700">{demoUser.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-700">{demoUser.location}</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-700">{t.memberSince} {demoUser.joinDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="font-medium text-green-800">{t.documentsUploaded}</p>
                      <p className="text-sm text-green-600">{t.nationalId}</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="font-medium text-blue-800">{t.securityLevel}</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <UserCheck className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="font-medium text-purple-800">{t.verified}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Account Features */}
        <div className="mb-12">
          <h2 className="text-2xl text-primary mb-8 text-center">{t.features}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <User className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">{t.feature1}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.feature1Desc}</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Lock className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">{t.feature2}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.feature2Desc}</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Bell className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">{t.feature3}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.feature3Desc}</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">{t.feature4}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.feature4Desc}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Try Features Section */}
        <div className="mb-12">
          <h2 className="text-2xl text-primary mb-8 text-center">{t.tryAccountFeatures}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              className="flex items-center justify-between p-4 h-auto"
              onClick={() => onPageChange('login')}
            >
              <div className="flex items-center gap-3">
                <User className="h-5 w-5" />
                <span>{t.viewProfile}</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center justify-between p-4 h-auto"
              onClick={() => onPageChange('login')}
            >
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5" />
                <span>{t.manageSettings}</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center justify-between p-4 h-auto"
              onClick={() => onPageChange('login')}
            >
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5" />
                <span>{t.securityOptions}</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center justify-between p-4 h-auto"
              onClick={() => onPageChange('login')}
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5" />
                <span>{t.uploadDocuments}</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">{t.loginToAccess}</CardTitle>
              <CardDescription className="text-lg">{t.loginDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => onPageChange('register')}
                  className="bg-primary hover:bg-blue-600"
                >
                  <User className="h-5 w-5 mr-2" />
                  {t.createAccount}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => onPageChange('login')}
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  {t.login}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}