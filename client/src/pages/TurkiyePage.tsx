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
        {/* Hero Section - Ultra Basit */}
        <div className="rounded-3xl mb-16 static-container">
          <div className="bg-black border-2 border-red-500 rounded-3xl static-container">
            <div className="py-12 px-4 text-center static-container">
              {/* Flag Icon */}
              <div className="mb-10">
                <div className="w-32 h-32 mx-auto text-6xl border-2 border-red-500 rounded-2xl flex items-center justify-center bg-black static-container">
                  🇹🇷
                </div>
              </div>
              
              {/* Quote Section */}
              <div className="max-w-4xl mx-auto">
                <div className="bg-black rounded-2xl p-12 border border-red-500 static-container">
                  <p className="text-3xl font-bold text-center mb-10 text-red-400">
                    "TÜRK, ATASININ MİRASINA SAHİP ÇIKAMAZSA, GELECEĞİNİ BAŞKA MİLLETLERİN İNSAFINA BIRAKIR."
                  </p>
                  
                  <div className="text-center">
                    <p className="text-red-400 text-xl font-semibold">
                      - Atatürk -
                    </p>
                  </div>
                  
                  <div className="flex justify-center mt-12">
                    <button
                      className="px-8 py-4 rounded-2xl border-2 border-red-500 bg-black text-white font-semibold static-container"
                      onClick={handleToggleAudio}
                    >
                      {isAudioPlaying ? "Durdur" : "Oynat"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-2 gap-6 mb-16 static-container">
          <div className="static-container">
            <button
              onClick={() => navigateToPage("/turknedir")}
              className="w-full h-40 bg-black border-2 border-red-500 rounded-2xl text-white font-bold static-container"
            >
              TÜRK NEDİR?
            </button>
          </div>

          <div className="static-container">
            <button
              onClick={() => navigateToPage("/anayasalarimiz")}
              className="w-full h-40 bg-black border-2 border-red-500 rounded-2xl text-white font-bold static-container"
            >
              ANAYASALARIMIZ
            </button>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16 static-container">
          <div className="bg-black border-2 border-red-500 rounded-3xl p-12 static-container">
            <h2 className="text-4xl font-bold text-center mb-12 text-red-400">
              Türk Değerleri
            </h2>
            
            <div className="grid grid-cols-5 gap-6 static-container">
              <div className="bg-black border border-red-500 rounded-lg p-4 text-center static-container">
                <div className="text-white font-bold">MİLLİ</div>
              </div>
              <div className="bg-black border border-red-500 rounded-lg p-4 text-center static-container">
                <div className="text-white font-bold">MUASIR</div>
              </div>
              <div className="bg-black border border-red-500 rounded-lg p-4 text-center static-container">
                <div className="text-white font-bold">LAİK</div>
              </div>
              <div className="bg-black border border-red-500 rounded-lg p-4 text-center static-container">
                <div className="text-white font-bold">DEMOKRATİK</div>
              </div>
              <div className="bg-black border border-red-500 rounded-lg p-4 text-center static-container">
                <div className="text-white font-bold">SOSYAL</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center static-container">
          <NavButtons />
        </div>
        
        {/* Global Translation System */}
        <GlobalTranslator />
      </div>
    </ModernLayout>
  );
}