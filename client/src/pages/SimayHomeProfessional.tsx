import { useState, useEffect } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { useTranslation } from "react-i18next";
import ModernLayout from "@/components/ModernLayout";
import LoadingScreen from "@/components/LoadingScreen";
import { 
  Flag, 
  Scroll, 
  Users, 
  Target 
} from "lucide-react";

// Ana değerler için veri
const coreValues = [
  { id: 'akil', name: 'AKIL', symbol: 'A', description: 'Bilginin ışığında düşünmek' },
  { id: 'bilim', name: 'BİLİM', symbol: 'B', description: 'Gerçeği keşfetmek için metot' },
  { id: 'vicdan', name: 'VİCDAN', symbol: 'V', description: 'Adaletli olmak için rehber' },
  { id: 'fen', name: 'FEN', symbol: 'F', description: 'Doğayı anlamak ve dönüştürmek' },
  { id: 'sanat', name: 'SANAT', symbol: 'S', description: 'Ruhu besleyen yaratıcılık' }
];

// İstatistik verisi
const stats = [
  { label: 'Katılımcı', value: '8.523.912', suffix: 'Vatandaş' },
  { label: 'Görev', value: '100', suffix: 'Aktif' },
  { label: 'Bağış', value: '₺7.514.892', suffix: 'Medeniyet için' }
];

export default function SimayHomeProfessional() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [showLoading, setShowLoading] = useState(true);
  const [match, params] = useRoute("/:lang");
  
  useEffect(() => {
    // Dil parametresi varsa dili değiştir
    if (match && params?.lang) {
      const language = params.lang;
      if (i18n.language !== language) {
        i18n.changeLanguage(language);
      }
    }
  
    // 3 saniye sonra yükleme ekranını gizle
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [i18n, match, params]);

  // Yükleme ekranı
  if (showLoading) {
    return <LoadingScreen />;
  }

  const pageContent = "Cumhuriyet Güncellenme Platformu, Türkiye'nin dijital dönüşüm ve vatandaş katılımı projesidir. Bu platform, vatandaşların cumhuriyetin geleceğini şekillendirmesine olanak tanır. Akıl, bilim, vicdan, fen ve sanat değerlerini rehber alarak, hep birlikte geleceğe yön veririz. Platforma katılabilir, görevleri inceleyebilir ve projeye katkıda bulunabilirsiniz.";

  return (
    <ModernLayout audioKey="home" showLanguageSelector={true} pageContent={pageContent}>
      <div className="w-full">
        {/* Hero Section - Simplified */}
        <div className="relative rounded-xl overflow-hidden mb-16">
          <div className="absolute inset-0 bg-black/40 z-0"></div>
          
          <div className="relative z-10 py-24 px-6 sm:px-12 text-center">
            <div className="inline-flex mb-2 border-b border-red-500/30 px-4 py-1">
              <div className="text-xs font-medium text-red-400 tracking-wider uppercase">Türkiye Cumhuriyeti</div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-red-500">
              {t('simay_subtitle', 'CUMHURİYET GÜNCELLENİYOR')}
            </h1>
            
            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('content_description', 'Türkiye Cumhuriyeti\'nin yeni dijital dönüşüm platformuna hoş geldiniz. Geleceğin inşasında birlikte yürüyelim.')}
            </p>
            
            <div className="inline-flex items-center border border-red-500/40 bg-black/60 rounded-full px-6 py-2 mb-10">
              <div className="h-2 w-2 rounded-full bg-red-500 mr-3"></div>
              <p className="text-sm text-gray-300">
                {t('simay_launch_date', '19 Mayıs 2025 - Cumhuriyetin Halk ile Güncellenme Yolculuğu')}
              </p>
            </div>
            
            {/* Ana Navigasyon Butonları - Simplified */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
              <button 
                onClick={() => navigate("/turkiye")}
                className="px-7 py-3.5 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center font-medium text-base"
              >
                <Flag className="w-5 h-5 mr-3" />
                <span>{t('turkiye_button', 'TÜRKİYE')}</span>
              </button>
              
              <button 
                onClick={() => navigate("/manifesto")}
                className="px-7 py-3.5 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center font-medium text-base"
              >
                <Scroll className="w-5 h-5 mr-3" />
                <span>{t('manifesto_button', 'MANİFESTO')}</span>
              </button>
              
              <button 
                onClick={() => navigate("/halkmanifestolari")}
                className="px-7 py-3.5 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center font-medium text-base"
              >
                <Users className="w-5 h-5 mr-3" />
                <span>{t('peoples_manifestos', 'HALK MANİFESTOLARI')}</span>
              </button>
              
              <button 
                onClick={() => navigate("/gorevler")}
                className="px-7 py-3.5 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center font-medium text-base"
              >
                <Target className="w-5 h-5 mr-3" />
                <span>{t('missions_button', 'GÖREVLER')}</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Core Values Section - Simplified */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-red-500 mb-4">{t('core_values', 'TEMEL DEĞERLER')}</h2>
            <p className="text-white/80 max-w-3xl mx-auto">
              {t('core_values_desc', 'Cumhuriyetin güncellenmesi, bu beş temel değer etrafında şekillenecektir.')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto px-4">
            {coreValues.map(value => (
              <div 
                key={value.id}
                className="bg-black border border-red-900/20 rounded-xl p-5 text-center hover:border-red-500/40 transition-colors"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-red-900 rounded-full mx-auto mb-4 text-white font-bold text-xl">
                  {value.symbol}
                </div>
                <h3 className="text-lg font-bold text-red-500 mb-2">{value.name}</h3>
                <p className="text-white/70 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Stats Section - Simplified */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-black border border-red-900/10 rounded-xl p-6 text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-red-500 mb-1">{stat.value}</div>
                <div className="text-white/60 font-medium text-sm uppercase tracking-wider">{stat.label}</div>
                <div className="text-white/40 text-xs mt-1">{stat.suffix}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA - Simplified */}
        <div className="text-center mb-12">
          <div className="bg-black border border-red-900/20 rounded-xl p-8 max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {t('journey_title', 'Bu Yolculuğa Katılın')}
            </h3>
            <p className="text-white/70 mb-6">
              {t('journey_desc', 'Türkiye Cumhuriyeti\'nin geleceğini birlikte şekillendirelim. Görevleri keşfedin ve katılın.')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => navigate("/gorevler")}
                className="px-6 py-3 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                {t('missions_button', 'GÖREVLER')}
              </button>
              
              <button 
                onClick={() => navigate("/katil")}
                className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                {t('participate_button', 'KATIL')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModernLayout>
  );
}