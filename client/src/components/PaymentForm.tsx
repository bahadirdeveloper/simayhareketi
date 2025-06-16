import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Stripe bileşenlerini ve loadStripe fonksiyonunu dinamik olarak import ediyoruz
// Bu sayede sayfa ilk yüklendiğinde Stripe.js yüklenmeyecek ve hatadan kaçınacağız
let stripePromise: any = null;
let Elements: any = null;
let PaymentElement: any = null;
let useStripe: any = null;
let useElements: any = null;

const initStripe = async () => {
  if (!stripePromise) {
    try {
      const stripeJs = await import('@stripe/stripe-js');
      const reactStripe = await import('@stripe/react-stripe-js');
      
      if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
        throw new Error("VITE_STRIPE_PUBLIC_KEY is not defined");
      }
      
      // Stripe bileşenlerini yükle
      stripePromise = stripeJs.loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      Elements = reactStripe.Elements;
      PaymentElement = reactStripe.PaymentElement;
      useStripe = reactStripe.useStripe;
      useElements = reactStripe.useElements;
      
      return true;
    } catch (error) {
      // Silent Stripe loading error
      return false;
    }
  }
  return true;
};

const amountSchema = z.object({
  amount: z
    .string()
    .min(1, { message: "Miktar girilmesi zorunludur" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Geçerli bir sayı giriniz",
    })
    .refine((val) => Number(val) >= 20, {
      message: "Tutar en az 20 TL olmalıdır",
    })
    .refine((val) => Number(val) <= 100000, {
      message: "Tutar en fazla 100.000 TL olabilir",
    }),
  description: z.string().min(5, "Açıklama en az 5 karakter olmalıdır").max(200, "Açıklama en fazla 200 karakter olabilir").optional(),
  isRegistrationFee: z.boolean().optional(),
});

type AmountFormValues = z.infer<typeof amountSchema>;

