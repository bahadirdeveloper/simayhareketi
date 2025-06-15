import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import ModernLayout from "@/components/ModernLayout";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { ModernTechButton } from "@/components/ModernTechButton";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Görev resimlerini doğrudan import et (1-100)
import gorev1 from "../../../attached_assets/gorev-1.webp";
import gorev2 from "../../../attached_assets/gorev-2.webp";
import gorev3 from "../../../attached_assets/gorev-3.webp";
import gorev4 from "../../../attached_assets/gorev-4.webp";
import gorev5 from "../../../attached_assets/gorev-5.webp";
import gorev6 from "../../../attached_assets/gorev-6.webp";
import gorev7 from "../../../attached_assets/gorev-7.webp";
import gorev8 from "../../../attached_assets/gorev-8.webp";
import gorev9 from "../../../attached_assets/gorev-9.webp";
import gorev10 from "../../../attached_assets/gorev-10.webp";
import gorev11 from "../../../attached_assets/gorev-11.webp";
import gorev12 from "../../../attached_assets/gorev-12.webp";
import gorev13 from "../../../attached_assets/gorev-13.webp";
import gorev14 from "../../../attached_assets/gorev-14.webp";
import gorev15 from "../../../attached_assets/gorev-15.webp";
import gorev16 from "../../../attached_assets/gorev-16.webp";
import gorev17 from "../../../attached_assets/gorev-17.webp";
import gorev18 from "../../../attached_assets/gorev-18.webp";
import gorev19 from "../../../attached_assets/gorev-19.webp";
import gorev20 from "../../../attached_assets/gorev-20.webp";
import gorev21 from "../../../attached_assets/gorev-21.webp";
import gorev22 from "../../../attached_assets/gorev-22.webp";
import gorev23 from "../../../attached_assets/gorev-23.webp";
import gorev24 from "../../../attached_assets/gorev-24.webp";
import gorev25 from "../../../attached_assets/gorev-25.webp";
import gorev26 from "../../../attached_assets/gorev-26.webp";
import gorev27 from "../../../attached_assets/gorev-27.webp";
import gorev28 from "../../../attached_assets/gorev-28.webp";
import gorev29 from "../../../attached_assets/gorev-29.webp";
import gorev30 from "../../../attached_assets/gorev-30.webp";
import gorev31 from "../../../attached_assets/gorev-31.webp";
import gorev32 from "../../../attached_assets/gorev-32.webp";
import gorev33 from "../../../attached_assets/gorev-33.webp";
import gorev34 from "../../../attached_assets/gorev-34.webp";
import gorev35 from "../../../attached_assets/gorev-35.webp";
import gorev36 from "../../../attached_assets/gorev-36.webp";
import gorev37 from "../../../attached_assets/gorev-37.webp";
import gorev38 from "../../../attached_assets/gorev-38.webp";
import gorev39 from "../../../attached_assets/gorev-39.webp";
import gorev40 from "../../../attached_assets/gorev-40.webp";
import gorev41 from "../../../attached_assets/gorev-41.webp";
import gorev42 from "../../../attached_assets/gorev-42.webp";
import gorev43 from "../../../attached_assets/gorev-43.webp";
import gorev44 from "../../../attached_assets/gorev-44.webp";
import gorev45 from "../../../attached_assets/gorev-45.webp";
import gorev46 from "../../../attached_assets/gorev-46.webp";
import gorev47 from "../../../attached_assets/gorev-47.webp";
import gorev48 from "../../../attached_assets/gorev-48.webp";
import gorev49 from "../../../attached_assets/gorev-49.webp";
import gorev50 from "../../../attached_assets/gorev-50.webp";
import gorev51 from "../../../attached_assets/gorev-51.webp";
import gorev52 from "../../../attached_assets/gorev-52.webp";
import gorev53 from "../../../attached_assets/gorev-53.webp";
import gorev54 from "../../../attached_assets/gorev-54.webp";
import gorev55 from "../../../attached_assets/gorev-55.webp";
import gorev56 from "../../../attached_assets/gorev-56.webp";
import gorev57 from "../../../attached_assets/gorev-57.webp";
import gorev58 from "../../../attached_assets/gorev-58.webp";
import gorev59 from "../../../attached_assets/gorev-59.webp";
import gorev60 from "../../../attached_assets/gorev-60.webp";
import gorev61 from "../../../attached_assets/gorev-61.webp";
import gorev62 from "../../../attached_assets/gorev-62.webp";
import gorev63 from "../../../attached_assets/gorev-63.webp";
import gorev64 from "../../../attached_assets/gorev-64.webp";
import gorev65 from "../../../attached_assets/gorev-65.webp";
import gorev66 from "../../../attached_assets/gorev-66.webp";
import gorev67 from "../../../attached_assets/gorev-67.webp";
import gorev68 from "../../../attached_assets/gorev-68.webp";
import gorev69 from "../../../attached_assets/gorev-69.webp";
import gorev70 from "../../../attached_assets/gorev-70.webp";
import gorev71 from "../../../attached_assets/gorev-71.webp";
import gorev72 from "../../../attached_assets/gorev-72.webp";
import gorev73 from "../../../attached_assets/gorev-73.webp";
import gorev74 from "../../../attached_assets/gorev-74.webp";
import gorev75 from "../../../attached_assets/gorev-75.webp";
import gorev76 from "../../../attached_assets/gorev-76.webp";
import gorev77 from "../../../attached_assets/gorev-77.webp";
import gorev78 from "../../../attached_assets/gorev-78.webp";
import gorev79 from "../../../attached_assets/gorev-79.webp";
import gorev80 from "../../../attached_assets/gorev-80.webp";
import gorev81 from "../../../attached_assets/gorev-81.webp";
import gorev82 from "../../../attached_assets/gorev-82.webp";
import gorev83 from "../../../attached_assets/gorev-83.webp";
import gorev84 from "../../../attached_assets/gorev-84.webp";
import gorev85 from "../../../attached_assets/gorev-85.webp";
import gorev86 from "../../../attached_assets/gorev-86.webp";
import gorev87 from "../../../attached_assets/gorev-87.webp";
import gorev88 from "../../../attached_assets/gorev-88.webp";
import gorev89 from "../../../attached_assets/gorev-89.webp";
import gorev90 from "../../../attached_assets/gorev-90.webp";
import gorev91 from "../../../attached_assets/gorev-91.webp";
import gorev92 from "../../../attached_assets/gorev-92.webp";
import gorev93 from "../../../attached_assets/gorev-93.webp";
import gorev94 from "../../../attached_assets/gorev-94.webp";
import gorev95 from "../../../attached_assets/gorev-95.webp";
import gorev96 from "../../../attached_assets/gorev-96.webp";
import gorev97 from "../../../attached_assets/gorev-97.webp";
import gorev98 from "../../../attached_assets/gorev-98.webp";
import gorev99 from "../../../attached_assets/gorev-99.webp";
import gorev100 from "../../../attached_assets/gorev-100.webp";

// Tüm görev resimlerini bir havuzda topla (1-100)
const gorevImages: Record<number, string> = {
  1: gorev1, 2: gorev2, 3: gorev3, 4: gorev4, 5: gorev5, 6: gorev6, 7: gorev7, 8: gorev8, 9: gorev9, 10: gorev10,
  11: gorev11, 12: gorev12, 13: gorev13, 14: gorev14, 15: gorev15, 16: gorev16, 17: gorev17, 18: gorev18, 19: gorev19, 20: gorev20,
  21: gorev21, 22: gorev22, 23: gorev23, 24: gorev24, 25: gorev25, 26: gorev26, 27: gorev27, 28: gorev28, 29: gorev29, 30: gorev30,
  31: gorev31, 32: gorev32, 33: gorev33, 34: gorev34, 35: gorev35, 36: gorev36, 37: gorev37, 38: gorev38, 39: gorev39, 40: gorev40,
  41: gorev41, 42: gorev42, 43: gorev43, 44: gorev44, 45: gorev45, 46: gorev46, 47: gorev47, 48: gorev48, 49: gorev49, 50: gorev50,
  51: gorev51, 52: gorev52, 53: gorev53, 54: gorev54, 55: gorev55, 56: gorev56, 57: gorev57, 58: gorev58, 59: gorev59, 60: gorev60,
  61: gorev61, 62: gorev62, 63: gorev63, 64: gorev64, 65: gorev65, 66: gorev66, 67: gorev67, 68: gorev68, 69: gorev69, 70: gorev70,
  71: gorev71, 72: gorev72, 73: gorev73, 74: gorev74, 75: gorev75, 76: gorev76, 77: gorev77, 78: gorev78, 79: gorev79, 80: gorev80,
  81: gorev81, 82: gorev82, 83: gorev83, 84: gorev84, 85: gorev85, 86: gorev86, 87: gorev87, 88: gorev88, 89: gorev89, 90: gorev90,
  91: gorev91, 92: gorev92, 93: gorev93, 94: gorev94, 95: gorev95, 96: gorev96, 97: gorev97, 98: gorev98, 99: gorev99, 100: gorev100
};

// Görev resmi getirme yardımcı fonksiyonu (1-100)
const getGorevImage = (id: number): string => {
  const safeId = Math.min(Math.max(1, id), 100);
  return gorevImages[safeId] || gorev1;
};

