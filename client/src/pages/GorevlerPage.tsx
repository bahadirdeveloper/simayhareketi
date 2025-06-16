import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import ModernLayout from "@/components/ModernLayout";
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
  const [, navigate] = useLocation();
  const [gorevler, setGorevler] = useState<Gorev[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
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
      // Failed to load tasks
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
    const matchesSearch = gorev.baslik?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gorev.aciklama?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Sayfalama
  const totalPages = Math.ceil(filteredGorevler.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentGorevler = filteredGorevler.slice(startIndex, startIndex + itemsPerPage);

  const getGorevImage = (id: number) => {
    try {
      // Görev ID'sine göre ilgili görev görselini eşleştir
      const finalImageId = Math.max(1, Math.min(id, 100));
      
      // Attached assets klasöründeki görev görsellerini kullan
      return `/@fs/home/runner/workspace/attached_assets/gorev-${finalImageId}.webp`;
    } catch (error) {
      return '/placeholder-task.png'; // Fallback image
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
            
            {/* GÖREV 0 - Modern Button */}
            <div className="mt-8">
              <button
                onClick={() => navigate('/kurucu-eksikleri')}
                className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-black transition-all duration-500 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-2xl shadow-2xl hover:shadow-amber-400/50 transform hover:scale-110 hover:-translate-y-2 border-2 border-amber-300/80 hover:border-amber-200 overflow-hidden"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                {/* Content */}
                <div className="relative flex items-center space-x-4">
                  <div className="w-8 h-8 bg-black/20 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <span className="text-2xl">🧩</span>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold opacity-80">GÖREV 0</div>
                    <div className="font-black tracking-wide">KURUCUNUN EKSİKLERİ</div>
                  </div>
                  <div className="w-3 h-3 bg-black/30 rounded-full group-hover:bg-white/60 transition-all duration-300 group-hover:scale-150"></div>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/20 to-yellow-400/20 blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
                variant="default"
                className="bg-red-700 hover:bg-red-600"
              >
                Tümü (100 Görev)
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

        {/* Kurucular Bölümü */}
        <div className="bg-gray-900 border-2 border-gray-700 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Kurucular ve Liderler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Mustafa Kemal Atatürk</h3>
              <p className="text-gray-400 text-sm">Cumhuriyetin Kurucusu</p>
              <p className="text-red-400 text-xs mt-2">Medeniyet Işığı</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Halk Sistemi</h3>
              <p className="text-gray-400 text-sm">Kolektif Liderlik</p>
              <p className="text-blue-400 text-xs mt-2">Dayanışma Ruhu</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Gönüllü Toplum</h3>
              <p className="text-gray-400 text-sm">Aktif Katılımcılar</p>
              <p className="text-green-400 text-xs mt-2">Özgürlük Savaşçıları</p>
            </div>
          </div>
        </div>

        {/* Davet Edilen Gruplar */}
        <div className="bg-gray-900 border-2 border-gray-700 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Kimleri Davet Ediyoruz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🎓</div>
              <h4 className="text-white font-semibold text-sm">Eğitimciler</h4>
              <p className="text-gray-400 text-xs">Öğretmenler, Akademisyenler</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🎨</div>
              <h4 className="text-white font-semibold text-sm">Sanatçılar</h4>
              <p className="text-gray-400 text-xs">Müzisyenler, Ressamlar</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🌱</div>
              <h4 className="text-white font-semibold text-sm">Çevreciler</h4>
              <p className="text-gray-400 text-xs">Doğa Koruyucuları</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🤝</div>
              <h4 className="text-white font-semibold text-sm">Gönüllüler</h4>
              <p className="text-gray-400 text-xs">Toplumsal Dayanışma</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">⚖️</div>
              <h4 className="text-white font-semibold text-sm">Hukukçular</h4>
              <p className="text-gray-400 text-xs">Adalet Savunucuları</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🏥</div>
              <h4 className="text-white font-semibold text-sm">Sağlıkçılar</h4>
              <p className="text-gray-400 text-xs">Hekim, Hemşireler</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">💼</div>
              <h4 className="text-white font-semibold text-sm">İş İnsanları</h4>
              <p className="text-gray-400 text-xs">Girişimciler, Yöneticiler</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">📚</div>
              <h4 className="text-white font-semibold text-sm">Öğrenciler</h4>
              <p className="text-gray-400 text-xs">Geleceğin Liderleri</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-300 text-sm">
              "Medeniyet ışığında birleşen her birey, bu büyük davaya katkıda bulunabilir."
            </p>
          </div>
        </div>

        {/* Görev Grid - Mobil Optimize */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8">
          {currentGorevler.map((gorev) => (
            <div key={gorev.id} className="group relative">
              <div className={`bg-gradient-to-br ${getGorevColor(gorev.id)} rounded-xl p-1 hover:scale-105 transition-all duration-300`}>
                <div className="bg-gray-900 rounded-lg p-3 sm:p-4 h-full">
                  
                  {/* Görev Resmi - Mobil Optimize */}
                  <div className="mb-4 h-36 sm:h-44 md:h-48 rounded-lg overflow-hidden shadow-lg relative bg-gray-800">
                    <img 
                      src={getGorevImage(gorev.id)}
                      alt={`Görev ${gorev.id}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNEI1NTYzIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTA1IiBmb250LWZhbWlseT0iYXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkfDtnJldiAjPC90ZXh0Pgo8L3N2Zz4=';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/80 px-2 py-1 sm:px-2.5 sm:py-1 rounded-full text-white text-xs sm:text-sm font-bold border border-white/30 backdrop-blur-sm">
                      #{gorev.id}
                    </div>
                  </div>

                  {/* Görev Bilgileri - Mobil Optimize */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-red-400 bg-red-900/30 px-2 py-0.5 rounded">
                        {gorev.kategori || 'Genel'}
                      </span>
                      <Target className="h-3 w-3 sm:h-4 sm:w-4 text-red-400" />
                    </div>

                    <h3 className="text-white font-semibold text-xs sm:text-sm leading-tight line-clamp-2">
                      {gorev.baslik}
                    </h3>

                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {gorev.aciklama}
                    </p>

                    <div className="flex items-center justify-between pt-1 sm:pt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-500">Devam Eden</span>
                      </div>
                      <Award className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 sm:gap-4 mb-8">
            <Button
              variant="outline"
              size="sm"
              className="h-12 px-4 text-sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Önceki</span>
            </Button>
            
            <span className="text-gray-400 text-sm px-2">
              {currentPage} / {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              className="h-12 px-4 text-sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <span className="hidden sm:inline">Sonraki</span>
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