"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DiscussionForm from "@/components/discuss/DiscussionForm";

function NewDiscussionContent() {
  const searchParams = useSearchParams();
  const problemSlug = searchParams.get("problemSlug");
  const contestSlug = searchParams.get("contestSlug");

  const contextData = {};
  if (problemSlug) contextData.problemSlug = problemSlug;
  if (contestSlug) contextData.contestSlug = contestSlug;

  return <DiscussionForm contextData={contextData} />;
}

export default function NewDiscussionPage() {
  return (
    <div className="py-4">
      <Suspense fallback={<div className="p-8 text-center text-xs text-[var(--text-muted)]">Loading form...</div>}>
        <NewDiscussionContent />
      </Suspense>
    </div>
  );
}
