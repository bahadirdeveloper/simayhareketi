import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import ModernLayout from "@/components/ModernLayout";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";

// Basitleştirilmiş Bileşen Tanımları
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-500 mb-6 mt-10 border-b border-red-900/20 pb-2">
    {children}
  </h2>
);

const ParagraphText = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg md:text-xl text-white/90 mb-6">
    {children}
  </p>
);

const HighlightText = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-red-900/20 p-4 border-l-4 border-red-600 rounded my-8">
    <p className="text-xl md:text-2xl font-bold text-white">
      {children}
    </p>
  </div>
);

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="mb-3 flex items-start">
    <span className="inline-block mr-2 mt-1 text-red-500">•</span>
    <span className="text-white/90">{children}</span>
  </li>
);

export default function TurkNedirDetayPage() {
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
        {/* Header - Simplified */}
        <div className="relative rounded-xl overflow-hidden mb-10">
          <div className="absolute inset-0 bg-black/40 z-0"></div>
          
          <div className="relative z-10 py-14 px-6 sm:px-10 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-red-500 pb-2">
              TÜRK NEDİR?
            </h1>
            <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6"></div>
            <p className="text-2xl font-bold text-white mt-4">
              "Size söz... Bu medeniyet arşa yükselecek."
            </p>
          </div>
        </div>
        
        {/* Main Content - Simplified */}
        <div className="bg-black rounded-xl p-8 sm:p-10 border border-red-900/10 max-w-5xl mx-auto mb-12">
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
            Dijital çağda, teknoloji, kuantum bilişim ve uzay teknolojilerinde öncü olmak, yeni nesil Türk gençliğinin hedefleri arasındadır. Geçmişin mirasını geleceğin teknolojileriyle harmanlayan Türk bilim insanları, insanlığın ilerleyişine katkıda bulunmak için çalışır.
          </ParagraphText>
          
          <HighlightText>
            Bilinci, ruhu ve teknolojisiyle birleşen Türk, insanlığın kurtuluşu olacaktır.
          </HighlightText>
          
          <SectionTitle>5. Halka Söz</SectionTitle>
          <ParagraphText>
            <strong>"Ve bunu nasıl yapacağımızı adım adım gösterdik...<br/>
            Tüm siyasilerden bir yana, bu işe <span className="text-red-500">CAN</span> veriyoruz."</strong>
          </ParagraphText>
          <ParagraphText>
            Bu bir parti değil, bu bir halk sistemidir. Her birey bir tuğla, her fikir bir anahtardır. Sen de bu yapının bir parçası ol!
          </ParagraphText>
          <ParagraphText>
            Türklük bilincini taşıyan herkes, geleceğin medeniyetinin inşasında sorumluluk almalıdır. Bu sorumluluk, sadece kendin için değil, tüm insanlık için çalışmayı gerektirir.
          </ParagraphText>
        </div>
          
        {/* Quote Section - Simplified */}
        <div className="bg-black rounded-xl border border-red-900/20 p-6 sm:p-8 max-w-4xl mx-auto mb-12">
          <blockquote className="border-l-4 border-red-500 pl-4 my-6">
            <p className="text-xl sm:text-2xl italic text-white/90">
              "Ne mutlu Türküm diyene!"
            </p>
            <footer className="text-right text-white/70 mt-2">
              — Mustafa Kemal Atatürk
            </footer>
          </blockquote>
        </div>
        
        {/* Navigation Buttons - Simplified */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10 mb-16">
          <Button 
            onClick={() => navigate("/turknedir")}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ◀ Türk Nedir Sayfasına Dön
          </Button>
          
          <Button 
            onClick={() => navigate("/turkiye")}
            className="px-6 py-3 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Türkiye Sayfasına Dön
          </Button>
        </div>
      </div>
    </ModernLayout>
  );
}