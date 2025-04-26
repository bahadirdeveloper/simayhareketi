import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import BurningEarthBackground from "@/components/BurningEarthBackground";
import SimayNewLogo from "@/components/SimayNewLogo";
import AudioControl from "@/components/AudioControl";
import LoadingScreen from "@/components/LoadingScreen";
import { playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";

export default function ManifestoPage() {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Record page visit
    const recordVisit = async () => {
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
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
  }, [i18n.language]);

  const handleToggleAudio = () => {
    playSoundtrack();
  };
  
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const principles = [
    { key: "principle_1", icon: "🌍" },
    { key: "principle_2", icon: "⚖️" },
    { key: "principle_3", icon: "🌱" },
    { key: "principle_4", icon: "🔬" },
    { key: "principle_5", icon: "🎭" }
  ];

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <div className="min-h-screen flex flex-col items-center justify-center text-matrix-green overflow-hidden">
        <BurningEarthBackground />
        
        <main className="container mx-auto px-4 z-10 relative py-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <Link href="/">
              <motion.div
                className="flex items-center cursor-pointer mb-6 md:mb-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 mr-4">
                  <SimayNewLogo />
                </div>
                <h2 className="text-2xl font-share-tech text-green-400">
                  {t('simay_title')}
                </h2>
              </motion.div>
            </Link>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Button 
                asChild
                className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg"
              >
                <Link href="/join">
                  {t('simay_join_button')}
                </Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Manifesto Content */}
          <div className="bg-black/60 backdrop-blur-sm border border-green-600 rounded-xl p-6 md:p-10 max-w-4xl mx-auto">
            <motion.h1 
              className="text-3xl md:text-5xl font-share-tech text-center mb-8 text-green-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {t('manifesto.title')}
            </motion.h1>
            
            <motion.div
              className="mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <p className="text-lg md:text-xl font-roboto-mono text-white leading-relaxed text-center">
                {t('manifesto.introduction')}
              </p>
            </motion.div>
            
            <motion.h2
              className="text-2xl md:text-3xl font-share-tech mb-6 text-amber-300 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              {t('manifesto.principles')}
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.key}
                  className="bg-green-900/30 border border-green-600/50 rounded-lg p-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                >
                  <div className="flex items-center mb-3">
                    <span className="text-4xl mr-4">{principle.icon}</span>
                    <h3 className="text-xl font-share-tech text-green-300">
                      {t(`manifesto.${principle.key}`)}
                    </h3>
                  </div>
                  <p className="text-white/90 font-roboto-mono">
                    {t(`manifesto.${principle.key}_desc`, t(`manifesto.${principle.key}`))}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              className="border-t border-green-600/30 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              <p className="text-lg text-white font-roboto-mono text-center leading-relaxed italic">
                {t('manifesto.conclusion')}
              </p>
            </motion.div>
          </div>
          
          {/* Bottom Navigation */}
          <motion.div
            className="flex justify-center mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
          >
            <Button 
              asChild
              className="bg-transparent border border-green-500 hover:bg-green-900/50 text-green-400 font-bold rounded-lg mx-2"
            >
              <Link href="/">
                {t('back_to_home')}
              </Link>
            </Button>
            
            <Button 
              asChild
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg mx-2"
            >
              <Link href="/join">
                {t('simay_join_button')}
              </Link>
            </Button>
          </motion.div>
        </main>
        
        <AudioControl onToggle={handleToggleAudio} />
      </div>
    </>
  );
}