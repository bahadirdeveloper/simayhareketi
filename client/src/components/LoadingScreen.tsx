import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [cumhuriyetText, setCumhuriyetText] = useState("");
  const [insanlikText, setInsanlikText] = useState("");
  const [isDecoding, setIsDecoding] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const firstPartText = "Cumhuriyet Güncelleniyor... ";
  const secondPartText = "İnsanlık v2.0";
  
  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      // İlk kısmı bir bütün olarak işle
      if (currentIndex === 0) {
        setCumhuriyetText(firstPartText);
        currentIndex = 1;
      } 
      // İkinci kısmı karakter karakter işle
      else if (currentIndex <= secondPartText.length) {
        setInsanlikText(secondPartText.substring(0, currentIndex));
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
            }
          }, 150);
        }, 800);
      }
    }, 70);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl md:text-3xl mb-4">
          <span className="text-red-500">{cumhuriyetText}</span>
          <span className="text-white">{insanlikText}</span>
          <span className="text-white animate-pulse">|</span>
        </h1>
        
        {!isDecoding && (
          <div className="w-64 h-3 bg-gray-900 rounded-sm overflow-hidden mt-4">
            <div 
              className="h-full bg-red-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}