import { useCallback } from "react";

export function useMatrixRain() {
  // Create the matrix rain effect
  const createMatrixRain = useCallback((container: HTMLDivElement) => {
    const screenWidth = window.innerWidth;
    const characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨーワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ0123456789";
    const numColumns = Math.floor(screenWidth / 20);
    
    for (let i = 0; i < numColumns; i++) {
      const column = document.createElement('div');
      column.className = 'matrix-rain';
      column.style.position = 'absolute';
      column.style.color = '#00FF41';
      column.style.fontFamily = '"Share Tech Mono", monospace';
      column.style.fontSize = '1.2rem';
      column.style.textShadow = '0 0 5px #39FF14';
      column.style.userSelect = 'none';
      column.style.whiteSpace = 'nowrap';
      column.style.width = '100%';
      column.style.pointerEvents = 'none';
      column.style.opacity = '0.8';
      column.style.animation = 'matrixRain 25s linear infinite';
      column.style.left = `${i * 20}px`;
      column.style.animationDelay = `${Math.random() * 5}s`;
      
      const columnLength = 50 + Math.floor(Math.random() * 50);
      let columnText = '';
      
      for (let j = 0; j < columnLength; j++) {
        const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
        columnText += randomChar + '<br>';
      }
      
      column.innerHTML = columnText;
      container.appendChild(column);
    }
  }, []);
  
  // Clear the matrix rain effect
  const clearMatrixRain = useCallback((container: HTMLDivElement) => {
    container.innerHTML = '';
  }, []);
  
  return { createMatrixRain, clearMatrixRain };
}
