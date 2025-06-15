// Turkish Ambient Music System
let audioContext: AudioContext | null = null;
let currentSource: AudioBufferSourceNode | null = null;
let currentGainNode: GainNode | null = null;
let isPlaying = false;
let currentPage: string = '';
let currentTrack: string = '';
let volume = 0.3;

// Turkish cultural music playlist
const turkishPlaylist = {
  default: {
    name: 'Benim Sadık Yarim Kara Topraktır',
    artist: 'Geleneksel',
    description: 'Türk halk müziği klasiği - toprak sevgisi',
    mood: 'nostalgic',
    audioFile: null // Will be procedural until real files added
  },
  turkiye: {
    name: 'Kufi',
    artist: 'Geleneksel',
    description: 'Anadolu ezgileri - mistik atmosfer',
    mood: 'mystical',
    audioFile: null
  },
  manifesto: {
    name: '100 Yıllık Çınar',
    artist: 'Cem Karaca',
    description: 'Anadolu rock klasiği - güçlü mesaj',
    mood: 'revolutionary',
    audioFile: null
  },
  anayasa: {
    name: 'Şinanay',
    artist: 'Geleneksel',
    description: 'Türk halk oyunu müziği - neşeli ritim',
    mood: 'celebratory',
    audioFile: null
  },
  cagri: {
    name: 'Feriğim',
    artist: 'Geleneksel',
    description: 'Anadolu türküsü - duygusal yoğunluk',
    mood: 'emotional',
    audioFile: null
  },
  gorev: {
    name: 'Yuh Yuh',
    artist: 'Geleneksel',
    description: 'Halk müziği - güçlü ritim',
    mood: 'energetic',
    audioFile: null
  },
  katil: {
    name: '10 Yıl Nutuk',
    artist: 'Geleneksel',
    description: 'Atatürk nutku - tarihi konuşma',
    mood: 'historical',
    audioFile: null
  }
};

