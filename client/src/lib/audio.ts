// Turkish Ambient Music System
let audioContext: AudioContext | null = null;
let currentAudio: HTMLAudioElement | null = null;
let isPlaying = false;
let currentPage: string = '';
let currentTrack: string = '';
let volume = 0.3;

// Turkish cultural ambient tracks
const turkishAmbientTracks = {
  default: {
    name: 'Anadolu Rüzgarı',
    description: 'Gentle Anatolian winds with ney flute',
    mood: 'peaceful'
  },
  turkiye: {
    name: 'Türk Destanı',
    description: 'Epic Turkish heritage with traditional instruments',
    mood: 'heroic'
  },
  manifesto: {
    name: 'Cumhuriyet Marşı',
    description: 'Republican anthem with modern orchestration',
    mood: 'patriotic'
  },
  cagri: {
    name: 'Çağrı Sesi',
    description: 'Call to action with drums and strings',
    mood: 'inspiring'
  },
  gorev: {
    name: 'Görev Yürüyüşü',
    description: 'Mission march with Turkish military themes',
    mood: 'determined'
  }
};

// Generate procedural Turkish ambient audio using Web Audio API
const generateTurkishAmbient = async (trackKey: string, audioContext: AudioContext): Promise<AudioBuffer> => {
  const track = turkishAmbientTracks[trackKey as keyof typeof turkishAmbientTracks] || turkishAmbientTracks.default;
  
  // Create 30-second audio buffer for ambient music
  const duration = 30;
  const sampleRate = audioContext.sampleRate;
  const frameCount = sampleRate * duration;
  const audioBuffer = audioContext.createBuffer(2, frameCount, sampleRate);
  
  // Generate different ambient patterns based on track mood
  for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
    const channelData = audioBuffer.getChannelData(channel);
    
    for (let i = 0; i < frameCount; i++) {
      const time = i / sampleRate;
      let sample = 0;
      
      // Base ambient tone
      sample += Math.sin(2 * Math.PI * 220 * time) * 0.1 * Math.sin(time * 0.5);
      
      // Add mood-specific characteristics
      switch (track.mood) {
        case 'heroic':
          // Add deeper resonant tones
          sample += Math.sin(2 * Math.PI * 110 * time) * 0.15 * Math.sin(time * 0.3);
          sample += Math.sin(2 * Math.PI * 330 * time) * 0.08 * Math.sin(time * 0.7);
          break;
        case 'patriotic':
          // Add martial rhythm
          sample += Math.sin(2 * Math.PI * 440 * time) * 0.12 * (Math.sin(time * 2) > 0 ? 1 : 0.3);
          break;
        case 'inspiring':
          // Add uplifting harmonics
          sample += Math.sin(2 * Math.PI * 554 * time) * 0.1 * Math.sin(time * 0.8);
          sample += Math.sin(2 * Math.PI * 659 * time) * 0.07 * Math.sin(time * 1.2);
          break;
        case 'determined':
          // Add driving rhythm
          sample += Math.sin(2 * Math.PI * 165 * time) * 0.2 * Math.sin(time * 1.5);
          break;
        default:
          // Peaceful ambient
          sample += Math.sin(2 * Math.PI * 330 * time) * 0.08 * Math.sin(time * 0.4);
          sample += Math.sin(2 * Math.PI * 165 * time) * 0.06 * Math.sin(time * 0.6);
      }
      
      // Add subtle noise for texture
      sample += (Math.random() - 0.5) * 0.02;
      
      // Apply envelope
      const envelope = Math.sin(Math.PI * time / duration);
      sample *= envelope * 0.3;
      
      channelData[i] = sample;
    }
  }
  
  return audioBuffer;
};

// Initialize audio system for specific page
export const initAudio = async (page: string = 'default'): Promise<void> => {
  try {
    currentPage = page;
    
    // Initialize Web Audio API context
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    // Resume audio context if suspended
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    
    console.log(`Audio initialized for ${page} page with Turkish ambient music`);
  } catch (error) {
    console.warn('Audio initialization failed:', error);
  }
};

// Play Turkish ambient soundtrack
export const playSoundtrack = async (): Promise<void> => {
  try {
    if (!audioContext) {
      await initAudio(currentPage);
    }
    
    if (isPlaying && currentAudio) {
      // Stop current track
      currentAudio.pause();
      currentAudio.currentTime = 0;
      isPlaying = false;
      currentTrack = '';
      console.log('Turkish ambient music stopped');
      return;
    }
    
    // Determine track based on current page
    const trackKey = currentPage === 'turkiye' ? 'turkiye' :
                    currentPage === 'manifesto' ? 'manifesto' :
                    currentPage === 'cagri' ? 'cagri' :
                    currentPage === 'gorev' ? 'gorev' : 'default';
    
    const track = turkishAmbientTracks[trackKey as keyof typeof turkishAmbientTracks];
    const audioData = generateTurkishAmbient(trackKey);
    
    // Create and configure audio element
    currentAudio = new Audio(audioData);
    currentAudio.loop = true;
    currentAudio.volume = volume;
    
    // Add event listeners
    currentAudio.addEventListener('loadstart', () => {
      console.log(`Loading Turkish ambient track: ${track.name}`);
    });
    
    currentAudio.addEventListener('canplaythrough', () => {
      console.log(`Turkish ambient track ready: ${track.description}`);
    });
    
    currentAudio.addEventListener('error', (e) => {
      console.warn('Audio playback error:', e);
      isPlaying = false;
    });
    
    // Play the track
    await currentAudio.play();
    isPlaying = true;
    currentTrack = track.name;
    
    console.log(`Playing Turkish ambient music: ${track.name} (${track.mood} mood)`);
    
  } catch (error) {
    console.warn('Failed to play Turkish ambient music:', error);
    isPlaying = false;
  }
};

// Set volume for ambient music
export const setAmbientVolume = (newVolume: number): void => {
  volume = Math.max(0, Math.min(1, newVolume));
  if (currentAudio) {
    currentAudio.volume = volume;
  }
};

// Get current ambient track info
export const getCurrentTrackInfo = () => {
  const trackKey = currentPage === 'turkiye' ? 'turkiye' :
                  currentPage === 'manifesto' ? 'manifesto' :
                  currentPage === 'cagri' ? 'cagri' :
                  currentPage === 'gorev' ? 'gorev' : 'default';
  
  return turkishAmbientTracks[trackKey as keyof typeof turkishAmbientTracks];
};

// Check if audio is playing
export const isAudioPlaying = (): boolean => {
  return isPlaying;
};

// Get the current playing soundtrack page
export const getCurrentSoundtrackPage = (): string => {
  return currentPage;
};

// Get current track name
export const getCurrentTrackName = (): string => {
  return currentTrack;
};