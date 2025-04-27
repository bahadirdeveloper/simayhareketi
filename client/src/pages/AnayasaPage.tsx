import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import ModernLayout from "@/components/ModernLayout";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";

// Bileşenler tanımı
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-700 mb-6 text-center">
    {children}
  </h2>
);

const HighlightText = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xl md:text-2xl font-bold text-red-500 mb-5 text-center">
    {children}
  </p>
);

const ParagraphText = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg md:text-xl text-white/90 mb-4 text-center">
    {children}
  </p>
);

const Section = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="bg-gradient-to-b from-black/70 to-red-950/30 backdrop-blur-sm rounded-xl p-8 mb-10 border border-red-700/20 hover:border-red-500/40 transition-all duration-300 shadow-lg hover:shadow-red-700/5"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    {children}
  </motion.div>
);

export default function AnayasaPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  
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
            page: "anayasa"
          }
        );
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
  }, [i18n.language]);

  const pageContent = "Anayasalar sayfasına hoş geldiniz. Bu sayfada Türkiye Cumhuriyeti'nin anayasa metinlerini ve halk bildirgelerini bulabilirsiniz. İlk anayasamız Türkiye Cumhuriyeti Anayasasıdır. Bu topraklarda halkın kaderini yeniden yazan ilk büyük sözleşmedir. Eşitliğin, adaletin, özgürlüğün ve halk egemenliğinin teminatıdır. Bu sayfada ayrıca Halk Barış ve Dayanışma Bildirgesi, Halk Bireysel Haklar Sözleşmesi, Halk Dijital Bilinç Anayasası ve Halk Küresel Halk Anayasası'nı inceleyebilirsiniz.";
  
  return (
    <ModernLayout audioKey="anayasa" showBackButton={true} pageName="Anayasa" pageContent={pageContent}>
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
                    ANAYASALARIMIZ
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mt-4 mb-6 rounded-full"></div>
                  
                  <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                    Türkiye Cumhuriyeti'nin temellerini oluşturan, milletin iradesini yansıtan, egemenliğin kayıtsız şartsız millete ait olduğunu belirten anayasal metinlerimiz.
                  </p>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Main Content */}
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
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Button 
                onClick={() => navigate("/turkiye")}
                className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg hover:from-gray-800 hover:to-gray-950 transition-all shadow-lg hover:shadow-gray-700/20"
              >
                ◀ Türkiye Sayfasına Dön
              </Button>
              
              <Button 
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-red-700/20"
              >
                Ana Sayfa
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </ModernLayout>
  );
}