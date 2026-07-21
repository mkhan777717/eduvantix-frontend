"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, Eye, Pin, Lock, Bookmark } from "lucide-react";
import VoteButtons from "./VoteButtons";
import TagPill from "./TagPill";
import AcceptedAnswerBadge from "./AcceptedAnswerBadge";
import { useVote, useBookmark } from "@/customHooks/useDiscussion";

export default function DiscussionCard({ discussion }) {
  const { voteDiscussion } = useVote();
  const { toggleBookmark } = useBookmark();

  const [score, setScore] = useState(discussion.score || 0);
  const [userVote, setUserVote] = useState(discussion.userState?.vote || 0);
  const [isBookmarked, setIsBookmarked] = useState(discussion.userState?.isBookmarked || false);
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    setScore(discussion.score || 0);
    setUserVote(discussion.userState?.vote || 0);
    setIsBookmarked(discussion.userState?.isBookmarked || false);
  }, [discussion.id, discussion.score, discussion.userState?.vote, discussion.userState?.isBookmarked]);

  const handleVote = async (val) => {
    if (isVoting) return;
    setIsVoting(true);
    try {
      await voteDiscussion(discussion.slug, val, userVote, score, (newVote, newScore) => {
        setUserVote(newVote);
        setScore(newScore);
        if (discussion) {
          if (!discussion.userState) discussion.userState = {};
          discussion.userState.vote = newVote;
          discussion.score = newScore;
        }
      });
    } finally {
      setIsVoting(false);
    }
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(discussion.slug, isBookmarked, (newState) => {
      setIsBookmarked(newState);
      if (discussion) {
        if (!discussion.userState) discussion.userState = {};
        discussion.userState.isBookmarked = newState;
      }
    });
  };

  const formattedDate = new Date(discussion.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="group relative flex gap-4 p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-[var(--border-accent)] transition-all duration-200 shadow-sm hover:shadow-md">
      {/* Vote Sidebar */}
      <div className="flex-shrink-0">
        <VoteButtons score={score} userVote={userVote} onVote={handleVote} disabled={isVoting} />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          {/* Header metadata */}
          <div className="flex items-center flex-wrap gap-2 text-xs text-[var(--text-muted)] mb-1.5">
            <span className="px-2 py-0.5 rounded-md font-semibold bg-[var(--bg-badge)] text-[var(--accent-primary)] uppercase tracking-wider text-[10px]">
              {discussion.category}
            </span>
            <span>•</span>
            <span className="font-medium text-[var(--text-secondary)]">
              @{discussion.author?.username || "anonymous"}
            </span>
            <span>•</span>
            <span>{formattedDate}</span>

            {discussion.isPinned && (
              <span className="inline-flex items-center gap-0.5 text-amber-500 font-medium ml-auto">
                <Pin className="w-3 h-3 fill-amber-500" /> Pinned
              </span>
            )}
            {discussion.isLocked && (
              <span className="inline-flex items-center gap-0.5 text-red-400 font-medium">
                <Lock className="w-3 h-3" /> Locked
              </span>
            )}
            {discussion.acceptedCommentId && (
              <AcceptedAnswerBadge />
            )}
          </div>

          {/* Title */}
          <Link href={`/discuss/${discussion.slug}`} className="block">
            <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2 leading-snug">
              {discussion.title}
            </h3>
          </Link>

          {/* Snippet */}
          <p className="mt-1.5 text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed font-normal">
            {discussion.body?.replace(/[#*`_]/g, "")}
          </p>
        </div>

        {/* Footer info & tags */}
        <div className="mt-4 flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-[var(--border-subtle)]">
          {/* Tags */}
          <div className="flex items-center flex-wrap gap-1.5">
            {(discussion.tags || []).map((t, idx) => (
              <TagPill key={t.slug || idx} tag={t} />
            ))}
          </div>

          {/* Counter stats & bookmark action */}
          <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" />
              {discussion.replyCount || 0}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {discussion.viewCount || 0}
            </span>
            <button
              type="button"
              onClick={handleBookmark}
              className={`p-1 rounded-md transition-colors hover:bg-[var(--bg-hover)] ${
                isBookmarked ? "text-amber-400 fill-amber-400" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
              title="Bookmark"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-amber-400" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
