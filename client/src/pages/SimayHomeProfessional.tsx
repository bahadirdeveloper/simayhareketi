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
        {/* Hero Section - Enhanced Design */}
        <div className="relative rounded-xl overflow-hidden mb-16 bg-gradient-to-r from-indigo-950 via-blue-950 to-indigo-950 border border-blue-900/30 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-red-900/10 z-0"></div>
          
          {/* Grid pattern for technological look */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(10)].map((_, i) => (
              <div key={`grid-h-${i}`} className="absolute h-px bg-red-400 w-full" style={{ top: `${i * 10}%` }} />
            ))}
            {[...Array(10)].map((_, i) => (
              <div key={`grid-v-${i}`} className="absolute w-px bg-red-400 h-full" style={{ left: `${i * 10}%` }} />
            ))}
          </div>
          
          <div className="relative z-10 py-28 px-8 sm:px-12 text-center">
            <div className="inline-flex mb-4 border-b border-red-500/50 px-4 py-1">
              <div className="text-xs font-medium text-red-400 tracking-widest uppercase bg-black/30 px-3 py-1 rounded-sm">Türkiye Cumhuriyeti</div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 text-red-500 drop-shadow-md">
              {t('simay_subtitle', 'CUMHURİYET GÜNCELLENİYOR')}
            </h1>
            
            <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md">
              {t('content_description', 'Türkiye Cumhuriyeti\'nin yeni dijital dönüşüm platformuna hoş geldiniz. Geleceğin inşasında birlikte yürüyelim.')}
            </p>
            
            <div className="inline-flex items-center border border-red-500/40 bg-black/60 backdrop-blur-sm rounded-full px-6 py-3 mb-10 shadow-lg">
              <div className="h-3 w-3 rounded-full bg-red-500 mr-3 animate-pulse"></div>
              <p className="text-sm text-gray-200 font-medium">
                {t('simay_launch_date', '19 Mayıs 2025 - Cumhuriyetin Halk ile Güncellenme Yolculuğu')}
              </p>
            </div>
            
            {/* Ana Navigasyon Butonları - Enhanced 3D Buttons */}
            <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
              <button 
                onClick={() => navigate("/turkiye")}
                className="px-8 py-4 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-lg hover:from-red-500 hover:to-red-700 transition-all shadow-lg hover:shadow-red-700/30 flex items-center font-medium text-base transform hover:-translate-y-1 active:translate-y-0 active:shadow-inner border border-red-600/20"
              >
                <Flag className="w-5 h-5 mr-3 filter drop-shadow" />
                <span className="tracking-wide">{t('turkiye_button', 'TÜRKİYE')}</span>
              </button>
              
              <button 
                onClick={() => navigate("/manifesto")}
                className="px-8 py-4 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-lg hover:from-red-500 hover:to-red-700 transition-all shadow-lg hover:shadow-red-700/30 flex items-center font-medium text-base transform hover:-translate-y-1 active:translate-y-0 active:shadow-inner border border-red-600/20"
              >
                <Scroll className="w-5 h-5 mr-3 filter drop-shadow" />
                <span className="tracking-wide">{t('manifesto_button', 'MANİFESTO')}</span>
              </button>
              
              <button 
                onClick={() => navigate("/halkmanifestolari")}
                className="px-8 py-4 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-lg hover:from-red-500 hover:to-red-700 transition-all shadow-lg hover:shadow-red-700/30 flex items-center font-medium text-base transform hover:-translate-y-1 active:translate-y-0 active:shadow-inner border border-red-600/20"
              >
                <Users className="w-5 h-5 mr-3 filter drop-shadow" />
                <span className="tracking-wide">{t('peoples_manifestos', 'HALK MANİFESTOLARI')}</span>
              </button>
              
              <button 
                onClick={() => navigate("/gorevler")}
                className="px-8 py-4 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-lg hover:from-red-500 hover:to-red-700 transition-all shadow-lg hover:shadow-red-700/30 flex items-center font-medium text-base transform hover:-translate-y-1 active:translate-y-0 active:shadow-inner border border-red-600/20"
              >
                <Target className="w-5 h-5 mr-3 filter drop-shadow" />
                <span className="tracking-wide">{t('missions_button', 'GÖREVLER')}</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Core Values Section - Advanced Design */}
        <div className="mb-20 relative">
          {/* Background gradient for section */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-transparent rounded-3xl -z-10"></div>
          
          <div className="text-center mb-12 pt-10">
            <div className="inline-block mb-3 relative">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 drop-shadow-sm">{t('core_values', 'TEMEL DEĞERLER')}</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mt-2"></div>
            </div>
            <p className="text-white/90 max-w-3xl mx-auto px-4 font-light text-lg">
              {t('core_values_desc', 'Cumhuriyetin güncellenmesi, bu beş temel değer etrafında şekillenecektir.')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto px-4 pb-10">
            {coreValues.map(value => (
              <div 
                key={value.id}
                className="bg-gradient-to-br from-gray-900 to-black border border-red-900/20 rounded-xl p-6 text-center hover:border-red-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-red-900/20 hover:-translate-y-1 group"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-red-700 to-red-900 rounded-full mx-auto mb-5 text-white font-bold text-2xl shadow-md group-hover:shadow-red-700/30 group-hover:from-red-600 group-hover:to-red-800 transition-all">
                  {value.symbol}
                </div>
                <h3 className="text-xl font-bold text-red-500 mb-3 group-hover:text-red-400 transition-colors">{value.name}</h3>
                <p className="text-white/80 text-base font-light leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Stats Section - Modern Digital Counter Look */}
        <div className="mb-24 mx-auto px-4 max-w-5xl">
          <div className="relative">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/50 via-blue-950/30 to-indigo-950/50 rounded-2xl -z-10 transform -skew-y-1"></div>
            
            {/* Grid pattern for tech effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden -z-10">
              {[...Array(5)].map((_, i) => (
                <div key={`stat-h-${i}`} className="absolute h-px bg-blue-500/10 w-full" style={{ top: `${i * 25}%` }} />
              ))}
              {[...Array(12)].map((_, i) => (
                <div key={`stat-v-${i}`} className="absolute w-px bg-blue-500/10 h-full" style={{ left: `${i * 8.33}%` }} />
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="backdrop-blur-sm bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-900/20 rounded-xl p-8 text-center shadow-lg hover:shadow-red-900/20 transition-all duration-500 hover:-translate-y-1 relative group overflow-hidden"
                >
                  {/* Subtle animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-900/0 via-red-900/5 to-red-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  
                  <div className="relative">
                    <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-500 mb-3 font-mono tracking-tight">{stat.value}</div>
                    <div className="text-white/80 font-medium text-sm uppercase tracking-widest mb-1 group-hover:text-white transition-colors">{stat.label}</div>
                    <div className="text-white/50 text-xs mt-1 group-hover:text-white/70 transition-colors">{stat.suffix}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA - Full Featured Call to Action */}
        <div className="text-center mb-20 mx-auto max-w-5xl px-4">
          <div className="relative bg-gradient-to-br from-blue-950 to-black border border-red-900/30 rounded-2xl p-12 mx-auto overflow-hidden shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
            
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
              <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
              <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
            </div>
            
            <div className="relative z-10">
              {/* Flag icon with glowing effect */}
              <div className="w-16 h-16 rounded-full bg-red-900/30 flex items-center justify-center mx-auto mb-6 relative">
                <Flag className="w-8 h-8 text-red-500 filter drop-shadow-lg" />
                <div className="absolute inset-0 rounded-full border border-red-500/30 animate-pulse"></div>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 drop-shadow-sm">
                {t('journey_title', 'Bu Yolculuğa Katılın')}
              </h3>
              <p className="text-white/90 mb-8 max-w-xl mx-auto text-lg font-light leading-relaxed">
                {t('journey_desc', 'Türkiye Cumhuriyeti\'nin geleceğini birlikte şekillendirelim. Görevleri keşfedin ve katılın.')}
              </p>
              
              <div className="flex flex-wrap justify-center gap-6">
                <button 
                  onClick={() => navigate("/gorevler")}
                  className="px-8 py-4 bg-gradient-to-br from-red-600 to-red-800 text-white text-lg rounded-lg hover:from-red-500 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-red-700/30 flex items-center font-medium transform hover:-translate-y-1 border border-red-600/20"
                >
                  <Target className="w-5 h-5 mr-3" />
                  <span className="tracking-wide">{t('missions_button', 'GÖREVLER')}</span>
                </button>
                
                <button 
                  onClick={() => navigate("/katil")}
                  className="px-8 py-4 bg-gradient-to-br from-gray-700 to-gray-900 text-white text-lg rounded-lg hover:from-gray-600 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-gray-600/20 flex items-center font-medium transform hover:-translate-y-1 border border-red-600/10"
                >
                  <Users className="w-5 h-5 mr-3" />
                  <span className="tracking-wide">{t('participate_button', 'KATIL')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModernLayout>
  );
}