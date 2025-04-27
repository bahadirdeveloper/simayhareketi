import { useState, useEffect } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import ModernLayout from "@/components/ModernLayout";
import LoadingScreen from "@/components/LoadingScreen";

// Ana değerler için veri
const coreValues = [
  { id: 'akil', name: 'AKIL', icon: '🧠', description: 'Bilginin ışığında düşünmek' },
  { id: 'bilim', name: 'BİLİM', icon: '🔬', description: 'Gerçeği keşfetmek için metot' },
  { id: 'vicdan', name: 'VİCDAN', icon: '❤️', description: 'Adaletli olmak için rehber' },
  { id: 'fen', name: 'FEN', icon: '⚡', description: 'Doğayı anlamak ve dönüştürmek' },
  { id: 'sanat', name: 'SANAT', icon: '🎭', description: 'Ruhu besleyen yaratıcılık' }
];

// İstatistik verisi
const stats = [
  { label: 'Katılımcı', value: '8.523.912', suffix: 'Vatandaş' },
  { label: 'Görev', value: '100', suffix: 'Aktif' },
  { label: 'Bağış', value: '₺7.514.892', suffix: 'Medeniyet için' }
];

export default function SimayHomeProfessional() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [showLoading, setShowLoading] = useState(true);
  const [match, params] = useRoute("/:lang");
  
  useEffect(() => {
    // Dil parametresi varsa dili değiştir
    if (match && params?.lang) {
      const language = params.lang;
      if (i18n.language !== language) {
        i18n.changeLanguage(language);
      }
    }
  
    // 3 saniye sonra yükleme ekranını gizle
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [match, params, i18n]);
  
  if (showLoading) {
    return <LoadingScreen onComplete={() => setShowLoading(false)} />;
  }
  
  return (
    <ModernLayout audioKey="home" showLanguageSelector={true}>
      <div className="w-full max-w-7xl mx-auto">
        <AnimatePresence>
          <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Hero Section */}
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-gray-900 to-black border border-red-900/30 mb-10">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              
              <div className="relative z-10 py-20 px-6 sm:px-12 text-center">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
                    {t('simay_subtitle', 'CUMHURİYET GÜNCELLENİYOR')}
                  </h1>
                </motion.div>
                
                <motion.p 
                  className="text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {t('content_description', 'Türkiye Cumhuriyeti\'nin yeni dijital dönüşüm platformuna hoş geldiniz. Geleceğin inşasında birlikte yürüyelim.')}
                </motion.p>
                
                <motion.div 
                  className="inline-flex items-center border border-red-500/40 bg-black/40 backdrop-blur-md rounded-full px-6 py-2 mb-10"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-3 animate-pulse"></div>
                  <p className="text-sm text-gray-300">
                    {t('simay_launch_date', '19 Mayıs 2025 - Cumhuriyetin Halk ile Güncellenme Yolculuğu')}
                  </p>
                </motion.div>
                
                {/* Ana Navigasyon Butonları */}
                <motion.div 
                  className="flex flex-wrap justify-center gap-3 sm:gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <button 
                    onClick={() => navigate("/turkiye")}
                    className="px-7 py-3.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-red-700/20 flex items-center font-medium text-base"
                  >
                    <span className="mr-2">🇹🇷</span>
                    {t('turkiye_button', 'Türkiye')}
                  </button>
                  <button 
                    onClick={() => navigate("/manifesto")}
                    className="px-7 py-3.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-red-700/20 flex items-center font-medium text-base"
                  >
                    <span className="mr-2">📜</span>
                    {t('simay_manifesto_button', 'Manifestomuz')}
                  </button>
                  <button 
                    onClick={() => navigate("/katil")}
                    className="px-7 py-3.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-red-700/20 flex items-center font-medium text-base"
                  >
                    <span className="mr-2">👥</span>
                    {t('simay_join_button', 'Harekete Katıl')}
                  </button>
                  <button 
                    onClick={() => navigate("/gorevler")}
                    className="px-7 py-3.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-red-700/20 flex items-center font-medium text-base"
                  >
                    <span className="mr-2">🎯</span>
                    {t('simay_tasks_button', 'Görevler')}
                  </button>
                </motion.div>
              </div>
            </div>
            
            {/* İstatistikler Kartı */}
            <motion.div
              className="bg-black/30 backdrop-blur-lg rounded-xl mb-10 border border-red-800/20 p-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    className="text-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.0 + (index * 0.1) }}
                  >
                    <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-1">{stat.label}</h3>
                    <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.suffix}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Çekirdek Değerler */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <h2 className="text-2xl font-bold text-center mb-6 text-white">
                {t('core_values', 'ÇEKİRDEK DEĞERLERİMİZ')}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {coreValues.map((value, index) => (
                  <motion.div 
                    key={value.id}
                    className="bg-gradient-to-b from-black/60 to-red-950/20 backdrop-blur-sm rounded-xl p-4 text-center border border-red-700/20 hover:border-red-500/40 transition-all duration-300"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.4 + (index * 0.1) }}
                  >
                    <div className="text-2xl mb-2">{value.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-1">{value.name}</h3>
                    <p className="text-xs text-gray-400">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </ModernLayout>
  );
}