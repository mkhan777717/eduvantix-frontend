"use client";

import React from "react";

/**
 * MarkdownRenderer component.
 * Parses markdown text into formatted HTML preview.
 */
export default function MarkdownRenderer({ content = "" }) {
  if (!content) return null;

  // Formatting basic markdown elements safely
  const formatMarkdown = (text) => {
    return text
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-[var(--text-primary)] mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold text-[var(--text-primary)] mt-5 mb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-xl font-extrabold text-[var(--text-primary)] mt-6 mb-3">$1</h1>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="my-3 p-4 rounded-xl bg-[var(--bg-code)] border border-[var(--border-primary)] overflow-x-auto text-xs font-mono text-emerald-400"><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-[var(--bg-badge)] text-[var(--accent-primary)] font-mono text-xs">$1</code>')
      // Bold & Italic
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-[var(--text-primary)]">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>')
      // Blockquotes
      .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-[var(--accent-primary)] pl-3 py-1 my-2 text-xs italic text-[var(--text-muted)]">$1</blockquote>')
      // Line breaks
      .replace(/\n/g, '<br />');
  };

  return (
    <div
      className="prose prose-invert max-w-none text-sm text-[var(--text-primary)] leading-relaxed space-y-2 select-text"
      dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }}
    />
  );
}
