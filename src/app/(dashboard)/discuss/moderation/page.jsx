"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { buildAuthHeaders, getApiBase } from "@/utils/api";
import { ShieldAlert, CheckCircle, Flag, FileText, AlertTriangle } from "lucide-react";

export default function ModerationDashboardPage() {
  const { user, token } = useAuth();
  const [reports, setReports] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [activeTab, setActiveTab] = useState("reports"); // reports | audit
  const [loading, setLoading] = useState(true);

  const isStaff = user?.role === "ADMIN" || user?.role === "MENTOR" || user?.role === "INSTITUTE_ADMIN";

  useEffect(() => {
    async function fetchData() {
      if (!token || !isStaff) return;
      try {
        setLoading(true);
        const apiBase = getApiBase();
        const headers = buildAuthHeaders(token, user);

        const [repRes, auditRes] = await Promise.all([
          fetch(`${apiBase}/api/discuss/moderation/reports`, { headers }),
          fetch(`${apiBase}/api/discuss/moderation/audit-logs`, { headers }),
        ]);

        const repData = await repRes.json();
        const auditData = await auditRes.json();

        if (repData.success) setReports(repData.data || []);
        if (auditData.success) setAuditLogs(auditData.data || []);
      } catch (_) {
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [token, user, isStaff]);

  if (!isStaff) {
    return (
      <div className="max-w-xl mx-auto p-12 text-center rounded-3xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-sm">
        Access Denied. Staff permission required.
      </div>
    );
  }

  const handleResolveReport = async (reportId, action) => {
    try {
      const apiBase = getApiBase();
      const headers = buildAuthHeaders(token, user);
      await fetch(`${apiBase}/api/discuss/moderation/reports/${reportId}/resolve`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ action }),
      });
      setReports(reports.filter((r) => r.id !== reportId));
    } catch (_) {}
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-amber-500" />
            Staff Moderation Dashboard
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Review reported content, manage flags, and inspect moderator audit trail.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center p-1 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("reports")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "reports"
                ? "bg-[var(--accent-primary)] text-white shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Pending Reports ({reports.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("audit")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "audit"
                ? "bg-[var(--accent-primary)] text-white shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Audit Logs
          </button>
        </div>
      </div>

      {/* Reports View */}
      {activeTab === "reports" && (
        <div className="space-y-4">
          {reports.length > 0 ? (
            reports.map((r) => (
              <div key={r.id} className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] space-y-3 shadow-sm">
                <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-md font-bold bg-red-500/10 text-red-500 uppercase tracking-wider text-[10px]">
                    {r.reason}
                  </span>
                  <span className="text-[var(--text-muted)]">
                    Reported by @{r.reporter?.username} • {new Date(r.createdAt).toLocaleString()}
                  </span>
                </div>

                {r.discussion && (
                  <div>
                    <span className="text-xs text-[var(--text-muted)]">Discussion:</span>
                    <Link href={`/discuss/${r.discussion.slug}`} className="block text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent-primary)]">
                      {r.discussion.title}
                    </Link>
                  </div>
                )}

                {r.comment && (
                  <div>
                    <span className="text-xs text-[var(--text-muted)]">Comment excerpt:</span>
                    <p className="text-xs text-[var(--text-secondary)] italic bg-[var(--bg-hover)] p-2 rounded-xl border border-[var(--border-subtle)]">
                      "{r.comment.body}"
                    </p>
                  </div>
                )}

                {r.body && <p className="text-xs text-[var(--text-secondary)]">Note: {r.body}</p>}

                {/* Resolve actions */}
                <div className="flex justify-end gap-2 pt-2 border-t border-[var(--border-subtle)]">
                  <button
                    type="button"
                    onClick={() => handleResolveReport(r.id, "REJECTED")}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
                  >
                    Dismiss Report
                  </button>
                  <button
                    type="button"
                    onClick={() => handleResolveReport(r.id, "RESOLVED")}
                    className="px-4 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold shadow-sm hover:bg-emerald-600"
                  >
                    Resolve & Close
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center rounded-3xl bg-[var(--bg-card)] border border-[var(--border-primary)] text-xs text-[var(--text-muted)]">
              No pending content reports.
            </div>
          )}
        </div>
      )}

      {/* Audit Logs View */}
      {activeTab === "audit" && (
        <div className="space-y-3">
          {auditLogs.length > 0 ? (
            auditLogs.map((log) => (
              <div key={log.id} className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-[var(--text-primary)]">
                    @{log.actor?.username} performed <span className="text-[var(--accent-primary)] uppercase">{log.action}</span>
                  </span>
                  {log.discussion && <p className="text-[var(--text-muted)]">Thread: {log.discussion.title}</p>}
                </div>
                <span className="text-[var(--text-muted)]">{new Date(log.createdAt).toLocaleString()}</span>
              </div>
            ))
          ) : (
            <div className="p-12 text-center rounded-3xl bg-[var(--bg-card)] border border-[var(--border-primary)] text-xs text-[var(--text-muted)]">
              No audit log entries recorded.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
