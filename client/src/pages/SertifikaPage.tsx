import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import ModernLayout from '@/components/ModernLayout';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  ShieldCheck, 
  Star, 
  Award, 
  Users, 
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function SertifikaPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  
  const pageContent = "Halk Sistemi Katılım Sertifikası - Mazlum halkların dayanışma platformuna katılımınızı belgeleyen dijital sertifika sistemi.";
  
  useEffect(() => {
    const recordVisit = async () => {
      try {
        await apiRequest("POST", "/api/visits", {
          language: i18n.language || "tr",
          hasInteracted: false,
          page: "sertifika"
        });
      } catch (error) {
        // Silent visit tracking error
      }
    };
    recordVisit();
  }, [i18n.language]);

  const benefits = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Dijital Kimlik",
      description: "Platformdaki tüm aktivitelerinizde kullanabileceğiniz güvenli dijital kimlik"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Halk Koordinasyonu",
      description: "Halk koordinasyon süreçlerine öncelikli katılım hakkı"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "100 Görev Erişimi",
      description: "Atatürk'ün medeniyet ışığında belirlenen 100 göreve tam erişim"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Dayanışma Ağı",
      description: "Mazlum halkların küresel dayanışma ağına katılım"
    }
  ];

  return (
    <ModernLayout 
      audioKey="turkiye" 
      showBackButton={true}
      pageContent={pageContent}
      pageName="Katılım Sertifikası"
    >
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-red-950/30 border border-red-600/40 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-red-400" />
            <span className="text-red-400 font-medium text-sm">Halk Sistemi Sertifikası</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
            DİJİTAL
            <span className="block bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              KATILIM SERTİFİKASI
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Mazlum halkların dayanışma platformuna katılımınızı belgeleyen 
            <span className="text-red-400 font-medium"> resmi dijital sertifika</span>
          </p>
        </motion.div>

        {/* Main Certificate Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-black via-red-950/10 to-black border-2 border-red-600/30 rounded-2xl p-8 mb-12 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full bg-gradient-to-br from-red-600 to-transparent" />
          </div>
          
          {/* Certificate Content */}
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-red-600/20 to-red-800/20 rounded-2xl border-2 border-red-600/40 flex items-center justify-center p-2">
                <Award className="w-12 h-12 text-red-400" />
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">HALK SİSTEMİ</h2>
              <p className="text-red-400 font-medium">Katılım Sertifikası</p>
              <div className="w-24 h-1 bg-red-500 mx-auto mt-4 rounded-full" />
            </div>
            
            <div className="bg-black/20 border border-red-600/20 rounded-lg p-6 mb-6">
              <p className="text-gray-300 text-center leading-relaxed">
                Bu sertifika, sahibinin <span className="text-red-400 font-medium">Atatürk'ün Medeniyet Işığında 100 Görevle Halk Sistemi</span> 
                platformuna katıldığını ve mazlum halkların dayanışma ağının bir parçası olduğunu belgeler.
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">Sertifika Özellikleri</p>
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Blockchain Korumalı
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Benzersiz Kimlik
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Doğrulanabilir
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Sertifika Avantajları
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-gradient-to-r from-black/40 to-red-950/20 border border-red-600/20 rounded-xl p-6 hover:border-red-500/40 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-950/30 border border-red-600/30 rounded-lg flex items-center justify-center text-red-400">
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-2">{benefit.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-red-950/20 to-black/40 border border-red-600/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Sertifikanızı Alın
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Halk Sistemi'ne katılarak dijital sertifikanızı hemen alın ve 
              mazlum halkların dayanışma ağının bir parçası olun.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/katil")}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-12"
              >
                Hemen Katıl
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate("/gorevler")}
                className="border-red-600/30 text-red-400 hover:bg-red-950/20 px-8 py-3 rounded-lg h-12"
              >
                <Download className="w-4 h-4 mr-2" />
                Örnek Sertifika
              </Button>
            </div>
          </div>
        </motion.div>

      </div>
    </ModernLayout>
  );
}