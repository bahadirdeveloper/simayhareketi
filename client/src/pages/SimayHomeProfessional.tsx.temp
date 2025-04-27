import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ModernLayout from "@/components/ModernLayout";
import LoadingScreen from "@/components/LoadingScreen";

export default function SimayHomeProfessional() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [showLoading, setShowLoading] = useState(true);
  
  useEffect(() => {
    // 3 saniye sonra yükleme ekranını gizle
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (showLoading) {
    return <LoadingScreen onComplete={() => setShowLoading(false)} />;
  }
  
  return (
    <ModernLayout audioKey="home" showLanguageSelector={true}>
      <div className="w-full">
        <div className="text-center text-white p-8">
          <h1 className="text-4xl font-bold">Cumhuriyet Güncelleniyor</h1>
          <p className="mt-4">Web sitesi başarıyla yüklendi.</p>
        </div>
      </div>
    </ModernLayout>
  );
}