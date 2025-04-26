import { Howl } from "howler";

// Audio instances
let soundtrack: Howl | null = null;
let isInitialized = false;
let isPlaying = false;
let currentPage: string = '';

// Define sound paths by page
const soundtrackPaths = {
  home: "/sounds/home-soundtrack.mp3",
  turkiye: "/sounds/turkiye-soundtrack.mp3",
  turknedir: "/sounds/turknedir-soundtrack.mp3",
  anayasa: "/sounds/anayasa-soundtrack.mp3",
  default: "/sounds/default-soundtrack.mp3"
};

// Initialize audio system for specific page
export const initAudio = (page: string = 'default'): void => {
  currentPage = page;
  
  // Always initialize a soundtrack for the current page
  const soundPath = soundtrackPaths[page as keyof typeof soundtrackPaths] || soundtrackPaths.default;
  
  // Destroy previous soundtrack if exists
  if (soundtrack) {
    soundtrack.stop();
    soundtrack.unload();
    soundtrack = null;
  }
  
  soundtrack = new Howl({
    src: [soundPath],
    loop: true,
    volume: 0.2,
    html5: true,
    preload: true,
    autoplay: false,
    onloaderror: (id: any, error: any) => {
      console.warn(`Sound file could not be loaded: ${soundPath}`, error);
      // Fallback to default sound if current sound fails
      if (soundPath !== soundtrackPaths.default) {
        soundtrack = new Howl({
          src: [soundtrackPaths.default],
          loop: true,
          volume: 0.2,
          html5: true,
          preload: true,
          autoplay: false,
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
