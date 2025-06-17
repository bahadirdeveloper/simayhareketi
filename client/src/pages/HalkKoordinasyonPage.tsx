import { useEffect } from "react";
import { useLocation } from "wouter";
import ModernLayout from "@/components/ModernLayout";
import { Button } from "@/components/ui/button";

export default function HalkKoordinasyonPage() {
  const [, navigate] = useLocation();
  
  // Bu sayfa, forum URL'sine yönlendirmeden önce kullanıcıya bilgi verir
  useEffect(() => {
    // Forum URL'sine otomatik yönlendirme yapmamak için bu işlev şimdilik yorum satırı olarak duruyor
    // setTimeout(() => {
    //   window.location.href = "https://forum.simayhareketi.org";
    // }, 5000); // 5 saniye sonra yönlendir
  }, []);
  
  const handleRedirect = () => {
    window.open("https://simayhareketi.com", "_blank");
  };
  
  return (
    <ModernLayout 
      audioKey="coordination" 
      showBackButton={true} 
      pageContent="Halk Koordinasyon Merkezi, Cumhuriyet Güncelleme sürecinde halkın fikirlerini ve taleplerini paylaşabileceği, tartışmalar yapabileceği interaktif bir platformdur. Forum sayfasında diğer vatandaşlarla iletişim kurabilir, görüşlerinizi paylaşabilir ve ortak projeler geliştirebilirsiniz." 
      pageName="Halk Koordinasyon Merkezi">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="space-y-10">
          {/* Başlık Bölümü */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Simay Hareketi Yardımlaşma Platformu
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              simayhareketi.com'da dayanışma ve yardımlaşma toplulugu olarak birlikte çalışıyoruzformu
            </p>
          </div>
          
          {/* Ana Kart */}
          <div className="bg-gradient-to-b from-black/60 to-red-950/20 backdrop-blur-sm rounded-xl border border-red-600/20 p-6 sm:p-8 shadow-lg">
            <div className="space-y-6">
              {/* Bilgi Bölümü */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-red-600/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">Forum Platformu Hakkında</h2>
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                  Halk Koordinasyon Merkezi, Türkiye Simay platformunun forum bölümüdür. 
                  Bu interaktif alanda vatandaşlar görüşlerini paylaşabilir, diğer 
                  katılımcılarla fikir alışverişinde bulunabilir ve kolektif projeler 
                  geliştirebilir.
                </p>
              </div>
              
              {/* Özellikler */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="font-medium text-white">Topluluğa Katılım</h3>
                  </div>
                  <p className="text-gray-400 text-sm pl-7">Tartışmalara katılın, fikir alışverişinde bulunun ve önerilerinizi paylaşın.</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <h3 className="font-medium text-white">Aktif Tartışmalar</h3>
                  </div>
                  <p className="text-gray-400 text-sm pl-7">Güncel konular hakkında tartışmalara katılın, fikirlerinizi paylaşın.</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <h3 className="font-medium text-white">Konu Başlıkları</h3>
                  </div>
                  <p className="text-gray-400 text-sm pl-7">Farklı alanlarda kategorize edilmiş tartışma başlıkları.</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="font-medium text-white">Öneriler ve Katkılar</h3>
                  </div>
                  <p className="text-gray-400 text-sm pl-7">Cumhuriyet Güncellemesine doğrudan katkı sağlayın.</p>
                </div>
              </div>
              
              {/* Uyarı Bölümü */}
              <div className="bg-red-950/30 border border-red-500/20 rounded-lg p-4">
                <div className="flex space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-white text-sm">Önemli Not</h4>
                    <p className="text-gray-400 text-xs mt-1">
                      Forum sayfasına giriş yaptığınızda farklı bir alan adına yönlendirileceksiniz. 
                      Foruma katılım için kayıt olmanız gerekebilir. Lütfen platform kurallarına 
                      uygun davranın ve saygılı bir iletişim dili kullanın.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Eylem Butonları */}
              <div className="flex flex-col sm:flex-row sm:justify-center gap-4 pt-2">
                <Button 
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg font-medium px-8 py-6"
                  onClick={handleRedirect}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Forum'a Git
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-red-500/50 text-white hover:bg-red-950/30 px-8 py-6"
                  onClick={() => navigate("/")}
                >
                  Ana Sayfaya Dön
                </Button>
              </div>
            </div>
          </div>
          
          {/* Alt Bilgi Kartı */}
          <div className="text-center bg-black/40 backdrop-blur-sm rounded-lg border border-red-600/10 p-4">
            <p className="text-gray-400 text-sm">
              Forum platformu henüz beta aşamasındadır. Geri bildirimleriniz bizim için değerlidir.
            </p>
          </div>
        </div>
      </div>
    </ModernLayout>
  );
}