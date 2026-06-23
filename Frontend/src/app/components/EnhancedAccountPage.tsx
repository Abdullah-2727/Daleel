import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Edit2, 
  Save, 
  X,
  Bell,
  Globe,
  Lock,
  Eye,
  Download,
  Upload,
  FileText,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  MessageSquare,
  Clock,
  Star,
  CreditCard,
  Crown,
  Settings,
  HelpCircle,
  Zap,
  BarChart3,
  TrendingUp,
  Activity,
  Building,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { toast } from "sonner";

interface EnhancedAccountPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
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
  };
  onUserUpdate: (user: any) => void;
}

export function EnhancedAccountPage({ currentLang, onPageChange, user, onUserUpdate }: EnhancedAccountPageProps) {
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [activeUpload, setActiveUpload] = useState(false);

  const translations = {
    en: {
      account: 'My Account',
      description: 'Manage your account information, preferences, and settings',
      // Sidebar Navigation
      profileInfo: 'Profile Info',
      usageHistory: 'Usage History',
      govApplications: 'Gov Applications',
      subscriptions: 'Subscriptions',
      security: 'Security',
      preferences: 'Preferences',
      support: 'Support',
      
      // Profile Section
      personalInfo: 'Personal Information',
      editProfile: 'Edit Profile',
      saveChanges: 'Save Changes',
      cancel: 'Cancel',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      location: 'Location',
      bio: 'Bio',
      memberSince: 'Member since',
      verified: 'Verified',
      notVerified: 'Not Verified',
      
      // Usage History
      recentChats: 'Recent AI Interactions',
      viewFullHistory: 'View Full Chat History',
      today: 'Today',
      yesterday: 'Yesterday',
      thisWeek: 'This week',
      chatsWith: 'chats with AI',
      avgResponseTime: 'Avg response time',
      seconds: 'seconds',
      satisfaction: 'Satisfaction score',
      
      // Subscriptions
      currentPlan: 'Current Plan',
      freePlan: 'Free Plan',
      premiumPlan: 'Premium Plan',
      upgrade: 'Upgrade Plan',
      renewalDate: 'Next renewal',
      unlimited: 'Unlimited',
      features: 'Features',
      chatRequests: 'chat requests per month',
      prioritySupport: 'Priority support',
      advancedFeatures: 'Advanced AI features',
      
      // Security
      changePassword: 'Change Password',
      twoFactor: 'Two-Factor Authentication',
      enable: 'Enable',
      activeDevices: 'Active Devices & Sessions',
      manageDevices: 'Manage Devices',
      
      // Preferences
      notifications: 'Notifications',
      emailNotifications: 'Email Notifications',
      smsNotifications: 'SMS Notifications',
      pushNotifications: 'Push Notifications',
      darkMode: 'Dark Mode',
      voiceAssistant: 'Voice Assistant',
      language: 'Language',
      
      // Support
      faq: 'Frequently Asked Questions',
      contactSupport: 'Contact Support',
      helpCenter: 'Help Center',
      
      // Messages
      updateSuccess: 'Profile updated successfully!',
      updateError: 'Failed to update profile. Please try again.',
      uploadSuccess: 'Document uploaded successfully!',
      chooseFile: 'Choose File',
      supportedFormats: 'Supported formats: PDF, JPG, PNG (Max: 10MB)',
      
      // Government Applications
      govApplicationsDesc: 'Track your government service applications',
      applicationId: 'Application ID',
      serviceType: 'Service Type',
      status: 'Status',
      submissionDate: 'Submission Date',
      lastUpdate: 'Last Update',
      nextAction: 'Next Action',
      viewApplication: 'View Application',
      downloadReceipt: 'Download Receipt',
      noApplications: 'No applications found',
      applyForServices: 'Apply for New Services',
      received: 'Received',
      underReview: 'Under Review',
      approved: 'Approved',
      completed: 'Completed',
      pendingDoc: 'Pending Document',
      rejected: 'Rejected'
    },
    ar: {
      account: 'حسابي',
      description: 'إدارة معلومات حسابك والتفضيلات والإعدادات',
      // Sidebar Navigation
      profileInfo: 'معلومات الملف الشخصي',
      usageHistory: 'سجل الاستخدام',
      govApplications: 'الطلبات الحكومية',
      subscriptions: 'الاشتراكات',
      security: 'الأمان',
      preferences: 'التفضيلات',
      support: 'الدعم',
      
      // Profile Section
      personalInfo: 'المعلومات الشخصية',
      editProfile: 'تعديل الملف الشخصي',
      saveChanges: 'حفظ التغييرات',
      cancel: 'إلغاء',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      location: 'الموقع',
      bio: 'نبذة تعريفية',
      memberSince: 'عضو منذ',
      verified: 'موثق',
      notVerified: 'غير موثق',
      
      // Usage History
      recentChats: 'التفاعلات الأخيرة مع الذكي',
      viewFullHistory: 'عرض السجل الكامل',
      today: 'اليوم',
      yesterday: 'أمس',
      thisWeek: 'هذا الأسبوع',
      chatsWith: 'محادثة مع الذكي',
      avgResponseTime: 'متوسط وقت الاستجابة',
      seconds: 'ثانية',
      satisfaction: 'معدل الرضا',
      
      // Subscriptions
      currentPlan: 'الخطة الحالية',
      freePlan: 'الخطة المجانية',
      premiumPlan: 'الخطة المميزة',
      upgrade: 'ترقية الخطة',
      renewalDate: 'التجديد القادم',
      unlimited: 'غير محدود',
      features: 'المميزات',
      chatRequests: 'طلب محادثة شهرياً',
      prioritySupport: 'دعم أولوية',
      advancedFeatures: 'مميزات ذكية متقدمة',
      
      // Security
      changePassword: 'تغيير كلمة المرور',
      twoFactor: 'المصادقة الثنائية',
      enable: 'تفعيل',
      activeDevices: 'الأجهزة والجلسات النشطة',
      manageDevices: 'إدارة الأجهزة',
      
      // Preferences
      notifications: 'الإشعارات',
      emailNotifications: 'إشعارات البريد الإلكتروني',
      smsNotifications: 'إشعارات الرسائل النصية',
      pushNotifications: 'الإشعارات الفورية',
      darkMode: 'الوضع الليلي',
      voiceAssistant: 'المساعد الصوتي',
      language: 'اللغة',
      
      // Support
      faq: 'الأسئلة الشائعة',
      contactSupport: 'اتصل بالدعم',
      helpCenter: 'مركز المساعدة',
      
      // Messages
      updateSuccess: 'تم تحديث الملف الشخصي بنجاح!',
      updateError: 'فشل في تحديث الملف الشخصي. يرجى المحاولة مرة أخرى.',
      uploadSuccess: 'تم رفع الوثيقة بنجاح!',
      chooseFile: 'اختر ملف',
      supportedFormats: 'الصيغ المدعومة: PDF, JPG, PNG (الحد الأقصى: 10 ميجابايت)',
      
      // Government Applications
      govApplicationsDesc: 'تتبع طلباتك للخدمات الحكومية',
      applicationId: 'رقم الطلب',
      serviceType: 'نوع الخدمة',
      status: 'الحالة',
      submissionDate: 'تاريخ التقديم',
      lastUpdate: 'آخر تحديث',
      nextAction: 'الإجراء التالي',
      viewApplication: 'عرض الطلب',
      downloadReceipt: 'تحميل الإيصال',
      noApplications: 'لا توجد طلبات',
      applyForServices: 'تقدم لخدمات جديدة',
      received: 'تم الاستلام',
      underReview: 'قيد المراجعة',
      approved: 'تمت الموافقة',
      completed: 'مكتمل',
      pendingDoc: 'في انتظار مستند',
      rejected: 'مرفوض'
    }
  };

  const t = translations[currentLang];

  // Mock data for usage history
  const recentChats = [
    {
      id: '1',
      message: currentLang === 'ar' ? 'كيف يمكنني تجديد جواز السفر؟' : 'How can I renew my passport?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      satisfaction: 5,
      responseTime: 2.3
    },
    {
      id: '2',
      message: currentLang === 'ar' ? 'ما هي المستندات المطلوبة للحصول على رخصة القيادة؟' : 'What documents do I need for a driving license?',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      satisfaction: 4,
      responseTime: 1.8
    },
    {
      id: '3',
      message: currentLang === 'ar' ? 'كيفية دفع فواتير الكهرباء أونلاين؟' : 'How to pay electricity bills online?',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      satisfaction: 5,
      responseTime: 3.1
    }
  ];

  const usageStats = {
    totalChats: 47,
    avgResponseTime: 2.4,
    satisfactionScore: 4.6
  };

  // Mock data for government applications
  const governmentApplications = [
    {
      id: "2025-0012",
      serviceType: currentLang === 'en' ? "National ID Renewal" : "تجديد البطاقة الشخصية",
      status: "underReview",
      submissionDate: "2025-01-15",
      lastUpdate: "2025-01-16",
      nextAction: currentLang === 'en' ? "Wait for approval" : "انتظار الموافقة",
      fee: 50
    },
    {
      id: "2025-0013",
      serviceType: currentLang === 'en' ? "Birth Certificate" : "شهادة ميلاد",
      status: "completed",
      submissionDate: "2025-01-08",
      lastUpdate: "2025-01-12",
      nextAction: currentLang === 'en' ? "Ready for pickup" : "جاهز للاستلام",
      fee: 25
    },
    {
      id: "2025-0014",
      serviceType: currentLang === 'en' ? "Driving License Renewal" : "تجديد رخصة القيادة",
      status: "pendingDoc",
      submissionDate: "2025-01-10",
      lastUpdate: "2025-01-14",
      nextAction: currentLang === 'en' ? "Upload medical report" : "رفع التقرير الطبي",
      fee: 100
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received': return 'bg-blue-100 text-blue-800';
      case 'underReview': return 'bg-yellow-100 text-yellow-800';
      case 'pendingDoc': return 'bg-orange-100 text-orange-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received': return <Clock className="h-4 w-4" />;
      case 'underReview': return <RefreshCw className="h-4 w-4" />;
      case 'pendingDoc': return <AlertCircle className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <X className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const sidebarItems = [
    { key: 'profile', label: t.profileInfo, icon: User },
    { key: 'usage', label: t.usageHistory, icon: BarChart3 },
    { key: 'gov-applications', label: t.govApplications, icon: Building },
    { key: 'subscriptions', label: t.subscriptions, icon: Crown },
    { key: 'security', label: t.security, icon: Lock },
    { key: 'preferences', label: t.preferences, icon: Settings },
    { key: 'support', label: t.support, icon: HelpCircle }
  ];

  const handleSaveChanges = () => {
    try {
      onUserUpdate(editedUser);
      setIsEditing(false);
      toast.success(t.updateSuccess);
    } catch (error) {
      toast.error(t.updateError);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return currentLang === 'ar' 
      ? date.toLocaleDateString('ar-EG')
      : date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return currentLang === 'ar' ? 'اليوم' : 'Today';
    } else if (diffHours < 48) {
      return currentLang === 'ar' ? 'أمس' : 'Yesterday';
    } else {
      return formatDate(timestamp);
    }
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t.personalInfo}</CardTitle>
            <CardDescription>Update your personal information and profile details</CardDescription>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
              <Edit2 className="h-4 w-4 mr-2" />
              {t.editProfile}
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSaveChanges} size="sm">
                <Save className="h-4 w-4 mr-2" />
                {t.saveChanges}
              </Button>
              <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
                <X className="h-4 w-4 mr-2" />
                {t.cancel}
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t.name}</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={editedUser.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              ) : (
                <div className="flex items-center gap-2 py-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>{user.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              ) : (
                <div className="flex items-center gap-2 py-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{user.email}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t.phone}</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={editedUser.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              ) : (
                <div className="flex items-center gap-2 py-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{user.phone}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">{t.location}</Label>
              {isEditing ? (
                <Input
                  id="location"
                  value={editedUser.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              ) : (
                <div className="flex items-center gap-2 py-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{user.location}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">{t.bio}</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                className="min-h-[100px]"
              />
            ) : (
              <div className="py-2 text-gray-600">
                <p>No bio added yet.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUsageSection = () => (
    <div className="space-y-6">
      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t.thisWeek}</p>
                <p className="text-2xl font-bold">{usageStats.totalChats}</p>
                <p className="text-xs text-gray-500">{t.chatsWith}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t.avgResponseTime}</p>
                <p className="text-2xl font-bold">{usageStats.avgResponseTime}</p>
                <p className="text-xs text-gray-500">{t.seconds}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Star className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t.satisfaction}</p>
                <p className="text-2xl font-bold">{usageStats.satisfactionScore}/5</p>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3 w-3 ${i < Math.floor(usageStats.satisfactionScore) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Chats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            {t.recentChats}
          </CardTitle>
          <CardDescription>Your latest interactions with Masr AI Agent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentChats.map((chat) => (
              <div key={chat.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">{chat.message}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{formatTimestamp(chat.timestamp)}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{chat.responseTime}s</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < chat.satisfaction ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              {t.viewFullHistory}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSubscriptionsSection = () => (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            {t.currentPlan}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-primary">{t.freePlan}</h3>
                <p className="text-gray-600">{t.memberSince} {formatDate(user.joinDate)}</p>
              </div>
              <Badge variant="outline" className="bg-white">Active</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold">50</p>
                <p className="text-sm text-gray-600">{t.chatRequests}</p>
                <Progress value={60} className="mt-2" />
                <p className="text-xs text-gray-500 mt-1">30 used</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">2.4s</p>
                <p className="text-sm text-gray-600">{t.avgResponseTime}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">4.6/5</p>
                <p className="text-sm text-gray-600">{t.satisfaction}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Premium Plan Upgrade */}
      <Card className="border-2 border-secondary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-secondary">
            <Zap className="h-5 w-5" />
            {t.premiumPlan}
          </CardTitle>
          <CardDescription>Unlock unlimited access and advanced features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-secondary/5 rounded-lg">
              <span>{t.unlimited} {t.chatRequests}</span>
              <Badge variant="secondary">✓</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/5 rounded-lg">
              <span>{t.prioritySupport}</span>
              <Badge variant="secondary">✓</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/5 rounded-lg">
              <span>{t.advancedFeatures}</span>
              <Badge variant="secondary">✓</Badge>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <Crown className="h-4 w-4 mr-2" />
              {t.upgrade}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            {t.security}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">{t.changePassword}</h4>
              <p className="text-sm text-gray-500">Update your password regularly for security</p>
            </div>
            <Button variant="outline">Change</Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">{t.twoFactor}</h4>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <Button variant="outline">{t.enable}</Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">{t.activeDevices}</h4>
              <p className="text-sm text-gray-500">See and manage devices that have access to your account</p>
            </div>
            <Button variant="outline">
              <Smartphone className="h-4 w-4 mr-2" />
              {t.manageDevices}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPreferencesSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {t.preferences}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>{t.emailNotifications}</Label>
              <p className="text-sm text-gray-500">Receive notifications via email</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>{t.smsNotifications}</Label>
              <p className="text-sm text-gray-500">Receive notifications via SMS</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>{t.darkMode}</Label>
              <p className="text-sm text-gray-500">Switch to dark theme</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>{t.voiceAssistant}</Label>
              <p className="text-sm text-gray-500">Enable voice interactions</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderGovernmentApplicationsSection = () => (
    <div className="space-y-6">
      {/* Applications Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold">{governmentApplications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{governmentApplications.filter(app => app.status === 'completed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <RefreshCw className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold">{governmentApplications.filter(app => ['underReview', 'pendingDoc', 'received'].includes(app.status)).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                {t.govApplications}
              </CardTitle>
              <CardDescription>{t.govApplicationsDesc}</CardDescription>
            </div>
            <Button onClick={() => onPageChange('automation')}>
              <Zap className="h-4 w-4 mr-2" />
              {t.applyForServices}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {governmentApplications.length > 0 ? (
            <div className="space-y-4">
              {governmentApplications.map((application) => (
                <div key={application.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-primary">{application.id}</span>
                        <Badge className={getStatusColor(application.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(application.status)}
                            <span>{t[application.status as keyof typeof t]}</span>
                          </div>
                        </Badge>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">{application.serviceType}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">{t.submissionDate}:</span>
                          <p>{formatDate(application.submissionDate)}</p>
                        </div>
                        <div>
                          <span className="font-medium">{t.lastUpdate}:</span>
                          <p>{formatDate(application.lastUpdate)}</p>
                        </div>
                        <div>
                          <span className="font-medium">{t.nextAction}:</span>
                          <p>{application.nextAction}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        {t.viewApplication}
                      </Button>
                      {application.status === 'completed' && (
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          {t.downloadReceipt}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Building className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">{t.noApplications}</p>
              <Button onClick={() => onPageChange('automation')}>
                <Zap className="h-4 w-4 mr-2" />
                {t.applyForServices}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderSupportSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            {t.support}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start h-auto p-4">
            <div className="text-left">
              <p className="font-medium">{t.faq}</p>
              <p className="text-sm text-gray-500">Find answers to common questions</p>
            </div>
          </Button>

          <Button variant="outline" className="w-full justify-start h-auto p-4">
            <div className="text-left">
              <p className="font-medium">{t.contactSupport}</p>
              <p className="text-sm text-gray-500">Get help from our support team</p>
            </div>
          </Button>

          <Button variant="outline" className="w-full justify-start h-auto p-4">
            <div className="text-left">
              <p className="font-medium">{t.helpCenter}</p>
              <p className="text-sm text-gray-500">Browse guides and tutorials</p>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'usage':
        return renderUsageSection();
      case 'gov-applications':
        return renderGovernmentApplicationsSection();
      case 'subscriptions':
        return renderSubscriptionsSection();
      case 'security':
        return renderSecuritySection();
      case 'preferences':
        return renderPreferencesSection();
      case 'support':
        return renderSupportSection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 pt-20 py-8 ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.account}</h1>
          <p className="text-gray-600">{t.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Summary + Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-4 ring-4 ring-primary/20">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="font-semibold text-lg mb-1">{user.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{user.email}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant={user.isVerified ? "default" : "secondary"} className="text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      {user.isVerified ? t.verified : t.notVerified}
                    </Badge>
                  </div>

                  <div className="w-full space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{t.memberSince} {formatDate(user.joinDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{user.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sidebar Navigation */}
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.key}
                        onClick={() => setActiveSection(item.key)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeSection === item.key
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}