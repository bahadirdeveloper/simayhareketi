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