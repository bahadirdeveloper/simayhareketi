export default function SimpleFuturisticTurkish() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Background color - simplified */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Minimal Turkish star for identity */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-[0.02]">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
            fill="#e30a17" />
        </svg>
      </div>
      
      {/* Simple red edge borders */}
      <div className="absolute top-0 inset-x-0 h-px bg-red-900/20"></div>
      <div className="absolute bottom-0 inset-x-0 h-px bg-red-900/20"></div>
    </div>
  );
}