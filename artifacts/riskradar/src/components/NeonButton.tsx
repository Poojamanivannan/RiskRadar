import { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: ReactNode;
}

export function NeonButton({ 
  children, 
  variant = "primary", 
  size = "md", 
  className, 
  icon,
  ...props 
}: NeonButtonProps) {
  
  const baseStyles = "relative inline-flex items-center justify-center font-display tracking-wider font-bold transition-all duration-300 rounded-xl overflow-hidden group outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background";
  
  const variants = {
    primary: "bg-primary/10 text-primary border border-primary/50 hover:bg-primary/20 hover:border-primary hover:text-glow-primary hover:box-glow-primary focus:ring-primary",
    accent: "bg-accent/10 text-accent border border-accent/50 hover:bg-accent/20 hover:border-accent hover:text-glow-accent hover:box-glow-accent focus:ring-accent",
    outline: "bg-transparent border border-white/20 text-foreground hover:bg-white/5 hover:border-white/40 focus:ring-white/50",
    ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent focus:ring-white/50"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs gap-2",
    md: "px-6 py-3 text-sm gap-3",
    lg: "px-8 py-4 text-base gap-4"
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {/* Glint effect on hover */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
      
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
