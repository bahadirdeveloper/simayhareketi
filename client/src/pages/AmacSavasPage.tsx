import { motion } from "framer-motion";
import ModernLayout from "@/components/ModernLayout";
import { useLocation } from "wouter";
import { ModernTechButton } from "@/components/ModernTechButton";

export function AmacSavasPage() {
  const [location, setLocation] = useLocation();

  return (
    <ModernLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 py-8 max-w-4xl"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-shadow-lg">
              Amaçlarımız & Savaşlarımız
            </h1>
            <p className="text-gray-300 text-lg">
              Atatürk'ün gösterdiği ışıkla, halkın sesi olarak yeni bir sistem kuruyoruz.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-yellow-500 mx-auto rounded-full mt-4"></div>
          </motion.div>

          {/* Amaçlarımız */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="backdrop-filter backdrop-blur-lg bg-red-900/20 border border-red-500/30 rounded-2xl p-8 mb-8 shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-red-400 text-center mb-6 flex items-center justify-center gap-3">
              🎯 AMAÇLARIMIZ
            </h2>
            <div className="space-y-4">
              <motion.div whileHover={{ scale: 1.02, x: 10 }} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-white text-lg">
                  Her bireye <span className="text-red-400 font-bold">doğru ve nitelikli eğitim</span> sağlamak
                </p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, x: 10 }} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-white text-lg">
                  Halkı <span className="text-red-400 font-bold">bilgi, vicdan ve bilinçle</span> yeniden inşa etmek
                </p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, x: 10 }} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-white text-lg">
                  Cumhuriyeti <span className="text-red-400 font-bold">dijital çağın değerleriyle</span> bütünleştirmek
                </p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, x: 10 }} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-white text-lg">
                  Sadece konuşan değil, <span className="text-red-400 font-bold">çözüm üreten bireyler</span> topluluğu olmak
                </p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, x: 10 }} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-white text-lg">
                  <span className="text-red-400 font-bold">Çocuklarımıza</span> özgür bir gelecek bırakmak
                </p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, x: 10 }} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-white text-lg">
                  Herkesi sistemin aktif bir <span className="text-red-400 font-bold">katılımcısı</span> haline getirmek
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Savaşlarımız */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="backdrop-filter backdrop-blur-lg bg-green-900/20 border border-green-500/30 rounded-2xl p-8 mb-8 shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-green-400 text-center mb-6 flex items-center justify-center gap-3">
              ⚔️ SAVAŞLARIMIZ
            </h2>
            <div className="space-y-4">
              <motion.div whileHover={{ scale: 1.02, x: 10 }} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-white text-lg">
                  <span className="text-green-400 font-bold">Cehalet ve bilinçsizlikle</span>
                </p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, x: 10 }} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-white text-lg">
                  <span className="text-green-400 font-bold">Yoksulluğu yöneten yapılarla</span>
                </p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, x: 10 }} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-white text-lg">
                  <span className="text-green-400 font-bold">Adaletsizlik ve cezasızlıkla</span>
                </p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, x: 10 }} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-white text-lg">
                  <span className="text-green-400 font-bold">Medya manipülasyonu ve algı operasyonlarıyla</span>
                </p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, x: 10 }} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-white text-lg">
                  <span className="text-green-400 font-bold">Sansür, baskı ve korku ile</span>
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Sistemsel Araçlarımız */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="backdrop-filter backdrop-blur-lg bg-blue-900/20 border border-blue-500/30 rounded-2xl p-8 mb-8 shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-blue-400 text-center mb-6 flex items-center justify-center gap-3">
              🌍 SİSTEMSEL ARAÇLARIMIZ
            </h2>
            <div className="space-y-4">
              <motion.div whileHover={{ scale: 1.02, x: 10 }} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-white text-lg">
                  <span className="text-blue-400 font-bold">Görev Sistemi:</span> Herkesin görev aldığı zincir yapı
                </p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, x: 10 }} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-white text-lg">
                  <span className="text-blue-400 font-bold">Dijital Kimlik:</span> Katılım ve aidiyet simgesi
                </p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, x: 10 }} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-white text-lg">
                  <span className="text-blue-400 font-bold">Simay Anayasası:</span> Dijital hakların güvence altına alınması
                </p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, x: 10 }} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-white text-lg">
                  <span className="text-blue-400 font-bold">Şeffaf Ekonomi:</span> 1 TL ile başlayan adil bütçe yönetimi
                </p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, x: 10 }} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-white text-lg">
                  <span className="text-blue-400 font-bold">Sanat ve Medya:</span> Umudu ve adaleti yayan anlatımlar
                </p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, x: 10 }} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-white text-lg">
                  <span className="text-blue-400 font-bold">Halk Forumları:</span> Herkesin söz hakkı olduğu dijital meydanlar
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-center"
          >
            <p className="text-gray-500 text-sm mb-6">
              © 2025 Simay Sistemi — Halkın geleceğini inşa eden bilinç zinciri
            </p>
            <ModernTechButton
              variant="futuristic"
              size="lg"
              onClick={() => setLocation("/turkiye")}
              className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600"
            >
              ← Ana Sayfaya Dön
            </ModernTechButton>
          </motion.div>
        </motion.div>
      </div>
    </ModernLayout>
  );
}