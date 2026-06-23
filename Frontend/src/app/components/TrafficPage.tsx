import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft,
  MapPin, 
  Clock, 
  AlertTriangle, 
  Navigation,
  Car,
  Truck,
  Motorcycle,
  Route,
  Info,
  Zap,
  Shield,
  RadioIcon as Radio
} from 'lucide-react';

interface TrafficPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
}

export function TrafficPage({ currentLang, onPageChange }: TrafficPageProps) {
  const translations = {
    en: {
      title: "Traffic Management",
      subtitle: "Real-time traffic updates and smart route suggestions for Cairo",
      backToServices: "Back to Integrations",
      liveTraffic: "Live Traffic",
      routePlanning: "Route Planning",
      trafficAlerts: "Traffic Alerts",
      roadConditions: "Road Conditions",
      
      currentLocation: "Current Location",
      destination: "Destination",
      findRoute: "Find Best Route",
      alternativeRoutes: "Alternative Routes",
      
      trafficStatus: "Traffic Status",
      light: "Light",
      moderate: "Moderate",
      heavy: "Heavy",
      jammed: "Jammed",
      
      estimatedTime: "Estimated Time",
      distance: "Distance",
      avgSpeed: "Average Speed",
      
      features: "Features",
      realTimeUpdates: "Real-time Updates",
      realTimeUpdatesDesc: "Live traffic data updated every minute",
      smartRouting: "Smart Routing",
      smartRoutingDesc: "AI-powered route optimization based on current conditions",
      accidentAlerts: "Accident Alerts",
      accidentAlertsDesc: "Instant notifications about accidents and road closures",
      historicalData: "Historical Data",
      historicalDataDesc: "Traffic patterns analysis for better route planning",
      
      majorRoads: "Major Roads Status",
      ringRoad: "Ring Road",
      tahrir: "Tahrir Square",
      cityStars: "City Stars",
      newCapital: "New Capital Road",
      airport: "Airport Road",
      
      alerts: "Active Alerts",
      roadClosure: "Road Closure",
      accident: "Accident",
      construction: "Construction Work",
      
      minutes: "min",
      km: "km",
      kmh: "km/h"
    },
    ar: {
      title: "إدارة المرور",
      subtitle: "تحديثات مرور فورية واقتراحات مسارات ذكية للقاهرة",
      backToServices: "العودة للتكاملات",
      liveTraffic: "المرور المباشر",
      routePlanning: "تخطيط المسار",
      trafficAlerts: "تنبيهات المرور",
      roadConditions: "حالة الطرق",
      
      currentLocation: "الموقع الحالي",
      destination: "الوجهة",
      findRoute: "العثور على أفضل مسار",
      alternativeRoutes: "مسارات بديلة",
      
      trafficStatus: "حالة المرور",
      light: "خفيف",
      moderate: "متوسط",
      heavy: "كثيف",
      jammed: "مزدحم",
      
      estimatedTime: "الوقت المتوقع",
      distance: "المسافة",
      avgSpeed: "متوسط السرعة",
      
      features: "المميزات",
      realTimeUpdates: "تحديثات فورية",
      realTimeUpdatesDesc: "بيانات مرور مباشرة محدثة كل دقيقة",
      smartRouting: "توجيه ذكي",
      smartRoutingDesc: "تحسين المسار بالذكاء الاصطناعي حسب الظروف الحالية",
      accidentAlerts: "تنبيهات الحوادث",
      accidentAlertsDesc: "إشعارات فورية عن الحوادث وإغلاق الطرق",
      historicalData: "البيانات التاريخية",
      historicalDataDesc: "تحليل أنماط المرور لتخطيط أفضل للمسارات",
      
      majorRoads: "حالة الطرق الرئيسية",
      ringRoad: "الطريق الدائري",
      tahrir: "ميدان التحرير",
      cityStars: "سيتي ستارز",
      newCapital: "طريق العاصمة الجديدة",
      airport: "طريق المطار",
      
      alerts: "التنبيهات النشطة",
      roadClosure: "إغلاق طريق",
      accident: "حادث",
      construction: "أعمال إنشاءات",
      
      minutes: "دقيقة",
      km: "كم",
      kmh: "كم/س"
    }
  };

  const t = translations[currentLang];

  const majorRoads = [
    {
      id: 1,
      name: t.ringRoad,
      status: "moderate",
      avgSpeed: 45,
      incidents: 2,
      color: "bg-yellow-500"
    },
    {
      id: 2,
      name: t.tahrir,
      status: "heavy",
      avgSpeed: 15,
      incidents: 1,
      color: "bg-red-500"
    },
    {
      id: 3,
      name: t.airport,
      status: "light",
      avgSpeed: 65,
      incidents: 0,
      color: "bg-green-500"
    },
    {
      id: 4,
      name: t.newCapital,
      status: "moderate",
      avgSpeed: 55,
      incidents: 1,
      color: "bg-yellow-500"
    }
  ];

  const activeAlerts = [
    {
      id: 1,
      type: "accident",
      location: "الطريق الدائري - خروج المعادي",
      severity: "high",
      time: "15 دقيقة",
      icon: AlertTriangle,
      color: "text-red-500"
    },
    {
      id: 2,
      type: "construction",
      location: "كوبري قصر النيل",
      severity: "medium",
      time: "45 دقيقة",
      icon: Construction,
      color: "text-orange-500"
    },
    {
      id: 3,
      type: "roadClosure",
      location: "طريق صلاح سالم",
      severity: "high",
      time: "2 ساعة",
      icon: Route,
      color: "text-red-500"
    }
  ];

  const routes = [
    {
      id: 1,
      name: "الطريق السريع",
      time: "25",
      distance: "18.5",
      status: "moderate",
      traffic: "متوسط"
    },
    {
      id: 2,
      name: "الطريق البديل",
      time: "35",
      distance: "22.1",
      status: "light",
      traffic: "خفيف"
    },
    {
      id: 3,
      name: "الطريق الداخلي",
      time: "42",
      distance: "16.8",
      status: "heavy",
      traffic: "كثيف"
    }
  ];

  const features = [
    {
      icon: Radio,
      title: t.realTimeUpdates,
      description: t.realTimeUpdatesDesc
    },
    {
      icon: Navigation,
      title: t.smartRouting,
      description: t.smartRoutingDesc
    },
    {
      icon: AlertTriangle,
      title: t.accidentAlerts,
      description: t.accidentAlertsDesc
    },
    {
      icon: Clock,
      title: t.historicalData,
      description: t.historicalDataDesc
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'light': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'heavy': return 'bg-red-500';
      case 'jammed': return 'bg-red-700';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'light': return t.light;
      case 'moderate': return t.moderate;
      case 'heavy': return t.heavy;
      case 'jammed': return t.jammed;
      default: return status;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => onPageChange('integrations')}
            className="mb-6 hover:bg-primary/10"
          >
            <ArrowLeft className="h-4 w-4 mx-2" />
            {t.backToServices}
          </Button>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl text-primary mb-4">{t.title}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Route Planning */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 space-x-reverse">
                    <Navigation className="h-6 w-6 text-primary" />
                    <span>{t.routePlanning}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t.currentLocation}</label>
                      <div className="flex items-center space-x-2 space-x-reverse p-3 bg-gray-50 rounded-lg">
                        <MapPin className="h-5 w-5 text-green-500" />
                        <span className="text-gray-700">التجمع الخامس، القاهرة الجديدة</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">{t.destination}</label>
                      <div className="flex items-center space-x-2 space-x-reverse p-3 bg-gray-50 rounded-lg">
                        <MapPin className="h-5 w-5 text-red-500" />
                        <span className="text-gray-700">وسط البلد، القاهرة</span>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <Route className="h-4 w-4 mx-2" />
                      {t.findRoute}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Alternative Routes */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>{t.alternativeRoutes}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {routes.map((route, index) => (
                      <div key={route.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className={`w-8 h-8 ${getStatusColor(route.status)} rounded-full flex items-center justify-center`}>
                              <span className="text-white text-sm font-bold">{index + 1}</span>
                            </div>
                            <div>
                              <h4 className="font-medium">{route.name}</h4>
                              <p className="text-sm text-gray-600">{route.traffic}</p>
                            </div>
                          </div>
                          
                          <Badge variant={route.status === 'light' ? 'default' : route.status === 'moderate' ? 'secondary' : 'destructive'}>
                            {getStatusText(route.status)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <Clock className="h-4 w-4 mx-auto mb-1 text-gray-500" />
                            <p className="font-medium">{route.time} {t.minutes}</p>
                            <p className="text-xs text-gray-600">{t.estimatedTime}</p>
                          </div>
                          
                          <div className="text-center">
                            <Navigation className="h-4 w-4 mx-auto mb-1 text-gray-500" />
                            <p className="font-medium">{route.distance} {t.km}</p>
                            <p className="text-xs text-gray-600">{t.distance}</p>
                          </div>
                          
                          <div className="text-center">
                            <Car className="h-4 w-4 mx-auto mb-1 text-gray-500" />
                            <p className="font-medium">45 {t.kmh}</p>
                            <p className="text-xs text-gray-600">{t.avgSpeed}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Major Roads Status */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.majorRoads}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {majorRoads.map((road) => (
                      <div key={road.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className={`w-4 h-4 ${road.color} rounded-full`}></div>
                          <div>
                            <h4 className="font-medium text-sm">{road.name}</h4>
                            <p className="text-xs text-gray-600">{getStatusText(road.status)}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm font-medium">{road.avgSpeed} {t.kmh}</p>
                          <p className="text-xs text-gray-600">
                            {road.incidents} {currentLang === 'ar' ? 'حدث' : 'incidents'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Active Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 space-x-reverse">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <span>{t.alerts}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activeAlerts.map((alert) => {
                      const Icon = alert.icon;
                      return (
                        <div key={alert.id} className="p-3 border rounded-lg">
                          <div className="flex items-start space-x-2 space-x-reverse">
                            <Icon className={`h-4 w-4 ${alert.color} flex-shrink-0 mt-0.5`} />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{alert.location}</h4>
                              <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.features}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {features.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="flex items-start space-x-3 space-x-reverse">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{feature.title}</h4>
                            <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Construction icon component (since it's not in lucide-react)
function Construction({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  );
}