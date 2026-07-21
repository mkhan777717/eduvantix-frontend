"use client";

import React, { use } from "react";
import DiscussionThread from "@/components/discuss/DiscussionThread";

export default function DiscussionSlugPage({ params: paramsPromise }) {
  const params = use(paramsPromise);

  return (
    <div className="py-4">
      <DiscussionThread slug={params.slug} />
    </div>
  );
}
