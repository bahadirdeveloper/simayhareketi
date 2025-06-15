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
        {/* Futuristic Hero Section */}
        <div className="relative mb-16 static-container">
          {/* Tech Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          </div>
          
          {/* Main Container */}
          <div className="relative bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-gray-700/50 rounded-xl static-container">
            
            {/* Top Tech Line */}
            <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
            
            {/* Content */}
            <div className="relative px-8 py-12 text-center static-container">
              
              {/* Flag Icon - Minimal */}
              <div className="mb-8">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-600/50 flex items-center justify-center text-3xl static-container">
                  🇹🇷
                </div>
              </div>
              
              {/* Modern Title */}
              <div className="mb-8">
                <h1 className="text-4xl md:text-6xl font-light tracking-wide mb-2">
                  <span className="text-white font-extralight">TÜRKİYE</span>
                </h1>
                <div className="w-16 h-px bg-red-500 mx-auto"></div>
              </div>
              
              {/* Quote - Tech Style */}
              <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/30 rounded-lg p-6 static-container">
                  <p className="text-lg md:text-xl font-light leading-relaxed text-gray-300 mb-4">
                    "Türk, atasının mirasına sahip çıkamazsa,<br />
                    geleceğini başka milletlerin insafına bırakır."
                  </p>
                  <div className="text-right">
                    <span className="text-red-400 text-sm font-medium tracking-wider">— ATATÜRK</span>
                  </div>
                </div>
              </div>
              
              {/* Tech Audio Control */}
              <div className="flex justify-center">
                <button
                  className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600/50 rounded-lg hover:border-red-500/50 transition-all duration-300 static-container"
                  onClick={handleToggleAudio}
                >
                  {isAudioPlaying 
                    ? <Pause className="h-5 w-5 text-white" /> 
                    : <Play className="h-5 w-5 text-white ml-0.5" />
                  }
                  <span className="text-white text-sm font-medium">
                    {isAudioPlaying ? "DURDUR" : "MÜZIK"}
                  </span>
                  <div className="w-1 h-1 bg-red-500 rounded-full opacity-60"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Navigation Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-16 static-container">
          {/* TÜRK Nedir */}
          <ModernTechButton
            onClick={() => navigateToPage("/turknedir")}
            className="h-24 bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-lg hover:border-red-500/50 transition-all duration-300 static-container"
          >
            <div className="text-center p-3">
              <div className="text-sm font-medium text-white mb-1">TÜRK NEDİR?</div>
              <div className="w-8 h-px bg-red-500/70 mx-auto"></div>
            </div>
          </ModernTechButton>

          {/* Anayasalarımız */}
          <ModernTechButton
            onClick={() => navigateToPage("/anayasalar")}
            className="h-24 bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-lg hover:border-blue-500/50 transition-all duration-300 static-container"
          >
            <div className="text-center p-3">
              <div className="text-sm font-medium text-white mb-1">ANAYASALARIMIZ</div>
              <div className="w-8 h-px bg-blue-500/70 mx-auto"></div>
            </div>
          </ModernTechButton>

          {/* Manifesto */}
          <ModernTechButton
            onClick={() => navigateToPage("/halk-manifestolar")}
            className="h-24 bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-lg hover:border-purple-500/50 transition-all duration-300 static-container"
          >
            <div className="text-center p-3">
              <div className="text-sm font-medium text-white mb-1">MANİFESTO</div>
              <div className="w-8 h-px bg-purple-500/70 mx-auto"></div>
            </div>
          </ModernTechButton>

          {/* Çağrı */}
          <ModernTechButton
            onClick={() => navigateToPage("/cagri")}
            className="h-24 bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-lg hover:border-orange-500/50 transition-all duration-300 static-container"
          >
            <div className="text-center p-3">
              <div className="text-sm font-medium text-white mb-1">ÇAĞRI</div>
              <div className="w-8 h-px bg-orange-500/70 mx-auto"></div>
            </div>
          </ModernTechButton>

          {/* Katıl */}
          <ModernTechButton
            onClick={() => navigateToPage("/katil")}
            className="h-24 bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-lg hover:border-green-500/50 transition-all duration-300 static-container"
          >
            <div className="text-center p-3">
              <div className="text-sm font-medium text-white mb-1">KATIL</div>
              <div className="w-8 h-px bg-green-500/70 mx-auto"></div>
            </div>
          </ModernTechButton>

          {/* 100 Görev */}
          <ModernTechButton
            onClick={() => navigateToPage("/gorevler")}
            className="h-24 bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-lg hover:border-yellow-500/50 transition-all duration-300 static-container"
          >
            <div className="text-center p-3">
              <div className="text-sm font-medium text-white mb-1">100 GÖREV</div>
              <div className="w-8 h-px bg-yellow-500/70 mx-auto"></div>
            </div>
          </ModernTechButton>
        </div>

        {/* Tech Values Section */}
        <div className="mb-16 static-container">
          <div className="bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-gray-700/50 rounded-xl p-8 static-container">
            
            {/* Modern Title */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-4">
                <span className="text-white">TÜRK DEĞERLERİ</span>
              </h2>
              <div className="w-24 h-px bg-red-500 mx-auto"></div>
            </div>
            
            {/* Tech Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 static-container">
              {turkishValueIds.map((valueId, index) => {
                const valueTexts: Record<string, string> = {
                  'milli': 'MİLLİ',
                  'muasir': 'MUASIR',
                  'laik': 'LAİK',
                  'demokratik': 'DEMOKRATİK',
                  'sosyal': 'SOSYAL'
                };
                
                const colors = [
                  'red-500',
                  'blue-500', 
                  'green-500',
                  'purple-500',
                  'orange-500'
                ];
                
                return (
                  <div key={valueId} className="static-container">
                    <div className={`bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700/40 hover:border-${colors[index]}/50 rounded-lg p-6 h-32 flex flex-col justify-center items-center transition-all duration-300 static-container`}>
                      
                      {/* Value Icon */}
                      <div className={`w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-800 rounded border border-${colors[index]}/40 flex items-center justify-center mb-3`}>
                        <div className={`w-2 h-2 bg-${colors[index]} rounded-full`}></div>
                      </div>
                      
                      {/* Value Name */}
                      <div className="text-center">
                        <h3 className="text-sm font-medium text-white mb-1">
                          {valueTexts[valueId]}
                        </h3>
                        <div className={`w-6 h-px bg-${colors[index]}/60 mx-auto`}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tech Additional Pages */}
        <div className="mb-16 static-container">
          <div className="bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-gray-700/50 rounded-xl p-8 static-container">
            
            {/* Modern Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-light tracking-wide mb-4">
                <span className="text-white">DİĞER SAYFALAR</span>
              </h2>
              <div className="w-20 h-px bg-blue-500 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 static-container">
              {/* Halk Defteri */}
              <ModernTechButton
                onClick={() => navigateToPage("/halk-defteri")}
                className="h-20 bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700/40 hover:border-cyan-500/50 rounded-lg transition-all duration-300 static-container"
              >
                <div className="text-center p-2">
                  <div className="text-xs font-medium text-white mb-1">HALK DEFTERİ</div>
                  <div className="w-6 h-px bg-cyan-500/60 mx-auto"></div>
                </div>
              </ModernTechButton>

              {/* Görev Davet */}
              <ModernTechButton
                onClick={() => navigateToPage("/gorev-davet")}
                className="h-20 bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700/40 hover:border-indigo-500/50 rounded-lg transition-all duration-300 static-container"
              >
                <div className="text-center p-2">
                  <div className="text-xs font-medium text-white mb-1">GÖREV DAVET</div>
                  <div className="w-6 h-px bg-indigo-500/60 mx-auto"></div>
                </div>
              </ModernTechButton>

              {/* Kurucu Eksikleri */}
              <ModernTechButton
                onClick={() => navigateToPage("/kurucu-eksikleri")}
                className="h-20 bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700/40 hover:border-pink-500/50 rounded-lg transition-all duration-300 static-container"
              >
                <div className="text-center p-2">
                  <div className="text-xs font-medium text-white mb-1">KURUCU EKSİKLERİ</div>
                  <div className="w-6 h-px bg-pink-500/60 mx-auto"></div>
                </div>
              </ModernTechButton>

              {/* Amaç Savaş */}
              <ModernTechButton
                onClick={() => navigateToPage("/amac-savas")}
                className="h-20 bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700/40 hover:border-rose-500/50 rounded-lg transition-all duration-300 static-container"
              >
                <div className="text-center p-2">
                  <div className="text-xs font-medium text-white mb-1">AMAÇ SAVAŞ</div>
                  <div className="w-6 h-px bg-rose-500/60 mx-auto"></div>
                </div>
              </ModernTechButton>

              {/* Sertifika */}
              <ModernTechButton
                onClick={() => navigateToPage("/sertifika")}
                className="h-20 bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700/40 hover:border-emerald-500/50 rounded-lg transition-all duration-300 static-container"
              >
                <div className="text-center p-2">
                  <div className="text-xs font-medium text-white mb-1">SERTİFİKA</div>
                  <div className="w-6 h-px bg-emerald-500/60 mx-auto"></div>
                </div>
              </ModernTechButton>

              {/* Entegrasyon */}
              <ModernTechButton
                onClick={() => navigateToPage("/entegrasyon")}
                className="h-20 bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700/40 hover:border-teal-500/50 rounded-lg transition-all duration-300 static-container"
              >
                <div className="text-center p-2">
                  <div className="text-xs font-medium text-white mb-1">ENTEGRASYON</div>
                  <div className="w-6 h-px bg-teal-500/60 mx-auto"></div>
                </div>
              </ModernTechButton>

              {/* Halk Koordinasyon */}
              <ModernTechButton
                onClick={() => navigateToPage("/halk-koordinasyon")}
                className="h-20 bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700/40 hover:border-violet-500/50 rounded-lg transition-all duration-300 static-container"
              >
                <div className="text-center p-2">
                  <div className="text-xs font-medium text-white mb-1">KOORDINASYON</div>
                  <div className="w-6 h-px bg-violet-500/60 mx-auto"></div>
                </div>
              </ModernTechButton>

              {/* Birleşik Manifesto */}
              <ModernTechButton
                onClick={() => navigateToPage("/birlesik-manifesto")}
                className="h-20 bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700/40 hover:border-amber-500/50 rounded-lg transition-all duration-300 static-container"
              >
                <div className="text-center p-2">
                  <div className="text-xs font-medium text-white mb-1">B. MANİFESTO</div>
                  <div className="w-6 h-px bg-amber-500/60 mx-auto"></div>
                </div>
              </ModernTechButton>
            </div>
          </div>
        </div>

        {/* Tech International Section */}
        <div className="mb-16 static-container">
          <div className="bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-gray-700/50 rounded-xl p-8 static-container">
            
            {/* Modern Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-light tracking-wide mb-4">
                <span className="text-white">ULUSLARARASI DAYANIŞMA</span>
              </h2>
              <div className="w-20 h-px bg-green-500 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 static-container">
              {/* Russia */}
              <ModernTechButton
                onClick={() => navigateToPage("/russia")}
                className="h-24 bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700/40 hover:border-red-500/50 rounded-lg transition-all duration-300 static-container"
              >
                <div className="text-center p-3">
                  <div className="text-2xl mb-1">🇷🇺</div>
                  <div className="text-xs font-medium text-white mb-1">RUSYA</div>
                  <div className="w-6 h-px bg-red-500/60 mx-auto"></div>
                </div>
              </ModernTechButton>

              {/* Iran */}
              <ModernTechButton
                onClick={() => navigateToPage("/iran")}
                className="h-24 bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700/40 hover:border-green-500/50 rounded-lg transition-all duration-300 static-container"
              >
                <div className="text-center p-3">
                  <div className="text-2xl mb-1">🇮🇷</div>
                  <div className="text-xs font-medium text-white mb-1">İRAN</div>
                  <div className="w-6 h-px bg-green-500/60 mx-auto"></div>
                </div>
              </ModernTechButton>

              {/* Palestine */}
              <ModernTechButton
                onClick={() => navigateToPage("/palestine")}
                className="h-24 bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700/40 hover:border-emerald-500/50 rounded-lg transition-all duration-300 static-container"
              >
                <div className="text-center p-3">
                  <div className="text-2xl mb-1">🇵🇸</div>
                  <div className="text-xs font-medium text-white mb-1">FİLİSTİN</div>
                  <div className="w-6 h-px bg-emerald-500/60 mx-auto"></div>
                </div>
              </ModernTechButton>

              {/* Oppressed Nations */}
              <ModernTechButton
                onClick={() => navigateToPage("/oppressed")}
                className="h-24 bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700/40 hover:border-purple-500/50 rounded-lg transition-all duration-300 static-container"
              >
                <div className="text-center p-3">
                  <div className="text-2xl mb-1">🌍</div>
                  <div className="text-xs font-medium text-white mb-1">MAZLUM MİLLETLER</div>
                  <div className="w-6 h-px bg-purple-500/60 mx-auto"></div>
                </div>
              </ModernTechButton>
            </div>
          </div>
        </div>

        {/* Global Translation System */}
        <GlobalTranslator />
      </div>
    </ModernLayout>
  );
}