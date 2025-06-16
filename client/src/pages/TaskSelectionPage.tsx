import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ModernLayout from "@/components/ModernLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Target, 
  Check, 
  Lock, 
  Star, 
  Clock,
  Users,
  Award,
  ChevronRight
} from "lucide-react";

interface Task {
  id: number;
  baslik: string;
  aciklama: string;
  kategori?: string;
  durum?: string;
  tamamlanma_tarihi?: string;
}

export default function TaskSelectionPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch available tasks
  const { data: gorevler = [], isLoading } = useQuery({
    queryKey: ['/api/gorevler'],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/gorevler");
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to fetch tasks');
    }
  });

  // Check if user has task selection right
  useEffect(() => {
    const paymentData = localStorage.getItem('completedPayment');
    if (!paymentData) {
      navigate('/katil');
      return;
    }

    const payment = JSON.parse(paymentData);
    if (payment.packageType !== 'dijital-kimlik' && payment.amount < 1) {
      navigate('/katil');
      return;
    }
  }, [navigate]);

  const handleTaskSelect = async () => {
    if (!selectedTask) {
      toast({
        title: "Görev Seçimi",
        description: "Lütfen bir görev seçin.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiRequest("POST", "/api/select-task", {
        taskId: selectedTask,
        paymentData: JSON.parse(localStorage.getItem('completedPayment') || '{}')
      });

      if (response.ok) {
        localStorage.removeItem('completedPayment');
        toast({
          title: "Görev Seçildi!",
          description: "Göreviniz başarıyla seçildi. Forum kaydına yönlendiriliyorsunuz.",
        });
        
        setTimeout(() => {
          navigate('/forum-kayit');
        }, 2000);
      } else {
        throw new Error('Görev seçimi başarısız');
      }
    } catch (error) {
      // Task selection error
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Görev seçimi başarısız",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTaskImage = (id: number) => {
    const imageId = Math.max(1, Math.min(id, 100));
    try {
      return new URL(`../../../attached_assets/gorev-${imageId}.webp`, import.meta.url).href;
    } catch (error) {
      return `/attached_assets/gorev-${imageId}.webp`;
    }
  };

  const getTaskColor = (id: number) => {
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

  if (isLoading) {
    return (
      <ModernLayout showBackButton={true} pageName="Görev Seçimi">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      </ModernLayout>
    );
  }

  return (
    <ModernLayout showBackButton={true} pageName="Görev Seçimi">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto"
          >
            <Target className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white">Görev Seçimi</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Ödemeniz tamamlandı! Artık aşağıdaki görevlerden birini seçebilir ve Türkiye'nin geleceğine katkıda bulunabilirsiniz.
          </p>
        </div>

        {/* Selection Info */}
        <Card className="bg-blue-950/50 border-blue-800/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Award className="w-6 h-6 text-blue-400" />
              <h3 className="text-white font-bold text-lg">Görev Seçim Hakkınız</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-blue-200">1 görev seçme hakkı</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-blue-200">Topluluk erişimi</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-blue-200">Özel görev takibi</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gorevler.slice(0, 12).map((gorev: Task) => (
            <motion.div
              key={gorev.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (gorev.id % 12) * 0.1 }}
              className="relative"
            >
              <Card 
                className={`
                  bg-gray-900 border-gray-700 hover:shadow-2xl transition-all duration-300 cursor-pointer
                  ${selectedTask === gorev.id ? 'ring-4 ring-blue-500 border-blue-500 bg-blue-950/30' : 'hover:border-gray-500'}
                `}
                onClick={() => setSelectedTask(gorev.id)}
              >
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={getTaskImage(gorev.id)}
                    alt={gorev.baslik}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${getTaskColor(gorev.id)} opacity-80`}></div>
                  
                  {/* Selection indicator */}
                  {selectedTask === gorev.id && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  {/* Task number */}
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-black/60 text-white">
                      Görev #{gorev.id}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-lg font-bold line-clamp-2">
                    {gorev.baslik}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                    {gorev.aciklama}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400 text-xs">Aktif</span>
                    </div>
                    
                    {gorev.kategori && (
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {gorev.kategori}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Selection Action */}
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate('/gorevler')}
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Tüm Görevleri Görüntüle
          </Button>
          
          <Button
            onClick={handleTaskSelect}
            disabled={!selectedTask || isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white px-8"
          >
            {isSubmitting ? (
              "Seçiliyor..."
            ) : selectedTask ? (
              <>
                Görev #{selectedTask} Seç
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              "Önce Görev Seçin"
            )}
          </Button>
        </div>

        {/* Help Text */}
        <div className="text-center text-gray-400 text-sm">
          <p>Görev seçtikten sonra dilediğiniz zaman görev listesinden ilerlemenizi takip edebilirsiniz.</p>
        </div>
      </div>
    </ModernLayout>
  );
}