"use client";

import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function VoteButtons({
  score = 0,
  userVote = 0,
  onVote,
  direction = "vertical",
  size = "md",
  disabled = false,
}) {
  const isUpvoted = userVote === 1;
  const isDownvoted = userVote === -1;

  const handleUpvote = (e) => {
    e.stopPropagation();
    if (disabled) return;
    onVote(1);
  };

  const handleDownvote = (e) => {
    e.stopPropagation();
    if (disabled) return;
    onVote(-1);
  };

  const isHorizontal = direction === "horizontal";

  return (
    <div
      className={`inline-flex items-center justify-center ${
        isHorizontal
          ? "flex-row gap-1.5 px-3 py-1 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] shadow-sm"
          : "flex-col gap-1 p-2 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] shadow-sm"
      }`}
    >
      <button
        type="button"
        onClick={handleUpvote}
        className={`p-1.5 rounded-xl transition-all cursor-pointer hover:cursor-pointer active:scale-90 ${
          isUpvoted
            ? "bg-emerald-500/20 text-emerald-400 font-bold shadow-sm"
            : "text-[var(--text-muted)] hover:text-emerald-400 hover:bg-emerald-500/10"
        } ${disabled ? "opacity-50 cursor-wait" : ""}`}
        title={isUpvoted ? "Remove Upvote" : "Upvote"}
      >
        <ChevronUp className={`${size === "sm" ? "w-4 h-4" : "w-5 h-5"} ${isUpvoted ? "stroke-[3]" : ""}`} />
      </button>

      <span
        className={`text-xs font-bold select-none px-1 text-center min-w-[20px] transition-colors ${
          isUpvoted
            ? "text-emerald-400 font-extrabold"
            : isDownvoted
            ? "text-rose-400 font-extrabold"
            : "text-[var(--text-primary)]"
        }`}
      >
        {score}
      </span>

      <button
        type="button"
        onClick={handleDownvote}
        className={`p-1.5 rounded-xl transition-all cursor-pointer hover:cursor-pointer active:scale-90 ${
          isDownvoted
            ? "bg-rose-500/20 text-rose-400 font-bold shadow-sm"
            : "text-[var(--text-muted)] hover:text-rose-400 hover:bg-rose-500/10"
        } ${disabled ? "opacity-50 cursor-wait" : ""}`}
        title={isDownvoted ? "Remove Downvote" : "Downvote"}
      >
        <ChevronDown className={`${size === "sm" ? "w-4 h-4" : "w-5 h-5"} ${isDownvoted ? "stroke-[3]" : ""}`} />
      </button>
    </div>
  );
}
