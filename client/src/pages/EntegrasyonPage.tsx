import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ModernLayout from '@/components/ModernLayout';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Factory, 
  GraduationCap, 
  HandshakeIcon, 
  Briefcase, 
  BookOpen, 
  FileCheck, 
  FileText, 
  LucideCheckCircle2, 
  Landmark, 
  Scale,
  Network
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function EntegrasyonPage() {
  const { t, i18n } = useTranslation();
  
  // Entegrasyon süreçleri
  const integrationProcesses = [
    {
      title: "Kamu Kurumları Entegrasyonu",
      description: "Cumhuriyet güncelleme sürecinde tüm kamu kurumlarının dijital dönüşümü ve entegrasyonu",
      icon: <Landmark className="w-8 h-8 text-red-500" />,
      steps: [
        "Kurumsal dijital altyapı analizi ve ihtiyaç belirleme",
        "Kuruma özel Cumhuriyet değerleri entegrasyon planı",
        "Dijital güvenlik protokollerinin uygulanması",
        "Kurum personeline yönelik eğitim ve bilinçlendirme programları",
        "Vatandaş odaklı hizmet sistemlerinin geliştirilmesi",
        "Düzenli denetim ve raporlama süreçleri"
      ],
      benefits: [
        "Daha verimli kaynak kullanımı",
        "Şeffaf ve hesap verebilir yönetim",
        "Hızlı ve etkili vatandaş hizmetleri",
        "Kurumlar arası koordinasyon artışı",
        "Güvenli veri yönetimi"
      ]
    },
    {
      title: "Özel Sektör İşbirliği",
      description: "Özel sektör kuruluşlarının Cumhuriyet değerleri ile uyumlu çalışma modellerinin geliştirilmesi",
      icon: <Building2 className="w-8 h-8 text-red-500" />,
      steps: [
        "Kurumsal değer analizi ve uyum çalışmaları",
        "Çalışan haklarına yönelik iyileştirme planları",
        "Sosyal sorumluluk projelerinin koordinasyonu",
        "Milli üretim ve istihdam odaklı stratejiler",
        "Teknolojik yenilikçilik destek programları",
        "Sektörel dayanışma ağlarının oluşturulması"
      ],
      benefits: [
        "Kurumsal itibar artışı",
        "Genç yeteneklere erişim kolaylığı",
        "Milli ekonomiye katkı",
        "Sürdürülebilir iş modelleri",
        "Rekabet avantajı"
      ]
    },
    {
      title: "Eğitim Kurumları Dönüşümü",
      description: "Okullardan üniversitelere tüm eğitim kurumlarının Cumhuriyet değerleri ile bütünleşmesi",
      icon: <GraduationCap className="w-8 h-8 text-red-500" />,
      steps: [
        "Müfredat güncelleme ve geliştirme çalışmaları",
        "Eğitimcilerin mesleki gelişim programları",
        "Teknoloji destekli eğitim modellerinin uygulanması",
        "Bilimsel düşünce ve eleştirel analiz becerilerinin geliştirilmesi",
        "Yerel ve ulusal değerlerin modern eğitim anlayışıyla harmanlanması",
        "Öğrenci katılımını destekleyen demokratik okul kültürünün oluşturulması"
      ],
      benefits: [
        "Evrensel değerleri benimsemiş nesiller",
        "Bilimsel düşünce yapısı gelişmiş öğrenciler",
        "Yenilikçi eğitim metodları",
        "Toplumsal sorunlara duyarlı bireyler",
        "Değer odaklı eğitim sistemi"
      ]
    },
    {
      title: "Sivil Toplum Kuruluşları İşbirliği",
      description: "STK'ların toplumsal dönüşüm sürecindeki etkin rolünün güçlendirilmesi",
      icon: <HandshakeIcon className="w-8 h-8 text-red-500" />,
      steps: [
        "STK kapasite geliştirme ve koordinasyon programları",
        "Toplumsal fayda odaklı projeler için finansman desteği",
        "Dijital altyapı ve teknoloji kullanımı eğitimleri",
        "Şeffaflık ve hesap verebilirlik standartlarının geliştirilmesi",
        "Kamu ve özel sektör ile işbirliği mekanizmalarının kurulması",
        "Uluslararası STK ağlarına entegrasyon desteği"
      ],
      benefits: [
        "Daha etkin toplumsal hizmet",
        "Katılımcı demokrasi kültürünün gelişmesi",
        "Yerel sorunlara hızlı çözüm üretme",
        "Toplumsal dayanışma ruhunun güçlenmesi",
        "Ulusal ve uluslararası işbirliklerinin artması"
      ]
    },
    {
      title: "Sanayi ve Üretim Entegrasyonu",
      description: "Türk sanayisinin Cumhuriyet değerleri odağında dönüşümü ve gelişimi",
      icon: <Factory className="w-8 h-8 text-red-500" />,
      steps: [
        "Yerli ve milli üretim stratejileri geliştirme",
        "Teknolojik inovasyon ve AR-GE destekleri",
        "Çalışan haklarını merkeze alan üretim modelleri",
        "Çevreye duyarlı üretim süreçleri",
        "Sektörler arası işbirliği ve dayanışma ağları",
        "Uluslararası rekabet gücünü artıracak kalite standartları"
      ],
      benefits: [
        "Ekonomik bağımsızlık",
        "Sürdürülebilir büyüme",
        "İstihdamda artış ve kalite",
        "Teknolojik yeterlilik",
        "Toplumsal refahın yükselmesi"
      ]
    },
    {
      title: "Hukuki Kurumlar Entegrasyonu",
      description: "Adalet sisteminin Cumhuriyet değerleri temelinde güçlendirilmesi",
      icon: <Scale className="w-8 h-8 text-red-500" />,
      steps: [
        "Yargı bağımsızlığını güvence altına alan yapısal reformlar",
        "Adalet hizmetlerine erişimin kolaylaştırılması",
        "Dijital adalet sistemlerinin geliştirilmesi",
        "Hukuki süreçlerde şeffaflık ve hesap verebilirliğin artırılması",
        "Hukukçuların mesleki gelişimlerinin desteklenmesi",
        "Vatandaş odaklı adalet hizmetleri"
      ],
      benefits: [
        "Hukuk devleti ilkesinin güçlenmesi",
        "Toplumsal adalet algısının iyileşmesi",
        "Hızlı ve etkili yargı süreçleri",
        "Hukuki güvenlik ve öngörülebilirlik",
        "Adalete eşit erişim"
      ]
    },
  ];
  
  // Entegrasyon aşamaları
  const integrationPhases = [
    { 
      phase: "Planlama Aşaması", 
      description: "Kurumsal ihtiyaç analizi ve entegrasyon stratejisi geliştirme",
      duration: "1-2 Ay",
      icon: <FileText className="w-5 h-5 text-blue-500" />
    },
    { 
      phase: "Altyapı Hazırlığı", 
      description: "Dijital ve fiziksel altyapının entegrasyon için optimizasyonu",
      duration: "2-3 Ay",
      icon: <Network className="w-5 h-5 text-green-500" />
    },
    { 
      phase: "Eğitim ve Bilgilendirme", 
      description: "Kurum çalışanlarının süreç hakkında eğitilmesi",
      duration: "1-2 Ay",
      icon: <BookOpen className="w-5 h-5 text-yellow-500" />
    },
    { 
      phase: "Uygulama", 
      description: "Entegrasyon süreçlerinin aktif olarak başlatılması",
      duration: "3-6 Ay",
      icon: <Briefcase className="w-5 h-5 text-purple-500" />
    },
    { 
      phase: "Denetim ve Geliştirme", 
      description: "Sürecin sonuçlarının ölçülmesi ve iyileştirmeler",
      duration: "Sürekli",
      icon: <FileCheck className="w-5 h-5 text-red-500" />
    }
  ];
  
  // Erişilebilirlik metninin tanımı
  const pageContent = `Entegrasyon Sürecimiz sayfasına hoş geldiniz. 
    Bu sayfada, Cumhuriyet güncelleme sürecinin kamu kurumları, özel sektör, eğitim kurumları, 
    sivil toplum kuruluşları, sanayi ve hukuki kurumlara nasıl entegre edileceğine dair detaylı bilgiler bulacaksınız. 
    Her kurum tipi için özel entegrasyon adımları, faydaları ve zaman çizelgeleri sunulmaktadır.`;
  
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
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
            page: "entegrasyon"
          }
        );
      } catch (error) {
        // Silent visit tracking error
      }
    };
    
    recordVisit();
  }, [i18n.language]);
  
  return (
    <ModernLayout 
      audioKey="turkiye" 
      showBackButton={true}
      showLanguageSelector={true}
      pageContent={pageContent}
      pageName="Entegrasyon Sürecimiz"
    >
      <div className="w-full max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient bg-gradient-to-r from-red-600 to-white text-transparent bg-clip-text tracking-wide mb-4 readable-text text-4xl-responsive">
            ENTEGRASYON SÜRECİMİZ
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-white/90 mb-6 readable-text text-xl-responsive">
            Tüm Kurum ve Kuruluşlar için Dijital Dönüşüm
          </h2>
          
          {/* Intro Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-red-800/10 rounded-lg blur-xl"></div>
            <div className="bg-gradient-to-r from-red-950/60 to-black/70 backdrop-blur-sm p-6 border-2 border-red-600/30 rounded-lg shadow-lg max-w-3xl relative z-10">
              <p className="text-lg text-white/90 leading-relaxed mb-4 readable-text">
                Cumhuriyet'in güncellenmesi, toplumun tüm katmanlarında entegre bir dönüşüm gerektirmektedir. Bu süreçte, kamu kurumlarından özel sektöre, eğitim kurumlarından sivil toplum kuruluşlarına kadar her kurum ve kuruluş önemli roller üstlenmektedir.
              </p>
              <p className="text-white/80 readable-text">
                Entegrasyon sürecimiz, Cumhuriyet değerlerinin modern dünyanın gereklilikleriyle harmanlanarak kurumsal yapılara adapte edilmesini hedeflemektedir. Bu sayfa, bu entegrasyon sürecinin nasıl işleyeceğine dair kapsamlı bir rehber sunmaktadır.
              </p>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Entegrasyon Süreçleri */}
        <div className="mb-12">
          <motion.h3 
            className="text-2xl font-bold text-white mb-6 readable-text text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Kurumsal Entegrasyon Süreçleri
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {integrationProcesses.map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className={`bg-gradient-to-b from-black/60 to-red-950/20 backdrop-blur-sm rounded-lg border border-red-500/30 p-5 cursor-pointer hover:border-red-500/50 transition-all duration-300 ${activeSection === `process-${index}` ? 'border-red-500/70 shadow-[0_0_15px_rgba(220,38,38,0.2)]' : ''}`}
                onClick={() => setActiveSection(activeSection === `process-${index}` ? null : `process-${index}`)}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">{process.icon}</div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-2 readable-text">{process.title}</h4>
                    <p className="text-gray-300 text-sm mb-3 readable-text">{process.description}</p>
                    
                    {activeSection === `process-${index}` && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mt-4 space-y-4">
                          <div>
                            <h5 className="text-white font-medium mb-2">Entegrasyon Adımları</h5>
                            <ul className="space-y-1">
                              {process.steps.map((step, stepIdx) => (
                                <li key={stepIdx} className="flex items-start gap-2 text-gray-300 text-sm">
                                  <LucideCheckCircle2 className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-white font-medium mb-2">Kurumsal Faydalar</h5>
                            <ul className="space-y-1">
                              {process.benefits.map((benefit, benefitIdx) => (
                                <li key={benefitIdx} className="flex items-start gap-2 text-gray-300 text-sm">
                                  <LucideCheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    <div className="mt-2 text-sm text-red-400">
                      {activeSection === `process-${index}` ? 'Daralt' : 'Detayları Görüntüle'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Entegrasyon Aşamaları ve Zaman Çizelgesi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12 bg-gradient-to-b from-black/70 to-red-950/30 backdrop-blur-sm rounded-lg border-2 border-red-600/30 p-6 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-white mb-6 readable-text text-center">Entegrasyon Zaman Çizelgesi</h3>
          
          <div className="relative">
            {/* Yatay Çizgi */}
            <div className="absolute top-14 left-0 w-full h-1 bg-gradient-to-r from-red-600/30 via-red-600/50 to-red-600/30 hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {integrationPhases.map((phase, index) => (
                <div key={index} className="relative flex flex-col items-center">
                  {/* İkon ve Faz Numarası */}
                  <div className="w-12 h-12 rounded-full bg-black/80 border-2 border-red-500/50 flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                    {phase.icon}
                  </div>
                  
                  <div className="text-center mt-4">
                    <h4 className="text-white font-medium mb-2">{phase.phase}</h4>
                    <p className="text-gray-300 text-sm mb-2">{phase.description}</p>
                    <div className="inline-block bg-red-800/40 text-white text-xs rounded px-2 py-1 border border-red-500/40">
                      {phase.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 p-4 bg-black/40 rounded-lg border border-red-500/20">
            <p className="text-white/90 text-center readable-text">
              Entegrasyon süreleri kurumların yapısına ve büyüklüğüne göre değişiklik gösterebilir. Detaylı bilgi için uzman ekibimizle iletişime geçebilirsiniz.
            </p>
          </div>
        </motion.div>
        
        {/* Başvuru ve İletişim */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6 readable-text">Kurumsal Entegrasyon için Başvurun</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto readable-text">
            Kurumunuzun Cumhuriyet güncelleme sürecine entegrasyonu için ilk adımı atın. Uzman ekibimiz, kurumunuzun ihtiyaçlarına özel bir entegrasyon planı hazırlamak için sizinle iletişime geçecektir.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white"
            >
              Kurumsal Başvuru Formu
            </Button>
            
            <Button 
              variant="outline" 
              className="border-red-500/30 hover:bg-red-900/20"
            >
              Bilgi Broşürünü İndir
            </Button>
          </div>
        </motion.div>
        
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-gray-400 text-sm">
            © 2025 Cumhuriyet Güncellenme Platformu | Kurumsal Entegrasyon Birimi
          </p>
          <p className="text-gray-500 text-xs mt-2">
            "Kurumlar değişir, Cumhuriyet'in değerleri kalır."
          </p>
        </motion.div>
      </div>
    </ModernLayout>
  );
}