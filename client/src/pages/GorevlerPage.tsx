import { useState, useEffect } from "react";
import { Target, Users, Globe, Shield, ChevronRight, Calendar, MapPin, Clock, User, Heart, Star, Filter, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { ModernLayout } from "@/components/ModernLayout";
import { useTranslation } from "react-i18next";

// Stats interface
interface Stats {
  participants: number;
  totalAmount: number;
  activeCities: number;
  activeProjects: number;
  volunteers: number;
  totalVisits: number;
  uniqueVisitors: number;
  lastUpdated: string;
}

// Görev interface
interface Gorev {
  id: number;
  baslik: string;
  aciklama: string;
  cagri: string;
  kategori: string;
  kontenjan: number;
  tamamlayan?: number;
}

// Görev başvuru formu interface
interface GorevBasvuru {
  gorevId: number;
  notlar?: string;
  userId?: string;
  userEmail?: string;
}

export default function GorevlerPage() {
  const { t } = useTranslation();
  const [selectedGorev, setSelectedGorev] = useState<Gorev | null>(null);
  const [showBasvuruForm, setShowBasvuruForm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    notlar: "",
    userId: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Fetch tasks
  const { data: gorevler = [], isLoading: gorevlerLoading } = useQuery({
    queryKey: ['/api/gorevler'],
    queryFn: () => apiRequest('GET', '/api/gorevler').then(res => res.json())
  });

  // Fetch live stats
  const { data: stats } = useQuery<Stats>({
    queryKey: ['/api/live-stats'],
    queryFn: () => apiRequest('GET', '/api/live-stats').then(res => res.json()),
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  // Filter tasks
  const filteredGorevler = gorevler.filter((gorev: Gorev) => {
    const matchesSearch = gorev.baslik.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gorev.aciklama.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || gorev.kategori === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = Array.from(new Set(gorevler.map((g: Gorev) => g.kategori)));

  // Handle form submission
  const handleBasvuru = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedGorev || !formData.email) {
      toast({
        title: "Hata",
        description: "Lütfen tüm gerekli alanları doldurun",
        variant: "destructive"
      });
      return;
    }

    try {
      const basvuruData: GorevBasvuru = {
        gorevId: selectedGorev.id,
        notlar: formData.notlar,
        userId: formData.userId || undefined,
        userEmail: formData.email
      };

      await apiRequest('POST', '/api/gorev-basvuru', basvuruData);
      
      toast({
        title: "Başvuru Başarılı",
        description: "Görev başvurunuz alınmıştır. En kısa sürede size dönüş yapılacaktır."
      });

      setShowBasvuruForm(false);
      setFormData({ email: "", notlar: "", userId: "" });
      setSelectedGorev(null);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Başvuru gönderilirken bir hata oluştu",
        variant: "destructive"
      });
    }
  };

  const categoryColors = {
    'eğitim': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'teknoloji': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'çevre': 'bg-green-500/20 text-green-400 border-green-500/30',
    'sosyal': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'kültür': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    'sağlık': 'bg-red-500/20 text-red-400 border-red-500/30',
    'spor': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'hayvan': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    'güvenlik': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    'tarım': 'bg-lime-500/20 text-lime-400 border-lime-500/30'
  };

  return (
    <ModernLayout>
      {/* Premium Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-black overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-red-600/12 rounded-full blur-3xl"></div>
        </div>

        <main className="max-w-7xl mx-auto px-4 pb-16 z-10 relative">
          {/* Modern Header */}
          <div className="text-center py-16">
            {/* Hero Section */}
            <div className="relative mb-20">
              <div className="relative">
                <div className="w-40 h-40 mx-auto mb-10 bg-gradient-to-br from-red-500/30 to-orange-600/30 rounded-full flex items-center justify-center border-4 border-red-500/60 shadow-[0_0_100px_rgba(239,68,68,0.4)]">
                  <Target className="w-20 h-20 text-white" />
                </div>
                
                {/* Premium Background Glow */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-60 h-60 bg-gradient-to-br from-red-500/15 to-transparent rounded-full blur-3xl"></div>
              </div>

              <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-white via-red-200 to-red-400 bg-clip-text text-transparent mb-8 tracking-tight">
                Dayanışma Görevleri
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
                Türkiye ve dünya mazlumlarının yanında yer alarak toplumsal değişime katkı sağlayın. 
                <span className="text-red-400 font-medium"> Her görev, daha adil bir dünya için atılan bir adımdır.</span>
              </p>

              {/* Elegant Separator */}
              <div className="flex justify-center items-center space-x-8 mt-12">
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-red-500 to-red-500"></div>
                <div className="w-6 h-6 bg-red-500 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.6)]"></div>
                <div className="w-32 h-px bg-gradient-to-l from-transparent via-red-500 to-red-500"></div>
              </div>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
              <div className="backdrop-blur-lg bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-3xl p-8 hover:border-red-400/50 transition-all duration-300">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-lg">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stats?.uniqueVisitors?.toLocaleString() || "2,847"}</div>
                <div className="text-red-200 font-medium">Aktif Katılımcı</div>
              </div>

              <div className="backdrop-blur-lg bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-3xl p-8 hover:border-green-400/50 transition-all duration-300">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center shadow-lg">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stats?.activeProjects || "101"}</div>
                <div className="text-green-200 font-medium">Aktif Görev</div>
              </div>

              <div className="backdrop-blur-lg bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-3xl p-8 hover:border-blue-400/50 transition-all duration-300">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-lg">
                    <Globe className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-blue-200 font-medium">Dijital Platform</div>
              </div>

              <div className="backdrop-blur-lg bg-gradient-to-br from-purple-900/20 to-violet-900/20 border border-purple-500/30 rounded-3xl p-8 hover:border-purple-400/50 transition-all duration-300">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-500 rounded-3xl flex items-center justify-center shadow-lg">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">MAX</div>
                <div className="text-purple-200 font-medium">Güvenlik Seviyesi</div>
              </div>
            </div>
          </div>

          {/* Enhanced Search and Filter Section */}
          <div className="mb-12">
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Görev ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-14 bg-white/5 border-white/20 text-white placeholder:text-gray-400 rounded-2xl text-lg"
                  />
                </div>
                <div className="w-full md:w-64">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-14 bg-white/5 border-white/20 text-white rounded-2xl text-lg">
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="all" className="text-white">Tüm Kategoriler</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="text-white capitalize">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Task Grid */}
          {gorevlerLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGorevler.map((gorev: Gorev, index: number) => (
                <Card key={gorev.id} className="backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/5 border border-white/10 hover:border-red-500/30 transition-all duration-300 rounded-3xl overflow-hidden group hover:shadow-2xl hover:shadow-red-500/10">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-4">
                      <Badge 
                        className={`${categoryColors[gorev.kategori as keyof typeof categoryColors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'} border rounded-full px-4 py-2 text-sm font-medium`}
                      >
                        {gorev.kategori}
                      </Badge>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{gorev.tamamlayan || 0}</div>
                        <div className="text-xs text-gray-400">tamamlayan</div>
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-white leading-tight group-hover:text-red-300 transition-colors">
                      {gorev.baslik}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-300 mb-6 leading-relaxed">
                      {gorev.aciklama.length > 120 ? `${gorev.aciklama.substring(0, 120)}...` : gorev.aciklama}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center text-sm text-gray-400">
                        <Users className="w-4 h-4 mr-2" />
                        {gorev.kontenjan} kişi
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="w-4 h-4 mr-2" />
                        Sürekli
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          onClick={() => setSelectedGorev(gorev)}
                          className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          Detayları Gör
                          <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl bg-gray-900/95 backdrop-blur-lg border border-gray-700 text-white rounded-3xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-red-400 mb-4">
                            {selectedGorev?.baslik}
                          </DialogTitle>
                          <DialogDescription className="text-gray-300 text-lg leading-relaxed">
                            {selectedGorev?.aciklama}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6 mt-6">
                          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                            <h4 className="text-red-400 font-semibold mb-3 flex items-center">
                              <Heart className="w-5 h-5 mr-2" />
                              Çağrı Mesajı
                            </h4>
                            <p className="text-gray-300 leading-relaxed">{selectedGorev?.cagri}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-2xl p-4">
                              <div className="flex items-center text-gray-400 mb-2">
                                <Users className="w-4 h-4 mr-2" />
                                Kontenjan
                              </div>
                              <div className="text-2xl font-bold text-white">{selectedGorev?.kontenjan}</div>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-4">
                              <div className="flex items-center text-gray-400 mb-2">
                                <Star className="w-4 h-4 mr-2" />
                                Tamamlayan
                              </div>
                              <div className="text-2xl font-bold text-white">{selectedGorev?.tamamlayan || 0}</div>
                            </div>
                          </div>

                          <Button 
                            onClick={() => setShowBasvuruForm(true)}
                            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-4 rounded-2xl text-lg"
                          >
                            Bu Göreve Başvur
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Enhanced Application Form */}
          <Dialog open={showBasvuruForm} onOpenChange={setShowBasvuruForm}>
            <DialogContent className="max-w-md bg-gray-900/95 backdrop-blur-lg border border-gray-700 text-white rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-red-400 mb-2">Görev Başvurusu</DialogTitle>
                <DialogDescription className="text-gray-300">
                  {selectedGorev?.baslik} görevine başvuru yapıyorsunuz.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleBasvuru} className="space-y-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    E-posta Adresi *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="bg-white/5 border-white/20 text-white rounded-2xl"
                    placeholder="ornek@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Kullanıcı ID (Opsiyonel)
                  </label>
                  <Input
                    value={formData.userId}
                    onChange={(e) => setFormData(prev => ({ ...prev, userId: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white rounded-2xl"
                    placeholder="Kullanıcı ID'niz varsa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ek Notlar
                  </label>
                  <Textarea
                    value={formData.notlar}
                    onChange={(e) => setFormData(prev => ({ ...prev, notlar: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white rounded-2xl resize-none h-24"
                    placeholder="Bu görev hakkında düşüncelerinizi veya deneyiminizi paylaşın..."
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowBasvuruForm(false)}
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 rounded-2xl"
                  >
                    İptal
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-2xl"
                  >
                    Başvuru Gönder
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </ModernLayout>
  );
}