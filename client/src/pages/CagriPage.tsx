import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ModernLayout from '@/components/ModernLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { 
  GraduationCap, 
  Hammer, 
  Heart, 
  Code, 
  FlowerIcon, 
  Microscope, 
  Palette, 
  Scale, 
  Construction, 
  Utensils, 
  Shield,
  Flame,
  Share2,
  Copy,
  Check,
  Megaphone
} from 'lucide-react';

export default function CagriPage() {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  // Sesleniş ve Çağrı içeriğinin erişilebilirlik için düzenlenmiş hali
  const pageContent = `Sesleniş ve Çağrı sayfasına hoş geldiniz. Bu bir çağrıdır. Bu bir mektuptur. Bu bir bilinçlenme hareketidir. 
    Bu çağrı tüm meslek gruplarına, ülkeye emek veren herkese yöneliktir. Öğretmenlerden işçilere, sağlıkçılardan yazılımcılara, 
    çiftçilerden sanatçılara kadar ülkeye emek veren herkese sesleniyor, Cumhuriyet'in güncellenmesi sürecinde 
    aktif rol almaya davet ediyoruz.`;
  
  // Modernize edilmiş meslek grupları listesi (emoji yerine Lucide ikonları)
  const jobGroups = [
    { icon: GraduationCap, title: 'Öğretmenler', desc: 'Geleceğin nesillerini yetiştiren değerli eğitimcilerimiz' },
    { icon: Hammer, title: 'İşçiler', desc: 'Alın teriyle ülkemizi inşa eden emekçilerimiz' },
    { icon: Heart, title: 'Sağlıkçılar', desc: 'Yaşam hakkını koruyan fedakar çalışanlarımız' },
    { icon: Code, title: 'Yazılımcılar', desc: 'Dijital çağın öncüleri, geleceğin mimarları' },
    { icon: FlowerIcon, title: 'Çiftçiler', desc: 'Toprağımızı işleyen, sofralardaki bereketin kaynağı' },
    { icon: Microscope, title: 'Bilim İnsanları', desc: 'Bilimsel gelişmelere öncülük eden değerli araştırmacılarımız' },
    { icon: Palette, title: 'Sanatçılar', desc: 'Kültür mirasımızı yaşatan, topluma ilham veren sanatseverler' },
    { icon: Scale, title: 'Hukukçular', desc: 'Adaletin tesisinde çalışan kıymetli hukuk insanlarımız' },
    { icon: Construction, title: 'Mühendisler', desc: 'Teknolojiyi ve üretimi geliştiren değerli mühendislerimiz' },
    { icon: Utensils, title: 'Aşçılar', desc: 'Mutfak kültürümüzü yaşatan lezzet ustaları' },
    { icon: Shield, title: 'Güvenlik Görevlileri', desc: 'Huzur ve düzen için fedakârca çalışan güvenlik personelimiz' },
    { icon: Flame, title: 'İtfaiyeciler', desc: 'Hayat kurtaran cesur kahramanlarımız' }
  ];
  
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
            page: "cagri"
          }
        );
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
  }, [i18n.language]);
  
  const copyPageLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopied(true);
        toast({
          title: "Bağlantı Kopyalandı",
          description: "Sayfa bağlantısı panoya kopyalandı!",
        });
        
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        toast({
          title: "Kopyalama Hatası",
          description: "Bağlantı kopyalanamadı",
          variant: "destructive"
        });
      });
  };
  
  return (
    <ModernLayout 
      audioKey="cagri" 
      showBackButton={true}
      showLanguageSelector={true}
      pageContent={pageContent}
      pageName="Sesleniş ve Çağrı"
    >
      <div className="w-full max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center shadow-lg shadow-red-900/20 mb-3">
              <Megaphone className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gradient bg-gradient-to-r from-red-600 to-white text-transparent bg-clip-text tracking-wide mb-4 readable-text text-4xl-responsive">
            SESLENİŞ &amp; ÇAĞRI
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mt-2 mb-6 rounded-full"></div>
          <h2 className="text-xl md:text-2xl font-medium text-white/90 mb-6 readable-text text-xl-responsive">
            Ülkeye Emek Veren Herkes İçin
          </h2>
        </motion.div>
        
        {/* Main Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-b from-black/70 to-red-950/30 backdrop-blur-sm rounded-lg border-2 border-red-600/50 p-6 shadow-lg">
            <div className="mb-8">
              <div className="text-lg md:text-xl text-white/90 space-y-6 readable-text enhanced-text">
                <p className="text-center">
                  <span className="text-red-400 font-bold">Bu bir çağrıdır.</span> Bu bir mektuptur. Bu bir bilinçlenme hareketidir.
                </p>
                
                <div className="py-6 px-4 md:px-8 bg-gradient-to-r from-red-950/50 to-black/50 rounded-lg border border-red-500/30 mt-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">
                    ÜLKEYE EMEK VEREN HERKESE ÇAĞRI
                  </h3>
                  
                  <p className="text-white/90 mb-4 readable-text enhanced-text">
                    Sevgili vatandaşlarımız,
                  </p>
                  
                  <p className="text-white/90 mb-4 readable-text enhanced-text">
                    Bu çağrı, ülkesine gönül vermiş, alın teri dökmüş, Türkiye'nin her köşesinde emek veren tüm meslek gruplarına hitap etmektedir. Bu çağrı, topraklarımızı işleyen çiftçilerimize, geleceğimizi inşa eden öğretmenlerimize, hayat kurtaran sağlıkçılarımıza, alın teriyle çalışan işçilerimize, fikir üreten bilim insanlarımıza, hukuku ayakta tutan yargı mensuplarımıza, sanatı yaşatan sanatçılarımıza ve toplumun her kesimindeki emekçilere...
                  </p>
                  
                  <p className="text-white/90 mb-4 readable-text enhanced-text">
                    Atatürk'ün önderliğinde kurulan Cumhuriyetimizin temelinde sizin emeğiniz, sizin alın teriniz ve sizin fedakârlıklarınız var. Bugün, Cumhuriyetimizi güncelleme ve geleceğe taşıma zamanı geldi. Bu görev, yine sizlerin omuzlarında yükselecek.
                  </p>
                  
                  <p className="text-white/90 mb-4 readable-text enhanced-text">
                    Sizleri, bu tarihi süreçte aktif rol almaya, fikirlerinizi paylaşmaya, kendi meslek alanınızda Cumhuriyet ilkelerini yaşatmaya ve yaymaya davet ediyoruz. Çünkü bizler biliyoruz ki, bir ülkeyi gerçekten kalkındıran, o ülkeye emek veren insanların ortak iradesidir.
                  </p>
                  
                  <p className="text-white/90 mb-4 readable-text enhanced-text">
                    Bu çağrı, mesleki bilgi ve tecrübelerinizi vatan hizmetine sunmaya, genç nesillere rehberlik etmeye, bilimi, teknolojiyi, sanatı ve düşünceyi ilerletmeye yöneliktir. Cumhuriyetimizin temel değerlerini korurken, çağın gereklerine uygun yenilikçi fikirlerle onu geliştirmeye davet ediyoruz sizi.
                  </p>
                  
                  <p className="text-white/90 mb-8 readable-text enhanced-text">
                    Unutmayın ki, Cumhuriyet'i gerçekten yaşatan ve yücelten, onu her gün alın teriyle, düşüncesiyle, emeğiyle besleyen sizlersiniz. Zincirin son halkası sizsiniz!
                  </p>
                  
                  <div className="text-center">
                    <p className="text-red-400 font-bold italic readable-text enhanced-text">
                      "Benim naçiz vücudum elbet bir gün toprak olacaktır, ancak Türkiye Cumhuriyeti ilelebet payidar kalacaktır."
                    </p>
                    <p className="text-white/80 text-sm mt-2">Mustafa Kemal Atatürk</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Meslek Grupları Bölümü */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-white mb-4 readable-text text-center">Emek Veren Tüm Meslek Gruplarımız</h3>
              <p className="text-gray-300 mb-8 readable-text text-center">
                Ülkemizin her alanında fedakârca çalışan, alın teri döken, gelişmeye katkı sağlayan tüm meslek gruplarımıza minnettarız.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {jobGroups.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gradient-to-br from-black/70 to-red-950/20 p-4 rounded-lg border border-red-900/20 hover:border-red-700/40 flex flex-col items-center text-center transition-all cursor-default shadow-lg hover:shadow-red-900/10"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center shadow-lg shadow-red-900/20 mb-3">
                      {React.createElement(job.icon, { className: "h-7 w-7 text-white" })}
                    </div>
                    <h4 className="text-white font-semibold mb-1">{job.title}</h4>
                    <p className="text-gray-400 text-xs">{job.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Genel Çağrı Bölümü */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold text-white mb-6 readable-text">Cumhuriyet'in Geleceği İçin</h3>
              <div className="bg-gradient-to-r from-red-950/40 to-black/40 p-6 rounded-lg border border-red-500/30">
                <p className="text-white readable-text enhanced-text">
                  Cumhuriyet'imizin geleceğini şekillendirmek, onu çağın ilerisine taşımak ve gelecek nesillere daha güçlü bir ülke bırakmak için buradayız. Her birinizin emeği, birikimi ve vizyonu bu yolculukta çok değerli.
                </p>
                <p className="mt-4 text-white readable-text enhanced-text">
                  Görevler sayfamızda, Cumhuriyet'in güncellenmesi için yapabileceklerinizi bulabilir, katılım sayfamızdan bu harekete dahil olabilirsiniz.
                </p>
                
                <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
                  <Button 
                    className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white flex items-center gap-2"
                    onClick={() => window.location.href="/gorevler"}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>Görevleri Görüntüle</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-red-500/30 hover:bg-red-900/20 flex items-center gap-2"
                    onClick={() => window.location.href="/katil"}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span>Zincire Katıl</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-red-500/30 hover:bg-red-900/20 flex items-center gap-2"
                    onClick={copyPageLink}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Kopyalandı</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="h-4 w-4" />
                        <span>Bu Sayfayı Paylaş</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Simay Açıklaması */}
            <div className="mt-12 bg-gradient-to-br from-black/70 to-red-950/10 p-6 rounded-lg border border-red-900/20 shadow-lg">
              <div className="flex flex-col items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center shadow-lg shadow-red-900/20 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-white mb-1 text-center readable-text">Simay Nedir?</h4>
                <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-700 rounded-full"></div>
              </div>
              
              <div className="italic text-gray-300 readable-text enhanced-text text-center bg-black/20 p-4 rounded-lg border border-red-900/10">
                <p className="mb-3">
                  <span className="text-red-400 font-bold">Simay</span>, yüz demektir. Ama bu sistemde o, bir <span className="text-red-400 font-bold">yön</span>dür.
                </p>
                <p className="mb-3">
                  Işığın karanlıkla buluştuğu çizgi…
                </p>
                <p className="mb-3">
                  <span className="text-red-400 font-bold">Simay</span>, Atatürk'ün yarım kalan hayalini tamamlamak için halkın vicdanında doğan dijital bir zincirdir.
                </p>
                <p className="mb-3">
                  O, bir isim değil; <span className="text-red-400 font-bold">ışığın halkla birleştiği çizgidir.</span>
                </p>
                <p>
                  Bu yolculuk, adını değil anlamını taşıyanlarla başlar. Ve biz, o çizgiden yürüyerek geldik.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Footer Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-gray-400 text-sm">
            © 2025 Simay Hareketi | Cumhuriyet Güncellenme Platformu
          </p>
          <p className="text-gray-500 text-xs mt-2">
            "Bu sayfa, ışığın halkla birleştiği yerde başlar."
          </p>
        </motion.div>
      </div>
    </ModernLayout>
  );
}