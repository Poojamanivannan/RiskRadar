import { useState, useEffect } from "react";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { Shield, ShieldAlert, ShieldCheck, Search, KeyRound, Globe, Mail } from "lucide-react";
import zxcvbn from "zxcvbn";
import { motion } from "framer-motion";
import { useScans } from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";

export default function Scanner() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [score, setScore] = useState<number>(0);
  const [crackTime, setCrackTime] = useState<string>("");
  const [feedback, setFeedback] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  
  const { addScan, scans } = useScans();
  const { toast } = useToast();

  useEffect(() => {
    if (password) {
      const result = zxcvbn(password);
      setScore(result.score); // 0-4
      setCrackTime(result.crack_times_display.offline_slow_hashing_1e4_per_second);
      
      const newFeedback = [];
      if (result.feedback.warning) newFeedback.push(result.feedback.warning);
      result.feedback.suggestions.forEach(s => newFeedback.push(s));
      
      // Check for reuse locally
      const reused = scans.some(s => s.passwordScore === result.score && s.url !== url && s.url !== "");
      if (reused) {
        newFeedback.push("WARNING: This password pattern appears similar to a previous scan. Avoid reuse.");
      }
      
      if (newFeedback.length === 0 && result.score >= 3) {
        newFeedback.push("Looks good. Strong and complex.");
      }
      
      setFeedback(newFeedback);
    } else {
      setScore(0);
      setCrackTime("");
      setFeedback([]);
    }
  }, [password, scans, url]);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      toast({ title: "Input Required", description: "Please enter a password to analyze.", variant: "destructive" });
      return;
    }
    
    setIsScanning(true);
    setScanned(false);
    
    // Simulate network delay for dramatic effect
    setTimeout(() => {
      addScan({
        url: url || "Unknown Target",
        email: email || "Anonymous",
        passwordScore: score,
        crackTime,
        feedback
      });
      
      setIsScanning(false);
      setScanned(true);
      
      toast({
        title: "Scan Complete",
        description: "Results saved to local history.",
      });
    }, 1500);
  };

  const getScoreColor = () => {
    if (score === 0 || score === 1) return "bg-destructive border-destructive shadow-[0_0_15px_rgba(255,42,95,0.5)]";
    if (score === 2) return "bg-amber-500 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]";
    if (score === 3) return "bg-primary border-primary shadow-[0_0_15px_rgba(0,240,255,0.5)]";
    return "bg-success border-success shadow-[0_0_15px_rgba(34,197,94,0.5)]";
  };

  const getScoreLabel = () => {
    if (score === 0) return "Critically Weak";
    if (score === 1) return "Weak";
    if (score === 2) return "Moderate";
    if (score === 3) return "Strong";
    return "Very Strong";
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-display font-bold text-glow-primary mb-4">Vulnerability Scanner</h1>
        <p className="text-muted-foreground">Analyze credentials locally. Your data never leaves the browser.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-7">
          <GlassCard glowColor="primary" className="h-full">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <Search className="w-5 h-5 text-primary" />
              Target Parameters
            </h2>
            
            <form onSubmit={handleScan} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Target URL (Optional)
                </label>
                <input 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Associated Email (Optional)
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@domain.com"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <KeyRound className="w-4 h-4" /> Password to Analyze
                </label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-white/20"
                />
              </div>

              <NeonButton 
                type="submit" 
                className="w-full mt-4" 
                disabled={isScanning || !password}
              >
                {isScanning ? (
                  <span className="flex items-center gap-2">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Search className="w-4 h-4" />
                    </motion.div>
                    Analyzing Cryptography...
                  </span>
                ) : (
                  "Execute Scan"
                )}
              </NeonButton>
            </form>
          </GlassCard>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5">
          <GlassCard className="h-full flex flex-col">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-accent" />
              Analysis Real-time
            </h2>

            <div className="flex-1 flex flex-col justify-center">
              {password ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {/* Score Meter */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm text-muted-foreground uppercase tracking-wider">Entropy Score</span>
                      <span className={`font-display font-bold text-xl ${
                        score < 2 ? 'text-destructive' : score === 2 ? 'text-amber-500' : 'text-success'
                      }`}>
                        {score}/4 - {getScoreLabel()}
                      </span>
                    </div>
                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden flex gap-1 p-0.5">
                      {[0, 1, 2, 3].map((segment) => (
                        <motion.div
                          key={segment}
                          initial={{ width: 0 }}
                          animate={{ width: "25%" }}
                          transition={{ delay: segment * 0.1 }}
                          className={`h-full rounded-sm transition-colors duration-300 ${
                            score >= segment + 1 ? getScoreColor() : 'bg-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Crack Time */}
                  <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Est. Crack Time (Offline)</p>
                    <p className="font-display text-2xl text-glow-primary">{crackTime || "Instant"}</p>
                  </div>

                  {/* Feedback */}
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">AI Suggestions</p>
                    <ul className="space-y-3">
                      {feedback.length > 0 ? (
                        feedback.map((f, i) => (
                          <motion.li 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            key={i} 
                            className="flex items-start gap-2 text-sm"
                          >
                            {score < 3 ? (
                              <ShieldAlert className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                            ) : (
                              <ShieldCheck className="w-4 h-4 text-success mt-0.5 shrink-0" />
                            )}
                            <span className="text-white/80">{f}</span>
                          </motion.li>
                        ))
                      ) : (
                        <li className="text-sm text-muted-foreground">Awaiting input...</li>
                      )}
                    </ul>
                  </div>

                </div>
              ) : (
                <div className="text-center text-muted-foreground opacity-50 py-12">
                  <KeyRound className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Enter a password to begin real-time cryptographic analysis.</p>
                </div>
              )}
            </div>

            {scanned && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-3 bg-primary/10 border border-primary/30 rounded-xl text-center text-sm text-primary flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" /> Logged to local defense registry
              </motion.div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
