import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ModernLayout from '@/components/ModernLayout';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Download, 
  ShieldCheck, 
  Star, 
  Award, 
  TrendingUp, 
  Users, 
  FileText, 
  BarChart4,
  ArrowUpRight, 
  ArrowDownRight
} from 'lucide-react';

export default function SertifikaPage() {
  const { t, i18n } = useTranslation();
  
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
  
  // Sertifika sağladığı faydalar
  const certificateBenefits = [
    { icon: <ShieldCheck className="w-8 h-8 text-red-500" />, title: 'Güvenli Katılım', description: 'Blockchain tabanlı sertifika ile katılımınız güvenli bir şekilde belgelenir.' },
    { icon: <Star className="w-8 h-8 text-red-500" />, title: 'Özel Erişim', description: 'Çeşitli etkinliklere ve dijital içeriklere özel erişim hakkı kazanırsınız.' },
    { icon: <Award className="w-8 h-8 text-red-500" />, title: 'Katkı Rozeti', description: 'Profilinizde gösterebileceğiniz dijital katkı rozetlerine sahip olursunuz.' },
    { icon: <TrendingUp className="w-8 h-8 text-red-500" />, title: 'Gelişim Takibi', description: 'Toplumsal fayda projelerine katkılarınızı izleyebilirsiniz.' },
    { icon: <Users className="w-8 h-8 text-red-500" />, title: 'Ağ Erişimi', description: 'Aynı değerleri paylaşan kişilerle etkileşim kurma imkanı bulursunuz.' },
    { icon: <FileText className="w-8 h-8 text-red-500" />, title: 'Resmi Belge', description: 'Cumhuriyet\'e katkınızı belgeleyen resmi bir kanıt elde edersiniz.' }
  ];
  
  // Sertifika seviyeleri kaldırıldı
  
  // Erişilebilirlik metninin tanımı
  const pageContent = `Cumhuriyet Sertifikası Bilgilendirme ve Şeffaf Gelir-Gider Tablosu sayfasına hoş geldiniz. 
    Bu sayfada, Cumhuriyet Sertifikası'nın ne olduğu, nasıl elde edileceği ve sağladığı faydalar hakkında bilgiler bulacaksınız. 
    Ayrıca platformun gelir ve giderlerini gösteren şeffaf bir finansal tablo da sunulmaktadır. 
    Bu şeffaflık, vatandaşların güvenini kazanmak ve mali açıklık sağlamak için önemlidir.`;
  
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
            page: "sertifika"
          }
        );
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
  }, [i18n.language]);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);
  };
  
  return (
    <ModernLayout 
      audioKey="turkiye" 
      showBackButton={true}
      showLanguageSelector={true}
      pageContent={pageContent}
      pageName="Cumhuriyet Sertifikası ve Mali Şeffaflık"
    >
      <div className="w-full max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient bg-gradient-to-r from-red-600 to-white text-transparent bg-clip-text tracking-wide mb-4 readable-text text-4xl-responsive">
            CUMHURİYET SERTİFİKASI
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-white/90 mb-6 readable-text text-xl-responsive">
            Mali Şeffaflık ve Katılım Belgesi
          </h2>
        </motion.div>
        
        <Tabs defaultValue="certificate" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-black/60 to-red-950/50 backdrop-blur-sm border border-red-500/30 mb-6">
            <TabsTrigger value="certificate" className="text-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-900/40 data-[state=active]:to-black/60 data-[state=active]:text-white data-[state=active]:shadow-sm">Cumhuriyet Sertifikası</TabsTrigger>
            <TabsTrigger value="financial" className="text-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-900/40 data-[state=active]:to-black/60 data-[state=active]:text-white data-[state=active]:shadow-sm">Şeffaf Gelir-Gider</TabsTrigger>
          </TabsList>
          
          {/* Cumhuriyet Sertifikası Sekmesi */}
          <TabsContent value="certificate">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-b from-black/70 to-red-950/30 backdrop-blur-sm rounded-lg border-2 border-red-600/30 p-6 shadow-lg"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4 readable-text">Cumhuriyet Sertifikası Nedir?</h3>
                <div className="text-gray-300 space-y-4 readable-text enhanced-text">
                  <p>
                    <span className="text-red-400 font-medium">Cumhuriyet Sertifikası</span>, Türkiye Cumhuriyeti'nin güncellenmesi ve geliştirilmesi sürecine katkıda bulunan vatandaşlara verilen resmi, dijital bir katılım belgesidir. Bu sertifika, vatandaşların Cumhuriyet değerlerine bağlılığını ve toplumsal gelişime katkılarını belgeleyen, blockchain teknolojisiyle güvence altına alınmış benzersiz bir kimlik doğrulama sistemidir.
                  </p>
                  <p>
                    Her Cumhuriyet Sertifikası, özgün bir kod ve dijital imza barındırır. Bu sayede sertifikanızın gerçekliği her zaman doğrulanabilir ve sahtecilik riski ortadan kalkar. Sertifika sahipleri, katkı düzeylerine göre farklı erişim ve ayrıcalıklara sahip olurlar.
                  </p>
                  <p>
                    Cumhuriyet Sertifikası, sadece bir belge değil, aynı zamanda toplumsal dayanışmanın ve ortak değerlere bağlılığın somut bir göstergesidir. Bu sertifikaya sahip olmak, "Ben de varım" demenin, Atatürk'ün emanet ettiği Cumhuriyet'i geleceğe taşıma sorumluluğuna ortak olmanın bir yoludur.
                  </p>
                </div>
                
                <div className="mt-10">
                  <h3 className="text-2xl font-bold text-white mb-6 readable-text">Sertifikanın Sağladığı Faydalar</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {certificateBenefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gradient-to-b from-black/40 to-red-950/20 p-4 rounded-lg border border-red-500/30 flex flex-col items-center text-center"
                      >
                        <div className="mb-3">{benefit.icon}</div>
                        <h4 className="text-white font-medium mb-2">{benefit.title}</h4>
                        <p className="text-gray-300 text-sm">{benefit.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Sertifika seviyeleri tablosu kaldırıldı */}
                
                <div className="mt-10 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4 readable-text">Nasıl Sertifika Alabilirsiniz?</h3>
                  <p className="text-gray-300 mb-6 readable-text enhanced-text">
                    Cumhuriyet Sertifikası almak için katkıda bulunmak ve katılım sürecini tamamlamak yeterlidir. 
                    Sertifikanız, katkınız onaylandıktan sonra dijital olarak size iletilecektir.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                    <Button 
                      className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white"
                      onClick={() => window.location.href="/katil"}
                    >
                      Sertifika Al
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="border-red-500/30 hover:bg-red-900/20 gap-2"
                      onClick={() => window.location.href="/gorevler"}
                    >
                      <span>Örnek Sertifika</span>
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          {/* Şeffaf Gelir-Gider Sekmesi */}
          <TabsContent value="financial">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-b from-black/70 to-red-950/30 backdrop-blur-sm rounded-lg border-2 border-red-600/30 p-6 shadow-lg"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4 readable-text">Finansal Şeffaflık İlkemiz</h3>
                <p className="text-gray-300 mb-6 readable-text enhanced-text">
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
                  
                  <div className="bg-gradient-to-r from-blue-900/30 to-black/40 p-4 rounded-lg border border-blue-500/30 flex items-center justify-between">
                    <div>
                      <h4 className="text-white text-sm mb-1">Net Bakiye</h4>
                      <p className={`text-xl font-medium ${balance >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
                        {formatCurrency(balance)}
                      </p>
                    </div>
                    <BarChart4 className="w-8 h-8 text-blue-500/60" />
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
                              <TableCell className="py-3 text-green-400 text-right font-bold">{formatCurrency(totalIncome)}</TableCell>
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
                                <TableCell className="py-3 text-red-400 text-right font-medium">{formatCurrency(item.amount)}</TableCell>
                              </TableRow>
                            ))}
                            <TableRow className="bg-red-900/20 border-t border-red-500/40">
                              <TableCell colSpan={2} className="py-3 text-white font-bold">Toplam Gider</TableCell>
                              <TableCell className="py-3 text-red-400 text-right font-bold">{formatCurrency(totalExpense)}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div className="mt-10 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4 readable-text">Mali Şeffaflık Taahhüdümüz</h3>
                  <p className="text-gray-300 mb-6 readable-text enhanced-text">
                    Cumhuriyet Güncellenme Platformu olarak, tüm mali faaliyetlerimizi şeffaf bir şekilde raporlamayı ve 
                    vatandaşlarımıza hesap verebilir olmayı taahhüt ediyoruz. Finansal tablolarımız düzenli olarak güncellenmekte 
                    ve herkesin erişimine açık tutulmaktadır.
                  </p>
                  
                  <div className="bg-gradient-to-r from-blue-950/30 to-black/30 p-4 rounded-lg border border-blue-500/30 mt-6">
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
        
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8 mb-6"
        >
          <p className="text-gray-400 text-sm">
            © 2025 Cumhuriyet Güncellenme Platformu | Mali Şeffaflık Birimi
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Son Güncelleme: 20 Nisan 2025
          </p>
        </motion.div>
      </div>
    </ModernLayout>
  );
}