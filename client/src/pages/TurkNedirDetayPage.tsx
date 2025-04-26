import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import SimpleFuturisticTurkish from "@/components/SimpleFuturisticTurkish";
import AudioControl from "@/components/AudioControl";
import AccessibilityReader from "@/components/AccessibilityReader";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";

export default function TurkNedirDetayPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
  useEffect(() => {
    // Initialize audio system with turkdetay page soundtrack
    initAudio('turkdetay');
    
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
  
  const handleToggleAudio = () => {
    playSoundtrack();
    setIsAudioPlaying(!isAudioPlaying);
  };
  
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <motion.h2 
      className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient bg-gradient-to-r from-red-600 to-white text-transparent bg-clip-text mb-6 mt-10 border-b-2 border-red-600/30 pb-2"
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
  
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Background */}
      <SimpleFuturisticTurkish />
      
      {/* Erişilebilirlik Okuyucu */}
      <AccessibilityReader 
        pageContent="Türk Nedir Detay sayfasına hoş geldiniz. Bu sayfada Türk kavramının derin anlamı ve önemi anlatılmaktadır. Türk olmak bir bilinçtir. Türk; yalnızca bir soy değil, bir karakterdir. Adaleti, vicdanı ve üretimi kutsal sayan bir anlayıştır. Türk'ün tarihi durmaz. Göktürk Yazıtları'ndan Anadolu'nun destanlarına, Kurtuluş Savaşı'ndan dijital medeniyetlere Türk tarihi kesintisiz devam eder. Türk olmanın sırrı; vicdanla hareket etmek, bilgiyle donanmak, adaletin tarafında olmak, üretmek, paylaşmak ve geçmişi unutmadan geleceği kurmaktır."
        pageName="turkdetay" 
      />
      
      <main className="container mx-auto px-4 pb-24 pt-16 z-10 relative">
        <div className="max-w-4xl mx-auto">
          {/* Türk Deseni Üstbilgi */}
          <motion.div 
            className="w-full bg-gradient-to-r from-red-950/70 via-black/60 to-red-950/70 backdrop-blur-sm border-b border-red-500/40 py-2 z-20 absolute top-0 left-0 overflow-hidden shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div 
              className="h-10 w-full absolute top-0 left-0 opacity-20" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='20' viewBox='0 0 60 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5C35.5228 5 40 9.47715 40 15C40 20.5228 35.5228 25 30 25C24.4772 25 20 20.5228 20 15C20 9.47715 24.4772 5 30 5ZM30 8C26.134 8 23 11.134 23 15C23 18.866 26.134 22 30 22C33.866 22 37 18.866 37 15C37 11.134 33.866 8 30 8ZM30 11C32.2091 11 34 12.7909 34 15C34 17.2091 32.2091 19 30 19C27.7909 19 26 17.2091 26 15C26 12.7909 27.7909 11 30 11ZM0 15 L60 15 M30 0 L30 30' stroke='%23e3a008' fill='none' /%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat-x",
                backgroundSize: "60px 20px"
              }}
            />
            <div className="flex justify-between items-center container mx-auto px-6">
              <div className="flex items-center group cursor-pointer" onClick={() => navigate("/")}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-700 relative flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                  <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs font-bold group-hover:scale-110 transition-transform duration-300">TR</span>
                  </div>
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-red-500/50"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 0, 0.7] 
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  />
                </div>
                <div className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                  <p className="text-xs text-red-500 font-semibold tracking-wide">
                    Bu İcat Türk Yapımıdır
                  </p>
                  <p className="text-[10px] text-white/80 hidden md:block">
                    Akıl, Bilim, Fen ve Sanat
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-xs text-red-500/80 pr-3 border-r border-red-500/30 mr-3">
                  Cumhuriyet Güncellenme
                </p>
                <div className="bg-black/50 px-2 py-1 rounded text-white text-xs font-mono">
                  v2.0
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Header Section */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gradient bg-gradient-to-r from-red-600 to-white text-transparent bg-clip-text tracking-wide mb-8">
              TÜRK NEDİR?
            </h1>
            
            <div className="flex justify-center mb-10">
              <motion.button
                className={`bg-gradient-to-r ${isAudioPlaying ? 'from-white to-red-600' : 'from-red-700 to-red-500'} hover:from-red-600 hover:to-red-800 text-white px-8 py-3 rounded-lg shadow-lg font-bold text-xl flex items-center justify-center gap-2 min-w-[200px]`}
                onClick={handleToggleAudio}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{isAudioPlaying ? '⏸️ DURDUR' : '▶️ DİNLE'}</span>
              </motion.button>
            </div>
            
            <HighlightText>
              "Size söz… Bu medeniyet arşa yükselecek."
            </HighlightText>
          </motion.div>
          
          {/* Main Content */}
          <motion.div
            className="bg-gradient-to-b from-black/70 to-red-950/40 backdrop-blur-sm border border-red-600/30 rounded-lg p-8 md:p-10 shadow-[0_0_20px_rgba(220,38,38,0.15)]"
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
          
          {/* Quote bar at bottom */}
          <motion.div 
            className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-black via-red-900/90 to-black backdrop-blur-sm text-white py-3 px-4 text-center font-bold text-sm md:text-base border-t border-red-600/30 z-50"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Ve bunu nasıl yapacağımızı adım adım gösterdik. Tüm siyasilerden bir yana, bu işe CAN veriyoruz.
          </motion.div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-center mt-10 gap-4">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
              <Button 
                variant="outline"
                className="border-2 border-red-600/60 text-red-500 hover:bg-red-950/20 hover:text-white"
                onClick={() => navigate("/turknedir")}
              >
                ◀ Geri Dön
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
              <Button 
                variant="outline"
                className="border-2 border-red-600/60 text-red-500 hover:bg-red-950/20 hover:text-white"
                onClick={() => navigate("/")}
              >
                Ana Sayfa
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
      
      <AudioControl onToggle={handleToggleAudio} />
    </div>
  );
}