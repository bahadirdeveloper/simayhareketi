import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import ModernLayout from "@/components/ModernLayout";
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
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-amber-400 mb-4">
                Cumhuriyet Güncellenme Platformu Katılımı
              </h3>
              <p className="text-gray-200 mb-4">
                Platformumuza katılmak için aşağıdaki formu doldurduktan sonra
                1 TL'lik sembolik kayıt ücretini ödemeniz gerekmektedir.
              </p>
              <div className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-4 mb-6">
                <p className="text-amber-300 text-sm">
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
                    Bilgilerimi Kaydet ve Ödemeye Geç
                  </Button>
                </div>
              </form>
            </Form>
            
            <div className="mt-6 pt-6 border-t border-amber-500/30">
              <h4 className="text-xl font-semibold text-amber-400 mb-4 text-center">
                Kayıt Ücreti Ödemesi
              </h4>
              <div className="bg-black/40 backdrop-blur-sm border border-amber-500/50 rounded-lg p-4 md:p-5">
                <div className="mb-4 text-center">
                  <div className="inline-block bg-amber-900/50 px-4 py-2 rounded-lg border border-amber-500/30">
                    <span className="text-white text-sm md:text-base">Katılım ücreti:</span>
                    <span className="text-amber-400 font-bold text-xl md:text-2xl ml-2">1 TL</span>
                  </div>
                </div>
                
                <PaymentForm 
                  isRegistrationFee={true}
                  fixedAmount={1}
                  fixedDescription="Cumhuriyet Güncellenme Platformu Kayıt Ücreti"
                />
                
                <div className="mt-3 text-center">
                  <p className="text-gray-300 text-xs sm:text-sm italic">
                    * Ödeme bilgileriniz güvenli bir şekilde işlenmektedir. Kredi kartı veya banka bilgileriniz sistemimizde saklanmaz.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="bagis" className="mt-2">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-amber-400 mb-2">
                Cumhuriyeti Güncellemek İçin Bağış Yap
              </h3>
              <p className="text-gray-200">
                Bağışınız "Medeniyet için yetecek kadar" hedefimize katkı sağlayacak
              </p>
            </div>
            
            <PaymentForm />
          </TabsContent>
          
          <TabsContent value="financial" className="mt-2">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-amber-400 mb-2">
                Şeffaf Gelir-Gider Tablosu
              </h3>
              <p className="text-gray-200 text-sm">
                Platformun tüm finansal faaliyetleri şeffaf bir şekilde yönetilmektedir
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center md:space-x-4 mb-4">
              <div className="bg-gradient-to-r from-green-900/50 to-green-950/30 p-3 rounded-lg flex items-center mb-3 md:mb-0 w-full md:w-auto">
                <ArrowUpRight className="text-green-400 mr-2 h-5 w-5" />
                <div>
                  <p className="text-gray-300 text-xs">Toplam Gelir</p>
                  <p className="text-green-400 font-bold">{formatCurrency(totalIncome)}</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-red-900/50 to-red-950/30 p-3 rounded-lg flex items-center mb-3 md:mb-0 w-full md:w-auto">
                <ArrowDownRight className="text-red-400 mr-2 h-5 w-5" />
                <div>
                  <p className="text-gray-300 text-xs">Toplam Gider</p>
                  <p className="text-red-400 font-bold">{formatCurrency(totalExpense)}</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-900/50 to-blue-950/30 p-3 rounded-lg flex items-center w-full md:w-auto">
                <BarChart4 className="text-blue-400 mr-2 h-5 w-5" />
                <div>
                  <p className="text-gray-300 text-xs">Mevcut Bakiye</p>
                  <p className={`font-bold ${balance >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
                    {formatCurrency(balance)}
                  </p>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="income">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="income">
                  Gelirler
                </TabsTrigger>
                <TabsTrigger value="expense">
                  Giderler
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="income">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-amber-400">Tarih</TableHead>
                        <TableHead className="text-amber-400">Açıklama</TableHead>
                        <TableHead className="text-amber-400 text-right">Tutar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {incomeData.map((item) => (
                        <TableRow key={item.id} className="border-b border-amber-900/20">
                          <TableCell className="text-gray-300">{item.date}</TableCell>
                          <TableCell className="text-gray-300">{item.description}</TableCell>
                          <TableCell className="text-green-400 text-right">{formatCurrency(item.amount)}</TableCell>
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
                        <TableHead className="text-amber-400">Tarih</TableHead>
                        <TableHead className="text-amber-400">Açıklama</TableHead>
                        <TableHead className="text-amber-400 text-right">Tutar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {expenseData.map((item) => (
                        <TableRow key={item.id} className="border-b border-amber-900/20">
                          <TableCell className="text-gray-300">{item.date}</TableCell>
                          <TableCell className="text-gray-300">{item.description}</TableCell>
                          <TableCell className="text-red-400 text-right">{formatCurrency(item.amount)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
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
    </ModernLayout>
  );
}