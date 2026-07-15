"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import LiveBanner from "@/components/LiveBanner";
import { useAuth } from "@/context/AuthContext";

export default function LiveClassesPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      {!user && <Navbar />}
      <div className={!user ? 'pt-28 pb-16' : ''}>
        <LiveBanner />
      </div>
    </div>
  );
}
