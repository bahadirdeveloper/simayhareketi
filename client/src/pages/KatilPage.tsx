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
  Heart,
  HandHeart,
  Target,
  Trophy,
  MapPin,
  Mail,
  Phone,
  Clock,
  TrendingUp,
  Volume2,
  VolumeX,
  ArrowLeft,
  CheckCircle,
  Plus,
  User,
  MessageSquare,
  Globe,
  Calendar,
  Shield,
  Crown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ModernLayout from "@/components/ModernLayout";

const formSchema = z.object({
  ad: z.string().min(2, {
    message: "Ad en az 2 karakter olmalıdır.",
  }),
  email: z.string().email({
    message: "Geçerli bir email adresi giriniz.",
  }),
  telefon: z.string().min(10, {
    message: "Telefon numarası en az 10 karakter olmalıdır.",
  }),
  sehir: z.string().min(2, {
    message: "Şehir en az 2 karakter olmalıdır.",
  }),
  katilimTipi: z.string().min(1, {
    message: "Katılım tipi seçiniz.",
  }),
  mesaj: z.string().optional(),
});

export default function KatilPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeTasks: 0,
    completedTasks: 0,
    totalDonations: 0
  });
  const [transactions, setTransactions] = useState<any[]>([]);
  const { toast } = useToast();

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

  const fetchLiveData = async () => {
    try {
      const response = await fetch("/api/stats/live", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setStats({
          totalMembers: data.participants || 0, // Gerçek katılımcı sayısı (üye)
          activeTasks: data.activeProjects || 0,
          completedTasks: data.volunteers || 0,
          totalDonations: data.totalAmount || 0
        });
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/transactions", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        if (data && data.transactions && Array.isArray(data.transactions)) {
          setTransactions(data.transactions.slice(0, 5));
        }
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

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
      
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }, 2000);
  }

  const katilimTipleri = [
    { value: "destekci", label: "Destekçi - Temel Katılım" },
    { value: "gonullu", label: "Gönüllü - Aktif Katılım" },
    { value: "organizator", label: "Organizatör - Liderlik" },
    { value: "koordinator", label: "Koordinatör - Yönetim" }
  ];

  return (
    <ModernLayout 
      audioKey="katil"
      showBackButton={true}
      pageContent="Türkiye'nin geleceği için harekete katılın. Birlikte güçlüyüz, birlikte başaracağız."
      pageName="Harekete Katıl"
    >
      <div className="w-full max-w-6xl mx-auto space-y-8">
        
        {/* Confetti Effect */}
        <AnimatePresence>
          {showConfetti && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 pointer-events-none z-50"
            >
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-red-500 rounded-full"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: -10,
                    rotate: 0,
                  }}
                  animate={{
                    y: window.innerHeight + 10,
                    rotate: 360,
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    ease: "linear",
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <div className="text-center space-y-6 bg-gradient-to-r from-red-600 to-red-800 rounded-3xl p-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              HAREKETE KATIL
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
              Türkiye'nin diriliş yolculuğunda sen de yer al. Birlikte daha güçlü bir gelecek inşa edelim.
            </p>
          </motion.div>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border-2 border-blue-500/30 rounded-2xl p-6 text-center"
          >
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.totalMembers?.toLocaleString() || 0}</div>
            <div className="text-blue-300 text-sm">Toplam Üye</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900 border-2 border-orange-500/30 rounded-2xl p-6 text-center"
          >
            <Target className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.activeTasks || 0}</div>
            <div className="text-orange-300 text-sm">Aktif Görev</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900 border-2 border-green-500/30 rounded-2xl p-6 text-center"
          >
            <Trophy className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.completedTasks || 0}</div>
            <div className="text-green-300 text-sm">Tamamlanan</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900 border-2 border-purple-500/30 rounded-2xl p-6 text-center"
          >
            <Heart className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{formatCurrency(stats.totalDonations || 0)}</div>
            <div className="text-purple-300 text-sm">Toplam Destek</div>
          </motion.div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="katil" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900 border border-gray-700">
            <TabsTrigger value="katil" className="data-[state=active]:bg-red-600">
              <User className="w-4 h-4 mr-2" />
              Katılım Formu
            </TabsTrigger>
            <TabsTrigger value="canlı" className="data-[state=active]:bg-red-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Canlı Veriler
            </TabsTrigger>
          </TabsList>

          <TabsContent value="katil" className="space-y-6">
            {/* Premium Paketler Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Temel Paket */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-600 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl font-bold">TEMEL PAKET</CardTitle>
                    <CardDescription className="text-blue-200">
                      Harekete temel katılım + kimlik belgesi
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-white mb-4">₺50</div>
                    <ul className="text-blue-200 space-y-2 text-sm mb-6">
                      <li>✓ Hareket üyeliği</li>
                      <li>✓ Dijital kimlik belgesi</li>
                      <li>✓ Temel görevlere erişim</li>
                    </ul>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => handlePackageSelect('temel', 50)}
                    >
                      Seç
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Premium Paket */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1 rounded-full text-xs font-bold">
                    ÖNERİLEN
                  </span>
                </div>
                <Card className="bg-gradient-to-br from-green-900 to-green-700 border-green-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl font-bold">PREMİUM PAKET</CardTitle>
                    <CardDescription className="text-green-200">
                      Üyelik paketi + otomatik TC kimlik belgesi
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-white mb-4">₺150</div>
                    <ul className="text-green-200 space-y-2 text-sm mb-6">
                      <li>✓ Tüm temel özellikler</li>
                      <li>✓ Otomatik TC kimlik doğrulama</li>
                      <li>✓ Premium görevlere erişim</li>
                      <li>✓ Öncelikli destek</li>
                    </ul>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handlePackageSelect('premium', 150)}
                    >
                      Seç
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Elite Paket */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <Card className="bg-gradient-to-br from-purple-900 to-purple-700 border-purple-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl font-bold">ELİTE PAKET</CardTitle>
                    <CardDescription className="text-purple-200">
                      Liderlik paketi + özel yetkiler
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-white mb-4">₺300</div>
                    <ul className="text-purple-200 space-y-2 text-sm mb-6">
                      <li>✓ Tüm premium özellikler</li>
                      <li>✓ Liderlik görevleri</li>
                      <li>✓ Organizatör yetkileri</li>
                      <li>✓ VIP destek</li>
                    </ul>
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => handlePackageSelect('elite', 300)}
                    >
                      Seç
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <HandHeart className="w-6 h-6 text-red-500" />
                  Harekete Katılım Formu
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Türkiye'nin geleceği için bugün harekete geç. Bilgilerini doldur ve sen de bu büyük misyonun parçası ol.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="ad"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Ad Soyad</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Adınız ve soyadınız" 
                                {...field}
                                className="bg-gray-800 border-gray-600 text-white"
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
                            <FormLabel className="text-white">E-posta</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="ornek@email.com" 
                                type="email"
                                {...field}
                                className="bg-gray-800 border-gray-600 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="telefon"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Telefon</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="0555 123 45 67" 
                                {...field}
                                className="bg-gray-800 border-gray-600 text-white"
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
                            <FormLabel className="text-white">Şehir</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Yaşadığınız şehir" 
                                {...field}
                                className="bg-gray-800 border-gray-600 text-white"
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
                        <FormItem className="relative">
                          <FormLabel className="text-white">Katılım Tipi</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-gray-800 border-gray-600 text-white relative">
                                <SelectValue placeholder="Katılım tipinizi seçin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent 
                              className="bg-gray-800 border-gray-600 text-white shadow-lg z-[999]"
                              position="popper"
                              side="bottom"
                              align="start"
                              sideOffset={4}
                            >
                              {katilimTipleri.map((tip) => (
                                <SelectItem key={tip.value} value={tip.value} className="text-white hover:bg-gray-700 focus:bg-gray-700">
                                  {tip.label}
                                </SelectItem>
                              ))}
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
                          <FormLabel className="text-white">Mesajınız (İsteğe bağlı)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Türkiye'nin geleceği için neler yapmak istiyorsunuz?" 
                              className="bg-gray-800 border-gray-600 text-white min-h-24"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 text-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          Kaydediliyor...
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5 mr-2" />
                          Harekete Katıl
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="canlı" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    Son Katılımlar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <div>
                            <div className="text-white font-medium">Yeni Katılımcı</div>
                            <div className="text-gray-400 text-sm">Az önce katıldı</div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-600/20 text-green-300">
                          Aktif
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-400" />
                    Günlük Hedefler
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Yeni Üye Hedefi</span>
                        <span className="text-white">127/200</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${calculateProgress(127, 200)}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Görev Tamamlama</span>
                        <span className="text-white">89/150</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${calculateProgress(89, 150)}%` }}
                          transition={{ duration: 1, delay: 0.4 }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Topluluk Etkileşimi</span>
                        <span className="text-white">234/300</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${calculateProgress(234, 300)}%` }}
                          transition={{ duration: 1, delay: 0.6 }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </ModernLayout>
  );
}