import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import LoadingScreen from "@/components/LoadingScreen";
import { Button } from "@/components/ui/button";
import ModernLayout from "@/components/ModernLayout";

export default function SimayHomeProfessional() {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [, navigate] = useLocation();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  
  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <ModernLayout audioKey="home" showLanguageSelector={true}>
        <div className="w-full">
          {/* Ana Başlık */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
            >
              <div className="relative">
                {/* Teknoloji Deseni Arka Plan */}
                <div className="absolute inset-0 opacity-10 bg-repeat" style={{ 
                  backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDgwIDgwIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMEg0MCBWNDAgSDAgVjAgTTAgMjAgSDQwIE0yMCAwIFYgNDAgTTEwIDAgViA0MCBNMzAgMCBWIDQwIiBzdHJva2U9IiMwMDcwZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4yIiBmaWxsPSJub25lIi8+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0iIzAwN2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjIiLz48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIiBmaWxsPSIjMDA3ZmZmIiBmaWxsLW9wYWNpdHk9IjAuMiIvPjxyZWN0IHg9IjE4IiB5PSIxOCIgd2lkdGg9IjQiIGhlaWdodD0iNCIgZmlsbD0iI2UzMGExNyIgZmlsbC1vcGFjaXR5PSIwLjMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')",
                  backgroundSize: "80px 80px" 
                }}></div>
                
                {/* Dönen Devre Efekti */}
                <motion.div
                  className="absolute inset-0 opacity-5"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 180, 
                    repeat: Infinity,
                    ease: "linear" 
                  }}
                  style={{ 
                    backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgMTQwIDE0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDBINDAgVjQwIEgwIHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMTAgMEwzMCAyME00MCAxMEwyMCAzME0xMCA0MEwzMCAyME00MCAxMEwyMCAzMCIgc3Ryb2tlPSIjMDA3MGZmIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjUiIHN0cm9rZT0iI2UzMGExNyIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjMiIGZpbGw9Im5vbmUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIiBmaWxsPSJ1cmwoI2EpIi8+PHBhdGggZD0iTTcwIDBMNzAgMTQwTTAgNzBIMTQwIiBzdHJva2U9IiNlMzBhMTciIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4yIi8+PGNpcmNsZSBjeD0iNzAiIGN5PSI3MCIgcj0iNDAiIHN0cm9rZT0iI2UzMGExNyIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2Utb3BhY2l0eT0iMC4yIiBmaWxsPSJub25lIi8+PC9zdmc+')",
                    backgroundSize: "140px 140px"
                  }}
                ></motion.div>
                
                {/* Türk yıldız motifi overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full relative">
                    {[...Array(8)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="absolute"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          width: `${Math.random() * 20 + 10}px`,
                          height: `${Math.random() * 20 + 10}px`,
                        }}
                        animate={{
                          opacity: [0.3, 0.7, 0.3],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 3 + Math.random() * 5,
                          repeat: Infinity,
                          delay: Math.random() * 5,
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                            fill="#e30a17" fillOpacity="0.5" />
                        </svg>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Başlık - Daha büyük ve canlı */}
                <div className="relative bg-gradient-to-r from-black/60 via-red-900/30 to-black/60 backdrop-blur-sm py-4 px-4 sm:px-6 rounded-full mb-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border-2 border-red-600/30">
                  <h1 className="font-bold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-red-600 via-white to-red-500 text-transparent bg-clip-text text-center tracking-tight text-4xl-responsive readable-text">
                    CUMHURİYET GÜNCELLENİYOR
                  </h1>
                </div>
              </div>
            </motion.div>
            
            <div className="flex flex-col items-center justify-center mb-8">
              {/* İlerleme çubuğu - Mobil uyumlu */}
              <div className="my-12 relative w-full">
                {/* Mobil görünüm için bilgi kartları */}
                <div className="md:hidden flex justify-between mb-6 px-2">
                  <div className="bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg border border-red-500/30 shadow-[0_0_10px_rgba(220,38,38,0.1)]">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center">
                        <div className="h-2 w-2 bg-white rounded-full animate-pulse mr-1.5"></div>
                        <h4 className="font-medium text-white text-[10px]">GENEL KATILIM</h4>
                      </div>
                      <motion.div 
                        className="text-lg font-bold text-white mt-1"
                        animate={{ opacity: [1, 0.9, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        8.523.912
                      </motion.div>
                      <div className="text-[9px] text-gray-400">Vatandaş</div>
                    </div>
                  </div>
                  
                  <div className="bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg border border-red-500/30 shadow-[0_0_10px_rgba(220,38,38,0.1)]">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center">
                        <div className="h-2 w-2 bg-white rounded-full animate-pulse mr-1.5"></div>
                        <h4 className="font-medium text-white text-[10px]">TOPLAM BAĞIŞ</h4>
                      </div>
                      <motion.div 
                        className="text-lg font-bold text-red-500 mt-1"
                        animate={{ opacity: [1, 0.9, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ₺7.514.892
                      </motion.div>
                      <div className="text-[9px] text-gray-400">Medeniyet için</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center items-center relative">
                  {/* SOL TARAF - GENEL KATILIM (Masaüstü görünüm) */}
                  <div className="hidden md:block absolute left-0 -translate-x-[105%] bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg border border-red-500/30 shadow-[0_0_10px_rgba(220,38,38,0.1)]">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center">
                        <div className="h-2 w-2 bg-white rounded-full animate-pulse mr-1.5"></div>
                        <h4 className="font-medium text-white text-[10px]">GENEL KATILIM</h4>
                      </div>
                      <motion.div 
                        className="text-lg font-bold text-white mt-1"
                        animate={{ opacity: [1, 0.9, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        8.523.912
                      </motion.div>
                      <div className="text-[9px] text-gray-400">Vatandaş</div>
                    </div>
                  </div>
                  
                  {/* SAĞ TARAF - TOPLAM BAĞIŞ (Masaüstü görünüm) */}
                  <div className="hidden md:block absolute right-0 translate-x-[105%] bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg border border-red-500/30 shadow-[0_0_10px_rgba(220,38,38,0.1)]">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center">
                        <div className="h-2 w-2 bg-white rounded-full animate-pulse mr-1.5"></div>
                        <h4 className="font-medium text-white text-[10px]">TOPLAM BAĞIŞ</h4>
                      </div>
                      <motion.div 
                        className="text-lg font-bold text-red-500 mt-1"
                        animate={{ opacity: [1, 0.9, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ₺7.514.892
                      </motion.div>
                      <div className="text-[9px] text-gray-400">Medeniyet için yetecek kadar</div>
                    </div>
                  </div>
                  
                  <div className="w-full max-w-xs md:max-w-sm lg:w-96 h-8 relative">
                    {/* Arka plan çizgi */}
                    <div className="absolute w-full h-1.5 bg-gradient-to-r from-gray-700/60 via-gray-700/80 to-gray-700/60 rounded-full backdrop-blur-sm top-1/2 -translate-y-1/2"></div>
                    
                    {/* İlerleme göstergesi */}
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-full flex items-center"
                      initial={{ x: "-50%" }}
                      animate={{ x: ["0%", "100%", "0%"] }}
                      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {/* Hareket eden ışık topu */}
                      <div className="relative">
                        <div className="absolute -inset-1 bg-white/30 blur-md rounded-full"></div>
                        <div className="h-4 w-4 bg-white rounded-full relative shadow-[0_0_10px_rgba(255,255,255,0.7)]"></div>
                      </div>
                    </motion.div>
                    
                    {/* Yüzde işaretleri */}
                    <div className="absolute -bottom-6 left-0 text-xs text-red-500/80 font-medium">0%</div>
                    <div className="absolute -bottom-6 left-1/4 text-xs text-white/60 font-medium hidden sm:block">25%</div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-red-500/80 font-medium">50%</div>
                    <div className="absolute -bottom-6 left-3/4 text-xs text-white/60 font-medium hidden sm:block">75%</div>
                    <div className="absolute -bottom-6 right-0 text-xs text-red-500/80 font-medium">100%</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto px-5 sm:px-8 py-6 bg-gradient-to-b from-black/70 to-red-950/20 backdrop-blur-sm rounded-2xl border border-red-600/20 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 blur-md"></div>
                  <h3 className="text-base sm:text-xl font-medium text-white relative z-10 bg-black/50 px-6 py-2 rounded-full border border-red-500/20 text-xl-responsive readable-text enhanced-text">
                    Dijital Platformla Halk Güncelleme Süreci
                  </h3>
                </div>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-5 mt-4">
                <div className="text-center group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br from-black/80 to-red-900/30 flex items-center justify-center border border-red-500/30 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:border-red-500/60 group-hover:shadow-red-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h5 className="text-sm sm:text-base text-white font-medium mb-1 transition-all duration-300 group-hover:text-red-400">
                    Akıl
                  </h5>
                  <p className="text-[10px] sm:text-xs text-gray-400 transition-all duration-300 group-hover:text-gray-300">Mantıksal Analiz</p>
                </div>
                
                <div className="text-center group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br from-black/80 to-red-900/30 flex items-center justify-center border border-red-500/30 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:border-red-500/60 group-hover:shadow-red-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h5 className="text-sm sm:text-base text-white font-medium mb-1 transition-all duration-300 group-hover:text-red-400">
                    Bilim
                  </h5>
                  <p className="text-[10px] sm:text-xs text-gray-400 transition-all duration-300 group-hover:text-gray-300">Teknolojik Gelişim</p>
                </div>
                
                <div className="text-center group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br from-black/80 to-red-900/30 flex items-center justify-center border border-red-500/30 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:border-red-500/60 group-hover:shadow-red-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h5 className="text-sm sm:text-base text-white font-medium mb-1 transition-all duration-300 group-hover:text-red-400">
                    Vicdan
                  </h5>
                  <p className="text-[10px] sm:text-xs text-gray-400 transition-all duration-300 group-hover:text-gray-300">Etik Değerler</p>
                </div>
                
                <div className="text-center group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br from-black/80 to-red-900/30 flex items-center justify-center border border-red-500/30 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:border-red-500/60 group-hover:shadow-red-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h5 className="text-sm sm:text-base text-white font-medium mb-1 transition-all duration-300 group-hover:text-red-400">
                    Fen
                  </h5>
                  <p className="text-[10px] sm:text-xs text-gray-400 transition-all duration-300 group-hover:text-gray-300">İnovasyonel Atılım</p>
                </div>
                
                <div className="text-center group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br from-black/80 to-red-900/30 flex items-center justify-center border border-red-500/30 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:border-red-500/60 group-hover:shadow-red-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 group-hover:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <h5 className="text-sm sm:text-base text-white font-medium mb-1 transition-all duration-300 group-hover:text-red-400">
                    Sanat
                  </h5>
                  <p className="text-[10px] sm:text-xs text-gray-400 transition-all duration-300 group-hover:text-gray-300">Kültürel İfade</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Ülke Seçimleri */}
          <motion.div 
            className="mb-12 w-full max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="bg-gradient-to-b from-black/70 to-gray-900/60 backdrop-blur-md rounded-xl p-4 sm:p-8 text-center mb-8 sm:mb-12 shadow-[0_8px_30px_rgba(0,0,0,0.25)] border border-gray-800 hover:border-red-500/40 transition-all duration-300 relative overflow-hidden">
              {/* Alt kısımdaki kırmızı çizgi */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
              
              {/* Üst kısımdaki teknolojik aksanlar */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-40">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full text-red-500/30" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a4 4 0 0 0 4 4"></path>
                  <path d="M12 2a4 4 0 1 1-4 4"></path>
                  <path d="M12 22a4 4 0 0 0 4-4"></path>
                  <path d="M12 22a4 4 0 1 1-4-4"></path>
                </svg>
              </div>
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-white text-3xl-responsive readable-text high-contrast-text">TÜRKİYE</h3>
              <p className="text-white/80 mb-6 sm:mb-8 text-lg sm:text-xl tracking-wide font-light text-lg-responsive readable-text">Toplumsal Yenileme Merkezi</p>
              
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button 
                  className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-red-900/80 hover:to-black text-white py-4 sm:py-6 text-xl sm:text-2xl shadow-lg font-medium tracking-wider border border-gray-700 hover:border-red-500/50 rounded-md"
                  onClick={() => navigate("/turkiye")}
                >
                  <span className="mr-2 text-red-500">&#x2192;</span> Türkiye Platformuna Giriş
                </Button>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-black/50 backdrop-blur-sm border border-gray-800 hover:border-red-500/40 rounded-lg p-4 text-center transition-all duration-300 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-red-600/50"></div>
                <h4 className="font-medium text-white text-base sm:text-lg mb-3 sm:mb-4">GÖREVLER</h4>
                <Button 
                  variant="outline"
                  className="w-full border border-gray-700 text-white hover:border-red-500/50 hover:bg-black/60 py-3 sm:py-4 text-base font-medium"
                  onClick={() => navigate("/gorevler")}
                >
                  <span className="text-red-500 mr-1">&#8594;</span> Giriş
                </Button>
              </div>
              
              <div className="bg-black/50 backdrop-blur-sm border border-gray-800 hover:border-blue-500/40 rounded-lg p-4 text-center transition-all duration-300 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-600/50"></div>
                <h4 className="font-medium text-white text-base sm:text-lg mb-3 sm:mb-4">KATILIM</h4>
                <Button 
                  variant="outline"
                  className="w-full border border-gray-700 text-white hover:border-blue-500/50 hover:bg-black/60 py-3 sm:py-4 text-base font-medium"
                  onClick={() => navigate("/katil")}
                >
                  <span className="text-blue-500 mr-1">&#8594;</span> Giriş
                </Button>
              </div>
              
              <div className="bg-black/50 backdrop-blur-sm border border-gray-800 hover:border-green-500/40 rounded-lg p-4 text-center transition-all duration-300 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-green-600/50"></div>
                <h4 className="font-medium text-white text-base sm:text-lg mb-3 sm:mb-4">SERTİFİKA</h4>
                <Button 
                  variant="outline"
                  className="w-full border border-gray-700 text-white hover:border-green-500/50 hover:bg-black/60 py-3 sm:py-4 text-base font-medium"
                  onClick={() => navigate("/sertifika")}
                >
                  <span className="text-green-500 mr-1">&#8594;</span> Giriş
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Uluslararası İletişim */}
          <motion.div
            className="mb-12 w-full max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="bg-black/60 backdrop-blur-md border border-gray-800 hover:border-gray-600 rounded-lg p-5 sm:p-6 transition-all duration-300 shadow-lg relative overflow-hidden">
              {/* Teknolojik aksanlar */}
              <div className="absolute -right-12 -top-16 opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-40 h-40 text-blue-500" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a4.5 4.5 0 0 0 4.5 4.5"></path>
                  <path d="M12 2a4.5 4.5 0 0 1-4.5 4.5"></path>
                  <path d="M12 22a4.5 4.5 0 0 0 4.5-4.5"></path>
                  <path d="M12 22a4.5 4.5 0 0 1-4.5-4.5"></path>
                </svg>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-red-500 mr-3"></div>
                  <h3 className="text-xl sm:text-2xl text-white font-semibold">Uluslararası İletişim Ağı</h3>
                </div>
                
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button 
                    className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-blue-900/40 hover:to-black text-white py-4 sm:py-5 text-lg sm:text-xl rounded-md shadow-lg font-medium tracking-wide border border-gray-700 hover:border-blue-500/30"
                    onClick={() => navigate("/oppressed")}
                  >
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 text-blue-400">
                        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path>
                        <path d="M9 12h6"></path>
                        <path d="M12 9v6"></path>
                      </svg>
                      Uluslararası Platform Başvurusu
                    </div>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </ModernLayout>
    </>
  );
}