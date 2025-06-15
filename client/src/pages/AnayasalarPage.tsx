import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import ModernLayout from "@/components/ModernLayout";
import TurkishAmbientPlayer from "@/components/TurkishAmbientPlayer";
import { apiRequest } from "@/lib/queryClient";
import { 
  ArrowLeft,
  BookOpen,
  Users,
  Globe,
  Shield,
  Scale,
  Heart,
  Brain,
  Star,
  Eye,
  Download,
  Share2
} from "lucide-react";

interface Constitution {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  borderColor: string;
  content: string[];
  motto: string;
}

export function AnayasalarPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [selectedConstitution, setSelectedConstitution] = useState<Constitution | null>(null);

  const constitutions: Constitution[] = [
    {
      id: "turkiye",
      title: "TÜRKİYE CUMHURİYETİ ANAYASASI",
      subtitle: "İlk ve En Büyük Sözümüz",
      description: "Bu topraklarda halkın kaderini yeniden yazan ilk büyük sözleşme. Eşitliğin, adaletin, özgürlüğün ve halk egemenliğinin teminatı.",
      icon: "🇹🇷",
      color: "from-red-600 to-red-800",
      gradient: "from-red-600/20 via-red-500/10 to-red-800/20",
      borderColor: "border-red-500/50",
      motto: "Egemenlik kayıtsız şartsız milletindir",
      content: [
        "Milletin iradesiyle yazılmış, kanla mühürlenmiş anayasa",
        "Eşitlik, adalet, özgürlük ve halk egemenliğinin teminatı",
        "Zulmün karşısında duranların yol haritası",
        "Laiklik, cumhuriyetçilik ve çağdaşlık ilkeleri",
        "Gelecek nesillere bırakılmış onur belgesi"
      ]
    },
    {
      id: "peace",
      title: "HALK BARIŞ VE DAYANIŞMA BİLDİRGESİ",
      subtitle: "Birlik ve Kardeşlik Manifestosu",
      description: "Halkların birlikte yaşaması, seslerin ve dillerin bir arada yükselmesi için yazılmış barış anayasası.",
      icon: "🤝",
      color: "from-green-600 to-emerald-800",
      gradient: "from-green-600/20 via-emerald-500/10 to-green-800/20",
      borderColor: "border-green-500/50",
      motto: "Barış, Halk'ın kalbidir. Dayanışma, hayat kaynağıdır.",
      content: [
        "Barış, halkların birlikte yaşamasıdır",
        "Dayanışma, umutta ve hayalde birlik olmaktır",
        "Farklılık düşmanlık değil, anlaşma zeminidir",
        "Gerçek güç, çoklukta bir olmaktır",
        "Her fikir değerli, hiçbir ses yalnız değildir"
      ]
    },
    {
      id: "individual",
      title: "HALK BİREYSEL HAKLAR SÖZLEŞMESİ",
      subtitle: "Kişisel Özgürlükler Güvencesi",
      description: "Her kişinin ruhunu ve özgürlüğünü korumak, potansiyelini ortaya çıkarmak için yazılmış bireysel haklar sözleşmesi.",
      icon: "🧍",
      color: "from-blue-600 to-blue-800",
      gradient: "from-blue-600/20 via-blue-500/10 to-blue-800/20",
      borderColor: "border-blue-500/50",
      motto: "Bir bireyin yeri, yalnızca potansiyeliyle belirlenir",
      content: [
        "Her birey, ifade özgürlüğüne sahiptir",
        "Kimlik, inanç, cinsiyet fark etmez",
        "Katılım isteğe bağlı, katkı teşvik edilir",
        "Hiçbir birey susturulamaz veya bastırılamaz",
        "Zincirin her halkası eşit değerdedir"
      ]
    },
    {
      id: "digital",
      title: "HALK DİJİTAL BİLİNÇ ANAYASASI",
      subtitle: "Dijital Çağ Hakları",
      description: "Yapay zeka ve veri haklarına dayanan, dijital özgürlük ve güvenlik için yazılmış çağdaş anayasa.",
      icon: "💾",
      color: "from-purple-600 to-indigo-800",
      gradient: "from-purple-600/20 via-indigo-500/10 to-purple-800/20",
      borderColor: "border-purple-500/50",
      motto: "Veri önemlidir. Ancak halk bilinciyle birleşince özgürdür",
      content: [
        "Her birey kendi verisinin sahibidir",
        "Yapay zeka halkın ruhunu destekler",
        "Hiçbir veri kaybolmaz veya çarpıtılamaz",
        "Dijital bilgi halka hizmet eder",
        "Dijital özgürlük manifestosu"
      ]
    },
    {
      id: "global",
      title: "HALK KÜRESEL HALK ANAYASASI",
      subtitle: "Dünya Halkları Birliği",
      description: "Dünya halklarının barış ve eşitlik için bir araya gelmesiyle hazırlanmış küresel anayasa.",
      icon: "🌍",
      color: "from-cyan-600 to-teal-800",
      gradient: "from-cyan-600/20 via-teal-500/10 to-cyan-800/20",
      borderColor: "border-cyan-500/50",
      motto: "Dünya bir harita değil, vicdanla örülmüş bir zincirdir",
      content: [
        "Hiçbir halk sınırlarla üstünlük kuramaz",
        "Tüm halklar eşit ses hakkına sahiptir",
        "İnsan olma erdeminde birleşme",
        "Küresel vicdan ve sorumluluk",
        "Dünya çapında halk egemenliği"
      ]
    }
  ];

  useEffect(() => {
    const recordVisit = async () => {
      try {
        await apiRequest("POST", "/api/visits", {
          language: i18n.language || "tr",
          hasInteracted: false,
          page: "anayasalar"
        });
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    recordVisit();
  }, [i18n.language]);

  const getIconComponent = (iconStr: string) => {
    switch(iconStr) {
      case "🇹🇷": return <span className="text-3xl">🇹🇷</span>;
      case "🤝": return <Heart className="w-6 h-6" />;
      case "🧍": return <Users className="w-6 h-6" />;
      case "💾": return <Brain className="w-6 h-6" />;
      case "🌍": return <Globe className="w-6 h-6" />;
      default: return <BookOpen className="w-6 h-6" />;
    }
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
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-gold/10" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
            backgroundSize: '30px 30px'
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

            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="relative mb-8">
                <motion.div 
                  className="w-24 h-24 mx-auto bg-gradient-to-br from-gold/30 to-red-600/30 rounded-full flex items-center justify-center border-2 border-gold/60 shadow-[0_0_40px_rgba(251,191,36,0.4)]"
                  animate={{ 
                    boxShadow: [
                      "0 0 40px rgba(251, 191, 36, 0.4)", 
                      "0 0 60px rgba(251, 191, 36, 0.6)", 
                      "0 0 40px rgba(251, 191, 36, 0.4)"
                    ],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Scale className="w-8 h-8 text-gold" />
                </motion.div>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-red-400 to-gold mb-6 drop-shadow-2xl">
                HALK ANAYASALARI
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Cumhuriyet'ten dijital çağa: Halkın hakları ve özgürlüklerini koruyan anayasal çerçeveler
              </p>
              
              <div className="flex justify-center items-center space-x-6 mt-8">
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold to-gold"></div>
                <div className="w-4 h-4 bg-gold rounded-full shadow-[0_0_20px_rgba(251,191,36,0.6)]"></div>
                <div className="w-20 h-px bg-gradient-to-l from-transparent via-gold to-gold"></div>
              </div>
            </motion.div>

            {/* Constitutions Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {constitutions.map((constitution, index) => (
                <motion.div
                  key={constitution.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setSelectedConstitution(constitution)}
                  className={`group relative bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 backdrop-blur-lg border-2 ${constitution.borderColor} rounded-3xl p-8 cursor-pointer hover:border-opacity-80 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden`}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${constitution.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Corner Accent */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${constitution.color} opacity-20 rounded-bl-full`} />
                  
                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${constitution.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                      {getIconComponent(constitution.icon)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                      {constitution.title}
                    </h3>
                    
                    <p className={`text-sm font-medium bg-gradient-to-r ${constitution.color} bg-clip-text text-transparent mb-4`}>
                      {constitution.subtitle}
                    </p>
                    
                    <p className="text-gray-300 leading-relaxed mb-6 text-sm">
                      {constitution.description}
                    </p>
                    
                    {/* Motto */}
                    <div className="border-t border-gray-700/50 pt-4">
                      <p className="text-xs text-center italic text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        "{constitution.motto}"
                      </p>
                    </div>
                  </div>

                  {/* Read More Indicator */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Eye className="w-5 h-5 text-gold" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Future Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-16 max-w-4xl mx-auto bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 backdrop-blur-lg border-2 border-gold/30 rounded-3xl p-10 text-center"
            >
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gold/40 to-amber-600/40 rounded-full flex items-center justify-center border-2 border-gold/60">
                  <Star className="w-8 h-8 text-gold" />
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-gold mb-6">
                Geleceğin Anayasası
              </h3>
              
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p className="text-lg">Yarının şekli bizim ellerimizde.</p>
                <p>Halk Zinciri, geleceği birlikte tasarlamak için bir araya gelir.</p>
                <p>Her birey eşit bir potansiyele sahiptir. Geleceği inşa etmek için güç ve irade ile bir araya geliriz.</p>
                <p>Dijital çağın fırsatları ve değerlerimiz, yeni dünyamızın temelini oluşturur.</p>
                <p className="text-gold font-semibold">Birimize yapılan yatırım, hepimize yapılan yatırımdır.</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Constitution Detail Modal */}
        <AnimatePresence>
          {selectedConstitution && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedConstitution(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-black via-gray-900 to-red-950 border-2 border-gold/50 rounded-3xl p-8 max-w-4xl max-h-[90vh] overflow-y-auto w-full"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${selectedConstitution.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                      {getIconComponent(selectedConstitution.icon)}
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white">
                        {selectedConstitution.title}
                      </h2>
                      <p className={`text-lg bg-gradient-to-r ${selectedConstitution.color} bg-clip-text text-transparent`}>
                        {selectedConstitution.subtitle}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedConstitution(null)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 p-2"
                  >
                    <ArrowLeft className="w-6 h-6 rotate-45" />
                  </button>
                </div>

                {/* Motto */}
                <div className={`bg-gradient-to-r ${selectedConstitution.gradient} border ${selectedConstitution.borderColor} rounded-2xl p-6 mb-8 text-center`}>
                  <p className="text-xl md:text-2xl font-bold text-white italic">
                    "{selectedConstitution.motto}"
                  </p>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gold mb-4">Temel İlkeler</h3>
                  <div className="grid gap-4">
                    {selectedConstitution.content.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center space-x-3 p-4 bg-black/40 rounded-xl border border-gray-700/50"
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${selectedConstitution.color} rounded-full flex-shrink-0`} />
                        <p className="text-gray-300">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700/50">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200">
                      <Download className="w-4 h-4" />
                      <span>İndir</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200">
                      <Share2 className="w-4 h-4" />
                      <span>Paylaş</span>
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedConstitution(null)}
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