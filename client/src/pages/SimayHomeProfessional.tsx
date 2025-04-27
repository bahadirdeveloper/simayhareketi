import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ModernLayout from "@/components/ModernLayout";

export default function SimayHomeProfessional() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  
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
            </div>
          </div>
        </motion.div>
        
        {/* Hızlı Erişim Bağlantıları - Quick Access Links bileşenini kaldırdık */}
        <div className="mt-4 max-w-3xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Hızlı Erişim Butonları */}
            <Link to="/katil" className="flex items-center justify-center bg-black/40 hover:bg-black/50 backdrop-blur-sm px-3 py-4 rounded-lg border border-red-500/30 hover:border-red-500/50 text-white text-sm sm:text-base font-medium transition-all duration-300 shadow-md hover:shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Katıl
            </Link>
            
            <Link to="/sertifika" className="flex items-center justify-center bg-black/40 hover:bg-black/50 backdrop-blur-sm px-3 py-4 rounded-lg border border-red-500/30 hover:border-red-500/50 text-white text-sm sm:text-base font-medium transition-all duration-300 shadow-md hover:shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Sertifika
            </Link>
            
            <Link to="/cagri" className="flex items-center justify-center bg-black/40 hover:bg-black/50 backdrop-blur-sm px-3 py-4 rounded-lg border border-red-500/30 hover:border-red-500/50 text-white text-sm sm:text-base font-medium transition-all duration-300 shadow-md hover:shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
              Çağrı
            </Link>
            
            <Link to="/entegrasyon" className="flex items-center justify-center bg-black/40 hover:bg-black/50 backdrop-blur-sm px-3 py-4 rounded-lg border border-red-500/30 hover:border-red-500/50 text-white text-sm sm:text-base font-medium transition-all duration-300 shadow-md hover:shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Entegrasyon
            </Link>
          </div>
        </div>
        
        {/* Temel Değerler ve Katılım CTA */}
        <motion.div
          className="text-center mt-6 mb-8 z-10 max-w-3xl mx-auto px-4 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {/* Temel Değerler Bölümü */}
          <div className="bg-black/40 backdrop-blur-sm px-4 py-4 rounded-xl border border-red-500/20 mb-6">
            <h2 className="text-sm text-white font-bold mb-3">TEMEL DEĞERLER</h2>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {[
                { name: "AKIL", icon: "brain" },
                { name: "BİLİM", icon: "microscope" },
                { name: "VİCDAN", icon: "heart" },
                { name: "FEN", icon: "beaker" },
                { name: "SANAT", icon: "music" }
              ].map((value, i) => (
                <div key={i} className="flex flex-col items-center space-y-1">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-900/30 flex items-center justify-center border border-red-600/30">
                    {value.icon === "brain" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    )}
                    {value.icon === "microscope" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                      </svg>
                    )}
                    {value.icon === "heart" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                    {value.icon === "beaker" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    )}
                    {value.icon === "music" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-300 font-medium">{value.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Katılım butonu - tüm cihazlarda tutarlı görünüm */}
          <Link to="/katil" className="inline-block w-full sm:w-auto">
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-red-600/80 to-red-800/80 hover:from-red-500/80 hover:to-red-700/80 px-6 py-5 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative flex flex-col items-center justify-center">
                <h3 className="text-xl sm:text-2xl font-bold tracking-wide">KATIL</h3>
                <p className="text-sm sm:text-base text-center max-w-sm mt-2">Cumhuriyet'i güncelleyecek olan bu yolculuğa katılmak için tıklayın.</p>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </ModernLayout>
  );
}