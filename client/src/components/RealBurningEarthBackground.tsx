import { useEffect, useRef } from 'react';

export default function RealBurningEarthBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Load Earth texture
    const earthImage = new Image();
    earthImage.src = 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDk3OTg5NTF8&ixlib=rb-4.0.3&q=80&w=1080';
    
    earthImage.onload = () => {
      draw();
    };
    
    // Create fire overlay
    const createFireGradient = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
      const gradient = ctx.createRadialGradient(x, y + radius * 0.2, radius * 0.4, x, y + radius * 0.1, radius * 1.2);
      gradient.addColorStop(0, 'rgba(255, 100, 0, 0.8)');
      gradient.addColorStop(0.4, 'rgba(255, 60, 0, 0.6)');
      gradient.addColorStop(0.7, 'rgba(255, 0, 0, 0.4)');
      gradient.addColorStop(1, 'rgba(20, 0, 0, 0)');
      return gradient;
    };
    
    // Animation variables
    let time = 0;
    
    // Draw function
    function draw() {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw dark space background
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add stars
      ctx.fillStyle = '#FFF';
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2;
        ctx.globalAlpha = Math.random() * 0.8 + 0.2;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      
      // Draw Earth
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;
      
      // Earth shadow & atmosphere
      ctx.beginPath();
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, radius * 0.95,
        centerX, centerY, radius * 1.2
      );
      glowGradient.addColorStop(0, 'rgba(100, 120, 255, 0.6)');
      glowGradient.addColorStop(1, 'rgba(0, 20, 80, 0)');
      ctx.fillStyle = glowGradient;
      ctx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2);
      ctx.fill();
      
      // Earth image
      if (earthImage.complete) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.clip();
        
        // Draw Earth image
        const scale = 2 * radius / Math.min(earthImage.width, earthImage.height);
        const imgWidth = earthImage.width * scale;
        const imgHeight = earthImage.height * scale;
        ctx.drawImage(
          earthImage, 
          centerX - imgWidth / 2, 
          centerY - imgHeight / 2, 
          imgWidth, 
          imgHeight
        );
        
        // Add fire overlay to bottom half
        ctx.beginPath();
        ctx.rect(centerX - radius, centerY, radius * 2, radius);
        ctx.clip();
        
        // Create multiple flame layers
        for (let i = 0; i < 5; i++) {
          const offsetY = Math.sin(time * 0.01 + i * 0.5) * 10;
          const fireGradient = createFireGradient(ctx, centerX, centerY + offsetY, radius);
          ctx.fillStyle = fireGradient;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius * 1.1, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Dynamic fire particles for bottom half
        ctx.globalAlpha = 0.7;
        for (let i = 0; i < 100; i++) {
          const angle = Math.PI + (Math.random() * Math.PI);
          const distance = radius * (0.9 + Math.random() * 0.4);
          const x = centerX + Math.cos(angle) * distance;
          const y = centerY + Math.sin(angle) * distance;
          const size = 1 + Math.random() * 3;
          
          const hue = 10 + Math.random() * 20;
          ctx.fillStyle = `hsl(${hue}, 100%, ${50 + Math.random() * 50}%)`;
          
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        
        ctx.restore();
      }
      
      // Update animation time
      time++;
      requestAnimationFrame(draw);
    }
    
    // Start animation
    draw();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full object-cover -z-10" 
      style={{ filter: 'contrast(1.2) saturate(1.5)' }}
    />
  );
}