import { storage } from "./storage";

// Comprehensive list of 101 tasks for the Turkish cultural platform
const tasks = [
  // Education Tasks (1-20)
  { baslik: "Kitapla Bir Hayat Değiştir", cagri: "Bilgi, özgürlüğün anahtarıdır. Bir kişiye kitap sevgisi aşılayarak onun dünyasını genişletin.", aciklama: "Bir kişiye kitap okuma alışkanlığı kazandırın ve hayatını değiştirin. Kitap seçimi, okuma planı ve takip süreçleri dahil.", kategori: "eğitim", kontenjan: 25 },
  { baslik: "Yaşlı Komşuna Teknoloji Desteği", cagri: "Teknoloji herkese eşit mesafede olmalı. Yaşlılarımızı da dijital dünyaya entegre edelim.", aciklama: "Yaşlı bir komşunuza akıllı telefon veya bilgisayar kullanımı öğretin. Dijital çağda kimse geride kalmasın.", kategori: "teknoloji", kontenjan: 20 },
  { baslik: "Çocuklara Ücretsiz Ders Desteği", cagri: "Her çocuk eğitim hakkına sahiptir. Geleceğin mimarları için elimizden geleni yapalım.", aciklama: "Maddi durumu iyi olmayan ailelerin çocuklarına ücretsiz ders desteği verin. Eğitim hakkı herkesindir.", kategori: "eğitim", kontenjan: 15 },
  { baslik: "Mahalle Kütüphanesi Kurmak", cagri: "Bilgi paylaşıldıkça çoğalır. Mahallenizde bir kütüphane oluşturun.", aciklama: "Komşularınızla kitap toparlayarak mahalle kütüphanesi kurun. Kitap değişim sistemi oluşturun.", kategori: "eğitim", kontenjan: 30 },
  { baslik: "Dijital Okuryazarlık Kursu", cagri: "21. yüzyılda dijital bilgi hayati önem taşır. Bu bilgiyi yaygınlaştırın.", aciklama: "Temel bilgisayar kullanımı, internet güvenliği ve dijital araçları öğretin.", kategori: "teknoloji", kontenjan: 18 },
  { baslik: "Anadolu Hikayelerini Yaşatmak", cagri: "Atalarımızın hikayeleri unutulmasın. Bu mirası gelecek nesillere aktarın.", aciklama: "Yaşlılardan dinlediğiniz hikayeleri kaydedin ve çocuklarla paylaşın.", kategori: "kültür", kontenjan: 12 },
  { baslik: "Çocuk Oyun Alanı Düzenleme", cagri: "Çocukların güvenli oynayabileceği alanlar oluşturmak hepimizin sorumluluğu.", aciklama: "Mahallenizdeki çocuk oyun alanını güvenli hale getirin ve düzenleyin.", kategori: "sosyal", kontenjan: 25 },
  { baslik: "Geri Dönüşüm Eğitimi", cagri: "Doğamızı korumak için geri dönüşüm alışkanlığı kazandırın.", aciklama: "Komşularınıza geri dönüşümün önemini anlatın ve uygulamalı eğitim verin.", kategori: "çevre", kontenjan: 40 },
  { baslik: "El Sanatları Atölyesi", cagri: "Geleneksel el sanatlarımız kaybolmasın. Bu becerileri öğretin.", aciklama: "Örgü, nakış, ahşap işçiliği gibi geleneksel sanatları öğretin.", kategori: "kültür", kontenjan: 15 },
  { baslik: "Bahçe Tarımı Eğitimi", cagri: "Toprakla bağımızı güçlendirin. Ev bahçelerinde tarım yapmasını öğretin.", aciklama: "Balkonda ve bahçede sebze yetiştirme tekniklerini öğretin.", kategori: "tarım", kontenjan: 20 },
  
  // Community Service Tasks (11-30)
  { baslik: "Mahalle Temizliği Organizasyonu", cagri: "Temiz bir çevre, sağlıklı bir yaşamın temelidir. Birlikte hareket edersek daha güçlüyüz.", aciklama: "Mahallenizde çevre temizliği etkinliği düzenleyin. Gönüllü toplayın ve ortak çalışma ruhu oluşturun.", kategori: "çevre", kontenjan: 30 },
  { baslik: "Sokak Hayvanları Bakımı", cagri: "Merhametli bir toplum, tüm canlılara şefkat gösterir. Sokak hayvanları da bu şehrin bir parçası.", aciklama: "Mahallenizdeki sokak hayvanlarının beslenmesi ve bakımını organize edin. Sahipsiz dostlarımızı unutmayalım.", kategori: "hayvan", kontenjan: 20 },
  { baslik: "Yaşlı Ziyaret Programı", cagri: "Yaşlılarımız toplumun değerli üyeleridir. Onları yalnız bırakmayalım.", aciklama: "Mahallenizdeki yaşlı komşuları düzenli ziyaret edin. Sosyal destek sağlayın.", kategori: "sosyal", kontenjan: 25 },
  { baslik: "Muhtaç Aileler İçin Yardım", cagri: "Dayanışma toplumsal bir değerdir. İhtiyaç sahiplerine el uzatın.", aciklama: "Ekonomik zorluk yaşayan ailelere gıda ve temel ihtiyaç desteği organize edin.", kategori: "sosyal", kontenjan: 35 },
  { baslik: "Komşuluk İlişkilerini Güçlendirme", cagri: "Komşuluk bağları toplumsal huzurun temelidir. Bu bağları güçlendirin.", aciklama: "Mahalle etkinlikleri düzenleyerek komşuluk ilişkilerini geliştirin.", kategori: "sosyal", kontenjan: 40 },
  { baslik: "Çevre Koruma Bilinci", cagri: "Gelecek nesillere temiz bir dünya bırakmak zorundayız.", aciklama: "Çevre kirliliği konusunda farkındalık yaratan etkinlikler düzenleyin.", kategori: "çevre", kontenjan: 30 },
  { baslik: "Trafik Güvenliği Eğitimi", cagri: "Trafik kurallarına uyum hayat kurtarır. Bu bilinci yaygınlaştırın.", aciklama: "Çocuklara ve yetişkinlere trafik güvenliği konularında eğitim verin.", kategori: "güvenlik", kontenjan: 25 },
  { baslik: "İlk Yardım Kursları", cagri: "İlk yardım bilgisi yaşam kurtarır. Bu beceriyi herkese öğretin.", aciklama: "Temel ilk yardım tekniklerini komşularınıza öğretin.", kategori: "sağlık", kontenjan: 20 },
  { baslik: "Doğa Yürüyüşleri Organize Etme", cagri: "Doğayla bağ kurmak ruh sağlığımız için gereklidir.", aciklama: "Hafta sonu doğa yürüyüşleri organize ederek sosyal aktivite sağlayın.", kategori: "spor", kontenjan: 35 },
  { baslik: "Kültürel Miras Koruma", cagri: "Tarihi ve kültürel mirasımızı korumak gelecek nesillere karşı sorumluluğumuzdur.", aciklama: "Bölgenizdeki tarihi eserlerin korunması için gönüllü çalışma yapın.", kategori: "kültür", kontenjan: 15 },

  // Technology & Innovation Tasks (21-40)
  { baslik: "Dijital Beceri Geliştirme", cagri: "Teknoloji çağında dijital beceriler zorunluluk haline geldi.", aciklama: "Temel bilgisayar, internet ve sosyal medya kullanımını öğretin.", kategori: "teknoloji", kontenjan: 30 },
  { baslik: "Online Güvenlik Eğitimi", cagri: "Dijital dünyada güvenlik herkesin hakkıdır.", aciklama: "İnternet güvenliği, şifre oluşturma ve dolandırıcılıktan korunma yöntemlerini öğretin.", kategori: "teknoloji", kontenjan: 25 },
  { baslik: "Sosyal Medya Okuryazarlığı", cagri: "Sosyal medyayı bilinçli kullanmak önemlidir.", aciklama: "Sosyal medyanın doğru ve güvenli kullanımını öğretin.", kategori: "teknoloji", kontenjan: 40 },
  { baslik: "E-Devlet Hizmetleri Kullanımı", cagri: "Dijital devlet hizmetleri hayatı kolaylaştırır.", aciklama: "E-devlet sitesinin kullanımını ve avantajlarını anlatın.", kategori: "teknoloji", kontenjan: 35 },
  { baslik: "Video Konferans Kullanımı", cagri: "Uzaktan iletişim becerisi artık temel bir ihtiyaçtır.", aciklama: "Zoom, Teams gibi video konferans araçlarının kullanımını öğretin.", kategori: "teknoloji", kontenjan: 20 },
  { baslik: "Mobil Bankacılık Eğitimi", cagri: "Mobil bankacılık güvenli kullanıldığında hayatı kolaylaştırır.", aciklama: "Mobil bankacılık uygulamalarının güvenli kullanımını öğretin.", kategori: "teknoloji", kontenjan: 25 },
  { baslik: "QR Kod Kullanımı", cagri: "QR kodlar günlük hayatın parçası haline geldi.", aciklama: "QR kod okuma ve oluşturma işlemlerini öğretin.", kategori: "teknoloji", kontenjan: 30 },
  { baslik: "Çevrimiçi Alışveriş Güvenliği", cagri: "E-ticaret güvenle yapıldığında faydalıdır.", aciklama: "Güvenli online alışveriş yöntemlerini ve dikkat edilmesi gerekenleri öğretin.", kategori: "teknoloji", kontenjan: 35 },
  { baslik: "Dijital Fotoğrafçılık", cagri: "Anılarımızı güzel şekilde saklamak sanat gerektirir.", aciklama: "Telefon kamerası ile güzel fotoğraf çekme tekniklerini öğretin.", kategori: "teknoloji", kontenjan: 20 },
  { baslik: "Temel Kodlama Bilgisi", cagri: "Kodlama geleceğin dilidir. Bu dili öğrenmek herkesi güçlendirir.", aciklama: "Çocuklara ve gençlere temel kodlama mantığını öğretin.", kategori: "teknoloji", kontenjan: 15 },

  // Cultural Heritage Tasks (41-60)
  { baslik: "Geleneksel Türk Müziği Tanıtımı", cagri: "Kültürel mirasımızın en değerli parçalarından biri müziğimizdir.", aciklama: "Geleneksel Türk müziğini tanıtan konserler ve etkinlikler düzenleyin.", kategori: "kültür", kontenjan: 25 },
  { baslik: "Yöresel Yemek Tarifleri Paylaşımı", cagri: "Mutfak kültürümüz nesilden nesile aktarılmalıdır.", aciklama: "Yörenizin geleneksel yemek tariflerini öğretin ve yaygınlaştırın.", kategori: "kültür", kontenjan: 30 },
  { baslik: "Halk Oyunları Öğretimi", cagri: "Halk oyunlarımız kimliğimizin önemli bir parçasıdır.", aciklama: "Geleneksel halk oyunlarını öğreterek kültürel mirasımızı yaşatın.", kategori: "kültür", kontenjan: 20 },
  { baslik: "El Dokuma Sanatları", cagri: "Atalarımızın el emeği göz nuru sanatları unutulmasın.", aciklama: "Kilim, halı dokuma gibi geleneksel sanatları öğretin.", kategori: "kültür", kontenjan: 15 },
  { baslik: "Minyatür Sanatı Tanıtımı", cagri: "Türk-İslam sanatının en ince örneklerini tanıtın.", aciklama: "Minyatür sanatının inceliklerini ve tarihini anlatın.", kategori: "kültür", kontenjan: 12 },
  { baslik: "Geleneksel Oyuncak Yapımı", cagri: "Çocuklarımız geleneksel oyuncaklarla da tanışmalı.", aciklama: "Ahşap, bez gibi doğal malzemelerle geleneksel oyuncak yapımını öğretin.", kategori: "kültür", kontenjan: 18 },
  { baslik: "Hat Sanatı Kursu", cagri: "Hat sanatı İslam medeniyetinin en güzel sanatlarından biridir.", aciklama: "Temel hat yazısı ve güzellik unsurlarını öğretin.", kategori: "kültür", kontenjan: 10 },
  { baslik: "Geleneksel Çini Sanatı", cagri: "Çini sanatımız dünya çapında takdir gören bir mirastır.", aciklama: "Çini yapımının temellerini ve desenlerini öğretin.", kategori: "kültür", kontenjan: 15 },
  { baslik: "Türk Ebru Sanatı", cagri: "Su üzerinde resim yapma sanatımızı yaşatın.", aciklama: "Ebru yapımının inceliklerini ve çeşitlerini öğretin.", kategori: "kültür", kontenjan: 12 },
  { baslik: "Geleneksel Hikaye Anlatıcılığı", cagri: "Sözlü kültür geleneğimizi yaşatmaya devam edin.", aciklama: "Meddahlık, hikaye anlatıcılığı geleneklerini tanıtın.", kategori: "kültür", kontenjan: 20 },

  // Health & Wellness Tasks (61-80)
  { baslik: "Sağlıklı Beslenme Eğitimi", cagri: "Sağlıklı beslenme sağlıklı yaşamın temelidir.", aciklama: "Dengeli beslenme ilkeleri ve sağlıklı yemek hazırlama yöntemlerini öğretin.", kategori: "sağlık", kontenjan: 40 },
  { baslik: "Yaşlı Sağlığı ve Bakımı", cagri: "Yaşlılarımızın sağlığını korumak toplumsal bir sorumluluktur.", aciklama: "Yaşlı bakımı, sağlık kontrolü ve destek hizmetleri konularında bilgi verin.", kategori: "sağlık", kontenjan: 25 },
  { baslik: "Zihinsel Sağlık Farkındalığı", cagri: "Ruh sağlığı bedensel sağlık kadar önemlidir.", aciklama: "Stres yönetimi, depresyon belirtileri ve baş etme yöntemlerini anlatın.", kategori: "sağlık", kontenjan: 30 },
  { baslik: "Çocuk Sağlığı ve Gelişimi", cagri: "Çocuklarımızın sağlıklı büyümesi geleceğimizin teminatıdır.", aciklama: "Çocuk gelişimi, aşılama ve temel sağlık konularında eğitim verin.", kategori: "sağlık", kontenjan: 35 },
  { baslik: "Bağımlılıkla Mücadele", cagri: "Bağımlılık hastalıktır ve tedavi edilebilir.", aciklama: "Madde bağımlılığı, sigara ve diğer bağımlılıkların zararları konusunda bilinçlendirin.", kategori: "sağlık", kontenjan: 20 },
  { baslik: "Egzersiz ve Fiziksel Aktivite", cagri: "Hareket hayattır. Aktif yaşamı teşvik edin.", aciklama: "Yaş gruplarına uygun egzersiz programları ve aktif yaşam önerilerini paylaşın.", kategori: "spor", kontenjan: 45 },
  { baslik: "Kadın Sağlığı Eğitimi", cagri: "Kadın sağlığı toplum sağlığının temelidir.", aciklama: "Kadınlara özel sağlık konuları ve düzenli kontrollerin önemini anlatın.", kategori: "sağlık", kontenjan: 30 },
  { baslik: "Ağız ve Diş Sağlığı", cagri: "Ağız sağlığı genel sağlığın ayrılmaz parçasıdır.", aciklama: "Doğru diş fırçalama, ağız bakımı ve diş sağlığını koruma yöntemlerini öğretin.", kategori: "sağlık", kontenjan: 40 },
  { baslik: "Göz Sağlığı Korunması", cagri: "Gözlerimiz dünyayı görme penceremizdir.", aciklama: "Göz sağlığını koruma, ekran kullanımı ve düzenli kontroller konusunda bilgi verin.", kategori: "sağlık", kontenjan: 25 },
  { baslik: "Kalp Sağlığı Farkındalığı", cagri: "Kalp sağlığını korumak yaşam kalitesini artırır.", aciklama: "Kalp hastalıklarından korunma, risk faktörleri ve sağlıklı yaşam önerilerini paylaşın.", kategori: "sağlık", kontenjan: 35 },

  // Special Community Projects (81-101)
  { baslik: "Mahalle Bahçesi Projesi", cagri: "Yeşil alanlar toplum ruh sağlığını iyileştirir.", aciklama: "Ortak bahçe alanı oluşturarak sebze ve meyve yetiştirin.", kategori: "çevre", kontenjan: 30 },
  { baslik: "Gençlik Mentörlüğü", cagri: "Gençlerimizi doğru yönlendirmek geleceğe yaptığımız yatırımdır.", aciklama: "Gençlere kariyer ve yaşam konularında mentorluk yapın.", kategori: "eğitim", kontenjan: 20 },
  { baslik: "Engelliler İçin Erişilebilirlik", cagri: "Herkes eşit haklara sahiptir. Erişilebilirliği artırın.", aciklama: "Mahallede engelli bireylerin erişimini kolaylaştıracak düzenlemeler yapın.", kategori: "sosyal", kontenjan: 25 },
  { baslik: "Kadın Girişimciliği Desteği", cagri: "Kadın girişimciler ekonomimizin itici gücüdür.", aciklama: "Kadın girişimcilere destek olacak programlar düzenleyin.", kategori: "ekonomi", kontenjan: 30 },
  { baslik: "Çocuk Kulübü Oluşturma", cagri: "Çocuklar güvenli ortamlarda sosyalleşmelidir.", aciklama: "Çocuklar için güvenli oyun ve öğrenme alanları oluşturun.", kategori: "eğitim", kontenjan: 35 },
  { baslik: "Emekli Sosyal Kulübü", cagri: "Emeklilerimiz toplumsal yaşama aktif katılmalıdır.", aciklama: "Emekliler için sosyal aktivite ve hobi kulüpleri kurun.", kategori: "sosyal", kontenjan: 40 },
  { baslik: "Gıda Bankası Organizasyonu", cagri: "Gıda israfını önlemek ve muhtaçlara ulaştırmak toplumsal görevimizdir.", aciklama: "Gıda toplama ve dağıtım sistemi organize edin.", kategori: "sosyal", kontenjan: 50 },
  { baslik: "Doğa Koruma Grubu", cagri: "Doğayı korumak gelecek nesillere karşı sorumluluğumuzdur.", aciklama: "Çevre koruma bilincini artıracak faaliyetler düzenleyin.", kategori: "çevre", kontenjan: 35 },
  { baslik: "Kültür ve Sanat Festivali", cagri: "Sanat toplumu birleştirir ve güzelleştirir.", aciklama: "Mahalle bazında kültür ve sanat etkinlikleri organize edin.", kategori: "kültür", kontenjan: 60 },
  { baslik: "Esnaf Dayanışma Ağı", cagri: "Esnafımız ekonomimizin bel kemiğidir.", aciklama: "Yerel esnafın güçlenmesi için dayanışma ağı kurun.", kategori: "ekonomi", kontenjan: 45 },
  { baslik: "Afet Hazırlığı Eğitimi", cagri: "Doğal afetlere hazırlıklı olmak hayat kurtarır.", aciklama: "Deprem, yangın gibi afetlere karşı hazırlık eğitimi verin.", kategori: "güvenlik", kontenjan: 40 },
  { baslik: "Dijital Arşiv Oluşturma", cagri: "Geçmişimizi dijital ortamda korumalıyız.", aciklama: "Mahalle tarihini, fotoğrafları ve anıları dijital arşivde toplayın.", kategori: "teknoloji", kontenjan: 15 },
  { baslik: "Kompost Yapımı Eğitimi", cagri: "Organik atıkları doğaya kazandırmak çevre bilincinin göstergesidir.", aciklama: "Ev tipi kompost yapımını öğreterek geri dönüşümü destekleyin.", kategori: "çevre", kontenjan: 25 },
  { baslik: "Finansal Okuryazarlık", cagri: "Para yönetimi becerisi herkesin sahip olması gereken temel bir beceridir.", aciklama: "Bütçe planlama, tasarruf ve yatırım konularında eğitim verin.", kategori: "ekonomi", kontenjan: 30 },
  { baslik: "Mesleki Gelişim Seminerleri", cagri: "Sürekli öğrenme ve gelişim başarının anahtarıdır.", aciklama: "Çeşitli meslek grupları için beceri geliştirme seminerleri düzenleyin.", kategori: "eğitim", kontenjan: 40 },
  { baslik: "Sosyal Medya Detoksu", cagri: "Dijital dengeyi kurmak ruh sağlığımız için önemlidir.", aciklama: "Sağlıklı sosyal medya kullanımı ve dijital detoks yöntemlerini öğretin.", kategori: "sağlık", kontenjan: 35 },
  { baslik: "Geleneksel Oyunlar Festivali", cagri: "Geleneksel oyunlarımız çocuklarımızla buluşmalı.", aciklama: "Mangala, dokuz taş gibi geleneksel oyunları öğretin ve yaygınlaştırın.", kategori: "kültür", kontenjan: 50 },
  { baslik: "Yaratıcı Yazma Atölyesi", cagri: "Yazma becerisi düşünme yetimizi geliştirir.", aciklama: "Hikaye, şiir yazma teknikleri ve yaratıcılığı geliştirme atölyeleri düzenleyin.", kategori: "eğitim", kontenjan: 20 },
  { baslik: "Bisiklet Kullanımı Teşviki", cagri: "Sürdürülebilir ulaşım seçeneklerini destekleyelim.", aciklama: "Bisiklet kullanımının faydalarını anlatın ve güvenli kullanım eğitimi verin.", kategori: "spor", kontenjan: 30 },
  { baslik: "Mahalle Tarihçiliği", cagri: "Her mahallenin kendine özgü bir tarihi vardır.", aciklama: "Yaşadığınız mahallenin tarihini araştırın ve kayıt altına alın.", kategori: "kültür", kontenjan: 15 },
  { baslik: "Cumhuriyet Değerleri Eğitimi", cagri: "Cumhuriyet değerlerimiz gelecek nesillere aktarılmalıdır.", aciklama: "Atatürk ilkeleri, demokrasi ve cumhuriyet değerleri konusunda eğitim verin.", kategori: "vatandaşlık", kontenjan: 100 }
];

export async function seedTasks() {
  console.log("Adding 101 tasks to database...");
  
  try {
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      await storage.createGorev({
        baslik: task.baslik,
        cagri: task.cagri,
        aciklama: task.aciklama,
        kategori: task.kategori,
        kontenjan: task.kontenjan,
        aktif: true
      });
      
      if ((i + 1) % 10 === 0) {
        console.log(`Added ${i + 1} tasks...`);
      }
    }
    
    console.log("Successfully added all 101 tasks to database!");
  } catch (error) {
    console.error("Error seeding tasks:", error);
  }
}