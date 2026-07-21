"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDiscussionThread, useVote, useBookmark } from "@/customHooks/useDiscussion";
import VoteButtons from "./VoteButtons";
import TagPill from "./TagPill";
import AcceptedAnswerBadge from "./AcceptedAnswerBadge";
import ModeratorPanel from "./ModeratorPanel";
import MarkdownRenderer from "./MarkdownRenderer";
import MarkdownEditor from "./MarkdownEditor";
import CommentTree from "./CommentTree";
import { useAuth } from "@/context/AuthContext";
import { buildAuthHeaders, getApiBase } from "@/utils/api";
import { useRouter } from "next/navigation";
import { ArrowLeft, MessageSquare, Eye, Bookmark, Share2, Edit2, Shield, Lock, Trash2 } from "lucide-react";

export default function DiscussionThread({ slug }) {
  const router = useRouter();
  const { user, token } = useAuth();
  const { thread, comments, loading, error, refetch } = useDiscussionThread(slug);
  const { voteDiscussion } = useVote();
  const { toggleBookmark } = useBookmark();

  const [newCommentText, setNewCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  const [score, setScore] = useState(thread?.score || 0);
  const [userVote, setUserVote] = useState(thread?.userState?.vote || 0);
  const [isBookmarked, setIsBookmarked] = useState(thread?.userState?.isBookmarked || false);
  const [isVoting, setIsVoting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      const apiBase = getApiBase();
      const headers = buildAuthHeaders(token, user);
      fetch(`${apiBase}/api/discuss/${thread.slug}/share`, { method: "POST", headers }).catch(() => {});
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  useEffect(() => {
    if (thread) {
      setScore(thread.score || 0);
      setUserVote(thread.userState?.vote || 0);
      setIsBookmarked(thread.userState?.isBookmarked || false);
    }
  }, [thread?.id, thread?.score, thread?.userState?.vote, thread?.userState?.isBookmarked]);

  if (loading && !thread) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse p-4">
        <div className="h-6 bg-[var(--bg-hover)] rounded w-1/4" />
        <div className="h-8 bg-[var(--bg-hover)] rounded w-3/4" />
        <div className="h-64 bg-[var(--bg-hover)] rounded-3xl" />
      </div>
    );
  }

  if (error || !thread) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center rounded-3xl bg-[var(--bg-card)] border border-[var(--border-primary)] space-y-3">
        <h3 className="text-base font-bold text-[var(--text-primary)]">Discussion Not Found</h3>
        <p className="text-xs text-[var(--text-muted)]">{error || "The requested thread does not exist or has been removed."}</p>
        <Link href="/discuss" className="inline-block mt-4 px-4 py-2 rounded-xl bg-[var(--accent-primary)] text-white text-xs font-semibold">
          Return to Forum
        </Link>
      </div>
    );
  }

  const isAuthor = user?.username === thread?.author?.username || (user?.id && user?.id === thread?.authorId);
  const isSuperAdmin = user?.role === "ADMIN";
  const canDeleteThread = isAuthor || isSuperAdmin;

  const handleDeleteThread = async () => {
    if (!confirm("Are you sure you want to delete this thread? This action cannot be undone.")) return;
    try {
      const apiBase = getApiBase();
      const headers = buildAuthHeaders(token, user);
      const res = await fetch(`${apiBase}/api/discuss/${thread.slug}`, {
        method: "DELETE",
        headers,
      });
      if (res.ok) {
        router.push("/discuss");
      }
    } catch (_) {}
  };

  const handleVote = async (val) => {
    if (isVoting) return;
    setIsVoting(true);
    try {
      await voteDiscussion(thread.slug, val, userVote, score, (newVote, newScore) => {
        setUserVote(newVote);
        setScore(newScore);
        if (thread) {
          if (!thread.userState) thread.userState = {};
          thread.userState.vote = newVote;
          thread.score = newScore;
        }
      });
    } finally {
      setIsVoting(false);
    }
  };

  const handleBookmark = () => {
    toggleBookmark(thread.slug, isBookmarked, (newState) => {
      setIsBookmarked(newState);
      if (thread) {
        if (!thread.userState) thread.userState = {};
        thread.userState.isBookmarked = newState;
      }
    });
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    try {
      setSubmittingComment(true);
      const apiBase = getApiBase();
      const headers = buildAuthHeaders(token, user);

      const res = await fetch(`${apiBase}/api/discuss/${slug}/comments`, {
        method: "POST",
        headers,
        body: JSON.stringify({ body: newCommentText }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setNewCommentText("");
        refetch();
      }
    } catch (_) {
    } finally {
      setSubmittingComment(false);
    }
  };

  const formattedDate = new Date(thread.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/discuss"
          className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Forum
        </Link>

        <div className="flex items-center gap-2">
          {isAuthor && (
            <Link
              href={`/discuss/${thread.slug}/edit`}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--bg-card)] border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
            >
              <Edit2 className="w-3.5 h-3.5" /> Edit Thread
            </Link>
          )}

          {canDeleteThread && (
            <button
              type="button"
              onClick={handleDeleteThread}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete Thread
            </button>
          )}
        </div>
      </div>

      {/* Staff Moderator Panel */}
      <ModeratorPanel discussion={thread} onStateChange={refetch} />

      {/* Main Discussion Thread Container */}
      <article className="p-6 md:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-primary)] shadow-md space-y-6">
        {/* Header info */}
        <div className="space-y-3 pb-6 border-b border-[var(--border-subtle)]">
          <div className="flex items-center flex-wrap gap-2 text-xs text-[var(--text-muted)]">
            <span className="px-2.5 py-1 rounded-lg font-bold bg-[var(--bg-badge)] text-[var(--accent-primary)] uppercase tracking-wider text-[10px]">
              {thread.category}
            </span>
            <span>•</span>
            <span className="font-medium text-[var(--text-secondary)]">
              @{thread.author?.username}
            </span>
            {thread.author?.role === "MENTOR" && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400">
                <Shield className="w-2.5 h-2.5" /> MENTOR
              </span>
            )}
            <span>•</span>
            <span>{formattedDate}</span>

            {thread.acceptedCommentId && <AcceptedAnswerBadge />}
          </div>

          <h1 className="text-xl md:text-2xl font-extrabold text-[var(--text-primary)] leading-tight">
            {thread.title}
          </h1>

          {/* Tags */}
          <div className="flex items-center flex-wrap gap-1.5 pt-1">
            {(thread.tags || []).map((t, idx) => (
              <TagPill key={t.slug || idx} tag={t} />
            ))}
          </div>
        </div>

        {/* Content Body & Vote Sidebar */}
        <div className="flex gap-6">
          <div className="flex-shrink-0 hidden sm:block">
            <VoteButtons score={score} userVote={userVote} onVote={handleVote} disabled={isVoting} />
          </div>

          <div className="flex-1 min-w-0 space-y-4">
            <MarkdownRenderer content={thread.body} />

            {/* Mobile horizontal vote buttons */}
            <div className="sm:hidden pt-4">
              <VoteButtons score={score} userVote={userVote} onVote={handleVote} direction="horizontal" disabled={isVoting} />
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <MessageSquare className="w-4 h-4 text-[var(--accent-primary)]" />
              {thread.replyCount || 0} Comments
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Eye className="w-4 h-4 text-[var(--text-muted)]" />
              {thread.viewCount || 0} Views
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border-primary)] text-[var(--text-secondary)] hover:border-[var(--border-accent)] transition-all text-xs font-semibold"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copied ? "Copied Link!" : "Share"}
            </button>

            <button
              type="button"
              onClick={handleBookmark}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all text-xs font-semibold ${
                isBookmarked
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                  : "border-[var(--border-primary)] text-[var(--text-secondary)] hover:border-[var(--border-accent)]"
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-amber-500" : ""}`} />
              {isBookmarked ? "Saved" : "Save Thread"}
            </button>
          </div>
        </div>
      </article>

      {/* New Comment Box (if thread is not locked) */}
      {!thread.isLocked ? (
        <form onSubmit={handleAddComment} className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-primary)] shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-[var(--text-primary)]">Leave a Reply</h3>
          <MarkdownEditor
            value={newCommentText}
            onChange={setNewCommentText}
            placeholder="Write your response... Markdown formatting is supported."
            minHeight="120px"
          />
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={submittingComment || !newCommentText.trim()}
              className="px-5 py-2 rounded-2xl bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] text-white font-bold text-xs shadow-md transition-all disabled:opacity-50 active:scale-95"
            >
              {submittingComment ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>
      ) : (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-2">
          <Lock className="w-4 h-4" />
          This thread has been locked by a moderator. New comments cannot be posted.
        </div>
      )}

      {/* Comments Section */}
      <section className="space-y-4 pt-4">
        <h3 className="text-base font-bold text-[var(--text-primary)]">
          Discussion ({comments.length})
        </h3>
        <CommentTree comments={comments} discussion={thread} onCommentChanged={refetch} />
      </section>
    </div>
  );
}
