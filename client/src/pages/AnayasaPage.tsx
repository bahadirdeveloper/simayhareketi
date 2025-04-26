import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import SimpleBurningEarth from "@/components/SimpleBurningEarth";
import AudioControl from "@/components/AudioControl";
import AccessibilityReader from "@/components/AccessibilityReader";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";

export default function AnayasaPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [isPulsing, setIsPulsing] = useState(false);
  
  useEffect(() => {
    // Initialize audio system with anayasa page soundtrack
    initAudio('anayasa');
    
    // Record visitor stats
    const recordVisit = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: i18n.language || "tr",
            hasInteracted: false,
            page: "anayasa"
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
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 2000);
  };
  
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient bg-gradient-to-r from-red-600 to-white text-transparent bg-clip-text mb-6 text-center">
      {children}
    </h2>
  );
  
  const HighlightText = ({ children }: { children: React.ReactNode }) => (
    <p className="text-xl md:text-2xl font-bold text-red-500 mb-5 text-center">
      {children}
    </p>
  );
  
  const ParagraphText = ({ children }: { children: React.ReactNode }) => (
    <p className="text-lg md:text-xl text-white mb-4 text-center">
      {children}
    </p>
  );
  
  const Section = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      className="bg-gradient-to-b from-black/70 to-red-950/40 backdrop-blur-sm border-2 border-red-500/60 rounded-lg p-8 mb-10 shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_25px_rgba(220,38,38,0.25)] transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <SimpleBurningEarth />
      
      {/* Erişilebilirlik Okuyucu */}
      <AccessibilityReader 
        pageContent="Anayasalar sayfasına hoş geldiniz. Bu sayfada Türkiye Cumhuriyeti'nin anayasa metinlerini ve halk bildirgelerini bulabilirsiniz. İlk anayasamız Türkiye Cumhuriyeti Anayasasıdır. Bu topraklarda halkın kaderini yeniden yazan ilk büyük sözleşmedir. Eşitliğin, adaletin, özgürlüğün ve halk egemenliğinin teminatıdır. Bu sayfada ayrıca Halk Barış ve Dayanışma Bildirgesi, Halk Bireysel Haklar Sözleşmesi, Halk Dijital Bilinç Anayasası ve Halk Küresel Halk Anayasası'nı inceleyebilirsiniz."
        pageName="anayasa" 
      />
      
      <main className="container mx-auto px-4 z-10 relative py-16">
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
        
        <div className="text-center mb-8 mt-16">
          <button
            className="bg-gradient-to-r from-red-700 to-red-500 hover:from-red-500 hover:to-red-700 text-white px-6 py-3 rounded-lg shadow-lg font-bold mb-6"
            onClick={handleToggleAudio}
          >
            {isPulsing ? "HİSSEDİYORUM!" : "HİSSET"}
          </button>
          
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient bg-gradient-to-r from-red-600 to-white text-transparent bg-clip-text mb-12 tracking-wide"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            HALK ANAYASALAR
          </motion.h1>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-10">
          <Section>
            <SectionTitle>İlk Anayasamız: TÜRKİYE CUMHURİYETİ ANAYASASIDIR!</SectionTitle>
            <ParagraphText>Bu topraklarda halkın kaderini yeniden yazan ilk büyük sözleşmedir.</ParagraphText>
            <ParagraphText>Eşitliğin, adaletin, özgürlüğün ve halk egemenliğinin teminatıdır.</ParagraphText>
            <ParagraphText>Milletin iradesiyle yazılmış, kanla mühürlenmiş, gelecek nesillere bırakılmış bir onur belgesidir.</ParagraphText>
            <ParagraphText>Bu anayasa sadece bir metin değil, bir dirilişin adıdır.</ParagraphText>
            <ParagraphText>Zulmün karşısında duranların, özgürlüğü hak bilenlerin ve "Egemenlik kayıtsız şartsız milletindir" diyenlerin yol haritasıdır.</ParagraphText>
            <HighlightText>Bizim ilk sözümüzdür. Ve bu söz, yeri asla doldurulamayacak kadar büyüktür.</HighlightText>
          </Section>
          
          <Section>
            <HighlightText>Yarının şekli bizim ellerimizde.</HighlightText>
            <ParagraphText>Halk Zinciri, geleceği birlikte tasarlamak için bir araya gelir.</ParagraphText>
            <ParagraphText>Her birey eşit bir potansiyele sahiptir. Geleceği inşa etmek için güç ve irade ile bir araya geliriz.</ParagraphText>
            <ParagraphText>Dijital çağın fırsatları ve değerlerimiz, yeni dünyamızın temelini oluşturur.</ParagraphText>
            <ParagraphText>Birimize yapılan yatırım, hepimize yapılan yatırımdır. Geleceği birlikte keşfediyoruz.</ParagraphText>
          </Section>
          
          <Section>
            <SectionTitle>Halk Barış ve Dayanışma Bildirgesi</SectionTitle>
            <HighlightText>Barış, halkların birlikte yaşamasıdır.</HighlightText>
            <ParagraphText>Halk sisteminde barış, yalnızca silahların susması değil; seslerin ve dillerin bir arada yükselmesidir.</ParagraphText>
            <ParagraphText>Dayanışma, ihtiyaçta değil; umutta, hayalde ve birlikte olmaktır.</ParagraphText>
            <ParagraphText>Halk, herkesin kendi rengini taşımasına izin verir. Ama aynı zamanda bir araya gelmeyi de sağlar.</ParagraphText>
            <ParagraphText>Biz bir aradaysak barış vardır. Biz bir zincirin halkalarıysak, hiçbir fikir yalnız değildir.</ParagraphText>
            <ParagraphText>Farklılık düşmanlık değil, anlaşma zeminidir. Gerçek güç, çoklukta bir olmaktır.</ParagraphText>
            <ParagraphText>Bu bildirgeyle şunu ilan ediyoruz: Barış, Halk'ın kalbidir. Dayanışma, hayat kaynağıdır.</ParagraphText>
          </Section>
          
          <Section>
            <SectionTitle>Halk Bireysel Haklar Sözleşmesi</SectionTitle>
            <HighlightText>Bir bireyin yeri, yalnızca potansiyeliyle belirlenir.</HighlightText>
            <ParagraphText>Halk bireysel haklar sözleşmesi, her kişinin ruhunu ve özgürlüğünü korumak için yazılmıştır.</ParagraphText>
            <ParagraphText>Her birey, ifade özgürlüğüne ve katkı sağlama hakkına sahiptir.</ParagraphText>
            <ParagraphText>Kimlik, inanç, cinsiyet veya yetenek fark etmeksizin herkes bu sisteme katkı yapabilir.</ParagraphText>
            <ParagraphText>Hiçbir birey, Halk içinde bastırılamaz veya susturulamaz. Ancak zarar verirse zincirden koparılır.</ParagraphText>
            <ParagraphText>Katılım isteğe bağlıdır. Ama katılan herkes, zinciri taşıyan bir bilinç olur.</ParagraphText>
          </Section>
          
          <Section>
            <SectionTitle>Halk Dijital Bilinç Anayasası</SectionTitle>
            <HighlightText>Veri önemlidir. Ancak halk bilinciyle birleşince özgürdür.</HighlightText>
            <ParagraphText>Halk dijital bilinç anayasası, yapay zekâ ve veri haklarına dayanır.</ParagraphText>
            <ParagraphText>Her birey kendi verisinin sahibidir. Bu veri, izinsiz kullanılamaz.</ParagraphText>
            <ParagraphText>Yapay zekâ, halkın ruhunu desteklemekle yükümlüdür; yönlendirmek için değil.</ParagraphText>
            <ParagraphText>Halk sisteminde hiçbir veri kaybolmaz veya çarpıtılamaz. Her bilgi, yerini şeffaflıkla korur.</ParagraphText>
            <ParagraphText>Halktan alınan dijital bilgi, halka hizmet etmek için kullanılır. Ticari amaçla kullanmak yasaktır.</ParagraphText>
            <ParagraphText>Her birey dijital olarak var olabilir ve kendi verisiyle tarih yazabilir. Bu, Halk'ın dijital özgürlük manifestosudur.</ParagraphText>
          </Section>
          
          <Section>
            <SectionTitle>Halk Küresel Halk Anayasası</SectionTitle>
            <HighlightText>Dünya bir harita değil, vicdanla örülmüş bir zincirdir.</HighlightText>
            <ParagraphText>Halk Küresel Anayasası, dünya halklarının barış ve eşitlik için bir araya gelmesiyle hazırlanmıştır.</ParagraphText>
            <ParagraphText>Hiçbir halk, sınırlarla ya da ekonomik güçle üstünlük kuramaz. Tüm halklar eşit ses hakkına sahiptir.</ParagraphText>
            <ParagraphText>Bu anayasa, dili, dini veya geçmişi ne olursa olsun; insan olma erdeminde birleşen herkesi kapsar.</ParagraphText>
            <ParagraphText>Her birey kendi coğrafyasında bir Halk halkası olabilir. Zincir, bağlarla büyür.</ParagraphText>
            <ParagraphText>Adaletle, bilinçle korunur. Küresel zincir, ikisini birleştirir.</ParagraphText>
          </Section>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-10">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
            <Button 
              variant="outline"
              className="border-red-500/50 text-red-500 hover:bg-red-950/20 hover:text-white"
              onClick={() => navigate("/turkiye")}
            >
              ◀ Türkiye Sayfasına Dön
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
            <Button 
              variant="outline"
              className="border-red-500/50 text-red-500 hover:bg-red-950/20 hover:text-white"
              onClick={() => navigate("/")}
            >
              Ana Sayfa
            </Button>
          </motion.div>
        </div>
      </main>
      
      <AudioControl onToggle={handleToggleAudio} />
    </div>
  );
}