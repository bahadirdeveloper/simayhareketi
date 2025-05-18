/// <reference types="vite/client" />

// Declare MP3 modules for TypeScript
declare module '*.mp3' {
  const src: string;
  export default src;
}