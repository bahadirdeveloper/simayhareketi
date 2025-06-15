import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface TurkishValueCardProps {
  valueId: string;
  title: string;
  index: number;
}

const TurkishValueCard: React.FC<TurkishValueCardProps> = ({ valueId, title, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize value details to prevent re-creation on each render
  const valueDetails = useMemo(() => ({
    'milli': {
      title: 'MİLLİ',
      description: 'Türk milletinin bağımsızlığı, birliği ve varlığını koruyan temel değer. Vatan sevgisi, milli birlik ve beraberlik ruhu.',
      icon: '🇹🇷',
      color: 'from-red-600 to-red-800',
      bgPattern: 'bg-gradient-to-br from-red-500/20 to-red-700/30'
    },
    'muasir': {
      title: 'MUASIR',
      description: 'Çağdaş medeniyetler seviyesine ulaşma hedefi. Bilim, teknoloji ve modern düşünce ile ilerleme.',
      icon: '🚀',
      color: 'from-blue-600 to-blue-800',
      bgPattern: 'bg-gradient-to-br from-blue-500/20 to-blue-700/30'
    },
    'laik': {
      title: 'LAİK',
      description: 'Din ve devlet işlerinin ayrılığı ilkesi. Vicdan özgürlüğü ve objektif yönetim anlayışı.',
      icon: '⚖️',
      color: 'from-purple-600 to-purple-800',
      bgPattern: 'bg-gradient-to-br from-purple-500/20 to-purple-700/30'
    },
    'demokratik': {
      title: 'DEMOKRATİK',
      description: 'Halk egemenliği ve katılımcı yönetim. İnsan hakları, özgürlükler ve adalet temelli sistem.',
      icon: '🗳️',
      color: 'from-green-600 to-green-800',
      bgPattern: 'bg-gradient-to-br from-green-500/20 to-green-700/30'
    },
    'sosyal': {
      title: 'SOSYAL',
      description: 'Toplumsal adalet, eşitlik ve dayanışma. Sosyal refah ve birlikte yaşama kültürü.',
      icon: '🤝',
      color: 'from-orange-600 to-orange-800',
      bgPattern: 'bg-gradient-to-br from-orange-500/20 to-orange-700/30'
    }
  }), []);

  const currentValue = valueDetails[valueId as keyof typeof valueDetails];

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  if (!mounted) return null;

  return (
    <>
      {/* Card */}
      <motion.div
        className="relative group cursor-pointer content-stable motion-stable ultra-stable no-motion"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
        whileHover={{ scale: 1.01, y: -1 }}
        onClick={openModal}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
        <div className="relative bg-gradient-to-br from-black/80 to-red-950/30 border-2 border-red-500/50 rounded-2xl p-4 backdrop-blur-lg text-center shadow-[0_10px_40px_rgba(239,68,68,0.2)] group-hover:shadow-[0_20px_60px_rgba(239,68,68,0.4)] transition-all duration-500 min-h-[120px] flex flex-col justify-center min-w-[140px] w-full ultra-stable">
          
          {/* Icon */}
          <div className="text-4xl mb-2 opacity-80">
            {currentValue?.icon}
          </div>
          
          {/* Title */}
          <div className="text-xs sm:text-sm lg:text-base font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] leading-tight px-1 break-words hyphens-auto text-stable content-stable">
            {title}
          </div>
          
          {/* Decorative line */}
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto"></div>
          
          {/* Click hint */}
          <div className="text-xs text-red-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Detaylar için tıklayın
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Mobile-optimized Modal Content */}
            <motion.div
              className="relative max-w-6xl w-full max-h-[95vh] overflow-hidden mx-2 sm:mx-4"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Card Visual */}
              <div className={`relative rounded-2xl sm:rounded-3xl overflow-hidden ${currentValue?.bgPattern} border border-red-500/50 sm:border-2 shadow-[0_20px_60px_rgba(239,68,68,0.2)] sm:shadow-[0_40px_120px_rgba(239,68,68,0.3)]`}>
                
                {/* Mobile-optimized Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-red-500/30 touch-target"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>

                {/* Mobile-optimized Card Header */}
                <div className="relative p-6 sm:p-10 lg:p-12 text-center">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-8 gap-4 h-full">
                      {[...Array(64)].map((_, i) => (
                        <div key={i} className="w-full h-4 bg-white/20 rounded-sm"></div>
                      ))}
                    </div>
                  </div>

                  {/* Main Icon */}
                  <motion.div
                    className="text-8xl mb-6 relative z-10"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", damping: 15 }}
                  >
                    {currentValue?.icon}
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    className={`text-7xl lg:text-8xl font-bold bg-gradient-to-r ${currentValue?.color} bg-clip-text text-transparent mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {currentValue?.title}
                  </motion.h2>

                  {/* Decorative Elements */}
                  <div className="flex justify-center items-center space-x-4 mb-8">
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-red-500 to-red-500"></div>
                    <motion.div 
                      className="w-3 h-3 bg-red-500 rounded-full"
                      animate={{ 
                        boxShadow: [
                          "0 0 10px rgba(239, 68, 68, 0.5)",
                          "0 0 20px rgba(239, 68, 68, 0.8)",
                          "0 0 10px rgba(239, 68, 68, 0.5)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="w-20 h-px bg-gradient-to-l from-transparent via-red-500 to-red-500"></div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="relative p-10 lg:p-12 pt-0">
                  <motion.div
                    className="bg-black/60 backdrop-blur-lg rounded-2xl p-8 lg:p-10 border border-red-500/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-white text-xl lg:text-2xl leading-relaxed text-center font-medium px-4">
                      {currentValue?.description}
                    </p>
                  </motion.div>

                  {/* Additional Visual Elements */}
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-2 bg-gradient-to-r from-red-500/30 to-red-600/30 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                      />
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 text-center">
                  <motion.div
                    className="text-sm text-red-400 opacity-80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Türkiye Cumhuriyeti'nin Temel Değeri
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default TurkishValueCard;