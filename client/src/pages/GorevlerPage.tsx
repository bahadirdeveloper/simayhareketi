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
        id: 0,
        baslik: "🧩 Görev 0: Kurucunun Eksikleri",
        cagri: "Simay'ın eksiklerini tamamla ve geleceğini inşa et.",
        aciklama: "Türkiye Cumhuriyeti'nin ikinci yüzyılında, Simay hareketinin temellerini güçlendir ve katkıda bulun.",
        kategori: "kurucu",
        kontenjan: 1,
        tamamlayan: 0
      },
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
        id: 10,
        baslik: "🧩 10. Görev: Okul Kütüphanesi Yenileme",
        cagri: "Bir okul kütüphanesine kitap bağışı ve düzenleme desteği ver.",
        aciklama: "Yerel bir okul kütüphanesini kitap bağışı ve düzenleme çalışması ile zenginleştir.",
        kategori: "eğitim",
        kontenjan: 8,
        tamamlayan: 0
      },
      {
        id: 11,
        baslik: "🧩 11. Görev: Dijital Okuryazarlık",
        cagri: "Yaşlı bir komşuna temel bilgisayar veya akıllı telefon kullanımını öğret.",
        aciklama: "Dijital uçurumu azaltmak için yaşlılara dijital becerileri öğretme görevi.",
        kategori: "eğitim",
        kontenjan: 10,
        tamamlayan: 0
      },
      {
        id: 12,
        baslik: "🧩 12. Görev: Matematik Eğlencelidir",
        cagri: "Matematiği sevdirmek için öğrencilere yönelik eğlenceli bir atölye düzenle.",
        aciklama: "Öğrencilere matematiği sevdirmek için oyunlar ve aktiviteler içeren bir atölye düzenleyin.",
        kategori: "eğitim",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 13,
        baslik: "🧩 13. Görev: Çocuk Şenliği",
        cagri: "Mahallende çocuklar için eğitici oyunlar içeren bir şenlik düzenle.",
        aciklama: "Çocukların hem eğlenip hem öğrenebileceği bir şenlik organizasyonu yapmak.",
        kategori: "toplum",
        kontenjan: 3,
        tamamlayan: 0
      },
      {
        id: 14,
        baslik: "🧩 14. Görev: Yerli Tohum Bankası",
        cagri: "Yerel tohum koruma ve paylaşım ağı başlat.",
        aciklama: "Yerel tohumların korunması için bir paylaşım ağı kurarak biyoçeşitliliğe katkıda bulun.",
        kategori: "çevre",
        kontenjan: 4,
        tamamlayan: 0
      },
      {
        id: 15,
        baslik: "🧩 15. Görev: Kent Bahçesi",
        cagri: "Apartman bahçesinde ya da ortak bir alanda kent bahçesi oluştur.",
        aciklama: "Kentsel tarımı desteklemek ve komşularla ortak bir etkinlik yaratmak için kent bahçesi projesi.",
        kategori: "çevre",
        kontenjan: 8,
        tamamlayan: 0
      },
      {
        id: 16,
        baslik: "🧩 16. Görev: Kuş Yuvası Projesi",
        cagri: "Kuşlar için yuvalar yap ve şehrin uygun yerlerine yerleştir.",
        aciklama: "Kent içinde kuş popülasyonunu desteklemek için yuva yapım ve yerleştirme projesi.",
        kategori: "çevre",
        kontenjan: 12,
        tamamlayan: 0
      },
      {
        id: 17,
        baslik: "🧩 17. Görev: Yaşlılarla Anı Kayıt",
        cagri: "Yaşlıların anılarını dinleyip kayıt altına al ve bir koleksiyon oluştur.",
        aciklama: "Toplumsal hafızayı korumak için yaşlıların anılarını kaydetme projesi.",
        kategori: "kültür",
        kontenjan: 7,
        tamamlayan: 0
      },
      {
        id: 18,
        baslik: "🧩 18. Görev: Yerel Lezzet Arşivi",
        cagri: "Unutulmaya yüz tutmuş yerel yemek tariflerini belgelendirip paylaş.",
        aciklama: "Bölgesel mutfak kültürünü korumak için yemek tarifleri derleme ve belgeleme projesi.",
        kategori: "kültür",
        kontenjan: 10,
        tamamlayan: 0
      },
      {
        id: 19,
        baslik: "🧩 19. Görev: Gençlere Mentorluk",
        cagri: "Kendi mesleğinde bir gence mentorluk yap.",
        aciklama: "Profesyonel bilgi ve deneyimini genç nesille paylaşarak onlara yol gösterme projesi.",
        kategori: "eğitim",
        kontenjan: 15,
        tamamlayan: 0
      },
      {
        id: 20,
        baslik: "🧩 20. Görev: Sokak Hayvanları İçin",
        cagri: "Sokak hayvanları için beslenme istasyonu kur ve düzenli bakımını üstlen.",
        aciklama: "Sokak hayvanlarının yaşam koşullarını iyileştirmek için beslenme istasyonu projesi.",
        kategori: "çevre",
        kontenjan: 20,
        tamamlayan: 0
      },
      {
        id: 21,
        baslik: "🧩 21. Görev: Engelli Hakları Atölyesi",
        cagri: "Engelli hakları konusunda bilinçlendirme atölyesi düzenle.",
        aciklama: "Engelli bireylerin hakları ve toplumsal farkındalık yaratma amaçlı atölye projesi.",
        kategori: "toplum",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 22,
        baslik: "🧩 22. Görev: Çevre Temizliği",
        cagri: "Çevrende bir alan seç ve gönüllülerle temizlik etkinliği düzenle.",
        aciklama: "Çevre temizliği bilinci oluşturmak için toplu temizlik etkinliği organizasyonu.",
        kategori: "çevre",
        kontenjan: 15,
        tamamlayan: 0
      },
      {
        id: 23,
        baslik: "🧩 23. Görev: Dijital Arşiv",
        cagri: "Yerel tarihi fotoğrafları dijitalleştirip bir arşiv oluştur.",
        aciklama: "Yerel tarihi korumak için eski fotoğrafları toplayıp dijitalleştirme projesi.",
        kategori: "kültür",
        kontenjan: 3,
        tamamlayan: 0
      },
      {
        id: 24,
        baslik: "🧩 24. Görev: Kent Belleği Haritası",
        cagri: "Yaşadığın şehrin bellek haritasını çıkar ve paylaş.",
        aciklama: "Kentin tarihi ve kültürel noktalarını belirleyip interaktif bir harita oluşturma projesi.",
        kategori: "kültür",
        kontenjan: 2,
        tamamlayan: 0
      },
      {
        id: 25,
        baslik: "🧩 25. Görev: Çocuklar İçin Kodlama",
        cagri: "Çocuklara temel kodlama bilgisi öğretecek bir atölye düzenle.",
        aciklama: "Dijital çağa hazırlık için çocuklara kodlama eğitimi verme projesi.",
        kategori: "eğitim",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 26,
        baslik: "🧩 26. Görev: Ücretsiz Tamir Atölyesi",
        cagri: "Bozuk ev aletleri için ücretsiz tamir atölyesi düzenle.",
        aciklama: "İsrafı önlemek ve sürdürülebilirliği desteklemek için tamir kültürünü yaygınlaştırma projesi.",
        kategori: "çevre",
        kontenjan: 3,
        tamamlayan: 0
      },
      {
        id: 27,
        baslik: "🧩 27. Görev: Düşünce Kulübü",
        cagri: "Felsefi tartışmaların yapıldığı bir düşünce kulübü başlat.",
        aciklama: "Eleştirel düşünce ve felsefi sorgulama için düzenli toplantılar yapan bir topluluk kurma projesi.",
        kategori: "eğitim",
        kontenjan: 7,
        tamamlayan: 0
      },
      {
        id: 28,
        baslik: "🧩 28. Görev: Mahalle Gazetesi",
        cagri: "Mahallenin haberlerini içeren bir dijital gazete çıkar.",
        aciklama: "Yerel olayları ve haberleri duyurmak için mahalle gazetesi hazırlama projesi.",
        kategori: "toplum",
        kontenjan: 4,
        tamamlayan: 0
      },
      {
        id: 29,
        baslik: "🧩 29. Görev: Su Kaynakları Koruma",
        cagri: "Yerel bir su kaynağını koruma altına almak için proje geliştir.",
        aciklama: "Su kaynaklarının sürdürülebilirliği için farkındalık ve koruma projesi.",
        kategori: "çevre",
        kontenjan: 3,
        tamamlayan: 0
      },
      {
        id: 30,
        baslik: "🧩 30. Görev: Dijital Detoks Etkinliği",
        cagri: "Bir günlük dijital detoks etkinliği düzenle ve deneyimleri paylaş.",
        aciklama: "Dijital bağımlılığa karşı farkındalık yaratmak için toplu dijital detoks etkinliği.",
        kategori: "psikoloji",
        kontenjan: 25,
        tamamlayan: 0
      },
      {
        id: 31,
        baslik: "🧩 31. Görev: Stres Yönetimi Atölyesi",
        cagri: "Stres yönetimi teknikleri öğreten bir atölye düzenle.",
        aciklama: "Günlük hayatta stresle başa çıkma yöntemlerini paylaşmak için atölye çalışması.",
        kategori: "psikoloji",
        kontenjan: 10,
        tamamlayan: 0
      },
      {
        id: 32,
        baslik: "🧩 32. Görev: Doğal Afet Bilinçlendirmesi",
        cagri: "Doğal afetlere hazırlık konusunda bir bilinçlendirme etkinliği düzenle.",
        aciklama: "Deprem, sel gibi doğal afetlere karşı toplumsal hazırlık eğitimi verme projesi.",
        kategori: "toplum",
        kontenjan: 7,
        tamamlayan: 0
      },
      {
        id: 33,
        baslik: "🧩 33. Görev: Müzik Terapi Atölyesi",
        cagri: "Müzik terapinin temellerini öğreten bir atölye düzenle.",
        aciklama: "Müziğin iyileştirici gücünden faydalanma yöntemlerini öğreten atölye projesi.",
        kategori: "sanat",
        kontenjan: 8,
        tamamlayan: 0
      },
      {
        id: 34,
        baslik: "🧩 34. Görev: Geleneksel El Sanatları",
        cagri: "Unutulmaya yüz tutmuş bir el sanatını öğren ve öğret.",
        aciklama: "Geleneksel el sanatlarını yaşatma ve gelecek nesillere aktarma projesi.",
        kategori: "kültür",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 35,
        baslik: "🧩 35. Görev: İlk Yardım Eğitimi",
        cagri: "Temel ilk yardım eğitimi organize et ve katılımcılara sertifika ver.",
        aciklama: "Acil durumlarda hayat kurtaracak ilk yardım bilgilerini yaygınlaştırma projesi.",
        kategori: "eğitim",
        kontenjan: 15,
        tamamlayan: 0
      },
      {
        id: 36,
        baslik: "🧩 36. Görev: Kent Belleği Sözlü Tarih",
        cagri: "Şehrin eski sakinleriyle sözlü tarih röportajları yap ve paylaş.",
        aciklama: "Şehrin geçmişini, yaşam biçimlerini ve değişimi belgelemek için sözlü tarih projesi.",
        kategori: "kültür",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 37,
        baslik: "🧩 37. Görev: Vejetaryen Mutfak Atölyesi",
        cagri: "Sürdürülebilir beslenme için vejetaryen yemek atölyesi düzenle.",
        aciklama: "Sağlıklı ve sürdürülebilir beslenme için vejetaryen mutfak eğitimi verme projesi.",
        kategori: "çevre",
        kontenjan: 8,
        tamamlayan: 0
      },
      {
        id: 38,
        baslik: "🧩 38. Görev: Bilim İletişimi",
        cagri: "Bilimsel bir konuyu halka anlaşılır şekilde anlatan bir video hazırla.",
        aciklama: "Bilimi topluma sevdirmek ve yaymak için anlaşılır bilim iletişimi içeriği hazırlama projesi.",
        kategori: "eğitim",
        kontenjan: 10,
        tamamlayan: 0
      },
      {
        id: 39,
        baslik: "🧩 39. Görev: Yerel Sanatçı Belgeseli",
        cagri: "Yörende yaşayan bir sanatçının hayatını ve eserlerini belgele.",
        aciklama: "Yerel sanat ve sanatçıları tanıtmak için kısa belgesel çekimi projesi.",
        kategori: "sanat",
        kontenjan: 3,
        tamamlayan: 0
      },
      {
        id: 40,
        baslik: "🧩 40. Görev: Oyun Tasarımı Atölyesi",
        cagri: "Çocuklara oyun tasarımı öğreten bir atölye düzenle.",
        aciklama: "Yaratıcılığı ve problem çözme becerilerini geliştirmek için oyun tasarımı eğitimi projesi.",
        kategori: "eğitim",
        kontenjan: 6,
        tamamlayan: 0
      },
      {
        id: 41,
        baslik: "🧩 41. Görev: Arı Dostu Bahçe",
        cagri: "Tozlaşmayı desteklemek için arı dostu bir bahçe oluştur.",
        aciklama: "Arı popülasyonunu desteklemek ve biyoçeşitliliği artırmak için arı dostu bitki bahçesi projesi.",
        kategori: "çevre",
        kontenjan: 10,
        tamamlayan: 0
      },
      {
        id: 42,
        baslik: "🧩 42. Görev: Dil Değişim Kulübü",
        cagri: "Farklı dilleri öğrenmek isteyenler için dil değişim kulübü kur.",
        aciklama: "Karşılıklı dil öğrenimini destekleyen topluluk kurma projesi.",
        kategori: "eğitim",
        kontenjan: 15,
        tamamlayan: 0
      },
      {
        id: 43,
        baslik: "🧩 43. Görev: Bilgisayar Bağışı",
        cagri: "Eski bilgisayarları toplayıp onararak ihtiyaç sahiplerine ulaştır.",
        aciklama: "Dijital eşitsizliği azaltmak için bilgisayar toplama, onarma ve bağışlama projesi.",
        kategori: "toplum",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 44,
        baslik: "🧩 44. Görev: Mahalle Korosu",
        cagri: "Mahalle sakinlerinden oluşan bir koro kur ve konser ver.",
        aciklama: "Topluluk ruhunu güçlendirmek ve müziği yaymak için mahalle korosu projesi.",
        kategori: "sanat",
        kontenjan: 7,
        tamamlayan: 0
      },
      {
        id: 45,
        baslik: "🧩 45. Görev: Geleneksel Oyunlar Şenliği",
        cagri: "Çocuklara geleneksel oyunları öğreten bir şenlik düzenle.",
        aciklama: "Unutulmaya yüz tutmuş geleneksel oyunları canlandırma ve aktarma projesi.",
        kategori: "kültür",
        kontenjan: 6,
        tamamlayan: 0
      },
      {
        id: 46,
        baslik: "🧩 46. Görev: Geri Dönüşüm Sanatı",
        cagri: "Atık malzemelerden sanat eserleri üretecek bir atölye düzenle.",
        aciklama: "Atık malzemelerin yaratıcı kullanımı ile sanat üretimini teşvik etme projesi.",
        kategori: "sanat",
        kontenjan: 12,
        tamamlayan: 0
      },
      {
        id: 47,
        baslik: "🧩 47. Görev: Yerel Tarih Turu",
        cagri: "Yaşadığın yerin tarihi yerlerini tanıtan ücretsiz bir tur düzenle.",
        aciklama: "Yerel tarih ve kültüre dair farkındalığı artırmak için gönüllü rehberlik projesi.",
        kategori: "kültür",
        kontenjan: 4,
        tamamlayan: 0
      },
      {
        id: 48,
        baslik: "🧩 48. Görev: Yağmur Suyu Toplama",
        cagri: "Bir yağmur suyu toplama sistemi kur ve deneyimlerini paylaş.",
        aciklama: "Su verimliliğini artırmak için pratik yağmur suyu toplama sistemi projesi.",
        kategori: "çevre",
        kontenjan: 10,
        tamamlayan: 0
      },
      {
        id: 49,
        baslik: "🧩 49. Görev: Mesleki Bilgi Paylaşımı",
        cagri: "Kendi mesleğinle ilgili bilgileri içeren bir atölye düzenle.",
        aciklama: "Mesleki bilgi birikimini genç nesille paylaşma amaçlı atölye projesi.",
        kategori: "eğitim",
        kontenjan: 8,
        tamamlayan: 0
      },
      {
        id: 50,
        baslik: "🧩 50. Görev: Gökyüzü Gözlem Gecesi",
        cagri: "Amatör gökbilimi için bir gökyüzü gözlem etkinliği düzenle.",
        aciklama: "Gökyüzü ve astronomi hakkında farkındalık yaratmak için gözlem etkinliği projesi.",
        kategori: "eğitim",
        kontenjan: 15,
        tamamlayan: 0
      },
      {
        id: 51,
        baslik: "🧩 51. Görev: Kitap Değişim Noktası",
        cagri: "Mahalledeki herkesin kitap değiş tokuşu yapabileceği bir nokta oluştur.",
        aciklama: "Kitap paylaşımını teşvik etmek ve erişimi artırmak için değişim noktası kurma projesi.",
        kategori: "kültür",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 52,
        baslik: "🧩 52. Görev: İşaret Dili Atölyesi",
        cagri: "Temel işaret dili öğreten bir atölye çalışması düzenle.",
        aciklama: "İşitme engelli bireylerle iletişimi güçlendirmek için işaret dili eğitimi projesi.",
        kategori: "toplum",
        kontenjan: 10,
        tamamlayan: 0
      },
      {
        id: 53,
        baslik: "🧩 53. Görev: Kompost Atölyesi",
        cagri: "Ev atıklarından kompost yapımını öğreten bir atölye düzenle.",
        aciklama: "Organik atıkları değerlendirmek ve toprak sağlığını iyileştirmek için kompost eğitimi projesi.",
        kategori: "çevre",
        kontenjan: 8,
        tamamlayan: 0
      },
      {
        id: 54,
        baslik: "🧩 54. Görev: Bisiklet Onarım Atölyesi",
        cagri: "Temel bisiklet bakım ve onarımını öğreten bir atölye düzenle.",
        aciklama: "Sürdürülebilir ulaşımı desteklemek için bisiklet onarım bilgilerini paylaşma projesi.",
        kategori: "çevre",
        kontenjan: 6,
        tamamlayan: 0
      },
      {
        id: 55,
        baslik: "🧩 55. Görev: Kişisel Finans Eğitimi",
        cagri: "Gençlere temel finansal okuryazarlık eğitimi ver.",
        aciklama: "Bütçe yönetimi, tasarruf ve yatırım gibi temel finansal becerileri öğretme projesi.",
        kategori: "eğitim",
        kontenjan: 10,
        tamamlayan: 0
      },
      {
        id: 56,
        baslik: "🧩 56. Görev: Renklerin Dili",
        cagri: "Renk teorisi ve renklerin psikolojik etkilerine dair bir atölye düzenle.",
        aciklama: "Renklerin insan psikolojisi üzerindeki etkileri ve sanatsal kullanımını öğreten atölye projesi.",
        kategori: "sanat",
        kontenjan: 7,
        tamamlayan: 0
      },
      {
        id: 57,
        baslik: "🧩 57. Görev: Siber Güvenlik Bilgilendirmesi",
        cagri: "Temel siber güvenlik önlemleri konusunda bir seminer düzenle.",
        aciklama: "Günlük dijital hayatta güvenliği sağlamak için pratik bilgileri paylaşma projesi.",
        kategori: "eğitim",
        kontenjan: 12,
        tamamlayan: 0
      },
      {
        id: 58,
        baslik: "🧩 58. Görev: Yerel Tohum Takas Günü",
        cagri: "Yerel tohum çeşitlerini paylaşmak için bir takas günü organize et.",
        aciklama: "Yerel tohum çeşitliliğini korumak ve yaygınlaştırmak için tohum takas etkinliği projesi.",
        kategori: "çevre",
        kontenjan: 8,
        tamamlayan: 0
      },
      {
        id: 59,
        baslik: "🧩 59. Görev: Çevre Fotoğrafçılığı",
        cagri: "Çevresel sorunları belgeleyen bir fotoğraf projesi oluştur.",
        aciklama: "Fotoğrafçılık aracılığıyla çevre sorunlarına dikkat çekme projesi.",
        kategori: "sanat",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 60,
        baslik: "🧩 60. Görev: Seramik Atölyesi",
        cagri: "Geleneksel seramik teknikleri öğreten bir atölye düzenle.",
        aciklama: "Geleneksel seramik sanatını yaşatmak ve yaygınlaştırmak için eğitim projesi.",
        kategori: "sanat",
        kontenjan: 6,
        tamamlayan: 0
      },
      {
        id: 61,
        baslik: "🧩 61. Görev: Yoga ve Meditasyon",
        cagri: "Stres yönetimi için yoga ve meditasyon oturumları düzenle.",
        aciklama: "Zihinsel ve fiziksel sağlığı desteklemek için yoga ve meditasyon eğitimi projesi.",
        kategori: "psikoloji",
        kontenjan: 15,
        tamamlayan: 0
      },
      {
        id: 62,
        baslik: "🧩 62. Görev: Akıllı Tarım Atölyesi",
        cagri: "Basit teknolojilerle tarımsal verimliliği artırma atölyesi düzenle.",
        aciklama: "Sürdürülebilir tarım için teknolojik çözümler geliştirme ve paylaşma projesi.",
        kategori: "çevre",
        kontenjan: 7,
        tamamlayan: 0
      },
      {
        id: 63,
        baslik: "🧩 63. Görev: Kariyer Danışmanlığı",
        cagri: "Gençlere yönelik ücretsiz kariyer danışmanlığı oturumları düzenle.",
        aciklama: "Gençleri iş hayatına hazırlamak için mentorluk ve kariyer rehberliği projesi.",
        kategori: "eğitim",
        kontenjan: 10,
        tamamlayan: 0
      },
      {
        id: 64,
        baslik: "🧩 64. Görev: Maker Hareketi",
        cagri: "Kendin yap kültürünü yaygınlaştırmak için bir maker atölyesi kur.",
        aciklama: "Yaratıcılık ve el becerileri geliştirme amaçlı maker hareketi projesi.",
        kategori: "eğitim",
        kontenjan: 8,
        tamamlayan: 0
      },
      {
        id: 65,
        baslik: "🧩 65. Görev: Terapötik Yaratıcı Yazı",
        cagri: "İyileştirici yaratıcı yazı teknikleri öğreten bir atölye düzenle.",
        aciklama: "Yazmanın terapötik etkilerinden faydalanarak psikolojik dayanıklılığı artırma projesi.",
        kategori: "psikoloji",
        kontenjan: 12,
        tamamlayan: 0
      },
      {
        id: 66,
        baslik: "🧩 66. Görev: Kent Tarihi Belgeleme",
        cagri: "Yok olmakta olan kentsel mirasın fotoğraflarla belgelemesini yap.",
        aciklama: "Kentsel dönüşüm sürecinde kaybolan tarihî unsurları belgeleme projesi.",
        kategori: "kültür",
        kontenjan: 4,
        tamamlayan: 0
      },
      {
        id: 67,
        baslik: "🧩 67. Görev: Doğal Kozmetik Atölyesi",
        cagri: "Doğal malzemelerden kozmetik ürünler yapımını öğreten bir atölye düzenle.",
        aciklama: "Sürdürülebilir güzellik ürünleri yapımını öğreten doğal kozmetik atölyesi projesi.",
        kategori: "çevre",
        kontenjan: 10,
        tamamlayan: 0
      },
      {
        id: 68,
        baslik: "🧩 68. Görev: Sokak Konseri",
        cagri: "Yerel müzisyenlerle birlikte bir sokak konseri organize et.",
        aciklama: "Müziği toplumsal alanlara taşımak ve yerel müzisyenleri desteklemek için sokak konseri projesi.",
        kategori: "sanat",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 69,
        baslik: "🧩 69. Görev: Yaşlılarla Teknoloji",
        cagri: "Yaşlılara akıllı telefon ve internet kullanımını öğretecek eğitimler düzenle.",
        aciklama: "Yaşlıların dijital dünyaya adaptasyonunu kolaylaştırmak için teknoloji eğitimi projesi.",
        kategori: "toplum",
        kontenjan: 15,
        tamamlayan: 0
      },
      {
        id: 70,
        baslik: "🧩 70. Görev: Kişisel Gelişim Semineri",
        cagri: "Özgüven ve hedef belirleme konusunda ücretsiz bir seminer düzenle.",
        aciklama: "Kişisel gelişim ve hedef odaklı yaşam konusunda farkındalık yaratma projesi.",
        kategori: "psikoloji",
        kontenjan: 20,
        tamamlayan: 0
      },
      {
        id: 71,
        baslik: "🧩 71. Görev: Geleneksel Müzik Atölyesi",
        cagri: "Yöresel müzik aletlerini tanıtan ve çalmayı öğreten bir atölye düzenle.",
        aciklama: "Geleneksel müzik kültürünü yaşatmak ve yaygınlaştırmak için müzik atölyesi projesi.",
        kategori: "kültür",
        kontenjan: 7,
        tamamlayan: 0
      },
      {
        id: 72,
        baslik: "🧩 72. Görev: Temiz Enerji Atölyesi",
        cagri: "Basit güneş enerjisi sistemleri kurmayı öğreten bir atölye düzenle.",
        aciklama: "Yenilenebilir enerji kullanımını yaygınlaştırmak için pratik eğitim projesi.",
        kategori: "çevre",
        kontenjan: 6,
        tamamlayan: 0
      },
      {
        id: 73,
        baslik: "🧩 73. Görev: Gençlik Kulübü Kuruluşu",
        cagri: "Gençlerin sosyal ve kültürel gelişimi için bir gençlik kulübü başlat.",
        aciklama: "Gençlerin sosyalleşebileceği, beceriler geliştirebileceği bir topluluk oluşturma projesi.",
        kategori: "toplum",
        kontenjan: 3,
        tamamlayan: 0
      },
      {
        id: 74,
        baslik: "🧩 74. Görev: Öğrenci Mentorluğu",
        cagri: "Dezavantajlı öğrencilere akademik destek için bir mentorluk programı başlat.",
        aciklama: "Eğitimde fırsat eşitliğini desteklemek için gönüllü mentorluk projesi.",
        kategori: "eğitim",
        kontenjan: 10,
        tamamlayan: 0
      },
      {
        id: 75,
        baslik: "🧩 75. Görev: Dokuma Sanatı",
        cagri: "Geleneksel dokuma tekniklerini öğreten bir atölye düzenle.",
        aciklama: "Geleneksel dokuma sanatlarını yaşatmak ve yaygınlaştırmak için eğitim projesi.",
        kategori: "sanat",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 76,
        baslik: "🧩 76. Görev: İnovasyon Kulübü",
        cagri: "Yerel sorunlara yaratıcı çözümler geliştiren bir inovasyon kulübü başlat.",
        aciklama: "Toplumsal sorunlara yenilikçi çözümler geliştirme amacıyla bir topluluk oluşturma projesi.",
        kategori: "toplum",
        kontenjan: 8,
        tamamlayan: 0
      },
      {
        id: 77,
        baslik: "🧩 77. Görev: Sıfır Atık Yaşam",
        cagri: "Sıfır atık yaşam tarzını teşvik eden bir atölye düzenle.",
        aciklama: "Günlük hayatta atık üretimini azaltmak için pratik bilgiler ve teknikler paylaşma projesi.",
        kategori: "çevre",
        kontenjan: 15,
        tamamlayan: 0
      },
      {
        id: 78,
        baslik: "🧩 78. Görev: Hayvan Hakları Eğitimi",
        cagri: "Çocuklara yönelik hayvan hakları ve refahı eğitimi düzenle.",
        aciklama: "Hayvan hakları konusunda erken yaşta bilinç oluşturmak için eğitim projesi.",
        kategori: "çevre",
        kontenjan: 10,
        tamamlayan: 0
      },
      {
        id: 79,
        baslik: "🧩 79. Görev: Storytelling Atölyesi",
        cagri: "Hikaye anlatıcılığı sanatını öğreten bir atölye düzenle.",
        aciklama: "Etkileyici hikaye anlatma tekniklerini öğreterek iletişim becerilerini geliştirme projesi.",
        kategori: "sanat",
        kontenjan: 8,
        tamamlayan: 0
      },
      {
        id: 80,
        baslik: "🧩 80. Görev: Enerji Tasarrufu Kampanyası",
        cagri: "Evlerde enerji tasarrufu sağlayacak basit önlemleri öğreten bir kampanya başlat.",
        aciklama: "Enerji verimliliği ve tasarruf yöntemlerini yaygınlaştırma projesi.",
        kategori: "çevre",
        kontenjan: 12,
        tamamlayan: 0
      },
      {
        id: 81,
        baslik: "🧩 81. Görev: Mahalle Kütüphanesi",
        cagri: "Bir mahalle kütüphanesi veya kitap köşesi oluştur.",
        aciklama: "Kitaplara erişimi artırmak için mahallede ortak kullanıma açık bir kütüphane kurma projesi.",
        kategori: "kültür",
        kontenjan: 3,
        tamamlayan: 0
      },
      {
        id: 82,
        baslik: "🧩 82. Görev: Doğa Fotoğrafçılığı",
        cagri: "Yerel doğal güzellikleri belgeleyen bir fotoğraf sergisi düzenle.",
        aciklama: "Doğal çevreye dikkati çekmek için yerel doğa fotoğrafçılığı projesi.",
        kategori: "sanat",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 83,
        baslik: "🧩 83. Görev: Bisiklet Turu",
        cagri: "Şehri keşfetmek için topluluk bisiklet turu düzenle.",
        aciklama: "Sürdürülebilir ulaşımı teşvik etmek ve şehri tanıtmak için bisiklet turu organizasyonu.",
        kategori: "toplum",
        kontenjan: 15,
        tamamlayan: 0
      },
      {
        id: 84,
        baslik: "🧩 84. Görev: Permakültür Bahçesi",
        cagri: "Permakültür ilkelerine göre tasarlanmış bir topluluk bahçesi başlat.",
        aciklama: "Sürdürülebilir tarım uygulamalarını yaygınlaştırmak için permakültür bahçesi projesi.",
        kategori: "çevre",
        kontenjan: 6,
        tamamlayan: 0
      },
      {
        id: 85,
        baslik: "🧩 85. Görev: İklim Değişikliği Semineri",
        cagri: "İklim değişikliği konusunda farkındalık yaratacak bir seminer düzenle.",
        aciklama: "İklim krizi ve alınabilecek önlemler konusunda toplumsal bilinç oluşturma projesi.",
        kategori: "çevre",
        kontenjan: 10,
        tamamlayan: 0
      },
      {
        id: 86,
        baslik: "🧩 86. Görev: Kaligrafi Atölyesi",
        cagri: "Geleneksel Türk hat sanatı ve kaligrafi öğreten bir atölye düzenle.",
        aciklama: "Hat sanatı ve kaligrafi gibi geleneksel yazı sanatlarını yaşatma projesi.",
        kategori: "sanat",
        kontenjan: 7,
        tamamlayan: 0
      },
      {
        id: 87,
        baslik: "🧩 87. Görev: Gıda İsrafını Önleme",
        cagri: "Gıda israfını azaltma yöntemleri konusunda bir bilgilendirme kampanyası başlat.",
        aciklama: "Gıda israfına karşı farkındalık yaratma ve pratik çözümler paylaşma projesi.",
        kategori: "çevre",
        kontenjan: 8,
        tamamlayan: 0
      },
      {
        id: 88,
        baslik: "🧩 88. Görev: Elektronik Atölye",
        cagri: "Temel elektronik ve devre tasarımı öğreten bir atölye düzenle.",
        aciklama: "Teknoloji üretme ve onarma becerilerini geliştirmek için elektronik eğitimi projesi.",
        kategori: "eğitim",
        kontenjan: 6,
        tamamlayan: 0
      },
      {
        id: 89,
        baslik: "🧩 89. Görev: Çocuk Hakları Eğitimi",
        cagri: "Çocuk hakları konusunda bir bilgilendirme kampanyası yürüt.",
        aciklama: "Çocuk hakları ve korunması konusunda toplumsal farkındalık yaratma projesi.",
        kategori: "toplum",
        kontenjan: 10,
        tamamlayan: 0
      },
      {
        id: 90,
        baslik: "🧩 90. Görev: Geleneksel Oyunlar",
        cagri: "Unutulmaya yüz tutmuş geleneksel oyunları belgele ve öğret.",
        aciklama: "Geleneksel sokak ve çocuk oyunlarını belgeleme ve gelecek nesillere aktarma projesi.",
        kategori: "kültür",
        kontenjan: 8,
        tamamlayan: 0
      },
      {
        id: 91,
        baslik: "🧩 91. Görev: Halk Oyunları Atölyesi",
        cagri: "Yöresel halk oyunlarını öğreten bir atölye düzenle.",
        aciklama: "Geleneksel halk oyunlarını yaşatmak ve yaygınlaştırmak için eğitim projesi.",
        kategori: "kültür",
        kontenjan: 10,
        tamamlayan: 0
      },
      {
        id: 92,
        baslik: "🧩 92. Görev: Güvenli İnternet",
        cagri: "Çocuklar için internet güvenliği eğitimi düzenle.",
        aciklama: "Çocukların güvenli internet kullanımı konusunda bilinçlendirme projesi.",
        kategori: "eğitim",
        kontenjan: 10,
        tamamlayan: 0
      },
      {
        id: 93,
        baslik: "🧩 93. Görev: Zihinsel Sağlık Atölyesi",
        cagri: "Stres yönetimi ve zihinsel sağlık konusunda bir atölye düzenle.",
        aciklama: "Zihinsel sağlığı koruma ve geliştirme yöntemlerini öğreten atölye projesi.",
        kategori: "psikoloji",
        kontenjan: 15,
        tamamlayan: 0
      },
      {
        id: 94,
        baslik: "🧩 94. Görev: Yerel Yazarlar Paneli",
        cagri: "Yörede yaşayan yazarları bir araya getiren bir panel düzenle.",
        aciklama: "Yerel edebi üretimi desteklemek ve tanıtmak için yazar buluşması projesi.",
        kategori: "kültür",
        kontenjan: 4,
        tamamlayan: 0
      },
      {
        id: 95,
        baslik: "🧩 95. Görev: Sağlıklı Beslenme Atölyesi",
        cagri: "Sağlıklı ve ekonomik beslenme yöntemleri öğreten bir atölye düzenle.",
        aciklama: "Sağlıklı yaşam ve beslenme alışkanlıkları geliştirme konusunda eğitim projesi.",
        kategori: "eğitim",
        kontenjan: 12,
        tamamlayan: 0
      },
      {
        id: 96,
        baslik: "🧩 96. Görev: Robotik Atölyesi",
        cagri: "Çocuklara temel robotik eğitimi veren bir atölye düzenle.",
        aciklama: "Geleceğin teknolojilerine hazırlık için çocuklara yönelik robotik eğitimi projesi.",
        kategori: "eğitim",
        kontenjan: 8,
        tamamlayan: 0
      },
      {
        id: 97,
        baslik: "🧩 97. Görev: Geleneksel Tıp Bilgisi",
        cagri: "Unutulmaya yüz tutmuş geleneksel şifa bitkilerini belgele ve tanıt.",
        aciklama: "Geleneksel tıbbi bilgileri ve bitkileri belgeleme, koruma ve aktarma projesi.",
        kategori: "kültür",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 98,
        baslik: "🧩 98. Görev: Mini Bilim Müzesi",
        cagri: "Basit deneylerle bir günlük mini bilim müzesi kur.",
        aciklama: "Bilim merakını artırmak için interaktif deneyler içeren geçici bilim müzesi projesi.",
        kategori: "eğitim",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 99,
        baslik: "🧩 99. Görev: Engelsiz Sanat",
        cagri: "Engelli bireylerin sanatsal ifadesini destekleyen bir atölye düzenle.",
        aciklama: "Engelli bireylerin sanatsal yeteneklerini keşfetmelerini sağlayan kapsayıcı atölye projesi.",
        kategori: "sanat",
        kontenjan: 6,
        tamamlayan: 0
      },
      {
        id: 100,
        baslik: "🧩 100. Görev: Cumhuriyet Bilinci",
        cagri: "Cumhuriyet değerlerini anlatan bir söyleşi veya panel düzenle.",
        aciklama: "Cumhuriyet'in temel değerlerini ve kazanımlarını yeni nesillere aktarma projesi.",
        kategori: "toplum",
        kontenjan: 10,
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