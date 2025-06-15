import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import ModernLayout from "@/components/ModernLayout";
import { apiRequest } from "@/lib/queryClient";
import { ModernTechButton } from "@/components/ModernTechButton";
import { Flag, Heart, Map, History, ChevronLeft, Quote, Star, Shield, Book, Crown, Compass, Users } from "lucide-react";

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <motion.li 
    className="mb-4 flex items-start group"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ x: 5 }}
  >
    <span className="inline-block mr-3 mt-1 text-red-500 group-hover:text-red-400 transition-colors duration-300">
      <div className="w-2 h-2 bg-red-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
    </span>
    <span className="text-white/90 group-hover:text-white transition-colors duration-300">{children}</span>
  </motion.li>
);

export default function TurkNedirDetayPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  
  useEffect(() => {
    const recordVisit = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: i18n.language || "tr",
            hasInteracted: false,
            page: "turkdetay"
          }
        );
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
  }, [i18n.language]);

  const pageContent = "Türk Nedir Detay sayfasına hoş geldiniz. Bu sayfada Türk kavramının derin anlamı ve önemi anlatılmaktadır. Türk olmak bir bilinçtir. Türk; yalnızca bir soy değil, bir karakterdir. Adaleti, vicdanı ve üretimi kutsal sayan bir anlayıştır. Türk'ün tarihi durmaz. Göktürk Yazıtları'ndan Anadolu'nun destanlarına, Kurtuluş Savaşı'ndan dijital medeniyetlere Türk tarihi kesintisiz devam eder. Türk olmanın sırrı; vicdanla hareket etmek, bilgiyle donanmak, adaletin tarafında olmak, üretmek, paylaşmak ve geçmişi unutmadan geleceği kurmaktır.";
  
  return (
    <ModernLayout audioKey="turkdetay" showBackButton={true} pageName="Türk Nedir? - Detay" pageContent={pageContent}>
      <div className="w-full max-w-6xl mx-auto">
        <AnimatePresence>
          <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* VIP Premium Hero Section */}
            <motion.div 
              className="relative rounded-3xl overflow-hidden mb-16"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-orange-600/15 to-red-600/10 rounded-3xl blur-3xl"></div>
              <div className="relative backdrop-filter backdrop-blur-xl bg-gradient-to-br from-black/95 via-red-950/30 to-black/95 border-2 border-red-500/50 rounded-3xl shadow-[0_40px_120px_rgba(239,68,68,0.3)]">
                
                <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-t-3xl"></div>
                
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-red-500/20 to-transparent rounded-br-full"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-bl-full"></div>
                
                <div className="relative z-10 py-20 px-10 sm:px-16 text-center">
                  <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <div className="inline-block mb-10">
                      <motion.div 
                        className="w-32 h-32 mx-auto border-4 border-red-500/60 rounded-2xl flex items-center justify-center bg-gradient-to-br from-black/80 to-red-950/40 backdrop-blur-lg shadow-[0_0_80px_rgba(239,68,68,0.5)]"
                        animate={{ 
                          boxShadow: [
                            "0 0 40px rgba(239, 68, 68, 0.5)", 
                            "0 0 80px rgba(239, 68, 68, 0.9)", 
                            "0 0 40px rgba(239, 68, 68, 0.5)"
                          ],
                          scale: [1, 1.08, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Crown className="h-16 w-16 text-red-500" />
                      </motion.div>
                    </div>
                    
                    <motion.h1 
                      className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-red-500 to-orange-500 tracking-wider drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.5 }}
                    >
                      TÜRK NEDİR?
                    </motion.h1>
                    
                    <motion.p 
                      className="text-2xl md:text-3xl text-white/90 font-light mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                    >
                      Derin Analiz & Karakteristik Özellikler
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* VIP Core Definition */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-orange-600/10 to-red-600/5 rounded-3xl blur-2xl"></div>
                <div className="relative backdrop-filter backdrop-blur-xl bg-gradient-to-br from-black/90 via-red-950/20 to-black/90 border-2 border-red-500/40 rounded-3xl p-12 shadow-[0_30px_100px_rgba(239,68,68,0.15)]">
                  
                  <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                  >
                    <Book className="h-12 w-12 text-red-500 mx-auto mb-6" />
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                      Türk Olmak Bir Bilinçtir
                    </h2>
                    <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light italic max-w-4xl mx-auto">
                      "Türk; yalnızca bir soy değil, bir <span className="text-red-400 font-bold">karakterdir</span>. 
                      Adaleti, vicdanı ve üretimi kutsal sayan bir <span className="text-red-400 font-bold">anlayıştır</span>."
                    </p>
                  </motion.div>

                  {/* VIP Character Traits */}
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                  >
                    {[
                      { icon: Heart, title: "VİCDANLI", desc: "Doğru olanı yapmak" },
                      { icon: Shield, title: "ADİL", desc: "Haksızlığa karşı durmak" },
                      { icon: Star, title: "ÜRETKİN", desc: "Değer yaratmak" },
                      { icon: Compass, title: "İLKELİ", desc: "Değerlerden sapmamak" }
                    ].map((item, index) => (
                      <motion.div
                        key={item.title}
                        className="relative group"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.5 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="relative bg-gradient-to-br from-black/80 to-red-950/30 border-2 border-red-500/50 rounded-2xl p-6 backdrop-blur-lg text-center shadow-[0_10px_40px_rgba(239,68,68,0.2)] group-hover:shadow-[0_20px_60px_rgba(239,68,68,0.4)] transition-all duration-500">
                          <item.icon className="h-10 w-10 text-red-500 mx-auto mb-3" />
                          <h3 className="text-lg font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                            {item.title}
                          </h3>
                          <p className="text-white/80 text-sm">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* VIP Historical Continuity */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-orange-600/10 to-red-600/5 rounded-3xl blur-2xl"></div>
                <div className="relative backdrop-filter backdrop-blur-xl bg-gradient-to-br from-black/90 via-red-950/20 to-black/90 border-2 border-red-500/40 rounded-3xl p-12 shadow-[0_30px_100px_rgba(239,68,68,0.15)]">
                  
                  <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2 }}
                  >
                    <History className="h-12 w-12 text-red-500 mx-auto mb-6" />
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                      Türk'ün Tarihi Durmaz
                    </h2>
                    <p className="text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
                      Göktürk Yazıtları'ndan Anadolu'nun destanlarına, Kurtuluş Savaşı'ndan dijital medeniyetlere 
                      Türk tarihi kesintisiz devam eder.
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      { era: "Göktürk", period: "552-744", desc: "İlk yazılı belgeler ve devlet geleneği" },
                      { era: "Selçuklu", period: "1037-1194", desc: "Anadolu'ya yerleşim ve kültür" },
                      { era: "Osmanlı", period: "1299-1922", desc: "Çok uluslu imparatorluk dönemi" },
                      { era: "Cumhuriyet", period: "1923-", desc: "Modern Türk devleti ve değerleri" }
                    ].map((item, index) => (
                      <motion.div
                        key={item.era}
                        className="relative group"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 2.2 + index * 0.15 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="relative bg-gradient-to-br from-black/80 to-red-950/30 border-2 border-red-500/50 rounded-2xl p-6 backdrop-blur-lg text-center shadow-[0_10px_40px_rgba(239,68,68,0.2)] group-hover:shadow-[0_20px_60px_rgba(239,68,68,0.4)] transition-all duration-500">
                          <h3 className="text-xl font-bold text-red-400 mb-2">{item.era}</h3>
                          <p className="text-white/60 text-sm mb-3">{item.period}</p>
                          <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* VIP Essential Principles */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-orange-600/10 to-red-600/5 rounded-3xl blur-2xl"></div>
                <div className="relative backdrop-filter backdrop-blur-xl bg-gradient-to-br from-black/90 via-red-950/20 to-black/90 border-2 border-red-500/40 rounded-3xl p-12 shadow-[0_30px_100px_rgba(239,68,68,0.15)]">
                  
                  <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.7 }}
                  >
                    <Users className="h-12 w-12 text-red-500 mx-auto mb-6" />
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                      Türk Olmanın Sırrı
                    </h2>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 2.9 }}
                    >
                      <h3 className="text-2xl font-bold text-red-400 mb-6">Kişisel Değerler</h3>
                      <ul className="space-y-2">
                        <ListItem>Vicdanla hareket etmek</ListItem>
                        <ListItem>Bilgiyle donanmak</ListItem>
                        <ListItem>Adaletin tarafında olmak</ListItem>
                        <ListItem>Üretmek ve yaratmak</ListItem>
                        <ListItem>Paylaşmak ve yardımlaşmak</ListItem>
                      </ul>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 3.1 }}
                    >
                      <h3 className="text-2xl font-bold text-red-400 mb-6">Toplumsal Sorumluluk</h3>
                      <ul className="space-y-2">
                        <ListItem>Geçmişi unutmadan geleceği kurmak</ListItem>
                        <ListItem>Millete hizmet etmek</ListItem>
                        <ListItem>Çevreyi ve doğayı korumak</ListItem>
                        <ListItem>Teknoloji ve bilimi desteklemek</ListItem>
                        <ListItem>Kültürel değerleri yaşatmak</ListItem>
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* VIP Modern Context */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.3 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-orange-600/15 to-red-600/10 rounded-3xl blur-3xl"></div>
                <div className="relative backdrop-filter backdrop-blur-xl bg-gradient-to-br from-black/90 via-red-950/30 to-black/90 border-2 border-red-500/50 rounded-3xl p-12 shadow-[0_40px_120px_rgba(239,68,68,0.3)]">
                  
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 3.5 }}
                  >
                    <Quote className="h-12 w-12 text-red-500 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                      21. Yüzyılda Türk Olmak
                    </h2>
                    <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-5xl mx-auto mb-12">
                      Modern dünyada Türk olmak; teknolojik gelişmeleri takip etmek, küresel sorunlara yerel çözümler üretmek, 
                      kültürel değerleri koruyarak evrensel ilkelerle harmanlamak demektir.
                    </p>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 3.7 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ModernTechButton
                        onClick={() => navigate("/turknedir")}
                        className="px-10 py-4 text-xl font-bold bg-gradient-to-br from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 border-2 border-red-500/50 rounded-2xl shadow-[0_20px_60px_rgba(239,68,68,0.4)] hover:shadow-[0_30px_80px_rgba(239,68,68,0.6)] transition-all duration-500 backdrop-blur-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <ChevronLeft className="h-6 w-6 text-white" />
                          <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                            Ana Sayfaya Dön
                          </span>
                        </div>
                      </ModernTechButton>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </ModernLayout>
  );
}