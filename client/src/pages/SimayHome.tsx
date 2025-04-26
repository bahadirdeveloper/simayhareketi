import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import RealBurningEarthBackground from "@/components/RealBurningEarthBackground";
import TurkishGeneFlowLogo from "@/components/TurkishGeneFlowLogo";
import LanguageSelector from "@/components/LanguageSelector";
import AudioControl from "@/components/AudioControl";
import LoadingScreen from "@/components/LoadingScreen";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export default function SimayHome() {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
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
            hasInteracted: false
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
    
    // Record user interaction
    const updateInteraction = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: i18n.language || "tr",
            hasInteracted: true
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

  // Manifestation text - words that will appear one by one
  const manifestationWords = [
    "Barış", "Adalet", "Eşitlik", "Özgürlük", "Dayanışma", 
    "Kardeşlik", "Sevgi", "Umut", "Cesaret", "Bilgelik"
  ];
  
  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <div className="min-h-screen flex flex-col items-center justify-center text-matrix-green overflow-hidden">
        <RealBurningEarthBackground />
        
        <main className="container mx-auto px-4 z-10 relative flex flex-col items-center justify-center min-h-screen">
          {/* Simay Logo */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <TurkishGeneFlowLogo />
          </motion.div>
          
          {/* Project Title */}
          <motion.h1 
            className="font-share-tech text-3xl md:text-5xl lg:text-6xl text-center mb-6 text-green-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            {t('simay_title', 'SİMAY HAREKETİ')}
          </motion.h1>
          
          {/* Subtitle */}
          <motion.h2
            className="font-share-tech text-xl md:text-2xl text-center mb-6 text-amber-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
          >
            {t('simay_subtitle', 'Türkiye Dünya Liderliğine Giden Yolda')}
          </motion.h2>
          
          {/* Main Message */}
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          >
            <p className="font-share-tech text-xl md:text-2xl lg:text-3xl leading-relaxed text-white">
              {t('simay_message', 'Simay Hareketi, insanlığı ortak bir geleceğe taşıyan, kardeşliği ve adaleti temel alan bir harekettir.')}
            </p>
          </motion.div>

          {/* Manifestation Text */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            {manifestationWords.map((word, index) => (
              <motion.div
                key={word}
                className="px-4 py-2 bg-green-900/50 rounded-lg border border-green-500 text-green-300 font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2 + index * 0.2 }}
              >
                {word}
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
          >
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg text-lg"
              onClick={() => navigate("/manifesto")}
            >
              {t('simay_manifesto_button', 'Manifestomuz')}
            </Button>
            <Button 
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-lg text-lg"
              onClick={() => navigate("/join")}
            >
              {t('simay_join_button', 'Harekete Katıl')}
            </Button>
          </motion.div>
          
          {/* Language Selection Heading */}
          <motion.h3 
            className="font-roboto-mono text-lg md:text-xl mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 3.5 }}
          >
            {t('select_language')}
          </motion.h3>
          
          {/* Language Selection Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 3.8 }}
          >
            <LanguageSelector />
          </motion.div>
          
          {/* Date Information */}
          <motion.div 
            className="mt-auto py-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 4 }}
          >
            <p className="font-roboto-mono text-sm md:text-base text-green-300">
              {t('simay_launch_date', '19 Mayıs 2025 - Dünya Liderliğine Giden Yolda')}
            </p>
          </motion.div>
        </main>
        
        <AudioControl onToggle={handleToggleAudio} />
      </div>
    </>
  );
}