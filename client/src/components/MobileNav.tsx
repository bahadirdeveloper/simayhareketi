import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, FileText, Target, Users, DollarSign, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileNavProps {
  className?: string;
}

export function MobileNav({ className = '' }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { path: '/', label: 'Ana Sayfa', icon: Home },
    { path: '/halk-defteri', label: 'Halk Defteri', icon: FileText },
    { path: '/gorevler', label: '100 Görev', icon: Target },
    { path: '/halk-koordinasyon', label: 'Halk Koordinasyon', icon: Users },
    { path: '/canli-gelir-gider', label: 'Mali Şeffaflık', icon: DollarSign },
    { path: '/language', label: 'Diller', icon: Globe },
  ];

  return (
    <div className={`md:hidden ${className}`}>
      {/* Hamburger Button */}
      <Button
        onClick={toggleMenu}
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-[60] bg-black/80 border border-red-600/50 text-white hover:bg-red-950/80 hover:text-red-400 transition-all duration-300 shadow-lg"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[50]"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-black via-red-950/20 to-black border-r-2 border-red-600/50 z-[55] overflow-y-auto"
            >
              {/* Header */}
              <div className="p-6 pt-20 border-b border-red-600/30">
                <h2 className="text-2xl font-bold text-white mb-2">
                  <span className="text-red-400">HALK</span> SİSTEMİ
                </h2>
                <p className="text-gray-400 text-sm">
                  Mazlum Halkların Dayanışma Platformu
                </p>
              </div>

              {/* Navigation Links */}
              <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.path;
                  
                  return (
                    <Link key={item.path} href={item.path} onClick={closeMenu}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-red-600/20 to-red-800/20 border border-red-500/40 text-red-400'
                            : 'text-gray-300 hover:bg-red-950/30 hover:text-white border border-transparent hover:border-red-600/20'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                        {isActive && (
                          <div className="w-2 h-2 bg-red-400 rounded-full ml-auto animate-pulse" />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="p-4 mt-auto border-t border-red-600/30">
                <div className="text-center text-xs text-gray-500">
                  <p className="mb-1">Atatürk'ün Medeniyet Işığında</p>
                  <p>100 Görevle Halk Sistemi</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}