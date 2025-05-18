import React from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ModernTechButton } from './ModernTechButton';

export function NavButtons() {
  const [, navigate] = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 mb-6"
    >
      <ModernTechButton 
        variant="turkish"
        size="lg"
        glow="none"
        border="subtle"
        onClick={() => navigate("/turkiye")}
        className="min-w-[150px]"
      >
        TÜRKİYE
      </ModernTechButton>
      
      <ModernTechButton 
        variant="primary"
        size="lg"
        glow="none"
        border="subtle"
        onClick={() => navigate("/manifesto")}
        className="min-w-[150px]"
      >
        MANİFESTO
      </ModernTechButton>
      
      <ModernTechButton 
        variant="primary"
        size="lg"
        glow="none"
        border="subtle"
        onClick={() => navigate("/cagri")}
        className="min-w-[150px]"
      >
        ÇAĞRI
      </ModernTechButton>
      
      <ModernTechButton 
        variant="futuristic"
        size="lg"
        glow="none"
        border="subtle"
        onClick={() => navigate("/katil")}
        className="min-w-[150px]"
      >
        KATIL & GÖREV
      </ModernTechButton>
    </motion.div>
  );
}

export default NavButtons;