import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import ModernLayout from "@/components/ModernLayout";
import LoadingScreen from "@/components/LoadingScreen";
import SEOHead from "@/components/SEOHead";
import { navigateWithScrollReset } from "@/lib/navigation";
import { apiRequest } from "@/lib/queryClient";
import { ModernTechButton } from "@/components/ModernTechButton";
import { 
  Flag, 
  Scroll, 
  Users, 
  Target,
  BookOpen,
  RefreshCw
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

export default function SimayHomeModern() {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [, navigate] = useLocation();
  
  useEffect(() => {
    // Initialize audio system
    
    // Record visitor stats
    const recordVisit = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: i18n.language || "tr",
            hasInteracted: false
          }
        );
      } catch (error) {
        // Silent visit tracking error
      }
    };
    
    recordVisit();
    
    // 2 saniye sonra yükleme ekranını kapat
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [i18n.language]);

  const handleToggleAudio = () => {
    
    // Record user interaction
    const updateInteraction = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: i18n.language || "tr",
            hasInteracted: true
          }
        );
      } catch (error) {
        // Silent interaction tracking error
      }
    };
    
    updateInteraction();
  };

  const pageContent = "Cumhuriyet Güncellenme Platformu, Türkiye'nin dijital dönüşüm ve vatandaş katılımı projesidir. Bu platform, vatandaşların cumhuriyetin geleceğini şekillendirmesine olanak tanır. Akıl, bilim, vicdan, fen ve sanat değerlerini rehber alarak, hep birlikte geleceğe yön veririz. Platforma katılabilir, görevleri inceleyebilir ve projeye katkıda bulunabilirsiniz.";

  return (
    <>
      {isLoading && <LoadingScreen />}
      
      <ModernLayout 
        audioKey="home" 
        showLanguageSelector={true} 
        showBackButton={false}
        pageContent={pageContent}
        pageName="Cumhuriyet Güncellenme Platformu"
        onAudioToggle={handleToggleAudio}
      >
        <div className="w-full max-w-6xl mx-auto">
          {/* Ana Başlık Bölümü */}
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-2"
            >
              <div className="inline-block px-3 py-1 bg-red-950/20 border border-red-500/30 rounded-sm mb-4 shadow-[0_2px_8px_rgba(220,38,38,0.1)]">
                <span className="text-xs font-medium text-red-400 tracking-widest uppercase">Türkiye Cumhuriyeti</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-red-500 mb-4">
                {t('simay_subtitle', 'CUMHURİYET GÜNCELLENİYOR')}
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-white max-w-3xl mx-auto mb-8"
            >
              {t('content_description', 'Türkiye Cumhuriyeti\'nin yeni dijital dönüşüm platformuna hoş geldiniz. Geleceğin inşasında birlikte yürüyelim.')}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-6"
            >
              <div className="inline-flex items-center bg-black/60 backdrop-blur-sm border border-red-500/40 rounded-full px-6 py-3 shadow-[0_4px_15px_rgba(220,38,38,0.12)]">
                <div className="h-3 w-3 rounded-full bg-red-500 mr-3 animate-pulse"></div>
                <p className="text-sm text-gray-200 font-medium">
                  {t('simay_launch_date', '19 Mayıs 2025 - Cumhuriyetin Halk ile Güncellenme Yolculuğu')}
                </p>
              </div>
            </motion.div>
            
            {/* Ana Navigasyon Butonları */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6"
            >
              <ModernTechButton 
                variant="turkish"
                size="lg"
                glow="none"
                border="subtle"
                onClick={() => navigateWithScrollReset(navigate, "/turkiye")}
                className="min-w-[120px] sm:min-w-[150px] text-sm sm:text-base px-4 sm:px-6"
              >
                TÜRKİYE
              </ModernTechButton>
              
              <ModernTechButton 
                variant="primary"
                size="lg"
                glow="none"
                border="subtle"
                onClick={() => navigateWithScrollReset(navigate, "/manifesto")}
                className="min-w-[120px] sm:min-w-[150px] text-sm sm:text-base px-4 sm:px-6"
              >
                MANİFESTO
              </ModernTechButton>
              
              <ModernTechButton 
                variant="primary"
                size="lg"
                glow="none"
                border="subtle"
                onClick={() => navigateWithScrollReset(navigate, "/cagri")}
                className="min-w-[150px]"
              >
                ÇAĞRI
              </ModernTechButton>
              
              <ModernTechButton 
                variant="futuristic"
                size="lg"
                glow="none"
                border="subtle"
                onClick={() => navigateWithScrollReset(navigate, "/katil")}
                className="min-w-[150px]"
              >
                KATIL
              </ModernTechButton>
              
              <ModernTechButton 
                variant="futuristic"
                size="lg"
                glow="none"
                border="subtle"
                onClick={() => navigateWithScrollReset(navigate, "/gorevler")}
                className="min-w-[150px]"
              >
                GÖREV
              </ModernTechButton>
              
              <ModernTechButton 
                variant="secondary"
                size="lg"
                glow="none"
                border="subtle"
                onClick={() => navigateWithScrollReset(navigate, "/entegrasyon-sureci")}
                className="min-w-[150px]"
              >
                ENTEGRASYON
              </ModernTechButton>
            </motion.div>
          </div>
          
          {/* Core Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mb-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-transparent rounded-3xl -z-10"></div>
            
            <div className="text-center mb-12 pt-10">
              <div className="inline-block mb-3 relative">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 drop-shadow-sm">
                  {t('core_values', 'TEMEL DEĞERLER')}
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mt-2"></div>
              </div>
              <p className="text-white/90 max-w-3xl mx-auto px-4 font-light text-lg">
                {t('core_values_desc', 'Cumhuriyetin güncellenmesi, bu beş temel değer etrafında şekillenecektir.')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto px-4 pb-10">
              {coreValues.map((value, index) => (
                <motion.div 
                  key={value.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + (index * 0.1) }}
                  className="bg-gradient-to-br from-gray-900 to-black border border-red-900/20 rounded-xl p-4 text-center hover:border-red-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-red-900/20 hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-red-700 to-red-900 rounded-full mx-auto mb-3 text-white font-bold text-lg shadow-md group-hover:shadow-red-700/30 group-hover:from-red-600 group-hover:to-red-800 transition-all">
                    {value.symbol}
                  </div>
                  <h3 className="text-lg font-bold text-red-500 mb-2 group-hover:text-red-400 transition-colors">{value.name}</h3>
                  <p className="text-white/80 text-sm font-light leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mb-16 mx-auto px-4 max-w-4xl"
          >
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-white text-sm font-semibold">{stat.label}</div>
                    <div className="text-gray-400 text-xs">{stat.suffix}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mb-24 mx-auto max-w-5xl px-4"
          >
            <div className="relative bg-gradient-to-br from-blue-950 to-black border border-red-900/30 rounded-2xl p-10 mx-auto overflow-hidden shadow-[0_8px_30px_rgba(185,28,28,0.12)]">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
              
              {/* Simplified background pattern for performance */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-red-900/30 flex items-center justify-center mx-auto mb-6 relative">
                  <RefreshCw className="w-8 h-8 text-red-500 filter drop-shadow-lg" />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 drop-shadow-sm">
                  {t('journey_title', 'Bu Yolculuğa Katılın')}
                </h3>
                <p className="text-white/90 mb-8 max-w-xl mx-auto text-lg font-light leading-relaxed">
                  {t('journey_desc', 'Türkiye Cumhuriyeti\'nin geleceğini birlikte şekillendirelim. Görevleri keşfedin ve katılın.')}
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <ModernTechButton 
                    variant="futuristic"
                    size="lg"
                    glow="none"
                    border="subtle"
                    onClick={() => navigate("/gorevler")}
                    className="min-w-[200px]"
                  >
                    GÖREVLERE KATIL
                  </ModernTechButton>
                  
                  <ModernTechButton 
                    variant="primary"
                    size="lg"
                    glow="none"
                    border="subtle"
                    onClick={() => navigate("/anayasa")}
                    className="min-w-[200px]"
                  >
                    ANAYASAYI OKU
                  </ModernTechButton>
                  
                  <ModernTechButton 
                    variant="secondary"
                    size="lg"
                    glow="none"
                    border="subtle"
                    onClick={() => navigate("/premium-login")}
                    className="min-w-[200px]"
                  >
                    PREMIUM GİRİŞ
                  </ModernTechButton>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </ModernLayout>
    </>
  );
}