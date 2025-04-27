import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import ModernLayout from "@/components/ModernLayout";
import LoadingScreen from "@/components/LoadingScreen";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Flag, Scale, Users, Microscope, Palette } from "lucide-react";

// Manifesto prensiplerini tanımla (emojiler yerine Lucide ikonları kullanılarak modernize edildi)
const principles = [
  { 
    key: "principle_1", 
    icon: Flag, 
    title: "ÖZGÜRLÜK",
    color: "from-black/60 to-red-950/30"
  },
  { 
    key: "principle_2", 
    icon: Scale, 
    title: "ADALET",
    color: "from-black/60 to-red-950/30" 
  },
  { 
    key: "principle_3", 
    icon: Users, 
    title: "DEMOKRASİ",
    color: "from-black/60 to-red-950/30" 
  },
  { 
    key: "principle_4", 
    icon: Microscope, 
    title: "BİLİM",
    color: "from-black/60 to-red-950/30" 
  },
  { 
    key: "principle_5", 
    icon: Palette, 
    title: "SANAT",
    color: "from-black/60 to-red-950/30" 
  }
];

export default function ManifestoPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [showLoading, setShowLoading] = useState(true);
  
  useEffect(() => {
    // Ziyaret kaydı
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
    
    // 3 saniye sonra yükleme ekranını gizle
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [i18n.language]);
  
  if (showLoading) {
    return <LoadingScreen />;
  }

  return (
    <ModernLayout audioKey="manifesto" showBackButton={true} pageName="Manifesto">
      <div className="w-full max-w-7xl mx-auto">
        <AnimatePresence>
          <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Hero Section */}
            <motion.div 
              className="relative rounded-xl overflow-hidden mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-red-950/40 backdrop-blur-sm z-0"></div>
              <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
              
              <div className="relative z-10 py-14 px-6 sm:px-10 text-center">
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-700 pb-2">
                    {t('manifesto.title', 'CUMHURİYET MANİFESTOSU')}
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mt-4 mb-6 rounded-full"></div>
                  
                  <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                    {t('manifesto.introduction', 'Cumhuriyet, özgürlüğün, demokrasinin ve egemenliğin halka ait olduğu yönetim biçimidir. Bu manifesto, Cumhuriyet değerlerini yeniden yorumlar ve modernize eder.')}
                  </p>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Main Content */}
            <div className="space-y-10 mb-10">
              {/* Principles Section */}
              <motion.div
                className="mb-10" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
                  {t('manifesto.principles', 'TEMEL İLKELERİMİZ')}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {principles.map((principle, index) => (
                    <motion.div
                      key={principle.key}
                      className={`bg-gradient-to-b ${principle.color} backdrop-blur-sm rounded-xl p-6 border border-red-700/20 hover:border-red-500/40 transition-all duration-300 shadow-lg hover:shadow-xl`}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                    >
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-900/20">
                          {React.createElement(principle.icon, { className: "w-8 h-8 text-white" })}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">
                        {principle.title || t(`manifesto.${principle.key}`, `Prensip ${index + 1}`)}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {t(`manifesto.${principle.key}_desc`, `Bu ilkenin açıklaması buraya gelecek. Şu an için hazırlanıyor.`)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Manifesto Full Text */}
              <motion.div
                className="bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-lg rounded-xl border border-red-800/20 p-6 sm:p-8 shadow-xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-900/20 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {t('manifesto.full_text', 'MANİFESTO TAM METİN')}
                  </h3>
                </div>
                
                <div className="prose prose-invert prose-red max-w-none">
                  <p className="text-white/90 bg-black/20 p-4 rounded-lg backdrop-blur-sm border-l-4 border-red-700/30">
                    {t('manifesto.paragraph_1', 'Bugün bir dönüm noktasındayız. Teknoloji, toplum ve devlet arasındaki ilişkiler yeniden tanımlanırken, Cumhuriyet\'in bir asrı aşan değerlerini günümüz dünyasına taşıma sorumluluğu ile karşı karşıyayız.')}
                  </p>
                  
                  <p className="text-white/90 mt-4">
                    {t('manifesto.paragraph_2', 'Bu manifesto, Türkiye Cumhuriyeti\'nin temel ilkelerini korurken, günümüz teknolojileriyle bu değerleri güncelleme ve geleceğe aktarma kararlılığımızın ifadesidir.')}
                  </p>
                  
                  <p className="text-white/90 mt-4">
                    {t('manifesto.paragraph_3', 'Cumhuriyetimizi güncelleme görevi, yalnızca bir hükümetin veya kurumun değil, tüm vatandaşların ortak sorumluluğudur. Bu yolculukta, her bir bireyin katkısı, geleceğimizin şekillenmesinde hayati bir rol oynayacaktır.')}
                  </p>
                  
                  <p className="text-white/90 mt-4">
                    {t('manifesto.paragraph_4', 'Akıl, bilim, vicdan, fen ve sanat; Cumhuriyetimizin güncellenmesinde temel alacağımız değerlerdir. Bu değerler ışığında, daha adil, daha özgür ve daha müreffeh bir Türkiye inşa edeceğiz.')}
                  </p>
                  
                  <div className="bg-gradient-to-r from-red-950/30 to-black/30 p-5 rounded-xl border border-red-800/20 my-6">
                    <blockquote className="border-l-4 border-red-500 pl-4">
                      <p className="text-xl italic text-white/90">
                        {t('manifesto.quote', '"Egemenlik kayıtsız şartsız milletindir. Bu egemenliği günümüzün dijital dünyasında yeniden tanımlamak ve güçlendirmek zorundayız."')}
                      </p>
                    </blockquote>
                  </div>
                  
                  <p className="text-white/90 mt-4 bg-black/20 p-4 rounded-lg backdrop-blur-sm border-l-4 border-red-700/30">
                    {t('manifesto.conclusion', 'Bu manifestoyu destekleyen sizleri, Cumhuriyetimizin güncellenmesi yolculuğunda bizimle birlikte adım atmaya davet ediyoruz. Geleceğimiz, ancak birlikte inşa edebileceğimiz kadar parlak olacaktır.')}
                  </p>
                </div>
              </motion.div>
            </div>
            
            {/* Call to Action */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-5 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <button 
                  onClick={() => navigate("/")}
                  className="relative px-7 py-3.5 bg-gradient-to-br from-black/80 to-gray-800/80 text-white rounded-lg hover:from-black/90 hover:to-gray-800/90 transition-all shadow-xl hover:shadow-black/20 flex items-center font-medium text-base overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-black/80 to-gray-800/80 backdrop-filter backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 stroke-[2] relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="relative z-10">{t('back_to_home', 'Ana Sayfaya Dön')}</span>
                </button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <button 
                  onClick={() => navigate("/katil")}
                  className="relative px-7 py-3.5 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-lg hover:from-red-500 hover:to-red-700 transition-all shadow-xl hover:shadow-red-700/30 flex items-center font-medium text-base overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-600/80 to-red-800/80 backdrop-filter backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-700/0 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 stroke-[2] relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span className="relative z-10">{t('simay_join_button', 'Harekete Katıl')}</span>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </ModernLayout>
  );
}