import { Howl } from "howler";

// Audio instances
let soundtrack: Howl | null = null;
let isInitialized = false;
let isPlaying = false;
let currentPage: string = '';

// Define sound paths by page - kullanım için vite baseUrl ile tam yolu belirtiyoruz
const BASE_PATH = import.meta.env.BASE_URL || '';
const soundtrackPaths = {
  home: `${BASE_PATH}sounds/giris.mp3`,
  turkiye: `${BASE_PATH}sounds/giris.mp3`, 
  turknedir: `${BASE_PATH}sounds/giris.mp3`,
  anayasa: `${BASE_PATH}sounds/giris.mp3`,
  default: `${BASE_PATH}sounds/giris.mp3`
};

// Önbelleğe alma sorunlarını önlemek için zaman damgası ekliyoruz
const addTimestamp = (url: string): string => {
  return `${url}?v=${Date.now()}`;
};

// Initialize audio system for specific page
export const initAudio = (page: string = 'default'): void => {
  currentPage = page;
  
  // Sayfa için uygun ses dosyasını belirle
  const soundPath = addTimestamp(
    soundtrackPaths[page as keyof typeof soundtrackPaths] || soundtrackPaths.default
  );
  
  // Destroy previous soundtrack if exists
  if (soundtrack) {
    soundtrack.stop();
    soundtrack.unload();
    soundtrack = null;
  }
  
  // Ses yükleme ve otomatik başlatma
  try {
    soundtrack = new Howl({
      src: [soundPath],
      loop: true,
      volume: 0.2, // Ses seviyesini uygun değere ayarladık
      html5: true,
      preload: true,
      autoplay: true // Siteye girildiğinde otomatik başlatılacak
    });
    
    // Ses yüklendiğinde otomatik başlat
    soundtrack.once('load', () => {
      if (soundtrack) {
        soundtrack.play();
        isPlaying = true;
      }
    });
    
    isInitialized = true;
  } catch (error) {
    console.warn("Audio system init failed, continuing without audio", error);
  }
};

// Play or pause the soundtrack
export const playSoundtrack = (): void => {
  if (!soundtrack) return;
  
  if (isPlaying) {
    soundtrack.pause();
    isPlaying = false;
  } else {
    soundtrack.play();
    isPlaying = true;
  }
};

// Check if audio is playing
export const isAudioPlaying = (): boolean => {
  return isPlaying;
};

// Get the current playing soundtrack page
export const getCurrentSoundtrackPage = (): string => {
  return currentPage;
};
