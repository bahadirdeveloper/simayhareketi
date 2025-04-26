import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function SimpleFuturisticTurkish() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Safe reference to canvas within closure
    const canvasRef2 = canvas;
    const safeCtx = ctx;
    
    // Set canvas to fullscreen
    const handleResize = () => {
      canvasRef2.width = window.innerWidth;
      canvasRef2.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Turkish flag colors
    const red = '#E30A17';  // Turkish flag red
    const white = '#FFFFFF';
    
    // Digital particles
    const particles: Particle[] = [];
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 20)); // Responsive particle count
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      blinkRate: number;
      blinkState: number;
      type: string;
      
      constructor() {
        // @ts-ignore - Canvas is guaranteed to be defined here
        this.x = Math.random() * canvas.width;
        // @ts-ignore
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;
        this.color = Math.random() > 0.5 ? red : white;
        this.blinkRate = Math.random() * 0.1;
        this.blinkState = 1;
        this.type = Math.random() > 0.8 ? 'symbol' : 'dot';
      }
      
      update() {
        // Boundary check and position update
        if (this.x > canvasRef2.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvasRef2.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
        
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Blinking effect
        this.blinkState += this.blinkRate;
        if (this.blinkState > 1 || this.blinkState < 0) {
          this.blinkRate = -this.blinkRate;
        }
      }
      
      draw() {
        if (!ctx) return;
        
        ctx.globalAlpha = this.blinkState * 0.7;
        
        if (this.type === 'symbol') {
          ctx.font = `${this.size * 5}px monospace`;
          ctx.fillStyle = this.color;
          
          // Digital Turkish symbols (T, R or binary)
          const symbols = ['T', 'R', '0', '1', '*'];
          const symbol = symbols[Math.floor(Math.random() * symbols.length)];
          ctx.fillText(symbol, this.x, this.y);
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
        
        ctx.globalAlpha = 1;
      }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Create connections between particles
    function drawConnections() {
      if (!ctx) return;
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.globalAlpha = (1 - distance / 150) * 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    }
    
    // Draw star and crescent (stylized for futuristic look)
    function drawStarAndCrescent() {
      if (!ctx) return;
      
      // Holographic Star
      const centerX = canvas.width * 0.5;
      const centerY = canvas.height * 0.3;
      const starSize = Math.min(canvas.width, canvas.height) * 0.12;
      
      // Star glow
      const gradient = ctx.createRadialGradient(
        centerX, centerY, starSize * 0.2,
        centerX, centerY, starSize * 1.2
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(centerX, centerY, starSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Star points
      const time = Date.now() * 0.001;
      const pointCount = 5;
      
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      
      for (let i = 0; i < pointCount * 2; i++) {
        const radius = i % 2 === 0 ? starSize : starSize * 0.4;
        const angle = (i * Math.PI / pointCount) + time * 0.1;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.closePath();
      ctx.fill();
      
      // Digital circuit pattern around star
      ctx.strokeStyle = 'rgba(227, 10, 23, 0.7)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI / 4) + time * 0.2;
        const startX = centerX + starSize * 1.3 * Math.cos(angle);
        const startY = centerY + starSize * 1.3 * Math.sin(angle);
        const endX = centerX + starSize * 1.8 * Math.cos(angle);
        const endY = centerY + starSize * 1.8 * Math.sin(angle);
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Circuit node
        ctx.beginPath();
        ctx.arc(endX, endY, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(227, 10, 23, 0.9)';
        ctx.fill();
      }
    }
    
    // Draw Atatürk's digital signature
    function drawAtaturkSignature() {
      if (!ctx) return;
      
      const time = Date.now() * 0.001;
      const signatureX = canvas.width * 0.8;
      const signatureY = canvas.height * 0.85;
      const signatureSize = Math.min(canvas.width, canvas.height) * 0.15;
      
      // Signature glow effect
      ctx.shadowColor = 'rgba(227, 10, 23, 0.8)';
      ctx.shadowBlur = 10 + Math.sin(time) * 5;
      
      ctx.font = `bold ${signatureSize}px 'Arial'`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillText('K.Atatürk', signatureX - signatureSize * 0.8, signatureY);
      
      // Digital scan line effect
      ctx.fillStyle = 'rgba(227, 10, 23, 0.3)';
      const scanLineY = (signatureY - signatureSize * 0.7) + Math.sin(time * 2) * signatureSize;
      
      ctx.fillRect(
        signatureX - signatureSize * 0.8, 
        scanLineY, 
        signatureSize * 1.5, 
        3
      );
      
      ctx.shadowBlur = 0;
    }
    
    // Draw Turkish technology and scientific elements
    function drawTurkishTechElements() {
      if (!ctx) return;
      
      // TURKSAT satellite symbol
      const satX = canvas.width * 0.2;
      const satY = canvas.height * 0.7;
      const satSize = Math.min(canvas.width, canvas.height) * 0.06;
      
      ctx.fillStyle = 'rgba(227, 10, 23, 0.8)';
      ctx.beginPath();
      ctx.arc(satX, satY, satSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Satellite dish
      ctx.beginPath();
      ctx.arc(satX, satY, satSize * 1.5, -Math.PI * 0.7, -Math.PI * 0.1, false);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Signal waves
      const time = Date.now() * 0.001;
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(
          satX, 
          satY, 
          satSize * (2 + i * 0.8 + Math.sin(time * i) * 0.3), 
          -Math.PI * 0.6, 
          -Math.PI * 0.2, 
          false
        );
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 - i * 0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // TUBITAK-like quantum computing symbol
      const quanX = canvas.width * 0.82;
      const quanY = canvas.height * 0.25;
      const quanSize = Math.min(canvas.width, canvas.height) * 0.05;
      
      // Quantum particle orbits
      for (let i = 0; i < 3; i++) {
        const angle = time * (i + 1) * 0.5;
        ctx.beginPath();
        ctx.ellipse(
          quanX, 
          quanY, 
          quanSize * (1 + i * 0.4), 
          quanSize * (0.6 + i * 0.3), 
          angle, 
          0, 
          Math.PI * 2
        );
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.7 - i * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // Core
      ctx.beginPath();
      ctx.arc(quanX, quanY, quanSize * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(227, 10, 23, 0.9)';
      ctx.fill();
      
      // Quantum particles
      for (let i = 0; i < 3; i++) {
        const angle = time * (i + 1) * 0.5;
        const orbX = quanX + Math.cos(angle) * quanSize * (1 + i * 0.4);
        const orbY = quanY + Math.sin(angle) * quanSize * (0.6 + i * 0.3);
        
        ctx.beginPath();
        ctx.arc(orbX, orbY, quanSize * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 255, 255, 0.9)' : 'rgba(227, 10, 23, 0.9)';
        ctx.fill();
      }
    }
    
    // Draw Turkish engineering symbols
    function drawEngineeringSymbols() {
      if (!ctx) return;
      
      const time = Date.now() * 0.001;
      const engX = canvas.width * 0.3;
      const engY = canvas.height * 0.2;
      const size = Math.min(canvas.width, canvas.height) * 0.07;
      
      // Draw gear
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(engX, engY, size, 0, Math.PI * 2);
      ctx.stroke();
      
      // Gear teeth
      const teethCount = 10;
      for (let i = 0; i < teethCount; i++) {
        const angle = (i * Math.PI * 2 / teethCount) + time * 0.2;
        const innerX = engX + Math.cos(angle) * size;
        const innerY = engY + Math.sin(angle) * size;
        const outerX = engX + Math.cos(angle) * (size * 1.3);
        const outerY = engY + Math.sin(angle) * (size * 1.3);
        
        ctx.beginPath();
        ctx.moveTo(innerX, innerY);
        ctx.lineTo(outerX, outerY);
        ctx.stroke();
      }
      
      // Inner fill with Turkish icon
      ctx.fillStyle = 'rgba(227, 10, 23, 0.7)';
      ctx.beginPath();
      ctx.arc(engX, engY, size * 0.7, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = `bold ${size * 0.8}px 'Arial'`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('TR', engX, engY);
    }
    
    // Animation loop
    function animate() {
      if (!ctx || !canvas) return;
      
      // Clear canvas with a very dark blue background for tech feel
      ctx.fillStyle = 'rgba(5, 10, 30, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Digital grid pattern
      const gridSize = 50;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 0.5;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Draw connections between particles
      drawConnections();
      
      // Draw Turkish national symbols with futuristic style
      drawStarAndCrescent();
      drawAtaturkSignature();
      drawTurkishTechElements();
      drawEngineeringSymbols();
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Red pulsing light at the bottom for Turkish-themed tech feel */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-red-600/50"
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scaleY: [1, 1.5, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Overlay gradient for depth */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-transparent to-black/70 opacity-70"
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)'
        }}
      />
    </div>
  );
}