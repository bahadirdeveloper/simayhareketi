import { motion } from 'framer-motion';

export default function SimpleFuturisticTurkish() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Background color */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900"></div>
      
      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #e30a17 1px, transparent 1px),
            linear-gradient(to bottom, #e30a17 1px, transparent 1px)
          `,
          backgroundSize: '25px 25px',
        }}
      ></div>
      
      {/* Turkish red accent radial gradient */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-red-900/30 to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-red-900/30 to-transparent"></div>
      
      {/* Moving particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      
      {/* Red Turkish star - faint in background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
            fill="#e30a17" />
        </svg>
      </div>
      
      {/* Technology circuit pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgNTAwIDUwMCI+PHBhdGggZD0iTTAgMEg1MDAgVjUwMCBIMCBWMCBNMTAwIDAgVjUwMCBNMjAwIDAgVjUwMCBNMzAwIDAgVjUwMCBNNDAwIDAgVjUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCBNMCAxMDAgSDUwMCIgc3Ryb2tlPSIjMDAwMGZmIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIGZpbGw9Im5vbmUiLz48L3N2Zz4=')",
          backgroundSize: "500px 500px",
        }}
      ></div>
      
      {/* Floating elements with Turkish color */}
      <motion.div
        className="absolute right-10 top-20 w-20 h-20 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(227,10,23,0.2) 0%, rgba(227,10,23,0) 70%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      <motion.div
        className="absolute left-20 bottom-40 w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(227,10,23,0.15) 0%, rgba(227,10,23,0) 70%)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      />
      
      {/* Data flow lines */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i + "line"}
            className="absolute h-0.5 left-0 right-0"
            style={{
              top: `${10 + i * 20}%`,
              background: 'linear-gradient(90deg, transparent 0%, rgba(227,10,23,0.3) 50%, transparent 100%)',
              opacity: 0.1,
            }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>
    </div>
  );
}