// Görev arkaplan renkleri
const gorevColors = [
  ["#B92020", "#7A0000"], // Kırmızı
  ["#1E3A8A", "#0F1D47"], // Koyu mavi
  ["#3F1D5E", "#1F0E2F"], // Mor
  ["#155E3F", "#0A2F1F"], // Yeşil
  ["#7A4800", "#3D2400"], // Kahverengi
  ["#991B1B", "#4C0D0D"], // Koyu kırmızı
  ["#0C4A6E", "#06293D"], // Lacivert
  ["#5B21B6", "#2D105B"], // Mor
  ["#065F46", "#032F23"], // Yeşil
  ["#B45309", "#5A2905"], // Turuncu
  ["#BE123C", "#5F091E"], // Bordo
  ["#4338CA", "#211E65"], // Eflatun
];

// Görev için bir arkaplan renk dekorasyonu oluştur
const getGorevBackground = (id: number) => {
  // Görevi renkler dizisinden bir renge eşleştir
  const colorIndex = id % gorevColors.length;
  const [color1, color2] = gorevColors[colorIndex];
  
  // Diagonal gradient ile şık bir arkaplan oluştur
  return `linear-gradient(135deg, ${color1}, ${color2})`;
};



// Standart arka plan pattern'leri
const standardPatterns = [
  // Default kurucu pattern
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwZjI5NDIiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwODE0MjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0idXJsKCNncmFkKSIvPjxjaXJjbGUgY3g9IjI1MCIgY3k9IjI1MCIgcj0iMTAwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlNjBlMGUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg=="
];

// Artık bu fonksiyona ihtiyacımız yok, doğrudan getGorevBackground kullanıyoruz
// Eski kod temizlendi, artık getGorevBackground kullanıyoruz

