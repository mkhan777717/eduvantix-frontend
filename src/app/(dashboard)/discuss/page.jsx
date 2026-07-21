"use client";

import React, { Suspense } from "react";
import DiscussionFeed from "@/components/discuss/DiscussionFeed";
import DiscussSidebar from "@/components/discuss/DiscussSidebar";
import NotificationBell from "@/components/discuss/NotificationBell";

export default function DiscussPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-[var(--text-muted)]">Loading forum...</div>}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Title & Top Actions */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
          <div>
            <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Discussion Forum
            </h1>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Join the community, solve problems together, share interview experiences, and discuss tech topics.
            </p>
          </div>

          <NotificationBell />
        </div>

        {/* Main Grid: Feed + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <DiscussionFeed />
          </div>

          <DiscussSidebar activeTab="feed" />
        </div>
      </div>
    </Suspense>
  );
}
