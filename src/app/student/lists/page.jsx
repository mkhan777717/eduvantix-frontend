"use client";

import React from "react";
import { BookOpen } from "lucide-react";

export default function MyListsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500">
          <BookOpen size={24} />
        </div>
        <h1 className="text-2xl font-black text-[var(--text-primary)]">My Lists</h1>
      </div>

      <div className="p-12 text-center rounded-3xl border shadow-sm" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-card)" }}>
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">No lists created yet</h2>
        <p className="text-sm text-[var(--text-muted)] mb-6">Create lists to organize your favorite problems, articles, and interview preparation materials.</p>
        <button className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-indigo-500 hover:bg-indigo-600 transition-colors shadow-md">
          Create New List
        </button>
      </div>
    </div>
  );
}
