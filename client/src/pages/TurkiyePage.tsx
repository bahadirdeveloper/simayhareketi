import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import SimpleBurningEarth from "@/components/SimpleBurningEarth";
import AudioControl from "@/components/AudioControl";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";

export default function TurkiyePage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Initialize audio system with Turkiye page soundtrack
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
            page: "turkiye"
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
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <SimpleBurningEarth />
      
      <main className="container mx-auto px-4 z-10 relative flex flex-col items-center justify-center min-h-screen">
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
        
        {/* Manifesto Highlight */}
        <motion.div 
          className="mb-8 text-center mt-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="bg-gradient-to-b from-black/60 to-red-950/30 backdrop-blur-sm border border-red-600/50 rounded-lg p-5 max-w-2xl shadow-[0_0_15px_rgba(220,38,38,0.15)]">
            <p className="text-xl md:text-2xl text-white font-bold">
              🇹🇷 <strong className="text-gradient bg-gradient-to-r from-red-500 to-white text-transparent bg-clip-text">"Türk, Atasının mirasına sahip çıkamazsa,</strong><br />
              <strong className="text-gradient bg-gradient-to-r from-red-500 to-white text-transparent bg-clip-text">geleceğini başka milletlerin insafına bırakır."</strong> ✊
            </p>
          </div>
        </motion.div>
        
        {/* Title Block */}
        <motion.div 
          className="mb-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            TÜRKİYE
          </h1>
          <div className="flex flex-col items-center mb-3">
            <div className="text-2xl md:text-4xl text-red-500 font-bold mb-2 flex items-center justify-center">
              Cumhuriyet ile Yeniden Güncelleniyor
              <motion.span
                className="ml-2 text-white"
                animate={{ 
                  opacity: [1, 0.5, 1],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                ✓
              </motion.span>
            </div>
            <div className="flex justify-center items-center mt-3 relative">
              {/* SOL TARAF - GENEL KATILIM */}
              <div className="absolute left-0 -translate-x-[105%] bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg border border-red-500/30 shadow-[0_0_10px_rgba(220,38,38,0.1)]">
                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-white rounded-full animate-pulse mr-1.5"></div>
                    <h4 className="font-medium text-white text-[10px]">T.C. KATILIM</h4>
                  </div>
                  <motion.div 
                    className="text-lg font-bold text-white mt-1"
                    animate={{ 
                      opacity: [1, 0.9, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    8.523.912
                  </motion.div>
                  <div className="text-[9px] text-gray-400">Vatandaş</div>
                </div>
              </div>
              
              {/* SAĞ TARAF - TOPLAM BAĞIŞ */}
              <div className="absolute right-0 translate-x-[105%] bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg border border-red-500/30 shadow-[0_0_10px_rgba(220,38,38,0.1)]">
                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-white rounded-full animate-pulse mr-1.5"></div>
                    <h4 className="font-medium text-white text-[10px]">T.C. TOPLAM BAĞIŞ</h4>
                  </div>
                  <motion.div 
                    className="text-lg font-bold text-red-500 mt-1"
                    animate={{ 
                      opacity: [1, 0.9, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    ₺7.514.892
                  </motion.div>
                  <div className="text-[9px] text-gray-400">Medeniyet için yetecek kadar.</div>
                </div>
              </div>
            
              <div className="w-64 h-8 flex items-center justify-center">
                <div className="relative w-full h-1.5 bg-gradient-to-r from-gray-700/60 via-gray-700/80 to-gray-700/60 rounded-full backdrop-blur-sm"></div>
                <motion.div 
                  className="absolute h-4 w-4 flex items-center justify-center"
                  initial={{ left: 0 }}
                  animate={{ left: "100%" }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut"
                  }}
                >
                  <div className="relative">
                    <div className="absolute -inset-1 bg-white/30 blur-md rounded-full"></div>
                    <div className="h-4 w-4 bg-white rounded-full relative shadow-[0_0_10px_rgba(255,255,255,0.7)]"></div>
                  </div>
                </motion.div>
                <div className="absolute -bottom-5 left-0 text-xs text-red-500/80 font-medium">0%</div>
                <div className="absolute -bottom-5 right-0 text-xs text-red-500/80 font-medium">100%</div>
              </div>
            </div>
          </div>
          <p className="text-xl text-white/80 mt-6">
            Dijital Koordinasyon Alanı
          </p>
        </motion.div>
        
        {/* Navigation Buttons */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
            <Button 
              className="w-full bg-gradient-to-b from-black/60 to-red-950/30 backdrop-blur-sm border border-red-500/50 hover:border-red-400 text-white hover:text-white rounded-lg p-6 text-xl font-bold shadow-[0_0_15px_rgba(220,38,38,0.1)] hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]"
              onClick={() => navigate("/turknedir")}
            >
              <span className="text-gradient bg-gradient-to-r from-red-500 to-white text-transparent bg-clip-text">TÜRK Nedir?</span>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
            <Button 
              className="w-full bg-gradient-to-b from-black/60 to-red-950/30 backdrop-blur-sm border border-red-500/50 hover:border-red-400 text-white hover:text-white rounded-lg p-6 text-xl font-bold shadow-[0_0_15px_rgba(220,38,38,0.1)] hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]"
              onClick={() => navigate("/anayasa")}
            >
              <span className="text-gradient bg-gradient-to-r from-red-500 to-white text-transparent bg-clip-text">Anayasalarımız</span>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
            <Button 
              className="w-full bg-gradient-to-b from-black/60 to-red-950/30 backdrop-blur-sm border border-red-500/50 hover:border-red-400 text-white hover:text-white rounded-lg p-6 text-xl font-bold shadow-[0_0_15px_rgba(220,38,38,0.1)] hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]"
              onClick={() => navigate("/gorevler")}
            >
              <span className="text-gradient bg-gradient-to-r from-red-500 to-white text-transparent bg-clip-text">Cumhuriyetin 2. Yüzyılı: Görev Diriliş</span>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
            <Button 
              className="w-full bg-gradient-to-b from-black/60 to-red-950/30 backdrop-blur-sm border border-red-500/50 hover:border-red-400 text-white hover:text-white rounded-lg p-6 text-xl font-bold shadow-[0_0_15px_rgba(220,38,38,0.1)] hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]"
              onClick={() => navigate("/karisikfikirler")}
            >
              <span className="text-gradient bg-gradient-to-r from-red-500 to-white text-transparent bg-clip-text">Halk Söz Duvarı</span>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
            <Button 
              className="w-full bg-gradient-to-b from-black/60 to-red-950/30 backdrop-blur-sm border border-red-500/50 hover:border-red-400 text-white hover:text-white rounded-lg p-6 text-xl font-bold shadow-[0_0_15px_rgba(220,38,38,0.1)] hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]"
              onClick={() => navigate("/katil")}
            >
              <span className="text-gradient bg-gradient-to-r from-red-500 to-white text-transparent bg-clip-text">Katılım</span>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
            <Button 
              className="w-full bg-gradient-to-b from-black/60 to-red-950/30 backdrop-blur-sm border border-red-500/50 hover:border-red-400 text-white hover:text-white rounded-lg p-6 text-xl font-bold shadow-[0_0_15px_rgba(220,38,38,0.1)] hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]"
              onClick={() => navigate("/cagri")}
            >
              <span className="text-gradient bg-gradient-to-r from-red-500 to-white text-transparent bg-clip-text">Sesleniş & Çağrı</span>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }} className="md:col-span-2">
            <Button 
              className="w-full bg-gradient-to-b from-black/60 to-red-950/40 backdrop-blur-sm border border-red-600/70 hover:border-red-500 text-white hover:text-white rounded-lg p-6 text-xl font-bold shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]"
              onClick={() => navigate("/yonetim")}
            >
              <span className="text-gradient bg-gradient-to-r from-white to-red-500 text-transparent bg-clip-text">Yönetim Paneli</span>
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Home Button */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <Button 
            variant="outline"
            className="border-red-500/50 text-red-500 hover:bg-red-950/20 hover:text-white"
            onClick={() => navigate("/")}
          >
            Ana Sayfa'ya Dön
          </Button>
        </motion.div>
      </main>
      
      <AudioControl onToggle={handleToggleAudio} />
    </div>
  );
}