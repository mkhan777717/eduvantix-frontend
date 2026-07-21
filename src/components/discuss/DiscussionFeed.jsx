"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DiscussionCard from "./DiscussionCard";
import DiscussionFilters from "./DiscussionFilters";
import { useDiscussionFeed } from "@/customHooks/useDiscussion";
import { MessageSquare, RefreshCw } from "lucide-react";

export default function DiscussionFeed({ initialFilters = {} }) {
  const searchParams = useSearchParams();
  const sortParam = searchParams ? searchParams.get("sort") : null;

  const {
    discussions,
    pagination,
    loading,
    error,
    filters,
    setFilters,
    loadMore,
    refetch,
  } = useDiscussionFeed(initialFilters);

  useEffect(() => {
    if (sortParam) {
      setFilters((prev) => {
        if (prev.sort === sortParam) return prev;
        return { ...prev, sort: sortParam };
      });
    }
  }, [sortParam, setFilters]);

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <DiscussionFilters filters={filters} onChange={setFilters} />

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold flex items-center justify-between">
          <span>{error}</span>
          <button
            type="button"
            onClick={refetch}
            className="flex items-center gap-1 hover:underline"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Try again
          </button>
        </div>
      )}

      {/* Discussion Feed List */}
      {discussions.length > 0 ? (
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <DiscussionCard key={discussion.slug} discussion={discussion} />
          ))}

          {/* Load More Button */}
          {pagination?.hasNext && (
            <div className="pt-4 text-center">
              <button
                type="button"
                onClick={loadMore}
                disabled={loading}
                className="px-6 py-2.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-accent)] shadow-sm transition-all active:scale-95"
              >
                {loading ? "Loading more..." : "Load More Discussions"}
              </button>
            </div>
          )}
        </div>
      ) : !loading ? (
        /* Empty State */
        <div className="p-12 text-center rounded-3xl bg-[var(--bg-card)] border border-[var(--border-primary)] space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[var(--bg-badge)] text-[var(--accent-primary)] flex items-center justify-center mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">No discussions found</h3>
          <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
            Be the first to share your thoughts, ask a question, or post a guide!
          </p>
        </div>
      ) : null}

      {/* Skeleton Loader */}
      {loading && discussions.length === 0 && (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] space-y-3 animate-pulse"
            >
              <div className="h-4 bg-[var(--bg-hover)] rounded w-1/4" />
              <div className="h-5 bg-[var(--bg-hover)] rounded w-3/4" />
              <div className="h-12 bg-[var(--bg-hover)] rounded w-full" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
