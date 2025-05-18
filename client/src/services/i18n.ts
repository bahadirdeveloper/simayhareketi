import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import language resources
import trTranslation from "../locales/tr.json";
import enTranslation from "../locales/en.json";
import arTranslation from "../locales/ar.json";
import ruTranslation from "../locales/ru.json";
import esTranslation from "../locales/es.json";
import deTranslation from "../locales/de.json";

// Tarayıcıda saklanan dil tercihini al (localStorage veya çerez)
let savedLanguage = "tr"; // Varsayılan dil

// Tarayıcı depolama erişimini güvenli şekilde kontrol et
try {
  // LocalStorage'dan dili al
  const storedLanguage = localStorage.getItem('userLanguage');
  
  // Geçerli bir dil varsa kullan
  if (storedLanguage) {
    savedLanguage = storedLanguage;
    console.log(`Kaydedilmiş dil bulundu: ${savedLanguage}`);
  } else {
    // Çerezlerde kontrol et (yedek yöntem)
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('userLanguage=')) {
        savedLanguage = cookie.substring('userLanguage='.length, cookie.length);
        console.log(`Çerezde dil bulundu: ${savedLanguage}`);
        break;
      }
    }
  }
} catch (e) {
  console.warn('Tarayıcı depolama erişiminde hata:', e);
}

// Configure i18next
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      tr: {
        translation: trTranslation
      },
      en: {
        translation: enTranslation
      },
      ar: {
        translation: arTranslation
      },
      ru: {
        translation: ruTranslation
      },
      es: {
        translation: esTranslation
      },
      de: {
        translation: deTranslation
      }
    },
    lng: savedLanguage, // Kaydedilmiş dili kullan
    fallbackLng: "tr",
    interpolation: {
      escapeValue: false // React already safes from XSS
    }
  });

export default i18n;
