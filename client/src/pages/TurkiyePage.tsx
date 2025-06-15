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
        {/* Revolutionary Hero Section */}
        <div className="relative mb-24 static-container">
          {/* Cosmic Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-orange-900/20 rounded-[3rem] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,0,0,0.3),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,165,0,0.2),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(255,0,0,0.1),rgba(255,165,0,0.1),rgba(255,0,0,0.1))]"></div>
          </div>
          
          {/* Main Hero Container */}
          <div className="relative backdrop-blur-sm bg-black/40 border-4 border-red-500/30 rounded-[3rem] overflow-hidden static-container">
            
            {/* Animated Top Border */}
            <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-r from-red-500 via-orange-400 via-yellow-300 via-orange-400 to-red-500 bg-[length:200%_100%] animate-pulse"></div>
            
            {/* Content */}
            <div className="relative z-20 py-16 px-8 text-center static-container">
              
              {/* Flag with Glow Effect */}
              <div className="relative mb-12">
                <div className="absolute inset-0 bg-red-500/30 rounded-3xl blur-2xl scale-110"></div>
                <div className="relative w-40 h-40 mx-auto bg-gradient-to-br from-red-600 via-red-500 to-red-700 rounded-3xl flex items-center justify-center text-8xl border-4 border-white/20 shadow-2xl static-container">
                  🇹🇷
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                </div>
              </div>
              
              {/* Revolutionary Title */}
              <div className="mb-12">
                <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-red-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl">
                    TÜRKİYE
                  </span>
                </h1>
                <div className="h-2 w-32 mx-auto bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
              </div>
              
              {/* Quote in Glass Container */}
              <div className="max-w-5xl mx-auto mb-12">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl static-container">
                  <div className="relative">
                    <div className="absolute -top-4 -left-4 text-6xl text-red-400/50">"</div>
                    <div className="absolute -bottom-4 -right-4 text-6xl text-red-400/50">"</div>
                    
                    <p className="text-2xl md:text-4xl font-bold leading-relaxed text-center mb-8">
                      <span className="bg-gradient-to-r from-white via-red-200 to-orange-200 bg-clip-text text-transparent">
                        TÜRK, ATASININ MİRASINA SAHİP ÇIKAMAZSA,<br />
                        GELECEĞİNİ BAŞKA MİLLETLERİN İNSAFINA BIRAKIR
                      </span>
                    </p>
                    
                    <div className="text-center">
                      <div className="inline-block px-6 py-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full border border-red-400/30">
                        <p className="text-red-300 text-xl font-bold tracking-wider">
                          — ATATÜRK —
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Audio Control */}
              <div className="flex justify-center">
                <button
                  className="group relative px-12 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl border-2 border-white/20 shadow-2xl static-container overflow-hidden"
                  onClick={handleToggleAudio}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 duration-300"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    {isAudioPlaying 
                      ? <Pause className="h-8 w-8 text-white drop-shadow-lg" /> 
                      : <Play className="h-8 w-8 text-white drop-shadow-lg ml-1" />
                    }
                    <span className="text-white font-bold text-lg">
                      {isAudioPlaying ? "DURDUR" : "TÜRK MÜZİĞİ"}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Revolutionary Navigation Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-20 static-container">
          {/* TÜRK Nedir - Revolutionary Card */}
          <div className="group relative static-container">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl opacity-50 group-hover:opacity-75 duration-500"></div>
            <ModernTechButton
              onClick={() => navigateToPage("/turknedir")}
              className="relative w-full h-36 bg-gradient-to-br from-red-900/80 via-red-800/60 to-black/90 border-2 border-red-400/60 rounded-2xl overflow-hidden static-container"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="relative text-center p-4 h-full flex flex-col justify-center">
                <div className="text-lg font-black text-white mb-2 drop-shadow-lg">
                  TÜRK NEDİR?
                </div>
                <div className="text-red-300 text-xs font-semibold tracking-wide">
                  KİMLİK KEŞFİ
                </div>
              </div>
            </ModernTechButton>
          </div>

          {/* Anayasalarımız - Revolutionary Card */}
          <div className="group relative static-container">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl opacity-50 group-hover:opacity-75 duration-500"></div>
            <ModernTechButton
              onClick={() => navigateToPage("/anayasalar")}
              className="relative w-full h-36 bg-gradient-to-br from-blue-900/80 via-blue-800/60 to-black/90 border-2 border-blue-400/60 rounded-2xl overflow-hidden static-container"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="relative text-center p-4 h-full flex flex-col justify-center">
                <div className="text-lg font-black text-white mb-2 drop-shadow-lg">
                  ANAYASALARIMIZ
                </div>
                <div className="text-blue-300 text-xs font-semibold tracking-wide">
                  HUKUK TEMELİ
                </div>
              </div>
            </ModernTechButton>
          </div>

          {/* Manifesto - Revolutionary Card */}
          <div className="group relative static-container">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl opacity-50 group-hover:opacity-75 duration-500"></div>
            <ModernTechButton
              onClick={() => navigateToPage("/halk-manifestolar")}
              className="relative w-full h-36 bg-gradient-to-br from-purple-900/80 via-purple-800/60 to-black/90 border-2 border-purple-400/60 rounded-2xl overflow-hidden static-container"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="relative text-center p-4 h-full flex flex-col justify-center">
                <div className="text-lg font-black text-white mb-2 drop-shadow-lg">
                  MANİFESTO
                </div>
                <div className="text-purple-300 text-xs font-semibold tracking-wide">
                  HALK BEYANNAMESİ
                </div>
              </div>
            </ModernTechButton>
          </div>

          {/* Çağrı - Revolutionary Card */}
          <div className="group relative static-container">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-2xl blur-xl group-hover:blur-2xl opacity-50 group-hover:opacity-75 duration-500"></div>
            <ModernTechButton
              onClick={() => navigateToPage("/cagri")}
              className="relative w-full h-36 bg-gradient-to-br from-orange-900/80 via-orange-800/60 to-black/90 border-2 border-orange-400/60 rounded-2xl overflow-hidden static-container"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="relative text-center p-4 h-full flex flex-col justify-center">
                <div className="text-lg font-black text-white mb-2 drop-shadow-lg">
                  ÇAĞRI
                </div>
                <div className="text-orange-300 text-xs font-semibold tracking-wide">
                  HALK SESİ
                </div>
              </div>
            </ModernTechButton>
          </div>

          {/* Katıl - Revolutionary Card */}
          <div className="group relative static-container">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:blur-2xl opacity-50 group-hover:opacity-75 duration-500"></div>
            <ModernTechButton
              onClick={() => navigateToPage("/katil")}
              className="relative w-full h-36 bg-gradient-to-br from-green-900/80 via-green-800/60 to-black/90 border-2 border-green-400/60 rounded-2xl overflow-hidden static-container"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="relative text-center p-4 h-full flex flex-col justify-center">
                <div className="text-lg font-black text-white mb-2 drop-shadow-lg">
                  KATIL
                </div>
                <div className="text-green-300 text-xs font-semibold tracking-wide">
                  BİRLİK OL
                </div>
              </div>
            </ModernTechButton>
          </div>

          {/* 100 Görev - Revolutionary Card */}
          <div className="group relative static-container">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-2xl blur-xl group-hover:blur-2xl opacity-50 group-hover:opacity-75 duration-500"></div>
            <ModernTechButton
              onClick={() => navigateToPage("/gorevler")}
              className="relative w-full h-36 bg-gradient-to-br from-yellow-900/80 via-yellow-800/60 to-black/90 border-2 border-yellow-400/60 rounded-2xl overflow-hidden static-container"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="relative text-center p-4 h-full flex flex-col justify-center">
                <div className="text-lg font-black text-white mb-2 drop-shadow-lg">
                  100 GÖREV
                </div>
                <div className="text-yellow-300 text-xs font-semibold tracking-wide">
                  DİRİLİŞ PLANI
                </div>
              </div>
            </ModernTechButton>
          </div>
        </div>

        {/* Revolutionary Values Section */}
        <div className="mb-24 static-container">
          <div className="relative">
            {/* Cosmic Values Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-black to-orange-900/30 rounded-[3rem] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,0,0,0.2),transparent_50%)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,165,0,0.15),transparent_50%)]"></div>
            </div>
            
            <div className="relative backdrop-blur-sm bg-black/30 border-4 border-gradient-to-r from-red-500/40 to-orange-500/40 rounded-[3rem] p-16 static-container">
              
              {/* Revolutionary Title */}
              <div className="text-center mb-16">
                <h2 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-red-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl">
                    TÜRK DEĞERLERİ
                  </span>
                </h2>
                <div className="flex justify-center">
                  <div className="h-3 w-64 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full"></div>
                </div>
              </div>
              
              {/* Revolutionary Values Grid */}
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
                    'from-red-500 to-red-700',
                    'from-blue-500 to-blue-700', 
                    'from-green-500 to-green-700',
                    'from-purple-500 to-purple-700',
                    'from-orange-500 to-orange-700'
                  ];
                  
                  return (
                    <div key={valueId} className="group relative static-container">
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${colors[index]}/20 rounded-3xl blur-2xl group-hover:blur-3xl opacity-50 group-hover:opacity-75 duration-700 scale-110`}></div>
                      
                      {/* Value Card */}
                      <div className={`relative backdrop-blur-xl bg-black/60 border-2 border-gradient-to-br ${colors[index]}/60 rounded-3xl p-8 h-48 flex flex-col items-center justify-center static-container overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        
                        {/* Value Icon/Symbol */}
                        <div className={`relative mb-4 w-16 h-16 bg-gradient-to-br ${colors[index]} rounded-2xl flex items-center justify-center shadow-2xl`}>
                          <div className="text-white text-2xl font-black">
                            {valueTexts[valueId][0]}
                          </div>
                        </div>
                        
                        {/* Value Name */}
                        <div className="relative text-center">
                          <h3 className="text-2xl font-black text-white mb-2 drop-shadow-lg">
                            {valueTexts[valueId]}
                          </h3>
                          <div className={`h-1 w-16 mx-auto bg-gradient-to-r ${colors[index]} rounded-full`}></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Revolutionary Additional Pages */}
        <div className="mb-24 static-container">
          <div className="relative">
            {/* Cosmic Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/25 via-black to-purple-900/25 rounded-[3rem] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.2),transparent_50%)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.15),transparent_50%)]"></div>
            </div>
            
            <div className="relative backdrop-blur-sm bg-black/30 border-4 border-blue-500/30 rounded-[3rem] p-12 static-container">
              
              {/* Revolutionary Title */}
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
                    ÖZEL SAYFALAR
                  </span>
                </h2>
                <div className="flex justify-center">
                  <div className="h-2 w-48 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 static-container">
                {/* Halk Defteri */}
                <ModernTechButton
                  onClick={() => navigateToPage("/halk-defteri")}
                  className="h-24 bg-gradient-to-br from-black/90 via-cyan-950/50 to-black/90 border border-cyan-500/50 rounded-xl static-container"
                >
                  <div className="text-center">
                    <div className="text-xs font-bold text-white mb-1">HALK DEFTERİ</div>
                    <div className="text-cyan-400 text-xs opacity-80">Halk Kayıtları</div>
                  </div>
                </ModernTechButton>

                {/* Görev Davet */}
                <ModernTechButton
                  onClick={() => navigateToPage("/gorev-davet")}
                  className="h-24 bg-gradient-to-br from-black/90 via-indigo-950/50 to-black/90 border border-indigo-500/50 rounded-xl static-container"
                >
                  <div className="text-center">
                    <div className="text-xs font-bold text-white mb-1">GÖREV DAVET</div>
                    <div className="text-indigo-400 text-xs opacity-80">Davet Sistemi</div>
                  </div>
                </ModernTechButton>

                {/* Kurucu Eksikleri */}
                <ModernTechButton
                  onClick={() => navigateToPage("/kurucu-eksikleri")}
                  className="h-24 bg-gradient-to-br from-black/90 via-pink-950/50 to-black/90 border border-pink-500/50 rounded-xl static-container"
                >
                  <div className="text-center">
                    <div className="text-xs font-bold text-white mb-1">KURUCU EKSİKLERİ</div>
                    <div className="text-pink-400 text-xs opacity-80">Eksiklikler</div>
                  </div>
                </ModernTechButton>

                {/* Amaç Savaş */}
                <ModernTechButton
                  onClick={() => navigateToPage("/amac-savas")}
                  className="h-24 bg-gradient-to-br from-black/90 via-rose-950/50 to-black/90 border border-rose-500/50 rounded-xl static-container"
                >
                  <div className="text-center">
                    <div className="text-xs font-bold text-white mb-1">AMAÇ SAVAŞ</div>
                    <div className="text-rose-400 text-xs opacity-80">Hedefler</div>
                  </div>
                </ModernTechButton>

                {/* Sertifika */}
                <ModernTechButton
                  onClick={() => navigateToPage("/sertifika")}
                  className="h-24 bg-gradient-to-br from-black/90 via-emerald-950/50 to-black/90 border border-emerald-500/50 rounded-xl static-container"
                >
                  <div className="text-center">
                    <div className="text-xs font-bold text-white mb-1">SERTİFİKA</div>
                    <div className="text-emerald-400 text-xs opacity-80">Belgelendirme</div>
                  </div>
                </ModernTechButton>

                {/* Entegrasyon */}
                <ModernTechButton
                  onClick={() => navigateToPage("/entegrasyon")}
                  className="h-24 bg-gradient-to-br from-black/90 via-teal-950/50 to-black/90 border border-teal-500/50 rounded-xl static-container"
                >
                  <div className="text-center">
                    <div className="text-xs font-bold text-white mb-1">ENTEGRASYON</div>
                    <div className="text-teal-400 text-xs opacity-80">Sistem Entegrasyonu</div>
                  </div>
                </ModernTechButton>

                {/* Halk Koordinasyon */}
                <ModernTechButton
                  onClick={() => navigateToPage("/halk-koordinasyon")}
                  className="h-24 bg-gradient-to-br from-black/90 via-violet-950/50 to-black/90 border border-violet-500/50 rounded-xl static-container"
                >
                  <div className="text-center">
                    <div className="text-xs font-bold text-white mb-1">HALK KOORDİNASYON</div>
                    <div className="text-violet-400 text-xs opacity-80">Koordinasyon</div>
                  </div>
                </ModernTechButton>

                {/* Birleşik Manifesto */}
                <ModernTechButton
                  onClick={() => navigateToPage("/birlesik-manifesto")}
                  className="h-24 bg-gradient-to-br from-black/90 via-amber-950/50 to-black/90 border border-amber-500/50 rounded-xl static-container"
                >
                  <div className="text-center">
                    <div className="text-xs font-bold text-white mb-1">BİRLEŞİK MANİFESTO</div>
                    <div className="text-amber-400 text-xs opacity-80">Birleşik Manifesto</div>
                  </div>
                </ModernTechButton>
              </div>
            </div>
          </div>
        </div>

        {/* Revolutionary International Section */}
        <div className="mb-24 static-container">
          <div className="relative">
            {/* Global Cosmic Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/25 via-black to-emerald-900/25 rounded-[3rem] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(34,197,94,0.2),transparent_50%)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(16,185,129,0.15),transparent_50%)]"></div>
            </div>
            
            <div className="relative backdrop-blur-sm bg-black/30 border-4 border-green-500/30 rounded-[3rem] p-12 static-container">
              
              {/* Global Unity Title */}
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent drop-shadow-2xl">
                    KÜRESEL DAYANIŞMA
                  </span>
                </h2>
                <div className="flex justify-center">
                  <div className="h-2 w-64 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 static-container">
                {/* Russia - Revolutionary Nation Card */}
                <div className="group relative static-container">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-700/20 rounded-2xl blur-xl group-hover:blur-2xl opacity-50 group-hover:opacity-75 duration-500"></div>
                  <ModernTechButton
                    onClick={() => navigateToPage("/russia")}
                    className="relative h-32 bg-gradient-to-br from-red-900/80 via-red-800/60 to-black/90 border-2 border-red-400/60 rounded-2xl overflow-hidden static-container"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="relative text-center p-4 h-full flex flex-col justify-center">
                      <div className="text-4xl mb-2">🇷🇺</div>
                      <div className="text-lg font-black text-white mb-1 drop-shadow-lg">RUSYA</div>
                      <div className="text-red-300 text-xs font-semibold">DOSTLUK</div>
                    </div>
                  </ModernTechButton>
                </div>

                {/* Iran - Revolutionary Nation Card */}
                <div className="group relative static-container">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-700/20 rounded-2xl blur-xl group-hover:blur-2xl opacity-50 group-hover:opacity-75 duration-500"></div>
                  <ModernTechButton
                    onClick={() => navigateToPage("/iran")}
                    className="relative h-32 bg-gradient-to-br from-green-900/80 via-green-800/60 to-black/90 border-2 border-green-400/60 rounded-2xl overflow-hidden static-container"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="relative text-center p-4 h-full flex flex-col justify-center">
                      <div className="text-4xl mb-2">🇮🇷</div>
                      <div className="text-lg font-black text-white mb-1 drop-shadow-lg">İRAN</div>
                      <div className="text-green-300 text-xs font-semibold">KARDEŞLİK</div>
                    </div>
                  </ModernTechButton>
                </div>

                {/* Palestine - Revolutionary Nation Card */}
                <div className="group relative static-container">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 rounded-2xl blur-xl group-hover:blur-2xl opacity-50 group-hover:opacity-75 duration-500"></div>
                  <ModernTechButton
                    onClick={() => navigateToPage("/palestine")}
                    className="relative h-32 bg-gradient-to-br from-emerald-900/80 via-emerald-800/60 to-black/90 border-2 border-emerald-400/60 rounded-2xl overflow-hidden static-container"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="relative text-center p-4 h-full flex flex-col justify-center">
                      <div className="text-4xl mb-2">🇵🇸</div>
                      <div className="text-lg font-black text-white mb-1 drop-shadow-lg">FİLİSTİN</div>
                      <div className="text-emerald-300 text-xs font-semibold">ADALET</div>
                    </div>
                  </ModernTechButton>
                </div>

                {/* Oppressed Nations - Revolutionary Card */}
                <div className="group relative static-container">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-700/20 rounded-2xl blur-xl group-hover:blur-2xl opacity-50 group-hover:opacity-75 duration-500"></div>
                  <ModernTechButton
                    onClick={() => navigateToPage("/oppressed")}
                    className="relative h-32 bg-gradient-to-br from-purple-900/80 via-purple-800/60 to-black/90 border-2 border-purple-400/60 rounded-2xl overflow-hidden static-container"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="relative text-center p-4 h-full flex flex-col justify-center">
                      <div className="text-4xl mb-2">🌍</div>
                      <div className="text-sm font-black text-white mb-1 drop-shadow-lg">MAZLUM MİLLETLER</div>
                      <div className="text-purple-300 text-xs font-semibold">DAYANIŞMA</div>
                    </div>
                  </ModernTechButton>
                </div>
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