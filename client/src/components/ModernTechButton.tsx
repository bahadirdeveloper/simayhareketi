import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button as ShadcnButton } from "@/components/ui/button";

/**
 * Teknolojik, modern buton bileşeni
 * Türk Cumhuriyeti Güncellenme Platformu için özel tasarlanmış buton
 */

const buttonVariants = cva(
  "relative overflow-hidden group inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        // Ana buton stili (Yeni, parlak, modern görünüm)
        primary: "bg-gradient-to-r from-blue-700 to-indigo-800 text-white hover:shadow-[0_0_15px_rgba(66,153,225,0.5)] shadow-lg hover:shadow-blue-500/20",
        
        // İkincil buton stili (Kırmızı temalı Türk renkleri)
        secondary: "bg-gradient-to-r from-red-700 to-red-900 text-white hover:shadow-[0_0_15px_rgba(229,62,62,0.5)] shadow-lg hover:shadow-red-500/20",
        
        // Daha nötr, minimal buton 
        outline: "border-2 border-gray-300 bg-transparent hover:bg-gray-100/10 text-gray-100",
        
        // Hayalet buton
        ghost: "bg-transparent text-gray-300 hover:bg-gray-800/30 hover:text-white",
        
        // Teknolojik, gelecek temalı buton
        futuristic: "bg-black border border-blue-500/50 text-blue-400 hover:border-blue-400 hover:text-blue-300 shadow-[0_0_10px_rgba(66,153,225,0.2)] hover:shadow-[0_0_15px_rgba(66,153,225,0.4)]",
        
        // İptal/Sil butonları için
        destructive: "bg-red-900/80 text-white hover:bg-red-800",

        // Türk bayrağı renklerinde
        turkish: "bg-gradient-to-r from-red-600 to-red-800 text-white hover:shadow-[0_0_15px_rgba(229,62,62,0.5)] shadow-lg hover:shadow-red-500/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
        xl: "h-14 rounded-md px-10 text-lg",
      },
      glow: {
        none: "",
        subtle: "after:content-[''] after:absolute after:inset-0 after:z-[-1] after:rounded-md after:bg-gradient-to-r after:from-blue-500/30 after:to-indigo-500/30 after:blur-xl after:opacity-0 hover:after:opacity-100 after:transition-opacity",
        strong: "after:content-[''] after:absolute after:inset-0 after:z-[-1] after:rounded-md after:bg-gradient-to-r after:from-blue-500/50 after:to-indigo-500/50 after:blur-xl after:opacity-0 hover:after:opacity-100 after:transition-opacity",
      },
      border: {
        none: "",
        subtle: "before:content-[''] before:absolute before:inset-0 before:rounded-md before:border before:border-blue-500/50 before:transition-colors hover:before:border-blue-400",
        glowing: "before:content-[''] before:absolute before:inset-0 before:rounded-md before:border before:border-blue-500/50 before:transition-all hover:before:border-blue-400 hover:before:shadow-[0_0_10px_rgba(66,153,225,0.5)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      glow: "none",
      border: "none",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  glassmorphism?: boolean;
}

/**
 * Modern, teknolojik buton bileşeni
 */
const ModernTechButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    glow,
    border,
    leftIcon, 
    rightIcon,
    glassmorphism = false,
    children, 
    ...props 
  }, ref) => {
    // Buton içeriğini hazırla
    const buttonContent = (
      <>
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        <span className="relative z-10">{children}</span>
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
        
        {/* Animasyon efekti için gizli div */}
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-black/0 via-white/10 to-black/0 opacity-0 group-hover:opacity-100 group-hover:animate-sweep transition-opacity duration-1000"></span>
      </>
    );

    return (
      <ShadcnButton
        className={cn(
          buttonVariants({ variant, size, glow, border, className }),
          glassmorphism && "backdrop-blur-sm bg-opacity-70",
        )}
        ref={ref}
        {...props}
      >
        {buttonContent}
      </ShadcnButton>
    );
  }
);

ModernTechButton.displayName = "ModernTechButton";

export { ModernTechButton, buttonVariants };