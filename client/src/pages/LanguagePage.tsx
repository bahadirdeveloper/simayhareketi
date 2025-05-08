import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Flag, ArrowRight } from "lucide-react";
import { ModernTechButton } from "@/components/ModernTechButton";
import SimpleFuturisticTurkish from "@/components/SimpleFuturisticTurkish";
import AudioControl from "@/components/AudioControl";
import LoadingScreen from "@/components/LoadingScreen";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";

// Dil seçim listesi
const languages = [
  { code: "tr", name: "Türkçe", nativeName: "Türkçe", flag: "🇹🇷" },
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
];

export default function LanguagePage() {
  const { i18n, t } = useTranslation();
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize audio system
    initAudio();
    
    // Record visit
    const recordVisit = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: i18n.language || "tr",
            hasInteracted: false
          }
        );
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
    
    // 1.5 saniye sonra yükleme ekranını kapat
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [i18n.language]);

  const handleLanguageSelect = (langCode: string) => {
    i18n.changeLanguage(langCode);
    
    // Record selected language
    const recordLanguageSelection = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: langCode,
            hasInteracted: true
          }
        );
      } catch (error) {
        console.error("Failed to record language selection:", error);
      }
    };
    
    recordLanguageSelection();
    
    // Navigate to home page
    navigate("/home");
  };

  const handleToggleAudio = () => {
    playSoundtrack();
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      
      <div className="min-h-screen text-white relative overflow-x-hidden bg-gradient-to-b from-gray-950 via-black to-black">
        <SimpleFuturisticTurkish />
        
        {/* Subtle digital noise texture */}
        <div className="absolute inset-0 bg-noise opacity-5 z-0"></div>
        
        {/* Reduced grid pattern for better performance */}
        <div className="absolute inset-0 opacity-5 z-0">
          {[...Array(10)].map((_, i) => (
            <div 
              key={`grid-h-${i}`} 
              className="absolute w-full h-[0.5px] bg-red-500" 
              style={{ top: `${i * 10}%` }} 
            />
          ))}
          
          {[...Array(10)].map((_, i) => (
            <div 
              key={`grid-v-${i}`} 
              className="absolute h-full w-[0.5px] bg-red-500" 
              style={{ left: `${i * 10}%` }} 
            />
          ))}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent z-0"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent z-0"></div>
            
        <main className="container mx-auto px-4 z-10 relative flex flex-col items-center justify-center min-h-screen py-12">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-4xl mx-auto text-center"
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-12"
              >
                <div className="inline-block px-3 py-1 bg-red-950/20 border border-red-500/30 rounded-sm mb-4 shadow-[0_2px_8px_rgba(220,38,38,0.1)]">
                  <span className="text-xs font-medium text-red-400 tracking-widest uppercase">Türkiye Cumhuriyeti</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-red-500 mb-4">
                  CUMHURİYET GÜNCELLENİYOR
                </h1>
              </motion.div>
              
              {/* Language Selection Title */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-10"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-red-700 to-red-900 rounded-full shadow-lg mb-3">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-semibold text-white mb-2">Dil Seçiniz</h2>
                <p className="text-gray-400 max-w-lg mx-auto">
                  Cumhuriyet Güncellenme Platformuna hoş geldiniz. Lütfen tercih ettiğiniz dili seçin.
                </p>
              </motion.div>
              
              {/* Language Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10"
              >
                {languages.map((language, index) => (
                  <motion.div
                    key={language.code}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  >
                    <div 
                      className="bg-black/50 backdrop-blur-sm border border-red-900/30 rounded-xl p-4 cursor-pointer hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1"
                      onClick={() => handleLanguageSelect(language.code)}
                    >
                      <div className="text-2xl mb-2">{language.flag}</div>
                      <h3 className="font-semibold text-white">{language.nativeName}</h3>
                      <div className="text-xs text-gray-400">{language.name}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Direct Turkish Entry */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6"
              >
                <ModernTechButton
                  variant="turkish"
                  size="lg"
                  glow="strong"
                  border="glowing"
                  leftIcon={<Flag className="w-5 h-5" />}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => handleLanguageSelect("tr")}
                >
                  HEMEN TÜRKÇE İLE DEVAM ET
                </ModernTechButton>
              </motion.div>
              
              {/* Footer Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-16"
              >
                <div className="inline-flex items-center bg-black/60 backdrop-blur-sm border border-red-500/40 rounded-full px-6 py-3 shadow-[0_4px_15px_rgba(220,38,38,0.12)]">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-3 animate-pulse"></div>
                  <p className="text-sm text-gray-200 font-medium">
                    19 Mayıs 2025 - Cumhuriyetin Halk ile Güncellenme Yolculuğu
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </main>
        
        <AudioControl onToggle={handleToggleAudio} />
      </div>
    </>
  );
}
