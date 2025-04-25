import { Howl } from "howler";

// Audio instance
let soundtrack: Howl | null = null;
let isInitialized = false;
let isPlaying = false;

// Initialize audio system
export const initAudio = (): void => {
  if (!isInitialized) {
    soundtrack = new Howl({
      src: ["https://assets.mixkit.co/sfx/preview/mixkit-cinematic-mystery-background-174.mp3"],
      loop: true,
      volume: 0.2,
      html5: true,
      preload: true,
      autoplay: false,
    });
    
    isInitialized = true;
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
