import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import ModernLayout from "@/components/ModernLayout";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";

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
              <div className="mb-10 text-center space-y-6">
                <motion.p 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold leading-relaxed text-white"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Türk, sadece bir ırk ya da coğrafya değildir.
                </motion.p>
                
                <motion.p 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold leading-relaxed text-red-500"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Türk; bir duruştur, bir vicdandır, bir direniştir.
                </motion.p>
                
                <motion.p 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold leading-relaxed text-white"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Adalete susamış halkların yüreğidir, tarihin en derin izidir.
                </motion.p>
              </div>
              
              <motion.div
                className="flex justify-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <Button
                  onClick={() => navigate("/turk-nedir-detay")}
                  className="px-10 py-6 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white text-xl sm:text-2xl font-bold rounded-xl shadow-lg hover:shadow-red-700/20 transition-all duration-300"
                >
                  DAMARLARIMDA HİSSEDİYORUM
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Quote Section */}
            <motion.div
              className="bg-black/40 backdrop-blur-lg rounded-xl border border-red-800/20 p-6 sm:p-8 max-w-4xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <blockquote className="border-l-4 border-red-500 pl-4 my-6">
                <p className="text-xl sm:text-2xl italic text-white/90">
                  "Ne mutlu Türküm diyene!"
                </p>
                <footer className="text-right text-white/70 mt-2">
                  — Mustafa Kemal Atatürk
                </footer>
              </blockquote>
              
              <p className="text-white/90 mt-6">
                Türklük bir kültürdür, bir medeniyettir, bir yaşam biçimidir. Türklük, insanlık tarihinin en eski ve en köklü medeniyet anlayışlarından biridir. Bu medeniyet, yüzyıllar boyunca dünya tarihine yön vermiştir.
              </p>
              
              <p className="text-white/90 mt-4">
                Türk olmak; bağımsızlığa âşık olmak, adaleti savunmak, farklılıklara saygı duymak ve insanlığın gelişimine katkıda bulunmak demektir. Türk olmak, bir yaşam felsefesidir; bir duruştur; bir bilinçtir.
              </p>
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
                className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg hover:from-gray-800 hover:to-gray-950 transition-all shadow-lg hover:shadow-gray-700/20"
              >
                ◀ Türkiye Sayfasına Dön
              </Button>
              
              <Button 
                onClick={() => navigate("/turk-nedir-detay")}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-red-700/20"
              >
                Daha Fazla Detay ▶
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </ModernLayout>
  );
}