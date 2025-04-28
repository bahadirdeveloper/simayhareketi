import { ReactNode, ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// Button varyantlarını ve özelliklerini oluşturmak için CVA kullanımı
const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-0.5",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-br from-blue-600 to-blue-800 text-white border border-blue-500/20 hover:from-blue-500 hover:to-blue-700",
        secondary: "bg-gradient-to-br from-gray-800 to-gray-900 text-white border border-blue-500/10 hover:border-blue-500/30",
        turkish: "bg-gradient-to-br from-red-600 to-red-800 text-white border border-red-500/20 hover:from-red-500 hover:to-red-700",
        futuristic: "bg-gradient-to-br from-indigo-600 to-violet-800 text-white border border-indigo-400/20 hover:from-indigo-500 hover:to-violet-700",
        outline: "bg-transparent border border-white/30 text-white hover:bg-white/10",
        ghost: "bg-transparent text-white hover:bg-white/10 border-none"
      },
      size: {
        sm: "h-9 px-3 py-2 text-xs",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-6 py-2.5 text-base",
        xl: "h-12 px-8 py-3 text-lg"
      },
      glow: {
        none: "",
        subtle: "shadow-lg",
        strong: "shadow-lg",
      },
      border: {
        none: "",
        subtle: "",
        glowing: "",
        animated: "animate-border-pulse",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      glow: "none",
      border: "none",
    },
    compoundVariants: [
      // Parlama efekti varyant kombinasyonları
      {
        glow: "subtle",
        variant: "primary",
        className: "shadow-blue-500/30",
      },
      {
        glow: "subtle",
        variant: "turkish",
        className: "shadow-red-500/30",
      },
      {
        glow: "subtle",
        variant: "futuristic",
        className: "shadow-indigo-500/30",
      },
      {
        glow: "strong",
        variant: "primary",
        className: "shadow-blue-500/50 hover:shadow-blue-400/60",
      },
      {
        glow: "strong",
        variant: "turkish",
        className: "shadow-red-500/50 hover:shadow-red-400/60",
      },
      {
        glow: "strong",
        variant: "futuristic",
        className: "shadow-indigo-500/50 hover:shadow-indigo-400/60 hover:shadow-lg",
      },
      
      // Border efekti varyantları
      {
        border: "glowing",
        variant: "primary",
        className: "border border-blue-400/30 animate-border-pulse-blue",
      },
      {
        border: "glowing",
        variant: "turkish",
        className: "border border-red-400/30 animate-border-pulse-red",
      },
      {
        border: "glowing",
        variant: "futuristic",
        className: "border border-indigo-400/30 animate-border-pulse-indigo",
      },
      {
        border: "subtle",
        className: "border-opacity-30 hover:border-opacity-60",
      },
    ],
  }
);

// ModernTechButton props interfacei
export interface ModernTechButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
}

// ModernTechButton bileşeni
export const ModernTechButton = forwardRef<HTMLButtonElement, ModernTechButtonProps>(
  (
    {
      className, 
      variant,
      size,
      glow,
      border,
      leftIcon,
      rightIcon,
      isLoading = false,
      children,
      ...props
    }, 
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({ 
            variant, 
            size, 
            glow,
            border,
            className 
          })
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg backdrop-blur-sm z-10">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          </span>
        )}
        
        {/* Parlama efektleri */}
        {glow === "strong" && (
          <span className="absolute inset-0 rounded-lg filter blur-md opacity-30 bg-inherit -z-10"></span>
        )}
        
        {/* İçerik */}
        <span className="relative z-1 flex items-center">
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </span>
      </button>
    );
  }
);