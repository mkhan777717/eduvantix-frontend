"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Activity, Award, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs  = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1)   return "Just now";
  if (mins < 60)  return `${mins}m ago`;
  if (hrs  < 24)  return `${hrs}h ago`;
  return `${days}d ago`;
}

// Activity Heatmap Component
const Heatmap = ({ data, totalActiveDays, maxStreak }) => {
  const weeks = 52;
  const days = 7;
  const today = new Date();
  
  // Generate last 365 days
  const grid = [];
  let currentDate = new Date(today);
  currentDate.setDate(currentDate.getDate() - (weeks * days) + 1);
  
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < days; d++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
      const count = data[dateStr] || 0;
      week.push({ date: dateStr, count });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    grid.push(week);
  }

  const getColor = (count) => {
    if (count === 0) return "var(--bg-primary)";
    if (count < 2) return "rgba(16, 185, 129, 0.3)";
    if (count < 4) return "rgba(16, 185, 129, 0.6)";
    if (count < 6) return "rgba(16, 185, 129, 0.8)";
    return "rgba(16, 185, 129, 1)";
  };

  return (
    <div className="p-6 rounded-3xl border shadow-sm space-y-6" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-card)" }}>
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <p className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>{totalActiveDays} submissions in the past year</p>
          <div className="flex items-center space-x-4 text-xs font-bold" style={{ color: "var(--text-primary)" }}>
            <div className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Total active days: {totalActiveDays}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span>Max streak: {maxStreak}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto custom-scrollbar pb-2">
        <div className="flex gap-1 min-w-max">
          {grid.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1">
              {week.map((day, dIdx) => (
                <div 
                  key={dIdx} 
                  className="w-3 h-3 rounded-[2px] transition-all hover:ring-1 ring-white/50 cursor-pointer"
                  style={{ backgroundColor: getColor(day.count) }}
                  title={`${day.count} submissions on ${day.date}`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3 text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
          <span>Learn</span>
          <div className="flex items-center space-x-1">
            <span>Less</span>
            <div className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: "var(--bg-primary)" }} />
            <div className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: "rgba(16, 185, 129, 0.3)" }} />
            <div className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: "rgba(16, 185, 129, 0.6)" }} />
            <div className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: "rgba(16, 185, 129, 0.8)" }} />
            <div className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: "rgba(16, 185, 129, 1)" }} />
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function StudentProfile() {
  const router = useRouter();
  const { user, token, API_BASE } = useAuth();
  
  const [stats, setStats] = useState(null);
  const [recentSubs, setRecentSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchData() {
      setLoading(true);
      const headers = {
        "Content-Type": "application/json",
        ...(token && !token.startsWith("demo-") && !token.startsWith("local-")
          ? { Authorization: `Bearer ${token}` }
          : { "x-bypass-auth": "true", "x-bypass-role": user.role === "ADMIN" ? "ADMIN" : "USER" }),
      };

      try {
        const statsRes = await fetch(`${API_BASE}/api/auth/student/stats`, { headers });
        if (statsRes.ok) {
          const data = await statsRes.json();
          if (data.success) setStats(data.stats);
        }

        const subsRes = await fetch(`${API_BASE}/api/submissions?userId=${user.id}`, { headers });
        if (subsRes.ok) {
          const data = await subsRes.json();
          if (data.success) {
            setRecentSubs((data.submissions || []).slice(0, 15));
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile stats:", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [user, token, API_BASE]);

  if (loading || !stats) {
    return (
      <div className="flex h-[60vh] items-center justify-center space-x-3 text-[var(--text-muted)]">
        <Activity size={20} className="animate-spin" />
        <span className="text-sm font-bold tracking-wider uppercase">Loading Profile...</span>
      </div>
    );
  }

  const { totalProblems, solvedProblems, languages, heatmap, streaks } = stats;
  
  const easyPct = totalProblems.easy ? (solvedProblems.easy / totalProblems.easy) * 100 : 0;
  const mediumPct = totalProblems.medium ? (solvedProblems.medium / totalProblems.medium) * 100 : 0;
  const hardPct = totalProblems.hard ? (solvedProblems.hard / totalProblems.hard) * 100 : 0;
  
  const totalSolved = solvedProblems.easy + solvedProblems.medium + solvedProblems.hard;
  
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* LEFT COLUMN: User Card */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="p-6 rounded-3xl border shadow-sm" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-card)" }}>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-indigo-500 text-white font-black text-3xl flex items-center justify-center shadow-lg">
                {user?.username?.[0]?.toUpperCase() || "S"}
              </div>
              <div>
                <h1 className="text-xl font-black" style={{ color: "var(--text-primary)" }}>{user?.username}</h1>
                <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Rank: ~10,000</p>
              </div>
            </div>
            <div className="space-y-4 pt-4 border-t" style={{ borderColor: "var(--border-primary)" }}>
              <button className="w-full py-2.5 rounded-xl font-bold text-xs bg-[var(--bg-primary)] hover:bg-[var(--border-primary)] transition-colors text-[var(--text-primary)]">
                Edit Profile
              </button>
            </div>
          </div>
          
          <div className="p-6 rounded-3xl border shadow-sm" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-card)" }}>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "var(--text-secondary)" }}>Community Stats</h2>
            <div className="space-y-4 text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
              <div className="flex items-center space-x-3">
                <Award size={16} className="text-amber-500" />
                <span>Views: <span className="font-black text-amber-500">0</span></span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap size={16} className="text-emerald-500" />
                <span>Reputation: <span className="font-black text-emerald-500">0</span></span>
              </div>
            </div>
          </div>
          
          <div className="p-6 rounded-3xl border shadow-sm" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-card)" }}>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "var(--text-secondary)" }}>Languages</h2>
            <div className="space-y-3">
              {languages.length > 0 ? languages.map(lang => (
                <div key={lang.language} className="flex items-center justify-between text-xs font-semibold">
                  <span className="px-2 py-1 rounded bg-[var(--bg-primary)] text-[var(--text-primary)] uppercase">{lang.language}</span>
                  <span className="text-[var(--text-secondary)]">
                    <span className="font-black text-[var(--text-primary)]">{lang.problemsSolved}</span> problems solved
                  </span>
                </div>
              )) : (
                <p className="text-xs text-[var(--text-muted)]">No languages used yet.</p>
              )}
            </div>
          </div>
        </div>
        
        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl border shadow-sm flex items-center justify-between" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-card)" }}>
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="50" stroke="var(--bg-primary)" strokeWidth="4" fill="transparent" />
                  <circle cx="56" cy="56" r="40" stroke="rgba(244, 63, 94, 0.2)" strokeWidth="4" fill="transparent" />
                  <circle cx="56" cy="56" r="40" stroke="#f43f5e" strokeWidth="4" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * hardPct) / 100} strokeLinecap="round" />
                  <circle cx="56" cy="56" r="45" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="4" fill="transparent" />
                  <circle cx="56" cy="56" r="45" stroke="#f59e0b" strokeWidth="4" fill="transparent" strokeDasharray="282.7" strokeDashoffset={282.7 - (282.7 * mediumPct) / 100} strokeLinecap="round" />
                  <circle cx="56" cy="56" r="50" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="4" fill="transparent" />
                  <circle cx="56" cy="56" r="50" stroke="#10b981" strokeWidth="4" fill="transparent" strokeDasharray="314.1" strokeDashoffset={314.1 - (314.1 * easyPct) / 100} strokeLinecap="round" />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-[var(--text-primary)]">{totalSolved}</span>
                  <span className="text-[9px] uppercase font-bold text-[var(--text-muted)]">Solved</span>
                </div>
              </div>
              <div className="flex-1 ml-6 space-y-3 text-xs font-semibold">
                <div className="flex justify-between items-center text-emerald-500">
                  <span>Easy</span>
                  <span><span className="font-black text-[var(--text-primary)]">{solvedProblems.easy}</span> / <span className="text-[var(--text-secondary)]">{totalProblems.easy}</span></span>
                </div>
                <div className="flex justify-between items-center text-amber-500">
                  <span>Medium</span>
                  <span><span className="font-black text-[var(--text-primary)]">{solvedProblems.medium}</span> / <span className="text-[var(--text-secondary)]">{totalProblems.medium}</span></span>
                </div>
                <div className="flex justify-between items-center text-rose-500">
                  <span>Hard</span>
                  <span><span className="font-black text-[var(--text-primary)]">{solvedProblems.hard}</span> / <span className="text-[var(--text-secondary)]">{totalProblems.hard}</span></span>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-3xl border shadow-sm flex flex-col items-center justify-center space-y-3" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-card)" }}>
              <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Award size={32} />
              </div>
              <h2 className="text-sm font-black text-[var(--text-primary)]">Badges</h2>
              <p className="text-xs text-[var(--text-muted)] text-center">0 Badges Earned. Participate in contests to earn them!</p>
            </div>
          </div>
          
          <Heatmap data={heatmap} totalActiveDays={streaks.totalActiveDays} maxStreak={streaks.max} />
          
          <div className="p-6 rounded-3xl border shadow-sm" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-card)" }}>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-6" style={{ color: "var(--text-secondary)" }}>Recent Submissions</h2>
            {recentSubs.length > 0 ? (
              <div className="space-y-4">
                {recentSubs.map((sub, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 rounded-2xl bg-[var(--bg-primary)] hover:scale-[1.01] transition-transform cursor-pointer border" style={{ borderColor: "var(--border-primary)" }} onClick={() => router.push(`/practice/${sub.problem?.slug || sub.problemId}`)}>
                    <div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">{sub.problem?.title || `Problem #${sub.problemId}`}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-1">{timeAgo(sub.createdAt)}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`text-[10px] font-black uppercase tracking-wider ${sub.status === 'ACCEPTED' ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {sub.status === 'ACCEPTED' ? 'Accepted' : 'Failed'}
                      </span>
                      <span className="px-2 py-1 rounded bg-[var(--bg-card)] border border-[var(--border-primary)] text-[10px] font-bold text-[var(--text-secondary)] uppercase">
                        {sub.language}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[var(--text-muted)] text-center py-6">No recent submissions found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
