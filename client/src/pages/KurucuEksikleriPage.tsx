import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import SimpleFuturisticTurkish from "@/components/SimpleFuturisticTurkish";
import AccessibilityReader from "@/components/AccessibilityReader";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Code, 
  Megaphone, 
  Shield, 
  BookOpen, 
  Wrench,
  Target,
  Send,
  CheckCircle,
  AlertCircle,
  Heart,
  Star,
  Zap
} from "lucide-react";

export default function KurucuEksikleriPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    ad: "",
    email: "",
    alan: "",
    neden: "",
    deneyim: "",
    zaman: ""
  });
  
  useEffect(() => {
    
    const recordVisit = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: i18n.language || "tr",
            hasInteracted: false,
            page: "kurucu"
          }
        );
      } catch (error) {
        // Silent visit tracking error
      }
    };
    
    recordVisit();
  }, [i18n.language]);
  
  const handleToggleAudio = () => {
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Enhanced form validation
      const errors = [];
      
      if (!formData.ad || formData.ad.trim().length < 2) {
        errors.push("Ad soyad en az 2 karakter olmalıdır");
      }
      
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push("Geçerli bir e-posta adresi giriniz");
      }
      
      if (!formData.alan) {
        errors.push("Uzmanlık alanı seçilmelidir");
      }
      
      if (!formData.neden || formData.neden.trim().length < 10) {
        errors.push("Katılım nedeni en az 10 karakter olmalıdır");
      }
      
      if (errors.length > 0) {
        toast({
          title: "Form Hataları",
          description: errors.join(", "),
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      // Submit to API
      const response = await apiRequest("POST", "/api/applications", {
        type: "kurucu-eksikleri",
        data: formData,
        timestamp: new Date().toISOString()
      });
      
      if (response.ok) {
        toast({
          title: "Başvuru Başarıyla Alındı!",
          description: "Teşekkürler! En kısa sürede sizinle iletişime geçeceğiz.",
          variant: "default"
        });
        
        // Reset form
        setFormData({
          ad: "",
          email: "",
          alan: "",
          neden: "",
          deneyim: "",
          zaman: ""
        });
      } else {
        throw new Error("Başvuru gönderilemedi");
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const eksiklikler = [
    {
      id: 1,
      icon: Code,
      title: "Yazılım Geliştirme",
      subtitle: "Frontend & Backend",
      description: "Modern web teknolojileri, UI/UX tasarım, veritabanı yönetimi",
      priority: "Yüksek",
      positions: ["React Developer", "Node.js Developer", "UI/UX Designer", "Full Stack Developer"]
    },
    {
      id: 2,
      icon: Megaphone,
      title: "Pazarlama & İletişim",
      subtitle: "Dijital Strateji",
      description: "Sosyal medya yönetimi, içerik üretimi, kampanya geliştirme",
      priority: "Yüksek",
      positions: ["Sosyal Medya Uzmanı", "İçerik Editörü", "Grafik Designer", "Video Editor"]
    },
    {
      id: 3,
      icon: Shield,
      title: "Güvenlik & Altyapı",
      subtitle: "Sistem Güvenliği",
      description: "Siber güvenlik, penetrasyon testleri, sistem yönetimi",
      priority: "Kritik",
      positions: ["Güvenlik Uzmanı", "DevOps Engineer", "Sistem Yöneticisi"]
    },
    {
      id: 4,
      icon: BookOpen,
      title: "İçerik & Eğitim",
      subtitle: "Kültürel İçerik",
      description: "Türk kültürü araştırması, eğitim materyali hazırlama",
      priority: "Orta",
      positions: ["İçerik Yazarı", "Kültür Araştırmacısı", "Eğitim Uzmanı"]
    },
    {
      id: 5,
      icon: Users,
      title: "Topluluk Yönetimi",
      subtitle: "Sosyal Etkileşim",
      description: "Kullanıcı deneyimi, topluluk moderasyonu, etkinlik yönetimi",
      priority: "Orta",
      positions: ["Topluluk Yöneticisi", "Moderatör", "Etkinlik Koordinatörü"]
    },
    {
      id: 6,
      icon: Target,
      title: "Proje Yönetimi",
      subtitle: "Organizasyon",
      description: "Proje planlama, kaynak yönetimi, süreç optimizasyonu",
      priority: "Yüksek",
      positions: ["Proje Yöneticisi", "Scrum Master", "Product Owner"]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Kritik": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Yüksek": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Orta": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Background */}
      <SimpleFuturisticTurkish />
      
      {/* Erişilebilirlik Okuyucu */}
      <AccessibilityReader 
        pageContent="Kurucunun Eksikleri sayfasına hoş geldiniz. Bu sayfada, sistem mimarının açıkça belirttiği eksiklikler ve destek alanları bulunmaktadır."
        pageName="kurucu" 
      />
      
      {/* Modern Header */}
      <div className="relative z-20 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-400 via-orange-500 to-red-600 bg-clip-text text-transparent mb-6"
            >
              KURUCUNUN EKSİKLERİ
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-300 text-xl max-w-3xl mx-auto"
            >
              Sistem mimarının açıkça belirttiği eksiklikler ve destek alanları
            </motion.p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 pb-24 max-w-6xl z-10 relative">
        <div className="space-y-20">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="relative mb-12">
              <motion.div
                className="w-32 h-32 mx-auto bg-gradient-to-br from-orange-500/30 to-red-600/30 rounded-full flex items-center justify-center border-2 border-orange-500/50"
                animate={{
                  boxShadow: [
                    "0 0 50px rgba(251, 146, 60, 0.4)",
                    "0 0 100px rgba(251, 146, 60, 0.6)",
                    "0 0 50px rgba(251, 146, 60, 0.4)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Wrench className="w-16 h-16 text-orange-400" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-red-500/10 rounded-full blur-3xl"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="backdrop-blur-xl bg-gradient-to-br from-black/80 via-orange-950/20 to-black/80 border-2 border-orange-500/40 rounded-3xl p-12 shadow-[0_30px_100px_rgba(251,146,60,0.2)]"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500"></div>
              
              <Heart className="w-12 h-12 text-red-400 mx-auto mb-6" />
              
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent mb-6">
                Sistemin Vizyonu
              </h2>
              
              <blockquote className="text-xl md:text-2xl text-white/90 italic mb-6 leading-relaxed">
                "Bu sistemin temel mimarisi, Türk halkının kaderine gerçek bir değer katmaktır. 
                Bu belki ilk sınavımız değil, fakat son sınavımız olma riskini taşıdığını açıkça ilan ediyorum!"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-2 text-orange-400">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-sm font-medium">Sistem Mimarı</span>
                <Star className="w-5 h-5 fill-current" />
              </div>
            </motion.div>
          </motion.div>

          {/* Eksiklikler Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-6">
                Tespit Edilen Eksiklikler
              </h2>
              <p className="text-gray-300 text-xl max-w-3xl mx-auto">
                Sistemin güçlenmesi için ihtiyaç duyulan kritik alanlar ve pozisyonlar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eksiklikler.map((eksiklik, index) => (
                <motion.div
                  key={eksiklik.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full bg-gradient-to-br from-black/60 via-gray-900/40 to-black/60 border-2 border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 backdrop-blur-lg shadow-[0_0_30px_rgba(251,146,60,0.1)] hover:shadow-[0_0_50px_rgba(251,146,60,0.2)]">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-xl flex items-center justify-center border border-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                          <eksiklik.icon className="w-7 h-7 text-orange-400" />
                        </div>
                        <Badge className={`${getPriorityColor(eksiklik.priority)} border`}>
                          {eksiklik.priority}
                        </Badge>
                      </div>
                      
                      <CardTitle className="text-xl text-white group-hover:text-orange-400 transition-colors duration-300">
                        {eksiklik.title}
                      </CardTitle>
                      <CardDescription className="text-orange-400/80 font-medium">
                        {eksiklik.subtitle}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {eksiklik.description}
                      </p>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-orange-400 mb-3 flex items-center">
                          <Zap className="w-4 h-4 mr-2" />
                          Aranan Pozisyonlar
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {eksiklik.positions.map((position, i) => (
                            <Badge 
                              key={i}
                              variant="outline" 
                              className="text-xs bg-orange-500/10 text-orange-300 border-orange-500/30 hover:bg-orange-500/20 transition-colors"
                            >
                              {position}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Application Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-black/70 via-orange-950/10 to-black/70 border-2 border-orange-500/40 backdrop-blur-xl shadow-[0_30px_100px_rgba(251,146,60,0.2)]">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500"></div>
              
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-full flex items-center justify-center mb-6 border border-orange-500/30">
                  <Send className="w-8 h-8 text-orange-400" />
                </div>
                
                <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
                  Eksikleri Giderme Başvurusu
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Sistemin güçlenmesine katkı sağlamak için başvurunuzu yapın
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="ad" className="text-white font-medium flex items-center">
                        <Users className="w-4 h-4 mr-2 text-orange-400" />
                        Ad Soyad *
                      </Label>
                      <Input
                        id="ad"
                        name="ad"
                        value={formData.ad}
                        onChange={handleInputChange}
                        placeholder="Adınız ve soyadınız"
                        className="bg-black/50 border-orange-500/30 text-white placeholder:text-gray-400 focus:border-orange-400 transition-colors"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white font-medium flex items-center">
                        <Send className="w-4 h-4 mr-2 text-orange-400" />
                        E-posta *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="ornek@email.com"
                        className="bg-black/50 border-orange-500/30 text-white placeholder:text-gray-400 focus:border-orange-400 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="alan" className="text-white font-medium flex items-center">
                        <Target className="w-4 h-4 mr-2 text-orange-400" />
                        Uzmanlık Alanı *
                      </Label>
                      <Select value={formData.alan} onValueChange={(value) => handleSelectChange("alan", value)}>
                        <SelectTrigger className="bg-black/50 border-orange-500/30 text-white focus:border-orange-400">
                          <SelectValue placeholder="Alanınızı seçin" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 border-orange-500/30">
                          <SelectItem value="yazilim">Yazılım Geliştirme</SelectItem>
                          <SelectItem value="pazarlama">Pazarlama & İletişim</SelectItem>
                          <SelectItem value="guvenlik">Güvenlik & Altyapı</SelectItem>
                          <SelectItem value="icerik">İçerik & Eğitim</SelectItem>
                          <SelectItem value="topluluk">Topluluk Yönetimi</SelectItem>
                          <SelectItem value="proje">Proje Yönetimi</SelectItem>
                          <SelectItem value="diger">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="zaman" className="text-white font-medium flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-orange-400" />
                        Ayırabileceğiniz Zaman
                      </Label>
                      <Select value={formData.zaman} onValueChange={(value) => handleSelectChange("zaman", value)}>
                        <SelectTrigger className="bg-black/50 border-orange-500/30 text-white focus:border-orange-400">
                          <SelectValue placeholder="Haftalık süre" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 border-orange-500/30">
                          <SelectItem value="5-10">5-10 saat/hafta</SelectItem>
                          <SelectItem value="10-20">10-20 saat/hafta</SelectItem>
                          <SelectItem value="20-40">20-40 saat/hafta</SelectItem>
                          <SelectItem value="40+">40+ saat/hafta (Tam zamanlı)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deneyim" className="text-white font-medium flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 text-orange-400" />
                      Deneyim ve Beceriler
                    </Label>
                    <Textarea
                      id="deneyim"
                      name="deneyim"
                      value={formData.deneyim}
                      onChange={handleInputChange}
                      placeholder="Deneyimlerinizi, becerilerinizi ve önceki projelerinizi kısaca açıklayın..."
                      className="bg-black/50 border-orange-500/30 text-white placeholder:text-gray-400 focus:border-orange-400 transition-colors min-h-24"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="neden" className="text-white font-medium flex items-center">
                      <Heart className="w-4 h-4 mr-2 text-orange-400" />
                      Neden Katkı Sağlamak İstiyorsunuz? *
                    </Label>
                    <Textarea
                      id="neden"
                      name="neden"
                      value={formData.neden}
                      onChange={handleInputChange}
                      placeholder="Bu projeye neden katkı sağlamak istediğinizi ve motivasyonunuzu paylaşın..."
                      className="bg-black/50 border-orange-500/30 text-white placeholder:text-gray-400 focus:border-orange-400 transition-colors min-h-32"
                      rows={5}
                      required
                    />
                  </div>

                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(251,146,60,0.3)] hover:shadow-[0_0_50px_rgba(251,146,60,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                          Başvuru Gönderiliyor...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Send className="w-5 h-5 mr-3" />
                          Başvuruyu Gönder
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <div className="backdrop-blur-xl bg-gradient-to-br from-orange-500/10 via-red-500/5 to-orange-500/10 border border-orange-500/30 rounded-2xl p-8 max-w-3xl mx-auto">
              <AlertCircle className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <p className="text-xl md:text-2xl font-bold text-white mb-2">
                Sistemin Geleceği Sizin Katkılarınızla Şekillenecek
              </p>
              <p className="text-gray-300 text-lg">
                Her eksiklik, sistemin güçlenmesi için bir fırsattır. Birlikte daha güçlü bir gelecek inşa edelim.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}