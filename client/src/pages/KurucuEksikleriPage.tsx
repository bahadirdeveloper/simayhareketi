import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import SimpleFuturisticTurkish from "@/components/SimpleFuturisticTurkish";
import AudioControl from "@/components/AudioControl";
import AccessibilityReader from "@/components/AccessibilityReader";
import { initAudio, playSoundtrack } from "@/lib/audio";
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

export default function KurucuEksikleriPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    ad: "",
    email: "",
    alan: "",
    neden: ""
  });
  
  useEffect(() => {
    // Initialize audio system
    initAudio('kurucu');
    
    // Record visitor stats
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
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
  }, [i18n.language]);
  
  const handleToggleAudio = () => {
    playSoundtrack();
    setIsAudioPlaying(!isAudioPlaying);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, alan: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.ad || !formData.email || !formData.alan || !formData.neden) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen tüm alanları doldurun.",
        variant: "destructive"
      });
      return;
    }
    
    // Submit form - in a real app, this would be an API call
    toast({
      title: "Başvuru Alındı",
      description: "Teşekkürler! Başvurunuz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.",
      variant: "default"
    });
    
    // Reset form
    setFormData({
      ad: "",
      email: "",
      alan: "",
      neden: ""
    });
  };
  
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <motion.h2 
      className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient bg-gradient-to-r from-red-600 to-white text-transparent bg-clip-text mb-6 mt-10 border-b-2 border-red-600/30 pb-2"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.h2>
  );
  
  const ContentBlock = ({ title, children, delay = 0.3 }: { title: string, children: React.ReactNode, delay?: number }) => (
    <motion.div
      className="bg-gradient-to-b from-black/70 to-red-950/20 backdrop-blur-sm border border-red-600/30 rounded-lg p-6 md:p-8 shadow-[0_0_20px_rgba(220,38,38,0.15)] mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
    >
      <h3 className="text-xl md:text-2xl font-bold text-red-500 mb-4">{title}</h3>
      {children}
    </motion.div>
  );
  
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Background */}
      <SimpleFuturisticTurkish />
      
      {/* Erişilebilirlik Okuyucu */}
      <AccessibilityReader 
        pageContent="Kurucunun Eksikleri sayfasına hoş geldiniz. Bu sayfada, sistemin temel vizyonu, kurucunun belirlediği eksiklikler ve bu eksikleri gidermek için başvuru yapabileceğiniz bir form bulunmaktadır."
        pageName="kurucu" 
      />
      
      {/* Türk Deseni Üstbilgi */}
      <motion.div 
        className="w-full bg-gradient-to-r from-red-950/70 via-black/60 to-red-950/70 backdrop-blur-sm border-b border-red-500/40 py-2 z-20 absolute top-0 left-0 overflow-hidden shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div 
          className="h-10 w-full absolute top-0 left-0 opacity-20" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='20' viewBox='0 0 60 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5C35.5228 5 40 9.47715 40 15C40 20.5228 35.5228 25 30 25C24.4772 25 20 20.5228 20 15C20 9.47715 24.4772 5 30 5ZM30 8C26.134 8 23 11.134 23 15C23 18.866 26.134 22 30 22C33.866 22 37 18.866 37 15C37 11.134 33.866 8 30 8ZM30 11C32.2091 11 34 12.7909 34 15C34 17.2091 32.2091 19 30 19C27.7909 19 26 17.2091 26 15C26 12.7909 27.7909 11 30 11ZM0 15 L60 15 M30 0 L30 30' stroke='%23e3a008' fill='none' /%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat-x",
            backgroundSize: "60px 20px"
          }}
        />
        <div className="flex justify-between items-center container mx-auto px-6">
          <div className="flex items-center group cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-700 relative flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
              <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs font-bold group-hover:scale-110 transition-transform duration-300">TR</span>
              </div>
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-red-500/50"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0, 0.7] 
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
            </div>
            <div className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
              <p className="text-xs text-red-500 font-semibold tracking-wide">
                Bu İcat Türk Yapımıdır
              </p>
              <p className="text-[10px] text-white/80 hidden md:block">
                Akıl, Bilim, Fen ve Sanat
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-xs text-red-500/80 pr-3 border-r border-red-500/30 mr-3">
              Cumhuriyet Güncellenme
            </p>
            <div className="bg-black/50 px-2 py-1 rounded text-white text-xs font-mono">
              v2.0
            </div>
          </div>
        </div>
      </motion.div>
      
      <main className="container mx-auto px-4 pb-24 pt-16 z-10 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gradient bg-gradient-to-r from-red-600 to-white text-transparent bg-clip-text tracking-wide mb-4">
              GÖREV 0
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
              KURUCUNUN EKSİKLERİ
            </h2>
            
            {/* Vizyon Bölümü - Dikkat Çekici Animasyonlu Kutu */}
            <motion.div
              className="relative flex justify-center mb-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-lg blur-xl"></div>
              <div className="bg-gradient-to-r from-red-950/60 to-black/70 backdrop-blur-sm p-6 border-2 border-red-600/50 rounded-lg shadow-[0_0_30px_rgba(220,38,38,0.25)] max-w-3xl relative z-10">
                <motion.div
                  className="absolute -top-4 -left-4 bg-gradient-to-r from-red-600 to-red-800 px-4 py-2 rounded-lg text-white font-bold text-sm"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  Vizyonumuz
                </motion.div>
                <p className="text-xl md:text-2xl text-white/90 font-bold mb-4 leading-relaxed">
                  "Bu sistemin temel mimarisi, <span className="text-red-500">Türk halkının kaderine gerçek bir değer katmaktır.</span>"
                </p>
                <p className="text-lg text-white/80 mb-3">
                  Bu belki ilk sınavımız değil, fakat son sınavımız olma riskini taşıdığını açıkça ilan ediyorum!
                </p>
                <ul className="text-white/80 space-y-2 mb-4 list-disc pl-6">
                  <li>Hilenin mümkün olmadığı, rüşvetin barınamadığı, vatandaşın yerinden, yurdundan ve işinden edilmediği;</li>
                  <li>Sadece cebimizden çıkan her kuruşun hesabını sorabildiğimiz, şeffaf bir halk sistemi istiyoruz.</li>
                </ul>
                <p className="text-lg text-white/80 font-bold mb-3">
                  Bu sistem <span className="text-red-500">halk adına, halk için</span> vardır!
                </p>
                <p className="text-lg text-white/80 mb-3">
                  Kısa sürede büyük işler başardık ve bu başarıların geleceği, hepimizin ortak geleceğidir. Savaşımız bundan sonra yalnızca cehalete karşıdır. Aydınlanma, bilgilenme ve bilinçlenme mücadelesinden başka bir savaş tanımıyoruz!
                </p>
                <div className="border-l-4 border-red-600 pl-4 py-1 my-4">
                  <p className="text-xl text-white font-bold">
                    Türk halkının cebinden çıkan her kuruşun hesabını soracağız!
                  </p>
                </div>
                <p className="text-lg text-white/80 mb-3">
                  Kimse endişeye kapılmasın; hiç kimsenin yaptığı bu dünyada dahi yanına kalmayacaktır, buna söz veriyoruz!
                </p>
                <p className="text-white/90 mb-4">
                  Geleceğe bıraktığım bu sistem, her aşamasıyla geliştirilebilir ve ilerletilebilir bir kapıdır. Bu kapı, Türk gençliğine sonuna kadar açıktır.
                </p>
                <div className="bg-gradient-to-r from-red-950/80 to-black/80 p-4 border-l-4 border-red-600 rounded mt-5">
                  <p className="text-xl font-bold text-white">
                    Ey Türk Gençliği!
                  </p>
                  <p className="text-white/90">
                    Birinci vazifen; bu şeffaflığı, adaleti ve dürüstlüğü yaşatmak, cehaletle ve yozlaşmayla sonuna kadar mücadele etmektir!
                  </p>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-xl text-white font-bold mb-2">
                    <span className="text-red-500">Cumhuriyet, Türkler ile yeniden güncelleniyor!</span>
                  </p>
                  <p className="text-lg text-white/80">
                    Bu güncellemenin mimarı halktır, sahibi Türk milletidir!
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Main Content Section */}
          <ContentBlock title="Kurucunun Eksikleri ve Gelecek Tablosu">
            <p className="text-white/90 text-lg mb-4">
              Bu sistemin mimarı, yalnızca hayal eden değil, açıkça eksiklerini ortaya koyan biridir. Sistem kurulurken fark edilen temel açıklar şunlardır:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <motion.div 
                className="bg-gradient-to-b from-black/60 to-red-950/20 border border-red-600/30 rounded-lg p-5"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-bold text-red-500 mb-3 flex items-center">
                  <div className="w-6 h-6 mr-2 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">1</div>
                  Yazılım Geliştirme ve Hata Takibi
                </h4>
                <ul className="space-y-2 pl-4">
                  <li className="text-white/80 flex items-start">
                    <span className="text-red-500 mr-2">•</span> Frontend Geliştiricileri (UI/UX Uzmanları)
                  </li>
                  <li className="text-white/80 flex items-start">
                    <span className="text-red-500 mr-2">•</span> Backend Geliştiricileri (Veritabanı ve Sunucu Yönetimi)
                  </li>
                  <li className="text-white/80 flex items-start">
                    <span className="text-red-500 mr-2">•</span> Yazılım Test Mühendisleri
                  </li>
                  <li className="text-white/80 flex items-start">
                    <span className="text-red-500 mr-2">•</span> Güvenlik ve Penetrasyon Test Uzmanları
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-b from-black/60 to-red-950/20 border border-red-600/30 rounded-lg p-5"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-bold text-red-500 mb-3 flex items-center">
                  <div className="w-6 h-6 mr-2 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">2</div>
                  İçerik Üretimi ve Görev Dokümantasyonu
                </h4>
                <ul className="space-y-2 pl-4">
                  <li className="text-white/80 flex items-start">
                    <span className="text-red-500 mr-2">•</span> İçerik Yöneticileri ve Editörler
                  </li>
                  <li className="text-white/80 flex items-start">
                    <span className="text-red-500 mr-2">•</span> Teknik Yazarlar (Dokümantasyon ve Kılavuz Hazırlama)
                  </li>
                  <li className="text-white/80 flex items-start">
                    <span className="text-red-500 mr-2">•</span> Multimedya İçerik Üreticileri (Grafik, Video, Ses)
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-b from-black/60 to-red-950/20 border border-red-600/30 rounded-lg p-5"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-bold text-red-500 mb-3 flex items-center">
                  <div className="w-6 h-6 mr-2 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">3</div>
                  Test, Kontrol ve Sayfa Optimizasyonu
                </h4>
                <ul className="space-y-2 pl-4">
                  <li className="text-white/80 flex items-start">
                    <span className="text-red-500 mr-2">•</span> QA (Kalite Güvence) Uzmanları
                  </li>
                  <li className="text-white/80 flex items-start">
                    <span className="text-red-500 mr-2">•</span> Performans ve Optimizasyon Mühendisleri
                  </li>
                  <li className="text-white/80 flex items-start">
                    <span className="text-red-500 mr-2">•</span> Cihaz ve Tarayıcı Uyumluluk Test Uzmanları
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-b from-black/60 to-red-950/20 border border-red-600/30 rounded-lg p-5"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-bold text-red-500 mb-3 flex items-center">
                  <div className="w-6 h-6 mr-2 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">4</div>
                  Topluluk Yönetimi ve Çağrı Sistemleri
                </h4>
                <ul className="space-y-2 pl-4">
                  <li className="text-white/80 flex items-start">
                    <span className="text-red-500 mr-2">•</span> Topluluk Yöneticileri ve Moderatörler
                  </li>
                  <li className="text-white/80 flex items-start">
                    <span className="text-red-500 mr-2">•</span> Sosyal Medya ve İletişim Uzmanları
                  </li>
                  <li className="text-white/80 flex items-start">
                    <span className="text-red-500 mr-2">•</span> Etkinlik ve Proje Koordinatörleri
                  </li>
                </ul>
              </motion.div>
            </div>
            
            <p className="text-white/90 text-lg mt-6">
              Bu sayfa, bu açıkları tamamlayacak kişileri çağırmak için oluşturulmuştur. Eğer bu vizyon sana dokunuyorsa, sisteme katkı sunmak için doğru yerdesin.
            </p>
          </ContentBlock>
          
          <ContentBlock title="Kurucunun Seçim Notu" delay={0.4}>
            <p className="text-white/90 text-lg mb-4">
              Bu görev sadece bilgi, beceri ya da kod bilmekten ibaret değil.
              Bu görev; <strong className="text-white">gözünü kırpmadan çözüm aramak</strong>, 
              <strong className="text-white"> yorulmadan üretmek</strong> ve <strong className="text-white">halk için bir şey yapmaya inanmak</strong> isteyenler içindir.
            </p>
            
            <div className="border-l-4 border-red-600 pl-4 py-1 my-6 bg-gradient-to-r from-red-950/30 to-transparent">
              <p className="text-white/90 text-lg italic">
                "Eğer bir satır koddan çok, bir satır umut bırakmak istiyorsan... 
                Eğer bu sistem senin içinde 'bu benim de davam olabilir' hissi uyandırıyorsa..."
              </p>
            </div>
            
            <p className="text-xl font-bold text-red-500 mt-4 text-center">
              O zaman sadece "ben varım" de. Gerisi birlikte yazılacak bir kod, bir fikir, bir gelecek olacak.
            </p>
          </ContentBlock>
          
          <ContentBlock title="Destek Ekibe Başvur" delay={0.5}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="ad" className="text-white text-lg">Adınız Soyadınız:</Label>
                <Input 
                  id="ad" 
                  name="ad" 
                  value={formData.ad}
                  onChange={handleInputChange}
                  className="bg-black/60 border-2 border-red-600/50 text-white h-12 py-2 px-4 placeholder:text-white/40 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  placeholder="Adınızı ve soyadınızı giriniz"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="email" className="text-white text-lg">E-posta Adresiniz:</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-black/60 border-2 border-red-600/50 text-white h-12 py-2 px-4 placeholder:text-white/40 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  placeholder="E-posta adresinizi giriniz"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="alan" className="text-white text-lg">Destek Vermek İstediğiniz Alan:</Label>
                <Select value={formData.alan} onValueChange={handleSelectChange}>
                  <SelectTrigger className="bg-black/60 border-2 border-red-600/50 text-white h-12 py-2 px-4 focus:border-red-500 focus:ring-1 focus:ring-red-500">
                    <SelectValue placeholder="Alan seçiniz" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-2 border-red-600/50 text-white">
                    <SelectItem value="Frontend (Arayüz)">Frontend (Arayüz)</SelectItem>
                    <SelectItem value="Backend (Veri ve Mantık)">Backend (Veri ve Mantık)</SelectItem>
                    <SelectItem value="Tasarım (Görsel ve UI/UX)">Tasarım (Görsel ve UI/UX)</SelectItem>
                    <SelectItem value="İçerik ve Metin Üretimi">İçerik ve Metin Üretimi</SelectItem>
                    <SelectItem value="Görev Üretimi ve Senaryo Yazımı">Görev Üretimi ve Senaryo Yazımı</SelectItem>
                    <SelectItem value="Sosyal Medya Yönetimi">Sosyal Medya Yönetimi</SelectItem>
                    <SelectItem value="Topluluk Moderasyonu">Topluluk Moderasyonu</SelectItem>
                    <SelectItem value="Test, Kontrol ve Kalite">Test, Kontrol ve Kalite</SelectItem>
                    <SelectItem value="Saha Uygulamaları ve Organizasyon">Saha Uygulamaları ve Organizasyon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="neden" className="text-white text-lg">Neden Katılmak İstiyorsunuz?</Label>
                <Textarea 
                  id="neden" 
                  name="neden" 
                  value={formData.neden}
                  onChange={handleInputChange}
                  rows={5}
                  className="bg-black/60 border-2 border-red-600/50 text-white py-2 px-4 placeholder:text-white/40 focus:border-red-500 focus:ring-1 focus:ring-red-500 min-h-[150px]"
                  placeholder="Neden bu projeye katılmak istediğinizi anlatın..."
                />
              </div>
              
              <div className="flex justify-center mt-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-800 text-white px-10 py-6 rounded-lg shadow-lg font-bold text-xl"
                  >
                    BAŞVURUYU GÖNDER
                  </Button>
                </motion.div>
              </div>
            </form>
          </ContentBlock>
          
          <ContentBlock title="🕵️ Gizli Görev Sistemi" delay={0.6}>
            <div className="relative backdrop-blur-sm p-4 border-2 border-red-600/30 rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.2)]">
              <motion.div 
                className="absolute -right-3 -top-3 w-20 h-20 bg-red-500/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <p className="text-white/90 text-lg mb-4 relative z-10">
                Bu sistemin arka planında yalnızca dikkatli gözlerin görebileceği, çözüm üretebilen akılların anlayabileceği bir <strong className="text-red-500">gizli görev mekanizması</strong> yerleştirilmiştir.
              </p>
              
              <p className="text-white/90 text-lg mb-4 relative z-10">
                Eğer bu yapının derinliklerine inmeyi başarırsan, sistemin tüm mantığına erişim hakkı kazanacaksın. Bu erişim, sana sadece bilgi değil, aynı zamanda bu sistemin profesyonel geliştiricilerinden biri olma kapısını açacak.
              </p>
              
              <motion.div
                className="bg-gradient-to-r from-red-950/40 to-black/80 p-4 border-l-4 border-red-600 rounded mt-5 relative z-10"
                animate={{ 
                  boxShadow: [
                    "0 0 5px rgba(220,38,38,0.2)", 
                    "0 0 15px rgba(220,38,38,0.4)", 
                    "0 0 5px rgba(220,38,38,0.2)"
                  ] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-white text-lg">
                  İpucu: <span className="font-mono text-red-400">"Simay"</span> sadece bir isim değil, çok katmanlı bir şifreleme sisteminin başlangıcıdır. Kodların, seslerin ve görevlerin birleştiği yerden bir yol çıkacaktır.
                </p>
              </motion.div>
            </div>
          </ContentBlock>
          
          {/* Navigation Buttons */}
          <div className="flex justify-center mt-10 gap-4">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
              <Button 
                variant="outline"
                className="border-2 border-red-600/60 text-red-500 hover:bg-red-950/20 hover:text-white"
                onClick={() => navigate("/gorevler")}
              >
                ◀ Görevlere Dön
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
              <Button 
                variant="outline"
                className="border-2 border-red-600/60 text-red-500 hover:bg-red-950/20 hover:text-white"
                onClick={() => navigate("/")}
              >
                Ana Sayfa
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
      
      {/* Bottom animation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 text-white/70 text-xl font-semibold tracking-wide animate-pulse z-10 mb-2">
        CUMHURİYET GÜNCELLENİYOR
      </div>
      
      <AudioControl onToggle={handleToggleAudio} />
    </div>
  );
}