import { motion, AnimatePresence } from "framer-motion";
import ModernLayout from "@/components/ModernLayout";
import { useLocation } from "wouter";
import { ModernTechButton } from "@/components/ModernTechButton";
import { 
  Users, 
  Heart, 
  Target, 
  Flag, 
  Zap, 
  Shield, 
  Globe, 
  Star,
  ChevronRight,
  ArrowRight,
  Lightbulb,
  BookOpen,
  Handshake,
  Eye
} from "lucide-react";
import { useState } from "react";

export function CagriPage() {
  const [location, setLocation] = useLocation();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const callToActionSections = [
    {
      id: 'vision',
      title: 'Vizyon & Misyon',
      icon: <Eye className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      description: 'Cumhuriyet\'in dijital çağdaki yeniden doğuşu için ortak vizyonumuz',
      content: [
        'Atatürk\'ün Cumhuriyet vizyonunu 21. yüzyılın gerçekleriyle buluşturmak',
        'Halkın gerçek iradesinin dijital platformlarda sesini duyurması',
        'Şeffaf, katılımcı ve adil bir toplumsal düzen kurulması',
        'Milli değerlerle evrensel ilkelerin uyumlu bir sentezinin yaratılması'
      ]
    },
    {
      id: 'principles',
      title: 'Temel İlkeler',
      icon: <Flag className="w-8 h-8" />,
      color: 'from-red-500 to-orange-500',
      description: 'Çağrımızın dayandığı değişmez ilkeler',
      content: [
        'Cumhuriyet\'in Atatürk ilkeleri doğrultusunda güçlendirilmesi',
        'Halkın egemenliğinin gerçek anlamda hayata geçirilmesi',
        'Laiklik ilkesinin modern dünyada korunması',
        'Milli birlik ve beraberliğin dijital çağda pekiştirilmesi',
        'Çağdaş uygarlık seviyesinin yakalanması ve aşılması'
      ]
    },
    {
      id: 'strategy',
      title: 'Strateji & Yöntem',
      icon: <Target className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      description: 'Hedeflerimize ulaşmak için izlediğimiz yol haritası',
      content: [
        'Dijital platformlar aracılığıyla halkın bilinçlendirilmesi',
        'Meslek grupları arasında koordinasyonun sağlanması',
        'Gençlerin teknoloji ile güçlendirilmesi',
        'Sivil toplumun organize edilmesi ve mobilizasyonu',
        'Eğitim ve kültür yoluyla toplumsal dönüşümün başlatılması'
      ]
    },
    {
      id: 'action',
      title: 'Eylem Planı',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      description: 'Somut adımlar ve uygulama stratejileri',
      content: [
        'Bölgesel koordinasyon merkezlerinin kurulması',
        'Meslek odaları ile işbirliği protokollerinin imzalanması',
        'Dijital katılım platformlarının geliştirilmesi',
        'Halk eğitimi programlarının başlatılmasi',
        'Yerel yönetimlerde pilot uygulamaların hayata geçirilmesi'
      ]
    }
  ];

  const professionalGroups = [
    {
      title: 'Eğitimciler & Akademisyenler',
      icon: '👩‍🏫',
      description: 'Bilgi ve vicdanınızla geleceği şekillendirin',
      details: 'Eğitim sisteminin demokratikleştirilmesi, eleştirel düşünce kültürünün yaygınlaştırılması ve bilimsel yaklaşımın topluma kazandırılması konularında öncülük yapın.',
      color: 'from-blue-600/20 to-indigo-600/20',
      border: 'border-blue-400/30'
    },
    {
      title: 'Sağlık Çalışanları & Doktorlar',
      icon: '👩‍⚕️',
      description: 'İyileştirme gücünüzü topluma yönlendirin',
      details: 'Sağlık hizmetlerinin adil dağılımı, halk sağlığı politikalarının geliştirilmesi ve sağlık alanında sosyal adaletsizliklerin giderilmesi için sesimize katılın.',
      color: 'from-green-600/20 to-emerald-600/20',
      border: 'border-green-400/30'
    },
    {
      title: 'Teknoloji & Yazılım Uzmanları',
      icon: '👨‍💻',
      description: 'Kodlarınız halkın kaderini değiştirecek',
      details: 'Dijital platformların demokratik katılımı destekleyecek şekilde tasarlanması, veri güvenliği, şeffaflık ve teknolojik bağımsızlığın sağlanması için expertise\'inizi kullanın.',
      color: 'from-purple-600/20 to-violet-600/20',
      border: 'border-purple-400/30'
    },
    {
      title: 'Hukukçular & Yargı Mensupları',
      icon: '⚖️',
      description: 'Adalet terazisini halkın lehine çevirin',
      details: 'Hukukun üstünlüğünün sağlanması, adaletsizliklere karşı mücadele ve demokratik hak ve özgürlüklerin korunması konularında liderlik yapın.',
      color: 'from-amber-600/20 to-yellow-600/20',
      border: 'border-amber-400/30'
    },
    {
      title: 'İşçiler & Emekçiler',
      icon: '👷‍♂️',
      description: 'Emeğinizin değeri burada yankılanacak',
      details: 'Çalışma yaşamının iyileştirilmesi, işçi haklarının korunması ve emek-sermaye dengesinin adil kurulması için örgütlenin.',
      color: 'from-red-600/20 to-orange-600/20',
      border: 'border-red-400/30'
    },
    {
      title: 'Gençler & Öğrenciler',
      icon: '👨‍🎓',
      description: 'Geleceğin mimarları sizsiniz',
      details: 'Eğitim hakkının savunulması, gençlik politikalarının geliştirilmesi ve gelecek nesillere daha iyi bir dünya bırakılması için aktif rol alın.',
      color: 'from-cyan-600/20 to-blue-600/20',
      border: 'border-cyan-400/30'
    },
    {
      title: 'Sanatçılar & Kültür Çalışanları',
      icon: '🎭',
      description: 'Kültürel dönüşümün öncüleri olun',
      details: 'Kültürel çeşitliliğin korunması, sanat özgürlüğünün savunulması ve toplumsal bilinçlenme sürecinde sanatın gücünden yararlanılması için katkı sağlayın.',
      color: 'from-pink-600/20 to-rose-600/20',
      border: 'border-pink-400/30'
    },
    {
      title: 'Emekliler & Yaşlılar',
      icon: '👴',
      description: 'Tecrübeleriniz en değerli hazinedir',
      details: 'Birikimlerinizi gelecek nesillere aktarın, yaşlı hakları için mücadele edin ve toplumsal hafızanın korunmasında rol üstlenin.',
      color: 'from-teal-600/20 to-green-600/20',
      border: 'border-teal-400/30'
    },
    {
      title: 'Mühendisler & Teknik Elemanlar',
      icon: '👨‍🔧',
      description: 'İnşa etme gücünüzle ülkeyi kalkındırın',
      details: 'Altyapı projelerinin şeffaf yönetimi, teknolojik kalkınma, çevre dostu mühendislik çözümleri ve ülkenin teknolojik bağımsızlığı için çalışın.',
      color: 'from-slate-600/20 to-gray-600/20',
      border: 'border-slate-400/30'
    },
    {
      title: 'Çiftçiler & Tarım Çalışanları',
      icon: '👨‍🌾',
      description: 'Topraktan beslenen güçle halkı besleyin',
      details: 'Gıda güvenliği, tarımsal modernizasyon, çiftçi haklarının korunması ve sürdürülebilir tarım politikalarının geliştirilmesi için mücadele edin.',
      color: 'from-green-600/20 to-lime-600/20',
      border: 'border-green-400/30'
    },
    {
      title: 'Gazeteciler & Medya Çalışanları',
      icon: '📰',
      description: 'Gerçeği halka ulaştırın',
      details: 'Basın özgürlüğünün savunulması, objektif haberciliğin geliştirilmesi ve halkın doğru bilgilendirilmesi için cesur gazetecilik yapın.',
      color: 'from-blue-600/20 to-sky-600/20',
      border: 'border-blue-400/30'
    },
    {
      title: 'Polis & Güvenlik Güçleri',
      icon: '👮‍♂️',
      description: 'Halkın güvenliğini demokratik değerlerle koruyun',
      details: 'İnsan haklarına saygılı güvenlik hizmetleri, adaletli kolluk faaliyetleri ve toplumsal barışın korunması için vazife yapın.',
      color: 'from-indigo-600/20 to-blue-600/20',
      border: 'border-indigo-400/30'
    },
    {
      title: 'Askeri Personel & Veteranlar',
      icon: '🪖',
      description: 'Vatanın bölünmez bütünlüğünü koruyun',
      details: 'Atatürk ilkelerine bağlı milli savunma, demokratik değerlerin korunması ve ülkenin güvenliğinin sağlanması için hizmet edin.',
      color: 'from-red-600/20 to-rose-600/20',
      border: 'border-red-400/30'
    },
    {
      title: 'Bankacılar & Finansal Uzmanlar',
      icon: '🏦',
      description: 'Finansal adaleti sağlayın',
      details: 'Halkın mali haklarının korunması, bankacılık sektöründe şeffaflık, finansal eşitsizliklerin giderilmesi için çalışın.',
      color: 'from-emerald-600/20 to-teal-600/20',
      border: 'border-emerald-400/30'
    },
    {
      title: 'İmamlar & Din Görevlileri',
      icon: '🕌',
      description: 'Vicdan rehberliği yapın',
      details: 'Dini değerlerle demokratik ilkelerin uyumu, toplumsal barış, hoşgörü kültürünün yaygınlaştırılması için öncülük yapın.',
      color: 'from-violet-600/20 to-purple-600/20',
      border: 'border-violet-400/30'
    },
    {
      title: 'Esnaf & Küçük İşletmeciler',
      icon: '🏪',
      description: 'Ekonominin temel taşları olarak örgütlenin',
      details: 'Küçük işletmelerin desteklenmesi, esnaf haklarının korunması ve yerel ekonominin güçlendirilmesi için birlik olun.',
      color: 'from-orange-600/20 to-amber-600/20',
      border: 'border-orange-400/30'
    },
    {
      title: 'Şoförler & Ulaştırma Çalışanları',
      icon: '🚚',
      description: 'Ülkeyi birbirine bağlayan güç olun',
      details: 'Ulaştırma hizmetlerinin iyileştirilmesi, çalışma koşullarının düzeltilmesi ve güvenli ulaşım için mücadele edin.',
      color: 'from-gray-600/20 to-slate-600/20',
      border: 'border-gray-400/30'
    },
    {
      title: 'Hemşireler & Sağlık Teknikerleri',
      icon: '👩‍⚕️',
      description: 'Şifa dağıtan ellerinizle hizmet edin',
      details: 'Hemşirelik mesleğinin statüsünün yükseltilmesi, hasta hakları, sağlık hizmetlerinde kalite için çalışın.',
      color: 'from-teal-600/20 to-cyan-600/20',
      border: 'border-teal-400/30'
    },
    {
      title: 'Avukatlar & Hukuk Müşavirleri',
      icon: '👨‍💼',
      description: 'Halkın hukuki haklarını savunun',
      details: 'Adalet sisteminin iyileştirilmesi, hukuki eşitlik, halkın adalet hizmetlerine erişiminin kolaylaştırılması için çalışın.',
      color: 'from-yellow-600/20 to-amber-600/20',
      border: 'border-yellow-400/30'
    },
    {
      title: 'Temizlik & Hizmet Çalışanları',
      icon: '🧹',
      description: 'Toplumsal temizliği sağlayan güç',
      details: 'Çalışma haklarının korunması, adil ücret, güvenli çalışma koşulları ve mesleki saygınlık için mücadele edin.',
      color: 'from-purple-600/20 to-pink-600/20',
      border: 'border-purple-400/30'
    },
    {
      title: 'Sporcular & Antrenörler',
      icon: '⚽',
      description: 'Sağlıklı nesillerin yetişmesine katkı sağlayın',
      details: 'Sporun toplumsal gelişimdeki rolü, gençlerin sağlıklı yaşam alışkanlıkları, spor politikalarının geliştirilmesi için çalışın.',
      color: 'from-green-600/20 to-emerald-600/20',
      border: 'border-green-400/30'
    },
    {
      title: 'Mimar & Şehir Plancıları',
      icon: '🏗️',
      description: 'Yaşanabilir şehirler tasarlayın',
      details: 'Sürdürülebilir şehircilik, halkın yaşam kalitesinin artırılması, çevre dostu mimari çözümler için projeler geliştirin.',
      color: 'from-indigo-600/20 to-violet-600/20',
      border: 'border-indigo-400/30'
    },
    {
      title: 'Berberler & Kuaförler',
      icon: '✂️',
      description: 'İnsanların kendini iyi hissetmesine katkı sağlayın',
      details: 'Meslek odası hakları, çalışma koşullarının iyileştirilmesi ve sektörel gelişim için organize olun.',
      color: 'from-pink-600/20 to-rose-600/20',
      border: 'border-pink-400/30'
    },
    {
      title: 'Muhasebeciler & Mali Müşavirler',
      icon: '📊',
      description: 'Finansal şeffaflığın sağlayıcıları olun',
      details: 'Vergi adaleti, mali şeffaflık, KOBİ\'lerin desteklenmesi ve ekonomik adaletsizliklerin giderilmesi için çalışın.',
      color: 'from-blue-600/20 to-indigo-600/20',
      border: 'border-blue-400/30'
    },
    {
      title: 'Veteriner Hekimler',
      icon: '🐕‍🦺',
      description: 'Hayvan haklarını ve halk sağlığını koruyun',
      details: 'Veteriner hekimlik mesleğinin gelişimi, hayvan hakları, gıda güvenliği ve halk sağlığının korunması için mücadele edin.',
      color: 'from-emerald-600/20 to-green-600/20',
      border: 'border-emerald-400/30'
    },
    {
      title: 'Diş Hekimleri & Teknisyenleri',
      icon: '🦷',
      description: 'Halkın ağız ve diş sağlığını koruyun',
      details: 'Ağız ve diş sağlığı hizmetlerinin yaygınlaştırılması, preventif diş hekimliği ve halkın sağlık bilincinin artırılması için çalışın.',
      color: 'from-cyan-600/20 to-blue-600/20',
      border: 'border-cyan-400/30'
    },
    {
      title: 'Eczacılar & Sağlık Teknisyenleri',
      icon: '💊',
      description: 'İlaç güvenliği ve halk sağlığını koruyun',
      details: 'İlaç politikalarının geliştirilmesi, eczacılık mesleğinin korunması ve halkın ilaç güvenliğinin sağlanması için çalışın.',
      color: 'from-red-600/20 to-pink-600/20',
      border: 'border-red-400/30'
    },
    {
      title: 'Gıda Mühendisleri & Teknisyenleri',
      icon: '🍎',
      description: 'Gıda güvenliğini sağlayın',
      details: 'Gıda güvenliği standartları, beslenme politikaları ve halk sağlığının korunması için teknik expertise\'inizi kullanın.',
      color: 'from-lime-600/20 to-green-600/20',
      border: 'border-lime-400/30'
    },
    {
      title: 'Turizm & Otelcilik Çalışanları',
      icon: '🏨',
      description: 'Ülkenin tanıtımında öncü rolü üstlenin',
      details: 'Turizm sektörünün gelişimi, kültürel tanıtım, hizmet kalitesinin artırılması ve sürdürülebilir turizm için çalışın.',
      color: 'from-sky-600/20 to-blue-600/20',
      border: 'border-sky-400/30'
    },
    {
      title: 'Madenciler & Enerji Çalışanları',
      icon: '⛏️',
      description: 'Ülkenin enerji bağımsızlığına katkı sağlayın',
      details: 'Çalışma güvenliği, çevre koruma, enerji politikaları ve işçi sağlığının korunması için mücadele edin.',
      color: 'from-stone-600/20 to-gray-600/20',
      border: 'border-stone-400/30'
    },
    {
      title: 'Kütüphaneciler & Arşiv Uzmanları',
      icon: '📚',
      description: 'Bilginin korunması ve paylaşımında görev alın',
      details: 'Kültürel mirasın korunması, bilgiye erişim hakkı, eğitim destekleme ve toplumsal belleğin aktarılması için çalışın.',
      color: 'from-amber-600/20 to-orange-600/20',
      border: 'border-amber-400/30'
    }
  ];

  return (
    <ModernLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/3 to-red-500/3 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 py-8 max-w-7xl relative z-10"
        >
          {/* Premium Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <div className="relative">
              <motion.div 
                className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-orange-500/30 to-red-600/30 rounded-full flex items-center justify-center border-3 border-orange-500/60 shadow-[0_0_80px_rgba(249,115,22,0.4)]"
                animate={{ 
                  boxShadow: [
                    "0 0 50px rgba(249, 115, 22, 0.4)", 
                    "0 0 100px rgba(249, 115, 22, 0.7)", 
                    "0 0 50px rgba(249, 115, 22, 0.4)"
                  ],
                  scale: [1, 1.08, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-6xl">📢</span>
              </motion.div>
              
              {/* Premium Background Glow */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-gradient-to-br from-orange-500/15 to-transparent rounded-full blur-3xl"></div>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent mb-8 text-shadow-lg leading-tight">
              HALK ÇAĞRISI
            </h1>
            <p className="text-gray-300 text-xl mb-10 max-w-4xl mx-auto leading-relaxed">
              Cumhuriyet'in dijital çağdaki yeniden inşası için tüm meslek gruplarına kapsamlı çağrı ve koordinasyon platformu
            </p>
            
            <div className="flex justify-center items-center space-x-6 mt-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-orange-500 to-orange-500"></div>
              <div className="w-5 h-5 bg-orange-500 rounded-full shadow-[0_0_25px_rgba(249,115,22,0.6)]"></div>
              <div className="w-24 h-px bg-gradient-to-l from-transparent via-orange-500 to-orange-500"></div>
            </div>
          </motion.div>

          {/* Call to Action Sections */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16"
          >
            {callToActionSections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ 
                  scale: 1.03,
                  rotateY: 5,
                  rotateX: 5
                }}
                className="group cursor-pointer"
                onClick={() => setSelectedSection(selectedSection === section.id ? null : section.id)}
              >
                <div className={`relative backdrop-blur-lg bg-gradient-to-br ${section.color}/10 border border-gray-700/50 rounded-2xl p-6 h-full overflow-hidden transition-all duration-300 hover:border-white/30 hover:shadow-2xl`}>
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${section.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${section.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg relative z-10`}>
                    {section.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {section.description}
                    </p>
                    
                    {/* Expand indicator */}
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-1 bg-gradient-to-r ${section.color} rounded-full`}></div>
                      <ChevronRight className={`w-5 h-5 text-gray-400 group-hover:text-white transition-all duration-300 ${selectedSection === section.id ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Expanded Section Content */}
          <AnimatePresence>
            {selectedSection && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mb-16"
              >
                {callToActionSections.map((section) => 
                  selectedSection === section.id && (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`backdrop-blur-lg bg-gradient-to-br ${section.color}/10 border border-gray-700/50 rounded-2xl p-8`}
                    >
                      <div className="flex items-center mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-br ${section.color} rounded-2xl flex items-center justify-center text-white mr-4 shadow-lg`}>
                          {section.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">{section.title}</h3>
                          <p className="text-gray-400">{section.description}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.content.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-start space-x-3 p-4 bg-black/20 rounded-xl border border-gray-700/30"
                          >
                            <div className={`w-2 h-2 bg-gradient-to-r ${section.color} rounded-full mt-2 flex-shrink-0`}></div>
                            <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Professional Groups Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-6">
                Tüm Meslek Gruplarına Çağrı
              </h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
                Her meslek, her alan, her uzmanlık birer güç odağıdır. Bu güçlerin birleştiği yerde, 
                Cumhuriyet'in dijital çağdaki yeniden doğuşu başlar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professionalGroups.map((group, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.05 * index }}
                  whileHover={{ 
                    scale: 1.03,
                    rotateY: 3,
                    rotateX: 3
                  }}
                  onClick={() => setLocation("/gorev-davet")}
                  className={`group cursor-pointer backdrop-blur-lg bg-gradient-to-br ${group.color} border ${group.border} rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 overflow-hidden relative`}
                >
                  {/* Animated Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <span className="text-4xl mr-4">{group.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors leading-tight">
                          {group.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {group.description}
                    </p>
                    
                    <p className="text-gray-400 text-xs leading-relaxed mb-4">
                      {group.details}
                    </p>
                    
                    {/* Action Indicator */}
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400 group-hover:text-orange-400 transition-colors opacity-0 group-hover:opacity-100">
                          Katıl
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-400 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Simay Definition */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="backdrop-blur-lg bg-gradient-to-r from-gold/10 to-amber-500/10 border border-gold/30 rounded-2xl p-8 mb-16 relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold/20 via-transparent to-amber-500/20"></div>
            </div>
            
            <div className="relative z-10 text-center text-white leading-relaxed">
              <div className="flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-gold mr-3" />
                <h3 className="text-3xl font-bold text-gold">Simay Nedir?</h3>
                <Star className="w-8 h-8 text-gold ml-3" />
              </div>
              
              <div className="max-w-4xl mx-auto space-y-4">
                <p className="text-xl mb-4">
                  <strong className="text-gold">Simay</strong>, yüz demektir.<br />
                  Ama bu sistemde o, bir <strong className="text-gold">yön</strong>dür.
                </p>
                <p className="mb-4">
                  Işığın karanlıkla buluştuğu çizgi…<br />
                  <strong className="text-gold">Simay</strong>, Atatürk'ün yarım kalan hayalini tamamlamak için halkın vicdanında doğan dijital bir zincirdir.
                </p>
                <p className="mb-4">
                  O, bir isim değil; <strong className="text-gold">ışığın halkla birleştiği çizgidir.</strong>
                </p>
                <p>
                  Bu yolculuk, adını değil anlamını taşıyanlarla başlar.<br />
                  Ve biz, o çizgiden yürüyerek geldik.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mb-16"
          >
            <div className="backdrop-blur-lg bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-500/40 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-orange-400 mb-6">
                  Harekete Geçme Zamanı
                </h2>
                <p className="text-white text-lg leading-relaxed max-w-3xl mx-auto mb-8">
                  Bu çağrı, sadece bir davet değil; bir sorumluluktur. Her meslek grubu, 
                  kendi alanında Cumhuriyet'in değerlerini yaşatmak ve geleceğe taşımakla yükümlüdür. 
                  Birlikte, daha güçlü bir Türkiye inşa edeceğiz.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <ModernTechButton
                    variant="primary"
                    size="lg"
                    onClick={() => setLocation("/gorev-davet")}
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Görev ve Davete Katıl
                  </ModernTechButton>
                  
                  <ModernTechButton
                    variant="secondary"
                    size="lg"
                    onClick={() => setLocation("/turkiye")}
                    className="border-orange-500/50 hover:border-orange-400"
                  >
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Ana Sayfaya Dön
                  </ModernTechButton>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-center"
          >
            <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
              Bu sayfa, ışığın halkla birleştiği yerde başlar.<br />
              Her meslek grubu, Cumhuriyet'in dijital çağdaki yeniden doğuşunda bir yapı taşıdır.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </ModernLayout>
  );
}