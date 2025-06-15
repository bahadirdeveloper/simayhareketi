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
            
            {/* Digital Civic Platform Navigation */}
            <motion.div
              className="flex flex-col gap-6 w-full max-w-4xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-white mb-2">Dijital Sivil Platform</h2>
                <p className="text-gray-300 text-sm">Türkiye Cumhuriyeti'nin dijital koordinasyon merkezi</p>
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mt-3"></div>
              </div>
              {/* 1. TÜRK NEDİR? - Identity & Heritage */}
              <motion.div 
                className="flex flex-col"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ModernTechButton 
                  variant="turkish"
                  size="lg"
                  glow="none"
                  border="subtle"
                  className="w-full justify-center py-5 text-lg font-bold bg-gradient-to-r from-red-800/80 to-red-700/80 hover:from-red-700/90 hover:to-red-600/90 border-red-500/30"
                  onClick={() => navigate("/turknedir")}
                >
                  🏛️ TÜRK NEDİR?
                </ModernTechButton>
                <p className="text-xs text-gray-300 text-center px-2 mt-2">Türk kimliği ve tanımının tarihsel incelemesi</p>
              </motion.div>
              
              {/* 2. ANAYASA - Constitutional Framework */}
              <motion.div 
                className="flex flex-col"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ModernTechButton 
                  variant="futuristic"
                  size="lg"
                  glow="none"
                  border="subtle"
                  className="w-full justify-center py-4 bg-gradient-to-r from-gold/20 to-amber-600/20 hover:from-gold/30 hover:to-amber-600/30 border-gold/30"
                  onClick={() => navigate("/anayasalar")}
                >
                  ⚖️ ANAYASA
                </ModernTechButton>
                <p className="text-xs text-gray-300 text-center px-2 mt-2">Halk anayasaları ve dijital haklar çerçevesi</p>
              </motion.div>
              
              {/* 3. MANİFESTOLAR - Vision Documents */}
              <motion.div 
                className="flex flex-col"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ModernTechButton 
                  variant="futuristic"
                  size="lg"
                  glow="none"
                  border="subtle"
                  className="w-full justify-center py-4 bg-gradient-to-r from-blue-800/20 to-cyan-700/20 hover:from-blue-700/30 hover:to-cyan-600/30 border-blue-400/30"
                  onClick={() => navigate("/halk-manifestolar")}
                >
                  📜 MANİFESTOLAR
                </ModernTechButton>
                <p className="text-xs text-gray-300 text-center px-2 mt-2">Halk manifestoları ve gelecek vizyonu belgeleri</p>
              </motion.div>
              
              {/* 4. AMACIMIZ & SAVAŞIMIZ - Mission & Struggle */}
              <motion.div 
                className="flex flex-col"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ModernTechButton 
                  variant="futuristic"
                  size="lg"
                  glow="none"
                  border="subtle"
                  className="w-full justify-center py-4 bg-gradient-to-r from-purple-800/20 to-indigo-700/20 hover:from-purple-700/30 hover:to-indigo-600/30 border-purple-400/30"
                  onClick={() => navigate("/amac-savas")}
                >
                  🎯 AMACIMIZ & SAVAŞIMIZ
                </ModernTechButton>
                <p className="text-xs text-gray-300 text-center px-2 mt-2">Hareketin temel amaçları ve sistemsel mücadele alanları</p>
              </motion.div>
              
              {/* 5. GÖREVLER - Tasks & Duties */}
              <motion.div 
                className="flex flex-col"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ModernTechButton 
                  variant="futuristic"
                  size="lg"
                  glow="none"
                  border="subtle"
                  className="w-full justify-center py-4 bg-gradient-to-r from-green-800/20 to-emerald-700/20 hover:from-green-700/30 hover:to-emerald-600/30 border-green-400/30"
                  onClick={() => navigate("/gorevler")}
                >
                  ⚡ GÖREVLER
                </ModernTechButton>
                <p className="text-xs text-gray-300 text-center px-2 mt-2">Cumhuriyet için yapılacak görevler listesi</p>
              </motion.div>
              
              {/* 6. ÇAĞRI - Call to Action */}
              <motion.div 
                className="flex flex-col"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ModernTechButton 
                  variant="primary"
                  size="lg"
                  glow="none"
                  border="subtle"
                  className="w-full justify-center py-4 bg-gradient-to-r from-orange-800/20 to-amber-700/20 hover:from-orange-700/30 hover:to-amber-600/30 border-orange-400/30"
                  onClick={() => navigate("/cagri")}
                >
                  📢 ÇAĞRI
                </ModernTechButton>
                <p className="text-xs text-gray-300 text-center px-2 mt-2">Meslek gruplarına özel çağrı ve davet metni</p>
              </motion.div>
              
              {/* 7. HAREKETE KATIL - Join Movement */}
              <motion.div 
                className="flex flex-col"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ModernTechButton 
                  variant="turkish"
                  size="lg"
                  glow="none"
                  border="subtle"
                  className="w-full justify-center py-4 bg-gradient-to-r from-red-700/40 to-red-600/40 hover:from-red-600/50 hover:to-red-500/50 border-red-400/40 shadow-lg"
                  onClick={() => navigate("/katil")}
                >
                  🤝 HAREKETE KATIL
                </ModernTechButton>
                <p className="text-xs text-gray-300 text-center px-2 mt-2">Cumhuriyet güçlenmesi katılım sistemi</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </ModernLayout>
  );
}
