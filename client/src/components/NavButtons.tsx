import React from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  BookOpen, 
  Megaphone, 
  Users, 
  Target 
} from 'lucide-react';

export function NavButtons() {
  const [, navigate] = useLocation();

  const buttonData = [
    { 
      path: "/turkiye", 
      text: "TÜRKİYE", 
      icon: MapPin,
      gradient: "from-red-600 to-red-800",
      bgGradient: "from-red-500/20 to-red-700/30",
      isExternal: false 
    },
    { 
      path: "/halk-manifestolar", 
      text: "MANİFESTO", 
      icon: BookOpen,
      gradient: "from-blue-600 to-blue-800",
      bgGradient: "from-blue-500/20 to-blue-700/30",
      isExternal: false 
    },
    { 
      path: "/cagri", 
      text: "ÇAĞRI", 
      icon: Megaphone,
      gradient: "from-purple-600 to-purple-800",
      bgGradient: "from-purple-500/20 to-purple-700/30",
      isExternal: false 
    },
    { 
      path: "/katil", 
      text: "KATIL", 
      icon: Users,
      gradient: "from-green-600 to-green-800",
      bgGradient: "from-green-500/20 to-green-700/30",
      isExternal: false 
    },
    { 
      path: "/gorevler", 
      text: "GÖREV", 
      icon: Target,
      gradient: "from-orange-600 to-orange-800",
      bgGradient: "from-orange-500/20 to-orange-700/30",
      isExternal: false 
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 sm:relative sm:bottom-auto sm:left-auto sm:transform-none sm:mt-8 sm:mb-6"
    >
      {/* Mobile Navigation Bar */}
      <div className="flex bg-black/90 floating-element border border-red-500/30 rounded-2xl p-2 sm:hidden">
        {buttonData.map((button, index) => {
          const IconComponent = button.icon;
          
          return (
            <motion.button
              key={button.path}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(button.path)}
              className="flex-1 flex flex-col items-center justify-center p-3 rounded-xl hover:bg-red-500/20 nav-button touch-target"
            >
              <IconComponent className="w-5 h-5 text-white mb-1" />
              <span className="text-xs text-white font-medium">{button.text}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex justify-center gap-3 max-w-4xl mx-auto">
        {buttonData.map((button, index) => {
          const IconComponent = button.icon;
          
          return (
            <motion.button
              key={button.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(button.path)}
              className="flex items-center gap-2 px-6 py-3 bg-black/60 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-xl backdrop-blur-sm transition-all duration-200 group"
            >
              <IconComponent className="w-4 h-4 text-red-400 group-hover:text-red-300" />
              <span className="text-white font-medium group-hover:text-red-100">{button.text}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

export default NavButtons;