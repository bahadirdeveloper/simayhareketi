import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import ModernLayout from '@/components/ModernLayout';
import { apiRequest } from '@/lib/queryClient';

export default function OppressedNationsPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  // Mazlum Milletler sayfası içeriği - erişilebilirlik okuyucu için
  const pageContent = `Mazlum Milletler Uluslararası İletişim Platformu. 
    Bu platform, dünya genelindeki mazlum milletlerin sesini duyurabilmeleri ve 
    Türkiye'nin önderliğinde birlik olabilmeleri için tasarlanmıştır. 
    Burada, toplumsal dönüşüm sürecine katkıda bulunabilir, fikirlerinizi paylaşabilir ve 
    mazlum milletlerin birleşmesiyle oluşacak yeni dünya düzeninde yer alabilirsiniz.`;
  
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
            page: "oppressed"
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
      audioKey="oppressed" 
      showBackButton={true}
      showLanguageSelector={true}
      pageContent={pageContent}
      pageName="Mazlum Milletler Platformu"
    >
      <div className="w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="relative">
            <div className="h-1 w-full bg-gradient-to-r from-red-600 via-blue-600 to-green-600 rounded-full mb-8"></div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 via-red-500 to-green-500 text-transparent bg-clip-text drop-shadow-lg tracking-tight readable-text text-4xl-responsive">
              MAZLUM MİLLETLER BİRLİĞİ
            </h1>
            <h2 className="text-xl md:text-2xl text-center text-gray-300 mb-8 font-light readable-text text-lg-responsive">
              Uluslararası İletişim Ağı
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-12"
        >
          <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl border border-blue-500/20 shadow-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center mb-8 gap-4">
              <div className="w-full md:w-1/3 aspect-video bg-gradient-to-br from-blue-950 to-black rounded-lg overflow-hidden flex items-center justify-center border border-blue-500/30 p-4">
                <div className="text-center">
                  <div className="flex justify-center flex-wrap gap-2">
                    <span className="text-3xl">🇹🇷</span>
                    <span className="text-3xl">🇵🇸</span>
                    <span className="text-3xl">🇮🇷</span>
                    <span className="text-3xl">🇷🇺</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Birlikte daha güçlüyüz</p>
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <h3 className="text-xl font-medium text-white readable-text enhanced-text">Dijital Birlik Hareketi</h3>
                <p className="text-gray-300 text-base-responsive readable-text">
                  Mazlum Milletler Birliği, dünya genelindeki mazlum halkların birleşerek seslerini duyurabilecekleri ve birlikte hareket edebilecekleri dijital bir dayanışma platformudur. Türkiye'nin öncülüğünde kurulan bu platform, adaletsizliğe karşı birlikte mücadele etmek isteyen tüm milletlere açıktır.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-600/20">
                <h4 className="text-blue-400 font-medium mb-2">Dijital İşbirliği</h4>
                <p className="text-gray-300 text-sm">Mazlum milletler arasında dijital iletişim ve işbirliği ağı kurarak ortak stratejiler geliştirmek ve koordinasyonu sağlamak.</p>
              </div>
              
              <div className="bg-red-900/20 p-4 rounded-lg border border-red-600/20">
                <h4 className="text-red-400 font-medium mb-2">Kültürel Dayanışma</h4>
                <p className="text-gray-300 text-sm">Farklı kültürlerin zenginliklerini paylaşarak, mazlum milletler arasında kültürel dayanışmayı güçlendirmek ve ortak değerleri yaşatmak.</p>
              </div>
              
              <div className="bg-green-900/20 p-4 rounded-lg border border-green-600/20">
                <h4 className="text-green-400 font-medium mb-2">Ekonomik Kalkınma</h4>
                <p className="text-gray-300 text-sm">Mazlum milletlerin ekonomik kalkınmalarını destekleyecek dijital projeleri hayata geçirerek, toplumsal refahı artırmak.</p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-900/20 to-red-900/20 p-4 rounded-lg border border-blue-300/10">
                <h4 className="text-gray-200 font-medium mb-2">Bağımsız İletişim</h4>
                <p className="text-gray-300 text-sm">Uluslararası alanda bağımsız bir iletişim ağı kurarak, mazlum milletlerin sesini dünyaya duyurmak ve gerçeklerin özgürce paylaşılmasını sağlamak.</p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400 mb-4">Bu platform geliştirme aşamasındadır</p>
              <Button 
                className="bg-gradient-to-r from-blue-700 to-red-700 hover:from-blue-600 hover:to-red-600 text-white rounded-md py-2 px-6"
                onClick={() => setIsLoading(true)}
                disabled={isLoading}
              >
                {isLoading ? 'Yükleniyor...' : 'Birliğe Katılın'}
              </Button>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            <div className="bg-black/30 p-2 rounded-lg border border-blue-500/10 text-center">
              <p className="text-xs text-gray-400">Türkiye</p>
              <button 
                onClick={() => navigate("/turkiye")}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Platform Sayfası
              </button>
            </div>
            
            <div className="bg-black/30 p-2 rounded-lg border border-green-500/10 text-center">
              <p className="text-xs text-gray-400">Filistin</p>
              <button 
                onClick={() => navigate("/palestine")}
                className="text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                Platform Sayfası
              </button>
            </div>
            
            <div className="bg-black/30 p-2 rounded-lg border border-blue-500/10 text-center">
              <p className="text-xs text-gray-400">İran</p>
              <button 
                onClick={() => navigate("/iran")}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Platform Sayfası
              </button>
            </div>
            
            <div className="bg-black/30 p-2 rounded-lg border border-red-500/10 text-center">
              <p className="text-xs text-gray-400">Rusya</p>
              <button 
                onClick={() => navigate("/russia")}
                className="text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                Platform Sayfası
              </button>
            </div>
          </div>
          
          <p className="text-sm text-gray-400">
            © 2025 Mazlum Milletler Birliği | İleri teknolojilerle geliştirilmiştir
          </p>
        </motion.div>
      </div>
    </ModernLayout>
  );
}