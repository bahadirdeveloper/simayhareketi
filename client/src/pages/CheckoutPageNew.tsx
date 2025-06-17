import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ModernLayout from "@/components/ModernLayout";
import { CheckCircle, CreditCard, ArrowLeft, Loader2 } from "lucide-react";

// Initialize Stripe with validation
const getStripePromise = () => {
  const publicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
  
  if (!publicKey) {
    console.error('VITE_STRIPE_PUBLIC_KEY is not set');
    return null;
  }
  
  if (publicKey.startsWith('sk_')) {
    console.error('Invalid public key: secret key provided instead of public key');
    return null;
  }
  
  if (!publicKey.startsWith('pk_')) {
    console.error('Invalid public key format: must start with pk_');
    return null;
  }
  
  return loadStripe(publicKey);
};

const stripePromise = getStripePromise();

interface PaymentData {
  clientSecret: string;
  amount: number;
  packageType: string;
  userInfo: {
    ad: string;
    email: string;
    telefon: string;
    sehir: string;
  };
}

function CheckoutForm({ paymentData, onSuccess }: { paymentData: PaymentData; onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast({
        title: "Ödeme Sistemi Hatası",
        description: "Stripe yüklenirken hata oluştu. Lütfen sayfayı yenileyip tekrar deneyin.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/katil/success`,
        },
        redirect: 'if_required'
      });

      if (error) {
        toast({
          title: "Ödeme Başarısız",
          description: error.message || "Ödeme işlemi tamamlanamadı.",
          variant: "destructive",
        });
      } else {
        if (paymentIntent.status === 'succeeded') {
          toast({
            title: "Ödeme Başarılı!",
            description: "Ödemeniz başarıyla işlendi.",
            variant: "default",
          });
          onSuccess();
        }
      }
    } catch (err: any) {
      toast({
        title: "Beklenmeyen Hata",
        description: "Ödeme işlemi sırasında hata oluştu.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
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

      {/* Payment Form */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Ödeme Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 border border-gray-600 rounded-lg bg-white">
              <PaymentElement />
            </div>
            
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
              <p className="text-blue-200 text-sm flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Güvenli SSL şifrelemesi ile korunmaktadır.
              </p>
            </div>

            <Button
              type="submit"
              disabled={!stripe || isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Ödeme İşleniyor...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  ₺{paymentData.amount} Öde
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CheckoutPageNew() {
  const [, navigate] = useLocation();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
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

  if (!stripePromise) {
    return (
      <ModernLayout showBackButton={false} pageName="Ödeme Sistemi Hatası">
        <div className="w-full max-w-4xl mx-auto space-y-8 p-4">
          <Card className="bg-red-900/20 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Ödeme Sistemi Yapılandırma Hatası
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-red-200">
                Ödeme sistemi doğru yapılandırılmamış. Stripe public key eksik veya hatalı.
              </p>
              <p className="text-gray-300 text-sm">
                Lütfen sistem yöneticisiyle iletişime geçin veya birkaç dakika sonra tekrar deneyin.
              </p>
              <Button 
                onClick={() => navigate('/katil')} 
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Geri Dön
              </Button>
            </CardContent>
          </Card>
        </div>
      </ModernLayout>
    );
  }

  return (
    <ModernLayout showBackButton={false} pageName="Ödeme">
      <div className="w-full max-w-4xl mx-auto space-y-8 p-4">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Güvenli Ödeme</h1>
          <p className="text-gray-300">
            Ödeme işleminizi güvenle tamamlayın
          </p>
        </div>

        <Elements 
          stripe={stripePromise} 
          options={{ 
            clientSecret: paymentData.clientSecret,
            appearance: {
              theme: 'stripe'
            }
          }}
        >
          <CheckoutForm 
            paymentData={paymentData} 
            onSuccess={handlePaymentSuccess}
          />
        </Elements>
      </div>
    </ModernLayout>
  );
}