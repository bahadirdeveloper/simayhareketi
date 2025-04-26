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
          <p className="text-2xl md:text-4xl text-amber-400 font-bold mb-2">
            📣 Cumhuriyet ile Yeniden Güncelleniyor ⚖️
          </p>
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
            onClick={() => navigate("/gorev")}
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