import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { isAudioPlaying, playSoundtrack } from "@/lib/audio";

type AudioControlProps = {
  onToggle?: () => void;
  position?: "fixed" | "inline";
  showLabel?: boolean;
};

export default function AudioControl({ 
  onToggle, 
  position = "fixed", 
  showLabel = false 
}: AudioControlProps) {
  const [playing, setPlaying] = useState(isAudioPlaying());
  
  // Ses durumunu takip et
  useEffect(() => {
    setPlaying(isAudioPlaying());
  }, []);
  
  const handleToggle = () => {
    playSoundtrack();
    setPlaying(!playing);
    if (onToggle) onToggle();
  };
  
  const positionClasses = position === "fixed" 
    ? "fixed bottom-4 right-4 z-50" 
    : "inline-flex";
    
  return (
    <motion.div
      className={`flex items-center ${positionClasses}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <motion.button 
        className={`
          rounded-full h-12 w-12 flex items-center justify-center 
          ${playing 
            ? "bg-gradient-to-br from-red-600 to-red-800" 
            : "bg-gradient-to-br from-red-700 to-red-900"} 
          hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-shadow duration-300
          border border-red-500/30
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={playing ? "Sesi Kapat" : "Sesi Aç"}
        onClick={handleToggle}
        aria-label={playing ? "Sesi Kapat" : "Sesi Aç"}
      >
        {playing 
          ? <Pause className="h-5 w-5 text-white" /> 
          : <Play className="h-5 w-5 text-white ml-0.5" />
        }
      </motion.button>
      
      {showLabel && (
        <span className="ml-2 text-gray-400 text-sm">
          {playing ? "Sesi Durdur" : "Sesi Çal"}
        </span>
      )}
    </motion.div>
  );
}
