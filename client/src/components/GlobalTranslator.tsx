import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Loader2, X, Languages } from "lucide-react";
import { ModernTechButton } from "./ModernTechButton";
import { Card, CardContent } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface GlobalTranslatorProps {
  className?: string;
}

const supportedLanguages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "sv", name: "Svenska", flag: "🇸🇪" },
  { code: "no", name: "Norsk", flag: "🇳🇴" },
  { code: "da", name: "Dansk", flag: "🇩🇰" },
  { code: "fi", name: "Suomi", flag: "🇫🇮" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "cs", name: "Čeština", flag: "🇨🇿" },
  { code: "hu", name: "Magyar", flag: "🇭🇺" },
  { code: "ro", name: "Română", flag: "🇷🇴" },
  { code: "bg", name: "Български", flag: "🇧🇬" },
  { code: "hr", name: "Hrvatski", flag: "🇭🇷" },
  { code: "sk", name: "Slovenčina", flag: "🇸🇰" },
  { code: "sl", name: "Slovenščina", flag: "🇸🇮" },
  { code: "et", name: "Eesti", flag: "🇪🇪" },
  { code: "lv", name: "Latviešu", flag: "🇱🇻" },
  { code: "lt", name: "Lietuvių", flag: "🇱🇹" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  { code: "ur", name: "اردو", flag: "🇵🇰" },
  { code: "fa", name: "فارسی", flag: "🇮🇷" },
  { code: "he", name: "עברית", flag: "🇮🇱" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "tl", name: "Filipino", flag: "🇵🇭" },
  { code: "sw", name: "Kiswahili", flag: "🇰🇪" },
  { code: "am", name: "አማርኛ", flag: "🇪🇹" },
  { code: "yo", name: "Yorùbá", flag: "🇳🇬" },
  { code: "ig", name: "Igbo", flag: "🇳🇬" },
  { code: "ha", name: "Hausa", flag: "🇳🇬" },
];

export function GlobalTranslator({ className }: GlobalTranslatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [isTranslating, setIsTranslating] = useState(false);
  const [originalContent, setOriginalContent] = useState<Map<string, string>>(new Map());

  const translateContent = async (targetLanguage: string) => {
    setIsTranslating(true);
    
    try {
      // Sayfadaki tüm metin içeriklerini bul
      const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, button, a, label');
      const textsToTranslate: { element: Element, text: string }[] = [];
      
      textElements.forEach((element) => {
        // Sadece doğrudan metin içeren elementleri al
        if (element.children.length === 0 && element.textContent?.trim()) {
          const text = element.textContent.trim();
          if (text.length > 1 && !text.match(/^[0-9\s\-\+\.\,\:\;\!\?\(\)\[\]\/\\]*$/)) {
            textsToTranslate.push({ element, text });
          }
        }
      });

      // Metinleri gruplara böl (API limitlerini aşmamak için)
      const chunks = [];
      const chunkSize = 10;
      for (let i = 0; i < textsToTranslate.length; i += chunkSize) {
        chunks.push(textsToTranslate.slice(i, i + chunkSize));
      }

      // Her chunk'ı çevir
      for (const chunk of chunks) {
        const textsArray = chunk.map(item => item.text);
        
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            texts: textsArray,
            targetLanguage: targetLanguage,
            sourceLanguage: 'tr'
          }),
        });

        if (response.ok) {
          const { translations } = await response.json();
          
          // Çevirileri uygula
          chunk.forEach((item, index) => {
            if (translations[index]) {
              // Orijinal içeriği sakla
              if (!originalContent.has(item.element.tagName + item.element.textContent)) {
                setOriginalContent(prev => new Map(prev.set(item.element.tagName + item.element.textContent, item.text)));
              }
              
              // Çeviriyi uygula
              item.element.textContent = translations[index];
            }
          });
        }
      }
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const restoreOriginalContent = () => {
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, button, a, label');
    
    textElements.forEach((element) => {
      const key = element.tagName + element.textContent;
      const original = originalContent.get(key);
      if (original) {
        element.textContent = original;
      }
    });
    
    setOriginalContent(new Map());
  };

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    if (languageCode === "tr") {
      restoreOriginalContent();
    } else {
      translateContent(languageCode);
    }
  };

  return (
    <>
      {/* Floating Translation Button */}
      <motion.div
        className={`fixed top-4 right-4 z-50 ${className}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ModernTechButton
          onClick={() => setIsOpen(!isOpen)}
          variant="futuristic"
          size="sm"
          className="w-12 h-12 rounded-full shadow-lg backdrop-blur-lg border-2 border-blue-500/50 hover:border-blue-400/70"
        >
          {isTranslating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Globe className="w-5 h-5" />
          )}
        </ModernTechButton>
      </motion.div>

      {/* Translation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-16 right-4 z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-black/90 border-blue-500/30 backdrop-blur-xl shadow-2xl w-80">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Languages className="w-5 h-5 text-blue-400" />
                    <h3 className="text-white font-semibold">Anlık Çeviri</h3>
                  </div>
                  <ModernTechButton
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8"
                  >
                    <X className="w-4 h-4" />
                  </ModernTechButton>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">
                      Çeviri Dili Seçin:
                    </label>
                    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                      <SelectTrigger className="w-full bg-black/50 border-blue-500/30 text-white">
                        <SelectValue placeholder="Dil seçin" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-blue-500/30 backdrop-blur-xl">
                        <SelectItem value="tr" className="text-white hover:bg-blue-500/20">
                          🇹🇷 Türkçe (Orijinal)
                        </SelectItem>
                        {supportedLanguages.map((language) => (
                          <SelectItem 
                            key={language.code} 
                            value={language.code}
                            className="text-white hover:bg-blue-500/20"
                          >
                            {language.flag} {language.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="text-xs text-gray-400 bg-blue-950/20 p-2 rounded">
                    <p className="flex items-center">
                      <Globe className="w-3 h-3 mr-1" />
                      Tüm sayfa içeriği seçilen dile çevrilecek
                    </p>
                  </div>
                  
                  {isTranslating && (
                    <div className="flex items-center justify-center space-x-2 text-blue-400 text-sm">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Çeviriliyor...</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}