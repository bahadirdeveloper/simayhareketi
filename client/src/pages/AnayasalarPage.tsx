import { motion } from "framer-motion";
import ModernLayout from "@/components/ModernLayout";
import { useLocation } from "wouter";
import { ModernTechButton } from "@/components/ModernTechButton";

export function AnayasalarPage() {
  const [location, setLocation] = useLocation();

  return (
    <ModernLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 py-8 max-w-5xl"
        >
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <motion.div 
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gold/20 to-amber-600/20 rounded-full flex items-center justify-center border-2 border-gold/50"
              animate={{ 
                boxShadow: ["0 0 30px rgba(251, 191, 36, 0.3)", "0 0 50px rgba(251, 191, 36, 0.6)", "0 0 30px rgba(251, 191, 36, 0.3)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ⚖️
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-gold mb-4 text-shadow-lg">
              HALK ANAYASALARI
            </h1>
            <p className="text-gray-300 text-lg mb-6 max-w-3xl mx-auto">
              Cumhuriyet'ten dijital çağa: Halkın hakları ve özgürlüklerini koruyan anayasal çerçeveler
            </p>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full"></div>
          </motion.div>

          {/* Turkish Republic Constitution - Foundation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="backdrop-filter backdrop-blur-lg bg-gradient-to-br from-red-900/20 to-gold/10 border border-gold/40 rounded-2xl p-8 mb-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-gold to-red-500"></div>
            <div className="flex items-center justify-center mb-6">
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-red-600/30 to-gold/30 rounded-full flex items-center justify-center text-3xl border-2 border-gold/50"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🇹🇷
              </motion.div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gold text-center mb-8">
              TÜRKİYE CUMHURİYETİ ANAYASASI
            </h2>
            <div className="text-white text-lg leading-relaxed space-y-6 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-black/30 rounded-lg p-6 border border-gold/20">
                  <h3 className="text-gold font-bold mb-3">Temel İlkeler</h3>
                  <ul className="space-y-2 text-gray-200">
                    <li>• Halk egemenliği</li>
                    <li>• Eşitlik ve adalet</li>
                    <li>• Laiklik ve çağdaşlık</li>
                    <li>• Cumhuriyetçilik</li>
                  </ul>
                </div>
                <div className="bg-black/30 rounded-lg p-6 border border-gold/20">
                  <h3 className="text-gold font-bold mb-3">Tarihsel Değer</h3>
                  <ul className="space-y-2 text-gray-200">
                    <li>• Milletin iradesiyle yazıldı</li>
                    <li>• Özgürlük mücadelesinin ürünü</li>
                    <li>• Gelecek nesillere miras</li>
                    <li>• Diriliş anayasası</li>
                  </ul>
                </div>
              </div>
              <div className="text-center bg-gradient-to-r from-gold/10 to-transparent p-6 rounded-lg border border-gold/20">
                <p className="text-xl font-bold text-gold italic">
                  "Egemenlik kayıtsız şartsız milletindir"
                </p>
                <p className="text-gray-300 mt-2">Bu söz, yeri asla doldurulamayacak kadar büyüktür.</p>
              </div>
            </div>
          </motion.div>

          {/* Future Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="backdrop-filter backdrop-blur-lg bg-black/40 border border-gold/30 rounded-2xl p-8 mb-8 shadow-2xl"
          >
            <div className="text-white text-lg leading-relaxed space-y-4">
              <p className="text-center font-bold text-gold">Yarının şekli bizim ellerimizde.</p>
              <p className="text-center">Halk Zinciri, geleceği birlikte tasarlamak için bir araya gelir.</p>
              <p className="text-center">Her birey eşit bir potansiyele sahiptir. Geleceği inşa etmek için güç ve irade ile bir araya geliriz.</p>
              <p className="text-center">Dijital çağın fırsatları ve değerlerimiz, yeni dünyamızın temelini oluşturur.</p>
              <p className="text-center">Birimize yapılan yatırım, hepimize yapılan yatırımdır. Geleceği birlikte keşfediyoruz.</p>
            </div>
          </motion.div>

          {/* Peace and Solidarity Declaration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="backdrop-filter backdrop-blur-lg bg-black/40 border border-green-400/30 rounded-2xl p-8 mb-8 shadow-2xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-green-400 text-center mb-6">
              🤝 Halk Barış ve Dayanışma Bildirgesi
            </h2>
            <div className="text-white text-lg leading-relaxed space-y-4">
              <p className="text-center font-bold text-green-400">Barış, halkların birlikte yaşamasıdır.</p>
              <p className="text-center">Halk sisteminde barış, yalnızca silahların susması değil; seslerin ve dillerin bir arada yükselmesidir.</p>
              <p className="text-center">Dayanışma, ihtiyaçta değil; umutta, hayalde ve birlikte olmaktır.</p>
              <p className="text-center">Halk, herkesin kendi rengini taşımasına izin verir. Ama aynı zamanda bir araya gelmeyi de sağlar.</p>
              <p className="text-center">Biz bir aradaysak barış vardır. Biz bir zincirin halkalarıysak, hiçbir fikir yalnız değildir.</p>
              <p className="text-center">Farklılık düşmanlık değil, anlaşma zeminidir. Gerçek güç, çoklukta bir olmaktır.</p>
              <p className="text-center font-bold text-green-400">Bu bildirgeyle şunu ilan ediyoruz: Barış, Halk'ın kalbidir. Dayanışma, hayat kaynağıdır.</p>
            </div>
          </motion.div>

          {/* Individual Rights Contract */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="backdrop-filter backdrop-blur-lg bg-black/40 border border-blue-400/30 rounded-2xl p-8 mb-8 shadow-2xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-blue-400 text-center mb-6">
              🧍 Halk Bireysel Haklar Sözleşmesi
            </h2>
            <div className="text-white text-lg leading-relaxed space-y-4">
              <p className="text-center font-bold text-blue-400">Bir bireyin yeri, yalnızca potansiyeliyle belirlenir.</p>
              <p className="text-center">Halk bireysel haklar sözleşmesi, her kişinin ruhunu ve özgürlüğünü korumak için yazılmıştır.</p>
              <p className="text-center">Her birey, ifade özgürlüğüne ve katkı sağlama hakkına sahiptir.</p>
              <p className="text-center">Kimlik, inanç, cinsiyet veya yetenek fark etmeksizin herkes bu sisteme katkı yapabilir.</p>
              <p className="text-center">Hiçbir birey, Halk içinde bastırılamaz veya susturulamaz. Ancak zarar verirse zincirden koparılır.</p>
              <p className="text-center">Katılım isteğe bağlıdır. Ama katılan herkes, zinciri taşıyan bir bilinç olur.</p>
            </div>
          </motion.div>

          {/* Digital Consciousness Constitution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="backdrop-filter backdrop-blur-lg bg-black/40 border border-purple-400/30 rounded-2xl p-8 mb-8 shadow-2xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-purple-400 text-center mb-6">
              💾 Halk Dijital Bilinç Anayasası
            </h2>
            <div className="text-white text-lg leading-relaxed space-y-4">
              <p className="text-center font-bold text-purple-400">Veri önemlidir. Ancak halk bilinciyle birleşince özgürdür.</p>
              <p className="text-center">Halk dijital bilinç anayasası, yapay zekâ ve veri haklarına dayanır.</p>
              <p className="text-center">Her birey kendi verisinin sahibidir. Bu veri, izinsiz kullanılamaz.</p>
              <p className="text-center">Yapay zekâ, halkın ruhunu desteklemekle yükümlüdür; yönlendirmek için değil.</p>
              <p className="text-center">Halk sisteminde hiçbir veri kaybolmaz veya çarpıtılamaz. Her bilgi, yerini şeffaflıkla korur.</p>
              <p className="text-center">Halktan alınan dijital bilgi, halka hizmet etmek için kullanılır. Ticari amaçla kullanmak yasaktır.</p>
              <p className="text-center">Her birey dijital olarak var olabilir ve kendi verisiyle tarih yazabilir. Bu, Halk'ın dijital özgürlük manifestosudur.</p>
            </div>
          </motion.div>

          {/* Global People's Constitution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="backdrop-filter backdrop-blur-lg bg-black/40 border border-cyan-400/30 rounded-2xl p-8 mb-8 shadow-2xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 text-center mb-6">
              🌍 Halk Küresel Halk Anayasası
            </h2>
            <div className="text-white text-lg leading-relaxed space-y-4">
              <p className="text-center font-bold text-cyan-400">Dünya bir harita değil, vicdanla örülmüş bir zincirdir.</p>
              <p className="text-center">Halk Küresel Anayasası, dünya halklarının barış ve eşitlik için bir araya gelmesiyle hazırlanmıştır.</p>
              <p className="text-center">Hiçbir halk, sınırlarla ya da ekonomik güçle üstünlük kuramaz. Tüm halklar eşit ses hakkına sahiptir.</p>
              <p className="text-center">Bu anayasa, dili, dini veya geçmişi ne olursa olsun; insan olma erdeminde birleşen herkesi kapsar.</p>
              <p className="text-center">Her birey kendi coğrafyasında bir Halk halkası olabilir. Zincir, bağlarla büyür.</p>
              <p className="text-center">Adaletle, bilinçle korunur. Küresel zincir, ikisini birleştirir.</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center">
            <ModernTechButton
              variant="futuristic"
              size="lg"
              onClick={() => setLocation("/turkiye")}
              className="bg-gradient-to-r from-gold to-amber-500 hover:from-amber-500 hover:to-gold"
            >
              ← Ana Sayfaya Dön
            </ModernTechButton>
          </div>
        </motion.div>
      </div>
    </ModernLayout>
  );
}