import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function HalfBurningEarthLogo() {
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
    
    // Animation variables
    let animationFrameId: number;
    let time = 0;
    
    // Function to draw the logo
    const drawLogo = (ctx: CanvasRenderingContext2D, size: number) => {
      const centerX = size / 2;
      const centerY = size / 2;
      
      // Clear canvas
      ctx.clearRect(0, 0, size, size);
      
      // Update time for animations
      time += 0.016;
      
      // Draw the logo elements
      drawBackground(ctx, centerX, centerY, size * 0.45);
      drawHalfBurningEarth(ctx, centerX, centerY, size * 0.43, time);
      drawTurkishGeneS(ctx, centerX, centerY, size * 0.4, time);
      
      // Request next frame
      animationFrameId = requestAnimationFrame(() => drawLogo(ctx, size));
    };

    // Draw background
    const drawBackground = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
      // Dark backdrop with gradient
      const bgGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius * 1.5
      );
      bgGradient.addColorStop(0, 'rgba(0, 20, 40, 0.7)');
      bgGradient.addColorStop(0.7, 'rgba(0, 10, 20, 0.8)');
      bgGradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
      
      ctx.fillStyle = bgGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.4, 0, Math.PI * 2);
      ctx.fill();
    };
    
    // Draw the half burning earth
    const drawHalfBurningEarth = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, time: number) => {
      // Earth gradient - blue like in the provided image
      const earthGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );
      earthGradient.addColorStop(0, '#4090c0');
      earthGradient.addColorStop(0.7, '#1a6394');
      earthGradient.addColorStop(1, '#003366');
      
      // Draw the earth
      ctx.fillStyle = earthGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Add some cloud/land details like in the provided image
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      
      // Draw random cloud patterns
      for (let i = 0; i < 5; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = radius * Math.random() * 0.7;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        const cloudSize = radius * (0.1 + Math.random() * 0.2);
        
        ctx.beginPath();
        ctx.ellipse(
          x, y, 
          cloudSize, cloudSize * 0.5, 
          Math.random() * Math.PI * 2, 
          0, Math.PI * 2
        );
        ctx.fill();
      }
      
      // Burning bottom half
      drawBurningHalf(ctx, centerX, centerY, radius, time);
    };
    
    // Draw the burning bottom half
    const drawBurningHalf = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, time: number) => {
      // Save context for clipping
      ctx.save();
      
      // Clip to bottom half of circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.clip();
      
      ctx.beginPath();
      ctx.rect(0, centerY, canvas.width, canvas.height);
      ctx.clip();
      
      // Draw fire gradient overlay
      const fireGradient = ctx.createLinearGradient(
        centerX, centerY,
        centerX, centerY + radius
      );
      fireGradient.addColorStop(0, 'rgba(255, 48, 0, 0.4)');
      fireGradient.addColorStop(0.5, 'rgba(255, 106, 0, 0.5)');
      fireGradient.addColorStop(1, 'rgba(255, 200, 0, 0.6)');
      
      ctx.fillStyle = fireGradient;
      ctx.fillRect(centerX - radius, centerY, radius * 2, radius);
      
      // Draw flickering flames
      for (let i = 0; i < 12; i++) {
        const flameWidth = radius * 0.15;
        const flameHeight = radius * (0.2 + Math.sin(time * 5 + i) * 0.05);
        const x = centerX - radius + (radius * 2) * i / 12;
        
        // Flame shape
        ctx.fillStyle = 'rgba(255, 106, 0, 0.7)';
        ctx.beginPath();
        ctx.moveTo(x, centerY);
        ctx.quadraticCurveTo(
          x - flameWidth/2, centerY - flameHeight/2,
          x, centerY - flameHeight
        );
        ctx.quadraticCurveTo(
          x + flameWidth/2, centerY - flameHeight/2,
          x, centerY
        );
        ctx.fill();
        
        // Inner flame
        ctx.fillStyle = 'rgba(255, 230, 110, 0.8)';
        ctx.beginPath();
        ctx.moveTo(x, centerY);
        ctx.quadraticCurveTo(
          x - flameWidth/4, centerY - flameHeight/2.2,
          x, centerY - flameHeight * 0.7
        );
        ctx.quadraticCurveTo(
          x + flameWidth/4, centerY - flameHeight/2.2,
          x, centerY
        );
        ctx.fill();
      }
      
      // Restore context
      ctx.restore();
    };
    
    // Draw the Turkish gene flowing S shape
    const drawTurkishGeneS = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, time: number) => {
      // S shape parameters
      const sWidth = radius * 0.8;
      const sHeight = radius * 1.3;
      const sThickness = radius * 0.22;
      
      // Create S shape path
      ctx.beginPath();
      
      // Get points for flowing S curve
      const sCurveTop = getFlowingSCurvePoints(centerX, centerY, radius, time, 0, 0.5);
      const sCurveBottom = getFlowingSCurvePoints(centerX, centerY, radius, time, 0.5, 1);
      
      // Draw the top part of S
      ctx.lineWidth = sThickness;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Top part gradient - blue to transition color
      const topGradient = ctx.createLinearGradient(
        sCurveTop[0].x, sCurveTop[0].y,
        sCurveTop[sCurveTop.length-1].x, sCurveTop[sCurveTop.length-1].y
      );
      topGradient.addColorStop(0, '#4090c0'); // Blue like the top half earth
      topGradient.addColorStop(0.8, '#5eaad7');
      topGradient.addColorStop(1, '#7fc9ee');
      
      ctx.strokeStyle = topGradient;
      
      // Draw top curve
      ctx.beginPath();
      ctx.moveTo(sCurveTop[0].x, sCurveTop[0].y);
      
      for (let i = 1; i < sCurveTop.length; i++) {
        const prev = sCurveTop[i - 1];
        const curr = sCurveTop[i];
        
        const xc = (prev.x + curr.x) / 2;
        const yc = (prev.y + curr.y) / 2;
        
        ctx.quadraticCurveTo(prev.x, prev.y, xc, yc);
      }
      
      ctx.stroke();
      
      // Bottom part gradient - transition to fire colors
      const bottomGradient = ctx.createLinearGradient(
        sCurveBottom[0].x, sCurveBottom[0].y,
        sCurveBottom[sCurveBottom.length-1].x, sCurveBottom[sCurveBottom.length-1].y
      );
      bottomGradient.addColorStop(0, '#7fc9ee'); // Match the end of the top gradient
      bottomGradient.addColorStop(0.2, '#e04c16'); // Transition to fire
      bottomGradient.addColorStop(0.6, '#ff6a00');
      bottomGradient.addColorStop(1, '#ffcc00');
      
      ctx.strokeStyle = bottomGradient;
      
      // Draw bottom curve
      ctx.beginPath();
      ctx.moveTo(sCurveBottom[0].x, sCurveBottom[0].y);
      
      for (let i = 1; i < sCurveBottom.length; i++) {
        const prev = sCurveBottom[i - 1];
        const curr = sCurveBottom[i];
        
        const xc = (prev.x + curr.x) / 2;
        const yc = (prev.y + curr.y) / 2;
        
        ctx.quadraticCurveTo(prev.x, prev.y, xc, yc);
      }
      
      ctx.stroke();
      
      // Draw flowing gene particles along the S
      drawGeneParticles(ctx, [...sCurveTop, ...sCurveBottom], time);
    };
    
    // Get flowing S curve points
    const getFlowingSCurvePoints = (
      centerX: number, 
      centerY: number, 
      radius: number, 
      time: number,
      startT: number = 0,
      endT: number = 1
    ) => {
      const points = [];
      const segments = 15;
      
      // Parameters for the S-curve
      const width = radius * 0.65;
      const height = radius * 1.1;
      const offsetY = -radius * 0.1; // Slight vertical offset to center
      
      const segmentsToUse = Math.floor(segments * (endT - startT));
      const offset = Math.floor(segments * startT);
      
      // Create flowing S curve with animation
      for (let i = 0; i <= segmentsToUse; i++) {
        const t = startT + (i / segments);
        const phase = Math.PI * 2 * t;
        
        // Add some animation movement
        const wiggle = Math.sin(phase * 3 + time * 2) * radius * 0.03;
        
        // Parametric formula for S shape
        const x = centerX + width * Math.sin(phase) * 0.6 + wiggle;
        const y = centerY + offsetY - height * 0.5 + height * t;
        
        points.push({ x, y });
      }
      
      return points;
    };
    
    // Draw gene particles flowing along the S
    const drawGeneParticles = (ctx: CanvasRenderingContext2D, points: {x: number, y: number}[], time: number) => {
      const particleCount = 40;
      
      // Draw each particle
      for (let i = 0; i < particleCount; i++) {
        // Position along the curve based on time
        const t = (i / particleCount + time * 0.15) % 1;
        const index = Math.min(Math.floor(t * points.length), points.length - 1);
        
        // Get position
        const x = points[index].x;
        const y = points[index].y;
        
        // Determine if in top or bottom half
        const inTopHalf = index < points.length / 2;
        
        // Particle size and color
        const size = 2 + Math.sin(time * 3 + i) * 1;
        
        // Color based on position - blue in top half, fire in bottom half
        const color = inTopHalf
          ? `rgba(100, 180, 255, ${0.7 + Math.sin(time * 3 + i) * 0.3})`
          : `rgba(255, ${100 + Math.sin(time * 2 + i) * 50}, ${50 + Math.sin(time * 3 + i) * 50}, ${0.7 + Math.sin(time * 3 + i) * 0.3})`;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        // Connect some particles to represent DNA/gene structure
        if (i > 0 && i % 4 === 0 && index > 0 && index < points.length - 1) {
          const prevIndex = Math.max(index - 2, 0);
          const prevX = points[prevIndex].x;
          const prevY = points[prevIndex].y;
          
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(x, y);
          ctx.strokeStyle = color;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      
      // Add Turkish star symbol at the center of S curve
      const midIndex = Math.floor(points.length / 2);
      const midX = points[midIndex].x;
      const midY = points[midIndex].y;
      
      // Draw small Turkish star
      const starSize = 6;
      drawStar(ctx, midX, midY, 5, starSize, starSize * 0.4);
      
      // Draw crescent behind the star
      ctx.beginPath();
      ctx.arc(midX - starSize * 0.2, midY, starSize * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = '#e30a17'; // Turkish flag red
      ctx.fill();
      
      // Cut out part to create crescent
      ctx.beginPath();
      ctx.arc(midX + starSize * 0.6, midY, starSize * 1, 0, Math.PI * 2);
      ctx.fillStyle = midIndex < points.length / 2 ? '#1a6394' : '#ff6a00';
      ctx.fill();
      
      // Draw star on top
      ctx.fillStyle = '#e30a17'; // Turkish flag red
      drawStar(ctx, midX + starSize * 0.7, midY, 5, starSize * 0.7, starSize * 0.3);
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
    
    // Initial setup
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
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
          filter: 'drop-shadow(0 0 15px rgba(60, 120, 200, 0.5))' 
        }}
      />
    </motion.div>
  );
}