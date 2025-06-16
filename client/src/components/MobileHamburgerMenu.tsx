import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  Flag, 
  FileText, 
  Target, 
  Users, 
  CreditCard,
  Database,
  Settings,
  Globe,
  Smartphone,
  Download,
  Scale,
  UserPlus
} from 'lucide-react';
import { useLocation } from 'wouter';
import { navigateWithScrollReset } from '@/lib/navigation';

interface MobileHamburgerMenuProps {
  className?: string;
}

// Sistematik navigasyon yapısı - öncelik sırasına göre
const menuItems = [
  // Ana bölümler
  { 
    id: 'home', 
    label: 'Ana Sayfa', 
    path: '/home', 
    icon: Home, 
    color: 'text-blue-400',
    description: 'Platform ana sayfası',
    category: 'main'
  },
  { 
    id: 'turkiye', 
    label: 'Türkiye', 
    path: '/turkiye', 
    icon: Flag, 
    color: 'text-red-400',
    description: 'Türkiye Cumhuriyeti merkezi',
    category: 'main'
  },
  
  // İçerik bölümleri
  { 
    id: 'gorevler', 
    label: '100 Görev', 
    path: '/gorevler', 
    icon: Target, 
    color: 'text-yellow-400',
    description: 'Atatürk\'ün Medeniyet Işığında görevler',
    category: 'content'
  },
  { 
    id: 'manifesto', 
    label: 'Manifesto', 
    path: '/manifesto', 
    icon: FileText, 
    color: 'text-purple-400',
    description: 'Birleşik halk manifestosu',
    category: 'content'
  },
  { 
    id: 'anayasa', 
    label: 'Anayasa', 
    path: '/anayasa', 
    icon: FileText, 
    color: 'text-emerald-400',
    description: 'Cumhuriyet anayasası',
    category: 'content'
  },
  
  // Sistem bölümleri  
  { 
    id: 'entegrasyon', 
    label: 'Entegrasyon Süreci', 
    path: '/entegrasyon-sureci', 
    icon: Users, 
    color: 'text-green-400',
    description: 'Halk koordinasyon sistemi',
    category: 'system'
  },
  { 
    id: 'dijital-kimlik', 
    label: 'Dijital Kimlik', 
    path: '/dijital-kimlik', 
    icon: CreditCard, 
    color: 'text-indigo-400',
    description: 'Dijital vatandaşlık sistemi',
    category: 'system'
  },
  { 
    id: 'gelir-gider', 
    label: 'Mali Şeffaflık', 
    path: '/canli-gelir-gider', 
    icon: Database, 
    color: 'text-cyan-400',
    description: 'Canlı gelir-gider takibi',
    category: 'system'
  },
  
  // Katılım bölümü
  { 
    id: 'katil', 
    label: 'Platforma Katıl', 
    path: '/katil', 
    icon: Users, 
    color: 'text-orange-400',
    description: 'Halk sistemine katılım',
    category: 'participation'
  }
];

const MobileHamburgerMenu = ({ className = '' }: MobileHamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [, navigate] = useLocation();
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstallable(false);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    
    setDeferredPrompt(null);
  };

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    navigateWithScrollReset(navigate, path);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.hamburger-menu')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className={`hamburger-menu ${className}`}>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-xl p-3 shadow-lg hover:bg-gray-800/90 transition-all duration-300 min-w-[48px] min-h-[48px] flex items-center justify-center"
        aria-label="Menü"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </motion.div>
      </button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-gray-900/95 backdrop-blur-xl border-r border-gray-700/50 shadow-2xl z-45 overflow-y-auto"
          >
            <div className="p-6 pt-20">
              {/* Logo/Title */}
              <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                    <Flag className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Halk Sistemi</h2>
                </div>
                <p className="text-gray-400 text-sm">Medeniyet Işığında Birlik</p>
              </div>

              {/* App Install Button */}
              {isInstallable && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleInstallApp}
                  className="w-full mb-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl p-4 flex items-center gap-3 transition-all duration-300 shadow-lg"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Uygulamayı İndir</div>
                    <div className="text-xs text-blue-200">Telefonuna yükle</div>
                  </div>
                  <Download className="h-5 w-5 ml-auto" />
                </motion.button>
              )}

              {/* Navigation Items - Kategorilere göre gruplandırılmış */}
              <nav className="space-y-6">
                {/* Ana Bölümler */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                    Ana Bölümler
                  </h3>
                  <div className="space-y-2">
                    {menuItems.filter(item => item.category === 'main').map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <motion.button
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleNavigation(item.path)}
                          className="w-full text-left p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700/30 hover:border-gray-600 transition-all duration-300 group flex items-center gap-4"
                        >
                          <div className={`w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className={`h-5 w-5 ${item.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-medium group-hover:text-gray-100 transition-colors">
                              {item.label}
                            </div>
                            <div className="text-gray-400 text-xs mt-0.5">
                              {item.description}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* İçerik Bölümleri */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                    İçerik & Dokümanlar
                  </h3>
                  <div className="space-y-2">
                    {menuItems.filter(item => item.category === 'content').map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <motion.button
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index + 2) * 0.05 }}
                          onClick={() => handleNavigation(item.path)}
                          className="w-full text-left p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700/30 hover:border-gray-600 transition-all duration-300 group flex items-center gap-4"
                        >
                          <div className={`w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className={`h-5 w-5 ${item.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-medium group-hover:text-gray-100 transition-colors">
                              {item.label}
                            </div>
                            <div className="text-gray-400 text-xs mt-0.5">
                              {item.description}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Sistem Bölümleri */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                    Sistem & Araçlar
                  </h3>
                  <div className="space-y-2">
                    {menuItems.filter(item => item.category === 'system').map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <motion.button
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index + 5) * 0.05 }}
                          onClick={() => handleNavigation(item.path)}
                          className="w-full text-left p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700/30 hover:border-gray-600 transition-all duration-300 group flex items-center gap-4"
                        >
                          <div className={`w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className={`h-5 w-5 ${item.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-medium group-hover:text-gray-100 transition-colors">
                              {item.label}
                            </div>
                            <div className="text-gray-400 text-xs mt-0.5">
                              {item.description}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Katılım Bölümü */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                    Katılım
                  </h3>
                  <div className="space-y-2">
                    {menuItems.filter(item => item.category === 'participation').map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <motion.button
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index + 8) * 0.05 }}
                          onClick={() => handleNavigation(item.path)}
                          className="w-full text-left p-4 rounded-xl bg-gradient-to-r from-orange-600/20 to-orange-700/20 hover:from-orange-500/30 hover:to-orange-600/30 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 group flex items-center gap-4"
                        >
                          <div className={`w-10 h-10 rounded-lg bg-orange-600/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className={`h-5 w-5 ${item.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-medium group-hover:text-gray-100 transition-colors">
                              {item.label}
                            </div>
                            <div className="text-orange-200 text-xs mt-0.5">
                              {item.description}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </nav>

              {/* Language Selector */}
              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <button
                  onClick={() => handleNavigation('/dil-secimi')}
                  className="w-full p-4 rounded-xl bg-gray-800/30 hover:bg-gray-700/50 border border-gray-700/30 transition-all duration-300 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-medium">Dil Seçimi</div>
                    <div className="text-gray-400 text-sm">Türkçe</div>
                  </div>
                </button>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-700/50 text-center">
                <p className="text-gray-400 text-xs">
                  © 2025 Halk Sistemi Platform
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Medeniyet Işığında Birlik
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileHamburgerMenu;