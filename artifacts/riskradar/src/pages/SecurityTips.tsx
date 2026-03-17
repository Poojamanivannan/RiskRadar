import { GlassCard } from "@/components/GlassCard";
import { Key, Wifi, Smartphone, Globe, Mail, Fingerprint, Shield, Cpu } from "lucide-react";
import { motion } from "framer-motion";

const TIPS = [
  {
    category: "Passwords",
    icon: Key,
    title: "Use a Password Manager",
    description: "Don't rely on memory. Use a manager to generate and store unique, complex 16+ character passwords for every single site.",
    level: "Essential"
  },
  {
    category: "Authentication",
    icon: Fingerprint,
    title: "Enable Hardware MFA",
    description: "SMS codes can be intercepted (SIM swapping). Use authenticator apps (TOTP) or hardware keys (YubiKey) for critical accounts.",
    level: "Advanced"
  },
  {
    category: "Network",
    icon: Wifi,
    title: "Never Trust Public Wi-Fi",
    description: "Assume all public networks are compromised. Use a trusted VPN to encrypt your traffic before it leaves your device.",
    level: "Essential"
  },
  {
    category: "Devices",
    icon: Smartphone,
    title: "Keep Systems Patched",
    description: "Zero-day exploits are weaponized fast. Enable automatic OS and app updates to patch known vulnerabilities immediately.",
    level: "Essential"
  },
  {
    category: "Phishing",
    icon: Mail,
    title: "Verify the Origin",
    description: "Hover over links before clicking. Check the actual sender address, not just the display name. Don't open unexpected attachments.",
    level: "Essential"
  },
  {
    category: "Privacy",
    icon: Globe,
    title: "Minimize Digital Footprint",
    description: "Hackers use OSINT (Open Source Intelligence). Limit what you share publicly on social media. Fake answers to security questions.",
    level: "Advanced"
  },
  {
    category: "Physical",
    icon: Shield,
    title: "Lock Screens Automatically",
    description: "Set your devices to lock immediately when sleeping. Never leave laptops unlocked in public spaces. Use privacy screens.",
    level: "Basic"
  },
  {
    category: "Hardware",
    icon: Cpu,
    title: "Disable Unused Radios",
    description: "Turn off Bluetooth and Wi-Fi when not actively using them. It prevents automatic connections to spoofed networks or malicious pairing.",
    level: "Advanced"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function SecurityTips() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-display font-bold text-glow-primary mb-4">Hardening Protocols</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">Implement these operational security (OpSec) guidelines to dramatically reduce your attack surface.</p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {TIPS.map((tip, i) => (
          <motion.div key={i} variants={item}>
            <GlassCard hoverEffect className="h-full flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                  <tip.icon className="w-6 h-6 text-primary" />
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded border ${
                  tip.level === 'Basic' ? 'bg-white/10 border-white/20 text-white' :
                  tip.level === 'Essential' ? 'bg-primary/20 border-primary/30 text-primary' :
                  'bg-accent/20 border-accent/30 text-accent'
                }`}>
                  {tip.level}
                </span>
              </div>
              
              <div className="mb-2 text-xs font-bold text-primary tracking-widest uppercase">{tip.category}</div>
              <h3 className="text-lg font-bold text-white mb-3 leading-snug">{tip.title}</h3>
              <p className="text-sm text-muted-foreground mt-auto leading-relaxed">{tip.description}</p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
