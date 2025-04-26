import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function RealBurningEarthBackground() {
  const [loaded, setLoaded] = useState(false);
  
  // SVG background with real burning earth effect
  const svgBackground = `
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="earthGlow" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
        <stop offset="0%" stop-color="#ff6a00" stop-opacity="0.4" />
        <stop offset="60%" stop-color="#ff0000" stop-opacity="0.2" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
      
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="20" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      
      <filter id="fireFilter" x="-50%" y="-50%" width="200%" height="200%">
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="1" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" result="displacedImage" />
        <feComposite in="displacedImage" in2="SourceGraphic" operator="in" />
      </filter>
      
      <linearGradient id="fireGradient" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#ff0000" />
        <stop offset="40%" stop-color="#ff6a00" />
        <stop offset="70%" stop-color="#ffcc00" />
        <stop offset="100%" stop-color="#ffff00" />
      </linearGradient>
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
    
    <!-- Earth -->
    <g transform="translate(960, 540)">
      <!-- Earth glow -->
      <circle cx="0" cy="0" r="350" fill="url(#earthGlow)" />
      
      <!-- Earth base -->
      <circle cx="0" cy="0" r="300" fill="#001529" filter="url(#glow)" />
      
      <!-- Earth details - continents -->
      <g>
        <path d="M-100,-80 Q50,-150 150,-50 T270,20 Q300,90 270,150 Q220,200 150,180 Q50,150 -50,170 Q-150,150 -200,70 Q-250,-20 -180,-120 Q-120,-150 -100,-80 Z" 
              fill="#003" opacity="0.6" />
        <path d="M-70,50 Q0,0 100,50 T170,150 Q150,200 50,220 Q-50,200 -100,120 Q-120,70 -70,50 Z" 
              fill="#003" opacity="0.6" />
        <path d="M-150,-180 Q-80,-200 0,-150 T100,-120 Q120,-80 100,-30 Q70,20 0,40 Q-70,30 -120,-20 Q-170,-80 -150,-180 Z" 
              fill="#003" opacity="0.6" />
      </g>
    </g>
    
    <!-- Flames around the globe -->
    <g filter="url(#fireFilter)">
      <!-- Circles of fire around the earth -->
      ${Array.from({ length: 24 }, (_, i) => {
        const angle = (i * 15) * Math.PI / 180;
        const radius = 300;
        const cx = 960 + Math.cos(angle) * radius;
        const cy = 540 + Math.sin(angle) * radius;
        const height = Math.random() * 100 + 100;
        
        return `
        <g transform="translate(${cx}, ${cy})">
          <path d="M0,0 Q-30,-${height/2} 0,-${height} Q30,-${height/2} 0,0 Z" fill="url(#fireGradient)">
            <animate attributeName="d" 
              values="M0,0 Q-30,-${height/2} 0,-${height} Q30,-${height/2} 0,0 Z;
                     M0,0 Q-20,-${height/2} 0,-${height*0.9} Q20,-${height/2} 0,0 Z;
                     M0,0 Q-30,-${height/2} 0,-${height} Q30,-${height/2} 0,0 Z" 
              dur="${Math.random() + 1}s" 
              repeatCount="indefinite" />
            <animate attributeName="opacity"
              values="0.7;0.9;0.7"
              dur="${Math.random() + 1}s"
              repeatCount="indefinite" />
          </path>
        </g>`;
      }).join("")}
    </g>
    
    <!-- Smoke effect -->
    <g opacity="0.3">
      ${Array.from({ length: 10 }, (_, i) => {
        const x = 960 + Math.random() * 600 - 300;
        const y = 540 + Math.random() * 600 - 300;
        const size = Math.random() * 150 + 50;
        
        return `<circle cx="${x}" cy="${y}" r="${size}" fill="#333" opacity="${Math.random() * 0.3}">
          <animate attributeName="opacity" 
            values="0;${Math.random() * 0.3};0" 
            dur="${Math.random() * 5 + 5}s" 
            repeatCount="indefinite" 
            begin="${Math.random() * 5}s" />
          <animate attributeName="cy" 
            values="${y};${y - 100}" 
            dur="${Math.random() * 5 + 5}s" 
            repeatCount="indefinite" 
            begin="${Math.random() * 5}s" />
          <animate attributeName="r" 
            values="${size};${size * 1.5}" 
            dur="${Math.random() * 5 + 5}s" 
            repeatCount="indefinite" 
            begin="${Math.random() * 5}s" />
        </circle>`;
      }).join("")}
    </g>
    
    <!-- Red alert glow overlay -->
    <rect width="100%" height="100%" fill="rgba(255,0,0,0.1)" />
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
      
      {/* Additional particle animation overlay */}
      <div className="fixed inset-0 z-0 bg-red-500/5"></div>
    </>
  );
}