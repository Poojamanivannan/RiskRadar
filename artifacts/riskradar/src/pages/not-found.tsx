import { Link } from "wouter";
import { NeonButton } from "@/components/NeonButton";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring" }}
      >
        <div className="relative mb-8">
          <h1 className="text-[120px] font-display font-bold text-destructive/20 select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <AlertCircle className="w-24 h-24 text-destructive drop-shadow-[0_0_15px_rgba(255,42,95,0.8)]" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-4">Sector Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The routing table does not contain coordinates for this sector. 
          The data may have been deleted, or the access path is restricted.
        </p>

        <Link href="/">
          <NeonButton variant="primary" size="lg">
            Return to Main Terminal
          </NeonButton>
        </Link>
      </motion.div>
    </div>
  );
}