// Generate procedural Turkish music based on authentic tracks
const generateTurkishMusic = async (trackKey: string, audioContext: AudioContext): Promise<AudioBuffer> => {
  const track = turkishPlaylist[trackKey as keyof typeof turkishPlaylist] || turkishPlaylist.default;
  
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
      
      // Add mood-specific characteristics based on Turkish music styles
      switch (track.mood) {
        case 'nostalgic':
          // Benim Sadık Yarim Kara Topraktır - folk melody patterns
          const folkFreq1 = 220.00; // A3
          const folkFreq2 = 246.94; // B3
          const folkFreq3 = 293.66; // D4
          sample += Math.sin(2 * Math.PI * folkFreq1 * time) * 0.15 * Math.sin(time * 0.5);
          sample += Math.sin(2 * Math.PI * folkFreq2 * time) * 0.1 * Math.sin(time * 0.7);
          sample += Math.sin(2 * Math.PI * folkFreq3 * time) * 0.08 * Math.sin(time * 1.2);
          break;
        case 'mystical':
          // Kufi - mystical Anatolian tones
          sample += Math.sin(2 * Math.PI * 196.00 * time) * 0.12 * Math.sin(time * 0.3); // G3
          sample += Math.sin(2 * Math.PI * 293.66 * time) * 0.1 * Math.sin(time * 0.8);  // D4
          sample += Math.sin(2 * Math.PI * 415.30 * time) * 0.08 * Math.sin(time * 1.5); // G#4
          break;
        case 'revolutionary':
          // 100 Yıllık Çınar - Cem Karaca style rock elements
          const rockFreq = 440.00; // A4
          sample += Math.sin(2 * Math.PI * rockFreq * time) * 0.2 * Math.sin(time * 2);
          sample += Math.sin(2 * Math.PI * rockFreq * 0.5 * time) * 0.15 * Math.sin(time * 1);
          // Add distortion-like harmonics
          sample += Math.sin(2 * Math.PI * rockFreq * 1.5 * time) * 0.08 * Math.sin(time * 3);
          break;
        case 'celebratory':
          // Şinanay - folk dance rhythm
          const dancePattern = Math.sin(time * 6) > 0.5 ? 0.2 : 0.1;
          sample += Math.sin(2 * Math.PI * 329.63 * time) * dancePattern; // E4
          sample += Math.sin(2 * Math.PI * 392.00 * time) * 0.12 * Math.sin(time * 2); // G4
          break;
        case 'emotional':
          // Feriğim - emotional Turkish folk
          sample += Math.sin(2 * Math.PI * 261.63 * time) * 0.15 * Math.sin(time * 0.4); // C4
          sample += Math.sin(2 * Math.PI * 311.13 * time) * 0.12 * Math.sin(time * 0.9); // D#4
          sample += Math.sin(2 * Math.PI * 369.99 * time) * 0.1 * Math.sin(time * 1.3);  // F#4
          break;
        case 'energetic':
          // Yuh Yuh - strong rhythmic patterns
          const energyBeat = Math.sin(time * 4) > 0.6 ? 0.18 : 0.08;
          sample += Math.sin(2 * Math.PI * 277.18 * time) * energyBeat; // C#4
          sample += Math.sin(2 * Math.PI * 415.30 * time) * 0.12 * Math.sin(time * 2.5); // G#4
          break;
        case 'historical':
          // 10 Yıl Nutuk - solemn, historical tones
          sample += Math.sin(2 * Math.PI * 174.61 * time) * 0.18 * Math.sin(time * 0.3); // F3
          sample += Math.sin(2 * Math.PI * 220.00 * time) * 0.15 * Math.sin(time * 0.6); // A3
          sample += Math.sin(2 * Math.PI * 293.66 * time) * 0.1 * Math.sin(time * 0.9);  // D4
          break;
        default:
          // Default nostalgic folk
          sample += Math.sin(2 * Math.PI * 220 * time) * 0.12 * Math.sin(time * 0.5);
          sample += Math.sin(2 * Math.PI * 293.66 * time) * 0.08 * Math.sin(time * 0.7);
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
    
    if (isPlaying && currentSource) {
      // Stop current track
      currentSource.stop();
      currentSource.disconnect();
      if (currentGainNode) {
        currentGainNode.disconnect();
      }
      currentSource = null;
      currentGainNode = null;
      isPlaying = false;
      currentTrack = '';
      console.log('Turkish ambient music stopped');
      return;
    }
    
    // Determine track based on current page - only your playlist tracks
    const trackKey = currentPage === 'turkiye' ? 'turkiye' :
                    currentPage === 'manifesto' ? 'manifesto' :
                    currentPage === 'anayasa' ? 'anayasa' :
                    currentPage === 'cagri' ? 'cagri' :
                    currentPage === 'gorev' ? 'gorev' :
                    currentPage === 'katil' ? 'katil' : 
                    currentPage === 'home' ? 'default' : null;

    // If page doesn't have an assigned track, don't play anything
    if (!trackKey || !turkishPlaylist[trackKey as keyof typeof turkishPlaylist]) {
      console.log(`No music assigned for page: ${currentPage}`);
      return;
    }
    
    const track = turkishPlaylist[trackKey as keyof typeof turkishPlaylist];
    
    // Generate procedural audio buffer
    const audioBuffer = await generateTurkishMusic(trackKey, audioContext!);
    
    // Create audio source from buffer
    const source = audioContext!.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = true;
    
    // Create gain node for volume control
    const gainNode = audioContext!.createGain();
    gainNode.gain.value = volume;
    
    // Connect audio nodes
    source.connect(gainNode);
    gainNode.connect(audioContext!.destination);
    
    // Store references for control
    currentSource = source;
    currentGainNode = gainNode;
    
    // Start playback
    source.start();
    isPlaying = true;
    currentTrack = track.name;
    
    console.log(`Playing Turkish ambient music: ${track.name} (${track.mood} mood)`);
    
    // Handle source end
    source.onended = () => {
      isPlaying = false;
      currentTrack = '';
      currentSource = null;
      currentGainNode = null;
    };
    
  } catch (error) {
    console.warn('Failed to play Turkish ambient music:', error);
    isPlaying = false;
  }
};

// Set volume for ambient music
export const setAmbientVolume = (newVolume: number): void => {
  volume = Math.max(0, Math.min(1, newVolume));
  if (currentGainNode) {
    currentGainNode.gain.value = volume;
  }
};

// Get current ambient track info
export const getCurrentTrackInfo = () => {
  const trackKey = currentPage === 'turkiye' ? 'turkiye' :
                  currentPage === 'manifesto' ? 'manifesto' :
                  currentPage === 'anayasa' ? 'anayasa' :
                  currentPage === 'cagri' ? 'cagri' :
                  currentPage === 'gorev' ? 'gorev' :
                  currentPage === 'katil' ? 'katil' : 
                  currentPage === 'home' ? 'default' : null;
  
  if (!trackKey || !turkishPlaylist[trackKey as keyof typeof turkishPlaylist]) {
    return null;
  }
  
  return turkishPlaylist[trackKey as keyof typeof turkishPlaylist];
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