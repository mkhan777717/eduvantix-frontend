"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, Trophy, LogOut, 
  Menu, X, ChevronLeft, ChevronRight, BookOpen, ArrowLeftRight, Code, Brain, Radio, AlertTriangle, FileText, Gamepad2, FileCheck, Activity, Settings, Paintbrush
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

export default function StudentLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout, user, token, API_BASE } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [studentUser, setStudentUser] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [roleName, setRoleName] = useState("Scholar");

  useEffect(() => {
    if (!user) return;

    async function fetchRank() {
      const headers = {
        "Content-Type": "application/json",
        ...(token && !token.startsWith("demo-") && !token.startsWith("local-")
          ? { Authorization: `Bearer ${token}` }
          : { "x-bypass-auth": "true", "x-bypass-role": user.role === "ADMIN" ? "ADMIN" : "USER" }),
      };

      try {
        const subRes = await fetch(`${API_BASE}/api/submissions?userId=${user.id}`, { headers });
        let uniqueSolved = 0;
        if (subRes.ok) {
          const subData = await subRes.json();
          if (subData.success) {
            const accepted = (subData.submissions || []).filter(s => s.status === "ACCEPTED");
            uniqueSolved = new Set(accepted.map(s => s.problemId)).size;
          }
        }

        const contestRes = await fetch(`${API_BASE}/api/contests`, { headers });
        let bestScore = 0;
        if (contestRes.ok) {
          const contestData = await contestRes.json();
          if (contestData.success) {
            const myParticipations = (contestData.contests || []).filter(c =>
              c.userParticipation && c.userParticipation.completed
            );
            bestScore = myParticipations.length > 0
              ? Math.max(...myParticipations.map(c => c.userParticipation?.score || 0))
              : 0;
          }
        }

        const points = uniqueSolved * 10 + bestScore;

        const RANKS = [
          { name: "Novice Scholar", minPoints: 0, maxPoints: 100 },
          { name: "Bronze Scholar", minPoints: 100, maxPoints: 200 },
          { name: "Silver Scholar", minPoints: 200, maxPoints: 300 },
          { name: "Gold Scholar", minPoints: 300, maxPoints: 400 },
          { name: "Elite Scholar III", minPoints: 400, maxPoints: 500 },
          { name: "Elite Scholar II", minPoints: 500, maxPoints: 600 },
          { name: "Elite Scholar I", minPoints: 600, maxPoints: 750 },
          { name: "Grandmaster Scholar", minPoints: 750, maxPoints: 1000 },
          { name: "Legendary Coder", minPoints: 1000, maxPoints: Infinity }
        ];

        const matchedRank = RANKS.find(r => points >= r.minPoints && points < r.maxPoints) || RANKS[0];
        setRoleName(matchedRank.name);
      } catch (e) {
        console.error("Failed to fetch user rank for layout:", e);
      }
    }

    fetchRank();
  }, [user, token, API_BASE]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const studentSession = localStorage.getItem("synapse_student_session") === "true";
      const isLoginRoute = pathname === "/student";

      if (!studentSession) {
        router.push("/login?redirect=/student/dashboard");
      } else if (isLoginRoute) {
        router.push("/student/dashboard");
      } else {
        const name = user?.username || "DMX Student";
        const email = user?.email || "student@synapse.com";
        const avatar = name.slice(0, 2).toUpperCase();

        setStudentUser({
          name,
          email,
          role: roleName,
          avatar
        });
      }
      setCheckingAuth(false);
    }
  }, [pathname, router, user, roleName]);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const isLoginRoute = pathname === "/student";

  if (checkingAuth) {
    return (
      <div className="flex h-screen items-center justify-center" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 rounded-full border-t-transparent animate-spin mx-auto" style={{ borderColor: "var(--text-accent)" }} />
          <p className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>Verifying authorization...</p>
        </div>
      </div>
    );
  }

  // For the login page, render without sidebar/layout frame
  if (isLoginRoute) {
    return <>{children}</>;
  }

  const sidebarLinks = [
    {
      label: "Dashboard",
      href: "/student/dashboard",
      icon: LayoutDashboard
    },
    {
      label: "Practice Arena",
      href: "/practice",
      icon: Code
    },
    {
      label: "Contest Arena",
      href: "/contest",
      icon: Trophy
    },
    {
      label: "Course Catalog",
      href: "/courses",
      icon: BookOpen
    },
    {
      label: "AI Viva",
      href: "/student/viva",
      icon: Brain
    },
    {
      label: "Live Sessions",
      href: "/live-classes",
      icon: Radio
    },
    {
      label: "Learn with Games",
      href: "/student/games",
      icon: Gamepad2
    },
    {
      label: "Study Materials",
      href: "/student/materials",
      icon: FileText
    },
    {
      label: "Resume Builder",
      href: "/student/resume",
      icon: FileCheck
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Sidebar - Desktop */}
      <aside 
        className={`hidden md:flex flex-col h-full border-r transition-all duration-300 relative z-30`}
        style={{ 
          width: isSidebarCollapsed ? "80px" : "260px",
          backgroundColor: "var(--bg-sidebar)", 
          borderColor: "var(--border-primary)" 
        }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "var(--border-primary)" }}>
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="p-2 rounded-xl" style={{ backgroundColor: "var(--bg-badge)", color: "var(--text-accent)" }}>
              <BookOpen size={18} />
            </div>
            {!isSidebarCollapsed && (
              <span className="font-bold text-sm tracking-tight text-gradient whitespace-nowrap">
                Student Center
              </span>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const LinkIcon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link 
                key={link.href} 
                href={link.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all relative group cursor-pointer"
                style={{
                  color: isActive ? "#ffffff" : "var(--text-secondary)",
                  backgroundColor: isActive ? "var(--text-accent)" : "transparent"
                }}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-2xl opacity-10 bg-white" />
                )}
                <LinkIcon size={16} className="shrink-0" />
                {!isSidebarCollapsed && (
                  <span>{link.label}</span>
                )}
                {isSidebarCollapsed && (
                  <div className="absolute left-16 bg-slate-950 text-white text-[10px] py-1 px-2.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-md">
                    {link.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Button */}
        <button 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute bottom-24 -right-3 p-1.5 rounded-full border shadow-sm transition-all hover:scale-105 z-50 cursor-pointer"
          style={{ 
            backgroundColor: "var(--bg-card)", 
            borderColor: "var(--border-primary)",
            color: "var(--text-secondary)"
          }}
        >
          {isSidebarCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>

        {/* Sidebar Footer Removed - Moved to Top Nav */}
      </aside>

      {/* Sidebar - Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-slate-950/60 backdrop-blur-sm">
          <div 
            className="w-72 h-full flex flex-col p-6 animate-slide-right shadow-2xl"
            style={{ backgroundColor: "var(--bg-sidebar)" }}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                  <BookOpen size={18} />
                </div>
                <span className="font-bold text-sm text-gradient">Student Center</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-500/10">
                <X size={18} style={{ color: "var(--text-primary)" }} />
              </button>
            </div>

            <nav className="flex-1 space-y-2">
              {sidebarLinks.map((link) => {
                const LinkIcon = link.icon;
                const isActive = pathname === link.href;

                return (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all"
                    style={{
                      color: isActive ? "#ffffff" : "var(--text-secondary)",
                      backgroundColor: isActive ? "var(--text-accent)" : "transparent"
                    }}
                  >
                    <LinkIcon size={16} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Footer Removed */}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header 
          className="flex items-center justify-between px-6 py-4 border-b relative z-20"
          style={{ 
            backgroundColor: "var(--bg-secondary)", 
            borderColor: "var(--border-primary)" 
          }}
        >
          {/* Left: Mobile Toggle & Breadcrumbs */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-xl md:hidden hover:bg-slate-500/10"
              style={{ color: "var(--text-primary)" }}
            >
              <Menu size={18} />
            </button>

            {/* Breadcrumbs */}
            <div className="hidden sm:flex items-center space-x-2 text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
              <span>Student</span>
              <span style={{ color: "var(--text-muted)" }}>/</span>
              <span className="text-[var(--text-primary)] capitalize">
                {pathname.split("/").filter(Boolean).slice(1).join(" / ") || "Dashboard"}
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="flex items-center space-x-1.5 rounded-full border px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider transition-all hover:scale-102"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-primary)",
                color: "var(--text-secondary)"
              }}
            >
              <ArrowLeftRight size={12} />
              <span>Go To Public Site</span>
            </Link>
            {studentUser && (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="w-9 h-9 rounded-full bg-indigo-500 text-white font-extrabold flex items-center justify-center text-sm shadow-sm cursor-pointer hover:ring-2 hover:ring-indigo-400 transition-all ml-2"
                >
                  {studentUser.avatar}
                </button>

                {isProfileMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setIsProfileMenuOpen(false)}
                    />
                    <div 
                      className="absolute right-0 mt-3 w-72 rounded-2xl border shadow-xl z-50 animate-in slide-in-from-top-2 fade-in duration-200"
                      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-primary)" }}
                    >
                      {/* Dropdown Header */}
                      <div className="p-5 flex items-center space-x-3 border-b relative" style={{ borderColor: "var(--border-primary)" }}>
                        <div className="w-12 h-12 rounded-full bg-indigo-500 text-white font-extrabold flex items-center justify-center text-lg shrink-0">
                          {studentUser.avatar}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold truncate" style={{ color: "var(--text-primary)" }}>{studentUser.name}</p>
                          <p className="text-[10px] text-amber-500 font-semibold truncate mt-0.5">Access all features with Premium!</p>
                        </div>
                      </div>
                      
                      {/* Grid Icons */}
                      <div className="grid grid-cols-3 gap-2 p-4 border-b" style={{ borderColor: "var(--border-primary)" }}>
                        <Link href="/student/lists" onClick={() => setIsProfileMenuOpen(false)} className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-[var(--bg-primary)] transition-colors cursor-pointer group">
                          <div className="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                            <BookOpen size={18} className="text-indigo-400" />
                          </div>
                          <span className="text-[10px] font-semibold text-[var(--text-secondary)]">My Lists</span>
                        </Link>
                        
                        <Link href="/student/notebook" onClick={() => setIsProfileMenuOpen(false)} className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-[var(--bg-primary)] transition-colors cursor-pointer group">
                          <div className="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                            <FileText size={18} className="text-blue-400" />
                          </div>
                          <span className="text-[10px] font-semibold text-[var(--text-secondary)]">Notebook</span>
                        </Link>
                        
                        <Link href="/student/profile" onClick={() => setIsProfileMenuOpen(false)} className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-[var(--bg-primary)] transition-colors cursor-pointer group">
                          <div className="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform relative">
                            {/* Progress SVG */}
                            <svg className="w-6 h-6 transform -rotate-90">
                              <circle cx="12" cy="12" r="10" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="3" fill="transparent" />
                              <circle cx="12" cy="12" r="10" stroke="#10b981" strokeWidth="3" fill="transparent" strokeDasharray="62.8" strokeDashoffset="20" strokeLinecap="round" />
                            </svg>
                          </div>
                          <span className="text-[10px] font-semibold text-[var(--text-secondary)]">Progress</span>
                        </Link>
                      </div>
                      
                      {/* Dropdown Links */}
                      <div className="p-2 space-y-1">
                        <Link 
                          href="/student/settings"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors hover:bg-[var(--bg-primary)] cursor-pointer"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <Settings size={14} />
                          <span>Settings</span>
                        </Link>
                        
                        <div 
                          className="flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-semibold"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <div className="flex items-center space-x-3">
                            <Paintbrush size={14} />
                            <span>Appearance</span>
                          </div>
                          {/* Inline Theme Toggle */}
                          <div className="scale-90 origin-right">
                            <ThemeToggle />
                          </div>
                        </div>
                      </div>

                      <div className="p-2 border-t" style={{ borderColor: "var(--border-primary)" }}>
                        <button 
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            handleLogout();
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors hover:bg-rose-500/10 hover:text-rose-500 cursor-pointer"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <LogOut size={14} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto relative">
          <div className="max-w-6xl mx-auto space-y-8 p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div
            className="w-full max-w-sm rounded-3xl p-6 border shadow-2xl text-center space-y-5"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-primary)"
            }}
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto border border-rose-500/20">
              <AlertTriangle size={24} />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-rose-500">
                Are u sure want to logout
              </h3>
              <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                You will need to sign back in to access your study portal.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all hover:bg-[var(--bg-primary)] cursor-pointer text-[var(--text-secondary)]"
                style={{ borderColor: "var(--border-primary)" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogoutConfirm(false);
                  logout();
                  router.push("/login?redirect=/student/dashboard");
                }}
                className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase transition-all shadow-lg hover:scale-[1.02] cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
