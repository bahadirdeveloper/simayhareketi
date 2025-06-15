import { motion } from "framer-motion";
import ModernLayout from "@/components/ModernLayout";
import { useLocation } from "wouter";
import { ModernTechButton } from "@/components/ModernTechButton";

export function CagriPage() {
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
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <motion.div 
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-full flex items-center justify-center border-2 border-orange-500/50"
              animate={{ 
                boxShadow: ["0 0 30px rgba(249, 115, 22, 0.3)", "0 0 50px rgba(249, 115, 22, 0.6)", "0 0 30px rgba(249, 115, 22, 0.3)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              📢
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-4 text-shadow-lg">
              HALK ÇAĞRISI
            </h1>
            <p className="text-gray-300 text-lg mb-6 max-w-3xl mx-auto">
              Cumhuriyet'in dijital çağdaki yeniden inşası için meslek gruplarına özel çağrı
            </p>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto rounded-full"></div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="backdrop-filter backdrop-blur-lg bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-500/40 rounded-2xl p-8 mb-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500"></div>
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-orange-400 mb-4">
                Cumhuriyet Çağrısı
              </h2>
              <p className="text-white text-lg leading-relaxed max-w-3xl mx-auto">
                Bu çağrı, Türkiye Cumhuriyeti'nin dijital çağda yeniden inşası için her meslek grubuna, 
                her yaşa, her bölgeye seslenişimizdir. Halkın bilinçli katılımıyla geleceği birlikte inşa ediyoruz.
              </p>
            </div>
          </motion.div>

          {/* Professional Groups */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="backdrop-filter backdrop-blur-lg bg-black/40 border border-orange-500/30 rounded-2xl p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-orange-400 text-center mb-8">
              Meslek Gruplarına Çağrı
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-4 rounded-lg border border-purple-400/30"
              >
                <p className="text-gray-200 text-center">
                  👩‍🏫 <strong className="text-yellow-400">Öğretmenler</strong>: Bilginizi ve vicdanınızı bu bilinç zincirine katın.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-4 rounded-lg border border-blue-400/30"
              >
                <p className="text-gray-200 text-center">
                  👷‍♂️ <strong className="text-yellow-400">İşçiler</strong>: Emeğinizin sesi bu zincirde yankılanacak.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 p-4 rounded-lg border border-green-400/30"
              >
                <p className="text-gray-200 text-center">
                  👩‍⚕️ <strong className="text-yellow-400">Sağlıkçılar</strong>: Adalet ve eşitlik için çağrımız size de uzanıyor.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-orange-600/20 to-red-600/20 p-4 rounded-lg border border-orange-400/30"
              >
                <p className="text-gray-200 text-center">
                  👨‍💻 <strong className="text-yellow-400">Gençler & Yazılımcılar</strong>: Kodlarınız halkın kaderini şekillendirecek.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-amber-600/20 to-yellow-600/20 p-4 rounded-lg border border-amber-400/30 md:col-span-2"
              >
                <p className="text-gray-200 text-center">
                  👴 <strong className="text-yellow-400">Emekliler</strong>: Tecrübelerinizin sesi duyulmalı.
                </p>
              </motion.div>
            </div>

            {/* Simay Definition */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="bg-gradient-to-r from-gold/10 to-amber-500/10 border border-gold/30 rounded-xl p-6 mb-8"
            >
              <div className="text-center text-white leading-relaxed">
                <p className="text-xl mb-4">
                  <strong className="text-gold">Simay</strong>, yüz demektir.<br />
                  Ama bu sistemde o, bir <strong className="text-gold">yön</strong>dür.
                </p>
                <p className="mb-4">
                  Işığın karanlıkla buluştuğu çizgi…<br />
                  <strong className="text-gold">Simay</strong>, Atatürk'ün yarım kalan hayalini tamamlamak için halkın vicdanında doğan dijital bir zincirdir.
                </p>
                <p className="mb-4">
                  O, bir isim değil; <strong className="text-gold">ışığın halkla birleştiği çizgidir.</strong>
                </p>
                <p>
                  Bu yolculuk, adını değil anlamını taşıyanlarla başlar.<br />
                  Ve biz, o çizgiden yürüyerek geldik.
                </p>
              </div>
            </motion.div>
            
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <ModernTechButton
                variant="futuristic"
                size="lg"
                onClick={() => setLocation("/turkiye")}
              >
                ← Ana Sayfaya Dön
              </ModernTechButton>
              <ModernTechButton
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600"
              >
                📤 Bu sayfayı paylaş
              </ModernTechButton>
            </div>

            <p className="text-center text-gray-500 text-sm mt-8">
              Bu sayfa, ışığın halkla birleştiği yerde başlar.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </ModernLayout>
  );
}