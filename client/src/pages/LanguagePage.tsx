import { useEffect } from "react";
import { useRoute } from "wouter";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import MatrixBackground from "@/components/MatrixBackground";
import AudioControl from "@/components/AudioControl";
import { Link } from "wouter";
import { playSoundtrack } from "@/lib/audio";

export default function LanguagePage() {
  const [match, params] = useRoute("/:lang");
  const { i18n, t } = useTranslation();
  const lang = params?.lang || "tr";

  useEffect(() => {
    // Change language based on route parameter
    if (match && params?.lang) {
      const language = params.lang;
      if (i18n.language !== language) {
        i18n.changeLanguage(language);
      }
    }
  }, [match, params, i18n]);

  const handleToggleAudio = () => {
    playSoundtrack();
  };

  // Handle RTL for Arabic language
  const isRtl = lang === "ar";
  const contentClass = isRtl ? "rtl-content" : "";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-matrix-green overflow-hidden" lang={lang}>
      <MatrixBackground />
      
      <main className={`container mx-auto px-4 z-10 relative flex flex-col items-center justify-center min-h-screen ${contentClass}`}>
        {/* Project Title */}
        <motion.h1 
          className="font-share-tech text-3xl md:text-5xl lg:text-6xl text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          {t('title')}
        </motion.h1>
        
        {/* Welcome Message */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
        >
          <p className="font-share-tech text-xl md:text-2xl lg:text-3xl leading-relaxed">
            {t('welcome_message')}
          </p>
        </motion.div>
        
        {/* Content */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
        >
          <p className="font-roboto-mono text-lg mb-8">
            {t('content_description')}
          </p>
          <Button asChild className="lang-btn border border-matrix-green rounded-md font-roboto-mono bg-transparent hover:bg-matrix-green hover:text-deep-black transition-all duration-300">
            <Link href="/">
              {t('back_to_home')}
            </Link>
          </Button>
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
  );
}
