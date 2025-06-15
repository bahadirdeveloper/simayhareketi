import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import ModernLayout from "@/components/ModernLayout";
import { ModernTechButton } from "@/components/ModernTechButton";
import { Play, Pause } from "lucide-react";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { navigateWithScrollReset } from "@/lib/navigation";
import NavButtons from "@/components/NavButtons";
import TurkishValueCard from "@/components/TurkishValueCard";
import GlobalTranslator from "@/components/GlobalTranslator";

// Turkish values defined by the translation system
const turkishValueIds = ['milli', 'muasir', 'laik', 'demokratik', 'sosyal'];

export default function TurkiyePage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
  useEffect(() => {
    // Ses sistemini başlat
    initAudio('turkiye');
  }, []);
  
  // Use global navigation helper
  const navigateToPage = (path: string) => {
    navigateWithScrollReset(navigate, path);
  };
  
  // Ses çalma/durdurma işlemini yönet
  const handleToggleAudio = () => {
    playSoundtrack();
    setIsAudioPlaying(!isAudioPlaying);
  };
  
  return (
    <ModernLayout 
      audioKey="turkiye" 
      showBackButton={true}
      pageContent="Türkiye sayfasına hoş geldiniz. Bu sayfa Türkiye Cumhuriyeti'nin dijital koordinasyon alanıdır. Genel katılım istatistikleri yarın güncellenecektir. Sayfada TÜRK Nedir, Anayasalarımız, Görev Diriliş ve Halk Defteri & Manifestolar bölümlerine erişebilirsiniz. Türk, atasının mirasına sahip çıkamazsa, geleceğini başka milletlerin insafına bırakır."
      pageName="Türkiye"
    >
      <div className="w-full max-w-6xl mx-auto static-container">
        {/* Hero Section - Güzel Tasarım */}
        <div className="relative rounded-3xl overflow-hidden mb-16 static-container">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-orange-600/15 to-red-600/10 rounded-3xl"></div>
          <div className="relative bg-gradient-to-br from-black/95 via-red-950/30 to-black/95 border-2 border-red-500/50 rounded-3xl static-container">
            
            {/* Top Accent */}
            <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-t-3xl"></div>
            
            <div className="relative z-10 py-12 sm:py-20 px-4 sm:px-10 lg:px-16 text-center static-container">
              {/* Flag Icon */}
              <div className="inline-block mb-6 sm:mb-10">
                <div className="w-20 h-20 sm:w-32 sm:h-32 mx-auto text-4xl sm:text-7xl border-2 sm:border-4 border-red-500/60 rounded-xl sm:rounded-2xl flex items-center justify-center bg-gradient-to-br from-black/80 to-red-950/40 static-container">
                  🇹🇷
                </div>
              </div>
              
              {/* Quote Section */}
              <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-black/80 via-black/60 to-black/80 rounded-xl sm:rounded-2xl p-6 sm:p-12 border border-red-500/40 sm:border-2 static-container">
                  <p className="text-xl sm:text-3xl md:text-5xl font-bold leading-relaxed text-center mb-6 sm:mb-10">
                    <span className="bg-gradient-to-r from-red-400 via-orange-500 to-red-400 bg-clip-text text-transparent">
                      "TÜRK, ATASININ MİRASINA<br />
                      SAHİP ÇIKAMAZSA, GELECEĞİNİ<br />
                      BAŞKA MİLLETLERİN İNSAFINA BIRAKIR."
                    </span>
                  </p>
                  
                  {/* Attribution */}
                  <div className="text-center">
                    <p className="text-red-400 text-lg sm:text-xl font-semibold tracking-wider">
                      - Atatürk -
                    </p>
                  </div>
                  
                  {/* Audio Control Button */}
                  <div className="flex justify-center mt-8 sm:mt-12">
                    <button
                      className="relative px-8 py-4 rounded-2xl border-2 border-red-500/60 bg-gradient-to-br from-black/80 to-red-950/40 flex items-center justify-center gap-3 text-white font-semibold static-container"
                      onClick={handleToggleAudio}
                    >
                      {isAudioPlaying 
                        ? <Pause className="h-6 w-6 text-white" /> 
                        : <Play className="h-6 w-6 text-white ml-0.5" />
                      }
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-16 static-container">
          {/* TÜRK Nedir Button */}
          <div className="static-container">
            <ModernTechButton
              onClick={() => navigateToPage("/turknedir")}
              className="w-full h-32 bg-gradient-to-br from-black/90 via-red-950/50 to-black/90 border-2 border-red-500/50 rounded-2xl static-container"
            >
              <div className="text-center px-2 py-4 h-full flex flex-col justify-center">
                <div className="text-sm font-bold text-white mb-2 leading-tight">
                  TÜRK NEDİR?
                </div>
                <div className="text-red-400 text-xs opacity-80">
                  Detaylar
                </div>
              </div>
            </ModernTechButton>
          </div>

          {/* Anayasalarımız Button */}
          <div className="static-container">
            <ModernTechButton
              onClick={() => navigateToPage("/anayasalar")}
              className="w-full h-32 bg-gradient-to-br from-black/90 via-blue-950/50 to-black/90 border-2 border-blue-500/50 rounded-2xl static-container"
            >
              <div className="text-center px-2 py-4 h-full flex flex-col justify-center">
                <div className="text-sm font-bold text-white mb-2 leading-tight">
                  ANAYASALARIMIZ
                </div>
                <div className="text-blue-400 text-xs opacity-80">
                  Anayasa & Kanunlar
                </div>
              </div>
            </ModernTechButton>
          </div>

          {/* Manifesto Button */}
          <div className="static-container">
            <ModernTechButton
              onClick={() => navigateToPage("/halk-manifestolar")}
              className="w-full h-32 bg-gradient-to-br from-black/90 via-purple-950/50 to-black/90 border-2 border-purple-500/50 rounded-2xl static-container"
            >
              <div className="text-center px-2 py-4 h-full flex flex-col justify-center">
                <div className="text-sm font-bold text-white mb-2 leading-tight">
                  MANİFESTO
                </div>
                <div className="text-purple-400 text-xs opacity-80">
                  Halk Manifestoları
                </div>
              </div>
            </ModernTechButton>
          </div>

          {/* Çağrı Button */}
          <div className="static-container">
            <ModernTechButton
              onClick={() => navigateToPage("/cagri")}
              className="w-full h-32 bg-gradient-to-br from-black/90 via-orange-950/50 to-black/90 border-2 border-orange-500/50 rounded-2xl static-container"
            >
              <div className="text-center px-2 py-4 h-full flex flex-col justify-center">
                <div className="text-sm font-bold text-white mb-2 leading-tight">
                  ÇAĞRI
                </div>
                <div className="text-orange-400 text-xs opacity-80">
                  Halk Çağrısı
                </div>
              </div>
            </ModernTechButton>
          </div>

          {/* Katıl Button */}
          <div className="static-container">
            <ModernTechButton
              onClick={() => navigateToPage("/katil")}
              className="w-full h-32 bg-gradient-to-br from-black/90 via-green-950/50 to-black/90 border-2 border-green-500/50 rounded-2xl static-container"
            >
              <div className="text-center px-2 py-4 h-full flex flex-col justify-center">
                <div className="text-sm font-bold text-white mb-2 leading-tight">
                  KATIL
                </div>
                <div className="text-green-400 text-xs opacity-80">
                  Katılım Formu
                </div>
              </div>
            </ModernTechButton>
          </div>

          {/* 100 Görev Diriliş Button */}
          <div className="static-container">
            <ModernTechButton
              onClick={() => navigateToPage("/gorevler")}
              className="w-full h-32 bg-gradient-to-br from-black/90 via-yellow-950/50 to-black/90 border-2 border-yellow-500/50 rounded-2xl static-container"
            >
              <div className="text-center px-2 py-4 h-full flex flex-col justify-center">
                <div className="text-sm font-bold text-white mb-2 leading-tight">
                  100 GÖREV
                </div>
                <div className="text-yellow-400 text-xs opacity-80">
                  Diriliş Görevleri
                </div>
              </div>
            </ModernTechButton>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16 static-container">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-orange-600/10 to-red-600/5 rounded-3xl"></div>
            <div className="relative bg-gradient-to-br from-black/90 via-red-950/20 to-black/90 border-2 border-red-500/40 rounded-3xl p-12 static-container">
              
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-500">
                Türk Değerleri
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8 static-container">
                {turkishValueIds.map((valueId, index) => {
                  // Define custom text for each value to ensure proper display
                  const valueTexts: Record<string, string> = {
                    'milli': 'MİLLİ',
                    'muasir': 'MUASIR',
                    'laik': 'LAİK',
                    'demokratik': 'DEMOKRATİK',
                    'sosyal': 'SOSYAL'
                  };
                  
                  return (
                    <TurkishValueCard
                      key={valueId}
                      valueId={valueId}
                      title={valueTexts[valueId]}
                      index={index}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Global Translation System */}
        <GlobalTranslator />
      </div>
    </ModernLayout>
  );
}