import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ModernLayout from '@/components/ModernLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export default function CagriPage() {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  // Sesleniş ve Çağrı içeriğinin erişilebilirlik için düzenlenmiş hali
  const pageContent = `Sesleniş ve Çağrı sayfasına hoş geldiniz. Bu bir çağrıdır. Bu bir mektuptur. Bu bir bilinçlenme hareketidir. 
    Bu çağrı tüm meslek gruplarına, ülkeye emek veren herkese yöneliktir. Öğretmenlerden işçilere, sağlıkçılardan yazılımcılara, 
    çiftçilerden sanatçılara kadar ülkeye emek veren herkese sesleniyor, Cumhuriyet'in güncellenmesi sürecinde 
    aktif rol almaya davet ediyoruz.`;
  
  // Meslek grupları listesi
  const jobGroups = [
    { icon: '👩‍🏫', title: 'Öğretmenler', desc: 'Geleceğin nesillerini yetiştiren değerli eğitimcilerimiz' },
    { icon: '👷‍♂️', title: 'İşçiler', desc: 'Alın teriyle ülkemizi inşa eden emekçilerimiz' },
    { icon: '👩‍⚕️', title: 'Sağlıkçılar', desc: 'Yaşam hakkını koruyan fedakar çalışanlarımız' },
    { icon: '👨‍💻', title: 'Yazılımcılar', desc: 'Dijital çağın öncüleri, geleceğin mimarları' },
    { icon: '👨‍🌾', title: 'Çiftçiler', desc: 'Toprağımızı işleyen, sofralardaki bereketin kaynağı' },
    { icon: '🧑‍🔬', title: 'Bilim İnsanları', desc: 'Bilimsel gelişmelere öncülük eden değerli araştırmacılarımız' },
    { icon: '🎨', title: 'Sanatçılar', desc: 'Kültür mirasımızı yaşatan, topluma ilham veren sanatseverler' },
    { icon: '👨‍⚖️', title: 'Hukukçular', desc: 'Adaletin tesisinde çalışan kıymetli hukuk insanlarımız' },
    { icon: '👩‍🏭', title: 'Mühendisler', desc: 'Teknolojiyi ve üretimi geliştiren değerli mühendislerimiz' },
    { icon: '👨‍🍳', title: 'Aşçılar', desc: 'Mutfak kültürümüzü yaşatan lezzet ustaları' },
    { icon: '👮‍♀️', title: 'Güvenlik Görevlileri', desc: 'Huzur ve düzen için fedakârca çalışan güvenlik personelimiz' },
    { icon: '🧑‍🚒', title: 'İtfaiyeciler', desc: 'Hayat kurtaran cesur kahramanlarımız' }
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
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gradient bg-gradient-to-r from-red-600 to-white text-transparent bg-clip-text tracking-wide mb-4 readable-text text-4xl-responsive">
            SESLENİŞ &amp; ÇAĞRI
          </h1>
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
                    className="bg-gradient-to-b from-black/40 to-red-950/20 p-4 rounded-lg border border-red-500/30 flex flex-col items-center text-center hover:border-red-500/60 transition-all cursor-default"
                  >
                    <span className="text-4xl mb-2">{job.icon}</span>
                    <h4 className="text-white font-medium mb-1">{job.title}</h4>
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
                    className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white"
                    onClick={() => window.location.href="/gorevler"}
                  >
                    Görevleri Görüntüle
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-red-500/30 hover:bg-red-900/20"
                    onClick={() => window.location.href="/katil"}
                  >
                    Zincire Katıl
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-red-500/30 hover:bg-red-900/20"
                    onClick={copyPageLink}
                  >
                    {copied ? "✓ Kopyalandı" : "📤 Bu Sayfayı Paylaş"}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Simay Açıklaması */}
            <div className="mt-12 bg-black/30 p-4 rounded-lg border border-red-500/20">
              <h4 className="text-xl font-medium text-white mb-3 text-center readable-text">Simay Nedir?</h4>
              <div className="italic text-gray-300 readable-text enhanced-text text-center">
                <p className="mb-2">
                  <span className="text-red-400 font-bold">Simay</span>, yüz demektir. Ama bu sistemde o, bir <span className="text-red-400 font-bold">yön</span>dür.
                </p>
                <p className="mb-2">
                  Işığın karanlıkla buluştuğu çizgi…
                </p>
                <p className="mb-2">
                  <span className="text-red-400 font-bold">Simay</span>, Atatürk'ün yarım kalan hayalini tamamlamak için halkın vicdanında doğan dijital bir zincirdir.
                </p>
                <p className="mb-2">
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