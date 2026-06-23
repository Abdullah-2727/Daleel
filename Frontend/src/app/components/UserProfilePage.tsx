import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X } from 'lucide-react';
import { toast } from "sonner";

interface UserProfilePageProps {
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
  onUserUpdate: (updatedUser: any) => void;
}

export function UserProfilePage({ currentLang, onPageChange, user, onUserUpdate }: UserProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    location: user.location,
  });

  const translations = {
    en: {
      title: 'User Profile',
      subtitle: 'Manage your personal information and account settings',
      personalInfo: 'Personal Information',
      accountDetails: 'Account Details',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      location: 'Location',
      nationalId: 'National ID',
      joinDate: 'Member Since',
      status: 'Account Status',
      edit: 'Edit Profile',
      save: 'Save Changes',
      cancel: 'Cancel',
      active: 'Active',
      verified: 'Verified',
      premium: 'Premium User',
      saveSuccess: 'Profile updated successfully!',
      backToHome: 'Back to Home'
    },
    ar: {
      title: 'الملف الشخصي',
      subtitle: 'إدارة معلوماتك الشخصية وإعدادات الحساب',
      personalInfo: 'المعلومات الشخصية',
      accountDetails: 'تفاصيل الحساب',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      location: 'الموقع',
      nationalId: 'الرقم القومي',
      joinDate: 'عضو منذ',
      status: 'حالة الحساب',
      edit: 'تعديل الملف الشخصي',
      save: 'حفظ التغييرات',
      cancel: 'إلغاء',
      active: 'نشط',
      verified: 'موثق',
      premium: 'عضو مميز',
      saveSuccess: 'تم تحديث الملف الشخصي بنجاح!',
      backToHome: 'العودة للرئيسية'
    }
  };

  const t = translations[currentLang];

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData
    };
    onUserUpdate(updatedUser);
    setIsEditing(false);
    toast.success(t.saveSuccess);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
    });
    setIsEditing(false);
  };

  return (
    <div className={`min-h-screen bg-gray-50 py-8 ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => onPageChange('home')}
            className="mb-4"
          >
            ← {t.backToHome}
          </Button>
          <h1 className="text-3xl text-primary mb-2">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-lg">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="secondary">{t.active}</Badge>
                    {user.isVerified ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {t.verified}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        {currentLang === 'ar' ? 'في انتظار التحقق' : 'Pending Verification'}
                      </Badge>
                    )}
                    <Badge className="bg-secondary text-secondary-foreground">
                      {t.premium}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{t.personalInfo}</CardTitle>
                    <CardDescription>
                      {t.subtitle}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        {t.edit}
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button onClick={handleSave} size="sm">
                          <Save className="h-4 w-4 mr-2" />
                          {t.save}
                        </Button>
                        <Button onClick={handleCancel} variant="outline" size="sm">
                          <X className="h-4 w-4 mr-2" />
                          {t.cancel}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {t.name}
                    </Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    ) : (
                      <p className="text-sm bg-gray-50 p-3 rounded-md">{user.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {t.email}
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    ) : (
                      <p className="text-sm bg-gray-50 p-3 rounded-md">{user.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {t.phone}
                    </Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    ) : (
                      <p className="text-sm bg-gray-50 p-3 rounded-md">{user.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {t.location}
                    </Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                      />
                    ) : (
                      <p className="text-sm bg-gray-50 p-3 rounded-md">{user.location}</p>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-base mb-4">{t.accountDetails}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {t.joinDate}
                      </Label>
                      <p className="text-sm bg-gray-50 p-3 rounded-md">{user.joinDate}</p>
                    </div>

                    <div className="space-y-2">
                      <Label>{t.nationalId}</Label>
                      <p className="text-sm bg-gray-50 p-3 rounded-md">
                        {user.nationalId.replace(/(\d{5})(\d{8})(\d{1})/, '$1 **** **** $3')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}