import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import ModernLayout from "@/components/ModernLayout";
import TurkishAmbientPlayer from "@/components/TurkishAmbientPlayer";
import { apiRequest } from "@/lib/queryClient";
import { 
  ArrowLeft,
  Users,
  Target,
  Award,
  Sparkles,
  Code,
  Palette,
  Stethoscope,
  BookOpen,
  TrendingUp,
  Brain,
  Leaf,
  Scale,
  Shield,
  Globe,
  ChevronRight,
  Star,
  Heart,
  Zap
} from "lucide-react";

interface ExpertiseCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  skills: string[];
}

export default function GorevDavetPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [selectedCard, setSelectedCard] = useState<ExpertiseCard | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const expertiseAreas: ExpertiseCard[] = [
    {
      id: "tech",
      title: "Teknoloji Uzmanları",
      subtitle: "Dijital Dönüşüm Liderleri",
      description: "Yazılım geliştirme, yapay zeka, siber güvenlik ve blockchain teknolojilerinde uzman profesyoneller",
      icon: <Code className="w-8 h-8" />,
      color: "from-blue-600 to-cyan-600",
      gradient: "from-blue-600/20 via-cyan-500/10 to-blue-800/20",
      skills: ["Yazılım Geliştirme", "Yapay Zeka", "Veri Bilimi", "Siber Güvenlik", "Blockchain"]
    },
    {
      id: "design",
      title: "Yaratıcı Tasarımcılar",
      subtitle: "Görsel İnovasyon Mimarları",
      description: "UI/UX tasarım, grafik tasarım, endüstriyel tasarım ve yaratıcı sanatlar alanında uzmanlar",
      icon: <Palette className="w-8 h-8" />,
      color: "from-purple-600 to-pink-600",
      gradient: "from-purple-600/20 via-pink-500/10 to-purple-800/20",
      skills: ["UI/UX Tasarım", "Grafik Tasarım", "Marka Kimliği", "Endüstriyel Tasarım", "Dijital Sanat"]
    },
    {
      id: "health",
      title: "Sağlık Profesyonelleri",
      subtitle: "Yaşam Kalitesi Uzmanları",
      description: "Modern tıp, telemedicine, biyomedikal mühendislik ve sağlık teknolojileri alanında uzmanlar",
      icon: <Stethoscope className="w-8 h-8" />,
      color: "from-green-600 to-emerald-600",
      gradient: "from-green-600/20 via-emerald-500/10 to-green-800/20",
      skills: ["Telemedicine", "Biyomedikal", "Genetik", "Farmakoloji", "Dijital Sağlık"]
    },
    {
      id: "education",
      title: "Eğitim Yenilikçileri",
      subtitle: "Gelecek Nesil Mimarları",
      description: "Modern eğitim teknolojileri, pedagoji, uzaktan eğitim ve öğrenme analitikleri uzmanları",
      icon: <BookOpen className="w-8 h-8" />,
      color: "from-orange-600 to-red-600",
      gradient: "from-orange-600/20 via-red-500/10 to-orange-800/20",
      skills: ["EdTech", "Pedagoji", "Uzaktan Eğitim", "Öğrenme Analitikleri", "Eğitim Psikologisi"]
    },
    {
      id: "business",
      title: "İş Dünyası Liderleri",
      subtitle: "Ekonomik Dönüşüm Uzmanları",
      description: "Fintech, e-ticaret, sürdürülebilir iş modelleri ve dijital pazarlama alanında uzmanlar",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-yellow-600 to-amber-600",
      gradient: "from-yellow-600/20 via-amber-500/10 to-yellow-800/20",
      skills: ["Fintech", "E-ticaret", "Dijital Pazarlama", "İnovasyon Yönetimi", "Sürdürülebilirlik"]
    },
    {
      id: "science",
      title: "Bilim İnsanları",
      subtitle: "Araştırma ve Geliştirme Öncüleri",
      description: "Temel bilimler, uygulamalı araştırma, nanoteknoloji ve malzeme bilimi uzmanları",
      icon: <Brain className="w-8 h-8" />,
      color: "from-indigo-600 to-violet-600",
      gradient: "from-indigo-600/20 via-violet-500/10 to-indigo-800/20",
      skills: ["Nanoteknoloji", "Malzeme Bilimi", "Biyoteknoloji", "Enerji", "Uzay Teknolojileri"]
    },
    {
      id: "environment",
      title: "Çevre Uzmanları",
      subtitle: "Sürdürülebilir Gelecek Tasarımcıları",
      description: "Yenilenebilir enerji, çevre mühendisliği, iklim değişikliği ve yeşil teknolojiler uzmanları",
      icon: <Leaf className="w-8 h-8" />,
      color: "from-teal-600 to-green-600",
      gradient: "from-teal-600/20 via-green-500/10 to-teal-800/20",
      skills: ["Yenilenebilir Enerji", "Çevre Mühendisliği", "İklim Bilimi", "Yeşil Teknoloji", "Sürdürülebilirlik"]
    },
    {
      id: "legal",
      title: "Hukuk Uzmanları",
      subtitle: "Adalet ve Etik Savunucuları",
      description: "Teknoloji hukuku, veri koruma, etik, insan hakları ve dijital hukuk alanında uzmanlar",
      icon: <Scale className="w-8 h-8" />,
      color: "from-gray-600 to-slate-600",
      gradient: "from-gray-600/20 via-slate-500/10 to-gray-800/20",
      skills: ["Teknoloji Hukuku", "Veri Koruma", "Etik", "İnsan Hakları", "Dijital Hukuk"]
    },
    {
      id: "security",
      title: "Güvenlik Uzmanları",
      subtitle: "Koruma ve Savunma Mimarları",
      description: "Siber güvenlik, ulusal güvenlik, risk yönetimi ve kriz yönetimi alanında uzmanlar",
      icon: <Shield className="w-8 h-8" />,
      color: "from-red-600 to-rose-600",
      gradient: "from-red-600/20 via-rose-500/10 to-red-800/20",
      skills: ["Siber Güvenlik", "Risk Yönetimi", "Kriz Yönetimi", "Ulusal Güvenlik", "Bilgi Güvenliği"]
    }
  ];

  useEffect(() => {
    const recordVisit = async () => {
      try {
        await apiRequest("POST", "/api/visits", {
          language: i18n.language || "tr",
          hasInteracted: false,
          page: "gorevdavet"
        });
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    recordVisit();
  }, [i18n.language]);

  return (
    <ModernLayout>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 relative overflow-hidden">
        
        {/* Ambient Music Player */}
        <div className="fixed top-6 right-6 z-50">
          <TurkishAmbientPlayer page="cagri" className="w-80" />
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-gold/10" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gold/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
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
              className="mb-8 flex items-center space-x-2 text-gray-300 hover:text-gold transition-colors duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Ana Sayfaya Dön</span>
            </motion.button>

            {/* Hero Content */}
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
                  <Users className="w-8 h-8 text-gold" />
                </motion.div>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-red-400 to-gold mb-6 drop-shadow-2xl">
                GÖREVE DAVET
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Türkiye'nin dijital dönüşümünde öncü olmak isteyen uzmanları arıyoruz
              </p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-r from-red-600/20 via-gold/10 to-red-600/20 backdrop-blur-lg border border-gold/30 rounded-2xl p-6 max-w-3xl mx-auto"
              >
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <Star className="w-6 h-6 text-gold" />
                  <span className="text-gold font-semibold text-lg">Özel Çağrı</span>
                  <Star className="w-6 h-6 text-gold" />
                </div>
                <p className="text-gray-200 text-lg">
                  "Geleceğin Türkiye'sini birlikte inşa edeceğiz. Her uzmanlık alanından yeteneklere kapımız açık."
                </p>
              </motion.div>
            </motion.div>

            {/* Expertise Areas Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mb-16">
              {expertiseAreas.map((area, index) => (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onHoverStart={() => setHoveredCard(area.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  onClick={() => setSelectedCard(area)}
                  className={`group relative bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 backdrop-blur-lg border-2 border-gray-700/50 rounded-3xl p-6 cursor-pointer transition-all duration-500 hover:border-gold/50 hover:shadow-2xl hover:-translate-y-2 overflow-hidden`}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <div className="relative z-10 mb-4">
                    <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${area.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {area.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                      {area.title}
                    </h3>
                    
                    <p className={`text-sm font-medium bg-gradient-to-r ${area.color} bg-clip-text text-transparent mb-3`}>
                      {area.subtitle}
                    </p>
                    
                    <p className="text-gray-300 leading-relaxed text-sm mb-4">
                      {area.description}
                    </p>

                    {/* Skills Preview */}
                    <div className="flex flex-wrap gap-1 justify-center">
                      {area.skills.slice(0, 3).map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {area.skills.length > 3 && (
                        <span className="text-xs text-gold">+{area.skills.length - 3}</span>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight className="w-5 h-5 text-gold" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Why Join Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 backdrop-blur-lg border-2 border-gold/30 rounded-3xl p-8 max-w-4xl mx-auto mb-16"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gold/40 to-red-600/40 rounded-full flex items-center justify-center border-2 border-gold/60 mb-4">
                  <Target className="w-8 h-8 text-gold" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4">Neden Katılmalısınız?</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: <Heart className="w-6 h-6" />, title: "Anlamlı Etki", desc: "Ülkenizin geleceğini şekillendirin" },
                  { icon: <Zap className="w-6 h-6" />, title: "İnovasyon", desc: "En yeni teknolojilerle çalışın" },
                  { icon: <Users className="w-6 h-6" />, title: "İşbirliği", desc: "Alanının en iyileriyle bir araya gelin" },
                  { icon: <Award className="w-6 h-6" />, title: "Tanınma", desc: "Ulusal ve uluslararası düzeyde saygınlık" }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-black/40 rounded-xl border border-gray-700/50"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-gold/30 to-red-600/30 rounded-full flex items-center justify-center text-gold">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
                      <p className="text-gray-300 text-sm">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center"
            >
              <motion.button
                onClick={() => navigate("/gorevler")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-gold to-red-600 hover:from-gold/90 hover:to-red-600/90 text-black font-bold text-xl px-12 py-4 rounded-2xl shadow-[0_0_30px_rgba(251,191,36,0.4)] hover:shadow-[0_0_40px_rgba(251,191,36,0.6)] transition-all duration-300"
              >
                <span className="flex items-center space-x-2">
                  <span>GÖREVLERE GİT</span>
                  <ChevronRight className="w-6 h-6" />
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCard(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-black via-gray-900 to-red-950 border-2 border-gold/50 rounded-3xl p-8 max-w-2xl max-h-[90vh] overflow-y-auto w-full"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${selectedCard.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                      {selectedCard.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white">
                        {selectedCard.title}
                      </h2>
                      <p className={`text-lg bg-gradient-to-r ${selectedCard.color} bg-clip-text text-transparent`}>
                        {selectedCard.subtitle}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 p-2"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-6">
                  {selectedCard.description}
                </p>

                {/* Skills */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gold mb-4">Uzmanlık Alanları</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedCard.skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center space-x-2 p-3 bg-black/40 rounded-xl border border-gray-700/50"
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${selectedCard.color} rounded-full flex-shrink-0`} />
                        <span className="text-gray-300 text-sm">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="text-center">
                  <motion.button
                    onClick={() => {
                      setSelectedCard(null);
                      navigate("/gorevler");
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-gold to-red-600 hover:from-gold/90 hover:to-red-600/90 text-black font-bold px-8 py-3 rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] transition-all duration-300"
                  >
                    İlgili Görevleri Görüntüle
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ModernLayout>
  );
}