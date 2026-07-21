"use client";

import React, { useState, useEffect, Suspense } from "react";
import DiscussionCard from "@/components/discuss/DiscussionCard";
import DiscussSidebar from "@/components/discuss/DiscussSidebar";
import { useAuth } from "@/context/AuthContext";
import { buildAuthHeaders, getApiBase } from "@/utils/api";
import { Bookmark, FolderPlus, Folder } from "lucide-react";

function SavedBookmarksContent() {
  const { user, token } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!token) return;
      try {
        setLoading(true);
        const apiBase = getApiBase();
        const headers = buildAuthHeaders(token, user);

        const folderQuery = selectedFolder ? `?folderName=${encodeURIComponent(selectedFolder)}` : "";
        const [bmRes, folderRes] = await Promise.all([
          fetch(`${apiBase}/api/discuss/saved${folderQuery}`, { headers }),
          fetch(`${apiBase}/api/discuss/saved/folders`, { headers }),
        ]);

        const bmData = await bmRes.json();
        const folderData = await folderRes.json();

        if (bmData.success) setBookmarks(bmData.data || []);
        if (folderData.success) setFolders(folderData.folders || []);
      } catch (_) {
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [token, user, selectedFolder]);

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    try {
      const apiBase = getApiBase();
      const headers = buildAuthHeaders(token, user);
      const res = await fetch(`${apiBase}/api/discuss/saved/folders`, {
        method: "POST",
        headers,
        body: JSON.stringify({ name: newFolderName }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFolders((prev) => [...prev, data.folder]);
        setNewFolderName("");
      }
    } catch (_) {}
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Title & Top Actions */}
      <div className="pb-4 border-b border-[var(--border-subtle)]">
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
          Saved Bookmarks
        </h1>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          Access your bookmarked threads and organize them into folders.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0 space-y-6">
          {/* Folders Management Bar */}
          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] shadow-sm space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                Bookmark Folders
              </h3>

              {/* Create New Folder Inline Form */}
              <form onSubmit={handleCreateFolder} className="flex items-center gap-2">
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="New folder name..."
                  className="px-3 py-1 rounded-xl text-xs bg-[var(--bg-input)] border border-[var(--border-primary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)]"
                />
                <button
                  type="submit"
                  disabled={!newFolderName.trim()}
                  className="p-1.5 rounded-xl bg-[var(--accent-primary)] text-white text-xs disabled:opacity-50 hover:bg-[var(--accent-secondary)] transition-all"
                  title="Create Folder"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Folder Pills */}
            <div className="flex items-center flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => setSelectedFolder("")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedFolder === ""
                    ? "bg-[var(--accent-primary)] text-white shadow-sm"
                    : "bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                All Saved
              </button>

              {folders.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedFolder(f.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    selectedFolder === f.name
                      ? "bg-[var(--accent-primary)] text-white shadow-sm"
                      : "bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <Folder className="w-3 h-3" />
                  {f.name} ({f.count})
                </button>
              ))}
            </div>
          </div>

          {/* Bookmarks Feed List */}
          {bookmarks.length > 0 ? (
            <div className="space-y-4">
              {bookmarks.map((bm) => (
                <DiscussionCard key={bm.discussion.slug} discussion={bm.discussion} />
              ))}
            </div>
          ) : !loading ? (
            <div className="p-12 text-center rounded-3xl bg-[var(--bg-card)] border border-[var(--border-primary)] space-y-2">
              <Bookmark className="w-8 h-8 text-[var(--text-muted)] mx-auto" />
              <h3 className="text-sm font-bold text-[var(--text-primary)]">No saved discussions here</h3>
              <p className="text-xs text-[var(--text-muted)]">Click the bookmark icon on any thread to save it for later.</p>
            </div>
          ) : null}
        </div>

        <DiscussSidebar activeTab="saved" />
      </div>
    </div>
  );
}

export default function SavedBookmarksPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-[var(--text-muted)]">Loading saved bookmarks...</div>}>
      <SavedBookmarksContent />
    </Suspense>
  );
}
