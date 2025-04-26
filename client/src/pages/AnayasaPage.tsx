import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import SimpleBurningEarth from "@/components/SimpleBurningEarth";
import AudioControl from "@/components/AudioControl";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";

export default function AnayasaPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [isPulsing, setIsPulsing] = useState(false);
  
  useEffect(() => {
    // Initialize audio system
    initAudio();
    
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
    <h2 className="text-2xl md:text-3xl font-bold text-amber-400 mb-4 text-center">
      {children}
    </h2>
  );
  
  const HighlightText = ({ children }: { children: React.ReactNode }) => (
    <p className="text-lg font-bold text-amber-400 mb-4 text-center">
      {children}
    </p>
  );
  
  const ParagraphText = ({ children }: { children: React.ReactNode }) => (
    <p className="text-base md:text-lg text-white mb-3 text-center">
      {children}
    </p>
  );
  
  const Section = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      className="bg-black/60 backdrop-blur-sm border-2 border-amber-500 rounded-lg p-6 mb-8 shadow-[0_0_15px_rgba(255,215,0,0.2)]"
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
      
      <main className="container mx-auto px-4 z-10 relative py-16">
        <div className="text-center mb-8">
          <button
            className="bg-gradient-to-r from-amber-600 to-red-700 hover:from-red-700 hover:to-amber-600 text-white px-6 py-3 rounded-lg shadow-lg font-bold mb-6"
            onClick={handleToggleAudio}
          >
            {isPulsing ? "🔊 HİSSEDİYORUM!" : "▶ HİSSET"}
          </button>
          
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-amber-400 mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            🛡️ HALK ANAYASALAR
          </motion.h1>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-10">
          <Section>
            <SectionTitle>🇹🇷 İlk Anayasamız: TÜRKİYE CUMHURİYETİ ANAYASASIDIR!</SectionTitle>
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
            <SectionTitle>🤝 Halk Barış ve Dayanışma Bildirgesi</SectionTitle>
            <HighlightText>Barış, halkların birlikte yaşamasıdır.</HighlightText>
            <ParagraphText>Halk sisteminde barış, yalnızca silahların susması değil; seslerin ve dillerin bir arada yükselmesidir.</ParagraphText>
            <ParagraphText>Dayanışma, ihtiyaçta değil; umutta, hayalde ve birlikte olmaktır.</ParagraphText>
            <ParagraphText>Halk, herkesin kendi rengini taşımasına izin verir. Ama aynı zamanda bir araya gelmeyi de sağlar.</ParagraphText>
            <ParagraphText>Biz bir aradaysak barış vardır. Biz bir zincirin halkalarıysak, hiçbir fikir yalnız değildir.</ParagraphText>
            <ParagraphText>Farklılık düşmanlık değil, anlaşma zeminidir. Gerçek güç, çoklukta bir olmaktır.</ParagraphText>
            <ParagraphText>Bu bildirgeyle şunu ilan ediyoruz: Barış, Halk'ın kalbidir. Dayanışma, hayat kaynağıdır.</ParagraphText>
          </Section>
          
          <Section>
            <SectionTitle>🧍 Halk Bireysel Haklar Sözleşmesi</SectionTitle>
            <HighlightText>Bir bireyin yeri, yalnızca potansiyeliyle belirlenir.</HighlightText>
            <ParagraphText>Halk bireysel haklar sözleşmesi, her kişinin ruhunu ve özgürlüğünü korumak için yazılmıştır.</ParagraphText>
            <ParagraphText>Her birey, ifade özgürlüğüne ve katkı sağlama hakkına sahiptir.</ParagraphText>
            <ParagraphText>Kimlik, inanç, cinsiyet veya yetenek fark etmeksizin herkes bu sisteme katkı yapabilir.</ParagraphText>
            <ParagraphText>Hiçbir birey, Halk içinde bastırılamaz veya susturulamaz. Ancak zarar verirse zincirden koparılır.</ParagraphText>
            <ParagraphText>Katılım isteğe bağlıdır. Ama katılan herkes, zinciri taşıyan bir bilinç olur.</ParagraphText>
          </Section>
          
          <Section>
            <SectionTitle>💾 Halk Dijital Bilinç Anayasası</SectionTitle>
            <HighlightText>Veri önemlidir. Ancak halk bilinciyle birleşince özgürdür.</HighlightText>
            <ParagraphText>Halk dijital bilinç anayasası, yapay zekâ ve veri haklarına dayanır.</ParagraphText>
            <ParagraphText>Her birey kendi verisinin sahibidir. Bu veri, izinsiz kullanılamaz.</ParagraphText>
            <ParagraphText>Yapay zekâ, halkın ruhunu desteklemekle yükümlüdür; yönlendirmek için değil.</ParagraphText>
            <ParagraphText>Halk sisteminde hiçbir veri kaybolmaz veya çarpıtılamaz. Her bilgi, yerini şeffaflıkla korur.</ParagraphText>
            <ParagraphText>Halktan alınan dijital bilgi, halka hizmet etmek için kullanılır. Ticari amaçla kullanmak yasaktır.</ParagraphText>
            <ParagraphText>Her birey dijital olarak var olabilir ve kendi verisiyle tarih yazabilir. Bu, Halk'ın dijital özgürlük manifestosudur.</ParagraphText>
          </Section>
          
          <Section>
            <SectionTitle>🌍 Halk Küresel Halk Anayasası</SectionTitle>
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
          <Button 
            variant="outline"
            className="border-amber-500 text-amber-400 hover:bg-amber-900/20"
            onClick={() => navigate("/turkiye")}
          >
            ◀ Türkiye Sayfasına Dön
          </Button>
          
          <Button 
            variant="outline"
            className="border-white text-white hover:bg-white/10"
            onClick={() => navigate("/")}
          >
            🏠 Ana Sayfa
          </Button>
        </div>
      </main>
      
      <AudioControl onToggle={handleToggleAudio} />
    </div>
  );
}