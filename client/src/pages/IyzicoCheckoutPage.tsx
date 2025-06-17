import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ModernLayout from "@/components/ModernLayout";
import { CheckCircle, CreditCard, ArrowLeft, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

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

export default function IyzicoCheckoutPage() {
  const [, navigate] = useLocation();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [checkoutFormContent, setCheckoutFormContent] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    const storedPayment = localStorage.getItem('pendingPayment');
    if (storedPayment) {
      try {
        const data = JSON.parse(storedPayment);
        setPaymentData(data);
        initializeIyzicoPayment(data);
      } catch (error) {
        navigate('/katil');
      }
    } else {
      navigate('/katil');
    }
  }, [navigate]);

  const initializeIyzicoPayment = async (data: PaymentData) => {
    setIsLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/iyzico/initialize", {
        amount: data.amount,
        packageType: data.packageType,
        userInfo: data.userInfo
      });

      if (response.ok) {
        const result = await response.json();
        if (result.checkoutFormContent) {
          setCheckoutFormContent(result.checkoutFormContent);
        } else {
          throw new Error('İyzico checkout form alınamadı');
        }
      } else {
        throw new Error('İyzico ödeme başlatılamadı');
      }
    } catch (error: any) {
      toast({
        title: "Ödeme Sistemi Hatası",
        description: error.message || "İyzico ödeme sistemi başlatılamadı",
        variant: "destructive",
      });
      navigate('/katil');
    }
    
    setIsLoading(false);
  };

  const handlePaymentSuccess = () => {
    setIsSuccess(true);
    
    if (paymentData) {
      localStorage.setItem('completedPayment', JSON.stringify(paymentData));
    }
    localStorage.removeItem('pendingPayment');
    
    toast({
      title: "Ödeme Başarılı!",
      description: paymentData?.packageType === 'dijital-kimlik' 
        ? "Dijital kimliğiniz oluşturuldu." 
        : "Üyeliğiniz aktifleştirildi.",
      variant: "default",
    });

    setTimeout(() => {
      if (paymentData?.packageType === 'dijital-kimlik') {
        navigate('/task-selection');
      } else {
        navigate('/turkiye');
      }
    }, 3000);
  };

  if (isSuccess) {
    return (
      <ModernLayout showBackButton={false} pageName="Ödeme Başarılı">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white">Ödeme Başarılı!</h1>
            <p className="text-gray-300">
              {paymentData?.packageType === 'dijital-kimlik' 
                ? "Dijital kimliğiniz oluşturuldu. Görev seçimi sayfasına yönlendiriliyorsunuz..." 
                : "Üyeliğiniz aktifleştirildi. Anasayfaya yönlendiriliyorsunuz..."}
            </p>
          </div>
        </div>
      </ModernLayout>
    );
  }

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
    <ModernLayout showBackButton={false} pageName="İyzico Ödeme">
      <div className="w-full max-w-4xl mx-auto space-y-8 p-4">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Güvenli Ödeme - İyzico</h1>
          <p className="text-gray-300">
            İyzico ile güvenli ödeme işleminizi tamamlayın
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

          {/* User Info */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Fatura Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-gray-300">
              <p><strong>Ad Soyad:</strong> {paymentData.userInfo.ad}</p>
              <p><strong>E-posta:</strong> {paymentData.userInfo.email}</p>
              <p><strong>Telefon:</strong> {paymentData.userInfo.telefon}</p>
              <p><strong>Şehir:</strong> {paymentData.userInfo.sehir}</p>
            </CardContent>
          </Card>

          {/* İyzico Payment Form */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Ödeme Bilgileri</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-400 mr-2" />
                  <span className="text-gray-300">İyzico ödeme formu yükleniyor...</span>
                </div>
              ) : checkoutFormContent ? (
                <div 
                  className="bg-white p-4 rounded-lg"
                  dangerouslySetInnerHTML={{ __html: checkoutFormContent }}
                />
              ) : (
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-200">
                    İyzico ödeme sistemi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.
                  </p>
                  <Button 
                    onClick={() => navigate('/katil')} 
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Geri Dön
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ModernLayout>
  );
}