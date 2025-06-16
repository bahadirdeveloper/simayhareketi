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

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

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
        description: "Ödeme sistemi yüklenirken hata oluştu. Lütfen sayfayı yenileyip tekrar deneyin.",
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
        let errorMessage = "Ödeme işlemi tamamlanamadı.";
        
        // Specific error handling for Turkish users
        switch (error.type) {
          case 'card_error':
            errorMessage = "Kart bilgilerinizi kontrol edin. " + (error.message || "");
            break;
          case 'validation_error':
            errorMessage = "Lütfen tüm alanları doğru şekilde doldurun.";
            break;
          case 'api_connection_error':
            errorMessage = "İnternet bağlantınızı kontrol edin ve tekrar deneyin.";
            break;
          case 'api_error':
            errorMessage = "Ödeme sistemi geçici olarak kullanılamıyor. Lütfen birkaç dakika sonra tekrar deneyin.";
            break;
          case 'authentication_error':
            errorMessage = "Güvenlik doğrulaması başarısız. Lütfen tekrar deneyin.";
            break;
          case 'rate_limit_error':
            errorMessage = "Çok fazla deneme yapıldı. Lütfen bir süre bekleyip tekrar deneyin.";
            break;
          default:
            errorMessage = error.message || errorMessage;
        }
        
        toast({
          title: "Ödeme Başarısız",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        // Payment succeeded
        if (paymentIntent.status === 'succeeded') {
          toast({
            title: "Ödeme Başarılı!",
            description: "Ödemeniz başarıyla işlendi. Yönlendiriliyorsunuz...",
            variant: "default",
          });
          onSuccess();
        } else if (paymentIntent.status === 'processing') {
          toast({
            title: "Ödeme İşleniyor",
            description: "Ödemeniz işleniyor. Lütfen bekleyin...",
            variant: "default",
          });
          // Check status after a delay
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      }
    } catch (err: any) {
      toast({
        title: "Beklenmeyen Hata",
        description: "Ödeme işlemi sırasında beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
      console.error('Payment error:', err);
    }

    setIsLoading(false);
  };

  const getPackageName = (type: string) => {
    switch (type) {
      case 'temel': return 'Temel Paket';
      case 'premium': return 'Premium Paket';
      case 'elite': return 'Elite Paket';
      default: return 'Paket';
    }
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
            <span>{getPackageName(paymentData.packageType)}</span>
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
            <div className="p-4 border border-gray-600 rounded-lg bg-gray-800">
              <PaymentElement 
                options={{
                  layout: "tabs"
                }}
              />
            </div>
            
            {/* Payment Security Notice */}
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
              <p className="text-blue-200 text-sm flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Güvenli SSL şifrelemesi ile korunmaktadır. Kart bilgileriniz güvende.
              </p>
            </div>

            <Button
              type="submit"
              disabled={!stripe || isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Ödeme İşleniyor...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  ₺{paymentData.amount} Güvenli Ödeme
                </>
              )}
            </Button>
            
            {/* Error state helper */}
            {!stripe && (
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
                <p className="text-yellow-200 text-sm">
                  Ödeme sistemi yükleniyor... Eğer bu mesaj devam ederse, sayfayı yenileyin.
                </p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CheckoutPage() {
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
        // Invalid payment data error
        navigate('/katil');
      }
    } else {
      navigate('/katil');
    }
  }, [navigate]);

  const handlePaymentSuccess = () => {
    setIsSuccess(true);
    
    // Store completed payment data for task selection
    if (paymentData) {
      localStorage.setItem('completedPayment', JSON.stringify(paymentData));
    }
    localStorage.removeItem('pendingPayment');
    
    toast({
      title: "Ödeme Başarılı!",
      description: paymentData?.packageType === 'dijital-kimlik' 
        ? "Dijital kimliğiniz oluşturuldu. Görev seçimi yapabilirsiniz!" 
        : "Üyeliğiniz aktifleştirildi. Hoş geldiniz!",
      variant: "default",
    });

    setTimeout(() => {
      // Redirect to task selection for digital ID, otherwise to main page
      if (paymentData?.packageType === 'dijital-kimlik') {
        navigate('/task-selection');
      } else {
        navigate('/turkiye');
      }
    }, 3000);
  };

  const handleGoBack = () => {
    navigate('/katil');
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
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold text-green-400">Ödeme Başarılı!</h1>
            <p className="text-xl text-gray-300">
              Üyeliğiniz başarıyla aktifleştirildi. Türkiye'nin geleceğine hoş geldiniz!
            </p>
            <p className="text-gray-400">
              3 saniye içinde anasayfaya yönlendirileceksiniz...
            </p>
          </motion.div>
        </div>
      </ModernLayout>
    );
  }

  if (!paymentData) {
    return (
      <ModernLayout showBackButton={false} pageName="Yükleniyor">
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      </ModernLayout>
    );
  }

  return (
    <ModernLayout showBackButton={false} pageName="Ödeme">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Button
            variant="ghost"
            onClick={handleGoBack}
            className="text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri Dön
          </Button>
          
          <h1 className="text-3xl font-bold text-white">Ödeme Sayfası</h1>
          <p className="text-gray-300">
            Güvenli ödeme işleminizi tamamlayın
          </p>
        </div>

        {/* Stripe Elements Provider */}
        <Elements 
          stripe={stripePromise} 
          options={{ 
            clientSecret: paymentData.clientSecret,
            appearance: {
              theme: 'night',
              variables: {
                colorPrimary: '#0570de',
                colorBackground: '#1f2937',
                colorText: '#ffffff',
                colorDanger: '#df1b41',
                fontFamily: 'system-ui, sans-serif',
                spacingUnit: '4px',
                borderRadius: '8px',
              }
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