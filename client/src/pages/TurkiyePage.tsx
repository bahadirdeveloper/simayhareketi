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

        {/* VIP Cinematik Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 static-container">
          
          {/* TÜRK NEDİR? - Cinematik Kart */}
          <ModernTechButton
            onClick={() => navigateToPage("/turknedir")}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-900/90 via-red-950/95 to-black border-2 border-red-500/50 hover:border-red-400/70 transition-all duration-500 h-48 static-container"
          >
            {/* Arka Plan Deseni */}
            <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500">
              <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="turkishGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#dc2626"/>
                    <stop offset="100%" stopColor="#ea580c"/>
                  </linearGradient>
                </defs>
                {/* Anadolu Silüeti */}
                <path d="M0,150 Q100,120 200,140 T400,130 L400,200 L0,200 Z" fill="url(#turkishGrad)" opacity="0.4"/>
                {/* Güneş */}
                <circle cx="320" cy="60" r="25" fill="#fbbf24" opacity="0.6"/>
                {/* Ay Yıldız */}
                <path d="M60,40 L65,50 L75,50 L67,57 L70,67 L60,62 L50,67 L53,57 L45,50 L55,50 Z" fill="#fbbf24" opacity="0.7"/>
                <path d="M100,35 Q110,30 115,40 Q110,50 100,45 Q95,40 100,35 Z" fill="#fbbf24" opacity="0.7"/>
              </svg>
            </div>
            
            {/* İçerik Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            {/* Ana İçerik */}
            <div className="relative h-full flex flex-col justify-end p-6 z-10">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-200 transition-colors">TÜRK NEDİR?</h3>
                <p className="text-red-200/80 text-sm">Kimlik • Tarih • Değerler</p>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full group-hover:h-1.5 transition-all"></div>
            </div>
          </ModernTechButton>

          {/* ANAYASALARIMIZ - Cinematik Kart */}
          <ModernTechButton
            onClick={() => navigateToPage("/anayasalar")}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/90 via-blue-950/95 to-black border-2 border-blue-500/50 hover:border-blue-400/70 transition-all duration-500 h-48 static-container"
          >
            {/* Adalet Teması */}
            <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500">
              <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="justiceGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb"/>
                    <stop offset="100%" stopColor="#1d4ed8"/>
                  </linearGradient>
                </defs>
                {/* Adalet Terazisi */}
                <rect x="195" y="40" width="8" height="100" fill="url(#justiceGrad2)" opacity="0.6"/>
                <circle cx="199" cy="40" r="12" fill="#fbbf24" opacity="0.7"/>
                <line x1="160" y1="80" x2="240" y2="80" stroke="#fbbf24" strokeWidth="3" opacity="0.6"/>
                <rect x="145" y="75" width="30" height="12" rx="3" fill="url(#justiceGrad2)" opacity="0.5"/>
                <rect x="225" y="75" width="30" height="12" rx="3" fill="url(#justiceGrad2)" opacity="0.5"/>
                {/* Anayasa Kitabı */}
                <rect x="170" y="120" width="60" height="40" fill="url(#justiceGrad2)" opacity="0.4"/>
                <rect x="175" y="125" width="50" height="30" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.5"/>
              </svg>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            <div className="relative h-full flex flex-col justify-end p-6 z-10">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">ANAYASALARIMIZ</h3>
                <p className="text-blue-200/80 text-sm">Hukuk • Adalet • Düzen</p>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full group-hover:h-1.5 transition-all"></div>
            </div>
          </ModernTechButton>

          {/* MANİFESTO - Cinematik Kart */}
          <ModernTechButton
            onClick={() => navigateToPage("/halk-manifestolar")}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/90 via-purple-950/95 to-black border-2 border-purple-500/50 hover:border-purple-400/70 transition-all duration-500 h-48 static-container"
          >
            {/* Devrim Teması */}
            <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500">
              <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="manifestoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7c3aed"/>
                    <stop offset="100%" stopColor="#8b5cf6"/>
                  </linearGradient>
                </defs>
                {/* Yükselen El */}
                <path d="M180,150 Q190,130 200,110 Q210,130 220,150" stroke="url(#manifestoGrad)" strokeWidth="6" fill="none" opacity="0.6"/>
                <circle cx="200" cy="105" r="15" fill="url(#manifestoGrad)" opacity="0.5"/>
                {/* Işık Huzmesi */}
                <path d="M200,30 L190,80 L210,80 Z" fill="#fbbf24" opacity="0.6"/>
                <path d="M200,30 L185,70 L215,70 Z" fill="#fbbf24" opacity="0.3"/>
                {/* Manifesto Kitapları */}
                <rect x="120" y="130" width="50" height="35" fill="url(#manifestoGrad)" opacity="0.5"/>
                <rect x="130" y="125" width="50" height="35" fill="url(#manifestoGrad)" opacity="0.3"/>
                <rect x="140" y="120" width="50" height="35" fill="url(#manifestoGrad)" opacity="0.2"/>
              </svg>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            <div className="relative h-full flex flex-col justify-end p-6 z-10">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">MANİFESTO</h3>
                <p className="text-purple-200/80 text-sm">İdeal • Vizyon • Gelecek</p>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:h-1.5 transition-all"></div>
            </div>
          </ModernTechButton>

          {/* ÇAĞRI - Cinematik Kart */}
          <ModernTechButton
            onClick={() => navigateToPage("/cagri")}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-900/90 via-orange-950/95 to-black border-2 border-orange-500/50 hover:border-orange-400/70 transition-all duration-500 h-48 static-container"
          >
            <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500">
              <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="callGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ea580c"/>
                    <stop offset="100%" stopColor="#f97316"/>
                  </linearGradient>
                </defs>
                {/* Megafon */}
                <path d="M100,90 L150,80 L180,85 L180,115 L150,120 L100,110 Z" fill="url(#callGrad2)" opacity="0.6"/>
                <circle cx="180" cy="100" r="20" fill="#fbbf24" opacity="0.7"/>
                {/* Ses Dalgaları */}
                <path d="M200,85 Q215,100 200,115" stroke="#fbbf24" strokeWidth="3" fill="none" opacity="0.6"/>
                <path d="M220,80 Q240,100 220,120" stroke="#fbbf24" strokeWidth="3" fill="none" opacity="0.4"/>
                <path d="M250,75 Q275,100 250,125" stroke="#fbbf24" strokeWidth="3" fill="none" opacity="0.3"/>
                {/* Bayrak */}
                <rect x="60" y="60" width="40" height="25" fill="url(#callGrad2)" opacity="0.5"/>
                <rect x="55" y="60" width="4" height="50" fill="#fbbf24" opacity="0.6"/>
              </svg>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            <div className="relative h-full flex flex-col justify-end p-6 z-10">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-200 transition-colors">ÇAĞRI</h3>
                <p className="text-orange-200/80 text-sm">Ses • Çağrı • Uyanış</p>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full group-hover:h-1.5 transition-all"></div>
            </div>
          </ModernTechButton>

          {/* KATIL - Cinematik Kart */}
          <ModernTechButton
            onClick={() => navigateToPage("/katil")}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-900/90 via-green-950/95 to-black border-2 border-green-500/50 hover:border-green-400/70 transition-all duration-500 h-48 static-container"
          >
            <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500">
              <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="unityGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#16a34a"/>
                    <stop offset="100%" stopColor="#22c55e"/>
                  </linearGradient>
                </defs>
                {/* El Sıkışma */}
                <path d="M150,100 L180,95 L200,100 L220,95 L250,100" stroke="url(#unityGrad2)" strokeWidth="8" strokeLinecap="round" opacity="0.6"/>
                <circle cx="200" cy="100" r="12" fill="#fbbf24" opacity="0.7"/>
                {/* İnsanlar */}
                <circle cx="120" cy="80" r="10" fill="url(#unityGrad2)" opacity="0.5"/>
                <rect x="115" y="90" width="10" height="15" fill="url(#unityGrad2)" opacity="0.5"/>
                <circle cx="200" cy="70" r="10" fill="url(#unityGrad2)" opacity="0.5"/>
                <rect x="195" y="80" width="10" height="15" fill="url(#unityGrad2)" opacity="0.5"/>
                <circle cx="280" cy="80" r="10" fill="url(#unityGrad2)" opacity="0.5"/>
                <rect x="275" y="90" width="10" height="15" fill="url(#unityGrad2)" opacity="0.5"/>
                {/* Birlik Çemberi */}
                <circle cx="200" cy="100" r="60" stroke="#fbbf24" strokeWidth="2" fill="none" opacity="0.4"/>
              </svg>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            <div className="relative h-full flex flex-col justify-end p-6 z-10">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-200 transition-colors">KATIL</h3>
                <p className="text-green-200/80 text-sm">Birlik • Güç • Dayanışma</p>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full group-hover:h-1.5 transition-all"></div>
            </div>
          </ModernTechButton>

          {/* 100 GÖREV - Cinematik Kart */}
          <ModernTechButton
            onClick={() => navigateToPage("/gorevler")}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-900/90 via-yellow-950/95 to-black border-2 border-yellow-500/50 hover:border-yellow-400/70 transition-all duration-500 h-48 static-container"
          >
            <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500">
              <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="missionGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#eab308"/>
                    <stop offset="100%" stopColor="#fbbf24"/>
                  </linearGradient>
                </defs>
                {/* Zirve Dağı */}
                <path d="M100,150 L200,50 L300,150 Z" fill="url(#missionGrad2)" opacity="0.4"/>
                <path d="M150,150 L200,80 L250,150 Z" fill="#fbbf24" opacity="0.3"/>
                {/* Bayrak */}
                <rect x="197" y="50" width="3" height="30" fill="#dc2626" opacity="0.7"/>
                <path d="M200,50 L220,55 L200,65 Z" fill="#dc2626" opacity="0.7"/>
                {/* Başarı Yolu */}
                <path d="M50,170 Q200,140 350,170" stroke="url(#missionGrad2)" strokeWidth="6" opacity="0.5"/>
                {/* Adımlar */}
                <circle cx="100" cy="160" r="4" fill="#fbbf24" opacity="0.6"/>
                <circle cx="150" cy="155" r="4" fill="#fbbf24" opacity="0.6"/>
                <circle cx="200" cy="150" r="4" fill="#fbbf24" opacity="0.6"/>
                <circle cx="250" cy="155" r="4" fill="#fbbf24" opacity="0.6"/>
                <circle cx="300" cy="160" r="4" fill="#fbbf24" opacity="0.6"/>
              </svg>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            <div className="relative h-full flex flex-col justify-end p-6 z-10">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-200 transition-colors">100 GÖREV</h3>
                <p className="text-yellow-200/80 text-sm">Hedef • Başarı • Diriliş</p>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full group-hover:h-1.5 transition-all"></div>
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