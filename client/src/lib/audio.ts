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
  
  // Always initialize a soundtrack for the current page
  let soundPath = soundtrackPaths[page as keyof typeof soundtrackPaths] || soundtrackPaths.default;
  soundPath = addTimestamp(soundPath);
  
  // Destroy previous soundtrack if exists
  if (soundtrack) {
    soundtrack.stop();
    soundtrack.unload();
    soundtrack = null;
  }
  
  // Ses dosyalarının varlığını kontrol etmek için
  console.log(`Attempting to load sound: ${soundPath}`);
  
  soundtrack = new Howl({
    src: [soundPath],
    loop: true,
    volume: 0.2,
    html5: true,
    preload: true,
    autoplay: false,
    xhr: {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache'
      }
    },
    onloaderror: (id: any, error: any) => {
      console.warn(`Sound file could not be loaded: ${soundPath}`, error);
      // Fallback to default sound if current sound fails
      if (soundPath !== addTimestamp(soundtrackPaths.default)) {
        const defaultSoundPath = addTimestamp(soundtrackPaths.default);
        console.log(`Falling back to default sound: ${defaultSoundPath}`);
        soundtrack = new Howl({
          src: [defaultSoundPath],
          loop: true,
          volume: 0.2,
          html5: true,
          preload: true,
          autoplay: false,
          xhr: {
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache'
            }
          }
        });
      }
    }
  });

  isInitialized = true;
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
