import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function SimpleBurningEarth() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Setup particles
    const particles: Particle[] = [];
    const dataParticles: DataParticle[] = [];
    const turkishPatternSymbols: PatternSymbol[] = [];
    
    // Create particles
    const createParticles = () => {
      // Regular particles
      const particleCount = Math.floor(window.innerWidth * window.innerHeight / 10000);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          color: `rgba(255, ${150 + Math.floor(Math.random() * 105)}, ${Math.floor(Math.random() * 100)}, ${0.2 + Math.random() * 0.6})`,
          velocity: {
            x: (Math.random() - 0.5) * 0.2,
            y: (Math.random() - 0.5) * 0.2,
          },
          life: Math.random() * 100 + 100,
          maxLife: 200,
        });
      }
      
      // Data particles (represent digital/tech elements)
      const dataCount = Math.floor(particleCount / 3);
      for (let i = 0; i < dataCount; i++) {
        dataParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          color: `rgba(${Math.random() > 0.7 ? '255, 215, 0' : '0, 200, 255'}, ${0.3 + Math.random() * 0.4})`,
          value: Math.random() > 0.8 ? '1' : '0',
          velocity: {
            x: (Math.random() - 0.5) * 0.8,
            y: (Math.random() - 0.5) * 0.8 + 0.5, // Slight downward bias
          },
          life: Math.random() * 300 + 200,
          maxLife: 500,
        });
      }
      
      // Turkish pattern symbols (represents cultural elements)
      const patternCount = 20;
      for (let i = 0; i < patternCount; i++) {
        turkishPatternSymbols.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 15 + 10,
          rotation: Math.random() * Math.PI * 2,
          color: `rgba(255, 215, 0, ${0.1 + Math.random() * 0.2})`,
          symbol: Math.random() > 0.5 ? 'star' : 'crescent',
          velocity: {
            x: (Math.random() - 0.5) * 0.1,
            y: (Math.random() - 0.5) * 0.1,
          },
          rotationSpeed: (Math.random() - 0.5) * 0.01,
        });
      }
    };
    
    // Draw background
    const drawBackground = () => {
      // Create gradient background - dark blue to black, representing technological advancement
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(0, 10, 30, 1)');
      gradient.addColorStop(0.6, 'rgba(0, 0, 10, 1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle grid pattern - represents digital framework
      ctx.strokeStyle = 'rgba(255, 204, 0, 0.05)';
      ctx.lineWidth = 0.3;
      
      const gridSize = 50;
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
    };
    
    // Draw central scene inspired by the image
    const drawCenterScene = (time: number) => {
      if (!ctx) return;
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.25;
      
      // Global glow and ambient light
      const ambientGradient = ctx.createRadialGradient(centerX, centerY, baseRadius * 0.5, centerX, centerY, baseRadius * 3);
      ambientGradient.addColorStop(0, 'rgba(255, 180, 0, 0.3)');
      ambientGradient.addColorStop(0.6, 'rgba(255, 120, 0, 0.1)');
      ambientGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = ambientGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 3, 0, Math.PI * 2);
      ctx.fill();
      
      // World map in background (semi-transparent)
      drawWorldMap(centerX, centerY, baseRadius * 1.8, time);
      
      // Draw open book
      drawBook(centerX, centerY + baseRadius * 0.2, baseRadius * 0.8, time);
      
      // Draw Turkish flag above the book
      drawTurkishFlag(centerX, centerY - baseRadius * 0.4, baseRadius * 0.5, time);
      
      // Flying birds
      drawBirds(time);
      
      // Particle emissions from book
      drawBookParticles(centerX, centerY, baseRadius * 0.6, time);
      
      // Light rays from center
      drawLightRays(centerX, centerY, baseRadius * 1.5, time);
    };
    
    // Draw world map in background
    const drawWorldMap = (centerX: number, centerY: number, radius: number, time: number) => {
      if (!ctx) return;
      
      ctx.save();
      ctx.globalAlpha = 0.15 + Math.sin(time * 0.001) * 0.05;
      
      // Simplified world map regions - just stylized continents
      ctx.fillStyle = 'rgba(255, 210, 0, 0.3)';
      
      // North America
      ctx.beginPath();
      ctx.moveTo(centerX - radius * 0.6, centerY - radius * 0.3);
      ctx.quadraticCurveTo(
        centerX - radius * 0.4, centerY - radius * 0.5,
        centerX - radius * 0.3, centerY - radius * 0.1
      );
      ctx.quadraticCurveTo(
        centerX - radius * 0.5, centerY + radius * 0.2,
        centerX - radius * 0.7, centerY - radius * 0.1
      );
      ctx.closePath();
      ctx.fill();
      
      // South America
      ctx.beginPath();
      ctx.moveTo(centerX - radius * 0.3, centerY + radius * 0.1);
      ctx.quadraticCurveTo(
        centerX - radius * 0.25, centerY + radius * 0.3,
        centerX - radius * 0.4, centerY + radius * 0.5
      );
      ctx.quadraticCurveTo(
        centerX - radius * 0.35, centerY + radius * 0.2,
        centerX - radius * 0.3, centerY + radius * 0.1
      );
      ctx.closePath();
      ctx.fill();
      
      // Europe & Africa
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - radius * 0.4);
      ctx.quadraticCurveTo(
        centerX + radius * 0.1, centerY - radius * 0.2,
        centerX, centerY + radius * 0.1
      );
      ctx.quadraticCurveTo(
        centerX - radius * 0.1, centerY + radius * 0.5,
        centerX, centerY + radius * 0.6
      );
      ctx.quadraticCurveTo(
        centerX + radius * 0.2, centerY + radius * 0.2,
        centerX + radius * 0.1, centerY - radius * 0.1
      );
      ctx.closePath();
      ctx.fill();
      
      // Turkey & Middle East (emphasized)
      ctx.fillStyle = 'rgba(255, 215, 0, 0.5)';
      ctx.beginPath();
      ctx.ellipse(centerX + radius * 0.15, centerY - radius * 0.05, radius * 0.12, radius * 0.08, Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
      
      // Asia
      ctx.fillStyle = 'rgba(255, 210, 0, 0.3)';
      ctx.beginPath();
      ctx.moveTo(centerX + radius * 0.3, centerY - radius * 0.3);
      ctx.quadraticCurveTo(
        centerX + radius * 0.5, centerY - radius * 0.4,
        centerX + radius * 0.6, centerY - radius * 0.1
      );
      ctx.quadraticCurveTo(
        centerX + radius * 0.4, centerY + radius * 0.2,
        centerX + radius * 0.2, centerY + radius * 0.1
      );
      ctx.closePath();
      ctx.fill();
      
      // Australia
      ctx.beginPath();
      ctx.ellipse(centerX + radius * 0.5, centerY + radius * 0.4, radius * 0.15, radius * 0.1, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };
    
    // Draw open book with knowledge/light
    const drawBook = (centerX: number, centerY: number, size: number, time: number) => {
      if (!ctx) return;
      
      ctx.save();
      
      // Book base
      const bookWidth = size * 1.5;
      const bookHeight = size * 0.8;
      const pageGap = size * 0.05;
      
      // Book shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY + bookHeight * 0.6, bookWidth * 0.6, bookHeight * 0.2, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Book spine
      ctx.fillStyle = 'rgba(120, 80, 40, 1)';
      ctx.beginPath();
      ctx.moveTo(centerX - pageGap/2, centerY - bookHeight * 0.3);
      ctx.lineTo(centerX + pageGap/2, centerY - bookHeight * 0.3);
      ctx.lineTo(centerX + pageGap/2, centerY + bookHeight * 0.5);
      ctx.lineTo(centerX - pageGap/2, centerY + bookHeight * 0.5);
      ctx.closePath();
      ctx.fill();
      
      // Left page
      ctx.fillStyle = 'rgba(255, 248, 220, 1)';
      ctx.beginPath();
      ctx.moveTo(centerX - pageGap/2, centerY - bookHeight * 0.3);
      ctx.lineTo(centerX - bookWidth/2, centerY - bookHeight * 0.1);
      ctx.lineTo(centerX - bookWidth/2, centerY + bookHeight * 0.3);
      ctx.lineTo(centerX - pageGap/2, centerY + bookHeight * 0.5);
      ctx.closePath();
      ctx.fill();
      
      // Right page
      ctx.fillStyle = 'rgba(255, 248, 220, 1)';
      ctx.beginPath();
      ctx.moveTo(centerX + pageGap/2, centerY - bookHeight * 0.3);
      ctx.lineTo(centerX + bookWidth/2, centerY - bookHeight * 0.1);
      ctx.lineTo(centerX + bookWidth/2, centerY + bookHeight * 0.3);
      ctx.lineTo(centerX + pageGap/2, centerY + bookHeight * 0.5);
      ctx.closePath();
      ctx.fill();
      
      // Light emanating from book center
      const lightGradient = ctx.createRadialGradient(
        centerX, centerY, size * 0.1,
        centerX, centerY, size * 0.8
      );
      lightGradient.addColorStop(0, 'rgba(255, 215, 0, 0.9)');
      lightGradient.addColorStop(0.2, 'rgba(255, 150, 50, 0.6)');
      lightGradient.addColorStop(1, 'rgba(255, 120, 0, 0)');
      
      ctx.fillStyle = lightGradient;
      ctx.globalCompositeOperation = 'lighter';
      ctx.beginPath();
      ctx.arc(centerX, centerY, size * 0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
      
      // Subtle text lines on pages (simulating text)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      
      // Left page lines
      const lineSpacing = bookHeight * 0.08;
      const lineWidth = bookWidth * 0.3;
      const leftPageX = centerX - bookWidth * 0.3;
      const startY = centerY - bookHeight * 0.05;
      
      for (let i = 0; i < 6; i++) {
        const lineY = startY + i * lineSpacing;
        const lineLength = lineWidth * (i < 5 ? 0.9 : 0.6);
        
        ctx.fillRect(leftPageX, lineY, lineLength, 1);
      }
      
      // Right page lines
      const rightPageX = centerX + pageGap;
      
      for (let i = 0; i < 6; i++) {
        const lineY = startY + i * lineSpacing;
        const lineLength = lineWidth * (i < 5 ? 0.9 : 0.6);
        
        ctx.fillRect(rightPageX, lineY, lineLength, 1);
      }
      
      // Add page-turning animation effect
      const pageCornerSize = bookHeight * 0.15;
      const pageCornerAngle = (Math.sin(time * 0.003) + 1) * 0.2;
      
      // Page corner fold
      ctx.fillStyle = 'rgba(240, 230, 210, 1)';
      ctx.beginPath();
      ctx.moveTo(centerX + bookWidth/2, centerY - bookHeight * 0.1 + pageCornerSize);
      ctx.lineTo(centerX + bookWidth/2 - pageCornerSize, centerY - bookHeight * 0.1);
      ctx.lineTo(centerX + bookWidth/2, centerY - bookHeight * 0.1);
      ctx.closePath();
      ctx.fill();
      
      // Page corner shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.beginPath();
      ctx.moveTo(centerX + bookWidth/2, centerY - bookHeight * 0.1 + pageCornerSize);
      ctx.lineTo(centerX + bookWidth/2 - pageCornerSize, centerY - bookHeight * 0.1);
      ctx.lineTo(centerX + bookWidth/2 - pageCornerSize * 0.8, centerY - bookHeight * 0.1 + pageCornerSize * 0.3);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    };
    
    // Draw Turkish flag
    const drawTurkishFlag = (centerX: number, centerY: number, size: number, time: number) => {
      if (!ctx) return;
      
      ctx.save();
      
      // Flagpole
      ctx.fillStyle = 'rgba(100, 80, 60, 1)';
      ctx.fillRect(centerX - size * 1.2, centerY - size * 0.9, size * 0.05, size * 1.8);
      
      // Flag wave animation
      const flagWidth = size * 1.5;
      const flagHeight = size;
      const waveAmplitude = size * 0.05;
      const waveFrequency = 15;
      const flagWave = [];
      
      for (let x = 0; x <= flagWidth; x += 1) {
        const normalizedX = x / flagWidth;
        const waveY = Math.sin(normalizedX * waveFrequency + time * 0.006) * waveAmplitude * normalizedX;
        flagWave.push(waveY);
      }
      
      // Red background
      ctx.fillStyle = '#E30A17'; // Turkish flag red
      
      // Draw flag with wave effect
      ctx.beginPath();
      ctx.moveTo(centerX - size * 1.15, centerY - size * 0.5);
      
      for (let x = 0; x < flagWidth; x += 1) {
        const pointX = centerX - size * 1.15 + x;
        const pointY = centerY - size * 0.5 + flagWave[x];
        ctx.lineTo(pointX, pointY);
      }
      
      for (let x = flagWidth - 1; x >= 0; x -= 1) {
        const pointX = centerX - size * 1.15 + x;
        const pointY = centerY + size * 0.5 + flagWave[x];
        ctx.lineTo(pointX, pointY);
      }
      
      ctx.closePath();
      ctx.fill();
      
      // Crescent and star glow (golden glow animation)
      const glowIntensity = 0.4 + Math.sin(time * 0.003) * 0.2;
      const glowRadius = size * 0.6;
      const glowGradient = ctx.createRadialGradient(
        centerX - size * 0.45, centerY, 0,
        centerX - size * 0.45, centerY, glowRadius
      );
      glowGradient.addColorStop(0, `rgba(255, 215, 0, ${glowIntensity})`);
      glowGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX - size * 0.45, centerY, glowRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // White crescent
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(centerX - size * 0.45, centerY, size * 0.3, 0, Math.PI * 2);
      ctx.fill();
      
      // Red circle creating crescent
      ctx.fillStyle = '#E30A17';
      ctx.beginPath();
      ctx.arc(centerX - size * 0.3, centerY, size * 0.24, 0, Math.PI * 2);
      ctx.fill();
      
      // White star
      drawStar(centerX - size * 0.05, centerY, 5, size * 0.13, size * 0.05);
      
      // Helper function to draw star
      function drawStar(cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) {
        ctx.fillStyle = '#FFFFFF';
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
      }
      
      ctx.restore();
    };
    
    // Draw flying birds
    const drawBirds = (time: number) => {
      if (!ctx) return;
      
      ctx.save();
      
      // Create a few flying birds at different positions
      const birdCount = 5;
      
      for (let i = 0; i < birdCount; i++) {
        const birdX = canvas.width * (0.3 + 0.5 * i / birdCount); 
        const birdY = canvas.height * (0.2 + 0.1 * Math.sin(i));
        const birdSize = canvas.height * 0.02;
        const wingPosition = Math.sin(time * 0.01 + i) * 0.5 + 0.5; // Wing flapping animation
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        
        // Draw bird silhouette
        ctx.beginPath();
        
        // Left wing
        ctx.moveTo(birdX, birdY);
        ctx.lineTo(birdX - birdSize, birdY - birdSize * wingPosition);
        ctx.lineTo(birdX - birdSize * 0.5, birdY);
        
        // Right wing
        ctx.moveTo(birdX, birdY);
        ctx.lineTo(birdX + birdSize, birdY - birdSize * wingPosition);
        ctx.lineTo(birdX + birdSize * 0.5, birdY);
        
        // Tail
        ctx.moveTo(birdX, birdY);
        ctx.lineTo(birdX, birdY + birdSize * 0.5);
        
        ctx.stroke();
      }
      
      ctx.restore();
    };
    
    // Draw particles emanating from book
    const drawBookParticles = (centerX: number, centerY: number, size: number, time: number) => {
      if (!ctx) return;
      
      ctx.save();
      
      const particleCount = 40;
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        const dist = (0.5 + Math.sin(time * 0.005 + i) * 0.3) * size;
        
        const x = centerX + Math.cos(angle) * dist;
        const y = centerY + Math.sin(angle) * dist;
        
        const brightnessOscillation = 0.5 + 0.5 * Math.sin(time * 0.01 + i * 0.2);
        
        ctx.fillStyle = `rgba(255, ${180 + brightnessOscillation * 75}, ${50 + brightnessOscillation * 50}, ${0.3 + brightnessOscillation * 0.7})`;
        
        const particleSize = size * 0.02 * (0.5 + 0.5 * brightnessOscillation);
        ctx.beginPath();
        ctx.arc(x, y, particleSize, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    };
    
    // Draw light rays from center
    const drawLightRays = (centerX: number, centerY: number, radius: number, time: number) => {
      if (!ctx) return;
      
      ctx.save();
      
      const rayCount = 12;
      const rotation = time * 0.0005;
      
      // Create rays
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.15)';
      ctx.lineWidth = 10;
      
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2 + rotation;
        const rayLength = radius * (0.7 + 0.3 * Math.sin(time * 0.002 + i));
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * rayLength,
          centerY + Math.sin(angle) * rayLength
        );
        ctx.stroke();
      }
      
      ctx.restore();
    };
    
    // Draw particles
    const drawParticles = () => {
      if (!ctx) return;
      
      // Regular particles
      particles.forEach(particle => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Data particles
      dataParticles.forEach(particle => {
        ctx.fillStyle = particle.color;
        ctx.font = `${particle.size * 2}px monospace`;
        ctx.fillText(particle.value, particle.x, particle.y);
      });
      
      // Turkish pattern symbols
      turkishPatternSymbols.forEach(symbol => {
        ctx.save();
        ctx.translate(symbol.x, symbol.y);
        ctx.rotate(symbol.rotation);
        ctx.fillStyle = symbol.color;
        
        if (symbol.symbol === 'star') {
          drawStar(0, 0, 5, symbol.size, symbol.size * 0.4);
        } else {
          // Crescent
          ctx.beginPath();
          ctx.arc(0, 0, symbol.size, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.globalCompositeOperation = 'destination-out';
          ctx.beginPath();
          ctx.arc(symbol.size * 0.3, 0, symbol.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalCompositeOperation = 'source-over';
        }
        
        ctx.restore();
      });
      
      // Helper function to draw star
      function drawStar(cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) {
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
      }
    };
    
    // Update particles
    const updateParticles = () => {
      // Regular particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        p.x += p.velocity.x;
        p.y += p.velocity.y;
        p.life--;
        
        // Respawn if out of bounds or life depleted
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height || p.life <= 0) {
          // 50% chance to spawn from bottom for upward movement (like fire)
          if (Math.random() > 0.5) {
            p.x = Math.random() * canvas.width;
            p.y = canvas.height + 10;
            p.velocity.y = -Math.random() * 0.5 - 0.3;
            p.velocity.x = (Math.random() - 0.5) * 0.2;
          } else {
            p.x = Math.random() * canvas.width;
            p.y = Math.random() * canvas.height;
            p.velocity.x = (Math.random() - 0.5) * 0.2;
            p.velocity.y = (Math.random() - 0.5) * 0.2;
          }
          
          p.life = p.maxLife;
        }
      }
      
      // Data particles
      for (let i = 0; i < dataParticles.length; i++) {
        const p = dataParticles[i];
        
        p.x += p.velocity.x;
        p.y += p.velocity.y;
        p.life--;
        
        // Occasionally change the value (0/1)
        if (Math.random() > 0.97) {
          p.value = Math.random() > 0.5 ? '1' : '0';
        }
        
        // Respawn if out of bounds or life depleted
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height || p.life <= 0) {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * 10;
          p.velocity.y = Math.random() * 1.2 + 0.2;
          p.velocity.x = (Math.random() - 0.5) * 0.8;
          p.life = p.maxLife;
        }
      }
      
      // Turkish pattern symbols
      for (let i = 0; i < turkishPatternSymbols.length; i++) {
        const s = turkishPatternSymbols[i];
        
        s.x += s.velocity.x;
        s.y += s.velocity.y;
        s.rotation += s.rotationSpeed;
        
        // Bounce off edges
        if (s.x < 0 || s.x > canvas.width) {
          s.velocity.x *= -1;
        }
        
        if (s.y < 0 || s.y > canvas.height) {
          s.velocity.y *= -1;
        }
      }
    };
    
    // Animation
    let animationFrameId: number;
    let time = 0;
    
    const animate = () => {
      time++;
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Save context for clipping
      ctx.save();
      
      drawBackground();
      drawCenterScene(time);
      drawParticles();
      updateParticles();
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    createParticles();
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
      {/* Digital pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="w-full h-full" style={{
          background: `
            linear-gradient(90deg, rgba(255,215,0,0.1) 1px, transparent 1px),
            linear-gradient(rgba(255,215,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}></div>
      </div>
      
      {/* Main canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Overlay vignette to enhance depth */}
      <div className="absolute inset-0 z-1 opacity-70 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.8) 100%)'
        }}
      ></div>
      
      {/* Animated light streaks */}
      <div className="absolute inset-0 z-1 overflow-hidden opacity-30 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-amber-300 opacity-50 h-px"
            style={{
              width: `${Math.random() * 100 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              rotate: `${Math.random() * 360}deg`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              width: ['100px', '200px', '100px'],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Types for particles
interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: { x: number; y: number };
  life: number;
  maxLife: number;
}

interface DataParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  value: string;
  velocity: { x: number; y: number };
  life: number;
  maxLife: number;
}

interface PatternSymbol {
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  symbol: 'star' | 'crescent';
  velocity: { x: number; y: number };
  rotationSpeed: number;
}