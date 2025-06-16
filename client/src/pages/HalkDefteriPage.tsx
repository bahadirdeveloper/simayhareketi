import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import AudioControl from "@/components/AudioControl";

interface ManifestoEntry {
  id: number;
  title: string;
  content: string;
}

interface FeedbackEntry {
  id: number;
  name: string;
  city: string;
  message: string;
  date: string;
  approved: boolean;
}

export default function HalkDefteriPage() {
  const [location, setLocation] = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Form submission logic here
    setFormData({ name: "", city: "", message: "" });
  };

  const handleToggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  const manifestoEntries: ManifestoEntry[] = [
    {
      id: 1,
      title: "Cumhuriyet İdeali",
      content: "Cumhuriyet, halkın egemenliğini temel alan demokratik bir yönetim biçimidir. Bu sistem, tüm vatandaşların eşit haklara sahip olduğu, adaletin hâkim olduğu bir toplum düzeni kurmayı amaçlar."
    },
    {
      id: 2,
      title: "Laiklik İlkesi",
      content: "Laiklik, din ve devlet işlerinin birbirinden ayrı tutulması ilkesidir. Bu yaklaşım, tüm inanç gruplarının eşit muamele görmesini ve devletin hiçbir dine ayrıcalık tanımamasını sağlar."
    },
    {
      id: 3,
      title: "Milliyetçilik Anlayışı",
      content: "Türk milliyetçiliği, ırkçılığa dayalı değil, ortak vatan, tarih ve kültür değerleri etrafında birleşen bir anlayıştır. Bu milliyetçilik, tüm vatandaşları kucaklayan kapsayıcı bir karaktere sahiptir."
    }
  ];

  const entries: FeedbackEntry[] = [
    {
      id: 1,
      name: "Mehmet Demir",
      city: "Ankara",
      message: "Cumhuriyet değerlerimizi korumak için hep birlikte çalışmalıyız. Atatürk'ün gösterdiği yolda ilerlemeye devam edelim.",
      date: "15 Ocak 2024",
      approved: true
    },
    {
      id: 2,
      name: "Ayşe Kaya",
      city: "İzmir",
      message: "Eğitim sistemimizi çağdaş medeniyetler seviyesine çıkarmak için daha fazla çaba göstermeliyiz.",
      date: "12 Ocak 2024",
      approved: true
    },
    {
      id: 3,
      name: "Ali Özkan",
      city: "İstanbul",
      message: "Gençlerimize daha fazla fırsat sunarak ülkemizin geleceğini daha da güçlendirebiliriz.",
      date: "10 Ocak 2024",
      approved: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950/20 to-black relative overflow-hidden">
      {/* Background Effects */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_70%)]"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      <main className="container mx-auto px-4 pb-24 pt-16 z-10 relative">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-white to-red-600 mb-4">
              HALK DEFTERİ
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              "Egemenlik kayıtsız şartsız milletindir" ilkesiyle, halkın sesini duyurduğu demokrasi platformu
            </p>
          </div>

          {/* Tabs Container */}
          <Tabs defaultValue="manifesto" className="w-full max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-red-950/40 to-black/60 border border-red-600/30">
              <TabsTrigger 
                value="manifesto" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-red-800 data-[state=active]:text-white text-white/70 border-r border-red-600/30"
              >
                Cumhuriyet Manifestosu
              </TabsTrigger>
              <TabsTrigger 
                value="halkdefteri" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-red-800 data-[state=active]:text-white text-white/70"
              >
                Halk Defteri
              </TabsTrigger>
            </TabsList>

            <TabsContent value="manifesto" className="mt-8">
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Cumhuriyet Manifestosu</h2>
                  <p className="text-white/70">Atatürk'ün çizdiği medeniyet yolunda ilkelerimiz</p>
                </div>
                
                <div className="grid gap-6">
                  {manifestoEntries.map((entry) => (
                    <div 
                      key={entry.id}
                      className="bg-gradient-to-r from-black/60 to-red-950/30 backdrop-blur-sm p-6 rounded-lg border border-red-600/30 shadow-[0_0_15px_rgba(220,38,38,0.1)]"
                    >
                      <h3 className="text-xl font-bold text-red-400 mb-3">{entry.title}</h3>
                      <p className="text-white/90 leading-relaxed">{entry.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="halkdefteri" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Message Form Section */}
                <div className="order-2 lg:order-1">
                  <div className="bg-gradient-to-b from-black/70 to-red-950/30 backdrop-blur-sm border-2 border-red-600/50 rounded-lg p-6 shadow-[0_0_25px_rgba(220,38,38,0.2)]">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">Düşüncelerinizi Paylaşın</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-white/90">Adınız Soyadınız</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Örn: Ahmet Yılmaz"
                          className="bg-black/40 border-red-600/30 text-white placeholder:text-white/50 h-12 text-base"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="city" className="text-white/90">Şehriniz</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Örn: İstanbul"
                          className="bg-black/40 border-red-600/30 text-white placeholder:text-white/50 h-12 text-base"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="message" className="text-white/90">Mesajınız</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Düşüncelerinizi, fikirlerinizi paylaşın..."
                          rows={4}
                          className="bg-black/40 border-red-600/30 text-white placeholder:text-white/50 resize-none min-h-[120px] text-base"
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 border border-red-500/30 text-white font-semibold py-3 rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all duration-300"
                      >
                        Mesajı Gönder
                      </Button>
                    </form>
                    
                    <p className="text-white/60 text-sm mt-4 text-center">
                      Mesajınız incelendikten sonra Halk Defteri'nde yayınlanacaktır.
                    </p>
                  </div>
                </div>
                
                {/* Entries Section */}
                <div className="order-1 lg:order-2">
                  <div className="bg-gradient-to-b from-black/70 to-red-950/30 backdrop-blur-sm border-2 border-red-600/50 rounded-lg p-6 shadow-[0_0_25px_rgba(220,38,38,0.2)]">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">Halk Defteri</h3>
                    
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                      {entries.filter(entry => entry.approved).map(entry => (
                        <div 
                          key={entry.id}
                          className="bg-gradient-to-r from-black/60 to-red-950/30 backdrop-blur-sm p-4 rounded-lg border border-red-600/20 shadow-[0_0_10px_rgba(220,38,38,0.1)]"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="text-red-400 font-semibold">{entry.name}</p>
                              <p className="text-white/60 text-sm">{entry.city}</p>
                            </div>
                            <p className="text-white/50 text-xs">{entry.date}</p>
                          </div>
                          <p className="text-white/90 leading-relaxed">{entry.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Bottom Quote */}
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-red-950/30 to-black/60 backdrop-blur-sm border-2 border-red-600/30 rounded-lg p-6 shadow-[0_0_20px_rgba(220,38,38,0.15)]">
                <p className="text-xl font-bold text-white italic">
                  "Egemenlik kayıtsız şartsız milletindir."
                </p>
                <p className="text-lg text-red-500 mt-2">
                  Mustafa Kemal Atatürk
                </p>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-center mt-10 gap-4">
              <Button 
                variant="outline"
                className="border-2 border-red-600/60 text-red-500 hover:bg-red-950/20 hover:text-white"
                onClick={() => setLocation("/")}
              >
                ◀ Ana Sayfa
              </Button>
              
              <Button 
                variant="outline"
                className="border-2 border-red-600/60 text-red-500 hover:bg-red-950/20 hover:text-white"
                onClick={() => setLocation("/gorevler")}
              >
                Görevler
              </Button>
            </div>
          </Tabs>
        </div>
      </main>
      
      {/* Bottom animation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 text-white/70 text-xl font-semibold tracking-wide animate-pulse z-10 mb-2">
        CUMHURİYET GÜNCELLENİYOR
      </div>
      
      <AudioControl onToggle={handleToggleAudio} />
      
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(220, 38, 38, 0.6);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(220, 38, 38, 0.8);
        }
        `
      }} />
    </div>
  );
}