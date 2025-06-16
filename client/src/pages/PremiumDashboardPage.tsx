import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/PageLayout";
import { 
  Shield, 
  Download, 
  Star, 
  Calendar,
  CreditCard,
  User,
  Settings,
  LogOut,
  Crown,
  CheckCircle,
  Lock
} from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface PremiumUser {
  id: string;
  username: string;
  email: string;
  membershipType: 'bronze' | 'silver' | 'gold' | 'platinum';
  joinDate: string;
  digitalIdNumber: string;
  contributionAmount: number;
  features: string[];
}

export default function PremiumDashboardPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<PremiumUser | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("premiumToken");
    if (!token) {
      navigate("/premium-login");
      return;
    }

    // Mock user data - in real app, fetch from API
    setUser({
      id: "PREMIUM_" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      username: "premium_user",
      email: "user@example.com",
      membershipType: 'gold',
      joinDate: "2024-01-15",
      digitalIdNumber: "TR-" + Math.random().toString(36).substr(2, 12).toUpperCase(),
      contributionAmount: 250,
      features: [
        "Dijital Kimlik Belgesi",
        "Premium İçerik Erişimi", 
        "Öncelikli Destek",
        "Özel Toplantılara Katılım",
        "Gelişmiş Analitik"
      ]
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("premiumToken");
    toast({
      title: "Çıkış Yapıldı",
      description: "Premium hesabınızdan başarıyla çıkış yaptınız.",
    });
    navigate("/");
  };

  const handleDownloadId = () => {
    toast({
      title: "İndirme Başlatıldı",
      description: "Dijital kimlik belgeniz indiriliyor...",
    });
    // In real app, trigger download
  };

  const getMembershipColor = (type: string) => {
    switch (type) {
      case 'bronze': return 'from-amber-600 to-amber-800';
      case 'silver': return 'from-slate-400 to-slate-600';
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'platinum': return 'from-purple-400 to-purple-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getMembershipIcon = (type: string) => {
    switch (type) {
      case 'platinum': return Crown;
      case 'gold': return Star;
      default: return Shield;
    }
  };

  if (!user) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full" />
        </div>
      </PageLayout>
    );
  }

  const MembershipIcon = getMembershipIcon(user.membershipType);

  return (
    <PageLayout 
      showLanguageSelector={true} 
      showBackNavigation={true}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Premium Dashboard
              </h1>
              <p className="text-slate-300 mt-2">
                Hoş geldiniz, {user.username}
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-slate-600 text-white hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Çıkış Yap
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Sol Kolon - Profil Bilgileri */}
            <div className="space-y-6">
              
              {/* Üyelik Kartı */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className={`mx-auto p-4 bg-gradient-to-r ${getMembershipColor(user.membershipType)} rounded-full w-fit`}>
                      <MembershipIcon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-white capitalize">
                      {user.membershipType} Üyelik
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Üyelik No:</span>
                        <span className="text-white font-mono">{user.id}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Katılım:</span>
                        <span className="text-white">{new Date(user.joinDate).toLocaleDateString('tr-TR')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Katkı:</span>
                        <span className="text-white">{user.contributionAmount} TL</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Dijital Kimlik */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-green-400" />
                      Dijital Kimlik
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm text-slate-400">Kimlik Numarası</p>
                      <p className="text-white font-mono text-lg">{user.digitalIdNumber}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span>Onaylanmış</span>
                    </div>
                    <Button 
                      onClick={handleDownloadId}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Belgeyi İndir
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Orta Kolon - Özellikler */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Premium Özellikler</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {user.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                          <span className="text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Hızlı Erişim */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Hızlı Erişim</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      onClick={() => navigate("/premium-content")}
                      className="w-full justify-start bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30"
                    >
                      <Lock className="h-4 w-4 mr-2 text-purple-400" />
                      Premium İçerik
                    </Button>
                    <Button 
                      onClick={() => navigate("/premium-forum")}
                      className="w-full justify-start bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30"
                    >
                      <User className="h-4 w-4 mr-2 text-blue-400" />
                      Özel Forum
                    </Button>
                    <Button 
                      onClick={() => navigate("/premium-analytics")}
                      className="w-full justify-start bg-green-600/20 hover:bg-green-600/30 border border-green-500/30"
                    >
                      <Settings className="h-4 w-4 mr-2 text-green-400" />
                      Analitik Rapor
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sağ Kolon - Aktiviteler */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Son Aktiviteler</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                        <div>
                          <p className="text-white text-sm">Dijital kimlik onaylandı</p>
                          <p className="text-slate-400 text-xs">2 saat önce</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                        <div>
                          <p className="text-white text-sm">Premium forum erişimi aktif</p>
                          <p className="text-slate-400 text-xs">1 gün önce</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                        <div>
                          <p className="text-white text-sm">Katkı ödemesi alındı</p>
                          <p className="text-slate-400 text-xs">3 gün önce</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* İstatistikler */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">İstatistikler</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">47</p>
                        <p className="text-xs text-slate-400">Forum Mesajı</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">12</p>
                        <p className="text-xs text-slate-400">Aktif Gün</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">8</p>
                        <p className="text-xs text-slate-400">İndirilen İçerik</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">95%</p>
                        <p className="text-xs text-slate-400">Katılım Oranı</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}