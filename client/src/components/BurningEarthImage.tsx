import React from 'react';

export default function BurningEarthImage() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
      <div className="absolute inset-0 bg-black">
        {/* Starry background with CSS */}
        <div className="absolute inset-0"
          style={{
            background: 'black',
            backgroundImage: 'radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 5px)',
            backgroundSize: '50px 50px',
            opacity: 0.5,
          }}
        />

        {/* Earth in center */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-[600px] h-[600px] rounded-full overflow-hidden relative">
            {/* Earth image */}
            <div className="w-full h-full bg-blue-900 relative">
              {/* Land masses with gradients */}
              <div className="absolute inset-0 opacity-80">
                <div className="absolute w-[100px] h-[150px] bg-green-800 rounded-full blur-sm top-[150px] left-[150px] transform rotate-12"></div>
                <div className="absolute w-[120px] h-[80px] bg-green-800 rounded-full blur-sm top-[250px] left-[200px] transform -rotate-12"></div>
                <div className="absolute w-[180px] h-[100px] bg-green-800 rounded-full blur-sm top-[100px] left-[300px] transform rotate-45"></div>
                <div className="absolute w-[200px] h-[120px] bg-green-800 rounded-full blur-sm top-[300px] left-[300px] transform -rotate-25"></div>
                <div className="absolute w-[150px] h-[90px] bg-green-800 rounded-full blur-sm top-[400px] left-[150px] transform rotate-15"></div>
              </div>
              
              {/* Clouds */}
              <div className="absolute inset-0 opacity-50">
                <div className="absolute w-[200px] h-[50px] bg-white rounded-full blur-md top-[100px] left-[100px]"></div>
                <div className="absolute w-[150px] h-[40px] bg-white rounded-full blur-md top-[150px] left-[350px]"></div>
                <div className="absolute w-[250px] h-[60px] bg-white rounded-full blur-md top-[400px] left-[250px]"></div>
                <div className="absolute w-[180px] h-[45px] bg-white rounded-full blur-md top-[300px] left-[50px]"></div>
              </div>
            </div>
            
            {/* Fire effect over the bottom half */}
            <div className="absolute w-full h-1/2 bottom-0 left-0">
              <div className="absolute bottom-0 left-0 w-full h-full"
                style={{
                  background: 'linear-gradient(to top, rgba(255,0,0,0.8), rgba(255,165,0,0.6) 50%, rgba(255,255,0,0.4) 80%, transparent)',
                  animation: 'flameFlicker 3s infinite alternate'
                }}
              ></div>
              
              {/* Additional fire particles */}
              <div className="absolute -bottom-10 left-0 w-full h-[110%] overflow-hidden">
                <div className="fire-particles"></div>
              </div>
            </div>
            
            {/* Glow effect around the Earth */}
            <div className="absolute -inset-5 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,0,0,0.3) 0%, rgba(255,165,0,0.2) 30%, rgba(0,0,0,0) 70%)',
                filter: 'blur(20px)'
              }}
            ></div>
          </div>
        </div>

        {/* Atmospheric glow */}
        <div className="absolute left-1/2 top-1/2 w-[650px] h-[650px] rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(100,149,237,0.2) 0%, rgba(0,0,139,0.1) 50%, transparent 70%)',
            filter: 'blur(15px)'
          }}
        ></div>
      </div>
      
      {/* CSS for animations */}
      <style>{`
        @keyframes flameFlicker {
          0% { opacity: 0.8; transform: scaleY(1); }
          25% { opacity: 0.9; transform: scaleY(1.05); }
          50% { opacity: 0.7; transform: scaleY(0.95); }
          75% { opacity: 0.9; transform: scaleY(1.05); }
          100% { opacity: 0.8; transform: scaleY(1); }
        }
        
        .fire-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle, rgba(255,165,0,0.9) 10%, transparent 20%),
            radial-gradient(circle, rgba(255,69,0,0.8) 15%, transparent 25%),
            radial-gradient(circle, rgba(255,215,0,0.7) 20%, transparent 30%);
          background-size: 30px 30px, 40px 40px, 20px 20px;
          background-position: 0 0, 15px 15px, 5px 5px;
          animation: moveParticles 4s linear infinite;
        }
        
        @keyframes moveParticles {
          0% { background-position: 0 0, 15px 15px, 5px 5px; }
          100% { background-position: 30px 60px, 45px 75px, 35px 65px; }
        }
      `}</style>
    </div>
  );
}