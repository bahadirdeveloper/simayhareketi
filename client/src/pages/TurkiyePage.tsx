import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import ModernLayout from "@/components/ModernLayout";
import { ModernTechButton } from "@/components/ModernTechButton";
import { Play, Pause } from "lucide-react";
import { initAudio, playSoundtrack } from "@/lib/audio";
import NavButtons from "@/components/NavButtons";
// No icons needed for formal appearance

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
      <div className="w-full max-w-6xl mx-auto">
        <AnimatePresence>
          <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Premium Hero Section */}
            <motion.div 
              className="relative rounded-2xl overflow-hidden mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-red-950/40 to-black/95 backdrop-blur-xl z-0 shadow-[0_25px_80px_rgba(185,28,28,0.25)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(239,68,68,0.1),transparent)] z-0"></div>
              <div className="absolute inset-0 border-2 border-red-800/40 rounded-2xl z-0"></div>
              
              {/* Premium Corner Decorations */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-red-500/30 to-transparent rounded-br-3xl z-1"></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-red-500/30 to-transparent rounded-bl-3xl z-1"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-red-500/30 to-transparent rounded-tr-3xl z-1"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-red-500/30 to-transparent rounded-tl-3xl z-1"></div>
              
              <div className="relative z-10 py-16 px-8 sm:px-12 text-center">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="inline-block mb-8">
                    <motion.div 
                      className="w-24 h-24 mx-auto text-6xl border-3 border-red-500/60 rounded-full flex items-center justify-center bg-gradient-to-br from-black/60 to-red-950/20 backdrop-blur-lg shadow-[0_0_50px_rgba(239,68,68,0.4)]"
                      animate={{ 
                        boxShadow: [
                          "0 0 30px rgba(239, 68, 68, 0.4)", 
                          "0 0 60px rgba(239, 68, 68, 0.8)", 
                          "0 0 30px rgba(239, 68, 68, 0.4)"
                        ],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      🇹🇷
                    </motion.div>
                  </div>
                  
                  <div className="max-w-5xl mx-auto">
                    <div className="bg-gradient-to-r from-black/70 via-black/50 to-black/70 rounded-xl p-10 border border-red-500/30 backdrop-blur-sm shadow-inner">
                      <p className="text-2xl md:text-4xl font-bold leading-relaxed text-center mb-8">
                        <span className="text-white block mb-6 italic font-serif tracking-wide">
                          "Türk, atasının mirasına sahip çıkamazsa, geleceğini başka milletlerin insafına bırakır."
                        </span>
                        <span className="text-red-400 block text-xl md:text-2xl font-semibold tracking-widest">
                          — Mustafa Kemal Atatürk
                        </span>
                      </p>
                      
                      <div className="flex justify-center items-center space-x-4 mt-8">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-500 to-red-500"></div>
                        <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.6)]"></div>
                        <div className="w-16 h-px bg-gradient-to-l from-transparent via-red-500 to-red-500"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Title Block with Enhanced Animation */}
            <motion.div 
              className="mb-10 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1 
                className="text-5xl-responsive font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 tracking-wide"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {t("turkiye_page.title")}
              </motion.h1>
              
              <motion.div 
                className="flex flex-col items-center mb-6"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="text-2xl-responsive text-white font-bold mb-4 flex items-center justify-center">
                  {t("turkiye_page.subtitle")}
                  <motion.div
                    className="ml-2 text-red-500 inline-flex"
                    animate={{ 
                      opacity: [1, 0.7, 1],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <div className="text-red-500 font-bold">%</div>
                  </motion.div>
                </div>
                
                {/* Ses çalma butonu */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex justify-center mb-6"
                >
                  <motion.button
                    className={`
                      rounded-full h-12 w-12 flex items-center justify-center 
                      ${isAudioPlaying 
                        ? "bg-gradient-to-br from-red-600 to-red-800" 
                        : "bg-gradient-to-br from-red-700 to-red-900"} 
                      hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-shadow duration-300
                      border border-red-500/30
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleToggleAudio}
                  >
                    {isAudioPlaying 
                      ? <Pause className="h-5 w-5 text-white" /> 
                      : <Play className="h-5 w-5 text-white ml-0.5" />
                    }
                  </motion.button>
                  <span className="ml-2 text-gray-400 self-center text-sm">
                    {isAudioPlaying ? t("toggle_sound_stop") : t("toggle_sound_play")}
                  </span>
                </motion.div>
              </motion.div>
              
              {/* Enhanced İstatistik Kartları */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Katılım kartı */}
                <motion.div 
                  className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-lg rounded-xl border border-red-900/20 p-4 shadow-[0_4px_20px_rgba(185,28,28,0.08)] hover:shadow-[0_8px_30px_rgba(185,28,28,0.15)] transition-all duration-300 hover:border-red-800/30"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600/20 to-red-900/20 flex items-center justify-center mb-2">
                      <div className="text-red-500 font-bold text-xs">TR</div>
                    </div>
                    <h4 className="font-medium text-red-400 text-sm uppercase tracking-wider mb-1">{t("turkiye_page.general_participation")}</h4>
                    <motion.div 
                      className="text-xl-responsive font-bold text-white"
                      animate={{ opacity: [1, 0.9, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      0
                    </motion.div>
                    <div className="text-base-responsive text-gray-400 mt-1">{t("turkiye_page.citizens")}</div>
                  </div>
                </motion.div>
                
                {/* Bağış kartı */}
                <motion.div 
                  className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-lg rounded-xl border border-red-900/20 p-4 shadow-[0_4px_20px_rgba(185,28,28,0.08)] hover:shadow-[0_8px_30px_rgba(185,28,28,0.15)] transition-all duration-300 hover:border-red-800/30"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600/20 to-red-900/20 flex items-center justify-center mb-2">
                      <div className="text-red-500 font-bold text-xs">₺</div>
                    </div>
                    <h4 className="font-medium text-red-400 text-sm uppercase tracking-wider mb-1">{t("turkiye_page.total_donation")}</h4>
                    <motion.div 
                      className="text-xl-responsive font-bold text-white"
                      animate={{ opacity: [1, 0.9, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ₺0
                    </motion.div>
                    <div className="text-base-responsive text-gray-400 mt-1">{t("turkiye_page.enough_for_civilization")}</div>
                  </div>
                </motion.div>
                
                {/* Görev kartı */}
                <motion.div 
                  className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-lg rounded-xl border border-red-900/20 p-4 shadow-[0_4px_20px_rgba(185,28,28,0.08)] hover:shadow-[0_8px_30px_rgba(185,28,28,0.15)] transition-all duration-300 hover:border-red-800/30"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600/20 to-red-900/20 flex items-center justify-center mb-2">
                      <div className="text-red-500 font-bold text-xs">100</div>
                    </div>
                    <h4 className="font-medium text-red-400 text-sm uppercase tracking-wider mb-1">{t("turkiye_page.active_task")}</h4>
                    <motion.div 
                      className="text-xl-responsive font-bold text-white"
                      animate={{ opacity: [1, 0.9, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      100
                    </motion.div>
                    <div className="text-base-responsive text-gray-400 mt-1">{t("turkiye_page.task")}</div>
                  </div>
                </motion.div>
                
                {/* Güncelleme kartı */}
                <motion.div 
                  className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-lg rounded-xl border border-red-900/20 p-4 shadow-[0_4px_20px_rgba(185,28,28,0.08)] hover:shadow-[0_8px_30px_rgba(185,28,28,0.15)] transition-all duration-300 hover:border-red-800/30"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600/20 to-red-900/20 flex items-center justify-center mb-2">
                      <div className="text-red-500 font-bold text-xs">0%</div>
                    </div>
                    <h4 className="font-medium text-red-400 text-sm uppercase tracking-wider mb-1">{t("turkiye_page.update")}</h4>
                    <motion.div 
                      className="text-xl-responsive font-bold text-white"
                      animate={{ opacity: [1, 0.9, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      %0
                    </motion.div>
                    <div className="text-base-responsive text-gray-400 mt-1">{t("turkiye_page.completed")}</div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Cumhuriyet Değerleri */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-900/10 to-transparent h-px top-1/2 transform -translate-y-1/2"></div>
                  <h2 className="text-2xl-responsive font-bold text-center mb-6 text-white relative inline-block bg-black px-6 py-2 mx-auto block w-auto">
                    <div className="flex items-center gap-2 justify-center">
                      {t("turkiye_page.republic_values")}
                    </div>
                  </h2>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
                  {turkishValueIds.map((valueId, index) => (
                    <motion.div 
                      key={valueId}
                      className="bg-gradient-to-b from-black/80 to-red-950/10 backdrop-blur-sm rounded-xl p-4 text-center border border-red-700/20 hover:border-red-500/40 transition-all duration-300 shadow-[0_2px_10px_rgba(185,28,28,0.05)] hover:shadow-[0_4px_20px_rgba(185,28,28,0.1)]"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    >
                      <div className="flex justify-center mb-3">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-[0_4px_20px_rgba(185,28,28,0.15)]">
                          <div className="text-white font-bold">{t(`turkiye_page.values.${valueId}.name`).charAt(0)}</div>
                        </div>
                      </div>
                      <h3 className="text-lg-responsive font-semibold text-white mb-2">{t(`turkiye_page.values.${valueId}.name`)}</h3>
                      <p className="text-base-responsive text-gray-400">{t(`turkiye_page.values.${valueId}.description`)}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                className="text-white/90 mt-6 max-w-3xl mx-auto relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className="bg-gradient-to-r from-black/80 via-black/90 to-black/80 p-4 rounded-lg backdrop-blur-sm border border-red-900/20 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl-responsive text-white font-semibold">{t("turkiye_page.coordination_area")}</h3>
                  </div>
                  
                  <p className="text-base-responsive text-white/70">
                    {t("turkiye_page.coordination_desc")}
                  </p>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Premium Digital Civic Platform Navigation */}
            <motion.div
              className="flex flex-col gap-8 w-full max-w-5xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="text-center mb-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500/20 to-amber-600/20 rounded-full flex items-center justify-center border-2 border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.3)]">
                    ⚡
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent mb-4">
                    Dijital Sivil Platform
                  </h2>
                  <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                    Türkiye Cumhuriyeti'nin dijital çağdaki koordinasyon ve katılım merkezi
                  </p>
                  <div className="flex justify-center items-center space-x-4 mt-6">
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-red-500 to-red-500"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.6)]"></div>
                    <div className="w-12 h-px bg-gradient-to-l from-transparent via-red-500 to-red-500"></div>
                  </div>
                </motion.div>
              </div>
              {/* 1. TÜRK NEDİR? - Premium Identity Section */}
              <motion.div 
                className="group relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-black/90 via-red-950/30 to-black/90 border-2 border-red-500/40 rounded-2xl p-6 backdrop-blur-lg shadow-[0_15px_40px_rgba(239,68,68,0.15)] group-hover:shadow-[0_20px_60px_rgba(239,68,68,0.25)] transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500/30 to-red-700/30 rounded-xl flex items-center justify-center text-2xl border border-red-500/50">
                      🏛️
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-red-300 transition-colors">TÜRK NEDİR?</h3>
                      <p className="text-sm text-gray-400">Kimlik ve Miras</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    Türk kimliği ve tanımının tarihsel, kültürel incelemesi
                  </p>
                  <ModernTechButton 
                    variant="turkish"
                    size="md"
                    className="w-full bg-gradient-to-r from-red-700/80 to-red-600/80 hover:from-red-600/90 hover:to-red-500/90 border-red-400/40"
                    onClick={() => navigate("/turknedir")}
                  >
                    Keşfet →
                  </ModernTechButton>
                </div>
              </motion.div>
              
              {/* 2. ANAYASA - Premium Constitutional Framework */}
              <motion.div 
                className="group relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-black/90 via-amber-950/20 to-black/90 border-2 border-amber-500/40 rounded-2xl p-6 backdrop-blur-lg shadow-[0_15px_40px_rgba(251,191,36,0.15)] group-hover:shadow-[0_20px_60px_rgba(251,191,36,0.25)] transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500/30 to-yellow-600/30 rounded-xl flex items-center justify-center text-2xl border border-amber-500/50">
                      ⚖️
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">ANAYASA</h3>
                      <p className="text-sm text-gray-400">Anayasal Çerçeve</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    Halk anayasaları ve dijital haklar çerçevesi
                  </p>
                  <ModernTechButton 
                    variant="futuristic"
                    size="md"
                    className="w-full bg-gradient-to-r from-amber-700/80 to-yellow-600/80 hover:from-amber-600/90 hover:to-yellow-500/90 border-amber-400/40"
                    onClick={() => navigate("/anayasalar")}
                  >
                    İncele →
                  </ModernTechButton>
                </div>
              </motion.div>
              
              {/* 3. MANİFESTOLAR - Premium Vision Documents */}
              <motion.div 
                className="group relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-black/90 via-blue-950/20 to-black/90 border-2 border-blue-500/40 rounded-2xl p-6 backdrop-blur-lg shadow-[0_15px_40px_rgba(59,130,246,0.15)] group-hover:shadow-[0_20px_60px_rgba(59,130,246,0.25)] transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-cyan-600/30 rounded-xl flex items-center justify-center text-2xl border border-blue-500/50">
                      📜
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">MANİFESTOLAR</h3>
                      <p className="text-sm text-gray-400">Vizyon Belgeleri</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    Halk manifestoları ve gelecek vizyonu belgeleri
                  </p>
                  <ModernTechButton 
                    variant="futuristic"
                    size="md"
                    className="w-full bg-gradient-to-r from-blue-700/80 to-cyan-600/80 hover:from-blue-600/90 hover:to-cyan-500/90 border-blue-400/40"
                    onClick={() => navigate("/halk-manifestolar")}
                  >
                    Oku →
                  </ModernTechButton>
                </div>
              </motion.div>
              
              {/* Navigation Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 4. AMACIMIZ & SAVAŞIMIZ */}
                <motion.div 
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-black/90 via-purple-950/20 to-black/90 border-2 border-purple-500/40 rounded-2xl p-6 backdrop-blur-lg shadow-[0_15px_40px_rgba(147,51,234,0.15)] group-hover:shadow-[0_20px_60px_rgba(147,51,234,0.25)] transition-all duration-300">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-indigo-600/30 rounded-xl flex items-center justify-center text-2xl border border-purple-500/50">
                        🎯
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">AMACIMIZ & SAVAŞIMIZ</h3>
                        <p className="text-xs text-gray-400">Misyon ve Mücadele</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      Hareketin temel amaçları ve sistemsel mücadele alanları
                    </p>
                    <ModernTechButton 
                      variant="futuristic"
                      size="sm"
                      className="w-full bg-gradient-to-r from-purple-700/80 to-indigo-600/80 hover:from-purple-600/90 hover:to-indigo-500/90 border-purple-400/40"
                      onClick={() => navigate("/amac-savas")}
                    >
                      Öğren →
                    </ModernTechButton>
                  </div>
                </motion.div>
                
                {/* 5. GÖREVLER */}
                <motion.div 
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-black/90 via-green-950/20 to-black/90 border-2 border-green-500/40 rounded-2xl p-6 backdrop-blur-lg shadow-[0_15px_40px_rgba(34,197,94,0.15)] group-hover:shadow-[0_20px_60px_rgba(34,197,94,0.25)] transition-all duration-300">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500/30 to-emerald-600/30 rounded-xl flex items-center justify-center text-2xl border border-green-500/50">
                        ⚡
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-green-300 transition-colors">GÖREVLER</h3>
                        <p className="text-xs text-gray-400">Görevler ve Sorumluluklar</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      Cumhuriyet için yapılacak görevler listesi
                    </p>
                    <ModernTechButton 
                      variant="futuristic"
                      size="sm"
                      className="w-full bg-gradient-to-r from-green-700/80 to-emerald-600/80 hover:from-green-600/90 hover:to-emerald-500/90 border-green-400/40"
                      onClick={() => navigate("/gorevler")}
                    >
                      Görüntüle →
                    </ModernTechButton>
                  </div>
                </motion.div>
                
                {/* 6. ÇAĞRI */}
                <motion.div 
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-amber-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-black/90 via-orange-950/20 to-black/90 border-2 border-orange-500/40 rounded-2xl p-6 backdrop-blur-lg shadow-[0_15px_40px_rgba(249,115,22,0.15)] group-hover:shadow-[0_20px_60px_rgba(249,115,22,0.25)] transition-all duration-300">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500/30 to-amber-600/30 rounded-xl flex items-center justify-center text-2xl border border-orange-500/50">
                        📢
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">ÇAĞRI</h3>
                        <p className="text-xs text-gray-400">Halk Çağrısı</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      Meslek gruplarına özel çağrı ve davet metni
                    </p>
                    <ModernTechButton 
                      variant="primary"
                      size="sm"
                      className="w-full bg-gradient-to-r from-orange-700/80 to-amber-600/80 hover:from-orange-600/90 hover:to-amber-500/90 border-orange-400/40"
                      onClick={() => navigate("/cagri")}
                    >
                      Dinle →
                    </ModernTechButton>
                  </div>
                </motion.div>
                
                {/* 7. HAREKETE KATIL */}
                <motion.div 
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-red-800/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-black/90 via-red-950/30 to-black/90 border-2 border-red-500/50 rounded-2xl p-6 backdrop-blur-lg shadow-[0_15px_40px_rgba(239,68,68,0.20)] group-hover:shadow-[0_25px_70px_rgba(239,68,68,0.35)] transition-all duration-300">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500/40 to-red-700/40 rounded-xl flex items-center justify-center text-2xl border border-red-500/60">
                        🤝
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-red-300 transition-colors">HAREKETE KATIL</h3>
                        <p className="text-xs text-gray-400">Katılım Sistemi</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      Cumhuriyet güçlenmesi katılım sistemi
                    </p>
                    <ModernTechButton 
                      variant="turkish"
                      size="sm"
                      className="w-full bg-gradient-to-r from-red-700/90 to-red-600/90 hover:from-red-600/100 hover:to-red-500/100 border-red-400/50 font-bold"
                      onClick={() => navigate("/katil")}
                    >
                      Katıl →
                    </ModernTechButton>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </ModernLayout>
  );
}
