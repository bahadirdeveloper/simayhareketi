import React from 'react';

export default function SimpleBurningEarth() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
      {/* Starry background */}
      <div className="absolute inset-0 bg-black">
        {/* Starry effect with radial gradients */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 5px)',
            backgroundSize: '100px 100px',
            backgroundPosition: '0 0',
            opacity: 0.3,
          }}
        />

        {/* Earth in center */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div 
            className="w-[500px] h-[500px] rounded-full bg-gradient-to-b from-blue-900 to-blue-700 relative"
            style={{
              boxShadow: '0 0 50px rgba(0, 100, 255, 0.3)',
            }}
          >
            {/* Continental masses */}
            <div className="absolute inset-0">
              <div className="absolute w-24 h-16 bg-green-800 rounded-full blur-sm top-20 left-40"></div>
              <div className="absolute w-32 h-20 bg-green-800 rounded-full blur-sm top-40 left-20 rotate-12"></div>
              <div className="absolute w-48 h-28 bg-green-800 rounded-full blur-sm top-60 left-60 -rotate-12"></div>
              <div className="absolute w-20 h-40 bg-green-800 rounded-full blur-sm top-80 left-30 rotate-45"></div>
              <div className="absolute w-36 h-24 bg-green-800 rounded-full blur-sm top-24 left-80 -rotate-12"></div>
            </div>

            {/* Fire effect over half of the earth */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 rounded-b-full overflow-hidden">
              <div 
                className="absolute inset-0 bg-gradient-to-t from-red-600 via-orange-500 to-transparent animate-pulse"
                style={{
                  opacity: 0.8,
                }}
              ></div>
            </div>

            {/* Additional fire effect */}
            <div 
              className="absolute bottom-0 left-0 w-full h-1/2"
              style={{
                background: 'radial-gradient(ellipse at center bottom, rgba(255,69,0,0.8) 0%, rgba(255,140,0,0.6) 40%, transparent 80%)',
                boxShadow: 'inset 0 -10px 20px rgba(255, 0, 0, 0.7)',
              }}
            ></div>

            {/* Earth glow */}
            <div 
              className="absolute -inset-8 rounded-full opacity-40" 
              style={{
                background: 'radial-gradient(circle, rgba(255,69,0,0.3) 0%, rgba(0,0,0,0) 70%)',
                filter: 'blur(20px)',
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Global styling for animations */}
      <style>
        {`
          @keyframes pulse-fire {
            0% { opacity: 0.7; transform: scaleY(1); }
            50% { opacity: 0.9; transform: scaleY(1.05); }
            100% { opacity: 0.7; transform: scaleY(1); }
          }
        `}
      </style>
    </div>
  );
}