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
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
            >
              <h1 className="font-bold text-5xl md:text-7xl mb-6 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 text-transparent bg-clip-text">
                CUMHURİYETİN GÜNCELLEME PLATFORMU
              </h1>
            </motion.div>
            
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="relative">
                <motion.div 
                  className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full"
                  animate={{ 
                    opacity: [0.5, 0.8, 0.5],
                    scale: [0.8, 1.1, 0.8],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="relative z-10 text-2xl font-semibold bg-black/30 backdrop-blur-sm px-6 py-3 rounded-lg border border-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.3)] flex items-center justify-center">
                  <span className="mr-2 text-amber-300">
                    Cumhuriyet ile Güncelleniyoruz
                  </span>
                  <motion.span
                    className="text-green-400"
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
              </div>

              <div className="flex justify-center items-center mt-5">
                <div className="relative w-80 h-8 flex items-center justify-center">
                  <div className="absolute w-full h-1 bg-gray-700/80 rounded-full backdrop-blur-sm"></div>
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
            
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-lg px-6 py-2 bg-black/40 backdrop-blur-sm rounded-lg">
              Dijital Platformla Halk Güncelleme Süreci
            </p>
          </motion.div>
          
          {/* Ülke Seçimleri */}
          <motion.div 
            className="mb-16 w-full max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="bg-black/50 backdrop-blur-md border border-amber-500 rounded-xl p-8 text-center hover:border-amber-400 transition-all duration-300 mb-12 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-300 to-amber-500 text-transparent bg-clip-text">TÜRKİYE</h3>
              <p className="text-gray-300 mb-6 text-lg">Toplumsal Yenileme Merkezi</p>
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button 
                  className="w-full bg-gradient-to-r from-red-700 to-amber-600 hover:from-amber-600 hover:to-red-700 text-white py-6 text-xl shadow-lg"
                  onClick={() => navigate("/turkiye")}
                >
                  Türkiye Platformuna Giriş
                </Button>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/40 backdrop-blur-sm border border-blue-500/70 rounded-lg p-4 text-center transition-all duration-300 hover:bg-black/50 hover:border-blue-400">
                <h4 className="font-medium text-blue-400 mb-2">İRAN</h4>
                <Button 
                  variant="outline"
                  className="w-full border-blue-500 text-blue-400 hover:bg-blue-900/30"
                  onClick={() => navigate("/iran")}
                >
                  Giriş
                </Button>
              </div>
              
              <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/70 rounded-lg p-4 text-center transition-all duration-300 hover:bg-black/50 hover:border-yellow-400">
                <h4 className="font-medium text-yellow-400 mb-2">ALMANYA</h4>
                <Button 
                  variant="outline"
                  className="w-full border-yellow-500 text-yellow-400 hover:bg-yellow-900/30"
                  onClick={() => navigate("/germany")}
                >
                  Giriş
                </Button>
              </div>
              
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/70 rounded-lg p-4 text-center transition-all duration-300 hover:bg-black/50 hover:border-green-400">
                <h4 className="font-medium text-green-400 mb-2">FİLİSTİN</h4>
                <Button 
                  variant="outline"
                  className="w-full border-green-500 text-green-400 hover:bg-green-900/30"
                  onClick={() => navigate("/palestine")}
                >
                  Giriş
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Susturulmuş Halklar */}
          <motion.div
            className="mb-12 w-full max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="bg-black/50 backdrop-blur-md border border-purple-500/70 rounded-xl p-5 hover:border-purple-400/80 transition-all duration-300 shadow-[0_0_15px_rgba(147,51,234,0.2)]">
              <h3 className="text-xl text-purple-300 mb-3 font-medium">Uluslararası İletişim Ağı</h3>
              
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button 
                  className="w-full bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-600 hover:to-purple-800 text-white py-5 text-lg rounded-lg shadow-md"
                  onClick={() => navigate("/oppressed")}
                >
                  Uluslararası Platform Başvurusu
                </Button>
              </motion.div>
              
              <div className="mt-6 text-center pb-1">
                <LanguageSelector />
              </div>
            </div>
          </motion.div>
          
          {/* Alt Bilgi */}
          <motion.div 
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <div className="inline-block bg-black/40 backdrop-blur-sm px-6 py-3 rounded-full border border-amber-500/30">
              <p className="text-sm text-gray-300 font-medium">
                19 Mayıs 2025 - Cumhuriyetin Halk ile Güncellenme Yolculuğu
              </p>
            </div>
          </motion.div>
        </main>
        
        <AudioControl onToggle={handleToggleAudio} />
      </div>
    </>
  );
}