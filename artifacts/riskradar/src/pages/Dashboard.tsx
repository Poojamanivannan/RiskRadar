import { useScans, useBreachChecks, useSecurityScore } from "@/hooks/use-local-storage";
import { GlassCard } from "@/components/GlassCard";
import { Shield, Activity, Lock, AlertTriangle, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Cell
} from "recharts";
import { formatDate } from "@/lib/utils";

export default function Dashboard() {
  const { scans } = useScans();
  const { checks } = useBreachChecks();
  const { score, breakdown } = useSecurityScore();

  const weakPasswords = scans.filter(s => s.passwordScore < 3).length;
  const breachesFound = checks.filter(c => c.isExposed).length;

  const scoreColor = score > 80 ? "#22c55e" : score > 50 ? "#f59e0b" : "#ff2a5f";
  
  const chartData = [
    { name: "Score", value: score, fill: scoreColor }
  ];

  const riskData = [
    { name: "Weak Passwords", value: weakPasswords, fill: "#00f0ff" },
    { name: "Exposed Emails", value: breachesFound, fill: "#ff2a5f" },
    { name: "Total Scans", value: scans.length, fill: "#b026ff" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-display font-bold text-glow-primary mb-2">Defense Posture</h1>
          <p className="text-muted-foreground">Aggregated analytics from your local session data.</p>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard hoverEffect glowColor={score > 50 ? "success" : "destructive"} className="flex flex-col items-center justify-center text-center py-8">
          <div className="w-32 h-32 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                cx="50%" cy="50%" 
                innerRadius="80%" outerRadius="100%" 
                barSize={10} data={chartData} 
                startAngle={90} endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar background={{ fill: 'rgba(255,255,255,0.05)' }} dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-display font-bold" style={{ color: scoreColor }}>
                {score}
              </span>
            </div>
          </div>
          <h3 className="mt-4 font-bold uppercase tracking-wider text-sm text-muted-foreground">Global Score</h3>
        </GlassCard>

        <GlassCard hoverEffect className="flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg text-primary">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Operations</p>
              <h3 className="text-3xl font-display font-bold">{scans.length + checks.length}</h3>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Scans & checks performed locally</p>
        </GlassCard>

        <GlassCard hoverEffect className="flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-amber-500/10 rounded-lg text-amber-500">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Weak Passwords</p>
              <h3 className="text-3xl font-display font-bold text-amber-500">{weakPasswords}</h3>
            </div>
          </div>
          <Link href="/scanner" className="text-xs text-primary hover:text-white flex items-center gap-1">
            Improve credentials <ArrowUpRight className="w-3 h-3" />
          </Link>
        </GlassCard>

        <GlassCard hoverEffect className="flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-destructive/10 rounded-lg text-destructive">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Known Breaches</p>
              <h3 className="text-3xl font-display font-bold text-destructive">{breachesFound}</h3>
            </div>
          </div>
          <Link href="/breach-checker" className="text-xs text-primary hover:text-white flex items-center gap-1">
            Verify exposures <ArrowUpRight className="w-3 h-3" />
          </Link>
        </GlassCard>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Charts */}
        <GlassCard className="lg:col-span-2">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> Risk Distribution
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#666" tick={{fill: '#888'}} />
                <YAxis stroke="#666" tick={{fill: '#888'}} allowDecimals={false} />
                <RechartsTooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#0f0f15', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Recent Activity */}
        <GlassCard>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent" /> Recent Events
          </h3>
          
          <div className="space-y-4 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
            {scans.length === 0 && checks.length === 0 ? (
              <div className="text-center text-muted-foreground py-10">No activity recorded yet.</div>
            ) : null}

            {/* Combine and sort latest 10 events */}
            {[
              ...scans.map(s => ({ ...s, type: 'scan', dateObj: new Date(s.date) })),
              ...checks.map(c => ({ ...c, type: 'breach', dateObj: new Date(c.date) }))
            ]
            .sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime())
            .slice(0, 10)
            .map((event, i) => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                key={event.id} 
                className="p-3 bg-white/5 border border-white/5 rounded-xl text-sm flex flex-col gap-2"
              >
                <div className="flex justify-between items-start">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    event.type === 'scan' ? 'bg-primary/20 text-primary' : 'bg-destructive/20 text-destructive'
                  }`}>
                    {event.type === 'scan' ? 'Pass Scan' : 'Breach Check'}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{formatDate(event.date)}</span>
                </div>
                
                {event.type === 'scan' ? (
                  <div className="flex justify-between items-center">
                    <span className="text-white truncate pr-2">{(event as any).url || 'Manual Input'}</span>
                    <span className={`shrink-0 font-bold ${
                      (event as any).passwordScore >= 3 ? 'text-success' : 'text-amber-500'
                    }`}>Score: {(event as any).passwordScore}/4</span>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-white truncate pr-2">{(event as any).email}</span>
                    <span className={`shrink-0 font-bold ${
                      (event as any).isExposed ? 'text-destructive' : 'text-success'
                    }`}>
                      {(event as any).isExposed ? 'Exposed' : 'Safe'}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
