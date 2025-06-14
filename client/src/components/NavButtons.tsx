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
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4 mb-6 max-w-4xl mx-auto"
    >
      {[
        { path: "/turkiye", text: "TÜRKİYE", variant: "turkish", isExternal: false },
        { path: "/attached_assets/amaclar.html", text: "MANİFESTO", variant: "primary", isExternal: true },
        { path: "/cagri", text: "ÇAĞRI", variant: "primary", isExternal: false },
        { path: "/katil", text: "KATIL", variant: "futuristic", isExternal: false },
        { path: "/gorevler", text: "GÖREV", variant: "futuristic", isExternal: false }
      ].map((button, index) => (
        <ModernTechButton 
          key={button.path}
          variant={button.variant as any}
          size="md"
          glow="none"
          border="subtle"
          onClick={() => button.isExternal ? window.open(button.path, "_blank") : navigate(button.path)}
          className="min-w-[110px] sm:min-w-[130px] touch-target text-sm sm:text-base py-2 sm:py-3"
        >
          {button.text}
        </ModernTechButton>
      ))}
    </motion.div>
  );
}

export default NavButtons;