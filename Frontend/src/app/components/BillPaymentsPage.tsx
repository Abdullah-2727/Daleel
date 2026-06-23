import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, Clock, Zap, Wifi, Car, Home, Phone, CreditCard, Plus, History, Bell } from 'lucide-react';
import { PaymentGatewayDialog } from './PaymentGatewayDialog';
import { toast } from "sonner";

interface BillPaymentsPageProps {
  currentLang: 'en' | 'ar';
  onPageChange: (page: string) => void;
}

export function BillPaymentsPage({ currentLang, onPageChange }: BillPaymentsPageProps) {
  const [selectedBill, setSelectedBill] = useState<string>('');
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedBillForPayment, setSelectedBillForPayment] = useState<any>(null);
  const [quickPayAmount, setQuickPayAmount] = useState('');
  const [quickPayAccount, setQuickPayAccount] = useState('');

  const translations = {
    en: {
      title: "Bill Payments",
      subtitle: "Manage and pay all your bills from one place",
      payBills: "Pay Bills",
      billHistory: "Bill History", 
      scheduledPayments: "Scheduled Payments",
      quickPay: "Quick Pay",
      newPayment: "New Payment",
      billType: "Bill Type",
      selectBillType: "Select bill type",
      accountNumber: "Account Number",
      amount: "Amount",
      payNow: "Pay Now",
      schedulePayment: "Schedule Payment",
      recentPayments: "Recent Payments",
      upcomingBills: "Upcoming Bills",
      savedBills: "Saved Bills",
      electricity: "Electricity",
      water: "Water",
      gas: "Gas",
      internet: "Internet",
      mobile: "Mobile",
      landline: "Landline",
      insurance: "Insurance",
      loans: "Loans",
      subscriptions: "Subscriptions",
      paid: "Paid",
      pending: "Pending",
      overdue: "Overdue",
      dueDate: "Due Date",
      lastPaid: "Last Paid",
      totalDue: "Total Due",
      addBill: "Add Bill",
      autoPayEnabled: "Auto Pay Enabled",
      enableAutoPay: "Enable Auto Pay",
      viewDetails: "View Details",
      paymentHistory: "Payment History",
      billReminders: "Bill Reminders",
      reminderSettings: "Reminder Settings"
    },
    ar: {
      title: "دفع الفواتير",
      subtitle: "أدر وادفع جميع فواتيرك من مكان واحد",
      payBills: "دفع الفواتير",
      billHistory: "تاريخ الفواتير",
      scheduledPayments: "المدفوعات المجدولة", 
      quickPay: "دفع سريع",
      newPayment: "دفعة جديدة",
      billType: "نوع الفاتورة",
      selectBillType: "اختر نوع الفاتورة",
      accountNumber: "رقم الحساب",
      amount: "المبلغ",
      payNow: "ادفع الآن",
      schedulePayment: "جدولة الدفعة",
      recentPayments: "المدفوعات الأخيرة",
      upcomingBills: "الفواتير القادمة",
      savedBills: "الفواتير المحفوظة",
      electricity: "الكهرباء",
      water: "المياه",
      gas: "الغاز",
      internet: "الإنترنت",
      mobile: "الموبايل",
      landline: "الخط الأرضي",
      insurance: "التأمين",
      loans: "القروض",
      subscriptions: "الاشتراكات",
      paid: "مدفوع",
      pending: "معلق",
      overdue: "متأخر",
      dueDate: "تاريخ الاستحقاق",
      lastPaid: "آخر دفعة",
      totalDue: "إجمالي المستحق",
      addBill: "إضافة فاتورة",
      autoPayEnabled: "الدفع التلقائي مفعل",
      enableAutoPay: "تفعيل الدفع التلقائي",
      viewDetails: "عرض التفاصيل",
      paymentHistory: "تاريخ المدفوعات",
      billReminders: "تذكيرات الفواتير",
      reminderSettings: "إعدادات التذكير"
    }
  };

  const t = translations[currentLang];

  const billTypes = [
    { id: 'electricity', name: t.electricity, icon: Zap, color: 'bg-yellow-500' },
    { id: 'water', name: t.water, icon: Home, color: 'bg-blue-500' },
    { id: 'gas', name: t.gas, icon: Home, color: 'bg-orange-500' },
    { id: 'internet', name: t.internet, icon: Wifi, color: 'bg-purple-500' },
    { id: 'mobile', name: t.mobile, icon: Phone, color: 'bg-green-500' },
    { id: 'insurance', name: t.insurance, icon: Car, color: 'bg-red-500' }
  ];

  const savedBills = [
    {
      id: 1,
      type: 'electricity',
      company: 'South Cairo Electricity',
      accountNumber: '123456789',
      lastAmount: 450.75,
      dueDate: '2024-02-15',
      status: 'pending',
      autoPay: true
    },
    {
      id: 2,
      type: 'water',
      company: 'Cairo Water Company',
      accountNumber: '987654321',
      lastAmount: 125.50,
      dueDate: '2024-02-20',
      status: 'paid',
      autoPay: false
    },
    {
      id: 3,
      type: 'internet',
      company: 'Telecom Egypt',
      accountNumber: '456789123',
      lastAmount: 299.00,
      dueDate: '2024-02-10',
      status: 'overdue',
      autoPay: false
    },
    {
      id: 4,
      type: 'mobile',
      company: 'Vodafone Egypt',
      accountNumber: '01012345678',
      lastAmount: 85.25,
      dueDate: '2024-02-25',
      status: 'pending',
      autoPay: true
    }
  ];

  const recentPayments = [
    {
      id: 1,
      type: 'electricity',
      company: 'South Cairo Electricity',
      amount: 425.50,
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      type: 'water',
      company: 'Cairo Water Company',
      amount: 125.50,
      date: '2024-01-20',
      status: 'completed'
    },
    {
      id: 3,
      type: 'mobile',
      company: 'Vodafone Egypt',
      amount: 75.00,
      date: '2024-01-25',
      status: 'completed'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(currentLang === 'ar' ? 'ar-EG' : 'en-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getBillTypeInfo = (type: string) => {
    return billTypes.find(bt => bt.id === type) || billTypes[0];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalDue = savedBills
    .filter(bill => bill.status === 'pending' || bill.status === 'overdue')
    .reduce((sum, bill) => sum + bill.lastAmount, 0);

  const handlePayBill = (bill: any) => {
    const billTypeInfo = getBillTypeInfo(bill.type);
    setSelectedBillForPayment({
      company: bill.company,
      type: billTypeInfo.name,
      amount: bill.lastAmount,
      accountNumber: bill.accountNumber,
      dueDate: bill.dueDate
    });
    setPaymentDialogOpen(true);
  };

  const handleQuickPaySubmit = () => {
    if (!selectedBill) {
      toast.error(currentLang === 'ar' ? 'الرجاء اختيار نوع الفاتورة' : 'Please select bill type');
      return;
    }
    if (!quickPayAccount) {
      toast.error(currentLang === 'ar' ? 'الرجاء إدخال رقم الحساب' : 'Please enter account number');
      return;
    }
    if (!quickPayAmount || parseFloat(quickPayAmount) <= 0) {
      toast.error(currentLang === 'ar' ? 'الرجاء إدخال المبلغ' : 'Please enter amount');
      return;
    }

    const billTypeInfo = getBillTypeInfo(selectedBill);
    setSelectedBillForPayment({
      company: billTypeInfo.name,
      type: billTypeInfo.name,
      amount: parseFloat(quickPayAmount),
      accountNumber: quickPayAccount
    });
    setPaymentDialogOpen(true);
  };

  const handlePaymentSuccess = () => {
    // Reset quick pay form
    setSelectedBill('');
    setQuickPayAccount('');
    setQuickPayAmount('');
    
    toast.success(
      currentLang === 'ar' 
        ? 'تم إرسال إشعار بنجاح الدفع' 
        : 'Payment confirmation sent'
    );
  };

  return (
    <div className={`min-h-screen ${currentLang === 'ar' ? 'rtl' : 'ltr'}`} style={{ background: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl text-primary">{t.title}</h1>
              <p className="text-muted-foreground mt-2">{t.subtitle}</p>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button variant="outline" size="sm" className="rounded-2xl">
                <Bell className="h-4 w-4 mr-2" />
                {t.billReminders}
              </Button>
              <Button className="gradient-primary text-white hover:opacity-90 rounded-2xl">
                <Plus className="h-4 w-4 mr-2" />
                {t.addBill}
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="cursor-pointer hover-lift bg-white border-2 border-gray-200 shadow-sm rounded-3xl hover:border-blue-200" onClick={() => onPageChange('overdue-bills')}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t.totalDue}</p>
                    <p className="text-2xl text-red-600">{formatCurrency(totalDue)}</p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center">
                    <CreditCard className="h-7 w-7 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover-lift bg-white border-2 border-gray-200 shadow-sm rounded-3xl hover:border-blue-200" onClick={() => onPageChange('saved-bills')}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t.savedBills}</p>
                    <p className="text-2xl text-primary">{savedBills.length}</p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <History className="h-7 w-7 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover-lift bg-white border-2 border-gray-200 shadow-sm rounded-3xl hover:border-blue-200" onClick={() => onPageChange('autopay-settings')}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t.autoPayEnabled}</p>
                    <p className="text-2xl text-green-600">
                      {savedBills.filter(bill => bill.autoPay).length}
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">
                    <Clock className="h-7 w-7 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="payBills" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="payBills">{t.payBills}</TabsTrigger>
            <TabsTrigger value="history">{t.billHistory}</TabsTrigger>
            <TabsTrigger value="scheduled">{t.scheduledPayments}</TabsTrigger>
          </TabsList>

          <TabsContent value="payBills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Pay Form */}
              <Card className="bg-white border-2 border-gray-200 shadow-sm rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-primary">{t.quickPay}</CardTitle>
                  <CardDescription>
                    {currentLang === 'ar' ? 'ادفع فاتورة جديدة بسرعة' : 'Pay a new bill quickly'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="billType">{t.billType}</Label>
                    <Select value={selectedBill} onValueChange={setSelectedBill}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.selectBillType} />
                      </SelectTrigger>
                      <SelectContent>
                        {billTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <type.icon className="h-4 w-4" />
                              <span>{type.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">{t.accountNumber}</Label>
                    <Input 
                      id="accountNumber" 
                      placeholder="123456789" 
                      value={quickPayAccount}
                      onChange={(e) => setQuickPayAccount(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">{t.amount}</Label>
                    <Input 
                      id="amount" 
                      type="number" 
                      placeholder="0.00" 
                      value={quickPayAmount}
                      onChange={(e) => setQuickPayAmount(e.target.value)}
                    />
                  </div>

                  <div className="flex space-x-4 space-x-reverse pt-4">
                    <Button 
                      className="flex-1 gradient-primary text-white hover:opacity-90" 
                      onClick={handleQuickPaySubmit}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      {t.payNow}
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-2xl">
                      <Calendar className="h-4 w-4 mr-2" />
                      {t.schedulePayment}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Saved Bills */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl text-primary">{t.savedBills}</h3>
                  <Button variant="outline" size="sm" className="rounded-2xl">
                    <Plus className="h-4 w-4 mr-2" />
                    {t.addBill}
                  </Button>
                </div>

                <div className="space-y-3">
                  {savedBills.map((bill) => {
                    const billTypeInfo = getBillTypeInfo(bill.type);
                    const IconComponent = billTypeInfo.icon;
                    
                    return (
                      <Card key={bill.id} className="bg-white border-2 border-gray-200 shadow-sm hover-lift rounded-3xl hover:border-blue-200 cursor-pointer" onClick={() => onPageChange('bill-details')}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 space-x-reverse">
                              <div className={`w-10 h-10 ${billTypeInfo.color} rounded-lg flex items-center justify-center`}>
                                <IconComponent className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-medium">{bill.company}</h4>
                                <p className="text-sm text-gray-600">{bill.accountNumber}</p>
                                <div className="flex items-center space-x-2 space-x-reverse mt-1">
                                  <Badge className={getStatusColor(bill.status)}>
                                    {t[bill.status as keyof typeof t]}
                                  </Badge>
                                  {bill.autoPay && (
                                    <Badge variant="outline" className="text-xs">
                                      Auto Pay
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <p className="font-semibold text-lg">
                                {formatCurrency(bill.lastAmount)}
                              </p>
                              <p className="text-sm text-gray-600">
                                {t.dueDate}: {bill.dueDate}
                              </p>
                              {bill.status === 'pending' || bill.status === 'overdue' ? (
                                <Button 
                                  size="sm" 
                                  className="mt-2 gradient-primary text-white hover:opacity-90" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePayBill(bill);
                                  }}
                                >
                                  {t.payNow}
                                </Button>
                              ) : (
                                <Button variant="outline" size="sm" className="mt-2 rounded-2xl" onClick={(e) => {
                                  e.stopPropagation();
                                  onPageChange('bill-details');
                                }}>
                                  {t.viewDetails}
                                </Button>
                              )}
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

          <TabsContent value="history" className="space-y-6">
            <Card className="bg-white border-2 border-gray-200 shadow-sm rounded-3xl">
              <CardHeader>
                <CardTitle className="text-primary">{t.recentPayments}</CardTitle>
                <CardDescription>
                  {currentLang === 'ar' ? 'تاريخ المدفوعات الأخيرة' : 'Recent payment history'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPayments.map((payment) => {
                    const billTypeInfo = getBillTypeInfo(payment.type);
                    const IconComponent = billTypeInfo.icon;
                    
                    return (
                      <div key={payment.id} className="flex items-center justify-between p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-blue-200 transition-all">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className={`w-10 h-10 ${billTypeInfo.color} rounded-xl flex items-center justify-center`}>
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">{payment.company}</h4>
                            <p className="text-sm text-gray-600">{payment.date}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(payment.amount)}</p>
                          <Badge className="bg-green-100 text-green-800">
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-6">
            <Card className="bg-white border-2 border-gray-200 shadow-sm rounded-3xl">
              <CardHeader>
                <CardTitle className="text-primary">{t.scheduledPayments}</CardTitle>
                <CardDescription>
                  {currentLang === 'ar' ? 'المدفوعات المجدولة والتلقائية' : 'Scheduled and automatic payments'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {currentLang === 'ar' ? 'لا توجد مدفوعات مجدولة حاليًا' : 'No scheduled payments currently'}
                  </p>
                  <Button className="mt-4 gradient-primary text-white hover:opacity-90 rounded-2xl">
                    <Plus className="h-4 w-4 mr-2" />
                    {t.schedulePayment}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Payment Gateway Dialog */}
      {selectedBillForPayment && (
        <PaymentGatewayDialog
          open={paymentDialogOpen}
          onOpenChange={setPaymentDialogOpen}
          billDetails={selectedBillForPayment}
          currentLang={currentLang}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}