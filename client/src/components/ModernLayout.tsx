import { ReactNode, useEffect, memo, useMemo, useState, useRef } from 'react';
import { useLocation, useRoute } from 'wouter';
import { ArrowLeft, MessageCircle, ExternalLink, Volume2, VolumeX } from 'lucide-react';
import SimpleFuturisticTurkish from './SimpleFuturisticTurkish';
import LanguageSelector from './LanguageSelector';
import AccessibilityReader from './AccessibilityReader';
import QuickNav from './QuickNav';
import MobileHamburgerMenu from './MobileHamburgerMenu';
import { ModernTechButton } from './ModernTechButton';

import { navigateWithScrollReset, scrollToTop } from '@/lib/navigation';
import NavigationBreadcrumb from './NavigationBreadcrumb';

interface ModernLayoutProps {
  children: ReactNode;
  audioKey?: string;
  showLanguageSelector?: boolean;
  showBackButton?: boolean;
  pageContent?: string;
  pageName?: string;
  onAudioToggle?: () => void;
}

// Language navigation button component
const LanguageButton = () => {
  const [location, setLocation] = useLocation();
  
  const handleClick = () => {
    setLocation('/dil');
  };
  
  return (
    <button 
      onClick={handleClick}
      onTouchStart={(e) => {
        e.currentTarget.style.backgroundColor = '#dc2626';
      }}
      onTouchEnd={(e) => {
        e.currentTarget.style.backgroundColor = '#ef4444';
      }}
      className="fixed z-40 bottom-3 left-3 sm:bottom-4 sm:left-4 bg-red-600 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shadow-lg hover:bg-red-700 transition-colors touch-target min-h-[48px] min-w-[48px]"
      aria-label="Dil Seçimi"
    >
      DİL
    </button>
  );
};

// Optimized floating support button
const FloatingSupportButton = memo(() => (
  <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40">
    <a 
      href="https://www.simayhareketi.com" 
      target="_blank" 
      rel="noopener noreferrer"
      className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg hover:from-green-500 hover:to-emerald-500 transition-all duration-300 transform hover:scale-110"
      aria-label="Halk Koordinasyon Merkezi"
    >
      <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
    </a>
  </div>
));

FloatingSupportButton.displayName = 'FloatingSupportButton';

// Enhanced footer with better mobile optimization
const Footer = memo(() => (
  <div className="relative z-20 py-3 sm:py-4 bg-gradient-to-r from-black via-gray-900 to-black border-t border-red-500/30">
    <div className="max-w-7xl mx-auto px-3 sm:px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
          <SimpleFuturisticTurkish />
          <span>Cumhuriyet Güncellenme Platformu</span>
        </div>
        
        <a 
          href="https://www.simayhareketi.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-xs sm:text-sm"
        >
          <ModernTechButton 
            variant="outline" 
            size="sm"
            className="border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-400 transition-all duration-300 transform group-hover:scale-105"
          >
            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Halk Koordinasyon Merkezi
          </ModernTechButton>
        </a>
      </div>
    </div>
  </div>
));

Footer.displayName = 'Footer';

// Main layout component
const ModernLayout = ({
  children,
  audioKey = 'home',
  showLanguageSelector = false,
  showBackButton = false,
  pageContent = "Cumhuriyet Güncellenme Platformuna hoş geldiniz. Bu platformda güncel bilgilere erişebilir, Türkiye'nin dijital dönüşümüne katkıda bulunabilirsiniz.",
  pageName = "Anasayfa",
  onAudioToggle
}: ModernLayoutProps) => {
  const [location, navigate] = useLocation();

  useEffect(() => {
    // Scroll to top on page change using global helper
    scrollToTop();
    
    // Page initialization complete
    
    // Record visit - using a more efficient approach
    const recordVisit = async () => {
      try {
        const visitData = {
          path: window.location.pathname,
          referrer: document.referrer || '',
          language: 'tr',
          hasInteracted: false
        };
        
        // Use fetch with a timeout to prevent blocking the UI
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        try {
          await fetch('/api/visits', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(visitData),
            signal: controller.signal
          });
        } finally {
          clearTimeout(timeoutId);
        }
      } catch (error) {
        // Silent fail for visit tracking
        if ((error as Error).name !== 'AbortError') {
          // Silent visit tracking error
        }
      }
    };
    
    recordVisit();
    
    return () => {
    };
  }, [audioKey]);

  const handleAudioToggle = () => {
    if (onAudioToggle) onAudioToggle();
  };

  // Back button disabled - using navigation breadcrumb instead
  const backButton = null;

  // Language selector with improved positioning
  const languageSelector = useMemo(() => {
    if (!showLanguageSelector) return null;
    
    return (
      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-40">
        <LanguageSelector />
      </div>
    );
  }, [showLanguageSelector]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
        {/* Mobile Hamburger Menu */}
        <MobileHamburgerMenu />
        
        {/* Language Selector */}
        {languageSelector}
        
        {/* Navigation Breadcrumb */}
        <NavigationBreadcrumb />
        
        {/* Main Content */}
        <main className="relative z-10">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Floating Support Button */}
        <FloatingSupportButton />
        
        {/* Language Button */}
        <LanguageButton />
        
        {/* Accessibility Reader */}
        <AccessibilityReader pageContent={pageContent} pageName={pageName} />
        

      </div>
    </>
  );
};

export default memo(ModernLayout);