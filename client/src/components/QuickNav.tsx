import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  MapPin, 
  Target, 
  Users, 
  Plus,
  Menu,
  X,
  ArrowRightLeft,
  TrendingUp
} from 'lucide-react';

const QuickNav = () => {
  const [, navigate] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/home', icon: Home, label: 'Ana Sayfa', color: 'text-blue-400', priority: 1 },
    { path: '/turkiye', icon: MapPin, label: 'Türkiye', color: 'text-red-400', priority: 1 },
    { path: '/gorevler', icon: Target, label: '100 Görev', color: 'text-yellow-400', priority: 2 },
    { path: '/manifesto', icon: Users, label: 'Manifesto', color: 'text-purple-400', priority: 2 },
    { path: '/canli-gelir-gider', icon: TrendingUp, label: 'Mali Şeffaflık', color: 'text-cyan-400', priority: 3 },
    { path: '/katil', icon: Plus, label: 'Katıl', color: 'text-orange-400', priority: 3 }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 bg-black/90 floating-element border border-red-500/30 rounded-2xl p-3 min-w-[180px] sm:min-w-[200px] max-w-[250px]"
          >
            <div className="space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <motion.button
                    key={item.path}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigate(item.path);
                      setIsOpen(false);
                    }}
                    onTouchStart={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                    }}
                    onTouchEnd={(e) => {
                      e.currentTarget.style.backgroundColor = '';
                    }}
                    className="w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-gray-900/50 hover:bg-red-500/20 nav-button touch-target group text-sm sm:text-base min-h-[48px]"
                  >
                    <IconComponent className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-white font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        onTouchStart={(e) => {
          e.currentTarget.style.backgroundColor = '#dc2626';
        }}
        onTouchEnd={(e) => {
          e.currentTarget.style.backgroundColor = '#ef4444';
        }}
        className="w-16 h-16 bg-red-600 hover:bg-red-500 text-white rounded-full floating-element flex items-center justify-center nav-button touch-target min-h-[48px] min-w-[48px]"
        aria-label={isOpen ? "Menüyü Kapat" : "Menüyü Aç"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default QuickNav;