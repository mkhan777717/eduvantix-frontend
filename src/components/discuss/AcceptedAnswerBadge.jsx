"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function AcceptedAnswerBadge({ isAccepted = true }) {
  if (!isAccepted) return null;

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-sm">
      <CheckCircle2 className="w-3.5 h-3.5" />
      Accepted Solution
    </span>
  );
}
