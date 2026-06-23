import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft,
  Car, 
  Clock, 
  MapPin, 
  Star, 
  Phone,
  MessageSquare,
  CreditCard,
  Navigation,
  Users,
  Shield,
  Zap
} from 'lucide-react';

interface RidesharePageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
}

export function RidesharePage({ currentLang, onPageChange }: RidesharePageProps) {
  const translations = {
    en: {
      title: "Ride Sharing Services",
      subtitle: "Book rides with Uber, Careem, and local taxi services",
      backToServices: "Back to Integrations",
      nearbyRides: "Nearby Rides",
      bookRide: "Book Ride",
      rideHistory: "Ride History",
      favoriteRoutes: "Favorite Routes",
      savedLocations: "Saved Locations",
      
      uber: "Uber",
      careem: "Careem",
      localTaxi: "Local Taxi",
      
      estimatedTime: "Estimated Time",
      estimatedPrice: "Estimated Price",
      driverRating: "Driver Rating",
      vehicleType: "Vehicle Type",
      
      comfort: "Comfort",
      economy: "Economy",
      business: "Business",
      
      pickup: "Pickup Location",
      destination: "Destination",
      selectOnMap: "Select on Map",
      confirmRide: "Confirm Ride",
      
      features: "Features",
      realTimeTracking: "Real-time Tracking",
      realTimeTrackingDesc: "Track your ride in real-time with GPS",
      multipleServices: "Multiple Services",
      multipleServicesDesc: "Compare prices across Uber, Careem, and local taxis",
      securePayment: "Secure Payment",
      securePaymentDesc: "Pay securely with credit card or mobile wallet",
      rideSharing: "Ride Sharing",
      rideSharingDesc: "Share rides with other passengers to save costs",
      
      quickActions: "Quick Actions",
      homeToWork: "Home to Work",
      workToHome: "Work to Home",
      toAirport: "To Airport",
      nearbyPlaces: "Nearby Places",
      
      available: "Available",
      minutes: "min",
      egp: "EGP",
      rating: "Rating"
    },
    ar: {
      title: "خدمات مشاركة الرحلات",
      subtitle: "احجز رحلات مع أوبر وكريم وخدمات التاكسي المحلية",
      backToServices: "العودة للتكاملات",
      nearbyRides: "الرحلات القريبة",
      bookRide: "حجز رحلة",
      rideHistory: "تاريخ الرحلات",
      favoriteRoutes: "المسارات المفضلة",
      savedLocations: "المواقع المحفوظة",
      
      uber: "أوبر",
      careem: "كريم",
      localTaxi: "تاكسي محلي",
      
      estimatedTime: "الوقت المتوقع",
      estimatedPrice: "السعر المتوقع",
      driverRating: "تقييم السائق",
      vehicleType: "نوع المركبة",
      
      comfort: "مريح",
      economy: "اقتصادي",
      business: "بيزنس",
      
      pickup: "موقع الانتظار",
      destination: "الوجهة",
      selectOnMap: "اختر على الخريطة",
      confirmRide: "تأكيد الرحلة",
      
      features: "المميزات",
      realTimeTracking: "التتبع الفوري",
      realTimeTrackingDesc: "تتبع رحلتك فورياً باستخدام GPS",
      multipleServices: "خدمات متعددة",
      multipleServicesDesc: "قارن الأسعار عبر أوبر وكريم والتاكسي المحلي",
      securePayment: "دفع آمن",
      securePaymentDesc: "ادفع بأمان بالبطاقة الائتمانية أو المحفظة الرقمية",
      rideSharing: "مشاركة الرحلات",
      rideSharingDesc: "شارك الرحلات مع ركاب آخرين لتوفير التكاليف",
      
      quickActions: "إجراءات سريعة",
      homeToWork: "من البيت للعمل",
      workToHome: "من العمل للبيت",
      toAirport: "للمطار",
      nearbyPlaces: "الأماكن القريبة",
      
      available: "متاح",
      minutes: "دقيقة",
      egp: "جنيه",
      rating: "التقييم"
    }
  };

  const t = translations[currentLang];

  const rideServices = [
    {
      id: 1,
      name: t.uber,
      type: t.comfort,
      estimatedTime: "5-8",
      price: "45-60",
      rating: 4.8,
      available: true,
      color: "bg-black"
    },
    {
      id: 2,
      name: t.careem,
      type: t.economy,
      estimatedTime: "3-6",
      price: "35-50",
      rating: 4.7,
      available: true,
      color: "bg-green-600"
    },
    {
      id: 3,
      name: t.localTaxi,
      type: t.economy,
      estimatedTime: "2-5",
      price: "25-40",
      rating: 4.2,
      available: true,
      color: "bg-yellow-600"
    }
  ];

  const quickRoutes = [
    { id: 1, title: t.homeToWork, from: "التجمع الخامس", to: "وسط البلد", time: "35 دقيقة", price: "45 جنيه" },
    { id: 2, title: t.workToHome, from: "وسط البلد", to: "التجمع الخامس", time: "40 دقيقة", price: "50 جنيه" },
    { id: 3, title: t.toAirport, from: "التجمع الخامس", to: "مطار القاهرة", time: "60 دقيقة", price: "120 جنيه" }
  ];

  const features = [
    {
      icon: Navigation,
      title: t.realTimeTracking,
      description: t.realTimeTrackingDesc
    },
    {
      icon: Users,
      title: t.multipleServices,
      description: t.multipleServicesDesc
    },
    {
      icon: Shield,
      title: t.securePayment,
      description: t.securePaymentDesc
    },
    {
      icon: Car,
      title: t.rideSharing,
      description: t.rideSharingDesc
    }
  ];

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
              <Car className="h-10 w-10 text-white" />
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
            
            {/* Book Ride */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 space-x-reverse">
                    <Car className="h-6 w-6 text-primary" />
                    <span>{t.bookRide}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t.pickup}</label>
                      <div className="flex items-center space-x-2 space-x-reverse p-3 bg-gray-50 rounded-lg">
                        <MapPin className="h-5 w-5 text-green-500" />
                        <span className="text-gray-700">التجمع الخامس، القاهرة الجديدة</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">{t.destination}</label>
                      <div className="flex items-center space-x-2 space-x-reverse p-3 bg-gray-50 rounded-lg">
                        <MapPin className="h-5 w-5 text-red-500" />
                        <span className="text-gray-700">وسط البلد، القاहرة</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Available Rides */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.nearbyRides}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rideServices.map((service) => (
                      <div key={service.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 space-x-reverse">
                            <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center`}>
                              <Car className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-medium">{service.name}</h4>
                              <p className="text-sm text-gray-600">{service.type}</p>
                              <div className="flex items-center space-x-1 space-x-reverse mt-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm">{service.rating}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center space-x-2 space-x-reverse mb-1">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">{service.estimatedTime} {t.minutes}</span>
                            </div>
                            <p className="font-medium">{service.price} {t.egp}</p>
                            <Badge variant="secondary" className="mt-1">
                              {t.available}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Routes */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.favoriteRoutes}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {quickRoutes.map((route) => (
                      <div key={route.id} className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <h4 className="font-medium text-sm">{route.title}</h4>
                        <p className="text-xs text-gray-600 mb-2">{route.from} → {route.to}</p>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">{route.time}</span>
                          <span className="font-medium">{route.price}</span>
                        </div>
                      </div>
                    ))}
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