import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import SimpleBurningEarth from "@/components/SimpleBurningEarth";
import LanguageSelector from "@/components/LanguageSelector";
import AudioControl from "@/components/AudioControl";
import LoadingScreen from "@/components/LoadingScreen";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";

export default function SimayHomeProfessional() {
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
        <SimpleBurningEarth />
        
        <main className="container mx-auto px-4 z-10 relative flex flex-col items-center justify-center min-h-screen">
          {/* Ana Başlık */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="font-bold text-5xl md:text-7xl mb-6 text-amber-400">
              HALKLARIN UYANIŞI
            </h1>
            
            <div className="flex flex-col items-center justify-center mb-4">
              <div className="text-2xl text-amber-300 mb-2 flex items-center justify-center">
                Cumhuriyet ile Güncelleniyoruz
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
              <div className="flex justify-center items-center mt-1">
                <div className="relative w-48 h-8 flex items-center justify-center">
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
            </div>
            
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-lg">
              Dijital Medeniyet Giriş Sayfası
            </p>
          </motion.div>
          
          {/* Ülke Seçimleri */}
          <motion.div 
            className="mb-16 w-full max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="bg-black/60 backdrop-blur-sm border border-amber-500 rounded-xl p-6 text-center hover:border-amber-400 transition-colors duration-300 mb-8">
              <h3 className="text-3xl font-bold mb-4 text-amber-500">🇹🇷 TÜRKİYE</h3>
              <p className="text-gray-300 mb-6 text-lg">Halkın Komuta Merkezi</p>
              <Button 
                className="w-full bg-gradient-to-r from-red-700 to-amber-600 hover:from-amber-600 hover:to-red-700 text-white py-6 text-xl"
                onClick={() => navigate("/turkiye")}
              >
                Türkiye Sayfasına Giriş
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline"
                className="border-blue-500 text-blue-400 hover:bg-blue-900/30 p-4"
                onClick={() => navigate("/iran")}
              >
                🇮🇷 İRAN
              </Button>
              
              <Button 
                variant="outline"
                className="border-yellow-500 text-yellow-400 hover:bg-yellow-900/30 p-4"
                onClick={() => navigate("/germany")}
              >
                🇩🇪 ALMANYA
              </Button>
              
              <Button 
                variant="outline"
                className="border-green-500 text-green-400 hover:bg-green-900/30 p-4"
                onClick={() => navigate("/palestine")}
              >
                🇵🇸 FİLİSTİN
              </Button>
            </div>
          </motion.div>
          
          {/* Susturulmuş Halklar */}
          <motion.div
            className="mb-10 w-full max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <Button 
              className="w-full bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-600 hover:to-purple-800 border border-purple-400 text-white py-6 text-xl rounded-xl"
              onClick={() => navigate("/oppressed")}
            >
              🔗 SUSTURULMUŞ HALKLARIN BAŞVURU SAYFASI
            </Button>
            <div className="mt-4 text-center">
              <LanguageSelector />
            </div>
          </motion.div>
          
          {/* Alt Bilgi */}
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