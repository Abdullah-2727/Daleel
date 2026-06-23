import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Train, 
  MapPin, 
  Clock, 
  Route,
  CreditCard,
  Smartphone,
  AlertCircle,
  CheckCircle,
  Navigation,
  Calendar,
  Users,
  Zap,
  Plus,
  QrCode,
  History,
  Settings
} from 'lucide-react';

interface MetroPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
}

export function MetroPage({ currentLang, onPageChange }: MetroPageProps) {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');

  const translations = {
    en: {
      title: "Cairo Metro",
      subtitle: "Smart navigation and real-time information for Cairo Metro system",
      tripPlanner: "Trip Planner",
      liveStatus: "Live Status",
      tickets: "Tickets & Cards",
      schedule: "Schedule",
      routePlanning: "Route Planning",
      from: "From Station",
      to: "To Station",
      selectStation: "Select station",
      planRoute: "Plan Route",
      quickRoute: "Quick Route",
      estimatedTime: "Estimated Time",
      distance: "Distance",
      fare: "Fare",
      transfers: "Transfers",
      nextTrain: "Next Train",
      lineStatus: "Line Status",
      operational: "Operational",
      delayed: "Delayed",
      maintenance: "Maintenance",
      closed: "Closed",
      line1: "Line 1 (Helwan - El Marg)",
      line2: "Line 2 (Shobra - Monib)",
      line3: "Line 3 (Adly Mansour - Kit Kat)",
      recentTrips: "Recent Trips",
      favoriteRoutes: "Favorite Routes",
      metroCard: "Metro Card",
      balance: "Balance",
      recharge: "Recharge",
      topUp: "Top Up",
      ticketTypes: "Ticket Types",
      singleTrip: "Single Trip",
      dayPass: "Day Pass",
      monthlyPass: "Monthly Pass",
      studentCard: "Student Card",
      seniorCard: "Senior Card",
      buyTicket: "Buy Ticket",
      addToWallet: "Add to Wallet",
      nearbyStations: "Nearby Stations",
      stationInfo: "Station Information",
      facilities: "Facilities",
      accessibility: "Accessibility",
      parkingAvailable: "Parking Available",
      escalator: "Escalator",
      elevator: "Elevator",
      restroom: "Restroom",
      shops: "Shops",
      atm: "ATM",
      liveUpdates: "Live Updates",
      crowdLevel: "Crowd Level",
      low: "Low",
      medium: "Medium",
      high: "High",
      minutes: "minutes",
      kilometers: "km",
      egp: "EGP"
    },
    ar: {
      title: "مترو القاهرة",
      subtitle: "ملاحة ذكية ومعلومات فورية لنظام مترو القاهرة",
      tripPlanner: "مخطط الرحلة",
      liveStatus: "الحالة المباشرة",
      tickets: "التذاكر والبطاقات",
      schedule: "المواعيد",
      routePlanning: "تخطيط المسار",
      from: "من محطة",
      to: "إلى محطة",
      selectStation: "اختر المحطة",
      planRoute: "خطط المسار",
      quickRoute: "مسار سريع",
      estimatedTime: "الوقت المقدر",
      distance: "المسافة",
      fare: "الأجرة",
      transfers: "التحويلات",
      nextTrain: "القطار التالي",
      lineStatus: "حالة الخط",
      operational: "يعمل",
      delayed: "متأخر",
      maintenance: "صيانة",
      closed: "مغلق",
      line1: "الخط 1 (حلوان - المرج)",
      line2: "الخط 2 (شبرا - المنيب)",
      line3: "الخط 3 (عدلي منصور - كيت كات)",
      recentTrips: "الرحلات الأخيرة",
      favoriteRoutes: "المسارات المفضلة",
      metroCard: "بطاقة المترو",
      balance: "الرصيد",
      recharge: "إعادة الشحن",
      topUp: "شحن",
      ticketTypes: "أنواع التذاكر",
      singleTrip: "رحلة واحدة",
      dayPass: "تذكرة يوم",
      monthlyPass: "تذكرة شهرية",
      studentCard: "بطاقة طالب",
      seniorCard: "بطاقة كبار السن",
      buyTicket: "شراء تذكرة",
      addToWallet: "إضافة للمحفظة",
      nearbyStations: "المحطات القريبة",
      stationInfo: "معلومات المحطة",
      facilities: "المرافق",
      accessibility: "إمكانية الوصول",
      parkingAvailable: "موقف متاح",
      escalator: "سلم متحرك",
      elevator: "مصعد",
      restroom: "دورة مياه",
      shops: "متاجر",
      atm: "ماكينة صراف",
      liveUpdates: "التحديثات المباشرة",
      crowdLevel: "مستوى الازدحام",
      low: "منخفض",
      medium: "متوسط",
      high: "عالي",
      minutes: "دقيقة",
      kilometers: "كم",
      egp: "جنيه"
    }
  };

  const t = translations[currentLang];

  const metroLines = [
    {
      id: 1,
      name: t.line1,
      color: 'bg-red-500',
      status: 'operational',
      nextTrain: '3 min',
      crowdLevel: 'medium'
    },
    {
      id: 2,
      name: t.line2,
      color: 'bg-yellow-500',
      status: 'operational',
      nextTrain: '5 min',
      crowdLevel: 'high'
    },
    {
      id: 3,
      name: t.line3,
      color: 'bg-green-500',
      status: 'delayed',
      nextTrain: '8 min',
      crowdLevel: 'low'
    }
  ];

  const stations = [
    'Al Shohadaa', 'Sadat', 'Nasser', 'Attaba', 'Mohamed Naguib', 'Maspero',
    'Saad Zaghloul', 'Sayeda Zeinab', 'El Malek El Saleh', 'Mar Girgis',
    'Zahra', 'Dar El Salam', 'Hadayek El Maadi', 'Maadi', 'Thakanat El Maadi',
    'Tora El Balad', 'Kozzika', 'Tora El Asmant', 'El Maasara', 'Hadayek Helwan',
    'Wadi Hof', 'Helwan University', 'Ain Helwan', 'Helwan'
  ];

  const recentTrips = [
    {
      id: 1,
      from: 'Sadat',
      to: 'Attaba',
      date: '2024-01-15',
      time: '14:30',
      duration: '12 min',
      cost: '6 EGP'
    },
    {
      id: 2,
      from: 'Nasser',
      to: 'Maadi',
      date: '2024-01-14',
      time: '09:15',
      duration: '25 min',
      cost: '9 EGP'
    },
    {
      id: 3,
      from: 'Helwan',
      to: 'Al Shohadaa',
      date: '2024-01-13',
      time: '18:45',
      duration: '45 min',
      cost: '12 EGP'
    }
  ];

  const ticketTypes = [
    {
      id: 'single',
      name: t.singleTrip,
      price: '6-12',
      description: currentLang === 'ar' ? 'تذكرة لرحلة واحدة' : 'One-way ticket',
      icon: Train
    },
    {
      id: 'day',
      name: t.dayPass,
      price: '25',
      description: currentLang === 'ar' ? 'رحلات غير محدودة ليوم واحد' : 'Unlimited rides for one day',
      icon: Calendar
    },
    {
      id: 'monthly',
      name: t.monthlyPass,
      price: '350',
      description: currentLang === 'ar' ? 'رحلات غير محدودة لشهر واحد' : 'Unlimited rides for one month',
      icon: CreditCard
    },
    {
      id: 'student',
      name: t.studentCard,
      price: '200',
      description: currentLang === 'ar' ? 'تذكرة شهرية للطلاب' : 'Monthly student discount card',
      icon: Users
    }
  ];

  const nearbyStations = [
    {
      name: 'Sadat',
      line: 'Line 1 & 2',
      distance: '0.2 km',
      walkTime: '3 min',
      facilities: ['escalator', 'elevator', 'restroom', 'shops'],
      crowdLevel: 'high'
    },
    {
      name: 'Nasser',
      line: 'Line 1 & 2',
      distance: '0.8 km',
      walkTime: '10 min',
      facilities: ['escalator', 'restroom', 'atm'],
      crowdLevel: 'medium'
    },
    {
      name: 'Attaba',
      line: 'Line 2',
      distance: '1.2 km',
      walkTime: '15 min',
      facilities: ['escalator', 'shops', 'parking'],
      crowdLevel: 'low'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'delayed': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getFacilityIcon = (facility: string) => {
    switch (facility) {
      case 'escalator': return <Zap className="h-4 w-4" />;
      case 'elevator': return <Navigation className="h-4 w-4" />;
      case 'restroom': return <Users className="h-4 w-4" />;
      case 'shops': return <MapPin className="h-4 w-4" />;
      case 'atm': return <CreditCard className="h-4 w-4" />;
      case 'parking': return <MapPin className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Train className="h-8 w-8 mr-3 text-primary" />
                {t.title}
              </h1>
              <p className="text-gray-600 mt-2">{t.subtitle}</p>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button variant="outline" size="sm">
                <QrCode className="h-4 w-4 mr-2" />
                {currentLang === 'ar' ? 'مسح QR' : 'Scan QR'}
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                {t.settings}
              </Button>
            </div>
          </div>

          {/* Live Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {metroLines.map((line) => (
              <Card key={line.id} className="cursor-pointer hover:shadow-lg transition-all" onClick={() => onPageChange('line-details')}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className={`w-4 h-4 ${line.color} rounded-full`}></div>
                      <div>
                        <h3 className="font-medium text-sm">{line.name}</h3>
                        <Badge className={getStatusColor(line.status)}>
                          {t[line.status as keyof typeof t]}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{t.nextTrain}</span>
                      <span className="text-sm font-medium">{line.nextTrain}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{t.crowdLevel}</span>
                      <span className={`text-sm font-medium ${getCrowdColor(line.crowdLevel)}`}>
                        {t[line.crowdLevel as keyof typeof t]}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Tabs defaultValue="planner" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="planner">{t.tripPlanner}</TabsTrigger>
            <TabsTrigger value="status">{t.liveStatus}</TabsTrigger>
            <TabsTrigger value="tickets">{t.tickets}</TabsTrigger>
            <TabsTrigger value="schedule">{t.schedule}</TabsTrigger>
          </TabsList>

          <TabsContent value="planner" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Route Planning Form */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.routePlanning}</CardTitle>
                  <CardDescription>
                    {currentLang === 'ar' ? 'خطط رحلتك واحصل على أفضل مسار' : 'Plan your trip and get the best route'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="from">{t.from}</Label>
                      <Select value={fromStation} onValueChange={setFromStation}>
                        <SelectTrigger>
                          <SelectValue placeholder={t.selectStation} />
                        </SelectTrigger>
                        <SelectContent>
                          {stations.map((station) => (
                            <SelectItem key={station} value={station}>
                              {station}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="to">{t.to}</Label>
                      <Select value={toStation} onValueChange={setToStation}>
                        <SelectTrigger>
                          <SelectValue placeholder={t.selectStation} />
                        </SelectTrigger>
                        <SelectContent>
                          {stations.map((station) => (
                            <SelectItem key={station} value={station}>
                              {station}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Route className="h-4 w-4 mr-2" />
                    {t.planRoute}
                  </Button>

                  {/* Sample Route Result */}
                  {fromStation && toStation && (
                    <div className="p-4 bg-blue-50 rounded-lg space-y-3">
                      <h4 className="font-medium text-blue-900">{t.quickRoute}</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-blue-700">{t.estimatedTime}</p>
                          <p className="font-medium">18 {t.minutes}</p>
                        </div>
                        <div>
                          <p className="text-blue-700">{t.distance}</p>
                          <p className="font-medium">12 {t.kilometers}</p>
                        </div>
                        <div>
                          <p className="text-blue-700">{t.fare}</p>
                          <p className="font-medium">9 {t.egp}</p>
                        </div>
                        <div>
                          <p className="text-blue-700">{t.transfers}</p>
                          <p className="font-medium">1</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 space-x-reverse text-sm">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>Line 1</span>
                        <span>→</span>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span>Line 2</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Nearby Stations */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">{t.nearbyStations}</h3>
                  <div className="space-y-4">
                    {nearbyStations.map((station, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onPageChange('station-details')}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-medium">{station.name}</h4>
                              <p className="text-sm text-gray-600">{station.line}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">{station.distance}</p>
                              <p className="text-xs text-gray-500">{station.walkTime} walk</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-600">{t.crowdLevel}</span>
                            <span className={`text-sm font-medium ${getCrowdColor(station.crowdLevel)}`}>
                              {t[station.crowdLevel as keyof typeof t]}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2 space-x-reverse">
                            <span className="text-xs text-gray-600">{t.facilities}:</span>
                            {station.facilities.map((facility, idx) => (
                              <div key={idx} className="text-gray-500">
                                {getFacilityIcon(facility)}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Recent Trips */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{t.recentTrips}</h3>
                    <Button variant="outline" size="sm">
                      <History className="h-4 w-4 mr-2" />
                      {currentLang === 'ar' ? 'عرض الكل' : 'View All'}
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {recentTrips.map((trip) => (
                      <Card key={trip.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onPageChange('trip-details')}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 space-x-reverse">
                              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Train className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{trip.from} → {trip.to}</p>
                                <p className="text-xs text-gray-600">{trip.date} • {trip.time}</p>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <p className="text-sm font-medium">{trip.cost}</p>
                              <p className="text-xs text-gray-500">{trip.duration}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="status" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.liveStatus}</CardTitle>
                <CardDescription>
                  {currentLang === 'ar' ? 'الحالة المباشرة لجميع خطوط المترو' : 'Real-time status of all metro lines'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metroLines.map((line) => (
                    <div key={line.id} className="p-6 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <div className={`w-6 h-6 ${line.color} rounded-full`}></div>
                          <div>
                            <h3 className="font-medium">{line.name}</h3>
                            <Badge className={getStatusColor(line.status)}>
                              {t[line.status as keyof typeof t]}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{t.nextTrain}</p>
                          <p className="font-medium">{line.nextTrain}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">{t.crowdLevel}</p>
                          <p className={`font-medium ${getCrowdColor(line.crowdLevel)}`}>
                            {t[line.crowdLevel as keyof typeof t]}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Operating Hours</p>
                          <p className="font-medium">05:00 - 24:00</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Frequency</p>
                          <p className="font-medium">3-5 min</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Metro Card Balance */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.metroCard}</CardTitle>
                  <CardDescription>
                    {currentLang === 'ar' ? 'أدر رصيد بطاقة المترو' : 'Manage your metro card balance'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-primary to-primary/80 rounded-lg text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm opacity-90">{t.metroCard}</p>
                        <p className="text-2xl font-bold">**** 1234</p>
                      </div>
                      <CreditCard className="h-8 w-8" />
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm opacity-90">{t.balance}</p>
                      <p className="text-3xl font-bold">45.50 {t.egp}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      {t.topUp}
                    </Button>
                    <Button variant="outline">
                      <Smartphone className="h-4 w-4 mr-2" />
                      {t.addToWallet}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Ticket Types */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t.ticketTypes}</h3>
                <div className="space-y-4">
                  {ticketTypes.map((ticket) => {
                    const IconComponent = ticket.icon;
                    
                    return (
                      <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 space-x-reverse">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <IconComponent className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{ticket.name}</h4>
                                <p className="text-sm text-gray-600">{ticket.description}</p>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <p className="font-bold text-lg">{ticket.price} {t.egp}</p>
                              <Button size="sm" className="mt-2">
                                {t.buyTicket}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.schedule}</CardTitle>
                <CardDescription>
                  {currentLang === 'ar' ? 'مواعيد تشغيل خطوط المترو' : 'Metro lines operating schedule'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {currentLang === 'ar' ? 'جدول المواعيد سيظهر هنا' : 'Schedule information will be displayed here'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}