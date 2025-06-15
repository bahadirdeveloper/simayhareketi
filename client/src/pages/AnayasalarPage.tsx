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
          {/* Premium Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <div className="relative">
              <motion.div 
                className="w-28 h-28 mx-auto mb-8 bg-gradient-to-br from-gold/30 to-amber-600/30 rounded-full flex items-center justify-center border-3 border-gold/60 shadow-[0_0_60px_rgba(251,191,36,0.4)]"
                animate={{ 
                  boxShadow: [
                    "0 0 40px rgba(251, 191, 36, 0.4)", 
                    "0 0 80px rgba(251, 191, 36, 0.7)", 
                    "0 0 40px rgba(251, 191, 36, 0.4)"
                  ],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-5xl">⚖️</span>
              </motion.div>
              
              {/* Premium Background Elements */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-3xl"></div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gold via-amber-400 to-gold bg-clip-text text-transparent mb-6 text-shadow-lg leading-tight">
              HALK ANAYASALARI
            </h1>
            <p className="text-gray-300 text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Cumhuriyet'ten dijital çağa: Halkın hakları ve özgürlüklerini koruyan anayasal çerçeveler
            </p>
            
            <div className="flex justify-center items-center space-x-6 mt-8">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold to-gold"></div>
              <div className="w-4 h-4 bg-gold rounded-full shadow-[0_0_20px_rgba(251,191,36,0.6)]"></div>
              <div className="w-20 h-px bg-gradient-to-l from-transparent via-gold to-gold"></div>
            </div>
          </motion.div>

          {/* Premium Turkish Republic Constitution Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mb-12"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-gold/15 to-red-600/10 rounded-3xl blur-2xl"></div>
            <div className="relative backdrop-filter backdrop-blur-xl bg-gradient-to-br from-black/95 via-red-950/30 to-black/95 border-2 border-gold/50 rounded-3xl p-10 shadow-[0_30px_100px_rgba(251,191,36,0.2)] overflow-hidden">
              
              {/* Premium Top Border */}
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-red-500 via-gold via-red-500 to-gold"></div>
              
              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-gold/20 to-transparent rounded-br-full"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-500/20 to-transparent rounded-bl-full"></div>
              
              {/* Header Section */}
              <div className="flex items-center justify-center mb-10">
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-red-600/40 to-gold/40 rounded-full flex items-center justify-center text-4xl border-3 border-gold/60 shadow-[0_0_40px_rgba(251,191,36,0.3)]"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  🇹🇷
                </motion.div>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gold via-amber-400 to-gold bg-clip-text text-transparent text-center mb-12 leading-tight">
                TÜRKİYE CUMHURİYETİ ANAYASASI
              </h2>
              
              {/* Premium Content Grid */}
              <div className="text-white text-lg leading-relaxed space-y-8 max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div 
                    className="bg-gradient-to-br from-black/60 via-gold/5 to-black/60 rounded-2xl p-8 border-2 border-gold/30 backdrop-blur-sm shadow-[0_15px_40px_rgba(0,0,0,0.3)]"
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(251,191,36,0.2)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-gold/30 to-amber-600/30 rounded-xl flex items-center justify-center text-2xl border border-gold/50 mr-4">
                        ⚖️
                      </div>
                      <h3 className="text-2xl font-bold text-gold">Temel İlkeler</h3>
                    </div>
                    <ul className="space-y-3 text-gray-200">
                      <li className="flex items-center"><span className="text-gold mr-3">▶</span> Halk egemenliği</li>
                      <li className="flex items-center"><span className="text-gold mr-3">▶</span> Eşitlik ve adalet</li>
                      <li className="flex items-center"><span className="text-gold mr-3">▶</span> Laiklik ve çağdaşlık</li>
                      <li className="flex items-center"><span className="text-gold mr-3">▶</span> Cumhuriyetçilik</li>
                    </ul>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gradient-to-br from-black/60 via-red-950/10 to-black/60 rounded-2xl p-8 border-2 border-red-500/30 backdrop-blur-sm shadow-[0_15px_40px_rgba(0,0,0,0.3)]"
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(239,68,68,0.2)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500/30 to-red-700/30 rounded-xl flex items-center justify-center text-2xl border border-red-500/50 mr-4">
                        🏛️
                      </div>
                      <h3 className="text-2xl font-bold text-red-400">Tarihsel Değer</h3>
                    </div>
                    <ul className="space-y-3 text-gray-200">
                      <li className="flex items-center"><span className="text-red-400 mr-3">▶</span> Milletin iradesiyle yazıldı</li>
                      <li className="flex items-center"><span className="text-red-400 mr-3">▶</span> Özgürlük mücadelesinin ürünü</li>
                      <li className="flex items-center"><span className="text-red-400 mr-3">▶</span> Gelecek nesillere miras</li>
                      <li className="flex items-center"><span className="text-red-400 mr-3">▶</span> Diriliş anayasası</li>
                    </ul>
                  </motion.div>
                </div>
                
                {/* Premium Quote Section */}
                <motion.div 
                  className="text-center bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 rounded-2xl p-10 border-2 border-gold/40 backdrop-blur-lg shadow-[0_20px_60px_rgba(251,191,36,0.15)]"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gold/40 to-amber-600/40 rounded-full flex items-center justify-center text-3xl border-2 border-gold/60">
                      💬
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-gold italic mb-4 leading-relaxed">
                    "Egemenlik kayıtsız şartsız milletindir"
                  </p>
                  <p className="text-gray-300 text-lg">Bu söz, yeri asla doldurulamayacak kadar büyüktür.</p>
                  
                  <div className="flex justify-center items-center space-x-4 mt-8">
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-gold"></div>
                    <div className="w-3 h-3 bg-gold rounded-full shadow-[0_0_15px_rgba(251,191,36,0.6)]"></div>
                    <div className="w-12 h-px bg-gradient-to-l from-transparent via-gold to-gold"></div>
                  </div>
                </motion.div>
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