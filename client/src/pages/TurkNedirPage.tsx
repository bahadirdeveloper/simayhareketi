import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import ModernLayout from "@/components/ModernLayout";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Flag, Heart, Map, History, ChevronRight, ChevronLeft, Quote } from "lucide-react";

export default function TurkNedirPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  
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
            page: "turknedir"
          }
        );
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
  }, [i18n.language]);

  const pageContent = "Türk Nedir sayfasına hoş geldiniz. Türk, sadece bir ırk ya da coğrafya değildir. Türk; bir duruştur, bir vicdandır, bir direniştir. Adalete susamış halkların yüreğidir, tarihin en derin izidir. Bu sayfada Türklük kavramının derin anlamını keşfedebilirsiniz. Damarlarımda hissediyorum butonuna tıklayarak daha fazla bilgi edinebilirsiniz.";
  
  return (
    <ModernLayout audioKey="turknedir" showBackButton={true} pageName="Türk Nedir?" pageContent={pageContent}>
      <div className="w-full max-w-6xl mx-auto">
        {/* Header - Simplified */}
        <div className="relative rounded-xl overflow-hidden mb-10">
          <div className="absolute inset-0 bg-black/40 z-0"></div>
          
          <div className="relative z-10 py-16 px-6 sm:px-10 text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-red-900 flex items-center justify-center">
                <Flag className="h-8 w-8 text-white" />
              </div>
            </div>
          
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-red-500 pb-2">
              TÜRK NEDİR?
            </h1>
            <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-6"></div>
          </div>
        </div>
        
        {/* Main Content - Simplified */}
        <div className="bg-black rounded-xl p-6 sm:p-8 border border-red-700/10 max-w-5xl mx-auto mb-12">
          <div className="mb-10 text-center space-y-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-red-900 flex items-center justify-center mb-3">
                <Map className="h-5 w-5 text-white" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold leading-relaxed text-white">
                Türk, sadece bir ırk ya da coğrafya değildir.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-red-900 flex items-center justify-center mb-3">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold leading-relaxed text-red-500">
                Türk; bir duruştur, bir vicdandır, bir direniştir.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-red-900 flex items-center justify-center mb-3">
                <History className="h-5 w-5 text-white" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold leading-relaxed text-white">
                Adalete susamış halkların yüreğidir, tarihin en derin izidir.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <Button
              onClick={() => navigate("/turkdetay")}
              className="px-8 py-4 bg-red-800 hover:bg-red-700 text-white text-xl font-bold rounded-xl flex items-center gap-2 transition-colors"
            >
              <Heart className="h-5 w-5" />
              <span>DAMARLARIMDA HİSSEDİYORUM</span>
            </Button>
          </div>
        </div>
        
        {/* Quote Section - Simplified */}
        <div className="bg-black rounded-xl border border-red-900/20 p-6 sm:p-8 max-w-4xl mx-auto mb-12">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-red-900 flex items-center justify-center mb-3">
              <Quote className="h-5 w-5 text-white" />
            </div>
          </div>
          
          <blockquote className="border-l-4 border-red-500 pl-6 my-6 bg-black/40 p-4 rounded-r-lg">
            <p className="text-xl sm:text-2xl italic text-white/90 font-medium">
              "Ne mutlu Türküm diyene!"
            </p>
            <footer className="text-right text-white/70 mt-3 font-medium">
              — Mustafa Kemal Atatürk
            </footer>
          </blockquote>
          
          <div className="mt-8 space-y-4 bg-black/40 p-5 rounded-lg border border-red-900/10">
            <p className="text-white/90">
              Türklük bir kültürdür, bir medeniyettir, bir yaşam biçimidir. Türklük, insanlık tarihinin en eski ve en köklü medeniyet anlayışlarından biridir. Bu medeniyet, yüzyıllar boyunca dünya tarihine yön vermiştir.
            </p>
            
            <p className="text-white/90">
              Türk olmak; bağımsızlığa âşık olmak, adaleti savunmak, farklılıklara saygı duymak ve insanlığın gelişimine katkıda bulunmak demektir. Türk olmak, bir yaşam felsefesidir; bir duruştur; bir bilinçtir.
            </p>
          </div>
        </div>
        
        {/* Navigation Buttons - Simplified */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <Button 
            onClick={() => navigate("/turkiye")}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Türkiye Sayfasına Dön</span>
          </Button>
          
          <Button 
            onClick={() => navigate("/turkdetay")}
            className="px-6 py-3 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <span>Daha Fazla Detay</span>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </ModernLayout>
  );
}