import { useEffect, useRef } from "react";
import { useMatrixRain } from "@/hooks/useMatrixRain";

export default function MatrixBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { createMatrixRain, clearMatrixRain } = useMatrixRain();
  
  useEffect(() => {
    // Create initial matrix rain effect
    if (containerRef.current) {
      createMatrixRain(containerRef.current);
    }
    
    // Handle window resize
    const handleResize = () => {
      if (containerRef.current) {
        clearMatrixRain(containerRef.current);
        createMatrixRain(containerRef.current);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [createMatrixRain, clearMatrixRain]);
  
  return (
    <div ref={containerRef} className="matrix-container fixed top-0 left-0 w-screen h-screen overflow-hidden z-0" />
  );
}
