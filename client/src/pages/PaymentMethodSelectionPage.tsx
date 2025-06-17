import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ModernLayout from "@/components/ModernLayout";
import { CreditCard, Loader2, ArrowLeft } from "lucide-react";

interface PaymentData {
  amount: number;
  packageType: string;
  userInfo: {
    ad: string;
    email: string;
    telefon: string;
    sehir: string;
  };
}

export default function PaymentMethodSelectionPage() {
  const [, navigate] = useLocation();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedPayment = localStorage.getItem('pendingPayment');
    if (storedPayment) {
      try {
        const data = JSON.parse(storedPayment);
        setPaymentData(data);
      } catch (error) {
        navigate('/katil');
      }
    } else {
      navigate('/katil');
    }
  }, [navigate]);

  const handleStripePayment = async () => {
    if (!paymentData) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: paymentData.amount,
          packageType: paymentData.packageType,
          userInfo: paymentData.userInfo
        })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('pendingPayment', JSON.stringify({
          clientSecret: data.clientSecret,
          amount: paymentData.amount,
          packageType: paymentData.packageType,
          userInfo: paymentData.userInfo
        }));
        
        navigate('/checkout');
      } else {
        throw new Error('Stripe ödeme başlatılamadı');
      }
    } catch (error: any) {
      toast({
        title: "Stripe Ödeme Hatası",
        description: error.message || "Stripe ödeme sistemi başlatılamadı",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const handleIyzicoPayment = async () => {
    if (!paymentData) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/iyzico/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: paymentData.amount,
          packageType: paymentData.packageType,
          userInfo: paymentData.userInfo
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.paymentPageUrl) {
          // Redirect to İyzico payment page
          window.location.href = data.paymentPageUrl;
        } else {
          // Use embedded form
          navigate('/iyzico-checkout');
        }
      } else {
        throw new Error('İyzico ödeme başlatılamadı');
      }
    } catch (error: any) {
      toast({
        title: "İyzico Ödeme Hatası",
        description: error.message || "İyzico ödeme sistemi başlatılamadı",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  if (!paymentData) {
    return (
      <ModernLayout showBackButton={false} pageName="Yükleniyor">
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      </ModernLayout>
    );
  }

  return (
    <ModernLayout showBackButton={false} pageName="Ödeme Yöntemi Seçimi">
      <div className="w-full max-w-4xl mx-auto space-y-8 p-4">
        <div className="text-center space-y-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/katil')}
            className="text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri Dön
          </Button>
          
          <h1 className="text-3xl font-bold text-white">Ödeme Yöntemi Seçin</h1>
          <p className="text-gray-300">
            Tercih ettiğiniz ödeme yöntemini seçerek güvenli ödeme işleminizi tamamlayın
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          {/* Order Summary */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-500" />
                Sipariş Özeti
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-white">
                <span>
                  {paymentData.packageType === 'dijital-kimlik' ? 'Dijital Kimlik' : 'Özel Katkı'}
                </span>
                <span className="font-bold">₺{paymentData.amount}</span>
              </div>
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between items-center text-white font-bold text-lg">
                  <span>Toplam</span>
                  <span>₺{paymentData.amount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* İyzico Payment */}
            <Card className="bg-gray-900 border-gray-700 hover:border-orange-500 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">iyz</span>
                  </div>
                  İyzico
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm">
                  Türkiye'nin önde gelen ödeme sistemlerinden biri. Kredi kartı, banka kartı ve taksit seçenekleri.
                </p>
                <ul className="text-gray-400 text-xs space-y-1">
                  <li>• Tüm Türk bankaları desteklenir</li>
                  <li>• 2, 3, 6, 9 taksit seçenekleri</li>
                  <li>• 3D Secure güvenlik</li>
                  <li>• Türkçe destek</li>
                </ul>
                <Button
                  onClick={handleIyzicoPayment}
                  disabled={isLoading}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : null}
                  İyzico ile Öde
                </Button>
              </CardContent>
            </Card>

            {/* Stripe Payment */}
            <Card className="bg-gray-900 border-gray-700 hover:border-blue-500 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">$</span>
                  </div>
                  Stripe
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm">
                  Dünya çapında güvenilir ödeme sistemi. Uluslararası kart desteği ve hızlı işlem.
                </p>
                <ul className="text-gray-400 text-xs space-y-1">
                  <li>• Visa, Mastercard, American Express</li>
                  <li>• Uluslararası kart desteği</li>
                  <li>• PCI DSS uyumlu güvenlik</li>
                  <li>• Hızlı işlem</li>
                </ul>
                <Button
                  onClick={handleStripePayment}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : null}
                  Stripe ile Öde
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Security Notice */}
          <Card className="bg-blue-900/20 border-blue-500/30">
            <CardContent className="p-4">
              <p className="text-blue-200 text-sm text-center">
                <CreditCard className="w-4 h-4 inline mr-2" />
                Tüm ödeme işlemleri SSL şifrelemesi ile korunmaktadır. Kart bilgileriniz güvendedir.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModernLayout>
  );
}