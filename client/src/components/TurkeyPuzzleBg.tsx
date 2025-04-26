import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// TypeScript interfaces for the background elements
interface Point {
  x: number;
  y: number;
}

interface DataParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  value: string;
  velocity: { x: number, y: number };
  life: number;
  maxLife: number;
}

interface PuzzlePiece {
  name: string;
  color: string;
  points: [number, number][];
  pulse: number;
}

export default function TurkeyPuzzleBg() {
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
    
    // Setup data particles
    const dataParticles: DataParticle[] = [];
    
    // Create particles
    const createParticles = () => {
      // Data particles (represent digital/tech elements)
      const dataCount = Math.floor(window.innerWidth * window.innerHeight / 20000);
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
    };
    
    // Draw background - Koyu Mavi Teknoloji Temalı
    const drawBackground = () => {
      if (!ctx) return;
      
      // Create deep blue gradient background - representing technological advancement
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(0, 15, 40, 1)');  // Daha koyu mavi
      gradient.addColorStop(0.7, 'rgba(0, 5, 25, 1)'); // Orta ton
      gradient.addColorStop(1, 'rgba(0, 0, 15, 1)');   // Koyu lacivert
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add digital code/data flow patterns
      drawDataFlowLines();
      
      // Add subtle grid pattern - represents digital framework
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.05)'; // Altın rengi grid
      ctx.lineWidth = 0.25;
      
      const gridSize = 40;
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
      
      // Add diagonal grid lines for a more tech feel
      ctx.strokeStyle = 'rgba(0, 150, 255, 0.025)'; // Açık mavi diagonal grid
      for (let i = 0; i < canvas.width + canvas.height; i += gridSize * 2) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(i, 0);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(canvas.width, i - canvas.width);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      
      // Draw faint circuit patterns
      drawCircuitPatterns();
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
        
        if (!ctx) return;
        
        // Draw connection line
        ctx.beginPath();
        ctx.moveTo(x, y);
        
        // Decide if we want right angles (circuit-like) or straight lines
        if (Math.random() > 0.5 && depth > 1) {
          // Right angle connection
          const midX = x + Math.cos(angle) * length / 2;
          const midY = y + Math.sin(angle) * length / 2;
          
          if (Math.random() > 0.5) {
            ctx.lineTo(midX, y);
            ctx.lineTo(midX, midY);
            ctx.lineTo(endX, midY);
            ctx.lineTo(endX, endY);
          } else {
            ctx.lineTo(x, midY);
            ctx.lineTo(midX, midY);
            ctx.lineTo(midX, endY);
            ctx.lineTo(endX, endY);
          }
        } else {
          // Straight line
          ctx.lineTo(endX, endY);
        }
        
        ctx.stroke();
        
        // Add a node/connection point
        if (Math.random() > 0.7) {
          ctx.fillStyle = 'rgba(0, 180, 255, 0.05)';
          ctx.beginPath();
          ctx.arc(endX, endY, 2, 0, Math.PI * 2);
          ctx.fill();
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
    
    // Draw Turkey map made of puzzle pieces
    const drawTurkeyMap = () => {
      if (!ctx) return;
      
      const time = Date.now() * 0.001;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.4;
      
      ctx.save();
      ctx.globalAlpha = 0.3 + Math.sin(time * 0.001) * 0.05;
      
      // Scales and positions for Turkey map
      const mapScale = 1.2;
      const mapOffsetX = 0; // Center the map
      const mapOffsetY = 0; // Center the map
      
      // Draw technological circuit lines surrounding Turkey
      drawTurkeyCircuits(centerX + mapOffsetX, centerY + mapOffsetY, radius * mapScale, time);
      
      // Draw Turkey as puzzle pieces
      drawTurkeyPuzzle(centerX + mapOffsetX, centerY + mapOffsetY, radius * mapScale, time);
      
      ctx.restore();
    };
    
    // Draw circuit pattern around Turkey
    const drawTurkeyCircuits = (centerX: number, centerY: number, radius: number, time: number) => {
      if (!ctx) return;
      
      ctx.strokeStyle = 'rgba(0, 150, 255, 0.15)';
      ctx.lineWidth = 1;
      
      // Draw surrounding circuit pattern
      const circuitPoints = 15;
      for (let i = 0; i < circuitPoints; i++) {
        const angle = (i / circuitPoints) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * (radius * 1.2);
        const y = centerY + Math.sin(angle) * (radius * 1.2);
        
        // Circuit paths radiating from the map
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        
        // Create angled circuit paths
        if (i % 2 === 0) {
          const controlX = centerX + Math.cos(angle) * (radius * 0.6);
          const controlY = centerY + Math.sin(angle) * (radius * 0.6);
          
          // Add a right-angle style circuit
          ctx.lineTo(controlX, centerY);
          ctx.lineTo(controlX, controlY);
          ctx.lineTo(x, controlY);
          ctx.lineTo(x, y);
        } else {
          // Create a data flow connection
          ctx.lineTo(x, y);
        }
        
        ctx.stroke();
        
        // Add connection nodes
        ctx.fillStyle = 'rgba(0, 200, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    
    // Draw Turkey made of puzzle pieces
    const drawTurkeyPuzzle = (centerX: number, centerY: number, radius: number, time: number) => {
      if (!ctx) return;
      
      // Define regions of Turkey as puzzle pieces
      const regions: PuzzlePiece[] = [
        // Black Sea region (Karadeniz)
        {
          name: "Karadeniz",
          color: "rgba(100, 180, 255, 0.3)",
          points: [
            [0.2, -0.2], [0.5, -0.3], [0.8, -0.2], 
            [0.7, -0.1], [0.5, -0.1], [0.3, -0.15]
          ],
          pulse: Math.sin(time * 0.5 + 0) * 0.03
        },
        // Marmara region
        {
          name: "Marmara",
          color: "rgba(255, 180, 100, 0.3)",
          points: [
            [0.0, -0.1], [0.3, -0.15], [0.3, 0.0], 
            [0.1, 0.1], [-0.1, 0.0]
          ],
          pulse: Math.sin(time * 0.5 + 1) * 0.03
        },
        // Aegean region (Ege)
        {
          name: "Ege",
          color: "rgba(100, 255, 180, 0.3)",
          points: [
            [-0.1, 0.0], [0.1, 0.1], [0.2, 0.3], 
            [0.0, 0.3], [-0.2, 0.1]
          ],
          pulse: Math.sin(time * 0.5 + 2) * 0.03
        },
        // Mediterranean region (Akdeniz)
        {
          name: "Akdeniz",
          color: "rgba(180, 100, 255, 0.3)",
          points: [
            [0.0, 0.3], [0.2, 0.3], [0.5, 0.2], 
            [0.7, 0.3], [0.2, 0.4]
          ],
          pulse: Math.sin(time * 0.5 + 3) * 0.03
        },
        // Central Anatolia (İç Anadolu)
        {
          name: "İç Anadolu",
          color: "rgba(255, 100, 100, 0.3)",
          points: [
            [0.3, 0.0], [0.5, -0.1], [0.6, 0.1], 
            [0.5, 0.2], [0.2, 0.3], [0.1, 0.1]
          ],
          pulse: Math.sin(time * 0.5 + 4) * 0.03
        },
        // Eastern Anatolia (Doğu Anadolu)
        {
          name: "Doğu Anadolu",
          color: "rgba(255, 215, 0, 0.3)",
          points: [
            [0.6, 0.1], [0.7, -0.1], [0.8, -0.2], 
            [1.0, -0.1], [0.9, 0.1], [0.7, 0.3], [0.5, 0.2]
          ],
          pulse: Math.sin(time * 0.5 + 5) * 0.03
        },
        // Southeastern Anatolia (Güneydoğu Anadolu)
        {
          name: "Güneydoğu Anadolu",
          color: "rgba(255, 150, 0, 0.3)",
          points: [
            [0.7, 0.3], [0.9, 0.1], [1.0, 0.2], 
            [0.8, 0.3], [0.7, 0.3]
          ],
          pulse: Math.sin(time * 0.5 + 6) * 0.03
        }
      ];
      
      // Draw each region as a puzzle piece
      regions.forEach(region => {
        ctx.save();
        
        // Apply subtle animation
        const scale = 0.5 + region.pulse;
        
        // Draw the region
        ctx.fillStyle = region.color;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        region.points.forEach((point, index) => {
          const x = centerX + point[0] * radius * scale;
          const y = centerY + point[1] * radius * scale;
          
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.closePath();
        ctx.fill();
        
        // Add puzzle connectors between pieces
        region.points.forEach((point, index) => {
          if (index < region.points.length - 1) {
            const x1 = centerX + point[0] * radius * scale;
            const y1 = centerY + point[1] * radius * scale;
            const x2 = centerX + region.points[index + 1][0] * radius * scale;
            const y2 = centerY + region.points[index + 1][1] * radius * scale;
            
            // Draw puzzle connector
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            const angle = Math.atan2(y2 - y1, x2 - x1);
            const perpAngle = angle + Math.PI / 2;
            const bumpSize = 5 + Math.sin(time * 0.5 + index) * 2;
            
            // Only add bumps on some edges for a puzzle-like look
            if (index % 2 === 0) {
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(midX - Math.cos(perpAngle) * bumpSize, midY - Math.sin(perpAngle) * bumpSize);
              ctx.quadraticCurveTo(midX, midY, midX + Math.cos(perpAngle) * bumpSize, midY + Math.sin(perpAngle) * bumpSize);
              ctx.lineTo(x2, y2);
              ctx.stroke();
            }
          }
        });
        
        // Calculate center of region
        let centerRegionX = 0, centerRegionY = 0;
        region.points.forEach(point => {
          centerRegionX += centerX + point[0] * radius * scale;
          centerRegionY += centerY + point[1] * radius * scale;
        });
        centerRegionX /= region.points.length;
        centerRegionY /= region.points.length;
        
        // Add tech pattern inside each region
        drawRegionTexture(centerRegionX, centerRegionY, radius * 0.2, region.color);
        
        ctx.restore();
      });
    };
    
    // Draw tech pattern inside puzzle pieces
    const drawRegionTexture = (x: number, y: number, size: number, baseColor: string) => {
      if (!ctx) return;
      
      // Add circuit-like patterns
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 0.5;
      
      const lineCount = 5;
      for (let i = 0; i < lineCount; i++) {
        const angle = (i / lineCount) * Math.PI * 2;
        const startX = x + Math.cos(angle) * (size * 0.3);
        const startY = y + Math.sin(angle) * (size * 0.3);
        const endX = x + Math.cos(angle) * size;
        const endY = y + Math.sin(angle) * size;
        
        // Draw circuit line
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Add connection node
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(endX, endY, 1, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Add center node
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
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
      
      // Add new particles if needed
      if (dataParticles.length < 100) {
        createParticles();
      }
    };
    
    // Draw particles
    const drawParticles = () => {
      if (!ctx) return;
      
      // Draw data particles
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      dataParticles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.fillText(p.value, p.x, p.y);
      });
    };
    
    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw the background elements
      drawBackground();
      
      // Draw Turkey map
      drawTurkeyMap();
      
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