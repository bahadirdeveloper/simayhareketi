import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const [isDecoding, setIsDecoding] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const fullText = "Initializing Matrix... System online.";
  
  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
        setTimeout(() => {
          setIsDecoding(false);
          
          // Start progress bar
          let loadProgress = 0;
          const progressInterval = setInterval(() => {
            loadProgress += 5;
            setProgress(loadProgress);
            
            if (loadProgress >= 100) {
              clearInterval(progressInterval);
              setTimeout(() => {
                onComplete();
              }, 500);
            }
          }, 150);
        }, 800);
      }
    }, 70);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [onComplete]);
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: isDecoding ? 1 : 0,
        y: isDecoding ? 0 : -50 
      }}
      transition={{ 
        opacity: { duration: 0.8, delay: 2.5 },
        y: { duration: 0.5, delay: 2.5 }
      }}
    >
      <div className="text-center max-w-lg">
        <motion.div 
          className="text-matrix-green font-share-tech text-2xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="typing-cursor">{text}</span>
        </motion.div>
        
        {!isDecoding && (
          <motion.div 
            className="w-64 h-2 bg-[rgba(0,255,65,0.2)] rounded-full overflow-hidden mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="h-full bg-matrix-green"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}