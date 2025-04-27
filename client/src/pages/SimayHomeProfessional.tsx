import { useState, useEffect } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ModernLayout from "@/components/ModernLayout";
import LoadingScreen from "@/components/LoadingScreen";

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
  }, [match, params, i18n]);
  
  if (showLoading) {
    return <LoadingScreen onComplete={() => setShowLoading(false)} />;
  }
  
  return (
    <ModernLayout audioKey="home" showLanguageSelector={true}>
      <div className="w-full">
        <div className="text-center text-white p-8">
          <h1 className="text-4xl font-bold">{t('simay_subtitle', 'Cumhuriyet Güncelleniyor')}</h1>
          <p className="mt-4">{t('content_description', 'Web sitesi başarıyla yüklendi.')}</p>
          
          {/* Dil seçici butonunun üstünde ek navigasyon butonları */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate(`/${i18n.language}/manifesto`)}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-md hover:from-red-700 hover:to-red-800 transition-all"
            >
              {t('simay_manifesto_button', 'Manifestomuz')}
            </button>
            <button 
              onClick={() => navigate(`/${i18n.language}/katil`)}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-md hover:from-red-700 hover:to-red-800 transition-all"
            >
              {t('simay_join_button', 'Harekete Katıl')}
            </button>
            <button 
              onClick={() => navigate(`/${i18n.language}/gorevler`)}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-md hover:from-red-700 hover:to-red-800 transition-all"
            >
              {t('simay_tasks_button', 'Görevler')}
            </button>
          </div>
        </div>
      </div>
    </ModernLayout>
  );
}