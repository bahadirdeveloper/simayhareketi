import { ReactNode, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowLeft, MessageCircle, ExternalLink } from 'lucide-react';
import SimpleFuturisticTurkish from './SimpleFuturisticTurkish';
import AudioControl from './AudioControl';
import LanguageSelector from './LanguageSelector';
import AccessibilityReader from './AccessibilityReader';
import { ModernTechButton } from './ModernTechButton';
import { initAudio, playSoundtrack } from '@/lib/audio';

interface ModernLayoutProps {
  children: ReactNode;
  audioKey?: string;
  showLanguageSelector?: boolean;
  showBackButton?: boolean;
  pageContent?: string;
  pageName?: string;
  onAudioToggle?: () => void;
}

export default function ModernLayout({
  children,
  audioKey = 'home',
  showLanguageSelector = false,
  showBackButton = false,
  pageContent = "Cumhuriyet Güncellenme Platformuna hoş geldiniz. Bu platformda güncel bilgilere erişebilir, Türkiye'nin dijital dönüşümüne katkıda bulunabilirsiniz.",
  pageName = "Anasayfa",
  onAudioToggle
}: ModernLayoutProps) {
  const [, navigate] = useLocation();

  useEffect(() => {
    initAudio(audioKey);
    
    // Record visit
    const recordVisit = async () => {
      try {
        await fetch('/api/visits', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: window.location.pathname,
            referrer: document.referrer || '',
            language: 'tr', // Gerekli alan
            hasInteracted: false
          }),
        });
      } catch (error) {
        console.error('Failed to record visit', error);
      }
    };
    
    recordVisit();
  }, [audioKey]);

  const handleToggleAudio = () => {
    playSoundtrack();
    
    // Eğer özel bir onAudioToggle fonksiyonu sağlanmışsa, onu da çağır
    if (onAudioToggle) {
      onAudioToggle();
    }
  };

  return (
    <>
      <SimpleFuturisticTurkish />
      
      <div className="min-h-screen text-white relative overflow-x-hidden bg-gradient-to-b from-gray-950 via-black to-black">
        {/* Modern technological background with Turkish influences */}
        <div className="absolute inset-0 z-0">
          {/* Subtle digital noise texture */}
          <div className="absolute inset-0 bg-noise opacity-5"></div>
          
          {/* Modernized grid pattern - more tech-focused */}
          <div className="absolute inset-0 opacity-5">
            {/* Horizontal grid lines - reduced for performance */}
            {[...Array(10)].map((_, i) => (
              <div 
                key={`grid-h-${i}`} 
                className="absolute w-full h-[0.5px] bg-red-500" 
                style={{ top: `${i * 10}%` }} 
              />
            ))}
            
            {/* Vertical grid lines - reduced for performance */}
            {[...Array(10)].map((_, i) => (
              <div 
                key={`grid-v-${i}`} 
                className="absolute h-full w-[0.5px] bg-red-500" 
                style={{ left: `${i * 10}%` }} 
              />
            ))}
          </div>
          
          {/* Abstract decorative elements - inspired by Turkish architectural patterns */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-red-900/10 to-transparent opacity-20"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-red-900/10 to-transparent opacity-20"></div>
          
          {/* Digital circuit-like elements */}
          <div className="absolute top-10 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/30 to-transparent"></div>
          <div className="absolute bottom-10 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/30 to-transparent"></div>
          <div className="absolute top-0 right-10 w-[1px] h-full bg-gradient-to-b from-red-600/20 via-transparent to-red-600/20"></div>
          <div className="absolute top-0 left-10 w-[1px] h-full bg-gradient-to-b from-red-600/20 via-transparent to-red-600/20"></div>
        </div>
        
        {/* Geometric accent elements for a more professional look */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
        <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-red-600/30 via-transparent to-red-600/30"></div>
        <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-red-600/30 via-transparent to-red-600/30"></div>
        
        {/* Enhanced Back button */}
        {showBackButton && (
          <div className="fixed top-5 left-5 z-50">
            <ModernTechButton 
              size="sm"
              variant="turkish"
              glow="subtle" 
              border="subtle"
              onClick={() => navigate("/")}
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              <span className="tracking-wide">Anasayfaya Dön</span>
            </ModernTechButton>
          </div>
        )}
        
        {/* Main content */}
        <main className="container mx-auto px-3 sm:px-4 lg:px-6 z-10 relative flex flex-col items-center justify-center min-h-screen py-12 sm:py-16">
          {children}
          
          {/* Language selector */}
          {showLanguageSelector && (
            <div className="mt-8 mb-4">
              <div className="text-center">
                <div className="mb-2 text-xs text-red-400 font-medium uppercase tracking-wide">Tercih ettiğiniz dil</div>
                <div className="bg-black/40 backdrop-blur-sm p-2 rounded-lg border border-red-900/20">
                  <LanguageSelector />
                </div>
              </div>
            </div>
          )}
          
          {/* Footer with launch date and forum link */}
          <div className="text-center mt-8 mb-4 flex flex-col items-center space-y-3">
            <div className="inline-flex flex-wrap items-center justify-center space-x-1 sm:space-x-2 bg-black/40 px-4 py-2.5 rounded-full border border-red-900/20 shadow-sm">
              <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
              <p className="text-xs sm:text-sm text-gray-300 font-light tracking-wide">
                <span className="font-medium text-red-400">19 Mayıs 2025</span> • Cumhuriyetin Halk ile Güncellenme Yolculuğu
              </p>
            </div>
            
            {/* Forum link - Enhanced design */}
            <div className="relative z-10">
              <div className="mb-2 flex justify-center items-center">
                <div className="h-px w-4 bg-gradient-to-r from-transparent to-red-500"></div>
                <div className="mx-2 text-xs uppercase tracking-widest text-red-400 font-medium">Forum Bağlantısı</div>
                <div className="h-px w-4 bg-gradient-to-l from-transparent to-red-500"></div>
              </div>
              
              <a 
                href="https://www.simayhareketi.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <ModernTechButton 
                  variant="turkish"
                  size="md"
                  glow="subtle"
                  border="glowing"
                  leftIcon={<MessageCircle className="w-4 h-4" />}
                  rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                >
                  Halk Koordinasyon Merkezi
                </ModernTechButton>
              </a>
              
              {/* Removed decorative pulse effect for performance */}
            </div>
          </div>
          
          {/* Technical indicators */}
          <div className="fixed bottom-4 right-4 z-40 flex space-x-2">
            <div className="bg-black/50 px-2 py-1 rounded-md border border-red-900/10 shadow-sm flex items-center">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></div>
              <span className="text-xs text-gray-400">v2.0</span>
            </div>
          </div>
        </main>
        
        {/* Controls */}
        <AudioControl onToggle={handleToggleAudio} />
        <AccessibilityReader pageContent={pageContent} pageName={pageName} />
      </div>
    </>
  );
}