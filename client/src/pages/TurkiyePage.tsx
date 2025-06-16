import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import ModernLayout from "@/components/ModernLayout";
import { ModernTechButton } from "@/components/ModernTechButton";
import { 
  Play, 
  Pause, 
  Book, 
  Scale, 
  FileText, 
  Megaphone, 
  Users, 
  Target,
  Heart,
  Globe,
  Shield,
  Sparkles,
  Star
} from "lucide-react";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { navigateWithScrollReset } from "@/lib/navigation";
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
      pageContent="Türkiye Cumhuriyeti'nin dijital merkezi. Medeniyet ışığında birleşen Türk halkının ortak platformu."
      pageName="Türkiye"
    >
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Modern Hero Section */}
        <div className="relative mb-16 overflow-hidden">
          <div className="bg-gradient-to-br from-red-900 via-gray-900 to-red-900 border border-red-500/30 rounded-3xl p-16 text-center relative">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-gradient-to-r from-red-500/20 to-transparent"></div>
            </div>
            
            {/* Flag */}
            <div className="mb-8 flex justify-center">
              <div className="w-32 h-32 bg-red-600 rounded-2xl flex items-center justify-center text-5xl border-4 border-red-400 shadow-lg">
                🇹🇷
              </div>
            </div>
            
            {/* Title with Animation */}
            <div className="mb-12 relative z-10">
              <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-wider drop-shadow-2xl">
                TÜRKİYE
              </h1>
              <div className="flex justify-center gap-2 mb-4">
                <div className="w-8 h-1 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-16 h-1 bg-red-400 rounded-full"></div>
                <div className="w-8 h-1 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-red-200 text-lg font-light tracking-wide">Medeniyet Işığında Birleşen Millet</p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 relative z-10">
              <div className="bg-black/40 border border-red-500/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-white">84M</div>
                <div className="text-red-300 text-sm">Vatandaş</div>
              </div>
              <div className="bg-black/40 border border-red-500/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-white">100</div>
                <div className="text-red-300 text-sm">Görev</div>
              </div>
              <div className="bg-black/40 border border-red-500/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-white">2023</div>
                <div className="text-red-300 text-sm">Cumhuriyet</div>
              </div>
              <div className="bg-black/40 border border-red-500/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-white">∞</div>
                <div className="text-red-300 text-sm">Gelecek</div>
              </div>
            </div>
            
            {/* Quote */}
            <div className="max-w-4xl mx-auto mb-12 relative z-10">
              <div className="bg-black/50 border border-red-500/30 rounded-2xl p-8">
                <Star className="h-8 w-8 text-red-400 mx-auto mb-4" />
                <p className="text-xl md:text-2xl font-light text-white mb-6 italic leading-relaxed">
                  "Türk, atasının mirasına sahip çıkamazsa,<br />
                  geleceğini başka milletlerin insafına bırakır."
                </p>
                <div className="text-center">
                  <span className="text-red-400 font-semibold tracking-wide">MUSTAFA KEMAL ATATÜRK</span>
                </div>
              </div>
            </div>
            
            {/* Audio Control */}
            <div className="flex justify-center relative z-10">
              <button
                className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 border-2 border-red-500 rounded-2xl hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/30"
                onClick={handleToggleAudio}
              >
                <div className="flex items-center gap-3">
                  {isAudioPlaying 
                    ? <Pause className="h-6 w-6 text-white group-hover:scale-110 transition-transform" /> 
                    : <Play className="h-6 w-6 text-white ml-0.5 group-hover:scale-110 transition-transform" />
                  }
                  <span className="text-white font-semibold text-lg">
                    {isAudioPlaying ? "MÜZIK DURDUR" : "TÜRK MÜZİĞİ"}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Modern Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          
          {/* TÜRK NEDİR */}
          <div
            onClick={() => navigateToPage("/turknedir")}
            className="group cursor-pointer relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-800 via-red-900 to-red-950 border border-red-500/30 hover:border-red-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="relative p-8 h-64 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Book className="h-8 w-8 text-white" />
                </div>
                <div className="w-6 h-6 border-2 border-red-400 rounded-full group-hover:bg-red-400 transition-colors duration-300"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-200 transition-colors">TÜRK NEDİR?</h3>
                <p className="text-red-200 text-base leading-relaxed mb-4">Kimlik, tarih ve değerlerimizin derinlemesine keşfi</p>
                <div className="w-full h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full group-hover:from-red-400 group-hover:to-red-500 transition-colors"></div>
              </div>
            </div>
          </div>

          {/* ANAYASALARIMIZ */}
          <div
            onClick={() => navigateToPage("/anayasalar")}
            className="group cursor-pointer relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="relative p-8 h-64 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Scale className="h-8 w-8 text-white" />
                </div>
                <div className="w-6 h-6 border-2 border-blue-400 rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">ANAYASALARIMIZ</h3>
                <p className="text-blue-200 text-base leading-relaxed mb-4">Hukuk devleti ve adalet sistemi temelleri</p>
                <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full group-hover:from-blue-400 group-hover:to-blue-500 transition-colors"></div>
              </div>
            </div>
          </div>

          {/* MANİFESTO */}
          <div
            onClick={() => navigateToPage("/halk-manifestolar")}
            className="group cursor-pointer relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-800 via-purple-900 to-purple-950 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="relative p-8 h-64 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <div className="w-6 h-6 border-2 border-purple-400 rounded-full group-hover:bg-purple-400 transition-colors duration-300"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">MANİFESTO</h3>
                <p className="text-purple-200 text-base leading-relaxed mb-4">Gelecek vizyonu ve milli ideallerimiz</p>
                <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full group-hover:from-purple-400 group-hover:to-purple-500 transition-colors"></div>
              </div>
            </div>
          </div>

          {/* ÇAĞRI */}
          <div
            onClick={() => navigateToPage("/cagri")}
            className="group cursor-pointer relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-800 via-orange-900 to-orange-950 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="relative p-8 h-64 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Megaphone className="h-8 w-8 text-white" />
                </div>
                <div className="w-6 h-6 border-2 border-orange-400 rounded-full group-hover:bg-orange-400 transition-colors duration-300"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-200 transition-colors">ÇAĞRI</h3>
                <p className="text-orange-200 text-base leading-relaxed mb-4">Millete güçlü mesajlar ve çağrılar</p>
                <div className="w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full group-hover:from-orange-400 group-hover:to-orange-500 transition-colors"></div>
              </div>
            </div>
          </div>

          {/* KATIL */}
          <div
            onClick={() => navigateToPage("/katil")}
            className="group cursor-pointer relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-800 via-green-900 to-green-950 border border-green-500/30 hover:border-green-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="relative p-8 h-64 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="w-6 h-6 border-2 border-green-400 rounded-full group-hover:bg-green-400 transition-colors duration-300"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-200 transition-colors">KATIL</h3>
                <p className="text-green-200 text-base leading-relaxed mb-4">Milli birlik ve toplumsal dayanışma</p>
                <div className="w-full h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full group-hover:from-green-400 group-hover:to-green-500 transition-colors"></div>
              </div>
            </div>
          </div>

          {/* 100 GÖREV */}
          <div
            onClick={() => navigateToPage("/gorevler")}
            className="group cursor-pointer relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-800 via-yellow-900 to-yellow-950 border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="relative p-8 h-64 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <div className="w-6 h-6 border-2 border-yellow-400 rounded-full group-hover:bg-yellow-400 transition-colors duration-300"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-200 transition-colors">100 GÖREV</h3>
                <p className="text-yellow-200 text-base leading-relaxed mb-4">Medeniyet yolundaki stratejik hedefler</p>
                <div className="w-full h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full group-hover:from-yellow-400 group-hover:to-yellow-500 transition-colors"></div>
              </div>
            </div>
          </div>

        </div>

        {/* Modern Values Section */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-600/50 rounded-3xl p-16 relative overflow-hidden">
            
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full bg-gradient-to-br from-red-500/20 via-transparent to-blue-500/20"></div>
            </div>
            
            <div className="text-center mb-16 relative z-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-8 h-1 bg-red-500 rounded-full"></div>
                <Heart className="h-8 w-8 text-red-400" />
                <div className="w-8 h-1 bg-red-500 rounded-full"></div>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-wide">
                TÜRK DEĞERLERİ
              </h2>
              <p className="text-gray-300 text-xl font-light">Medeniyet mirasımızın temel taşları</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
              {turkishValueIds.map((valueId, index) => {
                const valueTexts: Record<string, string> = {
                  'milli': 'MİLLİ',
                  'muasir': 'MUASIR',
                  'laik': 'LAİK',
                  'demokratik': 'DEMOKRATİK',
                  'sosyal': 'SOSYAL'
                };

                const descriptions: Record<string, string> = {
                  'milli': 'Vatan Sevgisi',
                  'muasir': 'Çağdaşlık',
                  'laik': 'Özgür İnanç',
                  'demokratik': 'Halk İradesi',
                  'sosyal': 'Toplum Yararı'
                };

                const icons = [
                  Shield,
                  Sparkles,
                  Globe,
                  Users,
                  Heart
                ];

                const gradients = [
                  'from-red-600 to-red-800',
                  'from-blue-600 to-blue-800',
                  'from-green-600 to-green-800',
                  'from-purple-600 to-purple-800',
                  'from-orange-600 to-orange-800'
                ];

                const shadows = [
                  'shadow-red-500/30',
                  'shadow-blue-500/30',
                  'shadow-green-500/30',
                  'shadow-purple-500/30',
                  'shadow-orange-500/30'
                ];

                const IconComponent = icons[index];
                
                return (
                  <div key={valueId} className="group">
                    <div className={`bg-gradient-to-br ${gradients[index]} border border-white/20 rounded-2xl p-6 h-52 flex flex-col justify-between items-center transition-all duration-500 hover:scale-110 hover:shadow-2xl ${shadows[index]} relative overflow-hidden`}>
                      
                      {/* Background Glow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 transition-all duration-300"></div>
                      
                      <div className="relative z-10 text-center">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto border border-white/30 group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        
                        <h3 className="text-lg font-black text-white mb-2 tracking-wide">
                          {valueTexts[valueId]}
                        </h3>
                        
                        <p className="text-white/80 text-sm font-medium mb-4">
                          {descriptions[valueId]}
                        </p>
                        
                        <div className="w-12 h-1 bg-white/60 mx-auto rounded-full group-hover:w-16 group-hover:bg-white transition-all duration-300"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Quote */}
            <div className="mt-16 text-center relative z-10">
              <div className="max-w-3xl mx-auto bg-black/40 border border-white/10 rounded-2xl p-8">
                <p className="text-white/90 text-lg italic leading-relaxed">
                  "Bu değerler, Türk milletinin bin yıllık medeniyetinin özüdür ve geleceğe taşıyacağımız en değerli mirasımızdır."
                </p>
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