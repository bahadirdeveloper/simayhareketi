import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
// No icons needed for formal appearance
import { ModernTechButton } from "@/components/ModernTechButton";
import AudioControl from "@/components/AudioControl";
import GlobalTranslator from "@/components/GlobalTranslator";
import LoadingScreen from "@/components/LoadingScreen";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";

// Dil seçim listesi - sadece Türkçe
const languages = [
  { code: "tr", name: "Türkçe", nativeName: "Türkçe", flag: "🇹🇷" },
];

export default function LanguagePage() {
  const { i18n, t } = useTranslation();
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize audio system with immediate playback
    try {
      console.log("Audio initialization started for language page...");
      initAudio('home');
      
      // Küçük bir gecikme ile ses çalmayı zorla
      const playTimer = setTimeout(() => {
        console.log("Forcing audio playback...");
        playSoundtrack();
      }, 500);
      
    } catch (error) {
      console.error("Audio initialization failed:", error);
    }
    
    // Record visit
    const recordVisit = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: i18n.language || "tr",
            hasInteracted: false
          }
        );
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
    
    // 1.5 saniye sonra yükleme ekranını kapat
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => {
      clearTimeout(timer);
    };
  }, [i18n.language]);

  const handleLanguageSelect = (langCode: string) => {
    // Seçilen dili hem uygulamada hem de yerel depolamada ayarla
    i18n.changeLanguage(langCode);
    localStorage.setItem('userLanguage', langCode);
    
    // Kullanıcı etkileşimi ile direkt ses çalma (tarayıcı kısıtlamalarını aşar)
    try {
      console.log("Attempting to play audio directly");
      
      // Direkt DOM elemanını kullanarak çal
      const audioElement = document.getElementById("background-music") as HTMLAudioElement;
      if (audioElement) {
        audioElement.volume = 0.3;
        audioElement.play()
          .then(() => {
            console.log("Audio started successfully");
          })
          .catch(err => {
            console.error("Audio play failed:", err);
          });
      }
    } catch (error) {
      console.error("Audio play error:", error);
    }
    
    // Record selected language
    const recordLanguageSelection = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: langCode,
            hasInteracted: true
          }
        );
      } catch (error) {
        console.error("Failed to record language selection:", error);
      }
    };
    
    recordLanguageSelection();
    
    // Dil seçimine göre ana sayfa yönlendirmesi
    navigate("/turkiye");
  };

  const handleToggleAudio = () => {
    playSoundtrack();
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      
      <div className="min-h-screen text-white relative overflow-x-hidden bg-gradient-to-b from-gray-950 via-black to-black">
        {/* Optimized audio element */}
        <audio
          id="background-music"
          preload="none"
          className="hidden"
          autoPlay={false}
          loop={true}
        />

        {/* Optimized grid pattern with CSS */}
        <div 
          className="absolute inset-0 opacity-5 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(239, 68, 68, 0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(239, 68, 68, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '10% 10%'
          }}
        />
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent z-0"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent z-0"></div>
            
        <main className="container mx-auto px-4 z-10 relative flex flex-col items-center justify-center min-h-screen py-12">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-4xl mx-auto text-center"
            >
              {/* Enhanced Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mb-16"
              >
                {/* National Badge */}
                <motion.div 
                  className="inline-block px-6 py-3 bg-gradient-to-r from-red-950/40 via-red-900/50 to-red-950/40 border-2 border-red-500/40 rounded-xl mb-8 shadow-[0_8px_32px_rgba(220,38,38,0.2)] backdrop-blur-lg"
                  whileHover={{ scale: 1.05, borderColor: "rgba(239, 68, 68, 0.6)" }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-sm font-bold text-red-400 tracking-[0.2em] uppercase flex items-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-3 animate-pulse"></div>
                    Türkiye Cumhuriyeti
                    <div className="w-2 h-2 bg-red-400 rounded-full ml-3 animate-pulse"></div>
                  </span>
                </motion.div>

                {/* Main Title with Enhanced Typography */}
                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <span className="bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-[0_4px_8px_rgba(239,68,68,0.3)]">
                    CUMHURİYET
                  </span>
                  <br />
                  <motion.span 
                    className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  >
                    GÜNCELLENİYOR
                  </motion.span>
                </motion.h1>

                {/* Subtitle with Animated Elements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="max-w-3xl mx-auto mb-8"
                >
                  <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed font-light tracking-wide">
                    Halkın sesi, adaletin rehberi, geleceğin mimarı
                  </p>
                  <div className="flex items-center justify-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-red-500 rounded-full mx-1"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5] 
                        }}
                        transition={{ 
                          duration: 2, 
                          delay: i * 0.2, 
                          repeat: Infinity 
                        }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Stats Counter */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-8"
                >
                  {[
                    { number: "101", label: "Aktif Görev" },
                    { number: "24/7", label: "Platform Aktif" },
                    { number: "∞", label: "Halkın Gücü" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <motion.div 
                        className="text-3xl sm:text-4xl font-bold text-red-400 mb-2"
                        animate={{ 
                          textShadow: [
                            "0 0 10px rgba(239, 68, 68, 0.5)",
                            "0 0 20px rgba(239, 68, 68, 0.8)",
                            "0 0 10px rgba(239, 68, 68, 0.5)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {stat.number}
                      </motion.div>
                      <div className="text-sm text-gray-400 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
              
              {/* Enhanced Language Selection Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="mb-12"
              >
                {/* Interactive Music Player */}
                <motion.div 
                  className="flex items-center justify-center mb-8"
                  whileHover={{ scale: 1.05 }}
                >
                  <a 
                    href="https://www.youtube.com/shorts/XOkvNPN1VJ8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="relative w-24 h-24 flex items-center justify-center bg-gradient-to-br from-red-700 via-red-600 to-red-900 rounded-full shadow-[0_20px_40px_rgba(239,68,68,0.4)] hover:shadow-[0_25px_50px_rgba(239,68,68,0.6)] transition-all duration-500 border-2 border-red-500/50">
                      <motion.svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-10 w-10 text-white ml-1" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <path d="M8 5.14v14l11-7-11-7z" />
                      </motion.svg>
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
                    </div>
                  </a>
                </motion.div>

                {/* Section Title */}
                <motion.h2 
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                >
                  <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    Platformu Seçin
                  </span>
                </motion.h2>
                
                {/* Enhanced Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  className="max-w-2xl mx-auto text-center"
                >
                  <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6">
                    Demokratik katılım, şeffaf yönetim ve halkın gücüne dayalı 
                    <span className="text-red-400 font-semibold"> dijital cumhuriyet </span>
                    deneyimine başlayın
                  </p>
                  
                  {/* Feature highlights */}
                  <div className="flex flex-wrap justify-center gap-4">
                    {[
                      "🗳️ Demokratik Katılım",
                      "🔍 Mali Şeffaflık", 
                      "🌍 Global Erişim"
                    ].map((feature, index) => (
                      <motion.span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-full text-sm text-gray-300 border border-gray-700/50 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                        whileHover={{ scale: 1.05, borderColor: "rgba(239, 68, 68, 0.5)" }}
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Enhanced Platform Selection Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12"
              >
                {/* Main Turkish Platform Card */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 2.2 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div 
                    className="relative h-80 cursor-pointer group overflow-hidden rounded-2xl bg-gradient-to-br from-red-900/80 via-red-800/80 to-orange-900/80 border-2 border-red-500/40 backdrop-blur-xl shadow-[0_20px_40px_rgba(239,68,68,0.3)] hover:shadow-[0_25px_50px_rgba(239,68,68,0.5)] transition-all duration-500"
                    onClick={() => handleLanguageSelect('tr')}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
                    </div>
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                      <motion.div 
                        className="text-8xl mb-6"
                        animate={{ 
                          rotate: [0, 2, -2, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        🇹🇷
                      </motion.div>
                      
                      <h3 className="text-4xl font-black text-white mb-4 group-hover:text-red-200 transition-colors duration-300">
                        TÜRKİYE
                      </h3>
                      
                      <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                        Ana Platform
                      </p>
                      
                      <div className="flex items-center space-x-2 text-sm text-red-300">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>Şimdi Aktif</span>
                      </div>
                      
                      {/* Arrow indicator */}
                      <motion.div
                        className="absolute bottom-6 right-6"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <svg className="w-6 h-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Add Country Card */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 2.4 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div 
                    className="relative h-80 cursor-pointer group overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-black/80 border-2 border-dashed border-red-500/40 hover:border-red-500/70 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_rgba(239,68,68,0.3)] transition-all duration-500"
                    onClick={() => navigate("/ulke-ekle")}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(255,255,255,.1)_50%,transparent_65%)] bg-[length:20px_20px]"></div>
                    </div>
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                      <motion.div 
                        className="text-6xl mb-6 text-red-400"
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        transition={{ duration: 0.3 }}
                      >
                        ➕
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-300 transition-colors duration-300">
                        ÜLKE EKLE
                      </h3>
                      
                      <p className="text-base text-gray-400 mb-6 leading-relaxed">
                        Ezilmiş Halkların<br/>
                        Başvuru Platformu
                      </p>
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span>Global Destek</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Direct Turkish Entry */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6"
              >
                <ModernTechButton
                  variant="turkish"
                  size="lg"
                  glow="strong"
                  border="glowing"
                  className="btn-mobile-optimized py-6 px-8 text-lg-responsive font-bold tracking-wide"
                  onClick={() => handleLanguageSelect("tr")}
                >
                  HEMEN TÜRKÇE İLE DEVAM ET
                </ModernTechButton>
              </motion.div>
              
              {/* Modern Status Banner */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.6 }}
                className="mt-20"
              >
                <div className="relative max-w-3xl mx-auto">
                  {/* Glow background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 blur-xl rounded-full"></div>
                  
                  {/* Main banner */}
                  <div className="relative bg-gradient-to-r from-black/80 via-gray-900/90 to-black/80 backdrop-blur-xl border-2 border-red-500/50 rounded-2xl px-8 py-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                    <div className="flex items-center justify-center space-x-6">
                      {/* Status indicator with animation */}
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                          <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75"></div>
                        </div>
                        <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">CANLI</span>
                      </div>
                      
                      {/* Divider */}
                      <div className="w-px h-8 bg-gradient-to-b from-transparent via-red-500/50 to-transparent"></div>
                      
                      {/* Main text */}
                      <div className="text-center">
                        <motion.p 
                          className="text-xl sm:text-2xl font-bold text-white mb-1"
                          animate={{ 
                            textShadow: [
                              "0 0 10px rgba(255,255,255,0.3)",
                              "0 0 20px rgba(255,255,255,0.5)",
                              "0 0 10px rgba(255,255,255,0.3)"
                            ]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          19 Mayıs 2025
                        </motion.p>
                        <p className="text-gray-300 text-sm sm:text-base tracking-wide">
                          Cumhuriyetin Halk ile Güncellenme Yolculuğu
                        </p>
                      </div>
                      
                      {/* Divider */}
                      <div className="w-px h-8 bg-gradient-to-b from-transparent via-red-500/50 to-transparent"></div>
                      
                      {/* User count */}
                      <div className="text-center">
                        <motion.div 
                          className="text-2xl font-bold text-green-400 mb-1"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ∞
                        </motion.div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">
                          Aktif Katılımcı
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="mt-4 relative">
                      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-red-500"
                          animate={{ 
                            x: ["-100%", "100%"],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                          }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent h-1 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </main>
        
        {/* Global Translation System */}
        <GlobalTranslator />
      </div>
    </>
  );
}
