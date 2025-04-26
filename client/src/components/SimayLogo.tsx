import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function SimayLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const setCanvasSize = () => {
      const size = Math.min(window.innerWidth * 0.4, 300);
      canvas.width = size;
      canvas.height = size;
      drawLogo(ctx, size);
    };
    
    // Function to draw the logo
    const drawLogo = (ctx: CanvasRenderingContext2D, size: number) => {
      const centerX = size / 2;
      const centerY = size / 2;
      const radius = size * 0.4;
      
      // Clear canvas
      ctx.clearRect(0, 0, size, size);
      
      // Draw glowing effect
      const gradient = ctx.createRadialGradient(
        centerX, centerY, radius * 0.8,
        centerX, centerY, radius * 1.5
      );
      gradient.addColorStop(0, 'rgba(255, 160, 0, 0.8)');
      gradient.addColorStop(0.5, 'rgba(255, 50, 0, 0.4)');
      gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw S letter
      ctx.font = `bold ${radius}px 'Share Tech Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Create gradient for S letter
      const textGradient = ctx.createLinearGradient(
        centerX - radius * 0.5, centerY - radius * 0.5,
        centerX + radius * 0.5, centerY + radius * 0.5
      );
      textGradient.addColorStop(0, '#00ff00');
      textGradient.addColorStop(1, '#00aa00');
      
      ctx.fillStyle = textGradient;
      ctx.fillText('S', centerX, centerY);
      
      // Glowing outline
      ctx.strokeStyle = '#aaffaa';
      ctx.lineWidth = 2;
      ctx.strokeText('S', centerX, centerY);
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Animate the logo
    let angle = 0;
    const animate = () => {
      angle += 0.01;
      const size = canvas.width;
      const ctx = canvas.getContext('2d')!;
      
      drawLogo(ctx, size);
      
      const centerX = size / 2;
      const centerY = size / 2;
      const radius = size * 0.1;
      
      // Draw orbiting particles
      for (let i = 0; i < 5; i++) {
        const particleAngle = angle + (i * Math.PI * 2 / 5);
        const x = centerX + Math.cos(particleAngle) * size * 0.3;
        const y = centerY + Math.sin(particleAngle) * size * 0.3;
        
        const particleGradient = ctx.createRadialGradient(
          x, y, 0,
          x, y, radius
        );
        particleGradient.addColorStop(0, 'rgba(0, 255, 0, 0.9)');
        particleGradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
        
        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="relative"
    >
      <canvas 
        ref={canvasRef} 
        className="max-w-full h-auto"
        style={{ 
          filter: 'drop-shadow(0 0 10px rgba(0, 255, 0, 0.7))' 
        }}
      />
    </motion.div>
  );
}