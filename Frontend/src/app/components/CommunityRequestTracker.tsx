import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Plus,
  Eye,
  MapPin,
  Building2,
  FileText,
  Calendar,
  User,
  Phone,
  Mail,
  Hash
} from 'lucide-react';
import { toast } from "sonner";

interface ServiceRequest {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  serviceType: string;
  government: string;
  location: string;
  requestNumber?: string;
  status: 'submitted' | 'under_review' | 'in_progress' | 'completed' | 'rejected';
  submissionDate: string;
  lastUpdate: string;
  estimatedCompletion?: string;
  actualCompletion?: string;
  progress: number;
  notes: string;
  contactInfo: {
    phone?: string;
    email?: string;
  };
  documents: string[];
  updates: RequestUpdate[];
}

interface RequestUpdate {
  id: string;
  date: string;
  status: string;
  description: string;
  updatedBy: string;
}

interface CommunityRequestTrackerProps {
  currentLang: 'en' | 'ar';
  user?: any;
}

export function CommunityRequestTracker({ currentLang, user }: CommunityRequestTrackerProps) {
  const [requests, setRequests] = useState<ServiceRequest[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'أحمد محمد',
      userAvatar: '/placeholder-avatar.jpg',
      serviceType: 'توثيق شهادة جامعية',
      government: 'وزارة الخارجية',
      location: 'مكتب التوثيق - القاهرة',
      requestNumber: 'DOC-2024-001234',
      status: 'in_progress',
      submissionDate: '2024-01-10',
      lastUpdate: '2024-01-15',
      estimatedCompletion: '2024-01-20',
      progress: 65,
      notes: 'تم استلام الأوراق وجاري المراجعة',
      contactInfo: {
        phone: '01234567890',
        email: 'ahmed@example.com'
      },
      documents: ['الشهادة الأصلية', 'صورة البطاقة', 'إيصال الدفع'],
      updates: [
        {
          id: 'u1',
          date: '2024-01-15',
          status: 'in_progress',
          description: 'تم بدء مراجعة الأوراق',
          updatedBy: 'موظف التوثيق'
        },
        {
          id: 'u2',
          date: '2024-01-12',
          status: 'under_review',
          description: 'تم استلام الأوراق كاملة',
          updatedBy: 'قسم الاستقبال'
        }
      ]
    }
  ]);
  
  const [showAddRequest, setShowAddRequest] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [newRequest, setNewRequest] = useState({
    serviceType: '',
    government: '',
    location: '',
    requestNumber: '',
    notes: '',
    phone: '',
    email: ''
  });

  const isRTL = currentLang === 'ar';
  
  const content = {
    en: {
      title: 'Request Tracker',
      subtitle: 'Track your government service requests',
      addRequest: 'Add New Request',
      myRequests: 'My Requests',
      allRequests: 'Community Requests',
      status: 'Status',
      submitted: 'Submitted',
      under_review: 'Under Review',
      in_progress: 'In Progress',
      completed: 'Completed',
      rejected: 'Rejected',
      requestNumber: 'Request Number',
      submissionDate: 'Submission Date',
      lastUpdate: 'Last Update',
      estimatedCompletion: 'Estimated Completion',
      progress: 'Progress',
      updates: 'Updates',
      viewDetails: 'View Details',
      serviceType: 'Service Type',
      government: 'Government Agency',
      location: 'Location',
      notes: 'Notes',
      contactInfo: 'Contact Information',
      phone: 'Phone',
      email: 'Email',
      documents: 'Required Documents',
      addNewRequest: 'Add New Request',
      save: 'Save Request',
      cancel: 'Cancel'
    },
    ar: {
      title: 'متتبع الطلبات',
      subtitle: 'تتبع طلبات الخدمات الحكومية الخاصة بك',
      addRequest: 'إضافة طلب جديد',
      myRequests: 'طلباتي',
      allRequests: 'طلبات المجتمع',
      status: 'الحالة',
      submitted: 'تم التقديم',
      under_review: 'قيد المراجعة',
      in_progress: 'جاري التنفيذ',
      completed: 'مكتمل',
      rejected: 'مرفوض',
      requestNumber: 'رقم الطلب',
      submissionDate: 'تاريخ التقديم',
      lastUpdate: 'آخر تحديث',
      estimatedCompletion: 'التاريخ المتوقع للإكمال',
      progress: 'التقدم',
      updates: 'التحديثات',
      viewDetails: 'عرض التفاصيل',
      serviceType: 'نوع الخدمة',
      government: 'الجهة الحكومية',
      location: 'المكان',
      notes: 'ملاحظات',
      contactInfo: 'معلومات الاتصال',
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      documents: 'الأوراق المطلوبة',
      addNewRequest: 'إضافة طلب جديد',
      save: 'حفظ الطلب',
      cancel: 'إلغاء'
    }
  };

  const t = content[currentLang];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-orange-100 text-orange-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <FileText className="w-4 h-4" />;
      case 'under_review':
        return <Eye className="w-4 h-4" />;
      case 'in_progress':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleAddRequest = () => {
    if (!user) {
      toast.error(currentLang === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Please login first');
      return;
    }

    const newReq: ServiceRequest = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      serviceType: newRequest.serviceType,
      government: newRequest.government,
      location: newRequest.location,
      requestNumber: newRequest.requestNumber || `REQ-${Date.now()}`,
      status: 'submitted',
      submissionDate: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0],
      progress: 10,
      notes: newRequest.notes,
      contactInfo: {
        phone: newRequest.phone,
        email: newRequest.email
      },
      documents: [],
      updates: [
        {
          id: 'initial',
          date: new Date().toISOString().split('T')[0],
          status: 'submitted',
          description: currentLang === 'ar' ? 'تم تقديم الطلب' : 'Request submitted',
          updatedBy: user.name
        }
      ]
    };

    setRequests(prev => [newReq, ...prev]);
    setShowAddRequest(false);
    setNewRequest({
      serviceType: '',
      government: '',
      location: '',
      requestNumber: '',
      notes: '',
      phone: '',
      email: ''
    });

    toast.success(currentLang === 'ar' ? 'تم إضافة الطلب بنجاح!' : 'Request added successfully!');
  };

  const userRequests = requests.filter(req => req.userId === user?.id);

  return (
    <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{t.title}</h2>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
        <Button onClick={() => setShowAddRequest(true)}>
          <Plus className="w-4 h-4 mr-2" />
          {t.addRequest}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{userRequests.filter(r => r.status === 'submitted').length}</div>
            <div className="text-sm text-muted-foreground">{t.submitted}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{userRequests.filter(r => r.status === 'in_progress').length}</div>
            <div className="text-sm text-muted-foreground">{t.in_progress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{userRequests.filter(r => r.status === 'completed').length}</div>
            <div className="text-sm text-muted-foreground">{t.completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{userRequests.length}</div>
            <div className="text-sm text-muted-foreground">{t.myRequests}</div>
          </CardContent>
        </Card>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {userRequests.map((request) => (
          <Card key={request.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={request.userAvatar} />
                    <AvatarFallback>{request.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{request.serviceType}</h3>
                    <p className="text-sm text-muted-foreground">{request.government}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(request.status)}>
                    {getStatusIcon(request.status)}
                    <span className="ml-1">{t[request.status as keyof typeof t]}</span>
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedRequest(request)}
                  >
                    {t.viewDetails}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium">{t.requestNumber}</p>
                  <p className="text-sm text-muted-foreground">{request.requestNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{t.submissionDate}</p>
                  <p className="text-sm text-muted-foreground">{request.submissionDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{t.lastUpdate}</p>
                  <p className="text-sm text-muted-foreground">{request.lastUpdate}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{t.progress}</span>
                  <span className="text-sm text-muted-foreground">{request.progress}%</span>
                </div>
                <Progress value={request.progress} className="h-2" />
              </div>

              {request.notes && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm">{request.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Request Dialog */}
      <Dialog open={showAddRequest} onOpenChange={setShowAddRequest}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.addNewRequest}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">{t.serviceType}</label>
                <Input
                  value={newRequest.serviceType}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, serviceType: e.target.value }))}
                  placeholder="توثيق شهادة جامعية"
                />
              </div>
              <div>
                <label className="text-sm font-medium">{t.government}</label>
                <Input
                  value={newRequest.government}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, government: e.target.value }))}
                  placeholder="وزارة الخارجية"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">{t.location}</label>
                <Input
                  value={newRequest.location}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="مكتب التوثيق - القاهرة"
                />
              </div>
              <div>
                <label className="text-sm font-medium">{t.requestNumber} (اختياري)</label>
                <Input
                  value={newRequest.requestNumber}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, requestNumber: e.target.value }))}
                  placeholder="DOC-2024-001234"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">{t.phone}</label>
                <Input
                  value={newRequest.phone}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="01234567890"
                />
              </div>
              <div>
                <label className="text-sm font-medium">{t.email}</label>
                <Input
                  type="email"
                  value={newRequest.email}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="example@email.com"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">{t.notes}</label>
              <Textarea
                value={newRequest.notes}
                onChange={(e) => setNewRequest(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="أي ملاحظات إضافية..."
                rows={3}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleAddRequest}
                disabled={!newRequest.serviceType || !newRequest.government}
                className="flex-1"
              >
                {t.save}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddRequest(false)}
                className="flex-1"
              >
                {t.cancel}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Request Details Dialog */}
      {selectedRequest && (
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {getStatusIcon(selectedRequest.status)}
                {selectedRequest.serviceType}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">{t.requestNumber}</p>
                  <p className="text-sm text-muted-foreground">{selectedRequest.requestNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{t.status}</p>
                  <Badge className={getStatusColor(selectedRequest.status)}>
                    {getStatusIcon(selectedRequest.status)}
                    <span className="ml-1">{t[selectedRequest.status as keyof typeof t]}</span>
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{t.progress}</span>
                  <span className="text-sm text-muted-foreground">{selectedRequest.progress}%</span>
                </div>
                <Progress value={selectedRequest.progress} className="h-3" />
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">{t.updates}</h4>
                <div className="space-y-3">
                  {selectedRequest.updates.map((update) => (
                    <div key={update.id} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{update.description}</span>
                          <span className="text-xs text-muted-foreground">{update.date}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{update.updatedBy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}