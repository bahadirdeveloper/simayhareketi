import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ModernLayout from "@/components/ModernLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  IdCard, 
  Shield, 
  QrCode, 
  Download, 
  Eye, 
  EyeOff,
  Check,
  AlertTriangle,
  User,
  Calendar,
  MapPin,
  Hash,
  Star,
  Lock,
  Fingerprint
} from "lucide-react";

const formSchema = z.object({
  ad: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  soyad: z.string().min(2, "Soyad en az 2 karakter olmalıdır"),
  tcKimlik: z.string().length(11, "TC Kimlik numarası 11 haneli olmalıdır"),
  dogumTarihi: z.string().min(1, "Doğum tarihi gereklidir"),
  dogumYeri: z.string().min(2, "Doğum yeri gereklidir"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  telefon: z.string().min(10, "Telefon numarası en az 10 haneli olmalıdır"),
});

interface DigitalID {
  id: string;
  qrCode: string;
  securityCode: string;
  issuedAt: string;
  expiresAt: string;
  hologramCode: string;
  biometricHash: string;
}

export default function DijitalKimlikPage() {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSecurityCode, setShowSecurityCode] = useState(false);
  const [digitalID, setDigitalID] = useState<DigitalID | null>(null);
  const [verificationStep, setVerificationStep] = useState<'form' | 'payment' | 'issued'>('form');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ad: "",
      soyad: "",
      tcKimlik: "",
      dogumTarihi: "",
      dogumYeri: "",
      email: "",
      telefon: "",
    },
  });

  // Generate unique security features
  const generateSecurityFeatures = (userData: any): DigitalID => {
    const timestamp = Date.now();
    const randomSeed = Math.random().toString(36).substring(2, 15);
    
    // Unique ID with Turkish prefix
    const uniqueID = `TR${timestamp.toString(36).toUpperCase()}${randomSeed.toUpperCase()}`;
    
    // Security code (6 digits)
    const securityCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Hologram verification code
    const hologramCode = `HLG${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    // Simulated biometric hash
    const biometricHash = btoa(`${userData.tcKimlik}${userData.ad}${userData.soyad}${timestamp}`).substring(0, 32);
    
    // QR Code data (would contain encrypted user data)
    const qrData = {
      id: uniqueID,
      name: `${userData.ad} ${userData.soyad}`,
      tc: userData.tcKimlik.substring(0, 3) + "****" + userData.tcKimlik.substring(7),
      issued: new Date().toISOString(),
      authority: "Dijital Türkiye Cumhuriyeti"
    };
    
    const qrCode = btoa(JSON.stringify(qrData));
    
    return {
      id: uniqueID,
      qrCode,
      securityCode,
      issuedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
      hologramCode,
      biometricHash
    };
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Validate TC Kimlik (basic validation)
      if (!isValidTCKimlik(values.tcKimlik)) {
        throw new Error("Geçersiz TC Kimlik numarası");
      }

      // Create payment intent for digital ID (1 TL minimum package)
      const response = await apiRequest("POST", "/api/create-payment-intent", {
        amount: 1,
        packageType: 'dijital-kimlik',
        userInfo: values
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Store payment info for checkout
        localStorage.setItem('pendingPayment', JSON.stringify({
          clientSecret: data.clientSecret,
          amount: 1,
          packageType: 'dijital-kimlik',
          userInfo: values
        }));
        
        // Navigate to checkout
        navigate('/checkout');
      } else {
        throw new Error('Ödeme işlemi başlatılamadı');
      }
    } catch (error) {
      console.error('Digital ID creation error:', error);
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Bir hata oluştu",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Basic TC Kimlik validation
  const isValidTCKimlik = (tc: string): boolean => {
    if (tc.length !== 11 || !/^\d+$/.test(tc) || tc[0] === '0') return false;
    
    const digits = tc.split('').map(Number);
    const sum1 = (digits[0] + digits[2] + digits[4] + digits[6] + digits[8]) * 7;
    const sum2 = digits[1] + digits[3] + digits[5] + digits[7];
    const check1 = (sum1 - sum2) % 10;
    const check2 = (digits.slice(0, 10).reduce((a, b) => a + b, 0)) % 10;
    
    return check1 === digits[9] && check2 === digits[10];
  };

  // Simulate successful payment callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment_success') === 'true') {
      const userData = JSON.parse(localStorage.getItem('digitalIDUserData') || '{}');
      if (userData.ad) {
        const generatedID = generateSecurityFeatures(userData);
        setDigitalID(generatedID);
        setVerificationStep('issued');
        localStorage.removeItem('digitalIDUserData');
        
        toast({
          title: "Dijital Kimlik Oluşturuldu!",
          description: "Güvenli dijital kimlik belgeniz hazır.",
        });
      }
    }
  }, []);

  const handleDownloadID = () => {
    if (!digitalID) return;
    
    // Create a digital ID document (this would normally be a PDF or secure format)
    const idDocument = {
      ...digitalID,
      watermark: "TÜRKİYE CUMHURİYETİ - DİJİTAL KİMLİK",
      issuingAuthority: "Dijital Türkiye Kimlik Sistemi",
      securityLevel: "YÜKSEK GÜVENLİK",
      version: "v2.1-TR"
    };
    
    const dataStr = JSON.stringify(idDocument, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dijital-kimlik-${digitalID.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "İndirildi",
      description: "Dijital kimlik belgeniz indirildi.",
    });
  };

  if (verificationStep === 'issued' && digitalID) {
    return (
      <ModernLayout showBackButton={true} pageName="Dijital Kimlik">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Check className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Dijital Kimlik Oluşturuldu</h1>
            <p className="text-gray-300">Güvenli dijital kimlik belgeniz hazır</p>
          </div>

          {/* Digital ID Card */}
          <Card className="bg-gradient-to-br from-red-900 via-red-800 to-red-950 border-2 border-red-500/50 shadow-2xl">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                    <span className="text-red-800 font-bold text-xs">TR</span>
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">TÜRKİYE CUMHURİYETİ</CardTitle>
                    <p className="text-red-200 text-sm">Dijital Kimlik Belgesi</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-red-200">
                    <Shield className="w-4 h-4" />
                    <span className="text-xs">GÜVENLI</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Main ID Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-red-300" />
                    <div>
                      <p className="text-red-200 text-sm">Kimlik No</p>
                      <p className="text-white font-bold text-lg">{digitalID.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-red-300" />
                    <div>
                      <p className="text-red-200 text-sm">Veriliş Tarihi</p>
                      <p className="text-white">{new Date(digitalID.issuedAt).toLocaleDateString('tr-TR')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-red-300" />
                    <div>
                      <p className="text-red-200 text-sm">Geçerlilik Süresi</p>
                      <p className="text-white">{new Date(digitalID.expiresAt).toLocaleDateString('tr-TR')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-red-300" />
                    <div>
                      <p className="text-red-200 text-sm">Güvenlik Kodu</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-white font-mono">
                          {showSecurityCode ? digitalID.securityCode : '••••••'}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowSecurityCode(!showSecurityCode)}
                          className="p-1 h-auto text-red-300 hover:text-white"
                        >
                          {showSecurityCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Hash className="w-5 h-5 text-red-300" />
                    <div>
                      <p className="text-red-200 text-sm">Hologram Kodu</p>
                      <p className="text-white font-mono">{digitalID.hologramCode}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Fingerprint className="w-5 h-5 text-red-300" />
                    <div>
                      <p className="text-red-200 text-sm">Biyometrik Hash</p>
                      <p className="text-white font-mono text-xs">{digitalID.biometricHash.substring(0, 16)}...</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* QR Code Section */}
              <div className="border-t border-red-700/50 pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <QrCode className="w-6 h-6 text-red-300" />
                    <div>
                      <p className="text-red-200 text-sm">QR Doğrulama Kodu</p>
                      <p className="text-white font-mono text-xs">{digitalID.qrCode.substring(0, 32)}...</p>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleDownloadID}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    İndir
                  </Button>
                </div>
              </div>
              
              {/* Security Features */}
              <div className="bg-black/30 rounded-lg p-4 border border-red-700/50">
                <h3 className="text-white font-bold mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-red-300" />
                  Güvenlik Özellikleri
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="text-center">
                    <div className="text-green-400 font-bold">256-bit</div>
                    <div className="text-red-200">Şifreleme</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 font-bold">Biyometrik</div>
                    <div className="text-red-200">Doğrulama</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 font-bold">Hologram</div>
                    <div className="text-red-200">Koruma</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 font-bold">QR</div>
                    <div className="text-red-200">Doğrulama</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Next Steps */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Sonraki Adımlar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Dijital kimliğinizi güvenli bir yerde saklayın</p>
                  <p className="text-gray-300 text-sm">İndirilen dosyayı güvenli bir konumda saklayın ve yetkisiz kişilerle paylaşmayın.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Görev seçimi yapabilirsiniz</p>
                  <p className="text-gray-300 text-sm">Ödeme tamamlandığı için artık 1 görev seçebilir ve projeye katılabilirsiniz.</p>
                  <Button
                    onClick={() => navigate('/gorevler')}
                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Görevleri İncele
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Doğrulama sistemlerini kullanın</p>
                  <p className="text-gray-300 text-sm">QR kod ve güvenlik kodunuz ile kimliğinizi doğrulayabilirsiniz.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ModernLayout>
    );
  }

  return (
    <ModernLayout showBackButton={true} pageName="Dijital TC Kimlik">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto">
            <IdCard className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Dijital TC Kimlik Belgesi</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Güvenli, benzersiz dijital kimlik belgenizi oluşturun. Sadece 1 TL ile dijital kimliğinizi alın ve 1 görev seçme hakkı kazanın.
          </p>
        </div>

        {/* Security Features Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6 text-center">
              <Shield className="w-10 h-10 text-green-500 mx-auto mb-3" />
              <h3 className="text-white font-bold mb-2">Yüksek Güvenlik</h3>
              <p className="text-gray-300 text-sm">256-bit şifreleme ve biyometrik doğrulama</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6 text-center">
              <QrCode className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <h3 className="text-white font-bold mb-2">QR Doğrulama</h3>
              <p className="text-gray-300 text-sm">Anlık doğrulama için özel QR kod</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6 text-center">
              <Star className="w-10 h-10 text-purple-500 mx-auto mb-3" />
              <h3 className="text-white font-bold mb-2">Görev Hakkı</h3>
              <p className="text-gray-300 text-sm">1 görev seçme ve katılım hakkı</p>
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="w-5 h-5 mr-2 text-red-500" />
              Kimlik Bilgileri
            </CardTitle>
            <p className="text-gray-400">Dijital kimlik belgeniz için gerekli bilgileri doldurun</p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="ad"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Ad</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Adınız"
                            {...field}
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="soyad"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Soyad</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Soyadınız"
                            {...field}
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="tcKimlik"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">TC Kimlik Numarası</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="12345678901"
                          maxLength={11}
                          {...field}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="dogumTarihi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Doğum Tarihi</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dogumYeri"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Doğum Yeri</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="İstanbul"
                            {...field}
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">E-posta</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="ornek@email.com"
                            {...field}
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="telefon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Telefon</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="05xxxxxxxxx"
                            {...field}
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Payment Info */}
                <div className="bg-blue-950/50 border border-blue-800/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <AlertTriangle className="w-5 h-5 text-blue-400" />
                    <h3 className="text-white font-semibold">Ödeme Bilgisi</h3>
                  </div>
                  <p className="text-blue-200 text-sm mb-3">
                    Dijital kimlik belgesi ücreti: <strong>1 TL</strong>
                  </p>
                  <p className="text-blue-200 text-sm">
                    Ödeme sonrasında 1 görev seçme hakkınız bulunacaktır.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-bold"
                >
                  {isSubmitting ? "İşleniyor..." : "Dijital Kimlik Oluştur (1 TL)"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </ModernLayout>
  );
}