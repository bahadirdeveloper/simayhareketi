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
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-900/20 via-black to-red-800/20 border-2 border-red-500/30 static-container">
            {/* Cinematik Arka Plan SVG */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                {/* Türk Tarihi Teması - Anadolu Silüeti */}
                <defs>
                  <linearGradient id="turkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#dc2626" stopOpacity="0.6"/>
                    <stop offset="50%" stopColor="#ea580c" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#dc2626" stopOpacity="0.6"/>
                  </linearGradient>
                </defs>
                {/* Anadolu Dağları */}
                <path d="M0,200 Q100,150 200,180 T400,160 L400,300 L0,300 Z" fill="url(#turkGrad)"/>
                {/* Güneş */}
                <circle cx="320" cy="80" r="30" fill="#fbbf24" opacity="0.7"/>
                {/* Yıldız ve Ay */}
                <path d="M50,50 L55,65 L70,65 L58,75 L63,90 L50,80 L37,90 L42,75 L30,65 L45,65 Z" fill="#fbbf24" opacity="0.8"/>
                <path d="M100,40 Q115,35 120,50 Q115,65 100,60 Q90,50 100,40 Z" fill="#fbbf24" opacity="0.8"/>
              </svg>
            </div>
            
            {/* İçerik */}
            <ModernTechButton
              onClick={() => navigateToPage("/turknedir")}
              className="relative w-full h-48 bg-transparent border-0 rounded-2xl static-container"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 rounded-2xl"></div>
              <div className="relative h-full flex flex-col justify-end p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">TÜRK NEDİR?</h3>
                  <p className="text-red-200 text-sm opacity-80">Kimlik • Tarih • Değerler</p>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
              </div>
            </ModernTechButton>
          </div>

          {/* ANAYASALARIMIZ - Cinematik Kart */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/20 via-black to-blue-800/20 border-2 border-blue-500/30 static-container">
            {/* Adalet Teması SVG */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <defs>
                  <linearGradient id="justiceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.6"/>
                    <stop offset="50%" stopColor="#1d4ed8" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.6"/>
                  </linearGradient>
                </defs>
                {/* Adalet Terazi */}
                <rect x="195" y="50" width="10" height="150" fill="url(#justiceGrad)"/>
                <circle cx="200" cy="50" r="15" fill="#fbbf24" opacity="0.8"/>
                {/* Teraziler */}
                <line x1="150" y1="100" x2="250" y2="100" stroke="#fbbf24" strokeWidth="3" opacity="0.8"/>
                <rect x="130" y="95" width="40" height="15" rx="5" fill="url(#justiceGrad)"/>
                <rect x="230" y="95" width="40" height="15" rx="5" fill="url(#justiceGrad)"/>
                {/* Kitap */}
                <rect x="180" y="180" width="40" height="30" fill="url(#justiceGrad)" opacity="0.8"/>
                <rect x="175" y="185" width="50" height="25" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.6"/>
              </svg>
            </div>
            
            <ModernTechButton
              onClick={() => navigateToPage("/anayasalar")}
              className="relative w-full h-48 bg-transparent border-0 rounded-2xl static-container"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 rounded-2xl"></div>
              <div className="relative h-full flex flex-col justify-end p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">ANAYASALARIMIZ</h3>
                  <p className="text-blue-200 text-sm opacity-80">Hukuk • Adalet • Düzen</p>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              </div>
            </ModernTechButton>
          </div>

          {/* MANİFESTO - Cinematik Kart */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 via-black to-purple-800/20 border-2 border-purple-500/30 static-container">
            {/* Devrim Teması SVG */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <defs>
                  <linearGradient id="revolutionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.6"/>
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.6"/>
                  </linearGradient>
                </defs>
                {/* Yükselen El */}
                <path d="M180,200 Q190,180 200,160 Q210,180 220,200" stroke="url(#revolutionGrad)" strokeWidth="8" fill="none"/>
                <circle cx="200" cy="150" r="20" fill="url(#revolutionGrad)"/>
                {/* Işık Huzmesi */}
                <path d="M200,50 L190,120 L210,120 Z" fill="#fbbf24" opacity="0.7"/>
                <path d="M200,50 L180,100 L220,100 Z" fill="#fbbf24" opacity="0.4"/>
                {/* Kitap Sayfaları */}
                <rect x="120" y="180" width="60" height="40" fill="url(#revolutionGrad)" opacity="0.6"/>
                <rect x="130" y="170" width="60" height="40" fill="url(#revolutionGrad)" opacity="0.4"/>
                <rect x="140" y="160" width="60" height="40" fill="url(#revolutionGrad)" opacity="0.2"/>
              </svg>
            </div>
            
            <ModernTechButton
              onClick={() => navigateToPage("/halk-manifestolar")}
              className="relative w-full h-48 bg-transparent border-0 rounded-2xl static-container"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 rounded-2xl"></div>
              <div className="relative h-full flex flex-col justify-end p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">MANİFESTO</h3>
                  <p className="text-purple-200 text-sm opacity-80">İdeal • Vizyon • Gelecek</p>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              </div>
            </ModernTechButton>
          </div>

          {/* ÇAĞRI - Cinematik Kart */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-900/20 via-black to-orange-800/20 border-2 border-orange-500/30 static-container">
            {/* Çağrı Teması SVG */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <defs>
                  <linearGradient id="callGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ea580c" stopOpacity="0.6"/>
                    <stop offset="50%" stopColor="#f97316" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#ea580c" stopOpacity="0.6"/>
                  </linearGradient>
                </defs>
                {/* Mega Horn */}
                <path d="M100,140 L160,120 L200,130 L200,170 L160,180 L100,160 Z" fill="url(#callGrad)"/>
                <circle cx="200" cy="150" r="25" fill="#fbbf24" opacity="0.7"/>
                {/* Ses Dalgaları */}
                <path d="M220,130 Q240,150 220,170" stroke="#fbbf24" strokeWidth="3" fill="none" opacity="0.8"/>
                <path d="M250,120 Q280,150 250,180" stroke="#fbbf24" strokeWidth="3" fill="none" opacity="0.6"/>
                <path d="M290,110 Q330,150 290,190" stroke="#fbbf24" strokeWidth="3" fill="none" opacity="0.4"/>
                {/* Bayrak */}
                <rect x="60" y="80" width="50" height="30" fill="url(#callGrad)" opacity="0.8"/>
                <rect x="55" y="80" width="5" height="60" fill="#fbbf24" opacity="0.8"/>
              </svg>
            </div>
            
            <ModernTechButton
              onClick={() => navigateToPage("/cagri")}
              className="relative w-full h-48 bg-transparent border-0 rounded-2xl static-container"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 rounded-2xl"></div>
              <div className="relative h-full flex flex-col justify-end p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">ÇAĞRI</h3>
                  <p className="text-orange-200 text-sm opacity-80">Ses • Çağrı • Uyanış</p>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></div>
              </div>
            </ModernTechButton>
          </div>

          {/* KATIL - Cinematik Kart */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-900/20 via-black to-green-800/20 border-2 border-green-500/30 static-container">
            {/* Birlik Teması SVG */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <defs>
                  <linearGradient id="unityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#16a34a" stopOpacity="0.6"/>
                    <stop offset="50%" stopColor="#22c55e" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#16a34a" stopOpacity="0.6"/>
                  </linearGradient>
                </defs>
                {/* El Sıkışma */}
                <path d="M150,150 L180,140 L200,150 L220,140 L250,150" stroke="url(#unityGrad)" strokeWidth="12" strokeLinecap="round"/>
                <circle cx="200" cy="150" r="15" fill="#fbbf24" opacity="0.8"/>
                {/* İnsanlar */}
                <circle cx="120" cy="120" r="12" fill="url(#unityGrad)"/>
                <rect x="114" y="132" width="12" height="20" fill="url(#unityGrad)"/>
                <circle cx="200" cy="100" r="12" fill="url(#unityGrad)"/>
                <rect x="194" y="112" width="12" height="20" fill="url(#unityGrad)"/>
                <circle cx="280" cy="120" r="12" fill="url(#unityGrad)"/>
                <rect x="274" y="132" width="12" height="20" fill="url(#unityGrad)"/>
                {/* Çember */}
                <circle cx="200" cy="150" r="80" stroke="#fbbf24" strokeWidth="2" fill="none" opacity="0.5"/>
              </svg>
            </div>
            
            <ModernTechButton
              onClick={() => navigateToPage("/katil")}
              className="relative w-full h-48 bg-transparent border-0 rounded-2xl static-container"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 rounded-2xl"></div>
              <div className="relative h-full flex flex-col justify-end p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">KATIL</h3>
                  <p className="text-green-200 text-sm opacity-80">Birlik • Güç • Dayanışma</p>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
              </div>
            </ModernTechButton>
          </div>

          {/* 100 GÖREV - Cinematik Kart */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-900/20 via-black to-yellow-800/20 border-2 border-yellow-500/30 static-container">
            {/* Görev Teması SVG */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <defs>
                  <linearGradient id="missionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#eab308" stopOpacity="0.6"/>
                    <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#eab308" stopOpacity="0.6"/>
                  </linearGradient>
                </defs>
                {/* Zirve Dağı */}
                <path d="M100,200 L200,80 L300,200 Z" fill="url(#missionGrad)"/>
                <path d="M150,200 L200,120 L250,200 Z" fill="#fbbf24" opacity="0.6"/>
                {/* Bayrak */}
                <rect x="195" y="80" width="3" height="40" fill="#dc2626"/>
                <path d="M198,80 L225,90 L198,100 Z" fill="#dc2626"/>
                {/* Yol */}
                <path d="M50,250 Q200,200 350,250" stroke="url(#missionGrad)" strokeWidth="8" opacity="0.8"/>
                {/* Adımlar */}
                <circle cx="100" cy="230" r="5" fill="#fbbf24"/>
                <circle cx="150" cy="220" r="5" fill="#fbbf24"/>
                <circle cx="200" cy="210" r="5" fill="#fbbf24"/>
                <circle cx="250" cy="220" r="5" fill="#fbbf24"/>
                <circle cx="300" cy="230" r="5" fill="#fbbf24"/>
              </svg>
            </div>
            
            <ModernTechButton
              onClick={() => navigateToPage("/gorevler")}
              className="relative w-full h-48 bg-transparent border-0 rounded-2xl static-container"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 rounded-2xl"></div>
              <div className="relative h-full flex flex-col justify-end p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">100 GÖREV</h3>
                  <p className="text-yellow-200 text-sm opacity-80">Hedef • Başarı • Diriliş</p>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full"></div>
              </div>
            </ModernTechButton>
          </div>

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