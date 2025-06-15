import { ReactNode, useEffect, memo, useMemo, useState, useRef } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, MessageCircle, ExternalLink, Volume2, VolumeX } from 'lucide-react';
import SimpleFuturisticTurkish from './SimpleFuturisticTurkish';
import LanguageSelector from './LanguageSelector';
import AccessibilityReader from './AccessibilityReader';
import QuickNav from './QuickNav';
import { ModernTechButton } from './ModernTechButton';
import { initAudio, playSoundtrack, isAudioPlaying } from '@/lib/audio';
import { navigateWithScrollReset, scrollToTop } from '@/lib/navigation';

// Ses kontrolü için düğme bileşeni
const AudioButton = () => {
  const [location, setLocation] = useLocation();
  const [showPlayer, setShowPlayer] = useState(false);
  
  // Dil sayfasına yönlendirme ve ses oynatıcı işlevselliği
  const handleClick = (e: React.MouseEvent) => {
    if (e.shiftKey) {
      // Shift tuşu ile tıklanırsa dil sayfasına git
      setLocation('/dil');
    } else {
      // Ses oynatıcıyı göster/gizle
      setShowPlayer(!showPlayer);
    }
  };
  
  return (
    <>
      <button 
        onClick={handleClick}
        className="fixed z-40 bottom-3 left-3 sm:bottom-4 sm:left-4 bg-red-600 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shadow-lg hover:bg-red-700 transition-colors touch-target"
        aria-label="Ses Kontrolü"
      >
        SES
      </button>
      
      {/* Mobile-optimized music panel */}
      {showPlayer && (
        <div className="fixed bottom-16 left-2 sm:bottom-20 sm:left-4 z-40 bg-black/90 p-2 sm:p-3 rounded-lg border border-red-500/30 shadow-lg max-w-xs">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-xs sm:text-sm">Müzik Kontrolü</span>
            <button 
              onClick={() => setShowPlayer(false)}
              className="text-white text-xs hover:text-red-400 touch-target px-2 py-1"
            >
              Kapat
            </button>
          </div>
          <div className="bg-gray-900 rounded-lg p-2 sm:p-4 border border-red-500/30">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-white text-xs sm:text-sm font-medium">Türk Müziği</span>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <a 
                href="https://www.youtube.com/shorts/XOkvNPN1VJ8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 touch-target"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="hidden sm:inline">YouTube'da Aç</span>
                <span className="sm:hidden">Aç</span>
              </a>
              <button 
                onClick={() => setShowPlayer(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm transition-colors duration-200 touch-target"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

interface ModernLayoutProps {
  children: ReactNode;
  audioKey?: string;
  showLanguageSelector?: boolean;
  showBackButton?: boolean;
  pageContent?: string;
  pageName?: string;
  onAudioToggle?: () => void;
}

// Memoized grid lines for better performance
const GridLines = memo(() => {
  // Pre-calculate grid lines to avoid re-renders
  const gridLines = useMemo(() => {
    const horizontalLines = [...Array(5)].map((_, i) => (
      <div 
        key={`grid-h-${i}`} 
        className="absolute w-full h-[0.5px] bg-red-500" 
        style={{ top: `${i * 20}%` }} 
      />
    ));
    
    const verticalLines = [...Array(5)].map((_, i) => (
      <div 
        key={`grid-v-${i}`} 
        className="absolute h-full w-[0.5px] bg-red-500" 
        style={{ left: `${i * 20}%` }} 
      />
    ));
    
    return [...horizontalLines, ...verticalLines];
  }, []);
  
  return (
    <div className="absolute inset-0 opacity-5">
      {gridLines}
    </div>
  );
});

GridLines.displayName = 'GridLines';

// Daha hafif arka plan - performans için optimize edildi
const BackgroundElements = memo(() => (
  <div className="absolute inset-0 z-0">
    {/* Sadece basit arka plan elemanları */}
    <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-red-900/10 to-transparent opacity-20"></div>
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-red-900/10 to-transparent opacity-20"></div>
    
    {/* Minimal çizgiler */}
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/30 to-transparent"></div>
    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/30 to-transparent"></div>
  </div>
));

BackgroundElements.displayName = 'BackgroundElements';

// Optimized footer component
const Footer = memo(() => (
  <div className="text-center mt-8 mb-4 flex flex-col items-center space-y-3">
    <div className="inline-flex flex-wrap items-center justify-center space-x-1 sm:space-x-2 bg-black/40 px-4 py-2.5 rounded-full border border-red-900/20 shadow-sm">
      <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
      <p className="text-xs sm:text-sm text-gray-300 font-light tracking-wide">
        <span className="font-medium text-red-400">19 Mayıs 2025</span> • Cumhuriyetin Halk ile Güncellenme Yolculuğu
      </p>
    </div>
    
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
  const [, navigate] = useLocation();

  useEffect(() => {
    // Scroll to top on page change using global helper
    scrollToTop();
    
    // Optimize audio initialization
    const audioInitTimeout = setTimeout(() => {
      initAudio(audioKey);
    }, 100);
    
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
          const response = await fetch('/api/visits', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(visitData),
            signal: controller.signal
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } finally {
          clearTimeout(timeoutId);
        }
      } catch (error) {
        console.error('Failed to record visit', error);
      }
    };
    
    recordVisit();
    
    return () => {
      clearTimeout(audioInitTimeout);
    };
  }, [audioKey]);

  const handleToggleAudio = () => {
    playSoundtrack();
    if (onAudioToggle) onAudioToggle();
  };

  // Simple back button for better usability
  const backButton = useMemo(() => {
    if (!showBackButton) return null;
    
    const handleBackClick = () => {
      navigateWithScrollReset(navigate, "/");
    };
    
    return (
      <button 
        onClick={handleBackClick}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-black/80 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-lg floating-element text-white hover:text-red-100 nav-button touch-friendly mobile-nav-optimized gpu-accelerated"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Ana Sayfa</span>
      </button>
    );
  }, [showBackButton, navigate]);

  // Memoized language selector for better performance
  const languageSelector = useMemo(() => {
    if (!showLanguageSelector) return null;
    
    return (
      <div className="mt-8 mb-4">
        <div className="text-center">
          <div className="mb-2 text-xs text-red-400 font-medium uppercase tracking-wide">Tercih ettiğiniz dil</div>
          <div className="bg-black/40 backdrop-blur-sm p-2 rounded-lg border border-red-900/20">
            <LanguageSelector />
          </div>
        </div>
      </div>
    );
  }, [showLanguageSelector]);

  return (
    <>
      <SimpleFuturisticTurkish />
      
      <div className="min-h-screen text-white relative overflow-x-hidden bg-gradient-to-b from-gray-950 via-black to-black particle-system main-content scroll-optimized mobile-viewport-fix gpu-accelerated stable-transform">
        {/* Optimized background elements */}
        <BackgroundElements />
        
        {/* Back button */}
        {backButton}
        
        {/* Main content */}
        <main className="container mx-auto px-3 sm:px-4 lg:px-6 z-10 relative flex flex-col items-center justify-center min-h-screen py-12 sm:py-16 nav-stable no-layout-shift mobile-nav-optimized">
          {children}
          
          {/* Language selector */}
          {languageSelector}
          
          {/* Footer */}
          <Footer />
          
          {/* Technical indicators and Audio Controls */}
          <div className="fixed bottom-4 right-4 z-40 flex space-x-2">
            <div className="bg-black/50 px-2 py-1 rounded-md border border-red-900/10 shadow-sm flex items-center">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></div>
              <span className="text-xs text-gray-400">v2.1</span>
            </div>
          </div>
          
          {/* Ses kontrol düğmesi - sadece belirli sayfalarda görünür */}
          {window.location.pathname === "/dil" || 
           window.location.pathname === "/language" || 
           window.location.pathname === "/tr/dil" || 
           window.location.pathname === "/en/language" ? (
            <div className="fixed bottom-4 left-4 z-40">
              <AudioButton />
            </div>
          ) : null}
        </main>
        
        {/* Accessibility Reader */}
        <AccessibilityReader pageContent={pageContent} pageName={pageName} />
        
        {/* Quick Navigation */}
        <QuickNav />
      </div>
    </>
  );
};

export default memo(ModernLayout);