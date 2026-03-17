import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { AlertTriangle, ShieldCheck, Mail, ServerCrash, Calendar, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBreachChecks } from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";

// Mock data simulating a backend DB of breached domains
const MOCK_BREACHED_DOMAINS = ["yahoo.com", "aol.com", "hotmail.com", "live.com"];
const MOCK_BREACH_DATA = [
  { name: "Collection #1", date: "Jan 2019", data: "Email addresses, Passwords" },
  { name: "LinkedIn", date: "May 2016", data: "Email addresses, Passwords" },
  { name: "Adobe", date: "Oct 2013", data: "Email addresses, Password hints, Passwords, Usernames" },
  { name: "Canva", date: "Oct 2013", data: "Email addresses, Passwords, Usernames" }
];

export default function BreachChecker() {
  const [email, setEmail] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const { addCheck } = useBreachChecks();
  const { toast } = useToast();

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({ title: "Invalid Input", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }

    setIsChecking(true);
    setResult(null);

    // Simulate network API call
    setTimeout(() => {
      const domain = email.split("@")[1]?.toLowerCase();
      
      // Pseudo-logic to determine if breached based on mock lists or random chance for effect
      const isDomainBreached = MOCK_BREACHED_DOMAINS.includes(domain);
      const isRandomHit = Math.random() > 0.6; // 40% chance of random hit for demo purposes
      
      const isExposed = isDomainBreached || isRandomHit;
      
      let breaches = [];
      if (isExposed) {
        // Assign 1-3 random breaches
        const count = Math.floor(Math.random() * 3) + 1;
        const shuffled = [...MOCK_BREACH_DATA].sort(() => 0.5 - Math.random());
        breaches = shuffled.slice(0, count);
      }

      const checkResult = addCheck({ email, isExposed, breaches });
      setResult(checkResult);
      setIsChecking(false);
      
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-display font-bold text-glow-destructive mb-4">Dark Web Breach Radar</h1>
        <p className="text-muted-foreground">Simulate checking your email against known massive data leaks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Search Panel */}
        <GlassCard glowColor="destructive" className="h-fit">
          <div className="mb-6">
            <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center border border-destructive/30 mb-4">
              <ServerCrash className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold">Query Leak Databases</h2>
            <p className="text-sm text-muted-foreground mt-2">Enter an email to check if it has been involved in any simulated public data breaches.</p>
          </div>

          <form onSubmit={handleCheck} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="target@domain.com"
                className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-lg text-foreground focus:outline-none focus:border-destructive focus:ring-1 focus:ring-destructive transition-all"
              />
            </div>
            <NeonButton 
              type="submit" 
              variant="destructive" 
              className="w-full py-4 text-lg"
              disabled={isChecking || !email}
            >
              {isChecking ? "Scanning Dark Web Nodes..." : "Initiate Trace"}
            </NeonButton>
          </form>
        </GlassCard>

        {/* Results Panel */}
        <div>
          <AnimatePresence mode="wait">
            {!result && !isChecking && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 glass-panel rounded-2xl border-dashed border-white/10"
              >
                <div className="w-24 h-24 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center mb-6 animate-[spin_10s_linear_infinite]">
                  <div className="w-16 h-16 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
                </div>
                <h3 className="text-xl font-bold text-white/50">Awaiting Target Designation</h3>
                <p className="text-sm text-muted-foreground mt-2">System standing by.</p>
              </motion.div>
            )}

            {isChecking && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 glass-panel rounded-2xl border-destructive/30"
              >
                <div className="w-24 h-24 relative mb-6">
                  <div className="absolute inset-0 border-4 border-destructive/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-destructive rounded-full border-t-transparent animate-spin"></div>
                  <AlertTriangle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-destructive animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-destructive text-glow-destructive">Executing Query...</h3>
                <div className="w-full bg-black/50 h-2 rounded-full mt-4 overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }} 
                    animate={{ width: "100%" }} 
                    transition={{ duration: 2, ease: "linear" }}
                    className="h-full bg-destructive"
                  />
                </div>
              </motion.div>
            )}

            {result && !isChecking && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="h-full"
              >
                {result.isExposed ? (
                  <GlassCard glowColor="destructive" className="h-full">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 bg-destructive/20 rounded-xl text-destructive border border-destructive/50">
                        <AlertTriangle className="w-8 h-8" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-destructive text-glow-destructive uppercase">Target Exposed</h2>
                        <p className="text-muted-foreground">{result.email} was found in {result.breaches.length} known breaches.</p>
                      </div>
                    </div>

                    <div className="space-y-4 mt-8">
                      <h3 className="font-display font-bold text-sm tracking-widest text-white/50 border-b border-white/10 pb-2">Breach Timeline</h3>
                      
                      {result.breaches.map((b: any, i: number) => (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2 }}
                          key={i} 
                          className="bg-black/40 border border-destructive/20 rounded-xl p-4 relative overflow-hidden group"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-destructive"></div>
                          
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg text-white">{b.name}</h4>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded">
                              <Calendar className="w-3 h-3" /> {b.date}
                            </span>
                          </div>
                          
                          <div className="flex items-start gap-2 mt-3 text-sm text-destructive/80">
                            <Database className="w-4 h-4 mt-0.5 shrink-0" />
                            <span><strong className="text-destructive">Compromised Data:</strong> {b.data}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </GlassCard>
                ) : (
                  <GlassCard glowColor="success" className="h-full flex flex-col items-center justify-center text-center p-12">
                    <div className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center border border-success/50 shadow-[0_0_30px_rgba(34,197,94,0.3)] mb-6">
                      <ShieldCheck className="w-12 h-12 text-success" />
                    </div>
                    <h2 className="text-3xl font-bold text-success uppercase tracking-wider mb-2">Target Secure</h2>
                    <p className="text-muted-foreground text-lg mb-6">No records found in the simulated breach database for <strong>{result.email}</strong>.</p>
                    <div className="px-4 py-2 bg-success/10 border border-success/30 rounded-lg text-success text-sm">
                      Note: Absence of evidence is not evidence of absence. Stay vigilant.
                    </div>
                  </GlassCard>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
