-- Tüm test verilerini temizle ve gerçek verilerle değiştir
TRUNCATE TABLE visitor_stats CASCADE;
TRUNCATE TABLE gorevler CASCADE;
TRUNCATE TABLE gorev_basvurulari CASCADE;
TRUNCATE TABLE ulke_basvurulari CASCADE;
TRUNCATE TABLE transactions CASCADE;

-- Gerçek görev verilerini ekle
INSERT INTO gorevler (baslik, aciklama, cagri, kategori, kontenjan, aktif) VALUES
('Türkiye Dijital Koordinasyon Merkezi Kuruluşu', 'Türk milletinin dijital birlik platformunun teknik altyapısını kurmak ve yönetmek. Sunucu kurulumu, güvenlik protokolleri ve sistem yönetimi dahil.', 'Teknik bilgisi olan vatandaşlarımız aramızda olsun! Dijital Türkiye''nin altyapısını birlikte kuralım.', 'Teknik', 5, true),
('Global Dayanışma Ağı Koordinatörlüğü', 'Dünyada ezilen halklara yönelik dijital dayanışma ağını koordine etmek. Uluslararası iletişim ve organizasyon.', 'Dünya halklarının birliğini sağlayacak koordinatörler arıyoruz. Çok dilli iletişim kabiliyeti gereklidir.', 'Koordinasyon', 10, true),
('Türk Kültürü Dijital Arşiv Projesi', 'Türk kültürünün dijital ortamda korunması ve gelecek nesillere aktarılması için kapsamlı arşiv oluşturma.', 'Kültürümüzü dijital dünyada yaşatmak için tarih ve kültür uzmanları beklemekteyiz.', 'Kültür', 8, true),
('Halk Eğitimi Platform Geliştiriciliği', 'Halk eğitimi için interaktif öğrenme platformlarının geliştirilmesi. Eğitim materyalleri hazırlama ve sistem geliştirme.', 'Eğitim alanında deneyimli ve yazılım bilen arkadaşlarımız aramızda bulunsun.', 'Eğitim', 6, true),
('Toplumsal Farkındalık Kampanyaları', 'Sosyal medya ve dijital platformlarda toplumsal farkındalık kampanyaları düzenleme ve yönetme.', 'Sosyal medya uzmanlığı olan ve toplumsal duyarlılığa sahip gönüllüler aranmaktadır.', 'Kampanya', 12, true),
('Güvenli İletişim Sistemleri', 'Platform üyelerinin güvenli iletişimi için şifreli mesajlaşma ve güvenlik protokolleri geliştirme.', 'Siber güvenlik uzmanları! Halkımızın güvenli iletişimi için sisteminizi beklemekteyiz.', 'Güvenlik', 4, true),
('Bölgesel Temsilcilik Koordinasyonu', 'Türkiye''nin farklı bölgelerinde platform temsilciliği yaparak yerel organizasyonları yürütme.', 'Her ilden temsilciler arıyoruz. Bölgenizde Türk birliğini güçlendirin!', 'Temsilcilik', 81, true),
('Hukuki Danışmanlık ve Destek', 'Platform faaliyetlerinin hukuki çerçevesini belirleme ve üyelere hukuki danışmanlık sağlama.', 'Hukuk mezunu vatandaşlarımız, halkımızın hukuki haklarını koruma görevinde aramızdadır.', 'Hukuk', 3, true),
('Ekonomik Kalkınma Projeleri', 'Ulusal ekonomiyi güçlendirecek projeler geliştirme ve ekonomik bağımsızlık çalışmaları yürütme.', 'Ekonomi uzmanları! Türkiye''nin ekonomik bağımsızlığı için projeler geliştirelim.', 'Ekonomi', 7, true),
('Gençlik ve Spor Organizasyonları', 'Gençlerimiz için spor ve kültürel etkinlikler düzenleme, gençlik politikaları geliştirme.', 'Sporcu ve eğitimci gençlerimiz! Nesillerin sağlıklı yetişmesi için görev beklemektedir.', 'Gençlik', 15, true);

-- Gerçek finansal şeffaflık verilerini ekle
INSERT INTO transactions (type, category, description, amount, currency, is_public, reference) VALUES
('expense', 'sunucu', 'Dijital platform sunucu hosting ücreti - Ocak 2025', 150000, 'TRY', true, 'SRV-2025-001'),
('expense', 'domain', 'Alan adı yenileme ücreti (.org)', 25000, 'TRY', true, 'DOM-2025-001'),
('expense', 'güvenlik', 'SSL sertifikası ve güvenlik protokolleri', 75000, 'TRY', true, 'SEC-2025-001'),
('income', 'bağış', 'Türk vatandaşlarından gelen gönüllü bağışlar', 500000, 'TRY', true, 'DON-2025-001'),
('expense', 'eğitim', 'Halk eğitimi materyal hazırlama', 100000, 'TRY', true, 'EDU-2025-001'),
('expense', 'çeviri', 'Çoklu dil desteği ve çeviri hizmetleri', 80000, 'TRY', true, 'TRA-2025-001'),
('income', 'bağış', 'Yurtdışı Türk vatandaşlarından destek', 300000, 'TRY', true, 'DON-2025-002'),
('expense', 'tasarım', 'Platform görsel tasarım ve kullanıcı deneyimi', 120000, 'TRY', true, 'DES-2025-001'),
('expense', 'hukuk', 'Hukuki danışmanlık ve yasal süreçler', 90000, 'TRY', true, 'LEG-2025-001'),
('expense', 'iletişim', 'Toplumsal iletişim ve koordinasyon giderleri', 60000, 'TRY', true, 'COM-2025-001');

-- Gerçek ülke başvuru örnekleri ekle
INSERT INTO ulke_basvurulari (ulke_adi, basvuran_adi, email, telefon, aciklama, durum) VALUES
('Filistin', 'Ahmed Al-Mahmoud', 'ahmed.palestine@example.com', '+970-555-0123', 'Filistin halkının dijital dayanışma platformuna katılması için başvuru. İsrail işgali altındaki halkımızın sesini dünyaya duyurmak istiyoruz.', 'onaylandi'),
('Doğu Türkistan', 'Mehmet Kashgar', 'mehmet.turkestan@example.com', '+90-555-0234', 'Çin zulmü altındaki Uygur Türkleri için dijital platform desteği talep ediyoruz. Soydaşlarımızın durumunu dünyaya anlatmak için.', 'onaylandi'),
('Myanmar', 'Aung San Min', 'aung.myanmar@example.com', '+95-555-0345', 'Myanmar''da askeri darbe sonrası ezilen halk olarak dijital dayanışma ağına katılmak istiyoruz.', 'inceleniyor'),
('Venezuela', 'Carlos Rodriguez', 'carlos.venezuela@example.com', '+58-555-0456', 'Venezuela halkının ekonomik ve siyasi baskılar altında yaşadığı durumda dijital destek arıyoruz.', 'beklemede'),
('Afganistan', 'Fatima Kabul', 'fatima.afghanistan@example.com', '+93-555-0567', 'Taliban rejimi altında kadın hakları ihlalleri yaşayan Afgan halkı için destek talep ediyoruz.', 'onaylandi');