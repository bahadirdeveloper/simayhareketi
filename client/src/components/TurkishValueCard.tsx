import React, { useState, useEffect, useCallback, useMemo } from "react";
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

  const turkishValues = useMemo(() => ({
    "millet-devlet": {
      icon: "🏛️",
      title: "Millet ve Devlet Birliği",
      description: "Türk milleti ile devletin ayrılmaz bütünlüğü. Halk iradesi ile devlet otoritesinin uyumlu birlikteliği."
    },
    "vatan-sevgisi": {
      icon: "🌍",
      title: "Vatan Sevgisi",
      description: "Türk topraklarına ve vatanına derin bağlılık. Ülkemizin her karışını koruma ve sahip çıkma sorumluluğu."
    },
    "bayrak-saygisi": {
      icon: "🇹🇷",
      title: "Bayrak ve Sembol Saygısı", 
      description: "Türk bayrağı ve ulusal sembollerimize gösterilen derin saygı ve bağlılık."
    },
    "dil-kultur": {
      icon: "📚",
      title: "Dil ve Kültür",
      description: "Türkçemizi koruma ve geliştirme sorumluluğu. Kültürel değerlerimizi yaşatma ve gelecek nesillere aktarma."
    },
    "tarih-bilinci": {
      icon: "⏳",
      title: "Tarih Bilinci",
      description: "Türk tarihinin derinliklerini bilme ve bu birikimi bugüne taşıma sorumluluğu."
    },
    "hukuk-devleti": {
      icon: "⚖️",
      title: "Hukuk Devleti",
      description: "Adalet ve eşitlik ilkelerinin hayata geçirildiği hukuk devleti anlayışı."
    },
    "sosyal-dayanisma": {
      icon: "🤝",
      title: "Sosyal Dayanışma",
      description: "Toplumun tüm kesimleri arasında karşılıklı yardımlaşma ve dayanışma ruhu."
    },
    "egitim-bilim": {
      icon: "🎓",
      title: "Eğitim ve Bilim",
      description: "Bilim ve teknolojide ilerleme, eğitimde mükemmellik arayışı."
    },
    "aile-yapisi": {
      icon: "👨‍👩‍👧‍👦",
      title: "Aile Yapısı",
      description: "Türk aile değerlerini koruma ve güçlendirme. Nesiller arası bağların sağlamlığı."
    },
    "caliskanlik": {
      icon: "💪",
      title: "Çalışkanlık ve Üretkenlik",
      description: "Emek ve alın teri ile kazanılan başarının değeri. Üretken olmaya olan inanç."
    },
    "misafirperverlik": {
      icon: "🏠",
      title: "Misafirperverlik",
      description: "Konuğa ve misafire gösterilen geleneksel Türk misafirperverliği."
    },
    "saygı-sevgi": {
      icon: "❤️",
      title: "Saygı ve Sevgi",
      description: "Büyüklere saygı, küçüklere sevgi gösterme prensipleri."
    }
  }), []);

  const currentValue = turkishValues[valueId as keyof typeof turkishValues];

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  if (!mounted) return null;

  return (
    <>
      {/* Card */}
      <div
        className="relative group cursor-pointer content-stable motion-stable ultra-stable no-motion"
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
      </div>

      {/* Modal */}
      {mounted && createPortal(
        isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 ultra-stable no-motion"
            onClick={closeModal}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm ultra-stable no-motion" />

            {/* Mobile-optimized Modal Content */}
            <div
              className="relative max-w-6xl w-full max-h-[95vh] overflow-hidden mx-2 sm:mx-4 ultra-stable no-motion"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Modal Card */}
              <div className="bg-gradient-to-br from-black via-red-950/20 to-black border-2 border-red-500/50 rounded-3xl backdrop-blur-xl shadow-[0_30px_80px_rgba(239,68,68,0.4)] overflow-hidden ultra-stable no-motion">
                
                {/* Header */}
                <div className="relative bg-gradient-to-r from-red-600/20 via-red-700/30 to-red-600/20 border-b border-red-500/30 p-6 sm:p-8 lg:p-10">
                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 rounded-full flex items-center justify-center text-white hover:text-red-200 transition-all duration-200 z-10 ultra-stable no-motion"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Icon and Title */}
                  <div className="text-center pr-16">
                    <div className="text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6">
                      {currentValue?.icon}
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 sm:mb-6 leading-tight">
                      {currentValue?.title}
                    </h2>
                  </div>

                  {/* Decorative Elements */}
                  <div className="flex justify-center items-center space-x-4 mb-8">
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-red-500 to-red-500"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.6)] ultra-stable no-motion" />
                    <div className="w-20 h-px bg-gradient-to-l from-transparent via-red-500 to-red-500"></div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="relative p-10 lg:p-12 pt-0">
                  <div className="bg-black/60 backdrop-blur-lg rounded-2xl p-8 lg:p-10 border border-red-500/30 ultra-stable no-motion">
                    <p className="text-white text-xl lg:text-2xl leading-relaxed text-center font-medium px-4">
                      {currentValue?.description}
                    </p>
                  </div>

                  {/* Additional Visual Elements */}
                  <div className="flex justify-center mt-8 lg:mt-10">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="w-4 h-px bg-red-500"></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="w-4 h-px bg-red-500"></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gradient-to-r from-red-950/30 via-black/50 to-red-950/30 border-t border-red-500/30 p-6 sm:p-8 lg:p-10 text-center">
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    Bu değer, Türk milletinin binlerce yıllık kültürel birikiminin bir parçasıdır.
                  </p>
                  <div className="mt-4 sm:mt-6">
                    <button
                      onClick={closeModal}
                      className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border border-red-500/50 rounded-xl text-white font-semibold transition-all duration-200 shadow-[0_10px_30px_rgba(239,68,68,0.3)] hover:shadow-[0_15px_40px_rgba(239,68,68,0.5)] ultra-stable no-motion"
                    >
                      Kapat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        document.body
      )}
    </>
  );
};

export default TurkishValueCard;