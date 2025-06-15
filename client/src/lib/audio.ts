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
      
      // Base warm tone - reduced to make room for melodic content
      sample += Math.sin(2 * Math.PI * 110 * time) * 0.05 * Math.sin(time * 0.3);
      
      // Add mood-specific characteristics based on Turkish music styles
      switch (track.mood) {
        case 'nostalgic':
          // Benim Sadık Yarim Kara Topraktır - warm folk melody
          const folkTime = time * 0.8; // Slower tempo
          const folkMelody = Math.sin(2 * Math.PI * 220 * folkTime) * 0.3 * 
                           (Math.sin(folkTime * 2) + 0.5 * Math.sin(folkTime * 4));
          sample += folkMelody * Math.pow(Math.sin(time * 0.2), 2); // Gentle amplitude modulation
          
          // Add harmonic richness like a bağlama
          sample += Math.sin(2 * Math.PI * 330 * folkTime) * 0.15 * Math.sin(time * 0.8);
          sample += Math.sin(2 * Math.PI * 165 * folkTime) * 0.2 * Math.sin(time * 0.4);
          break;
        case 'mystical':
          // Kufi - mystical Anatolian atmosphere with ney-like sound
          const neyTime = time * 0.6; // Even slower, meditative
          const neyTone = Math.sin(2 * Math.PI * 196 * neyTime) * 0.25 * 
                         Math.exp(-neyTime * 0.1) * (1 + 0.3 * Math.sin(neyTime * 8));
          sample += neyTone * Math.sin(time * 0.15); // Very slow breathing
          
          // Add drone-like undertones
          sample += Math.sin(2 * Math.PI * 98 * time) * 0.15 * Math.sin(time * 0.25);
          sample += Math.sin(2 * Math.PI * 147 * time) * 0.1 * Math.sin(time * 0.35);
          break;
        case 'revolutionary':
          // 100 Yıllık Çınar - Cem Karaca Anadolu rock style
          const rockTime = time * 1.2; // Slightly faster tempo
          const powerChord = Math.sin(2 * Math.PI * 220 * rockTime) * 0.3 * 
                           (1 + 0.5 * Math.sin(rockTime * 6)) * Math.sin(time * 1.5);
          sample += powerChord;
          
          // Add bass line depth
          sample += Math.sin(2 * Math.PI * 110 * rockTime) * 0.25 * Math.sin(time * 0.8);
          // Add electric guitar-like harmonics
          sample += Math.sin(2 * Math.PI * 330 * rockTime) * 0.15 * Math.sin(time * 2.5);
          break;
        case 'celebratory':
          // Şinanay - folk dance with davul rhythm
          const danceTime = time * 1.8; // Upbeat tempo
          const davulBeat = Math.sin(danceTime * 4) > 0.3 ? 0.3 : 0.1;
          const zurnaLine = Math.sin(2 * Math.PI * 330 * danceTime) * 0.25 * 
                           (1 + 0.4 * Math.sin(danceTime * 12));
          sample += zurnaLine * davulBeat;
          
          // Add rhythmic accompaniment
          sample += Math.sin(2 * Math.PI * 165 * danceTime) * 0.2 * Math.sin(time * 3);
          sample += Math.sin(2 * Math.PI * 220 * danceTime) * 0.15 * Math.sin(time * 4.5);
          break;
        case 'emotional':
          // Feriğim - heartfelt Turkish folk with tremolo
          const emoTime = time * 0.7; // Slower, more emotional
          const folkVoice = Math.sin(2 * Math.PI * 247 * emoTime) * 0.28 * 
                           (1 + 0.2 * Math.sin(emoTime * 15)) * Math.sin(time * 0.3);
          sample += folkVoice;
          
          // Add saz accompaniment
          sample += Math.sin(2 * Math.PI * 185 * emoTime) * 0.18 * Math.sin(time * 0.8);
          sample += Math.sin(2 * Math.PI * 123 * emoTime) * 0.15 * Math.sin(time * 0.5);
          break;
        case 'energetic':
          // Yuh Yuh - powerful folk rhythm
          const energyTime = time * 1.5; // Strong tempo
          const strongRhythm = Math.sin(energyTime * 8) > 0.4 ? 0.35 : 0.15;
          const folkPower = Math.sin(2 * Math.PI * 220 * energyTime) * strongRhythm;
          sample += folkPower;
          
          // Add percussive elements
          sample += Math.sin(2 * Math.PI * 110 * energyTime) * 0.25 * Math.sin(time * 2);
          sample += Math.sin(2 * Math.PI * 330 * energyTime) * 0.18 * Math.sin(time * 3);
          break;
        case 'historical':
          // 10 Yıl Nutuk - solemn orchestral arrangement
          const speechTime = time * 0.5; // Very slow, ceremonial
          const orchestral = Math.sin(2 * Math.PI * 175 * speechTime) * 0.25 * 
                            Math.sin(time * 0.2) * (1 + 0.1 * Math.sin(speechTime * 6));
          sample += orchestral;
          
          // Add brass section depth
          sample += Math.sin(2 * Math.PI * 131 * speechTime) * 0.2 * Math.sin(time * 0.4);
          sample += Math.sin(2 * Math.PI * 220 * speechTime) * 0.15 * Math.sin(time * 0.6);
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