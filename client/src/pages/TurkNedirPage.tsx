import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import SimpleFuturisticTurkish from "@/components/SimpleFuturisticTurkish";
import AudioControl from "@/components/AudioControl";
import AccessibilityReader from "@/components/AccessibilityReader";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";

export default function TurkNedirPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  
  useEffect(() => {
    // Initialize audio system with turknedir page soundtrack
    initAudio('turknedir');
    
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
  
  const handleToggleAudio = () => {
    playSoundtrack();
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: 'url("/images/seyiton.png")',
          backgroundSize: 'cover' 
        }}
      ></div>
      
      {/* Backdrop overlay for better text visibility */}
      <div className="fixed inset-0 bg-black/60 z-0"></div>
      
      {/* Erişilebilirlik Okuyucu */}
      <AccessibilityReader 
        pageContent="Türk Nedir sayfasına hoş geldiniz. Türk, sadece bir ırk ya da coğrafya değildir. Türk; bir duruştur, bir vicdandır, bir direniştir. Adalete susamış halkların yüreğidir, tarihin en derin izidir. Bu sayfada Türklük kavramının derin anlamını keşfedebilirsiniz. Damarlarımda hissediyorum butonuna tıklayarak daha fazla bilgi edinebilirsiniz."
        pageName="turknedir" 
      />
      
      <main className="container mx-auto px-4 z-10 relative flex flex-col items-center justify-center min-h-screen py-16">
        {/* Türk Deseni Üstbilgi */}
        <motion.div 
          className="w-full bg-gradient-to-r from-red-950/70 via-black/60 to-red-950/70 backdrop-blur-sm border-b border-red-500/40 py-2 z-20 absolute top-0 left-0 overflow-hidden shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div 
            className="h-10 w-full absolute top-0 left-0 opacity-20" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='20' viewBox='0 0 60 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5C35.5228 5 40 9.47715 40 15C40 20.5228 35.5228 25 30 25C24.4772 25 20 20.5228 20 15C20 9.47715 24.4772 5 30 5ZM30 8C26.134 8 23 11.134 23 15C23 18.866 26.134 22 30 22C33.866 22 37 18.866 37 15C37 11.134 33.866 8 30 8ZM30 11C32.2091 11 34 12.7909 34 15C34 17.2091 32.2091 19 30 19C27.7909 19 26 17.2091 26 15C26 12.7909 27.7909 11 30 11ZM0 15 L60 15 M30 0 L30 30' stroke='%23e3a008' fill='none' /%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat-x",
              backgroundSize: "60px 20px"
            }}
          />
          <div className="flex justify-between items-center container mx-auto px-6">
            <div className="flex items-center group cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-700 relative flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs font-bold group-hover:scale-110 transition-transform duration-300">TR</span>
                </div>
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-red-500/50"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0, 0.7] 
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
              </div>
              <div className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                <p className="text-xs text-red-500 font-semibold tracking-wide">
                  Bu İcat Türk Yapımıdır
                </p>
                <p className="text-[10px] text-white/80 hidden md:block">
                  Akıl, Bilim, Fen ve Sanat
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-xs text-red-500/80 pr-3 border-r border-red-500/30 mr-3">
                Cumhuriyet Güncellenme
              </p>
              <div className="bg-black/50 px-2 py-1 rounded text-white text-xs font-mono">
                v2.0
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="text-center mb-10 mt-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-turkish-red tracking-wide font-poppins">
            TÜRK NEDİR?
          </h1>
        </motion.div>
        
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16 turkish-content-bg p-10 rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_25px_rgba(220,38,38,0.25)] transition-all duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed mb-10 font-bold tracking-wide font-poppins turkish-accent-container">
            <span className="text-turkish-white">Türk, sadece bir ırk ya da coğrafya değildir. <span className="text-turkish-red">Türk; bir duruştur, bir vicdandır, bir direniştir.</span><br />
            Adalete susamış halkların yüreğidir, tarihin en derin izidir.</span>
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center"
            whileHover={{ scale: 1.03 }}
          >
            <Button
              className="turkish-flag-button text-2xl px-10 py-8 font-bold tracking-wide font-poppins"
              onClick={() => navigate("/turk-nedir-detay")}
            >
              DAMARLARIMDA HİSSEDİYORUM
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Navigation Buttons */}
        <motion.div
          className="mt-8 flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
            <Button 
              variant="outline"
              className="modern-button px-8 py-6 text-xl font-bold tracking-wide font-poppins"
              onClick={() => navigate("/turkiye")}
            >
              <span className="text-turkish-white">Türkiye Sayfasına Dön</span>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
            <Button 
              variant="outline"
              className="modern-button px-8 py-6 text-xl font-bold tracking-wide font-poppins"
              onClick={() => navigate("/")}
            >
              <span className="text-turkish-white">Ana Sayfa</span>
            </Button>
          </motion.div>
        </motion.div>
      </main>
      
      <AudioControl onToggle={handleToggleAudio} />
    </div>
  );
}