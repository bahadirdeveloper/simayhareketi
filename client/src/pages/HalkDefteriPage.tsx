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
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

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
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    message: ""
  });
  
  // Feedback entries state
  const [entries, setEntries] = useState<FeedbackEntry[]>([
    {
      id: 1,
      name: "Ahmet Yılmaz",
      city: "İstanbul",
      message: "Atatürk'ün izinde mücadeleye devam. Cumhuriyet değerlerimizi korumak ve geliştirmek için hep birlikte çalışmalıyız.",
      date: "15 Mart 2025",
      approved: true
    },
    {
      id: 2,
      name: "Ayşe Kaya",
      city: "Ankara",
      message: "Bu platform sayesinde fikirlerimizi özgürce paylaşabileceğimiz bir alan oluştu. Cumhuriyetin değerini bilen ve koruyan herkes için minnettarım.",
      date: "28 Mart 2025",
      approved: true
    },
    {
      id: 3,
      name: "Mehmet Demir",
      city: "İzmir",
      message: "Türkiye'nin geleceğini şekillendirmek için bilim ve aklın ışığında ilerlemeliyiz. Bu platformun vizyonu tam olarak bunu yansıtıyor.",
      date: "5 Nisan 2025",
      approved: true
    },
    {
      id: 4,
      name: "Zeynep Şahin",
      city: "Antalya",
      message: "Fen, bilim ve vicdanın ışığında ilerleyen bir Türkiye görmek istiyorum. Çocuklarımıza böyle bir ülke bırakmak en büyük sorumluluğumuz.",
      date: "12 Nisan 2025",
      approved: true
    },
    {
      id: 5,
      name: "Mustafa Özcan",
      city: "Eskişehir",
      message: "Gençlerin sesine kulak veren bir sistem olması çok önemli. Artık geleceğimizi kendi ellerimizle şekillendirme zamanı.",
      date: "19 Nisan 2025",
      approved: true
    }
  ]);
  
  useEffect(() => {
    // Initialize audio system
    initAudio('turkiye');
    
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
    playSoundtrack();
    setIsAudioPlaying(!isAudioPlaying);
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
    
    // Create a new entry
    const newEntry: FeedbackEntry = {
      id: entries.length + 1,
      name: formData.name,
      city: formData.city,
      message: formData.message,
      date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      approved: false // İncelendikten sonra onaylanır
    };
    
    // Add to entries (in a real app, this would be sent to backend)
    //setEntries(prev => [newEntry, ...prev]);
    
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
        pageContent="Halk Defteri sayfasına hoş geldiniz. Bu sayfada, vatandaşların düşünce ve önerilerini paylaştığı bir platform bulunmaktadır. İnsanların Cumhuriyet değerleri ile ilgili görüşlerini okuyabilir ve kendi mesajınızı da ekleyebilirsiniz."
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
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gradient bg-gradient-to-r from-red-600 to-white text-transparent bg-clip-text tracking-wide mb-4">
              HALK DEFTERİ
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-white/90 mb-8">
              Vatandaşların Sesi ve Düşünceleri
            </h2>
            
            {/* Intro Section */}
            <motion.div
              className="relative flex justify-center mb-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-lg blur-xl"></div>
              <div className="bg-gradient-to-r from-red-950/60 to-black/70 backdrop-blur-sm p-6 border-2 border-red-600/50 rounded-lg shadow-[0_0_30px_rgba(220,38,38,0.25)] max-w-3xl relative z-10">
                <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-4">
                  Halk Defteri, vatandaşların düşüncelerini, önerilerini ve dileklerini paylaşabilecekleri bir platformdur. Burada yazdıklarınız, geleceğin Türkiyesi'nin inşasında bir tuğla olacak ve tarihe tanıklık edecektir.
                </p>
                <p className="text-white/80 text-lg">
                  Aşağıdaki forma düşüncelerinizi yazın, Cumhuriyet'in güncellenmesine katkıda bulunun!
                </p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Main Content Grid - Form and Entries side by side on larger screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Message Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="order-2 lg:order-1"
            >
              <div className="bg-gradient-to-b from-black/70 to-red-950/30 backdrop-blur-sm border-2 border-red-600/50 rounded-lg p-6 shadow-[0_0_25px_rgba(220,38,38,0.2)]">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Mesajınızı Bırakın</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white text-lg">Adınız Soyadınız:</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-black/60 border-2 border-red-600/40 text-white py-2 px-4 placeholder:text-white/40 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-white text-lg">Şehriniz:</Label>
                    <Input 
                      id="city" 
                      name="city" 
                      value={formData.city}
                      onChange={handleInputChange}
                      className="bg-black/60 border-2 border-red-600/40 text-white py-2 px-4 placeholder:text-white/40 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      placeholder="Yaşadığınız şehir"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white text-lg">Mesajınız:</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="bg-black/60 border-2 border-red-600/40 text-white py-2 px-4 placeholder:text-white/40 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      placeholder="Düşüncelerinizi ve önerilerinizi yazın..."
                    />
                    <p className="text-white/60 text-sm italic">
                      En az 20 karakter yazınız. Mesajınız incelendikten sonra Halk Defteri'ne eklenecektir.
                    </p>
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        type="submit"
                        className="bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-800 text-white px-10 py-5 rounded-lg shadow-lg font-bold text-lg"
                      >
                        MESAJI GÖNDER
                      </Button>
                    </motion.div>
                  </div>
                </form>
              </div>
            </motion.div>
            
            {/* Entries Display Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="order-1 lg:order-2"
            >
              <div className="bg-gradient-to-b from-black/70 to-red-950/30 backdrop-blur-sm border-2 border-red-600/50 rounded-lg p-6 shadow-[0_0_25px_rgba(220,38,38,0.2)]">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Vatandaş Mesajları</h3>
                
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {entries.map(entry => (
                    <motion.div 
                      key={entry.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * entry.id }}
                      className="bg-gradient-to-r from-black/80 to-red-950/40 backdrop-blur-sm p-4 rounded-lg border border-red-600/30 hover:border-red-500/50 transition-all duration-300 shadow-md"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-lg font-bold text-white">{entry.name}</p>
                          <p className="text-sm text-red-400">{entry.city}</p>
                        </div>
                        <p className="text-xs text-white/60">{entry.date}</p>
                      </div>
                      <p className="text-white/90 leading-relaxed">
                        {entry.message}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
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
        </div>
      </main>
      
      {/* Bottom animation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 text-white/70 text-xl font-semibold tracking-wide animate-pulse z-10 mb-2">
        CUMHURİYET GÜNCELLENİYOR
      </div>
      
      <AudioControl onToggle={handleToggleAudio} />
      
      <style jsx global>{`
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
      `}</style>
    </div>
  );
}