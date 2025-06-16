import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Download, Shield, User, Calendar, MapPin, Droplets, ArrowRight, Package } from "lucide-react";
import { useLocation } from "wouter";

interface DijitalKimlik {
  id: number;
  userId: number;
  uyelikId: number;
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

interface PremiumStatus {
  membership: {
    id: number;
    userId: number;
    planTipi: string;
    fiyat: number;
    para_birimi: string;
    bitisTarihi: string;
    durum: string;
  };
  hasDigitalIdentity: boolean;
  digitalIdentity: DijitalKimlik | null;
}

export default function DijitalKimlikPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Check user's premium status and digital identity
  const { data: premiumStatus, isLoading, error } = useQuery<PremiumStatus>({
    queryKey: ['/api/premium/status', 1], // Using userId 1 for demo
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/premium/status/1');
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Premium üyelik bulunamadı');
        }
        throw new Error('Sunucu hatası');
      }
      return response.json();
    },
    retry: false,
  });

  const handleDownloadIdentity = async () => {
    if (!premiumStatus?.digitalIdentity) return;

    try {
      const response = await apiRequest('GET', `/api/digital-identity/download/${premiumStatus.digitalIdentity.id}`);
      if (response.ok) {
        const htmlContent = await response.text();
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `tc-kimlik-${premiumStatus.digitalIdentity.tcNo}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        toast({
          title: "İndirme Başarılı",
          description: "TC Kimlik belgeniz başarıyla indirildi",
        });
      } else {
        throw new Error('İndirme başarısız');
      }
    } catch (error) {
      toast({
        title: "İndirme Hatası",
        description: "Belge indirilemedi, lütfen tekrar deneyin",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !premiumStatus) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Package className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-white mb-4">
                Dijital Kimlik Sistemi
              </h1>
              <p className="text-xl text-blue-200 mb-8">
                TC Kimlik belgenizi almak için premium üyelik gereklidir
              </p>
            </div>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-white flex items-center justify-center gap-2">
                  <Shield className="h-6 w-6 text-blue-400" />
                  Premium Üyelik Gerekli
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Dijital TC Kimlik belgesi otomatik olarak premium paket satın alımında oluşturulur
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400 mb-1">Temel</div>
                    <div className="text-sm text-slate-300">$49.99/yıl</div>
                  </div>
                  <div className="text-center p-4 bg-blue-600/20 rounded-lg border border-blue-500/30">
                    <div className="text-2xl font-bold text-blue-400 mb-1">Premium</div>
                    <div className="text-sm text-slate-300">$99.99/yıl</div>
                  </div>
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400 mb-1">Kurumsal</div>
                    <div className="text-sm text-slate-300">$199.99/yıl</div>
                  </div>
                </div>

                <div className="bg-slate-700/30 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Tüm paketlerde dahil:</h3>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>✓ Otomatik TC Kimlik belgesi oluşturma</li>
                    <li>✓ Gerçek kişisel verilerinizle oluşturulur</li>
                    <li>✓ HTML formatında indirilebilir</li>
                    <li>✓ Resmi görünümde profesyonel tasarım</li>
                  </ul>
                </div>

                <Button 
                  onClick={() => setLocation('/premium-paketler')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                >
                  Premium Paketleri İncele
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const { digitalIdentity } = premiumStatus;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Dijital TC Kimlik Belgesi
            </h1>
            <p className="text-xl text-blue-200">
              Premium üyeliğinizle otomatik oluşturulmuş dijital kimlik belgeniz
            </p>
          </div>

          {digitalIdentity ? (
            <div className="space-y-8">
              {/* Premium Status */}
              <Card className="bg-emerald-800/30 border-emerald-500/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-emerald-400 flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Premium Üyelik Aktif
                    </CardTitle>
                    <Badge className="bg-emerald-600 text-white">
                      {premiumStatus.membership.planTipi.toUpperCase()}
                    </Badge>
                  </div>
                  <CardDescription className="text-emerald-200">
                    Bitiş tarihi: {new Date(premiumStatus.membership.bitisTarihi).toLocaleDateString('tr-TR')}
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Digital Identity Card */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <User className="h-6 w-6 text-blue-400" />
                    TC Kimlik Bilgileri
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Gerçek kişisel verilerinizle oluşturulmuş dijital kimlik belgeniz
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-400 mb-1 block">
                          TC Kimlik No
                        </label>
                        <div className="text-xl font-bold text-white bg-slate-700/50 p-3 rounded-lg">
                          {digitalIdentity.tcNo}
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-slate-400 mb-1 block">
                          Ad Soyad
                        </label>
                        <div className="text-lg text-white bg-slate-700/50 p-3 rounded-lg">
                          {digitalIdentity.ad} {digitalIdentity.soyad}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-400 mb-1 block flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Doğum Tarihi
                        </label>
                        <div className="text-white bg-slate-700/50 p-3 rounded-lg">
                          {new Date(digitalIdentity.dogumTarihi).toLocaleDateString('tr-TR')}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-400 mb-1 block flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Doğum Yeri
                        </label>
                        <div className="text-white bg-slate-700/50 p-3 rounded-lg">
                          {digitalIdentity.dogumYeri}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-400 mb-1 block">
                          Baba Adı
                        </label>
                        <div className="text-white bg-slate-700/50 p-3 rounded-lg">
                          {digitalIdentity.babaAdi}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-400 mb-1 block">
                          Ana Adı
                        </label>
                        <div className="text-white bg-slate-700/50 p-3 rounded-lg">
                          {digitalIdentity.anaAdi}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-400 mb-1 block">
                          Cinsiyet
                        </label>
                        <div className="text-white bg-slate-700/50 p-3 rounded-lg">
                          {digitalIdentity.cinsiyet === 'E' ? 'Erkek' : 'Kadın'}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-400 mb-1 block flex items-center gap-2">
                          <Droplets className="h-4 w-4" />
                          Kan Grubu
                        </label>
                        <div className="text-white bg-slate-700/50 p-3 rounded-lg">
                          {digitalIdentity.kanGrubu}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-slate-700" />

                  {/* Document Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-400 mb-1 block">
                        Seri No
                      </label>
                      <div className="text-white bg-slate-700/50 p-3 rounded-lg text-center">
                        {digitalIdentity.seriNo}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-400 mb-1 block">
                        Belge No
                      </label>
                      <div className="text-white bg-slate-700/50 p-3 rounded-lg text-center">
                        {digitalIdentity.belgeNo}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-400 mb-1 block">
                        Kayıt No
                      </label>
                      <div className="text-white bg-slate-700/50 p-3 rounded-lg text-center">
                        {digitalIdentity.kayitNo}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button 
                      onClick={handleDownloadIdentity}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      size="lg"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      TC Kimlik Belgesini İndir
                    </Button>
                    
                    <Button 
                      onClick={() => setLocation('/premium-paketler')}
                      variant="outline"
                      className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                      size="lg"
                    >
                      Premium Paketleri Görüntüle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm text-center">
              <CardContent className="py-12">
                <Shield className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Dijital Kimlik Oluşturuluyor
                </h3>
                <p className="text-slate-300 mb-6">
                  Premium üyeliğiniz aktif ancak dijital kimlik henüz oluşturulmamış. Lütfen tekrar deneyin.
                </p>
                <Button 
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Sayfayı Yenile
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}