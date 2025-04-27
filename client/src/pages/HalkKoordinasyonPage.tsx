import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import ModernLayout from "@/components/ModernLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function HalkKoordinasyonPage() {
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(false);

  const handleVisitForum = () => {
    setLoading(true);
    window.open("https://forum.simayhareketi.org", "_blank");
    setLoading(false);
  };

  return (
    <ModernLayout audioKey="default">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-turkish-red mb-4 tracking-wide font-poppins">
            HALK KOORDİNASYON MERKEZİ
          </h1>
          <p className="text-lg text-turkish-white max-w-3xl mx-auto">
            Vatandaşlar arasında fikir alışverişi ve koordinasyon için dijital forum platformumuz
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10"
        >
          <Card className="bg-black/60 border-red-600/30 shadow-[0_0_15px_rgba(220,38,38,0.1)]">
            <CardHeader>
              <CardTitle className="text-turkish-white text-2xl">Forum Amacı</CardTitle>
              <CardDescription className="text-turkish-white/70">
                Halkın sesini duyurduğu koordinasyon platformu
              </CardDescription>
            </CardHeader>
            <CardContent className="text-turkish-white/90">
              <p className="mb-4">
                Halk Koordinasyon Merkezi, tüm vatandaşlarımızın Türkiye'nin güncellenme sürecine aktif
                katılımını sağlamak, fikirlerini paylaşmak ve ortak akılla çözümler üretmek için
                tasarlanmış dijital bir platformdur.
              </p>
              <p>
                Bu platform, farklı uzmanlık alanlarındaki vatandaşların bir araya gelerek Türkiye'nin
                geleceği için öneriler sunabileceği, projeleri tartışabileceği ve iş birliği yapabileceği
                demokratik bir alandır.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/60 border-red-600/30 shadow-[0_0_15px_rgba(220,38,38,0.1)]">
            <CardHeader>
              <CardTitle className="text-turkish-white text-2xl">Katılım İlkeleri</CardTitle>
              <CardDescription className="text-turkish-white/70">
                Halk koordinasyonunda temel prensipler
              </CardDescription>
            </CardHeader>
            <CardContent className="text-turkish-white/90">
              <ul className="space-y-2 list-disc pl-5">
                <li>Saygı ve hoşgörü çerçevesinde fikir alışverişi</li>
                <li>Bilimsel ve teknolojik gelişmeleri takip etme</li>
                <li>Cumhuriyetin temel değerlerine bağlılık</li>
                <li>Yapıcı eleştiri ve çözüm odaklı yaklaşım</li>
                <li>Tüm profesyonel grupların katılımına açıklık</li>
                <li>Şeffaf ve katılımcı bir forum yönetimi</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-b from-black/70 to-red-950/20 backdrop-blur-sm rounded-2xl border border-red-600/20 shadow-[0_0_30px_rgba(0,0,0,0.3)] p-6 mb-10"
        >
          <h2 className="text-2xl font-bold text-turkish-white mb-4">Forum Özellikleri</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-black/40 p-4 rounded-lg border border-red-500/20">
              <div className="w-12 h-12 mb-3 rounded-xl bg-gradient-to-br from-black/80 to-red-900/30 flex items-center justify-center border border-red-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-turkish-white mb-2">Tartışma Forumları</h3>
              <p className="text-turkish-white/80 text-sm">
                Farklı başlıklarda organize edilmiş tartışma alanları
              </p>
            </div>
            
            <div className="bg-black/40 p-4 rounded-lg border border-red-500/20">
              <div className="w-12 h-12 mb-3 rounded-xl bg-gradient-to-br from-black/80 to-red-900/30 flex items-center justify-center border border-red-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-turkish-white mb-2">Güvenli Ortam</h3>
              <p className="text-turkish-white/80 text-sm">
                Gelişmiş güvenlik önlemleriyle korunan dijital tartışma platformu
              </p>
            </div>
            
            <div className="bg-black/40 p-4 rounded-lg border border-red-500/20">
              <div className="w-12 h-12 mb-3 rounded-xl bg-gradient-to-br from-black/80 to-red-900/30 flex items-center justify-center border border-red-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-turkish-white mb-2">Uzman Ağı</h3>
              <p className="text-turkish-white/80 text-sm">
                Farklı alanlardaki uzmanların bilgi ve deneyim paylaşımı
              </p>
            </div>
            
            <div className="bg-black/40 p-4 rounded-lg border border-red-500/20">
              <div className="w-12 h-12 mb-3 rounded-xl bg-gradient-to-br from-black/80 to-red-900/30 flex items-center justify-center border border-red-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-turkish-white mb-2">Etkileşimli Araçlar</h3>
              <p className="text-turkish-white/80 text-sm">
                Anketler, oylama sistemleri ve etkileşimli tartışma özellikleri
              </p>
            </div>
            
            <div className="bg-black/40 p-4 rounded-lg border border-red-500/20">
              <div className="w-12 h-12 mb-3 rounded-xl bg-gradient-to-br from-black/80 to-red-900/30 flex items-center justify-center border border-red-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-turkish-white mb-2">Özelleştirilebilir</h3>
              <p className="text-turkish-white/80 text-sm">
                Kullanıcı tercihlerine göre özelleştirilebilir forum deneyimi
              </p>
            </div>
            
            <div className="bg-black/40 p-4 rounded-lg border border-red-500/20">
              <div className="w-12 h-12 mb-3 rounded-xl bg-gradient-to-br from-black/80 to-red-900/30 flex items-center justify-center border border-red-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-turkish-white mb-2">Belgeler & Kaynaklar</h3>
              <p className="text-turkish-white/80 text-sm">
                Ortak çalışmaların ve kaynakların organize edildiği belge merkezi
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center text-center mb-10"
        >
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-turkish-white mb-4">Nasıl Katılabilirim?</h2>
            <p className="text-turkish-white/90 mb-8">
              Forum, 1 TL'lik sembolik kayıt ücreti ile katılım yapan tüm Türkiye Cumhuriyeti vatandaşlarına açıktır. 
              Forum içerisinde gerçek kimlik bilgilerinizle veya bir kullanıcı adı tercih ederek katılım sağlayabilirsiniz.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="turkish-flag-button px-8 py-6 text-xl font-bold"
                onClick={handleVisitForum}
                disabled={loading}
              >
                {loading ? "Yönlendiriliyor..." : "FORUMA KATIL"}
              </Button>
              
              <Button
                variant="outline"
                className="modern-button px-8 py-6 text-xl font-bold"
                onClick={() => navigate("/")}
              >
                ANA SAYFAYA DÖN
              </Button>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-black/40 border border-red-500/20 rounded-lg p-4 max-w-2xl mx-auto text-center"
        >
          <p className="text-turkish-white/70 text-sm">
            <span className="text-red-500">Not:</span> Halk Koordinasyon Merkezi, Cumhuriyet'in güncellenme sürecine katkıda bulunan bağımsız bir platformdur.
            Forum içerisindeki tüm görüşler kişilerin kendi fikirlerini yansıtmaktadır.
          </p>
        </motion.div>
      </main>
    </ModernLayout>
  );
}