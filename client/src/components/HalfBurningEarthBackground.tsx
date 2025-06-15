import { useEffect, useState } from "react";

export default function HalfBurningEarthBackground() {
  const [loaded, setLoaded] = useState(false);
  
  // SVG background with half burning earth effect based on the provided image
  const svgBackground = `
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="earthGlow" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
        <stop offset="0%" stop-color="#0077be" stop-opacity="0.3" />
        <stop offset="60%" stop-color="#0055aa" stop-opacity="0.2" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
      
      <radialGradient id="earthGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stop-color="#4090c0" />
        <stop offset="65%" stop-color="#1a6394" />
        <stop offset="100%" stop-color="#003366" />
      </radialGradient>
      
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="10" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      
      <filter id="fireFilter" x="-50%" y="-50%" width="200%" height="200%">
        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" seed="1" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" result="displacedImage" />
        <feComposite in="displacedImage" in2="SourceGraphic" operator="in" />
      </filter>
      
      <linearGradient id="fireGradient" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#ff0000" />
        <stop offset="40%" stop-color="#ff6a00" />
        <stop offset="70%" stop-color="#ffcc00" />
        <stop offset="100%" stop-color="#ffff00" />
      </linearGradient>
      
      <clipPath id="bottomHalf">
        <rect x="0" y="540" width="1920" height="540" />
      </clipPath>
      
      <clipPath id="topHalf">
        <rect x="0" y="0" width="1920" height="540" />
      </clipPath>
      
      <mask id="earthMask">
        <circle cx="960" cy="540" r="420" fill="white" />
      </mask>
    </defs>
    
    <!-- Background -->
    <rect width="100%" height="100%" fill="#000" />
    
    <!-- Stars -->
    <g>
      ${Array.from({ length: 200 }, (_, i) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 0.5;
        const opacity = Math.random() * 0.7 + 0.3;
        return `<circle cx="${x}%" cy="${y}%" r="${size}" fill="white" opacity="${opacity}">
          <animate attributeName="opacity" values="${opacity};${opacity * 0.5};${opacity}" dur="${Math.random() * 3 + 2}s" repeatCount="indefinite" />
        </circle>`;
      }).join("")}
    </g>
    
    <!-- Earth glow -->
    <circle cx="960" cy="540" r="450" fill="url(#earthGlow)" />
    
    <!-- Earth base - based on the provided image -->
    <g mask="url(#earthMask)">
      <circle cx="960" cy="540" r="420" fill="url(#earthGradient)" filter="url(#glow)" />
      
      <!-- Earth details - clouds and landmasses similar to the image -->
      <g opacity="0.8">
        <!-- Cloud/land patterns inspired by the image -->
        <path d="M650,440 Q750,390 850,430 T1050,420 Q1150,390 1250,460 T1400,450 Q1300,520 1200,500 T1000,520 Q900,490 750,520 T650,440 Z" 
              fill="#FFFFFF" opacity="0.2" />
        <path d="M700,580 Q800,530 900,570 T1100,560 Q1200,530 1300,600 T1450,590 Q1350,660 1250,640 T1050,660 Q950,630 800,660 T700,580 Z" 
              fill="#FFFFFF" opacity="0.15" />
        <path d="M600,700 Q700,650 800,690 T1000,680 Q1100,650 1200,720 T1350,710 Q1250,780 1150,760 T950,780 Q850,750 700,780 T600,700 Z" 
              fill="#FFFFFF" opacity="0.1" />
      </g>
    </g>
    
    <!-- Bottom half - Burning effect -->
    <g clip-path="url(#bottomHalf)">
      <!-- Flames layer around bottom half of earth -->
      <g filter="url(#fireFilter)">
        ${Array.from({ length: 24 }, (_, i) => {
          const angle = 180 + (i * 15);
          const radian = angle * Math.PI / 180;
          const radius = 420;
          const cx = 960 + Math.cos(radian) * radius;
          const cy = 540 + Math.sin(radian) * radius;
          const height = Math.random() * 150 + 100;
          
          return `
          <g transform="translate(${cx}, ${cy})">
            <path d="M0,0 Q-40,-${height/2} 0,-${height} Q40,-${height/2} 0,0 Z" fill="url(#fireGradient)">
              <animate attributeName="d" 
                values="M0,0 Q-40,-${height/2} 0,-${height} Q40,-${height/2} 0,0 Z;
                       M0,0 Q-30,-${height/2} 0,-${height*0.9} Q30,-${height/2} 0,0 Z;
                       M0,0 Q-40,-${height/2} 0,-${height} Q40,-${height/2} 0,0 Z" 
                dur="${Math.random() + 1}s" 
                repeatCount="indefinite" />
              <animate attributeName="opacity"
                values="0.7;0.9;0.7"
                dur="${Math.random() + 1}s"
                repeatCount="indefinite" />
            </path>
          </g>`;
        }).join("")}
        
        <!-- Additional inner flames -->
        ${Array.from({ length: 15 }, (_, i) => {
          const angle = 180 + (i * 24);
          const radian = angle * Math.PI / 180;
          const radius = 380;
          const cx = 960 + Math.cos(radian) * radius;
          const cy = 540 + Math.sin(radian) * radius;
          const height = Math.random() * 100 + 70;
          
          return `
          <g transform="translate(${cx}, ${cy})">
            <path d="M0,0 Q-30,-${height/2} 0,-${height} Q30,-${height/2} 0,0 Z" fill="url(#fireGradient)" opacity="0.9">
              <animate attributeName="d" 
                values="M0,0 Q-30,-${height/2} 0,-${height} Q30,-${height/2} 0,0 Z;
                       M0,0 Q-20,-${height/2} 0,-${height*0.85} Q20,-${height/2} 0,0 Z;
                       M0,0 Q-30,-${height/2} 0,-${height} Q30,-${height/2} 0,0 Z" 
                dur="${Math.random() * 0.5 + 0.8}s" 
                repeatCount="indefinite" />
            </path>
          </g>`;
        }).join("")}
      </g>
      
      <!-- Overlay for the burning part of Earth -->
      <circle cx="960" cy="540" r="420" fill="#ff3000" opacity="0.2" mask="url(#earthMask)" />
      
      <!-- Smoke effect from burning -->
      <g opacity="0.4">
        ${Array.from({ length: 8 }, (_, i) => {
          const x = 960 + Math.random() * 500 - 250;
          const y = 540 + Math.random() * 300 + 50;
          const size = Math.random() * 100 + 60;
          
          return `<circle cx="${x}" cy="${y}" r="${size}" fill="#555" opacity="${Math.random() * 0.3}">
            <animate attributeName="opacity" 
              values="0;${Math.random() * 0.3};0" 
              dur="${Math.random() * 5 + 4}s" 
              repeatCount="indefinite" 
              begin="${Math.random() * 3}s" />
            <animate attributeName="cy" 
              values="${y};${y - 100}" 
              dur="${Math.random() * 5 + 4}s" 
              repeatCount="indefinite" 
              begin="${Math.random() * 3}s" />
            <animate attributeName="r" 
              values="${size};${size * 1.5}" 
              dur="${Math.random() * 5 + 4}s" 
              repeatCount="indefinite" 
              begin="${Math.random() * 3}s" />
          </circle>`;
        }).join("")}
      </g>
    </g>
    
    <!-- Red alert glow overlay on bottom half -->
    <rect x="0" y="540" width="1920" height="540" fill="rgba(255,30,0,0.05)" />
    
    <!-- Add subtle flares and embers rising from burning half -->
    <g>
      ${Array.from({ length: 40 }, (_, i) => {
        const x = 960 + Math.random() * 800 - 400;
        const y = 820 + Math.random() * 200;
        const size = Math.random() * 3 + 1;
        
        return `<circle cx="${x}" cy="${y}" r="${size}" fill="#ff9900" opacity="${Math.random() * 0.7 + 0.3}">
          <animate attributeName="cy" 
            values="${y};${y - Math.random() * 300 - 100}" 
            dur="${Math.random() * 4 + 3}s" 
            repeatCount="indefinite" />
          <animate attributeName="opacity" 
            values="${Math.random() * 0.7 + 0.3};0" 
            dur="${Math.random() * 4 + 3}s" 
            repeatCount="indefinite" />
        </circle>`;
      }).join("")}
    </g>
  </svg>
  `;
  
  useEffect(() => {
    // Simulate image loading
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);
  
  return (
    <>
      <div 
        className="fixed inset-0 z-0 overflow-hidden"
        dangerouslySetInnerHTML={{ __html: svgBackground }}
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
      />
      
      {/* Additional ambient overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent to-red-900/10"></div>
    </>
  );
}