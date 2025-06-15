import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Music,
  Waves
} from 'lucide-react';
import { 
  initAudio, 
  playSoundtrack, 
  isAudioPlaying, 
  setAmbientVolume,
  getCurrentTrackInfo,
  getCurrentTrackName
} from '@/lib/audio';

interface TurkishAmbientPlayerProps {
  page?: string;
  className?: string;
}

export default function TurkishAmbientPlayer({ page = 'default', className = '' }: TurkishAmbientPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [trackInfo, setTrackInfo] = useState<any>(null);
  const [currentTrack, setCurrentTrack] = useState<string>('');

  useEffect(() => {
    // Initialize audio for current page
    initAudio(page);
    
    // Update track info
    const info = getCurrentTrackInfo();
    setTrackInfo(info);
    
    // Check playing status
    setIsPlaying(isAudioPlaying());
    setCurrentTrack(getCurrentTrackName());
  }, [page]);

  const handleTogglePlay = async () => {
    try {
      await playSoundtrack();
      setIsPlaying(isAudioPlaying());
      setCurrentTrack(getCurrentTrackName());
    } catch (error) {
      console.warn('Failed to toggle Turkish ambient music:', error);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setAmbientVolume(newVolume);
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'heroic': return 'from-red-500 to-orange-500';
      case 'patriotic': return 'from-red-600 to-red-800';
      case 'inspiring': return 'from-blue-500 to-purple-500';
      case 'determined': return 'from-orange-500 to-red-600';
      default: return 'from-blue-400 to-cyan-400';
    }
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'heroic': return '🏛️';
      case 'patriotic': return '🇹🇷';
      case 'inspiring': return '✨';
      case 'determined': return '⚔️';
      default: return '🎵';
    }
  };

  if (!trackInfo) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative ${className}`}
    >
      {/* Main Player Control */}
      <div className="relative backdrop-filter backdrop-blur-xl bg-gradient-to-br from-black/80 via-gray-900/50 to-black/80 border border-red-500/30 rounded-2xl p-4 shadow-[0_15px_35px_rgba(0,0,0,0.3)]">
        
        {/* Track Info Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Music className="w-4 h-4 text-red-400" />
              <span className="text-xs text-gray-400 tracking-wider uppercase">
                Türk Ambiyans
              </span>
            </div>
            {trackInfo.mood && (
              <span className="text-sm">
                {getMoodIcon(trackInfo.mood)}
              </span>
            )}
          </div>
          
          {/* Mood Indicator */}
          <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${getMoodColor(trackInfo.mood)} text-white text-xs font-medium`}>
            {trackInfo.mood}
          </div>
        </div>

        {/* Track Title and Description */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white mb-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
            {trackInfo.name}
          </h3>
          <p className="text-sm text-gray-300 opacity-80">
            {trackInfo.description}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          
          {/* Play/Pause Button */}
          <motion.button
            onClick={handleTogglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`
              relative w-12 h-12 rounded-full flex items-center justify-center
              ${isPlaying 
                ? 'bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_20px_rgba(239,68,68,0.6)]' 
                : 'bg-gradient-to-br from-gray-600 to-gray-800 shadow-[0_0_15px_rgba(107,114,128,0.4)]'
              }
              border-2 border-white/20 backdrop-blur-lg
              transition-all duration-300
            `}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white ml-0.5" />
            )}
            
            {/* Audio Waves Animation */}
            <AnimatePresence>
              {isPlaying && (
                <motion.div
                  className="absolute -inset-2 border-2 border-red-400/30 rounded-full"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0, 0.3]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </AnimatePresence>
          </motion.button>

          {/* Volume Control */}
          <div 
            className="relative flex items-center space-x-2"
            onMouseEnter={() => setShowVolumeControl(true)}
            onMouseLeave={() => setShowVolumeControl(false)}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-black/30 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              {volume === 0 ? (
                <VolumeX className="w-4 h-4 text-gray-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
            </motion.button>

            {/* Volume Slider */}
            <AnimatePresence>
              {showVolumeControl && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 80 }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-full ml-2 top-1/2 -translate-y-1/2"
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${volume * 100}%, #4b5563 ${volume * 100}%, #4b5563 100%)`
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Wave Visualization */}
          <div className="flex items-center space-x-1">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-red-600 to-red-400 rounded-full"
                animate={isPlaying ? {
                  height: [8, 16, 12, 20, 8],
                  opacity: [0.4, 1, 0.6, 1, 0.4]
                } : {
                  height: 8,
                  opacity: 0.3
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>

        {/* Current Track Indicator */}
        {isPlaying && currentTrack && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 pt-3 border-t border-white/10"
          >
            <div className="flex items-center space-x-2">
              <Waves className="w-3 h-3 text-red-400" />
              <span className="text-xs text-gray-400">
                Şu an çalıyor: {currentTrack}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}