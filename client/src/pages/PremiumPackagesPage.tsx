import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Check, Star, Shield, Users, Zap, Crown } from "lucide-react";
import { PREMIUM_PACKAGES } from "@shared/packages";

interface UserProfile {
  ad: string;
  soyad: string;
  dogumTarihi: string;
  dogumYeri: string;
  babaAdi: string;
  anaAdi: string;
  cinsiyet: 'E' | 'K';
  kanGrubu: string;
}

export default function PremiumPackagesPage() {
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [showUserForm, setShowUserForm] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    ad: '',
    soyad: '',
    dogumTarihi: '',
    dogumYeri: '',
    babaAdi: '',
    anaAdi: '',
    cinsiyet: 'E',
    kanGrubu: ''
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const purchasePackageMutation = useMutation({
    mutationFn: async (data: { packageId: string; userProfile: UserProfile }) => {
      const response = await apiRequest('POST', '/api/premium/purchase', data);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Purchase failed');
      }
      return response.json();
    },
    onSuccess: (data) => {
      toast({ 
        title: "Satın Alım Başarılı", 
        description: "Premium paketiniz aktif edildi ve dijital TC kimlik belgeniz oluşturuldu!" 
      });
      queryClient.invalidateQueries({ queryKey: ['/api/premium'] });
      setShowUserForm(false);
      setSelectedPackage('');
    },
    onError: (error: Error) => {
      toast({ 
        title: "Hata", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    setShowUserForm(true);
  };

  const handlePurchase = () => {
    // Validate form
    if (!userProfile.ad || !userProfile.soyad || !userProfile.dogumTarihi || !userProfile.dogumYeri) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen tüm zorunlu alanları doldurun",
        variant: "destructive"
      });
      return;
    }

    purchasePackageMutation.mutate({
      packageId: selectedPackage,
      userProfile
    });
  };

  const packages = Object.values(PREMIUM_PACKAGES);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700 p-4">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">
            Premium Paketler
          </h1>
          <p className="text-red-100 text-xl max-w-3xl mx-auto">
            Paket satın alımında otomatik olarak gerçek verilerinizle TC Kimlik Belgesi oluşturulur
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg, index) => (
            <Card 
              key={pkg.id}
              className={`relative overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                index === 1 
                  ? 'border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100' 
                  : 'bg-white/95 backdrop-blur-sm border-white/20'
              }`}
            >
              {index === 1 && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-center py-2 font-semibold">
                  <Star className="inline w-4 h-4 mr-1" />
                  En Popüler
                </div>
              )}
              
              <CardHeader className={`text-center ${index === 1 ? 'pt-12' : ''}`}>
                <div className="flex justify-center mb-4">
                  {index === 0 && <Shield className="w-12 h-12 text-blue-600" />}
                  {index === 1 && <Crown className="w-12 h-12 text-yellow-600" />}
                  {index === 2 && <Zap className="w-12 h-12 text-purple-600" />}
                </div>
                <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                <CardDescription className="text-gray-600">
                  {pkg.description}
                </CardDescription>
                <div className="text-4xl font-bold text-gray-800 mt-4">
                  ${pkg.price}
                  <span className="text-lg font-normal text-gray-500">/yıl</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button
                  onClick={() => handlePackageSelect(pkg.id)}
                  className={`w-full mt-6 ${
                    index === 1
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700'
                      : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                  }`}
                  disabled={purchasePackageMutation.isPending}
                >
                  Paketi Seç
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* User Profile Form */}
        {showUserForm && (
          <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Kişisel Bilgileriniz
              </CardTitle>
              <CardDescription className="text-center">
                TC Kimlik Belgesi için gerçek bilgilerinizi girin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ad">Ad *</Label>
                  <Input
                    id="ad"
                    value={userProfile.ad}
                    onChange={(e) => setUserProfile({...userProfile, ad: e.target.value})}
                    placeholder="Adınız"
                  />
                </div>
                <div>
                  <Label htmlFor="soyad">Soyad *</Label>
                  <Input
                    id="soyad"
                    value={userProfile.soyad}
                    onChange={(e) => setUserProfile({...userProfile, soyad: e.target.value})}
                    placeholder="Soyadınız"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dogumTarihi">Doğum Tarihi *</Label>
                  <Input
                    id="dogumTarihi"
                    type="date"
                    value={userProfile.dogumTarihi}
                    onChange={(e) => setUserProfile({...userProfile, dogumTarihi: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="dogumYeri">Doğum Yeri *</Label>
                  <Input
                    id="dogumYeri"
                    value={userProfile.dogumYeri}
                    onChange={(e) => setUserProfile({...userProfile, dogumYeri: e.target.value})}
                    placeholder="Doğum yeriniz"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="babaAdi">Baba Adı</Label>
                  <Input
                    id="babaAdi"
                    value={userProfile.babaAdi}
                    onChange={(e) => setUserProfile({...userProfile, babaAdi: e.target.value})}
                    placeholder="Baba adı"
                  />
                </div>
                <div>
                  <Label htmlFor="anaAdi">Ana Adı</Label>
                  <Input
                    id="anaAdi"
                    value={userProfile.anaAdi}
                    onChange={(e) => setUserProfile({...userProfile, anaAdi: e.target.value})}
                    placeholder="Ana adı"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cinsiyet">Cinsiyet</Label>
                  <Select value={userProfile.cinsiyet} onValueChange={(value: 'E' | 'K') => setUserProfile({...userProfile, cinsiyet: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="E">Erkek</SelectItem>
                      <SelectItem value="K">Kadın</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="kanGrubu">Kan Grubu</Label>
                  <Select value={userProfile.kanGrubu} onValueChange={(value) => setUserProfile({...userProfile, kanGrubu: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kan grubunuz" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="0+">0+</SelectItem>
                      <SelectItem value="0-">0-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowUserForm(false)}
                  className="flex-1"
                >
                  İptal
                </Button>
                <Button
                  onClick={handlePurchase}
                  disabled={purchasePackageMutation.isPending}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                >
                  {purchasePackageMutation.isPending ? 'İşleniyor...' : 'Satın Al & TC Kimlik Al'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Paket Avantajları
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-red-200 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Otomatik TC Kimlik</h3>
              <p className="text-red-100">Paket satın alımında gerçek verilerinizle TC kimlik belgesi otomatik oluşturulur</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-red-200 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Premium Topluluk</h3>
              <p className="text-red-100">Özel premium üye topluluğuna erişim ve networking fırsatları</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-red-200 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Öncelikli Destek</h3>
              <p className="text-red-100">7/24 öncelikli teknik destek ve hızlı yanıt garantisi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}