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

// Ana değerler için veri - türkiye sayfası için özelleştirilmiş (ikonsuz)
const turkishValues = [
  { id: 'milli', name: 'MİLLİ', description: 'Özgür ve bağımsız' },
  { id: 'muasir', name: 'MUASIR', description: 'Çağdaş uygarlık' },
  { id: 'laik', name: 'LAİK', description: 'Vicdan özgürlüğü' },
  { id: 'demokratik', name: 'DEMOKRATİK', description: 'Halk egemenliği' },
  { id: 'sosyal', name: 'SOSYAL', description: 'Toplumsal dayanışma' }
];

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
      pageContent="Türkiye sayfasına hoş geldiniz. Bu sayfa Türkiye Cumhuriyeti'nin dijital koordinasyon alanıdır. Genel katılım sekiz milyon beş yüz yirmi üç bin dokuz yüz on iki vatandaştır. Toplam bağış miktarı yedi milyon beş yüz on dört bin sekiz yüz doksan iki Türk Lirasıdır. Sayfada TÜRK Nedir, Anayasalarımız, Görev Diriliş ve Halk Defteri & Manifestolar bölümlerine erişebilirsiniz. Türk, atasının mirasına sahip çıkamazsa, geleceğini başka milletlerin insafına bırakır."
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
            {/* Hero Section with Manifesto */}
            <motion.div 
              className="relative rounded-xl overflow-hidden mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-red-950/30 backdrop-blur-sm z-0 shadow-[0_8px_30px_rgba(185,28,28,0.12)]"></div>
              <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
              <div className="absolute inset-0 border border-red-900/20 z-0"></div>
              
              <div className="relative z-10 py-10 px-6 sm:px-10 text-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="inline-block mb-2">
                    <div className="w-10 h-10 mx-auto text-red-500 font-bold text-sm border border-red-500/50 rounded-full flex items-center justify-center">TC</div>
                  </div>
                  <p className="text-2xl-responsive font-bold leading-relaxed">
                    <span className="text-red-500 block mb-3">{t("turkiye_page.quote").split('"')[1]}</span>
                    <span className="text-white block">{t("turkiye_page.quote").split('"')[2]}</span>
                  </p>
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
                      8.523.912
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
                      ₺7.514.892
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
                    <h4 className="font-medium text-red-400 text-sm uppercase tracking-wider mb-1">AKTİF GÖREV</h4>
                    <motion.div 
                      className="text-xl-responsive font-bold text-white"
                      animate={{ opacity: [1, 0.9, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      100
                    </motion.div>
                    <div className="text-base-responsive text-gray-400 mt-1">Görev</div>
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
                      <div className="text-red-500 font-bold text-xs">73%</div>
                    </div>
                    <h4 className="font-medium text-red-400 text-sm uppercase tracking-wider mb-1">GÜNCELLEME</h4>
                    <motion.div 
                      className="text-xl-responsive font-bold text-white"
                      animate={{ opacity: [1, 0.9, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      %73
                    </motion.div>
                    <div className="text-base-responsive text-gray-400 mt-1">Tamamlandı</div>
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
                      CUMHURİYET DEĞERLERİ
                    </div>
                  </h2>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
                  {turkishValues.map((value, index) => (
                    <motion.div 
                      key={value.id}
                      className="bg-gradient-to-b from-black/80 to-red-950/10 backdrop-blur-sm rounded-xl p-4 text-center border border-red-700/20 hover:border-red-500/40 transition-all duration-300 shadow-[0_2px_10px_rgba(185,28,28,0.05)] hover:shadow-[0_4px_20px_rgba(185,28,28,0.1)]"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    >
                      <div className="flex justify-center mb-3">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-[0_4px_20px_rgba(185,28,28,0.15)]">
                          <div className="text-white font-bold">{value.name.charAt(0)}</div>
                        </div>
                      </div>
                      <h3 className="text-lg-responsive font-semibold text-white mb-2">{value.name}</h3>
                      <p className="text-base-responsive text-gray-400">{value.description}</p>
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
                    <h3 className="text-xl-responsive text-white font-semibold">Türkiye Cumhuriyeti Dijital Koordinasyon Alanı</h3>
                  </div>
                  
                  <p className="text-base-responsive text-white/70">
                    Cumhuriyetin güncellenme sürecinde tüm vatandaşların koordineli bir şekilde görevlere katılmasını ve Türkiye'nin geleceğine katkıda bulunmasını amaçlayan dijital platform.
                  </p>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Ana Navigasyon Butonları - TÜRKİYE - MANİFESTO - ÇAĞRI - KATIL & GÖREV */}
            {/* Dikey buton listesi - İstenen sıralama */}
            <motion.div
              className="flex flex-col gap-4 w-full max-w-4xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* 1. TÜRK NEDİR? */}
              <div className="flex flex-col">
                <ModernTechButton 
                  variant="turkish"
                  size="lg"
                  glow="none"
                  border="subtle"
                  className="w-full justify-center py-5 text-lg font-bold"
                  onClick={() => navigate("/turknedir")}
                >
                  {t("turkiye_page.turk_nedir")}
                </ModernTechButton>
                <p className="text-xs text-gray-400 text-center px-2 mt-2">{t("turkiye_page.turk_desc")}</p>
              </div>
              
              {/* 2. ANAYASA VE MANİFESTOLAR */}
              <div className="flex flex-col">
                <ModernTechButton 
                  variant="futuristic"
                  size="lg"
                  glow="none"
                  border="subtle"
                  className="w-full justify-center py-4"
                  onClick={() => navigate("/birlesikmanifesto")}
                >
                  {t("turkiye_page.anayasa_manifestolar")}
                </ModernTechButton>
                <p className="text-xs text-gray-400 text-center px-2 mt-2">{t("turkiye_page.anayasa_desc")}</p>
              </div>
              
              {/* 3. GÖREVLER */}
              <div className="flex flex-col">
                <ModernTechButton 
                  variant="futuristic"
                  size="lg"
                  glow="none"
                  border="subtle"
                  className="w-full justify-center py-4"
                  onClick={() => navigate("/gorevler")}
                >
                  {t("turkiye_page.gorevler")}
                </ModernTechButton>
                <p className="text-xs text-gray-400 text-center px-2 mt-2">{t("turkiye_page.gorevler_desc")}</p>
              </div>
              
              {/* 4. ÇAĞRI */}
              <div className="flex flex-col">
                <ModernTechButton 
                  variant="primary"
                  size="lg"
                  glow="none"
                  border="subtle"
                  className="w-full justify-center py-4"
                  onClick={() => navigate("/cagri")}
                >
                  {t("turkiye_page.cagri")}
                </ModernTechButton>
                <p className="text-xs text-gray-400 text-center px-2 mt-2">{t("turkiye_page.cagri_desc")}</p>
              </div>
              
              {/* 5. HAREKETE KATIL */}
              <div className="flex flex-col">
                <ModernTechButton 
                  variant="turkish"
                  size="lg"
                  glow="none"
                  border="subtle"
                  className="w-full justify-center py-4"
                  onClick={() => navigate("/katil")}
                >
                  {t("turkiye_page.harekete_katil")}
                </ModernTechButton>
                <p className="text-xs text-gray-400 text-center px-2 mt-2">{t("turkiye_page.katil_desc")}</p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </ModernLayout>
  );
}
