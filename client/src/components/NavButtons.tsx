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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="mt-8 mb-6"
    >
      <div className="relative max-w-5xl mx-auto">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent rounded-3xl blur-2xl"></div>
        
        <div className="relative backdrop-filter backdrop-blur-xl bg-gradient-to-br from-black/80 via-red-950/20 to-black/80 border border-red-500/30 rounded-3xl p-6 shadow-[0_20px_60px_rgba(239,68,68,0.1)]">
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            {buttonData.map((button, index) => {
              const IconComponent = button.icon;
              
              return (
                <motion.button
                  key={button.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(button.path)}
                  className="relative group min-w-[120px] lg:min-w-[140px] h-16 lg:h-18 bg-gradient-to-br from-black/90 via-gray-900/50 to-black/90 border-2 border-red-500/40 rounded-2xl backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-500 overflow-hidden"
                >
                  {/* Background pattern */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${button.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Border glow effect */}
                  <div className="absolute inset-0 border-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  
                  {/* Content */}
                  <div className="relative flex flex-col items-center justify-center h-full px-4">
                    <IconComponent className="w-5 h-5 mb-1 text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="text-sm lg:text-base font-bold text-white tracking-wider drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                      {button.text}
                    </span>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-[-100%] group-hover:translate-x-[100%] skew-x-12"></div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default NavButtons;