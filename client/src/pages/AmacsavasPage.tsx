import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import HalfBurningEarthBackground from "@/components/HalfBurningEarthBackground";
import { apiRequest } from "@/lib/queryClient";

export default function AmacsavasPage() {
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
            page: "amaclar"
          }
        );
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [i18n.language]);
  
  return (
    <div className="min-h-screen flex flex-col items-center">
      <HalfBurningEarthBackground />
      
      <motion.div
        className="container mx-auto px-4 py-8 z-10 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-between items-center mb-8">
          <Button
            onClick={() => navigate("/")}
            className="bg-green-700 hover:bg-green-600 text-white"
          >
            ← {t('back_to_home')}
          </Button>
        </div>
        
        <header className="bg-red-900 text-white py-6 px-4 rounded-lg mb-8 text-center">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-2"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t('amaclar.title', 'Amaçlarımız & Savaşlarımız')}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t('amaclar.subtitle', 'Atatürk\'ün gösterdiği ışıkla, halkın sesi olarak yeni bir sistem kuruyoruz.')}
          </motion.p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <motion.div 
            className="bg-red-50/10 p-6 rounded-lg border-l-4 border-red-700"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-white border-b-2 border-red-700 pb-2">🎯 {t('amaclar.amaclar_title', 'AMAÇLARIMIZ')}</h2>
            <ul className="space-y-3 text-gray-200">
              <li><span className="text-yellow-400 font-bold">{t('amaclar.amac1_bold', 'doğru ve nitelikli eğitim')}</span> {t('amaclar.amac1', 'Her bireye doğru ve nitelikli eğitim sağlamak')}</li>
              <li>{t('amaclar.amac2', 'Halkı')} <span className="text-yellow-400 font-bold">{t('amaclar.amac2_bold', 'bilgi, vicdan ve bilinçle')}</span> {t('amaclar.amac2_rest', 'yeniden inşa etmek')}</li>
              <li>{t('amaclar.amac3', 'Cumhuriyeti')} <span className="text-yellow-400 font-bold">{t('amaclar.amac3_bold', 'dijital çağın değerleriyle')}</span> {t('amaclar.amac3_rest', 'bütünleştirmek')}</li>
              <li>{t('amaclar.amac4', 'Sadece konuşan değil,')} <span className="text-yellow-400 font-bold">{t('amaclar.amac4_bold', 'çözüm üreten bireyler')}</span> {t('amaclar.amac4_rest', 'topluluğu olmak')}</li>
              <li><span className="text-yellow-400 font-bold">{t('amaclar.amac5_bold', 'Çocuklarımıza')}</span> {t('amaclar.amac5', 'özgür bir gelecek bırakmak')}</li>
              <li>{t('amaclar.amac6', 'Herkesi sistemin aktif bir')} <span className="text-yellow-400 font-bold">{t('amaclar.amac6_bold', 'katılımcısı')}</span> {t('amaclar.amac6_rest', 'haline getirmek')}</li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="bg-green-50/10 p-6 rounded-lg border-l-4 border-green-700"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-white border-b-2 border-green-700 pb-2">⚔️ {t('amaclar.savaslar_title', 'SAVAŞLARIMIZ')}</h2>
            <ul className="space-y-3 text-gray-200">
              <li><span className="text-yellow-400 font-bold">{t('amaclar.savas1', 'Cehalet ve bilinçsizlikle')}</span></li>
              <li><span className="text-yellow-400 font-bold">{t('amaclar.savas2', 'Yoksulluğu yöneten yapılarla')}</span></li>
              <li><span className="text-yellow-400 font-bold">{t('amaclar.savas3', 'Adaletsizlik ve cezasızlıkla')}</span></li>
              <li><span className="text-yellow-400 font-bold">{t('amaclar.savas4', 'Medya manipülasyonu ve algı operasyonlarıyla')}</span></li>
              <li><span className="text-yellow-400 font-bold">{t('amaclar.savas5', 'Sansür, baskı ve korku ile')}</span></li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="bg-blue-50/10 p-6 rounded-lg border-l-4 border-blue-700"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-white border-b-2 border-blue-700 pb-2">🌍 {t('amaclar.sistemsel_title', 'SİSTEMSEL ARAÇLARIMIZ')}</h2>
            <ul className="space-y-3 text-gray-200">
              <li><span className="text-yellow-400 font-bold">{t('amaclar.arac1_label', 'Görev Sistemi:')}</span> {t('amaclar.arac1', 'Herkesin görev aldığı zincir yapı')}</li>
              <li><span className="text-yellow-400 font-bold">{t('amaclar.arac2_label', 'Dijital Kimlik:')}</span> {t('amaclar.arac2', 'Katılım ve aidiyet simgesi')}</li>
              <li><span className="text-yellow-400 font-bold">{t('amaclar.arac3_label', 'Simay Anayasası:')}</span> {t('amaclar.arac3', 'Dijital hakların güvence altına alınması')}</li>
              <li><span className="text-yellow-400 font-bold">{t('amaclar.arac4_label', 'Şeffaf Ekonomi:')}</span> {t('amaclar.arac4', '1 TL ile başlayan adil bütçe yönetimi')}</li>
              <li><span className="text-yellow-400 font-bold">{t('amaclar.arac5_label', 'Sanat ve Medya:')}</span> {t('amaclar.arac5', 'Umudu ve adaleti yayan anlatımlar')}</li>
              <li><span className="text-yellow-400 font-bold">{t('amaclar.arac6_label', 'Halk Forumları:')}</span> {t('amaclar.arac6', 'Herkesin söz hakkı olduğu dijital meydanlar')}</li>
            </ul>
          </motion.div>
        </div>
        
        <footer className="mt-12 text-center text-gray-400 text-sm">
          &copy; 2025 Simay Sistemi — {t('amaclar.footer', 'Halkın geleceğini inşa eden bilinç zinciri')}
        </footer>
      </motion.div>
    </div>
  );
}