import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

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
    
    // Draw background - Türk Kültürüne Uygun Tema
    const drawBackground = () => {
      if (!ctx) return;
      
      // Türk bayrağı kırmızısı ve milli renklere uygun bir gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(40, 0, 0, 1)');      // Koyu kırmızı - üst kısım
      gradient.addColorStop(0.5, 'rgba(80, 0, 0, 1)');    // Orta kırmızı ton
      gradient.addColorStop(1, 'rgba(30, 0, 0, 1)');      // En koyu kırmızı - alt kısım
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Türk Motifi Arka Plan Deseni (Selçuklu Yıldızı ve Osmanlı Motifleri benzeri)
      drawTurkishPatternBackground();
      
      // Hilal ve Yıldız motifleri oluşturan ışık çizgileri 
      drawStarsAndCrescentLines();
      
      // Atatürk imzası ve tarihsel semboller
      drawHistoricalSymbols();
      
      // Türk geometrik desenleri (geleneksel sanat motifleri)
      drawGeometricPatterns();
      
      // İnce grid yapısıyla tüm deseni birleştir
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'; // İnce beyaz grid
      ctx.lineWidth = 0.2;
      
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
      
      // İnce ışık hüzmeleri
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.03)'; // Altın rengi ışık hüzmeleri
      for (let i = 0; i < 15; i++) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        const angle = Math.random() * Math.PI * 2;
        const length = Math.max(canvas.width, canvas.height) * 2;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(
          startX + Math.cos(angle) * length,
          startY + Math.sin(angle) * length
        );
        ctx.stroke();
      }
      
      // Geleneksel Türk motiflerini ekle
      drawTurkishMotifsBackground();
    };
    
    // Türk motifi arka plan deseni
    const drawTurkishPatternBackground = () => {
      if (!ctx) return;
      
      const patternSize = 80;
      const rows = Math.ceil(canvas.height / patternSize);
      const cols = Math.ceil(canvas.width / patternSize);
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const centerX = col * patternSize + patternSize / 2;
          const centerY = row * patternSize + patternSize / 2;
          const radius = patternSize * 0.4;
          
          // Selçuklu yıldızı benzeri desenler
          const points = 8; // 8 köşeli yıldız
          const innerRadius = radius * 0.4;
          
          ctx.strokeStyle = 'rgba(255, 215, 0, 0.02)'; // Altın rengi
          ctx.lineWidth = 0.5;
          
          // Yıldız çizimi
          ctx.beginPath();
          for (let i = 0; i < points * 2; i++) {
            const r = i % 2 === 0 ? radius : innerRadius;
            const angle = (i * Math.PI) / points;
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);
            
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.closePath();
          ctx.stroke();
          
          // Osmanlı deseni benzeri iç içe daireler
          if ((row + col) % 2 === 0) {
            ctx.strokeStyle = 'rgba(227, 10, 23, 0.02)'; // Türk kırmızısı
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * 0.7, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * 0.3, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }
    };
    
    // Hilal ve yıldız motifleri oluşturan ışık çizgileri
    const drawStarsAndCrescentLines = () => {
      if (!ctx) return;
      
      const time = Date.now() * 0.0005;
      const lineCount = 20;
      
      for (let i = 0; i < lineCount; i++) {
        const yPos = (canvas.height * i / lineCount) + Math.sin(time + i * 0.1) * 30;
        const speed = 0.5 + Math.sin(i * 0.3) * 0.2;
        const alpha = 0.03 + Math.sin(time + i) * 0.02;
        
        ctx.strokeStyle = i % 3 === 0 
          ? `rgba(255, 255, 255, ${alpha})` // Beyaz
          : `rgba(227, 10, 23, ${alpha})`; // Türk kırmızısı
          
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        // Dalgalı çizgi başlangıcı
        ctx.moveTo(0, yPos);
        
        // Dalgalı çizgi oluşturma
        const segments = 15;
        const segmentWidth = canvas.width / segments;
        
        for (let j = 1; j <= segments; j++) {
          const segX = j * segmentWidth;
          const segY = yPos + Math.sin(time * speed + j * 0.3) * 15;
          
          ctx.lineTo(segX, segY);
          
          // Bazı noktalarda yıldız veya hilal çizimi
          if (Math.random() > 0.85) {
            const symbolSize = 2 + Math.random() * 3;
            
            if (Math.random() > 0.5) {
              // Yıldız
              drawStar(ctx, segX, segY, 5, symbolSize, symbolSize * 0.4);
            } else {
              // Hilal
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 5})`;
              ctx.beginPath();
              ctx.arc(segX, segY, symbolSize, 0, Math.PI * 2);
              ctx.fill();
              
              ctx.fillStyle = `rgba(80, 0, 0, 1)`;
              ctx.beginPath();
              ctx.arc(segX + symbolSize * 0.35, segY, symbolSize * 0.85, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
        
        ctx.stroke();
      }
    };
    
    // Tarihsel semboller ve Atatürk imzası benzeri çizimler
    const drawHistoricalSymbols = () => {
      if (!ctx) return;
      
      // Üslubize edilmiş Atatürk imzası benzeri çizimler
      const signatureCount = 3;
      
      for (let i = 0; i < signatureCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const scale = 0.3 + Math.random() * 0.5;
        const alpha = 0.02 + Math.random() * 0.02;
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 0.5;
        
        // Atatürk imzası benzeri bir stil
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(
          x + 50 * scale, y - 20 * scale,
          x + 80 * scale, y + 20 * scale,
          x + 120 * scale, y - 10 * scale
        );
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x + 40 * scale, y + 10 * scale);
        ctx.bezierCurveTo(
          x + 70 * scale, y - 30 * scale,
          x + 100 * scale, y + 5 * scale,
          x + 80 * scale, y + 30 * scale
        );
        ctx.stroke();
      }
    };
    
    // Geleneksel Türk geometrik desenleri
    const drawGeometricPatterns = () => {
      if (!ctx) return;
      
      const patternCount = 8;
      
      for (let i = 0; i < patternCount; i++) {
        const centerX = Math.random() * canvas.width;
        const centerY = Math.random() * canvas.height;
        const radius = 30 + Math.random() * 70;
        const alpha = 0.01 + Math.random() * 0.02;
        
        // Geometrik desenler - altıgen ve çintemani
        if (Math.random() > 0.5) {
          // Altıgen
          ctx.strokeStyle = `rgba(255, 215, 0, ${alpha})`; // Altın
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          
          for (let j = 0; j < 6; j++) {
            const angle = (j * Math.PI) / 3;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            if (j === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          
          ctx.closePath();
          ctx.stroke();
          
          // İç altıgen
          ctx.beginPath();
          for (let j = 0; j < 6; j++) {
            const angle = (j * Math.PI) / 3 + Math.PI / 6;
            const x = centerX + radius * 0.6 * Math.cos(angle);
            const y = centerY + radius * 0.6 * Math.sin(angle);
            
            if (j === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.closePath();
          ctx.stroke();
        } else {
          // Çintemani (üç nokta)
          ctx.fillStyle = `rgba(227, 10, 23, ${alpha * 2})`;
          const dotRadius = radius / 5;
          
          // Üst nokta
          ctx.beginPath();
          ctx.arc(centerX, centerY - radius * 0.3, dotRadius, 0, Math.PI * 2);
          ctx.fill();
          
          // Alt sol nokta
          ctx.beginPath();
          ctx.arc(centerX - radius * 0.3, centerY + radius * 0.2, dotRadius, 0, Math.PI * 2);
          ctx.fill();
          
          // Alt sağ nokta
          ctx.beginPath();
          ctx.arc(centerX + radius * 0.3, centerY + radius * 0.2, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
    
    // Draw flowing data lines representing digital update concepts
    const drawDataFlowLines = () => {
      if (!ctx) return;
      
      const time = Date.now() * 0.001;
      const lineCount = 30;
      
      // Create a set of flowing lines
      for (let i = 0; i < lineCount; i++) {
        const y = (canvas.height * i / lineCount) + Math.sin(time + i * 0.2) * 20;
        const speed = 0.5 + Math.sin(i * 0.5) * 0.3;
        const alpha = 0.05 + Math.sin(time * 0.5 + i) * 0.03;
        
        // Randomly determine if this is a Turkish red line or a digital blue line
        const isTurkishRed = Math.random() > 0.7;
        
        ctx.strokeStyle = isTurkishRed ? 
          `rgba(227, 10, 23, ${alpha * 1.2})` : // Türk bayrağı kırmızısı
          `rgba(0, 180, 255, ${alpha})`;        // Teknoloji mavisi
          
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        // Starting point
        const startX = 0;
        const endX = canvas.width;
        ctx.moveTo(startX, y);
        
        // Create wavy line with Perlin-like noise effect
        const segments = 20;
        const segmentWidth = canvas.width / segments;
        
        for (let j = 1; j <= segments; j++) {
          const segX = j * segmentWidth;
          const segY = y + Math.sin(time * speed + j * 0.5) * 10;
          
          // Digital pattern - occasional straight segments
          if (j % 4 === 0 && !isTurkishRed) {
            ctx.lineTo(segX - segmentWidth / 2, segY);
            ctx.lineTo(segX - segmentWidth / 2, segY + Math.random() * 10 - 5);
            ctx.lineTo(segX, segY);
          } else {
            ctx.lineTo(segX, segY);
          }
        }
        
        ctx.stroke();
        
        // Add data "packets" along the line
        if (Math.random() > 0.7) {
          const packetCount = Math.floor(Math.random() * 3) + 1;
          
          for (let p = 0; p < packetCount; p++) {
            const packetX = (Math.sin(time * 0.5 + p) * 0.5 + 0.5) * canvas.width;
            const baseY = y + Math.sin(time * speed + (packetX / segmentWidth) * 0.5) * 10;
            
            // Draw data packet - rectangle or circle
            if (isTurkishRed) {
              // Star or crescent for Turkish motifs
              if (Math.random() > 0.5) {
                drawStar(ctx, packetX, baseY, 5, 3, 1.5);
              } else {
                // Simple crescent
                ctx.fillStyle = `rgba(227, 10, 23, ${alpha * 3})`;
                ctx.beginPath();
                ctx.arc(packetX, baseY, 3, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = 'rgba(0, 15, 40, 1)';
                ctx.beginPath();
                ctx.arc(packetX + 1.5, baseY, 2.5, 0, Math.PI * 2);
                ctx.fill();
              }
            } else {
              // Binary or data for tech motifs
              ctx.fillStyle = `rgba(0, 200, 255, ${alpha * 3})`;
              if (Math.random() > 0.5) {
                ctx.beginPath();
                ctx.arc(packetX, baseY, 2, 0, Math.PI * 2);
                ctx.fill();
              } else {
                ctx.fillRect(packetX - 2, baseY - 2, 4, 4);
              }
            }
          }
        }
      }
    };
    
    // Draw circuit board-like patterns in the background
    const drawCircuitPatterns = () => {
      if (!ctx) return;
      
      ctx.strokeStyle = 'rgba(0, 150, 255, 0.03)';
      ctx.lineWidth = 0.5;
      
      const patternCount = 10;
      const time = Date.now() * 0.0002;
      
      for (let i = 0; i < patternCount; i++) {
        const startX = Math.sin(i * 5 + time) * canvas.width * 0.4 + canvas.width * 0.5;
        const startY = Math.cos(i * 5 + time) * canvas.height * 0.4 + canvas.height * 0.5;
        
        drawCircuitBranch(startX, startY, 5, 0, Math.PI * 2 * Math.random());
      }
      
      // Helper function to recursively draw circuit branches
      function drawCircuitBranch(x: number, y: number, depth: number, parentAngle: number, angleOffset: number) {
        if (depth <= 0) return;
        
        const length = 20 + Math.random() * 30;
        const angle = parentAngle + angleOffset;
        
        const endX = x + Math.cos(angle) * length;
        const endY = y + Math.sin(angle) * length;
        
        // Draw connection line
        ctx!.beginPath();
        ctx!.moveTo(x, y);
        
        // Decide if we want right angles (circuit-like) or straight lines
        if (Math.random() > 0.5 && depth > 1) {
          // Right angle connection
          const midX = x + Math.cos(angle) * length / 2;
          const midY = y + Math.sin(angle) * length / 2;
          
          if (Math.random() > 0.5) {
            ctx!.lineTo(midX, y);
            ctx!.lineTo(midX, midY);
            ctx!.lineTo(endX, midY);
            ctx!.lineTo(endX, endY);
          } else {
            ctx!.lineTo(x, midY);
            ctx!.lineTo(midX, midY);
            ctx!.lineTo(midX, endY);
            ctx!.lineTo(endX, endY);
          }
        } else {
          // Straight line
          ctx!.lineTo(endX, endY);
        }
        
        ctx!.stroke();
        
        // Add a node/connection point
        if (Math.random() > 0.7) {
          ctx!.fillStyle = 'rgba(0, 180, 255, 0.05)';
          ctx!.beginPath();
          ctx!.arc(endX, endY, 2, 0, Math.PI * 2);
          ctx!.fill();
        }
        
        // Chance to branch out
        if (Math.random() > 0.3) {
          const branchAngle = Math.random() * Math.PI / 2 - Math.PI / 4;
          drawCircuitBranch(endX, endY, depth - 1, angle, branchAngle);
        }
        
        // Continue main branch
        if (Math.random() > 0.2) {
          const newAngleOffset = (Math.random() * Math.PI / 4) - Math.PI / 8;
          drawCircuitBranch(endX, endY, depth - 1, angle, newAngleOffset);
        }
      }
    };
    
    // Draw subtle Turkish flag motifs
    const drawTurkishMotifsBackground = () => {
      if (!ctx) return;
      
      // Add very faint Turkish flag motifs
      const motifCount = 5;
      
      for (let i = 0; i < motifCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = 10 + Math.random() * 15;
        const alpha = 0.02 + Math.random() * 0.03;
        
        // Decide between star or crescent
        if (Math.random() > 0.5) {
          // Star
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          drawStar(ctx, x, y, 5, size, size / 2);
        } else {
          // Crescent
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.fillStyle = `rgba(0, 10, 30, ${alpha * 10})`;
          ctx.beginPath();
          ctx.arc(x + size * 0.5, y, size * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
    
    // Helper function to draw a star
    function drawStar(context: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) {
      let rot = Math.PI / 2 * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;
      
      context.beginPath();
      context.moveTo(cx, cy - outerRadius);
      
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        context.lineTo(x, y);
        rot += step;
        
        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        context.lineTo(x, y);
        rot += step;
      }
      
      context.lineTo(cx, cy - outerRadius);
      context.closePath();
      context.fill();
    }
    
    // Update particles
    const updateParticles = () => {
      // Update regular particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Update position
        p.x += p.velocity.x;
        p.y += p.velocity.y;
        
        // Decrease life
        p.life -= 1;
        
        // Remove dead particles
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }
      
      // Update data particles
      for (let i = dataParticles.length - 1; i >= 0; i--) {
        const p = dataParticles[i];
        
        // Update position
        p.x += p.velocity.x;
        p.y += p.velocity.y;
        
        // Decrease life
        p.life -= 1;
        
        // Remove dead particles
        if (p.life <= 0) {
          dataParticles.splice(i, 1);
        }
      }
      
      // Update Turkish pattern symbols
      for (let i = turkishPatternSymbols.length - 1; i >= 0; i--) {
        const s = turkishPatternSymbols[i];
        
        // Update position and rotation
        s.x += s.velocity.x;
        s.y += s.velocity.y;
        s.rotation += s.rotationSpeed;
        
        // Keep in bounds
        if (s.x < -100 || s.x > canvas.width + 100 || s.y < -100 || s.y > canvas.height + 100) {
          s.x = Math.random() * canvas.width;
          s.y = Math.random() * canvas.height;
        }
      }
      
      // Add new particles if needed
      if (particles.length < 100) {
        createParticles();
      }
    };
    
    // Draw particles
    const drawParticles = () => {
      if (!ctx) return;
      
      // Draw regular particles
      particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw data particles
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      dataParticles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.fillText(p.value, p.x, p.y);
      });
      
      // Draw Turkish pattern symbols
      turkishPatternSymbols.forEach(s => {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        
        ctx.fillStyle = s.color;
        
        if (s.symbol === 'star') {
          drawStar(ctx, 0, 0, 5, s.size, s.size / 2);
        } else {
          // Crescent
          ctx.beginPath();
          ctx.arc(0, 0, s.size, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.fillStyle = 'rgba(0, 10, 30, 1)';
          ctx.beginPath();
          ctx.arc(s.size * 0.3, 0, s.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      });
    };
    
    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw the background elements
      drawBackground();
      
      // Update and draw particles
      updateParticles();
      drawParticles();
      
      // Continue animation
      requestAnimationFrame(animate);
    };
    
    // Initialize animation
    createParticles();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);
  
  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
}