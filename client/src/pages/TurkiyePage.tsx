import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import ModernLayout from "@/components/ModernLayout";
import { ModernTechButton } from "@/components/ModernTechButton";
import { Play, Pause } from "lucide-react";
import { initAudio, playSoundtrack } from "@/lib/audio";
import NavButtons from "@/components/NavButtons";
import TurkishValueCard from "@/components/TurkishValueCard";
import GlobalTranslator from "@/components/GlobalTranslator";

// Turkish values defined by the translation system
const turkishValueIds = ['milli', 'muasir', 'laik', 'demokratik', 'sosyal'];

export default function TurkiyePage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
  useEffect(() => {
    // Ses sistemini başlat
    initAudio('turkiye');
  }, []);
  
  // Ses çalma/durdurma işlemini yönet
  const handleToggleAudio = () => {
    playSoundtrack();
    setIsAudioPlaying(!isAudioPlaying);
  };
  
  return (
    <ModernLayout 
      audioKey="turkiye" 
      showBackButton={true}
      pageContent="Türkiye sayfasına hoş geldiniz. Bu sayfa Türkiye Cumhuriyeti'nin dijital koordinasyon alanıdır. Genel katılım istatistikleri yarın güncellenecektir. Sayfada TÜRK Nedir, Anayasalarımız, Görev Diriliş ve Halk Defteri & Manifestolar bölümlerine erişebilirsiniz. Türk, atasının mirasına sahip çıkamazsa, geleceğini başka milletlerin insafına bırakır."
      pageName="Türkiye"
    >
      <div className="w-full max-w-6xl mx-auto gpu-accelerated stable-transform no-layout-shift">
        <AnimatePresence>
          <motion.div
            className="relative overflow-hidden gpu-accelerated stable-transform"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* VIP Premium Hero Section */}
            <motion.div 
              className="relative rounded-3xl overflow-hidden mb-16 gpu-accelerated stable-transform no-layout-shift"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Premium Glass Morphism Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-orange-600/15 to-red-600/10 rounded-3xl blur-3xl"></div>
              <div className="relative backdrop-filter backdrop-blur-xl bg-gradient-to-br from-black/95 via-red-950/30 to-black/95 border-2 border-red-500/50 rounded-3xl shadow-[0_40px_120px_rgba(239,68,68,0.3)]">
                
                {/* Premium Top Accent */}
                <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-t-3xl"></div>
                
                {/* VIP Corner Decorations */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-red-500/20 to-transparent rounded-br-full"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-bl-full"></div>
                
                <div className="relative z-10 py-12 sm:py-20 px-4 sm:px-10 lg:px-16 text-center">
                  <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    {/* Mobile-optimized Flag Icon */}
                    <div className="inline-block mb-6 sm:mb-10">
                      <motion.div 
                        className="w-20 h-20 sm:w-32 sm:h-32 mx-auto text-4xl sm:text-7xl border-2 sm:border-4 border-red-500/60 rounded-xl sm:rounded-2xl flex items-center justify-center bg-gradient-to-br from-black/80 to-red-950/40 backdrop-blur-lg shadow-[0_0_40px_rgba(239,68,68,0.5)] sm:shadow-[0_0_80px_rgba(239,68,68,0.5)] gpu-accelerated stable-transform"
                        animate={{ 
                          boxShadow: [
                            "0 0 20px rgba(239, 68, 68, 0.3)", 
                            "0 0 40px rgba(239, 68, 68, 0.6)", 
                            "0 0 20px rgba(239, 68, 68, 0.3)"
                          ]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        🇹🇷
                      </motion.div>
                    </div>
                    
                    {/* Mobile-optimized Quote Section */}
                    <div className="max-w-6xl mx-auto">
                      <div className="bg-gradient-to-r from-black/80 via-black/60 to-black/80 rounded-xl sm:rounded-2xl p-6 sm:p-12 border border-red-500/40 sm:border-2 backdrop-blur-lg shadow-[inset_0_0_30px_rgba(239,68,68,0.1)] sm:shadow-[inset_0_0_50px_rgba(239,68,68,0.1)]">
                        <motion.p 
                          className="text-xl sm:text-3xl md:text-5xl font-bold leading-relaxed text-center mb-6 sm:mb-10 content-stable text-stable motion-stable"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                        >
                          <span className="text-white block mb-4 sm:mb-8 italic font-serif tracking-wide drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] text-stable">
                            "Türk, atasının mirasına sahip çıkamazsa, geleceğini başka milletlerin insafına bırakır."
                          </span>
                          <span className="text-red-400 block text-lg sm:text-2xl md:text-3xl font-semibold tracking-[0.1em] sm:tracking-[0.2em] drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                            — Mustafa Kemal Atatürk
                          </span>
                        </motion.p>
                        
                        {/* Premium Divider */}
                        <motion.div 
                          className="flex justify-center items-center space-x-6 mt-10"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.8, delay: 0.7 }}
                        >
                          <div className="w-20 h-px bg-gradient-to-r from-transparent via-red-500 to-red-500"></div>
                          <motion.div 
                            className="w-4 h-4 bg-red-500 rounded-full shadow-[0_0_25px_rgba(239,68,68,0.8)]"
                            animate={{ 
                              boxShadow: [
                                "0 0 15px rgba(239, 68, 68, 0.6)",
                                "0 0 35px rgba(239, 68, 68, 1)",
                                "0 0 15px rgba(239, 68, 68, 0.6)"
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          ></motion.div>
                          <div className="w-20 h-px bg-gradient-to-l from-transparent via-red-500 to-red-500"></div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* VIP Enhanced Title Section */}
            <motion.div 
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <div className="relative">
                {/* Premium Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent rounded-2xl blur-2xl"></div>
                
                <motion.h1 
                  className="relative text-3xl sm:text-6xl md:text-7xl font-bold mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-red-500 to-orange-500 tracking-wide sm:tracking-wider drop-shadow-[0_0_30px_rgba(239,68,68,0.5)] content-stable text-stable motion-stable"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {t("turkiye_page.title")}
                </motion.h1>
                
                <motion.div 
                  className="flex flex-col items-center mb-6 sm:mb-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <div className="text-lg sm:text-3xl md:text-4xl text-white font-bold mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center backdrop-blur-sm bg-black/20 px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-red-500/30 text-center">
                    <span className="mb-2 sm:mb-0">{t("turkiye_page.subtitle")}</span>
                    <motion.div
                      className="sm:ml-3 text-red-500 inline-flex"
                      animate={{ 
                        opacity: [1, 0.6, 1],
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <div className="text-red-500 font-bold text-2xl sm:text-4xl drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">%</div>
                    </motion.div>
                  </div>
                  
                  {/* Premium Audio Control */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                    className="flex justify-center mb-8"
                  >
                    <motion.button
                      className={`
                        rounded-full h-16 w-16 flex items-center justify-center 
                        ${isAudioPlaying 
                          ? "bg-gradient-to-br from-red-600 to-red-800 shadow-[0_0_30px_rgba(239,68,68,0.8)]" 
                          : "bg-gradient-to-br from-red-700 to-red-900 shadow-[0_0_20px_rgba(185,28,28,0.6)]"} 
                        hover:shadow-[0_0_40px_rgba(220,38,38,0.9)] transition-all duration-500
                        border-2 border-red-500/50 backdrop-blur-lg
                      `}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleToggleAudio}
                    >
                      {isAudioPlaying 
                        ? <Pause className="h-6 w-6 text-white" /> 
                        : <Play className="h-6 w-6 text-white ml-0.5" />
                      }
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Navigation Cards with VIP Design */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16 content-stable motion-stable"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {/* TÜRK Nedir Button */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="content-stable"
              >
                <ModernTechButton
                  onClick={() => navigate("/turknedir")}
                  className="w-full h-44 sm:h-40 bg-gradient-to-br from-black/90 via-red-950/50 to-black/90 border-2 border-red-500/50 rounded-2xl backdrop-blur-xl shadow-[0_20px_60px_rgba(239,68,68,0.2)] hover:shadow-[0_30px_80px_rgba(239,68,68,0.4)] transition-all duration-500"
                >
                  <div className="text-center px-2 py-4 h-full flex flex-col justify-center">
                    <div className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] leading-tight break-words">
                      TÜRK NEDİR?
                    </div>
                    <div className="text-red-400 text-xs opacity-80">
                      Detaylar için tıklayın
                    </div>
                  </div>
                </ModernTechButton>
              </motion.div>

              {/* Anayasalarımız Button */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2 }}
              >
                <ModernTechButton
                  onClick={() => navigate("/anayasalar")}
                  className="w-full h-44 sm:h-40 bg-gradient-to-br from-black/90 via-red-950/50 to-black/90 border-2 border-red-500/50 rounded-2xl backdrop-blur-xl shadow-[0_20px_60px_rgba(239,68,68,0.2)] hover:shadow-[0_30px_80px_rgba(239,68,68,0.4)] transition-all duration-500"
                >
                  <div className="text-center px-2 py-4 h-full flex flex-col justify-center">
                    <div className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] leading-tight break-words">
                      ANAYASALARIMIZ
                    </div>
                    <div className="text-red-400 text-xs opacity-80">
                      Anayasal çerçeve
                    </div>
                  </div>
                </ModernTechButton>
              </motion.div>

              {/* Görev Diriliş Button */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2 }}
              >
                <ModernTechButton
                  onClick={() => navigate("/gorevler")}
                  className="w-full h-44 sm:h-40 bg-gradient-to-br from-black/90 via-red-950/50 to-black/90 border-2 border-red-500/50 rounded-2xl backdrop-blur-xl shadow-[0_20px_60px_rgba(239,68,68,0.2)] hover:shadow-[0_30px_80px_rgba(239,68,68,0.4)] transition-all duration-500"
                >
                  <div className="text-center px-2 py-4 h-full flex flex-col justify-center">
                    <div className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] leading-tight break-words">
                      GÖREV DİRİLİŞ
                    </div>
                    <div className="text-red-400 text-xs opacity-80">
                      101 görevi keşfedin
                    </div>
                  </div>
                </ModernTechButton>
              </motion.div>

              {/* Halk Defteri Button */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2 }}
              >
                <ModernTechButton
                  onClick={() => navigate("/halk-manifestolar")}
                  className="w-full h-44 sm:h-40 bg-gradient-to-br from-black/90 via-red-950/50 to-black/90 border-2 border-red-500/50 rounded-2xl backdrop-blur-xl shadow-[0_20px_60px_rgba(239,68,68,0.2)] hover:shadow-[0_30px_80px_rgba(239,68,68,0.4)] transition-all duration-500"
                >
                  <div className="text-center px-1 py-3 h-full flex flex-col justify-center">
                    <div className="text-sm sm:text-base md:text-lg font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] leading-tight break-words">
                      HALK DEFTERİ<br/>MANİFESTOLAR
                    </div>
                    <div className="text-red-400 text-xs opacity-80">
                      Manifestolar & Defter
                    </div>
                  </div>
                </ModernTechButton>
              </motion.div>
            </motion.div>

            {/* Enhanced Values Section */}
            <motion.div 
              className="mb-16 content-stable motion-stable"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-orange-600/10 to-red-600/5 rounded-3xl blur-2xl"></div>
                <div className="relative backdrop-filter backdrop-blur-xl bg-gradient-to-br from-black/90 via-red-950/20 to-black/90 border-2 border-red-500/40 rounded-3xl p-12 shadow-[0_30px_100px_rgba(239,68,68,0.15)] content-stable">
                  
                  <motion.h2 
                    className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-500 text-stable content-stable"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    Türk Değerleri
                  </motion.h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8">
                    {turkishValueIds.map((valueId, index) => {
                      // Define custom text for each value to ensure proper display
                      const valueTexts: Record<string, string> = {
                        'milli': 'MİLLİ',
                        'muasir': 'MUASIR',
                        'laik': 'LAİK',
                        'demokratik': 'DEMOKRATİK',
                        'sosyal': 'SOSYAL'
                      };
                      
                      return (
                        <TurkishValueCard
                          key={valueId}
                          valueId={valueId}
                          title={valueTexts[valueId] || valueId.toUpperCase()}
                          index={index}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Premium Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="flex justify-center"
            >
              <NavButtons />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        
        {/* Global Translation System */}
        <GlobalTranslator />
      </div>
    </ModernLayout>
  );
}