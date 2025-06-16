import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  FileText, 
  Target, 
  Users, 
  DollarSign, 
  Globe,
  Menu,
  X,
  ChevronRight,
  Star,
  Calendar,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navigationItems = [
  {
    category: "Ana Bölümler",
    items: [
      { path: '/', label: 'Ana Sayfa', icon: Home, color: 'from-red-600 to-red-800' },
      { path: '/halk-defteri', label: 'Halk Defteri', icon: FileText, color: 'from-blue-600 to-blue-800' },
      { path: '/gorevler', label: '100 Görev', icon: Target, color: 'from-green-600 to-green-800' },
      { path: '/canli-gelir-gider', label: 'Mali Şeffaflık', icon: DollarSign, color: 'from-yellow-600 to-yellow-800' },
    ]
  },
  {
    category: "Koordinasyon",
    items: [
      { path: '/halk-koordinasyon', label: 'Halk Koordinasyon', icon: Users, color: 'from-purple-600 to-purple-800' },
      { path: '/halk-manifestolar', label: 'Halk Manifestoları', icon: Star, color: 'from-pink-600 to-pink-800' },
      { path: '/anayasa', label: 'Anayasa', icon: Calendar, color: 'from-indigo-600 to-indigo-800' },
    ]
  },
  {
    category: "Küresel",
    items: [
      { path: '/language', label: 'Diller', icon: Globe, color: 'from-orange-600 to-orange-800' },
      { path: '/oppressed-nations', label: 'Mazlum Milletler', icon: MapPin, color: 'from-teal-600 to-teal-800' },
      { path: '/turkiye', label: 'Türkiye', icon: Star, color: 'from-red-600 to-red-800' },
    ]
  }
];

interface QuickNavigationProps {
  className?: string;
}

export function QuickNavigation({ className = '' }: QuickNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Quick Access Button - Desktop */}
      <div className={`hidden md:block fixed bottom-6 right-6 z-50 ${className}`}>
        <Button
          onClick={toggleMenu}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 shadow-lg border-2 border-red-500/30 backdrop-blur-sm"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </Button>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black via-red-950/40 to-transparent border-t border-red-600/30 backdrop-blur-lg">
        <div className="flex justify-around items-center py-2 px-2">
          {navigationItems[0].items.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            
            return (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center gap-1 h-16 w-16 p-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-t from-red-600/30 to-red-800/30 text-red-400 border border-red-500/40'
                      : 'text-gray-400 hover:text-white hover:bg-red-950/30'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium leading-none">{item.label.split(' ')[0]}</span>
                  {isActive && (
                    <div className="w-1 h-1 bg-red-400 rounded-full animate-pulse" />
                  )}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop Quick Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="hidden md:block fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block fixed bottom-24 right-6 w-96 max-h-[80vh] bg-gradient-to-b from-black via-red-950/20 to-black border-2 border-red-600/50 rounded-xl z-45 overflow-y-auto shadow-2xl backdrop-blur-lg"
            >
              {/* Header */}
              <div className="p-4 border-b border-red-600/30">
                <h3 className="text-lg font-bold text-white">Hızlı Erişim</h3>
                <p className="text-sm text-gray-400">Tüm sayfalara kolay erişim</p>
              </div>

              {/* Navigation Categories */}
              <div className="p-4 space-y-6">
                {navigationItems.map((category) => (
                  <div key={category.category}>
                    <h4 className="text-sm font-semibold text-red-400 mb-3 uppercase tracking-wide">
                      {category.category}
                    </h4>
                    <div className="space-y-2">
                      {category.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = location === item.path;
                        
                        return (
                          <Link key={item.path} href={item.path} onClick={closeMenu}>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                                isActive
                                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                                  : 'text-gray-300 hover:bg-red-950/30 hover:text-white border border-transparent hover:border-red-600/20'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <Icon className="h-5 w-5" />
                                <span className="font-medium">{item.label}</span>
                              </div>
                              <ChevronRight className="h-4 w-4 opacity-50" />
                            </motion.div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-red-600/30 bg-red-950/20">
                <div className="text-center text-xs text-gray-500">
                  <p>Hızlı navigasyon menüsü</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}