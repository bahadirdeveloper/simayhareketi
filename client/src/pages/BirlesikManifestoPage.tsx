import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModernLayout from "@/components/ModernLayout";
import { ModernTechButton } from "@/components/ModernTechButton";
import { useLocation } from "wouter";
import { Play, Pause } from "lucide-react";

export default function BirlesikManifestoPage() {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("anayasa");

  useEffect(() => {
    // Page initialization complete
  }, []);

  const manifestoValues = [
    {
      id: "values",
      title: t("manifesto.principle_1"),
      description: t("manifesto.principle_1_desc"),
    },
    {
      id: "public",
      title: t("manifesto.principle_2"),
      description: t("manifesto.principle_2_desc"),
    },
    {
      id: "justice",
      title: t("manifesto.principle_3"),
      description: t("manifesto.principle_3_desc"),
    },
    {
      id: "democracy",
      title: t("manifesto.principle_4"),
      description: t("manifesto.principle_4_desc"),
    },
    {
      id: "diversity",
      title: t("manifesto.principle_5"),
      description: t("manifesto.principle_5_desc"),
    },
  ];

  return (
    <ModernLayout
      audioKey="manifesto"
      showBackButton={true}
      pageContent="Manifesto sayfasına hoş geldiniz. Bu sayfada Simay Hareketi'nin manifestosu, çağrı ve katılım bölümleri yer almaktadır. Sayfada değerlerimizi, ilkelerimizi ve katılım formunu bulabilirsiniz. Akıl, bilim, vicdan, fen ve sanat değerlerimiz ışığında hep birlikte hareket ediyoruz."
      pageName="Manifesto"
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Ana menü - büyük butonlar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          <div 
            className={`p-6 rounded-lg text-center transition-all duration-300
              ${activeTab === "anayasa" 
                ? "bg-red-700 text-white" 
                : "bg-red-900/30 text-white/80 hover:bg-red-800/50"}`}
          >
            <div className="flex flex-col items-center space-y-3">
              <h2 className="text-2xl font-bold cursor-pointer" onClick={() => setActiveTab("anayasa")}>ANAYASA</h2>
              <button 
                className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-red-700 to-red-900 rounded-full shadow-lg hover:from-red-600 hover:to-red-800 transition-all duration-300"
                aria-label="Anayasa sesini çal"
                title="Anayasa Açıklamasını Dinle"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open("https://www.youtube.com/watch?v=placeholder-anayasa", "_blank");
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </button>
            </div>
          </div>
          <div 
            className={`p-6 rounded-lg text-center transition-all duration-300
              ${activeTab === "manifesto" 
                ? "bg-blue-700 text-white" 
                : "bg-blue-900/30 text-white/80 hover:bg-blue-800/50"}`}
          >
            <div className="flex flex-col items-center space-y-3">
              <h2 className="text-2xl font-bold cursor-pointer" onClick={() => setActiveTab("manifesto")}>MANİFESTO</h2>
              <button 
                className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-700 to-blue-900 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
                aria-label="Manifesto sesini çal"
                title="Manifesto Açıklamasını Dinle"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open("https://www.youtube.com/watch?v=placeholder-manifesto", "_blank");
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </button>
            </div>
          </div>
          <div 
            className={`p-6 rounded-lg text-center transition-all duration-300
              ${activeTab === "cagri" 
                ? "bg-blue-700 text-white" 
                : "bg-blue-900/30 text-white/80 hover:bg-blue-800/50"}`}
          >
            <div className="flex flex-col items-center space-y-3">
              <h2 className="text-2xl font-bold cursor-pointer" onClick={() => setActiveTab("cagri")}>HALKA ÇAĞRI</h2>
              <button 
                className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-700 to-blue-900 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
                aria-label="Çağrı sesini çal"
                title="Çağrı Açıklamasını Dinle"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open("https://www.youtube.com/watch?v=placeholder-cagri", "_blank");
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Ses çalma butonu */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <motion.button
            className={`
              rounded-full h-12 w-12 flex items-center justify-center 
                ? "bg-gradient-to-br from-blue-600 to-blue-800" 
                : "bg-gradient-to-br from-blue-700 to-blue-900"} 
              hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-shadow duration-300
              border border-blue-500/30
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="h-5 w-5 text-white ml-0.5" />
          </motion.button>
          <span className="ml-2 text-gray-400 self-center text-sm">
          </span>
        </motion.div>

        {/* İçerik Alanı */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          {activeTab === "anayasa" && (
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-black/60 to-red-950/30 backdrop-blur-sm rounded-xl border border-red-900/30 p-6 shadow-lg">
                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl-responsive font-bold mb-6 text-white text-center"
                >
                  HALK ANAYASASI
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="prose prose-lg max-w-none prose-invert mx-auto"
                >
                  {/* Anayasa Bölümleri */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-red-900/20 backdrop-blur-sm rounded-lg p-6 border border-red-700/30 shadow-lg hover:shadow-red-700/10 transition-all duration-300">
                      <h3 className="text-xl-responsive font-semibold text-white mb-4">Türkiye Cumhuriyeti Anayasası</h3>
                      <p className="text-gray-300 mb-4">Bu topraklarda halkın kaderini yeniden yazan ilk büyük sözleşmedir. Eşitliğin, adaletin, özgürlüğün ve halk egemenliğinin teminatıdır.</p>
                      <ModernTechButton
                        variant="outline"
                        color="red"
                        size="sm"
                        className="w-full justify-center"
                        onClick={() => navigate("/anayasa")}
                      >
                        Detaylar
                      </ModernTechButton>
                    </div>
                    
                    <div className="bg-red-900/20 backdrop-blur-sm rounded-lg p-6 border border-red-700/30 shadow-lg hover:shadow-red-700/10 transition-all duration-300">
                      <h3 className="text-xl-responsive font-semibold text-white mb-4">Halk Barış ve Dayanışma Bildirgesi</h3>
                      <p className="text-gray-300 mb-4">Toplumsal barışın ve dayanışmanın önemine vurgu yapan, farklılıklarımızın zenginliğimiz olduğunu ifade eden bildirge.</p>
                      <ModernTechButton
                        variant="outline"
                        color="red"
                        size="sm"
                        className="w-full justify-center"
                        onClick={() => navigate("/halk-manifestolar")}
                      >
                        Detaylar
                      </ModernTechButton>
                    </div>
                    
                    <div className="bg-red-900/20 backdrop-blur-sm rounded-lg p-6 border border-red-700/30 shadow-lg hover:shadow-red-700/10 transition-all duration-300">
                      <h3 className="text-xl-responsive font-semibold text-white mb-4">Halk Bireysel Haklar Sözleşmesi</h3>
                      <p className="text-gray-300 mb-4">Her bireyin doğuştan gelen ve vazgeçilemez haklarını koruyan, bireysel özgürlükleri güvence altına alan temel sözleşme.</p>
                      <ModernTechButton
                        variant="outline"
                        color="red"
                        size="sm"
                        className="w-full justify-center"
                        onClick={() => navigate("/halk-manifestolar")}
                      >
                        Detaylar
                      </ModernTechButton>
                    </div>
                    
                    <div className="bg-red-900/20 backdrop-blur-sm rounded-lg p-6 border border-red-700/30 shadow-lg hover:shadow-red-700/10 transition-all duration-300">
                      <h3 className="text-xl-responsive font-semibold text-white mb-4">Halk Dijital Bilinç Anayasası</h3>
                      <p className="text-gray-300 mb-4">Dijital çağda bireylerin haklarını koruyan, teknolojik gelişmelere uyumlu ve veri gizliliğini esas alan modern anayasa.</p>
                      <ModernTechButton
                        variant="outline"
                        color="red"
                        size="sm"
                        className="w-full justify-center"
                        onClick={() => navigate("/halk-manifestolar")}
                      >
                        Detaylar
                      </ModernTechButton>
                    </div>
                  </div>
                  
                  <div className="mt-10 text-center">
                    <p className="text-lg-responsive text-white font-semibold">
                      {t("anayasa.listen")}
                    </p>
                    <div className="mt-8 bg-red-900/20 p-6 rounded-lg border border-red-800/30 max-w-2xl mx-auto">
                      <h3 className="text-xl-responsive font-semibold text-white mb-3">{t("anayasa.join_title")}</h3>
                      <p className="text-gray-300 mb-6">{t("anayasa.join_text")}</p>
                      <ModernTechButton
                        color="red"
                        size="md"
                        onClick={() => navigate("/katil")}
                      >
                        {t("anayasa.contribute_btn")}
                      </ModernTechButton>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="flex justify-center mt-6">
                <ModernTechButton
                  onClick={() => setActiveTab("manifesto")}
                  className="mx-2"
                  color="blue"
                >
                  MANİFESTOYA GEÇ
                </ModernTechButton>
                <ModernTechButton
                  onClick={() => navigate("/katil")}
                  className="mx-2"
                  color="red"
                >
                  KATIL & GÖREV
                </ModernTechButton>
              </div>
            </div>
          )}
          
          {activeTab === "manifesto" && (
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-black/60 to-blue-950/30 backdrop-blur-sm rounded-xl border border-blue-900/30 p-6 shadow-lg">
                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl-responsive font-bold mb-6 text-white text-center"
                >
                  Halk Hareketi Manifestosu
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-lg-responsive text-gray-300 mb-6 leading-relaxed max-w-3xl mx-auto"
                >
                  Halk Hareketi olarak, cumhuriyetin temel değerlerini korurken, onu halkın katılımıyla geleceğe taşımayı ve toplumsal bağları güçlendirmeyi amaçlıyoruz.
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-2xl-responsive font-bold mb-6 text-white text-center"
                >
                  {t("manifesto.principles")}
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
                >
                  {manifestoValues.map((principle, index) => (
                    <motion.div
                      key={principle.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="bg-blue-900/20 backdrop-blur-sm rounded-lg p-6 border border-blue-700/30 shadow-lg hover:shadow-blue-700/10 transition-all duration-300 hover:border-blue-600/40"
                    >
                      <h3 className="text-xl-responsive font-semibold text-white mb-4">
                        {principle.title}
                      </h3>
                      <p className="text-gray-300">{principle.description}</p>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-lg-responsive text-gray-300 mt-8 leading-relaxed max-w-3xl mx-auto"
                >
                  {t("manifesto.conclusion")}
                </motion.p>
              </div>

              <div className="flex justify-center mt-6">
                <ModernTechButton
                  onClick={() => setActiveTab("cagri")}
                  className="mx-2"
                  color="blue"
                >
                  ÇAĞRI'YA GEÇ
                </ModernTechButton>
                <ModernTechButton
                  onClick={() => navigate("/katil")}
                  className="mx-2"
                  color="red"
                >
                  KATIL & GÖREV
                </ModernTechButton>
              </div>
            </div>
          )}

          {activeTab === "cagri" && (
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-black/60 to-blue-950/30 backdrop-blur-sm rounded-xl border border-blue-900/30 p-6 shadow-lg">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-8"
                >
                  <h1 className="text-4xl-responsive font-bold text-white mb-4">ÇAĞRI</h1>
                  <p className="text-xl-responsive text-gray-300">
                    Türkiye'nin geleceği için bir çağrı
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="prose prose-lg max-w-none prose-invert mx-auto"
                >
                  <p className="text-lg-responsive leading-relaxed">
                    Sevgili vatandaşlar, Türkiye'nin geleceğini birlikte şekillendirmek için büyük bir fırsat önümüzde duruyor. Bugün, Cumhuriyet'in temel değerlerini koruyarak, onu çağımızın gereklilikleriyle güncellemek ve daha güçlü, daha adil bir toplum inşa etmek için çağrımızı yapıyoruz.
                  </p>
                  
                  <h2 className="text-2xl-responsive font-bold mt-8 mb-4">Neden Harekete Geçmeliyiz?</h2>
                  
                  <p className="text-lg-responsive leading-relaxed">
                    Dünya hızla değişiyor ve toplumlar bu değişime ayak uydurmak zorunda. Türkiye olarak, teknolojik gelişmeleri, dijital dönüşümü ve küresel gelişmeleri takip ederken kendi özgün kimliğimizi ve değerlerimizi de korumalıyız. Bu denge, ancak halkın katılımı ve desteğiyle sağlanabilir.
                  </p>
                  
                  <h2 className="text-2xl-responsive font-bold mt-8 mb-4">Size Çağrımız</h2>
                  
                  <ul className="space-y-4 my-6">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✦</span>
                      <span>Cumhuriyet'in değerlerini ve Atatürk'ün mirasını korumak için görevler üstlenin</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✦</span>
                      <span>Dijital çağda demokrasinin güçlendirilmesi için fikirlerinizi paylaşın</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✦</span>
                      <span>Toplumsal dayanışma için yerel ve ulusal projelere katılın</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✦</span>
                      <span>Gençlerin eğitimi ve gelişimi için destek olun</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✦</span>
                      <span>Farklı görüşlere saygı duyarak ortak bir gelecek inşa edin</span>
                    </li>
                  </ul>
                  
                  <p className="text-lg-responsive leading-relaxed mt-6">
                    Cumhuriyet'i güncellemek, herkesin katılımını ve desteğini gerektiren bir süreçtir. Bu çağrıya kulak verin ve yeni Türkiye'nin inşasında yerinizi alın. Her birinizin katkısı, geleceğimiz için büyük bir değer taşıyor.
                  </p>
                  
                  <div className="text-center mt-10 mb-6">
                    <p className="text-xl-responsive font-semibold text-blue-400">
                      "Türkiye Cumhuriyeti, ilelebet payidar kalacaktır."
                    </p>
                    <p className="text-sm text-gray-400 mt-2">Mustafa Kemal Atatürk</p>
                  </div>
                  
                  <div className="bg-blue-900/20 p-4 rounded-lg mt-8 border border-blue-800/30">
                    <p className="text-gray-300 text-center italic">
                      Bu çağrı, teknoloji ve halkın gücüyle ilerleyen bir gelecek için sizleri harekete geçmeye davet ediyor.
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="flex justify-center mt-6">
                <ModernTechButton
                  onClick={() => setActiveTab("manifesto")}
                  className="mx-2"
                  color="blue"
                >
                  MANİFESTOYA DÖN
                </ModernTechButton>
                <ModernTechButton
                  onClick={() => navigate("/katil")}
                  className="mx-2"
                  color="red"
                >
                  KATIL & GÖREV
                </ModernTechButton>
              </div>
            </div>
          )}
        </motion.div>

        {/* Ana değerler */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 mb-8 text-center"
        >
          <div className="flex flex-wrap justify-center gap-3 text-sm sm:text-base text-gray-400">
            <span className="border border-blue-800/50 rounded-full px-4 py-1 bg-blue-900/10">Akıl</span>
            <span className="border border-blue-800/50 rounded-full px-4 py-1 bg-blue-900/10">Bilim</span>
            <span className="border border-blue-800/50 rounded-full px-4 py-1 bg-blue-900/10">Vicdan</span>
            <span className="border border-blue-800/50 rounded-full px-4 py-1 bg-blue-900/10">Fen</span>
            <span className="border border-blue-800/50 rounded-full px-4 py-1 bg-blue-900/10">Sanat</span>
          </div>
        </motion.div>
      </div>
    </ModernLayout>
  );
}