import { useState, useEffect } from "react";
import ModernLayout from "@/components/ModernLayout";
import TurkishValueCard from "@/components/TurkishValueCard";
import { ModernTechButton } from "@/components/ModernTechButton";

import GlobalTranslator from "@/components/GlobalTranslator";
import { navigateToPage } from "@/lib/navigation";
import { useTranslation } from "react-i18next";
import { Play, Pause, Star, Crown, Shield, Flag, ChevronRight } from "lucide-react";
import { Howl } from "howler";

export default function TurkiyePage() {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Howl | null>(null);

  useEffect(() => {
    try {
      const audioSound = new Howl({
        src: ['/assets/giris.mp3'],
        html5: true,
        volume: 0.7,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onend: () => setIsPlaying(false),
        onstop: () => setIsPlaying(false),
        onloaderror: (id, error) => {
          console.log('Audio load error:', error);
          setIsPlaying(false);
        },
        onplayerror: (id, error) => {
          console.log('Audio play error:', error);
          setIsPlaying(false);
        }
      });
      
      setSound(audioSound);
      
      return () => {
        try {
          audioSound.unload();
        } catch (error) {
          console.log('Audio cleanup error:', error);
        }
      };
    } catch (error) {
      console.log('Audio initialization error:', error);
    }
  }, []);

  const togglePlayback = () => {
    if (!sound) return;
    
    try {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
    } catch (error) {
      console.log('Audio playback error:', error);
      setIsPlaying(false);
    }
  };

  return (
    <ModernLayout
      audioKey="turkiye"
      showLanguageSelector={false}
      showBackButton={true}
      pageContent="Türkiye sayfasına hoş geldiniz. Bu sayfa Türkiye Cumhuriyeti'nin dijital koordinasyon alanıdır. Genel katılım istatistikleri yarın güncellenecektir. Sayfada TÜRK Nedir, Anayasalarımız, Görev Diriliş ve Halk Defteri & Manifestolar bölümlerine erişebilirsiniz. Türk, atasının mirasına sahip çıkamazsa, geleceğini başka milletlerin insafına bırakır."
      pageName="Türkiye"
    >
      <div className="w-full max-w-6xl mx-auto gpu-accelerated stable-transform no-layout-shift ultra-stable no-motion">
        <div className="relative overflow-hidden gpu-accelerated stable-transform ultra-stable no-motion">
          {/* Revolutionary Hero Section */}
          <div className="relative mb-20 gpu-accelerated stable-transform no-layout-shift ultra-stable no-motion">
            {/* Massive Background Elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-orange-600/5 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-red-600/3 via-transparent to-orange-600/3 rounded-full blur-3xl"></div>
            </div>

            {/* Monumental Main Container */}
            <div className="relative backdrop-filter backdrop-blur-2xl bg-gradient-to-br from-black/98 via-red-950/40 to-black/98 border-4 border-red-500/60 rounded-3xl shadow-[0_50px_150px_rgba(239,68,68,0.4)] overflow-hidden">
              
              {/* Animated Top Border */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
              
              {/* Hero Content */}
              <div className="relative p-12 md:p-20">
                {/* Supreme Title Section */}
                <div className="text-center mb-16">
                  {/* Elite Status Badge */}
                  <div className="inline-flex items-center gap-4 px-8 py-4 mb-8 bg-gradient-to-r from-red-600/30 via-orange-500/30 to-red-600/30 border-2 border-red-500/60 rounded-full backdrop-blur-xl shadow-[0_20px_50px_rgba(239,68,68,0.3)]">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <Crown className="h-6 w-6 text-yellow-400" />
                    <span className="text-white font-black text-lg tracking-widest">ULUSAL PLATFORM</span>
                    <Shield className="h-6 w-6 text-red-400" />
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  </div>

                  {/* Massive Title */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-orange-500/20 to-red-600/10 blur-3xl"></div>
                    <h1 className="relative text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-red-400 via-white to-red-400 bg-clip-text text-transparent tracking-tight leading-none">
                      TÜRKİYE
                    </h1>
                  </div>

                  {/* Revolutionary Subtitle */}
                  <div className="relative">
                    <div className="flex items-center justify-center gap-6 mb-6">
                      <div className="w-16 h-px bg-gradient-to-r from-transparent to-red-500"></div>
                      <Flag className="h-10 w-10 text-red-500" />
                      <div className="w-16 h-px bg-gradient-to-l from-transparent to-red-500"></div>
                    </div>
                    <p className="text-2xl md:text-4xl text-gray-200 font-light tracking-wide leading-relaxed">
                      Cumhuriyet Güncellenme Platformu
                    </p>
                    <p className="text-lg md:text-xl text-red-300 font-medium mt-4 tracking-wider">
                      Dijital Koordinasyon • Halk Katılımı • Ulusal Diriliş
                    </p>
                  </div>
                </div>

                {/* Supreme Stats Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  {[
                    { label: "Aktif Katılımcı", value: "2,847", icon: Crown, color: "from-yellow-500 to-orange-500" },
                    { label: "Tamamlanan Görev", value: "1,923", icon: Star, color: "from-red-500 to-pink-500" },
                    { label: "Platform Güvenliği", value: "MAX", icon: Shield, color: "from-green-500 to-blue-500" }
                  ].map((stat, index) => (
                    <div key={index} className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                      <div className="relative bg-gradient-to-br from-black/90 via-red-950/30 to-black/90 border-2 border-red-500/50 rounded-2xl p-8 backdrop-blur-xl hover:border-red-400/70 transition-all duration-500">
                        <div className="text-center">
                          <div className={`inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r ${stat.color} rounded-2xl shadow-lg`}>
                            <stat.icon className="h-8 w-8 text-white" />
                          </div>
                          <div className="text-white font-black text-3xl mb-2">{stat.value}</div>
                          <div className="text-gray-300 text-sm uppercase tracking-wide">{stat.label}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Epic Audio Control */}
                <div className="flex items-center justify-center">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-orange-600/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                    <div className="relative flex items-center gap-6 px-12 py-6 bg-gradient-to-r from-black/80 via-red-950/50 to-black/80 border-3 border-red-500/60 rounded-full backdrop-blur-2xl shadow-[0_25px_60px_rgba(239,68,68,0.4)] hover:shadow-[0_35px_80px_rgba(239,68,68,0.6)] transition-all duration-700">
                      <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-xl" onClick={togglePlayback}>
                        {isPlaying 
                          ? <Pause className="h-8 w-8 text-white" />
                          : <Play className="h-8 w-8 text-white ml-1" />
                        }
                      </div>
                      <div className="text-white">
                        <div className="font-black text-xl tracking-wide">TÜRK MİLLİ MARŞI</div>
                        <div className="text-red-300 text-base font-medium">Platform Girişi • Resmi Müzik</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-150"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Border */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
            </div>
          </div>

          {/* Navigation Cards - Compact 2x4 Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 content-stable motion-stable ultra-stable no-motion">
            {/* TÜRK Nedir Button - Massive */}
            <div className="content-stable ultra-stable no-motion group">
              <ModernTechButton
                onClick={() => navigateToPage("/turknedir")}
                className="w-full h-32 bg-gradient-to-br from-black/95 via-red-950/60 to-black/95 border border-red-500/60 hover:border-red-400/80 rounded-xl backdrop-blur-xl shadow-lg hover:shadow-red-900/30 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center h-full justify-center p-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-lg flex items-center justify-center mb-2 shadow-md group-hover:shadow-lg transition-all duration-300 relative z-10">
                    <Star className="h-5 w-5 text-white drop-shadow-sm" />
                  </div>
                  
                  <h3 className="text-white font-bold text-sm mb-1 tracking-wide relative z-10 group-hover:text-red-100 transition-colors duration-300">
                    TÜRK NEDİR
                  </h3>
                  
                  <div className="flex items-center space-x-1 text-red-400 group-hover:text-red-300 transition-colors duration-300 relative z-10">
                    <span className="text-xs uppercase tracking-wide font-medium">Keşfet</span>
                    <ChevronRight className="h-3 w-3 transform group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </ModernTechButton>
            </div>

            {/* Anayasalarımız Button */}
            <div className="content-stable ultra-stable no-motion group">
              <ModernTechButton
                onClick={() => navigateToPage("/anayasalarimiz")}
                className="w-full h-32 bg-gradient-to-br from-black/95 via-red-950/60 to-black/95 border border-red-500/60 hover:border-red-400/80 rounded-xl backdrop-blur-xl shadow-lg hover:shadow-red-900/30 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center h-full justify-center p-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-lg flex items-center justify-center mb-2 shadow-md group-hover:shadow-lg transition-all duration-300 relative z-10">
                    <Shield className="h-5 w-5 text-white drop-shadow-sm" />
                  </div>
                  
                  <h3 className="text-white font-bold text-sm mb-1 tracking-wide relative z-10 group-hover:text-red-100 transition-colors duration-300">
                    ANAYASALARIMIZ
                  </h3>
                  
                  <div className="flex items-center space-x-1 text-red-400 group-hover:text-red-300 transition-colors duration-300 relative z-10">
                    <span className="text-xs uppercase tracking-wide font-medium">İncele</span>
                    <ChevronRight className="h-3 w-3 transform group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </ModernTechButton>
            </div>

            {/* Görev Diriliş Button */}
            <div className="content-stable ultra-stable no-motion group">
              <ModernTechButton
                onClick={() => navigateToPage("/gorevdirilis")}
                className="w-full h-32 bg-gradient-to-br from-black/95 via-red-950/60 to-black/95 border border-red-500/60 hover:border-red-400/80 rounded-xl backdrop-blur-xl shadow-lg hover:shadow-red-900/30 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center h-full justify-center p-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-lg flex items-center justify-center mb-2 shadow-md group-hover:shadow-lg transition-all duration-300 relative z-10">
                    <Crown className="h-5 w-5 text-white drop-shadow-sm" />
                  </div>
                  
                  <h3 className="text-white font-bold text-sm mb-1 tracking-wide relative z-10 group-hover:text-red-100 transition-colors duration-300">
                    GÖREV DİRİLİŞ
                  </h3>
                  
                  <div className="flex items-center space-x-1 text-red-400 group-hover:text-red-300 transition-colors duration-300 relative z-10">
                    <span className="text-xs uppercase tracking-wide font-medium">Başla</span>
                    <ChevronRight className="h-3 w-3 transform group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </ModernTechButton>
            </div>

            {/* Halk Defteri Button */}
            <div className="content-stable ultra-stable no-motion group">
              <ModernTechButton
                onClick={() => navigateToPage("/halkdefteri")}
                className="w-full h-32 bg-gradient-to-br from-black/95 via-red-950/60 to-black/95 border border-red-500/60 hover:border-red-400/80 rounded-xl backdrop-blur-xl shadow-lg hover:shadow-red-900/30 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center h-full justify-center p-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-lg flex items-center justify-center mb-2 shadow-md group-hover:shadow-lg transition-all duration-300 relative z-10">
                    <Flag className="h-5 w-5 text-white drop-shadow-sm" />
                  </div>
                  
                  <h3 className="text-white font-bold text-sm mb-1 tracking-wide relative z-10 group-hover:text-red-100 transition-colors duration-300">
                    HALK DEFTERİ
                  </h3>
                  
                  <div className="flex items-center space-x-1 text-red-400 group-hover:text-red-300 transition-colors duration-300 relative z-10">
                    <span className="text-xs uppercase tracking-wide font-medium">Görüntüle</span>
                    <ChevronRight className="h-3 w-3 transform group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </ModernTechButton>
            </div>

            {/* Manifesto Button */}
            <div className="content-stable ultra-stable no-motion group">
              <ModernTechButton
                onClick={() => navigateToPage("/manifesto")}
                className="w-full h-32 bg-gradient-to-br from-black/95 via-red-950/60 to-black/95 border border-red-500/60 hover:border-red-400/80 rounded-xl backdrop-blur-xl shadow-lg hover:shadow-red-900/30 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center h-full justify-center p-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-lg flex items-center justify-center mb-2 shadow-md group-hover:shadow-lg transition-all duration-300 relative z-10">
                    <Flag className="h-5 w-5 text-white drop-shadow-sm" />
                  </div>
                  
                  <h3 className="text-white font-bold text-sm mb-1 tracking-wide relative z-10 group-hover:text-red-100 transition-colors duration-300">
                    MANİFESTO
                  </h3>
                  
                  <div className="flex items-center space-x-1 text-red-400 group-hover:text-red-300 transition-colors duration-300 relative z-10">
                    <span className="text-xs uppercase tracking-wide font-medium">Oku</span>
                    <ChevronRight className="h-3 w-3 transform group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </ModernTechButton>
            </div>

            {/* Çağrı Button */}
            <div className="content-stable ultra-stable no-motion group">
              <ModernTechButton
                onClick={() => navigateToPage("/cagri")}
                className="w-full h-32 bg-gradient-to-br from-black/95 via-red-950/60 to-black/95 border border-red-500/60 hover:border-red-400/80 rounded-xl backdrop-blur-xl shadow-lg hover:shadow-red-900/30 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center h-full justify-center p-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-lg flex items-center justify-center mb-2 shadow-md group-hover:shadow-lg transition-all duration-300 relative z-10">
                    <Star className="h-5 w-5 text-white drop-shadow-sm" />
                  </div>
                  
                  <h3 className="text-white font-bold text-sm mb-1 tracking-wide relative z-10 group-hover:text-red-100 transition-colors duration-300">
                    ÇAĞRI
                  </h3>
                  
                  <div className="flex items-center space-x-1 text-red-400 group-hover:text-red-300 transition-colors duration-300 relative z-10">
                    <span className="text-xs uppercase tracking-wide font-medium">Dinle</span>
                    <ChevronRight className="h-3 w-3 transform group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </ModernTechButton>
            </div>

            {/* Katıl Button */}
            <div className="content-stable ultra-stable no-motion group">
              <ModernTechButton
                onClick={() => navigateToPage("/katil")}
                className="w-full h-32 bg-gradient-to-br from-black/95 via-red-950/60 to-black/95 border border-red-500/60 hover:border-red-400/80 rounded-xl backdrop-blur-xl shadow-lg hover:shadow-red-900/30 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center h-full justify-center p-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-lg flex items-center justify-center mb-2 shadow-md group-hover:shadow-lg transition-all duration-300 relative z-10">
                    <Crown className="h-5 w-5 text-white drop-shadow-sm" />
                  </div>
                  
                  <h3 className="text-white font-bold text-sm mb-1 tracking-wide relative z-10 group-hover:text-red-100 transition-colors duration-300">
                    KATIL
                  </h3>
                  
                  <div className="flex items-center space-x-1 text-red-400 group-hover:text-red-300 transition-colors duration-300 relative z-10">
                    <span className="text-xs uppercase tracking-wide font-medium">Başvur</span>
                    <ChevronRight className="h-3 w-3 transform group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </ModernTechButton>
            </div>

            {/* Görev Button */}
            <div className="content-stable ultra-stable no-motion group">
              <ModernTechButton
                onClick={() => navigateToPage("/gorev")}
                className="w-full h-32 bg-gradient-to-br from-black/95 via-red-950/60 to-black/95 border border-red-500/60 hover:border-red-400/80 rounded-xl backdrop-blur-xl shadow-lg hover:shadow-red-900/30 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center h-full justify-center p-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-lg flex items-center justify-center mb-2 shadow-md group-hover:shadow-lg transition-all duration-300 relative z-10">
                    <Shield className="h-5 w-5 text-white drop-shadow-sm" />
                  </div>
                  
                  <h3 className="text-white font-bold text-sm mb-1 tracking-wide relative z-10 group-hover:text-red-100 transition-colors duration-300">
                    GÖREV
                  </h3>
                  
                  <div className="flex items-center space-x-1 text-red-400 group-hover:text-red-300 transition-colors duration-300 relative z-10">
                    <span className="text-xs uppercase tracking-wide font-medium">Gör</span>
                    <ChevronRight className="h-3 w-3 transform group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </ModernTechButton>
            </div>
          </div>

          {/* Forum Connection Section */}
          <div className="relative mt-16 mb-12">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-900/10 to-transparent rounded-2xl blur-xl"></div>
            
            <div className="relative bg-gradient-to-br from-black/60 via-red-950/20 to-black/60 border border-red-900/30 rounded-2xl p-8 backdrop-blur-sm">
              {/* Date and Mission Statement */}
              <div className="flex flex-col sm:flex-row items-center justify-center mb-8 space-y-2 sm:space-y-0">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse shadow-lg shadow-red-500/50"></div>
                  <span className="text-red-400 text-base font-semibold">19 Mayıs 2025</span>
                </div>
                <span className="hidden sm:block text-white/40 text-base mx-4">•</span>
                <span className="text-white/90 text-base font-medium">Cumhuriyetin Halk ile Güncelleme Yolculuğu</span>
              </div>

              {/* Decorative separator */}
              <div className="flex items-center justify-center mb-8">
                <div className="h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent w-24"></div>
                <div className="mx-4 text-red-400 text-sm font-medium tracking-[0.2em] uppercase">FORUM BAĞLANTISI</div>
                <div className="h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent w-24"></div>
              </div>

              {/* Forum Button with enhanced styling */}
              <div className="flex justify-center">
                <ModernTechButton
                  onClick={() => navigateToPage("/halkkoordinasyon")}
                  className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-600 hover:from-red-500 hover:via-red-600 hover:to-red-500 text-white rounded-xl transition-all duration-500 shadow-xl shadow-red-900/30 hover:shadow-2xl hover:shadow-red-600/40 transform hover:scale-105 overflow-hidden"
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 via-red-400/20 to-red-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Button content */}
                  <div className="relative flex items-center">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3 group-hover:bg-white/30 transition-colors duration-300">
                      <span className="text-sm">🌐</span>
                    </div>
                    <span className="font-semibold text-lg tracking-wide">Halk Koordinasyon Merkezi</span>
                    <ChevronRight className="ml-3 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </ModernTechButton>
              </div>

              {/* Additional info text */}
              <div className="mt-6 text-center">
                <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed">
                  Cumhuriyetin geleceğini şekillendirmek için halk ile birlikte çalışma platformu
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