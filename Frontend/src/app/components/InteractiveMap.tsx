import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { 
  Map, 
  Navigation, 
  Share2, 
  Filter, 
  Plus,
  Minus,
  MapPin,
  Car,
  Building,
  Hospital,
  Fuel,
  Train,
  Zap,
  Droplets,
  AlertTriangle,
  Clock,
  Phone,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  RefreshCw,
  Layers,
  Eye,
  EyeOff,
  Target,
  Route,
  Crosshair,
  Bell,
  BellRing,
  CheckCircle,
  AlertCircle,
  Info,
  Loader2,
  User,
  Home
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from "sonner";

interface InteractiveMapProps {
  currentLang: 'en' | 'ar';
  onServiceSelect?: (service: any) => void;
}

interface MapMarker {
  id: string;
  type: 'traffic' | 'government' | 'utility' | 'community';
  category: string;
  position: { lat: number; lng: number };
  title: string;
  description: string;
  status: 'active' | 'maintenance' | 'closed' | 'congested' | 'moderate' | 'clear';
  details?: {
    waitTime?: string;
    hours?: string;
    services?: string[];
    contact?: string;
    reportedBy?: string;
    reportTime?: string;
    upvotes?: number;
    downvotes?: number;
  };
}

export function InteractiveMap({ currentLang, onServiceSelect }: InteractiveMapProps) {
  const [selectedLayer, setSelectedLayer] = useState('all');
  const [zoomLevel, setZoomLevel] = useState(15); // Higher zoom for location-based view
  const [centerPosition, setCenterPosition] = useState({ lat: 30.0444, lng: 31.2357 }); // Cairo default
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [newReport, setNewReport] = useState({ type: '', location: '', description: '' });
  const [userLocation, setUserLocation] = useState<{ 
    lat: number; 
    lng: number; 
    accuracy?: number;
    address?: string;
  } | null>(null);
  const [isLocating, setIsLocating] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const mapRef = useRef<HTMLDivElement>(null);

  // Smart Features State
  const [smartNotifications, setSmartNotifications] = useState<Array<{
    id: string;
    type: 'traffic' | 'service' | 'utility' | 'ai';
    title: string;
    message: string;
    distance?: number;
    timestamp: Date;
    priority: 'low' | 'medium' | 'high';
    action?: { label: string; onClick: () => void };
  }>>([]);
  const [nearbyServices, setNearbyServices] = useState<Array<any>>([]);
  const [aiSuggestions, setAiSuggestions] = useState<Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    confidence: number;
  }>>([]);

  const translations = {
    en: {
      mapTitle: "Interactive Map",
      layers: "Map Layers",
      allLayers: "All",
      trafficLayer: "Traffic",
      govLayer: "Government",
      utilitiesLayer: "Utilities", 
      communityLayer: "Community",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      myLocation: "My Location",
      directions: "Get Directions",
      share: "Share Location",
      reportIssue: "Report Issue",
      refreshMap: "Refresh Map",
      lastUpdated: "Last updated",
      
      // Marker Details
      openNow: "Open Now",
      closed: "Closed",
      maintenance: "Under Maintenance",
      waitTime: "Wait Time",
      workingHours: "Working Hours",
      contactInfo: "Contact",
      availableServices: "Available Services",
      getDirections: "Get Directions",
      callNow: "Call Now",
      
      // Traffic Status
      trafficClear: "Clear",
      trafficModerate: "Moderate",
      trafficCongested: "Heavy Traffic",
      
      // Smart Features
      welcomeUser: "Hello! Showing updates around your current location",
      locationDetected: "Location detected",
      nearbyServices: "Nearby Services",
      smartAlerts: "Smart Alerts",
      aiSuggestions: "AI Suggestions",
      trafficAlert: "Traffic Alert",
      serviceNearby: "Service Nearby",
      routeSuggestion: "Best Route",
      allowLocation: "Allow Location Access",
      retry: "Retry",
      currentLocation: "Current Location",
      accuracy: "Accuracy",
      locating: "Finding your location...",
      locationError: "Unable to detect location",
      
      // Report Dialog
      reportTitle: "Report an Issue",
      reportType: "Issue Type",
      reportLocation: "Location",
      reportDescription: "Description",
      reportSubmit: "Submit Report",
      reportCancel: "Cancel",
      
      // Community Reports
      reportedBy: "Reported by",
      helpful: "Helpful",
      notHelpful: "Not Helpful",
      
      // Map Controls
      layerVisibility: "Show/Hide Layers",
      trafficInfo: "Traffic Information",
      govServices: "Government Services",
      utilities: "Public Utilities",
      communityReports: "Community Reports"
    },
    ar: {
      mapTitle: "الخريطة التفاعلية",
      layers: "طبقات الخريطة",
      allLayers: "الكل",
      trafficLayer: "المرور",
      govLayer: "حكومية",
      utilitiesLayer: "مرافق",
      communityLayer: "مجتمع",
      zoomIn: "تكبير",
      zoomOut: "تصغير", 
      myLocation: "موقعي",
      directions: "الاتجاهات",
      share: "مشاركة الموقع",
      reportIssue: "بلاغ عن مشكلة",
      refreshMap: "تحديث الخريطة",
      lastUpdated: "آخر تحديث",
      
      // Marker Details
      openNow: "مفتوح الآن",
      closed: "مغلق",
      maintenance: "تحت الصيانة",
      waitTime: "وقت الانتظار",
      workingHours: "ساعات العمل",
      contactInfo: "الاتصال",
      availableServices: "الخدمات المتاحة",
      getDirections: "الحصول على الاتجاهات",
      callNow: "اتصل الآن",
      
      // Traffic Status  
      trafficClear: "سالك",
      trafficModerate: "متوسط",
      trafficCongested: "زحمة شديدة",
      
      // Smart Features  
      welcomeUser: "مرحباً! عرض التحديثات حول موقعك الحالي",
      locationDetected: "تم تحديد الموقع",
      nearbyServices: "خدمات قريبة",
      smartAlerts: "تنبيهات ذكية",
      aiSuggestions: "اقتراحات ذكية",
      trafficAlert: "تنبيه مروري",
      serviceNearby: "خدمة قريبة",
      routeSuggestion: "أفضل طريق",
      allowLocation: "السماح بالوصول للموقع",
      retry: "إعادة المحاولة",
      currentLocation: "الموقع الحالي",
      accuracy: "دقة الموقع",
      locating: "جاري تحديد موقعك...",
      locationError: "تعذر تحديد الموقع",
      
      // Report Dialog
      reportTitle: "الإبلاغ عن مشكلة",
      reportType: "نوع المشكلة",
      reportLocation: "الموقع",
      reportDescription: "الوصف",
      reportSubmit: "إرسال البلاغ",
      reportCancel: "إلغاء",
      
      // Community Reports
      reportedBy: "أبلغ عنه",
      helpful: "مفيد",
      notHelpful: "غير مفيد",
      
      // Map Controls
      layerVisibility: "إظهار/إخفاء الطبقات",
      trafficInfo: "معلومات المرور",
      govServices: "الخدمات الحكومية", 
      utilities: "المرافق العامة",
      communityReports: "تقارير المجتمع"
    }
  };

  const t = translations[currentLang];
  const isRTL = currentLang === 'ar';

  // Location Detection Function
  const detectUserLocation = useCallback(() => {
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError(t.locationError);
      setIsLocating(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const newLocation = {
          lat: latitude,
          lng: longitude,
          accuracy: accuracy
        };
        
        setUserLocation(newLocation);
        setCenterPosition({ lat: latitude, lng: longitude });
        setZoomLevel(16); // Zoom in on user location
        setLocationPermission('granted');
        setIsLocating(false);
        
        // Reverse geocoding simulation
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`)
          .then(response => response.json())
          .then(data => {
            if (data.results && data.results[0]) {
              setUserLocation(prev => prev ? { ...prev, address: data.results[0].formatted } : null);
            }
          })
          .catch(() => {
            // Fallback address based on Cairo districts
            const address = currentLang === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt';
            setUserLocation(prev => prev ? { ...prev, address } : null);
          });

        toast.success(t.locationDetected);
        generateSmartNotifications(newLocation);
      },
      (error) => {
        setLocationPermission('denied');
        setIsLocating(false);
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError(currentLang === 'ar' ? 'تم رفض الإذن للوصول للموقع' : 'Location permission denied');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError(currentLang === 'ar' ? 'معلومات الموقع غير متاحة' : 'Location information unavailable');
            break;
          case error.TIMEOUT:
            setLocationError(currentLang === 'ar' ? 'انتهت مهلة تحديد الموقع' : 'Location request timed out');
            break;
          default:
            setLocationError(t.locationError);
            break;
        }
      },
      options
    );
  }, [currentLang, t]);

  // Generate Smart Notifications based on user location
  const generateSmartNotifications = useCallback((location: { lat: number; lng: number }) => {
    const notifications = [];
    const currentHour = new Date().getHours();
    
    // Traffic Alert based on time and location
    if (currentHour >= 7 && currentHour <= 9) {
      notifications.push({
        id: 'traffic-morning',
        type: 'traffic' as const,
        title: t.trafficAlert,
        message: currentLang === 'ar' ? 'زحمة شديدة متوقعة على الطريق الدائري' : 'Heavy traffic expected on Ring Road',
        distance: 1.2,
        timestamp: new Date(),
        priority: 'high' as const,
        action: {
          label: t.getDirections,
          onClick: () => window.open(`https://maps.google.com/directions?api=1&destination=${location.lat},${location.lng}`)
        }
      });
    }

    // Nearby Government Service
    notifications.push({
      id: 'service-nearby',
      type: 'service' as const,
      title: t.serviceNearby,
      message: currentLang === 'ar' ? 'أنت بالقرب من مكتب الأحوال المدنية (500 متر)' : 'You are near Civil Status Office (500m)',
      distance: 0.5,
      timestamp: new Date(),
      priority: 'medium' as const,
      action: {
        label: t.getDirections,
        onClick: () => window.open('https://maps.google.com/directions?api=1&destination=Civil+Status+Office+Cairo')
      }
    });

    // AI Route Suggestion
    if (currentHour >= 16 && currentHour <= 18) {
      notifications.push({
        id: 'ai-route',
        type: 'ai' as const,
        title: t.routeSuggestion,
        message: currentLang === 'ar' ? 'الطريق البديل عبر كوبري أكتوبر أسرع بـ 15 دقيقة' : 'Alternative route via October Bridge is 15 min faster',
        timestamp: new Date(),
        priority: 'medium' as const
      });
    }

    setSmartNotifications(notifications);
    
    // Generate AI suggestions
    const suggestions = [
      {
        id: 'nearest-hospital',
        type: 'healthcare',
        title: currentLang === 'ar' ? 'أقرب مستشفى' : 'Nearest Hospital',
        description: currentLang === 'ar' ? 'مستشفى القصر العيني - 2.3 كم' : 'Kasr Al-Ainy Hospital - 2.3 km',
        confidence: 0.95
      },
      {
        id: 'fuel-station',
        type: 'fuel',
        title: currentLang === 'ar' ? 'محطة وقود قريبة' : 'Nearby Fuel Station',
        description: currentLang === 'ar' ? 'محطة توتال - 800 متر' : 'Total Station - 800m',
        confidence: 0.88
      }
    ];
    
    setAiSuggestions(suggestions);
  }, [currentLang, t]);

  // Effect for initial location detection
  useEffect(() => {
    detectUserLocation();
  }, [detectUserLocation]);

  // Mock map data - in real app, this would come from APIs
  const [mapMarkers, setMapMarkers] = useState<MapMarker[]>([
    // Government Services
    {
      id: 'gov-1',
      type: 'government',
      category: 'civil-status',
      position: { lat: 30.0626, lng: 31.2497 },
      title: currentLang === 'ar' ? 'الأحوال المدنية - العباسية' : 'Civil Status - Abbasiya',
      description: currentLang === 'ar' ? 'خدمات الأحوال المدنية' : 'Civil status services',
      status: 'active',
      details: {
        waitTime: '25 min',
        hours: '9:00 AM - 3:00 PM',
        services: [
          currentLang === 'ar' ? 'استخراج شهادة ميلاد' : 'Birth certificate',
          currentLang === 'ar' ? 'بطاقة شخصية' : 'National ID',
          currentLang === 'ar' ? 'شهادة وفاة' : 'Death certificate'
        ],
        contact: '+20-2-12345678'
      }
    },
    {
      id: 'gov-2', 
      type: 'government',
      category: 'passports',
      position: { lat: 30.0444, lng: 31.2357 },
      title: currentLang === 'ar' ? 'مجمع التحرير - الجوازات' : 'Tahrir Complex - Passports',
      description: currentLang === 'ar' ? 'خدمات الجوازات والهجرة' : 'Passport and immigration services',
      status: 'maintenance',
      details: {
        waitTime: 'N/A',
        hours: currentLang === 'ar' ? 'مغلق للصيانة' : 'Closed for maintenance',
        services: [
          currentLang === 'ar' ? 'استخراج جواز سفر' : 'Passport issuance', 
          currentLang === 'ar' ? 'تجديد جواز سفر' : 'Passport renewal'
        ],
        contact: '+20-2-87654321'
      }
    },
    
    // Traffic Points
    {
      id: 'traffic-1',
      type: 'traffic',
      category: 'highway',
      position: { lat: 30.0131, lng: 31.2089 },
      title: currentLang === 'ar' ? 'الطريق الدائري' : 'Ring Road',
      description: currentLang === 'ar' ? 'حالة المرور على الطريق الدائري' : 'Ring Road traffic status',
      status: 'congested',
      details: {
        waitTime: '45 min delay'
      }
    },
    {
      id: 'traffic-2',
      type: 'traffic', 
      category: 'street',
      position: { lat: 30.0444, lng: 31.2290 },
      title: currentLang === 'ar' ? 'كورنيش النيل' : 'Nile Corniche',
      description: currentLang === 'ar' ? 'حالة المرور على الكورنيش' : 'Corniche traffic status',
      status: 'clear',
      details: {
        waitTime: '15 min'
      }
    },
    
    // Utilities
    {
      id: 'util-1',
      type: 'utility',
      category: 'hospital',
      position: { lat: 30.0378, lng: 31.2357 },
      title: currentLang === 'ar' ? 'مستشفى قصر العيني' : 'Kasr Al-Aini Hospital',
      description: currentLang === 'ar' ? 'مستشفى جامعي' : 'University hospital',
      status: 'active',
      details: {
        hours: '24/7',
        services: [
          currentLang === 'ar' ? 'طوارئ' : 'Emergency',
          currentLang === 'ar' ? 'عيادات خارجية' : 'Outpatient clinics'
        ],
        contact: '+20-2-23654789'
      }
    },
    {
      id: 'util-2',
      type: 'utility',
      category: 'fuel',
      position: { lat: 30.0521, lng: 31.2421 },
      title: currentLang === 'ar' ? 'محطة وقود - مصر للبترول' : 'Gas Station - Misr Petroleum',
      description: currentLang === 'ar' ? 'محطة بنزين' : 'Fuel station',
      status: 'active',
      details: {
        hours: '6:00 AM - 12:00 AM',
        services: [
          currentLang === 'ar' ? 'بنزين 80' : 'Gasoline 80',
          currentLang === 'ar' ? 'بنزين 92' : 'Gasoline 92',
          currentLang === 'ar' ? 'سولار' : 'Diesel'
        ]
      }
    },
    
    // Community Reports
    {
      id: 'comm-1',
      type: 'community',
      category: 'accident',
      position: { lat: 30.0290, lng: 31.2156 },
      title: currentLang === 'ar' ? 'حادث عند محور صفط' : 'Accident at Safat Junction',
      description: currentLang === 'ar' ? 'حادث مروري - الطريق مسدود جزئياً' : 'Traffic accident - Road partially blocked',
      status: 'active',
      details: {
        reportedBy: currentLang === 'ar' ? 'أحمد م.' : 'Ahmed M.',
        reportTime: '15 min ago',
        upvotes: 23,
        downvotes: 2
      }
    }
  ]);

  const getMarkerIcon = (marker: MapMarker) => {
    const baseClasses = "h-6 w-6";
    
    switch (marker.type) {
      case 'government':
        return <Building className={`${baseClasses} text-blue-600`} />;
      case 'traffic':
        return <Car className={`${baseClasses} ${
          marker.status === 'congested' ? 'text-red-600' : 
          marker.status === 'moderate' ? 'text-yellow-600' : 'text-green-600'
        }`} />;
      case 'utility':
        if (marker.category === 'hospital') return <Hospital className={`${baseClasses} text-red-500`} />;
        if (marker.category === 'fuel') return <Fuel className={`${baseClasses} text-orange-500`} />;
        if (marker.category === 'metro') return <Train className={`${baseClasses} text-blue-500`} />;
        return <Zap className={`${baseClasses} text-purple-500`} />;
      case 'community':
        return <AlertTriangle className={`${baseClasses} text-orange-600`} />;
      default:
        return <MapPin className={`${baseClasses} text-gray-600`} />;
    }
  };

  const getStatusBadge = (marker: MapMarker) => {
    switch (marker.status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 border-green-200">✅ {t.openNow}</Badge>;
      case 'closed':
        return <Badge className="bg-red-100 text-red-700 border-red-200">❌ {t.closed}</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">🔧 {t.maintenance}</Badge>;
      case 'congested':
        return <Badge className="bg-red-100 text-red-700 border-red-200">🔴 {t.trafficCongested}</Badge>;
      case 'moderate':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">🟡 {t.trafficModerate}</Badge>;
      case 'clear':
        return <Badge className="bg-green-100 text-green-700 border-green-200">🟢 {t.trafficClear}</Badge>;
      default:
        return null;
    }
  };

  const filteredMarkers = mapMarkers.filter(marker => {
    if (selectedLayer === 'all') return true;
    return marker.type === selectedLayer;
  });

  const handleGetUserLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(newLocation);
          setCenterPosition(newLocation);
          setIsLocating(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
        }
      );
    }
  };

  const handleRefreshMap = () => {
    setLastUpdated(new Date());
    // Simulate data refresh
    // In real app, this would fetch fresh data from APIs
  };

  const handleReportSubmit = () => {
    // In real app, this would submit to backend
    const newMarker: MapMarker = {
      id: `comm-${Date.now()}`,
      type: 'community',
      category: newReport.type,
      position: centerPosition, // Use current center as report location
      title: newReport.location,
      description: newReport.description,
      status: 'active',
      details: {
        reportedBy: currentLang === 'ar' ? 'أنت' : 'You',
        reportTime: 'Just now',
        upvotes: 0,
        downvotes: 0
      }
    };
    
    setMapMarkers([...mapMarkers, newMarker]);
    setShowReportDialog(false);
    setNewReport({ type: '', location: '', description: '' });
  };

  const handleMarkerClick = (marker: MapMarker) => {
    setSelectedMarker(marker);
  };

  const handleGetDirections = (marker: MapMarker) => {
    // In real app, this would open navigation app or show route
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${marker.position.lat},${marker.position.lng}`;
    window.open(mapsUrl, '_blank');
  };

  // Auto refresh every 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefreshMap();
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Smart Welcome Header */}
      {userLocation ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div className="flex-1">
            <h2 className="text-lg text-green-800 mb-1">{t.welcomeUser}</h2>
            <p className="text-sm text-green-600">
              {t.currentLocation}: {userLocation.address || `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`}
              {userLocation.accuracy && ` (${t.accuracy}: ${Math.round(userLocation.accuracy)}m)`}
            </p>
          </div>
        </div>
      ) : isLocating ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
          <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
          <p className="text-blue-800">{t.locating}</p>
        </div>
      ) : (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-orange-600" />
          <div className="flex-1">
            <p className="text-orange-800 mb-2">{locationError || t.locationError}</p>
            <Button size="sm" onClick={detectUserLocation} className="bg-orange-600 hover:bg-orange-700">
              <Crosshair className="h-4 w-4 mr-2" />
              {t.retry}
            </Button>
          </div>
        </div>
      )}

      {/* Smart Notifications Panel */}
      {smartNotifications.length > 0 && (
        <div>
          <h3 className="text-lg mb-3 flex items-center gap-2">
            <BellRing className="h-5 w-5" />
            {t.smartAlerts}
          </h3>
          <div className="grid gap-3">
            {smartNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 rounded-lg border-l-4 ${
                  notification.priority === 'high' ? 'bg-red-50 border-red-500' :
                  notification.priority === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                  'bg-blue-50 border-blue-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium mb-1">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                    {notification.distance && (
                      <p className="text-xs text-muted-foreground">
                        {notification.distance.toFixed(1)} km {currentLang === 'ar' ? 'بعيد' : 'away'}
                      </p>
                    )}
                  </div>
                  {notification.action && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={notification.action.onClick}
                      className="ml-2"
                    >
                      {notification.action.label}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Suggestions Panel */}
      {aiSuggestions.length > 0 && (
        <div>
          <h3 className="text-lg mb-3 flex items-center gap-2">
            <Info className="h-5 w-5" />
            {t.aiSuggestions}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-blue-900">{suggestion.title}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {Math.round(suggestion.confidence * 100)}%
                  </Badge>
                </div>
                <p className="text-sm text-blue-700">{suggestion.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Map Controls */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Tabs value={selectedLayer} onValueChange={setSelectedLayer} className="w-auto">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">{t.allLayers}</TabsTrigger>
              <TabsTrigger value="traffic">{t.trafficLayer}</TabsTrigger>
              <TabsTrigger value="government">{t.govLayer}</TabsTrigger>
              <TabsTrigger value="utility">{t.utilitiesLayer}</TabsTrigger>
              <TabsTrigger value="community">{t.communityLayer}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={detectUserLocation} disabled={isLocating}>
            <Target className={`h-4 w-4 mr-2 ${isLocating ? 'animate-pulse' : ''}`} />
            {t.myLocation}
          </Button>
          <Button variant="outline" size="sm" onClick={() => {
            setLastUpdated(new Date());
            detectUserLocation();
          }}>
            <RefreshCw className="h-4 w-4 mr-2" />
            {t.refreshMap}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowReportDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            {t.reportIssue}
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <Card className="overflow-hidden">
        <CardContent className="p-0 relative">
          <div 
            ref={mapRef}
            className="h-96 lg:h-[500px] relative overflow-hidden"
          >
            {/* Live Satellite Background */}
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1625812705723-7fc6dd16a07f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWlybyUyMGVneXB0JTIwaW50ZXJhY3RpdmUlMjBtYXAlMjBzYXRlbGxpdGUlMjByZWFsJTIwdGltZXxlbnwxfHx8fDE3NTcxMjI4OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt={currentLang === 'ar' ? 'صورة حية لخريطة القاهرة' : 'Live satellite map of Cairo'}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Interactive Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent">
            
            {/* Grid Lines for Interactive Feel */}
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={`v-${i}`} 
                     className="absolute top-0 bottom-0 border-l border-white/30" 
                     style={{ left: `${i * 10}%` }} />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={`h-${i}`} 
                     className="absolute left-0 right-0 border-t border-white/30" 
                     style={{ top: `${i * 12.5}%` }} />
              ))}
            </div>
            


            {/* User Location Marker - Enhanced */}
            {userLocation && (
              <div 
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                style={{
                  left: '50%', // Simplified positioning for demo
                  top: '50%'
                }}
              >
                <div className="relative">
                  {/* Main location marker */}
                  <div className="w-6 h-6 bg-blue-600 border-3 border-white rounded-full shadow-lg flex items-center justify-center">
                    <User className="h-3 w-3 text-white" />
                  </div>
                  
                  {/* Accuracy circle */}
                  <div className="absolute inset-0 w-6 h-6 bg-blue-400/30 rounded-full animate-ping"></div>
                  
                  {/* Location label */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-30">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap shadow-lg">
                      <div className="flex items-center gap-1">
                        <Home className="h-3 w-3" />
                        {t.currentLocation}
                      </div>
                      {userLocation.accuracy && (
                        <div className="text-xs opacity-80">
                          ±{Math.round(userLocation.accuracy)}m
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Map Markers */}
            {filteredMarkers.map((marker, index) => (
              <div
                key={marker.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 hover:z-30 transition-all duration-200 hover:scale-110"
                style={{
                  left: `${20 + (index % 5) * 15}%`,
                  top: `${20 + Math.floor(index / 5) * 20}%`
                }}
                onClick={() => handleMarkerClick(marker)}
              >
                <div className="relative">
                  <div className={`p-2 bg-white rounded-full shadow-lg border-2 ${
                    selectedMarker?.id === marker.id ? 'border-primary ring-4 ring-primary/20' : 'border-gray-200'
                  } hover:shadow-xl transition-all duration-200`}>
                    {getMarkerIcon(marker)}
                  </div>
                  
                  {/* Marker Label */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                    <div className="bg-white px-2 py-1 rounded text-xs shadow-md border whitespace-nowrap">
                      {marker.title.length > 20 ? marker.title.substring(0, 20) + '...' : marker.title}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Map Controls Overlay */}
            <div className="absolute top-16 right-4 flex flex-col gap-2 z-40">
              <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.min(zoomLevel + 1, 18))} className="bg-white">
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.max(zoomLevel - 1, 1))} className="bg-white">
                <Minus className="h-4 w-4" />
              </Button>
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-40">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>{t.trafficClear}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>{t.trafficModerate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>{t.trafficCongested}</span>
                </div>
              </div>
            </div>

            {/* Last Updated Info */}
            <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-2 z-40 text-xs text-muted-foreground">
              {t.lastUpdated}: {lastUpdated.toLocaleTimeString()}
            </div>

            {/* Live Indicator for Map */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm z-40">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>{currentLang === 'ar' ? 'خريطة حية' : 'LIVE MAP'}</span>
            </div>
            
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Marker Details */}
      {selectedMarker && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {getMarkerIcon(selectedMarker)}
                {selectedMarker.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                {getStatusBadge(selectedMarker)}
              </div>
            </div>
            <p className="text-muted-foreground">{selectedMarker.description}</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {selectedMarker.details && (
              <div className="grid md:grid-cols-2 gap-4">
                {selectedMarker.details.waitTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{t.waitTime}: {selectedMarker.details.waitTime}</span>
                  </div>
                )}
                
                {selectedMarker.details.hours && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{t.workingHours}: {selectedMarker.details.hours}</span>
                  </div>
                )}
                
                {selectedMarker.details.contact && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedMarker.details.contact}</span>
                  </div>
                )}

                {selectedMarker.details.reportedBy && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {t.reportedBy} {selectedMarker.details.reportedBy} • {selectedMarker.details.reportTime}
                    </span>
                  </div>
                )}
              </div>
            )}

            {selectedMarker.details?.services && (
              <div>
                <h4 className="text-sm mb-2">{t.availableServices}:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMarker.details.services.map((service, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Community Report Voting */}
            {selectedMarker.type === 'community' && selectedMarker.details && (
              <div className="flex items-center gap-4 pt-2 border-t">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  {selectedMarker.details.upvotes || 0}
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <ThumbsDown className="h-4 w-4" />
                  {selectedMarker.details.downvotes || 0}
                </Button>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button onClick={() => handleGetDirections(selectedMarker)} className="flex-1">
                <Route className="h-4 w-4 mr-2" />
                {t.getDirections}
              </Button>
              
              {selectedMarker.details?.contact && (
                <Button variant="outline" onClick={() => window.open(`tel:${selectedMarker.details?.contact}`)}>
                  <Phone className="h-4 w-4 mr-2" />
                  {t.callNow}
                </Button>
              )}
              
              <Button variant="outline" onClick={() => navigator.share?.({ 
                title: selectedMarker.title,
                text: selectedMarker.description,
                url: window.location.href 
              })}>
                <Share2 className="h-4 w-4 mr-2" />
                {t.share}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Report Issue Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className={isRTL ? 'rtl' : 'ltr'}>
          <DialogHeader>
            <DialogTitle>{t.reportTitle}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm mb-2 block">{t.reportType}</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={newReport.type}
                onChange={(e) => setNewReport({...newReport, type: e.target.value})}
              >
                <option value="">Select type...</option>
                <option value="accident">Accident</option>
                <option value="road-closed">Road Closed</option>
                <option value="utility-outage">Utility Outage</option>
                <option value="service-closed">Service Closed</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm mb-2 block">{t.reportLocation}</label>
              <Input
                value={newReport.location}
                onChange={(e) => setNewReport({...newReport, location: e.target.value})}
                placeholder="Location or landmark..."
              />
            </div>
            
            <div>
              <label className="text-sm mb-2 block">{t.reportDescription}</label>
              <textarea 
                className="w-full p-2 border rounded-md h-20 resize-none"
                value={newReport.description}
                onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                placeholder="Describe the issue..."
              />
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowReportDialog(false)}>
                {t.reportCancel}
              </Button>
              <Button onClick={handleReportSubmit} disabled={!newReport.type || !newReport.location}>
                {t.reportSubmit}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}