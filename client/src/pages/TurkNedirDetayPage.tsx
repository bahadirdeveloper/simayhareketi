import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import ModernLayout from "@/components/ModernLayout";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";

// Bileşen Tanımları
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.h2 
    className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-700 mb-6 mt-10 border-b border-red-700/20 pb-2"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    {children}
  </motion.h2>
);

const ParagraphText = ({ children }: { children: React.ReactNode }) => (
  <motion.p 
    className="text-lg md:text-xl text-white/90 mb-6"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    viewport={{ once: true }}
  >
    {children}
  </motion.p>
);

const HighlightText = ({ children }: { children: React.ReactNode }) => (
  <motion.div 
    className="bg-gradient-to-r from-red-800/40 to-black/40 p-4 border-l-4 border-red-600 rounded my-8"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <p className="text-xl md:text-2xl font-bold text-white">
      {children}
    </p>
  </motion.div>
);

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <motion.li 
    className="mb-3 flex items-start"
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
  >
    <span className="inline-block mr-2 mt-1 text-red-500">•</span>
    <span className="text-white/90">{children}</span>
  </motion.li>
);

export default function TurkNedirDetayPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
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
  
  const handleToggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };
  
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
            {/* Hero Section */}
            <motion.div 
              className="relative rounded-xl overflow-hidden mb-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-red-950/40 backdrop-blur-sm z-0"></div>
              <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
              
              <div className="relative z-10 py-14 px-6 sm:px-10 text-center">
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-700 pb-2">
                    TÜRK NEDİR?
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mt-4 mb-6 rounded-full"></div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <p className="text-2xl font-bold text-white mt-4">
                      "Size söz... Bu medeniyet arşa yükselecek."
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Main Content */}
            <motion.div
              className="bg-gradient-to-b from-black/60 to-red-950/30 backdrop-blur-sm rounded-xl p-8 sm:p-10 border border-red-700/20 hover:border-red-500/40 transition-all duration-300 shadow-lg hover:shadow-red-700/5 max-w-5xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <SectionTitle>1. Türk Olmak Bir Bilinçtir</SectionTitle>
              <ParagraphText>
                Türk; yalnızca bir soy değil, bir karakterdir. Adaleti, vicdanı ve üretimi kutsal sayan bir anlayıştır. Dünyanın neresinde olursa olsun; mazluma el uzatan, zalime karşı duran ruhtur.
              </ParagraphText>
              <ParagraphText>
                Gelişmiş bir medeniyet kurmak ve bunu sürdürebilmek için gereken disiplin, inanç ve kararlılık, Türk'ün varlığında hayat bulur. Bu bilinci taşıyan her insan, dünyayı daha yaşanabilir kılmak için sorumluluk alır.
              </ParagraphText>
              
              <SectionTitle>2. Türk'ün Tarihi Durmaz</SectionTitle>
              <ParagraphText>
                Göktürk Yazıtları'ndan Anadolu'nun destanlarına, Kurtuluş Savaşı'ndan dijital medeniyetlere... Türk, tarihi sadece yazmaz; yaşar, kurar, taşır.
              </ParagraphText>
              <ParagraphText>
                Her çağda, her medeniyette, her coğrafyada kendini yenileme yeteneğiyle öne çıkan Türk milleti, geçmişiyle gurur duyarken geleceği inşa etme sorumluluğunu da üstlenir. Türk'ün adım attığı her toprak, onun azminin ve kararlılığının izlerini taşır.
              </ParagraphText>
              
              <SectionTitle>3. Türk Olmanın Sırrı</SectionTitle>
              <ul className="space-y-1 mb-8 list-inside pl-2">
                <ListItem>Vicdanla hareket etmek</ListItem>
                <ListItem>Bilgiyle donanmak</ListItem>
                <ListItem>Adaletin tarafında olmak</ListItem>
                <ListItem>Üretmek, paylaşmak</ListItem>
                <ListItem>Geçmişi unutmadan geleceği kurmak</ListItem>
                <ListItem>Kendin için değil, insanlık için çalışmak</ListItem>
                <ListItem>Bağımsızlığı ve egemenliği her şeyin üstünde tutmak</ListItem>
              </ul>
              <ParagraphText>
                Bu değerler, Türk kimliğinin özünü oluşturur. Bunları içselleştiren her birey, Türklüğün özünde yer alan medeniyet kurucu ruhu yaşatır ve geleceğe taşır.
              </ParagraphText>
              
              <SectionTitle>4. Yeni Nesil Türk: Bilinç + Teknoloji + Ruh</SectionTitle>
              <ParagraphText>
                Teknoloji, bilim ve sanatla kuşanmış Türk gençliği, geleceğe medeniyet taşıyacak en büyük güçtür. Sadece kendini değil, dünyayı da ayağa kaldırmaya ant içmiştir.
              </ParagraphText>
              <ParagraphText>
                Dijital çağda, yapay zekâ, kuantum bilişim ve uzay teknolojilerinde öncü olmak, yeni nesil Türk gençliğinin hedefleri arasındadır. Geçmişin mirasını geleceğin teknolojileriyle harmanlayan Türk bilim insanları, insanlığın ilerleyişine katkıda bulunmak için çalışır.
              </ParagraphText>
              
              <HighlightText>
                Bilinci, ruhu ve teknolojisiyle birleşen Türk, insanlığın kurtuluşu olacaktır.
              </HighlightText>
              
              <SectionTitle>5. Halka Söz</SectionTitle>
              <ParagraphText>
                <strong>"Ve bunu nasıl yapacağımızı adım adım gösterdik...<br/>
                Tüm siyasilerden bir yana, bu işe <span className="bg-gradient-to-r from-red-600 to-amber-400 text-transparent bg-clip-text">CAN</span> veriyoruz."</strong>
              </ParagraphText>
              <ParagraphText>
                Bu bir parti değil, bu bir halk sistemidir. Her birey bir tuğla, her fikir bir anahtardır. Sen de bu yapının bir parçası ol!
              </ParagraphText>
              <ParagraphText>
                Türklük bilincini taşıyan herkes, geleceğin medeniyetinin inşasında sorumluluk almalıdır. Bu sorumluluk, sadece kendin için değil, tüm insanlık için çalışmayı gerektirir.
              </ParagraphText>
            </motion.div>
              
            {/* Quote Section */}
            <motion.div
              className="bg-black/40 backdrop-blur-lg rounded-xl border border-red-800/20 p-6 sm:p-8 max-w-4xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <blockquote className="border-l-4 border-red-500 pl-4 my-6">
                <p className="text-xl sm:text-2xl italic text-white/90">
                  "Ne mutlu Türküm diyene!"
                </p>
                <footer className="text-right text-white/70 mt-2">
                  — Mustafa Kemal Atatürk
                </footer>
              </blockquote>
            </motion.div>
            
            {/* Navigation Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <Button 
                onClick={() => navigate("/turknedir")}
                className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg hover:from-gray-800 hover:to-gray-950 transition-all shadow-lg hover:shadow-gray-700/20"
              >
                ◀ Türk Nedir Sayfasına Dön
              </Button>
              
              <Button 
                onClick={() => navigate("/turkiye")}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-red-700/20"
              >
                Türkiye Sayfasına Dön
              </Button>
            </motion.div>
            
            {/* Fixed Quote Bar */}
            <motion.div 
              className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-black via-red-900/90 to-black backdrop-blur-sm text-white py-3 px-4 text-center font-bold text-sm md:text-base border-t border-red-600/30 z-50"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Ve bunu nasıl yapacağımızı adım adım gösterdik. Tüm siyasilerden bir yana, bu işe CAN veriyoruz.
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </ModernLayout>
  );
}