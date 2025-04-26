import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import ModernLayout from '@/components/ModernLayout';
import { apiRequest } from '@/lib/queryClient';

export default function RussiaPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  // Rusya sayfası içeriği - erişilebilirlik okuyucu için
  const pageContent = `Rusya Federasyonu Cumhuriyeti Güncellenme Platformu. 
    Bu platform, dijital çağda demokrasi ve halk egemenliğinin modern ifadesidir. 
    Rusya halklarının kolektif iradesi ve kültürel mirasını korumak, geliştirmek ve geleceğe taşımak için oluşturulmuştur.
    Platform üzerinden, toplumsal dönüşüm sürecine katkıda bulunabilir, fikirlerinizi paylaşabilir ve 
    demokratik yönetişim ilkelerinin dijital çağa adaptasyonunda rol alabilirsiniz.`;
  
  useEffect(() => {
    // Record visitor stats
    const recordVisit = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: i18n.language || "ru",
            hasInteracted: false,
            page: "russia"
          }
        );
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
  }, [i18n.language]);

  return (
    <ModernLayout 
      audioKey="russia" 
      showBackButton={true}
      pageContent={pageContent}
      pageName="Rusya Federasyonu"
    >
      <div className="w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          {/* Rusya Bayrağı Renkleri: Beyaz, Mavi, Kırmızı */}
          <div className="relative">
            <div className="h-1 w-full bg-gradient-to-r from-white via-blue-600 to-red-600 rounded-full mb-8"></div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-white via-blue-600 to-red-600 text-transparent bg-clip-text drop-shadow-lg tracking-tight readable-text text-4xl-responsive">
              РОССИЯ
            </h1>
            <h2 className="text-xl md:text-2xl text-center text-gray-300 mb-8 font-light readable-text text-lg-responsive">
              Федерация Обновления Республики
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
              <div className="w-full md:w-1/3 aspect-video bg-gradient-to-br from-blue-950 to-black rounded-lg overflow-hidden flex items-center justify-center border border-blue-500/30">
                <span className="text-6xl">🇷🇺</span>
              </div>
              
              <div className="flex-1 space-y-4">
                <h3 className="text-xl font-medium text-white readable-text enhanced-text">Современное Обновление</h3>
                <p className="text-gray-300 text-base-responsive readable-text">
                  Россия стоит на пороге нового цифрового преобразования. Этот портал представляет собой платформу для коллективного участия граждан в формировании будущего нации.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-600/20">
                <h4 className="text-blue-400 font-medium mb-2">Культурное наследие</h4>
                <p className="text-gray-300 text-sm">Сохранение и развитие богатого культурного наследия народов России через цифровые технологии и общественное участие.</p>
              </div>
              
              <div className="bg-red-900/20 p-4 rounded-lg border border-red-600/20">
                <h4 className="text-red-400 font-medium mb-2">Демократические инновации</h4>
                <p className="text-gray-300 text-sm">Новые механизмы прямого участия граждан в процессах принятия решений на всех уровнях управления.</p>
              </div>
              
              <div className="bg-white/5 p-4 rounded-lg border border-white/20">
                <h4 className="text-white font-medium mb-2">Цифровое будущее</h4>
                <p className="text-gray-300 text-sm">Развитие технологической инфраструктуры для обеспечения цифрового суверенитета и равного доступа к цифровым благам.</p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-900/20 to-red-900/20 p-4 rounded-lg border border-blue-300/10">
                <h4 className="text-gray-200 font-medium mb-2">Общественный диалог</h4>
                <p className="text-gray-300 text-sm">Создание пространства для открытого и конструктивного диалога между различными социальными группами.</p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400 mb-4">Эта платформа находится в стадии разработки</p>
              <Button 
                className="bg-gradient-to-r from-blue-700 to-red-700 hover:from-blue-600 hover:to-red-600 text-white rounded-md py-2 px-6"
                onClick={() => setIsLoading(true)}
                disabled={isLoading}
              >
                {isLoading ? 'Загрузка...' : 'Присоединиться к обновлению'}
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
          <p className="text-sm text-gray-400">
            © 2025 Платформа Обновления Республики | Разработано с использованием передовых технологий
          </p>
        </motion.div>
      </div>
    </ModernLayout>
  );
}