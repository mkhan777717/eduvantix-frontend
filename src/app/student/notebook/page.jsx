"use client";

import React, { useState } from "react";
import { FileText, Plus } from "lucide-react";

export default function NotebookPage() {
  const [notes, setNotes] = useState([
    { id: 1, title: "Graph Algorithms Summary", snippet: "Dijkstra's is used for shortest path on weighted graphs..." },
    { id: 2, title: "Dynamic Programming Patterns", snippet: "The 0/1 Knapsack problem usually requires a 2D DP array..." }
  ]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
            <FileText size={24} />
          </div>
          <h1 className="text-2xl font-black text-[var(--text-primary)]">My Notebook</h1>
        </div>
        
        <button className="flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm text-white bg-blue-500 hover:bg-blue-600 transition-colors shadow-md">
          <Plus size={16} />
          <span>New Note</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map(note => (
          <div key={note.id} className="p-6 rounded-3xl border shadow-sm cursor-pointer hover:shadow-md transition-all hover:scale-[1.02]" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-card)" }}>
            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">{note.title}</h3>
            <p className="text-xs text-[var(--text-muted)] line-clamp-3">{note.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
