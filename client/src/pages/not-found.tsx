import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import MatrixBackground from "@/components/MatrixBackground";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-matrix-green overflow-hidden">
      <MatrixBackground />
      
      <motion.div 
        className="z-10 text-center flex flex-col items-center gap-8 p-8 rounded-lg bg-black/30 border border-matrix-green backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="font-share-tech text-5xl md:text-6xl lg:text-7xl mb-4">404</h1>
          <div className="font-mono text-lg md:text-xl typing-cursor">
            ERROR: SYSTEM DISCONNECTED
          </div>
        </motion.div>
        
        <motion.p 
          className="font-roboto-mono max-w-md text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          The path you attempted to access does not exist in the Matrix. Connection failed.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <Button asChild className="lang-btn border border-matrix-green rounded-md font-roboto-mono bg-transparent hover:bg-matrix-green hover:text-deep-black transition-all duration-300">
            <Link href="/">
              RETURN TO CONTROL PANEL
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
