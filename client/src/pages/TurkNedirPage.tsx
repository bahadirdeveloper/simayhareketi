import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import ModernLayout from "@/components/ModernLayout";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Flag, Heart, Map, History, ChevronRight, ChevronLeft, BookOpen, Quote } from "lucide-react";

export default function TurkNedirPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  
  useEffect(() => {
    // Record visitor stats
    const recordVisit = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: i18n.language || "tr",
            hasInteracted: false,
            page: "turknedir"
          }
        );
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
  }, [i18n.language]);

  const pageContent = "Türk Nedir sayfasına hoş geldiniz. Türk, sadece bir ırk ya da coğrafya değildir. Türk; bir duruştur, bir vicdandır, bir direniştir. Adalete susamış halkların yüreğidir, tarihin en derin izidir. Bu sayfada Türklük kavramının derin anlamını keşfedebilirsiniz. Damarlarımda hissediyorum butonuna tıklayarak daha fazla bilgi edinebilirsiniz.";
  
  return (
    <ModernLayout audioKey="turknedir" showBackButton={true} pageName="Türk Nedir?" pageContent={pageContent}>
      <div className="w-full max-w-6xl mx-auto">
        <AnimatePresence>
          <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Hero Section */}
            <motion.div 
              className="relative rounded-xl overflow-hidden mb-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-red-950/40 backdrop-blur-sm z-0"></div>
              <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
              
              <div className="relative z-10 py-16 px-6 sm:px-10 text-center">
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="inline-flex items-center justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center shadow-lg shadow-red-900/20">
                      <Flag className="h-10 w-10 text-white" />
                    </div>
                  </div>
                
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-700 pb-2">
                    TÜRK NEDİR?
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mt-4 mb-6 rounded-full"></div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Main Content */}
            <motion.div
              className="bg-gradient-to-b from-black/60 to-red-950/30 backdrop-blur-sm rounded-xl p-8 sm:p-10 border border-red-700/20 hover:border-red-500/40 transition-all duration-300 shadow-lg hover:shadow-red-700/5 max-w-5xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="mb-10 text-center space-y-10">
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center shadow-lg shadow-red-900/20 mb-4">
                    <Map className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold leading-relaxed text-white">
                    Türk, sadece bir ırk ya da coğrafya değildir.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center shadow-lg shadow-red-900/20 mb-4">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold leading-relaxed text-red-500">
                    Türk; bir duruştur, bir vicdandır, bir direniştir.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center shadow-lg shadow-red-900/20 mb-4">
                    <History className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold leading-relaxed text-white">
                    Adalete susamış halkların yüreğidir, tarihin en derin izidir.
                  </p>
                </motion.div>
              </div>
              
              <motion.div
                className="flex justify-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <Button
                  onClick={() => navigate("/turkdetay")}
                  className="px-10 py-6 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white text-xl sm:text-2xl font-bold rounded-xl shadow-lg hover:shadow-red-700/20 transition-all duration-300 flex items-center gap-3"
                >
                  <Heart className="h-6 w-6 fill-white animate-pulse" />
                  <span>DAMARLARIMDA HİSSEDİYORUM</span>
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Quote Section */}
            <motion.div
              className="bg-gradient-to-br from-black/60 to-red-950/10 backdrop-blur-lg rounded-xl border border-red-900/20 p-6 sm:p-8 max-w-4xl mx-auto mb-12 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="flex flex-col items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center shadow-lg shadow-red-900/20 mb-3">
                  <Quote className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <blockquote className="border-l-4 border-red-500 pl-6 my-6 bg-black/20 p-4 rounded-r-lg">
                <p className="text-xl sm:text-2xl italic text-white/90 font-medium">
                  "Ne mutlu Türküm diyene!"
                </p>
                <footer className="text-right text-white/70 mt-3 font-medium">
                  — Mustafa Kemal Atatürk
                </footer>
              </blockquote>
              
              <div className="mt-8 space-y-4 bg-black/20 p-5 rounded-lg border border-red-900/10">
                <p className="text-white/90 readable-text enhanced-text">
                  Türklük bir kültürdür, bir medeniyettir, bir yaşam biçimidir. Türklük, insanlık tarihinin en eski ve en köklü medeniyet anlayışlarından biridir. Bu medeniyet, yüzyıllar boyunca dünya tarihine yön vermiştir.
                </p>
                
                <p className="text-white/90 readable-text enhanced-text">
                  Türk olmak; bağımsızlığa âşık olmak, adaleti savunmak, farklılıklara saygı duymak ve insanlığın gelişimine katkıda bulunmak demektir. Türk olmak, bir yaşam felsefesidir; bir duruştur; bir bilinçtir.
                </p>
              </div>
            </motion.div>
            
            {/* Navigation Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <Button 
                onClick={() => navigate("/turkiye")}
                className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg hover:from-gray-800 hover:to-gray-950 transition-all shadow-lg hover:shadow-gray-700/20 flex items-center gap-2"
              >
                <ChevronLeft className="h-5 w-5" />
                <span>Türkiye Sayfasına Dön</span>
              </Button>
              
              <Button 
                onClick={() => navigate("/turkdetay")}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-red-700/20 flex items-center gap-2"
              >
                <span>Daha Fazla Detay</span>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </ModernLayout>
  );
}