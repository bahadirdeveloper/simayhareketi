import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import ModernLayout from "@/components/ModernLayout";
import { Button } from "@/components/ui/button";
import { ModernTechButton } from "@/components/ModernTechButton";
import { Flag, Settings, Scale, Vote, Users, BookOpen, Target, FileText, MessageSquare } from "lucide-react";

// Ana değerler için veri - türkiye sayfası için özelleştirilmiş (emojiler yerine Lucide ikonları kullanarak modernleştirildi)
const turkishValues = [
  { id: 'milli', name: 'MİLLİ', icon: Flag, description: 'Özgür ve bağımsız' },
  { id: 'muasir', name: 'MUASIR', icon: Settings, description: 'Çağdaş uygarlık' },
  { id: 'laik', name: 'LAİK', icon: Scale, description: 'Vicdan özgürlüğü' },
  { id: 'demokratik', name: 'DEMOKRATİK', icon: Vote, description: 'Halk egemenliği' },
  { id: 'sosyal', name: 'SOSYAL', icon: Users, description: 'Toplumsal dayanışma' }
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Enhanced İstatistik Kartları */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {/* Katılım kartı */}
                <motion.div 
                  className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-lg rounded-xl border border-red-900/20 p-4 shadow-lg hover:shadow-red-900/10 transition-all duration-300 hover:border-red-800/30"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600/20 to-red-900/20 flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <h4 className="font-medium text-red-400 text-xs sm:text-sm uppercase tracking-wider mb-1">GENEL KATILIM</h4>
                    <motion.div 
                      className="text-xl sm:text-2xl font-bold text-white"
                      animate={{ opacity: [1, 0.9, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      8.523.912
                    </motion.div>
                    <div className="text-xs text-gray-400 mt-1">Vatandaş</div>
                  </div>
                </motion.div>
                
                {/* Bağış kartı */}
                <motion.div 
                  className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-lg rounded-xl border border-red-900/20 p-4 shadow-lg hover:shadow-red-900/10 transition-all duration-300 hover:border-red-800/30"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600/20 to-red-900/20 flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                        <circle cx="12" cy="12" r="2"></circle>
                        <path d="M6 12h.01M18 12h.01"></path>
                      </svg>
                    </div>
                    <h4 className="font-medium text-red-400 text-xs sm:text-sm uppercase tracking-wider mb-1">TOPLAM BAĞIŞ</h4>
                    <motion.div 
                      className="text-xl sm:text-2xl font-bold text-white"
                      animate={{ opacity: [1, 0.9, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ₺7.514.892
                    </motion.div>
                    <div className="text-xs text-gray-400 mt-1">Medeniyet için</div>
                  </div>
                </motion.div>
                
                {/* Görev kartı */}
                <motion.div 
                  className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-lg rounded-xl border border-red-900/20 p-4 shadow-lg hover:shadow-red-900/10 transition-all duration-300 hover:border-red-800/30"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600/20 to-red-900/20 flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                        <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                        <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                    </div>
                    <h4 className="font-medium text-red-400 text-xs sm:text-sm uppercase tracking-wider mb-1">AKTİF GÖREV</h4>
                    <motion.div 
                      className="text-xl sm:text-2xl font-bold text-white"
                      animate={{ opacity: [1, 0.9, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      100
                    </motion.div>
                    <div className="text-xs text-gray-400 mt-1">Görev</div>
                  </div>
                </motion.div>
                
                {/* Güncelleme kartı */}
                <motion.div 
                  className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-lg rounded-xl border border-red-900/20 p-4 shadow-lg hover:shadow-red-900/10 transition-all duration-300 hover:border-red-800/30"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600/20 to-red-900/20 flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <h4 className="font-medium text-red-400 text-xs sm:text-sm uppercase tracking-wider mb-1">GÜNCELLEME</h4>
                    <motion.div 
                      className="text-xl sm:text-2xl font-bold text-white"
                      animate={{ opacity: [1, 0.9, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      %73
                    </motion.div>
                    <div className="text-xs text-gray-400 mt-1">Tamamlandı</div>
                  </div>
                </motion.div>
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
                      <div className="flex justify-center mb-3">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-900/20">
                          {React.createElement(value.icon, { className: "w-7 h-7 text-white" })}
                        </div>
                      </div>
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
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* TÜRK NEDİR? Button */}
              <div className="flex flex-col">
                <ModernTechButton 
                  variant="futuristic"
                  size="lg"
                  glow="subtle"
                  border="glowing"
                  leftIcon={<BookOpen className="h-5 w-5" />}
                  className="mb-2 justify-center py-4"
                  onClick={() => navigate("/turknedir")}
                >
                  TÜRK NEDİR?
                </ModernTechButton>
                <p className="text-xs text-gray-400 text-center px-2">Türk kimliği ve tanımının tarihsel incelemesi</p>
              </div>
              
              {/* Anayasa Button */}
              <div className="flex flex-col">
                <ModernTechButton 
                  variant="futuristic"
                  size="lg"
                  glow="subtle"
                  border="glowing"
                  leftIcon={<FileText className="h-5 w-5" />}
                  className="mb-2 justify-center py-4"
                  onClick={() => navigate("/anayasa")}
                >
                  ANAYASALARIMIZ
                </ModernTechButton>
                <p className="text-xs text-gray-400 text-center px-2">Cumhuriyet anayasalarının tarihsel arşivi</p>
              </div>
              
              {/* Görevler Button */}
              <div className="flex flex-col">
                <ModernTechButton 
                  variant="futuristic"
                  size="lg"
                  glow="subtle"
                  border="glowing"
                  leftIcon={<Target className="h-5 w-5" />}
                  className="mb-2 justify-center py-4"
                  onClick={() => navigate("/gorevler")}
                >
                  GÖREVLER
                </ModernTechButton>
                <p className="text-xs text-gray-400 text-center px-2">Cumhuriyet için yapılacak görevler listesi</p>
              </div>
              
              {/* Katıl Button */}
              <div className="flex flex-col">
                <ModernTechButton 
                  variant="turkish"
                  size="lg"
                  glow="strong"
                  border="glowing"
                  leftIcon={<MessageSquare className="h-5 w-5" />}
                  className="mb-2 justify-center py-4"
                  onClick={() => navigate("/katil")}
                >
                  HAREKETE KATIL
                </ModernTechButton>
                <p className="text-xs text-gray-400 text-center px-2">Cumhuriyet güncellemesi katılım sistemi</p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </ModernLayout>
  );
}
