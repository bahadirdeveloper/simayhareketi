import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import SimpleBurningEarth from "@/components/SimpleBurningEarth";
import AudioControl from "@/components/AudioControl";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";

export default function TurkNedirPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  
  useEffect(() => {
    // Initialize audio system
    initAudio();
    
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
      {/* Backdrop overlay for better text visibility */}
      <div className="fixed inset-0 bg-black/55 z-0"></div>
      
      <SimpleBurningEarth />
      
      <main className="container mx-auto px-4 z-10 relative flex flex-col items-center justify-center min-h-screen py-16">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            🇹🇷 TÜRKİYE
          </h1>
        </motion.div>
        
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16 bg-black/40 backdrop-blur-sm p-8 rounded-lg border-2 border-amber-500 shadow-[0_0_15px_rgba(255,215,0,0.3)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-xl md:text-2xl text-amber-400 leading-relaxed mb-8">
            Türk, sadece bir ırk ya da coğrafya değildir. Türk; bir duruştur, bir vicdandır, bir direniştir.<br />
            Adalete susamış halkların yüreğidir, tarihin en derin izidir.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center"
          >
            <Button
              className="bg-gradient-to-r from-amber-600 to-red-700 hover:from-red-700 hover:to-amber-600 text-white text-xl px-8 py-6 rounded-lg shadow-[0_0_25px_rgba(255,215,0,0.5)] transform hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/turk-nedir-detay")}
            >
              ❤️ DAMARLARIMDA HİSSEDİYORUM!
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
          <Button 
            variant="outline"
            className="border-amber-500 text-amber-400 hover:bg-amber-900/20"
            onClick={() => navigate("/turkiye")}
          >
            ◀ Türkiye Sayfasına Dön
          </Button>
          
          <Button 
            variant="outline"
            className="border-white text-white hover:bg-white/10"
            onClick={() => navigate("/")}
          >
            🏠 Ana Sayfa
          </Button>
        </motion.div>
      </main>
      
      <AudioControl onToggle={handleToggleAudio} />
    </div>
  );
}