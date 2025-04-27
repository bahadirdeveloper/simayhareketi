import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import ModernLayout from "@/components/ModernLayout";
import { Button } from "@/components/ui/button";

// Ana değerler için veri - türkiye sayfası için özelleştirilmiş
const turkishValues = [
  { id: 'milli', name: 'MİLLİ', icon: '🇹🇷', description: 'Özgür ve bağımsız' },
  { id: 'muasir', name: 'MUASIR', icon: '⚙️', description: 'Çağdaş uygarlık' },
  { id: 'laik', name: 'LAİK', icon: '⚖️', description: 'Vicdan özgürlüğü' },
  { id: 'demokratik', name: 'DEMOKRATİK', icon: '🗳️', description: 'Halk egemenliği' },
  { id: 'sosyal', name: 'SOSYAL', icon: '🤝', description: 'Toplumsal dayanışma' }
];

export default function TurkiyePage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  
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
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-red-950/40 backdrop-blur-sm z-0"></div>
              <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
              
              <div className="relative z-10 py-10 px-6 sm:px-10 text-center">
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed">
                    <span className="text-red-500 block mb-3">"Türk, Atasının mirasına sahip çıkamazsa,</span>
                    <span className="text-white block">geleceğini başka milletlerin insafına bırakır."</span>
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
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 tracking-wide"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                TÜRKİYE
              </motion.h1>
              
              <motion.div 
                className="flex flex-col items-center mb-6"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="text-xl sm:text-2xl md:text-3xl text-white font-bold mb-2 flex items-center justify-center">
                  Cumhuriyet ile Yeniden Güncelleniyor
                  <motion.span
                    className="ml-2 text-red-500"
                    animate={{ 
                      opacity: [1, 0.5, 1],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    ✓
                  </motion.span>
                </div>
              </motion.div>
              
              {/* Enhanced İstatistik Kartları */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="bg-black/30 backdrop-blur-lg rounded-xl border border-red-800/20 p-4 shadow-lg">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                      <h4 className="font-semibold text-white text-xs sm:text-sm uppercase tracking-wider">GENEL KATILIM</h4>
                    </div>
                    <motion.div 
                      className="text-xl sm:text-2xl font-bold text-white mt-2"
                      animate={{ opacity: [1, 0.9, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      8.523.912
                    </motion.div>
                    <div className="text-xs sm:text-sm text-gray-400">Vatandaş</div>
                  </div>
                </div>
                
                <div className="bg-black/30 backdrop-blur-lg rounded-xl border border-red-800/20 p-4 shadow-lg">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                      <h4 className="font-semibold text-white text-xs sm:text-sm uppercase tracking-wider">TOPLAM BAĞIŞ</h4>
                    </div>
                    <motion.div 
                      className="text-xl sm:text-2xl font-bold text-red-500 mt-2"
                      animate={{ opacity: [1, 0.9, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ₺7.514.892
                    </motion.div>
                    <div className="text-xs sm:text-sm text-gray-400">Medeniyet için</div>
                  </div>
                </div>
                
                <div className="bg-black/30 backdrop-blur-lg rounded-xl border border-red-800/20 p-4 shadow-lg">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                      <h4 className="font-semibold text-white text-xs sm:text-sm uppercase tracking-wider">AKTİF GÖREV</h4>
                    </div>
                    <motion.div 
                      className="text-xl sm:text-2xl font-bold text-white mt-2"
                      animate={{ opacity: [1, 0.9, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      100
                    </motion.div>
                    <div className="text-xs sm:text-sm text-gray-400">Görev</div>
                  </div>
                </div>
                
                <div className="bg-black/30 backdrop-blur-lg rounded-xl border border-red-800/20 p-4 shadow-lg">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                      <h4 className="font-semibold text-white text-xs sm:text-sm uppercase tracking-wider">GÜNCELLEME</h4>
                    </div>
                    <motion.div 
                      className="text-xl sm:text-2xl font-bold text-white mt-2"
                      animate={{ opacity: [1, 0.9, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      %73
                    </motion.div>
                    <div className="text-xs sm:text-sm text-gray-400">Tamamlandı</div>
                  </div>
                </div>
              </motion.div>
              
              {/* Cumhuriyet Değerleri */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <h2 className="text-2xl font-bold text-center mb-6 text-white">
                  CUMHURİYET DEĞERLERİ
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {turkishValues.map((value, index) => (
                    <motion.div 
                      key={value.id}
                      className="bg-gradient-to-b from-black/60 to-red-950/20 backdrop-blur-sm rounded-xl p-4 text-center border border-red-700/20 hover:border-red-500/40 transition-all duration-300"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                    >
                      <div className="text-2xl mb-2">{value.icon}</div>
                      <h3 className="text-lg font-semibold text-white mb-1">{value.name}</h3>
                      <p className="text-xs text-gray-400">{value.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.p 
                className="text-white/90 mt-6 text-lg sm:text-xl max-w-3xl mx-auto bg-black/20 p-3 rounded-lg backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                Türkiye Cumhuriyeti Dijital Koordinasyon Alanı
              </motion.p>
            </motion.div>
            
            {/* Navigation Buttons - Modern Grid Layout */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* TÜRK NEDİR? Button */}
              <Link to="/turknedir" className="group relative flex flex-col items-center bg-gradient-to-br from-black/60 to-red-950/30 hover:from-black/70 hover:to-red-950/40 backdrop-blur-md border border-red-700/10 hover:border-red-500/30 p-4 sm:p-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="mt-3 text-sm sm:text-base md:text-lg text-center text-white font-medium tracking-wide">TÜRK NEDİR?</span>
              </Link>
              
              {/* Anayasa Button */}
              <Link to="/anayasa" className="group relative flex flex-col items-center bg-gradient-to-br from-black/60 to-red-950/30 hover:from-black/70 hover:to-red-950/40 backdrop-blur-md border border-red-700/10 hover:border-red-500/30 p-4 sm:p-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
                <span className="mt-3 text-sm sm:text-base md:text-lg text-center text-white font-medium tracking-wide">ANAYASALARIMIZ</span>
              </Link>
              
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </ModernLayout>
  );
}
