import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import SimpleBurningEarth from "@/components/SimpleBurningEarth";
import LanguageSelector from "@/components/LanguageSelector";
import AudioControl from "@/components/AudioControl";
import LoadingScreen from "@/components/LoadingScreen";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";

export default function SimayHomeProfessional() {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [, navigate] = useLocation();
  
  useEffect(() => {
    // Initialize audio system
    initAudio();
    
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
        <SimpleBurningEarth />
        
        {/* Türk Deseni Üstbilgi */}
        <div className="w-full bg-black/40 backdrop-blur-sm border-b border-amber-500/30 py-2 z-20 absolute top-0 left-0 overflow-hidden">
          <div 
            className="h-10 w-full absolute top-0 left-0 opacity-20" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='20' viewBox='0 0 80 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 17c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm20 0c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zM30 0h20v20H30V0zm10 17c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zM50 0h20v20H50V0zm10 17c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zM70 0h20v20H70V0zM80 17c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z' fill='%23e3a008' fill-opacity='0.7' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat-x"
            }}
          />
          <div className="flex justify-between items-center container mx-auto px-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-red-600 relative flex items-center justify-center">
                <div className="absolute w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs">TR</span>
                </div>
              </div>
              <p className="text-xs ml-2 text-amber-300 font-semibold tracking-wide">
                Bu İcat Türk Yapımıdır
              </p>
            </div>
            <p className="text-xs text-amber-400/80">Cumhuriyet Güncellemesi v2.0</p>
          </div>
        </div>
        
        <main className="container mx-auto px-4 z-10 relative flex flex-col items-center justify-center min-h-screen pt-14">
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
                <div className="absolute inset-0 opacity-10 bg-repeat" style={{ 
                  backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSIyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTNhMDA4IiBzdHJva2Utd2lkdGg9IjEuNSIvPjxjaXJjbGUgY3g9IjI1IiBjeT0iMjUiIHI9IjEwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlM2EwMDgiIHN0cm9rZS13aWR0aD0iMS41Ii8+PHBhdGggZD0iTTI1IDUgVjQ1IE01IDI1IEg0NSIgc3Ryb2tlPSIjZTNhMDA4IiBzdHJva2Utd2lkdGg9IjEuNSIvPjxwYXRoIGQ9Ik0xMi45MyAxMi45MyBMIDM3LjA3IDM3LjA3IE0zNy4wNyAxMi45MyBMIDEyLjkzIDM3LjA3IiBzdHJva2U9IiNlM2EwMDgiIHN0cm9rZS13aWR0aD0iMS41Ii8+PC9zdmc+')",
                  backgroundSize: "100px 100px" 
                }}></div>
                <h1 className="font-bold text-5xl md:text-7xl mb-6 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 text-transparent bg-clip-text relative">
                  CUMHURİYETİN GÜNCELLEME PLATFORMU
                </h1>
              </div>
            </motion.div>
            
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="relative">
                <motion.div 
                  className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full"
                  animate={{ 
                    opacity: [0.5, 0.8, 0.5],
                    scale: [0.8, 1.1, 0.8],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="relative z-10 text-2xl font-semibold bg-black/30 backdrop-blur-sm px-6 py-3 rounded-lg border border-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.3)] flex items-center justify-center">
                  <span className="mr-2 text-amber-300">
                    Cumhuriyet ile Güncelleniyoruz
                  </span>
                  <motion.span
                    className="text-green-400"
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

              <div className="flex justify-center items-center mt-5">
                <div className="relative w-80 h-8 flex items-center justify-center">
                  <div className="absolute w-full h-1 bg-gray-700/80 rounded-full backdrop-blur-sm"></div>
                  <motion.div 
                    className="absolute h-4 w-4 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.7)]"
                    initial={{ left: 0 }}
                    animate={{ left: "100%" }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut"
                    }}
                  />
                  <div className="absolute -bottom-5 left-0 text-xs text-gray-400">0%</div>
                  <div className="absolute -bottom-5 right-0 text-xs text-gray-400">100%</div>
                </div>
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto px-6 py-4 bg-black/40 backdrop-blur-sm rounded-lg border border-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.15)]">
              <p className="text-gray-300 leading-relaxed text-lg mb-4">
                Dijital Platformla Halk Güncelleme Süreci
              </p>
              
              <div className="grid grid-cols-4 gap-4 mt-2">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-red-900/40 flex items-center justify-center border border-red-500/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.25v-3.5m8 8h-3.5m-11 0H2m11 8v-3.5m4.4-10.4l-2.5 2.5m-11 11l2.5-2.5m11 0l-2.5-2.5M6.5 8.3l-2.5-2.5" />
                    </svg>
                  </div>
                  <h4 className="text-amber-400 font-medium">AKIL</h4>
                  <p className="text-xs text-gray-400">Mantıksal Düşünce</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-900/40 flex items-center justify-center border border-blue-500/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h4 className="text-amber-400 font-medium">BİLİM</h4>
                  <p className="text-xs text-gray-400">Kanıta Dayalı</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-green-900/40 flex items-center justify-center border border-green-500/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h4 className="text-amber-400 font-medium">FEN</h4>
                  <p className="text-xs text-gray-400">Teknik Gelişim</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-purple-900/40 flex items-center justify-center border border-purple-500/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-amber-400 font-medium">SANAT</h4>
                  <p className="text-xs text-gray-400">Kültürel İfade</p>
                </div>
              </div>
              
              <p className="text-center text-xs text-amber-300/70 mt-3 italic">
                "Bu icat Türk yapımıdır."
              </p>
            </div>
          </motion.div>
          
          {/* Ülke Seçimleri */}
          <motion.div 
            className="mb-16 w-full max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="bg-black/50 backdrop-blur-md border border-amber-500 rounded-xl p-8 text-center hover:border-amber-400 transition-all duration-300 mb-12 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-300 to-amber-500 text-transparent bg-clip-text">TÜRKİYE</h3>
              <p className="text-gray-300 mb-6 text-lg">Toplumsal Yenileme Merkezi</p>
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button 
                  className="w-full bg-gradient-to-r from-red-700 to-amber-600 hover:from-amber-600 hover:to-red-700 text-white py-6 text-xl shadow-lg"
                  onClick={() => navigate("/turkiye")}
                >
                  Türkiye Platformuna Giriş
                </Button>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/40 backdrop-blur-sm border border-blue-500/70 rounded-lg p-4 text-center transition-all duration-300 hover:bg-black/50 hover:border-blue-400">
                <h4 className="font-medium text-blue-400 mb-2">İRAN</h4>
                <Button 
                  variant="outline"
                  className="w-full border-blue-500 text-blue-400 hover:bg-blue-900/30"
                  onClick={() => navigate("/iran")}
                >
                  Giriş
                </Button>
              </div>
              
              <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/70 rounded-lg p-4 text-center transition-all duration-300 hover:bg-black/50 hover:border-yellow-400">
                <h4 className="font-medium text-yellow-400 mb-2">ALMANYA</h4>
                <Button 
                  variant="outline"
                  className="w-full border-yellow-500 text-yellow-400 hover:bg-yellow-900/30"
                  onClick={() => navigate("/germany")}
                >
                  Giriş
                </Button>
              </div>
              
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/70 rounded-lg p-4 text-center transition-all duration-300 hover:bg-black/50 hover:border-green-400">
                <h4 className="font-medium text-green-400 mb-2">FİLİSTİN</h4>
                <Button 
                  variant="outline"
                  className="w-full border-green-500 text-green-400 hover:bg-green-900/30"
                  onClick={() => navigate("/palestine")}
                >
                  Giriş
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Susturulmuş Halklar */}
          <motion.div
            className="mb-12 w-full max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="bg-black/50 backdrop-blur-md border border-purple-500/70 rounded-xl p-5 hover:border-purple-400/80 transition-all duration-300 shadow-[0_0_15px_rgba(147,51,234,0.2)]">
              <h3 className="text-xl text-purple-300 mb-3 font-medium">Uluslararası İletişim Ağı</h3>
              
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button 
                  className="w-full bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-600 hover:to-purple-800 text-white py-5 text-lg rounded-lg shadow-md"
                  onClick={() => navigate("/oppressed")}
                >
                  Uluslararası Platform Başvurusu
                </Button>
              </motion.div>
              
              <div className="mt-6 text-center pb-1">
                <LanguageSelector />
              </div>
            </div>
          </motion.div>
          
          {/* Alt Bilgi */}
          <motion.div 
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <div className="inline-block bg-black/40 backdrop-blur-sm px-6 py-3 rounded-full border border-amber-500/30">
              <p className="text-sm text-gray-300 font-medium">
                19 Mayıs 2025 - Cumhuriyetin Halk ile Güncellenme Yolculuğu
              </p>
            </div>
          </motion.div>
        </main>
        
        <AudioControl onToggle={handleToggleAudio} />
      </div>
    </>
  );
}