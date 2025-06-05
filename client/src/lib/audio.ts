// Audio system disabled
let isPlaying = false;
let currentPage: string = '';

// Initialize audio system for specific page - disabled
export const initAudio = (page: string = 'default'): void => {
  currentPage = page;
  // Audio system is disabled
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
