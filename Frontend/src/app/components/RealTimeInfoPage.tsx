import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  RefreshCw, 
  Clock, 
  MapPin, 
  DollarSign, 
  Cloud, 
  Car, 
  Building, 
  Phone, 
  Wifi, 
  AlertTriangle,
  Search,
  Map,
  Filter,
  ThumbsUp,
  ThumbsDown,
  Bell,
  BellOff,
  Eye,
  Users,
  Zap,
  Droplets,
  Train,
  Bus,
  Fuel,
  Hospital,
  CreditCard,
  ParkingCircle,
  Sun,
  Sunrise,
  Sunset,
  Wind,
  Calendar,
  TrendingUp,
  TrendingDown,
  Navigation,
  Share2
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { InteractiveMap } from './InteractiveMap';
import logoImage from '@/imports/Screenshot_2026-06-08_021823-removebg-preview.png';

interface RealTimeInfoPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
}

export function RealTimeInfoPage({ currentLang, onPageChange }: RealTimeInfoPageProps) {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);


  const [prayerNotifications, setPrayerNotifications] = useState(true);
  const [showMap, setShowMap] = useState(false);

  const translations = {
    en: {
      // Header
      searchPlaceholder: "Search for service, road, or facility...",
      solutions: "Solutions",
      govServices: "Gov Services",
      facilities: "Facilities",
      login: "Login",
      
      // Main Dashboard
      title: "Real-time Information",
      subtitle: "Live updates for daily life in Egypt",
      lastUpdated: "Last updated",
      refresh: "Refresh",
      refreshing: "Refreshing...",
      
      // Weather Widget
      weather: "Weather in Cairo",
      temperature: "Temperature",
      humidity: "Humidity",
      condition: "Condition",
      sunrise: "Sunrise",
      sunset: "Sunset",
      feelsLike: "Feels like",
      windSpeed: "Wind Speed",
      
      // Traffic Widget
      traffic: "Traffic Status",
      ringRoad: "Ring Road",
      corniche: "Corniche",
      salahSalem: "Salah Salem",
      october: "6th October",
      viewOnMap: "View on Map",
      trafficLight: "Light",
      trafficModerate: "Moderate", 
      trafficHeavy: "Heavy",
      
      // Government Services
      governmentServices: "Government Services",
      taxation: "Taxation",
      civilStatus: "Civil Status",
      passports: "Passports",
      landRegistry: "Land Registry",
      details: "Details",
      serviceAvailable: "Available",
      serviceMaintenance: "Maintenance",
      serviceClosed: "Closed",
      
      // Prayer Times
      prayerTimes: "Prayer Times",
      fajr: "Fajr",
      dhuhr: "Dhuhr", 
      asr: "Asr",
      maghrib: "Maghrib",
      isha: "Isha",
      nextPrayer: "Next Prayer",
      notifications: "Notifications",
      
      // Currency Exchange
      currencyRates: "Currency Exchange",
      usd: "USD",
      eur: "EUR",
      sar: "SAR",
      dailyUpdate: "Daily Update",
      liveUpdate: "Live Update",
      
      // Utilities Status
      utilities: "Utilities Status",
      metro: "Metro Operating",
      electricity: "Electricity Stable",
      water: "Water Supply Normal",
      internet: "Internet Stable",
      partialOutage: "Partial Outage in Mohandessin",
      
      // Interactive Map
      interactiveMap: "Interactive Map",
      mapLayers: "Map Layers",
      roadsOnly: "Roads Only",
      facilitiesOnly: "Facilities Only",
      showAll: "Show All",
      
      // Community Updates
      communityUpdates: "Community Updates",
      fromPeople: "Updates from People",
      
      // Sample Community Posts
      accidentPost: "Accident at Safat Junction - Road blocked",
      civilStatusPost: "Civil Status in Abbasiya very crowded - Queue takes 1 hour",
      
      // User Flow
      renewLicense: "Renew Driving License"
    },
    ar: {
      // Header  
      searchPlaceholder: "ابحث عن خدمة أو طريق أو مرفق...",
      solutions: "الحلول",
      govServices: "الخدمات الحكومية",
      facilities: "المرافق",
      login: "تسجيل الدخول",
      
      // Main Dashboard
      title: "معلومات فورية",
      subtitle: "تحديثات مباشرة للحياة اليومية في مصر",
      lastUpdated: "آخر تحديث",
      refresh: "تحديث",
      refreshing: "جاري التحديث...",
      
      // Weather Widget
      weather: "الطقس في القاهرة",
      temperature: "درجة الحرارة",
      humidity: "الرطوبة",
      condition: "الحالة",
      sunrise: "الشروق",
      sunset: "الغروب",
      feelsLike: "تشعر وكأنها",
      windSpeed: "سرعة الرياح",
      
      // Traffic Widget
      traffic: "حالة المرور",
      ringRoad: "الطريق الدائري",
      corniche: "الكورنيش",
      salahSalem: "صلاح سالم",
      october: "طريق أكتوبر",
      viewOnMap: "عرض على الخريطة",
      trafficLight: "خفيف",
      trafficModerate: "متوسط",
      trafficHeavy: "كثيف",
      
      // Government Services
      governmentServices: "الخدمات الحكومية",
      taxation: "الضرائب",
      civilStatus: "الأحوال المدنية",
      passports: "الجوازات",
      landRegistry: "الشهر العقاري",
      details: "تفاصيل",
      serviceAvailable: "متاح",
      serviceMaintenance: "صيانة",
      serviceClosed: "مغلق",
      
      // Prayer Times
      prayerTimes: "أوقات الصلاة",
      fajr: "الفجر",
      dhuhr: "الظهر",
      asr: "العصر", 
      maghrib: "المغرب",
      isha: "العشاء",
      nextPrayer: "الصلاة القادمة",
      notifications: "التنبيهات",
      
      // Currency Exchange
      currencyRates: "أسعار الصرف",
      usd: "الدولار الأمريكي",
      eur: "اليورو",
      sar: "الريال السعودي",
      dailyUpdate: "تحديث يومي",
      liveUpdate: "تحديث لحظي",
      
      // Utilities Status
      utilities: "حالة المرافق",
      metro: "المترو شغال",
      electricity: "الكهرباء مستقرة",
      water: "المياه عادية",
      internet: "الإنترنت مستقر",
      partialOutage: "انقطاع جزئي للكهرباء في المهندسين",
      
      // Interactive Map
      interactiveMap: "الخريطة التفاعلية",
      mapLayers: "طبقات الخريطة",
      roadsOnly: "عرض الطرق بس",
      facilitiesOnly: "عرض المرافق بس", 
      showAll: "عرض الكل",
      
      // Community Updates
      communityUpdates: "مساهمات المجتمع",
      fromPeople: "تحديثات من الناس",
      
      // Sample Community Posts
      accidentPost: "في حادث عند محور صفط – الطريق واقف",
      civilStatusPost: "الأحوال المدنية في العباسية زحمة جدًا – الدور بياخد ساعة",
      
      // User Flow
      renewLicense: "تجديد رخصة قيادة"
    }
  };

  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  // Mock real-time data with more detailed information
  const [realTimeData, setRealTimeData] = useState({
    weather: {
      temperature: 28,
      feelsLike: 32,
      humidity: 65,
      condition: currentLang === 'en' ? 'Sunny' : 'مشمس',
      sunrise: '6:15 AM',
      sunset: '6:45 PM',
      windSpeed: 12,
      icon: '☀️'
    },
    traffic: {
      ringRoad: { status: 'moderate', duration: '45 min' },
      corniche: { status: 'light', duration: '15 min' },
      salahSalem: { status: 'heavy', duration: '65 min' },
      october: { status: 'light', duration: '20 min' }
    },
    governmentServices: {
      taxation: { status: 'available', waitTime: '10 min' },
      civilStatus: { status: 'available', waitTime: '25 min' },
      passports: { status: 'maintenance', waitTime: 'N/A' },
      landRegistry: { status: 'available', waitTime: '15 min' }
    },
    prayerTimes: {
      fajr: '5:15 AM',
      dhuhr: '12:30 PM',
      asr: '3:45 PM',
      maghrib: '6:45 PM',
      isha: '8:15 PM',
      next: 'Maghrib',
      timeToNext: '2 hours'
    },
    currency: {
      usd: { rate: 31.25, change: 0.15 },
      eur: { rate: 34.80, change: -0.25 },
      sar: { rate: 8.35, change: 0.05 }
    },
    utilities: {
      metro: { status: 'operational', details: 'All lines running' },
      electricity: { status: 'stable', details: 'Full coverage' },
      water: { status: 'normal', details: 'Regular supply' },
      internet: { status: 'stable', details: 'Average speed 45 Mbps' },
      alerts: [
        { area: 'Mohandessin', type: 'electricity', message: currentLang === 'ar' ? 'انقطاع جزئي للكهرباء في المهندسين' : 'Partial power outage in Mohandessin' }
      ]
    },
    communityPosts: [
      {
        id: 1,
        message: t.accidentPost,
        upvotes: 23,
        downvotes: 2,
        timestamp: '15 min ago',
        verified: true
      },
      {
        id: 2,
        message: t.civilStatusPost,
        upvotes: 40,
        downvotes: 1,
        timestamp: '32 min ago',
        verified: true
      },
      {
        id: 3,
        message: currentLang === 'ar' ? 'محطة بنزين في التجمع الخامس مغلقة للصيانة' : 'Gas station in New Cairo closed for maintenance',
        upvotes: 15,
        downvotes: 0,
        timestamp: '1 hour ago',
        verified: false
      }
    ]
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
      // Simulate data updates
      setRealTimeData(prev => ({
        ...prev,
        weather: {
          ...prev.weather,
          temperature: Math.round(prev.weather.temperature + (Math.random() - 0.5) * 2)
        }
      }));
    }, 1500);
  };

  const getTrafficColor = (status: string) => {
    switch (status) {
      case 'light': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'heavy': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getServiceStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-50';
      case 'maintenance': return 'text-yellow-600 bg-yellow-50';
      case 'closed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCurrencyTrend = (change: number) => {
    if (change > 0) return { icon: TrendingUp, color: 'text-green-600' };
    if (change < 0) return { icon: TrendingDown, color: 'text-red-600' };
    return { icon: TrendingUp, color: 'text-gray-600' };
  };

  // Auto-refresh every 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Dashboard Header with Live Map Image */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl text-primary mb-4">{t.title}</h1>
          
          {/* Live Map Header Image */}
          <div className="relative mb-6 rounded-lg overflow-hidden shadow-lg">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1625812705723-7fc6dd16a07f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwY2Fpcm8lMjBzYXRlbGxpdGUlMjBtYXAlMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc1NzEyMjcyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt={currentLang === 'ar' ? 'صورة حية للقاهرة من الأقمار الصناعية' : 'Live satellite view of Cairo'}
              className="w-full h-48 lg:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-lg mb-2">{t.subtitle}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-90">{t.lastUpdated}: {lastUpdated.toLocaleTimeString()}</span>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="gap-2 bg-primary-foreground/20 border-primary-foreground/30 text-white hover:bg-primary-foreground/30"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? t.refreshing : t.refresh}
                </Button>
              </div>
            </div>
            
            {/* Live Indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>{currentLang === 'ar' ? 'مباشر' : 'LIVE'}</span>
            </div>
          </div>
        </div>

        {/* Info Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Weather Widget */}
          <Card className="bg-gradient-to-br from-blue-50 to-sky-100 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="text-2xl">{realTimeData.weather.icon}</div>
                {t.weather}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-3xl text-blue-700">
                  {realTimeData.weather.temperature}°C
                </div>
                <div className="text-sm text-muted-foreground">
                  {t.feelsLike} {realTimeData.weather.feelsLike}°C
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span>{realTimeData.weather.humidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <span>{realTimeData.weather.windSpeed} km/h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sunrise className="h-4 w-4 text-orange-500" />
                  <span>{realTimeData.weather.sunrise}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sunset className="h-4 w-4 text-orange-600" />
                  <span>{realTimeData.weather.sunset}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Traffic Status Widget */}
          <Card className="bg-gradient-to-br from-orange-50 to-red-100 border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-orange-600" />
                {t.traffic}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(realTimeData.traffic).map(([road, data]) => (
                <div key={road} className="flex justify-between items-center">
                  <span className="text-sm">{t[road as keyof typeof t] || road}</span>
                  <div className="flex items-center gap-2">
                    <Badge className={getTrafficColor(data.status)}>
                      {t[`traffic${data.status.charAt(0).toUpperCase() + data.status.slice(1)}` as keyof typeof t]}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{data.duration}</span>
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3"
                onClick={() => setShowMap(true)}
              >
                <Map className="h-4 w-4 mr-2" />
                {t.viewOnMap}
              </Button>
            </CardContent>
          </Card>

          {/* Government Services Widget */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-green-600" />
                {t.governmentServices}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(realTimeData.governmentServices).map(([service, data]) => (
                <div key={service} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t[service as keyof typeof t]}</span>
                    <Badge className={getServiceStatusColor(data.status)}>
                      {data.status === 'available' ? '✅' : data.status === 'maintenance' ? '🟨' : '❌'}
                      {t[`service${data.status.charAt(0).toUpperCase() + data.status.slice(1)}` as keyof typeof t]}
                    </Badge>
                  </div>
                  {data.status === 'available' && (
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Wait time: {data.waitTime}</span>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                        {t.details}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Prayer Times Widget */}
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-100 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  {t.prayerTimes}
                </div>
                <div className="flex items-center gap-2">
                  {prayerNotifications ? (
                    <Bell className="h-4 w-4 text-purple-600 cursor-pointer" onClick={() => setPrayerNotifications(false)} />
                  ) : (
                    <BellOff className="h-4 w-4 text-gray-400 cursor-pointer" onClick={() => setPrayerNotifications(true)} />
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(realTimeData.prayerTimes).slice(0, 5).map(([prayer, time]) => (
                  <div key={prayer} className="flex justify-between">
                    <span>{t[prayer as keyof typeof t]}:</span>
                    <span className={prayer === realTimeData.prayerTimes.next.toLowerCase() ? 'font-medium text-purple-600' : ''}>
                      {time}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-2 bg-purple-50 rounded text-sm text-center">
                <span className="text-purple-600">{t.nextPrayer}: {realTimeData.prayerTimes.next}</span>
                <br />
                <span className="text-xs text-muted-foreground">in {realTimeData.prayerTimes.timeToNext}</span>
              </div>
            </CardContent>
          </Card>

          {/* Currency Rates Widget */}
          <Card className="bg-gradient-to-br from-yellow-50 to-amber-100 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-yellow-600" />
                {t.currencyRates}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(realTimeData.currency).map(([currency, data]) => {
                const TrendIcon = getCurrencyTrend(data.change).icon;
                const trendColor = getCurrencyTrend(data.change).color;
                return (
                  <div key={currency} className="flex justify-between items-center">
                    <span className="text-sm">{t[currency as keyof typeof t]}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{data.rate} EGP</span>
                      <div className={`flex items-center gap-1 ${trendColor}`}>
                        <TrendIcon className="h-3 w-3" />
                        <span className="text-xs">{Math.abs(data.change)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="text-xs text-center text-muted-foreground pt-2 border-t">
                {t.liveUpdate} • Updated 2 min ago
              </div>
            </CardContent>
          </Card>

          {/* Utilities Status Widget */}
          <Card className="bg-gradient-to-br from-indigo-50 to-blue-100 border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-indigo-600" />
                {t.utilities}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Train className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">{t.metro}</span>
                  </div>
                  <Badge variant="default">✅</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm">{t.electricity}</span>
                  </div>
                  <Badge variant="default">✅</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">{t.water}</span>
                  </div>
                  <Badge variant="default">✅</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{t.internet}</span>
                  </div>
                  <Badge variant="default">✅</Badge>
                </div>
              </div>
              
              {/* Utility Alerts */}
              {realTimeData.utilities.alerts.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                  {realTimeData.utilities.alerts.map((alert, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-orange-50 rounded border border-orange-200">
                      <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                      <span className="text-xs text-orange-800">{alert.message}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Interactive Map Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5 text-primary" />
              {t.interactiveMap}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <InteractiveMap 
              currentLang={currentLang}
              onServiceSelect={(service) => {
                // Handle service selection if needed
                console.log('Selected service:', service);
              }}
            />
          </CardContent>
        </Card>

        {/* Community Updates Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              {t.communityUpdates}
            </CardTitle>
            <CardDescription>{t.fromPeople}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {realTimeData.communityPosts.map((post) => (
                <div key={post.id} className="p-4 bg-muted/50 rounded-lg border">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm mb-2">{post.message}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{post.timestamp}</span>
                        {post.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <Eye className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="gap-1 text-xs">
                        <ThumbsUp className="h-3 w-3" />
                        {post.upvotes}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1 text-xs">
                        <ThumbsDown className="h-3 w-3" />
                        {post.downvotes}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="outline" onClick={() => onPageChange('community')}>
                <Users className="h-4 w-4 mr-2" />
                {currentLang === 'ar' ? 'عرض المزيد من التحديثات' : 'View More Updates'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}