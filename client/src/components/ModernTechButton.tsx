import { ReactNode, ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// Button varyantlarını ve özelliklerini oluşturmak için CVA kullanımı
const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-blue-800 text-white border border-blue-700/40 hover:bg-blue-700",
        secondary: "bg-gray-900 text-white border border-gray-800 hover:bg-gray-800",
        turkish: "bg-red-800 text-white border border-red-700/40 hover:bg-red-700",
        futuristic: "bg-indigo-800 text-white border border-indigo-700/40 hover:bg-indigo-700",
        outline: "bg-black border border-white/10 text-white hover:bg-black/80 hover:border-white/20",
        ghost: "bg-transparent text-white hover:bg-white/5 border-none"
      },
      size: {
        sm: "h-8 rounded px-3 py-1.5 text-xs",
        md: "h-9 rounded-sm px-4 py-2",
        lg: "h-10 rounded-sm px-5 py-2 text-base",
        xl: "h-11 rounded-sm px-6 py-2.5 text-lg"
      },
      glow: {
        none: "",
        subtle: "shadow-sm",
        strong: "shadow-sm",
      },
      border: {
        none: "",
        subtle: "border-opacity-10",
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
        className: "shadow-blue-500/20",
      },
      {
        glow: "subtle",
        variant: "turkish",
        className: "shadow-red-500/20",
      },
      {
        glow: "subtle",
        variant: "futuristic",
        className: "shadow-indigo-500/20",
      },
      {
        glow: "strong",
        variant: "primary",
        className: "shadow-blue-500/30 hover:shadow-blue-400/40",
      },
      {
        glow: "strong",
        variant: "turkish",
        className: "shadow-red-500/30 hover:shadow-red-400/40",
      },
      {
        glow: "strong",
        variant: "futuristic",
        className: "shadow-indigo-500/30 hover:shadow-indigo-400/40",
      },
      
      // Border efekti varyantları
      {
        border: "glowing",
        variant: "primary",
        className: "border border-blue-400/20",
      },
      {
        border: "glowing",
        variant: "turkish",
        className: "border border-red-400/20",
      },
      {
        border: "glowing",
        variant: "futuristic",
        className: "border border-indigo-400/20",
      },
      {
        border: "subtle",
        className: "border-opacity-20 hover:border-opacity-30",
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
          <span className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10">
            <svg
              className="animate-spin h-4 w-4 text-white/80"
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
        
        {/* İçerik */}
        <span className="relative z-1 flex items-center">
          {leftIcon && <span className="mr-2 opacity-80">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2 opacity-80">{rightIcon}</span>}
        </span>
      </button>
    );
  }
);