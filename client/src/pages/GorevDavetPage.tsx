import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import SimpleFuturisticTurkish from "@/components/SimpleFuturisticTurkish";
import AudioControl from "@/components/AudioControl";
import AccessibilityReader from "@/components/AccessibilityReader";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";

export default function GorevDavetPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
  useEffect(() => {
    // Initialize audio system
    initAudio('gorevdavet');
    
    // Record visitor stats
    const recordVisit = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: i18n.language || "tr",
            hasInteracted: false,
            page: "gorevdavet"
          }
        );
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
  }, [i18n.language]);
  
  const handleToggleAudio = () => {
    playSoundtrack();
    setIsAudioPlaying(!isAudioPlaying);
  };
  
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <motion.h2 
      className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient bg-gradient-to-r from-red-600 to-white text-transparent bg-clip-text mb-6 mt-10 border-b-2 border-red-600/30 pb-2"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.h2>
  );
  
  const ParagraphText = ({ children }: { children: React.ReactNode }) => (
    <motion.p 
      className="text-lg md:text-xl text-white/90 mb-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.p>
  );
  
  const HighlightText = ({ children }: { children: React.ReactNode }) => (
    <motion.div 
      className="bg-gradient-to-r from-red-800/40 to-black/40 p-4 border-l-4 border-red-600 rounded my-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <p className="text-xl md:text-2xl font-bold text-white">
        {children}
      </p>
    </motion.div>
  );
  
  const ListItem = ({ children }: { children: React.ReactNode }) => (
    <motion.li 
      className="mb-3 flex items-start"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <span className="inline-block mr-2 mt-1 text-red-500">•</span>
      <span className="text-white/90">{children}</span>
    </motion.li>
  );
  
  const ProfileCard = ({ title, description, icon }: { title: string, description: string, icon: string }) => (
    <motion.div 
      className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-b from-red-950/40 to-black/50 border border-red-900/30 backdrop-blur-sm shadow-lg mb-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(220, 38, 38, 0.25)" }}
    >
      <div className="w-20 h-20 flex items-center justify-center text-4xl bg-gradient-to-br from-red-600 to-red-800 text-white rounded-full mb-3 shadow-md">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/80 text-center">{description}</p>
    </motion.div>
  );
  
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Background */}
      <SimpleFuturisticTurkish />
      
      {/* Erişilebilirlik Okuyucu */}
      <AccessibilityReader 
        pageContent="Kimleri Göreve Davet Ediyoruz sayfasına hoş geldiniz. Bu sayfada, ülkemizin geleceğini inşa etmek için hangi yeteneklere sahip kişilerin göreve davet edildiği detaylı olarak açıklanmaktadır. Bilgisayar mühendislerinden tasarımcılara, finansçılardan eğitimcilere kadar çeşitli alanlarda uzmanlara ihtiyaç duyulmaktadır."
        pageName="gorevdavet" 
      />
      
      <main className="container mx-auto px-4 pb-24 pt-16 z-10 relative">
        <div className="max-w-4xl mx-auto">
          {/* Türk Deseni Üstbilgi */}
          <motion.div 
            className="w-full bg-gradient-to-r from-red-950/70 via-black/60 to-red-950/70 backdrop-blur-sm border-b border-red-500/40 py-2 z-20 absolute top-0 left-0 overflow-hidden shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div 
              className="h-10 w-full absolute top-0 left-0 opacity-20" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='20' viewBox='0 0 60 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5C35.5228 5 40 9.47715 40 15C40 20.5228 35.5228 25 30 25C24.4772 25 20 20.5228 20 15C20 9.47715 24.4772 5 30 5ZM30 8C26.134 8 23 11.134 23 15C23 18.866 26.134 22 30 22C33.866 22 37 18.866 37 15C37 11.134 33.866 8 30 8ZM30 11C32.2091 11 34 12.7909 34 15C34 17.2091 32.2091 19 30 19C27.7909 19 26 17.2091 26 15C26 12.7909 27.7909 11 30 11ZM0 15 L60 15 M30 0 L30 30' stroke='%23e3a008' fill='none' /%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat-x",
                backgroundSize: "60px 20px"
              }}
            />
            <div className="flex justify-between items-center container mx-auto px-6">
              <div className="flex items-center group cursor-pointer" onClick={() => navigate("/")}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-700 relative flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                  <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs font-bold group-hover:scale-110 transition-transform duration-300">TR</span>
                  </div>
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-red-500/50"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 0, 0.7] 
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  />
                </div>
                <div className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                  <p className="text-xs text-red-500 font-semibold tracking-wide">
                    Bu İcat Türk Yapımıdır
                  </p>
                  <p className="text-[10px] text-white/80 hidden md:block">
                    Akıl, Bilim, Fen ve Sanat
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-xs text-red-500/80 pr-3 border-r border-red-500/30 mr-3">
                  Cumhuriyet Güncellenme
                </p>
                <div className="bg-black/50 px-2 py-1 rounded text-white text-xs font-mono">
                  v2.0
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Header Section */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient bg-gradient-to-r from-red-600 to-white text-transparent bg-clip-text tracking-wide mb-8">
              KİMLERİ GÖREVE DAVET EDİYORUZ?
            </h1>
            
            <HighlightText>
              "Geleceğin Türkiye'sini inşa edecek tüm yetenek ve uzmanlıklara kapımız açık. Bu medeniyeti hep birlikte yükselteceğiz."
            </HighlightText>
          </motion.div>
          
          {/* Main Content */}
          <motion.div
            className="bg-gradient-to-b from-black/70 to-red-950/40 backdrop-blur-sm border border-red-600/30 rounded-lg p-8 md:p-10 shadow-[0_0_20px_rgba(220,38,38,0.15)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <SectionTitle>Medeniyetin İnşasına Katkı Sağlayacak Uzmanlar</SectionTitle>
            <ParagraphText>
              Güncel medeniyetin inşası tüm yeteneklerin ortak çabasını gerektirir. Türkiye'nin geleceğini şekillendirmek için farklı disiplinlerden uzmanlara ihtiyaç duyuyoruz. İşte aradığımız yetenekler:
            </ParagraphText>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
              <ProfileCard 
                title="Mühendisler" 
                description="Yazılım, elektrik, inşaat, makine ve daha birçok mühendislik alanından uzmanlar. Kontenjan: 20" 
                icon="🔧"
              />
              <ProfileCard 
                title="Tasarımcılar" 
                description="Görsel tasarım, UI/UX, endüstriyel tasarım alanlarında yaratıcı fikirler geliştirenler. Kontenjan: 20" 
                icon="🎨"
              />
              <ProfileCard 
                title="Doktorlar" 
                description="Sağlık sistemini dönüştürecek, yenilikçi tedavi yöntemleri geliştirecek tıp uzmanları. Kontenjan: 20" 
                icon="⚕️"
              />
              <ProfileCard 
                title="Eğitimciler" 
                description="Yeni nesli yetiştirmek için modern eğitim metodlarıyla çalışan öğretmenler ve eğitim bilimciler. Kontenjan: 20" 
                icon="📚"
              />
              <ProfileCard 
                title="Ekonomistler" 
                description="Sürdürülebilir ve adil bir ekonomik sistem için yeni modeller geliştirenler. Kontenjan: 20" 
                icon="📊"
              />
              <ProfileCard 
                title="Sanatçılar" 
                description="Kültürel mirasımızı geleceğe taşıyacak müzisyenler, ressamlar, heykeltıraşlar, yazarlar. Kontenjan: 20" 
                icon="🎭"
              />
              <ProfileCard 
                title="Bilim İnsanları" 
                description="Temel bilimler ve uygulamalı araştırmalar yapan, yeni keşifler peşinde koşan uzmanlar. Kontenjan: 20" 
                icon="🔬"
              />
              <ProfileCard 
                title="Tarımcılar" 
                description="Yenilikçi ve sürdürülebilir tarım teknikleri geliştiren, gıda güvenliğini sağlayan uzmanlar. Kontenjan: 20" 
                icon="🌱"
              />
              <ProfileCard 
                title="Hukukçular" 
                description="Adaleti güçlendirmek için çalışan, hukuk sistemini modernleştiren avukatlar ve hâkimler. Kontenjan: 20" 
                icon="⚖️"
              />
            </div>
            
            <SectionTitle>Neden Göreve Katılmalısınız?</SectionTitle>
            <ul className="space-y-2 mb-8 list-inside pl-2">
              <ListItem>Ülkemizin geleceğini şekillendirmek için eşsiz bir fırsat</ListItem>
              <ListItem>Disiplinler arası işbirliği ile yeni perspektifler kazanma</ListItem>
              <ListItem>Topluma gerçek ve kalıcı bir etki bırakma şansı</ListItem>
              <ListItem>Yenilikçi projelerde yer alarak profesyonel gelişiminize katkı</ListItem>
              <ListItem>Ulusal ve uluslararası düzeyde tanınma ve saygınlık</ListItem>
              <ListItem>Gelecek nesiller için daha iyi bir ülke inşa etmenin gururu</ListItem>
            </ul>
            
            <SectionTitle>Nasıl Katılabilirsiniz?</SectionTitle>
            <ParagraphText>
              Görevlere katılmak için öncelikle ilgili alandaki görevleri inceleyip, uzmanlık alanınıza uygun olanları seçmelisiniz. Her görev, belirli bir amaca hizmet eder ve ülkemizin geleceğine katkıda bulunmanızı sağlar.
            </ParagraphText>
            <ParagraphText>
              Görevlerin detaylarını görmek, ilgilendiğiniz bir göreve başvurmak veya yeni görev önerileri sunmak için görevler sayfasını ziyaret edebilirsiniz.
            </ParagraphText>
            
            <div className="flex justify-center mt-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-800 text-white px-10 py-6 rounded-lg shadow-lg font-bold text-xl"
                  onClick={() => navigate("/gorevler")}
                >
                  GÖREVLERE GİT
                </Button>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-center mt-10 gap-4">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
              <Button 
                variant="outline"
                className="border-2 border-red-600/60 text-red-500 hover:bg-red-950/20 hover:text-white"
                onClick={() => navigate("/gorevler")}
              >
                ◀ Görevlere Dön
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
              <Button 
                variant="outline"
                className="border-2 border-red-600/60 text-red-500 hover:bg-red-950/20 hover:text-white"
                onClick={() => navigate("/")}
              >
                Ana Sayfa
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
      
      <AudioControl onToggle={handleToggleAudio} />
    </div>
  );
}