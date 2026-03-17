import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { 
  Shield, 
  Menu, 
  X, 
  Home, 
  ScanSearch, 
  LayoutDashboard, 
  AlertTriangle, 
  Zap, 
  Lightbulb, 
  Info 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/scanner", label: "Scanner", icon: ScanSearch },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/breach-checker", label: "Breach Check", icon: AlertTriangle },
  { href: "/attack-simulation", label: "Simulations", icon: Zap },
  { href: "/security-tips", label: "Tips", icon: Lightbulb },
  { href: "/about", label: "About", icon: Info },
];

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Global Background Grid */}
      <div className="fixed inset-0 pointer-events-none z-[-1] cyber-grid opacity-30"></div>
      
      {/* Navbar */}
      <header 
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          scrolled ? "glass-panel-heavy py-3" : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Shield className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300 relative z-10" />
                <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-accent/40 transition-colors duration-300 rounded-full"></div>
              </div>
              <span className="font-display text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                RiskRadar
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-md">
              {NAV_ITEMS.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 relative",
                      isActive 
                        ? "text-primary text-glow-primary" 
                        : "text-muted-foreground hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-primary/10 border border-primary/30 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-4"
          >
            <nav className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className={cn(
                      "p-4 rounded-xl flex items-center gap-4 text-lg font-medium border transition-all",
                      isActive 
                        ? "bg-primary/10 border-primary/30 text-primary text-glow-primary" 
                        : "bg-white/5 border-transparent text-muted-foreground hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <item.icon className="w-6 h-6" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          key={location}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/5 bg-background/50 backdrop-blur-sm py-8 relative z-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground text-sm flex flex-col items-center gap-2">
          <Shield className="w-6 h-6 opacity-50" />
          <p>RiskRadar © {new Date().getFullYear()}. Client-side security awareness tool.</p>
          <p className="text-xs opacity-50">Data stays in your browser.</p>
        </div>
      </footer>
    </div>
  );
}
