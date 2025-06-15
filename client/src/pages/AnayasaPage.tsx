import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import ModernLayout from "@/components/ModernLayout";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Scale, Globe, Shield, Lock } from "lucide-react";

// Modernize edilmiş bileşenler tanımı
const SectionTitle = ({ children, icon }: { children: React.ReactNode, icon?: React.ReactNode }) => (
  <div className="mb-8">
    <div className="flex items-center justify-center mb-4">
      {icon && <div className="mr-3">{icon}</div>}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-700 text-center">
        {children}
      </h2>
    </div>
    <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto rounded-full"></div>
  </div>
);

const HighlightText = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xl md:text-2xl font-bold text-white mb-5 text-center bg-gradient-to-r from-red-600/20 to-red-900/10 p-4 rounded-lg border-l-4 border-red-700">
    {children}
  </p>
);

const ParagraphText = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg md:text-xl text-white/90 mb-4 text-center leading-relaxed">
    {children}
  </p>
);

const Section = ({ children, icon }: { children: React.ReactNode, icon?: React.ReactElement }) => (
  <motion.div
    className="bg-gradient-to-br from-black/70 to-red-950/20 backdrop-blur-sm rounded-xl p-8 mb-10 border border-red-900/20 hover:border-red-700/30 transition-all duration-300 shadow-lg hover:shadow-red-900/10"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    {icon && (
      <div className="w-16 h-16 bg-gradient-to-br from-red-700 to-red-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-900/20">
        {React.cloneElement(icon, { className: "w-8 h-8 text-white" })}
      </div>
    )}
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
              
              <div className="relative z-10 py-8 sm:py-14 px-4 sm:px-6 lg:px-10 text-center">
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-700 pb-2">
                    ANAYASALARIMIZ
                  </h1>
                  <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mt-3 sm:mt-4 mb-4 sm:mb-6 rounded-full"></div>
                  
                  <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed px-2">
                    Türkiye Cumhuriyeti'nin temellerini oluşturan, milletin iradesini yansıtan, egemenliğin kayıtsız şartsız millete ait olduğunu belirten anayasal metinlerimiz.
                  </p>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Main Content */}
            <div className="max-w-4xl mx-auto space-y-10">
              <Section icon={<BookOpen />}>
                <SectionTitle>İlk Anayasamız: TÜRKİYE CUMHURİYETİ ANAYASASIDIR!</SectionTitle>
                <ParagraphText>Bu topraklarda halkın kaderini yeniden yazan ilk büyük sözleşmedir.</ParagraphText>
                <ParagraphText>Eşitliğin, adaletin, özgürlüğün ve halk egemenliğinin teminatıdır.</ParagraphText>
                <ParagraphText>Milletin iradesiyle yazılmış, kanla mühürlenmiş, gelecek nesillere bırakılmış bir onur belgesidir.</ParagraphText>
                <ParagraphText>Bu anayasa sadece bir metin değil, bir dirilişin adıdır.</ParagraphText>
                <ParagraphText>Zulmün karşısında duranların, özgürlüğü hak bilenlerin ve "Egemenlik kayıtsız şartsız milletindir" diyenlerin yol haritasıdır.</ParagraphText>
                <HighlightText>Bizim ilk sözümüzdür. Ve bu söz, yeri asla doldurulamayacak kadar büyüktür.</HighlightText>
                
                <div className="mt-6 bg-gradient-to-r from-red-900/10 to-transparent p-4 rounded-lg">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-gray-300 italic">Bu belge Türkiye Cumhuriyeti'nin temelini oluşturur ve bağımsızlığımızın simgesidir.</p>
                  </div>
                </div>
              </Section>
              
              <Section icon={<Shield />}>
                <SectionTitle>Cumhuriyet Değerleri</SectionTitle>
                <HighlightText>Yarının şekli bizim ellerimizde.</HighlightText>
                <ParagraphText>Halk Zinciri, geleceği birlikte tasarlamak için bir araya gelir.</ParagraphText>
                <ParagraphText>Her birey eşit bir potansiyele sahiptir. Geleceği inşa etmek için güç ve irade ile bir araya geliriz.</ParagraphText>
                <ParagraphText>Dijital çağın fırsatları ve değerlerimiz, yeni dünyamızın temelini oluşturur.</ParagraphText>
                <ParagraphText>Birimize yapılan yatırım, hepimize yapılan yatırımdır. Geleceği birlikte keşfediyoruz.</ParagraphText>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  {["Adalet", "Özgürlük", "Eşitlik"].map((değer, index) => (
                    <div key={index} className="bg-gradient-to-b from-black/40 to-red-950/20 backdrop-blur-sm rounded-lg p-4 border border-red-900/20 text-center">
                      <p className="text-white font-bold text-lg">{değer}</p>
                    </div>
                  ))}
                </div>
              </Section>
              
              <Section icon={<Scale />}>
                <SectionTitle>Halk Barış ve Dayanışma Bildirgesi</SectionTitle>
                <HighlightText>Barış, halkların birlikte yaşamasıdır.</HighlightText>
                <ParagraphText>Halk sisteminde barış, yalnızca silahların susması değil; seslerin ve dillerin bir arada yükselmesidir.</ParagraphText>
                <ParagraphText>Dayanışma, ihtiyaçta değil; umutta, hayalde ve birlikte olmaktır.</ParagraphText>
                <ParagraphText>Halk, herkesin kendi rengini taşımasına izin verir. Ama aynı zamanda bir araya gelmeyi de sağlar.</ParagraphText>
                <ParagraphText>Biz bir aradaysak barış vardır. Biz bir zincirin halkalarıysak, hiçbir fikir yalnız değildir.</ParagraphText>
                <ParagraphText>Farklılık düşmanlık değil, anlaşma zeminidir. Gerçek güç, çoklukta bir olmaktır.</ParagraphText>
                <ParagraphText>Bu bildirgeyle şunu ilan ediyoruz: Barış, Halk'ın kalbidir. Dayanışma, hayat kaynağıdır.</ParagraphText>
              </Section>
              
              <Section icon={<FileText />}>
                <SectionTitle>Halk Bireysel Haklar Sözleşmesi</SectionTitle>
                <HighlightText>Bir bireyin yeri, yalnızca potansiyeliyle belirlenir.</HighlightText>
                <ParagraphText>Halk bireysel haklar sözleşmesi, her kişinin ruhunu ve özgürlüğünü korumak için yazılmıştır.</ParagraphText>
                <ParagraphText>Her birey, ifade özgürlüğüne ve katkı sağlama hakkına sahiptir.</ParagraphText>
                <ParagraphText>Kimlik, inanç, cinsiyet veya yetenek fark etmeksizin herkes bu sisteme katkı yapabilir.</ParagraphText>
                <ParagraphText>Hiçbir birey, Halk içinde bastırılamaz veya susturulamaz. Ancak zarar verirse zincirden koparılır.</ParagraphText>
                <ParagraphText>Katılım isteğe bağlıdır. Ama katılan herkes, zinciri taşıyan bir bilinç olur.</ParagraphText>
              </Section>
              
              <Section icon={<Lock />}>
                <SectionTitle>Halk Dijital Bilinç Anayasası</SectionTitle>
                <HighlightText>Veri önemlidir. Ancak halk bilinciyle birleşince özgürdür.</HighlightText>
                <ParagraphText>Halk dijital bilinç anayasası, yapay zekâ ve veri haklarına dayanır.</ParagraphText>
                <ParagraphText>Her birey kendi verisinin sahibidir. Bu veri, izinsiz kullanılamaz.</ParagraphText>
                <ParagraphText>Yapay zekâ, halkın ruhunu desteklemekle yükümlüdür; yönlendirmek için değil.</ParagraphText>
                <ParagraphText>Halk sisteminde hiçbir veri kaybolmaz veya çarpıtılamaz. Her bilgi, yerini şeffaflıkla korur.</ParagraphText>
                <ParagraphText>Halktan alınan dijital bilgi, halka hizmet etmek için kullanılır. Ticari amaçla kullanmak yasaktır.</ParagraphText>
                <ParagraphText>Her birey dijital olarak var olabilir ve kendi verisiyle tarih yazabilir. Bu, Halk'ın dijital özgürlük manifestosudur.</ParagraphText>
              </Section>
              
              <Section icon={<Globe />}>
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
              className="flex flex-col sm:flex-row justify-center gap-5 mt-10 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <button 
                  onClick={() => navigate("/turkiye")}
                  className="relative px-7 py-3.5 bg-gradient-to-br from-black/80 to-gray-800/80 text-white rounded-lg hover:from-black/90 hover:to-gray-800/90 transition-all shadow-xl hover:shadow-black/20 flex items-center font-medium text-base overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-black/80 to-gray-800/80 backdrop-filter backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 stroke-[2] relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="relative z-10">Türkiye Sayfasına Dön</span>
                </button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <button 
                  onClick={() => navigate("/")}
                  className="relative px-7 py-3.5 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-lg hover:from-red-500 hover:to-red-700 transition-all shadow-xl hover:shadow-red-700/30 flex items-center font-medium text-base overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-600/80 to-red-800/80 backdrop-filter backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-700/0 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 stroke-[2] relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="relative z-10">Ana Sayfa</span>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </ModernLayout>
  );
}