"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { buildAuthHeaders, getApiBase } from "@/utils/api";

export function useDiscussionFeed(initialFilters = {}) {
  const { token, user } = useAuth();
  const [filters, setFilters] = useState(initialFilters);
  const [discussions, setDiscussions] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchFeed = useCallback(async (isLoadMore = false) => {
    try {
      if (!isLoadMore) setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      queryParams.set("page", isLoadMore ? String(page) : "1");
      queryParams.set("limit", "15");

      if (filters.category) queryParams.set("category", filters.category);
      if (filters.sort) queryParams.set("sort", filters.sort);
      if (filters.tag) queryParams.set("tag", filters.tag);
      if (filters.search) queryParams.set("search", filters.search);
      if (filters.problemSlug) queryParams.set("problemSlug", filters.problemSlug);
      if (filters.contestSlug) queryParams.set("contestSlug", filters.contestSlug);
      if (filters.vivaId) queryParams.set("vivaId", String(filters.vivaId));

      const apiBase = getApiBase();
      const headers = buildAuthHeaders(token, user);

      const res = await fetch(`${apiBase}/api/discuss?${queryParams.toString()}`, { headers });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load discussions");
      }

      setDiscussions((prev) => (isLoadMore ? [...prev, ...(data.data || [])] : data.data || []));
      setPagination(data.pagination || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, user, filters, page]);

  useEffect(() => {
    setPage(1);
    fetchFeed(false);
  }, [filters, token, user?.id]);

  const loadMore = () => {
    if (pagination && pagination.hasNext) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchFeed(true);
    }
  }, [page]);

  return {
    discussions,
    setDiscussions,
    pagination,
    loading,
    error,
    filters,
    setFilters,
    loadMore,
    refetch: () => fetchFeed(false),
  };
}

export function useDiscussionThread(slug) {
  const { token, user } = useAuth();
  const [thread, setThread] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchThread = useCallback(async () => {
    if (!slug) return;
    try {
      setLoading(true);
      setError(null);
      const apiBase = getApiBase();
      const headers = buildAuthHeaders(token, user);

      const [threadRes, commentsRes] = await Promise.all([
        fetch(`${apiBase}/api/discuss/${slug}`, { headers }),
        fetch(`${apiBase}/api/discuss/${slug}/comments?format=tree`, { headers }),
      ]);

      const threadData = await threadRes.json();
      const commentsData = await commentsRes.json();

      if (!threadRes.ok || !threadData.success) {
        throw new Error(threadData.message || "Failed to load thread");
      }

      setThread(threadData.discussion);
      setComments(commentsData.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [slug, token, user]);

  useEffect(() => {
    fetchThread();
  }, [fetchThread]);

  return {
    thread,
    setThread,
    comments,
    setComments,
    loading,
    error,
    refetch: fetchThread,
  };
}

export function useVote() {
  const { token, user } = useAuth();

  const voteDiscussion = async (slug, value, currentVote, currentScore, updateLocalState) => {
    if (!token && !user) {
      alert("Please log in to vote on discussions.");
      return;
    }

    let newVote = 0;
    let delta = 0;

    if (currentVote === 0) {
      newVote = value;
      delta = value;
    } else if (currentVote === value) {
      newVote = 0;
      delta = -value;
    } else {
      newVote = value;
      delta = value - currentVote;
    }

    updateLocalState(newVote, currentScore + delta);

    try {
      const apiBase = getApiBase();
      const headers = buildAuthHeaders(token, user);

      const res = await fetch(`${apiBase}/api/discuss/${slug}/vote`, {
        method: "POST",
        headers,
        body: JSON.stringify({ value }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        if (typeof data.userVote === "number" && typeof data.score === "number") {
          updateLocalState(data.userVote, data.score);
        }
      } else {
        // Rollback
        updateLocalState(currentVote, currentScore);
      }
    } catch (err) {
      // Rollback
      updateLocalState(currentVote, currentScore);
    }
  };

  const voteComment = async (discussionSlug, commentSlug, value, currentVote, currentScore, updateLocalState) => {
    if (!token && !user) {
      alert("Please log in to vote on comments.");
      return;
    }

    let newVote = 0;
    let delta = 0;

    if (currentVote === 0) {
      newVote = value;
      delta = value;
    } else if (currentVote === value) {
      newVote = 0;
      delta = -value;
    } else {
      newVote = value;
      delta = value - currentVote;
    }

    updateLocalState(newVote, currentScore + delta);

    try {
      const apiBase = getApiBase();
      const headers = buildAuthHeaders(token, user);

      const res = await fetch(`${apiBase}/api/discuss/${discussionSlug}/comments/${commentSlug}/vote`, {
        method: "POST",
        headers,
        body: JSON.stringify({ value }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        if (typeof data.userVote === "number" && typeof data.score === "number") {
          updateLocalState(data.userVote, data.score);
        }
      } else {
        updateLocalState(currentVote, currentScore);
      }
    } catch (err) {
      updateLocalState(currentVote, currentScore);
    }
  };

  return { voteDiscussion, voteComment };
}

export function useBookmark() {
  const { token, user } = useAuth();

  const toggleBookmark = async (slug, isCurrentlyBookmarked, updateLocalState, folderId = null) => {
    if (!token && !user) {
      alert("Please log in to bookmark discussions.");
      return;
    }
    updateLocalState(!isCurrentlyBookmarked);
    try {
      const apiBase = getApiBase();
      const headers = buildAuthHeaders(token, user);

      const res = await fetch(`${apiBase}/api/discuss/${slug}/bookmark`, {
        method: isCurrentlyBookmarked ? "DELETE" : "POST",
        headers,
        body: JSON.stringify({ folderId }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        if (typeof data.isBookmarked === "boolean") {
          updateLocalState(data.isBookmarked);
        }
      } else {
        updateLocalState(isCurrentlyBookmarked);
      }
    } catch (err) {
      updateLocalState(isCurrentlyBookmarked);
    }
  };

  return { toggleBookmark };
}

export function useNotifications() {
  const { token, user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(async () => {
    if (!token) return;
    try {
      const apiBase = getApiBase();
      const headers = buildAuthHeaders(token, user);

      const res = await fetch(`${apiBase}/api/discuss/notifications`, { headers });
      const data = await res.json();

      if (res.ok && data.success) {
        setNotifications(data.data || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (_) {}
  }, [token, user]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAllAsRead = async () => {
    setUnreadCount(0);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    try {
      const apiBase = getApiBase();
      const headers = buildAuthHeaders(token, user);
      await fetch(`${apiBase}/api/discuss/notifications/read-all`, {
        method: "PATCH",
        headers,
      });
    } catch (_) {}
  };

  return { notifications, unreadCount, refetch: fetchNotifications, markAllAsRead };
}
