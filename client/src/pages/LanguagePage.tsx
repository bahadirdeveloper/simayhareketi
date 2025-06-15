import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";

import AudioControl from "@/components/AudioControl";
import GlobalTranslator from "@/components/GlobalTranslator";
import LoadingScreen from "@/components/LoadingScreen";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { scrollToTop } from "@/lib/navigation";
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
    scrollToTop();
    
    try {
      console.log("Audio initialization started for language page...");
      initAudio('home');
      
      const playTimer = setTimeout(() => {
        console.log("Forcing audio playback...");
        playSoundtrack();
      }, 500);
      
    } catch (error) {
      console.error("Audio initialization failed:", error);
    }
    
    const recordVisit = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: i18n.language || "tr",
            page: "language-selector",
            hasInteracted: false
          }
        );
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [i18n.language]);

  const handleLanguageSelect = async (langCode: string) => {
    if (langCode !== i18n.language) {
      await i18n.changeLanguage(langCode);
      localStorage.setItem('selectedLanguage', langCode);
    }
    
    try {
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
    navigate("/turkiye");
  };

  const handleToggleAudio = () => {
    playSoundtrack();
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      
      <div className="min-h-screen text-white relative bg-gradient-to-b from-gray-950 via-black to-black main-content scroll-optimized mobile-viewport-fix gpu-accelerated stable-transform ultra-stable no-motion">
        <audio
          id="background-music"
          preload="none"
          className="hidden"
          autoPlay={false}
          loop={true}
        />

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
        
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent z-0"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent z-0"></div>
            
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 relative flex flex-col items-center justify-center min-h-screen py-8 sm:py-12 nav-stable no-layout-shift mobile-nav-optimized ultra-stable no-motion">
          <div className="w-full max-w-4xl mx-auto text-center ultra-stable no-motion">
            {/* Hero Section */}
            <div className="mb-8 sm:mb-12 ultra-stable no-motion">
              <div className="relative mb-6 sm:mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent rounded-2xl blur-2xl"></div>
                <h1 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent tracking-tight leading-tight">
                  HOŞ GELDİNİZ
                </h1>
              </div>
              
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 font-light leading-relaxed max-w-3xl mx-auto px-4">
                Ezilen Halkların Dijital Dayanışma Platformu
              </p>
              
              <div className="bg-gradient-to-r from-red-950/30 via-black/50 to-red-950/30 border border-red-500/30 rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-xl shadow-[0_25px_70px_rgba(239,68,68,0.2)] max-w-2xl mx-auto">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-white">
                  Türkiye Dijital Koordinasyon Merkezi
                </h2>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                  Türk milletinin dijital birlik platformuna katılın. Halk iradesi, 
                  ulusal değerler ve dayanışma ruhuyla geleceğimizi inşa ediyoruz.
                </p>
              </div>
            </div>

            {/* Language Selection */}
            <div className="mb-8 sm:mb-12 ultra-stable no-motion">
              <div className="bg-black/40 border border-red-500/30 rounded-2xl p-6 sm:p-8 md:p-10 backdrop-blur-xl shadow-[0_20px_60px_rgba(239,68,68,0.2)] max-w-lg mx-auto">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white text-center">
                  Dil Seçimi
                </h3>
                
                <div className="space-y-3 sm:space-y-4">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageSelect(language.code)}
                      className="w-full p-4 sm:p-5 bg-gradient-to-r from-red-600/20 via-red-700/30 to-red-600/20 border-2 border-red-500/50 rounded-xl text-white font-semibold text-base sm:text-lg hover:from-red-600/30 hover:via-red-700/40 hover:to-red-600/30 hover:border-red-400/70 transition-all duration-300 shadow-[0_10px_30px_rgba(239,68,68,0.2)] hover:shadow-[0_15px_40px_rgba(239,68,68,0.4)] transform hover:scale-105 ultra-stable no-motion"
                    >
                      <div className="flex items-center justify-center space-x-3">
                        <span className="text-2xl sm:text-3xl">{language.flag}</span>
                        <span className="font-black tracking-wide">{language.nativeName}</span>
                      </div>
                    </button>
                  ))}
                </div>
                
                <p className="text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6 text-center leading-relaxed">
                  Platform şu anda Türkçe olarak hizmet vermektedir
                </p>
              </div>
            </div>

            {/* Platform Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 ultra-stable no-motion">
              <div className="bg-black/30 border border-red-500/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🌍</div>
                <h4 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 text-white">Global Dayanışma</h4>
                <p className="text-gray-400 text-xs sm:text-sm">Ezilen halkların birliği</p>
              </div>
              
              <div className="bg-black/30 border border-red-500/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🔐</div>
                <h4 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 text-white">Güvenli Platform</h4>
                <p className="text-gray-400 text-xs sm:text-sm">Şifreli iletişim sistemi</p>
              </div>
              
              <div className="bg-black/30 border border-red-500/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">⚡</div>
                <h4 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 text-white">Hızlı Koordinasyon</h4>
                <p className="text-gray-400 text-xs sm:text-sm">Gerçek zamanlı organizasyon</p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center ultra-stable no-motion">
              <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed px-4">
                Bu platform, Türk milletinin dijital dayanışma ağıdır. 
                Halk iradesini güçlendirmek ve ulusal birliğimizi korumak için tasarlanmıştır.
              </p>
              
              <div className="inline-flex items-center space-x-2 text-red-400 text-xs sm:text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full ultra-stable no-motion"></div>
                <span>Platformu kullanmaya başlamak için dil seçimi yapın</span>
                <div className="w-2 h-2 bg-red-500 rounded-full ultra-stable no-motion"></div>
              </div>
            </div>
          </div>
        </main>

        {/* Audio Control */}
        <div className="fixed bottom-4 left-4 z-40 ultra-stable no-motion">
          <AudioControl onToggle={handleToggleAudio} />
        </div>

        {/* Global Translator */}
        <GlobalTranslator />
      </div>
    </>
  );
}