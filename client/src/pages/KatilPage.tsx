import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import ModernLayout from "@/components/ModernLayout";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { ModernTechButton } from "@/components/ModernTechButton";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  BarChart4,
  ArrowUpRight, 
  ArrowDownRight,
  Users,
  Heart,
  HandHeart,
  ClipboardCheck,
  Flag,
  Share2
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
  
  // Community solidarity progress data
  const [participantGoal] = useState(10000000); // 10 million participants goal
  const [currentParticipants] = useState(0); // Current participant count
  const [projectGoal] = useState(100); // Project completion goal (100%)
  const [currentProjects] = useState(0); // Current project completion percentage
  const [volunteerGoal] = useState(1000000); // Volunteer goal
  const [currentVolunteers] = useState(0); // Current volunteer count
  
  // Calculate percentage for progress bars
  const calculatePercentage = (current: number, goal: number) => {
    return Math.min(Math.round((current / goal) * 100), 100);
  };
  
  // Para biçimlendirme fonksiyonu
  const formatCurrency = (amount: number) => {
    return `₺${(amount / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  
  // Gelir-gider bilgileri - Henüz işlem yok
  const incomeData = [
    { id: 1, date: '19 Mayıs 2025', description: 'Platformun Başlangıç Tarihi', amount: 0, type: 'income' },
  ];
  
  const expenseData = [
    { id: 1, date: '19 Mayıs 2025', description: 'Platformun Başlangıç Tarihi', amount: 0, type: 'expense' },
  ];
  
  // Toplam gelir/gider hesaplamaları
  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenseData.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpense;
  
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
    // Initialize audio system
    initAudio();
    
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
  }, [i18n.language]);
  
  const handleToggleAudio = () => {
    playSoundtrack();
  };
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    // Submit form
    try {
      // Here you would normally submit the form data to the backend
      
      toast({
        title: "Başarıyla gönderildi!",
        description: "Katılım talebiniz alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.",
        variant: "default",
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      toast({
        title: "Hata",
        description: "Bir sorun oluştu. Lütfen daha sonra tekrar deneyiniz.",
        variant: "destructive",
      });
    }
  }
  
  // Sayfa içeriği - erişilebilirlik okuyucusu için
  const pageContent = `Katılım ve Bağış Sayfası. 
    Bu sayfada Cumhuriyetin Halk ile Güncellenme Platformu'na katılabilir veya bağış yapabilirsiniz. 
    Platformumuza katılmak için formu doldurup 1 TL'lik sembolik kayıt ücretini ödeyebilirsiniz. 
    Bağış yapmak için bağış sekmesini kullanabilirsiniz. 
    Şeffaf gelir-gider tablosunu da buradan görüntüleyebilirsiniz.`;

  return (
    <ModernLayout 
      audioKey="katil" 
      showBackButton={true} 
      pageName="Katılım & Bağış"
      pageContent={pageContent}
    >
      <div className="w-full max-w-3xl mx-auto">
        {/* Bağış Uyarı Mesajı */}
        <div className="bg-red-900/40 border-2 border-red-600 rounded-lg p-6 mb-8 text-center animate-pulse">
          <h2 className="text-2xl-responsive font-bold text-white mb-4">
            ⚠️ BAĞIŞ İŞLEMLERİ ŞU AN İÇİN YAPILAMAMAKTADIR ⚠️
          </h2>
          <p className="text-lg-responsive text-gray-200 font-semibold mb-4">
            HALK BANKALARI, BU ALANLARA TÜRK MİLLETİ İÇİN BİR İBAN BIRAKACAKTIR.
          </p>
          <p className="text-lg-responsive text-gray-200 font-semibold">
            HALK İÇİN, HALKIN ADINA.
          </p>
        </div>
        
        {/* Community Solidarity Progress Visualization */}
        <div className="mb-10">
          <h2 className="text-2xl-responsive font-bold text-white mb-6 text-center">HALK DAYANIŞMASI İLERLEYİŞİ</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Participant Progress */}
            <div className="bg-gradient-to-br from-blue-950/50 to-blue-900/20 backdrop-blur-sm rounded-lg p-5 border border-blue-700/30">
              <div className="flex items-center mb-3">
                <Users className="h-6 w-6 text-blue-400 mr-3" />
                <h3 className="text-lg-responsive font-semibold text-blue-300">Vatandaş Katılımı</h3>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-300">{currentParticipants.toLocaleString('tr-TR')} vatandaş</span>
                <span className="text-gray-400">{participantGoal.toLocaleString('tr-TR')} hedef</span>
              </div>
              <Progress 
                value={calculatePercentage(currentParticipants, participantGoal)} 
                className="h-3 bg-blue-950/70"
              />
              <p className="text-gray-400 text-sm mt-2 text-right">
                %{calculatePercentage(currentParticipants, participantGoal)} tamamlandı
              </p>
            </div>
            
            {/* Project Progress */}
            <div className="bg-gradient-to-br from-amber-950/50 to-amber-900/20 backdrop-blur-sm rounded-lg p-5 border border-amber-700/30">
              <div className="flex items-center mb-3">
                <Flag className="h-6 w-6 text-amber-400 mr-3" />
                <h3 className="text-lg-responsive font-semibold text-amber-300">Görev Tamamlanma</h3>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-300">{currentProjects}% tamamlandı</span>
                <span className="text-gray-400">{projectGoal}% hedef</span>
              </div>
              <Progress 
                value={currentProjects} 
                className="h-3 bg-amber-950/70"
              />
              <p className="text-gray-400 text-sm mt-2 text-right">
                {currentProjects} görev tamamlandı
              </p>
            </div>
            
            {/* Volunteer Progress */}
            <div className="bg-gradient-to-br from-green-950/50 to-green-900/20 backdrop-blur-sm rounded-lg p-5 border border-green-700/30">
              <div className="flex items-center mb-3">
                <HandHeart className="h-6 w-6 text-green-400 mr-3" />
                <h3 className="text-lg-responsive font-semibold text-green-300">Gönüllü Katılımı</h3>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-300">{currentVolunteers.toLocaleString('tr-TR')} gönüllü</span>
                <span className="text-gray-400">{volunteerGoal.toLocaleString('tr-TR')} hedef</span>
              </div>
              <Progress 
                value={calculatePercentage(currentVolunteers, volunteerGoal)} 
                className="h-3 bg-green-950/70"
              />
              <p className="text-gray-400 text-sm mt-2 text-right">
                %{calculatePercentage(currentVolunteers, volunteerGoal)} tamamlandı
              </p>
            </div>
            
            {/* Knowledge Sharing Progress */}
            <div className="bg-gradient-to-br from-red-950/50 to-red-900/20 backdrop-blur-sm rounded-lg p-5 border border-red-700/30">
              <div className="flex items-center mb-3">
                <Share2 className="h-6 w-6 text-red-400 mr-3" />
                <h3 className="text-lg-responsive font-semibold text-red-300">Harekete Geçen İller</h3>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-300">72 il aktif</span>
                <span className="text-gray-400">81 il hedef</span>
              </div>
              <Progress 
                value={Math.round((72 / 81) * 100)} 
                className="h-3 bg-red-950/70"
              />
              <p className="text-gray-400 text-sm mt-2 text-right">
                %{Math.round((72 / 81) * 100)} tamamlandı
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-lg-responsive text-gray-300 mb-3">
              Birlik içinde, Türkiye'nin geleceğini şekillendiren harekete sen de katıl!
            </p>
            <ModernTechButton 
              color="red"
              size="lg"
              onClick={() => document.getElementById('katilimFormu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              HAREKETE KATIL
            </ModernTechButton>
          </div>
        </div>
        
        <Tabs defaultValue="katilim" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 min-h-[44px]">
            <TabsTrigger 
              value="katilim"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-700 data-[state=active]:to-amber-600 data-[state=active]:text-white text-base-responsive min-h-[44px] py-2"
            >
              KATILIM
            </TabsTrigger>
            <TabsTrigger 
              value="bagis"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-700 data-[state=active]:to-amber-600 data-[state=active]:text-white text-base-responsive min-h-[44px] py-2"
            >
              BAĞIŞ YAP
            </TabsTrigger>
            <TabsTrigger 
              value="financial"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-700 data-[state=active]:to-amber-600 data-[state=active]:text-white text-base-responsive min-h-[44px] py-2"
            >
              ŞEFFAF GELİR-GİDER
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="katilim" className="mt-2">
            <div className="text-center mb-6">
              <h3 className="text-xl-responsive font-semibold text-amber-400 mb-4">
                Cumhuriyet Güncellenme Platformu Katılımı
              </h3>
              <p className="text-gray-200 text-base-responsive mb-4">
                Platformumuza katılmak için aşağıdaki formu doldurduktan sonra
                1 TL'lik sembolik kayıt ücretini ödemeniz gerekmektedir.
              </p>
              <div className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-4 mb-6">
                <p className="text-amber-300 text-base-responsive">
                  Kayıt ücreti, platform maliyetlerinin karşılanması ve sisteme olan bağlılığın sembolik bir göstergesi olarak alınmaktadır.
                </p>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="ad"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-base-responsive">Ad Soyad</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ad ve soyadınızı giriniz" 
                          {...field} 
                          className="bg-black/50 border-amber-500 text-white text-base-responsive h-12 min-h-[44px]"
                        />
                      </FormControl>
                      <FormMessage className="text-base-responsive" />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-base-responsive">E-posta Adresi</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="ornekmail@adres.com" 
                            type="email"
                            {...field} 
                            className="bg-black/50 border-amber-500 text-white text-base-responsive h-12 min-h-[44px]"
                          />
                        </FormControl>
                        <FormMessage className="text-base-responsive" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="telefon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-base-responsive">Telefon</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="05XX XXX XX XX" 
                            {...field} 
                            className="bg-black/50 border-amber-500 text-white text-base-responsive h-12 min-h-[44px]"
                          />
                        </FormControl>
                        <FormMessage className="text-base-responsive" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <FormField
                    control={form.control}
                    name="sehir"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-base-responsive">Şehir</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Yaşadığınız şehir" 
                            {...field} 
                            className="bg-black/50 border-amber-500 text-white text-base-responsive h-12 min-h-[44px]"
                          />
                        </FormControl>
                        <FormMessage className="text-base-responsive" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="katilimTipi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-base-responsive">Katılım Tipi</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-black/50 border-amber-500 text-white text-base-responsive h-12 min-h-[44px]">
                              <SelectValue placeholder="Katılım tipi seçin" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-black/90 border-amber-500 text-white text-base-responsive">
                            <SelectItem value="gonullu" className="min-h-[44px] flex items-center">Gönüllü Katılımcı</SelectItem>
                            <SelectItem value="teknik" className="min-h-[44px] flex items-center">Teknik Ekip</SelectItem>
                            <SelectItem value="organizasyon" className="min-h-[44px] flex items-center">Organizasyon Ekibi</SelectItem>
                            <SelectItem value="icerik" className="min-h-[44px] flex items-center">İçerik Üretimi</SelectItem>
                            <SelectItem value="diger" className="min-h-[44px] flex items-center">Diğer</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-base-responsive" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="mesaj"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-base-responsive">Mesajınız (Opsiyonel)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Katılım amacınızı, yeteneklerinizi veya sorularınızı yazabilirsiniz." 
                          {...field} 
                          className="bg-black/50 border-amber-500 text-white text-base-responsive h-32"
                        />
                      </FormControl>
                      <FormMessage className="text-base-responsive" />
                    </FormItem>
                  )}
                />
                
                <div className="pt-4">
                  <ModernTechButton 
                    type="submit" 
                    variant="turkish"
                    size="xl"
                    glow="subtle"
                    border="glowing"
                    className="w-full text-lg-responsive font-bold min-h-[54px] py-3"
                  >
                    Bilgilerimi Kaydet ve Ödemeye Geç
                  </ModernTechButton>
                </div>
              </form>
            </Form>
            
            <div className="mt-6 pt-6 border-t border-amber-500/30">
              <h4 className="text-xl-responsive font-semibold text-amber-400 mb-4 text-center">
                Kayıt Ücreti Ödemesi
              </h4>
              <div className="bg-black/40 backdrop-blur-sm border border-amber-500/50 rounded-lg p-4 md:p-5">
                <div className="mb-4 text-center">
                  <div className="inline-block bg-amber-900/50 px-4 py-3 rounded-lg border border-amber-500/30">
                    <span className="text-white text-base-responsive">Katılım ücreti:</span>
                    <span className="text-amber-400 font-bold text-xl-responsive ml-2">1 TL</span>
                  </div>
                </div>
                
                <PaymentForm 
                  isRegistrationFee={true}
                  fixedAmount={1}
                  fixedDescription="Cumhuriyet Güncellenme Platformu Kayıt Ücreti"
                />
                
                <div className="mt-3 text-center">
                  <p className="text-gray-300 text-base-responsive italic">
                    * Ödeme bilgileriniz güvenli bir şekilde işlenmektedir. Kredi kartı veya banka bilgileriniz sistemimizde saklanmaz.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="bagis" className="mt-2">
            <div className="text-center mb-4">
              <h3 className="text-xl-responsive font-semibold text-amber-400 mb-2">
                Cumhuriyeti Güncellemek İçin Bağış Yap
              </h3>
              <p className="text-gray-200 text-base-responsive">
                Bağışınız "Medeniyet için yetecek kadar" hedefimize katkı sağlayacak
              </p>
            </div>
            
            <PaymentForm />
          </TabsContent>
          
          <TabsContent value="financial" className="mt-2">
            <div className="text-center mb-6">
              <h3 className="text-xl-responsive font-semibold text-amber-400 mb-2">
                Şeffaf Gelir-Gider Tablosu
              </h3>
              <p className="text-gray-200 text-base-responsive">
                Platformun tüm finansal faaliyetleri şeffaf bir şekilde yönetilmektedir
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center md:space-x-4 mb-4">
              <div className="bg-gradient-to-r from-green-900/50 to-green-950/30 p-4 rounded-lg flex items-center mb-3 md:mb-0 w-full md:w-auto min-h-[60px]">
                <ArrowUpRight className="text-green-400 mr-3 h-6 w-6" />
                <div>
                  <p className="text-gray-300 text-base-responsive">Toplam Gelir</p>
                  <p className="text-green-400 font-bold text-base-responsive">{formatCurrency(totalIncome)}</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-red-900/50 to-red-950/30 p-4 rounded-lg flex items-center mb-3 md:mb-0 w-full md:w-auto min-h-[60px]">
                <ArrowDownRight className="text-red-400 mr-3 h-6 w-6" />
                <div>
                  <p className="text-gray-300 text-base-responsive">Toplam Gider</p>
                  <p className="text-red-400 font-bold text-base-responsive">{formatCurrency(totalExpense)}</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-900/50 to-blue-950/30 p-4 rounded-lg flex items-center w-full md:w-auto min-h-[60px]">
                <BarChart4 className="text-blue-400 mr-3 h-6 w-6" />
                <div>
                  <p className="text-gray-300 text-base-responsive">Mevcut Bakiye</p>
                  <p className={`font-bold text-base-responsive ${balance >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
                    {formatCurrency(balance)}
                  </p>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="income">
              <TabsList className="grid w-full grid-cols-2 mb-4 min-h-[44px]">
                <TabsTrigger value="income" className="text-base-responsive min-h-[44px] py-2">
                  Gelirler
                </TabsTrigger>
                <TabsTrigger value="expense" className="text-base-responsive min-h-[44px] py-2">
                  Giderler
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="income">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-amber-400 text-base-responsive">Tarih</TableHead>
                        <TableHead className="text-amber-400 text-base-responsive">Açıklama</TableHead>
                        <TableHead className="text-amber-400 text-right text-base-responsive">Tutar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {incomeData.map((item) => (
                        <TableRow key={item.id} className="border-b border-amber-900/20">
                          <TableCell className="text-gray-300 text-base-responsive py-3">{item.date}</TableCell>
                          <TableCell className="text-gray-300 text-base-responsive py-3">{item.description}</TableCell>
                          <TableCell className="text-green-400 text-right text-base-responsive py-3">{formatCurrency(item.amount)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="expense">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-amber-400 text-base-responsive">Tarih</TableHead>
                        <TableHead className="text-amber-400 text-base-responsive">Açıklama</TableHead>
                        <TableHead className="text-amber-400 text-right text-base-responsive">Tutar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {expenseData.map((item) => (
                        <TableRow key={item.id} className="border-b border-amber-900/20">
                          <TableCell className="text-gray-300 text-base-responsive py-3">{item.date}</TableCell>
                          <TableCell className="text-gray-300 text-base-responsive py-3">{item.description}</TableCell>
                          <TableCell className="text-red-400 text-right text-base-responsive py-3">{formatCurrency(item.amount)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-10 mb-6">
          <ModernTechButton 
            variant="futuristic"
            glow="subtle"
            border="subtle"
            onClick={() => navigate("/turkiye")}
            className="text-base-responsive min-h-[50px] py-3"
          >
            ◀ Türkiye Sayfasına Dön
          </ModernTechButton>
          
          <ModernTechButton 
            variant="primary"
            glow="subtle"
            border="glowing"
            onClick={() => navigate("/")}
            className="text-base-responsive min-h-[50px] py-3"
          >
            Ana Sayfa
          </ModernTechButton>
        </div>
      </div>
    </ModernLayout>
  );
}