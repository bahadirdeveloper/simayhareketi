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
    initAudio('turkiye');
  }, []);
  
  const navigateToPage = (path: string) => {
    navigateWithScrollReset(navigate, path);
  };
  
  const handleToggleAudio = () => {
    try {
      playSoundtrack();
      setIsAudioPlaying(prev => !prev);
    } catch (error) {
      console.log('Audio toggle failed:', error);
    }
  };
  
  return (
    <ModernLayout 
      audioKey="turkiye" 
      showBackButton={true}
      pageContent="Türkiye sayfasına hoş geldiniz. Bu sayfa Türkiye Cumhuriyeti'nin dijital koordinasyon alanıdır. Genel katılım istatistikleri yarın güncellenecektir. Sayfada TÜRK Nedir, Anayasalarımız, Görev Diriliş ve Halk Defteri & Manifestolar bölümlerine erişebilirsiniz. Türk, atasının mirasına sahip çıkamazsa, geleceğini başka milletlerin insafına bırakır."
      pageName="Türkiye"
    >
      <div className="w-full max-w-7xl mx-auto static-container">
        
        {/* Clean Hero Section */}
        <div className="relative mb-20 static-container">
          <div className="bg-gray-900 border-2 border-gray-700 rounded-2xl p-12 text-center static-container">
            
            {/* Flag */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-red-700 rounded-xl flex items-center justify-center text-4xl border-2 border-red-600">
                🇹🇷
              </div>
            </div>
            
            {/* Title */}
            <div className="mb-12">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                TÜRKİYE
              </h1>
              <div className="w-32 h-1 bg-red-500 mx-auto rounded-full"></div>
            </div>
            
            {/* Quote */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-gray-800 border border-gray-600 rounded-xl p-8">
                <p className="text-xl md:text-2xl font-light text-white mb-6 italic">
                  "Türk, atasının mirasına sahip çıkamazsa,<br />
                  geleceğini başka milletlerin insafına bırakır."
                </p>
                <div className="text-right">
                  <span className="text-red-400 font-medium">— MUSTAFA KEMAL ATATÜRK</span>
                </div>
              </div>
            </div>
            
            {/* Audio Control */}
            <div className="flex justify-center">
              <button
                className="px-8 py-3 bg-red-700 border-2 border-red-600 rounded-xl hover:bg-red-600 transition-colors static-container"
                onClick={handleToggleAudio}
              >
                <div className="flex items-center gap-3">
                  {isAudioPlaying 
                    ? <Pause className="h-5 w-5 text-white" /> 
                    : <Play className="h-5 w-5 text-white ml-0.5" />
                  }
                  <span className="text-white font-medium">
                    {isAudioPlaying ? "MÜZIK DURDUR" : "TÜRK MÜZİĞİ"}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Stable Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 static-container">
          
          {/* TÜRK NEDİR */}
          <ModernTechButton
            onClick={() => navigateToPage("/turknedir")}
            className="group relative rounded-2xl bg-red-900 border-2 border-red-600 hover:border-red-500 transition-all duration-500 h-56 static-container"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
            <div className="relative h-full flex flex-col justify-end p-6 z-10">
              <div className="mb-4">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-5 h-5 bg-white rounded"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-200 transition-colors">TÜRK NEDİR?</h3>
                <p className="text-red-200 text-sm opacity-90">Kimlik, tarih ve değerlerimiz</p>
              </div>
              <div className="w-full h-1 bg-red-500 rounded-full"></div>
            </div>
          </ModernTechButton>

          {/* ANAYASALARIMIZ */}
          <ModernTechButton
            onClick={() => navigateToPage("/anayasalar")}
            className="group relative rounded-2xl bg-blue-900 border-2 border-blue-600 hover:border-blue-500 transition-all duration-500 h-56 static-container"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
            <div className="relative h-full flex flex-col justify-end p-6 z-10">
              <div className="mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-5 h-5 bg-white rounded"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">ANAYASALARIMIZ</h3>
                <p className="text-blue-200 text-sm opacity-90">Hukuk ve adalet sistemi</p>
              </div>
              <div className="w-full h-1 bg-blue-500 rounded-full"></div>
            </div>
          </ModernTechButton>

          {/* MANİFESTO */}
          <ModernTechButton
            onClick={() => navigateToPage("/halk-manifestolar")}
            className="group relative rounded-2xl bg-purple-900 border-2 border-purple-600 hover:border-purple-500 transition-all duration-500 h-56 static-container"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
            <div className="relative h-full flex flex-col justify-end p-6 z-10">
              <div className="mb-4">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-5 h-5 bg-white rounded"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">MANİFESTO</h3>
                <p className="text-purple-200 text-sm opacity-90">Gelecek vizyonu ve idealler</p>
              </div>
              <div className="w-full h-1 bg-purple-500 rounded-full"></div>
            </div>
          </ModernTechButton>

          {/* ÇAĞRI */}
          <ModernTechButton
            onClick={() => navigateToPage("/cagri")}
            className="group relative rounded-2xl bg-orange-900 border-2 border-orange-600 hover:border-orange-500 transition-all duration-500 h-56 static-container"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
            <div className="relative h-full flex flex-col justify-end p-6 z-10">
              <div className="mb-4">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-5 h-5 bg-white rounded"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-200 transition-colors">ÇAĞRI</h3>
                <p className="text-orange-200 text-sm opacity-90">Güçlü mesajlar ve çağrılar</p>
              </div>
              <div className="w-full h-1 bg-orange-500 rounded-full"></div>
            </div>
          </ModernTechButton>

          {/* KATIL */}
          <ModernTechButton
            onClick={() => navigateToPage("/katil")}
            className="group relative rounded-2xl bg-green-900 border-2 border-green-600 hover:border-green-500 transition-all duration-500 h-56 static-container"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
            <div className="relative h-full flex flex-col justify-end p-6 z-10">
              <div className="mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-5 h-5 bg-white rounded"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-200 transition-colors">KATIL</h3>
                <p className="text-green-200 text-sm opacity-90">Birlik ve dayanışma</p>
              </div>
              <div className="w-full h-1 bg-green-500 rounded-full"></div>
            </div>
          </ModernTechButton>

          {/* 100 GÖREV */}
          <ModernTechButton
            onClick={() => navigateToPage("/gorevler")}
            className="group relative rounded-2xl bg-yellow-900 border-2 border-yellow-600 hover:border-yellow-500 transition-all duration-500 h-56 static-container"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
            <div className="relative h-full flex flex-col justify-end p-6 z-10">
              <div className="mb-4">
                <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-5 h-5 bg-white rounded"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-200 transition-colors">100 GÖREV</h3>
                <p className="text-yellow-200 text-sm opacity-90">Stratejik hedefler</p>
              </div>
              <div className="w-full h-1 bg-yellow-500 rounded-full"></div>
            </div>
          </ModernTechButton>

        </div>

        {/* Stable Values Section */}
        <div className="mb-20 static-container">
          <div className="bg-gray-900 border-2 border-gray-700 rounded-2xl p-12 static-container">
            
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                TÜRK DEĞERLERİ
              </h2>
              <div className="w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 static-container">
              {turkishValueIds.map((valueId, index) => {
                const valueTexts: Record<string, string> = {
                  'milli': 'MİLLİ',
                  'muasir': 'MUASIR',
                  'laik': 'LAİK',
                  'demokratik': 'DEMOKRATİK',
                  'sosyal': 'SOSYAL'
                };
                
                const bgColors = [
                  'bg-red-800',
                  'bg-blue-800', 
                  'bg-green-800',
                  'bg-purple-800',
                  'bg-orange-800'
                ];

                const borderColors = [
                  'border-red-600',
                  'border-blue-600', 
                  'border-green-600',
                  'border-purple-600',
                  'border-orange-600'
                ];

                const iconColors = [
                  'bg-red-600',
                  'bg-blue-600', 
                  'bg-green-600',
                  'bg-purple-600',
                  'bg-orange-600'
                ];

                const lineColors = [
                  'bg-red-500',
                  'bg-blue-500', 
                  'bg-green-500',
                  'bg-purple-500',
                  'bg-orange-500'
                ];
                
                return (
                  <div key={valueId} className="static-container">
                    <div className={`${bgColors[index]} border-2 ${borderColors[index]} rounded-xl p-6 h-40 flex flex-col justify-center items-center transition-all duration-300 hover:scale-105 static-container`}>
                      
                      <div className={`w-12 h-12 ${iconColors[index]} rounded-lg flex items-center justify-center mb-4`}>
                        <div className="w-6 h-6 bg-white rounded"></div>
                      </div>
                      
                      <div className="text-center">
                        <h3 className="text-base font-bold text-white mb-2">
                          {valueTexts[valueId]}
                        </h3>
                        <div className={`w-8 h-0.5 ${lineColors[index]} mx-auto rounded-full`}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Global Translation System */}
        <GlobalTranslator />
      </div>
    </ModernLayout>
  );
}