import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function TurkishGeneFlowLogo() {
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
      
      // Draw the base backdrop - dark circle
      const baseRadius = size * 0.45;
      drawBackdrop(ctx, centerX, centerY, baseRadius);
      
      // Draw the S shape with flowing Turkish DNA/genes
      drawTurkishGeneS(ctx, centerX, centerY, baseRadius);
      
      // Add glow effect
      addGlowEffect(ctx, centerX, centerY, size * 0.6);
      
      // Add animation frame
      requestAnimationFrame(() => drawLogo(ctx, size));
    };

    // Draw the backdrop
    const drawBackdrop = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
      // Backdrop with Turkish flag theme colors
      const bgGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius * 1.2
      );
      bgGradient.addColorStop(0, '#000');
      bgGradient.addColorStop(0.7, '#190000');
      bgGradient.addColorStop(1, '#000');
      
      ctx.fillStyle = bgGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2);
      ctx.fill();
      
      // Red outer border (Turkish flag color)
      ctx.strokeStyle = 'rgba(227, 10, 23, 0.7)';
      ctx.lineWidth = radius * 0.03;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.1, 0, Math.PI * 2);
      ctx.stroke();
    };
    
    // Draw the S shape with flowing Turkish genes
    const drawTurkishGeneS = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
      const time = performance.now() / 1000;
      
      // Define S curve points
      const sCurvePoints = getFlowingSCurve(centerX, centerY, radius, time);
      
      // Draw the main S shape
      drawSShape(ctx, sCurvePoints, radius, time);
      
      // Draw flowing DNA/gene particles along the S
      drawFlowingGenes(ctx, sCurvePoints, time);
      
      // Draw the Turkish star and crescent moon symbol at the center
      drawTurkishSymbol(ctx, centerX, centerY, radius * 0.22);
    };
    
    // Get flowing S curve points
    const getFlowingSCurve = (centerX: number, centerY: number, radius: number, time: number) => {
      const points = [];
      const segments = 30;
      
      // Parameters for the S-curve
      const width = radius * 0.7;
      const height = radius * 1.1;
      
      // Create the flowing S curve with slight animation
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const phase = Math.PI * 2 * t;
        
        // Parametric formula for S shape
        const x = centerX + width * Math.sin(phase + time * 0.1) * 0.5;
        const y = centerY - height * 0.5 + height * t;
        
        points.push({ x, y });
      }
      
      return points;
    };
    
    // Draw the main S shape
    const drawSShape = (ctx: CanvasRenderingContext2D, points: {x: number, y: number}[], radius: number, time: number) => {
      // Create gradient for S shape - Turkish red to future blue/white
      const sGradient = ctx.createLinearGradient(
        points[0].x, points[0].y,
        points[points.length - 1].x, points[points.length - 1].y
      );
      
      // Use Turkish flag red transitioning to futuristic blue/teal
      sGradient.addColorStop(0, '#E30A17'); // Turkish red
      sGradient.addColorStop(0.4, '#E30A17'); // Turkish red
      sGradient.addColorStop(0.7, '#009ddc'); // Future blue
      sGradient.addColorStop(1, '#00ffcc'); // Futuristic teal
      
      // Draw the path
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      
      // Draw S curve
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        
        const xc = (prev.x + curr.x) / 2;
        const yc = (prev.y + curr.y) / 2;
        
        ctx.quadraticCurveTo(prev.x, prev.y, xc, yc);
      }
      
      // S shape styles
      ctx.lineWidth = radius * 0.15;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = sGradient;
      ctx.stroke();
      
      // Add depth with outer glow
      ctx.lineWidth = radius * 0.17;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.globalCompositeOperation = 'destination-over';
      ctx.stroke();
      
      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';
    };
    
    // Draw flowing gene particles
    const drawFlowingGenes = (ctx: CanvasRenderingContext2D, points: {x: number, y: number}[], time: number) => {
      const particleCount = 70;
      const particleSizes = [1, 1.5, 2, 2.5];
      
      // For each gene particle
      for (let i = 0; i < particleCount; i++) {
        // Calculate position along S curve
        const t = (i / particleCount + time * 0.1) % 1;
        const pointIndex = Math.floor(t * (points.length - 1));
        const nextPointIndex = Math.min(pointIndex + 1, points.length - 1);
        
        const subT = t * (points.length - 1) - pointIndex;
        
        // Interpolate position
        const x = points[pointIndex].x + (points[nextPointIndex].x - points[pointIndex].x) * subT;
        const y = points[pointIndex].y + (points[nextPointIndex].y - points[pointIndex].y) * subT;
        
        // Determine if in past (Turkish tradition) or future section
        const inPastSection = t < 0.4;
        
        // Size and colors
        const particleSize = particleSizes[i % particleSizes.length];
        
        // Past is Turkish red, future is blue/teal
        const color = inPastSection 
          ? 'rgba(227, 10, 23, ' + (0.7 + Math.sin(time * 3 + i) * 0.3) + ')'  // Turkish red
          : 'rgba(0, ' + (157 + Math.sin(time * 2 + i) * 50) + ', ' + (220 + Math.sin(time * 3 + i) * 35) + ', ' + (0.7 + Math.sin(time * 3 + i) * 0.3) + ')'; // Future blue/teal
        
        // Draw gene particle
        ctx.beginPath();
        ctx.arc(x, y, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        // Connect some particles with lines to simulate DNA structure
        if (i > 0 && i % 5 === 0 && i < particleCount - 1) {
          const prevT = ((i - 1) / particleCount + time * 0.1) % 1;
          const prevPointIndex = Math.floor(prevT * (points.length - 1));
          const prevNextPointIndex = Math.min(prevPointIndex + 1, points.length - 1);
          const prevSubT = prevT * (points.length - 1) - prevPointIndex;
          
          const prevX = points[prevPointIndex].x + (points[prevNextPointIndex].x - points[prevPointIndex].x) * prevSubT;
          const prevY = points[prevPointIndex].y + (points[prevNextPointIndex].y - points[prevPointIndex].y) * prevSubT;
          
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(x, y);
          ctx.strokeStyle = color;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    };
    
    // Draw Turkish star and crescent symbol
    const drawTurkishSymbol = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, size: number) => {
      // Draw crescent
      const crescentGradient = ctx.createRadialGradient(
        centerX + size * 0.2, centerY, 0,
        centerX + size * 0.2, centerY, size
      );
      crescentGradient.addColorStop(0, '#E30A17'); // Turkish red
      crescentGradient.addColorStop(1, '#AA0000');
      
      ctx.fillStyle = crescentGradient;
      
      // Outer circle of crescent
      ctx.beginPath();
      ctx.arc(centerX, centerY, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner circle (creates crescent shape)
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(centerX + size * 0.4, centerY, size * 0.8, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw star
      const starX = centerX + size * 0.7;
      const starY = centerY - size * 0.2;
      const starSize = size * 0.35;
      
      ctx.fillStyle = '#E30A17'; // Turkish red
      drawStar(ctx, starX, starY, 5, starSize, starSize * 0.4);
    };
    
    // Helper function to draw a star
    const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
      let rot = Math.PI / 2 * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    };
    
    // Add glow effect
    const addGlowEffect = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
      // Outer glow
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, radius * 0.7,
        centerX, centerY, radius
      );
      glowGradient.addColorStop(0, 'rgba(227, 10, 23, 0.2)'); // Turkish red glow
      glowGradient.addColorStop(0.5, 'rgba(0, 157, 220, 0.1)'); // Future blue glow
      glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
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
          filter: 'drop-shadow(0 0 15px rgba(227, 10, 23, 0.5))' 
        }}
      />
    </motion.div>
  );
}