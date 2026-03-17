import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "primary" | "accent" | "destructive" | "success" | "none";
  hoverEffect?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  glowColor = "none",
  hoverEffect = false
}: GlassCardProps) {
  
  const glowMap = {
    primary: "hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]",
    accent: "hover:border-accent/50 hover:shadow-[0_0_30px_rgba(176,38,255,0.15)]",
    destructive: "hover:border-destructive/50 hover:shadow-[0_0_30px_rgba(255,42,95,0.15)]",
    success: "hover:border-success/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]",
    none: "hover:border-white/20"
  };

  return (
    <div 
      className={cn(
        "glass-panel rounded-2xl p-6 relative overflow-hidden transition-all duration-500",
        hoverEffect && "hover:-translate-y-1",
        hoverEffect && glowMap[glowColor],
        className
      )}
    >
      {/* Decorative corner glow if color is specified */}
      {glowColor !== "none" && (
        <div className={cn(
          "absolute -top-10 -right-10 w-32 h-32 blur-[50px] opacity-20 pointer-events-none",
          glowColor === "primary" ? "bg-primary" : 
          glowColor === "accent" ? "bg-accent" : 
          glowColor === "destructive" ? "bg-destructive" : "bg-success"
        )} />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
