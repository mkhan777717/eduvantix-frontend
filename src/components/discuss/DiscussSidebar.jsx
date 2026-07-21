"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MessageSquare, Bookmark, TrendingUp, Tag, PlusCircle, Shield } from "lucide-react";
import TagPill from "./TagPill";
import { getApiBase } from "@/utils/api";

export default function DiscussSidebar({ activeTab = "feed" }) {
  const searchParams = useSearchParams();
  const sortParam = searchParams ? searchParams.get("sort") : null;
  const [popularTags, setPopularTags] = useState([]);

  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch(`${getApiBase()}/api/discuss/tags/popular`);
        const data = await res.json();
        if (data.success) {
          setPopularTags(data.tags || []);
        }
      } catch (_) {}
    }
    fetchTags();
  }, []);

  const isTrendingActive = sortParam === "hot" || sortParam === "trending";
  const isAllDiscussionsActive = activeTab === "feed" && !isTrendingActive && activeTab !== "saved";
  const isSavedActive = activeTab === "saved";

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
      {/* Create Post CTA */}
      <Link
        href="/discuss/new"
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] text-white font-semibold text-sm shadow-md transition-all active:scale-[0.98]"
      >
        <PlusCircle className="w-4 h-4" />
        New Discussion
      </Link>

      {/* Quick Navigation */}
      <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] shadow-sm space-y-1">
        <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider px-3 mb-2">
          Navigation
        </h4>

        <Link
          href="/discuss"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
            isAllDiscussionsActive
              ? "bg-[var(--accent-glow)] text-[var(--accent-primary)]"
              : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          All Discussions
        </Link>

        <Link
          href="/discuss?sort=hot"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
            isTrendingActive
              ? "bg-[var(--accent-glow)] text-[var(--accent-primary)]"
              : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Trending Posts
        </Link>

        <Link
          href="/discuss/saved"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
            isSavedActive
              ? "bg-[var(--accent-glow)] text-[var(--accent-primary)]"
              : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
          }`}
        >
          <Bookmark className="w-4 h-4" />
          Saved Bookmarks
        </Link>
      </div>

      {/* Popular Tags Widget */}
      <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            Popular Tags
          </h4>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {popularTags.length > 0 ? (
            popularTags.map((t) => <TagPill key={t.slug} tag={t} />)
          ) : (
            <p className="text-xs text-[var(--text-muted)]">No tags yet</p>
          )}
        </div>
      </div>

      {/* Community Rules Card */}
      <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] shadow-sm text-xs text-[var(--text-secondary)] space-y-2">
        <h4 className="font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
          Community Rules
        </h4>
        <ul className="space-y-1 text-[var(--text-muted)] list-disc pl-4">
          <li>Be respectful and constructive</li>
          <li>Search before asking duplicate questions</li>
          <li>Use markdown for code formatting</li>
          <li>Do not share contest answers during live rounds</li>
        </ul>
      </div>
    </aside>
  );
}
