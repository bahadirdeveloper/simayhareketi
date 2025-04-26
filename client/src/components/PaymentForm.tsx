import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
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

if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error("VITE_STRIPE_PUBLIC_KEY is not defined");
}

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const amountSchema = z.object({
  amount: z
    .string()
    .min(1, { message: "Miktar girilmesi zorunludur" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Geçerli bir sayı giriniz",
    })
    .refine((val) => Number(val) >= 5, {
      message: "Bağış miktarı en az 5 TL olmalıdır",
    }),
  description: z.string().optional(),
});

type AmountFormValues = z.infer<typeof amountSchema>;

// Form component for entering the amount
function AmountForm({ onProceed }: { onProceed: (data: AmountFormValues) => void }) {
  const form = useForm<AmountFormValues>({
    resolver: zodResolver(amountSchema),
    defaultValues: {
      amount: "100",
      description: "Cumhuriyet Güncellenme Platformu Bağışı",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onProceed)} className="space-y-6">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white text-lg">Bağış Miktarı (TL)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  min="5"
                  placeholder="100"
                  className="bg-black/50 border-amber-500 text-white text-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
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
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-red-700 to-amber-600 hover:from-amber-600 hover:to-red-700 text-white py-6 text-lg font-bold"
        >
          Ödemeye Devam Et
        </Button>
      </form>
    </Form>
  );
}

// Payment form using Stripe Elements
function CheckoutForm({ clientSecret, onSuccess }: { clientSecret: string, onSuccess: () => void }) {
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
        description: "Bağışınız için teşekkür ederiz!",
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
export default function PaymentForm() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const { toast } = useToast();

  // Process the amount and get a payment intent from Stripe
  const handleProceedToPayment = async (data: AmountFormValues) => {
    setIsLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/create-payment-intent", {
        amount: parseFloat(data.amount),
        description: data.description,
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
      console.error("Payment intent error:", error);
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-black/60 backdrop-blur-sm border-2 border-green-500 rounded-lg p-8 text-center"
      >
        <div className="text-5xl mb-6">🎉</div>
        <h2 className="text-2xl font-bold text-green-400 mb-4">Bağışınız için Teşekkürler!</h2>
        <p className="text-white mb-6">
          Cumhuriyet Güncellenme Platformu'na katkınız için teşekkür ederiz. 
          Desteğiniz, daha güçlü bir gelecek için çok değerli.
        </p>
        <Button
          onClick={handleReset}
          className="bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400 text-white"
        >
          Yeni Bağış Yap
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret, locale: 'tr' }}>
          <CheckoutForm clientSecret={clientSecret} onSuccess={handlePaymentSuccess} />
        </Elements>
      ) : (
        <AmountForm onProceed={handleProceedToPayment} />
      )}
    </div>
  );
}