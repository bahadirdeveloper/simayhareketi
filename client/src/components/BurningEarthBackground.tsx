import { useEffect, useRef } from "react";

export default function BurningEarthBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Earth parameters
    const earthRadius = Math.min(canvas.width, canvas.height) * 0.25;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Particles for fire effect
    const particles: Particle[] = [];
    const numParticles = 200;
    
    interface Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: { x: number; y: number };
      life: number;
      maxLife: number;
    }
    
    const addParticle = () => {
      // Random angle around the earth
      const angle = Math.random() * Math.PI * 2;
      const distance = earthRadius * 1.05; // Slightly outside the earth
      
      // Calculate position on the earth's surface
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      // Random velocity going outward from center
      const speed = 0.2 + Math.random() * 0.8;
      const velocityX = Math.cos(angle) * speed;
      const velocityY = Math.sin(angle) * speed;
      
      // Random fire color
      const colors = [
        'rgba(255, 50, 0, 0.7)',
        'rgba(255, 120, 0, 0.7)',
        'rgba(255, 200, 0, 0.7)',
        'rgba(255, 160, 0, 0.7)'
      ];
      
      const maxLife = 50 + Math.random() * 100;
      
      particles.push({
        x,
        y,
        radius: 1 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: { x: velocityX, y: velocityY },
        life: 0,
        maxLife
      });
      
      // Remove oldest particles if too many
      if (particles.length > numParticles) {
        particles.shift();
      }
    };
    
    // Function to draw the earth with fire effect
    const drawEarth = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background (deep space)
      const bgGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, canvas.height
      );
      bgGradient.addColorStop(0, 'rgba(20, 20, 30, 1)');
      bgGradient.addColorStop(1, 'rgba(0, 0, 10, 1)');
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw earth
      const earthGradient = ctx.createRadialGradient(
        centerX - earthRadius * 0.3, centerY - earthRadius * 0.3, 0,
        centerX, centerY, earthRadius
      );
      earthGradient.addColorStop(0, '#148');
      earthGradient.addColorStop(0.5, '#125');
      earthGradient.addColorStop(1, '#002');
      
      ctx.fillStyle = earthGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw continents (simplified)
      ctx.fillStyle = '#063';
      
      // Turkey centered and highlighted
      ctx.beginPath();
      const turkeyAngle = -Math.PI / 6; // Position Turkey at top-right
      const turkeyX = centerX + Math.cos(turkeyAngle) * earthRadius * 0.7;
      const turkeyY = centerY + Math.sin(turkeyAngle) * earthRadius * 0.7;
      
      // Draw Turkey larger and highlighted
      ctx.fillStyle = '#0f0'; // Bright green for Turkey
      ctx.beginPath();
      ctx.arc(turkeyX, turkeyY, earthRadius * 0.12, 0, Math.PI * 2);
      ctx.fill();
      
      // Add other continents in darker green
      ctx.fillStyle = '#063';
      
      // North America
      ctx.beginPath();
      ctx.ellipse(
        centerX - earthRadius * 0.5, 
        centerY - earthRadius * 0.3, 
        earthRadius * 0.35, 
        earthRadius * 0.25, 
        0, 0, Math.PI * 2
      );
      ctx.fill();
      
      // South America
      ctx.beginPath();
      ctx.ellipse(
        centerX - earthRadius * 0.3, 
        centerY + earthRadius * 0.4, 
        earthRadius * 0.2, 
        earthRadius * 0.3, 
        0, 0, Math.PI * 2
      );
      ctx.fill();
      
      // Europe (excluding Turkey which is highlighted)
      ctx.beginPath();
      ctx.ellipse(
        centerX + earthRadius * 0.3, 
        centerY - earthRadius * 0.4, 
        earthRadius * 0.2, 
        earthRadius * 0.15, 
        0, 0, Math.PI * 2
      );
      ctx.fill();
      
      // Africa
      ctx.beginPath();
      ctx.ellipse(
        centerX + earthRadius * 0.2, 
        centerY + earthRadius * 0.2, 
        earthRadius * 0.3, 
        earthRadius * 0.35, 
        0, 0, Math.PI * 2
      );
      ctx.fill();
      
      // Asia (excluding Turkey)
      ctx.beginPath();
      ctx.ellipse(
        centerX + earthRadius * 0.5, 
        centerY - earthRadius * 0.1, 
        earthRadius * 0.3, 
        earthRadius * 0.3, 
        0, 0, Math.PI * 2
      );
      ctx.fill();
      
      // Australia
      ctx.beginPath();
      ctx.ellipse(
        centerX + earthRadius * 0.6, 
        centerY + earthRadius * 0.5, 
        earthRadius * 0.15, 
        earthRadius * 0.1, 
        0, 0, Math.PI * 2
      );
      ctx.fill();
      
      // Draw fire particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Update particle position
        p.x += p.velocity.x;
        p.y += p.velocity.y;
        p.life++;
        
        // Draw particle
        ctx.globalAlpha = 1 - (p.life / p.maxLife);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Remove dead particles
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }
      
      ctx.globalAlpha = 1;
      
      // Draw earth glow
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, earthRadius,
        centerX, centerY, earthRadius * 1.3
      );
      glowGradient.addColorStop(0, 'rgba(255, 100, 0, 0.5)');
      glowGradient.addColorStop(1, 'rgba(255, 50, 0, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius * 1.3, 0, Math.PI * 2);
      ctx.fill();
    };
    
    // Animation loop
    const animate = () => {
      drawEarth();
      
      // Add new particles
      for (let i = 0; i < 3; i++) {
        addParticle();
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0"
      style={{ 
        transform: 'translate3d(0, 0, 0)',
        filter: 'blur(1px)'
      }}
    />
  );
}