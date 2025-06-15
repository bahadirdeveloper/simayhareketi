import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ModernLayout from "@/components/ModernLayout";
import { initAudio } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ModernTechButton } from "@/components/ModernTechButton";
import GlobalTranslator from "@/components/GlobalTranslator";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  Target, 
  Calendar, 
  Award
} from "lucide-react";

interface Gorev {
  id: number;
  baslik: string;
  aciklama: string;
  kategori?: string;
  durum?: string;
  tamamlanma_tarihi?: string;
}

export default function GorevlerPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [gorevler, setGorevler] = useState<Gorev[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    initAudio('mission');
    loadGorevler();
  }, []);

  const loadGorevler = async () => {
    try {
      setLoading(true);
      const response = await apiRequest("GET", "/api/gorevler");
      if (response.ok) {
        const data = await response.json();
        setGorevler(data);
      } else {
        throw new Error('Failed to load tasks');
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
      toast({
        title: "Hata",
        description: "Görevler yüklenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filtreleme ve arama
  const filteredGorevler = gorevler.filter(gorev => {
    const matchesSearch = gorev.baslik.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gorev.aciklama.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || gorev.kategori === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sayfalama
  const totalPages = Math.ceil(filteredGorevler.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentGorevler = filteredGorevler.slice(startIndex, startIndex + itemsPerPage);

  const getGorevImage = (id: number) => {
    // Database'deki görev ID'si ile görsel dosyasını doğrudan eşleştir (1-100 arası)
    const imageId = Math.max(1, Math.min(id, 100));
    try {
      // Vite'nin asset handling sistemi kullanılarak görsel yükleme
      return new URL(`../../../attached_assets/gorev-${imageId}.webp`, import.meta.url).href;
    } catch (error) {
      // Fallback olarak doğrudan path
      return `/attached_assets/gorev-${imageId}.webp`;
    }
  };

  const getGorevColor = (id: number) => {
    const colors = [
      "from-red-600 to-red-800",
      "from-blue-600 to-blue-800", 
      "from-green-600 to-green-800",
      "from-purple-600 to-purple-800",
      "from-orange-600 to-orange-800",
      "from-indigo-600 to-indigo-800"
    ];
    return colors[id % colors.length];
  };

  if (loading) {
    return (
      <ModernLayout 
        audioKey="mission"
        showBackButton={true}
        pageContent="100 Görev sayfası yükleniyor..."
        pageName="100 Görev"
      >
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full"></div>
        </div>
      </ModernLayout>
    );
  }

  return (
    <ModernLayout 
      audioKey="mission"
      showBackButton={true}
      pageContent="Türkiye'nin geleceği için belirlenen 100 stratejik görev. Her görev, milletimizin diriliş yolculuğunda kritik bir adımdır."
      pageName="100 Görev"
    >
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-gray-900 border-2 border-gray-700 rounded-2xl p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              100 GÖREV
            </h1>
            <p className="text-gray-300 text-lg">
              Diriliş için belirlenen stratejik hedefler
            </p>
            <div className="w-24 h-1 bg-red-500 mx-auto rounded-full mt-4"></div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Görev ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-600 text-white"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                className="bg-red-700 hover:bg-red-600"
              >
                Tümü
              </Button>
              <Button
                variant={selectedCategory === "kritik" ? "default" : "outline"}
                onClick={() => setSelectedCategory("kritik")}
              >
                Kritik
              </Button>
              <Button
                variant={selectedCategory === "normal" ? "default" : "outline"}
                onClick={() => setSelectedCategory("normal")}
              >
                Normal
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{gorevler.length}</div>
              <div className="text-gray-400 text-sm">Toplam Görev</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400">0</div>
              <div className="text-gray-400 text-sm">Tamamlanan</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">{gorevler.length}</div>
              <div className="text-gray-400 text-sm">Devam Eden</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-400">0</div>
              <div className="text-gray-400 text-sm">Geciken</div>
            </div>
          </div>
        </div>

        {/* Görev Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {currentGorevler.map((gorev) => (
            <div key={gorev.id} className="group relative">
              <div className={`bg-gradient-to-br ${getGorevColor(gorev.id)} rounded-xl p-1 hover:scale-105 transition-all duration-300`}>
                <div className="bg-gray-900 rounded-lg p-4 h-full">
                  
                  {/* Görev Resmi Arka Plan */}
                  <div className="mb-4 h-48 rounded-lg border border-gray-600 relative overflow-hidden shadow-lg">
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url('${getGorevImage(gorev.id)}')`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                    <div className="absolute top-3 right-3 bg-black/80 px-3 py-1 rounded-full text-white text-sm font-bold border border-white/30 backdrop-blur-sm">
                      #{gorev.id}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="text-white font-bold text-lg mb-2 line-clamp-1 drop-shadow-2xl">
                        {gorev.baslik}
                      </div>
                      <div className="text-gray-200 text-sm line-clamp-2 drop-shadow-lg">
                        {gorev.aciklama}
                      </div>
                    </div>
                  </div>

                  {/* Görev Bilgileri */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-red-400 bg-red-900/30 px-2 py-1 rounded">
                        #{gorev.id}
                      </span>
                      <Target className="h-4 w-4 text-red-400" />
                    </div>

                    <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2">
                      {gorev.baslik}
                    </h3>

                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                      {gorev.aciklama}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-500">Devam Eden</span>
                      </div>
                      <Award className="h-4 w-4 text-yellow-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Önceki
            </Button>
            
            <span className="text-gray-400">
              {currentPage} / {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Sonraki
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Global Translation System */}
        <GlobalTranslator />
      </div>
    </ModernLayout>
  );
}