import { ReactNode, useEffect } from 'react';
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
      
      <div className="min-h-screen text-white relative overflow-x-hidden">
        {showBackButton && (
          <motion.div 
            className="fixed top-4 left-4 z-50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button 
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-2 rounded-full border border-red-500/30 hover:border-red-500/60 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm">Geri</span>
            </button>
          </motion.div>
        )}
        
        <main className="container mx-auto px-4 z-10 relative flex flex-col items-center justify-center min-h-screen pt-12">
          {children}
          
          {showLanguageSelector && (
            <div className="mt-8 mb-4">
              <div className="text-center">
                <div className="mb-2 text-xs text-gray-400">Tercih ettiğiniz dil</div>
                <LanguageSelector />
              </div>
            </div>
          )}
          
          <div className="text-center mt-8 mb-4">
            <div className="inline-flex items-center justify-center space-x-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-md border border-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-red-500">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8L12 12" />
                <path d="M12 16h.01" />
              </svg>
              <p className="text-xs text-gray-300 font-light tracking-wide">
                <span className="font-normal text-red-400">19 Mayıs 2025</span> • Cumhuriyetin Halk ile Güncellenme Yolculuğu
              </p>
            </div>
          </div>
        </main>
        
        <AudioControl onToggle={handleToggleAudio} />
      </div>
    </>
  );
}