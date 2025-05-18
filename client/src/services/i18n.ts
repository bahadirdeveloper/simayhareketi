import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import language resources
import trTranslation from "../locales/tr.json";
import enTranslation from "../locales/en.json";
import arTranslation from "../locales/ar.json";
import ruTranslation from "../locales/ru.json";
import esTranslation from "../locales/es.json";
import deTranslation from "../locales/de.json";

// Tarayıcıda saklanan dil tercihi varsa onu al
const savedLanguage = localStorage.getItem('userLanguage') || "tr";

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
