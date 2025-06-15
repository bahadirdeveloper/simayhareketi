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
      <div className="w-full max-w-7xl mx-auto static-container">
        
        {/* Ultra Premium Hero Section */}
        <div className="relative mb-24 overflow-hidden static-container">
          {/* Premium Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.1),transparent_60%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(234,179,8,0.1),transparent_60%)]"></div>
          </div>
          
          {/* Premium Container */}
          <div className="relative backdrop-blur-sm border border-white/10 rounded-3xl p-16 text-center static-container">
            
            {/* Elite Flag */}
            <div className="mb-12">
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-yellow-500/20 rounded-2xl blur-2xl"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center text-6xl border-2 border-white/20 shadow-2xl">
                  🇹🇷
                </div>
              </div>
            </div>
            
            {/* Premium Typography */}
            <div className="mb-16">
              <h1 className="text-7xl md:text-9xl font-extralight tracking-[0.2em] mb-8">
                <span className="bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent">
                  TÜRKİYE
                </span>
              </h1>
              <div className="flex justify-center">
                <div className="h-0.5 w-48 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
              </div>
            </div>
            
            {/* Premium Quote */}
            <div className="max-w-5xl mx-auto mb-16">
              <div className="relative p-12 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10">
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <div className="text-red-400 text-2xl font-bold">"</div>
                </div>
                <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/90 mb-8 italic">
                  Türk, atasının mirasına sahip çıkamazsa,<br />
                  geleceğini başka milletlerin insafına bırakır.
                </p>
                <div className="text-right">
                  <span className="text-red-400 text-lg font-medium tracking-widest">— MUSTAFA KEMAL ATATÜRK</span>
                </div>
              </div>
            </div>
            
            {/* Premium Audio Control */}
            <div className="flex justify-center">
              <button
                className="group relative px-12 py-4 bg-gradient-to-r from-red-600/80 to-red-700/80 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-gradient-to-r hover:from-red-500/80 hover:to-red-600/80 transition-all duration-500 static-container"
                onClick={handleToggleAudio}
              >
                <div className="flex items-center gap-4">
                  {isAudioPlaying 
                    ? <Pause className="h-6 w-6 text-white" /> 
                    : <Play className="h-6 w-6 text-white ml-1" />
                  }
                  <span className="text-white font-medium text-lg tracking-wide">
                    {isAudioPlaying ? "MÜZIK DURDUR" : "TÜRK MÜZİĞİ"}
                  </span>
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Elite Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 static-container">
          
          {/* TÜRK NEDİR */}
          <ModernTechButton
            onClick={() => navigateToPage("/turknedir")}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-900/40 to-red-950/60 backdrop-blur-sm border border-red-500/30 hover:border-red-400/60 transition-all duration-700 h-64 static-container"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="relative h-full flex flex-col justify-end p-8 z-10">
              <div className="mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-red-500 rounded-lg"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-200 transition-colors">TÜRK NEDİR?</h3>
                <p className="text-red-200/70 text-sm leading-relaxed">Kimlik, tarih ve değerlerimizin derinliklerinde yolculuk</p>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full group-hover:h-2 transition-all"></div>
            </div>
          </ModernTechButton>

          {/* ANAYASALARIMIZ */}
          <ModernTechButton
            onClick={() => navigateToPage("/anayasalar")}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/40 to-blue-950/60 backdrop-blur-sm border border-blue-500/30 hover:border-blue-400/60 transition-all duration-700 h-64 static-container"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="relative h-full flex flex-col justify-end p-8 z-10">
              <div className="mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-blue-500 rounded-lg"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">ANAYASALARIMIZ</h3>
                <p className="text-blue-200/70 text-sm leading-relaxed">Hukuk sistemimizin temelini oluşturan yasalar</p>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full group-hover:h-2 transition-all"></div>
            </div>
          </ModernTechButton>

          {/* MANİFESTO */}
          <ModernTechButton
            onClick={() => navigateToPage("/halk-manifestolar")}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/40 to-purple-950/60 backdrop-blur-sm border border-purple-500/30 hover:border-purple-400/60 transition-all duration-700 h-64 static-container"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="relative h-full flex flex-col justify-end p-8 z-10">
              <div className="mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-purple-500 rounded-lg"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">MANİFESTO</h3>
                <p className="text-purple-200/70 text-sm leading-relaxed">Geleceğe dair vizyon ve ideallerin manifestosu</p>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:h-2 transition-all"></div>
            </div>
          </ModernTechButton>

          {/* ÇAĞRI */}
          <ModernTechButton
            onClick={() => navigateToPage("/cagri")}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-900/40 to-orange-950/60 backdrop-blur-sm border border-orange-500/30 hover:border-orange-400/60 transition-all duration-700 h-64 static-container"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="relative h-full flex flex-col justify-end p-8 z-10">
              <div className="mb-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-orange-500 rounded-lg"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-200 transition-colors">ÇAĞRI</h3>
                <p className="text-orange-200/70 text-sm leading-relaxed">Halkımıza ulaşan güçlü mesajlar ve çağrılar</p>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full group-hover:h-2 transition-all"></div>
            </div>
          </ModernTechButton>

          {/* KATIL */}
          <ModernTechButton
            onClick={() => navigateToPage("/katil")}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-900/40 to-green-950/60 backdrop-blur-sm border border-green-500/30 hover:border-green-400/60 transition-all duration-700 h-64 static-container"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="relative h-full flex flex-col justify-end p-8 z-10">
              <div className="mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-green-500 rounded-lg"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-200 transition-colors">KATIL</h3>
                <p className="text-green-200/70 text-sm leading-relaxed">Büyük birliktelik için katılım ve dayanışma</p>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full group-hover:h-2 transition-all"></div>
            </div>
          </ModernTechButton>

          {/* 100 GÖREV */}
          <ModernTechButton
            onClick={() => navigateToPage("/gorevler")}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-900/40 to-yellow-950/60 backdrop-blur-sm border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-700 h-64 static-container"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="relative h-full flex flex-col justify-end p-8 z-10">
              <div className="mb-6">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-yellow-500 rounded-lg"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-200 transition-colors">100 GÖREV</h3>
                <p className="text-yellow-200/70 text-sm leading-relaxed">Diriliş için belirlenen stratejik hedefler</p>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full group-hover:h-2 transition-all"></div>
            </div>
          </ModernTechButton>

        </div>

        {/* Premium Values Section */}
        <div className="mb-24 static-container">
          <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-16 static-container">
            
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-extralight tracking-wide mb-6">
                <span className="bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent">
                  TÜRK DEĞERLERİ
                </span>
              </h2>
              <div className="flex justify-center">
                <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 static-container">
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
                  <div key={valueId} className="group relative static-container">
                    <div className="backdrop-blur-sm bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl p-8 h-48 flex flex-col justify-center items-center transition-all duration-500 static-container">
                      
                      <div className={`w-16 h-16 bg-gradient-to-br from-${colors[index]}/20 to-${colors[index]}/40 rounded-2xl flex items-center justify-center mb-6`}>
                        <div className={`w-8 h-8 bg-${colors[index]} rounded-xl`}></div>
                      </div>
                      
                      <div className="text-center">
                        <h3 className="text-lg font-medium text-white mb-3">
                          {valueTexts[valueId]}
                        </h3>
                        <div className={`w-12 h-0.5 bg-${colors[index]} mx-auto rounded-full`}></div>
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