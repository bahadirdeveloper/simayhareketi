import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import ModernLayout from '@/components/ModernLayout';
import { apiRequest } from '@/lib/queryClient';

export default function IranPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  // İran sayfası içeriği - erişilebilirlik okuyucu için
  const pageContent = `İran İslam Cumhuriyeti Güncellenme Platformu. 
    Bu platform, dijital çağda demokrasi ve halk egemenliğinin modern ifadesidir. 
    İran halklarının kolektif iradesi ve zengin kültürel mirasını korumak, geliştirmek ve geleceğe taşımak için oluşturulmuştur.
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
            language: i18n.language || "fa",
            hasInteracted: false,
            page: "iran"
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
      audioKey="iran" 
      showBackButton={true}
      pageContent={pageContent}
      pageName="İran İslam Cumhuriyeti"
    >
      <div className="w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          {/* İran Bayrağı Renkleri: Yeşil, Beyaz, Kırmızı */}
          <div className="relative">
            <div className="h-1 w-full bg-gradient-to-r from-green-600 via-white to-red-600 rounded-full mb-8"></div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-green-500 via-white to-red-500 text-transparent bg-clip-text drop-shadow-lg tracking-tight readable-text text-4xl-responsive">
              ایران
            </h1>
            <h2 className="text-xl md:text-2xl text-center text-gray-300 mb-8 font-light readable-text text-lg-responsive rtl-content">
              پلتفرم به‌روزرسانی جمهوری
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-12"
        >
          <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl border border-green-500/20 shadow-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center mb-8 gap-4">
              <div className="w-full md:w-1/3 aspect-video bg-gradient-to-br from-green-950 to-black rounded-lg overflow-hidden flex items-center justify-center border border-green-500/30">
                <span className="text-6xl">🇮🇷</span>
              </div>
              
              <div className="flex-1 space-y-4">
                <h3 className="text-xl font-medium text-white readable-text enhanced-text rtl-content">به‌روزرسانی مدرن</h3>
                <p className="text-gray-300 text-base-responsive readable-text rtl-content">
                  ایران در آستانه تحول دیجیتال جدیدی قرار دارد. این پورتال بستری برای مشارکت جمعی شهروندان در شکل‌دهی آینده ملت است.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-900/20 p-4 rounded-lg border border-green-600/20">
                <h4 className="text-green-400 font-medium mb-2 rtl-content">میراث فرهنگی</h4>
                <p className="text-gray-300 text-sm rtl-content">حفظ و توسعه میراث غنی فرهنگی مردم ایران از طریق فناوری‌های دیجیتال و مشارکت عمومی.</p>
              </div>
              
              <div className="bg-red-900/20 p-4 rounded-lg border border-red-600/20">
                <h4 className="text-red-400 font-medium mb-2 rtl-content">نوآوری‌های دموکراتیک</h4>
                <p className="text-gray-300 text-sm rtl-content">مکانیسم‌های جدید برای مشارکت مستقیم شهروندان در فرآیندهای تصمیم‌گیری در تمام سطوح مدیریت.</p>
              </div>
              
              <div className="bg-white/5 p-4 rounded-lg border border-white/20">
                <h4 className="text-white font-medium mb-2 rtl-content">آینده دیجیتال</h4>
                <p className="text-gray-300 text-sm rtl-content">توسعه زیرساخت‌های فناوری برای تضمین حاکمیت دیجیتال و دسترسی برابر به مزایای دیجیتال.</p>
              </div>
              
              <div className="bg-gradient-to-r from-green-900/20 to-red-900/20 p-4 rounded-lg border border-green-300/10">
                <h4 className="text-gray-200 font-medium mb-2 rtl-content">گفتگوی اجتماعی</h4>
                <p className="text-gray-300 text-sm rtl-content">ایجاد فضایی برای گفتگوی باز و سازنده بین گروه‌های مختلف اجتماعی.</p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400 mb-4 rtl-content">این پلتفرم در حال توسعه است</p>
              <Button 
                className="bg-gradient-to-r from-green-700 to-red-700 hover:from-green-600 hover:to-red-600 text-white rounded-md py-2 px-6"
                onClick={() => setIsLoading(true)}
                disabled={isLoading}
              >
                {isLoading ? 'در حال بارگذاری...' : 'پیوستن به به‌روزرسانی'}
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
          <p className="text-sm text-gray-400 rtl-content">
            © ۲۰۲۵ پلتفرم به‌روزرسانی جمهوری | توسعه‌یافته با استفاده از فناوری‌های پیشرفته
          </p>
        </motion.div>
      </div>
    </ModernLayout>
  );
}