import React, { useEffect, useState, useMemo } from 'react';

/**
 * Türk Bayrağı 4K Dalgalanma Animasyonu Komponenti
 * CSS/SVG tabanlı dijital efektlerle zenginleştirilmiş Türk bayrağı
 */
const TurkishFlagBackground: React.FC = () => {
  const [animationFrame, setAnimationFrame] = useState(0);
  
  // Grid oluşturma (teknolojik efekt için)
  const gridItems = useMemo(() => {
    const items = [];
    for (let i = 0; i < 50; i++) {
      items.push(
        <div 
          key={`h-${i}`} 
          className="absolute h-px bg-red-600/10 w-full" 
          style={{ top: `${i * 2}%` }} 
        />
      );
      items.push(
        <div 
          key={`v-${i}`} 
          className="absolute w-px bg-red-600/10 h-full" 
          style={{ left: `${i * 2}%` }} 
        />
      );
    }
    return items;
  }, []);
  
  // Parıltı efektleri için
  const starElements = useMemo(() => {
    const stars = [];
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 3 + 1;
      stars.push(
        <div 
          key={i}
          className="absolute rounded-full bg-white/10"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.3,
            boxShadow: '0 0 2px rgba(255, 255, 255, 0.5)'
          }}
        />
      );
    }
    return stars;
  }, []);
  
  // CSS animasyonunu başlat
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationFrame(prev => (prev + 1) % 100);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  // Dalga efekti - CSS keyframes yerine
  const waveStyle = {
    transform: `translateY(${Math.sin(animationFrame / 15) * 10}px)`
  };

  return (
    <div className="fixed inset-0 overflow-hidden z-[-1]">
      {/* Koyu lacivert arka plan */}
      <div className="absolute inset-0 bg-[#041E42]"></div>
      
      {/* Izgara çizgiler (teknolojik efekt) */}
      <div className="absolute inset-0 overflow-hidden">
        {gridItems}
      </div>
      
      {/* Türk bayrağı SVG (inline) */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[75vw] max-w-[800px] h-auto"
        style={waveStyle}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 800" 
          className="w-full h-auto filter drop-shadow-lg"
        >
          {/* Bayrak arka planı */}
          <rect width="1200" height="800" fill="#E30A17" />
          
          {/* Ay */}
          <circle cx="450" cy="400" r="150" fill="white" />
          
          {/* İç ay (kırmızı) */}
          <circle cx="495" cy="400" r="120" fill="#E30A17" />
          
          {/* Yıldız */}
          <polygon 
            fill="white" 
            points="675,400 691,450 750,450 700,475 716,525 675,500 634,525 650,475 600,450 659,450"
          />
        </svg>
      </div>
      
      {/* Yıldız parıltıları */}
      <div className="absolute inset-0 overflow-hidden">
        {starElements}
      </div>
      
      {/* Teknolojik efektler - dijital çizgiler */}
      <div className="absolute bottom-0 w-full h-[30vh] overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <div 
            key={`line-${i}`}
            className="absolute h-px bg-white"
            style={{
              width: `${Math.random() * 100}%`,
              bottom: `${i * 5}%`,
              left: `${Math.random() * 50}%`,
              opacity: Math.random() * 0.7 + 0.3,
              transform: `rotate(${Math.random() * 5 - 2.5}deg)`,
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TurkishFlagBackground;