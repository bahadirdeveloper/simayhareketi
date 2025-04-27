import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import SimpleFuturisticTurkish from "@/components/SimpleFuturisticTurkish";
import AudioControl from "@/components/AudioControl";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
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
  ArrowDownRight
} from 'lucide-react';
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
  
  // Para biçimlendirme fonksiyonu
  const formatCurrency = (amount: number) => {
    return `₺${(amount / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  
  // Gelir-gider bilgileri
  const incomeData = [
    { id: 1, date: '05 Şubat 2025', description: 'Bireysel Bağışlar', amount: 124500, type: 'income' },
    { id: 2, date: '12 Şubat 2025', description: 'Kurumsal Destekler', amount: 75000, type: 'income' },
    { id: 3, date: '18 Şubat 2025', description: 'Sertifika Gelirleri', amount: 53200, type: 'income' },
    { id: 4, date: '28 Şubat 2025', description: 'Etkinlik Katılım Gelirleri', amount: 32000, type: 'income' },
    { id: 5, date: '10 Mart 2025', description: 'Bireysel Bağışlar', amount: 98700, type: 'income' },
    { id: 6, date: '21 Mart 2025', description: 'Kurumsal Destekler', amount: 62500, type: 'income' },
    { id: 7, date: '05 Nisan 2025', description: 'Sertifika Gelirleri', amount: 47800, type: 'income' },
    { id: 8, date: '15 Nisan 2025', description: 'Bireysel Bağışlar', amount: 85300, type: 'income' },
  ];
  
  const expenseData = [
    { id: 1, date: '08 Şubat 2025', description: 'Server ve Altyapı Giderleri', amount: 35000, type: 'expense' },
    { id: 2, date: '15 Şubat 2025', description: 'Yazılım Geliştirme', amount: 87000, type: 'expense' },
    { id: 3, date: '22 Şubat 2025', description: 'Güvenlik Sistemleri', amount: 28500, type: 'expense' },
    { id: 4, date: '03 Mart 2025', description: 'İletişim ve Tanıtım', amount: 42300, type: 'expense' },
    { id: 5, date: '12 Mart 2025', description: 'Siber Güvenlik Testleri', amount: 18700, type: 'expense' },
    { id: 6, date: '25 Mart 2025', description: 'Server ve Altyapı Giderleri', amount: 32000, type: 'expense' },
    { id: 7, date: '08 Nisan 2025', description: 'Yazılım Geliştirme', amount: 95000, type: 'expense' },
    { id: 8, date: '17 Nisan 2025', description: 'İletişim ve Tanıtım', amount: 37500, type: 'expense' },
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
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background */}
      <SimpleFuturisticTurkish />
      
      <main className="container mx-auto px-4 pb-16 z-10 relative">
        <div className="max-w-3xl mx-auto pt-16 pb-20">
          {/* Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-amber-400 mb-6">
              KATILIM & BAĞIŞ
            </h1>
            <p className="text-xl text-gray-200 mb-12">
              Cumhuriyetin Halk ile Güncellenme Platformu'na katılın veya bağış yapın
            </p>
          </motion.div>
          
          {/* Tabs for Katilim and Bagis */}
          <motion.div
            className="bg-black/60 backdrop-blur-sm border-2 border-amber-500 rounded-lg p-8 shadow-[0_0_20px_rgba(255,215,0,0.2)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Tabs defaultValue="katilim" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger 
                  value="katilim"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-700 data-[state=active]:to-amber-600 data-[state=active]:text-white"
                >
                  KATILIM
                </TabsTrigger>
                <TabsTrigger 
                  value="bagis"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-700 data-[state=active]:to-amber-600 data-[state=active]:text-white"
                >
                  BAĞIŞ YAP
                </TabsTrigger>
                <TabsTrigger 
                  value="financial"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-700 data-[state=active]:to-amber-600 data-[state=active]:text-white"
                >
                  ŞEFFAF GELİR-GİDER
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="katilim" className="mt-2">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="ad"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Ad Soyad</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ad ve soyadınızı giriniz" 
                              {...field} 
                              className="bg-black/50 border-amber-500 text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">E-posta Adresi</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="ornekmail@adres.com" 
                                type="email"
                                {...field} 
                                className="bg-black/50 border-amber-500 text-white"
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
                                placeholder="05XX XXX XX XX" 
                                {...field} 
                                className="bg-black/50 border-amber-500 text-white"
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
                        name="sehir"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Şehir</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Yaşadığınız şehir" 
                                {...field} 
                                className="bg-black/50 border-amber-500 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="katilimTipi"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Katılım Tipi</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-black/50 border-amber-500 text-white">
                                  <SelectValue placeholder="Katılım tipi seçin" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-black/90 border-amber-500 text-white">
                                <SelectItem value="gonullu">Gönüllü Katılımcı</SelectItem>
                                <SelectItem value="teknik">Teknik Ekip</SelectItem>
                                <SelectItem value="organizasyon">Organizasyon Ekibi</SelectItem>
                                <SelectItem value="icerik">İçerik Üretimi</SelectItem>
                                <SelectItem value="diger">Diğer</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="mesaj"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Mesajınız (Opsiyonel)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Katılım amacınızı, yeteneklerinizi veya sorularınızı yazabilirsiniz." 
                              {...field} 
                              className="bg-black/50 border-amber-500 text-white h-32"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-red-700 to-amber-600 hover:from-amber-600 hover:to-red-700 text-white py-6 text-lg font-bold"
                      >
                        Katılım Başvurusunu Gönder
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="bagis" className="mt-2">
                <div className="space-y-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-amber-400 mb-2">
                      Cumhuriyeti Güncellemek İçin Bağış Yap
                    </h3>
                    <p className="text-gray-200">
                      Bağışınız "Medeniyet için yetecek kadar" hedefimize katkı sağlayacak
                    </p>
                  </div>
                  
                  <PaymentForm />
                  
                  <div className="text-gray-300 text-sm mt-4">
                    <p>
                      * Tüm ödemeler güvenli Stripe altyapısı ile gerçekleştirilmektedir.
                      Kredi kartı bilgileriniz hiçbir şekilde sunucularımızda saklanmaz.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              {/* Şeffaf Gelir-Gider Sekmesi */}
              <TabsContent value="financial" className="mt-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-b from-black/70 to-amber-950/20 backdrop-blur-sm rounded-lg border border-amber-500/30 p-6 shadow-lg"
                >
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4 readable-text">Finansal Şeffaflık İlkemiz</h3>
                    <p className="text-gray-300 mb-6 readable-text">
                      Cumhuriyet Güncellenme Platformu olarak, mali şeffaflığı temel ilkelerimizden biri olarak benimsiyoruz. 
                      Tüm gelir ve giderlerimizi detaylı bir şekilde raporlayarak, vatandaşlarımıza karşı hesap verebilirliğimizi 
                      en üst düzeyde tutuyoruz. Aşağıda, platformumuzun güncel gelir ve gider tablosunu görebilirsiniz.
                    </p>
                    
                    {/* Özet Finansal Görünüm */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gradient-to-r from-green-900/30 to-black/40 p-4 rounded-lg border border-green-500/30 flex items-center justify-between">
                        <div>
                          <h4 className="text-white text-sm mb-1">Toplam Gelir</h4>
                          <p className="text-green-400 text-xl font-medium">{formatCurrency(totalIncome)}</p>
                        </div>
                        <ArrowUpRight className="w-8 h-8 text-green-500/60" />
                      </div>
                      
                      <div className="bg-gradient-to-r from-red-900/30 to-black/40 p-4 rounded-lg border border-red-500/30 flex items-center justify-between">
                        <div>
                          <h4 className="text-white text-sm mb-1">Toplam Gider</h4>
                          <p className="text-red-400 text-xl font-medium">{formatCurrency(totalExpense)}</p>
                        </div>
                        <ArrowDownRight className="w-8 h-8 text-red-500/60" />
                      </div>
                      
                      <div className="bg-gradient-to-r from-amber-900/30 to-black/40 p-4 rounded-lg border border-amber-500/30 flex items-center justify-between">
                        <div>
                          <h4 className="text-white text-sm mb-1">Net Bakiye</h4>
                          <p className={`text-xl font-medium ${balance >= 0 ? 'text-amber-400' : 'text-red-400'}`}>
                            {formatCurrency(balance)}
                          </p>
                        </div>
                        <BarChart4 className="w-8 h-8 text-amber-500/60" />
                      </div>
                    </div>
                    
                    {/* Gelir-Gider Tabloları */}
                    <div className="mt-8">
                      <h3 className="text-2xl font-bold text-white mb-4 readable-text">Gelir ve Gider Detayları</h3>
                      
                      <Tabs defaultValue="income" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-black/30 border border-gray-800 mb-4">
                          <TabsTrigger value="income" className="data-[state=active]:bg-green-900/20 data-[state=active]:text-white">Gelirler</TabsTrigger>
                          <TabsTrigger value="expense" className="data-[state=active]:bg-red-900/20 data-[state=active]:text-white">Giderler</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="income">
                          <div className="overflow-x-auto">
                            <Table className="w-full border-collapse">
                              <TableHeader>
                                <TableRow className="border-b border-green-500/30 bg-black/40">
                                  <TableHead className="text-white font-medium py-3">Tarih</TableHead>
                                  <TableHead className="text-white font-medium py-3">Açıklama</TableHead>
                                  <TableHead className="text-white font-medium py-3 text-right">Tutar</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {incomeData.map((item) => (
                                  <TableRow 
                                    key={item.id} 
                                    className="border-b border-green-500/20 hover:bg-green-900/10"
                                  >
                                    <TableCell className="py-3 text-gray-300">{item.date}</TableCell>
                                    <TableCell className="py-3 text-gray-300">{item.description}</TableCell>
                                    <TableCell className="py-3 text-green-400 text-right font-medium">{formatCurrency(item.amount)}</TableCell>
                                  </TableRow>
                                ))}
                                <TableRow className="bg-green-900/20 border-t border-green-500/40">
                                  <TableCell colSpan={2} className="py-3 text-white font-bold">Toplam Gelir</TableCell>
                                  <TableCell className="py-3 text-green-400 text-right font-bold">₺{(totalIncome / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="expense">
                          <div className="overflow-x-auto">
                            <Table className="w-full border-collapse">
                              <TableHeader>
                                <TableRow className="border-b border-red-500/30 bg-black/40">
                                  <TableHead className="text-white font-medium py-3">Tarih</TableHead>
                                  <TableHead className="text-white font-medium py-3">Açıklama</TableHead>
                                  <TableHead className="text-white font-medium py-3 text-right">Tutar</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {expenseData.map((item) => (
                                  <TableRow 
                                    key={item.id} 
                                    className="border-b border-red-500/20 hover:bg-red-900/10"
                                  >
                                    <TableCell className="py-3 text-gray-300">{item.date}</TableCell>
                                    <TableCell className="py-3 text-gray-300">{item.description}</TableCell>
                                    <TableCell className="py-3 text-red-400 text-right font-medium">₺{(item.amount / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                  </TableRow>
                                ))}
                                <TableRow className="bg-red-900/20 border-t border-red-500/40">
                                  <TableCell colSpan={2} className="py-3 text-white font-bold">Toplam Gider</TableCell>
                                  <TableCell className="py-3 text-red-400 text-right font-bold">₺{(totalExpense / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                    
                    <div className="mt-10 text-center">
                      <h3 className="text-2xl font-bold text-white mb-4 readable-text">Mali Şeffaflık Taahhüdümüz</h3>
                      <p className="text-gray-300 mb-6 readable-text">
                        Cumhuriyet Güncellenme Platformu olarak, tüm mali faaliyetlerimizi şeffaf bir şekilde raporlamayı ve 
                        vatandaşlarımıza hesap verebilir olmayı taahhüt ediyoruz. Finansal tablolarımız düzenli olarak güncellenmekte 
                        ve herkesin erişimine açık tutulmaktadır.
                      </p>
                      
                      <div className="bg-gradient-to-r from-amber-950/30 to-black/30 p-4 rounded-lg border border-amber-500/30 mt-6">
                        <p className="text-white/90 italic readable-text">
                          "Şeffaflık, güvenin temelidir. Cumhuriyet'in güncellenmesi sürecinde, mali açıklık ve hesap verebilirlik 
                          en temel ilkelerimizdendir. Her kuruş, halkın emaneti olarak bilinçle ve sorumlulukla kullanılmaktadır."
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
          
          {/* Information section */}
          <motion.div
            className="mt-12 bg-black/60 backdrop-blur-sm border border-amber-500 rounded-lg p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-amber-400 mb-4">Neden Katılmalıyım?</h2>
            <div className="space-y-4 text-gray-200">
              <p>
                Cumhuriyetin Halk ile Güncellenme Platformu, Türkiye Cumhuriyeti'nin ikinci yüzyılında, 
                halkın katılımıyla birlikte geleceği şekillendirmeyi amaçlar.
              </p>
              <p>
                Platformumuzda yer alarak:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cumhuriyetin yeni vizyonunun oluşturulmasına katkıda bulunabilirsiniz</li>
                <li>Toplumsal sorunlara çözüm önerilerinizi paylaşabilirsiniz</li>
                <li>Alanınızdaki uzmanlığınızı toplumsal faydaya dönüştürebilirsiniz</li>
                <li>Geleceğin Türkiyesi'nin inşasında söz sahibi olabilirsiniz</li>
              </ul>
            </div>
          </motion.div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-center mt-10 gap-4">
            <Button 
              variant="outline"
              className="border-amber-500 text-amber-400 hover:bg-amber-900/20"
              onClick={() => navigate("/turkiye")}
            >
              ◀ Türkiye Sayfasına Dön
            </Button>
            
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate("/")}
            >
              🏠 Ana Sayfa
            </Button>
          </div>
        </div>
      </main>
      
      <AudioControl onToggle={handleToggleAudio} />
    </div>
  );
}