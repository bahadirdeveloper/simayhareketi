import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import HalfBurningEarthBackground from "@/components/HalfBurningEarthBackground";
import { apiRequest } from "@/lib/queryClient";

export default function AnayasaPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [activeSection, setActiveSection] = useState<number | null>(null);
  
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
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [i18n.language]);
  
  // Bölüm içeriğini aç/kapa
  const toggleSection = (index: number) => {
    if (activeSection === index) {
      setActiveSection(null);
    } else {
      setActiveSection(index);
    }
  };
  
  // Anayasa bölümleri
  const sections = [
    {
      title: "🇹🇷 İlk Anayasamız: TÜRKİYE CUMHURİYETİ ANAYASASIDIR!",
      content: [
        "Bu topraklarda halkın kaderini yeniden yazan ilk büyük sözleşmedir.",
        "Eşitliğin, adaletin, özgürlüğün ve halk egemenliğinin teminatıdır.",
        "Milletin iradesiyle yazılmış, kanla mühürlenmiş, gelecek nesillere bırakılmış bir onur belgesidir.",
        "Bu anayasa sadece bir metin değil, bir dirilişin adıdır.",
        "Zulmün karşısında duranların, özgürlüğü hak bilenlerin ve \"Egemenlik kayıtsız şartsız milletindir\" diyenlerin yol haritasıdır.",
        "Bizim ilk sözümüzdür. Ve bu söz, yeri asla doldurulamayacak kadar büyüktür."
      ]
    },
    {
      title: "Gelecek Bizim Ellerimizde",
      content: [
        "Yarının şekli bizim ellerimizde.",
        "Halk Zinciri, geleceği birlikte tasarlamak için bir araya gelir.",
        "Her birey eşit bir potansiyele sahiptir. Geleceği inşa etmek için güç ve irade ile bir araya geliriz.",
        "Dijital çağın fırsatları ve değerlerimiz, yeni dünyamızın temelini oluşturur.",
        "Birimize yapılan yatırım, hepimize yapılan yatırımdır. Geleceği birlikte keşfediyoruz."
      ]
    },
    {
      title: "🤝 Halk Barış ve Dayanışma Bildirgesi",
      content: [
        "Barış, halkların birlikte yaşamasıdır.",
        "Halk sisteminde barış, yalnızca silahların susması değil; seslerin ve dillerin bir arada yükselmesidir.",
        "Dayanışma, ihtiyaçta değil; umutta, hayalde ve birlikte olmaktır.",
        "Halk, herkesin kendi rengini taşımasına izin verir. Ama aynı zamanda bir araya gelmeyi de sağlar.",
        "Biz bir aradaysak barış vardır. Biz bir zincirin halkalarıysak, hiçbir fikir yalnız değildir.",
        "Farklılık düşmanlık değil, anlaşma zeminidir. Gerçek güç, çoklukta bir olmaktır.",
        "Bu bildirgeyle şunu ilan ediyoruz: Barış, Halk'ın kalbidir. Dayanışma, hayat kaynağıdır."
      ]
    },
    {
      title: "🧍 Halk Bireysel Haklar Sözleşmesi",
      content: [
        "Her birey, sadece insan olduğu için değerlidir.",
        "Hiçbir güç, hiçbir otorite, temel insan haklarından daha üstün değildir.",
        "Her bireyin hayatta kalma, eğitim ve sağlık hizmetlerine erişim, düşünce özgürlüğü ve adil yargılanma hakkı doğuştan gelir.",
        "Dijital çağ, bu haklara yeni boyutlar ekler. Veri mahremiyeti, bilgiye erişim ve dijital ifade özgürlüğü temel dijital haklardır.",
        "Halk, bu hakları savunur ve bu hakların korunması için mücadele eder."
      ]
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col items-center">
      <HalfBurningEarthBackground />
      
      <motion.div
        className="container mx-auto px-4 py-8 z-10 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-between items-center mb-8">
          <Button
            onClick={() => navigate("/")}
            className="bg-green-700 hover:bg-green-600 text-white"
          >
            ← {t('back_to_home')}
          </Button>
        </div>
        
        <header className="text-center mb-12">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-4 text-yellow-400"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            🛡️ {t('anayasa.title', 'HALK ANAYASASI')}
          </motion.h1>
          
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Button
              className="bg-gradient-to-r from-yellow-600 to-red-700 text-white"
              onClick={() => console.log("Ses oynatma özelliği")}
            >
              ▶️ {t('anayasa.listen', 'HİSSET')}
            </Button>
          </motion.div>
        </header>
        
        {/* Anayasa Bölümleri */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div 
              key={index}
              className="bg-black/60 border-2 border-yellow-500 rounded-lg overflow-hidden backdrop-blur-sm"
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + (index * 0.1), duration: 0.8 }}
            >
              <div 
                className="p-5 cursor-pointer"
                onClick={() => toggleSection(index)}
              >
                <h2 className="text-xl text-center font-bold text-yellow-400">{section.title}</h2>
              </div>
              
              {activeSection === index && (
                <motion.div 
                  className="p-5 pt-0 space-y-4"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-white text-center">
                      {pIndex === section.content.length - 1 && index === 0 ? (
                        <span className="text-yellow-400 font-bold">{paragraph}</span>
                      ) : paragraph}
                    </p>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Katılım Çağrısı */}
        <motion.div 
          className="mt-12 bg-gradient-to-r from-green-900/80 to-blue-900/80 backdrop-blur-sm border border-yellow-500 rounded-lg p-6 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h3 className="text-xl font-bold text-yellow-400 mb-4">{t('anayasa.join_title', 'Anayasaya Katkı Sağla')}</h3>
          <p className="text-gray-300 mb-4">
            {t('anayasa.join_text', 'Halkın Anayasası sürekli gelişen, yaşayan bir metindir. Siz de fikirlerinizle katkıda bulunun.')}
          </p>
          <Button 
            onClick={() => navigate("/katil")}
            className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold"
          >
            {t('anayasa.contribute_btn', 'Katkıda Bulun')}
          </Button>
        </motion.div>
        
        <footer className="mt-12 text-center text-gray-400 text-sm">
          &copy; 2025 Simay Hareketi — {t('anayasa.footer', 'Halkın yeni toplum sözleşmesi')}
        </footer>
      </motion.div>
    </div>
  );
}