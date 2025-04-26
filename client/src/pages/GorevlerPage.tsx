import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import HalfBurningEarthBackground from "@/components/HalfBurningEarthBackground";
import { apiRequest } from "@/lib/queryClient";

// Görev türü tanımı
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
  
  // Görevleri saklamak için state
  const [gorevler, setGorevler] = useState<Gorev[]>([
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
      cagri: "Evindeki atıl tarım alanını yeşillendir ya da bir saksı içinde üretime başla.",
      aciklama: "Bir yeşil alan yarat, toprakla bağ kur. Saksıda yeşillik yetiştirip fotoğraf ile belgeleyebilirsin.",
      kategori: "çevre",
      kontenjan: 10,
      tamamlayan: 0
    },
    {
      id: 4,
      baslik: "🧩 4. Görev: Parklara Geri Dönüşüm Getir",
      cagri: "Mahalledeki bir çocuk parkına çevreye uygun geri dönüşüm kutusu yerleştir.",
      aciklama: "Parkları daha çevre dostu hale getirmek için geri dönüşüm kutusu yerleştir ve bunu belgeleyerek paylaş.",
      kategori: "çevre", 
      kontenjan: 5,
      tamamlayan: 0
    },
    {
      id: 5,
      baslik: "🧩 5. Görev: Müziğe Ses Ver",
      cagri: "Ses sistemciler ya da beste yapan birini destekle, mini bir kayıt oluştur.",
      aciklama: "Sanatsal üretimi desteklemek için çevrenizdeki yetenekleri tanıtın ve kayıt altına alın.",
      kategori: "sanat",
      kontenjan: 5,
      tamamlayan: 0
    },
    {
      id: 6,
      baslik: "🧩 6. Görev: Görsel Yarat",
      cagri: "Bir resim ya da tasarım üretip #Gorev6 etiketiyle paylaş.",
      aciklama: "Sanatsal ifade özgürlüğünü kullanarak kendi resim veya grafik çalışmanızı üretin.",
      kategori: "sanat",
      kontenjan: 5,
      tamamlayan: 0
    }
  ]);
  
  // Seçilen kategori için state
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Filtre fonksiyonu
  const filteredGorevler = selectedCategory === "all" 
    ? gorevler 
    : gorevler.filter(gorev => gorev.kategori === selectedCategory);
  
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
            page: "gorevler"
          }
        );
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [i18n.language]);
  
  // Kategori değiştirme fonksiyonu
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  // Görev detayına gitme fonksiyonu
  const handleGorevDetail = (id: number) => {
    console.log(`Görev detayına git: ${id}`);
    // Görev detay sayfası hazır olduğunda burayı güncelleyebilirsiniz
    // navigate(`/gorev/${id}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center">
      <HalfBurningEarthBackground />
      
      <motion.div
        className="container mx-auto px-4 py-8 z-10 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-between items-center mb-8">
          <Button
            onClick={() => navigate("/")}
            className="bg-green-700 hover:bg-green-600 text-white"
          >
            ← {t('back_to_home')}
          </Button>
        </div>
        
        <header className="text-center mb-12">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t('gorevler.title', 'HALK olarak - 40 Görev')}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t('gorevler.description', 'Her görev tamamlandığında güçlenen bir halk zincirinin parçası olun.')}
          </motion.p>
        </header>
        
        {/* Kategori Filtreleme */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Button 
            onClick={() => handleCategoryChange("all")}
            className={`${selectedCategory === "all" ? "bg-yellow-600" : "bg-gray-700"} text-white`}
          >
            {t('gorevler.all', 'Tümü')}
          </Button>
          <Button 
            onClick={() => handleCategoryChange("eğitim")}
            className={`${selectedCategory === "eğitim" ? "bg-blue-600" : "bg-gray-700"} text-white`}
          >
            {t('gorevler.education', 'Eğitim')}
          </Button>
          <Button 
            onClick={() => handleCategoryChange("kültür")}
            className={`${selectedCategory === "kültür" ? "bg-purple-600" : "bg-gray-700"} text-white`}
          >
            {t('gorevler.culture', 'Kültür')}
          </Button>
          <Button 
            onClick={() => handleCategoryChange("çevre")}
            className={`${selectedCategory === "çevre" ? "bg-green-600" : "bg-gray-700"} text-white`}
          >
            {t('gorevler.environment', 'Çevre')}
          </Button>
          <Button 
            onClick={() => handleCategoryChange("sanat")}
            className={`${selectedCategory === "sanat" ? "bg-pink-600" : "bg-gray-700"} text-white`}
          >
            {t('gorevler.art', 'Sanat')}
          </Button>
        </motion.div>
        
        {/* Görevler Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGorevler.map((gorev, index) => (
            <motion.div 
              key={gorev.id}
              className="bg-gray-900/80 backdrop-blur-sm border-2 border-yellow-500 rounded-lg overflow-hidden shadow-lg"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 + (index * 0.1), duration: 0.8 }}
            >
              <div className="p-5">
                <h2 className="text-xl font-bold mb-3 text-yellow-400">{gorev.baslik}</h2>
                <p className="text-gray-300 mb-4 italic">"{gorev.cagri}"</p>
                <p className="text-gray-400 text-sm mb-4">{gorev.aciklama}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm 
                    ${gorev.kategori === "eğitim" ? "bg-blue-900/70 text-blue-200" : 
                      gorev.kategori === "kültür" ? "bg-purple-900/70 text-purple-200" : 
                      gorev.kategori === "çevre" ? "bg-green-900/70 text-green-200" : 
                      "bg-pink-900/70 text-pink-200"
                    }`}
                  >
                    {gorev.kategori}
                  </span>
                  <span className="text-sm text-gray-400">
                    {t('gorevler.quota', 'Kontenjan')}: {gorev.kontenjan - gorev.tamamlayan}/{gorev.kontenjan}
                  </span>
                </div>
                
                <Button 
                  onClick={() => handleGorevDetail(gorev.id)}
                  className="w-full bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-500 hover:to-red-600 text-white"
                >
                  {t('gorevler.join_btn', 'Göreve Katıl')}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Görev Sayacı */}
        <motion.div 
          className="mt-12 bg-gray-900/80 backdrop-blur-sm border border-yellow-500 rounded-lg p-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <h3 className="text-xl font-bold text-yellow-400 mb-2">{t('gorevler.statistics', 'Görev İstatistikleri')}</h3>
          <p className="text-gray-300">
            {t('gorevler.active_tasks', 'Aktif Görevler')}: <span className="text-yellow-400 font-bold">{gorevler.length}</span> | 
            {t('gorevler.completed_tasks', 'Tamamlanan Görevler')}: <span className="text-green-400 font-bold">0</span> | 
            {t('gorevler.participants', 'Toplam Katılımcı')}: <span className="text-blue-400 font-bold">0</span>
          </p>
        </motion.div>
        
        <footer className="mt-12 text-center text-gray-400 text-sm">
          &copy; 2025 Simay Hareketi — {t('gorevler.footer', 'Görevlerle büyüyen halk birliği')}
        </footer>
      </motion.div>
    </div>
  );
}