import { Howl } from "howler";

// Audio instances
let soundtrack: Howl | null = null;
let isInitialized = false;
let isPlaying = false;
let currentPage: string = '';

// Define sound paths by page - kullanım için vite baseUrl ile tam yolu belirtiyoruz
const BASE_PATH = import.meta.env.BASE_URL || '';
const soundtrackPaths = {
  home: `${BASE_PATH}sounds/home-soundtrack.mp3`,
  turkiye: `${BASE_PATH}sounds/turkiye-soundtrack.mp3`, 
  turknedir: `${BASE_PATH}sounds/turknedir-soundtrack.mp3`,
  anayasa: `${BASE_PATH}sounds/anayasa-soundtrack.mp3`,
  default: `${BASE_PATH}sounds/default-soundtrack.mp3`
};

// Önbelleğe alma sorunlarını önlemek için zaman damgası ekliyoruz
const addTimestamp = (url: string): string => {
  return `${url}?v=${Date.now()}`;
};

// Initialize audio system for specific page
export const initAudio = (page: string = 'default'): void => {
  currentPage = page;
  
  // Ses dosyası hatalarını yaşadığımız için direkt default sesi kullanılıyor
  // İleride gerçek sesler eklendiğinde aşağıdaki kodları açabiliriz
  const soundPath = addTimestamp(soundtrackPaths.default);
  
  // Destroy previous soundtrack if exists
  if (soundtrack) {
    soundtrack.stop();
    soundtrack.unload();
    soundtrack = null;
  }
  
  // Basitleştirilmiş ses yükleme
  try {
    soundtrack = new Howl({
      src: [soundPath],
      loop: true,
      volume: 0.1, // Ses seviyesini düşürdük
      html5: true,
      preload: true,
      autoplay: false
    });
    
    isInitialized = true;
  } catch (error) {
    console.warn("Audio system init failed, continuing without audio");
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
