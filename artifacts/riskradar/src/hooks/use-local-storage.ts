import { useState, useEffect } from "react";

export interface ScanResult {
  id: string;
  date: string;
  url: string;
  email: string;
  passwordScore: number;
  crackTime: string;
  feedback: string[];
}

export interface BreachResult {
  id: string;
  date: string;
  email: string;
  isExposed: boolean;
  breaches: { name: string; date: string; data: string }[];
}

export function useScans() {
  const [scans, setScans] = useState<ScanResult[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("riskradar_scans");
    if (stored) {
      try {
        setScans(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse scans", e);
      }
    }
  }, []);

  const addScan = (scan: Omit<ScanResult, "id" | "date">) => {
    const newScan: ScanResult = {
      ...scan,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
    };
    const updated = [newScan, ...scans].slice(0, 50); // Keep last 50
    setScans(updated);
    localStorage.setItem("riskradar_scans", JSON.stringify(updated));
    return newScan;
  };

  const clearScans = () => {
    setScans([]);
    localStorage.removeItem("riskradar_scans");
  };

  return { scans, addScan, clearScans };
}

export function useBreachChecks() {
  const [checks, setChecks] = useState<BreachResult[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("riskradar_breach_checks");
    if (stored) {
      try {
        setChecks(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse breach checks", e);
      }
    }
  }, []);

  const addCheck = (check: Omit<BreachResult, "id" | "date">) => {
    const newCheck: BreachResult = {
      ...check,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
    };
    const updated = [newCheck, ...checks].slice(0, 50);
    setChecks(updated);
    localStorage.setItem("riskradar_breach_checks", JSON.stringify(updated));
    return newCheck;
  };

  const clearChecks = () => {
    setChecks([]);
    localStorage.removeItem("riskradar_breach_checks");
  };

  return { checks, addCheck, clearChecks };
}

// Utility to calculate global security score
export function useSecurityScore() {
  const { scans } = useScans();
  const { checks } = useBreachChecks();

  let score = 100;
  let breakdown = { passwords: 0, breaches: 0, reuse: 0 };

  // Penalize for breaches
  const uniqueBreachedEmails = new Set(checks.filter(c => c.isExposed).map(c => c.email));
  if (uniqueBreachedEmails.size > 0) {
    const penalty = uniqueBreachedEmails.size * 15;
    score -= penalty;
    breakdown.breaches = penalty;
  }

  // Penalize for weak passwords
  const recentScans = scans.slice(0, 10);
  let weakCount = 0;
  recentScans.forEach(s => {
    if (s.passwordScore < 3) weakCount++;
  });
  
  if (weakCount > 0) {
    const penalty = weakCount * 5;
    score -= penalty;
    breakdown.passwords = penalty;
  }

  return {
    score: Math.max(0, Math.min(100, score)),
    breakdown
  };
}