// Form component for entering the amount
function AmountForm({ 
  onProceed, 
  isRegistrationFee = false, 
  fixedAmount = null, 
  fixedDescription = null 
}: { 
  onProceed: (data: AmountFormValues) => void,
  isRegistrationFee?: boolean,
  fixedAmount?: number | null,
  fixedDescription?: string | null
}) {
  const form = useForm<AmountFormValues>({
    resolver: zodResolver(amountSchema),
    defaultValues: {
      amount: fixedAmount !== null ? fixedAmount.toString() : "100",
      description: fixedDescription || "Cumhuriyet Güncellenme Platformu Bağışı",
      isRegistrationFee,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onProceed)} className="space-y-6">
        {/* Show amount field only if it's not a fixed amount */}
        {fixedAmount === null && (
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white text-lg">
                  {isRegistrationFee ? "Katılım Ücreti (TL)" : "Bağış Miktarı (TL)"}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    min={isRegistrationFee ? "1" : "5"}
                    placeholder={isRegistrationFee ? "1" : "100"}
                    className="bg-black/50 border-amber-500 text-white text-lg"
                    disabled={isRegistrationFee && fixedAmount !== null}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        {/* If there's a fixed amount, show it as display only */}
        {fixedAmount !== null && (
          <div className="mb-4">
            <div className="text-white text-lg mb-2">
              {isRegistrationFee ? "Katılım Ücreti (TL)" : "Bağış Miktarı (TL)"}
            </div>
            <div className="text-2xl font-bold text-amber-500 border border-amber-500 bg-black/50 p-3 rounded-md">
              {fixedAmount} TL
            </div>
          </div>
        )}
        
        {/* Only show description field if it's not a registration fee */}
        {!isRegistrationFee && fixedDescription === null && (
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white text-lg">Açıklama (Opsiyonel)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Cumhuriyet Güncellenme Platformu Bağışı"
                    className="bg-black/50 border-amber-500 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        {/* If there's a fixed description, show it */}
        {fixedDescription !== null && (
          <div className="mb-4">
            <div className="text-white text-lg mb-2">Açıklama</div>
            <div className="text-amber-500 border border-amber-500 bg-black/50 p-3 rounded-md">
              {fixedDescription}
            </div>
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-red-700 to-amber-600 hover:from-amber-600 hover:to-red-700 text-white py-6 text-lg font-bold"
        >
          {isRegistrationFee ? "Katılım Ücretini Öde" : "Ödemeye Devam Et"}
        </Button>
      </form>
    </Form>
  );
}

// Payment form using Stripe Elements
function CheckoutForm({ 
  clientSecret, 
  onSuccess, 
  isRegistrationFee = false 
}: { 
  clientSecret: string, 
  onSuccess: () => void,
  isRegistrationFee?: boolean
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setPaymentError(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/katil/success",
      },
      redirect: "if_required",
    });

    if (error) {
      setPaymentError(error.message || "Ödeme işlemi sırasında bir hata oluştu.");
      toast({
        title: "Ödeme Hatası",
        description: error.message || "Ödeme işlemi sırasında bir hata oluştu.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Ödeme Başarılı",
        description: isRegistrationFee 
          ? "Kayıt ücretiniz başarıyla alındı!" 
          : "Bağışınız için teşekkür ederiz!",
      });
      onSuccess();
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <PaymentElement 
        options={{
          layout: "tabs",
          fields: {
            billingDetails: {
              name: 'auto',
              email: 'auto',
              phone: 'auto',
              address: {
                country: 'never',
                postalCode: 'auto',
                line1: 'auto',
                line2: 'auto',
                city: 'auto',
                state: 'auto',
              }
            }
          },
          terms: {
            bancontact: 'always',
            card: 'always',
            ideal: 'always',
            sepaDebit: 'always',
            sofort: 'always',
          }
        }}
      />
      
      {paymentError && (
        <div className="text-red-500 text-sm mt-2">{paymentError}</div>
      )}
      
      <Button 
        type="submit" 
        disabled={!stripe || isLoading} 
        className="w-full bg-gradient-to-r from-red-700 to-amber-600 hover:from-amber-600 hover:to-red-700 text-white py-6 text-lg font-bold"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            İşleniyor...
          </>
        ) : (
          "Ödemeyi Tamamla"
        )}
      </Button>
    </form>
  );
}

// Main payment component that manages the flow
export default function PaymentForm({ 
  isRegistrationFee = false, 
  fixedAmount = null, 
  fixedDescription = null 
}: { 
  isRegistrationFee?: boolean, 
  fixedAmount?: number | null, 
  fixedDescription?: string | null 
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const { toast } = useToast();

  // Process the amount and get a payment intent from Stripe
  const handleProceedToPayment = async (data: AmountFormValues) => {
    setIsLoading(true);
    
    const amountToCharge = fixedAmount !== null ? fixedAmount : parseFloat(data.amount);
    const description = fixedDescription || data.description || "Ödeme";
    
    try {
      const response = await apiRequest("POST", "/api/create-payment-intent", {
        amount: amountToCharge,
        description: description,
        isRegistrationFee: isRegistrationFee,
      });
      
      const result = await response.json();
      
      if (result.success && result.clientSecret) {
        setClientSecret(result.clientSecret);
      } else {
        toast({
          title: "Hata",
          description: result.message || "Ödeme başlatılırken bir hata oluştu.",
          variant: "destructive",
        });
      }
    } catch (error) {
      // Silent payment intent error
      toast({
        title: "Hata",
        description: "Ödeme başlatılırken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setPaymentCompleted(true);
  };

  const handleReset = () => {
    setClientSecret(null);
    setPaymentCompleted(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
        <p className="mt-4 text-white">Ödeme başlatılıyor...</p>
      </div>
    );
  }

  if (paymentCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-b from-black/80 to-red-950/30 backdrop-blur-sm border border-red-700/50 rounded-lg p-8 text-center shadow-lg"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-400 to-red-600"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
        
        <div className="relative z-10">
          <svg 
            className="w-16 h-16 mx-auto mb-6 text-red-500" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-amber-500 mb-4">
            {isRegistrationFee ? "İşlem Tamamlandı" : "Bağış İşlemi Tamamlandı"}
          </h2>
          
          <p className="text-white mb-6">
            {isRegistrationFee ? (
              "Cumhuriyet Güncellenme Platformu'na üyeliğiniz başarıyla tamamlandı. Artık platformun tüm özelliklerini kullanabilirsiniz."
            ) : (
              "Cumhuriyet Güncellenme Platformu'na katkınız için teşekkür ederiz. Desteğiniz, daha güçlü bir gelecek için çok değerli."
            )}
          </p>
          
          <Button
            onClick={handleReset}
            className="bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-medium px-6 py-2 rounded-md shadow-md transition-all duration-300"
          >
            {isRegistrationFee ? "Kapat" : "Yeni Bağış Yap"}
          </Button>
        </div>
      </motion.div>
    );
  }

  // Stripe bileşenlerini yüklemeyi dene (Elements, PaymentElement, vs.)
  useEffect(() => {
    if (clientSecret) {
      initStripe();
    }
  }, [clientSecret]);

  return (
    <div className="w-full">
      {clientSecret ? (
        <>
          {Elements && PaymentElement && useStripe && useElements ? (
            <Elements stripe={stripePromise} options={{ clientSecret, locale: 'tr' }}>
              <CheckoutForm 
                clientSecret={clientSecret} 
                onSuccess={handlePaymentSuccess}
                isRegistrationFee={isRegistrationFee} 
              />
            </Elements>
          ) : (
            <div className="text-center py-8">
              <div className="bg-red-950/30 backdrop-blur-sm border border-red-700/30 rounded-lg p-6 shadow-md">
                <svg className="w-10 h-10 text-red-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-xl font-semibold text-red-400 mb-2">Ödeme Sistemi Yüklenemedi</h3>
                <p className="text-white/80 mb-4">Ödeme sistemi şu anda yüklenemedi. Lütfen daha sonra tekrar deneyiniz.</p>
                <Button 
                  onClick={handleReset}
                  className="bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white"
                >
                  Geri Dön
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <AmountForm 
          onProceed={handleProceedToPayment}
          isRegistrationFee={isRegistrationFee}
          fixedAmount={fixedAmount}
          fixedDescription={fixedDescription}
        />
      )}
    </div>
  );
}