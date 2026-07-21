"use client";

import React, { useState } from "react";
import { Bold, Italic, Code, List, Eye, Edit3 } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";
import MentionAutocomplete from "./MentionAutocomplete";

export default function MarkdownEditor({ value, onChange, placeholder = "Write in markdown... Use @username or @mentor to mention people.", minHeight = "150px" }) {
  const [activeTab, setActiveTab] = useState("write"); // write | preview
  const [mentionQuery, setMentionQuery] = useState("");

  const handleTextChange = (e) => {
    const text = e.target.value;
    onChange(text);

    // Detect trailing mention query
    const lastWord = text.split(/\s+/).pop();
    if (lastWord && lastWord.startsWith("@")) {
      setMentionQuery(lastWord.slice(1));
    } else {
      setMentionQuery("");
    }
  };

  const insertFormat = (syntaxBefore, syntaxAfter = "") => {
    const input = document.getElementById("md-textarea");
    if (!input) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selectedText = value.substring(start, end);
    const replacement = syntaxBefore + (selectedText || "text") + syntaxAfter;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);
  };

  const handleSelectMention = (name) => {
    const words = value.split(/\s+/);
    words.pop();
    const newValue = [...words, `@${name} `].join(" ");
    onChange(newValue);
    setMentionQuery("");
  };

  return (
    <div className="relative rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] focus-within:border-[var(--accent-primary)] transition-all overflow-hidden shadow-sm">
      {/* Editor Toolbar Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[var(--bg-hover)] border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => insertFormat("**", "**")}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors"
            title="Bold"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat("*", "*")}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors"
            title="Italic"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat("```\n", "\n```")}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors"
            title="Code Block"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat("- ")}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors"
            title="List"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex items-center p-0.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("write")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
              activeTab === "write"
                ? "bg-[var(--accent-primary)] text-white"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Edit3 className="w-3 h-3" />
            Write
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
              activeTab === "preview"
                ? "bg-[var(--accent-primary)] text-white"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Eye className="w-3 h-3" />
            Preview
          </button>
        </div>
      </div>

      {/* Input area or Preview */}
      {activeTab === "write" ? (
        <div className="relative p-3">
          <MentionAutocomplete query={mentionQuery} onSelect={handleSelectMention} />
          <textarea
            id="md-textarea"
            value={value}
            onChange={handleTextChange}
            placeholder={placeholder}
            style={{ minHeight }}
            className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none resize-y font-mono leading-relaxed"
          />
        </div>
      ) : (
        <div className="p-4" style={{ minHeight }}>
          {value ? (
            <MarkdownRenderer content={value} />
          ) : (
            <p className="text-xs text-[var(--text-muted)] italic">Nothing to preview</p>
          )}
        </div>
      )}
    </div>
  );
}
