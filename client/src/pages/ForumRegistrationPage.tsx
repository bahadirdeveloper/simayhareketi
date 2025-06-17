import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import ModernLayout from "@/components/ModernLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Users, 
  MessageSquare, 
  Shield, 
  CheckCircle,
  ExternalLink,
  ArrowRight,
  Globe,
  Lock,
  Star,
  UserPlus
} from "lucide-react";

export default function ForumRegistrationPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [forumCredentials, setForumCredentials] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    // Check if user has completed payment
    const completedPayment = localStorage.getItem('completedPayment');
    const digitalIDData = localStorage.getItem('digitalIDUserData');
    
    if (!completedPayment && !digitalIDData) {
      navigate('/katil');
      return;
    }

    // Set user info from payment data
    if (completedPayment) {
      const paymentData = JSON.parse(completedPayment);
      setUserInfo(paymentData.userInfo);
    }
  }, [navigate]);

  const generateForumAccount = async () => {
    if (!userInfo) {
      toast({
        title: "Hata",
        description: "Kullanıcı bilgileri bulunamadı.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const response = await apiRequest("POST", "/api/generate-forum-account", {
        userInfo: userInfo,
        digitalID: true
      });

      if (response.ok) {
        const data = await response.json();
        setForumCredentials(data);
        
        toast({
          title: "Forum Hesabı Oluşturuldu!",
          description: "Topluluk platformuna erişim bilgileriniz hazır.",
        });
      } else {
        throw new Error('Forum hesabı oluşturulamadı');
      }
    } catch (error) {
      // Forum account creation error
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Forum hesabı oluşturulamadı",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleForumLogin = () => {
    if (forumCredentials) {
      // Open simayhareketi.com forum in new tab
      const forumUrl = `https://simayhareketi.com`;
      window.open(forumUrl, '_blank');
      
      toast({
        title: "Forum Açıldı",
        description: "simayhareketi.com yardımlaşma forumuna yönlendirildiniz.",
      });
    }
  };

  return (
    <ModernLayout showBackButton={true} pageName="Forum Kayıt">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto"
          >
            <Users className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white">Simay Hareketi Forum</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Yardımlaşma ve dayanışma platformumuza hoş geldiniz! simayhareketi.com forumumuzda toplulukla bir araya gelin.
          </p>
        </div>

        {/* User Info */}
        {userInfo && (
          <Card className="bg-green-950/50 border-green-800/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                Onaylanmış Üye
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-green-200">Ad Soyad:</span>
                  <span className="text-white ml-2">{userInfo.ad}</span>
                </div>
                <div>
                  <span className="text-green-200">E-posta:</span>
                  <span className="text-white ml-2">{userInfo.email}</span>
                </div>
                <div>
                  <span className="text-green-200">Şehir:</span>
                  <span className="text-white ml-2">{userInfo.sehir}</span>
                </div>
                <div>
                  <span className="text-green-200">Durum:</span>
                  <Badge className="ml-2 bg-green-600 text-white">Aktif Üye</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Forum Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6 text-center">
              <MessageSquare className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <h3 className="text-white font-bold mb-2">Yardımlaşma Forumu</h3>
              <p className="text-gray-300 text-sm">Topluluk üyeleriyle yardımlaşın ve dayanışma içinde olun</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6 text-center">
              <Shield className="w-10 h-10 text-green-500 mx-auto mb-3" />
              <h3 className="text-white font-bold mb-2">Güvenli Dayanışma</h3>
              <p className="text-gray-300 text-sm">Moderatörlü ve güvenli yardımlaşma ortamı</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6 text-center">
              <Star className="w-10 h-10 text-purple-500 mx-auto mb-3" />
              <h3 className="text-white font-bold mb-2">Topluluk Desteği</h3>
              <p className="text-gray-300 text-sm">Simay Hareketi üyeleri için özel destek ve yardım</p>
            </CardContent>
          </Card>
        </div>

        {/* Forum Account Section */}
        {!forumCredentials ? (
          <Card className="bg-blue-950/50 border-blue-800/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <UserPlus className="w-5 h-5 mr-2 text-blue-400" />
                Forum Hesabı Oluştur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-blue-200">
                simayhareketi.com yardımlaşma forumumuza katılmak için otomatik hesap oluşturun. 
                Dayanışma platformumuzda toplulukla birlikte güçlü olun.
              </p>
              
              <div className="flex items-start space-x-3 text-sm">
                <Lock className="w-4 h-4 text-blue-400 mt-1" />
                <div>
                  <p className="text-white font-semibold">Güvenlik</p>
                  <p className="text-blue-200">Şifreleriniz güvenli bir şekilde oluşturulur ve sadece size gönderilir.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 text-sm">
                <Globe className="w-4 h-4 text-blue-400 mt-1" />
                <div>
                  <p className="text-white font-semibold">Erişim</p>
                  <p className="text-blue-200">Forum hesabınız dijital kimliğinizle doğrulanacak.</p>
                </div>
              </div>

              <Button
                onClick={generateForumAccount}
                disabled={isGenerating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                {isGenerating ? (
                  "Hesap Oluşturuluyor..."
                ) : (
                  <>
                    Forum Hesabı Oluştur
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-green-950/50 border-green-800/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                Forum Hesabınız Hazır!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-black/30 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-green-200 text-sm">Kullanıcı Adı:</span>
                    <p className="text-white font-mono">{forumCredentials.username}</p>
                  </div>
                  <div>
                    <span className="text-green-200 text-sm">Forum ID:</span>
                    <p className="text-white font-mono">{forumCredentials.forumId}</p>
                  </div>
                </div>
                
                <div className="border-t border-green-800/50 pt-3">
                  <span className="text-green-200 text-sm">Forum Adresi:</span>
                  <p className="text-blue-300 break-all text-sm">
                    simayhareketi.com
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleForumLogin}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  simayhareketi.com Foruma Git
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => navigate('/gorevler')}
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Görevlere Devam Et
                </Button>
              </div>

              <div className="bg-yellow-950/50 border border-yellow-800/50 rounded-lg p-4">
                <h4 className="text-yellow-200 font-semibold mb-2 flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  Forum Kuralları
                </h4>
                <ul className="text-yellow-200 text-sm space-y-1">
                  <li>• Saygılı ve yapıcı tartışmalara katılın</li>
                  <li>• Kişisel bilgilerinizi koruyun</li>
                  <li>• Topluluk kurallarına uyun</li>
                  <li>• Moderatör uyarılarını dikkate alın</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Additional Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/dijital-kimlik')}
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Dijital Kimliğimi Görüntüle
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/turkiye')}
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Ana Sayfaya Dön
          </Button>
        </div>
      </div>
    </ModernLayout>
  );
}