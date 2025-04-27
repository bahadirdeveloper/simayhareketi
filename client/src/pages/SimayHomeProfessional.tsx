import { useState, useEffect } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import ModernLayout from "@/components/ModernLayout";
import LoadingScreen from "@/components/LoadingScreen";
import { 
  Flag, 
  Scroll, 
  Users, 
  Target 
} from "lucide-react";

// Ana değerler için veri
const coreValues = [
  { id: 'akil', name: 'AKIL', symbol: 'A', description: 'Bilginin ışığında düşünmek' },
  { id: 'bilim', name: 'BİLİM', symbol: 'B', description: 'Gerçeği keşfetmek için metot' },
  { id: 'vicdan', name: 'VİCDAN', symbol: 'V', description: 'Adaletli olmak için rehber' },
  { id: 'fen', name: 'FEN', symbol: 'F', description: 'Doğayı anlamak ve dönüştürmek' },
  { id: 'sanat', name: 'SANAT', symbol: 'S', description: 'Ruhu besleyen yaratıcılık' }
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
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-gray-950 to-black border border-red-900/30 mb-10">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/10 to-transparent"></div>
              
              <div className="relative z-10 py-24 px-6 sm:px-12 text-center">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="inline-flex mb-2 border-b border-red-500/30 px-4 py-1">
                    <div className="text-xs font-medium text-red-400 tracking-wider uppercase">Türkiye Cumhuriyeti</div>
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
                    {t('simay_subtitle', 'CUMHURİYET GÜNCELLENİYOR')}
                  </h1>
                </motion.div>
                
                <motion.p 
                  className="text-lg sm:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {t('content_description', 'Türkiye Cumhuriyeti\'nin yeni dijital dönüşüm platformuna hoş geldiniz. Geleceğin inşasında birlikte yürüyelim.')}
                </motion.p>
                
                <motion.div 
                  className="inline-flex items-center border border-red-500/40 bg-black/60 backdrop-blur-md rounded-full px-6 py-2 mb-10"
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
                  className="flex flex-wrap justify-center gap-4 sm:gap-5"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <button 
                    onClick={() => navigate("/turkiye")}
                    className="relative px-7 py-3.5 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-lg hover:from-red-500 hover:to-red-700 transition-all shadow-xl hover:shadow-red-700/30 flex items-center font-medium text-base overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-600/80 to-red-800/80 backdrop-filter backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-700/0 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></span>
                    <Flag className="w-5 h-5 mr-3 stroke-[2] relative z-10" />
                    <span className="relative z-10">{t('turkiye_button', 'Türkiye')}</span>
                  </button>
                  
                  <button 
                    onClick={() => navigate("/manifesto")}
                    className="relative px-7 py-3.5 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-lg hover:from-red-500 hover:to-red-700 transition-all shadow-xl hover:shadow-red-700/30 flex items-center font-medium text-base overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-600/80 to-red-800/80 backdrop-filter backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-700/0 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></span>
                    <Scroll className="w-5 h-5 mr-3 stroke-[2] relative z-10" />
                    <span className="relative z-10">{t('simay_manifesto_button', 'Manifestomuz')}</span>
                  </button>
                  
                  <button 
                    onClick={() => navigate("/katil")}
                    className="relative px-7 py-3.5 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-lg hover:from-red-500 hover:to-red-700 transition-all shadow-xl hover:shadow-red-700/30 flex items-center font-medium text-base overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-600/80 to-red-800/80 backdrop-filter backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-700/0 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></span>
                    <Users className="w-5 h-5 mr-3 stroke-[2] relative z-10" />
                    <span className="relative z-10">{t('simay_join_button', 'Harekete Katıl')}</span>
                  </button>
                  
                  <button 
                    onClick={() => navigate("/gorevler")}
                    className="relative px-7 py-3.5 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-lg hover:from-red-500 hover:to-red-700 transition-all shadow-xl hover:shadow-red-700/30 flex items-center font-medium text-base overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-600/80 to-red-800/80 backdrop-filter backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-700/0 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></span>
                    <Target className="w-5 h-5 mr-3 stroke-[2] relative z-10" />
                    <span className="relative z-10">{t('simay_tasks_button', 'Görevler')}</span>
                  </button>
                </motion.div>
              </div>
            </div>
            
            {/* İstatistikler Kartı */}
            <motion.div
              className="bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-lg rounded-xl mb-10 border border-red-800/20 p-6 relative overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600/20 via-red-500/60 to-red-600/20"></div>
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    className="text-center py-4 px-3 rounded-lg bg-black/30 border border-red-900/10 hover:border-red-800/20 transition-colors"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.0 + (index * 0.1) }}
                  >
                    <h3 className="text-sm text-red-400 uppercase tracking-wider mb-1 font-medium">{stat.label}</h3>
                    <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-xs text-gray-400">{stat.suffix}</p>
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
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-900/20">
                        <span className="text-white font-bold text-xl">{value.symbol}</span>
                      </div>
                    </div>
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