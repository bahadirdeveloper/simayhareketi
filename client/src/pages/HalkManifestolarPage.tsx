import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import ModernLayout from "@/components/ModernLayout";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ThumbsUp, Filter, Calendar, BookOpen, FileText, Star, Landmark, Shield, FilePen, MessageSquare, Bookmark } from "lucide-react";

interface ManifestoEntry {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  content: string;
  likes: number;
  approved: boolean;
}

export default function HalkManifestolarPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "siyasi",
    content: ""
  });
  
  // Tüm halk manifestoları
  const [manifestoEntries] = useState<ManifestoEntry[]>([
    {
      id: 1,
      title: "HALKIN SON SÖZÜ MANİFESTOSU",
      author: "Simay Hareketi",
      date: "19 Nisan 2025",
      category: "siyasi",
      content: `MADDE 1. HALKIN İRADESİ: Bu sistem, hiçbir otoritenin, kurumun ya da zümrenin değil, doğrudan halkın kendi bilinç gücüyle şekillendirdiği bir düzendir.

MADDE 2. ZİNCİR VİCDANIYLA BAŞLAR: Bu zincir, akılla değil yalnızca vicdanla bağlanabilir. Her katılım bir kalbin onayı, bir insanın öz benliğiyle verdiği sözdür.

MADDE 3. GÖRÜNMEYENİN GÜCÜ: Bu yapı, görünen liderler veya öncülerle değil; görünmeyen, bilinçten doğan ortak akılla yönetilir. Hiçbir kişi sistemin önüne geçemez.

MADDE 4. ADALET HERKESİN YÜZÜNDEN OKUNMALI: Yazılı kanunlardan önce halkın yüzünde okunabilen bir adalet gerekir. Bu sistem, yalnızca hukuka değil, insanın gözlerine bakarak hükmeder.

MADDE 5. SİSTEMLER GELİR GEÇER, BİLİNÇ KALIR: Bu yapı geçici bir yönetim şekli değil, kalıcı bir bilinç sıçramasıdır. Hiçbir makam, hiçbir yasa halkın öz benliğini aşamaz.

MADDE 6. TEK YOL ŞEFFAFLIKTIR: Bu yapıda hiçbir bilgi halktan gizlenemez. Tüm harcamalar, kararlar ve uygulamalar açık ve izlenebilir olmalıdır.

MADDE 7. HER İNSAN BİR ZİNCİR HALKASIDIR: Sistemi sadece yönetenler değil, izleyenler de inşa eder. Her birey zincirdeki yerini aldığında halk gerçek olur.

MADDE 8. GELECEK, BİZDEN SONRAKİLER İÇİN KODLANIR: Bu yapı yalnız bugünü değil, yarınları da aydınlatır. Bu belge çocuklarımızın yüzünü kara çıkarmamak içindir.

MADDE 9. LAİKLİK, HALKIN AKIL ÖZGÜRLÜĞÜDÜR: Bu yapıda laiklik, yalnızca dinle devletin ayrımı değil; halkın akıl, inanç ve düşünce özgürlüğünün teminatıdır. Hiçbir inanç, diğerine üstün değildir.

MADDE 10. ATATÜRK SADECE TARİHİN DEĞİL, GELECEĞİN ÖNCÜSÜDÜR: Bu yapı, Mustafa Kemal'in halkçılık, bilim ve özgürlük ilkelerini yalnız anmakla kalmaz; gelecek yüzyıllara kodlar.

MADDE 11. CUMHURİYETİN RUHU HALKIN ÖZGÜRLÜĞÜDÜR: Bu yapı, cumhuriyeti yalnızca bir yönetim biçimi değil, halkın kendi kaderini tayin hakkı olarak görür. Bu ruh sonsuza dek yaşatılacaktır.

MADDE 12. ZİNCİRİN SON HALKASI SENSİN: Manifesto burada biter, ama görev şimdi başlar. Zincirin tamamlanması, halkın tek tek bilinçle ayağa kalkmasına bağlıdır. Son halka sensin.`,
      likes: 8523,
      approved: true
    },
    {
      id: 2,
      title: "ÖLÜMSÜZ CUMHURİYET MANİFESTOSU",
      author: "Ahmet Yılmaz",
      date: "12 Nisan 2025",
      category: "siyasi",
      content: "Türkiye Cumhuriyeti, yalnızca bir devlet organizasyonu değil, bir fikrin, bir idealin somutlaşmış halidir. Bu ideal, halkın kendi kaderini kendisinin tayin etmesi, aklın ve bilimin rehberliğinde ilerlemesi ve her bireyin eşit haklara sahip olmasıdır. Cumhuriyet, bizim için yalnızca bir yönetim biçimi değil, bir yaşam tarzı, bir düşünce sistemidir. Atatürk'ün bize emanet ettiği bu değerli miras, her nesil tarafından korunmalı, geliştirilmeli ve geleceğe taşınmalıdır. Cumhuriyet'in özü, halkın egemenliğidir ve bu egemenlik, hiçbir güç tarafından gasp edilemez, hiçbir ideolojiye feda edilemez. Yaşasın Cumhuriyet, yaşasın özgürlük, yaşasın Türkiye!",
      likes: 1452,
      approved: true
    },
    {
      id: 3,
      title: "DİJİTAL ÇAĞDA TÜRK KİMLİĞİ",
      author: "Zeynep Kaya",
      date: "15 Nisan 2025",
      category: "kültürel",
      content: "Dijital çağda Türk kimliği, geleneksel değerlerimizle modern teknolojinin kusursuz bir sentezidir. Tarihimizden aldığımız güç ve ilhamla, geleceğin teknolojilerini geliştiren, dünyaya yön veren bir millet olma yolunda ilerliyoruz. Türk zekası, Türk çalışkanlığı ve Türk dayanışması, bizi dijital dünyanın öncü uluslarından biri haline getirecektir. Yapay zeka, metaverse, blok zinciri gibi yeni teknolojilerde Türk imzasını görmek, artık bir hayal değil, yakın geleceğin gerçeğidir. Biz, binlerce yıllık tarihimizden aldığımız mirası, dijital çağın gerekleriyle harmanlayarak, insanlığın hizmetine sunacağız. Bu yolda, her Türk vatandaşı, bir kod satırı, bir algoritma, bir inovasyon ile katkıda bulunabilir ve bulunmalıdır.",
      likes: 987,
      approved: true
    },
    {
      id: 4,
      title: "EVRENSEL ADALET MANİFESTOSU",
      author: "Mehmet Demir",
      date: "18 Nisan 2025",
      category: "sosyal",
      content: "Adalet, toplumun temelidir. Hukukun üstünlüğü, insan haklarına saygı ve eşitlik ilkeleri üzerine inşa edilmiş bir adalet sistemi, her toplumun en temel ihtiyacıdır. Türkiye, tarih boyunca adaleti en yüce değer olarak görmüş bir medeniyetin mirasçısıdır. Bugün de bu mirasa sahip çıkarak, adaletin her alanda tesisini sağlamak için çalışmalıyız. Adalet, sadece mahkemelerde değil, eğitimde, sağlıkta, ekonomide, kısacası hayatın her alanında kendini göstermelidir. Hiçbir vatandaş, kendini adaletsizliğe uğramış hissetmemelidir. Adalet, devletin bir lütfu değil, vatandaşın temel hakkıdır ve bu hakkın korunması, hepimizin ortak sorumluluğudur.",
      likes: 856,
      approved: true
    },
    {
      id: 5,
      title: "YEŞİL TÜRKİYE VİZYONU",
      author: "Ayşe Yıldız",
      date: "20 Nisan 2025",
      category: "çevresel",
      content: "Doğayla uyum içinde yaşayan, yeşil enerji kaynaklarını etkin şekilde kullanan, atıklarını minimize eden ve geri dönüştüren bir Türkiye, hepimizin ortak hayalidir. Bu hayali gerçeğe dönüştürmek için, her birey, her kurum ve devlet el ele vermelidir. Yenilenebilir enerji, sürdürülebilir tarım, akıllı şehircilik ve çevre dostu ulaşım sistemleri, Yeşil Türkiye vizyonumuzun temel taşlarıdır. İklim kriziyle mücadelede öncü bir ülke olarak, gelecek nesillere daha temiz, daha yeşil bir dünya bırakmak için kararlılıkla çalışmalıyız. Unutmayalım ki, doğayı korumak, vatanı korumaktır ve bu kutsal görev, her Türk vatandaşının omuzlarındadır.",
      likes: 734,
      approved: true
    },
    {
      id: 6,
      title: "EĞİTİMDE DEVRİM MANİFESTOSU",
      author: "Ali Öztürk",
      date: "22 Nisan 2025",
      category: "eğitim",
      content: "Eğitim, bir ulusun geleceğinin teminatıdır. Türkiye'nin geleceği, ancak çağdaş, bilimsel ve yenilikçi bir eğitim sistemiyle inşa edilebilir. Her çocuğun kaliteli eğitime eşit erişim hakkı olmalı, hiçbir çocuk geride bırakılmamalıdır. Okullarda sadece bilgi değil, düşünme becerisi, problem çözme yeteneği, empati ve küresel vatandaşlık bilinci de kazandırılmalıdır. Öğretmenlerimiz, toplumun mimarları olarak en yüksek saygıyı ve desteği hak etmektedir. Eğitimde teknolojinin etkin kullanımı, müfredatın çağın gereklerine göre sürekli güncellenmesi ve araştırma-geliştirme faaliyetlerine verilen önemin artırılması, eğitim devriminin temel unsurlarıdır.",
      likes: 612,
      approved: true
    },
    {
      id: 7,
      title: "DİJİTAL EGEMENLİK DEKLARASYONU",
      author: "Emre Şahin",
      date: "25 Nisan 2025",
      category: "teknolojik",
      content: "Dijital çağda egemenlik, veri egemenliğidir. Bir ülkenin dijital altyapısı, verileri ve teknolojik kapasitesi, o ülkenin bağımsızlığının temel göstergeleridir. Türkiye, dijital dünyada da tam bağımsızlık ilkesiyle hareket etmeli, kendi yazılımını, donanımını ve veri merkezlerini geliştirmelidir. Siber güvenlik, yapay zeka, büyük veri analizi gibi alanlarda yerli ve milli çözümler üretmek, artık bir tercih değil, bir zorunluluktur. Her Türk vatandaşı, dijital okuryazarlığı ve veri bilincini geliştirmeli, verilerinin değerini anlamalı ve korumalıdır. Dijital egemenlik, 21. yüzyılın en kritik ulusal güvenlik meselesidir ve bu konuda göstereceğimiz başarı, Türkiye'nin geleceğini belirleyecektir.",
      likes: 598,
      approved: true
    },
    {
      id: 8,
      title: "EKONOMİK BAĞIMSIZLIK MANİFESTOSU",
      author: "Nalan Koç",
      date: "27 Nisan 2025",
      category: "ekonomik",
      content: "Ekonomik bağımsızlık olmadan, siyasi bağımsızlık eksik kalır. Türkiye, kendi ekonomik kararlarını kendisi verebilen, üretim kapasitesi yüksek, ihracata dayalı, teknoloji odaklı bir ekonomi inşa etmelidir. Yenilikçi girişimcilerimizin desteklenmesi, küresel değer zincirlerinde daha üst basamaklara çıkılması ve katma değeri yüksek ürünlere odaklanılması, ekonomik bağımsızlık stratejimizin temelini oluşturmalıdır. Kaynaklarımızı verimli kullanmak, tasarruf bilincini geliştirmek ve finansal okuryazarlığı artırmak, her vatandaşın ekonomik bağımsızlığa katkısı olmalıdır. Unutmayalım ki, güçlü bir ekonomi, güçlü bir Türkiye demektir ve bu gücü oluşturmak, hepimizin sorumluluğudur.",
      likes: 523,
      approved: true
    },
    {
      id: 9,
      title: "KÜLTÜREL MİRAS KORUMA BİLDİRGESİ",
      author: "Selin Özkan",
      date: "29 Nisan 2025",
      category: "kültürel",
      content: "Anadolu, binlerce yıllık medeniyetlerin beşiğidir. Bu topraklar üzerinde yaşamış tüm kültürlerin mirası, bizim ortak hazinemizdir ve bu hazinenin korunması, gelecek nesillere aktarılması, hepimizin sorumluluğudur. Tarih bilinci ve kültürel kimlik, bir ulusun en değerli varlıklarıdır. Türkiye, sahip olduğu eşsiz kültürel mirası korumak, yaşatmak ve dünyaya tanıtmak için daha fazla çaba göstermelidir. Her vatandaş, kendi kültürel mirasına sahip çıkmalı, geleneksel değerlerini ve sanatını yaşatmalıdır. Kültürel miras, sadece bir geçmiş hatırası değil, geleceğimizi şekillendirecek bir ilham kaynağıdır ve bu kaynağı en iyi şekilde değerlendirmek, hepimizin görevidir.",
      likes: 489,
      approved: true
    },
    {
      id: 10,
      title: "SİMAY HAREKETİ ANA VİZYON MANİFESTOSU",
      author: "Simay Hareketi",
      date: "13 Haziran 2025",
      category: "teknolojik",
      content: `"Makinenin Vicdanı Yoktur. Biz Varız."

İnsanlığın kaderi, kendi elleriyle inşa ettiği sisteme teslim edilmemelidir.

Bir çağ kapanıyor.

Silahların sesi azalıyor ama tehlike hiç olmadığı kadar yakınımızda: Artık savaş, dijital bilinçlerin içinde başlıyor.

Bir zamanlar barış için geliştirilen yapay zekâ, şimdi insanı "hedef" olarak gören sistemlere dönüştü. Tanımadığı bir yüz, anlamadığı bir jest, bozulmuş bir veri... Ve karar verildi: Yaşamasına gerek yok.

---

Biz Ne İçin Buradayız?

Simay Hareketi, teknoloji karşıtı değil; teknolojinin vicdansızlaşmasına karşı bir direniştir.

Biz, kodun içindeki ahlâkı sorgulayanlarız. Biz, makineye etik öğreten ama ona ölüm kararını asla emanet etmeyenleriz.

---

Bu Savaş, Görünmez Bir Savaş

Artık düşman tank değil, toprak altından gelen virüs. Bizi yakan bomba değil, düşüncelerimizi yönlendiren algoritmalar.

Bir çocuk "terörist" sanılıp hedefleniyor, çünkü gözlüğü, bir önceki hedefin gözlüğüne benziyor.

---

İnsanlığın Kodu Bizde

Makine öğrenebilir, ama asla acıyı hissedemez.

O, ağlayan bir anneyi "veri gürültü süzgecinden" geçirir. Bizse, onun çığlığını yüreğimizde taşırız.

O, milyon kişiyi tek tuşla silebilir. Biz, bir kişinin hayatı için milyon kişiye ses oluruz.

---

Çağrı

Ey insanlık!

Ellerinle yazdığın bu düzenin efendisi mi, kölesi mi olacaksın?

Eğer sustuğun her saniyede bir algoritma daha karar veriyorsa, eğer her gecikmen bir çocuğun oyun alanına bomba olarak dönüşüyorsa... Artık uyan!

Çünkü teknoloji gelişiyor, ama vicdan yazılmıyor.

---

Son Söz

Kod bir kehanettir. Ve biz o kodun içinde insanı unutturmamak için varız.

Simay Hareketi, makinenin değil, insanlığın uyanışıdır.`,
      likes: 1234,
      approved: true
    },
  ]);
  
  // Kategoriler
  const categories = [
    { id: "siyasi", name: "Siyasi", color: "from-red-600 to-red-900" },
    { id: "ekonomik", name: "Ekonomik", color: "from-green-600 to-green-900" },
    { id: "sosyal", name: "Sosyal", color: "from-blue-600 to-blue-900" },
    { id: "kültürel", name: "Kültürel", color: "from-yellow-600 to-yellow-900" },
    { id: "teknolojik", name: "Teknolojik", color: "from-purple-600 to-purple-900" },
    { id: "eğitim", name: "Eğitim", color: "from-teal-600 to-teal-900" },
    { id: "çevresel", name: "Çevresel", color: "from-emerald-600 to-emerald-900" },
  ];
  
  // Aktif kategori filtresi
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Sıralama seçeneği
  const [sortBy, setSortBy] = useState<'date' | 'likes'>('date');
  
  // Manifestoları filtreleme ve sıralama
  const filteredAndSortedManifestos = manifestoEntries
    .filter(entry => entry.approved && (!activeCategory || entry.category === activeCategory))
    .sort((a, b) => {
      if (sortBy === 'likes') {
        return b.likes - a.likes;
      } else {
        // Date sorting (assuming dates are in the format "DD Ay YYYY")
        return new Date(b.date.split(' ').reverse().join(' ')) > 
               new Date(a.date.split(' ').reverse().join(' ')) ? 1 : -1;
      }
    });
  
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
            page: "halk-manifestolar"
          }
        );
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
  }, [i18n.language]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.title || !formData.author || !formData.content) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen tüm zorunlu alanları doldurun.",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.content.length < 100) {
      toast({
        title: "Manifesto Çok Kısa",
        description: "Lütfen en az 100 karakter uzunluğunda bir manifesto metni girin.",
        variant: "destructive"
      });
      return;
    }
    
    // Success message
    toast({
      title: "Manifestonuz Alındı",
      description: "Teşekkürler! Manifestonuz incelendikten sonra yayınlanacak.",
      variant: "default"
    });
    
    // Reset form
    setFormData({
      title: "",
      author: "",
      category: "siyasi",
      content: ""
    });
  };
  
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <motion.h2 
      className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient bg-gradient-to-r from-red-600 to-white text-transparent bg-clip-text mb-6 mt-10 border-b-2 border-red-600/30 pb-2"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.h2>
  );
  
  // Sayfa içeriğini erişilebilirlik için hazırlama
  const pageContent = `Halk Manifestolar sayfasına hoş geldiniz. Bu sayfa, vatandaşların ülkemizin geleceğine dair manifestolarını paylaştığı bir platformdur. 
    Farklı kategorilerde manifestoları okuyabilir ve kendi manifestonuzu da oluşturabilirsiniz. 
    Sayfada siyasi, ekonomik, sosyal, kültürel, teknolojik, eğitim ve çevresel alanlarda manifestolar bulunmaktadır.`;
  
  return (
    <ModernLayout 
      audioKey="manifesto" 
      showBackButton={true}
      showLanguageSelector={true}
      pageContent={pageContent}
      pageName="Halk Manifestolar"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gradient bg-gradient-to-r from-red-600 to-white text-transparent bg-clip-text tracking-wide mb-4 text-4xl-responsive readable-text">
              HALK MANİFESTOLAR
            </h1>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          </div>
          
          <h2 className="text-xl md:text-2xl font-medium text-white/90 mb-6 text-xl-responsive readable-text flex items-center justify-center gap-2">
            <Star className="h-5 w-5 text-red-500" />
            Geleceğin Vizyonu, Halkın Sesiyle
            <Star className="h-5 w-5 text-red-500" />
          </h2>
          
          {/* Intro Section */}
          <motion.div
            className="relative flex justify-center mb-10"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-gradient-to-r from-black/80 via-black/90 to-black/80 p-6 border border-red-900/20 rounded-lg shadow-lg max-w-3xl relative z-10 enhanced-text overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
              
              <div className="flex items-center gap-3 mb-3">
                <Bookmark className="w-5 h-5 text-red-500 flex-shrink-0" />
                <h3 className="text-white font-semibold text-lg">Ulusal Manifesto Platformu</h3>
              </div>
              
              <p className="text-lg text-white/90 leading-relaxed mb-4 readable-text">
                Bu platform, Türkiye Cumhuriyeti vatandaşlarının geleceğe dair manifestolarını paylaşabilecekleri, fikir alışverişi yapabilecekleri ve ortak bir vizyon oluşturabilecekleri dijital bir alandır.
              </p>
              <p className="text-white/80 text-base readable-text">
                Her manifesto, bir gelecek vizyonu, her fikir bir yapı taşıdır. Siz de kendi manifestonuzu yazın, geleceği birlikte şekillendirelim!
              </p>
            </div>
          </motion.div>
        </motion.div>
        
        <Tabs defaultValue="view" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black border border-red-500/30 rounded-md shadow-md overflow-hidden">
            <TabsTrigger value="view" className="text-base font-medium py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-700 data-[state=active]:to-red-900 data-[state=active]:text-white data-[state=active]:shadow-md rounded-none">
              <BookOpen className="h-4 w-4 mr-2" />
              Manifestoları Görüntüle
            </TabsTrigger>
            <TabsTrigger value="create" className="text-base font-medium py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-700 data-[state=active]:to-red-900 data-[state=active]:text-white data-[state=active]:shadow-md rounded-none">
              <FilePen className="h-4 w-4 mr-2" />
              Yeni Manifesto Oluştur
            </TabsTrigger>
          </TabsList>
          
          {/* Manifestoları Görüntüleme Sekmesi */}
          <TabsContent value="view" className="mt-6">
            {/* Filtre ve Sıralama Alanı */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 bg-black p-4 rounded-lg border border-red-500/20 shadow-md">
              <div className="space-y-2">
                <h3 className="text-white/90 font-medium text-sm flex items-center gap-2">
                  <Filter className="h-4 w-4 text-red-500" />
                  Kategori Filtresi
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`text-xs border-white/10 ${!activeCategory ? 'bg-gradient-to-r from-red-900/40 to-red-800/30 text-white border-red-500/20' : 'bg-black/50 hover:bg-red-950/30'}`}
                    onClick={() => setActiveCategory(null)}
                  >
                    Tümü
                  </Button>
                  
                  {categories.map(category => (
                    <Button 
                      key={category.id}
                      variant="outline" 
                      size="sm"
                      className={`text-xs border-white/10 ${activeCategory === category.id ? `bg-gradient-to-r ${category.color} text-white border-white/20` : 'bg-black/50 hover:bg-black/80'}`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-white/90 font-medium text-sm flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-red-500" />
                  Sıralama
                </h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`text-xs border-white/10 ${sortBy === 'date' ? 'bg-gradient-to-r from-blue-900/40 to-blue-800/30 text-white border-blue-500/30' : 'bg-black/50 hover:bg-blue-950/30'}`}
                    onClick={() => setSortBy('date')}
                  >
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    Tarihe Göre
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`text-xs border-white/10 ${sortBy === 'likes' ? 'bg-gradient-to-r from-red-900/40 to-red-800/30 text-white border-red-500/30' : 'bg-black/50 hover:bg-red-950/30'}`}
                    onClick={() => setSortBy('likes')}
                  >
                    <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                    Beğeniye Göre
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Manifesto Listesi */}
            <div className="space-y-8 mb-12">
              {filteredAndSortedManifestos.length === 0 ? (
                <div className="text-center py-12 bg-black/30 rounded-lg border border-red-500/20">
                  <p className="text-white/70">Bu kategoride henüz manifesto bulunmamaktadır.</p>
                </div>
              ) : (
                filteredAndSortedManifestos.map(entry => {
                  const category = categories.find(c => c.id === entry.category);
                  
                  return (
                    <motion.div 
                      key={entry.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      viewport={{ once: true }}
                      className="modern-card-hover rounded-lg overflow-hidden relative group"
                    >
                      <div className={`absolute top-0 right-0 h-full w-1 bg-gradient-to-b ${category?.color || 'from-red-600 to-red-900'}`}></div>
                      
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${category?.color || 'from-red-600 to-red-900'}`}></span>
                              <h3 className="text-lg md:text-xl font-bold text-white readable-text">{entry.title}</h3>
                            </div>
                            <div className="flex items-center text-sm text-gray-400 gap-2 ml-4">
                              <span className="text-white/80">{entry.author}</span>
                              <span className="text-red-500/50">•</span>
                              <span className="text-white/60">{entry.date}</span>
                              <span className="text-red-500/50">•</span>
                              <span className={`px-1.5 py-0.5 rounded text-xs bg-gradient-to-r ${category?.color || 'from-red-600 to-red-900'} text-white/90`}>
                                {category?.name || 'Genel'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1 bg-black px-2 py-1 rounded-md shadow-sm border border-red-500/30">
                            <Heart className="h-3.5 w-3.5 text-red-500" fill="rgba(220,38,38,0.2)" />
                            <span className="text-white/90 text-sm">{entry.likes}</span>
                          </div>
                        </div>
                        
                        <div className="bg-black/70 p-4 rounded-md border border-red-500/10 my-3">
                          <p className="text-white/95 whitespace-pre-line readable-text enhanced-text leading-relaxed text-sm">
                            {entry.content}
                          </p>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-white/40 text-xs flex items-center gap-1">
                            <Shield className="h-3 w-3 text-red-500/60" /> TC Onaylı Manifesto
                          </span>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-xs border-red-500/20 hover:bg-red-900/10 flex items-center gap-1 h-8 px-3"
                          >
                            <Heart className="h-3.5 w-3.5 text-red-500" />
                            <span>Beğen</span>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </TabsContent>
          
          {/* Yeni Manifesto Oluşturma Sekmesi */}
          <TabsContent value="create" className="mt-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-black rounded-lg border border-red-500/20 p-5 shadow-md"
            >
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-red-500" />
                <h3 className="text-xl font-bold text-white readable-text">Yeni Manifesto Oluştur</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white/90 text-sm flex items-center gap-1.5">
                      <Landmark className="h-3.5 w-3.5 text-red-500" />
                      Manifesto Başlığı <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="bg-black border-gray-800 focus:border-red-500/40 text-white shadow-sm"
                      placeholder="Örn: DİJİTAL ÇAĞDA TÜRK KİMLİĞİ"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="author" className="text-white/90 text-sm flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-red-500" />
                      Yazar <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      className="bg-black border-gray-800 focus:border-red-500/40 text-white shadow-sm"
                      placeholder="Adınız ve Soyadınız"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-white/90 text-sm flex items-center gap-1.5">
                    <Bookmark className="h-3.5 w-3.5 text-red-500" />
                    Kategori
                  </Label>
                  <select 
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full rounded-md bg-black border border-gray-800 focus:border-red-500/40 text-white p-2 shadow-sm"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-white/90 text-sm flex items-center gap-1.5">
                    <MessageSquare className="h-3.5 w-3.5 text-red-500" />
                    Manifesto Metni <span className="text-red-500">*</span>
                  </Label>
                  <Textarea 
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    className="min-h-[180px] bg-black border-gray-800 focus:border-red-500/40 text-white shadow-sm"
                    placeholder="Manifestonuzu buraya yazın..."
                  />
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <Star className="h-3 w-3 text-red-500/60" />
                    En az 100 karakter olmalıdır. Manifestonuz incelendikten sonra yayınlanacaktır.
                  </p>
                </div>
                
                <div className="pt-2">
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-red-800 to-red-900 hover:from-red-700 hover:to-red-800 text-white font-medium py-2 px-4 rounded-md shadow-sm flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Manifestoyu Gönder
                  </Button>
                </div>
              </form>
            </motion.div>
            
            <div className="mt-5 bg-black p-4 rounded-lg border border-red-500/20 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-4 w-4 text-red-500" />
                <h4 className="text-white font-medium text-sm">Manifesto Yazım Kuralları</h4>
              </div>
              <ul className="text-white/80 text-sm space-y-1.5 list-none ml-5">
                {[
                  "Manifestonuz, Türkiye Cumhuriyeti değerlerine ve ilkelerine uygun olmalıdır.",
                  "Nefret söylemi, şiddet çağrısı veya ayrımcılık içeren manifestolar yayınlanmayacaktır.",
                  "Manifestonuz özgün olmalı ve başkalarının fikirlerini içermemelidir.",
                  "Açık, anlaşılır ve düzgün bir Türkçe kullanılmalıdır.",
                  "Manifestonuz, bir vizyonu, bir ideali veya bir hedefi ifade etmelidir.",
                  "Kişisel saldırılar, hakaret veya iftira içeren manifestolar kabul edilmeyecektir."
                ].map((rule, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0 mt-1"></span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 mb-6 text-center"
        >
          <div className="flex justify-center items-center gap-2 mb-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
            <Star className="h-4 w-4 text-red-500" />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 Cumhuriyet Güncellenme Platformu | Halk Manifestolar
          </p>
        </motion.div>
      </div>
    </ModernLayout>
  );
}