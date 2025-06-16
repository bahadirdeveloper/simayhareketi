import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocation } from "wouter";
import ModernLayout from "@/components/ModernLayout";
import { apiRequest } from "@/lib/queryClient";
import { useTranslation } from 'react-i18next';
import { useQuery } from "@tanstack/react-query";
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Send, 
  Star,
  Quote,
  ArrowRight,
  Sparkles,
  Flag
} from "lucide-react";

interface FeedbackEntry {
  id: number;
  name: string;
  city: string;
  message: string;
  date: string;
  approved: boolean;
  likes: number;
}

export default function HalkDefteriPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    message: ""
  });

  const pageContent = "Halk Koordinasyonu - Mazlum halkların sesini duyurduğu demokratik platform. Egemenlik kayıtsız şartsız halktadır.";

  // Fetch real feedback data from API
  const { data: feedbackData = [], isLoading: feedbackLoading } = useQuery({
    queryKey: ["/api/feedback"],
    retry: false,
  });

  // Fetch real statistics from API
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/live-stats"],
    retry: false,
  });

  useEffect(() => {
    const recordVisit = async () => {
      try {
        await apiRequest("POST", "/api/visits", {
          language: i18n.language || "tr",
          hasInteracted: false,
          page: "halk-defteri"
        });
      } catch (error) {
        // Silent visit tracking error
      }
    };
    recordVisit();
  }, [i18n.language]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiRequest("POST", "/api/feedback", formData);
      setFormData({ name: "", city: "", message: "" });
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  // Use real API data with proper type checking
  const entries = Array.isArray(feedbackData) ? feedbackData : [];

  // Create stats from real data with safe checks
  const stats = [
    { 
      icon: <Users className="w-6 h-6" />, 
      number: ((statsData as any)?.participants || 0).toString(), 
      label: "Aktif Katılımcı" 
    },
    { 
      icon: <MessageSquare className="w-6 h-6" />, 
      number: entries.length.toString(), 
      label: "Halk Mesajı" 
    },
    { 
      icon: <Heart className="w-6 h-6" />, 
      number: ((statsData as any)?.volunteers || 0).toString(), 
      label: "Gönüllü" 
    },
    { 
      icon: <Flag className="w-6 h-6" />, 
      number: ((statsData as any)?.activeCities || 0).toString(), 
      label: "Aktif Şehir" 
    }
  ];

  return (
    <ModernLayout 
      audioKey="turkiye" 
      showBackButton={true}
      pageContent={pageContent}
      pageName="Halk Koordinasyonu"
    >
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 bg-red-950/30 border border-red-600/40 rounded-full px-6 py-2 mb-6">
            <div className="w-8 h-8 bg-red-600/20 rounded-lg flex items-center justify-center">
              <img 
                src="@assets/image_1750060866461.png" 
                alt="Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-red-400 font-medium text-sm">Halk Koordinasyonu</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
            HALK
            <span className="block bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              KOORDİNASYONU
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Mazlum halkların sesini birleştiren demokratik platform
            <span className="block text-red-400 font-medium mt-2">"Egemenlik kayıtsız şartsız halktadır"</span>
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-r from-black/40 to-red-950/20 border border-red-600/20 rounded-xl p-6 text-center">
              <div className="flex justify-center mb-3 text-red-400">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Message Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-black/60 via-red-950/10 to-black/60 border-2 border-red-600/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-950/30 border border-red-600/30 rounded-lg flex items-center justify-center">
                  <Send className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Sesinizi Duyurun</h2>
                  <p className="text-gray-400 text-sm">Halk koordinasyonuna katkıda bulunun</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white/90 mb-2 block">Adınız</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Örn: Ahmet Y."
                      className="bg-black/40 border-red-600/30 text-white placeholder:text-white/50 h-12"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="city" className="text-white/90 mb-2 block">Şehir/Ülke</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Örn: İstanbul"
                      className="bg-black/40 border-red-600/30 text-white placeholder:text-white/50 h-12"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-white/90 mb-2 block">Mesajınız</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Düşüncelerinizi, önerilerinizi paylaşın..."
                    rows={5}
                    className="bg-black/40 border-red-600/30 text-white placeholder:text-white/50 resize-none"
                    required
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 h-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Mesajı Gönder
                </Button>
                
                <p className="text-gray-400 text-sm text-center">
                  Mesajınız incelendikten sonra halk defterinde yayınlanacaktır
                </p>
              </form>
            </div>
          </motion.div>

          {/* Messages Feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="bg-gradient-to-br from-black/60 via-red-950/10 to-black/60 border-2 border-red-600/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-950/30 border border-red-600/30 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Halk Defteri</h2>
                  <p className="text-gray-400 text-sm">Mazlum halkların sesi</p>
                </div>
              </div>
              
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {feedbackLoading ? (
                  <div className="text-center py-8 text-gray-400">Halk mesajları yükleniyor...</div>
                ) : entries.length > 0 ? (
                  entries.map((entry: any, index: number) => (
                    <motion.div 
                      key={entry.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-r from-black/40 to-red-950/20 border border-red-600/20 rounded-xl p-6 hover:border-red-500/40 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-950/30 border border-red-600/30 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-red-400" />
                          </div>
                          <div>
                            <p className="text-red-400 font-semibold">{entry.name || "Anonim"}</p>
                            <p className="text-gray-500 text-sm">{entry.city || "Bilinmiyor"}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-500 text-xs">
                            {entry.createdAt ? new Date(entry.createdAt).toLocaleDateString("tr-TR") : ""}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Heart className="w-3 h-3 text-red-400" />
                            <span className="text-xs text-gray-400">0</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <Quote className="w-5 h-5 text-red-400/30 absolute -top-1 -left-1" />
                        <p className="text-gray-300 leading-relaxed pl-6">{entry.content || entry.message}</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    Henüz halk mesajı bulunmuyor. İlk mesajı siz gönderin!
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Atatürk Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-red-950/20 to-black/40 border border-red-600/20 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full bg-gradient-to-br from-red-600 to-transparent" />
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <Star className="w-8 h-8 text-red-400" />
              </div>
              <blockquote className="text-2xl md:text-3xl font-bold text-white italic mb-4">
                "Egemenlik kayıtsız şartsız halktadır."
              </blockquote>
              <p className="text-red-400 text-lg font-medium">
                Mustafa Kemal Atatürk
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <Button
            onClick={() => navigate("/gorevler")}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-8 py-3 rounded-lg h-12"
          >
            100 Görevi İncele
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate("/anayasa")}
            className="border-red-600/30 text-red-400 hover:bg-red-950/20 px-8 py-3 rounded-lg h-12"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Anayasa Önerileri
          </Button>
        </motion.div>

      </div>
    </ModernLayout>
  );
}