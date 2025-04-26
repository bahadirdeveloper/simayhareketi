import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import HalfBurningEarthBackground from "@/components/HalfBurningEarthBackground";
import { apiRequest } from "@/lib/queryClient";

export default function KatilPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  // Form durumu
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Sayaçlar için state
  const [stats, setStats] = useState({
    totalParticipants: 478,
    activeProjects: 12,
    completedTasks: 2347
  });
  
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
            page: "katil"
          }
        );
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [i18n.language]);
  
  // Form input değişim fonksiyonu
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  // Form gönderme fonksiyonu
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.message) {
      toast({
        title: t('join.error'),
        description: t('join.error_message'),
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Burada API isteği yapılacak (şu an simüle ediyoruz)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: t('join.success'),
        description: t('join.success_message')
      });
      
      // Form reset
      setForm({
        name: "",
        email: "",
        message: ""
      });
      
      // Sayaçları güncelle
      setStats(prev => ({
        ...prev,
        totalParticipants: prev.totalParticipants + 1
      }));
      
    } catch (error) {
      toast({
        title: t('join.error'),
        description: t('join.error_message'),
        variant: "destructive"
      });
      console.error("Form gönderim hatası:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center">
      <HalfBurningEarthBackground />
      
      <motion.div
        className="container mx-auto px-4 py-8 z-10 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-between items-center mb-8">
          <Button
            onClick={() => navigate("/")}
            className="bg-green-700 hover:bg-green-600 text-white"
          >
            ← {t('back_to_home')}
          </Button>
        </div>
        
        <header className="text-center mb-12">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-4 text-red-500"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t('join.title', 'Harekete Katılın')}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t('join.subtitle', 'Daha aydınlık bir gelecek için bizimle çalışın')}
          </motion.p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Katılım Formu */}
          <motion.div
            className="bg-black/60 border-2 border-red-700 rounded-lg p-6 backdrop-blur-sm"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-white">
              {t('join.form_title', 'Katılım Formu')}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
                  {t('join.name')}
                </label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                  {t('join.email')}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1">
                  {t('join.message')}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="bg-gray-800 border-gray-700 text-white h-32"
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-500 hover:to-red-600 text-white font-bold py-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('join.submitting') : t('join.submit')}
              </Button>
            </form>
          </motion.div>
          
          {/* İstatistikler ve Açıklama */}
          <div className="space-y-6">
            <motion.div
              className="bg-black/60 border-2 border-yellow-500 rounded-lg p-6 backdrop-blur-sm"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-center text-yellow-400">
                {t('join.stats_title', 'Hareketin Gücü')}
              </h2>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3">
                  <span className="block text-3xl font-bold text-red-500">{stats.totalParticipants}</span>
                  <span className="text-sm text-gray-300">{t('join.participants', 'Katılımcı')}</span>
                </div>
                <div className="p-3">
                  <span className="block text-3xl font-bold text-green-500">{stats.activeProjects}</span>
                  <span className="text-sm text-gray-300">{t('join.projects', 'Aktif Proje')}</span>
                </div>
                <div className="p-3">
                  <span className="block text-3xl font-bold text-blue-500">{stats.completedTasks}</span>
                  <span className="text-sm text-gray-300">{t('join.tasks', 'Tamamlanan Görev')}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-black/60 border-2 border-blue-700 rounded-lg p-6 backdrop-blur-sm"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">
                {t('join.why_join', 'Neden Katılmalıyım?')}
              </h2>
              
              <ul className="space-y-3 text-gray-200">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {t('join.reason1', 'Türkiye\'nin geleceğini birlikte şekillendirmek için')}
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {t('join.reason2', 'Fikirlerinizi toplumsal değişime dönüştürmek için')}
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {t('join.reason3', 'Dijital çağda demokratik katılımın öncüsü olmak için')}
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {t('join.reason4', 'Cumhuriyetin temel değerlerini yaşatmak için')}
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
        
        {/* Görev Tanıtımı */}
        <motion.div 
          className="mt-12 bg-gradient-to-r from-green-900/60 to-blue-900/60 backdrop-blur-sm border border-yellow-500 rounded-lg p-6 text-center max-w-5xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h3 className="text-xl font-bold text-yellow-400 mb-4">{t('join.tasks_title', 'Görev Sistemi İle Tanışın')}</h3>
          <p className="text-gray-300 mb-6">
            {t('join.tasks_description', 'Katılımcılar olarak somut görevler üstlenerek Türkiye\'nin geleceğine katkıda bulunun. Her görev, toplumsal değişimin bir parçasıdır.')}
          </p>
          <Button 
            onClick={() => navigate("/gorevler")}
            className="bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-500 hover:to-red-600 text-white font-bold"
          >
            {t('join.view_tasks', 'Görevleri Görüntüle')}
          </Button>
        </motion.div>
        
        <footer className="mt-12 text-center text-gray-400 text-sm">
          &copy; 2025 Simay Hareketi — {t('join.footer', 'Cumhuriyetin Halk ile Güncellenme Platformu')}
        </footer>
      </motion.div>
    </div>
  );
}