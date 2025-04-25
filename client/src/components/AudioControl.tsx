import { useState } from "react";
import { motion } from "framer-motion";

type AudioControlProps = {
  onToggle: () => void;
};

export default function AudioControl({ onToggle }: AudioControlProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handleToggle = () => {
    setIsPlaying(!isPlaying);
    onToggle();
  };
  
  return (
    <motion.button 
      className="sound-btn fixed bottom-4 right-4 z-20 p-2 border border-matrix-green rounded-full"
      title={isPlaying ? "Sesi Kapat" : "Sesi Aç"}
      onClick={handleToggle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 3.5 }}
    >
      {isPlaying ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6a7.5 7.5 0 017.5 7.5M16.5 12a4.5 4.5 0 014.5 4.5M19.5 5.5a9.5 9.5 0 010 13M9 18l3-3 3 3M12 18V9" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      )}
    </motion.button>
  );
}
