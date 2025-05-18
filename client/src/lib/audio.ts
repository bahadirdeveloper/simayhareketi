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
  
  console.log("Initializing audio with file: giris.mp3");
  
  // Ses dosyasının direkt yolunu belirt
  const soundPath = '/sounds/giris.mp3';
  
  // Destroy previous soundtrack if exists
  if (soundtrack) {
    soundtrack.stop();
    soundtrack.unload();
    soundtrack = null;
  }
  
  // Ses yükleme
  try {
    soundtrack = new Howl({
      src: [soundPath],
      loop: true,
      volume: 0.3, // Ses seviyesini artırdık
      html5: false, // Web Audio API kullan
      preload: true,
      autoplay: false
    });
    
    // Yüklemeyi bekle ve çalıştır
    soundtrack.once('load', () => {
      console.log("Audio file loaded successfully, ready to play");
      // Kullanıcı etkileşimi bekliyoruz
    });
    
    // Hata yönetimi ekle
    soundtrack.on('loaderror', (id, err) => {
      console.error("Error loading audio:", err);
    });
    
    isInitialized = true;
  } catch (error) {
    console.error("Audio system init failed:", error);
  }
};

// Play or pause the soundtrack
export const playSoundtrack = (): void => {
  if (!soundtrack) return;
  
  console.log("Attempting to play/pause soundtrack");
  
  try {
    if (isPlaying) {
      soundtrack.pause();
      isPlaying = false;
      console.log("Audio paused");
    } else {
      // Direkt HTML5 Audio elemanı oluştur ve çal (tarayıcı kısıtlamalarını aşmak için)
      const audioElement = new Audio('/sounds/giris.mp3');
      audioElement.loop = true;
      audioElement.volume = 0.3;
      
      const playPromise = audioElement.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio started playing via HTML5 Audio");
            isPlaying = true;
          })
          .catch(error => {
            console.error("Playback failed:", error);
            // Howler ile tekrar dene
            soundtrack.play();
            isPlaying = true;
          });
      } else {
        soundtrack.play();
        isPlaying = true;
        console.log("Audio started playing via Howler");
      }
    }
  } catch (error) {
    console.error("Error controlling audio:", error);
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