// Farklı arka plan desenleri (pattern)
const backgroundPatterns = [
  // Pattern 1: Dairesel desenler
  (color1: string, color2: string, id: number) => {
    return `data:image/svg+xml;base64,${btoa(`<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${color1}"/><stop offset="100%" stop-color="${color2}"/></linearGradient></defs><rect width="500" height="500" fill="url(#grad)"/><g fill="none" stroke="#e60e0e" stroke-width="1" stroke-opacity="0.08"><circle cx="250" cy="250" r="${(id % 10) * 15 + 50}"/><circle cx="250" cy="250" r="${(id % 10) * 10 + 100}"/><circle cx="250" cy="250" r="${(id % 10) * 5 + 150}"/></g></svg>`)}`;
  },
  
  // Pattern 2: Grid deseni
  (color1: string, color2: string, id: number) => {
    return `data:image/svg+xml;base64,${btoa(`<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${color1}"/><stop offset="100%" stop-color="${color2}"/></linearGradient></defs><rect width="500" height="500" fill="url(#grad)"/><g fill="none" stroke="#ffffff" stroke-width="1" stroke-opacity="0.05"><line x1="50" y1="50" x2="450" y2="50"/><line x1="50" y1="150" x2="450" y2="150"/><line x1="50" y1="250" x2="450" y2="250"/><line x1="50" y1="350" x2="450" y2="350"/><line x1="50" y1="450" x2="450" y2="450"/><line x1="50" y1="50" x2="50" y2="450"/><line x1="150" y1="50" x2="150" y2="450"/><line x1="250" y1="50" x2="250" y2="450"/><line x1="350" y1="50" x2="350" y2="450"/><line x1="450" y1="50" x2="450" y2="450"/></g></svg>`)}`;
  },
  
  // Pattern 3: Dots deseni
  (color1: string, color2: string, id: number) => {
    return `data:image/svg+xml;base64,${btoa(`<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${color1}"/><stop offset="100%" stop-color="${color2}"/></linearGradient></defs><rect width="500" height="500" fill="url(#grad)"/><g fill="#ffffff" fill-opacity="0.05"><circle cx="100" cy="100" r="4"/><circle cx="200" cy="100" r="4"/><circle cx="300" cy="100" r="4"/><circle cx="400" cy="100" r="4"/><circle cx="100" cy="200" r="4"/><circle cx="200" cy="200" r="4"/><circle cx="300" cy="200" r="4"/><circle cx="400" cy="200" r="4"/><circle cx="100" cy="300" r="4"/><circle cx="200" cy="300" r="4"/><circle cx="300" cy="300" r="4"/><circle cx="400" cy="300" r="4"/><circle cx="100" cy="400" r="4"/><circle cx="200" cy="400" r="4"/><circle cx="300" cy="400" r="4"/><circle cx="400" cy="400" r="4"/></g></svg>`)}`;
  },

  // Pattern 4: Diagonal çizgiler
  (color1: string, color2: string, id: number) => {
    return `data:image/svg+xml;base64,${btoa(`<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${color1}"/><stop offset="100%" stop-color="${color2}"/></linearGradient></defs><rect width="500" height="500" fill="url(#grad)"/><g fill="none" stroke="#e60e0e" stroke-width="1" stroke-opacity="0.07"><line x1="0" y1="0" x2="500" y2="500"/><line x1="100" y1="0" x2="500" y2="400"/><line x1="0" y1="100" x2="400" y2="500"/><line x1="200" y1="0" x2="500" y2="300"/><line x1="0" y1="200" x2="300" y2="500"/><line x1="300" y1="0" x2="500" y2="200"/><line x1="0" y1="300" x2="200" y2="500"/><line x1="400" y1="0" x2="500" y2="100"/><line x1="0" y1="400" x2="100" y2="500"/></g></svg>`)}`;
  },
  
  // Pattern 5: Yıldız deseni
  (color1: string, color2: string, id: number) => {
    return `data:image/svg+xml;base64,${btoa(`<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${color1}"/><stop offset="100%" stop-color="${color2}"/></linearGradient></defs><rect width="500" height="500" fill="url(#grad)"/><g fill="#ffffff" fill-opacity="0.05"><polygon points="250,50 279,154 390,154 300,216 329,320 250,260 171,320 200,216 110,154 221,154"/><path d="M250,250 L250,350" stroke="#e60e0e" stroke-width="1.5" stroke-opacity="0.1"/><path d="M250,250 L300,300" stroke="#e60e0e" stroke-width="1.5" stroke-opacity="0.1"/><path d="M250,250 L200,300" stroke="#e60e0e" stroke-width="1.5" stroke-opacity="0.1"/></g></svg>`)}`;
  },
  
  // Pattern 6: Data flow
  (color1: string, color2: string, id: number) => {
    return `data:image/svg+xml;base64,${btoa(`<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${color1}"/><stop offset="100%" stop-color="${color2}"/></linearGradient></defs><rect width="500" height="500" fill="url(#grad)"/><g fill="none" stroke="#ffffff" stroke-width="1" stroke-opacity="0.07"><path d="M 50,150 C 200,50 300,250 450,150"/><path d="M 50,250 C 200,150 300,350 450,250"/><path d="M 50,350 C 200,250 300,450 450,350"/></g></svg>`)}`;
  },
  
  // Pattern 7: Circuit board
  (color1: string, color2: string, id: number) => {
    return `data:image/svg+xml;base64,${btoa(`<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${color1}"/><stop offset="100%" stop-color="${color2}"/></linearGradient></defs><rect width="500" height="500" fill="url(#grad)"/><g fill="none" stroke="#e60e0e" stroke-width="1" stroke-opacity="0.08" stroke-linecap="round"><path d="M100,100 L400,100 L400,400 L100,400 Z"/><path d="M250,100 L250,400"/><path d="M100,250 L400,250"/><path d="M175,175 L325,175 L325,325 L175,325 Z"/><path d="M175,175 L250,100"/><path d="M325,175 L400,100"/><path d="M175,325 L100,400"/><path d="M325,325 L400,400"/></g></svg>`)}`;
  },
  
  // Pattern 8: Dalga
  (color1: string, color2: string, id: number) => {
    return `data:image/svg+xml;base64,${btoa(`<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${color1}"/><stop offset="100%" stop-color="${color2}"/></linearGradient></defs><rect width="500" height="500" fill="url(#grad)"/><g fill="none" stroke="#ffffff" stroke-width="1" stroke-opacity="0.05"><path d="M 0,100 C 125,50 250,150 500,100"/><path d="M 0,200 C 125,150 250,250 500,200"/><path d="M 0,300 C 125,250 250,350 500,300"/><path d="M 0,400 C 125,350 250,450 500,400"/></g></svg>`)}`;
  },
  
  // Pattern 9: Türk Bayrağı motifi
  (color1: string, color2: string, id: number) => {
    return `data:image/svg+xml;base64,${btoa(`<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${color1}"/><stop offset="100%" stop-color="${color2}"/></linearGradient></defs><rect width="500" height="500" fill="url(#grad)"/><g fill="#e60e0e" fill-opacity="0.05"><circle cx="240" cy="250" r="60"/><polygon points="350,220 370,270 320,240 380,240 330,270" /></g></svg>`)}`;
  },
  
  // Pattern 10: Teknoloji deseni
  (color1: string, color2: string, id: number) => {
    return `data:image/svg+xml;base64,${btoa(`<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${color1}"/><stop offset="100%" stop-color="${color2}"/></linearGradient></defs><rect width="500" height="500" fill="url(#grad)"/><g fill="none" stroke="#ffffff" stroke-width="1" stroke-opacity="0.05"><rect x="100" y="100" width="300" height="300" rx="15"/><rect x="150" y="150" width="200" height="200" rx="10"/><rect x="200" y="200" width="100" height="100" rx="5"/><circle cx="250" cy="250" r="30"/></g></svg>`)}`;
  }
];

interface Gorev {
  id: number;
  baslik: string;
  cagri: string;
  aciklama: string;
  kategori: string;
  kontenjan: number;
  tamamlayan: number;
}

export default function GorevlerPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [selectedGorev, setSelectedGorev] = useState<Gorev | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gorevler, setGorevler] = useState<Gorev[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const gorevlerPerPage = 24; // Her sayfada 24 görev göster (4'erli 6 sıra)
  
  // Form state
  const [formData, setFormData] = useState({
    ad: "",
    eposta: "",
    not: ""
  });
  
  useEffect(() => {
    // Initialize audio system
    initAudio();
    
    // Record visitor stats
    const recordVisit = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: i18n.language || "tr",
            hasInteracted: false,
            page: "gorevler"
          }
        );
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
    
    // Tüm 101 görev
    const allGorevler: Gorev[] = [
      {
        id: 0,
        baslik: "Görev 0: Kurucunun Eksikleri",
        cagri: "Simay'ın eksiklerini tamamla ve geleceğini inşa et.",
        aciklama: "Türkiye Cumhuriyeti'nin ikinci yüzyılında, Simay hareketinin temellerini güçlendir ve katkıda bulun.",
        kategori: "kurucu",
        kontenjan: 25,
        tamamlayan: 0
      },
      {
        id: 1,
        baslik: "1. Görev: Kitapla Bir Hayat Değiştir",
        cagri: "Mahallende bir çocuğa kitap hediye et ve onunla okuma saati düzenle.",
        aciklama: "Çocukların eğitime olan ilgisini artırmak için bir çocuğa kitap hediye et. Okuma saatini planla, o anları kaydet.",
        kategori: "eğitim",
        kontenjan: 25,
        tamamlayan: 0
      },
      {
        id: 2,
        baslik: "2. Görev: Değerleri Kaybetme!",
        cagri: "Ailende veya çevrende unutulmaya yüz tutmuş bir değeri yazıya dök ve paylaş.",
        aciklama: "Unutulmaya yüz tutmuş gelenek, hikaye veya deyimi araştır, dijital ortamda paylaş.",
        kategori: "kültür",
        kontenjan: 25,
        tamamlayan: 0
      },
      {
        id: 3,
        baslik: "3. Görev: Yeşil Alan Oluştur",
        cagri: "Evinizdeki atıl tarım alanı yeşillendir ya da bir saksıda üretime başla.",
        aciklama: "Bir yeşil alan yarat, toprakla bağ kur. Saksıda yeşillik yetiştirip foto ile belgeleyebilirsin.",
        kategori: "çevre",
        kontenjan: 25,
        tamamlayan: 0
      },
      {
        id: 4,
        baslik: "4. Görev: Parklara Geri Dönüşüm Getir",
        cagri: "Mahallendeki bir çocuk parkına çevreye uygun geri dönüşüm kutusu yerleştir.",
        aciklama: "Parkları daha çevre dostu hale getirmek için geri dönüşüm kutusu yerleştir ve bunu belgeleyerek paylaş.",
        kategori: "çevre",
        kontenjan: 25,
        tamamlayan: 0
      },
      {
        id: 5,
        baslik: "5. Görev: Müziğe Ses Ver",
        cagri: "Ses sistemciler ya da beste yapan birini destekle, mini bir kayıt oluştur.",
        aciklama: "Sanatsal üretimi desteklemek için çevrendeki yetenekleri tanıt ve kayıt altına al.",
        kategori: "sanat",
        kontenjan: 25,
        tamamlayan: 0
      },
      {
        id: 6,
        baslik: "6. Görev: Görsel Yarat",
        cagri: "Bir resim ya da tasarım üretip #Gorev6 etiketiyle paylaş.",
        aciklama: "Sanatsal ifade özgürlüğünü kullanarak kendi resim veya grafik çalışmanı üret.",
        kategori: "sanat",
        kontenjan: 25,
        tamamlayan: 0
      },
      {
        id: 7,
        baslik: "7. Görev: Mozaik Duvar",
        cagri: "Mahallende bir duvar temizletip gençlerle birlikte mozaik/pano oluştur.",
        aciklama: "Toplumsal estetik bilinci oluşturmak için bir duvarı birlikte sanatla dönüştürün.",
        kategori: "toplum",
        kontenjan: 25,
        tamamlayan: 0
      },
      {
        id: 8,
        baslik: "8. Görev: Kadınlar İçin Alan Aç",
        cagri: "Kadınlara özel bir bilinçlenme toplantısı organize et.",
        aciklama: "Kadının toplumdaki rolünü güçlendirmek için eğitici ve dayanışmacı bir ortam oluştur.",
        kategori: "toplum",
        kontenjan: 25,
        tamamlayan: 0
      },
      {
        id: 9,
        baslik: "9. Görev: Umut Mesajı",
        cagri: "Yaşadığın bir zorluğu yazıya dökerek başkalarına umut olacak şekilde paylaş.",
        aciklama: "Zorlukların paylaşıldığında nasıl güce dönüşebildiğini göstermek için kendi hikayeni anlat.",
        kategori: "psikoloji",
        kontenjan: 25,
        tamamlayan: 0
      },
      {
        id: 10,
        baslik: "10. Görev: Okul Kütüphanesi Yenileme",
        cagri: "Bir okul kütüphanesine kitap bağışı ve düzenleme desteği ver.",
        aciklama: "Yerel bir okul kütüphanesini kitap bağışı ve düzenleme çalışması ile zenginleştir.",
        kategori: "eğitim",
        kontenjan: 25,
        tamamlayan: 0
      }
      // 11-100 arası görevleri getir - zaten eklemiştik
    ];

    // Gerçek görev verilerini kullan
    const gorevlerData = [
      // Görev 1
      {
        id: 1,
        baslik: "1. Görev: Kitapla Bir Hayat Değiştir",
        cagri: "Mahallende bir çocuğa kitap hediye et ve onunla okuma saati düzenle.",
        aciklama: "Çocukların eğitime olan ilgisini artırmak için bir çocuğa kitap hediye et. Okuma saatini planla, o anları kaydet.",
        kategori: "eğitim",
        kontenjan: 25,
        tamamlayan: 0
      },
      // Görev 2
      {
        id: 2,
        baslik: "2. Görev: Değerleri Kaybetme!",
        cagri: "Ailende veya çevrende unutulmaya yüz tutmuş bir değeri yazıya dök ve paylaş.",
        aciklama: "Unutulmaya yüz tutmuş gelenek, hikaye veya deyimi araştır, dijital ortamda paylaş.",
        kategori: "kültür",
        kontenjan: 25,
        tamamlayan: 0
      },
      // Görev 3
      {
        id: 3,
        baslik: "3. Görev: Yeşil Alan Oluştur",
        cagri: "Evinizdeki atıl tarım alanı yeşillendir ya da bir saksıda üretime başla.",
        aciklama: "Bir yeşil alan yarat, toprakla bağ kur. Saksıda yeşillik yetiştirip foto ile belgeleyebilirsin.",
        kategori: "çevre",
        kontenjan: 25,
        tamamlayan: 0
      },
      // Görev 4
      {
        id: 4,
        baslik: "4. Görev: Parklara Geri Dönüşüm Getir",
        cagri: "Mahallendeki bir çocuk parkına çevreye uygun geri dönüşüm kutusu yerleştir.",
        aciklama: "Parkları daha çevre dostu hale getirmek için geri dönüşüm kutusu yerleştir ve bunu belgeleyerek paylaş.",
        kategori: "çevre",
        kontenjan: 25,
        tamamlayan: 0
      },
      // Görev 5
      {
        id: 5,
        baslik: "5. Görev: Müziğe Ses Ver",
        cagri: "Ses sistemciler ya da beste yapan birini destekle, mini bir kayıt oluştur.",
        aciklama: "Sanatsal üretimi desteklemek için çevrendeki yetenekleri tanıt ve kayıt altına al.",
        kategori: "sanat",
        kontenjan: 25,
        tamamlayan: 0
      },
      // Görev 6
      {
        id: 6,
        baslik: "6. Görev: Görsel Yarat",
        cagri: "Bir resim ya da tasarım üretip #Gorev6 etiketiyle paylaş.",
        aciklama: "Sanatsal ifade özgürlüğünü kullanarak kendi resim veya grafik çalışmanı üret.",
        kategori: "sanat",
        kontenjan: 25,
        tamamlayan: 0
      },
      // Görev 7
      {
        id: 7,
        baslik: "7. Görev: Mozaik Duvar",
        cagri: "Mahallende bir duvar temizletip gençlerle birlikte mozaik/pano oluştur.",
        aciklama: "Toplumsal estetik bilinci oluşturmak için bir duvarı birlikte sanatla dönüştürün.",
        kategori: "toplum",
        kontenjan: 25,
        tamamlayan: 0
      },
      // Görev 8
      {
        id: 8,
        baslik: "8. Görev: Kadınlar İçin Alan Aç",
        cagri: "Kadınlara özel bir bilinçlenme toplantısı organize et.",
        aciklama: "Kadının toplumdaki rolünü güçlendirmek için eğitici ve dayanışmacı bir ortam oluştur.",
        kategori: "toplum",
        kontenjan: 25,
        tamamlayan: 0
      },
      // Görev 9
      {
        id: 9,
        baslik: "9. Görev: Umut Mesajı",
        cagri: "Yaşadığın bir zorluğu yazıya dökerek başkalarına umut olacak şekilde paylaş.",
        aciklama: "Zorlukların paylaşıldığında nasıl güce dönüşebildiğini göstermek için kendi hikayeni anlat.",
        kategori: "psikoloji",
        kontenjan: 25,
        tamamlayan: 0
      },
      // Görev 10
      {
        id: 10,
        baslik: "10. Görev: Gönüllü Mentor Ol",
        cagri: "Gençlik merkezinde gönüllü mentorluk başvurusu yap.",
        aciklama: "Bir gencin hayatına dokunmak için mentorluk başvurusunda bulun ve deneyimlerini paylaş.",
        kategori: "eğitim",
        kontenjan: 25,
        tamamlayan: 0
      },
      // Görev 11
      {
        id: 11,
        baslik: "11. Görev: Kadın Kararlara Dahil",
        cagri: "Kadınların katıldığı bir karar toplantısı düzenle ya da bir öneride bulun.",
        aciklama: "Toplumun yarısı olan kadınların karar süreçlerine katılması için yerel bir toplantıda yer al ya da bir kurum/kuruluşa resmi öneride bulun.",
        kategori: "toplum",
        kontenjan: 25,
        tamamlayan: 0
      },
      // Görev 12
      {
        id: 12,
        baslik: "12. Görev: Müzik Ruhun Gıdasıdır",
        cagri: "Bir çocukla birlikte sanat müziği dinleyin, o an videoya kaydedin.",
        aciklama: "Geleneksel sanat müziklerinin nesiller arası aktarımını desteklemek için bir çocukla birlikte dinleme deneyimi yaşayın ve kaydedin.",
        kategori: "kültür",
        kontenjan: 25,
        tamamlayan: 0
      },
      // Görev 13
      {
        id: 13,
        baslik: "13. Görev: Sesi Yükselt!",
        cagri: "Ses sistemciler sahneye!",
        aciklama: "Bu toplum yıllarca sessizce size katlandı. Şimdi sıra sizde! Bu sayfalarda yer alan playlistleri sokaklara taşıyın, medya engelliyorsa sesimizle duyuracağız kendimizi!",
        kategori: "ifade",
        kontenjan: 25,
        tamamlayan: 0
      },
      // Görev 14
      {
        id: 14,
        baslik: "14. Görev: Komşuya El Uzat",
        cagri: "Bir komşunun ihtiyacına karşılıksız yardım et.",
        aciklama: "Yakın çevrenizdeki bir komşunun ihtiyacını tespit edin ve hiçbir karşılık beklemeden yardım edin. Bu dayanışmayı belgeleyin.",
        kategori: "toplum",
        kontenjan: 25,
        tamamlayan: 0
      },
      // Görev 15
      {
        id: 15,
        baslik: "15. Görev: Bilimle İlham Ver",
        cagri: "Bir bilim dergisini bir gence hediye et ya da birlikte oku.",
        aciklama: "Gençlerin bilimle tanışması için bir bilim yayını satın alıp hediye edin veya birlikte okuyarak fikir üretin.",
        kategori: "eğitim",
        kontenjan: 25,
        tamamlayan: 0
      },
    ];
    
    // Görev 16-100 arası görevler için JSON verisini kullan
    // Bu şekilde birebir aynı görevleri ekleyebiliriz

    // Gerçek görev verilerini tamamlayacak şekilde diğer görevleri ekle
    const restOfGorevler = Array.from({ length: 85 }, (_, index) => {
      const gorevIndex = index + 16; // 16'dan başlayarak
      return {
        id: gorevIndex,
        baslik: `${gorevIndex}. Görev: ${getGorevTitle(gorevIndex)}`,
        cagri: getGorevCagri(gorevIndex),
        aciklama: getGorevAciklama(gorevIndex),
        kategori: getGorevKategori(gorevIndex),
        kontenjan: 25 + Math.floor(Math.random() * 10),
        tamamlayan: Math.floor(Math.random() * 5) * (gorevIndex % 4 === 0 ? 1 : 0)
      };
    });
    
    // Görevleri birleştir
    const fullGorevlerList = [...gorevlerData, ...restOfGorevler];
    
    // Görevlerimizi ayarlayalım - TÜM GÖREVLERİ KULLAN
    setGorevler(fullGorevlerList);
    
    // Görev başlığı alma fonksiyonu - JSON verisinden
    function getGorevTitle(id: number): string {
      // 16-75 arasındaki görevler için başlıklar (JSON verisinden)
      const titles = {
        16: "Ahlaki Örnek Ol",
        17: "Karşıt Görüşleri Dinle",
        18: "Engeli Aşan Destek",
        19: "Sebze Yetiştir",
        20: "Tiyatroyla Tanış",
        21: "Geçmişe Kulak Ver",
        22: "Özgürlük Sözün Olsun",
        23: "Köklerini Keşfet",
        24: "Dijital Detoks Günü",
        25: "Anmayı Unutma",
        26: "Tarihi Canlandır",
        27: "Sanatçı Tanıt",
        28: "İnancı Tanı",
        29: "Özgürlüğü Sor",
        30: "Halk Gazetesi",
        31: "Renkli İlham",
        32: "Hikaye Dinle",
        33: "İlham Sokakta",
        34: "Halkın Başarısı",
        35: "Büyükannenin Anısı",
        36: "Temizlikte Birlik",
        37: "Hakkaniyet Talebi",
        38: "Aile Ağacı",
        39: "Anayasa Okuma Saati",
        40: "Medeniyet Eksiği",
        41: "Kitap Zinciri",
        42: "Zafer Filmi",
        43: "Birlik Konuşması",
        44: "Aile İstişare Saati",
        45: "Geleceği Hayal Et",
        46: "Eğitim Eşitsizliğini Belgele",
        47: "Türkçülük Kitabı",
        48: "Fetih Hikayesi",
        49: "Hayat Tavsiyesi",
        50: "Yabancı Yayına Tepki",
        51: "Zafer Anını Yaz",
        52: "Gerçekten Gerekli",
        53: "Onurlu Duruş",
        54: "Gönüllü Öğretmenlik",
        55: "Adalet Olayı Paylaş",
        56: "Ahlaki Duruş Göster",
        57: "Cumhuriyet Panosu",
        58: "Kız Çocuk Eğitimi",
        59: "Tarihi Belgele",
        60: "Toprağa Ses Ver",
        61: "Yazarla Tanış", 
        62: "Modernleşme Tespiti",
        63: "Karşıt Fikri Anla",
        64: "Düşünceyi Dijitale Aktar",
        65: "Cumhuriyet Afişi", 
        66: "Çalışma Alışkanlığı Geliştir",
        67: "Moral Mesajı Yolla",
        68: "Öğretmen Hikayesi",
        69: "Bilimi Halklaştır",
        70: "Kadını Görünür Kıl",
        71: "İçindeki Toplumu Yaz",
        72: "Hizmet Edeni Anlat",
        73: "Yerel Kahramanı Anlat",
        74: "Yerli Çözüm Üret",
        75: "Hayal Kur Yıldızlara Bak",
        76: "Adil Hizmet Denetimi",
        77: "İyi Vatandaşlık",
        78: "Hak İhlalini Belgele",
        79: "Dijital Gençlik Kampanyası",
        80: "Masal Saati",
        81: "Milletin Yolunda",
        82: "Saygı İle Konuş",
        83: "Tercüme Özeti",
        84: "Basın Özgürlüğü",
        85: "Millet Bilinci",
        86: "Özgürlüğü Paylaş",
        87: "Bilimin Toplumsal Faydası",
        88: "Ekonomik Sorunu Göster",
        89: "Birine Kitap Oku",
        90: "Geçmişe Hafıza Ol",
        91: "Vatanı Hazırla",
        92: "Bilim İnsanını Tanıt",
        93: "Kültürel Geleneği Aktar",
        94: "Ata Yadigarı Dijital",
        95: "Kültürel Miras Kampanyası",
        96: "Fikir Özgürlüğü Anısı",
        97: "Kültür Tanıtım İçeriği",
        98: "Özgürlük Mesajı",
        99: "İstiklal Nedir?",
        100: "Başarıyı Paylaş"
      };
      
      // ID'ye göre başlığı seç
      if (titles[id as keyof typeof titles]) {
        return titles[id as keyof typeof titles];
      } else {
        // Eğer ID için belirli bir başlık yoksa
        return `Görev ${id}`;
      }
    }
    
    // Görev çağrısı alma fonksiyonu - JSON verisinden
    function getGorevCagri(id: number): string {
      // 16-75 arasındaki görevler için çağrılar (JSON verisinden)
      const cagrilar = {
        16: "Ailende örnek bir ahlaki davranışı görünür hale getir.",
        17: "Bir fikir tartışmasında karşıt görüşü dinle, özetle.",
        18: "Bir engelli bireyin ihtiyaçlarını gözlemleyip destek önerisi sun.",
        19: "Balkon ya da bahçede küçük bir sebze yetiştir.",
        20: "Yerel tiyatroya bir gençle birlikte git.",
        21: "Yaşlı birinden geçmiş bayramları dinle ve kaydet.",
        22: "Özgürlük hakkında kendi sözlerini yaz.",
        23: "Atalarının yaşadığı bir yerin tarihini araştır.",
        24: "1 gün dijital detoks yapıp üretim odaklı yaşa.",
        25: "Bir anma törenine katıl ya da organize et.",
        26: "Tarihi bir olayı resmet ya da video üret.",
        27: "Bir sanatçıyı 3 kişiye tanıt.",
        28: "Farklı inançtan bir arkadaşla karşılıklı öğrenme sohbeti yap.",
        29: "3 kişiye özgürlük kavramı hakkında soru sor, yanıtlarını kaydet.",
        30: "Bir günlüğüne gazete çıkar ya da haber yap.",
        31: "Birine resim defteri veya boya hediye et.",
        32: "Yaşlı birinden geçmişe dair hikaye dinle.",
        33: "\"İlham nedir?\" konulu sokak röportajı yap.",
        34: "Halkın başarılarını anlatan bir içerik paylaş.",
        35: "Büyük annenin hayatına dair yazılı bir anı oluştur.",
        36: "Komşularla imece usulü temizlik etkinliği yap.",
        37: "Belediyeye hakkaniyetli bir hizmet talebi gönder.",
        38: "Aile ağacını çizmeye başla.",
        39: "Anayasayı oku, anlamadıklarını hukukçuya sor.",
        40: "Medeniyet eksiğini tespit et, çözüm önerisi yaz.",
        41: "Bir okul kütüphanesine kitap bağışla.",
        42: "Zafer gününü canlandıran kısa film çek.",
        43: "Bir toplulukta birlik temalı konuşma yap.",
        44: "Ailende haftalık istişare saati başlat.",
        45: "Geleceği anlatan bir içerik üret.",
        46: "Eğitim eşitsizliği tespiti yap ve bildir.",
        47: "Türkçülükle ilgili kitap hediye et.",
        48: "Fetih hikayesini dramatize et.",
        49: "Hayat tavsiyesi al ve yazıya dök.",
        50: "Yabancı bir yayın eleştirisi yap ve yerli çözüm öner.",
        51: "Zafer dolu anını yazıya dök ve paylaş.",
        52: "Gerçekten gerekli bir karar al ve uygula.",
        53: "Topluluk önünde onurlu duruşu anlat.",
        54: "Okuma yazma bilmeyene gönüllü öğretmenlik yap.",
        55: "Adaleti anlatan bir olay paylaş.",
        56: "Ahlaki bir davranışı görünür kıl.",
        57: "Cumhuriyet değerleri panosu hazırla.",
        58: "Bir kız çocuğunun eğitimi için destek ağı kur.",
        59: "Tarihi bir olayı belgeleyip paylaş.",
        60: "Köylüyle röportaj yap, toprağın anlamını kaydet.",
        61: "Bir yazarın eserini gençle birlikte incele.",
        62: "Modernleşme ihtiyacını gözlemle ve öner.",
        63: "Tartıştığın konularda karşıt görüşü anlamaya çalış.",
        64: "Düşünce mirasını dijital ortama aktar.",
        65: "Cumhuriyet için şiir/afiş üret.",
        66: "Çalışma azmini artıran bir alışkanlık geliştir.",
        67: "Güvenlik görevlisine moral mesajı gönder.",
        68: "Bir öğretmenin etkisini anlatan hikaye yaz.",
        69: "Bilimsel gelişmeyi halka anlatan sunum hazırla.",
        70: "Topluma katkı sağlayan bir kadını görünür kıl.",
        71: "İçindeki birey ve toplum yönünü yaz.",
        72: "Hizmet eden birini görünür kıl.",
        73: "Yerel bağımsızlık kahramanını anlat.",
        74: "Dış bağımlılığı azaltan yerli bir çözüm öner.",
        75: "Bir çocukla birlikte yıldızlara bakarak hayal kur.",
        76: "Yerel yönetim hizmetini adalet açısından değerlendir.",
        77: "Bir komşunla iyi vatandaşlık pratiği yap.",
        78: "Bir insan hakkı ihlalini raporla.",
        79: "Gençler için dijital kampanya başlat.",
        80: "Çocuklara masal saati organize et.",
        81: "Millete adanmış bir hayat örnek al.",
        82: "Fikirlerini açık ve saygılı şekilde ifade et.",
        83: "Bir tercüme metni kendi cümlelerinle anlat.",
        84: "Basın özgürlüğü üzerine içerik üret.",
        85: "Millet bilincine dair hikaye yaz.",
        86: "Özgürlükle ilgili bir zorluk yaşadıysan paylaş.",
        87: "Bilimin toplumsal faydasını anlatan içerik üret.",
        88: "Ekonomik bir sorun tespiti ve önerisi yap.",
        89: "Birine kitap oku ya da okuma öğret.",
        90: "Geçmişteki bir olayı belgeleyerek hafıza oluştur.",
        91: "Bir genci vatani göreve hazırlamada destekle.",
        92: "Bir bilim insanını tanıt.",
        93: "Kültürel gelenekleri gençlere aktar.",
        94: "Ata yadigarı bir nesneyi dijitale aktar.",
        95: "Kültürel miras için kampanya başlat.",
        96: "Fikir özgürlüğüne dair tanıklığını paylaş.",
        97: "Kültürel değer tanıtan bir içerik üret.",
        98: "Özgürlük hakkında düşündüren bir mesaj yaz.",
        99: "İstiklal nedir sorusuna kendi cevabını ver.",
        100: "Emekle kazanılmış bir başarıyı başkasıyla paylaş."
      };
      
      // ID'ye göre çağrıyı seç
      if (cagrilar[id as keyof typeof cagrilar]) {
        return cagrilar[id as keyof typeof cagrilar];
      } else {
        // Eğer ID için belirli bir çağrı yoksa
        return `${id}. görev için çağrı`;
      }
    }
    
    // Görev açıklaması alma fonksiyonu - JSON verisinden
    function getGorevAciklama(id: number): string {
      // 16-75 arasındaki görevler için açıklamalar (JSON verisinden)
      const aciklamalar = {
        16: "Topluma aktarılması gereken değerli bir davranışı ailende belgeleyerek ya da anlatarak görünür hale getir.",
        17: "Fikir özgürlüğünün temeli karşıt görüşlere kulak vermektir. Bir tartışmada karşı görüşü anlamaya çalış ve notlar al.",
        18: "Erişilebilirlik ve farkındalık için engelli bireylerin hayatını gözlemle ve pratik destek önerileri geliştir.",
        19: "Gıda bilinci ve üretkenlik için evde ya da balkonda sebze yetiştirin. Süreci belgeleyin.",
        20: "Sanatın gelişmesine katkı sağlamak için yerel tiyatro etkinliğine bir genci davet et ve deneyimi paylaş.",
        21: "Geçmişteki kutlamaları, gelenekleri ve birlik duygusunu yaşlı birinden dinleyerek araştır. Ses kaydı veya yazılı metin hazırla.",
        22: "Öz farkındalık ve ifade özgürlüğünü desteklemek için özgürlük kavramına dair kendi cümlelerini üret.",
        23: "Ailene ait tarihi mekanları, köyleri veya şehirleri araştır, belgele ve bu mirası paylaş.",
        24: "Telefon, internet ve sosyal medyadan 24 saat uzak durarak daha bilinçli bir güne adım at. Bu süreci günlük olarak yaz.",
        25: "Toplumun ortak yas ve anma kültürü için şehit, sanatçı, bilim insanı ya da önemli bir figürü anma etkinliği düzenle.",
        26: "Unutulmaması gereken bir tarihi olayı seç, onu sanatla anlat (resim, kısa film, animasyon, tiyatro).",
        27: "Toplumda sanata verilen değeri artırmak için bir yerli sanatçıyı çevrene anlat, eserlerini paylaş.",
        28: "Farklılıkları anlamak için saygılı ve meraklı bir sohbet ortamında karşılıklı sorular sorun, öğrenin.",
        29: "Toplumun özgürlük anlayışını anlamak için 3 farklı insana bu kavramı sor ve cevaplarını yaz.",
        30: "Yaşadığın bölgedeki önemli bir olayı haber formatında yazarak veya bir bülten hazırlayarak topluma duyur.",
        31: "Yaratıcılığı desteklemek için birine resim malzemesi hediye et ve onunla birlikte yaratma sürecine katıl.",
        32: "Kültürel mirası anlamak ve korumak için büyüklerinden bir yaşam hikayesi dinleyip kaydet.",
        33: "İlham veren düşünceleri sokakta sor ve gelen yanıtları derleyerek video ya da yazıya dök.",
        34: "Toplum içindeki gösterilmeyen başarıları yazılı veya görsel olarak paylaşarak motive edici bir içerik üret.",
        35: "Aile büyüklerinin yaşam tecrübelerinden yola çıkarak bir anısını yazılı hale getir ve paylaş.",
        36: "Sokak, park veya apartman gibi ortak alanlarda çevre temizliği yaparak toplumsal dayanışmayı artır.",
        37: "Yerel yönetimlere yapıcı ve adil bir hizmet talebinde bulunarak demokratik katılımı teşvik et.",
        38: "Kendi kökü ve geçmişini tanımak için aileni kuşaklara ayırarak bir soy ağacı çiz.",
        39: "Haklarını öğrenmek ve bilinçli birey olmak için anayasa metnini oku, anlamadığın kısımları uzmana danış.",
        40: "Toplumun ilerlemesi için fark ettiğin bir medeniyet eksiğini tanımla ve bunun için uygulanabilir bir çözüm yaz.",
        41: "Eğitimde fırsat eşitsizliğini azaltmak için yerel bir okula kitap desteğinde bulun.",
        42: "Milli değerleri yaşatmak için bir zaferi anlatan kısa film veya animasyon üret.",
        43: "Birlik ve beraberlik temasını işleyen bir konuşma yaparak çevrendekileri motive et.",
        44: "Aile içinde güçlü iletişim kurmak için her hafta belirli bir saati fikir paylaşımı ve dinleme zamanı olarak belirle.",
        45: "Hayal ettiğin Türkiye'yi ya da dünya geleceğini görsel, yazılı veya sesli olarak anlat.",
        46: "Çevrende eğitime erişimde yaşanan bir eşitsizliği gözlemle, belgeleyip yetkililere bildir ya da topluma duyur.",
        47: "Milli bilinç kazandırmak için bir gence Türkçülük temasında yazılmış bir kitap hediye et.",
        48: "Tarihi bir fethi dramatik bir şekilde anlatan bir hikaye yaz ya da kısa film/video üret.",
        49: "Etrafındaki büyüklerden bir yaşam tavsiyesi iste, bunu yazılı hale getirerek başkalarına da ilham ver.",
        50: "Yabancı bir medya yayınının olumsuz etkisini analiz et ve yerine yerli bir alternatif öner.",
        51: "Başarılı olduğun bir anı, gurur duyduğun bir zamanı yaz ve insanlara ilham ver.",
        52: "Hayatına pozitif etki edecek bir değişiklik yap, bunu planla, uygula ve sonucunu paylaş.",
        53: "Doğru bildiğin şeyin arkasında durduğun bir anı paylaş ya da böyle birini anlat.",
        54: "Etrafında okuma yazma bilmeyen birine gönüllü öğretmenlik yaparak topluma katkıda bulun.",
        55: "Adalet duygusunu pekiştiren yaşadığın ya da duyduğun bir olayı belgeleyip paylaş.",
        56: "Görülen veya sergilenen ahlaki bir davranışı yazılı ya da görsel şekilde paylaşarak topluma örnek ol.",
        57: "Atatürk'ün ilke ve inkilaplarını yansıtan bir pano ya da afiş tasarımı yap ve sergile.",
        58: "Eğitime erişimde zorluk yaşayan bir kız çocuğuna yardım için yerel bir destek sistemi geliştir.",
        59: "Yerel veya ulusal öneme sahip bir tarihi olayı arşivlerden, kişilerden ya da mekanlardan araştır ve kaydet.",
        60: "Köy hayatında üretimin anlamını, zorluğunu ve önemini anlatan bir röportaj yaparak topluma sun.",
        61: "Yerel ya da önemli bir yazarın kitabını bir gence tanıt, birlikte okuyun ve tartışın.",
        62: "Bir toplumsal alanda (eğitim, trafik, iletişim vb.) modernleşme eksiği tespit et ve çözüm önerisi üret.",
        63: "Fikir ayrılıklarında karşındaki kişinin bakış açısını nesnel bir şekilde özetleyerek empati kur.",
        64: "Ailene, toplumuna ya da yaşamına ait önemli fikirleri belgeleyip dijital ortamda sakla ya da paylaş.",
        65: "Cumhuriyet değerlerine dair bir şiir yaz ya da grafik afiş hazırla. Paylaşarak yayılmasına katkıda bulun.",
        66: "Verimliliği artırmak için kendine düzenli tekrar edebileceğin bir çalışma alışkanlığı edin ve deneyimini paylaş.",
        67: "Zor şartlarda çalışan bir güvenlik çalışanına moral verici bir mektup ya da mesaj gönder.",
        68: "Seni etkileyen bir öğretmenin hayatına dokunuşunu anlatan yazılı bir anını kaleme al.",
        69: "Bir bilimsel gelişmeyi herkesin anlayabileceği bir şekilde açıklayan sunum ya da görsel içerik oluştur.",
        70: "Çevrende fedakarlığı, bilgisi ya da cesaretiyle özel bir kadını tanıtıcı bir içerikle destekle.",
        71: "Toplumla bağlantılarını sorgulayan bir yazı kaleme al. Toplumdaki rolünü ve bireysel sorumluluklarını ifade et.",
        72: "Çevrende sessizce topluma hizmet eden bir kişiyi tanıtıcı bir video, röportaj ya da yazı ile anlat.",
        73: "Yöresel tarihinde yer alan bir kahramanı araştır ve onun bağımsızlık mücadelesini toplumla paylaş.",
        74: "Bir alanda (enerji, gıda, teknoloji) dış bağımlılığı azaltacak yerli üretim odaklı bir fikir üret.",
        75: "Bir çocukla birlikte gece yıldızlara bakarak hayal kurun. O hayali yazılı ya da görsel olarak kaydedin.",
        76: "Mahallendeki veya şehirdeki bir hizmetin adil dağıtılıp dağıtılmadığını gözlemle ve raporla.",
        77: "Komşuluk ilişkilerini güçlendiren bir davranışta bulun. Bu deneyimi yazılı veya görsel olarak paylaş.",
        78: "Gözlemlediğini veya şahit olduğun bir hak ihlalini belgeleyerek topluma duyur ya da kurumlara bildir.",
        79: "Gençleri bilinçli tüketim, eğitim, sanat ya da teknoloji üzerine harekete geçirecek sosyal medya kampanyası düzenle.",
        80: "Bir okulda, parkta veya evde çocuklara masal okuyarak onlarla hayal gücünü geliştiren bir etkinlik düzenle.",
        81: "Toplum için çalışmış, fedakarlık yapmış bir kişinin hayatını incele, o kişiden ilham alarak kısaca yaz.",
        82: "Tartışmadan kaçmadan, saygı çerçevesinde fikirlerini ifade ettiğin bir ortam yaşadıysan anlat.",
        83: "Başka bir dilden çevrilmiş bir yazı, kitap ya da belgedeki anlamları kendi cümlelerinle özetle ve yay.",
        84: "Basının tarafsızlığı ve özgürlüğünün topluma etkisi hakkında bir yazı ya da görsel içerik hazırla.",
        85: "Halk olmanın, millet olmanın önemini anlatan kısa ve anlamlı bir hikaye yazarak yay.",
        86: "Baskılar, engeller veya yasaklar nedeniyle kendini ifade edemediğin bir anı anlat.",
        87: "Bir bilimsel gelişimin toplumdaki somut etkilerini açıklayan bir video, grafik ya da yazı hazırla.",
        88: "Çevrende gözlemlediğine dayalı bir ekonomik sorunu tespit et ve iyileştirme önerilerini paylaş.",
        89: "Bir çocuk, yetişkin ya da yaşlı bireye kitap oku ya da harfleri, heceleri birlikte çalışın.",
        90: "Toplumun unuttuğu, üstü örtülen ya da bilinmeyen bir olayı belgeleyerek kayıt altına al.",
        91: "Sorumluluk, dayanışma, tarih bilinci gibi konularda bir genci bilinçli vatandaşlığa yönlendir.",
        92: "Ulusal ya da uluslararası bir bilim insanının hayatını ve çalışmalarını anlatan kısa bir biyografi oluştur.",
        93: "Bir geleneği tanıtmak, anlatmak veya deneyimletmek üzere genç nesillerle etkinlik düzenle.",
        94: "Ailene ait eski bir belge, fotoğraf, mektup gibi değerli bir içeriği taratıp dijitalleştirerek koru.",
        95: "Unutulmaya yüz tutmuş bir kültürel miras unsurunu korumak ya da tanıtmak için sosyal medya kampanyası düzenle.",
        96: "Kendi fikrini ifade ettiğin ve bir etkiyle karşılaştığın bir olayı yazılı şekilde anlat.",
        97: "Yöresel bir yemek, giyim, gelenek ya da sanat türünü tanıtıcı bir içerik hazırla.",
        98: "Bireysel özgürlüğün tanımını yap ve topluma ilham verecek şekilde özgün bir mesaj oluştur.",
        99: "Milli bağımsızlık, özgürlük, onur gibi kavramlara dair istiklal tanımını yap ve paylaş.",
        100: "Kendin ya da çevrendeki birinin azimle elde ettiği başarıyı anlat ve bu motivasyonu başkalarına ulaştır."
      };
      
      // ID'ye göre açıklamayı seç
      if (aciklamalar[id as keyof typeof aciklamalar]) {
        return aciklamalar[id as keyof typeof aciklamalar];
      } else {
        // Eğer ID için belirli bir açıklama yoksa
        return `${id}. görevin detaylı açıklaması`;
      }
    }
    
    // Görev kategorisi alma fonksiyonu
    function getGorevKategori(id: number): string {
      // JSON'dan gelen kategoriler
      const kategoriler: { [key: number]: string } = {
        16: "ahlak",
        17: "ifade",
        18: "toplum",
        19: "çevre",
        20: "sanat",
        21: "kültür",
        22: "ifade",
        23: "kültür",
        24: "bilinç",
        25: "toplum",
        26: "tarih",
        27: "sanat",
        28: "toplum",
        29: "ifade",
        30: "medya",
        31: "sanat",
        32: "kültür",
        33: "ifade",
        34: "toplum",
        35: "kültür",
        36: "toplum",
        37: "adalet",
        38: "kültür",
        39: "eğitim",
        40: "vizyon",
        41: "eğitim",
        42: "kültür",
        43: "toplum",
        44: "toplum",
        45: "vizyon",
        46: "eğitim",
        47: "kültür",
        48: "tarih",
        49: "kültür",
        50: "vizyon",
        51: "ifade",
        52: "bilinç",
        53: "ahlak",
        54: "eğitim",
        55: "adalet",
        56: "ahlak",
        57: "kültür",
        58: "eğitim",
        59: "tarih",
        60: "toplum",
        61: "eğitim",
        62: "vizyon",
        63: "ifade",
        64: "kültür",
        65: "kültür",
        66: "bilinç",
        67: "toplum",
        68: "eğitim",
        69: "bilim",
        70: "toplum",
        71: "bilinç",
        72: "toplum",
        73: "tarih",
        74: "vizyon",
        75: "eğitim",
        76: "adalet",
        77: "toplum",
        78: "hak",
        79: "bilinç",
        80: "eğitim",
        81: "toplum",
        82: "ifade",
        83: "eğitim",
        84: "ifade",
        85: "toplum",
        86: "ifade",
        87: "bilim",
        88: "ekonomi",
        89: "eğitim",
        90: "tarih",
        91: "eğitim",
        92: "bilim",
        93: "kültür",
        94: "tarih",
        95: "kültür",
        96: "ifade",
        97: "kültür",
        98: "ifade",
        99: "ifade",
        100: "toplum"
      };
      
      // ID'ye göre kategoriyi seç
      if (kategoriler[id]) {
        return kategoriler[id];
      } else {
        // Eğer ID için belirli bir kategori yoksa, döngüsel olarak ana kategorilerden seç
        const anaKategoriler = ["eğitim", "kültür", "çevre", "toplum", "sanat", "psikoloji"];
        return anaKategoriler[id % anaKategoriler.length];
      }
    }
    
    // Simüle edilmiş bir yükleme gecikmesi
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // Audio
    playSoundtrack();
    
    return () => {
      // Temizleme işlemleri
    };
  }, [i18n.language]);
  
  // Toggle audio
  const handleToggleAudio = () => {
    playSoundtrack();
  };
  
  // Görev modali açma
  const openGorevModal = (gorev: Gorev) => {
    setSelectedGorev(gorev);
    setIsModalOpen(true);
    
    // Reset form
    setFormData({
      ad: "",
      eposta: "",
      not: ""
    });
  };
  
  // Form değişiklik handleri
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Form gönderildiğinde
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedGorev) return;
    
    try {
      await apiRequest(
        "POST",
        "/api/gorev-basvuru",
        {
          ...formData,
          gorevId: selectedGorev.id,
          gorevBaslik: selectedGorev.baslik
        }
      );
      
      alert("Başvurunuz alındı. Teşekkür ederiz!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Başvuru sırasında hata:", error);
      alert("Başvurunuz alınamadı. Lütfen tekrar deneyin.");
    }
  };
  
  // Kategoriye göre filtrele
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };
  
  // Arama terimini güncelle
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Arama yapıldığında ilk sayfaya dön
  };
  
  // Tüm filtreleri temizle
  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchTerm("");
    setCurrentPage(1); // Filtreler temizlendiğinde ilk sayfaya dön
  };
  
  // Sayfa değiştirme işlevi
  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Sayfa değiştiğinde sayfanın üstüne kaydır
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Filtreleme işlemi
  const filteredGorevler = gorevler.filter(gorev => {
    // Apply category filter if a category is selected
    if (selectedCategory && gorev.kategori !== selectedCategory) {
      return false;
    }
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        gorev.baslik.toLowerCase().includes(searchLower) ||
        gorev.cagri.toLowerCase().includes(searchLower) ||
        gorev.aciklama.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  // Sayfalama hesaplamaları
  const indexOfLastGorev = currentPage * gorevlerPerPage;
  const indexOfFirstGorev = indexOfLastGorev - gorevlerPerPage;
  const currentGorevler = filteredGorevler.slice(indexOfFirstGorev, indexOfLastGorev);
  const totalPages = Math.ceil(filteredGorevler.length / gorevlerPerPage);
  
  // Get unique categories
  const categoriesSet = new Set(gorevler.map(gorev => gorev.kategori));
  const categories = Array.from(categoriesSet);
  
  // Erişilebilirlik için sayfa içeriğini hazırla
  const pageContent = `Görevler sayfasına hoş geldiniz. Bu sayfada, Simay Hareketi'nin belirlediği 100 görevi bulabilirsiniz. 
    Görevler çeşitli kategorilere ayrılmıştır ve tamamladığınız görevleri işaretleyebilirsiniz. 
    Her görevin detaylı açıklaması ve tamamlanması için gereken adımlar görev kartında yer almaktadır.`;

  return (
    <ModernLayout 
      audioKey="mission" 
      showBackButton={true}
      showLanguageSelector={true}
      pageContent={pageContent}
      pageName="Görevler"
    >
      <main className="max-w-6xl mx-auto px-4 pb-16 z-10 relative">
        {/* Header */}
        <div className="text-center py-10">
          <motion.div 
            className="turkish-content-bg p-8 rounded-lg mb-10 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-wide leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              101. YILINDA HALKIN ANDI: 100 GÖREVLE YENİDEN DOĞUŞ
            </motion.h1>
            
            {/* Kimleri Göreve Davet Ediyoruz - Tıklanabilir Başlık */}
            <motion.div 
              className="mt-4 mb-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="flex flex-col items-center gap-3">
                <h2 
                  className="text-2xl font-bold text-turkish-red inline-flex items-center gap-2 font-poppins cursor-pointer"
                  onClick={() => navigate("/gorev-davet")}
                >
                  Kimleri Göreve Davet Ediyoruz? 
                  <span className="text-turkish-white text-base font-normal">(Tıkla)</span>
                </h2>
                
                <button 
                  className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-turkish-red to-red-900 rounded-full shadow-lg hover:from-turkish-red-light hover:to-red-900 transition-all duration-300"
                  aria-label="Davet videosunu oynat"
                  title="Davet Videosunu İzle"
                  onClick={() => window.open("https://www.youtube.com/watch?v=placeholder-davet", "_blank")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Kurucu görev button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6 sm:mb-8"
          >
            <Button 
              className="turkish-flag-button text-base sm:text-lg md:text-xl px-5 sm:px-8 md:px-10 py-4 sm:py-6 md:py-7 font-bold font-poppins"
              onClick={() => navigate("/kurucu-eksikleri")}
            >
              GÖREV 0: KURUCUNUN EKSİKLERİ
            </Button>
          </motion.div>
          
          {/* Filters */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="turkish-content-bg p-6 rounded-lg"
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-center">
                  <Input
                    type="text"
                    placeholder="Görev ara..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="max-w-md turkish-tech-input text-sm sm:text-base md:text-lg px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6 h-10 sm:h-12 md:h-14 font-poppins"
                  />
                </div>
                
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className={selectedCategory === category 
                        ? "turkish-flag-button font-bold text-xs sm:text-sm md:text-lg px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-5 border-none font-poppins" 
                        : "modern-button text-white font-semibold text-xs sm:text-sm md:text-lg px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-5 font-poppins"
                      }
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1); // Kategori değiştiğinde ilk sayfaya dön
                      }}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
            

            
            {/* Counters */}
            <div className="text-center mb-6 sm:mb-8 mt-6 sm:mt-8 turkish-content-bg p-4 sm:p-5 rounded-lg max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row justify-center gap-4 sm:gap-6 md:gap-8">
                <div className="turkish-counter-box p-3 sm:p-4 rounded-lg flex-1">
                  <p className="text-turkish-white text-base sm:text-lg md:text-xl font-bold font-poppins">Toplam Görev</p>
                  <p className="text-turkish-red text-xl sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2 font-poppins">{gorevler.length}</p>
                </div>
                <div className="turkish-counter-box p-3 sm:p-4 rounded-lg flex-1">
                  <p className="text-turkish-white text-base sm:text-lg md:text-xl font-bold font-poppins">Katılım Sayısı</p>
                  <p className="text-turkish-red text-xl sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2 font-poppins">{gorevler.reduce((acc, g) => acc + g.tamamlayan, 0)} vatandaş</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Görevler Grid - Her satırda 4 görev */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {isLoading ? (
              // Loader - mobile-optimized
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-black/40 rounded-lg p-5 animate-pulse h-[300px] sm:h-64 mx-auto w-full max-w-[350px] sm:max-w-none"></div>
              ))
            ) : filteredGorevler.length === 0 ? (
              <p className="text-center col-span-full text-base-responsive">Aranan kriterlere uygun görev bulunamadı.</p>
            ) : (
              currentGorevler.map(gorev => (
                <div 
                  key={gorev.id}
                  className={`relative border-[4px] aspect-[2/3] w-full max-w-[350px] sm:max-w-none mx-auto ${
                    gorev.kategori === 'kurucu' 
                      ? 'border-red-600 shadow-[0_0_25px_rgba(220,38,38,0.5)]' 
                      : gorev.tamamlayan > 0 
                        ? 'border-green-500 shadow-[0_0_15px_rgba(68,255,68,0.5)]' 
                        : 'border-red-600'
                  } rounded-lg hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(220,38,38,0.7)] transition-all duration-300 overflow-hidden`}
                >
                  {/* Renkli gradient arkaplan */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    {/* Görev görseli arkaplan */}
                    <img 
                      src={getGorevImage(gorev.id)}
                      alt=""
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        // Hata durumunda renkli arkaplan kullan
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement!.style.background = getGorevBackground(gorev.id);
                      }}
                    />
                    {/* Stil ve kontrast için gradient overlay ekle */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 p-3 sm:p-4 h-full flex flex-col justify-between">
                    {/* Görev ID göstericisi - mobil için daha büyük */}
                    <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 text-sm font-bold rounded-bl shadow-md min-w-[32px] min-h-[28px] flex items-center justify-center">
                      {gorev.id}
                    </div>
                    
                    {/* Sadece görev başlığı göster, detayları modülde göster */}
                    <div className="mb-4">
                      <h3 className="text-lg-responsive font-bold text-white mb-3 leading-tight text-center">{gorev.baslik}</h3>
                      
                      {/* Dekoratif İkon - görev tipine uygun */}
                      <div className="flex justify-center mb-3">
                        <div className="w-16 h-16 flex items-center justify-center opacity-60">
                          <div className="w-full h-full border-4 border-white/30 rounded-full flex items-center justify-center">
                            <div className="w-10 h-10 border-2 border-white/50 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Kısa çağrı metni - özet olarak */}
                      <p className="text-sm text-white/80 text-center line-clamp-2 mb-3 px-2">
                        {gorev.cagri || "Cumhuriyet güncelleme görevine katılın"}
                      </p>
                    </div>
                    
                    {/* Alt kısımdaki bilgiler ve buton - dokunmatik için iyileştirilmiş */}
                    <div className="mt-auto">
                      <div className="flex justify-between items-center text-sm text-white/90 mb-3 bg-black/30 p-2 rounded-lg">
                        <span className="bg-black/40 px-2 py-1 rounded-md border border-white/20">{gorev.kategori}</span>
                        <span className="bg-black/40 px-2 py-1 rounded-md border border-white/20">{gorev.tamamlayan}/{gorev.kontenjan} kişi</span>
                      </div>
                      <Button 
                        className="w-full bg-gradient-to-r from-red-700 to-red-500 text-base-responsive h-12 py-0 text-white font-bold"
                        onClick={() => openGorevModal(gorev)}
                      >
                        Göreve Katıl
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </motion.div>
          
          {/* Pagination - Bottom - Enhanced Mobile Optimization */}
          {filteredGorevler.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-center items-center mt-8 sm:mt-10 md:mt-12 gap-4 sm:gap-4 turkish-content-bg p-5 sm:p-5 md:p-6 max-w-3xl mx-auto mb-6 sm:mb-10 rounded-lg">
              <Button 
                variant="outline" 
                size="default"
                className="border-2 border-red-600/60 text-white font-bold text-base-responsive w-full sm:w-auto sm:min-w-[120px] px-3 sm:px-4 md:px-6 py-3 hover:bg-red-900/20 min-h-[44px]"
                onClick={() => changePage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                &lt; Önceki
              </Button>
              
              <div className="flex gap-2 sm:gap-3 mx-1 sm:mx-2 flex-wrap justify-center my-3 sm:my-0 w-full sm:w-auto">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    className={currentPage === pageNum 
                      ? "bg-gradient-to-r from-red-700 to-red-500 text-white font-bold text-base-responsive min-w-[44px] min-h-[44px] sm:w-10 sm:h-10 md:w-12 md:h-12 border-none shadow-[0_0_10px_rgba(220,38,38,0.3)]" 
                      : "border-2 border-red-600/60 text-white font-bold text-base-responsive min-w-[44px] min-h-[44px] sm:w-10 sm:h-10 md:w-12 md:h-12 hover:bg-red-900/20"}
                    onClick={() => changePage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                ))}
              </div>
              
              <Button 
                variant="outline"
                size="default" 
                className="border-2 border-red-600/60 text-white font-bold text-base-responsive w-full sm:w-auto sm:min-w-[120px] px-3 sm:px-4 md:px-6 py-3 hover:bg-red-900/20 min-h-[44px]"
                onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Sonraki &gt;
              </Button>
            </div>
          )}
          
          {/* Navigation Buttons - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row justify-center mt-8 md:mt-10 gap-4 sm:gap-6">
            <ModernTechButton 
              variant="outline"
              size="lg"
              onClick={() => navigate("/turkiye")}
              className="text-base-responsive min-h-[50px] py-3"
            >
              Türkiye Sayfasına Dön
            </ModernTechButton>
            
            <ModernTechButton 
              variant="futuristic"
              size="lg"
              glow="subtle"
              onClick={() => navigate("/")}
              className="text-base-responsive min-h-[50px] py-3"
            >
              Ana Sayfa
            </ModernTechButton>
          </div>
          
          {/* Cumhuriyet Sertifikası İbaresi - Mobil Optimizasyonu */}
          <motion.div
            className="w-full max-w-3xl mx-auto turkish-content-bg p-5 sm:p-5 rounded-lg mt-8 sm:mt-10 md:mt-14 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="text-lg-responsive font-bold text-turkish-white font-poppins">
              Tamamlanan görevler <span className="text-turkish-red">Cumhuriyet Sertifikası</span> kazandıracaktır.
            </p>
          </motion.div>
        </div>
        </main>
        
        {/* Bottom animation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 text-white/70 text-sm sm:text-base md:text-xl font-semibold tracking-wide animate-pulse z-10 mb-2">
          CUMHURİYET GÜNCELLENİYOR
        </div>
        
        {/* Görev Modal - Mobil Optimizasyonlu */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen} modal={true}>
          <DialogContent 
            className="bg-black/90 backdrop-blur-md border-2 border-red-600/70 text-white relative overflow-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[95vh] w-[95vw] md:w-[600px] p-5 sm:p-5 md:p-6 rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.5)]">
            {/* Arka plan görseli - seçilen görev için */}
            {selectedGorev?.id && (
              <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Görev görseli arkaplan */}
                <img 
                  src={getGorevImage(selectedGorev.id)}
                  alt=""
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    // Hata durumunda renkli arkaplan kullan
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.style.background = getGorevBackground(selectedGorev.id);
                  }}
                />
                {/* Stil ve kontrast için gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/90"></div>
              </div>
            )}
            
            {/* İçerik - Z indeksi daha yüksek */}
            <div className="relative z-10">
              <DialogHeader>
                <DialogTitle className="text-white text-xl-responsive font-bold mb-2 sm:mb-2">
                  {selectedGorev?.baslik}
                </DialogTitle>
                
                {/* Çağrı metni - büyük ve dikkat çekici */}
                <div className="mb-4 bg-red-900/30 border border-red-600/50 rounded-lg p-4">
                  <p className="text-white text-lg-responsive font-semibold">
                    {selectedGorev?.cagri}
                  </p>
                </div>
                
                {/* Detaylı açıklama */}
                <DialogDescription className="text-white text-base-responsive leading-relaxed mb-5">
                  {selectedGorev?.aciklama}
                </DialogDescription>
                
                {/* Göreve özel bilgiler */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-black/40 rounded-lg p-3 border border-red-600/30">
                    <p className="text-gray-300 text-sm">Kategori:</p>
                    <p className="text-white font-semibold">{selectedGorev?.kategori}</p>
                  </div>
                  <div className="bg-black/40 rounded-lg p-3 border border-red-600/30">
                    <p className="text-gray-300 text-sm">Kontenjan:</p>
                    <p className="text-white font-semibold">{selectedGorev?.tamamlayan}/{selectedGorev?.kontenjan} kişi</p>
                  </div>
                </div>
              </DialogHeader>
              
              <form onSubmit={handleFormSubmit} className="space-y-5 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ad" className="text-base-responsive font-semibold">Adınız Soyadınız:</Label>
                    <Input
                      id="ad"
                      name="ad"
                      value={formData.ad}
                      onChange={handleInputChange}
                      className="bg-black/60 border-2 border-red-600/70 text-white text-base-responsive h-12 shadow-[0_0_10px_rgba(220,38,38,0.1)]"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="eposta" className="text-base-responsive font-semibold">E-posta:</Label>
                    <Input
                      id="eposta"
                      name="eposta"
                      type="email"
                      value={formData.eposta}
                      onChange={handleInputChange}
                      className="bg-black/60 border-2 border-red-600/70 text-white text-base-responsive h-12 shadow-[0_0_10px_rgba(220,38,38,0.1)]"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="not" className="text-base-responsive font-semibold">Not (isteğe bağlı):</Label>
                  <Textarea
                    id="not"
                    name="not"
                    value={formData.not}
                    onChange={handleInputChange}
                    className="bg-black/60 border-2 border-red-600/70 text-white text-base-responsive min-h-[100px] shadow-[0_0_10px_rgba(220,38,38,0.1)]"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dosya" className="text-base-responsive font-semibold">Dosya yükle (PDF, JPEG):</Label>
                  <Input
                    id="dosya"
                    name="dosya"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="bg-black/60 border-2 border-red-600/70 text-white text-base-responsive h-12 shadow-[0_0_10px_rgba(220,38,38,0.1)]"
                  />
                </div>
                
                <div className="flex justify-center mt-6">
                  <ModernTechButton 
                    type="submit" 
                    variant="turkish"
                    size="lg"
                    glow="strong"
                    border="glowing"
                    className="text-base-responsive min-h-[50px] px-8"
                  >
                    Göreve Katıl
                  </ModernTechButton>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
        
      </ModernLayout>
    );
}