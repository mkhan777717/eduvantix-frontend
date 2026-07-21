"use client";

import React from "react";
import { Flame, Sparkles, Trophy, HelpCircle, Search } from "lucide-react";

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "GENERAL", label: "General" },
  { value: "INTERVIEW", label: "Interview Prep" },
  { value: "CAREER", label: "Career Advice" },
  { value: "HELP", label: "Help Wanted" },
  { value: "BUG_REPORT", label: "Bug Reports" },
  { value: "FEATURE_REQUEST", label: "Feature Requests" },
  { value: "OFF_TOPIC", label: "Off Topic" },
  { value: "PROBLEM", label: "Problems" },
  { value: "CONTEST", label: "Contests" },
  { value: "VIVA", label: "Viva" },
  { value: "ANNOUNCEMENT", label: "Announcements" },
];

export default function DiscussionFilters({ filters, onChange }) {
  const currentSort = filters.sort || "hot";

  const setSort = (sort) => {
    onChange({ ...filters, sort });
  };

  const handleSearchChange = (e) => {
    onChange({ ...filters, search: e.target.value });
  };

  const handleCategoryChange = (e) => {
    onChange({ ...filters, category: e.target.value });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] mb-6 shadow-sm">
      {/* Sort Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
        <button
          type="button"
          onClick={() => setSort("hot")}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            currentSort === "hot" || currentSort === "trending"
              ? "bg-[var(--accent-primary)] text-white shadow-sm"
              : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          Trending
        </button>

        <button
          type="button"
          onClick={() => setSort("new")}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            currentSort === "new"
              ? "bg-[var(--accent-primary)] text-white shadow-sm"
              : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Newest
        </button>

        <button
          type="button"
          onClick={() => setSort("top")}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            currentSort === "top"
              ? "bg-[var(--accent-primary)] text-white shadow-sm"
              : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          Top
        </button>

        <button
          type="button"
          onClick={() => setSort("unanswered")}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            currentSort === "unanswered"
              ? "bg-[var(--accent-primary)] text-white shadow-sm"
              : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Unanswered
        </button>
      </div>

      {/* Search & Category Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 md:w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-muted)]" />
          <input
            type="text"
            value={filters.search || ""}
            onChange={handleSearchChange}
            placeholder="Search discussions..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-[var(--bg-input)] border border-[var(--border-primary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-all"
          />
        </div>

        <select
          value={filters.category || ""}
          onChange={handleCategoryChange}
          className="px-3 py-1.5 rounded-xl text-xs bg-[var(--bg-input)] border border-[var(--border-primary)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-all cursor-pointer"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
