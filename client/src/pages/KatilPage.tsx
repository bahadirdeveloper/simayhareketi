import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import SimpleFuturisticTurkish from "@/components/SimpleFuturisticTurkish";
import AccessibilityReader from "@/components/AccessibilityReader";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import GlobalTranslator from "@/components/GlobalTranslator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users,
  Crown,
  Heart,
  HandHeart,
  Star,
  Target,
  Trophy,
  MapPin,
  Mail,
  Phone,
  Send,
  CheckCircle,
  TrendingUp,
  Zap,
  Shield,
  Globe,
  Flag,
  Sparkles,
  Rocket,
  Award
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import PaymentForm from "@/components/PaymentForm";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  ad: z.string().min(2, {
    message: "Ad en az 2 karakter olmalıdır.",
  }),
  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz.",
  }),
  telefon: z.string().min(10, {
    message: "Geçerli bir telefon numarası giriniz.",
  }),
  sehir: z.string().min(2, {
    message: "Şehir bilgisi gereklidir.",
  }),
  katilimTipi: z.string({
    required_error: "Katılım tipi seçiniz.",
  }),
  mesaj: z.string().optional(),
});

export default function KatilPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Live Scoreboard with real-time updates
  const [liveStats, setLiveStats] = useState({
    participants: 0,
    totalAmount: 0,
    cities: 0,
    projects: 0,
    volunteers: 0,
    lastUpdate: new Date()
  });

  // Transaction data for transparency table
  const [transactions, setTransactions] = useState([]);
  const [transactionLoading, setTransactionLoading] = useState(false);

  const targetStats = {
    participants: 10000000,
    totalAmount: 25000000, // 25M TL target
    cities: 81,
    projects: 100,
    volunteers: 1000000
  };

  // Interface for API response
  interface LiveStatsResponse {
    participants: number;
    totalAmount: number;
    activeCities: number;
    activeProjects: number;
    volunteers: number;
    totalVisits?: number;
    uniqueVisitors?: number;
    lastUpdated?: string;
  }

  // Real-time data fetching from backend
  const fetchLiveData = async () => {
    try {
      // Fetch real participation stats from backend
      const response = await apiRequest("GET", "/api/stats/live");
      const data: LiveStatsResponse = await response.json();
      
      // Update with real data from API
      setLiveStats({
        participants: data.participants,
        totalAmount: data.totalAmount,
        cities: data.activeCities,
        projects: data.activeProjects,
        volunteers: data.volunteers,
        lastUpdate: new Date()
      });
    } catch (error) {
      console.error('Failed to fetch live data:', error);
      // If API fails, keep current values or set to zero
      setLiveStats(prev => ({
        ...prev,
        lastUpdate: new Date()
      }));
    }
  };

  // Fetch financial transactions for transparency
  const fetchTransactions = async () => {
    try {
      setTransactionLoading(true);
      const response = await apiRequest("GET", "/api/transactions?limit=20");
      const data = await response.json();
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      setTransactions([]);
    } finally {
      setTransactionLoading(false);
    }
  };

  const membershipTiers = [
    {
      id: "destekci",
      title: "Destekçi",
      subtitle: "Temel Katılım",
      price: "1 TL",
      icon: Heart,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Platform erişimi",
        "Görev katılımı",
        "Topluluk forumları",
        "Aylık bülten"
      ],
      popular: false
    },
    {
      id: "aktif",
      title: "Aktif Üye",
      subtitle: "Gelişmiş Katılım",
      price: "25 TL",
      icon: Star,
      color: "from-orange-500 to-red-500",
      features: [
        "Tüm destekçi hakları",
        "Özel etkinlikler",
        "Proje önerileri",
        "Öncelikli destek",
        "Özel rozetler"
      ],
      popular: true
    },
    {
      id: "koordinator",
      title: "Koordinatör",
      subtitle: "Liderlik Katılımı",
      price: "100 TL",
      icon: Crown,
      color: "from-purple-500 to-pink-500",
      features: [
        "Tüm aktif üye hakları",
        "Yerel organizasyon",
        "Karar alma süreçleri",
        "Özel mentor desteği",
        "Platform yönetimi",
        "VIP etkinlik erişimi"
      ],
      popular: false
    }
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ad: "",
      email: "",
      telefon: "",
      sehir: "",
      katilimTipi: "",
      mesaj: "",
    },
  });
  
  useEffect(() => {
    initAudio('katil');
    
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
  }, [i18n.language]);

  // Live data updates every 5 seconds
  useEffect(() => {
    fetchLiveData(); // Initial fetch
    fetchTransactions(); // Initial transaction fetch
    
    const interval = setInterval(() => {
      fetchLiveData();
    }, 5000); // Update every 5 seconds
    
    const transactionInterval = setInterval(() => {
      fetchTransactions();
    }, 30000); // Update transactions every 30 seconds
    
    return () => {
      clearInterval(interval);
      clearInterval(transactionInterval);
    };
  }, []);

  // Format currency
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M TL`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K TL`;
    }
    return `${amount.toLocaleString()} TL`;
  };

  // Calculate progress percentage
  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const handleToggleAudio = () => {
    playSoundtrack();
  };
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    setTimeout(() => {
      setShowConfetti(true);
      toast({
        title: "🎉 Harekete Hoş Geldiniz!",
        description: "Katılımınız başarıyla kaydedildi. Cumhuriyetin geleceğine hoş geldiniz!",
        variant: "default",
      });
      
      form.reset();
      setIsSubmitting(false);
      setCurrentStep(3);
      
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }, 2000);
  }

  const steps = [
    { title: "Bilgileriniz", icon: Users },
    { title: "Katılım Tipi", icon: Target },
    { title: "Ödeme", icon: Shield },
    { title: "Tamamlandı", icon: Trophy }
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Background */}
      <SimpleFuturisticTurkish />
      
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: -10,
                  opacity: 1,
                  scale: 0
                }}
                animate={{ 
                  y: window.innerHeight + 10,
                  opacity: 0,
                  scale: 1,
                  rotate: 360
                }}
                transition={{ 
                  duration: 3,
                  delay: Math.random() * 2,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
      
      {/* Accessibility Reader */}
      <AccessibilityReader 
        pageContent="Cumhuriyet Katılım Platformu. Bu sayfada harekete katılabilir, üyelik tipinizi seçebilir ve platformun bir parçası olabilirsiniz."
        pageName="katil" 
      />
      
      {/* Epic Hero Section */}
      <div className="relative z-20 py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <div className="relative mb-12">
              <motion.div
                className="w-40 h-40 mx-auto bg-gradient-to-br from-red-500/30 to-orange-600/30 rounded-full flex items-center justify-center border-4 border-red-500/50 shadow-[0_0_100px_rgba(239,68,68,0.5)]"
                animate={{
                  boxShadow: [
                    "0 0 100px rgba(239, 68, 68, 0.5)",
                    "0 0 150px rgba(239, 68, 68, 0.8)",
                    "0 0 100px rgba(239, 68, 68, 0.5)"
                  ],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Rocket className="w-20 h-20 text-red-400" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/10 to-red-500/20 rounded-full blur-3xl"></div>
            </div>

            <motion.h1 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-red-400 via-orange-500 via-yellow-400 to-red-600 bg-clip-text text-transparent mb-8 leading-tight"
            >
              CUMHURİYETE KATIL
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-2xl md:text-3xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Türkiye'nin geleceğini şekillendiren büyük harekete sen de katıl. 
              <span className="text-red-400 font-bold"> Birlikte güçlüyüz!</span>
            </motion.p>

            {/* Live Scoreboard */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="max-w-6xl mx-auto mb-12"
            >
              {/* Main Live Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Live Participants Counter */}
                <motion.div 
                  className="bg-gradient-to-br from-green-500/30 to-emerald-600/20 backdrop-blur-xl border-2 border-green-500/50 rounded-3xl p-8 relative overflow-hidden"
                  animate={{ 
                    boxShadow: [
                      "0 0 30px rgba(34, 197, 94, 0.3)",
                      "0 0 50px rgba(34, 197, 94, 0.5)",
                      "0 0 30px rgba(34, 197, 94, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                  <div className="text-center">
                    <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <div className="text-5xl md:text-6xl font-bold text-white mb-2 tabular-nums">
                      {liveStats.participants.toLocaleString()}
                    </div>
                    <div className="text-green-300 text-xl font-semibold mb-3">CANLI KATILIMCI</div>
                    <div className="text-gray-300 text-sm">
                      Son güncelleme: {liveStats.lastUpdate.toLocaleTimeString()}
                    </div>
                    <Progress 
                      value={calculateProgress(liveStats.participants, targetStats.participants)} 
                      className="h-2 mt-4 bg-green-900/50"
                    />
                    <div className="text-green-400 text-sm mt-2">
                      Hedef: {targetStats.participants.toLocaleString()} katılımcı
                    </div>
                  </div>
                </motion.div>

                {/* Live Money Counter */}
                <motion.div 
                  className="bg-gradient-to-br from-yellow-500/30 to-orange-600/20 backdrop-blur-xl border-2 border-yellow-500/50 rounded-3xl p-8 relative overflow-hidden"
                  animate={{ 
                    boxShadow: [
                      "0 0 30px rgba(245, 158, 11, 0.3)",
                      "0 0 50px rgba(245, 158, 11, 0.5)",
                      "0 0 30px rgba(245, 158, 11, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <div className="text-5xl md:text-6xl font-bold text-white mb-2 tabular-nums">
                      {formatCurrency(liveStats.totalAmount)}
                    </div>
                    <div className="text-yellow-300 text-xl font-semibold mb-3">TOPLANAN FONDS</div>
                    <div className="text-gray-300 text-sm">
                      Ortalama: {liveStats.participants > 0 ? Math.round(liveStats.totalAmount / liveStats.participants) : 0} TL/kişi
                    </div>
                    <Progress 
                      value={calculateProgress(liveStats.totalAmount, targetStats.totalAmount)} 
                      className="h-2 mt-4 bg-yellow-900/50"
                    />
                    <div className="text-yellow-400 text-sm mt-2">
                      Hedef: {formatCurrency(targetStats.totalAmount)}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Secondary Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/10 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-6">
                  <MapPin className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{liveStats.cities}</div>
                  <div className="text-blue-300 text-sm">Aktif Şehir</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500/20 to-red-500/10 backdrop-blur-lg border border-orange-500/30 rounded-2xl p-6">
                  <Target className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{liveStats.projects}</div>
                  <div className="text-orange-300 text-sm">Aktif Proje</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/10 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6 md:col-span-1 col-span-2">
                  <HandHeart className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{liveStats.volunteers.toLocaleString()}</div>
                  <div className="text-purple-300 text-sm">Gönüllü</div>
                </div>
              </div>

              {/* Live Update Indicator */}
              <div className="text-center mt-6">
                <motion.div 
                  className="inline-flex items-center bg-black/50 border border-red-500/30 rounded-full px-4 py-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-red-400 text-sm font-medium">CANLI SKOR TABLOSU</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 pb-24 max-w-6xl z-10 relative">
        <div className="space-y-20">
          {/* Membership Tiers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-6">
                Üyelik Seçenekleri
              </h2>
              <p className="text-gray-300 text-xl max-w-3xl mx-auto">
                Katkı seviyene göre üyelik tipini seç ve harekete dahil ol
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {membershipTiers.map((tier, index) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative"
                >
                  <Card className={`h-full bg-gradient-to-br from-black/60 via-gray-900/40 to-black/60 border-2 ${
                    tier.popular 
                      ? 'border-orange-500/50 shadow-[0_0_50px_rgba(251,146,60,0.3)]' 
                      : 'border-gray-500/30 hover:border-orange-400/50'
                  } transition-all duration-300 backdrop-blur-lg relative overflow-hidden`}>
                    
                    {tier.popular && (
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500"></div>
                    )}
                    
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-none px-4 py-1">
                          <Star className="w-4 h-4 mr-1" />
                          En Popüler
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-4 pt-8">
                      <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${tier.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <tier.icon className="w-10 h-10 text-white" />
                      </div>
                      
                      <CardTitle className="text-2xl text-white group-hover:text-orange-400 transition-colors duration-300">
                        {tier.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 font-medium">
                        {tier.subtitle}
                      </CardDescription>
                      
                      <div className="mt-4">
                        <div className="text-4xl font-bold text-white">{tier.price}</div>
                        <div className="text-gray-400">tek seferlik</div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0 pb-8">
                      <ul className="space-y-3 mb-8">
                        {tier.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-gray-300">
                            <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className={`w-full bg-gradient-to-r ${tier.color} hover:shadow-lg text-white font-semibold py-3 rounded-xl transition-all duration-300`}
                        onClick={() => {
                          form.setValue("katilimTipi", tier.id);
                          document.getElementById('membershipForm')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <Zap className="w-5 h-5 mr-2" />
                        Seç ve Katıl
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            id="membershipForm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-black/70 via-red-950/10 to-black/70 border-2 border-red-500/40 backdrop-blur-xl shadow-[0_30px_100px_rgba(239,68,68,0.2)] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 to-red-500"></div>
              
              <CardHeader className="text-center pb-8 pt-12">
                <div className="flex items-center justify-center space-x-2 mb-6">
                  <Globe className="w-8 h-8 text-red-400" />
                  <Flag className="w-8 h-8 text-white" />
                  <Crown className="w-8 h-8 text-orange-400" />
                </div>
                
                <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
                  Harekete Katılım Formu
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg max-w-2xl mx-auto">
                  Türkiye'nin geleceğini şekillendiren büyük harekete katılmak için bilgilerinizi paylaşın
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-8 pb-12">
                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto">
                  {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        index <= currentStep 
                          ? 'bg-gradient-to-r from-red-500 to-orange-500 border-red-500 text-white' 
                          : 'border-gray-600 text-gray-400'
                      }`}>
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div className={`text-sm mt-2 transition-colors duration-300 ${
                        index <= currentStep ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`absolute h-0.5 w-16 mt-6 transition-colors duration-300 ${
                          index < currentStep ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gray-600'
                        }`} style={{ left: `${((index + 1) / steps.length) * 100}%` }} />
                      )}
                    </div>
                  ))}
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="ad"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-medium flex items-center">
                              <Users className="w-4 h-4 mr-2 text-red-400" />
                              Ad Soyad
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Adınız ve soyadınız" 
                                {...field} 
                                className="bg-black/50 border-red-500/30 text-white placeholder:text-gray-400 focus:border-red-400 transition-colors h-12 touch-target"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-medium flex items-center">
                              <Mail className="w-4 h-4 mr-2 text-red-400" />
                              E-posta Adresi
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="ornek@email.com" 
                                type="email"
                                {...field} 
                                className="bg-black/50 border-red-500/30 text-white placeholder:text-gray-400 focus:border-red-400 transition-colors h-12 touch-target"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="telefon"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-medium flex items-center">
                              <Phone className="w-4 h-4 mr-2 text-red-400" />
                              Telefon
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="05XX XXX XX XX" 
                                {...field} 
                                className="bg-black/50 border-red-500/30 text-white placeholder:text-gray-400 focus:border-red-400 transition-colors h-12 touch-target"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="sehir"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-medium flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-red-400" />
                              Şehir
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Şehriniz" 
                                {...field} 
                                className="bg-black/50 border-red-500/30 text-white placeholder:text-gray-400 focus:border-red-400 transition-colors h-12 touch-target"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="katilimTipi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-medium flex items-center">
                            <Target className="w-4 h-4 mr-2 text-red-400" />
                            Katılım Tipi
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-black/50 border-red-500/30 text-white focus:border-red-400 h-12 touch-target">
                                <SelectValue placeholder="Katılım tipinizi seçin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-black/90 border-red-500/30">
                              <SelectItem value="destekci">Destekçi (1 TL)</SelectItem>
                              <SelectItem value="aktif">Aktif Üye (25 TL)</SelectItem>
                              <SelectItem value="koordinator">Koordinatör (100 TL)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mesaj"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-medium flex items-center">
                            <Heart className="w-4 h-4 mr-2 text-red-400" />
                            Harekete Katılma Motivasyonunuz (İsteğe bağlı)
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Bu harekete neden katılmak istediğinizi kısaca paylaşın..."
                              {...field} 
                              className="bg-black/50 border-red-500/30 text-white placeholder:text-gray-400 focus:border-red-400 transition-colors min-h-24 touch-target"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="pt-6">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-red-600 via-orange-600 to-red-600 hover:from-red-700 hover:via-orange-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:shadow-[0_0_50px_rgba(239,68,68,0.5)] disabled:opacity-50 disabled:cursor-not-allowed text-lg touch-target button-mobile"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                            Harekete Katılıyorsunuz...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <Rocket className="w-6 h-6 mr-3" />
                            <Sparkles className="w-5 h-5 mr-2" />
                            CUMHURİYETE KATIL
                            <Sparkles className="w-5 h-5 ml-2" />
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Financial Transparency Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mb-16"
          >
            <Card className="backdrop-blur-xl bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80 border border-red-500/40 sm:border-2 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.2)] sm:shadow-[0_0_50px_rgba(239,68,68,0.3)]">
              <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-3 sm:mb-4">
                  Mali Şeffaflık Sistemi
                </CardTitle>
                <CardDescription className="text-gray-300 text-sm sm:text-lg px-2">
                  Platform gelir ve giderlerinin canlı takibi - Halka tamamen şeffaf sistem
                </CardDescription>
                <div className="flex flex-col sm:flex-row items-center justify-center mt-3 sm:mt-4 space-y-2 sm:space-y-0">
                  <div className="flex items-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
                    <span className="text-green-400 text-xs sm:text-sm font-medium">Canlı Veriler</span>
                  </div>
                  <span className="text-gray-400 text-xs sm:ml-2">Son güncelleme: {new Date().toLocaleTimeString('tr-TR')}</span>
                </div>
              </CardHeader>
              <CardContent>
                {transactionLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin mr-3"></div>
                    <span className="text-gray-400">Mali veriler yükleniyor...</span>
                  </div>
                ) : (
                  <div className="overflow-x-auto -mx-4 sm:mx-0">
                    <Table className="min-w-full">
                      <TableHeader>
                        <TableRow className="border-red-500/30 hover:bg-red-500/10">
                          <TableHead className="text-red-400 font-bold text-xs sm:text-sm px-2 sm:px-4">Tarih</TableHead>
                          <TableHead className="text-red-400 font-bold text-xs sm:text-sm px-2 sm:px-4">Kategori</TableHead>
                          <TableHead className="text-red-400 font-bold text-xs sm:text-sm px-2 sm:px-4 hidden sm:table-cell">Açıklama</TableHead>
                          <TableHead className="text-red-400 font-bold text-xs sm:text-sm px-2 sm:px-4">Tür</TableHead>
                          <TableHead className="text-red-400 font-bold text-xs sm:text-sm text-right px-2 sm:px-4">Tutar</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactions.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                              Henüz mali işlem kaydı bulunmuyor
                            </TableCell>
                          </TableRow>
                        ) : (
                          transactions.map((transaction: any) => (
                            <TableRow key={transaction.id} className="border-red-500/20 hover:bg-red-500/5 transition-colors">
                              <TableCell className="text-gray-300 font-medium">
                                {new Date(transaction.transactionDate).toLocaleDateString('tr-TR')}
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant="outline" 
                                  className={`
                                    ${transaction.category === 'sunucu' ? 'border-blue-500/50 text-blue-400 bg-blue-500/10' : ''}
                                    ${transaction.category === 'domain' ? 'border-purple-500/50 text-purple-400 bg-purple-500/10' : ''}
                                    ${transaction.category === 'eğitim' ? 'border-green-500/50 text-green-400 bg-green-500/10' : ''}
                                    ${transaction.category === 'entegrasyon' ? 'border-orange-500/50 text-orange-400 bg-orange-500/10' : ''}
                                    ${transaction.category === 'bağış' ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10' : ''}
                                    capitalize font-medium
                                  `}
                                >
                                  {transaction.category}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-gray-300 max-w-xs truncate">
                                {transaction.description}
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant={transaction.type === 'income' ? 'default' : 'destructive'}
                                  className={`
                                    ${transaction.type === 'income' 
                                      ? 'bg-green-500/20 text-green-400 border-green-500/50' 
                                      : 'bg-red-500/20 text-red-400 border-red-500/50'
                                    }
                                    font-medium
                                  `}
                                >
                                  {transaction.type === 'income' ? 'Gelir' : 'Gider'}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right font-bold">
                                <span className={transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}>
                                  {transaction.type === 'income' ? '+' : '-'}{(transaction.amount / 100).toLocaleString('tr-TR')} ₺
                                </span>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
                
                {/* Financial Summary */}
                {transactions.length > 0 && (
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="backdrop-blur-sm bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                      <h4 className="text-green-400 font-bold text-lg mb-2">Toplam Gelir</h4>
                      <p className="text-green-300 text-2xl font-bold">
                        +{(transactions
                          .filter((t: any) => t.type === 'income')
                          .reduce((sum: number, t: any) => sum + (t.amount || 0), 0) / 100)
                          .toLocaleString('tr-TR')} ₺
                      </p>
                    </div>
                    <div className="backdrop-blur-sm bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
                      <h4 className="text-red-400 font-bold text-lg mb-2">Toplam Gider</h4>
                      <p className="text-red-300 text-2xl font-bold">
                        -{(transactions
                          .filter((t: any) => t.type === 'expense')
                          .reduce((sum: number, t: any) => sum + (t.amount || 0), 0) / 100)
                          .toLocaleString('tr-TR')} ₺
                      </p>
                    </div>
                    <div className="backdrop-blur-sm bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
                      <h4 className="text-blue-400 font-bold text-lg mb-2">Net Durum</h4>
                      <p className={`text-2xl font-bold ${
                        (transactions.filter((t: any) => t.type === 'income').reduce((sum: number, t: any) => sum + t.amount, 0) - 
                         transactions.filter((t: any) => t.type === 'expense').reduce((sum: number, t: any) => sum + t.amount, 0)) >= 0 
                         ? 'text-green-300' : 'text-red-300'
                      }`}>
                        {((transactions.filter((t: any) => t.type === 'income').reduce((sum: number, t: any) => sum + t.amount, 0) - 
                           transactions.filter((t: any) => t.type === 'expense').reduce((sum: number, t: any) => sum + t.amount, 0)) / 100)
                           .toLocaleString('tr-TR', { signDisplay: 'always' })} ₺
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="text-center"
          >
            <div className="backdrop-blur-xl bg-gradient-to-br from-red-500/20 via-orange-500/10 to-red-500/20 border border-red-500/40 sm:border-2 rounded-2xl sm:rounded-3xl p-6 sm:p-12 max-w-4xl mx-auto">
              <Award className="w-12 h-12 sm:w-16 sm:h-16 text-red-400 mx-auto mb-4 sm:mb-6" />
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Geleceğin İnşasında Rol Al
              </h3>
              <p className="text-gray-300 text-base sm:text-xl mb-6 sm:mb-8 leading-relaxed px-2">
                Her katılım, Türkiye'nin daha güçlü bir geleceğe adım atmasıdır. 
                Sen de bu büyük dönüşümün bir parçası ol ve tarih yazanlar arasında yer al.
              </p>
              <div className="flex items-center justify-center space-x-3 sm:space-x-4 text-red-400">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                <span className="text-base sm:text-lg font-medium">Birlikte Güçlüyüz</span>
                <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Global Translation System */}
      <GlobalTranslator />
    </div>
  );
}