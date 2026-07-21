"use client";

import React from "react";
import Link from "next/link";
import { Tag } from "lucide-react";

export default function TagPill({ tag, onClick }) {
  if (!tag) return null;
  const name = typeof tag === "string" ? tag : tag.name;
  const slug = typeof tag === "string" ? tag.toLowerCase().replace(/[^a-z0-9]/g, "-") : tag.slug;

  const content = (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-[var(--bg-badge)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--border-accent)] hover:text-[var(--accent-primary)] transition-all cursor-pointer">
      <Tag className="w-3 h-3 text-[var(--text-muted)]" />
      {name}
    </span>
  );

  if (onClick) {
    return <span onClick={() => onClick(slug)}>{content}</span>;
  }

  return <Link href={`/discuss?tag=${slug}`}>{content}</Link>;
}
