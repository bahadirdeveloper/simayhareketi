import { ReactNode, ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// Button varyantlarını ve özelliklerini oluşturmak için CVA kullanımı - daha formal görünüm için güncellendi
const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 interactive-glow",
  {
    variants: {
      variant: {
        primary: "bg-blue-800 text-white border-[1px] border-blue-700/40 hover:bg-blue-700/90",
        secondary: "bg-gray-900 text-white border-[1px] border-gray-800 hover:bg-gray-800/90",
        turkish: "bg-red-800 text-white border-[1px] border-red-700/40 hover:bg-red-700/90",
        futuristic: "bg-indigo-800 text-white border-[1px] border-indigo-700/40 hover:bg-indigo-700/90",
        outline: "bg-black/80 border-[1px] border-white/20 text-white hover:bg-black/70",
        ghost: "bg-transparent text-white hover:bg-white/5 border-none"
      },
      size: {
        sm: "h-8 rounded-[2px] px-3 py-1.5 text-xs",
        md: "h-9 rounded-[2px] px-4 py-2",
        lg: "h-10 rounded-[2px] px-5 py-2 text-sm tracking-wide",
        xl: "h-11 rounded-[2px] px-6 py-2.5 text-base tracking-wide"
      },
      glow: {
        none: "",
        subtle: "shadow-none",
        strong: "shadow-none",
      },
      border: {
        none: "",
        subtle: "border-opacity-20",
        glowing: "",
        animated: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      glow: "none",
      border: "none",
    },
    compoundVariants: [
      // Daha ciddi ve düz renkli varyantlar için renkler
      {
        variant: "primary",
        className: "bg-blue-700 border-blue-600/60",
      },
      {
        variant: "turkish",
        className: "bg-red-700 border-red-600/60",
      },
      {
        variant: "futuristic",
        className: "bg-indigo-700 border-indigo-600/60",
      },
      
      // Border efekti varyantları - daha ince ve daha profesyonel
      {
        border: "glowing",
        variant: "primary",
        className: "border-[1px] border-blue-500/40",
      },
      {
        border: "glowing",
        variant: "turkish",
        className: "border-[1px] border-red-500/40",
      },
      {
        border: "glowing",
        variant: "futuristic",
        className: "border-[1px] border-indigo-500/40",
      },
      {
        border: "subtle",
        className: "border-opacity-30 hover:border-opacity-40",
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

// ModernTechButton bileşeni - daha profesyonel görünüm için güncellendi
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
        
        {/* İçerik - daha profesyonel görünüm için güncellendi */}
        <div className="relative z-1 flex items-center justify-center">
          {leftIcon && (
            <span className="mr-2.5 flex items-center justify-center">
              {leftIcon}
            </span>
          )}
          <span className="font-medium tracking-wide">{children}</span>
          {rightIcon && (
            <span className="ml-2.5 flex items-center justify-center">
              {rightIcon}
            </span>
          )}
        </div>
      </button>
    );
  }
);