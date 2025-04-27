import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ModernLayout from "@/components/ModernLayout";
import { Button } from "@/components/ui/button";

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
      <div className="w-full max-w-4xl mx-auto">
        {/* Manifesto Highlight */}
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-b from-black/70 to-red-950/40 backdrop-blur-sm border-2 border-red-600/40 rounded-lg p-5 sm:p-7 shadow-lg">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold">
              <strong className="text-red-500">"Türk, Atasının mirasına sahip çıkamazsa,</strong><br />
              <strong className="text-white">geleceğini başka milletlerin insafına bırakır."</strong>
            </p>
          </div>
        </motion.div>
        
        {/* Title Block */}
        <motion.div 
          className="mb-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-red-500 mb-6 tracking-wide">
            TÜRKİYE
          </h1>
          <div className="flex flex-col items-center mb-4">
            <div className="text-xl sm:text-2xl md:text-3xl text-red-500 font-bold mb-2 flex items-center justify-center">
              Cumhuriyet ile Yeniden Güncelleniyor
              <motion.span
                className="ml-2 text-white"
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
          </div>
          
          {/* İstatistik Kartları */}
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
            <div className="bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg border border-red-500/30 shadow-lg">
              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-white rounded-full mr-1.5"></div>
                  <h4 className="font-medium text-white text-[10px] sm:text-xs">GENEL KATILIM</h4>
                </div>
                <motion.div 
                  className="text-lg sm:text-xl font-bold text-white mt-1"
                  animate={{ opacity: [1, 0.9, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  8.523.912
                </motion.div>
                <div className="text-[9px] sm:text-xs text-gray-400">Vatandaş</div>
              </div>
            </div>
            
            <div className="bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg border border-red-500/30 shadow-lg">
              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-white rounded-full mr-1.5"></div>
                  <h4 className="font-medium text-white text-[10px] sm:text-xs">TOPLAM BAĞIŞ</h4>
                </div>
                <motion.div 
                  className="text-lg sm:text-xl font-bold text-red-500 mt-1"
                  animate={{ opacity: [1, 0.9, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ₺7.514.892
                </motion.div>
                <div className="text-[9px] sm:text-xs text-gray-400">Medeniyet için</div>
              </div>
            </div>
          </div>
          
          <p className="text-white/80 mt-6 text-lg sm:text-xl">
            Dijital Koordinasyon Alanı
          </p>
        </motion.div>
        
        {/* Navigation Buttons - Modern Grid Layout */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* TÜRK NEDİR? Butonu */}
          <Link to="/turknedir" className="group relative flex flex-col items-center bg-gradient-to-br from-black/60 to-red-950/30 hover:from-black/70 hover:to-red-950/40 backdrop-blur-md border border-red-700/10 hover:border-red-500/30 p-3 rounded-xl transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="mt-2 text-xs sm:text-sm text-center text-white font-medium tracking-wide">TÜRK NEDİR?</span>
          </Link>
          
          {/* Anayasa Butonu */}
          <Link to="/anayasa" className="group relative flex flex-col items-center bg-gradient-to-br from-black/60 to-red-950/30 hover:from-black/70 hover:to-red-950/40 backdrop-blur-md border border-red-700/10 hover:border-red-500/30 p-3 rounded-xl transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
            <span className="mt-2 text-xs sm:text-sm text-center text-white font-medium tracking-wide">ANAYASALARIMIZ</span>
          </Link>
          
          {/* Görevler Butonu */}
          <Link to="/gorevler" className="group relative flex flex-col items-center bg-gradient-to-br from-black/60 to-red-950/30 hover:from-black/70 hover:to-red-950/40 backdrop-blur-md border border-red-700/10 hover:border-red-500/30 p-3 rounded-xl transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="mt-2 text-xs sm:text-sm text-center text-white font-medium tracking-wide">GÖREV DİRİLİŞ</span>
          </Link>
          
          {/* Halk Manifestoları Butonu */}
          <Link to="/halk-manifestolar" className="group relative flex flex-col items-center bg-gradient-to-br from-black/60 to-red-950/30 hover:from-black/70 hover:to-red-950/40 backdrop-blur-md border border-red-700/10 hover:border-red-500/30 p-3 rounded-xl transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
            <span className="mt-2 text-xs sm:text-sm text-center text-white font-medium tracking-wide">HALK MANİFESTOLARI</span>
          </Link>
          
          {/* Çağrı Butonu */}
          <Link to="/cagri" className="group relative flex flex-col items-center bg-gradient-to-br from-black/60 to-red-950/30 hover:from-black/70 hover:to-red-950/40 backdrop-blur-md border border-red-700/10 hover:border-red-500/30 p-3 rounded-xl transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            <span className="mt-2 text-xs sm:text-sm text-center text-white font-medium tracking-wide">SESLENİŞ & ÇAĞRI</span>
          </Link>
          
          {/* Katıl Butonu */}
          <Link to="/katil" className="group relative flex flex-col items-center bg-gradient-to-br from-black/60 to-red-950/30 hover:from-black/70 hover:to-red-950/40 backdrop-blur-md border border-red-700/10 hover:border-red-500/30 p-3 rounded-xl transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span className="mt-2 text-xs sm:text-sm text-center text-white font-medium tracking-wide">KATILIM & BAĞIŞ</span>
          </Link>
          
          {/* Sertifika Butonu */}
          <Link to="/sertifika" className="group relative flex flex-col items-center bg-gradient-to-br from-black/60 to-red-950/30 hover:from-black/70 hover:to-red-950/40 backdrop-blur-md border border-red-700/10 hover:border-red-500/30 p-3 rounded-xl transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span className="mt-2 text-xs sm:text-sm text-center text-white font-medium tracking-wide">CUMHURİYET SERTİFİKASI</span>
          </Link>
          
          {/* Entegrasyon Butonu */}
          <Link to="/entegrasyon" className="group relative flex flex-col items-center bg-gradient-to-br from-black/60 to-red-950/30 hover:from-black/70 hover:to-red-950/40 backdrop-blur-md border border-red-700/10 hover:border-red-500/30 p-3 rounded-xl transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="mt-2 text-xs sm:text-sm text-center text-white font-medium tracking-wide">ENTEGRASYON SÜRECİ</span>
          </Link>
          
          {/* Halk Koordinasyon Butonu */}
          <Link to="/halk-koordinasyon" className="group relative flex flex-col items-center bg-gradient-to-br from-red-700/20 to-red-900/30 hover:from-red-700/30 hover:to-red-900/40 backdrop-blur-md border border-red-700/20 hover:border-red-500/40 p-3 rounded-xl transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="mt-2 text-xs sm:text-sm text-center text-white font-medium tracking-wide">HALK KOORDİNASYON</span>
            <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </div>
          </Link>
        </motion.div>
        
        {/* Türkiye Info Block */}
        <motion.div
          className="bg-black/40 backdrop-blur-sm px-4 py-4 rounded-xl border border-red-500/20 mb-10 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h3 className="text-lg sm:text-xl font-medium text-white mb-3">CUMHURİYET GÜNCELLEME SÜRECİ</h3>
          
          <div className="text-sm text-gray-300 space-y-3">
            <p>
              Türkiye Cumhuriyeti'nin dijital güncellemesine katılarak, ülkemizin geleceğini şekillendirmede aktif rol alın. 
              Bu platform, halkımızın sesini duyurması, fikirlerini paylaşması ve Cumhuriyet'i birlikte güncellemesi için tasarlanmıştır.
            </p>
            <p>
              Dijital Koordinasyon Merkezi olarak, tüm vatandaşlarımızın katkılarını bekliyoruz. 
              Türkiye'nin geleceği, hep birlikte inşa ettiğimiz bu dijital platformdan geçiyor.
            </p>
          </div>
          
          <div className="mt-4">
            <Link to="/katil" className="inline-block">
              <div className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-red-600/80 to-red-800/80 hover:from-red-500/80 hover:to-red-700/80 px-6 py-3 text-white shadow-lg">
                <div className="relative flex items-center justify-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-sm font-medium">HEMEN KATIL</span>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </ModernLayout>
  );
}