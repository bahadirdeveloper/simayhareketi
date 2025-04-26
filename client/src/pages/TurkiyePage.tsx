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
    // Initialize audio system
    initAudio();
    
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
        {/* Manifesto Highlight */}
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-black/50 backdrop-blur-sm border border-amber-500 rounded-lg p-4 max-w-2xl">
            <p className="text-xl md:text-2xl text-amber-400 font-bold">
              🇹🇷 <strong>"Türk, Atasının mirasına sahip çıkamazsa,</strong><br />
              <strong>geleceğini başka milletlerin insafına bırakır."</strong> ✊
            </p>
          </div>
        </motion.div>
        
        {/* Title Block */}
        <motion.div 
          className="mb-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            🇹🇷 TÜRKİYE
          </h1>
          <div className="flex flex-col items-center mb-3">
            <div className="text-2xl md:text-4xl text-amber-400 font-bold mb-2 flex items-center justify-center">
              📣 Cumhuriyet ile Yeniden Güncelleniyor ⚖️
              <motion.span
                className="ml-2 text-green-400"
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
            <div className="relative w-64 h-8 flex items-center justify-center">
              <div className="absolute w-full h-1 bg-gray-600 rounded-full"></div>
              <motion.div 
                className="absolute h-4 w-4 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.7)]"
                initial={{ left: 0 }}
                animate={{ left: "100%" }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut"
                }}
              />
              <div className="absolute -bottom-5 left-0 text-xs text-gray-400">0%</div>
              <div className="absolute -bottom-5 right-0 text-xs text-gray-400">100%</div>
            </div>
          </div>
          <p className="text-xl text-gray-300">
            📡 Dijital Koordinasyon Alanı
          </p>
        </motion.div>
        
        {/* Navigation Buttons */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            className="bg-black/60 backdrop-blur-sm border border-amber-500 hover:border-amber-400 text-amber-400 hover:text-amber-300 rounded-lg p-6 text-xl font-bold"
            onClick={() => navigate("/turknedir")}
          >
            🇹🇷 TÜRK Nedir?
          </Button>
          
          <Button 
            className="bg-black/60 backdrop-blur-sm border border-amber-500 hover:border-amber-400 text-amber-400 hover:text-amber-300 rounded-lg p-6 text-xl font-bold"
            onClick={() => navigate("/anayasa")}
          >
            🏛️ Anayasalarımız
          </Button>
          
          <Button 
            className="bg-black/60 backdrop-blur-sm border border-amber-500 hover:border-amber-400 text-amber-400 hover:text-amber-300 rounded-lg p-6 text-xl font-bold"
            onClick={() => navigate("/gorevler")}
          >
            🇹🇷 Cumhuriyetin 2. Yüzyılı: 100+1 Görev Diriliş
          </Button>
          
          <Button 
            className="bg-black/60 backdrop-blur-sm border border-amber-500 hover:border-amber-400 text-amber-400 hover:text-amber-300 rounded-lg p-6 text-xl font-bold"
            onClick={() => navigate("/karisikfikirler")}
          >
            🗣️ Halk Söz Duvarı
          </Button>
          
          <Button 
            className="bg-black/60 backdrop-blur-sm border border-amber-500 hover:border-amber-400 text-amber-400 hover:text-amber-300 rounded-lg p-6 text-xl font-bold"
            onClick={() => navigate("/katil")}
          >
            🤝 Katılım
          </Button>
          
          <Button 
            className="bg-black/60 backdrop-blur-sm border border-amber-500 hover:border-amber-400 text-amber-400 hover:text-amber-300 rounded-lg p-6 text-xl font-bold"
            onClick={() => navigate("/cagri")}
          >
            📢 Sesleniş & Çağrı
          </Button>
          
          <Button 
            className="bg-black/60 backdrop-blur-sm border border-amber-500 hover:border-amber-400 text-amber-400 hover:text-amber-300 rounded-lg p-6 text-xl font-bold md:col-span-2"
            onClick={() => navigate("/yonetim")}
          >
            🧭 Yönetim Paneli
          </Button>
        </motion.div>
        
        {/* Home Button */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Button 
            variant="outline"
            className="border-white text-white hover:bg-white/10"
            onClick={() => navigate("/")}
          >
            🏠 Ana Sayfa'ya Dön
          </Button>
        </motion.div>
      </main>
      
      <AudioControl onToggle={handleToggleAudio} />
    </div>
  );
}