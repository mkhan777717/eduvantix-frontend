"use client";

import React from "react";
import Link from "next/link";
import { useNotifications } from "@/customHooks/useDiscussion";
import { Bell, CheckCheck, MessageSquare, AtSign, Trophy, CheckCircle2 } from "lucide-react";

export default function NotificationsPage() {
  const { notifications, unreadCount, markAllAsRead, refetch } = useNotifications();

  const getNotifIcon = (type) => {
    switch (type) {
      case "REPLY":
        return <MessageSquare className="w-4 h-4 text-blue-400" />;
      case "MENTION":
        return <AtSign className="w-4 h-4 text-purple-400" />;
      case "ACCEPTED_ANSWER":
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case "VOTE_MILESTONE":
        return <Trophy className="w-4 h-4 text-amber-400" />;
      default:
        return <Bell className="w-4 h-4 text-[var(--accent-primary)]" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">
            Notifications Center
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Stay updated on replies, @mentions, accepted answers, and vote milestones.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--accent-primary)] text-white text-xs font-semibold shadow-sm hover:bg-[var(--accent-secondary)] transition-all"
          >
            <CheckCheck className="w-4 h-4" /> Mark All as Read
          </button>
        )}
      </div>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((n) => (
            <Link
              key={n.id}
              href={n.discussion ? `/discuss/${n.discussion.slug}` : "/discuss"}
              className={`flex items-start gap-4 p-4 rounded-2xl border transition-all hover:border-[var(--border-accent)] ${
                !n.read
                  ? "bg-[var(--accent-glow)]/20 border-[var(--accent-primary)]/30 font-medium"
                  : "bg-[var(--bg-card)] border-[var(--border-primary)]"
              }`}
            >
              <div className="p-2.5 rounded-xl bg-[var(--bg-badge)]">
                {getNotifIcon(n.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--text-primary)]">
                  {n.type === "REPLY" && "Someone replied to your discussion"}
                  {n.type === "MENTION" && "You were mentioned in a thread"}
                  {n.type === "ACCEPTED_ANSWER" && "Your answer was marked as accepted!"}
                  {n.type === "VOTE_MILESTONE" && "Your discussion reached a vote milestone!"}
                  {n.discussion && <span className="font-bold"> — {n.discussion.title}</span>}
                </p>
                <span className="text-xs text-[var(--text-muted)] mt-1 block">
                  {new Date(n.createdAt).toLocaleString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-[var(--bg-card)] border border-[var(--border-primary)] space-y-2">
          <Bell className="w-8 h-8 text-[var(--text-muted)] mx-auto" />
          <h3 className="text-sm font-bold text-[var(--text-primary)]">No notifications</h3>
          <p className="text-xs text-[var(--text-muted)]">You're all caught up!</p>
        </div>
      )}
    </div>
  );
}
