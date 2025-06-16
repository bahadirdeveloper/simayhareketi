import { storage } from "./storage";
import fs from "fs";
import path from "path";

// Atatürk'ün Medeniyet Işığında 100 Görev - Orijinal görevler
const originalTasks = [
  {
    id: 1,
    baslik: "🧩 1. Görev: Kitapla Bir Hayat Değiştir",
    cagri: "Mahallende bir çocuğa kitap hediye et ve onunla okuma saati düzenle.",
    aciklama: "Çocukların eğitime olan ilgisini artırmak için bir çocuğa kitap hediye et. Okuma saatini planla, o anları kaydet.",
    kategori: "eğitim",
    dosya: "pdf/gorev-1.pdf",
    arkaplan: "gorev-1.webp",
    kontenjan: 10,
    tamamlayan: 0
  },
  {
    id: 2,
    baslik: "🧩 2. Görev: Değerleri Kaybetme!",
    cagri: "Ailende veya çevrende unutulmaya yüz tutmuş bir değeri yazıya dök ve paylaş.",
    aciklama: "Unutulmaya yüz tutmuş gelenek, hikaye veya deyimi araştır, dijital ortamda paylaş.",
    kategori: "kültür",
    dosya: "pdf/gorev-2.pdf",
    arkaplan: "gorev-2.webp",
    kontenjan: 10,
    tamamlayan: 0
  },
  {
    id: 3,
    baslik: "🧩 3. Görev: Yeşil Alan Oluştur",
    cagri: "Evinizdeki atıl tarım alanı yeşillendir ya da bir saksı içinde üretime başla.",
    aciklama: "Bir yeşil alan yarat, toprakla bağ kur. Saksıda yeşillik yetiştirip foto ile belgeleyebilirsin.",
    kategori: "çevre",
    dosya: "pdf/gorev-3.pdf",
    arkaplan: "gorev-3.webp",
    kontenjan: 10,
    tamamlayan: 0
  },
  {
    id: 4,
    baslik: "🧩 4. Görev: Parklara Geri Dönüşüm Getir",
    cagri: "Mahallendeki bir çocuk parkına çevreye uygun geri dönüşüm kutusu yerleştir.",
    aciklama: "Parkları daha çevre dostu hale getirmek için geri dönüşüm kutusu yerleştir ve bunu belgeleyerek paylaş.",
    kategori: "çevre",
    dosya: "pdf/gorev-4.pdf",
    arkaplan: "gorev-4.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 5,
    baslik: "🧩 5. Görev: Müziğe Ses Ver",
    cagri: "Ses sistemciler ya da beste yapan birini destekle, mini bir kayıt oluştur.",
    aciklama: "Sanatsal üretimi desteklemek için çevrenizdeki yetenekleri tanıtın ve kayıt altına alın.",
    kategori: "sanat",
    dosya: "pdf/gorev-5.pdf",
    arkaplan: "gorev-5.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 6,
    baslik: "🧩 6. Görev: Görsel Yarat",
    cagri: "Bir resim ya da tasarım üretip #Gorev6 etiketiyle paylaş.",
    aciklama: "Sanatsal ifade özgürlüğünü kullanarak kendi resim veya grafik çalışmanızı üretin.",
    kategori: "sanat",
    dosya: "pdf/gorev-6.pdf",
    arkaplan: "gorev-6.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 7,
    baslik: "🧩 7. Görev: Mozaik Duvar",
    cagri: "Mahallende bir duvar temizletip gençlerle birlikte mozaik/pano oluştur.",
    aciklama: "Toplumsal estetik bilinci oluşturmak için bir duvarı birlikte sanatla dönüştürün.",
    kategori: "toplum",
    dosya: "pdf/gorev-7.pdf",
    arkaplan: "gorev-7.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 8,
    baslik: "🧩 8. Görev: Kadınlar İçin Alan Aç",
    cagri: "Kadınlara özel bir bilinçlenme toplantısı organize et.",
    aciklama: "Kadının toplumdaki rolünü güçlendirmek için eğitici ve dayanışmacı bir ortam oluştur.",
    kategori: "toplum",
    dosya: "pdf/gorev-8.pdf",
    arkaplan: "gorev-8.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 9,
    baslik: "🧩 9. Görev: Umut Mesajı",
    cagri: "Yaşadığın bir zorluğu yazıya dökerek başkalarına umut olacak şekilde paylaş.",
    aciklama: "Zorlukların paylaşıldığında nasıl güce dönüşebildiğini göstermek için kendi hikayeni anlat.",
    kategori: "psikoloji",
    dosya: "pdf/gorev-9.pdf",
    arkaplan: "gorev-9.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 10,
    baslik: "🧩 10. Görev: Gönüllü Mentor Ol",
    cagri: "Gençlik merkezinde gönüllü mentorluk başvurusu yap.",
    aciklama: "Bir gencin hayatına dokunmak için mentorluk başvurusunda bulun ve deneyimlerini paylaş.",
    kategori: "eğitim",
    dosya: "pdf/gorev-10.pdf",
    arkaplan: "gorev-10.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 11,
    baslik: "🧩 11. Görev: Kadın Kararlara Dahil",
    cagri: "Kadınların katıldığı bir karar toplantısı düzenle ya da bir öneride bulun.",
    aciklama: "Toplumun yarısı olan kadınların karar süreçlerine katılması için yerel bir toplantıda yer al ya da bir kurum/kuruluşa resmi öneride bulun.",
    kategori: "toplum",
    dosya: "pdf/gorev-11.pdf",
    arkaplan: "gorev-11.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 12,
    baslik: "🧩 12. Görev: Müzik Ruhun Gıdasıdır",
    cagri: "Bir çocukla birlikte sanat müziği dinleyin, o an videoya kaydedin.",
    aciklama: "Geleneksel sanat müziklerinin nesiller arası aktarımını desteklemek için bir çocukla birlikte dinleme deneyimi yaşayın ve kaydedin.",
    kategori: "kültür",
    dosya: "pdf/gorev-12.pdf",
    arkaplan: "gorev-12.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 13,
    baslik: "🧩 13. Görev: Sesi Yüksel!",
    cagri: "Ses sistemciler sahneye!",
    aciklama: "Bu toplum yıllarca sessizce size katlandı. Şimdi sıra sizde! Bu sayfalarda yer alan playlistleri sokaklara taşıyın, medya engelliyorsa sesimizle duyuracağız kendimizi!",
    kategori: "ifade",
    dosya: "pdf/gorev-13.pdf",
    arkaplan: "gorev-13.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 14,
    baslik: "🧩 14. Görev: Komşuya El Uzat",
    cagri: "Bir komşunun ihtiyacına karşılıksız yardım et.",
    aciklama: "Yakın çevrenizdeki bir komşunun ihtiyacını tespit edin ve hiçbir karşılık beklemeden yardım edin. Bu dayanışmayı belgeleyin.",
    kategori: "toplum",
    dosya: "pdf/gorev-14.pdf",
    arkaplan: "gorev-14.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 15,
    baslik: "🧩 15. Görev: Bilimle İlham Ver",
    cagri: "Bir bilim dergisini bir gence hediye et ya da birlikte oku.",
    aciklama: "Gençlerin bilimle tanışması için bir bilim yayını satın alıp hediye edin veya birlikte okuyarak fikir üretin.",
    kategori: "eğitim",
    dosya: "pdf/gorev-15.pdf",
    arkaplan: "gorev-15.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 16,
    baslik: "🧩 16. Görev: Ahlaki Örnek Ol",
    cagri: "Ailende örnek bir ahlaki davranışı görünür hale getir.",
    aciklama: "Topluma aktarılması gereken değerli bir davranışı ailende belgeleyerek ya da anlatarak görünür hale getir.",
    kategori: "ahlak",
    dosya: "pdf/gorev-16.pdf",
    arkaplan: "gorev-16.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 17,
    baslik: "🧩 17. Görev: Karşıt Görüşleri Dinle",
    cagri: "Bir fikir tartışmasında karşıt görüşü dinle, özetle.",
    aciklama: "Fikir özgürlüğünün temeli karşıt görüşlere kulak vermektir. Bir tartışmada karşı görüşü anlamaya çalış ve notlar al.",
    kategori: "ifade",
    dosya: "pdf/gorev-17.pdf",
    arkaplan: "gorev-17.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 18,
    baslik: "🧩 18. Görev: Engeli Aşan Destek",
    cagri: "Bir engelli bireyin ihtiyaçlarını gözlemleyip destek önerisi sun.",
    aciklama: "Erişilebilirlik ve farkındalık için engelli bireylerin hayatını gözlemle ve pratik destek önerileri geliştir.",
    kategori: "toplum",
    dosya: "pdf/gorev-18.pdf",
    arkaplan: "gorev-18.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 19,
    baslik: "🧩 19. Görev: Sebze Yetiştir",
    cagri: "Balkon ya da bahçede küçük bir sebze yetiştir.",
    aciklama: "Gıda bilinci ve üretkenlik için evde ya da balkonda sebze yetiştirin. Süreci belgeleyin.",
    kategori: "çevre",
    dosya: "pdf/gorev-19.pdf",
    arkaplan: "gorev-19.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 20,
    baslik: "🧩 20. Görev: Tiyatroyla Tanış",
    cagri: "Yerel tiyatroya bir gençle birlikte git.",
    aciklama: "Sanatın gelişmesine katkı sağlamak için yerel tiyatro etkinliğine bir genci davet et ve deneyimi paylaş.",
    kategori: "sanat",
    dosya: "pdf/gorev-20.pdf",
    arkaplan: "gorev-20.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 21,
    baslik: "🧩 21. Görev: Geçmişe Kulak Ver",
    cagri: "Yaşlı birinden geçmiş bayramları dinle ve kaydet.",
    aciklama: "Geçmişteki kutlamaları, gelenekleri ve birlik duygusunu yaşlı birinden dinleyerek araştır. Ses kaydı veya yazılı metin hazırla.",
    kategori: "kültür",
    dosya: "pdf/gorev-21.pdf",
    arkaplan: "gorev-21.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 22,
    baslik: "🧩 22. Görev: ÖZGÜRLÜK SÖZÜN OLSUN",
    cagri: "Özgürlük hakkında kendi sözlerini yaz.",
    aciklama: "Öz farkındalık ve ifade özgürlüğünü desteklemek için özgürlük kavramına dair kendi cümlelerini üret.",
    kategori: "ifade",
    dosya: "pdf/gorev-22.pdf",
    arkaplan: "gorev-22.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 23,
    baslik: "🧩 23. Görev: Kökenlerin Keşfet",
    cagri: "Atalarının yaşadığı bir yerin tarihini araştır.",
    aciklama: "Ailene ait tarihi mekanları, köyleri veya şehirleri araştır, belgele ve bu mirası paylaş.",
    kategori: "kültür",
    dosya: "pdf/gorev-23.pdf",
    arkaplan: "gorev-23.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 24,
    baslik: "🧩 24. Görev: Dijital Detoks Günü",
    cagri: "1 gün dijital detoks yapıp üretim odaklı yaşa.",
    aciklama: "Telefon, internet ve sosyal medyadan 24 saat uzak durarak daha bilinçli bir güne adım at. Bu süreci günlük olarak yaz.",
    kategori: "bilinç",
    dosya: "pdf/gorev-24.pdf",
    arkaplan: "gorev-24.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 25,
    baslik: "🧩 25. Görev: Anmayı Unutma",
    cagri: "Bir anma törenine katıl ya da organize et.",
    aciklama: "Toplumun ortak yas ve anma kültürü için şehit, sanatçı, bilim insanı ya da önemli bir figürü anma etkinliği düzenle.",
    kategori: "toplum",
    dosya: "pdf/gorev-25.pdf",
    arkaplan: "gorev-25.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 26,
    baslik: "🧩 26. Görev: Tarihi Canlandır",
    cagri: "Tarihi bir olayı resmet ya da video üret.",
    aciklama: "Unutulmaması gereken bir tarihi olayı seç, onu sanatla anlat (resim, kısa film, animasyon, tiyatro).",
    kategori: "tarih",
    dosya: "pdf/gorev-26.pdf",
    arkaplan: "gorev-26.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 27,
    baslik: "🧩 27. Görev: Sanatçı Tanı",
    cagri: "Bir sanatçıyı 3 kişiye tanıt.",
    aciklama: "Toplumda sanata verilen değeri artırmak için bir yerli sanatçıyı çevrene anlat, eserlerini paylaş.",
    kategori: "sanat",
    dosya: "pdf/gorev-27.pdf",
    arkaplan: "gorev-27.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 28,
    baslik: "🧩 28. Görev: İnancı Tanı",
    cagri: "Farklı inançtan bir arkadaşla karşılıklı öğrenme sohbeti yap.",
    aciklama: "Farklılıkları anlamak için saygılı ve meraklı bir sohbet ortamında karşılıklı sorular sorun, öğrenin.",
    kategori: "toplum",
    dosya: "pdf/gorev-28.pdf",
    arkaplan: "gorev-28.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 29,
    baslik: "🧩 29. Görev: ÖZGÜRLÜĞÜ SOR",
    cagri: "3 kişiye özgürlük kavramı hakkında soru sor, yanıtlarını kaydet.",
    aciklama: "Toplumun özgürlük anlayışını anlamak için 3 farklı insana bu kavramı sor ve cevaplarını yaz.",
    kategori: "ifade",
    dosya: "pdf/gorev-29.pdf",
    arkaplan: "gorev-29.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 30,
    baslik: "🧩 30. Görev: Halk Gazetesi",
    cagri: "Bir günlüğüne gazete çıkar ya da haber yap.",
    aciklama: "Yaşadığın bölgedeki önemli bir olayı haber formatında yazarak veya bir bülten hazırlayarak topluma duyur.",
    kategori: "medya",
    dosya: "pdf/gorev-30.pdf",
    arkaplan: "gorev-30.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 31,
    baslik: "🧩 31. Görev: Renkli İlham",
    cagri: "Birine resim defteri veya boya hediye et.",
    aciklama: "Yaratıcılığı desteklemek için birine resim malzemesi hediye et ve onunla birlikte yaratma sürecine katıl.",
    kategori: "sanat",
    dosya: "pdf/gorev-31.pdf",
    arkaplan: "gorev-31.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 32,
    baslik: "🧩 32. Görev: Hikaye Dinle",
    cagri: "Yaşlı birinden geçmişe dair hikaye dinle.",
    aciklama: "Kültürel mirası anlamak ve korumak için büyüklerinden bir yaşam hikayesi dinleyip kaydet.",
    kategori: "kültür",
    dosya: "pdf/gorev-32.pdf",
    arkaplan: "gorev-32.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 33,
    baslik: "🧩 33. Görev: İlham Sokakta",
    cagri: "İlham nedir? konulu sokak röportajı yap.",
    aciklama: "İlham veren düşünceleri sokakta sor ve gelen yanıtları derleyerek video ya da yazıya dök.",
    kategori: "ifade",
    dosya: "pdf/gorev-33.pdf",
    arkaplan: "gorev-33.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 34,
    baslik: "🧩 34. Görev: Halkın Başarısı",
    cagri: "Halkın başarılarını anlatan bir içerik paylaş.",
    aciklama: "Toplum içindeki gösterilmeyen başarıları yazılı veya görsel olarak paylaşarak motive edici bir içerik üret.",
    kategori: "toplum",
    dosya: "pdf/gorev-34.pdf",
    arkaplan: "gorev-34.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 35,
    baslik: "🧩 35. Görev: Büyükannenin Anısı",
    cagri: "Büyük annenin hayatına dair yazılı bir anı oluştur.",
    aciklama: "Aile büyüklerinin yaşam tecrübelerinden yola çıkarak bir anısını yazılı hale getir ve paylaş.",
    kategori: "aile",
    dosya: "pdf/gorev-35.pdf",
    arkaplan: "gorev-35.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 36,
    baslik: "🧩 36. Görev: Temizlikte Birlik",
    cagri: "Komşularla imece usulü temizlik etkinliği yap.",
    aciklama: "Sokak, park veya apartman gibi ortak alanlarda çevre temizliği yaparak toplumsal dayanışmayı artır.",
    kategori: "toplum",
    dosya: "pdf/gorev-36.pdf",
    arkaplan: "gorev-36.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 37,
    baslik: "🧩 37. Görev: Hakkaniyet Talebi",
    cagri: "Belediyeye hakkaniyetli bir hizmet talebi gönder.",
    aciklama: "Yerel yönetimlere yapıcı ve adil bir hizmet talebinde bulunarak demokratik katılımı teşvik et.",
    kategori: "adalet",
    dosya: "pdf/gorev-37.pdf",
    arkaplan: "gorev-37.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 38,
    baslik: "🧩 38. Görev: Aile Ağacı",
    cagri: "Aile ağacını çizmeye başla.",
    aciklama: "Kendi kökü ve geçmişini tanımak için aileni kuşaklara ayırarak bir soy ağacı çiz.",
    kategori: "aile",
    dosya: "pdf/gorev-38.pdf",
    arkaplan: "gorev-38.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 39,
    baslik: "🧩 39. Görev: Anayasa Okuma Saati",
    cagri: "Anayasayı oku, anlamadıklarını hukukçuya sor.",
    aciklama: "Haklarını öğrenmek ve bilinçli birey olmak için anayasa metnini oku, anlamadığın kısımları uzmana danış.",
    kategori: "hukuk",
    dosya: "pdf/gorev-39.pdf",
    arkaplan: "gorev-39.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 40,
    baslik: "🧩 40. Görev: Medeniyet Eksiği",
    cagri: "Medeniyet eksiğini tespit et, çözüm önerisi yaz.",
    aciklama: "Toplumun ilerlemesi için fark ettiğin bir medeniyet eksiğini tanımla ve bunun için uygulanabilir bir çözüm yaz.",
    kategori: "medeniyet",
    dosya: "pdf/gorev-40.pdf",
    arkaplan: "gorev-40.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 41,
    baslik: "🧩 41. Görev: Kitap Zinciri",
    cagri: "Bir okul kütüphanesine kitap bağışla.",
    aciklama: "Eğitim kalitesini artırmak için okulda bulunan kütüphaneye değerli kitaplar bağışla.",
    kategori: "eğitim",
    dosya: "pdf/gorev-41.pdf",
    arkaplan: "gorev-41.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 42,
    baslik: "🧩 42. Görev: Adalet Günlüğü",
    cagri: "Günlük hayatta adaletsizlik gözlemleri yap.",
    aciklama: "Çevrende gözlemlediğin adaletsizlikleri not et ve bunlara çözüm önerileri geliştir.",
    kategori: "adalet",
    dosya: "pdf/gorev-42.pdf",
    arkaplan: "gorev-42.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 43,
    baslik: "🧩 43. Görev: Teknoloji Köprüsü",
    cagri: "Yaşlı birine teknolojiyi öğret.",
    aciklama: "Dijital uçurumu kapatmak için yaşlı bir komşu ya da akrabaya basit teknoloji kullanımını öğret.",
    kategori: "teknoloji",
    dosya: "pdf/gorev-43.pdf",
    arkaplan: "gorev-43.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 44,
    baslik: "🧩 44. Görev: Gıda İsrafını Durdur",
    cagri: "Evdeki gıda israfını bir hafta takip et.",
    aciklama: "Gıda israfını önlemek için evdeki tüketim alışkanlıklarını gözden geçir ve çözümler üret.",
    kategori: "çevre",
    dosya: "pdf/gorev-44.pdf",
    arkaplan: "gorev-44.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 45,
    baslik: "🧩 45. Görev: Masal Anlatıcısı",
    cagri: "Çocuklara geleneksel masal anlat.",
    aciklama: "Kültürel aktarımı sağlamak için çocuklara eski masalları anlat ve bu deneyimi kaydet.",
    kategori: "kültür",
    dosya: "pdf/gorev-45.pdf",
    arkaplan: "gorev-45.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 46,
    baslik: "🧩 46. Görev: Sağlık Elçisi",
    cagri: "Sağlıklı yaşam konusunda farkındalık yarat.",
    aciklama: "Çevrende sağlıklı yaşam alışkanlıkları konusunda bilgilendirme yaparak toplum sağlığına katkıda bulun.",
    kategori: "sağlık",
    dosya: "pdf/gorev-46.pdf",
    arkaplan: "gorev-46.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 47,
    baslik: "🧩 47. Görev: Doğa Fotoğrafçısı",
    cagri: "Yerel doğal güzellikleri fotoğrafla.",
    aciklama: "Yaşadığın yerin doğal güzelliklerini fotoğraflayarak paylaş ve çevre bilincini artır.",
    kategori: "çevre",
    dosya: "pdf/gorev-47.pdf",
    arkaplan: "gorev-47.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 48,
    baslik: "🧩 48. Görev: Emek Değeri",
    cagri: "Bir emekçinin hikayesini kaydet.",
    aciklama: "Çevrenizdeki emekçilerin yaşam hikayelerini dinleyerek emeğin değerini görünür kıl.",
    kategori: "toplum",
    dosya: "pdf/gorev-48.pdf",
    arkaplan: "gorev-48.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 49,
    baslik: "🧩 49. Görev: Dil Mirası",
    cagri: "Unutulan bir kelimeyi araştır ve paylaş.",
    aciklama: "Türkçenin zenginliğini korumak için unutulmaya yüz tutmuş kelimeleri araştır ve anlamlarını paylaş.",
    kategori: "dil",
    dosya: "pdf/gorev-49.pdf",
    arkaplan: "gorev-49.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 50,
    baslik: "🧩 50. Görev: Sporla Birlik",
    cagri: "Mahallende spor etkinliği organize et.",
    aciklama: "Toplumsal sağlık ve dayanışma için mahallende toplu spor etkinliği düzenle.",
    kategori: "spor",
    dosya: "pdf/gorev-50.pdf",
    arkaplan: "gorev-50.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 51,
    baslik: "🧩 51. Görev: Bellek Sarayı",
    cagri: "Aile fotoğraflarını dijitalleştir.",
    aciklama: "Aile tarihini korumak için eski fotoğrafları dijital ortama aktararak gelecek nesillere miras bırak.",
    kategori: "aile",
    dosya: "pdf/gorev-51.pdf",
    arkaplan: "gorev-51.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 52,
    baslik: "🧩 52. Görev: Yeşil Ulaşım",
    cagri: "1 hafta alternatif ulaşım kullan.",
    aciklama: "Çevreye duyarlılık için bir hafta yürüyüş, bisiklet veya toplu taşıma tercih et.",
    kategori: "çevre",
    dosya: "pdf/gorev-52.pdf",
    arkaplan: "gorev-52.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 53,
    baslik: "🧩 53. Görev: Matematik Oyunu",
    cagri: "Çocuklarla eğlenceli matematik oyunları oyna.",
    aciklama: "Eğitimi eğlenceli hale getirmek için çocuklarla matematik odaklı oyunlar organize et.",
    kategori: "eğitim",
    dosya: "pdf/gorev-53.pdf",
    arkaplan: "gorev-53.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 54,
    baslik: "🧩 54. Görev: Rüya Defteri",
    cagri: "Gençlerle gelecek hayalleri hakkında konuş.",
    aciklama: "Genç neslin motivasyonunu artırmak için onlarla gelecek planları ve hayalleri üzerine sohbet et.",
    kategori: "gençlik",
    dosya: "pdf/gorev-54.pdf",
    arkaplan: "gorev-54.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 55,
    baslik: "🧩 55. Görev: Sanat Atölyesi",
    cagri: "Evde mini sanat atölyesi kur.",
    aciklama: "Yaratıcılığı desteklemek için evde küçük çaplı sanat etkinlikleri düzenle.",
    kategori: "sanat",
    dosya: "pdf/gorev-55.pdf",
    arkaplan: "gorev-55.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 56,
    baslik: "🧩 56. Görev: Gönüllü Çevirmen",
    cagri: "Yabancı dil bilen birine Türkçe öğret.",
    aciklama: "Kültür alışverişini desteklemek için yabancı bir arkadaşınla dil öğretimi yapın.",
    kategori: "dil",
    dosya: "pdf/gorev-56.pdf",
    arkaplan: "gorev-56.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 57,
    baslik: "🧩 57. Görev: Tarihi Mekân Ziyareti",
    cagri: "Yakınınızdaki tarihi bir mekanı ziyaret et.",
    aciklama: "Tarihi bilinci artırmak için yakındaki müze, cami, köprü veya eski yapıları ziyaret edip araştır.",
    kategori: "tarih",
    dosya: "pdf/gorev-57.pdf",
    arkaplan: "gorev-57.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 58,
    baslik: "🧩 58. Görev: Ekonomi Dersi",
    cagri: "Gençlere temel ekonomi bilgisi ver.",
    aciklama: "Finansal okuryazarlığı artırmak için gençlerle para yönetimi, birikim gibi konularda sohbet et.",
    kategori: "ekonomi",
    dosya: "pdf/gorev-58.pdf",
    arkaplan: "gorev-58.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 59,
    baslik: "🧩 59. Görev: Komşu Esnaf",
    cagri: "Yerel esnafı destekle ve tanıt.",
    aciklama: "Yerel ekonomiyi güçlendirmek için çevrenizdeki esnafı sosyal medyada tanıtın.",
    kategori: "ekonomi",
    dosya: "pdf/gorev-59.pdf",
    arkaplan: "gorev-59.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 60,
    baslik: "🧩 60. Görev: Engelsiz Yaşam",
    cagri: "Engelli bireylerin günlük zorluklarını gözlemle.",
    aciklama: "Toplumsal farkındalık için engelli bireylerin karşılaştığı günlük engelleri tespit et ve çözüm öner.",
    kategori: "sosyal",
    dosya: "pdf/gorev-60.pdf",
    arkaplan: "gorev-60.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 61,
    baslik: "🧩 61. Görev: Doğa Koruyucusu",
    cagri: "Çevrendeki doğal alanları temizle.",
    aciklama: "Çevre bilincini artırmak için park, orman veya sahil alanlarında temizlik yap.",
    kategori: "çevre",
    dosya: "pdf/gorev-61.pdf",
    arkaplan: "gorev-61.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 62,
    baslik: "🧩 62. Görev: Bilim İnsanı Tanıt",
    cagri: "Türk bilim insanlarını araştır ve tanıt.",
    aciklama: "Bilime olan ilgiyi artırmak için Türk bilim insanlarının başarılarını araştırıp paylaş.",
    kategori: "bilim",
    dosya: "pdf/gorev-62.pdf",
    arkaplan: "gorev-62.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 63,
    baslik: "🧩 63. Görev: Sokak Sanatçısı",
    cagri: "Sokak müzisyenlerini destekle.",
    aciklama: "Sanat kültürünü yaygınlaştırmak için sokak sanatçılarını destekle ve tanıt.",
    kategori: "sanat",
    dosya: "pdf/gorev-63.pdf",
    arkaplan: "gorev-63.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 64,
    baslik: "🧩 64. Görev: Dijital Güvenlik",
    cagri: "Yaşlılara internet güvenliği öğret.",
    aciklama: "Dijital okuryazarlığı artırmak için yaşlı bireylere güvenli internet kullanımını öğret.",
    kategori: "teknoloji",
    dosya: "pdf/gorev-64.pdf",
    arkaplan: "gorev-64.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 65,
    baslik: "🧩 65. Görev: Kültür Köprüsü",
    cagri: "Farklı kültürlerden arkadaşlarla buluş.",
    aciklama: "Kültürel zenginliği artırmak için farklı etnik kökenlerden insanlarla dostluk kur.",
    kategori: "kültür",
    dosya: "pdf/gorev-65.pdf",
    arkaplan: "gorev-65.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 66,
    baslik: "🧩 66. Görev: Bereket Sofrası",
    cagri: "Muhtaç ailelerle iftar paylaş.",
    aciklama: "Dayanışma ruhunu güçlendirmek için ihtiyaç sahibi ailelerle yemek paylaş.",
    kategori: "sosyal",
    dosya: "pdf/gorev-66.pdf",
    arkaplan: "gorev-66.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 67,
    baslik: "🧩 67. Görev: Doğa Günlüğü",
    cagri: "Mevsim değişikliklerini gözlemle ve kaydet.",
    aciklama: "Doğa bilincini artırmak için çevrenizdeki doğal değişimleri kayıt altına al.",
    kategori: "çevre",
    dosya: "pdf/gorev-67.pdf",
    arkaplan: "gorev-67.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 68,
    baslik: "🧩 68. Görev: El Sanatları",
    cagri: "Geleneksel el sanatlarını öğren ve öğret.",
    aciklama: "Kültürel mirası korumak için geleneksel el sanatlarını öğrenip başkalarına öğret.",
    kategori: "kültür",
    dosya: "pdf/gorev-68.pdf",
    arkaplan: "gorev-68.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 69,
    baslik: "🧩 69. Görev: Gençlik Lideri",
    cagri: "Gençlik faaliyetlerinde aktif rol al.",
    aciklama: "Genç neslin gelişimi için gençlik organizasyonlarında gönüllü olarak çalış.",
    kategori: "gençlik",
    dosya: "pdf/gorev-69.pdf",
    arkaplan: "gorev-69.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 70,
    baslik: "🧩 70. Görev: Sağlık Taraması",
    cagri: "Düzenli sağlık kontrolü yaptır ve teşvik et.",
    aciklama: "Toplum sağlığını korumak için düzenli sağlık kontrollerinin önemini çevrene anlat.",
    kategori: "sağlık",
    dosya: "pdf/gorev-70.pdf",
    arkaplan: "gorev-70.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 71,
    baslik: "🧩 71. Görev: Kitap Kulübü",
    cagri: "Mahallende kitap kulübü kur.",
    aciklama: "Okuma kültürünü yaygınlaştırmak için çevrende kitap okuma grupları oluştur.",
    kategori: "eğitim",
    dosya: "pdf/gorev-71.pdf",
    arkaplan: "gorev-71.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 72,
    baslik: "🧩 72. Görev: Tasarruf Bilinci",
    cagri: "Ailede tasarruf planı hazırla.",
    aciklama: "Ekonomik bilinç geliştirmek için ailende enerji, su ve gıda tasarrufu planları yap.",
    kategori: "ekonomi",
    dosya: "pdf/gorev-72.pdf",
    arkaplan: "gorev-72.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 73,
    baslik: "🧩 73. Görev: Medya Okuryazarlığı",
    cagri: "Doğru haber kaynaklarını araştır ve paylaş.",
    aciklama: "Medya okuryazarlığını artırmak için güvenilir haber kaynakları hakkında bilgilendirme yap.",
    kategori: "medya",
    dosya: "pdf/gorev-73.pdf",
    arkaplan: "gorev-73.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 74,
    baslik: "🧩 74. Görev: Yaşlı Dostluğu",
    cagri: "Yalnız yaşayan yaşlıları ziyaret et.",
    aciklama: "Sosyal dayanışmayı güçlendirmek için yalnız yaşayan yaşlıları düzenli ziyaret et.",
    kategori: "sosyal",
    dosya: "pdf/gorev-74.pdf",
    arkaplan: "gorev-74.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 75,
    baslik: "🧩 75. Görev: Çevre Dostu Yaşam",
    cagri: "Plastik kullanımını azalt ve alternatif bul.",
    aciklama: "Çevre dostu yaşam için plastik kullanımını azaltacak pratik çözümler geliştir.",
    kategori: "çevre",
    dosya: "pdf/gorev-75.pdf",
    arkaplan: "gorev-75.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 76,
    baslik: "🧩 76. Görev: Tarih Araştırmacısı",
    cagri: "Memleketinin tarihini araştır ve belgele.",
    aciklama: "Yerel tarihi korumak için doğduğun yerin tarihini araştırıp belgeleyerek paylaş.",
    kategori: "tarih",
    dosya: "pdf/gorev-76.pdf",
    arkaplan: "gorev-76.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 77,
    baslik: "🧩 77. Görev: Güvenli Oyun",
    cagri: "Çocuklar için güvenli oyun alanları tespit et.",
    aciklama: "Çocukların güvenliği için çevredeki oyun alanlarının güvenliğini kontrol et ve raporla.",
    kategori: "güvenlik",
    dosya: "pdf/gorev-77.pdf",
    arkaplan: "gorev-77.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 78,
    baslik: "🧩 78. Görev: Yerel Üretim",
    cagri: "Yerel üreticileri destekle ve tanıt.",
    aciklama: "Yerli ekonomiyi güçlendirmek için yerel üreticilerin ürünlerini tercih et ve tanıt.",
    kategori: "ekonomi",
    dosya: "pdf/gorev-78.pdf",
    arkaplan: "gorev-78.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 79,
    baslik: "🧩 79. Görev: Kültürel Etkinlik",
    cagri: "Mahallende kültürel etkinlik organize et.",
    aciklama: "Kültürel çeşitliliği artırmak için çevrende müzik, şiir veya sanat etkinliği düzenle.",
    kategori: "kültür",
    dosya: "pdf/gorev-79.pdf",
    arkaplan: "gorev-79.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 80,
    baslik: "🧩 80. Görev: Dijital Arşiv",
    cagri: "Aile belgelerini dijital ortama aktar.",
    aciklama: "Aile tarihini korumak için önemli belgeleri ve fotoğrafları dijital arşiv haline getir.",
    kategori: "teknoloji",
    dosya: "pdf/gorev-80.pdf",
    arkaplan: "gorev-80.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 81,
    baslik: "🧩 81. Görev: Bilimsel Deney",
    cagri: "Çocuklarla basit bilim deneyleri yap.",
    aciklama: "Bilimsel düşünceyi geliştirmek için çocuklarla evde yapılabilecek basit deneyler gerçekleştir.",
    kategori: "bilim",
    dosya: "pdf/gorev-81.pdf",
    arkaplan: "gorev-81.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 82,
    baslik: "🧩 82. Görev: Gönüllü Öğretmen",
    cagri: "Eğitim desteği almayan çocuklara yardım et.",
    aciklama: "Eğitim eşitsizliğini gidermek için özel eğitim desteği alamayan çocuklara gönüllü ders ver.",
    kategori: "eğitim",
    dosya: "pdf/gorev-82.pdf",
    arkaplan: "gorev-82.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 83,
    baslik: "🧩 83. Görev: Motivasyon Konuşmacısı",
    cagri: "Gençlere motivasyon konuşması yap.",
    aciklama: "Genç neslin moral ve motivasyonunu artırmak için deneyimlerini paylaşarak konuşma yap.",
    kategori: "gençlik",
    dosya: "pdf/gorev-83.pdf",
    arkaplan: "gorev-83.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 84,
    baslik: "🧩 84. Görev: Sıfır Atık",
    cagri: "Evde sıfır atık uygulaması başlat.",
    aciklama: "Çevre bilincini artırmak için evde atık azaltma ve geri dönüşüm sistemleri kur.",
    kategori: "çevre",
    dosya: "pdf/gorev-84.pdf",
    arkaplan: "gorev-84.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 85,
    baslik: "🧩 85. Görev: Toplumsal Cinsiyet Eşitliği",
    cagri: "Cinsiyet eşitliği konusunda farkındalık yarat.",
    aciklama: "Adil bir toplum için cinsiyet eşitliği konusunda çevrende bilinçlendirme çalışması yap.",
    kategori: "sosyal",
    dosya: "pdf/gorev-85.pdf",
    arkaplan: "gorev-85.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 86,
    baslik: "🧩 86. Görev: Gıda Güvenliği",
    cagri: "Organik gıda üretimi hakkında bilgilendir.",
    aciklama: "Sağlıklı beslenme için organik tarım ve gıda güvenliği konularında bilgilendirme yap.",
    kategori: "sağlık",
    dosya: "pdf/gorev-86.pdf",
    arkaplan: "gorev-86.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 87,
    baslik: "🧩 87. Görev: Sanal Müze",
    cagri: "Mahalleni sanal müze haline getir.",
    aciklama: "Yerel tarihi korumak için çevrenizdeki tarihi yerleri fotoğraflayarak dijital müze oluştur.",
    kategori: "tarih",
    dosya: "pdf/gorev-87.pdf",
    arkaplan: "gorev-87.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 88,
    baslik: "🧩 88. Görev: İnovasyon Projesi",
    cagri: "Günlük hayatta bir problemi çözen proje geliştir.",
    aciklama: "Yaratıcı düşünceyi teşvik etmek için karşılaştığın bir soruna teknolojik çözüm üret.",
    kategori: "teknoloji",
    dosya: "pdf/gorev-88.pdf",
    arkaplan: "gorev-88.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 89,
    baslik: "🧩 89. Görev: Komşuluk Ağı",
    cagri: "Mahallende komşuluk dayanışma ağı kur.",
    aciklama: "Toplumsal bağları güçlendirmek için komşular arası yardımlaşma sistemi oluştur.",
    kategori: "toplum",
    dosya: "pdf/gorev-89.pdf",
    arkaplan: "gorev-89.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 90,
    baslik: "🧩 90. Görev: Kültür Elçisi",
    cagri: "Türk kültürünü yabancılara tanıt.",
    aciklama: "Kültür diplomasisi için yabancı arkadaşlarına Türk kültürünü, yemeklerini ve geleneklerini tanıt.",
    kategori: "kültür",
    dosya: "pdf/gorev-90.pdf",
    arkaplan: "gorev-90.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 91,
    baslik: "🧩 91. Görev: Mentorluk Ağı",
    cagri: "Gençler için mentorluk programı başlat.",
    aciklama: "Genç neslin gelişimi için deneyimli kişilerle gençleri buluşturan mentorluk ağı kur.",
    kategori: "eğitim",
    dosya: "pdf/gorev-91.pdf",
    arkaplan: "gorev-91.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 92,
    baslik: "🧩 92. Görev: Sürdürülebilir Yaşam",
    cagri: "Sürdürülebilir yaşam pratiği geliştir.",
    aciklama: "Gelecek nesiller için sürdürülebilir yaşam alışkanlıkları geliştir ve paylaş.",
    kategori: "çevre",
    dosya: "pdf/gorev-92.pdf",
    arkaplan: "gorev-92.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 93,
    baslik: "🧩 93. Görev: Hoşgörü Köprüsü",
    cagri: "Farklı görüşlerden insanlarla diyalog kur.",
    aciklama: "Toplumsal barışı güçlendirmek için farklı düşüncelerden insanlarla saygılı diyalog ortamı oluştur.",
    kategori: "sosyal",
    dosya: "pdf/gorev-93.pdf",
    arkaplan: "gorev-93.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 94,
    baslik: "🧩 94. Görev: Yaratıcı Atölye",
    cagri: "Çocuklar için yaratıcılık atölyesi düzenle.",
    aciklama: "Çocukların hayal gücünü geliştirmek için sanat, müzik veya yazma atölyeleri organize et.",
    kategori: "sanat",
    dosya: "pdf/gorev-94.pdf",
    arkaplan: "gorev-94.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 95,
    baslik: "🧩 95. Görev: Bilgi Paylaşımı",
    cagri: "Uzman olduğun alanda bilgi paylaş.",
    aciklama: "Toplumsal gelişim için kendi uzmanlık alanında bilgi paylaşım etkinlikleri düzenle.",
    kategori: "eğitim",
    dosya: "pdf/gorev-95.pdf",
    arkaplan: "gorev-95.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 96,
    baslik: "🧩 96. Görev: Toplumsal Hafıza",
    cagri: "Yerel tarih ve anıları belgeleyerek paylaş.",
    aciklama: "Toplumsal hafızayı korumak için yaşadığın yerin hikayelerini, anılarını kayıt altına al.",
    kategori: "tarih",
    dosya: "pdf/gorev-96.pdf",
    arkaplan: "gorev-96.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 97,
    baslik: "🧩 97. Görev: Geleceğe Mektup",
    cagri: "10 yıl sonraki nesillere mektup yaz.",
    aciklama: "Gelecek nesillere tavsiye ve temennilerini içeren bir mektup yazarak zaman kapsülü oluştur.",
    kategori: "gelecek",
    dosya: "pdf/gorev-97.pdf",
    arkaplan: "gorev-97.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 98,
    baslik: "🧩 98. Görev: Birlik Ve Beraberlik",
    cagri: "Mahallende birlik etkinliği organize et.",
    aciklama: "Toplumsal dayanışmayı güçlendirmek için tüm mahalleyi kucaklayan ortak etkinlik düzenle.",
    kategori: "toplum",
    dosya: "pdf/gorev-98.pdf",
    arkaplan: "gorev-98.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 99,
    baslik: "🧩 99. Görev: Medeniyet Vizyonu",
    cagri: "Türkiye'nin 2071 vizyonuna katkın için plan yap.",
    aciklama: "Cumhuriyet'in 150. yılında Türkiye'nin konumunu hayal ederek kendi katkı planını oluştur.",
    kategori: "vizyon",
    dosya: "pdf/gorev-99.pdf",
    arkaplan: "gorev-99.webp",
    kontenjan: 5,
    tamamlayan: 0
  },
  {
    id: 100,
    baslik: "🧩 100. Görev: Atatürk'ün İzinde",
    cagri: "Atatürk'ün bir sözünü hayata geçir.",
    aciklama: "Atatürk'ün değerli sözlerinden birini seç ve onu günlük yaşamında uygulayacağın bir eylem planı hazırla.",
    kategori: "atatürk",
    dosya: "pdf/gorev-100.pdf",
    arkaplan: "gorev-100.webp",
    kontenjan: 5,
    tamamlayan: 0
  }
];

console.log(`Loaded ${originalTasks.length} original tasks from Atatürk'ün Medeniyet Işığında`);

export async function seedTasks() {
  console.log("Starting task seeding process with original 100 tasks...");
  
  try {
    // Clear existing tasks
    const existingTasks = await storage.getAllGorevler();
    console.log(`Found ${existingTasks.length} existing tasks`);
    
    // Add exactly 100 original tasks
    for (const task of originalTasks) {
      await storage.createGorev({
        baslik: task.baslik,
        aciklama: task.aciklama,
        kategori: task.kategori
      });
    }
    
    console.log(`Successfully seeded exactly ${originalTasks.length} original tasks`);
    return { success: true, count: originalTasks.length };
  } catch (error) {
    console.error("Error seeding tasks:", error);
    throw error;
  }
}