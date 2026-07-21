"use client";

import React, { useState, useEffect } from "react";
import VoteButtons from "./VoteButtons";
import MarkdownRenderer from "./MarkdownRenderer";
import MarkdownEditor from "./MarkdownEditor";
import AcceptedAnswerBadge from "./AcceptedAnswerBadge";
import { useVote } from "@/customHooks/useDiscussion";
import { useAuth } from "@/context/AuthContext";
import { buildAuthHeaders, getApiBase } from "@/utils/api";
import { Reply, CheckCircle2, Edit2, Trash2, Shield } from "lucide-react";

export default function CommentCard({ comment, discussion, onReplySubmitted, onCommentUpdated, onCommentDeleted }) {
  const { user, token } = useAuth();
  const { voteComment } = useVote();

  const [score, setScore] = useState(comment.score || 0);
  const [userVote, setUserVote] = useState(comment.userState?.vote || 0);
  const [isVoting, setIsVoting] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [editText, setEditText] = useState(comment.body || "");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setScore(comment.score || 0);
    setUserVote(comment.userState?.vote || 0);
  }, [comment.id, comment.score, comment.userState?.vote]);

  const isAuthor = user?.username === comment.author?.username || (user?.id && user?.id === comment.authorId);
  const isSuperAdmin = user?.role === "ADMIN";
  const canDeleteComment = isAuthor || isSuperAdmin;
  const isDiscussionOwner = user?.username === discussion?.author?.username;
  const isStaff = user?.role === "ADMIN" || user?.role === "MENTOR";
  const canAccept = (isDiscussionOwner || isStaff) && discussion;
  const isAccepted = discussion?.acceptedCommentId === comment.id;

  const handleVote = async (val) => {
    if (isVoting) return;
    setIsVoting(true);
    try {
      await voteComment(discussion?.slug, comment.slug, val, userVote, score, (newVote, newScore) => {
        setUserVote(newVote);
        setScore(newScore);
        if (comment) {
          if (!comment.userState) comment.userState = {};
          comment.userState.vote = newVote;
          comment.score = newScore;
        }
      });
    } finally {
      setIsVoting(false);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    try {
      setSubmitting(true);
      const apiBase = getApiBase();
      const headers = buildAuthHeaders(token, user);

      const res = await fetch(`${apiBase}/api/discuss/${discussion.slug}/comments`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          body: replyText,
          parentCommentSlug: comment.slug,
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setReplyText("");
        setIsReplying(false);
        if (onReplySubmitted) onReplySubmitted(data.comment);
      }
    } catch (_) {
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editText.trim()) return;

    try {
      setSubmitting(true);
      const apiBase = getApiBase();
      const headers = buildAuthHeaders(token, user);

      const res = await fetch(`${apiBase}/api/discuss/${discussion.slug}/comments/${comment.slug}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ body: editText }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsEditing(false);
        if (onCommentUpdated) onCommentUpdated(data.comment);
      }
    } catch (_) {
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    try {
      const apiBase = getApiBase();
      const headers = buildAuthHeaders(token, user);

      const res = await fetch(`${apiBase}/api/discuss/${discussion.slug}/comments/${comment.slug}`, {
        method: "DELETE",
        headers,
      });

      if (res.ok) {
        if (onCommentDeleted) onCommentDeleted(comment.slug);
      }
    } catch (_) {}
  };

  const handleToggleAccept = async () => {
    try {
      const apiBase = getApiBase();
      const headers = buildAuthHeaders(token, user);

      await fetch(`${apiBase}/api/discuss/${discussion.slug}/comments/${comment.slug}/accept`, {
        method: "PATCH",
        headers,
      });
      if (onCommentUpdated) onCommentUpdated();
    } catch (_) {}
  };

  const formattedDate = new Date(comment.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className={`p-4 rounded-2xl bg-[var(--bg-card)] border transition-all ${
        isAccepted
          ? "border-emerald-500/40 bg-emerald-500/[0.02] shadow-sm"
          : "border-[var(--border-primary)]"
      }`}
    >
      <div className="flex gap-3">
        {/* Vote buttons */}
        <div className="flex-shrink-0">
          <VoteButtons score={score} userVote={userVote} onVote={handleVote} direction="horizontal" size="sm" disabled={isVoting} />
        </div>

        {/* Main comment container */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Comment Header */}
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[var(--text-primary)]">
                @{comment.author?.username || "anonymous"}
              </span>
              {comment.author?.role === "MENTOR" && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400">
                  <Shield className="w-2.5 h-2.5" /> MENTOR
                </span>
              )}
              <span>•</span>
              <span>{formattedDate}</span>
            </div>

            {isAccepted && <AcceptedAnswerBadge />}
          </div>

          {/* Body or Edit form */}
          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="space-y-2 pt-1">
              <MarkdownEditor value={editText} onChange={setEditText} minHeight="100px" />
              <div className="flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-3.5 py-1.5 rounded-xl bg-[var(--accent-primary)] text-white font-semibold shadow-sm"
                >
                  Save Edit
                </button>
              </div>
            </form>
          ) : (
            <MarkdownRenderer content={comment.body} />
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsReplying(!isReplying)}
                className="flex items-center gap-1 hover:text-[var(--accent-primary)] transition-colors font-medium"
              >
                <Reply className="w-3.5 h-3.5" />
                Reply
              </button>

              {canAccept && (
                <button
                  type="button"
                  onClick={handleToggleAccept}
                  className={`flex items-center gap-1 font-medium transition-colors ${
                    isAccepted ? "text-emerald-500 font-bold" : "hover:text-emerald-500"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isAccepted ? "Accepted" : "Mark as Answer"}
                </button>
              )}
            </div>

            {(isAuthor || canDeleteComment) && (
              <div className="flex items-center gap-2">
                {isAuthor && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-1 hover:text-[var(--text-primary)] transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                )}
                {canDeleteComment && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="p-1 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Inline Reply Composer */}
          {isReplying && (
            <form onSubmit={handleReplySubmit} className="mt-3 p-3 rounded-xl bg-[var(--bg-hover)] border border-[var(--border-subtle)] space-y-2">
              <MarkdownEditor
                value={replyText}
                onChange={setReplyText}
                placeholder={`Replying to @${comment.author?.username || "user"}...`}
                minHeight="90px"
              />
              <div className="flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setIsReplying(false)}
                  className="px-3 py-1.5 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-card)] font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !replyText.trim()}
                  className="px-3.5 py-1.5 rounded-xl bg-[var(--accent-primary)] text-white font-semibold shadow-sm disabled:opacity-50"
                >
                  Post Reply
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
