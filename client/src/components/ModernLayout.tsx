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
}

export default function ModernLayout({
  children,
  audioKey = 'home',
  showLanguageSelector = false,
  showBackButton = false,
  pageContent = "Cumhuriyet Güncellenme Platformuna hoş geldiniz. Bu platformda güncel bilgilere erişebilir, Türkiye'nin dijital dönüşümüne katkıda bulunabilirsiniz.",
  pageName = "Anasayfa"
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
  };

  return (
    <>
      <SimpleFuturisticTurkish />
      
      <div className="min-h-screen text-white relative overflow-x-hidden bg-black">
        {/* Background elements - simplified */}
        <div className="absolute top-0 left-0 w-full h-px bg-red-600/20"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-red-600/20"></div>
        
        {/* Back button */}
        {showBackButton && (
          <div className="fixed top-4 left-4 z-50">
            <button 
              onClick={() => navigate("/")}
              className="px-3 py-2 bg-gradient-to-br from-red-800/80 to-red-900/80 text-white rounded-full hover:from-red-700/90 hover:to-red-800/90 transition-colors shadow-sm hover:shadow-md flex items-center text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Anasayfaya Dön</span>
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
          
          {/* Footer info with launch date */}
          <div className="text-center mt-8 mb-4">
            <div className="inline-flex flex-wrap items-center justify-center space-x-1 sm:space-x-2 bg-black/40 px-4 py-2.5 rounded-full border border-red-900/20 shadow-sm">
              <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
              <p className="text-xs sm:text-sm text-gray-300 font-light tracking-wide">
                <span className="font-medium text-red-400">19 Mayıs 2025</span> • Cumhuriyetin Halk ile Güncellenme Yolculuğu
              </p>
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