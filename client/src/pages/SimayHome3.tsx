import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import BurningEarthImage from "@/components/BurningEarthImage";
import LanguageSelector from "@/components/LanguageSelector";
import AudioControl from "@/components/AudioControl";
import LoadingScreen from "@/components/LoadingScreen";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";

export default function SimayHome3() {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [, navigate] = useLocation();
  
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
            page: "home"
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
    
    // Record interaction
    const updateInteraction = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: i18n.language || "tr",
            hasInteracted: true,
            page: "home"
          }
        );
      } catch (error) {
        console.error("Failed to record interaction:", error);
      }
    };
    
    updateInteraction();
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  
  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <BurningEarthImage />
        
        <main className="container mx-auto px-4 z-10 relative flex flex-col items-center justify-center min-h-screen">
          {/* Başlık */}
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="font-bold text-4xl md:text-6xl mb-4 text-red-500">
              SİMAY HAREKETİ
            </h1>
            
            <div className="flex items-center justify-center text-2xl text-amber-300 mb-4">
              <span>Cumhuriyet ile Güncelleniyoruz</span>
              <motion.span 
                className="ml-2 inline-block" 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                  <path d="M16 21h5v-5" />
                </svg>
              </motion.span>
            </div>
            
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Cumhuriyetin temel değerlerini koruyarak halkın katılımıyla geleceğe taşıyan, 
              kardeşliği ve adaleti temel alan bir güncellenme platformu
            </p>
          </motion.div>
          
          {/* Navigasyon */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="bg-black/60 backdrop-blur-sm border border-red-500 rounded-lg p-5 text-center hover:border-red-400 transition-colors duration-300">
              <h3 className="text-xl font-bold mb-3 text-red-500">Anayasa</h3>
              <p className="text-gray-300 mb-4 text-sm">Halkın yeni toplum sözleşmesi</p>
              <Button 
                className="w-full bg-red-700 hover:bg-red-600 text-white"
                onClick={() => navigate("/anayasa")}
              >
                Görüntüle
              </Button>
            </div>
            
            <div className="bg-black/60 backdrop-blur-sm border border-blue-500 rounded-lg p-5 text-center hover:border-blue-400 transition-colors duration-300">
              <h3 className="text-xl font-bold mb-3 text-blue-500">Manifesto</h3>
              <p className="text-gray-300 mb-4 text-sm">Cumhuriyetin güncellenme manifestosu</p>
              <Button 
                className="w-full bg-blue-700 hover:bg-blue-600 text-white"
                onClick={() => navigate("/manifesto")}
              >
                Oku
              </Button>
            </div>
            
            <div className="bg-black/60 backdrop-blur-sm border border-yellow-500 rounded-lg p-5 text-center hover:border-yellow-400 transition-colors duration-300">
              <h3 className="text-xl font-bold mb-3 text-yellow-500">Amaçlar</h3>
              <p className="text-gray-300 mb-4 text-sm">Amaçlarımız ve savaşlarımız</p>
              <Button 
                className="w-full bg-yellow-700 hover:bg-yellow-600 text-white"
                onClick={() => navigate("/amaclar")}
              >
                İncele
              </Button>
            </div>
            
            <div className="bg-black/60 backdrop-blur-sm border border-green-500 rounded-lg p-5 text-center hover:border-green-400 transition-colors duration-300">
              <h3 className="text-xl font-bold mb-3 text-green-500">Görevler</h3>
              <p className="text-gray-300 mb-4 text-sm">Görevlerle büyüyen halk birliği</p>
              <Button 
                className="w-full bg-green-700 hover:bg-green-600 text-white"
                onClick={() => navigate("/gorevler")}
              >
                Keşfet
              </Button>
            </div>
            
            <div className="bg-black/60 backdrop-blur-sm border border-purple-500 rounded-lg p-5 text-center hover:border-purple-400 transition-colors duration-300 md:col-span-2">
              <h3 className="text-xl font-bold mb-3 text-purple-500">Katılım</h3>
              <p className="text-gray-300 mb-4 text-sm">Daha aydınlık bir gelecek için bizimle çalışın</p>
              <Button 
                className="w-full bg-purple-700 hover:bg-purple-600 text-white"
                onClick={() => navigate("/katil")}
              >
                Harekete Katıl
              </Button>
            </div>
          </motion.div>
          
          {/* Dil Seçimi */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <LanguageSelector />
          </motion.div>
          
          {/* Tarih Bilgisi */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <p className="text-sm text-gray-400">
              19 Mayıs 2025 - Cumhuriyetin Halk ile Güncellenme Yolculuğu
            </p>
          </motion.div>
        </main>
        
        <AudioControl onToggle={handleToggleAudio} />
      </div>
    </>
  );
}