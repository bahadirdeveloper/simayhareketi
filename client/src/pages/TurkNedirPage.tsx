import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import ModernLayout from "@/components/ModernLayout";
import { apiRequest } from "@/lib/queryClient";
import { ModernTechButton } from "@/components/ModernTechButton";
import { Flag, Heart, Map, History, ChevronRight, Quote, Star, Shield } from "lucide-react";

export default function TurkNedirPage() {
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
            page: "turknedir"
          }
        );
      } catch (error) {
        // Silent visit tracking error
      }
    };
    
    recordVisit();
  }, [i18n.language]);

  const pageContent = "Türk Nedir sayfasına hoş geldiniz. Türk, sadece bir ırk ya da coğrafya değildir. Türk; bir duruştur, bir vicdandır, bir direniştir. Adalete susamış halkların yüreğidir, tarihin en derin izidir. Bu sayfada Türklük kavramının derin anlamını keşfedebilirsiniz. Damarlarımda hissediyorum butonuna tıklayarak daha fazla bilgi edinebilirsiniz.";
  
  return (
    <ModernLayout audioKey="turknedir" showBackButton={true} pageName="Türk Nedir?" pageContent={pageContent}>
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
              {/* Premium Glass Morphism Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-orange-600/15 to-red-600/10 rounded-3xl blur-3xl"></div>
              <div className="relative backdrop-filter backdrop-blur-xl bg-gradient-to-br from-black/95 via-red-950/30 to-black/95 border-2 border-red-500/50 rounded-3xl shadow-[0_40px_120px_rgba(239,68,68,0.3)]">
                
                {/* Premium Top Accent */}
                <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-t-3xl"></div>
                
                {/* VIP Corner Decorations */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-red-500/20 to-transparent rounded-br-full"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-bl-full"></div>
                
                <div className="relative z-10 py-20 px-10 sm:px-16 text-center">
                  <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    {/* Premium Flag Icon */}
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
                        <Flag className="h-16 w-16 text-red-500" />
                      </motion.div>
                    </div>
                    
                    {/* Premium Title */}
                    <motion.h1 
                      className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-red-500 to-orange-500 tracking-wider drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.5 }}
                    >
                      TÜRK NEDİR?
                    </motion.h1>
                    
                    {/* Premium Divider */}
                    <motion.div 
                      className="flex justify-center items-center space-x-6 mb-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                    >
                      <div className="w-20 h-px bg-gradient-to-r from-transparent via-red-500 to-red-500"></div>
                      <motion.div 
                        className="w-4 h-4 bg-red-500 rounded-full shadow-[0_0_25px_rgba(239,68,68,0.8)]"
                        animate={{ 
                          boxShadow: [
                            "0 0 15px rgba(239, 68, 68, 0.6)",
                            "0 0 35px rgba(239, 68, 68, 1)",
                            "0 0 15px rgba(239, 68, 68, 0.6)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      ></motion.div>
                      <div className="w-20 h-px bg-gradient-to-l from-transparent via-red-500 to-red-500"></div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* VIP Definition Section */}
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
                    <Quote className="h-12 w-12 text-red-500 mx-auto mb-6" />
                    <p className="text-2xl md:text-3xl text-white leading-relaxed font-light italic">
                      "Türk, sadece bir ırk ya da coğrafya değildir. Türk; bir <span className="text-red-400 font-bold">duruştur</span>, 
                      bir <span className="text-red-400 font-bold">vicdandır</span>, bir <span className="text-red-400 font-bold">direniştir</span>."
                    </p>
                    <p className="text-xl md:text-2xl text-white/80 mt-6 font-light italic">
                      "Adalete susamış halkların yüreğidir, tarihin en derin izidir."
                    </p>
                  </motion.div>

                  {/* VIP Characteristics Grid */}
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                  >
                    {[
                      { icon: Heart, title: "VİCDAN", desc: "Adaleti ve doğruluğu kalbin rehberliğinde takip etmek" },
                      { icon: Shield, title: "DİRENİŞ", desc: "Zorbalığa karşı durmak, haklının yanında olmak" },
                      { icon: Star, title: "DURUŞ", desc: "İlkelerden taviz vermemek, karakterli olmak" },
                      { icon: History, title: "TARİH", desc: "Atalarının mirasına sahip çıkmak, geleceği kurmak" },
                      { icon: Map, title: "VATAN", desc: "Topraktan çok, değerlerle bağlılık göstermek" },
                      { icon: Flag, title: "ONUR", desc: "Milletinin adını şerefle temsil etmek" }
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
                          <item.icon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                          <h3 className="text-xl font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                            {item.title}
                          </h3>
                          <p className="text-white/80 text-sm leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* VIP Call to Action */}
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-orange-600/15 to-red-600/10 rounded-3xl blur-3xl"></div>
                <div className="relative backdrop-filter backdrop-blur-xl bg-gradient-to-br from-black/90 via-red-950/30 to-black/90 border-2 border-red-500/50 rounded-3xl p-12 shadow-[0_40px_120px_rgba(239,68,68,0.3)]">
                  
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold text-white mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.2 }}
                  >
                    Bu Değerleri Yaşıyor Musun?
                  </motion.h2>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 2.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ModernTechButton
                      onClick={() => navigate("/turkdetay")}
                      className="px-12 py-6 text-2xl font-bold bg-gradient-to-br from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 border-2 border-red-500/50 rounded-2xl shadow-[0_20px_60px_rgba(239,68,68,0.4)] hover:shadow-[0_30px_80px_rgba(239,68,68,0.6)] transition-all duration-500 backdrop-blur-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <Heart className="h-8 w-8 text-white" />
                        <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                          DAMARLARIMDA HİSSEDİYORUM!
                        </span>
                        <ChevronRight className="h-8 w-8 text-white" />
                      </div>
                    </ModernTechButton>
                  </motion.div>
                  
                  <motion.p 
                    className="text-white/70 mt-6 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 2.6 }}
                  >
                    Detaylı açıklamalar ve derin analizler için tıklayın
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* VIP Historical Context */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-orange-600/10 to-red-600/5 rounded-3xl blur-2xl"></div>
                <div className="relative backdrop-filter backdrop-blur-xl bg-gradient-to-br from-black/90 via-red-950/20 to-black/90 border-2 border-red-500/40 rounded-3xl p-12 shadow-[0_30px_100px_rgba(239,68,68,0.15)]">
                  
                  <motion.h3 
                    className="text-3xl md:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.4 }}
                  >
                    Tarihsel Süreklilik
                  </motion.h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { period: "Göktürk Yazıtları", desc: "İlk yazılı belgelerde Türk kimliği" },
                      { period: "Anadolu Destanları", desc: "Kültürel ve manevi değerler" },
                      { period: "Kurtuluş Savaşı", desc: "Bağımsızlık ve onur mücadelesi" },
                    ].map((item, index) => (
                      <motion.div
                        key={item.period}
                        className="relative group text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 2.6 + index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="relative bg-gradient-to-br from-black/80 to-red-950/30 border-2 border-red-500/50 rounded-2xl p-6 backdrop-blur-lg shadow-[0_10px_40px_rgba(239,68,68,0.2)] group-hover:shadow-[0_20px_60px_rgba(239,68,68,0.4)] transition-all duration-500">
                          <h4 className="text-xl font-bold text-red-400 mb-3">{item.period}</h4>
                          <p className="text-white/80 text-sm">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </ModernLayout>
  );
}