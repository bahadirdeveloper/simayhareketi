import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import HalfBurningEarthBackground from "@/components/HalfBurningEarthBackground";
import { apiRequest } from "@/lib/queryClient";
import { Target, Shield } from "lucide-react";

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
        
        <header className="text-center mb-12">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-4 text-red-500"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t('amaclar.title', 'Amaçlarımız & Savaşlarımız')}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t('amaclar.subtitle', 'Atatürk\'ün gösterdiği ışıkla, halkın sesi olarak yeni bir sistem kuruyoruz.')}
          </motion.p>
        </header>
        
        {/* Amaçlar Bölümü */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-yellow-400 flex items-center justify-center">
            <Target className="mr-2 h-6 w-6" />
            {t('amaclar.amaclar_title', 'AMAÇLARIMIZ')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Amaç 1 */}
            <motion.div
              className="bg-black/60 border-2 border-red-700 rounded-lg p-6 backdrop-blur-sm"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4 text-white">1</h3>
              <p className="text-gray-300">
                {t('amaclar.amac1', 'Her bireye doğru ve nitelikli eğitim sağlamak').replace(
                  t('amaclar.amac1_bold'),
                  `<span class="text-yellow-400 font-bold">${t('amaclar.amac1_bold')}</span>`
                )}
              </p>
            </motion.div>
            
            {/* Amaç 2 */}
            <motion.div
              className="bg-black/60 border-2 border-red-700 rounded-lg p-6 backdrop-blur-sm"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4 text-white">2</h3>
              <p className="text-gray-300">
                {t('amaclar.amac2', 'Halkı')} <span className="text-yellow-400 font-bold">
                  {t('amaclar.amac2_bold', 'bilgi, vicdan ve bilinçle')}
                </span> {t('amaclar.amac2_rest', 'yeniden inşa etmek')}
              </p>
            </motion.div>
            
            {/* Amaç 3 */}
            <motion.div
              className="bg-black/60 border-2 border-red-700 rounded-lg p-6 backdrop-blur-sm"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4 text-white">3</h3>
              <p className="text-gray-300">
                {t('amaclar.amac3', 'Cumhuriyeti')} <span className="text-yellow-400 font-bold">
                  {t('amaclar.amac3_bold', 'dijital çağın değerleriyle')}
                </span> {t('amaclar.amac3_rest', 'bütünleştirmek')}
              </p>
            </motion.div>
            
            {/* Amaç 4 */}
            <motion.div
              className="bg-black/60 border-2 border-red-700 rounded-lg p-6 backdrop-blur-sm"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4 text-white">4</h3>
              <p className="text-gray-300">
                {t('amaclar.amac4', 'Sadece konuşan değil,')} <span className="text-yellow-400 font-bold">
                  {t('amaclar.amac4_bold', 'çözüm üreten bireyler')}
                </span> {t('amaclar.amac4_rest', 'topluluğu olmak')}
              </p>
            </motion.div>
            
            {/* Amaç 5 */}
            <motion.div
              className="bg-black/60 border-2 border-red-700 rounded-lg p-6 backdrop-blur-sm"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4 text-white">5</h3>
              <p className="text-gray-300">
                <span className="text-yellow-400 font-bold">
                  {t('amaclar.amac5_bold', 'Çocuklarımıza')}
                </span> {t('amaclar.amac5', 'özgür bir gelecek bırakmak')}
              </p>
            </motion.div>
            
            {/* Amaç 6 */}
            <motion.div
              className="bg-black/60 border-2 border-red-700 rounded-lg p-6 backdrop-blur-sm"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4 text-white">6</h3>
              <p className="text-gray-300">
                {t('amaclar.amac6', 'Herkesi sistemin aktif bir')} <span className="text-yellow-400 font-bold">
                  {t('amaclar.amac6_bold', 'katılımcısı')}
                </span> {t('amaclar.amac6_rest', 'haline getirmek')}
              </p>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Savaşlar Bölümü */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-red-500 flex items-center justify-center">
            <Shield className="mr-2 h-6 w-6" />
            {t('amaclar.savaslar_title', 'SAVAŞLARIMIZ')}
          </h2>
          
          <div className="bg-black/70 border-2 border-red-700 rounded-lg p-8 backdrop-blur-sm">
            <ul className="space-y-4">
              <motion.li 
                className="flex items-center text-lg"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Shield className="text-red-500 h-6 w-6 mr-4" />
                <span className="text-white">{t('amaclar.savas1', 'Cehalet ve bilinçsizlikle')}</span>
              </motion.li>
              <motion.li 
                className="flex items-center text-lg"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <Shield className="text-red-500 h-6 w-6 mr-4" />
                <span className="text-white">{t('amaclar.savas2', 'Yoksulluğu yöneten yapılarla')}</span>
              </motion.li>
              <motion.li 
                className="flex items-center text-lg"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <Shield className="text-red-500 h-6 w-6 mr-4" />
                <span className="text-white">{t('amaclar.savas3', 'Adaletsizlik ve cezasızlıkla')}</span>
              </motion.li>
              <motion.li 
                className="flex items-center text-lg"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <Shield className="text-red-500 h-6 w-6 mr-4" />
                <span className="text-white">{t('amaclar.savas4', 'Medya manipülasyonu ve algı operasyonlarıyla')}</span>
              </motion.li>
              <motion.li 
                className="flex items-center text-lg"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <Shield className="text-red-500 h-6 w-6 mr-4" />
                <span className="text-white">{t('amaclar.savas5', 'Sansür, baskı ve korku ile')}</span>
              </motion.li>
            </ul>
          </div>
        </motion.section>
        
        {/* Sistemsel Araçlar Bölümü */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-green-500 flex items-center justify-center">
            <Target className="mr-2 h-6 w-6" />
            {t('amaclar.sistemsel_title', 'SİSTEMSEL ARAÇLARIMIZ')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/60 border-2 border-green-600 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="font-bold text-yellow-400 mb-2">
                {t('amaclar.arac1_label', 'Görev Sistemi:')}
              </h3>
              <p className="text-gray-300">
                {t('amaclar.arac1', 'Herkesin görev aldığı zincir yapı')}
              </p>
            </div>
            
            <div className="bg-black/60 border-2 border-green-600 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="font-bold text-yellow-400 mb-2">
                {t('amaclar.arac2_label', 'Dijital Kimlik:')}
              </h3>
              <p className="text-gray-300">
                {t('amaclar.arac2', 'Katılım ve aidiyet simgesi')}
              </p>
            </div>
            
            <div className="bg-black/60 border-2 border-green-600 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="font-bold text-yellow-400 mb-2">
                {t('amaclar.arac3_label', 'Simay Anayasası:')}
              </h3>
              <p className="text-gray-300">
                {t('amaclar.arac3', 'Dijital hakların güvence altına alınması')}
              </p>
            </div>
            
            <div className="bg-black/60 border-2 border-green-600 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="font-bold text-yellow-400 mb-2">
                {t('amaclar.arac4_label', 'Şeffaf Ekonomi:')}
              </h3>
              <p className="text-gray-300">
                {t('amaclar.arac4', '1 TL ile başlayan adil bütçe yönetimi')}
              </p>
            </div>
            
            <div className="bg-black/60 border-2 border-green-600 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="font-bold text-yellow-400 mb-2">
                {t('amaclar.arac5_label', 'Sanat ve Medya:')}
              </h3>
              <p className="text-gray-300">
                {t('amaclar.arac5', 'Umudu ve adaleti yayan anlatımlar')}
              </p>
            </div>
            
            <div className="bg-black/60 border-2 border-green-600 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="font-bold text-yellow-400 mb-2">
                {t('amaclar.arac6_label', 'Halk Forumları:')}
              </h3>
              <p className="text-gray-300">
                {t('amaclar.arac6', 'Herkesin söz hakkı olduğu dijital meydanlar')}
              </p>
            </div>
          </div>
        </motion.section>
        
        {/* Katılım Çağrısı */}
        <motion.div 
          className="mt-12 bg-gradient-to-r from-green-900/80 to-blue-900/80 backdrop-blur-sm border border-yellow-500 rounded-lg p-6 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <h3 className="text-xl font-bold text-yellow-400 mb-4">{t('join.title', 'Harekete Katılın')}</h3>
          <p className="text-gray-300 mb-4">
            {t('join.subtitle', 'Daha aydınlık bir gelecek için bizimle çalışın')}
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => navigate("/gorevler")}
              className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold"
            >
              {t('simay_tasks_button', 'Görevler')}
            </Button>
            <Button 
              onClick={() => navigate("/katil")}
              className="bg-red-600 hover:bg-red-500 text-white font-bold"
            >
              {t('simay_join_button', 'Harekete Katıl')}
            </Button>
          </div>
        </motion.div>
        
        <footer className="mt-12 text-center text-gray-400 text-sm">
          &copy; 2025 Simay Hareketi — {t('amaclar.footer', 'Halkın geleceğini inşa eden bilinç zinciri')}
        </footer>
      </motion.div>
    </div>
  );
}