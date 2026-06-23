import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { CreditCard, Lock, CheckCircle, AlertCircle, Smartphone } from 'lucide-react';
import { toast } from "sonner";

interface PaymentGatewayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  billDetails: {
    company: string;
    type: string;
    amount: number;
    accountNumber: string;
    dueDate?: string;
  };
  currentLang: 'en' | 'ar';
  onPaymentSuccess?: () => void;
}

export function PaymentGatewayDialog({
  open,
  onOpenChange,
  billDetails,
  currentLang,
  onPaymentSuccess
}: PaymentGatewayDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const translations = {
    en: {
      title: 'Complete Payment',
      subtitle: 'Secure payment gateway powered by Fawry & Paymob',
      billDetails: 'Bill Details',
      paymentMethod: 'Payment Method',
      creditCard: 'Credit/Debit Card',
      mobileWallet: 'Mobile Wallet',
      instantPay: 'InstaPay',
      fawry: 'Fawry',
      cardNumber: 'Card Number',
      cardName: 'Cardholder Name',
      expiryDate: 'Expiry Date',
      cvv: 'CVV',
      amount: 'Amount',
      serviceFee: 'Service Fee',
      total: 'Total Amount',
      processingPayment: 'Processing Payment...',
      payNow: 'Pay Now',
      cancel: 'Cancel',
      securePayment: 'Secure Payment',
      secureMessage: 'Your payment information is encrypted and secure',
      company: 'Company',
      accountNumber: 'Account Number',
      dueDate: 'Due Date',
      paymentSuccess: 'Payment completed successfully!',
      paymentError: 'Payment failed. Please try again.',
      walletNumber: 'Wallet Number',
      mobileNumber: 'Mobile Number',
      referenceCode: 'Reference Code'
    },
    ar: {
      title: 'إتمام الدفع',
      subtitle: 'بوابة دفع آمنة مدعومة من فوري وباي موب',
      billDetails: 'تفاصيل الفاتورة',
      paymentMethod: 'طريقة الدفع',
      creditCard: 'بطاقة ائتمان/مدى',
      mobileWallet: 'المحفظة الإلكترونية',
      instantPay: 'InstaPay',
      fawry: 'فوري',
      cardNumber: 'رقم البطاقة',
      cardName: 'اسم حامل البطاقة',
      expiryDate: 'تاريخ الانتهاء',
      cvv: 'رمز الأمان',
      amount: 'المبلغ',
      serviceFee: 'رسوم الخدمة',
      total: 'المبلغ الإجمالي',
      processingPayment: 'جاري معالجة الدفع...',
      payNow: 'ادفع الآن',
      cancel: 'إلغاء',
      securePayment: 'دفع آمن',
      secureMessage: 'معلومات الدفع مشفرة وآمنة',
      company: 'الشركة',
      accountNumber: 'رقم الحساب',
      dueDate: 'تاريخ الاستحقاق',
      paymentSuccess: 'تم الدفع بنجاح!',
      paymentError: 'فشل الدفع. يرجى المحاولة مرة أخرى.',
      walletNumber: 'رقم المحفظة',
      mobileNumber: 'رقم الموبايل',
      referenceCode: 'الرمز المرجعي'
    }
  };

  const t = translations[currentLang];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(currentLang === 'ar' ? 'ar-EG' : 'en-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const serviceFee = billDetails.amount * 0.02; // 2% service fee
  const totalAmount = billDetails.amount + serviceFee;

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(formatCardNumber(value));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\//g, '');
    if (value.length <= 4 && /^\d*$/.test(value)) {
      if (value.length >= 2) {
        setExpiryDate(value.substring(0, 2) + '/' + value.substring(2));
      } else {
        setExpiryDate(value);
      }
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCvv(value);
    }
  };

  const handlePayment = async () => {
    // Validation
    if (paymentMethod === 'card') {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
        toast.error(currentLang === 'ar' ? 'رقم البطاقة غير صحيح' : 'Invalid card number');
        return;
      }
      if (!cardName) {
        toast.error(currentLang === 'ar' ? 'الرجاء إدخال اسم حامل البطاقة' : 'Please enter cardholder name');
        return;
      }
      if (!expiryDate || expiryDate.length !== 5) {
        toast.error(currentLang === 'ar' ? 'تاريخ الانتهاء غير صحيح' : 'Invalid expiry date');
        return;
      }
      if (!cvv || cvv.length !== 3) {
        toast.error(currentLang === 'ar' ? 'رمز الأمان غير صحيح' : 'Invalid CVV');
        return;
      }
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Random success/failure for demo purposes
      const isSuccess = Math.random() > 0.1; // 90% success rate
      
      if (isSuccess) {
        toast.success(t.paymentSuccess);
        onOpenChange(false);
        if (onPaymentSuccess) {
          onPaymentSuccess();
        }
        
        // Reset form
        setCardNumber('');
        setCardName('');
        setExpiryDate('');
        setCvv('');
      } else {
        toast.error(t.paymentError);
      }
    }, 2500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-2 shadow-lg ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            {t.title}
          </DialogTitle>
          <DialogDescription className="text-base">
            {t.subtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Bill Details Card */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 space-y-3 shadow-sm">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              {t.billDetails}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t.company}:</span>
                <span className="font-medium">{billDetails.company}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t.accountNumber}:</span>
                <span className="font-medium font-mono">{billDetails.accountNumber}</span>
              </div>
              {billDetails.dueDate && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{t.dueDate}:</span>
                  <span className="font-medium">{billDetails.dueDate}</span>
                </div>
              )}
              <div className="border-t border-border/50 pt-2 mt-2"></div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t.amount}:</span>
                <span className="font-semibold">{formatCurrency(billDetails.amount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t.serviceFee}:</span>
                <span className="font-medium">{formatCurrency(serviceFee)}</span>
              </div>
              <div className="border-t border-border/50 pt-2 mt-2"></div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">{t.total}:</span>
                <span className="font-bold text-2xl text-primary">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label className="text-base">{t.paymentMethod}</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl border-2 transition-all hover:scale-105 ${
                  paymentMethod === 'card'
                    ? 'border-primary bg-primary/5 shadow-soft'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span className="font-medium">{t.creditCard}</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('wallet')}
                className={`p-4 rounded-2xl border-2 transition-all hover:scale-105 ${
                  paymentMethod === 'wallet'
                    ? 'border-primary bg-primary/5 shadow-soft'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <span className="font-medium">{t.mobileWallet}</span>
                </div>
              </button>
            </div>
          </div>

          {/* Payment Form */}
          {paymentMethod === 'card' && (
            <div className="space-y-4 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">{t.cardNumber}</Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className="pl-12 font-mono text-lg h-12 rounded-2xl"
                    maxLength={19}
                  />
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">{t.cardName}</Label>
                <Input
                  id="cardName"
                  placeholder="Ahmed Mohamed"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="h-12 rounded-2xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">{t.expiryDate}</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={handleExpiryChange}
                    className="font-mono h-12 rounded-2xl"
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">{t.cvv}</Label>
                  <Input
                    id="cvv"
                    type="password"
                    placeholder="123"
                    value={cvv}
                    onChange={handleCvvChange}
                    className="font-mono h-12 rounded-2xl"
                    maxLength={3}
                  />
                </div>
              </div>

              {/* Supported Cards */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <Badge variant="outline" className="bg-gray-50">Visa</Badge>
                <Badge variant="outline" className="bg-gray-50">Mastercard</Badge>
                <Badge variant="outline" className="bg-gray-50">Mada</Badge>
                <Badge variant="outline" className="bg-gray-50">Meeza</Badge>
              </div>
            </div>
          )}

          {paymentMethod === 'wallet' && (
            <div className="space-y-4 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div className="space-y-2">
                <Label htmlFor="mobileNumber">{t.mobileNumber}</Label>
                <Input
                  id="mobileNumber"
                  placeholder="01012345678"
                  className="h-12 rounded-2xl font-mono"
                />
              </div>
              
              <div className="flex items-center justify-center gap-4 pt-2">
                <Badge variant="outline" className="bg-gray-50">Fawry</Badge>
                <Badge variant="outline" className="bg-gray-50">Vodafone Cash</Badge>
                <Badge variant="outline" className="bg-gray-50">Orange Money</Badge>
                <Badge variant="outline" className="bg-gray-50">Etisalat Cash</Badge>
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
            <Lock className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-green-900 dark:text-green-100">{t.securePayment}</p>
              <p className="text-sm text-green-700 dark:text-green-300">{t.secureMessage}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-12 rounded-2xl"
              disabled={isProcessing}
            >
              {t.cancel}
            </Button>
            <Button
              onClick={handlePayment}
              className="flex-1 h-12 rounded-2xl gradient-primary text-white hover:opacity-90"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {t.processingPayment}
                </>
              ) : (
                <>
                  <Lock className="h-5 w-5 mr-2" />
                  {t.payNow} {formatCurrency(totalAmount)}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}