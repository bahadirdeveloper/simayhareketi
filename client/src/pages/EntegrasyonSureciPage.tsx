import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import PageLayout from "@/components/PageLayout";
import { 
  Certificate, 
  Users, 
  Database, 
  ArrowRight, 
  CheckCircle, 
  Clock,
  Star,
  Shield,
  Target,
  Globe
} from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface IntegrationStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  status: 'completed' | 'active' | 'pending';
  progress: number;
  color: string;
  link?: string;
}

export default function EntegrasyonSureciPage() {
  const [activeStep, setActiveStep] = useState(0);
  
  const integrationSteps: IntegrationStep[] = [
    {
      id: 'sertifika',
      title: 'SERTİFİKA',
      description: 'Dijital sertifika ve belgelendirme',
      icon: Certificate,
      status: 'active',
      progress: 75,
      color: 'from-emerald-500 to-teal-600',
      link: '/sertifika'
    },
    {
      id: 'koordinasyon',
      title: 'HALK KOORDİNASYON',
      description: 'Toplumsal koordinasyon ve yönetim',
      icon: Users,
      status: 'active',
      progress: 65,
      color: 'from-amber-500 to-orange-600',
      link: '/halk-koordinasyon'
    },
    {
      id: 'gelir-gider',
      title: 'CANLI GELİR-GİDER',
      description: 'Şeffaf mali durum ve harcama takibi',
      icon: Database,
      status: 'active',
      progress: 80,
      color: 'from-emerald-600 to-green-700',
      link: '/mali-seffaflik'
    },
    {
      id: 'dijital-kimlik',
      title: 'DİJİTAL KİMLİK',
      description: 'Benzersiz dijital kimlik oluşturma',
      icon: Shield,
      status: 'pending',
      progress: 40,
      color: 'from-blue-500 to-indigo-600',
      link: '/dijital-kimlik'
    }
  ];

  const processFeatures = [
    {
      icon: Target,
      title: 'Hedefli Entegrasyon',
      description: 'Her aşama önceki deneyimlere dayanarak tasarlanmıştır'
    },
    {
      icon: Globe,
      title: 'Küresel Erişim',
      description: 'Dünyanın her yerinden katılım imkanı'
    },
    {
      icon: Star,
      title: 'Kaliteli Süreç',
      description: 'Kanıtlanmış metodoloji ve standartlar'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % integrationSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageLayout 
      showLanguageSelector={true} 
      showBackNavigation={true}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
    >
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Entegrasyon Sürecimiz
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Platformumuza katılım süreciniz şeffaf, güvenli ve adım adım gerçekleşir. 
            Her aşamada size rehberlik ederiz.
          </p>
        </motion.div>

        {/* Process Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {processFeatures.map((feature, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <feature.icon className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Integration Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {integrationSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative group ${activeStep === index ? 'scale-105' : ''} transition-all duration-500`}
            >
              <Card className={`
                bg-gradient-to-br ${step.color} 
                text-white border-0 overflow-hidden
                transform transition-all duration-500 hover:scale-105
                ${activeStep === index ? 'ring-4 ring-white/30' : ''}
              `}>
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                      <step.icon className="h-8 w-8" />
                    </div>
                    <div className="flex items-center space-x-2">
                      {step.status === 'completed' && (
                        <CheckCircle className="h-6 w-6 text-green-300" />
                      )}
                      {step.status === 'active' && (
                        <Clock className="h-6 w-6 text-yellow-300" />
                      )}
                      <Badge 
                        variant={step.status === 'completed' ? 'default' : 'secondary'}
                        className="bg-white/20 text-white border-0"
                      >
                        {step.status === 'completed' ? 'Tamamlandı' : 
                         step.status === 'active' ? 'Aktif' : 'Beklemede'}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl font-bold">
                    {step.title}
                  </CardTitle>
                  <CardDescription className="text-white/80 text-base">
                    {step.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tamamlanma Oranı</span>
                      <span className="font-semibold">{step.progress}%</span>
                    </div>
                    <Progress 
                      value={step.progress} 
                      className="h-2 bg-white/20"
                    />
                  </div>

                  {step.link && (
                    <Link href={step.link}>
                      <Button 
                        className="w-full bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm group"
                        size="lg"
                      >
                        <span>Detayları Görüntüle</span>
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  )}
                </CardContent>

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white transform translate-x-16 -translate-y-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white transform -translate-x-12 translate-y-12"></div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Process Flow */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Süreç Akışı</CardTitle>
              <CardDescription className="text-slate-400">
                Entegrasyon sürecinizin genel görünümü
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                {integrationSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center space-x-4">
                    <div className={`
                      p-3 rounded-full
                      ${step.status === 'completed' ? 'bg-green-500' : 
                        step.status === 'active' ? 'bg-yellow-500' : 'bg-slate-600'}
                    `}>
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    {index < integrationSteps.length - 1 && (
                      <ArrowRight className="h-6 w-6 text-slate-400 hidden md:block" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Hazır mısınız?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Entegrasyon sürecine bugün başlayın ve global dayanışma hareketinin bir parçası olun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/katil">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Süreci Başlat
              </Button>
            </Link>
            <Link href="/hakkimizda">
              <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                Daha Fazla Bilgi
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}