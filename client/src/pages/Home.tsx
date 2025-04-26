import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import MatrixBackground from "@/components/MatrixBackground";
import LanguageSelector from "@/components/LanguageSelector";
import AudioControl from "@/components/AudioControl";
import LoadingScreen from "@/components/LoadingScreen";
import { initAudio, playSoundtrack } from "@/lib/audio";

export default function Home() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Initialize audio system
    initAudio();
  }, []);

  const handleToggleAudio = () => {
    playSoundtrack();
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <div className="min-h-screen flex flex-col items-center justify-center text-matrix-green overflow-hidden">
        <MatrixBackground />
        
        <main className="container mx-auto px-4 z-10 relative flex flex-col items-center justify-center min-h-screen">
          {/* Project Title */}
          <motion.h1 
            className="font-share-tech text-3xl md:text-5xl lg:text-6xl text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            {t('title')}
          </motion.h1>
          
          {/* Main Message */}
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          >
            <p className="font-share-tech text-xl md:text-2xl lg:text-3xl leading-relaxed">
              {t('message')}
            </p>
          </motion.div>
          
          {/* Language Selection Heading */}
          <motion.h2 
            className="font-roboto-mono text-lg md:text-xl mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 2.5 }}
          >
            {t('select_language')}
          </motion.h2>
          
          {/* Language Selection Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 3.5 }}
          >
            <LanguageSelector />
          </motion.div>
          
          {/* Date Information */}
          <motion.div 
            className="mt-auto py-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 3.5 }}
          >
            <p className="font-roboto-mono text-sm md:text-base">
              {t('launch_date')}
            </p>
          </motion.div>
        </main>
        
        <AudioControl onToggle={handleToggleAudio} />
      </div>
    </>
  );
}
