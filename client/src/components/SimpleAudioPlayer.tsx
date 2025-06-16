import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

// MP3 dosyalarını direkt import et
import notifySound from '../assets/sounds/notify.mp3';

interface SimpleAudioPlayerProps {
  className?: string;
}

export function SimpleAudioPlayer({ className = '' }: SimpleAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Oynatma denemesi yap
        const playPromise = audioRef.current.play();
        
        // Oynatma promise döndürüyorsa, başarı ve hata durumlarını ele al
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Audio started successfully
            })
            .catch(error => {
              // Silent audio fail
            });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Sayfa yüklendiğinde AudioContext'i başlatmak için tıklama dinleyicisini ekle
  useEffect(() => {
    const handleFirstInteraction = () => {
      // AudioContext başlatma işlemi
      if (audioRef.current) {
        // Kullanıcı etkileşimi sonrası AudioContext başlatılabilir
        // @ts-ignore - Safari desteği için webkitAudioContext kullanıyoruz
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          const context = new AudioContext();
          context.resume().then(() => {
            console.log('AudioContext started successfully');
          });
        }
      }
      // Dinleyiciyi kaldır, bir kez çalışması yeterli
      document.removeEventListener('click', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  return (
    <div className={`flex items-center ${className}`}>
      <audio 
        ref={audioRef} 
        src={notifySound}
        loop
        preload="auto" 
        className="hidden"
      />
      
      <motion.button
        onClick={togglePlayPause}
        className={`
          rounded-full h-10 w-10 flex items-center justify-center
          ${isPlaying 
            ? "bg-gradient-to-br from-red-600 to-red-800" 
            : "bg-gradient-to-br from-red-700 to-red-900"}
          border border-red-500/30 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]
          transition-shadow duration-300
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? "Sesi Kapat" : "Sesi Aç"}
      >
        {isPlaying ? (
          <Volume2 className="h-5 w-5 text-white" />
        ) : (
          <VolumeX className="h-5 w-5 text-white" />
        )}
      </motion.button>
      
      <span className="ml-2 text-sm text-gray-400">
        {isPlaying ? "Sesi Kapat" : "Sesi Aç"}
      </span>
    </div>
  );
}