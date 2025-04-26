import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function SimayNewLogo() {
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
      
      // Clear canvas
      ctx.clearRect(0, 0, size, size);
      
      // Earth background with golden ratio spiral
      drawEarthWithSpiral(ctx, centerX, centerY, size * 0.45);
      
      // Draw S in a modern, professional style
      drawModernS(ctx, centerX, centerY, size * 0.45);
      
      // Add glow effect
      addGlowEffect(ctx, centerX, centerY, size * 0.6);
    };

    // Function to draw earth with a golden ratio spiral
    const drawEarthWithSpiral = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
      // Earth backdrop
      const earthGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );
      earthGradient.addColorStop(0, '#034');
      earthGradient.addColorStop(0.7, '#012');
      earthGradient.addColorStop(1, '#001');
      
      ctx.fillStyle = earthGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Continents hint (simplified)
      ctx.fillStyle = 'rgba(0, 120, 60, 0.4)';
      
      // Random continent shapes
      for (let i = 0; i < 5; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = radius * (0.3 + Math.random() * 0.6);
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        const continentSize = radius * (0.1 + Math.random() * 0.2);
        
        ctx.beginPath();
        ctx.ellipse(
          x, y, 
          continentSize, continentSize * 0.7, 
          Math.random() * Math.PI * 2, 
          0, Math.PI * 2
        );
        ctx.fill();
      }
      
      // Turkey highlighted
      ctx.fillStyle = 'rgba(0, 240, 120, 0.8)';
      const turkeyAngle = -Math.PI / 6;
      const turkeyX = centerX + Math.cos(turkeyAngle) * radius * 0.7;
      const turkeyY = centerY + Math.sin(turkeyAngle) * radius * 0.7;
      ctx.beginPath();
      ctx.ellipse(
        turkeyX, turkeyY,
        radius * 0.12, radius * 0.08,
        turkeyAngle, 0, Math.PI * 2
      );
      ctx.fill();
      
      // Golden ratio spiral
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.8)';
      ctx.lineWidth = radius * 0.02;
      
      // Draw spiral (golden ratio)
      let r = 0;
      let theta = 0;
      const goldenRatio = 1.618033988749895;
      const b = 0.1; 
      
      ctx.beginPath();
      for (let i = 0; i < 500; i++) {
        theta += 0.05;
        r = b * Math.pow(goldenRatio, theta / (Math.PI / 2)); 
        
        // Stop when spiral gets too large
        if (r > radius * 0.9) break;
        
        const x = centerX + r * Math.cos(theta);
        const y = centerY + r * Math.sin(theta);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    };
    
    // Function to draw a modern S
    const drawModernS = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
      // Create S path
      const path = new Path2D();
      
      // Dynamic size calculations
      const sWidth = radius * 0.9;
      const sHeight = radius * 1.4;
      const thickness = radius * 0.25;
      const curve = radius * 0.5;
      
      // Start at top right
      path.moveTo(centerX + sWidth/2, centerY - sHeight/2 + curve);
      
      // Top curve
      path.arc(
        centerX + sWidth/2 - curve, 
        centerY - sHeight/2 + curve, 
        curve, 0, Math.PI/2, false
      );
      
      // Left side (top part)
      path.lineTo(centerX - sWidth/2 + curve, centerY - sHeight/2 + curve);
      
      // Bottom left curve of top part
      path.arc(
        centerX - sWidth/2 + curve, 
        centerY - sHeight/2 + curve + curve, 
        curve, Math.PI * 3/2, Math.PI, true
      );
      
      // Bottom of top part to middle part
      path.lineTo(centerX - sWidth/2, centerY);
      
      // Middle part
      path.lineTo(centerX + sWidth/2 - thickness, centerY);
      
      // Top right of bottom part
      path.lineTo(centerX + sWidth/2 - thickness, centerY + thickness/2);
      
      // Right side (bottom part)
      path.lineTo(centerX - sWidth/2 + curve, centerY + thickness/2);
      
      // Top left curve of bottom part
      path.arc(
        centerX - sWidth/2 + curve, 
        centerY + thickness/2 + curve, 
        curve, Math.PI * 3/2, Math.PI, true
      );
      
      // Left side (bottom part)
      path.lineTo(centerX - sWidth/2, centerY + sHeight/2 - curve);
      
      // Bottom left curve
      path.arc(
        centerX - sWidth/2 + curve, 
        centerY + sHeight/2 - curve, 
        curve, Math.PI, Math.PI/2, true
      );
      
      // Bottom
      path.lineTo(centerX + sWidth/2 - curve, centerY + sHeight/2);
      
      // Bottom right curve
      path.arc(
        centerX + sWidth/2 - curve, 
        centerY + sHeight/2 - curve, 
        curve, Math.PI/2, 0, true
      );
      
      // Right side
      path.lineTo(centerX + sWidth/2, centerY + thickness*1.5);
      
      // Fill S with gradient
      const sGradient = ctx.createLinearGradient(
        centerX - sWidth/2, centerY - sHeight/2,
        centerX + sWidth/2, centerY + sHeight/2
      );
      sGradient.addColorStop(0, '#00ff80');
      sGradient.addColorStop(0.5, '#00cc66');
      sGradient.addColorStop(1, '#00aa44');
      
      ctx.fillStyle = sGradient;
      ctx.fill(path);
      
      // Add subtle border to S
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 1;
      ctx.stroke(path);
    };
    
    // Add glow effect
    const addGlowEffect = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
      // Outer glow
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, radius * 0.8,
        centerX, centerY, radius
      );
      glowGradient.addColorStop(0, 'rgba(0, 255, 120, 0.3)');
      glowGradient.addColorStop(1, 'rgba(0, 255, 120, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
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
          filter: 'drop-shadow(0 0 15px rgba(0, 200, 100, 0.5))' 
        }}
      />
    </motion.div>
  );
}