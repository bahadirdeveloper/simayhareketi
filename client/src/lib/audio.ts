// Audio system disabled
let isPlaying = false;
let currentPage: string = '';

// Initialize audio system for specific page - disabled
export const initAudio = (page: string = 'default'): void => {
  currentPage = page;
  // Audio system is disabled
};

// Play soundtrack - disabled
export const playSoundtrack = (): void => {
  // Audio system is disabled
  isPlaying = !isPlaying; // Just toggle the state for UI consistency
};

// Check if audio is playing
export const isAudioPlaying = (): boolean => {
  return isPlaying;
};

// Get the current playing soundtrack page
export const getCurrentSoundtrackPage = (): string => {
  return currentPage;
};