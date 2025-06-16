import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { Target, Shield } from "lucide-react";
import SimpleFuturisticTurkish from "@/components/SimpleFuturisticTurkish";
import { apiRequest } from "@/lib/queryClient";
import { ModernTechButton } from "@/components/ModernTechButton";
import AccessibilityReader from "@/components/AccessibilityReader";

export default function AmacsavasPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  
  useEffect(() => {
    // Initialize audio system
    
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
    <div className="min-h-screen flex flex-col items-center relative overflow-x-hidden">
      {/* Background */}
      <SimpleFuturisticTurkish />
      
      {/* Erişilebilirlik Okuyucu */}
      <AccessibilityReader 
        pageContent="Amaçlarımız ve savaşlarımız sayfasına hoş geldiniz. Bu sayfada, Cumhuriyet Güncellenme hareketinin temel hedefleri ve mücadele ettiğimiz zorluklar açıklanmaktadır. Amaçlarımız, halkı bilgi ve bilinçle donatmak, eğitim sağlamak ve cumhuriyeti dijital çağa taşımaktır. Mücadele ettiğimiz sorunlar ise cehalet, adaletsizlik ve baskı sistemleridir."
        pageName="amaclar" 
      />
      
      <motion.div
        className="container mx-auto px-4 py-8 z-10 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-between items-center mb-8">
          <ModernTechButton
            onClick={() => navigate("/")}
            variant="turkish"
            size="md"
            glow="subtle"
            border="subtle"
            className="text-base-responsive min-h-[44px]"
          >
            ← {t('back_to_home')}
          </ModernTechButton>
        </div>
        
        <header className="text-center mb-12">
          <motion.div 
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-indigo-600/20 rounded-full flex items-center justify-center border-2 border-purple-500/50"
            animate={{ 
              boxShadow: ["0 0 30px rgba(147, 51, 234, 0.3)", "0 0 50px rgba(147, 51, 234, 0.6)", "0 0 30px rgba(147, 51, 234, 0.3)"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🎯
          </motion.div>
          <motion.h1 
            className="text-3xl-responsive md:text-4xl-responsive font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            AMACIMIZ & SAVAŞIMIZ
          </motion.h1>
          <p className="text-gray-300 text-lg mb-6 max-w-3xl mx-auto">
            Cumhuriyet'in dijital çağdaki sistemsel dönüşümü için mücadele alanlarımız ve stratejik hedeflerimiz
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto rounded-full"></div>
        </header>
        
        <motion.p
          className="text-xl-responsive text-gray-300 max-w-3xl mx-auto text-center mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {t('amaclar.subtitle', 'Atatürk\'ün gösterdiği ışıkla, halkın sesi olarak yeni bir sistem kuruyoruz.')}
        </motion.p>
        
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
                {t('amaclar.amac1', 'Her bireye ')} <span className="text-yellow-400 font-bold">
                  {t('amaclar.amac1_bold', 'doğru ve nitelikli eğitim')}
                </span> {t('amaclar.amac1_rest', ' sağlamak')}
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
          className="mt-12 bg-gradient-to-r from-red-900/40 to-black/60 backdrop-blur-sm border border-red-500/30 rounded-lg p-6 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <h3 className="text-xl-responsive font-bold text-red-400 mb-4">{t('join.title', 'Harekete Katılın')}</h3>
          <p className="text-gray-300 text-base-responsive mb-4">
            {t('join.subtitle', 'Daha aydınlık bir gelecek için bizimle çalışın')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <ModernTechButton 
              onClick={() => navigate("/gorevler")}
              variant="turkish"
              size="lg"
              glow="subtle"
              border="glowing"
              className="text-base-responsive min-h-[44px]"
            >
              {t('simay_tasks_button', 'Görevler')}
            </ModernTechButton>
            <ModernTechButton 
              onClick={() => navigate("/katil")}
              variant="turkish"
              size="lg"
              glow="subtle"
              border="glowing"
              className="text-base-responsive min-h-[44px]"
            >
              {t('simay_join_button', 'Harekete Katıl')}
            </ModernTechButton>
          </div>
        </motion.div>
        
        <footer className="mt-12 text-center text-gray-400 text-base-responsive pb-4">
          &copy; 2025 Cumhuriyet Güncellenme Platformu — {t('amaclar.footer', 'Halkın geleceğini inşa eden bilinç zinciri')}
        </footer>
      </motion.div>
    </div>
  );
}