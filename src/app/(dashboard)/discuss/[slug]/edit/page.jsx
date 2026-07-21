"use client";

import React, { use } from "react";
import DiscussionForm from "@/components/discuss/DiscussionForm";
import { useDiscussionThread } from "@/customHooks/useDiscussion";

export default function EditDiscussionPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { thread, loading, error } = useDiscussionThread(params.slug);

  if (loading) {
    return <div className="p-8 text-center text-xs text-[var(--text-muted)]">Loading thread...</div>;
  }

  if (error || !thread) {
    return <div className="p-8 text-center text-xs text-red-400">Thread not found.</div>;
  }

  return (
    <div className="py-4">
      <DiscussionForm initialData={thread} />
    </div>
  );
}
