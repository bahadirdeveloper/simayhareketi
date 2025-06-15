import { useState, useEffect } from "react";
import ModernLayout from "@/components/ModernLayout";
import TurkishValueCard from "@/components/TurkishValueCard";
import { ModernTechButton } from "@/components/ModernTechButton";
import { NavButtons } from "@/components/NavButtons";
import { GlobalTranslator } from "@/components/GlobalTranslator";
import { navigateToPage } from "@/lib/navigation";
import { useTranslation } from "react-i18next";
import { Play, Pause, Star, Crown, Shield, Flag, ChevronRight } from "lucide-react";
import { Howl } from "howler";

export default function TurkiyePage() {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Howl | null>(null);

  useEffect(() => {
    const audioSound = new Howl({
      src: ['/assets/giris.mp3'],
      html5: true,
      volume: 0.7,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onend: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
    });
    
    setSound(audioSound);
    
    return () => {
      audioSound.unload();
    };
  }, []);

  const togglePlayback = () => {
    if (!sound) return;
    
    if (isPlaying) {
      sound.pause();
    } else {
      sound.play();
    }
  };

  return (
    <ModernLayout
      audioKey="turkiye"
      showLanguageSelector={true}
      showBackButton={true}
      pageContent="Türkiye sayfasına hoş geldiniz. Bu sayfa Türkiye Cumhuriyeti'nin dijital koordinasyon alanıdır. Genel katılım istatistikleri yarın güncellenecektir. Sayfada TÜRK Nedir, Anayasalarımız, Görev Diriliş ve Halk Defteri & Manifestolar bölümlerine erişebilirsiniz. Türk, atasının mirasına sahip çıkamazsa, geleceğini başka milletlerin insafına bırakır."
      pageName="Türkiye"
    >
      <div className="w-full max-w-6xl mx-auto gpu-accelerated stable-transform no-layout-shift ultra-stable no-motion">
        <div className="relative overflow-hidden gpu-accelerated stable-transform ultra-stable no-motion">
          {/* VIP Premium Hero Section */}
          <div className="relative rounded-3xl overflow-hidden mb-16 gpu-accelerated stable-transform no-layout-shift ultra-stable no-motion">
            {/* Premium Glass Morphism Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-orange-600/15 to-red-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative backdrop-filter backdrop-blur-xl bg-gradient-to-br from-black/95 via-red-950/30 to-black/95 border-2 border-red-500/50 rounded-3xl shadow-[0_40px_120px_rgba(239,68,68,0.3)]">
              
              {/* Hero Content */}
              <div className="relative p-8 md:p-16">
                {/* Premium Status Badge */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-600/20 via-orange-500/20 to-red-600/20 border border-red-500/50 rounded-full backdrop-blur-sm">
                    <Crown className="h-5 w-5 text-yellow-400" />
                    <span className="text-white font-bold text-sm tracking-wider">VIP PREMIUM PLATFORM</span>
                    <Shield className="h-5 w-5 text-red-400" />
                  </div>
                </div>

                {/* Main Hero Title */}
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Flag className="h-8 w-8 text-red-500" />
                    <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent tracking-tight">
                      TÜRKİYE
                    </h1>
                    <Flag className="h-8 w-8 text-red-500" />
                  </div>
                  <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
                    Dijital Koordinasyon Merkezi
                  </p>
                </div>

                {/* Premium Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                  {[
                    { label: "Aktif Katılımcı", value: "2,847", icon: "👥" },
                    { label: "Tamamlanan Görev", value: "1,923", icon: "✅" },
                    { label: "Dijital Platform", value: "100%", icon: "🌐" },
                    { label: "Güvenlik Seviyesi", value: "MAX", icon: "🔒" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-black/40 border border-red-500/30 rounded-xl backdrop-blur-sm">
                      <div className="text-2xl mb-2">{stat.icon}</div>
                      <div className="text-white font-bold text-lg">{stat.value}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Premium Audio Player */}
                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-black/60 via-red-950/40 to-black/60 border-2 border-red-500/50 rounded-full backdrop-blur-xl shadow-[0_15px_40px_rgba(239,68,68,0.3)]">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200" onClick={togglePlayback}>
                        {isPlaying 
                          ? <Pause className="h-6 w-6 text-white" />
                          : <Play className="h-6 w-6 text-white ml-0.5" />
                        }
                      </div>
                      <div className="text-white">
                        <div className="font-bold text-lg">Türkiye Girişi</div>
                        <div className="text-gray-300 text-sm">Resmi Platform Müziği</div>
                      </div>
                    </div>
                    <div className="w-20 h-px bg-gradient-to-l from-transparent via-red-500 to-red-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            
          {/* VIP Enhanced Title Section */}
          <div className="mb-16 text-center ultra-stable no-motion">
            <div className="relative">
              {/* Premium Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent rounded-2xl blur-2xl"></div>
              
              <div className="relative bg-gradient-to-br from-black/90 via-red-950/20 to-black/90 border-2 border-red-500/50 rounded-2xl p-8 backdrop-blur-xl shadow-[0_25px_70px_rgba(239,68,68,0.2)]">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                    PLATFORM ERİŞİM
                  </h2>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                  Türkiye Cumhuriyeti'nin dijital koordinasyon platformuna hoş geldiniz. 
                  Aşağıdaki premium modüllere erişim sağlayabilirsiniz.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Cards with VIP Design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16 content-stable motion-stable ultra-stable no-motion">
            {/* TÜRK Nedir Button */}
            <div className="content-stable ultra-stable no-motion">
              <ModernTechButton
                onClick={() => navigateToPage("/turknedir")}
                className="w-full h-44 sm:h-40 bg-gradient-to-br from-black/90 via-red-950/50 to-black/90 border-2 border-red-500/50 rounded-2xl backdrop-blur-xl shadow-[0_20px_60px_rgba(239,68,68,0.2)] hover:shadow-[0_30px_80px_rgba(239,68,68,0.4)] transition-all duration-500"
              >
                <div className="flex flex-col items-center text-center h-full justify-center p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-[0_10px_30px_rgba(239,68,68,0.3)]">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-white font-black text-xl mb-2">TÜRK NEDİR</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Türk kimliğinin temel değerleri ve felsefi yaklaşımları
                  </p>
                  <ChevronRight className="h-5 w-5 text-red-400 mt-2" />
                </div>
              </ModernTechButton>
            </div>

            {/* Anayasalarımız Button */}
            <div className="content-stable ultra-stable no-motion">
              <ModernTechButton
                onClick={() => navigateToPage("/anayasalarimiz")}
                className="w-full h-44 sm:h-40 bg-gradient-to-br from-black/90 via-red-950/50 to-black/90 border-2 border-red-500/50 rounded-2xl backdrop-blur-xl shadow-[0_20px_60px_rgba(239,68,68,0.2)] hover:shadow-[0_30px_80px_rgba(239,68,68,0.4)] transition-all duration-500"
              >
                <div className="flex flex-col items-center text-center h-full justify-center p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-[0_10px_30px_rgba(239,68,68,0.3)]">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-white font-black text-xl mb-2">ANAYASALARIMIZ</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Türkiye Cumhuriyeti'nin anayasal yapısı ve hukuki temelleri
                  </p>
                  <ChevronRight className="h-5 w-5 text-red-400 mt-2" />
                </div>
              </ModernTechButton>
            </div>

            {/* Görev Diriliş Button */}
            <div className="content-stable ultra-stable no-motion">
              <ModernTechButton
                onClick={() => navigateToPage("/gorevdirilis")}
                className="w-full h-44 sm:h-40 bg-gradient-to-br from-black/90 via-red-950/50 to-black/90 border-2 border-red-500/50 rounded-2xl backdrop-blur-xl shadow-[0_20px_60px_rgba(239,68,68,0.2)] hover:shadow-[0_30px_80px_rgba(239,68,68,0.4)] transition-all duration-500"
              >
                <div className="flex flex-col items-center text-center h-full justify-center p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-[0_10px_30px_rgba(239,68,68,0.3)]">
                    <Crown className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-white font-black text-xl mb-2">GÖREV DİRİLİŞ</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Ulusal görevler ve diriliş projelerinin koordinasyon merkezi
                  </p>
                  <ChevronRight className="h-5 w-5 text-red-400 mt-2" />
                </div>
              </ModernTechButton>
            </div>

            {/* Halk Defteri & Manifestolar Button */}
            <div className="content-stable ultra-stable no-motion">
              <ModernTechButton
                onClick={() => navigateToPage("/halkdefteri")}
                className="w-full h-44 sm:h-40 bg-gradient-to-br from-black/90 via-red-950/50 to-black/90 border-2 border-red-500/50 rounded-2xl backdrop-blur-xl shadow-[0_20px_60px_rgba(239,68,68,0.2)] hover:shadow-[0_30px_80px_rgba(239,68,68,0.4)] transition-all duration-500"
              >
                <div className="flex flex-col items-center text-center h-full justify-center p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-[0_10px_30px_rgba(239,68,68,0.3)]">
                    <Flag className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-white font-black text-xl mb-2">HALK DEFTERİ</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Manifestolar ve halk iradesinin dijital kayıt sistemi
                  </p>
                  <ChevronRight className="h-5 w-5 text-red-400 mt-2" />
                </div>
              </ModernTechButton>
            </div>
          </div>

          {/* Premium Navigation */}
          <div className="flex justify-center ultra-stable no-motion">
            <NavButtons />
          </div>
        </div>
        
        {/* Global Translation System */}
        <GlobalTranslator />
      </div>
    </ModernLayout>
  );
}