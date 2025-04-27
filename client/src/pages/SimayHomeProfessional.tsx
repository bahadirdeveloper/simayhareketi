import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ModernLayout from "@/components/ModernLayout";
import LoadingScreen from "@/components/LoadingScreen";

export default function SimayHomeProfessional() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [showLoading, setShowLoading] = useState(true);
  
  useEffect(() => {
    // 3 saniye sonra yükleme ekranını gizle
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (showLoading) {
    return <LoadingScreen onComplete={() => setShowLoading(false)} />;
  }
  
  return (
    <ModernLayout audioKey="home" showLanguageSelector={true}>
      <div className="w-full">
        {/* Ana Başlık */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            {/* Başlık */}
            <div className="relative bg-gradient-to-r from-black/60 via-red-900/30 to-black/60 backdrop-blur-sm py-4 px-4 sm:px-6 rounded-full mb-6 shadow-lg border border-red-600/30">
              <h1 className="font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-red-600 via-white to-red-500 text-transparent bg-clip-text text-center tracking-tight">
                CUMHURİYET GÜNCELLENİYOR
              </h1>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center mb-6">
            {/* İstatistik Kartları - Tüm Cihazlar İçin Tek Tasarım */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
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
          </div>
          
          {/* Ana Navigasyon Kartı */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5 bg-gradient-to-b from-black/70 to-red-950/20 backdrop-blur-sm rounded-2xl border border-red-600/20 shadow-lg">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <span className="text-xl sm:text-2xl font-thin text-gray-200">Türkiye<span className="text-red-500">.</span>Simay</span>
              </div>
            </div>
            
            {/* Responsive Grid - Küçük ekranlarda 2 sütun, büyük ekranlarda 4 sütun */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {/* GÖREV 0 Butonu */}
              <Link to="/gorevler" className="group relative flex flex-col items-center bg-gradient-to-br from-red-700/20 to-red-900/30 hover:from-red-700/30 hover:to-red-900/40 backdrop-blur-md border border-red-700/20 hover:border-red-500/40 p-4 sm:p-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="mt-3 text-sm sm:text-base md:text-lg text-center text-white font-medium tracking-wide">GÖREV 0</span>
                <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600"></span>
                </div>
              </Link>
              
              {/* GÖREVLER Butonu */}
              <Link to="/gorevler" className="group relative flex flex-col items-center bg-gradient-to-br from-black/60 to-red-950/30 hover:from-black/70 hover:to-red-950/40 backdrop-blur-md border border-red-700/10 hover:border-red-500/30 p-4 sm:p-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="mt-3 text-sm sm:text-base md:text-lg text-center text-white font-medium tracking-wide">GÖREVLER</span>
              </Link>
              
              {/* TÜRK NEDİR? Butonu */}
              <Link to="/turknedir" className="group relative flex flex-col items-center bg-gradient-to-br from-black/60 to-red-950/30 hover:from-black/70 hover:to-red-950/40 backdrop-blur-md border border-red-700/10 hover:border-red-500/30 p-4 sm:p-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="mt-3 text-sm sm:text-base md:text-lg text-center text-white font-medium tracking-wide">TÜRK NEDİR?</span>
              </Link>
              
              {/* TÜRKİYE Butonu */}
              <Link to="/turkiye" className="group relative flex flex-col items-center bg-gradient-to-br from-black/60 to-red-950/30 hover:from-black/70 hover:to-red-950/40 backdrop-blur-md border border-red-700/10 hover:border-red-500/30 p-4 sm:p-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="mt-3 text-sm sm:text-base md:text-lg text-center text-white font-medium tracking-wide">TÜRKİYE</span>
              </Link>
              
              {/* ANAYASA Butonu */}
              <Link to="/anayasa" className="group relative flex flex-col items-center bg-gradient-to-br from-black/60 to-red-950/30 hover:from-black/70 hover:to-red-950/40 backdrop-blur-md border border-red-700/10 hover:border-red-500/30 p-4 sm:p-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
                <span className="mt-3 text-sm sm:text-base md:text-lg text-center text-white font-medium tracking-wide">ANAYASA</span>
              </Link>
              
              {/* AMAÇLAR Butonu */}
              <Link to="/amaclar" className="group relative flex flex-col items-center bg-gradient-to-br from-black/60 to-red-950/30 hover:from-black/70 hover:to-red-950/40 backdrop-blur-md border border-red-700/10 hover:border-red-500/30 p-4 sm:p-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="mt-3 text-sm sm:text-base md:text-lg text-center text-white font-medium tracking-wide">AMAÇLAR</span>
              </Link>
              
              {/* MANİFESTOLAR Butonu */}
              <Link to="/halk-manifestolar" className="group relative flex flex-col items-center bg-gradient-to-br from-black/60 to-red-950/30 hover:from-black/70 hover:to-red-950/40 backdrop-blur-md border border-red-700/10 hover:border-red-500/30 p-4 sm:p-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
                <span className="mt-3 text-sm sm:text-base md:text-lg text-center text-white font-medium tracking-wide">MANİFESTOLAR</span>
              </Link>
              
              {/* HALK KOORDİNASYON Butonu */}
              <Link to="/halk-koordinasyon" className="group relative flex flex-col items-center bg-gradient-to-br from-red-700/20 to-red-900/30 hover:from-red-700/30 hover:to-red-900/40 backdrop-blur-md border border-red-700/20 hover:border-red-500/40 p-4 sm:p-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="mt-3 text-sm sm:text-base md:text-lg text-center text-white font-medium tracking-wide">HALK KOORDİNASYON</span>
                <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                </div>
              </Link>
              
              {/* SERTİFİKA Butonu */}
              <Link to="/sertifika" className="group relative flex flex-col items-center bg-gradient-to-br from-black/60 to-red-950/30 hover:from-black/70 hover:to-red-950/40 backdrop-blur-md border border-red-700/10 hover:border-red-500/30 p-4 sm:p-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span className="mt-3 text-sm sm:text-base md:text-lg text-center text-white font-medium tracking-wide">SERTİFİKA</span>
              </Link>

              {/* KATIL Butonu */}
              <Link to="/katil" className="group relative flex flex-col items-center bg-gradient-to-br from-red-700/20 to-red-900/30 hover:from-red-700/30 hover:to-red-900/40 backdrop-blur-md border border-red-700/20 hover:border-red-500/40 p-4 sm:p-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span className="mt-3 text-sm sm:text-base md:text-lg text-center text-white font-medium tracking-wide">KATIL</span>
                <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                </div>
              </Link>

              {/* EKİP Butonu */}
              <Link to="/ekip" className="group relative flex flex-col items-center bg-gradient-to-br from-black/60 to-red-950/30 hover:from-black/70 hover:to-red-950/40 backdrop-blur-md border border-red-700/10 hover:border-red-500/30 p-4 sm:p-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="mt-3 text-sm sm:text-base md:text-lg text-center text-white font-medium tracking-wide">EKİP</span>
              </Link>
              
              {/* İLETİŞİM Butonu */}
              <Link to="/iletisim" className="group relative flex flex-col items-center bg-gradient-to-br from-black/60 to-red-950/30 hover:from-black/70 hover:to-red-950/40 backdrop-blur-md border border-red-700/10 hover:border-red-500/30 p-4 sm:p-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="mt-3 text-sm sm:text-base md:text-lg text-center text-white font-medium tracking-wide">İLETİŞİM</span>
              </Link>
            </div>
          </div>
        </motion.div>
        
        {/* Temel Değerler Bölümü */}
        <motion.div 
          className="max-w-4xl mx-auto mb-8 px-4 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="bg-gradient-to-b from-black/50 to-red-950/10 backdrop-blur-sm rounded-2xl border border-red-500/20 p-4 sm:p-5 shadow-lg">
            <h2 className="text-xl sm:text-2xl text-white font-bold mb-4 text-center">Temel Değerlerimiz</h2>
            
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
              <div className="flex flex-col items-center p-2 sm:p-3 bg-black/30 backdrop-blur-sm rounded-xl border border-red-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="text-xs sm:text-sm text-white font-semibold mt-1 text-center">AKIL</span>
              </div>
              
              <div className="flex flex-col items-center p-2 sm:p-3 bg-black/30 backdrop-blur-sm rounded-xl border border-red-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <span className="text-xs sm:text-sm text-white font-semibold mt-1 text-center">BİLİM</span>
              </div>
              
              <div className="flex flex-col items-center p-2 sm:p-3 bg-black/30 backdrop-blur-sm rounded-xl border border-red-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-xs sm:text-sm text-white font-semibold mt-1 text-center">VİCDAN</span>
              </div>
              
              <div className="flex flex-col items-center p-2 sm:p-3 bg-black/30 backdrop-blur-sm rounded-xl border border-red-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span className="text-xs sm:text-sm text-white font-semibold mt-1 text-center">FEN</span>
              </div>
              
              <div className="flex flex-col items-center p-2 sm:p-3 bg-black/30 backdrop-blur-sm rounded-xl border border-red-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs sm:text-sm text-white font-semibold mt-1 text-center">SANAT</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Video ve Güncellemeler Bölümü */}
        <motion.div 
          className="max-w-4xl mx-auto mb-8 px-4 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Video Bölümü */}
            <div className="bg-gradient-to-b from-black/50 to-red-950/10 backdrop-blur-sm rounded-2xl border border-red-500/20 p-4 sm:p-5 shadow-lg overflow-hidden">
              <h3 className="text-lg sm:text-xl text-white font-bold mb-3">Cumhuriyet ve İnsanlık</h3>
              <div className="relative pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-lg border border-red-500/20">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/u8I6ET0dpDw?si=cL0P3EJOJn-L5vX4" 
                  title="Cumhuriyet ve İnsanlık"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm mt-3">Bu video Türkiye Cumhuriyeti'nin ve insanlık değerlerinin yükselişini anlatır.</p>
            </div>
            
            {/* Son Güncellemeler */}
            <div className="bg-gradient-to-b from-black/50 to-red-950/10 backdrop-blur-sm rounded-2xl border border-red-500/20 p-4 sm:p-5 shadow-lg">
              <h3 className="text-lg sm:text-xl text-white font-bold mb-3">Son Güncellemeler</h3>
              <div className="space-y-2.5">
                <div className="flex items-start">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 mt-1.5 mr-2.5"></div>
                  <div>
                    <h4 className="text-sm sm:text-base text-white font-medium">Halk Koordinasyon Merkezi Açıldı</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Cumhuriyet Güncelleme projesinin yeni iletişim alanı vatandaşlarımızın hizmetinde.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 mt-1.5 mr-2.5"></div>
                  <div>
                    <h4 className="text-sm sm:text-base text-white font-medium">Türk Nedir? Bölümü Genişletildi</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Tarihsel ve kültürel perspektifle Türklük anlatımı içeriklerimiz yayınlandı.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 mt-1.5 mr-2.5"></div>
                  <div>
                    <h4 className="text-sm sm:text-base text-white font-medium">Engelsiz Erişim Güncellemesi</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">"Bizde Engel Yok" sloganıyla tüm sayfalarımız erişilebilirlik standartlarına göre yenilendi.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 mt-1.5 mr-2.5"></div>
                  <div>
                    <h4 className="text-sm sm:text-base text-white font-medium">8 Milyon+ Vatandaş Katılımı</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Cumhuriyet Güncelleme projesi vatandaş katılımı 8.5 milyon kişiyi aştı.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Katılım Çağrısı */}
        <motion.div 
          className="max-w-4xl mx-auto px-4 sm:px-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link to="/katil">
            <div className="relative bg-gradient-to-r from-red-900/30 via-red-700/20 to-red-900/30 hover:from-red-900/40 hover:via-red-700/30 hover:to-red-900/40 backdrop-blur-sm rounded-2xl border border-red-500/30 hover:border-red-500/50 p-6 shadow-lg transition-all duration-300 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent bg-[length:30%_100%] bg-no-repeat animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                  <h3 className="text-xl sm:text-2xl text-white font-bold mb-2">Cumhuriyet'in Güncellenmesine Katkıda Bulun</h3>
                  <p className="text-gray-300 text-sm sm:text-base">Türkiye ve insanlık için çalışmalarımıza destek ol, ekibimize katıl.</p>
                </div>
                <div className="relative inline-flex">
                  <div className="absolute -inset-1 bg-red-500 opacity-30 blur rounded-lg group-hover:opacity-40 transition-opacity duration-300"></div>
                  <button className="relative px-6 py-3 bg-gradient-to-r from-red-800 to-red-700 text-white rounded-lg font-semibold text-sm sm:text-base transition-transform duration-300 group-hover:scale-105 shadow-lg">
                    HEMEN KATIL
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </ModernLayout>
  );
}