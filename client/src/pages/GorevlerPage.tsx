import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import SimpleBurningEarth from "@/components/SimpleBurningEarth";
import AudioControl from "@/components/AudioControl";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Gorev {
  id: number;
  baslik: string;
  cagri: string;
  aciklama: string;
  kategori: string;
  kontenjan: number;
  tamamlayan: number;
}

export default function GorevlerPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [selectedGorev, setSelectedGorev] = useState<Gorev | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gorevler, setGorevler] = useState<Gorev[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Form state
  const [formData, setFormData] = useState({
    ad: "",
    eposta: "",
    not: ""
  });
  
  useEffect(() => {
    // Initialize audio system
    initAudio();
    
    // Record visitor stats
    const recordVisit = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: i18n.language || "tr",
            hasInteracted: false,
            page: "gorevler"
          }
        );
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
    
    // Load görevler data
    const mockGorevler: Gorev[] = [
      {
        id: 1,
        baslik: "🧩 1. Görev: Kitapla Bir Hayat Değiştir",
        cagri: "Mahallende bir çocuğa kitap hediye et ve onunla okuma saati düzenle.",
        aciklama: "Çocukların eğitime olan ilgisini artırmak için bir çocuğa kitap hediye et. Okuma saatini planla, o anları kaydet.",
        kategori: "eğitim",
        kontenjan: 10,
        tamamlayan: 0
      },
      {
        id: 2,
        baslik: "🧩 2. Görev: Değerleri Kaybetme!",
        cagri: "Ailende veya çevrende unutulmaya yüz tutmuş bir değeri yazıya dök ve paylaş.",
        aciklama: "Unutulmaya yüz tutmuş gelenek, hikaye veya deyimi araştır, dijital ortamda paylaş.",
        kategori: "kültür",
        kontenjan: 10,
        tamamlayan: 0
      },
      {
        id: 3,
        baslik: "🧩 3. Görev: Yeşil Alan Oluştur",
        cagri: "Evinizdeki atıl tarım alanı yeşillendir ya da bir saksıda üretime başla.",
        aciklama: "Bir yeşil alan yarat, toprakla bağ kur. Saksıda yeşillik yetiştirip foto ile belgeleyebilirsin.",
        kategori: "çevre",
        kontenjan: 10,
        tamamlayan: 0
      },
      {
        id: 4,
        baslik: "🧩 4. Görev: Parklara Geri Dönüşüm Getir",
        cagri: "Mahallendeki bir çocuk parkına çevreye uygun geri dönüşüm kutusu yerleştir.",
        aciklama: "Parkları daha çevre dostu hale getirmek için geri dönüşüm kutusu yerleştir ve bunu belgeleyerek paylaş.",
        kategori: "çevre",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 5,
        baslik: "🧩 5. Görev: Müziğe Ses Ver",
        cagri: "Ses sistemciler ya da beste yapan birini destekle, mini bir kayıt oluştur.",
        aciklama: "Sanatsal üretimi desteklemek için çevrendeki yetenekleri tanıt ve kayıt altına al.",
        kategori: "sanat",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 6,
        baslik: "🧩 6. Görev: Görsel Yarat",
        cagri: "Bir resim ya da tasarım üretip #Gorev6 etiketiyle paylaş.",
        aciklama: "Sanatsal ifade özgürlüğünü kullanarak kendi resim veya grafik çalışmanı üret.",
        kategori: "sanat",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 7,
        baslik: "🧩 7. Görev: Mozaik Duvar",
        cagri: "Mahallende bir duvar temizletip gençlerle birlikte mozaik/pano oluştur.",
        aciklama: "Toplumsal estetik bilinci oluşturmak için bir duvarı birlikte sanatla dönüştürün.",
        kategori: "toplum",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 8,
        baslik: "🧩 8. Görev: Kadınlar İçin Alan Aç",
        cagri: "Kadınlara özel bir bilinçlenme toplantısı organize et.",
        aciklama: "Kadının toplumdaki rolünü güçlendirmek için eğitici ve dayanışmacı bir ortam oluştur.",
        kategori: "toplum",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 9,
        baslik: "🧩 9. Görev: Umut Mesajı",
        cagri: "Yaşadığın bir zorluğu yazıya dökerek başkalarına umut olacak şekilde paylaş.",
        aciklama: "Zorlukların paylaşıldığında nasıl güce dönüşebildiğini göstermek için kendi hikayeni anlat.",
        kategori: "psikoloji",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 0,
        baslik: "🧩 Görev 0: Kurucunun Eksikleri",
        cagri: "Simay'ın eksiklerini tamamla ve geleceğini inşa et.",
        aciklama: "Türkiye Cumhuriyeti'nin ikinci yüzyılında, Simay hareketinin temellerini güçlendir ve katkıda bulun.",
        kategori: "kurucu",
        kontenjan: 1,
        tamamlayan: 0
      }
    ];
    
    setGorevler(mockGorevler);
    setIsLoading(false);
  }, [i18n.language]);
  
  const handleToggleAudio = () => {
    playSoundtrack();
  };
  
  const openModal = (gorev: Gorev) => {
    setSelectedGorev(gorev);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGorev(null);
    // Reset form
    setFormData({
      ad: "",
      eposta: "",
      not: ""
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData, "for gorev:", selectedGorev);
    // Here you would normally send this data to the server
    
    // Show success message
    alert("Başvurunuz alındı. Teşekkür ederiz.");
    
    // Close modal
    closeModal();
  };
  
  const filteredGorevler = gorevler.filter(gorev => {
    // Apply category filter if a category is selected
    if (selectedCategory && gorev.kategori !== selectedCategory) {
      return false;
    }
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        gorev.baslik.toLowerCase().includes(searchLower) ||
        gorev.cagri.toLowerCase().includes(searchLower) ||
        gorev.aciklama.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  // Get unique categories
  const categoriesSet = new Set(gorevler.map(gorev => gorev.kategori));
  const categories = Array.from(categoriesSet);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background */}
      <SimpleBurningEarth />
      
      <main className="container mx-auto px-4 pb-16 z-10 relative">
        {/* Header */}
        <div className="text-center py-10">
          <motion.h1 
            className="text-3xl md:text-5xl font-bold text-amber-400 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            101. YILINDA HALKIN ANDI: 100 GÖREVLE YENİDEN DOĞUŞ
          </motion.h1>
          
          {/* Kurucu görev button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-10"
          >
            <Button
              className="bg-gradient-to-r from-amber-500 to-amber-700 text-black font-bold text-lg px-8 py-6"
              onClick={() => {
                const kurucuGorev = gorevler.find(g => g.id === 0);
                if (kurucuGorev) {
                  openModal(kurucuGorev);
                }
              }}
            >
              🧩 GÖREV 0: KURUCUNUN EKSİKLERİ
            </Button>
          </motion.div>
          
          {/* Search and filter */}
          <div className="mb-10 flex flex-col md:flex-row items-center justify-center gap-4">
            <Input
              className="max-w-md bg-black/50 border-amber-500 text-white"
              placeholder="Görev Ara..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                className={selectedCategory === null ? "bg-cyan-500 text-black" : "border-cyan-500 text-cyan-400"}
                onClick={() => setSelectedCategory(null)}
              >
                Tümü
              </Button>
              
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={selectedCategory === category ? "bg-cyan-500 text-black" : "border-cyan-500 text-cyan-400"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Counters */}
          <div className="text-center mb-6">
            <p className="text-gray-400">Toplam Görev: {gorevler.length}</p>
            <p className="text-green-400">Tamamlanan: {gorevler.reduce((acc, g) => acc + g.tamamlayan, 0)} kişi katıldı</p>
          </div>
        </div>
        
        {/* Görevler Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {isLoading ? (
            <p className="text-center col-span-full">Görevler yükleniyor...</p>
          ) : filteredGorevler.length === 0 ? (
            <p className="text-center col-span-full">Aranan kriterlere uygun görev bulunamadı.</p>
          ) : (
            filteredGorevler.map(gorev => (
              <div 
                key={gorev.id}
                className={`bg-black/60 backdrop-blur-sm border-2 ${
                  gorev.kategori === 'kurucu' 
                    ? 'border-amber-500 shadow-[0_0_20px_rgba(255,215,0,0.4)]' 
                    : gorev.tamamlayan > 0 
                      ? 'border-green-500 shadow-[0_0_12px_rgba(68,255,68,0.4)]' 
                      : 'border-amber-500'
                } rounded-lg p-5 hover:scale-[1.03] transition-transform duration-200`}
              >
                <h3 className="text-lg md:text-xl font-bold text-amber-400 mb-3">{gorev.baslik}</h3>
                <p className="text-white mb-2">{gorev.cagri}</p>
                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                  <span>Kategori: {gorev.kategori}</span>
                  <span>{gorev.tamamlayan}/{gorev.kontenjan} kişi</span>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-red-700 to-amber-600"
                  onClick={() => openModal(gorev)}
                >
                  Göreve Katıl
                </Button>
              </div>
            ))
          )}
        </motion.div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-center mt-12 gap-4">
          <Button 
            variant="outline"
            className="border-amber-500 text-amber-400 hover:bg-amber-900/20"
            onClick={() => navigate("/turkiye")}
          >
            ◀ Türkiye Sayfasına Dön
          </Button>
          
          <Button 
            variant="outline"
            className="border-white text-white hover:bg-white/10"
            onClick={() => navigate("/")}
          >
            🏠 Ana Sayfa
          </Button>
        </div>
      </main>
      
      {/* Bottom animation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 text-white/60 text-lg italic animate-pulse z-10">
        Zaman geçiyor...
      </div>
      
      {/* Görev Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-black/85 backdrop-blur-md border border-cyan-500 text-white">
          <DialogHeader>
            <DialogTitle className="text-amber-400 text-xl">
              {selectedGorev?.baslik}
            </DialogTitle>
            <DialogDescription className="text-white">
              {selectedGorev?.aciklama}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ad">Adınız Soyadınız:</Label>
              <Input
                id="ad"
                name="ad"
                value={formData.ad}
                onChange={handleInputChange}
                className="bg-black/60 border-amber-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="eposta">E-posta:</Label>
              <Input
                id="eposta"
                name="eposta"
                type="email"
                value={formData.eposta}
                onChange={handleInputChange}
                className="bg-black/60 border-amber-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="not">Not (isteğe bağlı):</Label>
              <Textarea
                id="not"
                name="not"
                value={formData.not}
                onChange={handleInputChange}
                className="bg-black/60 border-amber-500"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dosya">Dosya yükle (PDF, JPEG):</Label>
              <Input
                id="dosya"
                name="dosya"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="bg-black/60 border-amber-500"
              />
            </div>
            
            <DialogFooter>
              <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700">
                Gönder
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <AudioControl onToggle={handleToggleAudio} />
    </div>
  );
}