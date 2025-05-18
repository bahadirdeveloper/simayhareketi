import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
// No icons needed for formal appearance
import { ModernTechButton } from "@/components/ModernTechButton";
import AudioControl from "@/components/AudioControl";
import LoadingScreen from "@/components/LoadingScreen";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";

// Dil seçim listesi
const languages = [
  { code: "tr", name: "Türkçe", nativeName: "Türkçe", flag: "🇹🇷" },
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
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
    i18n.changeLanguage(langCode);
    
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
    
    // Navigate to home page
    navigate("/home");
  };

  const handleToggleAudio = () => {
    playSoundtrack();
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      
      <div className="min-h-screen text-white relative overflow-x-hidden bg-gradient-to-b from-gray-950 via-black to-black">
        {/* Gizli YouTube iframe */}
        <div style={{ 
          position: 'fixed',
          bottom: '-1000px',
          right: '-1000px',
          width: '100px',
          height: '100px',
          opacity: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: -1
        }}>
          <iframe
            id="youtube-player"
            width="100" 
            height="100" 
            src="about:blank"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>

        {/* Background grid pattern */}
        
        {/* Subtle digital noise texture */}
        <div className="absolute inset-0 bg-noise opacity-5 z-0"></div>
        
        {/* Reduced grid pattern for better performance */}
        <div className="absolute inset-0 opacity-5 z-0">
          {[...Array(10)].map((_, i) => (
            <div 
              key={`grid-h-${i}`} 
              className="absolute w-full h-[0.5px] bg-red-500" 
              style={{ top: `${i * 10}%` }} 
            />
          ))}
          
          {[...Array(10)].map((_, i) => (
            <div 
              key={`grid-v-${i}`} 
              className="absolute h-full w-[0.5px] bg-red-500" 
              style={{ left: `${i * 10}%` }} 
            />
          ))}
        </div>
        
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
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-12"
              >
                <div className="inline-block px-3 py-1 bg-red-950/20 border border-red-500/30 rounded-sm mb-4 shadow-[0_2px_8px_rgba(220,38,38,0.1)]">
                  <span className="text-xs font-medium text-red-400 tracking-widest uppercase">Türkiye Cumhuriyeti</span>
                </div>
                <h1 className="text-5xl-responsive font-bold text-red-500 mb-6">
                  CUMHURİYET GÜNCELLENİYOR
                </h1>
              </motion.div>
              
              {/* Language Selection Title */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-10"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    {/* Ses butonu */}
                    <button 
                      onClick={() => {
                        try {
                          // Mevcut ses oynatıcısını temizle
                          const existingAudio = document.getElementById('turkish-anthem-player');
                          if (existingAudio) {
                            existingAudio.remove();
                          }
                          
                          // Yeni ses oynatıcısı oluştur
                          const audioPlayer = document.createElement('audio');
                          audioPlayer.id = 'turkish-anthem-player';
                          audioPlayer.src = '/audio/anasayfa.mp3';
                          audioPlayer.loop = true;
                          audioPlayer.volume = 0.7;
                          
                          // Ses oynatıcısını gizle
                          audioPlayer.style.display = 'none';
                          document.body.appendChild(audioPlayer);
                          
                          // Ses çalma işlemi
                          const playPromise = audioPlayer.play();
                          
                          if (playPromise !== undefined) {
                            playPromise
                              .then(() => {
                                console.log("✅ Müzik başarıyla çalınıyor");
                              })
                              .catch((error) => {
                                console.error("❌ Müzik çalınamadı, YouTube ile devam ediliyor", error);
                                
                                // Yedek plan: YouTube
                                const youtubeContainer = document.createElement('div');
                                youtubeContainer.id = 'youtube-container';
                                youtubeContainer.style.position = 'fixed';
                                youtubeContainer.style.bottom = '0';
                                youtubeContainer.style.right = '0';
                                youtubeContainer.style.width = '1px';
                                youtubeContainer.style.height = '1px';
                                youtubeContainer.style.visibility = 'hidden';
                                youtubeContainer.style.pointerEvents = 'none';
                                
                                youtubeContainer.innerHTML = `
                                  <iframe 
                                    id="youtube-player" 
                                    width="1" 
                                    height="1" 
                                    src="https://www.youtube.com/embed/Y75Km7dlt94?autoplay=1&mute=0" 
                                    allow="autoplay" 
                                    frameborder="0"
                                  ></iframe>
                                `;
                                
                                document.body.appendChild(youtubeContainer);
                                console.log("YouTube oynatıcı yedek olarak başlatıldı");
                              });
                          }
                        } catch (error) {
                          console.error("Ses sistemi hata verdi:", error);
                        }
                      }}
                      className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-red-700 to-red-900 rounded-full shadow-lg mb-3 hover:from-red-600 hover:to-red-800 transition-all duration-300 cursor-pointer"
                      aria-label="Müzik çal"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5.14v14l11-7-11-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <h2 className="text-3xl-responsive font-semibold text-white mb-4">Dil Seçiniz</h2>
                <p className="text-lg-responsive text-gray-400 max-w-lg mx-auto">
                  Cumhuriyet Güncellenme Platformuna hoş geldiniz. Lütfen tercih ettiğiniz dili seçin.
                </p>
              </motion.div>
              
              {/* Language Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10"
              >
                {languages.map((language, index) => (
                  <motion.div
                    key={language.code}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  >
                    <div 
                      className="mobile-card bg-black/50 backdrop-blur-sm border border-red-900/30 rounded-xl p-5 cursor-pointer hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1 touch-target"
                      onClick={() => handleLanguageSelect(language.code)}
                    >
                      <div className="text-3xl mb-3">{language.flag}</div>
                      <h3 className="text-xl-responsive font-semibold text-white mb-1">{language.nativeName}</h3>
                      <div className="text-base-responsive text-gray-400">{language.name}</div>
                    </div>
                  </motion.div>
                ))}
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
              
              {/* Footer Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-16"
              >
                <div className="inline-flex items-center bg-black/60 backdrop-blur-sm border border-red-500/40 rounded-full px-6 py-4 shadow-[0_4px_15px_rgba(220,38,38,0.12)]">
                  <div className="h-4 w-4 rounded-full bg-red-500 mr-4 animate-pulse"></div>
                  <p className="text-base-responsive text-gray-200 font-medium tracking-wide">
                    19 Mayıs 2025 - Cumhuriyetin Halk ile Güncellenme Yolculuğu
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </main>
        
        {/* Ses kontrolünü kaldırdık */}
      </div>
    </>
  );
}
