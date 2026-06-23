import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Shield, 
  Globe, 
  Moon, 
  Sun, 
  Smartphone,
  ArrowLeft 
} from 'lucide-react';
import { toast } from "sonner";

interface SettingsPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
}

export function SettingsPage({ currentLang, onPageChange }: SettingsPageProps) {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    dataSharing: false,
    analytics: true
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: currentLang,
    autoLocation: true
  });

  const translations = {
    en: {
      title: 'Settings',
      subtitle: 'Manage your account settings and preferences',
      notifications: 'Notifications',
      notificationDesc: 'Configure how you receive notifications',
      privacy: 'Privacy & Security',
      privacyDesc: 'Control your privacy and security settings',
      preferences: 'Preferences',
      preferencesDesc: 'Customize your app experience',
      emailNotifications: 'Email Notifications',
      pushNotifications: 'Push Notifications',
      smsNotifications: 'SMS Notifications',
      marketingEmails: 'Marketing Emails',
      profileVisibility: 'Profile Visibility',
      dataSharing: 'Data Sharing',
      analytics: 'Usage Analytics',
      darkMode: 'Dark Mode',
      autoLocation: 'Auto-detect Location',
      saveChanges: 'Save Changes',
      backToProfile: 'Back to Profile',
      settingsSaved: 'Settings saved successfully!',
      coming: 'Coming Soon',
      comingDesc: 'This feature will be available in the next update'
    },
    ar: {
      title: 'الإعدادات',
      subtitle: 'إدارة إعدادات حسابك وتفضيلاتك',
      notifications: 'الإشعارات',
      notificationDesc: 'تكوين كيفية تلقي الإشعارات',
      privacy: 'الخصوصية والأمان',
      privacyDesc: 'التحكم في إعدادات الخصوصية والأمان',
      preferences: 'التفضيلات',
      preferencesDesc: 'تخصيص تجربة التطبيق الخاصة بك',
      emailNotifications: 'إشعارات البريد الإلكتروني',
      pushNotifications: 'الإشعارات الفورية',
      smsNotifications: 'إشعارات الرسائل النصية',
      marketingEmails: 'رسائل تسويقية',
      profileVisibility: 'ظهور الملف الشخصي',
      dataSharing: 'مشاركة البيانات',
      analytics: 'تحليلات الاستخدام',
      darkMode: 'الوضع المظلم',
      autoLocation: 'تحديد الموقع تلقائياً',
      saveChanges: 'حفظ التغييرات',
      backToProfile: 'العودة للملف الشخصي',
      settingsSaved: 'تم حفظ الإعدادات بنجاح!',
      coming: 'قريباً',
      comingDesc: 'ستكون هذه الميزة متاحة في التحديث القادم'
    }
  };

  const t = translations[currentLang];

  const handleSaveSettings = () => {
    // في التطبيق الحقيقي، سيتم حفظ الإعدادات في قاعدة البيانات
    toast.success(t.settingsSaved);
  };

  return (
    <div className={`min-h-screen bg-gray-50 py-8 ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => onPageChange('profile')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.backToProfile}
          </Button>
          <h1 className="text-3xl text-primary mb-2">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        <div className="space-y-6">
          {/* Notifications Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                {t.notifications}
              </CardTitle>
              <CardDescription>{t.notificationDesc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4" />
                  <Label htmlFor="email-notifications">{t.emailNotifications}</Label>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notifications.email}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, email: checked})
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="h-4 w-4" />
                  <Label htmlFor="push-notifications">{t.pushNotifications}</Label>
                </div>
                <Switch
                  id="push-notifications"
                  checked={notifications.push}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, push: checked})
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-4 w-4" />
                  <Label htmlFor="sms-notifications">{t.smsNotifications}</Label>
                  <Badge variant="secondary">{t.coming}</Badge>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={notifications.sms}
                  disabled
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-4 w-4" />
                  <Label htmlFor="marketing-emails">{t.marketingEmails}</Label>
                </div>
                <Switch
                  id="marketing-emails"
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, marketing: checked})
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                {t.privacy}
              </CardTitle>
              <CardDescription>{t.privacyDesc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="profile-visibility">{t.profileVisibility}</Label>
                <Switch
                  id="profile-visibility"
                  checked={privacy.profileVisible}
                  onCheckedChange={(checked) => 
                    setPrivacy({...privacy, profileVisible: checked})
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="data-sharing">{t.dataSharing}</Label>
                  <Badge variant="secondary">{t.coming}</Badge>
                </div>
                <Switch
                  id="data-sharing"
                  checked={privacy.dataSharing}
                  disabled
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="analytics">{t.analytics}</Label>
                <Switch
                  id="analytics"
                  checked={privacy.analytics}
                  onCheckedChange={(checked) => 
                    setPrivacy({...privacy, analytics: checked})
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                {t.preferences}
              </CardTitle>
              <CardDescription>{t.preferencesDesc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {preferences.darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <Label htmlFor="dark-mode">{t.darkMode}</Label>
                  <Badge variant="secondary">{t.coming}</Badge>
                </div>
                <Switch
                  id="dark-mode"
                  checked={preferences.darkMode}
                  disabled
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="auto-location">{t.autoLocation}</Label>
                <Switch
                  id="auto-location"
                  checked={preferences.autoLocation}
                  onCheckedChange={(checked) => 
                    setPreferences({...preferences, autoLocation: checked})
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} className="bg-primary hover:bg-primary/90">
              {t.saveChanges}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}