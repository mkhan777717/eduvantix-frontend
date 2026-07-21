"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bell, CheckCheck, MessageSquare, AtSign, Trophy, CheckCircle2 } from "lucide-react";
import { useNotifications } from "@/customHooks/useDiscussion";

export default function NotificationBell() {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNotifIcon = (type) => {
    switch (type) {
      case "REPLY":
        return <MessageSquare className="w-3.5 h-3.5 text-blue-400" />;
      case "MENTION":
        return <AtSign className="w-3.5 h-3.5 text-purple-400" />;
      case "ACCEPTED_ANSWER":
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
      case "VOTE_MILESTONE":
        return <Trophy className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-[var(--accent-primary)]" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-accent)] transition-all"
        title="Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent-primary)] text-[10px] font-bold text-white shadow-sm animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-hover)]">
            <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
              Notifications ({unreadCount})
            </h4>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="flex items-center gap-1 text-[11px] font-semibold text-[var(--accent-primary)] hover:underline"
              >
                <CheckCheck className="w-3 h-3" /> Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-[var(--border-subtle)]">
            {notifications.length > 0 ? (
              notifications.slice(0, 8).map((n) => (
                <Link
                  key={n.id}
                  href={n.discussion ? `/discuss/${n.discussion.slug}` : "/discuss"}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-start gap-3 p-3 text-xs transition-colors hover:bg-[var(--bg-hover)] ${
                    !n.read ? "bg-[var(--accent-glow)]/30 font-medium" : ""
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-[var(--bg-badge)] mt-0.5">
                    {getNotifIcon(n.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[var(--text-primary)] line-clamp-2 leading-snug">
                      {n.type === "REPLY" && "New reply to your discussion"}
                      {n.type === "MENTION" && "You were mentioned in a thread"}
                      {n.type === "ACCEPTED_ANSWER" && "Your answer was accepted!"}
                      {n.type === "VOTE_MILESTONE" && "Your post reached a vote milestone!"}
                      {n.discussion && `: ${n.discussion.title}`}
                    </p>
                    <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
                      {new Date(n.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-[var(--text-muted)]">
                No notifications yet
              </div>
            )}
          </div>

          <div className="p-2 border-t border-[var(--border-subtle)] bg-[var(--bg-hover)] text-center">
            <Link
              href="/discuss/notifications"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-[var(--accent-primary)] hover:underline"
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
