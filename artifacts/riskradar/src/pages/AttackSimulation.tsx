import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Server, User, Terminal, Database, Mail, Link as LinkIcon, 
  Key, AlertCircle, ShieldOff, Play, RefreshCw, ChevronRight 
} from "lucide-react";

type AttackType = "phishing" | "sqli" | "mitm";

const ATTACKS = {
  phishing: {
    title: "Spear Phishing",
    description: "Attacker sends a fraudulent message designed to trick a person into revealing sensitive info.",
    steps: [
      { title: "Bait Crafted", desc: "Attacker spoofs a legitimate email (e.g., IT Dept).", icon: Mail, color: "text-accent" },
      { title: "Hook Deployed", desc: "Victim receives email urging immediate password reset.", icon: User, color: "text-blue-400" },
      { title: "Bite Taken", desc: "Victim clicks fake link, landing on a cloned login page.", icon: LinkIcon, color: "text-amber-400" },
      { title: "Catch Landed", desc: "Credentials entered. Attacker captures plain text password.", icon: Key, color: "text-destructive" }
    ],
    protection: "Verify sender addresses. Never click unsolicited password reset links. Use MFA."
  },
  sqli: {
    title: "SQL Injection",
    description: "Malicious SQL statements are inserted into entry fields for execution.",
    steps: [
      { title: "Vulnerability Found", desc: "Attacker finds login field that doesn't sanitize input.", icon: Terminal, color: "text-accent" },
      { title: "Payload Injected", desc: "Enters payload: admin' OR '1'='1", icon: ShieldOff, color: "text-amber-400" },
      { title: "Query Altered", desc: "Database executes altered query, bypassing auth logic.", icon: Database, color: "text-destructive" },
      { title: "Data Breached", desc: "Attacker gains admin access and dumps user table.", icon: Server, color: "text-destructive" }
    ],
    protection: "Use prepared statements/parameterized queries. Sanitize all user inputs."
  },
  mitm: {
    title: "Man-in-the-Middle",
    description: "Attacker secretly relays and alters communications between two parties.",
    steps: [
      { title: "Network Intercepted", desc: "Attacker sets up rogue Wi-Fi hotspot in coffee shop.", icon: Activity, color: "text-accent" },
      { title: "Victim Connects", desc: "User connects, believing it's the official network.", icon: User, color: "text-blue-400" },
      { title: "Traffic Sniffed", desc: "Attacker reads unencrypted traffic passing through router.", icon: AlertCircle, color: "text-amber-400" },
      { title: "Session Hijacked", desc: "Session cookies stolen, attacker impersonates user.", icon: Key, color: "text-destructive" }
    ],
    protection: "Only use HTTPS websites. Use a VPN on public Wi-Fi. Avoid rogue APs."
  }
};

// Need to import Activity here since it wasn't in the specific import list for this file
import { Activity } from "lucide-react";

export default function AttackSimulation() {
  const [activeAttack, setActiveAttack] = useState<AttackType>("phishing");
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const simulation = ATTACKS[activeAttack];

  const handlePlay = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    // Auto advance steps
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= simulation.steps.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2500);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-display font-bold text-glow-accent mb-4">Threat Simulation Chamber</h1>
        <p className="text-muted-foreground">Interactive visualizations of cyber attack vectors.</p>
      </div>

      {/* Selectors */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {(Object.keys(ATTACKS) as AttackType[]).map((type) => (
          <button
            key={type}
            onClick={() => { setActiveAttack(type); handleReset(); }}
            className={`px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 border ${
              activeAttack === type 
                ? 'bg-accent/20 border-accent text-accent box-glow-accent text-glow-accent' 
                : 'bg-black/50 border-white/10 text-muted-foreground hover:bg-white/5 hover:border-white/30'
            }`}
          >
            {ATTACKS[type].title}
          </button>
        ))}
      </div>

      <GlassCard className="mb-8 border-accent/20">
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{simulation.title}</h2>
            <p className="text-muted-foreground">{simulation.description}</p>
          </div>
          <div className="flex gap-4">
            <NeonButton 
              variant="outline" 
              onClick={handleReset}
              disabled={isPlaying}
              icon={<RefreshCw className="w-4 h-4" />}
            >
              Reset
            </NeonButton>
            <NeonButton 
              variant="accent" 
              onClick={handlePlay}
              disabled={isPlaying}
              icon={<Play className="w-4 h-4" />}
            >
              Simulate
            </NeonButton>
          </div>
        </div>

        {/* Visualizer Area */}
        <div className="relative min-h-[300px] bg-black/50 rounded-xl border border-white/5 p-8 flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden">
          
          {/* Connecting Line background */}
          <div className="absolute top-1/2 left-10 right-10 h-1 bg-white/5 -translate-y-1/2 z-0 hidden md:block"></div>

          {simulation.steps.map((step, idx) => {
            const isActive = idx === currentStep;
            const isPast = idx < currentStep;
            
            return (
              <div key={idx} className="relative z-10 flex flex-col items-center w-full md:w-1/4 text-center group">
                
                {/* Node */}
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ 
                    scale: isActive ? 1.2 : 1, 
                    opacity: isActive || isPast ? 1 : 0.4,
                    borderColor: isActive ? "rgba(176,38,255,1)" : "rgba(255,255,255,0.2)"
                  }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center border-2 mb-4 bg-background transition-colors duration-500 relative
                    ${isActive ? 'shadow-[0_0_30px_rgba(176,38,255,0.5)]' : ''}
                  `}
                >
                  <step.icon className={`w-8 h-8 ${step.color} ${isActive ? 'animate-pulse' : ''}`} />
                  
                  {/* Ping animation if active */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-full border border-accent animate-ping opacity-75"></span>
                  )}
                </motion.div>

                {/* Animated Line Connection for mobile */}
                {idx < simulation.steps.length - 1 && (
                  <div className="md:hidden w-1 h-8 bg-white/10 my-2 relative overflow-hidden">
                    {(isActive || isPast) && (
                      <motion.div 
                        initial={{ height: 0 }} 
                        animate={{ height: "100%" }} 
                        transition={{ duration: 0.5 }}
                        className="absolute top-0 w-full bg-accent"
                      />
                    )}
                  </div>
                )}
                
                {/* Text */}
                <motion.div 
                  animate={{ opacity: isActive || isPast ? 1 : 0.4 }}
                  className="h-24"
                >
                  <h4 className="font-bold text-sm mb-1 text-white">{step.title}</h4>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </motion.div>
                
              </div>
            );
          })}

          {/* Animated beam along the line for desktop */}
          {isPlaying && (
            <motion.div 
              className="absolute top-1/2 left-0 h-2 w-24 bg-accent blur-sm rounded-full -translate-y-1/2 z-0 hidden md:block"
              initial={{ x: "-100%" }}
              animate={{ x: "1000%" }}
              transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
            />
          )}

        </div>
      </GlassCard>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        key={activeAttack}
      >
        <GlassCard glowColor="success">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-success/20 rounded-xl text-success border border-success/50 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-success mb-2 uppercase tracking-wider text-glow-success">Defense Protocol</h3>
              <p className="text-white/80">{simulation.protection}</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

// Need to import ShieldCheck here since it wasn't in the specific import list
import { ShieldCheck } from "lucide-react";
