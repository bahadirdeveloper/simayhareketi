import { useEffect, useRef, useState } from "react";
import { useMatrixRain } from "@/hooks/useMatrixRain";

export default function MatrixBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { createMatrixRain, clearMatrixRain } = useMatrixRain();
  
  useEffect(() => {
    // Detect mobile device for performance optimization
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    // Skip heavy animations on mobile for better performance
    if (isMobile) return;
    
    // Create initial matrix rain effect
    if (containerRef.current) {
      createMatrixRain(containerRef.current);
    }
    
    // Handle window resize with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (containerRef.current && !isMobile) {
          clearMatrixRain(containerRef.current);
          createMatrixRain(containerRef.current);
        }
      }, 250);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [createMatrixRain, clearMatrixRain, isMobile]);
  
  return (
    <div ref={containerRef} className={`matrix-container fixed top-0 left-0 w-screen h-screen overflow-hidden z-0 ${isMobile ? 'opacity-30' : ''}`} />
  );
}
