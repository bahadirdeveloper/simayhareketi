import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

type Language = {
  code: string;
  name: string;
  direction?: "rtl" | "ltr";
};

const languages: Language[] = [
  { code: "tr", name: "Türkçe" },
  { code: "en", name: "English" },
  { code: "ar", name: "العربية", direction: "rtl" },
  { code: "ru", name: "Русский" },
  { code: "es", name: "Español" },
  { code: "de", name: "Deutsch" }
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [, navigate] = useLocation();
  
  const handleLanguageChange = (langCode: string) => {
    // Dili değiştir
    i18n.changeLanguage(langCode);
    
    // Tarayıcıda dil tercihini kalıcı olarak sakla (localStorage)
    try {
      localStorage.setItem('userLanguage', langCode);
      // Language preference saved
      
      // Ayrıca bir çerez oluştur (bazı tarayıcılar için yedek)
      document.cookie = `userLanguage=${langCode}; expires=Fri, 31 Dec 2030 23:59:59 GMT; path=/`;
    } catch (e) {
      // Silent storage error
    }
    
    // Mevcut sayfanın dilini güncellemeyi sağla
    // Aynı sayfayı korurken dili güncelle
    const currentPath = window.location.pathname;
    const basePath = currentPath.split('/').filter(Boolean).length > 0 
      ? '/' + currentPath.split('/').filter(Boolean).slice(1).join('/') 
      : '/';
      
    // Dil değişikliğinde sayfayı yeniden yüklemeden dili değiştiriyoruz
    navigate(`/${langCode}${basePath !== '/' ? basePath : ''}`);
    
    // Ziyareti kaydet
    fetch('/api/visits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: window.location.pathname,
        referrer: document.referrer || '',
        language: langCode,
        hasInteracted: true
      }),
    }).catch(error => {
      // Silent visit tracking error
    });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-12">
      {languages.map((lang) => (
        <button 
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`lang-btn text-center py-2 sm:py-3 px-3 sm:px-6 text-xs sm:text-sm border ${i18n.language === lang.code ? 'border-red-500' : 'border-matrix-green'} rounded-md font-roboto-mono hover:border-faded-green transition-all duration-300 ${lang.direction === "rtl" ? "rtl-support" : ""}`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
}
