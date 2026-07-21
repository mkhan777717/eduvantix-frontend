"use client";

import React from "react";
import DiscussionFeed from "./DiscussionFeed";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default function DiscussTab({ problemSlug, contestSlug, vivaId }) {
  const initialFilters = {};
  if (problemSlug) initialFilters.problemSlug = problemSlug;
  if (contestSlug) initialFilters.contestSlug = contestSlug;
  if (vivaId) initialFilters.vivaId = vivaId;

  return (
    <div className="space-y-6 pt-4">
      {/* Header bar */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] shadow-sm">
        <div>
          <h3 className="text-sm font-bold text-[var(--text-primary)]">Threaded Discussions</h3>
          <p className="text-xs text-[var(--text-muted)]">
            Ask questions, share code solutions, and discuss approaches for this topic.
          </p>
        </div>

        <Link
          href={`/discuss/new${problemSlug ? `?problemSlug=${problemSlug}` : contestSlug ? `?contestSlug=${contestSlug}` : ""}`}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] text-white text-xs font-bold shadow-sm transition-all active:scale-95"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          Ask Question
        </Link>
      </div>

      {/* Scoped Feed */}
      <DiscussionFeed initialFilters={initialFilters} />
    </div>
  );
}
