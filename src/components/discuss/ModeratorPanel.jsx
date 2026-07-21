"use client";

import React, { useState } from "react";
import { Pin, Lock, Move, Trash2, History, ShieldAlert } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { buildAuthHeaders, getApiBase } from "@/utils/api";

export default function ModeratorPanel({ discussion, onStateChange }) {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyList, setHistoryList] = useState([]);

  const isStaff = user?.role === "ADMIN" || user?.role === "MENTOR" || user?.role === "INSTITUTE_ADMIN";
  if (!isStaff || !discussion) return null;

  const handleTogglePin = async () => {
    try {
      setLoading(true);
      const apiBase = getApiBase();
      const headers = buildAuthHeaders(token, user);
      const res = await fetch(`${apiBase}/api/discuss/${discussion.slug}/pin`, {
        method: "POST",
        headers,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (onStateChange) onStateChange();
      }
    } catch (_) {
    } finally {
      setLoading(false);
    }
  };

  const handleToggleLock = async () => {
    try {
      setLoading(true);
      const apiBase = getApiBase();
      const headers = buildAuthHeaders(token, user);
      const res = await fetch(`${apiBase}/api/discuss/${discussion.slug}/lock`, {
        method: "POST",
        headers,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (onStateChange) onStateChange();
      }
    } catch (_) {
    } finally {
      setLoading(false);
    }
  };

  const handleFetchHistory = async () => {
    try {
      setShowHistory(!showHistory);
      if (!showHistory) {
        const apiBase = getApiBase();
        const headers = buildAuthHeaders(token, user);
        const res = await fetch(`${apiBase}/api/discuss/${discussion.slug}/history`, { headers });
        const data = await res.json();
        if (data.success) {
          setHistoryList(data.history || []);
        }
      }
    } catch (_) {}
  };

  return (
    <div className="p-4 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 mb-6 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-amber-500 flex items-center gap-1.5 uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          Moderator Tools
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleTogglePin}
            disabled={loading}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              discussion.isPinned
                ? "bg-amber-500 text-white shadow-sm"
                : "bg-[var(--bg-card)] border border-[var(--border-primary)] text-[var(--text-secondary)] hover:border-amber-500"
            }`}
          >
            <Pin className="w-3.5 h-3.5" />
            {discussion.isPinned ? "Pinned" : "Pin Thread"}
          </button>

          <button
            type="button"
            onClick={handleToggleLock}
            disabled={loading}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              discussion.isLocked
                ? "bg-red-500 text-white shadow-sm"
                : "bg-[var(--bg-card)] border border-[var(--border-primary)] text-[var(--text-secondary)] hover:border-red-500"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            {discussion.isLocked ? "Locked" : "Lock Thread"}
          </button>

          <button
            type="button"
            onClick={handleFetchHistory}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--bg-card)] border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <History className="w-3.5 h-3.5" />
            History
          </button>
        </div>
      </div>

      {/* Version History Drawer */}
      {showHistory && (
        <div className="pt-3 border-t border-amber-500/20 text-xs space-y-2">
          <h5 className="font-bold text-[var(--text-primary)]">Edit Version Trail</h5>
          {historyList.length > 0 ? (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {historyList.map((h) => (
                <div key={h.id} className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1">
                  <div className="flex justify-between text-[11px] text-[var(--text-muted)]">
                    <span>Version #{h.version} by @{h.editedBy?.username}</span>
                    <span>{new Date(h.createdAt).toLocaleString()}</span>
                  </div>
                  {h.editedReason && (
                    <p className="text-amber-400 text-[11px] font-medium">Reason: {h.editedReason}</p>
                  )}
                  <p className="text-[var(--text-secondary)] line-clamp-2">{h.newBody}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[var(--text-muted)]">No edit history records found.</p>
          )}
        </div>
      )}
    </div>
  );
}
