import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Download, Shield, User, Calendar, MapPin, Droplets } from "lucide-react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "@/components/CheckoutForm";

if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface DijitalKimlik {
  id: number;
  userId: number;
  tcNo: string;
  ad: string;
  soyad: string;
  dogumTarihi: string;
  dogumYeri: string;
  seriNo: string;
  belgeNo: string;
  gecerlilikTarihi: string;
  babaAdi: string;
  anaAdi: string;
  uyruk: string;
  cinsiyet: string;
  medeniHal: string;
  din: string;
  kanGrubu: string;
  kayitNo: string;
  aktif: boolean;
  olusturulmaTarihi: string;
}

export default function DijitalKimlikPage() {
  const [showPayment, setShowPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get current user's digital identity
  const { data: identity, isLoading } = useQuery({
    queryKey: ['/api/digital-identity', 1], // Using userId 1 for demo
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/digital-identity/1');
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to fetch digital identity');
      }
      return response.json();
    },
  });

  // Generate digital identity mutation
  const generateIdentityMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/digital-identity/generate', { userId: 1 });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate identity');
      }
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Başarılı", description: "Dijital kimliğiniz oluşturuldu!" });
      queryClient.invalidateQueries({ queryKey: ['/api/digital-identity'] });
    },
    onError: (error: Error) => {
      toast({ 
        title: "Hata", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  // Download identity mutation
  const downloadMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/digital-identity/download', { userId: 1 });
      if (!response.ok) {
        throw new Error('Download failed');
      }
      return response.text();
    },
    onSuccess: (htmlContent) => {
      // Create blob and download
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tc-kimlik-${identity?.tcNo || 'dijital'}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast({ title: "Başarılı", description: "Kimlik kartınız indirildi!" });
    },
    onError: () => {
      toast({ 
        title: "Hata", 
        description: "İndirme işlemi başarısız oldu",
        variant: "destructive" 
      });
    },
  });

  const handlePaymentClick = async () => {
    try {
      const response = await apiRequest('POST', '/api/create-payment-intent', { 
        amount: 29.99 // $29.99 for digital identity service
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
      setShowPayment(true);
    } catch (error) {
      toast({
        title: "Ödeme Hatası",
        description: "Ödeme işlemi başlatılamadı",
        variant: "destructive"
      });
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setClientSecret("");
    // Automatically generate identity after successful payment
    generateIdentityMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Dijital TC Kimlik Sistemi
          </h1>
          <p className="text-red-100 text-lg">
            Türkiye Cumhuriyeti vatandaşlığı için dijital kimlik belgesi alın
          </p>
        </div>

        {!identity ? (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl mb-2">
                <Shield className="w-8 h-8 mx-auto mb-4" />
                Dijital Kimlik Belgesi
              </CardTitle>
              <CardDescription className="text-red-100 text-lg">
                Resmi TC Kimlik Numarası ve dijital kimlik belgenizi edinin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-white font-semibold text-lg">Özellikler:</h3>
                  <ul className="text-red-100 space-y-2">
                    <li className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Geçerli TC Kimlik Numarası
                    </li>
                    <li className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Tam kişisel bilgiler
                    </li>
                    <li className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      İndirilebilir HTML formatı
                    </li>
                    <li className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      10 yıl geçerlilik süresi
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-white font-semibold text-lg">Fiyat:</h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">$29.99</div>
                    <div className="text-red-100">Tek seferlik ödeme</div>
                  </div>
                </div>
              </div>
              
              <Separator className="bg-white/20" />
              
              <div className="text-center">
                <Button 
                  onClick={handlePaymentClick}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                  disabled={showPayment}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Ödeme Yap ve Kimlik Al
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Dijital Kimlik Belgeniz
                <Badge className="bg-green-600 text-white ml-2">
                  {identity.aktif ? 'Aktif' : 'Pasif'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-white mb-2">
                      {identity.tcNo}
                    </div>
                    <div className="text-red-100">TC Kimlik Numarası</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-red-100">Ad Soyad:</span>
                      <span className="text-white font-semibold">
                        {identity.ad} {identity.soyad}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-100">Doğum Tarihi:</span>
                      <span className="text-white">
                        {new Date(identity.dogumTarihi).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-100">Doğum Yeri:</span>
                      <span className="text-white">{identity.dogumYeri}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-100">Cinsiyet:</span>
                      <span className="text-white">
                        {identity.cinsiyet === 'E' ? 'Erkek' : 'Kadın'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-red-100">Kan Grubu:</span>
                      <span className="text-white flex items-center gap-1">
                        <Droplets className="w-4 h-4" />
                        {identity.kanGrubu}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-100">Baba Adı:</span>
                      <span className="text-white">{identity.babaAdi}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-100">Ana Adı:</span>
                      <span className="text-white">{identity.anaAdi}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-100">Seri No:</span>
                      <span className="text-white">{identity.seriNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-100">Geçerlilik:</span>
                      <span className="text-white">
                        {new Date(identity.gecerlilikTarihi).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="bg-white/20" />
              
              <div className="text-center">
                <Button 
                  onClick={() => downloadMutation.mutate()}
                  disabled={downloadMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {downloadMutation.isPending ? 'İndiriliyor...' : 'Kimlik Kartını İndir'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {showPayment && clientSecret && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Ödeme</CardTitle>
                <CardDescription>
                  Dijital kimlik belgesi için ödeme yapın
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm 
                    onSuccess={handlePaymentSuccess}
                    onCancel={() => setShowPayment(false)}
                  />
                </Elements>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}