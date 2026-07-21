"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import MarkdownEditor from "./MarkdownEditor";
import { useAuth } from "@/context/AuthContext";
import { buildAuthHeaders, getApiBase } from "@/utils/api";
import { Tag, Send, ArrowLeft } from "lucide-react";

const CATEGORIES = [
  { value: "GENERAL", label: "General" },
  { value: "INTERVIEW", label: "Interview Prep" },
  { value: "CAREER", label: "Career Advice" },
  { value: "HELP", label: "Help Wanted" },
  { value: "BUG_REPORT", label: "Bug Reports" },
  { value: "FEATURE_REQUEST", label: "Feature Requests" },
  { value: "OFF_TOPIC", label: "Off Topic" },
  { value: "PROBLEM", label: "Problem Discussion" },
  { value: "CONTEST", label: "Contest Discussion" },
  { value: "VIVA", label: "Viva Prep" },
];

export default function DiscussionForm({ initialData = null, contextData = null }) {
  const router = useRouter();
  const { user, token } = useAuth();

  const [title, setTitle] = useState(initialData?.title || "");
  const [body, setBody] = useState(initialData?.body || "");
  const [category, setCategory] = useState(initialData?.category || contextData?.category || "GENERAL");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(initialData?.tags?.map((t) => t.name || t) || []);
  const [editedReason, setEditedReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const isEdit = !!initialData;

  const handleAddTag = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/^#/, "");
      if (!tags.includes(newTag) && tags.length < 5) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError("Please provide both a title and body content.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const apiBase = getApiBase();
      const headers = buildAuthHeaders(token, user);

      const payload = {
        title,
        body,
        category,
        tags,
        ...(contextData?.problemSlug ? { problemSlug: contextData.problemSlug } : {}),
        ...(contextData?.contestSlug ? { contestSlug: contextData.contestSlug } : {}),
        ...(contextData?.vivaId ? { vivaId: contextData.vivaId } : {}),
        ...(isEdit && editedReason ? { editedReason } : {}),
      };

      const url = isEdit ? `${apiBase}/api/discuss/${initialData.slug}` : `${apiBase}/api/discuss`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        let errMessage = data.message || "Failed to save discussion.";
        if (Array.isArray(data.errors) && data.errors.length > 0) {
          errMessage = data.errors.map((e) => `${e.field}: ${e.message}`).join(", ");
        }
        throw new Error(errMessage);
      }

      router.push(`/discuss/${data.discussion.slug}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="text-xl font-bold text-[var(--text-primary)]">
          {isEdit ? "Edit Discussion" : "New Discussion Thread"}
        </h1>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Title & Category */}
      <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-64 px-3.5 py-2 rounded-xl text-xs bg-[var(--bg-input)] border border-[var(--border-primary)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] font-semibold cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's on your mind? Keep it descriptive..."
            className="w-full px-4 py-3 rounded-xl text-sm font-semibold bg-[var(--bg-input)] border border-[var(--border-primary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-all"
            maxLength={150}
            required
          />
        </div>
      </div>

      {/* Content Editor */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
          Body Content (Markdown)
        </label>
        <MarkdownEditor value={body} onChange={setBody} minHeight="250px" />
      </div>

      {/* Tags selector */}
      <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] shadow-sm space-y-3">
        <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
          Tags (max 5)
        </label>

        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-[var(--bg-badge)] text-[var(--accent-primary)] border border-[var(--border-subtle)]"
            >
              #{t}
              <button
                type="button"
                onClick={() => handleRemoveTag(t)}
                className="hover:text-red-400 font-bold ml-1"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
          placeholder="Type tag name and press Enter (e.g. algorithms, react, python)..."
          className="w-full px-4 py-2.5 rounded-xl text-xs bg-[var(--bg-input)] border border-[var(--border-primary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)]"
          disabled={tags.length >= 5}
        />
      </div>

      {/* Edit Reason (if editing) */}
      {isEdit && (
        <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] shadow-sm">
          <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">
            Reason for edit (optional)
          </label>
          <input
            type="text"
            value={editedReason}
            onChange={(e) => setEditedReason(e.target.value)}
            placeholder="e.g. Fixed typo, added missing code snippet..."
            className="w-full px-4 py-2 rounded-xl text-xs bg-[var(--bg-input)] border border-[var(--border-primary)] text-[var(--text-primary)]"
          />
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2.5 rounded-2xl text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-all"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting || !title.trim() || !body.trim()}
          className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] text-white font-bold text-xs shadow-md transition-all disabled:opacity-50 active:scale-95"
        >
          <Send className="w-3.5 h-3.5" />
          {submitting ? "Publishing..." : isEdit ? "Update Thread" : "Publish Discussion"}
        </button>
      </div>
    </form>
  );
}
