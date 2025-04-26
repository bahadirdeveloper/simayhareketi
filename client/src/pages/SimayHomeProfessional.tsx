import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import SimpleFuturisticTurkish from "@/components/SimpleFuturisticTurkish";
import LanguageSelector from "@/components/LanguageSelector";
import AudioControl from "@/components/AudioControl";
import LoadingScreen from "@/components/LoadingScreen";
import AccessibilityReader from "@/components/AccessibilityReader";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";

export default function SimayHomeProfessional() {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [, navigate] = useLocation();
  
  useEffect(() => {
    // Initialize audio system with home page soundtrack
    initAudio('home');
    
    // Record visitor stats
    const recordVisit = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: i18n.language || "tr",
            hasInteracted: false,
            page: "home"
          }
        );
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
  }, [i18n.language]);
  
  const handleToggleAudio = () => {
    playSoundtrack();
    
    // Record interaction
    const updateInteraction = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: i18n.language || "tr",
            hasInteracted: true,
            page: "home"
          }
        );
      } catch (error) {
        console.error("Failed to record interaction:", error);
      }
    };
    
    updateInteraction();
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  
  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <SimpleFuturisticTurkish />
        
        {/* Erişilebilirlik Okuyucu */}
        <AccessibilityReader 
          pageContent="Cumhuriyet Güncellenme Platformu ana sayfasına hoş geldiniz. Bu platformda Türkiye Cumhuriyeti'nin 2. Yüzyılına dair görevleri görebilir, Türk kültürü ve tarihi hakkında bilgi edinebilir, anayasa metinlerine ulaşabilirsiniz. Mevcut katılım sekiz milyon beş yüz yirmi üç bin dokuz yüz on iki vatandaştır. Toplam bağış miktarı yedi milyon beş yüz on dört bin sekiz yüz doksan iki Türk Lirasıdır. Sayfada Görevler, Katıl, Türkiye, Anayasa ve Çağrı bölümlerini ziyaret edebilirsiniz."
          pageName="home" 
        />
        
        {/* Türk Deseni Üstbilgi - Daha canlı bayrak renkleri */}
        <div className="w-full bg-gradient-to-r from-red-800/80 via-black/70 to-red-800/80 backdrop-blur-sm border-b border-white/40 py-3 z-20 absolute top-0 left-0 overflow-hidden shadow-lg">
          <div 
            className="h-10 w-full absolute top-0 left-0 opacity-25" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='20' viewBox='0 0 60 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5C35.5228 5 40 9.47715 40 15C40 20.5228 35.5228 25 30 25C24.4772 25 20 20.5228 20 15C20 9.47715 24.4772 5 30 5ZM30 8C26.134 8 23 11.134 23 15C23 18.866 26.134 22 30 22C33.866 22 37 18.866 37 15C37 11.134 33.866 8 30 8ZM30 11C32.2091 11 34 12.7909 34 15C34 17.2091 32.2091 19 30 19C27.7909 19 26 17.2091 26 15C26 12.7909 27.7909 11 30 11ZM0 15 L60 15 M30 0 L30 30' stroke='%23ffffff' fill='none' /%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat-x",
              backgroundSize: "60px 20px"
            }}
          />
          <div className="flex justify-between items-center container mx-auto px-4 sm:px-6">
            <div className="flex items-center group cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-700 relative flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white text-sm font-bold group-hover:scale-110 transition-transform duration-300">TR</span>
                </div>
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-white/60"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0, 0.7] 
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
              </div>
              <div className="ml-3 group-hover:translate-x-1 transition-transform duration-300">
                <p className="text-sm text-white font-bold tracking-wide">
                  Bu İcat Türk Yapımıdır
                </p>
                <p className="text-xs text-white/90 hidden md:block">
                  Akıl, Bilim, Fen ve Sanat
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-sm text-white/90 pr-3 border-r border-white/40 mr-3 font-medium">
                Cumhuriyet Güncellenme
              </p>
              <div className="bg-black/50 px-3 py-1 rounded-full text-white text-sm font-mono border border-white/20">
                v2.0
              </div>
            </div>
          </div>
        </div>
        
        <main className="container mx-auto px-4 z-10 relative flex flex-col items-center justify-center min-h-screen pt-20">
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
                  <h1 className="font-bold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-red-600 via-white to-red-500 text-transparent bg-clip-text text-center tracking-tight">
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
                      <div className="text-[9px] text-gray-400">Medeniyet için yetecek kadar.</div>
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
            
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 bg-gradient-to-b from-black/60 to-red-950/30 backdrop-blur-sm rounded-lg border border-red-600/30 shadow-[0_0_15px_rgba(220,38,38,0.15)]">
              <p className="text-gray-300 leading-relaxed text-base sm:text-lg mb-4 text-center">
                Dijital Platformla Halk Güncelleme Süreci
              </p>
              
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4 mt-2">
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 rounded-full bg-red-900/40 flex items-center justify-center border border-red-500/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.25v-3.5m8 8h-3.5m-11 0H2m11 8v-3.5m4.4-10.4l-2.5 2.5m-11 11l2.5-2.5m11 0l-2.5-2.5M6.5 8.3l-2.5-2.5" />
                    </svg>
                  </div>
                  <h4 className="text-red-500 font-medium text-sm sm:text-base">AKIL</h4>
                  <p className="text-[8px] xs:text-xs text-gray-400 hidden sm:block">Mantıksal Düşünce</p>
                </div>
                
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 rounded-full bg-blue-900/40 flex items-center justify-center border border-blue-500/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="2" />
                      <path d="M12 2v2" />
                      <path d="M12 20v2" />
                      <path d="M20 12h2" />
                      <path d="M2 12h2" />
                      <path d="M19.07 4.93l-1.41 1.41" />
                      <path d="M6.34 17.66l-1.41 1.41" />
                      <path d="M19.07 19.07l-1.41-1.41" />
                      <path d="M6.34 6.34l-1.41-1.41" />
                      <circle cx="12" cy="12" r="8" strokeDasharray="1 2" />
                    </svg>
                  </div>
                  <h4 className="text-white font-medium text-sm sm:text-base">BİLİM</h4>
                  <p className="text-[8px] xs:text-xs text-gray-400 hidden sm:block">Kanıta Dayalı</p>
                </div>
                
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 rounded-full bg-yellow-900/40 flex items-center justify-center border border-yellow-500/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h4 className="text-red-500 font-medium text-sm sm:text-base">VİCDAN</h4>
                  <p className="text-[8px] xs:text-xs text-gray-400 hidden sm:block">Ahlaki Duyarlılık</p>
                </div>
                
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 rounded-full bg-green-900/40 flex items-center justify-center border border-green-500/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h4 className="text-white font-medium text-sm sm:text-base">FEN</h4>
                  <p className="text-[8px] xs:text-xs text-gray-400 hidden sm:block">Teknik Gelişim</p>
                </div>
                
                <div className="text-center sm:col-span-1 col-span-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 rounded-full bg-purple-900/40 flex items-center justify-center border border-purple-500/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-red-500 font-medium text-sm sm:text-base">SANAT</h4>
                  <p className="text-[8px] xs:text-xs text-gray-400 hidden sm:block">Kültürel İfade</p>
                </div>
              </div>
              
              {/* Modern başlık çubuğu - Görseldeki tasarımdan esinlenildi */}
              <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-900/90 to-black/90 backdrop-blur-md border-b border-red-900/50 shadow-lg">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-b from-red-600 to-red-700 border border-red-500/70 mr-3">
                      <span className="text-white text-xs font-bold">TR</span>
                    </div>
                    <div className="text-white text-sm font-medium">Bu İcat Türk Yapımıdır</div>
                  </div>
                  <div className="text-white/80 text-sm">Cumhuriyet Güncellenme</div>
                  <div className="px-3 py-1 bg-black/60 rounded-full border border-gray-700 text-white/90 text-xs">v2.0</div>
                </div>
              </div>
              
              {/* Metni sayfanın içeriğine taşıdım */}
              <div className="max-w-md mx-auto text-xs text-gray-300 leading-relaxed mt-4 mb-6 turkish-content-bg p-3 border border-gray-800">
                <p className="mb-2">
                  "23 Nisan 2025'te, Mustafa Kemal Atatürk ve atalarımızın yaktığı ışığın peşinden yürüyerek bu yolu açtık.
                  Geçmişin öğrettiklerini unutmadık, geleceğin yükünü omuzladık."
                </p>
                <p className="mb-2">
                  "Bu iş, bir avuç insanın değil, yüz yıllık bir inancın eseridir."
                </p>
                <p>
                  "İsteyen elini uzatsın, isteyen göğsünü gere gere sahiplensin:
                  <span className="text-red-400 font-medium block mt-1">Bu umut, bu mücadele, bu icat; bu toprakların evlatlarınındır!</span>"
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Ülke Seçimleri */}
          <motion.div 
            className="mb-12 w-full max-w-2xl"
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
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-white">TÜRKİYE</h3>
              <p className="text-white/80 mb-6 sm:mb-8 text-lg sm:text-xl tracking-wide font-light">Toplumsal Yenileme Merkezi</p>
              
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
              
              <div className="mt-4 flex justify-center">
                <div className="inline-flex items-center text-xs text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Akıl, bilim ve sanat ile geleceğe
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-black/50 backdrop-blur-sm border border-gray-800 hover:border-red-500/40 rounded-lg p-4 text-center transition-all duration-300 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-red-600/50"></div>
                <h4 className="font-medium text-white text-base sm:text-lg mb-3 sm:mb-4">RUSYA</h4>
                <Button 
                  variant="outline"
                  className="w-full border border-gray-700 text-white hover:border-red-500/50 hover:bg-black/60 py-3 sm:py-4 text-base font-medium"
                  onClick={() => navigate("/russia")}
                >
                  <span className="text-red-500 mr-1">&#8594;</span> Giriş
                </Button>
              </div>
              
              <div className="bg-black/50 backdrop-blur-sm border border-gray-800 hover:border-blue-500/40 rounded-lg p-4 text-center transition-all duration-300 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-600/50"></div>
                <h4 className="font-medium text-white text-base sm:text-lg mb-3 sm:mb-4">İRAN</h4>
                <Button 
                  variant="outline"
                  className="w-full border border-gray-700 text-white hover:border-blue-500/50 hover:bg-black/60 py-3 sm:py-4 text-base font-medium"
                  onClick={() => navigate("/iran")}
                >
                  <span className="text-blue-500 mr-1">&#8594;</span> Giriş
                </Button>
              </div>
              
              <div className="bg-black/50 backdrop-blur-sm border border-gray-800 hover:border-green-500/40 rounded-lg p-4 text-center transition-all duration-300 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-green-600/50"></div>
                <h4 className="font-medium text-white text-base sm:text-lg mb-3 sm:mb-4">FİLİSTİN</h4>
                <Button 
                  variant="outline"
                  className="w-full border border-gray-700 text-white hover:border-green-500/50 hover:bg-black/60 py-3 sm:py-4 text-base font-medium"
                  onClick={() => navigate("/palestine")}
                >
                  <span className="text-green-500 mr-1">&#8594;</span> Giriş
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Uluslararası İletişim */}
          <motion.div
            className="mb-12 w-full max-w-2xl"
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
                
                <div className="mt-6 text-center pb-1">
                  <div className="mb-2 text-xs text-gray-400">Tercih ettiğiniz dil</div>
                  <LanguageSelector />
                </div>
              </div>
            </div>
          </motion.div>
          

          
          {/* Alt Bilgi */}
          <motion.div 
            className="text-center mt-6 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <div className="inline-flex items-center justify-center space-x-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-md border border-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-red-500">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8L12 12" />
                <path d="M12 16h.01" />
              </svg>
              <p className="text-xs text-gray-300 font-light tracking-wide">
                <span className="font-normal text-red-400">19 Mayıs 2025</span> • Cumhuriyetin Halk ile Güncellenme Yolculuğu
              </p>
            </div>
          </motion.div>
        </main>
        
        <AudioControl onToggle={handleToggleAudio} />
      </div>
    </>
  );
}