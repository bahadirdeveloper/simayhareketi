import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import ModernLayout from "@/components/ModernLayout";
import TurkishAmbientPlayer from "@/components/TurkishAmbientPlayer";
import { apiRequest } from "@/lib/queryClient";
import { 
  Heart, 
  ThumbsUp, 
  Calendar, 
  BookOpen, 
  FileText, 
  Star, 
  Users,
  Scroll,
  PenTool,
  ArrowLeft,
  Search,
  TrendingUp,
  Clock,
  Eye,
  Filter
} from "lucide-react";

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
  
  // UI State
  const [selectedManifesto, setSelectedManifesto] = useState<ManifestoEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<'date' | 'likes'>('date');
  
  // Manifestolar
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
      title: "SİMAY HAREKETİ ANA VİZYON MANİFESTOSU",
      author: "Simay Hareketi",
      date: "13 Haziran 2025",
      category: "teknolojik",
      content: `Makinenin Vicdanı Yoktur. Biz Varız.

İnsanlığın kaderi, kendi elleriyle inşa ettiği sisteme teslim edilmemelidir.

Bir çağ kapanıyor.

Silahların sesi azalıyor ama tehlike hiç olmadığı kadar yakınımızda: Artık savaş, dijital bilinçlerin içinde başlıyor.

Bir zamanlar barış için geliştirilen yapay zekâ, şimdi insanı "hedef" olarak gören sistemlere dönüştü. Tanımadığı bir yüz, anlamadığı bir jest, bozulmuş bir veri... Ve karar verildi: Yaşamasına gerek yok.

Biz Ne İçin Buradayız?

Simay Hareketi, teknoloji karşıtı değil; teknolojinin vicdansızlaşmasına karşı bir direniştir.

Biz, kodun içindeki ahlâkı sorgulayanlarız. Biz, makineye etik öğreten ama ona ölüm kararını asla emanet etmeyenleriz.

Bu Savaş, Görünmez Bir Savaş

Artık düşman tank değil, toprak altından gelen virüs. Bizi yakan bomba değil, düşüncelerimizi yönlendiren algoritmalar.

Bir çocuk "terörist" sanılıp hedefleniyor, çünkü gözlüğü, bir önceki hedefin gözlüğüne benziyor.

İnsanlığın Kodu Bizde

Makine öğrenebilir, ama asla acıyı hissedemez.

O, ağlayan bir anneyi "veri gürültü süzgecinden" geçirir. Bizse, onun çığlığını yüreğimizde taşırız.

O, milyon kişiyi tek tuşla silebilir. Biz, bir kişinin hayatı için milyon kişiye ses oluruz.`,
      likes: 1234,
      approved: true
    }
  ]);
  
  // Kategoriler
  const categories = [
    { id: "all", name: "Tümü", icon: BookOpen, color: "from-gray-600 to-gray-800" },
    { id: "siyasi", name: "Siyasi", icon: Users, color: "from-red-600 to-red-800" },
    { id: "ekonomik", name: "Ekonomik", icon: TrendingUp, color: "from-green-600 to-green-800" },
    { id: "sosyal", name: "Sosyal", icon: Heart, color: "from-blue-600 to-blue-800" },
    { id: "kültürel", name: "Kültürel", icon: Scroll, color: "from-purple-600 to-purple-800" },
    { id: "teknolojik", name: "Teknolojik", icon: PenTool, color: "from-indigo-600 to-indigo-800" },
  ];
  
  // Filtreleme ve sıralama
  const filteredAndSortedManifestos = manifestoEntries
    .filter(entry => {
      const matchesCategory = activeCategory === "all" || entry.category === activeCategory;
      const matchesSearch = searchTerm === "" || 
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchTerm.toLowerCase());
      return entry.approved && matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'likes') {
        return b.likes - a.likes;
      } else {
        return new Date(b.date) > new Date(a.date) ? 1 : -1;
      }
    });

  useEffect(() => {
    const recordVisit = async () => {
      try {
        await apiRequest("POST", "/api/visits", {
          language: i18n.language || "tr",
          hasInteracted: false,
          page: "halk-manifestolar"
        });
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    recordVisit();
  }, [i18n.language]);

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.icon || FileText;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || "from-gray-600 to-gray-800";
  };

  const formatDate = (dateStr: string) => {
    return dateStr;
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <ModernLayout>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 relative overflow-hidden">
        
        {/* Ambient Music Player */}
        <div className="fixed top-6 right-6 z-50">
          <TurkishAmbientPlayer page="manifesto" className="w-80" />
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-red-900/10" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Hero Section */}
        <div className="relative z-10 pt-24 pb-12">
          <div className="container mx-auto px-4">
            
            {/* Back Button */}
            <motion.button
              onClick={() => navigate("/")}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Ana Sayfaya Dön</span>
            </motion.button>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-red-400 mb-6 drop-shadow-2xl">
                HALK MANİFESTOLARI
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Türk halkının vicdanından doğan manifestolar, geleceğin inşasında rehber olan sesler
              </p>
            </motion.div>

            {/* Search and Filter Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col lg:flex-row gap-4 mb-8 max-w-4xl mx-auto"
            >
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Manifesto, yazar veya içerik ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/40 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                />
              </div>

              {/* Sort */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy('date')}
                  className={`px-4 py-3 rounded-xl flex items-center space-x-2 transition-all duration-300 ${
                    sortBy === 'date' 
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                      : 'bg-black/40 text-gray-300 hover:bg-black/60'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>Tarih</span>
                </button>
                <button
                  onClick={() => setSortBy('likes')}
                  className={`px-4 py-3 rounded-xl flex items-center space-x-2 transition-all duration-300 ${
                    sortBy === 'likes' 
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                      : 'bg-black/40 text-gray-300 hover:bg-black/60'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>Beğeni</span>
                </button>
              </div>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-3 rounded-full flex items-center space-x-2 transition-all duration-300 ${
                      activeCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                        : 'bg-black/40 text-gray-300 hover:bg-black/60 border border-gray-700/50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{category.name}</span>
                    {activeCategory === category.id && (
                      <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                        {activeCategory === "all" ? manifestoEntries.length : 
                         manifestoEntries.filter(m => m.category === category.id).length}
                      </span>
                    )}
                  </button>
                );
              })}
            </motion.div>

            {/* Manifestos Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filteredAndSortedManifestos.map((manifesto, index) => {
                  const IconComponent = getCategoryIcon(manifesto.category);
                  return (
                    <motion.div
                      key={manifesto.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      onClick={() => setSelectedManifesto(manifesto)}
                      className="group relative bg-gradient-to-br from-black/60 via-gray-900/40 to-black/60 backdrop-blur-lg border border-gray-700/30 rounded-2xl p-6 cursor-pointer hover:border-red-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-2"
                    >
                      {/* Category Badge */}
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(manifesto.category)} text-white text-sm mb-4`}>
                        <IconComponent className="w-3 h-3" />
                        <span className="capitalize">{manifesto.category}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                        {manifesto.title}
                      </h3>

                      {/* Author & Date */}
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <span className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{manifesto.author}</span>
                        </span>
                        <span className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(manifesto.date)}</span>
                        </span>
                      </div>

                      {/* Content Preview */}
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {truncateContent(manifesto.content)}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{manifesto.likes.toLocaleString()}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>Oku</span>
                          </span>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ArrowLeft className="w-5 h-5 text-red-400 rotate-180" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* No Results */}
            {filteredAndSortedManifestos.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-400 mb-2">Sonuç Bulunamadı</h3>
                <p className="text-gray-500">Arama kriterlerinize uygun manifesto bulunamadı.</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Manifesto Detail Modal */}
        <AnimatePresence>
          {selectedManifesto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedManifesto(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-black via-gray-900 to-red-950 border border-gray-700/50 rounded-3xl p-8 max-w-4xl max-h-[90vh] overflow-y-auto w-full"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(selectedManifesto.category)} text-white text-sm mb-4`}>
                      {React.createElement(getCategoryIcon(selectedManifesto.category), { className: "w-3 h-3" })}
                      <span className="capitalize">{selectedManifesto.category}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">
                      {selectedManifesto.title}
                    </h2>
                    <div className="flex items-center space-x-6 text-gray-400">
                      <span className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{selectedManifesto.author}</span>
                      </span>
                      <span className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(selectedManifesto.date)}</span>
                      </span>
                      <span className="flex items-center space-x-2">
                        <Heart className="w-4 h-4" />
                        <span>{selectedManifesto.likes.toLocaleString()}</span>
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedManifesto(null)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 p-2"
                  >
                    <ArrowLeft className="w-6 h-6 rotate-45" />
                  </button>
                </div>

                {/* Content */}
                <div className="prose prose-invert max-w-none">
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {selectedManifesto.content}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700/50">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200">
                      <Heart className="w-4 h-4" />
                      <span>Beğen</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200">
                      <FileText className="w-4 h-4" />
                      <span>Paylaş</span>
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedManifesto(null)}
                    className="px-6 py-2 bg-black/40 hover:bg-black/60 text-gray-300 rounded-lg transition-colors duration-200"
                  >
                    Kapat
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ModernLayout>
  );
}