import { GlassCard } from "@/components/GlassCard";
import { Shield, Lock, Terminal, Database } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-6 border border-primary/30 shadow-[0_0_30px_rgba(0,240,255,0.2)]">
          <Shield className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-5xl font-display font-bold text-glow-primary mb-4">RiskRadar V1.0</h1>
        <p className="text-xl text-muted-foreground">Client-Side Security Intelligence</p>
      </div>

      <GlassCard>
        <h2 className="text-2xl font-bold mb-4">The Mission</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          RiskRadar was built to democratize cybersecurity awareness. Many security tools require you to send your sensitive data—like passwords or emails—to their servers for analysis. 
          This inherently creates a new security risk. RiskRadar flips this paradigm.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          <strong>Everything runs in your browser.</strong> Cryptographic analysis, breach simulations, and local history are entirely contained within your machine's volatile memory and local storage. No backends. No databases. No tracking.
        </p>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="text-center p-8">
          <Terminal className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="font-bold mb-2">zxcvbn Engine</h3>
          <p className="text-sm text-muted-foreground">Industry-standard password strength estimation algorithm developed by Dropbox, running via WebAssembly/JS.</p>
        </GlassCard>

        <GlassCard className="text-center p-8">
          <Lock className="w-8 h-8 text-accent mx-auto mb-4" />
          <h3 className="font-bold mb-2">Zero-Knowledge</h3>
          <p className="text-sm text-muted-foreground">Your inputs never cross the network boundary. Perfect isolation for testing credentials safely.</p>
        </GlassCard>

        <GlassCard className="text-center p-8">
          <Database className="w-8 h-8 text-destructive mx-auto mb-4" />
          <h3 className="font-bold mb-2">Local Storage</h3>
          <p className="text-sm text-muted-foreground">History is saved to your browser's LocalStorage API. Clearing your browser data wipes RiskRadar clean.</p>
        </GlassCard>
      </div>

      <GlassCard className="border-destructive/30 bg-destructive/5 mt-12 text-center p-8">
        <h3 className="text-xl font-bold text-destructive mb-2 uppercase tracking-widest">Disclaimer</h3>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          RiskRadar is an educational tool. The breach checker uses simulated/mock data to demonstrate functionality without making external API calls to real breach databases. Do not rely on this tool for definitive enterprise security auditing.
        </p>
      </GlassCard>
    </div>
  );
}
