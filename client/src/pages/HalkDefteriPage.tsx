import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import SimpleFuturisticTurkish from "@/components/SimpleFuturisticTurkish";
import AudioControl from "@/components/AudioControl";
import AccessibilityReader from "@/components/AccessibilityReader";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ManifestoEntry {
  id: number;
  title: string;
  content: string;
}

interface FeedbackEntry {
  id: number;
  name: string;
  city: string;
  message: string;
  date: string;
  approved: boolean;
}

export default function HalkDefteriPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    message: ""
  });
  
  // Manifesto entries
  const [manifestoEntries] = useState<ManifestoEntry[]>([
    {
      id: 1,
      title: "ÖLÜMSÜZLÜK FİKİRLE BAŞLAR",
      content: "Ölmüş insanları dondurmak bir çözüm değildir. Beden yeniden var olabilir, hem de demirden bir beden. Ancak o bedene hayat veren anılar, duygular ve yaşanmışlıklar yoksa, o beden yalnızca boş bir kabuktur. Mustafa Kemal ve diğer önderler, fikirleriyle yaşamaya devam etmektedir. Gerçek ölümsüzlük, zihinlerde yaşayan bir iz, bir fikirdir."
    },
    {
      id: 2,
      title: "HALKIN İRADESİ",
      content: "Bu sistem, hiçbir otoritenin, kurumun ya da zümrenin değil, doğrudan halkın kendi bilinç gücüyle şekillendirdiği bir düzendir."
    },
    {
      id: 3,
      title: "ZİNCİR VİCDANIYLA BAŞLAR",
      content: "Bu zincir, akılla değil yalnızca vicdanla bağlanabilir. Her katılım bir kalbin onayı, bir insanın öz benliğiyle verdiği sözdür."
    },
    {
      id: 4,
      title: "GÖRÜNMEYENİN GÜCÜ",
      content: "Bu yapı, görünen liderler veya öncülerle değil; görünmeyen, bilinçten doğan ortak akılla yönetilir. Hiçbir kişi sistemin önüne geçemez."
    },
    {
      id: 5,
      title: "ADALET HERKESİN YÜZÜNDEN OKUNMALI",
      content: "Yazılı kanunlardan önce halkın yüzünde okunabilen bir adalet gerekir. Bu sistem, yalnızca hukuka değil, insanın gözlerine bakarak hükmeder."
    },
    {
      id: 6,
      title: "SİSTEMLER GELİR GEÇER, BİLİNÇ KALIR",
      content: "Bu yapı geçici bir yönetim şekli değil, kalıcı bir bilinç sıçramasıdır. Hiçbir makam, hiçbir yasa halkın öz benliğini aşamaz."
    },
    {
      id: 7,
      title: "TEK YOL ŞEFFAFLIKTIR",
      content: "Bu yapıda hiçbir bilgi halktan gizlenemez. Tüm harcamalar, kararlar ve uygulamalar açık ve izlenebilir olmalıdır."
    },
    {
      id: 8,
      title: "HER İNSAN BİR ZİNCİR HALKASIDIR",
      content: "Sistemi sadece yönetenler değil, izleyenler de inşa eder. Her birey zincirdeki yerini aldığında halk gerçek olur."
    },
    {
      id: 9, 
      title: "LAİKLİK, HALKIN AKIL ÖZGÜRLÜĞÜDÜR",
      content: "Bu yapıda laiklik, yalnızca dinle devletin ayrımı değil; halkın akıl, inanç ve düşünce özgürlüğünün teminatıdır. Hiçbir inanç, diğerine üstün değildir."
    },
    {
      id: 10,
      title: "ATATÜRK SADECE TARİHİN DEĞİL, GELECEĞİN ÖNCÜSÜDÜR",
      content: "Bu yapı, Mustafa Kemal'in halkçılık, bilim ve özgürlük ilkelerini yalnız anmakla kalmaz; gelecek yüzyıllara kodlar."
    },
    {
      id: 11,
      title: "CUMHURİYETİN RUHU HALKIN ÖZGÜRLÜĞÜDÜR",
      content: "Bu yapı, cumhuriyeti yalnızca bir yönetim biçimi değil, halkın kendi kaderini tayin hakkı olarak görür. Bu ruh sonsuza dek yaşatılacaktır."
    },
    {
      id: 12,
      title: "ZİNCİRİN SON HALKASI SENSİN",
      content: "Manifesto burada biter, ama görev şimdi başlar. Zincirin tamamlanması, halkın tek tek bilinçle ayağa kalkmasına bağlıdır. Son halka sensin."
    },
  ]);
  
  // Halk Defteri entries
  const [entries] = useState<FeedbackEntry[]>([
    {
      id: 1,
      name: "Ahmet Yılmaz",
      city: "İstanbul",
      message: "İlk fikir: Sistemi tamamen dağıt ama geri toplayabileceğin yapısal bir iz bırak.",
      date: "15 Mart 2025",
      approved: true
    },
    {
      id: 2,
      name: "Ayşe Kaya",
      city: "Ankara",
      message: "Ne zaman başladığını hatırlamıyorsan, hâlâ başlamış sayılmazsın.",
      date: "28 Mart 2025",
      approved: true
    },
    {
      id: 3,
      name: "Mehmet Demir",
      city: "İzmir",
      message: "Atatürk bir yazılım mühendisi olsaydı neyi önce kodlardı?",
      date: "5 Nisan 2025",
      approved: true
    },
    {
      id: 4,
      name: "Zeynep Şahin",
      city: "Antalya",
      message: "Ben kimim? sorusu değil, Kimi bekliyorum? sorusu daha tehlikelidir.",
      date: "12 Nisan 2025",
      approved: true
    },
    {
      id: 5,
      name: "Mustafa Özcan",
      city: "Eskişehir",
      message: "Bazen ülke değiştirmek değil, frekans değiştirmek gerekir.",
      date: "19 Nisan 2025",
      approved: true
    },
    {
      id: 6,
      name: "Kemal Yıldız",
      city: "Bursa",
      message: "Akıl bir yoldur. Kalp bir yakıttır. Cesaret ise kontağı çevirendir.",
      date: "22 Nisan 2025",
      approved: true
    },
    {
      id: 7,
      name: "Elif Çetin",
      city: "Adana",
      message: "Türk olmak, vicdanı körelmeyen, merhameti unutmayan bir yürekle yürümektir.",
      date: "25 Nisan 2025",
      approved: true
    },
    {
      id: 8,
      name: "Ali Kara",
      city: "Samsun",
      message: "Türk olmak, Mustafa Kemal gibi 'Hayır!' diyebilmektir. Korkmadan, susmadan, dimdik.",
      date: "26 Nisan 2025",
      approved: true
    }
  ]);
  
  useEffect(() => {
    // Record visitor stats
    const recordVisit = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: i18n.language || "tr",
            hasInteracted: false,
            page: "halk-defteri"
          }
        );
      } catch (error) {
        console.error("Failed to record visit:", error);
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.city || !formData.message) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen tüm alanları doldurun.",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.message.length < 20) {
      toast({
        title: "Mesaj Çok Kısa",
        description: "Lütfen en az 20 karakter uzunluğunda bir mesaj girin.",
        variant: "destructive"
      });
      return;
    }
    
    // Success message
    toast({
      title: "Mesajınız Alındı",
      description: "Teşekkürler! Mesajınız incelendikten sonra Halk Defteri'ne eklenecek.",
      variant: "default"
    });
    
    // Reset form
    setFormData({
      name: "",
      city: "",
      message: ""
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
  
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Background */}
      <SimpleFuturisticTurkish />
      
      {/* Erişilebilirlik Okuyucu */}
      <AccessibilityReader 
        pageContent="Halk Defteri ve Manifestolar sayfasına hoş geldiniz. Bu sayfada, vatandaşların düşünce ve önerilerini paylaştığı bir platform ve Cumhuriyet'in manifestolarını bulacaksınız. Fikirlerinizi paylaşabilir ve diğer vatandaşların görüşlerini okuyabilirsiniz."
        pageName="halk-defteri" 
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
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl font-black text-gradient bg-gradient-to-r from-red-500 via-red-300 to-white text-transparent bg-clip-text tracking-wide mb-6 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <span className="relative">
                HALK DEFTERİ 
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-red-600/30 to-red-400/30 blur-lg rounded-lg"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-red-400 to-red-600 text-transparent bg-clip-text">
                & MANİFESTOLAR
              </span>
            </motion.h1>
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-white/95 mb-6 tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              🇹🇷 Geleceğin Sözleri, Halkın Sesleri 🇹🇷
            </motion.h2>
            
            {/* Intro Section */}
            <motion.div
              className="relative flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-yellow-500/20 rounded-xl blur-2xl animate-pulse"></div>
              <motion.div 
                className="bg-gradient-to-br from-red-950/80 via-black/80 to-red-900/70 backdrop-blur-md p-8 border-2 border-red-500/60 rounded-xl shadow-[0_0_50px_rgba(220,38,38,0.4)] max-w-4xl relative z-10 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-yellow-400 to-red-600"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5, delay: 0.6 }}
                />
                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-red-500/20 to-yellow-500/20 rounded-full blur-lg animate-ping"></div>
                
                <motion.p 
                  className="text-xl md:text-2xl text-white/95 leading-relaxed mb-6 font-semibold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  ⚡ Bu sayfa, vatandaşların değerli düşüncelerini ve geleceğe dair manifestoları bir araya getiriyor. 
                  <span className="text-red-400 font-bold"> Cumhuriyet değerlerini koruyan ve geliştiren</span> fikirler ve manifestolar bulacaksınız.
                </motion.p>
                <motion.p 
                  className="text-white/90 text-xl font-medium bg-gradient-to-r from-red-400 to-yellow-400 text-transparent bg-clip-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  ✨ Her düşünce bir tohum, her manifesto bir gelecek vizyonudur. Siz de katkıda bulunun! ✨
                </motion.p>
              </motion.div>
            </motion.div>
            
            {/* Tabs Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Tabs defaultValue="manifesto" className="w-full max-w-5xl mx-auto">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-red-950/80 via-black/80 to-red-950/80 backdrop-blur-lg border-2 border-red-500/50 rounded-xl p-2 shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                    <TabsTrigger 
                      value="manifesto" 
                      className="text-xl font-bold py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-red-700 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-red-500/30 transition-all duration-300 rounded-lg"
                    >
                      📜 Manifestolar
                    </TabsTrigger>
                    <TabsTrigger 
                      value="halkdefteri" 
                      className="text-xl font-bold py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-red-700 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-red-500/30 transition-all duration-300 rounded-lg"
                    >
                      📝 Halk Defteri
                    </TabsTrigger>
                  </TabsList>
                </motion.div>
              
                <TabsContent value="manifesto" className="mt-8">
                  <motion.div 
                    className="space-y-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div 
                      className="bg-gradient-to-br from-red-950/90 via-black/90 to-red-900/80 backdrop-blur-lg border-2 border-red-500/60 rounded-2xl p-8 shadow-[0_0_60px_rgba(220,38,38,0.4)] overflow-hidden relative"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-red-500 via-yellow-400 to-red-600"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                      />
                      
                      <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-red-500/30 to-yellow-500/30 rounded-full blur-xl animate-pulse"></div>
                      
                      <motion.h3 
                        className="text-3xl md:text-4xl font-black text-center mb-8 bg-gradient-to-r from-red-400 via-yellow-400 to-red-500 text-transparent bg-clip-text"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      >
                        🏛️ HALKIN SON SÖZÜ MANİFESTOSU 🏛️
                      </motion.h3>
                      
                      <motion.p 
                        className="text-white/90 text-center italic mb-8 text-xl font-medium bg-gradient-to-r from-white to-red-200 text-transparent bg-clip-text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                      >
                        ⚡ "Bu bir belge değil, bir başlangıçtır. Manifesto burada biter, ama görev şimdi başlar." ⚡
                      </motion.p>
                      
                      <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
                        {manifestoEntries.map(entry => (
                          <motion.div 
                            key={entry.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 * entry.id }}
                            whileHover={{ scale: 1.02, x: 10 }}
                            className="bg-gradient-to-r from-black/90 via-red-950/50 to-black/90 backdrop-blur-sm p-6 rounded-xl border-2 border-red-500/40 shadow-[0_0_25px_rgba(220,38,38,0.2)] relative overflow-hidden group"
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                            
                            <div className="flex items-start gap-6 relative z-10">
                              <motion.div 
                                className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                              >
                                <span className="text-white text-lg font-black">{entry.id}</span>
                              </motion.div>
                              <div className="flex-1">
                                <motion.h4 
                                  className="text-red-300 font-black text-xl mb-4 bg-gradient-to-r from-red-400 to-yellow-400 text-transparent bg-clip-text"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.2 * entry.id }}
                                >
                                  {entry.title}
                                </motion.h4>
                                <motion.p 
                                  className="text-white/95 leading-relaxed text-lg"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.3 * entry.id }}
                                >
                                  {entry.content}
                                </motion.p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      <motion.div 
                        className="mt-10 pt-8 border-t-2 border-red-500/50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                      >
                        <div className="text-center bg-gradient-to-br from-red-950/60 to-black/80 p-6 rounded-xl border border-red-500/30">
                          <p className="text-white/95 text-xl font-bold mb-2">
                            ✨ Bu manifesto yalnızca okunan bir metin değil, yaşanan bir gerçektir. ✨
                          </p>
                          <p className="text-red-300 text-lg">
                            Bu belge yalnız okunmak için yazılmadı. Uygulamak, yaymak, yaşatmak için kodlandı.
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="halkdefteri" className="mt-8">
                  <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Message Form Section */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      whileHover={{ scale: 1.02 }}
                      className="order-2 lg:order-1"
                    >
                      <motion.div 
                        className="bg-gradient-to-br from-red-950/90 via-black/90 to-red-900/80 backdrop-blur-lg border-2 border-red-500/60 rounded-2xl p-8 shadow-[0_0_50px_rgba(220,38,38,0.4)] relative overflow-hidden"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.div
                          className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-red-500 via-yellow-400 to-red-600"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                        
                        <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-red-500/30 to-yellow-500/30 rounded-full blur-lg animate-pulse"></div>
                        
                        <motion.h3 
                          className="text-3xl font-black text-center mb-8 bg-gradient-to-r from-red-400 via-yellow-400 to-red-500 text-transparent bg-clip-text"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.7 }}
                        >
                          ✍️ Düşüncelerinizi Paylaşın ✍️
                        </motion.h3>
                        
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div>
                          <Label htmlFor="name" className="text-white/90">Adınız Soyadınız</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Örn: Ahmet Yılmaz"
                            className="bg-black/40 border-red-600/30 text-white placeholder:text-white/50"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="city" className="text-white/90">Şehriniz</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Örn: İstanbul"
                            className="bg-black/40 border-red-600/30 text-white placeholder:text-white/50"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="message" className="text-white/90">Mesajınız</Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Düşüncelerinizi, önerilerinizi veya vizyonunuzu paylaşın..."
                            rows={4}
                            className="bg-black/40 border-red-600/30 text-white placeholder:text-white/50 resize-none"
                          />
                        </div>
                        
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button 
                              type="submit"
                              className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:via-red-600 hover:to-red-700 border-2 border-red-500/50 text-white font-black py-4 text-lg rounded-xl shadow-[0_0_25px_rgba(220,38,38,0.4)] hover:shadow-[0_0_35px_rgba(220,38,38,0.6)] transition-all duration-300"
                            >
                              🚀 Mesajı Gönder 🚀
                            </Button>
                          </motion.div>
                        </form>
                        
                        <motion.p 
                          className="text-white/80 text-lg mt-6 text-center font-medium bg-gradient-to-r from-red-300 to-yellow-300 text-transparent bg-clip-text"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2 }}
                        >
                          ⭐ Mesajınız incelendikten sonra Halk Defteri'nde yayınlanacaktır. ⭐
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  
                    {/* Entries Section */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      className="order-1 lg:order-2"
                    >
                      <motion.div 
                        className="bg-gradient-to-br from-red-950/90 via-black/90 to-red-900/80 backdrop-blur-lg border-2 border-red-500/60 rounded-2xl p-8 shadow-[0_0_50px_rgba(220,38,38,0.4)] relative overflow-hidden"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.div
                          className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-red-500 via-yellow-400 to-red-600"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 1.5, delay: 0.8 }}
                        />
                        
                        <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-red-500/30 to-yellow-500/30 rounded-full blur-lg animate-pulse"></div>
                        
                        <motion.h3 
                          className="text-3xl font-black text-center mb-8 bg-gradient-to-r from-red-400 via-yellow-400 to-red-500 text-transparent bg-clip-text"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 1 }}
                        >
                          📚 Halk Defteri 📚
                        </motion.h3>
                        
                        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar relative z-10">
                          {entries.filter(entry => entry.approved).map((entry) => (
                            <motion.div 
                              key={entry.id}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.6, delay: 0.2 * entry.id }}
                              whileHover={{ scale: 1.03, x: -5 }}
                              className="bg-gradient-to-r from-black/90 via-red-950/50 to-black/90 backdrop-blur-sm p-6 rounded-xl border-2 border-red-500/40 shadow-[0_0_20px_rgba(220,38,38,0.2)] relative overflow-hidden group"
                            >
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              />
                              
                              <div className="flex justify-between items-start mb-4 relative z-10">
                                <div>
                                  <motion.p 
                                    className="text-red-300 font-bold text-lg bg-gradient-to-r from-red-400 to-yellow-400 text-transparent bg-clip-text"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 * entry.id }}
                                  >
                                    {entry.name}
                                  </motion.p>
                                  <motion.p 
                                    className="text-white/70 text-base font-medium"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 * entry.id }}
                                  >
                                    📍 {entry.city}
                                  </motion.p>
                                </div>
                                <motion.p 
                                  className="text-white/60 text-sm font-medium bg-red-950/50 px-3 py-1 rounded-lg"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.5 * entry.id }}
                                >
                                  {entry.date}
                                </motion.p>
                              </div>
                              <motion.p 
                                className="text-white/95 leading-relaxed text-lg font-medium relative z-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 * entry.id }}
                              >
                                "{entry.message}"
                              </motion.p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
              </TabsContent>
              
              {/* Bottom Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-12 text-center"
              >
                <div className="bg-gradient-to-r from-red-950/30 to-black/60 backdrop-blur-sm border-2 border-red-600/30 rounded-lg p-6 shadow-[0_0_20px_rgba(220,38,38,0.15)]">
                  <p className="text-xl font-bold text-white italic">
                    "Egemenlik kayıtsız şartsız milletindir."
                  </p>
                  <p className="text-lg text-red-500 mt-2">
                    Mustafa Kemal Atatürk
                  </p>
                </div>
              </motion.div>
              
              {/* Navigation Buttons */}
              <div className="flex justify-center mt-10 gap-4">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Button 
                    variant="outline"
                    className="border-2 border-red-600/60 text-red-500 hover:bg-red-950/20 hover:text-white"
                    onClick={() => navigate("/")}
                  >
                    ◀ Ana Sayfa
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Button 
                    variant="outline"
                    className="border-2 border-red-600/60 text-red-500 hover:bg-red-950/20 hover:text-white"
                    onClick={() => navigate("/gorevler")}
                  >
                    Görevler
                  </Button>
                </motion.div>
              </div>
            </Tabs>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      {/* Bottom animation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 text-white/70 text-xl font-semibold tracking-wide animate-pulse z-10 mb-2">
        CUMHURİYET GÜNCELLENİYOR
      </div>
      
      <AudioControl onToggle={handleToggleAudio} />
      
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(220, 38, 38, 0.6);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(220, 38, 38, 0.8);
        }
        `
      }} />
    </div>
  );
}