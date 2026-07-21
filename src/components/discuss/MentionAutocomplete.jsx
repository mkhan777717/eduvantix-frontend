"use client";

import React from "react";
import { User, Shield } from "lucide-react";

const SYSTEM_ROLES = [
  { username: "mentor", label: "@mentor - All institute mentors", isRole: true },
  { username: "admin", label: "@admin - Platform administrators", isRole: true },
];

export default function MentionAutocomplete({ query, onSelect }) {
  if (!query) return null;

  const matches = SYSTEM_ROLES.filter((r) =>
    r.username.toLowerCase().startsWith(query.toLowerCase())
  );

  if (matches.length === 0) return null;

  return (
    <div className="absolute z-50 bottom-full mb-1 left-0 w-64 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] shadow-xl p-1 text-xs">
      <div className="px-2 py-1 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
        Mentions
      </div>
      {matches.map((item) => (
        <button
          key={item.username}
          type="button"
          onClick={() => onSelect(item.username)}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-[var(--text-primary)] hover:bg-[var(--bg-hover)] hover:text-[var(--accent-primary)] transition-colors"
        >
          {item.isRole ? (
            <Shield className="w-3.5 h-3.5 text-purple-400" />
          ) : (
            <User className="w-3.5 h-3.5 text-[var(--text-muted)]" />
          )}
          <span className="font-semibold">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
