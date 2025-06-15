import { useEffect, useRef } from "react";

export default function MatrixLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = 120;
      canvas.height = 120;
    };
    
    setCanvasDimensions();
    
    // Matrix logo animation
    let particles: { x: number; y: number; speed: number; size: number; brightness: number }[] = [];
    const particleCount = 50;
    
    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: 0.5 + Math.random() * 1.5,
          size: 1 + Math.random() * 2,
          brightness: 0.3 + Math.random() * 0.7
        });
      }
    };
    
    initParticles();
    
    // Draw logo
    const drawLogo = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach(particle => {
        ctx.fillStyle = `rgba(0, 255, 65, ${particle.brightness})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Update position
        particle.y += particle.speed;
        
        // Reset if particle goes off screen
        if (particle.y > canvas.height) {
          particle.y = 0;
          particle.x = Math.random() * canvas.width;
        }
      });
      
      // Draw "M" letter in matrix style
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.moveTo(20, 40);
      ctx.lineTo(40, 80);
      ctx.lineTo(60, 40);
      ctx.lineTo(80, 80);
      ctx.lineTo(100, 40);
      ctx.lineTo(100, 90);
      ctx.lineTo(85, 90);
      ctx.lineTo(85, 65);
      ctx.lineTo(70, 90);
      ctx.lineTo(50, 90);
      ctx.lineTo(35, 65);
      ctx.lineTo(35, 90);
      ctx.lineTo(20, 90);
      ctx.closePath();
      ctx.fill();
      
      // Draw glow effect
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Request next frame
      requestAnimationFrame(drawLogo);
    };
    
    // Start animation
    const animationId = requestAnimationFrame(drawLogo);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <div className="rounded-full overflow-hidden border-2 border-matrix-green shadow-[0_0_15px_rgba(0,255,65,0.6)] ultra-stable no-motion">
      <canvas 
        ref={canvasRef} 
        width={120} 
        height={120} 
        className="bg-black"
      />
    </div>
  );
}