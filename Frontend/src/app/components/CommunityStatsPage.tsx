import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Building2, 
  Star,
  Award,
  Heart,
  MessageCircle,
  ThumbsUp,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

interface CommunityStatsPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
}

export function CommunityStatsPage({ currentLang, onPageChange }: CommunityStatsPageProps) {
  const isRTL = currentLang === 'ar';
  
  const content = {
    en: {
      title: 'Community Statistics',
      subtitle: 'Insights and analytics from our Egyptian community',
      overview: 'Overview',
      topContributors: 'Top Contributors',
      popularServices: 'Popular Services',
      cityActivity: 'City Activity',
      trends: 'Trends',
      verification: 'Verification Status',
      engagement: 'Community Engagement',
      totalExperiences: 'Total Experiences',
      verifiedExperiences: 'Verified Experiences',
      totalVotes: 'Total Votes',
      totalComments: 'Total Comments',
      averageRating: 'Average Rating',
      responseTime: 'Avg Response Time',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      growth: 'Growth',
      active: 'Active',
      pending: 'Pending',
      rejected: 'Rejected',
      helpful: 'Helpful',
      notHelpful: 'Not Helpful',
      viewDetails: 'View Details',
      backToCommunity: 'Back to Community'
    },
    ar: {
      title: 'إحصائيات المجتمع',
      subtitle: 'رؤى وتحليلات من مجتمعنا المصري',
      overview: 'نظرة عامة',
      topContributors: 'أكثر المساهمين',
      popularServices: 'الخدمات الأكثر شعبية',
      cityActivity: 'نشاط المدن',
      trends: 'الاتجاهات',
      verification: 'حالة التحقق',
      engagement: 'التفاعل المجتمعي',
      totalExperiences: 'إجمالي التجارب',
      verifiedExperiences: 'التجارب المتحققة',
      totalVotes: 'إجمالي التصويتات',
      totalComments: 'إجمالي التعليقات',
      averageRating: 'متوسط التقييم',
      responseTime: 'متوسط وقت الاستجابة',
      thisWeek: 'هذا الأسبوع',
      thisMonth: 'هذا الشهر',
      growth: 'النمو',
      active: 'نشط',
      pending: 'في الانتظار',
      rejected: 'مرفوض',
      helpful: 'مفيد',
      notHelpful: 'غير مفيد',
      viewDetails: 'عرض التفاصيل',
      backToCommunity: 'العودة للمجتمع'
    }
  };

  const t = content[currentLang];

  const stats = {
    totalExperiences: 1247,
    verifiedExperiences: 892,
    totalVotes: 5634,
    totalComments: 2341,
    averageRating: 4.6,
    responseTime: '2.5 hours',
    weeklyGrowth: 15.3,
    monthlyGrowth: 42.7
  };

  const topContributors = [
    {
      id: '1',
      name: 'أحمد محمد',
      avatar: '/placeholder-avatar.jpg',
      contributions: 87,
      verifiedCount: 65,
      helpfulVotes: 234,
      badge: 'خبير'
    },
    {
      id: '2',
      name: 'فاطمة علي',
      avatar: '/placeholder-avatar.jpg',
      contributions: 72,
      verifiedCount: 58,
      helpfulVotes: 189,
      badge: 'موثوق'
    },
    {
      id: '3',
      name: 'محمود حسن',
      avatar: '/placeholder-avatar.jpg',
      contributions: 54,
      verifiedCount: 41,
      helpfulVotes: 156,
      badge: 'موثوق'
    }
  ];

  const popularServices = [
    { name: 'توثيق الشهادات', count: 234, government: 'وزارة الخارجية', growth: 12.5 },
    { name: 'استخراج شهادة ميلاد', count: 189, government: 'وزارة الداخلية', growth: 8.3 },
    { name: 'تجديد رخصة القيادة', count: 167, government: 'إدارة المرور', growth: 15.7 },
    { name: 'استخراج جواز سفر', count: 145, government: 'وزارة الداخلية', growth: 6.2 }
  ];

  const cityActivity = [
    { city: 'القاهرة', experiences: 456, verified: 89, activeUsers: 1234 },
    { city: 'الإسكندرية', experiences: 234, verified: 76, activeUsers: 789 },
    { city: 'الجيزة', experiences: 189, verified: 82, activeUsers: 567 },
    { city: 'المنيا', experiences: 134, verified: 91, activeUsers: 345 }
  ];

  return (
    <div className={`min-h-screen bg-background pt-20 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-gradient-to-l from-primary to-primary/80 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
            <p className="text-xl text-white/90 mb-8">{t.subtitle}</p>
            <Button 
              onClick={() => onPageChange('community')}
              variant="secondary"
              className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-white border-primary-foreground/30"
            >
              {t.backToCommunity}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
            <TabsTrigger value="contributors">{t.topContributors}</TabsTrigger>
            <TabsTrigger value="services">{t.popularServices}</TabsTrigger>
            <TabsTrigger value="cities">{t.cityActivity}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t.totalExperiences}</p>
                      <p className="text-3xl font-bold text-primary">{stats.totalExperiences.toLocaleString()}</p>
                    </div>
                    <Activity className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+{stats.weeklyGrowth}% {t.thisWeek}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t.verifiedExperiences}</p>
                      <p className="text-3xl font-bold text-secondary">{stats.verifiedExperiences.toLocaleString()}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-secondary" />
                  </div>
                  <div className="mt-2">
                    <Progress value={(stats.verifiedExperiences / stats.totalExperiences) * 100} className="h-2" />
                    <span className="text-sm text-muted-foreground mt-1">
                      {Math.round((stats.verifiedExperiences / stats.totalExperiences) * 100)}% {t.verification}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t.totalVotes}</p>
                      <p className="text-3xl font-bold text-blue-600">{stats.totalVotes.toLocaleString()}</p>
                    </div>
                    <ThumbsUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+{stats.monthlyGrowth}% {t.thisMonth}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t.averageRating}</p>
                      <div className="flex items-center">
                        <p className="text-3xl font-bold text-yellow-600">{stats.averageRating}</p>
                        <Star className="w-6 h-6 text-yellow-500 ml-1 fill-current" />
                      </div>
                    </div>
                    <BarChart3 className="w-8 h-8 text-yellow-600" />
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-muted-foreground">{t.responseTime}: {stats.responseTime}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Engagement Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    {t.engagement}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t.totalComments}</span>
                      <span className="font-medium">{stats.totalComments.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t.helpful}</span>
                      <span className="font-medium text-green-600">4,892</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t.notHelpful}</span>
                      <span className="font-medium text-red-600">742</span>
                    </div>
                    <Progress value={87} className="h-2" />
                    <p className="text-xs text-muted-foreground">87% positive engagement rate</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    {t.verification}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">{t.active}</span>
                      </div>
                      <span className="font-medium">892 (71.5%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">{t.pending}</span>
                      </div>
                      <span className="font-medium">234 (18.8%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm">{t.rejected}</span>
                      </div>
                      <span className="font-medium">121 (9.7%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contributors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topContributors.map((contributor) => (
                <Card key={contributor.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={contributor.avatar} />
                        <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{contributor.name}</h3>
                        <Badge className="bg-primary/10 text-primary">
                          <Award className="w-3 h-3 mr-1" />
                          {contributor.badge}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Contributions</span>
                        <span className="font-medium">{contributor.contributions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Verified</span>
                        <span className="font-medium text-green-600">{contributor.verifiedCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Helpful Votes</span>
                        <span className="font-medium text-blue-600">{contributor.helpfulVotes}</span>
                      </div>
                      <Progress value={(contributor.verifiedCount / contributor.contributions) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {Math.round((contributor.verifiedCount / contributor.contributions) * 100)}% verification rate
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="space-y-4">
              {popularServices.map((service, index) => (
                <Card key={service.name}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                          <span className="font-bold text-primary">#{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">{service.government}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-primary">{service.count}</p>
                          <p className="text-sm text-muted-foreground">تجربة</p>
                        </div>
                        <div className="flex items-center gap-1 text-green-600">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-medium">+{service.growth}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cities" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cityActivity.map((city) => (
                <Card key={city.city}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      {city.city}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Experiences</span>
                        <span className="text-xl font-bold text-primary">{city.experiences}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Verification Rate</span>
                        <span className="text-lg font-medium text-green-600">{city.verified}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Active Users</span>
                        <span className="text-lg font-medium text-blue-600">{city.activeUsers.toLocaleString()}</span>
                      </div>
                      <Progress value={city.verified} className="h-3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}