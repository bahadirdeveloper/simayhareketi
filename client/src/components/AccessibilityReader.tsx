import { useState, useEffect } from "react";
import { Mic, Square, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AccessibilityReaderProps {
  pageContent: string;
  pageName: string;
}

export default function AccessibilityReader({ pageContent, pageName }: AccessibilityReaderProps) {
  const [isReading, setIsReading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null);
  
  // Initialize speech synthesis
  useEffect(() => {
    // Check if browser supports speech synthesis
    if (!('speechSynthesis' in window)) {
      console.warn("Tarayıcınız metin seslendirmeyi desteklemiyor.");
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(pageContent);
    utterance.lang = 'tr-TR';
    utterance.rate = 0.9; // Slightly slower than normal
    utterance.pitch = 1;
    
    // When speech ends, reset the reading state
    utterance.onend = () => {
      setIsReading(false);
    };
    
    setSpeech(utterance);
    
    // Clean up on unmount
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [pageContent]);
  
  // Handle play/pause
  const toggleReading = () => {
    if (!speech) return;
    
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      // Set volume based on mute state
      speech.volume = isMuted ? 0 : 1;
      window.speechSynthesis.speak(speech);
      setIsReading(true);
    }
  };
  
  // Handle mute/unmute
  const toggleMute = () => {
    if (!speech) return;
    
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    
    // If currently speaking, update the speech volume
    if (isReading) {
      speech.volume = newMuteState ? 0 : 1;
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 bg-black/60 backdrop-blur-sm p-2 rounded-lg border border-red-500/30 shadow-[0_0_10px_rgba(220,38,38,0.15)]">
      <div className="text-xs text-white/80 text-center border-b border-red-500/30 pb-1 mb-1">
        Erişilebilirlik
      </div>
      
      <div className="flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className={`w-8 h-8 ${isReading ? 'bg-red-800/50 border-red-500' : 'bg-gray-800/30 border-gray-500/50'}`}
                onClick={toggleReading}
              >
                {isReading ? <Square className="h-4 w-4 text-white" /> : <Mic className="h-4 w-4 text-white" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{isReading ? 'Seslendirmeyi Durdur' : 'Sayfayı Seslendir'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className={`w-8 h-8 ${isMuted ? 'bg-red-800/50 border-red-500' : 'bg-gray-800/30 border-gray-500/50'}`}
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="h-4 w-4 text-white" /> : <Volume2 className="h-4 w-4 text-white" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{isMuted ? 'Sesi Aç' : 'Sesi Kapat'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="text-[10px] text-white/50 text-center mt-1">
        Bizde Engel Yok
      </div>
    </div>
  );
}