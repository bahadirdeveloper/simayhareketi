import { ReactNode, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import SimpleFuturisticTurkish from './SimpleFuturisticTurkish';
import AudioControl from './AudioControl';
import LanguageSelector from './LanguageSelector';
import AccessibilityReader from './AccessibilityReader';
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
      
      <div className="min-h-screen text-white relative overflow-x-hidden bg-gradient-to-b from-black via-black to-black">
        {/* Background elements - enhanced with grid pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          {/* Horizontal grid lines */}
          {[...Array(20)].map((_, i) => (
            <div 
              key={`grid-h-${i}`} 
              className="absolute w-full h-px bg-red-400" 
              style={{ top: `${i * 5}%` }} 
            />
          ))}
          
          {/* Vertical grid lines */}
          {[...Array(20)].map((_, i) => (
            <div 
              key={`grid-v-${i}`} 
              className="absolute h-full w-px bg-red-400" 
              style={{ left: `${i * 5}%` }} 
            />
          ))}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-red-600/30 via-transparent to-red-600/30"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-red-600/30 via-transparent to-red-600/30"></div>
        
        {/* Enhanced Back button */}
        {showBackButton && (
          <div className="fixed top-5 left-5 z-50">
            <button 
              onClick={() => navigate("/")}
              className="px-4 py-2.5 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-lg hover:from-red-500 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-red-700/30 flex items-center font-medium text-sm transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-inner border border-red-600/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 filter drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="tracking-wide">Anasayfaya Dön</span>
            </button>
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
                className="flex items-center px-5 py-2.5 bg-gradient-to-r from-red-900/60 to-red-800/60 hover:from-red-800/80 hover:to-red-700/80 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-red-700/30 group transform hover:-translate-y-0.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-red-400 group-hover:text-red-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">Halk Koordinasyon Merkezi</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 ml-2 text-red-400/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
              
              {/* Decorative pulse effect */}
              <div className="absolute -inset-1.5 bg-red-500/5 rounded-lg -z-10 animate-pulse"></div>
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