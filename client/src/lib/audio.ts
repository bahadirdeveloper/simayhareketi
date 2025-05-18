import { Howl } from "howler";

// Daha basit ve etkili ses yönetimi - optimize edilmiş
let soundtrack: Howl | null = null;
let isPlaying = false;
let currentPage: string = '';

// Tek bir ses dosyası kullanıyoruz - sistem optimizasyonu
const AUDIO_FILE = '/sounds/giris.mp3';
const ATTACHED_AUDIO_FILE = '/attached_assets/giris.mp3';

// Initialize audio system for specific page - basitleştirilmiş
export const initAudio = (page: string = 'default'): void => {
  console.log(`Audio initialization started for ${page} page...`);
  currentPage = page;
  
  // Temizlik: Önceki ses dosyalarını kaldır
  if (soundtrack) {
    soundtrack.stop();
    soundtrack.unload();
    soundtrack = null;
  }
  
  try {
    // Doğru ses dosyası yolunu kullan
    const audioPath = page === 'language' || page === 'dil' 
      ? ATTACHED_AUDIO_FILE 
      : AUDIO_FILE;
    
    // Tek bir Howl nesnesi oluştur
    soundtrack = new Howl({
      src: [audioPath],
      loop: true,
      volume: 0.4,
      html5: true,
      preload: true,
      autoplay: false,
      onload: () => {
        console.log(`Audio file ${audioPath} loaded successfully`);
      },
      onloaderror: (id, err) => {
        console.error(`Error loading audio from ${audioPath}:`, err);
      },
      onplayerror: (id, err) => {
        console.error(`Error playing audio:`, err);
        // Tarayıcı kısıtlamaları için yardımcı işlev
        unlockAudio();
      }
    });
  } catch (error) {
    console.error("Audio system initialization failed:", error);
  }
};

// Tarayıcı ses kısıtlamalarını aşmak için yardımcı işlev
const unlockAudio = () => {
  if (!soundtrack) return;
  
  // Boş ses oluştur ve çal
  const silence = new Audio("data:audio/mp3;base64,SUQzBAAAAAABEUAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjEyLjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACyAAVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUV//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjIxAAAAAAAAAAAAAAAAJAAAAAAAAAAAEsoShwkC");
  silence.play().catch(() => {});
};

// Play veya pause - basitleştirilmiş
export const playSoundtrack = (): void => {
  if (!soundtrack) return;
  
  console.log("Forcing audio playback...");
  
  try {
    if (isPlaying) {
      // Çalıyorsa durdur
      soundtrack.pause();
      isPlaying = false;
    } else {
      // Tarayıcı kısıtlamalarını aşmak için
      unlockAudio();
      
      // Ses çalmayı dene
      soundtrack.play();
      isPlaying = true;
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
