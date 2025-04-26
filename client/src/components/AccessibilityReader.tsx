import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume, Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AccessibilityReaderProps {
  pageContent: string;
  pageName: string;
}

export default function AccessibilityReader({ pageContent, pageName }: AccessibilityReaderProps) {
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [volume, setVolume] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        
        // Try to find a Turkish voice
        const turkishVoice = availableVoices.find(voice => 
          voice.lang.includes('tr') || voice.name.toLowerCase().includes('turk')
        );
        
        // If Turkish voice is not available, use the first voice
        setCurrentVoice(turkishVoice || availableVoices[0]);
      }
    };

    loadVoices();
    
    // Chrome loads voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    // Clean up
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Initialize new utterance when text or voice changes
  useEffect(() => {
    if (!pageContent || !currentVoice) return;
    
    const newUtterance = new SpeechSynthesisUtterance(pageContent);
    newUtterance.voice = currentVoice;
    newUtterance.rate = 0.9; // Slightly slower for better understanding
    newUtterance.pitch = 1;
    newUtterance.volume = volume;
    newUtterance.lang = currentVoice.lang;
    
    // End event
    newUtterance.onend = () => {
      setIsReading(false);
      setIsPaused(false);
    };
    
    // Error handling
    newUtterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsReading(false);
      setIsPaused(false);
    };
    
    setUtterance(newUtterance);
    
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [pageContent, currentVoice, volume]);

  const toggleSpeech = () => {
    if (!utterance) return;
    
    if (isReading && !isPaused) {
      // Pause speech
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isReading && isPaused) {
      // Resume speech
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      // Start speech
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
      setIsPaused(false);
    }
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
    setIsPaused(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (utterance) {
      utterance.volume = newVolume;
      
      // If currently speaking, we need to restart with new volume
      if (isReading) {
        const currentPaused = isPaused;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
        
        if (currentPaused) {
          window.speechSynthesis.pause();
        }
      }
    }
  };

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVoice = voices.find(voice => voice.name === e.target.value);
    if (selectedVoice) {
      setCurrentVoice(selectedVoice);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Accessibility Button */}
      <motion.button
        className="bg-black/80 text-white p-3 rounded-full shadow-lg border border-red-600/30 hover:bg-black hover:border-red-600/50 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Erişilebilirlik Ayarları"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
        </div>
      </motion.button>

      {/* Accessibility Panel */}
      {isOpen && (
        <motion.div 
          className="absolute bottom-16 right-0 w-72 bg-black/90 backdrop-blur-md text-white rounded-lg shadow-xl border border-red-600/20 p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Bizde Engel Yok</h3>
              <div className="text-xs px-2 py-1 bg-red-900/30 rounded-full">
                {pageName}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mt-2">
              <Button 
                variant="outline" 
                size="sm"
                className="border-red-600/30 hover:border-red-600/50 flex-1 flex items-center justify-center space-x-1"
                onClick={toggleSpeech}
              >
                {isReading && !isPaused ? (
                  <>
                    <Pause className="w-4 h-4 mr-1" />
                    <span>Duraklat</span>
                  </>
                ) : isReading && isPaused ? (
                  <>
                    <Play className="w-4 h-4 mr-1" />
                    <span>Devam Et</span>
                  </>
                ) : (
                  <>
                    <Volume className="w-4 h-4 mr-1" />
                    <span>Sesli Oku</span>
                  </>
                )}
              </Button>
              
              {isReading && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={stopSpeech}
                  className="bg-red-900/70 hover:bg-red-800"
                >
                  <VolumeX className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="pt-2 space-y-2">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-red-400" />
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.1" 
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              {voices.length > 0 && (
                <select 
                  value={currentVoice?.name || ''}
                  onChange={handleVoiceChange}
                  className="w-full text-xs bg-gray-800 border border-gray-700 rounded-md px-2 py-1"
                >
                  {voices.map(voice => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              )}
            </div>
            
            <div className="text-xs text-gray-400 mt-2 border-t border-gray-700 pt-2">
              <p>Sayfayı sesli dinlemek için "Sesli Oku" butonuna tıklayın.</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}