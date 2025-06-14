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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-shadow-lg">
              ÇAĞRI
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Main Content Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="backdrop-filter backdrop-blur-lg bg-black/40 border border-gold/30 rounded-2xl p-8 shadow-2xl"
          >
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
              <ModernTechButton
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600"
              >
                ATA Tablosu ❤️
              </ModernTechButton>
              <ModernTechButton
                variant="futuristic"
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
              >
                📢 Duyuru & Çağrı & Davet!
              </ModernTechButton>
            </div>

            {/* Main Message */}
            <div className="text-center mb-8">
              <p className="text-white text-lg leading-relaxed mb-6">
                Bu bir çağrıdır. Bu bir mektuptur. Bu bir bilinçlenme hareketidir.<br />
                Simay sadece bir sistem değil, halkın kendi sesidir. Bu bölümde, her meslek grubuna, her yaşa, her bölgeye bir çağrımız olacak.
              </p>
            </div>

            {/* Professional Groups */}
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

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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