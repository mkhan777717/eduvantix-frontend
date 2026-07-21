"use client";

import React from "react";
import CommentCard from "./CommentCard";

export default function CommentTree({ comments = [], discussion, onCommentChanged }) {
  if (!comments || comments.length === 0) {
    return (
      <div className="p-8 text-center rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] text-[var(--text-muted)] text-xs">
        No comments yet. Be the first to start the conversation!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.slug} className="space-y-3">
          <CommentCard
            comment={comment}
            discussion={discussion}
            onReplySubmitted={() => onCommentChanged && onCommentChanged()}
            onCommentUpdated={() => onCommentChanged && onCommentChanged()}
            onCommentDeleted={() => onCommentChanged && onCommentChanged()}
          />

          {/* Nested replies */}
          {Array.isArray(comment.replies) && comment.replies.length > 0 && (
            <div className="pl-4 sm:pl-8 border-l-2 border-[var(--border-subtle)] space-y-3">
              <CommentTree
                comments={comment.replies}
                discussion={discussion}
                onCommentChanged={onCommentChanged}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
